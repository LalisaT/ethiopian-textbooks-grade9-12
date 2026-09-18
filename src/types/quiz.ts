import { GradeLevel, SubjectCategory, RegionId, AcademicStream } from './book';

export type ExamStream = AcademicStream | 'both';

export interface QuizQuestion {
  id: string;
  grade: GradeLevel;
  subject: SubjectCategory;
  regionId?: RegionId;
  unitNumber?: number;
  chapterTitle?: string;
  question: string;
  questionAmharic?: string;
  questionOromo?: string;
  questionTigrinya?: string;
  questionSomali?: string;
  options: string[];
  optionsAmharic?: string[];
  optionsOromo?: string[];
  correctOptionIndex: number;
  explanation: string;
  explanationAmharic?: string;
  explanationOromo?: string;
  difficulty: 'easy' | 'medium' | 'hard';
  isMinistryExamSample?: boolean;
  isEsslceExam?: boolean;
  stream?: ExamStream;
  sourceGrade?: GradeLevel;
  examYear?: number;
}

export interface QuizAttempt {
  id: string;
  quizId: string;
  title: string;
  grade: GradeLevel;
  subject: SubjectCategory;
  date: string;
  totalQuestions: number;
  score: number;
  timeSpentSeconds: number;
  userAnswers: { questionId: string; selectedIndex: number; isCorrect: boolean }[];
}

export interface Flashcard {
  id: string;
  grade: GradeLevel;
  subject: SubjectCategory;
  unitNumber: number;
  front: string;
  frontAmharic?: string;
  back: string;
  backAmharic?: string;
  category: 'formula' | 'definition' | 'concept' | 'date_fact';
}

export interface ExamPack {
  id: string;
  title: string;
  titleAmharic?: string;
  titleOromo?: string;
  description: string;
  grade: GradeLevel;
  stream?: ExamStream;
  isEsslceExam?: boolean;
  subject: SubjectCategory | 'all';
  regionId?: RegionId;
  language?: string;
  examYear?: number;
  timeLimitMinutes?: number;
  isCustom?: boolean;
  questions: QuizQuestion[];
  createdAt?: string;
}

export interface PastExamPaper {
  id: string;
  title: string;
  titleOromo?: string;
  titleAmharic?: string;
  grade: GradeLevel;
  stream?: ExamStream;
  isEsslce?: boolean;
  subject: SubjectCategory;
  year: number; // e.g. 2016 (E.C.), 2015, 2014 or 2024, 2023, 2022
  region: string; // e.g. "National (MoE/EAES)", "Oromia", "Amhara", "Tigray", "Addis Ababa"
  language: string; // 'om', 'am', 'en', 'ti', 'so'
  totalQuestions: number;
  timeAllowedMinutes: number;
  pdfDownloadUrl?: string;
  pdfBlobKey?: string;
  fileSize?: string;
  hasAnswerKey: boolean;
  isCustomUploaded?: boolean;
  description?: string;
  questions?: QuizQuestion[];
}

