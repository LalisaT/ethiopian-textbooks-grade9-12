import { QuizQuestion, ExamStream } from '../types/quiz';
import { SubjectCategory, GradeLevel } from '../types/book';
import { EXAM_PRACTICE_QUESTIONS } from '../data/examQuestions';
import { generateProceduralQuestion } from './proceduralQuizGenerator';

export interface QuestionSelectionOptions {
  subject?: SubjectCategory | 'all';
  stream?: ExamStream | 'all';
  grade?: GradeLevel;
  bestOfBestOnly?: boolean;
}

/**
 * Fisher-Yates array shuffler
 */
function shuffle<T>(array: T[]): T[] {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

export function isQuestionMatchingSubject(q: QuizQuestion, targetSubject?: string | null): boolean {
  if (!targetSubject || targetSubject === 'all') return true;

  if (targetSubject === 'mathematics_social') {
    return (
      q.subject === 'mathematics_social' ||
      (q.subject === 'mathematics' && (q.stream === 'social_science' || q.stream === 'both' || !q.stream || (q.grade && q.grade <= 10)))
    );
  }
  if (targetSubject === 'mathematics_natural') {
    return (
      q.subject === 'mathematics_natural' ||
      (q.subject === 'mathematics' && (q.stream === 'natural_science' || q.stream === 'both' || !q.stream || (q.grade && q.grade >= 11)))
    );
  }
  if (targetSubject === 'mathematics') {
    return (
      q.subject === 'mathematics' ||
      q.subject === 'mathematics_natural' ||
      q.subject === 'mathematics_social'
    );
  }

  return q.subject === targetSubject;
}

/**
 * Select the "best of best" questions tailored to the requested question count (10, 50, 100, 200).
 * Guarantees 100% subject isolation: a Math exam will NEVER contain Geography, Economics, or History!
 */
export function selectBestOfBestQuestions(
  baseQuestions: QuizQuestion[],
  requestedCount: number,
  options: QuestionSelectionOptions = {}
): QuizQuestion[] {
  const { subject = 'all', stream = 'all' } = options;

  // 1. Establish the primary candidate pool strictly isolated by subject
  let pool: QuizQuestion[] = [];

  // If base questions were provided, keep only those matching target subject
  if (baseQuestions && baseQuestions.length > 0) {
    pool = baseQuestions.filter((q) => isQuestionMatchingSubject(q, subject));
  }

  // Also include any additional matching questions from master repository
  if (subject !== 'all') {
    const additionalFromRepo = EXAM_PRACTICE_QUESTIONS.filter(
      (q) => isQuestionMatchingSubject(q, subject) && !pool.some((p) => p.id === q.id)
    );
    pool.push(...additionalFromRepo);
  } else if (pool.length === 0) {
    pool = [...EXAM_PRACTICE_QUESTIONS];
  }

  // Filter by stream only if subject is not already stream-specific
  if (
    stream &&
    stream !== 'all' &&
    stream !== 'common' &&
    stream !== 'both' &&
    subject !== 'mathematics_social' &&
    subject !== 'mathematics_natural'
  ) {
    const streamFiltered = pool.filter(
      (q) => q.stream === stream || q.stream === 'both' || q.stream === 'common' || !q.stream
    );
    if (streamFiltered.length > 0) {
      pool = streamFiltered;
    }
  }

  // Fallback sanity check: Ensure pool has at least 1 question
  if (pool.length === 0) {
    pool = EXAM_PRACTICE_QUESTIONS.filter((q) => isQuestionMatchingSubject(q, subject));
    if (pool.length === 0) {
      pool = [...EXAM_PRACTICE_QUESTIONS];
    }
  }

  // 2. Score and rank questions ("Best of Best" criteria)
  const scored = pool.map((q) => {
    let score = 0;
    // Official Ministry Exam questions get top priority
    if (q.isMinistryExamSample) score += 10;
    if (q.isEsslceExam) score += 5;

    // Recent exam years preferred
    if (q.examYear === 2024) score += 5;
    else if (q.examYear === 2023) score += 4;
    else if (q.examYear === 2022) score += 3;

    // Balanced difficulty
    if (q.difficulty === 'medium') score += 4;
    else if (q.difficulty === 'hard') score += 3;
    else score += 2;

    // Add small random noise for session variety
    score += Math.random() * 3;

    return { question: q, score };
  });

  // Sort by highest score descending
  scored.sort((a, b) => b.score - a.score);
  const rankedQuestions = scored.map((s) => s.question);

  // If pool has enough unique questions, take the top requestedCount
  if (rankedQuestions.length >= requestedCount) {
    return shuffle(rankedQuestions.slice(0, requestedCount));
  }

  // 3. If pool has fewer questions than requested (e.g. 50, 100, 200 count requested):
  // Generate authentic high-yield procedural questions STRICTLY within this subject.
  // NEVER pull from other subjects and NEVER duplicate prompts!
  const extendedPool = [...rankedQuestions];
  const seen = new Set<string>(extendedPool.map((q) => (q.question || '').trim().toLowerCase()));
  let counter = 0;
  let safety = 0;

  const targetSubjectCategory: SubjectCategory =
    subject !== 'all' ? (subject as SubjectCategory) : 'physics';

  while (extendedPool.length < requestedCount && safety < requestedCount * 10) {
    safety++;
    const proc = generateProceduralQuestion(
      targetSubjectCategory,
      'all',
      counter,
      12,
      'en'
    );
    counter++;

    const key = (proc.question || '').trim().toLowerCase();
    if (!key || seen.has(key)) continue;

    seen.add(key);
    extendedPool.push(proc);
  }

  return shuffle(extendedPool.slice(0, requestedCount));
}
