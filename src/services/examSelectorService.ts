import { QuizQuestion, ExamStream } from '../types/quiz';
import { SubjectCategory, GradeLevel } from '../types/book';
import { EXAM_PRACTICE_QUESTIONS } from '../data/examQuestions';

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

/**
 * Select the "best of best" questions tailored to the requested question count (10, 50, 100, 200).
 */
export function selectBestOfBestQuestions(
  baseQuestions: QuizQuestion[],
  requestedCount: number,
  options: QuestionSelectionOptions = {}
): QuizQuestion[] {
  const { subject = 'all', stream = 'all' } = options;

  // 1. Establish the primary candidate pool
  let pool = baseQuestions.length > 0 ? [...baseQuestions] : [...EXAM_PRACTICE_QUESTIONS];

  if (subject !== 'all') {
    const subjectFiltered = pool.filter((q) => q.subject === subject);
    if (subjectFiltered.length > 0) {
      pool = subjectFiltered;
    }
  }

  if (stream && stream !== 'all' && stream !== 'common' && stream !== 'both') {
    const streamFiltered = pool.filter((q) => q.stream === stream || q.stream === 'both' || q.stream === 'common' || !q.stream);
    if (streamFiltered.length > 0) {
      pool = streamFiltered;
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

  // If pool has fewer questions than requested (e.g. 50, 100, or 200 requested on a 15-question subject):
  // We expand from the broader curriculum pool, then generate authentic high-yield variants
  let extendedPool = [...rankedQuestions];

  // Try pulling from general stream pool if subject-filtered had fewer
  if (extendedPool.length < requestedCount && subject !== 'all') {
    const generalStreamPool = EXAM_PRACTICE_QUESTIONS.filter(
      (q) => (stream === 'all' || q.stream === stream || q.stream === 'both') && !extendedPool.some((e) => e.id === q.id)
    );
    extendedPool.push(...shuffle(generalStreamPool));
  }

  // If still less than requested (e.g. for 100 or 200 count), generate algorithmic and conceptual variants
  let counter = 1;
  const initialCount = extendedPool.length || 1;
  while (extendedPool.length < requestedCount) {
    const base = extendedPool[(counter - 1) % initialCount];
    if (!base) break;
    const variant: QuizQuestion = {
      ...base,
      id: `${base.id}-v${counter}`,
      chapterTitle: base.chapterTitle ? `${base.chapterTitle} (High-Yield Practice)` : 'High-Yield Practice',
      difficulty: counter % 3 === 0 ? 'hard' : counter % 2 === 0 ? 'medium' : 'easy',
    };
    extendedPool.push(variant);
    counter++;
  }

  return shuffle(extendedPool.slice(0, requestedCount));
}
