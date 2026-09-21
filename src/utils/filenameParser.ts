import { GradeLevel, RegionId, SubjectCategory, LanguageCode, Book, AcademicStream } from '../types/book';

const COLOR_PRESETS: Record<SubjectCategory, { cover: string; accent: string }> = {
  physics: { cover: 'from-blue-600 to-indigo-900', accent: 'blue' },
  chemistry: { cover: 'from-emerald-600 to-teal-900', accent: 'emerald' },
  biology: { cover: 'from-green-600 to-emerald-900', accent: 'green' },
  mathematics: { cover: 'from-indigo-600 to-violet-900', accent: 'indigo' },
  mathematics_natural: { cover: 'from-blue-700 to-cyan-900', accent: 'blue' },
  mathematics_social: { cover: 'from-purple-700 to-indigo-900', accent: 'purple' },
  economics: { cover: 'from-amber-600 to-orange-900', accent: 'amber' },
  history: { cover: 'from-rose-600 to-red-900', accent: 'rose' },
  geography: { cover: 'from-cyan-600 to-sky-900', accent: 'cyan' },
  english: { cover: 'from-purple-600 to-violet-800', accent: 'purple' },
  citizenship: { cover: 'from-red-600 to-rose-900', accent: 'red' },
  it: { cover: 'from-sky-600 to-blue-800', accent: 'sky' },
  agriculture: { cover: 'from-lime-600 to-emerald-900', accent: 'lime' },
  general_business: { cover: 'from-amber-700 to-orange-950', accent: 'amber' },
  technical_drawing: { cover: 'from-slate-700 to-zinc-900', accent: 'slate' },
  hpe: { cover: 'from-orange-600 to-amber-800', accent: 'orange' },
  pva: { cover: 'from-pink-600 to-rose-800', accent: 'rose' },
  amharic: { cover: 'from-yellow-600 to-amber-800', accent: 'amber' },
  afaan_oromoo: { cover: 'from-red-600 to-amber-800', accent: 'red' },
  tigrinya: { cover: 'from-yellow-700 to-rose-800', accent: 'yellow' },
  somali_lang: { cover: 'from-teal-600 to-cyan-900', accent: 'teal' },
  sat: { cover: 'from-teal-600 to-indigo-950', accent: 'teal' },
  aptitude: { cover: 'from-amber-600 to-indigo-950', accent: 'amber' },
};

export interface ParsedBookDraft {
  id: string;
  file: File;
  title: string;
  titleAmharic: string;
  titleOromo: string;
  titleTigrinya: string;
  titleSomali: string;
  grade: GradeLevel;
  stream?: AcademicStream;
  bookType?: 'textbook' | 'teacher_guide';
  subject: SubjectCategory;
  regionId: RegionId;
  language: LanguageCode;
  editionYear: number;
  curriculum: Book['curriculum'];
  totalUnits: number;
  totalEstimatedPages: number;
  fileSizeMb: number;
  coverColor: string;
  accentColor: string;
  status: 'pending' | 'uploading' | 'done' | 'error';
}

export function parseFilenameToBookDraft(file: File): ParsedBookDraft {
  const rawName = file.name.replace(/\.pdf$/i, '');
  const lowerName = rawName.toLowerCase();

  // 1. Detect Grade (9, 10, 11, 12, default 12)
  let grade: GradeLevel = 12;
  if (/grade\s*9|g9|kutaa\s*9|9ኛ|fasalka\s*9|9ይ\s*ክፍሊ|\b9\b/i.test(lowerName)) {
    grade = 9;
  } else if (/grade\s*10|g10|kutaa\s*10|10ኛ|fasalka\s*10|10ይ\s*ክፍሊ|\b10\b/i.test(lowerName)) {
    grade = 10;
  } else if (/grade\s*11|g11|kutaa\s*11|11ኛ|fasalka\s*11|11ይ\s*ክፍሊ|\b11\b/i.test(lowerName)) {
    grade = 11;
  } else if (/grade\s*12|g12|kutaa\s*12|12ኛ|fasalka\s*12|12ይ\s*ክፍሊ|\b12\b/i.test(lowerName)) {
    grade = 12;
  }

  // 2. Detect Subject
  let subject: SubjectCategory = 'physics';
  if (/physic|fiiziks|ፊዚክስ/i.test(lowerName)) {
    subject = 'physics';
  } else if (/chem|keemist|ኬሚስትሪ/i.test(lowerName)) {
    subject = 'chemistry';
  } else if (/bio|baayolooji|ባዮሎጂ/i.test(lowerName)) {
    subject = 'biology';
  } else if (/math|herrega|ሒሳብ|xisaab/i.test(lowerName)) {
    subject = 'mathematics';
  } else if (/econ|dinagdee|ኢኮኖሚክስ/i.test(lowerName)) {
    subject = 'economics';
  } else if (/histor|seenaa|ታሪክ/i.test(lowerName)) {
    subject = 'history';
  } else if (/geograph|teessuma|ጆግራፊ/i.test(lowerName)) {
    subject = 'geography';
  } else if (/agric|qonnaa|ግብርና/i.test(lowerName)) {
    subject = 'agriculture';
  } else if (/english|ingilizii|እንግሊዝኛ|ingiriisi/i.test(lowerName)) {
    subject = 'english';
  } else if (/citizen|lammummaa|ዜግነት|waddaniyadda|ትምህርቲ ዜግነት/i.test(lowerName)) {
    subject = 'citizenship';
  } else if (/\bit\b|information|odeeffannoo|ቴክኖሎጂ|computing/i.test(lowerName)) {
    subject = 'it';
  } else if (/amharic|አማርኛ/i.test(lowerName)) {
    subject = 'amharic';
  } else if (/oromoo|afaan oromoo|oromiyaa/i.test(lowerName)) {
    subject = 'afaan_oromoo';
  } else if (/tigrinya|ትግርኛ|ትግራይ/i.test(lowerName)) {
    subject = 'tigrinya';
  } else if (/somali|soomaali|soomaalida/i.test(lowerName)) {
    subject = 'somali_lang';
  }

  // 3. Detect Academic Stream
  let stream: AcademicStream = 'all';
  if (['physics', 'chemistry', 'biology'].includes(subject)) {
    stream = 'natural_science';
  } else if (['economics', 'geography', 'history'].includes(subject)) {
    stream = 'social_science';
  }

  // 4. Detect Language Medium & Region
  let language: LanguageCode = 'en';
  let regionId: RegionId = 'national';

  if (/oromoo|oromiyaa|herrega|saayinsii|hawaasaa|lammummaa|kutaa/i.test(lowerName)) {
    language = 'om';
    regionId = 'oromia';
  } else if (/አማርኛ|ሒሳብ|ሳይንስ|ማህበራዊ|ዜግነት|ክፍል|ተማሪ/i.test(rawName)) {
    language = 'am';
    regionId = 'amhara';
  } else if (/ትግርኛ|ትግራይ|ሓፈሻዊ|ማሕበራዊ|ክፍሊ/i.test(rawName)) {
    language = 'ti';
    regionId = 'tigray';
  } else if (/somali|soomaalida|fasalka|xisaab|sayniska|bulshada/i.test(lowerName)) {
    language = 'so';
    regionId = 'somali';
  }

  // 5. Detect Book Type (Teacher Guide vs Student Textbook)
  const isTeacherGuide = /teacher|teacher's|guide|መምህር|መምሪያ|መመሪያ|barsiisaa|qajeelcha|\btg\b/i.test(lowerName);
  const bookType: 'textbook' | 'teacher_guide' = isTeacherGuide ? 'teacher_guide' : 'textbook';

  // 6. Generate Clean Title
  const cleanTitle = rawName
    .replace(/[-_]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  const colorConfig = COLOR_PRESETS[subject] || {
    cover: 'from-emerald-600 to-teal-800',
    accent: 'emerald',
  };

  const fileSizeMb = Math.round((file.size / (1024 * 1024)) * 10) / 10 || 12.0;

  return {
    id: `custom-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`,
    file,
    title: cleanTitle,
    titleAmharic: cleanTitle,
    titleOromo: cleanTitle,
    titleTigrinya: cleanTitle,
    titleSomali: cleanTitle,
    grade,
    stream,
    bookType,
    subject,
    regionId,
    language,
    editionYear: 2024,
    curriculum: 'New Curriculum (2023+)',
    totalUnits: 6,
    totalEstimatedPages: 180,
    fileSizeMb,
    coverColor: colorConfig.cover,
    accentColor: colorConfig.accent,
    status: 'pending',
  };
}
