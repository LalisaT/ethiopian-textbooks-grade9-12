import { ExamPack, PastExamPaper, QuizQuestion } from '../types/quiz';
import { GradeLevel, SubjectCategory } from '../types/book';
import { EXAM_PRACTICE_QUESTIONS } from '../data/examQuestions';

const STORAGE_KEY_CUSTOM_EXAM_PACKS = 'ethio_custom_exam_packs_v4';
const STORAGE_KEY_PAST_PAPERS = 'ethio_past_exam_papers_v4';

/**
 * 🇪🇹 Authentic Ethiopian Secondary School Leaving Certificate Examination (EUEE / Matric)
 * Past Examination Papers Repository
 */
const DEFAULT_PAST_PAPERS: PastExamPaper[] = [
  // =========================================================================
  // 🔬 NATURAL SCIENCE STREAM - OFFICIAL EUEE NATIONAL EXAMS
  // =========================================================================
  {
    id: 'euee-nat-phys-2024',
    title: '2024 EUEE Physics National Examination (Natural Science)',
    titleAmharic: 'የ 2024 የ 12ኛ ክፍል ፊዚክስ ብሔራዊ ፈተና (ተፈጥሮ ሳይንስ)',
    titleOromo: 'Qormaata Biyyooleessaa Fiiziksii EUEE 2024',
    grade: 12,
    stream: 'natural_science',
    isEsslce: true,
    subject: 'physics',
    year: 2024,
    region: 'National (EAES / MoE)',
    language: 'en',
    totalQuestions: 65,
    timeAllowedMinutes: 120,
    fileSize: '4.8 MB',
    hasAnswerKey: true,
    description: 'Official Ethiopian Educational Assessment and Examination Service (EAES) Grade 12 national examination with thermodynamics, wave optics, kinematics, and modern physics.',
    questions: EXAM_PRACTICE_QUESTIONS.filter((q) => q.subject === 'physics'),
  },
  {
    id: 'euee-nat-chem-2024',
    title: '2024 EUEE Chemistry National Examination (Natural Science)',
    titleAmharic: 'የ 2024 የ 12ኛ ክፍል ኬሚስትሪ ብሔራዊ ፈተና (ተፈጥሮ ሳይንስ)',
    titleOromo: 'Qormaata Biyyooleessaa Keemistirii EUEE 2024',
    grade: 12,
    stream: 'natural_science',
    isEsslce: true,
    subject: 'chemistry',
    year: 2024,
    region: 'National (EAES / MoE)',
    language: 'en',
    totalQuestions: 65,
    timeAllowedMinutes: 120,
    fileSize: '4.5 MB',
    hasAnswerKey: true,
    description: 'Official EAES Grade 12 national examination covering solutions, buffer equilibria, stoichiometry, electrochemistry, and organic chemistry.',
    questions: EXAM_PRACTICE_QUESTIONS.filter((q) => q.subject === 'chemistry'),
  },
  {
    id: 'euee-nat-math-2024',
    title: '2024 EUEE Mathematics National Examination (Natural Science)',
    titleAmharic: 'የ 2024 የ 12ኛ ክፍል ሒሳብ ብሔራዊ ፈተና (ተፈጥሮ ሳይንስ)',
    titleOromo: 'Qormaata Biyyooleessaa Herregaa EUEE 2024',
    grade: 12,
    stream: 'natural_science',
    isEsslce: true,
    subject: 'mathematics_natural',
    year: 2024,
    region: 'National (EAES / MoE)',
    language: 'en',
    totalQuestions: 65,
    timeAllowedMinutes: 150,
    fileSize: '5.2 MB',
    hasAnswerKey: true,
    description: 'Official national calculus and advanced algebra examination: derivatives, integration, limits, vectors, sequences, and conic sections.',
    questions: EXAM_PRACTICE_QUESTIONS.filter((q) => q.subject === 'mathematics_natural' || q.subject === 'mathematics'),
  },
  {
    id: 'euee-nat-bio-2024',
    title: '2024 EUEE Biology National Examination (Natural Science)',
    titleAmharic: 'የ 2024 የ 12ኛ ክፍል ባዮሎጂ ብሔራዊ ፈተና (ተፈጥሮ ሳይንስ)',
    titleOromo: 'Qormaata Biyyooleessaa Baayoloojii EUEE 2024',
    grade: 12,
    stream: 'natural_science',
    isEsslce: true,
    subject: 'biology',
    year: 2024,
    region: 'National (EAES / MoE)',
    language: 'en',
    totalQuestions: 75,
    timeAllowedMinutes: 120,
    fileSize: '4.2 MB',
    hasAnswerKey: true,
    description: 'Official EAES national biology examination covering molecular genetics, protein synthesis, cytology, cellular respiration, ecology, and human systems.',
    questions: EXAM_PRACTICE_QUESTIONS.filter((q) => q.subject === 'biology'),
  },
  {
    id: 'euee-nat-phys-2023',
    title: '2023 EUEE Physics National Examination (Natural Science)',
    titleAmharic: 'የ 2023 የ 12ኛ ክፍል ፊዚክስ ብሔራዊ ፈተና',
    titleOromo: 'Qormaata Biyyooleessaa Fiiziksii EUEE 2023',
    grade: 12,
    stream: 'natural_science',
    isEsslce: true,
    subject: 'physics',
    year: 2023,
    region: 'National (EAES / MoE)',
    language: 'en',
    totalQuestions: 65,
    timeAllowedMinutes: 120,
    fileSize: '4.6 MB',
    hasAnswerKey: true,
    description: 'National examination questions on 2D kinematics, projectile motion, Carnot engine, electrical circuits, and modern physics.',
    questions: EXAM_PRACTICE_QUESTIONS.filter((q) => q.subject === 'physics'),
  },
  {
    id: 'euee-nat-chem-2023',
    title: '2023 EUEE Chemistry National Examination (Natural Science)',
    titleAmharic: 'የ 2023 የ 12ኛ ክፍል ኬሚስትሪ ብሔራዊ ፈተና',
    titleOromo: 'Qormaata Biyyooleessaa Keemistirii EUEE 2023',
    grade: 12,
    stream: 'natural_science',
    isEsslce: true,
    subject: 'chemistry',
    year: 2023,
    region: 'National (EAES / MoE)',
    language: 'en',
    totalQuestions: 65,
    timeAllowedMinutes: 120,
    fileSize: '4.3 MB',
    hasAnswerKey: true,
    description: 'National entrance examination with detailed chemical bonding, hybridization, solution thermodynamics, and equilibrium.',
    questions: EXAM_PRACTICE_QUESTIONS.filter((q) => q.subject === 'chemistry'),
  },

  // =========================================================================
  // 📈 SOCIAL SCIENCE STREAM - OFFICIAL EUEE NATIONAL EXAMS
  // =========================================================================
  {
    id: 'euee-soc-econ-2024',
    title: '2024 EUEE Economics National Examination (Social Science)',
    titleAmharic: 'የ 2024 የ 12ኛ ክፍል ኢኮኖሚክስ ብሔራዊ ፈተና (ማህበራዊ ሳይንስ)',
    titleOromo: 'Qormaata Biyyooleessaa Ikonomiksii EUEE 2024',
    grade: 12,
    stream: 'social_science',
    isEsslce: true,
    subject: 'economics',
    year: 2024,
    region: 'National (EAES / MoE)',
    language: 'en',
    totalQuestions: 65,
    timeAllowedMinutes: 120,
    fileSize: '3.9 MB',
    hasAnswerKey: true,
    description: 'Official national exam on National Income (GDP/GNP), consumer demand elasticity, market structures, inflation, and Ethiopian macroeconomic policies.',
    questions: EXAM_PRACTICE_QUESTIONS.filter((q) => q.subject === 'economics'),
  },
  {
    id: 'euee-soc-hist-2024',
    title: '2024 EUEE History National Examination (Social Science)',
    titleAmharic: 'የ 2024 የ 12ኛ ክፍል ታሪክ ብሔራዊ ፈተና (ማህበራዊ ሳይንስ)',
    titleOromo: 'Qormaata Biyyooleessaa Seenaa EUEE 2024',
    grade: 12,
    stream: 'social_science',
    isEsslce: true,
    subject: 'history',
    year: 2024,
    region: 'National (EAES / MoE)',
    language: 'en',
    totalQuestions: 65,
    timeAllowedMinutes: 120,
    fileSize: '4.1 MB',
    hasAnswerKey: true,
    description: '19th-century state unification, Battle of Adwa (1896), Treaty of Wuchale analysis, Gondarine era, and modern Ethiopian history.',
    questions: EXAM_PRACTICE_QUESTIONS.filter((q) => q.subject === 'history'),
  },
  {
    id: 'euee-soc-geo-2024',
    title: '2024 EUEE Geography National Examination (Social Science)',
    titleAmharic: 'የ 2024 የ 12ኛ ክፍል ጂኦግራፊ ብሔራዊ ፈተና (ማህበራዊ ሳይንስ)',
    titleOromo: 'Qormaata Biyyooleessaa Ji\'oogiraafii EUEE 2024',
    grade: 12,
    stream: 'social_science',
    isEsslce: true,
    subject: 'geography',
    year: 2024,
    region: 'National (EAES / MoE)',
    language: 'en',
    totalQuestions: 65,
    timeAllowedMinutes: 120,
    fileSize: '4.4 MB',
    hasAnswerKey: true,
    description: 'GIS and remote sensing, Ethiopian drainage basins, topography, agro-ecological classifications, and population demographics.',
    questions: EXAM_PRACTICE_QUESTIONS.filter((q) => q.subject === 'geography'),
  },
  {
    id: 'euee-soc-math-2024',
    title: '2024 EUEE Mathematics National Examination (Social Science)',
    titleAmharic: 'የ 2024 የ 12ኛ ክፍል ሒሳብ ብሔራዊ ፈተና (ማህበራዊ ሳይንስ)',
    titleOromo: 'Qormaata Biyyooleessaa Herregaa EUEE 2024 (Hawaasaa)',
    grade: 12,
    stream: 'social_science',
    isEsslce: true,
    subject: 'mathematics_social',
    year: 2024,
    region: 'National (EAES / MoE)',
    language: 'en',
    totalQuestions: 60,
    timeAllowedMinutes: 120,
    fileSize: '4.2 MB',
    hasAnswerKey: true,
    description: 'Matrices, linear programming, financial interest computations, probability, and business calculus for social sciences.',
    questions: EXAM_PRACTICE_QUESTIONS.filter((q) => q.subject === 'mathematics_social' || q.subject === 'mathematics'),
  },
  {
    id: 'euee-soc-econ-2023',
    title: '2023 EUEE Economics National Examination (Social Science)',
    titleAmharic: 'የ 2023 የ 12ኛ ክፍል ኢኮኖሚክስ ብሔራዊ ፈተና',
    titleOromo: 'Qormaata Biyyooleessaa Ikonomiksii EUEE 2023',
    grade: 12,
    stream: 'social_science',
    isEsslce: true,
    subject: 'economics',
    year: 2023,
    region: 'National (EAES / MoE)',
    language: 'en',
    totalQuestions: 65,
    timeAllowedMinutes: 120,
    fileSize: '3.7 MB',
    hasAnswerKey: true,
    description: 'Demand elasticity, cost curves, market types, monetary policy, and public finance in Ethiopia.',
    questions: EXAM_PRACTICE_QUESTIONS.filter((q) => q.subject === 'economics'),
  },

  // =========================================================================
  // 📚 COMMON CORE - ENGLISH & SCHOLASTIC APTITUDE
  // =========================================================================
  {
    id: 'euee-com-eng-2024',
    title: '2024 EUEE English Language National Examination',
    titleAmharic: 'የ 2024 የ 12ኛ ክፍል የእንግሊዝኛ ቋንቋ ብሔራዊ ፈተና',
    titleOromo: 'Qormaata Biyyooleessaa Afaan Ingilizii EUEE 2024',
    grade: 12,
    stream: 'both',
    isEsslce: true,
    subject: 'english',
    year: 2024,
    region: 'National (EAES / MoE)',
    language: 'en',
    totalQuestions: 80,
    timeAllowedMinutes: 120,
    fileSize: '3.8 MB',
    hasAnswerKey: true,
    description: 'Standardized reading comprehension, vocabulary in context, conditionals, reported speech, passive voice, and paragraph organization.',
    questions: EXAM_PRACTICE_QUESTIONS.filter((q) => q.subject === 'english'),
  },
  {
    id: 'euee-com-eng-2023',
    title: '2023 EUEE English Language National Examination',
    titleAmharic: 'የ 2023 የ 12ኛ ክፍል የእንግሊዝኛ ቋንቋ ብሔራዊ ፈተና',
    titleOromo: 'Qormaata Biyyooleessaa Afaan Ingilizii EUEE 2023',
    grade: 12,
    stream: 'both',
    isEsslce: true,
    subject: 'english',
    year: 2023,
    region: 'National (EAES / MoE)',
    language: 'en',
    totalQuestions: 80,
    timeAllowedMinutes: 120,
    fileSize: '3.5 MB',
    hasAnswerKey: true,
    description: 'Analytical reading, communicative English, structural grammar, and error identification.',
    questions: EXAM_PRACTICE_QUESTIONS.filter((q) => q.subject === 'english'),
  }
];

export const ExamService = {
  /**
   * Get filtered questions for practice quiz
   */
  getQuestionsForQuiz(
    grade: GradeLevel = 12,
    subject: SubjectCategory | 'all' = 'all',
    count: number = 10,
    stream: 'natural_science' | 'social_science' | 'all' = 'all'
  ): QuizQuestion[] {
    let pool = [...EXAM_PRACTICE_QUESTIONS];

    if (subject !== 'all') {
      pool = pool.filter((q) => q.subject === subject);
    }

    if (stream !== 'all') {
      pool = pool.filter((q) => q.stream === stream || q.stream === 'both' || !q.stream);
    }

    // Shuffle pool
    const shuffled = pool.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, Math.min(count, shuffled.length));
  },

  /**
   * Retrieve dynamic EUEE exam packs (Separated by subject)
   */
  getExamPacks(
    grade: GradeLevel = 12,
    subject?: SubjectCategory | 'all',
    language?: string,
    stream?: 'natural_science' | 'social_science' | 'all'
  ): ExamPack[] {
    const customPacks = this.getCustomExamPacks();

    const physicsMockPack: ExamPack = {
      id: 'euee-mock-physics',
      title: 'EUEE Physics High-Yield Entrance Exam',
      titleAmharic: 'የ 12ኛ ክፍል ፊዚክስ ከፍተኛ ውጤት ማምጫ የፈተና ፓኬጅ (EUEE)',
      titleOromo: 'Qormaata Qophii Fiiziksii EUEE',
      description: 'High-yield entrance questions on Thermodynamics, 2D Motion, Newton laws, Electromagnetism, and Energy from Grades 9 to 12.',
      grade: 12,
      stream: 'natural_science',
      subject: 'physics',
      language: 'en',
      timeLimitMinutes: 60,
      questions: EXAM_PRACTICE_QUESTIONS.filter((q) => q.subject === 'physics'),
      isCustom: false,
    };

    const chemMockPack: ExamPack = {
      id: 'euee-mock-chemistry',
      title: 'EUEE Chemistry High-Yield Entrance Exam',
      titleAmharic: 'የ 12ኛ ክፍል ኬሚስትሪ ከፍተኛ ውጤት ማምጫ የፈተና ፓኬጅ (EUEE)',
      titleOromo: 'Qormaata Qophii Keemistirii EUEE',
      description: 'High-yield questions on Acid-Base equilibria, Buffers, VSEPR bonding, Stoichiometry, and Organic Chemistry.',
      grade: 12,
      stream: 'natural_science',
      subject: 'chemistry',
      language: 'en',
      timeLimitMinutes: 60,
      questions: EXAM_PRACTICE_QUESTIONS.filter((q) => q.subject === 'chemistry'),
      isCustom: false,
    };

    const bioMockPack: ExamPack = {
      id: 'euee-mock-biology',
      title: 'EUEE Biology High-Yield Entrance Exam',
      titleAmharic: 'የ 12ኛ ክፍል ባዮሎጂ ከፍተኛ ውጤት ማምጫ የፈተና ፓኬጅ (EUEE)',
      titleOromo: 'Qormaata Qophii Baayoloojii EUEE',
      description: 'Essential entrance questions on Cell Biology, Genetics, Molecular Biology, Human Physiology, and Ecology.',
      grade: 12,
      stream: 'natural_science',
      subject: 'biology',
      language: 'en',
      timeLimitMinutes: 60,
      questions: EXAM_PRACTICE_QUESTIONS.filter((q) => q.subject === 'biology'),
      isCustom: false,
    };

    const mathNaturalPack: ExamPack = {
      id: 'euee-mock-math-natural',
      title: 'EUEE Mathematics (Natural) High-Yield Entrance Exam',
      titleAmharic: 'የ 12ኛ ክፍል ሒሳብ (ተፈጥሮ ሳይንስ) ከፍተኛ ውጤት ማምጫ የፈተና ፓኬጅ (EUEE)',
      titleOromo: 'Qormaata Qophii Herregaa (Uumamaa) EUEE',
      description: 'Limits and Continuity, Differential Calculus, Integration, Vectors & 3D Geometry, Complex Numbers, and Matrices.',
      grade: 12,
      stream: 'natural_science',
      subject: 'mathematics',
      language: 'en',
      timeLimitMinutes: 60,
      questions: EXAM_PRACTICE_QUESTIONS.filter((q) => q.subject === 'mathematics' || q.subject === 'mathematics_natural'),
      isCustom: false,
    };

    const mathSocialPack: ExamPack = {
      id: 'euee-mock-math-social',
      title: 'EUEE Mathematics (Social) High-Yield Entrance Exam',
      titleAmharic: 'የ 12ኛ ክፍል ሒሳብ (ማህበራዊ ሳይንስ) ከፍተኛ ውጤት ማምጫ የፈተና ፓኬጅ (EUEE)',
      titleOromo: 'Qormaata Qophii Herregaa (Hawaasaa) EUEE',
      description: 'Matrices, Determinants, Linear Programming, Financial Mathematics, Probability, Statistics, and Introductory Calculus.',
      grade: 12,
      stream: 'social_science',
      subject: 'mathematics_social',
      language: 'en',
      timeLimitMinutes: 60,
      questions: EXAM_PRACTICE_QUESTIONS.filter((q) => q.subject === 'mathematics_social' || (q.subject === 'mathematics' && q.grade <= 10)),
      isCustom: false,
    };

    const englishMockPack: ExamPack = {
      id: 'euee-mock-english',
      title: 'EUEE English Language High-Yield Entrance Exam',
      titleAmharic: 'የ 12ኛ ክፍል እንግሊዝኛ ቋንቋ ከፍተኛ ውጤት ማምጫ የፈተና ፓኬጅ (EUEE)',
      titleOromo: 'Qormaata Qophii Afaan Ingilizii EUEE',
      description: 'Reading Comprehension, Conditionals, Reported Speech, Passive Voice, Grammar Structures, and Vocabulary in Context.',
      grade: 12,
      stream: 'both',
      subject: 'english',
      language: 'en',
      timeLimitMinutes: 60,
      questions: EXAM_PRACTICE_QUESTIONS.filter((q) => q.subject === 'english'),
      isCustom: false,
    };

    const econMockPack: ExamPack = {
      id: 'euee-mock-economics',
      title: 'EUEE Economics High-Yield Entrance Exam',
      titleAmharic: 'የ 12ኛ ክፍል ኢኮኖሚክስ ከፍተኛ ውጤት ማምጫ የፈተና ፓኬጅ (EUEE)',
      titleOromo: 'Qormaata Qophii Ikonomiksii EUEE',
      description: 'Essential questions on GDP calculations, Elasticity, Inflation, Fiscal policy, and Ethiopian economic growth.',
      grade: 12,
      stream: 'social_science',
      subject: 'economics',
      language: 'en',
      timeLimitMinutes: 60,
      questions: EXAM_PRACTICE_QUESTIONS.filter((q) => q.subject === 'economics'),
      isCustom: false,
    };

    const historyMockPack: ExamPack = {
      id: 'euee-mock-history',
      title: 'EUEE History High-Yield Entrance Exam',
      titleAmharic: 'የ 12ኛ ክፍል ታሪክ ከፍተኛ ውጤት ማምጫ የፈተና ፓኬጅ (EUEE)',
      titleOromo: 'Qormaata Qophii Seenaa EUEE',
      description: 'Crucial entrance questions on 19th Century State Formation, Treaty of Wuchale, Battle of Adwa, and Ethiopian leaders.',
      grade: 12,
      stream: 'social_science',
      subject: 'history',
      language: 'en',
      timeLimitMinutes: 60,
      questions: EXAM_PRACTICE_QUESTIONS.filter((q) => q.subject === 'history'),
      isCustom: false,
    };

    const geoMockPack: ExamPack = {
      id: 'euee-mock-geography',
      title: 'EUEE Geography High-Yield Entrance Exam',
      titleAmharic: 'የ 12ኛ ክፍል ጂኦግራፊ ከፍተኛ ውጤት ማምጫ የፈተና ፓኬጅ (EUEE)',
      titleOromo: "Qormaata Qophii Ji'oogiraafii EUEE",
      description: 'Topographic Map Reading, Climate & Weather, Geomorphology, Demographics, and Natural Resources of Ethiopia.',
      grade: 12,
      stream: 'social_science',
      subject: 'geography',
      language: 'en',
      timeLimitMinutes: 60,
      questions: EXAM_PRACTICE_QUESTIONS.filter((q) => q.subject === 'geography'),
      isCustom: false,
    };

    const civicsMockPack: ExamPack = {
      id: 'euee-mock-citizenship',
      title: 'EUEE Citizenship Education High-Yield Entrance Exam',
      titleAmharic: 'የ 12ኛ ክፍል የዜግነት ትምህርት ከፍተኛ ውጤት ማምጫ የፈተና ፓኬጅ (EUEE)',
      titleOromo: 'Qormaata Qophii Barnoota Lammummaa EUEE',
      description: 'Ethiopian Constitutional Law, Democratic Governance, Human Rights, Rule of Law, and Civic Responsibilities.',
      grade: 12,
      stream: 'both',
      subject: 'citizenship',
      language: 'en',
      timeLimitMinutes: 60,
      questions: EXAM_PRACTICE_QUESTIONS.filter((q) => q.subject === 'citizenship'),
      isCustom: false,
    };

    const satNaturalPack: ExamPack = {
      id: 'euee-mock-sat-natural',
      title: 'EUEE Scholastic Aptitude Test (SAT) - Natural Science',
      titleAmharic: 'የ 12ኛ ክፍል አጠቃላይ የክህሎት ፈተና (SAT) - ተፈጥሮ ሳይንስ',
      titleOromo: "Qormaata Ga'umsa Barnootaa (SAT) - Saayinsii Uumamaa EUEE",
      description: 'Quantitative reasoning, number series, spatial logic, rate problems, and data interpretation for Natural Science stream students.',
      grade: 12,
      stream: 'natural_science',
      subject: 'sat',
      language: 'en',
      timeLimitMinutes: 90,
      questions: EXAM_PRACTICE_QUESTIONS.filter((q) => q.subject === 'sat' && (q.stream === 'natural_science' || q.stream === 'both')),
      isCustom: false,
    };

    const satSocialPack: ExamPack = {
      id: 'euee-mock-sat-social',
      title: 'EUEE Scholastic Aptitude Test (SAT) - Social Science',
      titleAmharic: 'የ 12ኛ ክፍል አጠቃላይ የክህሎት ፈተና (SAT) - ማህበራዊ ሳይንስ',
      titleOromo: "Qormaata Ga'umsa Barnootaa (SAT) - Saayinsii Hawaasaa EUEE",
      description: 'Verbal analogies, logical syllogisms, numerical percentages, seating arrangement deductions, and vocabulary in context.',
      grade: 12,
      stream: 'social_science',
      subject: 'sat',
      language: 'en',
      timeLimitMinutes: 90,
      questions: EXAM_PRACTICE_QUESTIONS.filter((q) => q.subject === 'sat' && (q.stream === 'social_science' || q.stream === 'both')),
      isCustom: false,
    };

    const all = [
      physicsMockPack,
      chemMockPack,
      bioMockPack,
      mathNaturalPack,
      mathSocialPack,
      englishMockPack,
      satNaturalPack,
      satSocialPack,
      econMockPack,
      historyMockPack,
      geoMockPack,
      civicsMockPack,
      ...customPacks,
    ];

    return all.filter((p) => {
      if (subject && subject !== 'all') {
        if (subject === 'mathematics' && (p.subject === 'mathematics' || p.subject === 'mathematics_natural' || p.subject === 'mathematics_social')) {
          // match
        } else if (p.subject !== subject) {
          return false;
        }
      }
      if (stream && stream !== 'all' && p.stream && p.stream !== 'both' && p.stream !== stream) return false;
      return true;
    });
  },

  /**
   * Get custom exam packs from storage
   */
  getCustomExamPacks(): ExamPack[] {
    try {
      const data = localStorage.getItem(STORAGE_KEY_CUSTOM_EXAM_PACKS);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },

  /**
   * Save or update an exam pack
   */
  saveExamPack(pack: ExamPack): void {
    const existing = this.getCustomExamPacks();
    const idx = existing.findIndex((p) => p.id === pack.id);
    if (idx >= 0) {
      existing[idx] = { ...pack, isCustom: true };
    } else {
      existing.unshift({
        ...pack,
        id: pack.id || `custom-exam-${Date.now()}`,
        isCustom: true,
        createdAt: new Date().toISOString(),
      });
    }
    localStorage.setItem(STORAGE_KEY_CUSTOM_EXAM_PACKS, JSON.stringify(existing));
  },

  /**
   * Delete an exam pack
   */
  deleteExamPack(id: string): void {
    const existing = this.getCustomExamPacks();
    const filtered = existing.filter((p) => p.id !== id);
    localStorage.setItem(STORAGE_KEY_CUSTOM_EXAM_PACKS, JSON.stringify(filtered));
  },

  /**
   * Get all past exam papers (combines default + admin uploaded)
   */
  getPastPapers(
    grade?: GradeLevel,
    subject?: SubjectCategory | 'all',
    language?: string,
    stream?: 'natural_science' | 'social_science' | 'all'
  ): PastExamPaper[] {
    const customPapers = this.getCustomPastPapers();
    const all = [...customPapers, ...DEFAULT_PAST_PAPERS];

    return all.filter((p) => {
      if (grade && p.grade !== grade) return false;
      if (subject && subject !== 'all' && p.subject !== subject) return false;
      if (stream && stream !== 'all' && p.stream && p.stream !== 'both' && p.stream !== stream) return false;
      if (language && language !== 'all' && p.language && p.language !== language) return false;
      return true;
    });
  },

  /**
   * Get custom past papers from storage
   */
  getCustomPastPapers(): PastExamPaper[] {
    try {
      const data = localStorage.getItem(STORAGE_KEY_PAST_PAPERS);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },

  /**
   * Save or update a past exam paper
   */
  savePastPaper(paper: PastExamPaper): void {
    const existing = this.getCustomPastPapers();
    const idx = existing.findIndex((p) => p.id === paper.id);
    if (idx >= 0) {
      existing[idx] = { ...paper, isCustomUploaded: true };
    } else {
      existing.unshift({
        ...paper,
        id: paper.id || `past-paper-${Date.now()}`,
        isCustomUploaded: true,
      });
    }
    localStorage.setItem(STORAGE_KEY_PAST_PAPERS, JSON.stringify(existing));
  },

  /**
   * Delete a past exam paper
   */
  deletePastPaper(id: string): void {
    const existing = this.getCustomPastPapers();
    const filtered = existing.filter((p) => p.id !== id);
    localStorage.setItem(STORAGE_KEY_PAST_PAPERS, JSON.stringify(filtered));
  },
};
