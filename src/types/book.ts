export type GradeLevel = 9 | 10 | 11 | 12;

export type AcademicStream = 'all' | 'natural_science' | 'social_science' | 'common';

export type RegionId =
  | 'national'
  | 'addis_ababa'
  | 'oromia'
  | 'amhara'
  | 'tigray'
  | 'somali'
  | 'sidama'
  | 'south_ethiopia'
  | 'central_ethiopia'
  | 'afar'
  | 'benishangul'
  | 'gambella'
  | 'harari'
  | 'dire_dawa';

export type SubjectCategory =
  | 'mathematics'
  | 'mathematics_natural'
  | 'mathematics_social'
  | 'physics'
  | 'chemistry'
  | 'biology'
  | 'english'
  | 'amharic'
  | 'afaan_oromoo'
  | 'tigrinya'
  | 'somali_lang'
  | 'geography'
  | 'history'
  | 'economics'
  | 'citizenship'
  | 'it'
  | 'agriculture'
  | 'general_business'
  | 'technical_drawing'
  | 'hpe'
  | 'pva';

export type LanguageCode = 'en' | 'am' | 'om' | 'ti' | 'so';

export type BookType = 'textbook' | 'teacher_guide';

export interface BookChapter {
  id: string;
  unitNumber: number;
  title: string;
  titleAmharic?: string;
  titleOromo?: string;
  titleTigrinya?: string;
  titleSomali?: string;
  description: string;
  keyObjectives: string[];
  readingTimeMinutes: number;
  sections: ChapterSection[];
  summary: string;
  keyTerms: { term: string; definition: string }[];
  formulasOrRules?: { title: string; content: string }[];
  quizQuestionIds?: string[];
  pdfPageStart?: number;
  pdfPageEnd?: number;
}

export interface ChapterSection {
  id: string;
  sectionNumber: string;
  title: string;
  content: string[];
  diagramOrIllustration?: {
    caption: string;
    diagramType: 'table' | 'flowchart' | 'callout' | 'comparison' | 'formula_box';
    data: any;
  };
  keyTakeaways?: string[];
}

export interface DownloadMirror {
  name: string;
  url: string;
  provider?: 'cdn' | 'firebase' | 'googledrive' | 'moe' | 'mirror';
  direct?: boolean;
  fileSize?: string;
}

export interface Book {
  id: string;
  title: string;
  titleAmharic: string;
  titleOromo: string;
  titleTigrinya: string;
  titleSomali: string;
  grade: GradeLevel;
  subject: SubjectCategory;
  stream?: AcademicStream;
  bookType?: BookType;
  regionId: RegionId;
  language: LanguageCode;
  editionYear: number;
  curriculum: 'New Curriculum (2023+)' | 'Federal Standard' | 'Regional Bureau Curriculum';
  coverColor: string;
  accentColor: string;
  iconName: string;
  totalUnits: number;
  totalEstimatedPages: number;
  description: string;
  chapters: BookChapter[];
  pdfUrl?: string;
  cdnPdfUrl?: string;
  cloudStorageUrl?: string;
  googleDriveId?: string;
  coverImageUrl?: string;
  downloadMirrorUrls?: DownloadMirror[];
  isOfficialMoe: boolean;
  fileSizeMb: number;
  kehulumUrl?: string;
  ethiopiaTemariUrl?: string;
  neaeaUrl?: string;
  telegramUrl?: string;
  moeUrl?: string;
  isSampleDownloaded?: boolean;
  localCachedBlobKey?: string;
}

export interface RegionInfo {
  id: RegionId;
  name: string;
  nameAmharic: string;
  nameOromo: string;
  nameTigrinya: string;
  nameSomali: string;
  capital?: string;
  description: string;
  primaryLanguages: LanguageCode[];
  badgeColor: string;
  flagEmblem?: string;
}

export interface SubjectInfo {
  id: SubjectCategory;
  name: string;
  nameAmharic: string;
  nameOromo: string;
  nameTigrinya: string;
  nameSomali: string;
  icon: string;
  color: string;
  grades: GradeLevel[];
  stream?: AcademicStream;
  description: string;
}
