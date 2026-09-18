import { GradeLevel, RegionId, LanguageCode } from './book';

export interface UserNote {
  id: string;
  bookId: string;
  unitNumber: number;
  sectionId?: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  colorTag?: string;
}

export interface UserBookmark {
  id: string;
  bookId: string;
  unitNumber: number;
  bookTitle: string;
  unitTitle: string;
  grade: GradeLevel;
  subject: string;
  savedAt: string;
}

export interface ReadingProgress {
  bookId: string;
  completedUnits: number[];
  lastUnitNumber: number;
  lastReadTimestamp: string;
  percentComplete: number;
}

export interface UserSettings {
  selectedGrade: GradeLevel;
  selectedRegion: RegionId;
  language: LanguageCode;
  theme: 'light' | 'dark' | 'sepia';
  fontSize: 'sm' | 'base' | 'lg' | 'xl';
  autoSpeechRate: number;
}
