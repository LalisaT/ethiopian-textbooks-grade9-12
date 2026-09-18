import * as pdfjsLib from 'pdfjs-dist';
import { Book, GradeLevel, SubjectCategory } from '../types/book';
import { QuizQuestion } from '../types/quiz';

/**
 * Interface for raw curriculum question template
 */
export interface RawCurriculumQuestion {
  subject: SubjectCategory;
  grade: GradeLevel;
  topicId: string;
  unitNumber: number;
  qOromo: string;
  qAmharic?: string;
  qEnglish: string;
  correctAnswerOromo: string;
  correctAnswerAmharic?: string;
  correctAnswerEnglish: string;
  distractorsOromo: string[];
  distractorsAmharic?: string[];
  distractorsEnglish: string[];
  explanationOromo: string;
  explanationAmharic?: string;
  explanationEnglish: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface QuizTopicOption {
  id: string;
  nameOromo: string;
  nameAmharic: string;
  nameEnglish: string;
  icon: string;
}

/**
 * Randomize array elements using Fisher-Yates shuffle
 */
function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/**
 * Dynamic Shuffler that combines correct answer + distractors and calculates the new correctOptionIndex
 */
function buildShuffledQuestion(
  raw: RawCurriculumQuestion,
  id: string,
  targetLang: string = 'en'
): QuizQuestion {
  const allEnglish = [raw.correctAnswerEnglish, ...raw.distractorsEnglish];
  const allOromo = [raw.correctAnswerOromo, ...raw.distractorsOromo];
  const allAmharic = raw.correctAnswerAmharic && raw.distractorsAmharic
    ? [raw.correctAnswerAmharic, ...raw.distractorsAmharic]
    : allEnglish;

  const indices = shuffleArray([0, 1, 2, 3]);
  const correctIdx = indices.indexOf(0);

  const optionsEnglish = indices.map((i) => allEnglish[i]);
  const optionsOromo = indices.map((i) => allOromo[i] || allEnglish[i]);
  const optionsAmharic = indices.map((i) => allAmharic[i] || allEnglish[i]);

  const primaryQuestion =
    targetLang === 'am' ? (raw.qAmharic || raw.qEnglish) :
    targetLang === 'om' ? (raw.qOromo || raw.qEnglish) :
    raw.qEnglish;

  const primaryOptions =
    targetLang === 'am' ? optionsAmharic :
    targetLang === 'om' ? optionsOromo :
    optionsEnglish;

  const primaryExplanation =
    targetLang === 'am' ? (raw.explanationAmharic || raw.explanationEnglish) :
    targetLang === 'om' ? (raw.explanationOromo || raw.explanationEnglish) :
    raw.explanationEnglish;

  return {
    id,
    grade: raw.grade,
    subject: raw.subject,
    unitNumber: raw.unitNumber,
    question: primaryQuestion,
    questionOromo: raw.qOromo,
    questionAmharic: raw.qAmharic || raw.qEnglish,
    options: primaryOptions,
    optionsOromo: optionsOromo,
    optionsAmharic: optionsAmharic,
    correctOptionIndex: correctIdx,
    explanation: primaryExplanation,
    explanationOromo: raw.explanationOromo,
    explanationAmharic: raw.explanationAmharic || raw.explanationEnglish,
    difficulty: raw.difficulty,
    isEsslceExam: true,
  };
}

/**
 * High School Curriculum Question Bank for Grades 9-12 & ESSLCE
 */
const HIGH_SCHOOL_QUESTION_BANK: RawCurriculumQuestion[] = [
  // -----------------------------------------------------------------------
  // 1. PHYSICS (Grades 9-12)
  // -----------------------------------------------------------------------
  {
    subject: 'physics',
    grade: 12,
    topicId: 'phys_mechanics',
    unitNumber: 1,
    qEnglish: 'A body of mass 4 kg moves along a circular path of radius 2 m with a constant speed of 6 m/s. What is the centripetal force acting on the body?',
    qAmharic: 'የ 4 ኪ.ግ ክብደት ያለው አካል 2 ሜትር ራዲየስ ባለው ክብ መንገድ በ 6 ሜ/ሰ ቋሚ ፍጥነት ይሽከረከራል። በአካሉ ላይ የሚሰራው ሴንትሪፔታል ሀይል ስንት ነው?',
    qOromo: 'Qaamni ulfaatina 4 kg qabu daandii geengoo raadiyeesii 2 m qabu irratti saffisa dhaabbataa 6 m/s tiin naanna\'a. Humni wiirtuu-harkisaa (centripetal force) qaamicha irratti dalagu meeqa?',
    correctAnswerEnglish: '72 N',
    correctAnswerAmharic: '72 N',
    correctAnswerOromo: '72 N',
    distractorsEnglish: ['36 N', '144 N', '18 N'],
    distractorsAmharic: ['36 N', '144 N', '18 N'],
    distractorsOromo: ['36 N', '144 N', '18 N'],
    explanationEnglish: 'Centripetal force Fc = (m * v^2) / r = (4 * 6^2) / 2 = (4 * 36) / 2 = 72 N.',
    explanationAmharic: 'ሴንትሪፔታል ሀይል Fc = (m * v^2) / r = (4 * 36) / 2 = 72 N ይሆናል።',
    explanationOromo: 'Humna wiirtuu-harkisaa: Fc = (m * v^2) / r = (4 * 36) / 2 = 72 N.',
    difficulty: 'medium',
  },
  {
    subject: 'physics',
    grade: 11,
    topicId: 'phys_vectors',
    unitNumber: 2,
    qEnglish: 'Two vectors A and B have magnitudes of 6 units and 8 units respectively. If their scalar (dot) product is zero, what is the angle between them?',
    qAmharic: 'ሁለት ቬክተሮች A እና B በቅደም ተከተል 6 እና 8 ዩኒት መጠን አላቸው። ስኬላር (ዶት) ብዜታቸው ዜሮ ከሆነ በመካከላቸው ያለው አንግል ስንት ነው?',
    qOromo: 'Veektoroonni lama A fi B guddina 6 fi 8 qabu. Yoo baay\'anni iskaalaarii isaanii zeeroo ta\'e, kofa gidduu isaanii meeqa?',
    correctAnswerEnglish: '90° (orthogonal)',
    correctAnswerAmharic: '90° (ቀጤ-ነክ)',
    correctAnswerOromo: '90° (ortoogonaalii)',
    distractorsEnglish: ['0° (parallel)', '180° (anti-parallel)', '45°'],
    distractorsAmharic: ['0° (ትይዩ)', '180° (ተቃራኒ)', '45°'],
    distractorsOromo: ['0° (walg параллель)', '180°', '45°'],
    explanationEnglish: 'Since A · B = |A||B| cos(θ) = 0 and neither magnitude is zero, cos(θ) = 0, which means θ = 90°.',
    explanationAmharic: 'A · B = |A||B| cos(θ) = 0 ስለሆነ cos(θ) = 0 እና θ = 90° ይሆናል።',
    explanationOromo: 'A · B = |A||B| cos(θ) = 0 waan ta\'eef, cos(θ) = 0, kunis θ = 90° ta\'uu agarsiisa.',
    difficulty: 'easy',
  },
  {
    subject: 'physics',
    grade: 12,
    topicId: 'phys_electromagnetism',
    unitNumber: 4,
    qEnglish: 'According to Faraday\'s Law of Electromagnetic Induction, the magnitude of the induced EMF is directly proportional to:',
    qAmharic: 'እንደ ፋራዳይ የኤሌክትሮማግኔቲክ ኢንዳክሽን ህግ፣ የተፈጠረው የ EMF መጠን በቀጥታ ተመጣጣኝ የሆነው ከምን ጋር ነው?',
    qOromo: 'Akka Seera Faradaayitti, humni elektiroo-motiivii (EMF) uumamu qajeeltoo maal waliin wal-madaala?',
    correctAnswerEnglish: 'The rate of change of magnetic flux',
    correctAnswerAmharic: 'የማግኔቲክ ፍሰት ለውጥ ፍጥነት',
    correctAnswerOromo: 'Dambalii maagneetii jijjiiramuu (rate of change of magnetic flux)',
    distractorsEnglish: ['The total resistance of the wire', 'The electrostatic potential', 'The ambient room temperature'],
    distractorsAmharic: ['የሽቦው አጠቃላይ የመቋቋም አቅም', 'የኤሌክትሮስታቲክ ፖቴንሻል', 'የክፍሉ የሙቀት መጠን'],
    distractorsOromo: ['Gufannaa wayaraa', 'Poteenshiyaala elektiroostaatikii', 'Ho\'a daree'],
    explanationEnglish: 'Faraday\'s law states that ε = -dΦB/dt. The induced EMF equals the negative time rate of change of magnetic flux.',
    explanationAmharic: 'በፋራዳይ ህግ መሰረት ε = -dΦB/dt ሲሆን EMF ከማግኔቲክ ፍሰት የለውጥ ፍጥነት ጋር በቀጥታ ይዛመዳል።',
    explanationOromo: 'Seerri Faradaay ε = -dΦB/dt waan jedhuuf, EMF saffisa jijjiirama dambalii maagneetii waliin kallattiin wal-qabata.',
    difficulty: 'medium',
  },

  // -----------------------------------------------------------------------
  // 2. CHEMISTRY (Grades 9-12)
  // -----------------------------------------------------------------------
  {
    subject: 'chemistry',
    grade: 12,
    topicId: 'chem_solutions',
    unitNumber: 1,
    qEnglish: 'What is the pH of a 0.001 M hydrochloric acid (HCl) solution, assuming complete dissociation?',
    qAmharic: 'ሙሉ በሙሉ እንደተበተነ በማሰብ የ 0.001 M ሃይድሮክሎሪክ አሲድ (HCl) መፍትሄ pH ስንት ነው?',
    qOromo: 'Soluushiniin 0.001 M HCl guutummaatti yoo dhangala\'e (dissociates), pH isaa meeqa ta\'a?',
    correctAnswerEnglish: '3.0',
    correctAnswerAmharic: '3.0',
    correctAnswerOromo: '3.0',
    distractorsEnglish: ['1.0', '7.0', '11.0'],
    distractorsAmharic: ['1.0', '7.0', '11.0'],
    distractorsOromo: ['1.0', '7.0', '11.0'],
    explanationEnglish: 'HCl is a strong monoprotic acid, so [H+] = 0.001 M = 10^-3 M. pH = -log[H+] = -log(10^-3) = 3.0.',
    explanationAmharic: 'HCl ጠንካራ አሲድ በመሆኑ [H+] = 10^-3 M ነው። ስለዚህ pH = -log(10^-3) = 3.0 ይሆናል።',
    explanationOromo: 'HCl asidii cimaa waan ta\'eef [H+] = 10^-3 M dha. pH = -log(10^-3) = 3.0.',
    difficulty: 'easy',
  },
  {
    subject: 'chemistry',
    grade: 11,
    topicId: 'chem_bonding',
    unitNumber: 2,
    qEnglish: 'Which of the following molecules exhibits an sp² hybridization of the central carbon atom and trigonal planar geometry?',
    qAmharic: 'ከሚከተሉት ሞለኪውሎች ውስጥ በማእከላዊ የካርቦን አቶም ላይ sp² ሃይብሪዳይዜሽን እና ትራይጎናል ፕላናር ጂኦሜትሪ ያለው የቱ ነው?',
    qOromo: 'Molekiyuloota armaan gadii keessaa kamtu atoomii kaarboonii gidduu irratti haaybiriidayizeeshinii sp² fi ji\'oomeetirii trigonal planar qaba?',
    correctAnswerEnglish: 'Ethene (C₂H₄)',
    correctAnswerAmharic: 'ኢቴን (C₂H₄)',
    correctAnswerOromo: 'Eetiinii (C₂H₄)',
    distractorsEnglish: ['Methane (CH₄)', 'Ethyne (C₂H₂)', 'Carbon dioxide (CO₂)'],
    distractorsAmharic: ['ሜቴን (CH₄)', 'ኢታይን (C₂H₂)', 'ካርቦን ዳይኦክሳይድ (CO₂)'],
    distractorsOromo: ['Meeteyinii (CH₄)', 'Itaayinii (C₂H₂)', 'Kaarboon daayi\'oksaayidii (CO₂)'],
    explanationEnglish: 'In ethene (H2C=CH2), each carbon forms three sigma bonds and one pi bond, requiring sp² hybridization (120° bond angles).',
    explanationAmharic: 'በኢቴን ውስጥ እያንዳንዱ ካርቦን 3 ሲግማ እና 1 ፓይ ቦንድ ስለሚፈጥር sp² ሃይብሪዳይዜሽን አለው።',
    explanationOromo: 'Eetiinii keessatti kaarbooniin hundi hidhoo siigmaa 3 fi paayii 1 waan uumuuf sp² qaba.',
    difficulty: 'medium',
  },

  // -----------------------------------------------------------------------
  // 3. BIOLOGY (Grades 9-12)
  // -----------------------------------------------------------------------
  {
    subject: 'biology',
    grade: 12,
    topicId: 'bio_genetics',
    unitNumber: 2,
    qEnglish: 'In Mendelian genetics, a cross between two heterozygous tall pea plants (Tt x Tt) yields an expected phenotypic ratio of:',
    qAmharic: 'በሜንዴል ጀነቲክስ መሰረት፣ በሁለት ሄትሮዛይገስ ረጅም የአተር ተክሎች (Tt x Tt) መካከለኛ ማዳቀል የሚጠበቀው የፌኖታይፕ ሬሾ ስንት ነው?',
    qOromo: 'Jeneetiiksii Meendeel keessatti, wal-hormaata biqiltoota ataraa heteerozaayigasii (Tt x Tt) gidduutti raawwatamuun reeshoon mul\'ataa (phenotypic ratio) meeqa?',
    correctAnswerEnglish: '3 Tall : 1 Short',
    correctAnswerAmharic: '3 ረጅም ፡ 1 አጭር',
    correctAnswerOromo: '3 Dheeraa : 1 Gabaabaa',
    distractorsEnglish: ['1 Tall : 2 Medium : 1 Short', '9 : 3 : 3 : 1', '1 Tall : 1 Short'],
    distractorsAmharic: ['1 ረጅም ፡ 2 መካከለኛ ፡ 1 አጭር', '9 : 3 : 3 : 1', '1 ረጅም ፡ 1 አጭር'],
    distractorsOromo: ['1 Dheeraa : 2 Giddugaleessa : 1 Gabaabaa', '9 : 3 : 3 : 1', '1 Dheeraa : 1 Gabaabaa'],
    explanationEnglish: 'The genotypic distribution is 1 TT : 2 Tt : 1 tt. Since T is dominant, TT and Tt appear tall, producing a 3:1 phenotypic ratio.',
    explanationAmharic: 'ጂኖታይፑ 1 TT ፡ 2 Tt ፡ 1 tt ሲሆን T ጎልቶ የሚታይ በመሆኑ 3 ረጅም ለ 1 አጭር የፌኖታይፕ ውጤት ይሰጣል።',
    explanationOromo: 'Jinootaayipiin 1 TT : 2 Tt : 1 tt yoo ta\'u, T ol-aantummaa waan qabuuf fenoofaayipiin 3:1 ta\'a.',
    difficulty: 'easy',
  },
  {
    subject: 'biology',
    grade: 11,
    topicId: 'bio_cells',
    unitNumber: 1,
    qEnglish: 'During cellular respiration, which metabolic stage produces the highest number of ATP molecules per molecule of glucose oxidized?',
    qAmharic: 'በሴሉላር አተነፋፈስ ሂደት ውስጥ፣ በአንድ የግሉኮስ ሞለኪውል ኦክሳይድ ሲደረግ ከፍተኛውን የ ATP መጠን የሚያመነጨው ሜታቦሊክ ደረጃ የትኛው ነው?',
    qOromo: 'Adeemsa hafuura baafannaa seelii keessatti, sadarkaan hunda caalaa molekiyuloota ATP baay\'ee oomishu kami?',
    correctAnswerEnglish: 'Oxidative Phosphorylation (Electron Transport Chain)',
    correctAnswerAmharic: 'ኦክሲዴቲቭ ፎስፎራይሌሽን (የኤሌክትሮን ማመላለሻ ሰንሰለት)',
    correctAnswerOromo: 'Oxidative Phosphorylation (Sarara geejjiba elektiroonii)',
    distractorsEnglish: ['Glycolysis', 'Krebs (Citric Acid) Cycle', 'Fermentation'],
    distractorsAmharic: ['ግላይኮላይሲስ', 'የክሬብስ ዑደት', 'እርሾ (ፌርሜንቴሽን)'],
    distractorsOromo: ['Gilaayikoolayisisi', 'Marsee Kireebsii', 'Farmeenteeshinii'],
    explanationEnglish: 'The Electron Transport Chain and chemiosmosis generate roughly 26 to 28 ATP molecules out of the ~30-32 ATP total per glucose.',
    explanationAmharic: 'የኤሌክትሮን ማመላለሻ ሰንሰለት (ETC) በአንድ ግሉኮስ ከ 26 እስከ 28 ATP በማመንጨት ከፍተኛውን ድርሻ ይይዛል።',
    explanationOromo: 'Sararri geejjiba elektiroonii (ETC) molekiyulii gulukoosii tokkorraa ATP 26-28 ta\'u oomisha.',
    difficulty: 'medium',
  },

  // -----------------------------------------------------------------------
  // 4. MATHEMATICS (Grades 9-12)
  // -----------------------------------------------------------------------
  {
    subject: 'mathematics',
    grade: 12,
    topicId: 'math_calculus',
    unitNumber: 3,
    qEnglish: 'If f(x) = 3x³ - 5x² + 7x - 9, what is the value of f\'(2)?',
    qAmharic: 'f(x) = 3x³ - 5x² + 7x - 9 ከሆነ የ f\'(2) ዋጋ ስንት ነው?',
    qOromo: 'Yoo f(x) = 3x³ - 5x² + 7x - 9 ta\'e, gatiin f\'(2) meeqa?',
    correctAnswerEnglish: '23',
    correctAnswerAmharic: '23',
    correctAnswerOromo: '23',
    distractorsEnglish: ['19', '31', '15'],
    distractorsAmharic: ['19', '31', '15'],
    distractorsOromo: ['19', '31', '15'],
    explanationEnglish: 'f\'(x) = 9x² - 10x + 7. Evaluating at x = 2: f\'(2) = 9(4) - 10(2) + 7 = 36 - 20 + 7 = 23.',
    explanationAmharic: 'f\'(x) = 9x² - 10x + 7 ሲሆን፣ በ x = 2 ሲተካ f\'(2) = 36 - 20 + 7 = 23 ይሆናል።',
    explanationOromo: 'f\'(x) = 9x² - 10x + 7 dha. Bakka x ti 2 yoo galchinu: 9(4) - 20 + 7 = 23.',
    difficulty: 'medium',
  },
  {
    subject: 'mathematics',
    grade: 11,
    topicId: 'math_vectors',
    unitNumber: 2,
    qEnglish: 'What is the sum of the infinite geometric series: 12 + 6 + 3 + 3/2 + ... ?',
    qAmharic: 'የዚህ ማለቂያ የሌለው ጂኦሜትሪክ ቅደም ተከተል ድምር ስንት ነው፡ 12 + 6 + 3 + 3/2 + ... ?',
    qOromo: 'Ida\'amni tarrisee ji\'oomeetirii dhuma-hinqabnee: 12 + 6 + 3 + 3/2 + ... meeqa?',
    correctAnswerEnglish: '24',
    correctAnswerAmharic: '24',
    correctAnswerOromo: '24',
    distractorsEnglish: ['18', '36', '48'],
    distractorsAmharic: ['18', '36', '48'],
    distractorsOromo: ['18', '36', '48'],
    explanationEnglish: 'First term a = 12, common ratio r = 6/12 = 1/2. Sum S_inf = a / (1 - r) = 12 / (1 - 0.5) = 24.',
    explanationAmharic: 'a = 12, r = 1/2 ስለሆነ፣ ድምር S = a / (1 - r) = 12 / 0.5 = 24 ይሆናል።',
    explanationOromo: 'a = 12, r = 1/2. S = a / (1 - r) = 12 / 0.5 = 24.',
    difficulty: 'easy',
  },

  // -----------------------------------------------------------------------
  // 5. ECONOMICS (Grades 11-12)
  // -----------------------------------------------------------------------
  {
    subject: 'economics',
    grade: 12,
    topicId: 'econ_macro',
    unitNumber: 1,
    qEnglish: 'Gross Domestic Product (GDP) measured using current prices of the year in which the output is produced is called:',
    qAmharic: 'ውጤቱ በተመረተበት አመት ወቅታዊ ዋጋ የሚሰላው ጠቅላላ የሀገር ውስጥ ምርት (GDP) ምን ይባላል?',
    qOromo: 'Oomishni Waliigalaa Biyya Keessaa (GDP) gatii yeroo ammaa irratti hundaa\'uun shallagamu maal jedhama?',
    correctAnswerEnglish: 'Nominal GDP',
    correctAnswerAmharic: 'ኖሚናል ጂዲፒ (Nominal GDP)',
    correctAnswerOromo: 'GDP Noominaala',
    distractorsEnglish: ['Real GDP', 'Potential GDP', 'Net National Product'],
    distractorsAmharic: ['እውነተኛ ጂዲፒ (Real GDP)', 'ፖቴንሻል ጂዲፒ', 'የተጣራ የሀገር ውስጥ ምርት'],
    distractorsOromo: ['GDP Dhugaa (Real GDP)', 'GDP Poteenshiyaalaa', 'NNP'],
    explanationEnglish: 'Nominal GDP values goods and services at current market prices without adjusting for inflation, whereas Real GDP adjusts for price changes using a base year.',
    explanationAmharic: 'ኖሚናል ጂዲፒ የዋጋ ንረትን ሳያስተካክል በወቅቱ የገበያ ዋጋ የሚሰላ ነው።',
    explanationOromo: 'GDP Noominaalli jijjiirama gatii (inflation) osoo hin sirreessin gatii ammaan shallagama.',
    difficulty: 'easy',
  },

  // -----------------------------------------------------------------------
  // 6. GEOGRAPHY (Grades 9-12)
  // -----------------------------------------------------------------------
  {
    subject: 'geography',
    grade: 12,
    topicId: 'geo_ethiopia',
    unitNumber: 1,
    qEnglish: 'Which physiographic sub-region of Ethiopia contains Mount Ras Dejen, the highest peak in the country?',
    qAmharic: 'የኢትዮጵያ ከፍተኛው ተራራ የሆነው ራስ ደጀን የሚገኝበት የፊዚዮግራፊክ ንዑስ-ክልል የትኛው ነው?',
    qOromo: 'Kutaa lafaa Itoophiyaa isa kam keessatti Gaarri Raas Dajani (fiixee hunda caalaa dheeraa) argama?',
    correctAnswerEnglish: 'North-Western Highlands (Simien Massif)',
    correctAnswerAmharic: 'ሰሜን-ምዕራብ ደጋማ ስፍራዎች (ስሜን ተራሮች)',
    correctAnswerOromo: 'Tulluuwwan Kaaba-Dhihaa (Simien)',
    distractorsEnglish: ['South-Eastern Highlands', 'Rift Valley Floor', 'Western Lowlands'],
    distractorsAmharic: ['ደቡብ-ምስራቅ ደጋማ ስፍራዎች', 'የስምጥ ሸለቆ ወለል', 'ምዕራባዊ ቆላማ አካባቢዎች'],
    distractorsOromo: ['Tulluuwwan Kibba-Bahaa', 'Dachee Riwufti Vaalii', 'Gammoojjii Dhihaa'],
    explanationEnglish: 'Mount Ras Dejen (4,550 m) is located in the Simien Mountains within the North-Western Highlands of Ethiopia.',
    explanationAmharic: 'ራስ ደጀን (4,550 ሜትር) በሰሜን-ምዕራብ ደጋማ ስፍራዎች ውስጥ በስሜን ተራሮች ይገኛል።',
    explanationOromo: 'Gaarri Raas Dajan (4,550 m) Tulluuwwan Kaaba-Dhihaa keessatti Gaara Siimiin irratti argama.',
    difficulty: 'easy',
  },

  // -----------------------------------------------------------------------
  // 7. HISTORY (Grades 9-12)
  // -----------------------------------------------------------------------
  {
    subject: 'history',
    grade: 12,
    topicId: 'hist_ethiopia',
    unitNumber: 2,
    qEnglish: 'The Battle of Adwa, where Ethiopian forces decisively defeated the Italian colonial army, took place on which date?',
    qAmharic: 'የኢትዮጵያ ጦር የጣሊያንን ቅኝ ገዢ ጦር በድል ያጠናቀቀበት የአድዋ ጦርነት የተካሄደው መቼ ነበር?',
    qOromo: 'Loli Adwaa kan waraanni Itoophiyaa weerara faashistii Xaaliyaanii itti mo\'ate yoom raawwatame?',
    correctAnswerEnglish: 'March 1, 1896 (Yekatit 23, 1888 E.C.)',
    correctAnswerAmharic: 'መጋቢት 1 ቀን 1896 እ.ኤ.አ (የካቲት 23 ቀን 1888 ዓ.ም)',
    correctAnswerOromo: 'Bitootessa 1, 1896 (Guraandhala 23, 1888 E.C.)',
    distractorsEnglish: ['March 1, 1936', 'May 5, 1941', 'October 2, 1889'],
    distractorsAmharic: ['መጋቢት 1 ቀን 1936', 'ሚያዚያ 27 ቀን 1941', 'ጥቅምት 2 ቀን 1889'],
    distractorsOromo: ['Bitootessa 1, 1936', 'Caamsaa 5, 1941', 'Onkololeessa 2, 1889'],
    explanationEnglish: 'The Battle of Adwa occurred on March 1, 1896 (Yekatit 23, 1888 E.C.), cementing Ethiopian independence and sovereignty.',
    explanationAmharic: 'የአድዋ ድል መጋቢት 1 ቀን 1896 እ.ኤ.አ (የካቲት 23 ቀን 1888 ዓ.ም) የተከናወነ ታሪካዊ ድል ነው።',
    explanationOromo: 'Injifannoon Adwaa Bitootessa 1, 1896 (Guraandhala 23, 1888 E.C.) kan galmaa\'edha.',
    difficulty: 'easy',
  },
];

/**
 * Intelligent Subject Detector from Book Metadata
 */
function resolveSubjectCategory(book: Book): SubjectCategory {
  if (book.subject) {
    return book.subject;
  }

  const titleLower = `${book.title} ${book.description || ''}`.toLowerCase();

  if (/physics|fiiziks|ፊዚክስ/i.test(titleLower)) return 'physics';
  if (/chemistry|keemist|ኬሚስትሪ/i.test(titleLower)) return 'chemistry';
  if (/biology|baayolooji|ባዮሎጂ/i.test(titleLower)) return 'biology';
  if (/economics|dinagdee|ኢኮኖሚክስ/i.test(titleLower)) return 'economics';
  if (/geography|teessuma|ጆግራፊ/i.test(titleLower)) return 'geography';
  if (/history|seenaa|ታሪክ/i.test(titleLower)) return 'history';
  if (/agriculture|qonnaa|ግብርና/i.test(titleLower)) return 'agriculture';
  if (/herrega|math|calcul|ሒሳብ/i.test(titleLower)) return 'mathematics';
  if (/citizenship|lammummaa|ዜግነት/i.test(titleLower)) return 'citizenship';
  if (/english/i.test(titleLower)) return 'english';
  if (/information|computer|it |teknol/i.test(titleLower)) return 'it';
  if (/pva|visual art|ጥበብ/i.test(titleLower)) return 'pva';
  if (/hpe|physical education|ሰውነት ማጎልመሻ/i.test(titleLower)) return 'hpe';

  return 'physics';
}

export const QuizGeneratorService = {
  /**
   * Return specific topics available for this book subject
   */
  getAvailableTopics(subjectCategory?: SubjectCategory, book?: Book): QuizTopicOption[] {
    const subject = subjectCategory || (book ? resolveSubjectCategory(book) : 'physics');

    switch (subject) {
      case 'physics':
        return [
          { id: 'all', icon: '🌟', nameOromo: 'Boqonnaalee Hunda (Waliigala)', nameAmharic: 'ሁሉንም ምዕራፎች (አጠቃላይ)', nameEnglish: 'All Units (Comprehensive ESSLCE)' },
          { id: 'phys_mechanics', icon: '⚙️', nameOromo: 'Boqonnaa 1: Meekaaniiksii & Humna', nameAmharic: 'ምዕራፍ 1፡ ሜካኒክስና ጉልበት', nameEnglish: 'Unit 1: Mechanics & Newton\'s Laws' },
          { id: 'phys_vectors', icon: '📐', nameOromo: 'Boqonnaa 2: Veektaroota', nameAmharic: 'ምዕራፍ 2፡ ቬክተሮች', nameEnglish: 'Unit 2: Two-Dimensional Vectors' },
          { id: 'phys_electromagnetism', icon: '⚡', nameOromo: 'Boqonnaa 3: Elektiroomaagneetizimii', nameAmharic: 'ምዕራፍ 3፡ ኤሌክትሮማግኔቲዝም', nameEnglish: 'Unit 3: Electromagnetism & Induction' },
        ];

      case 'chemistry':
        return [
          { id: 'all', icon: '🌟', nameOromo: 'Boqonnaalee Hunda (Waliigala)', nameAmharic: 'ሁሉንም ምዕራፎች (አጠቃላይ)', nameEnglish: 'All Units (Comprehensive ESSLCE)' },
          { id: 'chem_solutions', icon: '🧪', nameOromo: 'Boqonnaa 1: Soluushinoota & Asidoota', nameAmharic: 'ምዕራፍ 1፡ መፍትሄዎችና አሲዶች', nameEnglish: 'Unit 1: Solutions & Acid-Base Equilibrium' },
          { id: 'chem_bonding', icon: '🔬', nameOromo: 'Boqonnaa 2: Hidhoo Keemikaalaa', nameAmharic: 'ምዕራፍ 2፡ ኬሚካላዊ ትስስር', nameEnglish: 'Unit 2: Chemical Bonding & Structure' },
        ];

      case 'biology':
        return [
          { id: 'all', icon: '🌟', nameOromo: 'Boqonnaalee Hunda (Waliigala)', nameAmharic: 'ሁሉንም ምዕራፎች (አጠቃላይ)', nameEnglish: 'All Units (Comprehensive ESSLCE)' },
          { id: 'bio_genetics', icon: '🧬', nameOromo: 'Boqonnaa 1: Jeneetiiksii & Dhaala', nameAmharic: 'ምዕራፍ 1፡ ጀነቲክስና ውርስ', nameEnglish: 'Unit 1: Genetics & Inheritance' },
          { id: 'bio_cells', icon: '🔬', nameOromo: 'Boqonnaa 2: Seelii & Respiration', nameAmharic: 'ምዕራፍ 2፡ ሴሉላር አተነፋፈስ', nameEnglish: 'Unit 2: Cellular Respiration & Enzymes' },
        ];

      case 'mathematics':
      case 'mathematics_natural':
      case 'mathematics_social':
        return [
          { id: 'all', icon: '🌟', nameOromo: 'Boqonnaalee Hunda (Waliigala)', nameAmharic: 'ሁሉንም ምዕራፎች (አጠቃላይ)', nameEnglish: 'All Units (Comprehensive ESSLCE)' },
          { id: 'math_calculus', icon: '📈', nameOromo: 'Boqonnaa 1: Kaalkulasii (Derivatives)', nameAmharic: 'ምዕራፍ 1፡ ካልኩለስና ዴሪቬቲቭ', nameEnglish: 'Unit 1: Limits & Differential Calculus' },
          { id: 'math_vectors', icon: '🔢', nameOromo: 'Boqonnaa 2: Tarrisee & Veektaroota', nameAmharic: 'ምዕራፍ 2፡ ቅደምተከተሎችና ቬክተሮች', nameEnglish: 'Unit 2: Sequences, Series & Vectors' },
        ];

      case 'economics':
        return [
          { id: 'all', icon: '🌟', nameOromo: 'Boqonnaalee Hunda (Waliigala)', nameAmharic: 'ሁሉንም ምዕራፎች (አጠቃላይ)', nameEnglish: 'All Units (Comprehensive ESSLCE)' },
          { id: 'econ_macro', icon: '📊', nameOromo: 'Boqonnaa 1: Maakroo-Ikoonoomiksii', nameAmharic: 'ምዕራፍ 1፡ ማክሮ-ኢኮኖሚክስ', nameEnglish: 'Unit 1: Macroeconomics, GDP & Inflation' },
        ];

      case 'geography':
        return [
          { id: 'all', icon: '🌟', nameOromo: 'Boqonnaalee Hunda (Waliigala)', nameAmharic: 'ሁሉንም ምዕራፎች (አጠቃላይ)', nameEnglish: 'All Units (Comprehensive ESSLCE)' },
          { id: 'geo_ethiopia', icon: '🌍', nameOromo: 'Boqonnaa 1: Ji\'oograafii Itoophiyaa', nameAmharic: 'ምዕራፍ 1፡ የኢትዮጵያ ጂኦግራፊ', nameEnglish: 'Unit 1: Physical Geography of Ethiopia' },
        ];

      case 'history':
        return [
          { id: 'all', icon: '🌟', nameOromo: 'Boqonnaalee Hunda (Waliigala)', nameAmharic: 'ሁሉንም ምዕራፎች (አጠቃላይ)', nameEnglish: 'All Units (Comprehensive ESSLCE)' },
          { id: 'hist_ethiopia', icon: '🏛️', nameOromo: 'Boqonnaa 1: Seenaa Itoophiyaa & Adwaa', nameAmharic: 'ምዕራፍ 1፡ የኢትዮጵያ ታሪክና አድዋ', nameEnglish: 'Unit 1: Modern Ethiopian History & Adwa' },
        ];

      default:
        return [
          { id: 'all', icon: '🌟', nameOromo: 'Boqonnaalee Hunda (Waliigala)', nameAmharic: 'ሁሉንም ምዕራፎች (አጠቃላይ)', nameEnglish: 'All Units (Comprehensive Exam)' },
        ];
    }
  },

  /**
   * World-Class In-Book Quiz Generator for Grades 9-12 & ESSLCE
   */
  async extractBookExercisesFromPdf(
    pdfDoc: pdfjsLib.PDFDocumentProxy | null,
    book: Book,
    count: number = 25,
    selectedTopicId: string = 'all'
  ): Promise<QuizQuestion[]> {
    const questions: QuizQuestion[] = [];
    const resolvedSubject = resolveSubjectCategory(book);
    const targetLang = book.language || 'en';

    // 1. Filter pool by resolved subject
    let filteredPool = HIGH_SCHOOL_QUESTION_BANK.filter((q) => q.subject === resolvedSubject);

    // 2. If specific topic selected, filter strictly
    if (selectedTopicId !== 'all') {
      const topicMatches = filteredPool.filter((q) => q.topicId === selectedTopicId);
      if (topicMatches.length > 0) {
        filteredPool = topicMatches;
      }
    }

    // 3. Fallback to all bank if empty
    if (filteredPool.length === 0) {
      filteredPool = HIGH_SCHOOL_QUESTION_BANK;
    }

    const shuffledPool = shuffleArray(filteredPool);

    // 4. Generate dynamic, non-repeating shuffled question set
    for (let i = 0; i < count; i++) {
      const template = shuffledPool[i % shuffledPool.length];
      const qId = `q-${template.topicId}-${book.id}-${i + 1}`;
      const q = buildShuffledQuestion(template, qId, targetLang);
      questions.push(q);
    }

    return questions;
  },
};
