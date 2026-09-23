import * as pdfjsLib from 'pdfjs-dist';
import { Book, GradeLevel, SubjectCategory } from '../types/book';
import { QuizQuestion } from '../types/quiz';
import { EXAM_PRACTICE_QUESTIONS } from '../data/examQuestions';
import { isQuestionMatchingSubject } from './examSelectorService';
import { generateProceduralQuestion } from './proceduralQuizGenerator';

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
 * High School Curriculum Question Bank for Grades 9-12 & EUEE
 */
const HIGH_SCHOOL_QUESTION_BANK: RawCurriculumQuestion[] = [
  {
    "subject": "physics",
    "grade": 12,
    "topicId": "phys_mechanics",
    "unitNumber": 1,
    "qEnglish": "A body of mass 4 kg moves along a circular path of radius 2 m with a constant speed of 6 m/s. What is the centripetal force acting on the body?",
    "qAmharic": "የ 4 ኪ.ግ ክብደት ያለው አካል 2 ሜትር ራዲየስ ባለው ክብ መንገድ በ 6 ሜ/ሰ ቋሚ ፍጥነት ይሽከረከራል። በአካሉ ላይ የሚሰራው ሴንትሪፔታል ሀይል ስንት ነው?",
    "qOromo": "Qaamni ulfaatina 4 kg qabu daandii geengoo raadiyeesii 2 m qabu irratti saffisa dhaabbataa 6 m/s tiin naanna'a. Humni wiirtuu-harkisaa (centripetal force) qaamicha irratti dalagu meeqa?",
    "correctAnswerEnglish": "72 N",
    "correctAnswerAmharic": "72 N",
    "correctAnswerOromo": "72 N",
    "distractorsEnglish": [
      "36 N",
      "144 N",
      "18 N"
    ],
    "distractorsAmharic": [
      "36 N",
      "144 N",
      "18 N"
    ],
    "distractorsOromo": [
      "36 N",
      "144 N",
      "18 N"
    ],
    "explanationEnglish": "Centripetal force Fc = (m * v^2) / r = (4 * 6^2) / 2 = (4 * 36) / 2 = 72 N.",
    "explanationAmharic": "ሴንትሪፔታል ሀይል Fc = (m * v^2) / r = (4 * 36) / 2 = 72 N ይሆናል።",
    "explanationOromo": "Humna wiirtuu-harkisaa: Fc = (m * v^2) / r = (4 * 36) / 2 = 72 N.",
    "difficulty": "medium"
  },
  {
    "subject": "physics",
    "grade": 11,
    "topicId": "phys_vectors",
    "unitNumber": 2,
    "qEnglish": "Two vectors A and B have magnitudes of 6 units and 8 units respectively. If their scalar (dot) product is zero, what is the angle between them?",
    "qAmharic": "ሁለት ቬክተሮች A እና B በቅደም ተከተል 6 እና 8 ዩኒት መጠን አላቸው። ስኬላር (ዶት) ብዜታቸው ዜሮ ከሆነ በመካከላቸው ያለው አንግል ስንት ነው?",
    "qOromo": "Veektoroonni lama A fi B guddina 6 fi 8 qabu. Yoo baay'anni iskaalaarii isaanii zeeroo ta'e, kofa gidduu isaanii meeqa?",
    "correctAnswerEnglish": "90° (orthogonal)",
    "correctAnswerAmharic": "90° (ቀጤ-ነክ)",
    "correctAnswerOromo": "90° (ortoogonaalii)",
    "distractorsEnglish": [
      "0° (parallel)",
      "180° (anti-parallel)",
      "45°"
    ],
    "distractorsAmharic": [
      "0° (ትይዩ)",
      "180° (ተቃራኒ)",
      "45°"
    ],
    "distractorsOromo": [
      "0° (walg параллель)",
      "180°",
      "45°"
    ],
    "explanationEnglish": "Since A · B = |A||B| cos(θ) = 0 and neither magnitude is zero, cos(θ) = 0, which means θ = 90°.",
    "explanationAmharic": "A · B = |A||B| cos(θ) = 0 ስለሆነ cos(θ) = 0 እና θ = 90° ይሆናል።",
    "explanationOromo": "A · B = |A||B| cos(θ) = 0 waan ta'eef, cos(θ) = 0, kunis θ = 90° ta'uu agarsiisa.",
    "difficulty": "easy"
  },
  {
    "subject": "physics",
    "grade": 12,
    "topicId": "phys_electromagnetism",
    "unitNumber": 4,
    "qEnglish": "According to Faraday's Law of Electromagnetic Induction, the magnitude of the induced EMF is directly proportional to:",
    "qAmharic": "እንደ ፋራዳይ የኤሌክትሮማግኔቲክ ኢንዳክሽን ህግ፣ የተፈጠረው የ EMF መጠን በቀጥታ ተመጣጣኝ የሆነው ከምን ጋር ነው?",
    "qOromo": "Akka Seera Faradaayitti, humni elektiroo-motiivii (EMF) uumamu qajeeltoo maal waliin wal-madaala?",
    "correctAnswerEnglish": "The rate of change of magnetic flux",
    "correctAnswerAmharic": "የማግኔቲክ ፍሰት ለውጥ ፍጥነት",
    "correctAnswerOromo": "Dambalii maagneetii jijjiiramuu (rate of change of magnetic flux)",
    "distractorsEnglish": [
      "The total resistance of the wire",
      "The electrostatic potential",
      "The ambient room temperature"
    ],
    "distractorsAmharic": [
      "የሽቦው አጠቃላይ የመቋቋም አቅም",
      "የኤሌክትሮስታቲክ ፖቴንሻል",
      "የክፍሉ የሙቀት መጠን"
    ],
    "distractorsOromo": [
      "Gufannaa wayaraa",
      "Poteenshiyaala elektiroostaatikii",
      "Ho'a daree"
    ],
    "explanationEnglish": "Faraday's law states that ε = -dΦB/dt. The induced EMF equals the negative time rate of change of magnetic flux.",
    "explanationAmharic": "በፋራዳይ ህግ መሰረት ε = -dΦB/dt ሲሆን EMF ከማግኔቲክ ፍሰት የለውጥ ፍጥነት ጋር በቀጥታ ይዛመዳል።",
    "explanationOromo": "Seerri Faradaay ε = -dΦB/dt waan jedhuuf, EMF saffisa jijjiirama dambalii maagneetii waliin kallattiin wal-qabata.",
    "difficulty": "medium"
  },
  {
    "subject": "physics",
    "grade": 10,
    "topicId": "phys_mechanics",
    "unitNumber": 3,
    "qEnglish": "An object of mass 10 kg is lifted to a height of 5 meters above the ground. Taking g = 9.8 m/s², what is its gravitational potential energy?",
    "qAmharic": "የ 10 ኪ.ግ ክብደት ያለው እቃ ከመሬት በላይ 5 ሜትር ከፍታ ላይ ተነሳ። g = 9.8 m/s² ቢሆን፣ የስበት ፖቴንሻል ሃይሉ (PE) ስንት ጁል ነው?",
    "qOromo": "Qaamni ulfaatina 10 kg qabu lafarraa ol-ka'iinsa 5 m irratti ol-fuudhame. g = 9.8 m/s² yoo ta'e, inarjiin kuusaa harkisa lafaa (PE) meeqa?",
    "correctAnswerEnglish": "490 J",
    "correctAnswerAmharic": "490 ጁል",
    "correctAnswerOromo": "490 J",
    "distractorsEnglish": [
      "50 J",
      "98 J",
      "980 J"
    ],
    "distractorsAmharic": [
      "50 ጁል",
      "98 ጁል",
      "980 ጁል"
    ],
    "distractorsOromo": [
      "50 J",
      "98 J",
      "980 J"
    ],
    "explanationEnglish": "PE = m * g * h = 10 kg * 9.8 m/s² * 5 m = 490 Joules.",
    "explanationAmharic": "PE = mgh = 10 × 9.8 × 5 = 490 ጁል ይሆናል።",
    "explanationOromo": "PE = m * g * h = 10 * 9.8 * 5 = 490 J.",
    "difficulty": "easy"
  },
  {
    "subject": "chemistry",
    "grade": 12,
    "topicId": "chem_solutions",
    "unitNumber": 1,
    "qEnglish": "What is the pH of a 0.001 M hydrochloric acid (HCl) solution, assuming complete dissociation?",
    "qAmharic": "ሙሉ በሙሉ እንደተበተነ በማሰብ የ 0.001 M ሃይድሮክሎሪክ አሲድ (HCl) መፍትሄ pH ስንት ነው?",
    "qOromo": "Soluushiniin 0.001 M HCl guutummaatti yoo dhangala'e (dissociates), pH isaa meeqa ta'a?",
    "correctAnswerEnglish": "3.0",
    "correctAnswerAmharic": "3.0",
    "correctAnswerOromo": "3.0",
    "distractorsEnglish": [
      "1.0",
      "7.0",
      "11.0"
    ],
    "distractorsAmharic": [
      "1.0",
      "7.0",
      "11.0"
    ],
    "distractorsOromo": [
      "1.0",
      "7.0",
      "11.0"
    ],
    "explanationEnglish": "HCl is a strong monoprotic acid, so [H+] = 0.001 M = 10^-3 M. pH = -log[H+] = -log(10^-3) = 3.0.",
    "explanationAmharic": "HCl ጠንካራ አሲድ በመሆኑ [H+] = 10^-3 M ነው። ስለዚህ pH = -log(10^-3) = 3.0 ይሆናል።",
    "explanationOromo": "HCl asidii cimaa waan ta'eef [H+] = 10^-3 M dha. pH = -log(10^-3) = 3.0.",
    "difficulty": "easy"
  },
  {
    "subject": "chemistry",
    "grade": 11,
    "topicId": "chem_bonding",
    "unitNumber": 2,
    "qEnglish": "Which of the following molecules exhibits an sp² hybridization of the central carbon atom and trigonal planar geometry?",
    "qAmharic": "ከሚከተሉት ሞለኪውሎች ውስጥ በማእከላዊ የካርቦን አቶም ላይ sp² ሃይብሪዳይዜሽን እና ትራይጎናል ፕላናር ጂኦሜትሪ ያለው የቱ ነው?",
    "qOromo": "Molekiyuloota armaan gadii keessaa kamtu atoomii kaarboonii gidduu irratti haaybiriidayizeeshinii sp² fi ji'oomeetirii trigonal planar qaba?",
    "correctAnswerEnglish": "Ethene (C₂H₄)",
    "correctAnswerAmharic": "ኢቴን (C₂H₄)",
    "correctAnswerOromo": "Eetiinii (C₂H₄)",
    "distractorsEnglish": [
      "Methane (CH₄)",
      "Ethyne (C₂H₂)",
      "Carbon dioxide (CO₂)"
    ],
    "distractorsAmharic": [
      "ሜቴን (CH₄)",
      "ኢታይን (C₂H₂)",
      "ካርቦን ዳይኦክሳይድ (CO₂)"
    ],
    "distractorsOromo": [
      "Meeteyinii (CH₄)",
      "Itaayinii (C₂H₂)",
      "Kaarboon daayi'oksaayidii (CO₂)"
    ],
    "explanationEnglish": "In ethene (H2C=CH2), each carbon forms three sigma bonds and one pi bond, requiring sp² hybridization (120° bond angles).",
    "explanationAmharic": "በኢቴን ውስጥ እያንዳንዱ ካርቦን 3 ሲግማ እና 1 ፓይ ቦንድ ስለሚፈጥር sp² ሃይብሪዳይዜሽን አለው።",
    "explanationOromo": "Eetiinii keessatti kaarbooniin hundi hidhoo siigmaa 3 fi paayii 1 waan uumuuf sp² qaba.",
    "difficulty": "medium"
  },
  {
    "subject": "chemistry",
    "grade": 12,
    "topicId": "chem_solutions",
    "unitNumber": 2,
    "qEnglish": "Which of the following mixtures forms an effective buffer solution resisting drastic pH changes?",
    "qAmharic": "ከሚከተሉት ውህዶች ውስጥ የ pH ለውጥን በከፍተኛ ሁኔታ የሚከላከል ውጤታማ ባፈር ሶሉሽን የሚሆነው የትኛው ነው?",
    "qOromo": "Makmaata armaan gadii keessaa kamtu soluushinii baafarii (buffer) bu'a-qabeessa uuma?",
    "correctAnswerEnglish": "CH₃COOH and CH₃COONa",
    "correctAnswerAmharic": "CH₃COOH እና CH₃COONa",
    "correctAnswerOromo": "CH₃COOH fi CH₃COONa",
    "distractorsEnglish": [
      "HCl and NaCl",
      "NaOH and NaCl",
      "HNO₃ and KNO₃"
    ],
    "distractorsAmharic": [
      "HCl እና NaCl",
      "NaOH እና NaCl",
      "HNO₃ እና KNO₃"
    ],
    "distractorsOromo": [
      "HCl fi NaCl",
      "NaOH fi NaCl",
      "HNO₃ fi KNO₃"
    ],
    "explanationEnglish": "A buffer requires a weak acid and its conjugate base (e.g. acetic acid CH3COOH and sodium acetate CH3COONa).",
    "explanationAmharic": "ባፈር ሶሉሽን የሚዘጋጀው ደካማ አሲድ እና የተጣመረ ቤዙን (Conjugate base) በማቀላቀል ነው።",
    "explanationOromo": "Baafariin asidii laafaa fi beezii isa deeggaru (conjugate base) irraa tolfama.",
    "difficulty": "medium"
  },
  {
    "subject": "biology",
    "grade": 12,
    "topicId": "bio_genetics",
    "unitNumber": 2,
    "qEnglish": "In Mendelian genetics, a cross between two heterozygous tall pea plants (Tt x Tt) yields an expected phenotypic ratio of:",
    "qAmharic": "በሜንዴል ጀነቲክስ መሰረት፣ በሁለት ሄትሮዛይገስ ረጅም የአተር ተክሎች (Tt x Tt) መካከለኛ ማዳቀል የሚጠበቀው የፌኖታይፕ ሬሾ ስንት ነው?",
    "qOromo": "Jeneetiiksii Meendeel keessatti, wal-hormaata biqiltoota ataraa heteerozaayigasii (Tt x Tt) gidduutti raawwatamuun reeshoon mul'ataa (phenotypic ratio) meeqa?",
    "correctAnswerEnglish": "3 Tall : 1 Short",
    "correctAnswerAmharic": "3 ረጅም ፡ 1 አጭር",
    "correctAnswerOromo": "3 Dheeraa : 1 Gabaabaa",
    "distractorsEnglish": [
      "1 Tall : 2 Medium : 1 Short",
      "9 : 3 : 3 : 1",
      "1 Tall : 1 Short"
    ],
    "distractorsAmharic": [
      "1 ረጅም ፡ 2 መካከለኛ ፡ 1 አጭር",
      "9 : 3 : 3 : 1",
      "1 ረጅም ፡ 1 አጭር"
    ],
    "distractorsOromo": [
      "1 Dheeraa : 2 Giddugaleessa : 1 Gabaabaa",
      "9 : 3 : 3 : 1",
      "1 Dheeraa : 1 Gabaabaa"
    ],
    "explanationEnglish": "The genotypic distribution is 1 TT : 2 Tt : 1 tt. Since T is dominant, TT and Tt appear tall, producing a 3:1 phenotypic ratio.",
    "explanationAmharic": "ጂኖታይፑ 1 TT ፡ 2 Tt ፡ 1 tt ሲሆን T ጎልቶ የሚታይ በመሆኑ 3 ረጅም ለ 1 አጭር የፌኖታይፕ ውጤት ይሰጣል።",
    "explanationOromo": "Jinootaayipiin 1 TT : 2 Tt : 1 tt yoo ta'u, T ol-aantummaa waan qabuuf fenoofaayipiin 3:1 ta'a.",
    "difficulty": "easy"
  },
  {
    "subject": "biology",
    "grade": 11,
    "topicId": "bio_cells",
    "unitNumber": 1,
    "qEnglish": "During cellular respiration, which metabolic stage produces the highest number of ATP molecules per molecule of glucose oxidized?",
    "qAmharic": "በሴሉላር አተነፋፈስ ሂደት ውስጥ፣ በአንድ የግሉኮስ ሞለኪውል ኦክሳይድ ሲደረግ ከፍተኛውን የ ATP መጠን የሚያመነጨው ሜታቦሊክ ደረጃ የትኛው ነው?",
    "qOromo": "Adeemsa hafuura baafannaa seelii keessatti, sadarkaan hunda caalaa molekiyuloota ATP baay'ee oomishu kami?",
    "correctAnswerEnglish": "Oxidative Phosphorylation (Electron Transport Chain)",
    "correctAnswerAmharic": "ኦክሲዴቲቭ ፎስፎራይሌሽን (የኤሌክትሮን ማመላለሻ ሰንሰለት)",
    "correctAnswerOromo": "Oxidative Phosphorylation (Sarara geejjiba elektiroonii)",
    "distractorsEnglish": [
      "Glycolysis",
      "Krebs (Citric Acid) Cycle",
      "Fermentation"
    ],
    "distractorsAmharic": [
      "ግላይኮላይሲስ",
      "የክሬብስ ዑደት",
      "እርሾ (ፌርሜንቴሽን)"
    ],
    "distractorsOromo": [
      "Gilaayikoolayisisi",
      "Marsee Kireebsii",
      "Farmeenteeshinii"
    ],
    "explanationEnglish": "The Electron Transport Chain and chemiosmosis generate roughly 26 to 28 ATP molecules out of the ~30-32 ATP total per glucose.",
    "explanationAmharic": "የኤሌክትሮን ማመላለሻ ሰንሰለት (ETC) በአንድ ግሉኮስ ከ 26 እስከ 28 ATP በማመንጨት ከፍተኛውን ድርሻ ይይዛል።",
    "explanationOromo": "Sararri geejjiba elektiroonii (ETC) molekiyulii gulukoosii tokkorraa ATP 26-28 ta'u oomisha.",
    "difficulty": "medium"
  },
  {
    "subject": "mathematics",
    "grade": 12,
    "topicId": "math_calculus",
    "unitNumber": 3,
    "qEnglish": "If f(x) = 3x³ - 5x² + 7x - 9, what is the value of f'(2)?",
    "qAmharic": "f(x) = 3x³ - 5x² + 7x - 9 ከሆነ የ f'(2) ዋጋ ስንት ነው?",
    "qOromo": "Yoo f(x) = 3x³ - 5x² + 7x - 9 ta'e, gatiin f'(2) meeqa?",
    "correctAnswerEnglish": "23",
    "correctAnswerAmharic": "23",
    "correctAnswerOromo": "23",
    "distractorsEnglish": [
      "19",
      "31",
      "15"
    ],
    "distractorsAmharic": [
      "19",
      "31",
      "15"
    ],
    "distractorsOromo": [
      "19",
      "31",
      "15"
    ],
    "explanationEnglish": "f'(x) = 9x² - 10x + 7. Evaluating at x = 2: f'(2) = 9(4) - 10(2) + 7 = 36 - 20 + 7 = 23.",
    "explanationAmharic": "f'(x) = 9x² - 10x + 7 ሲሆን፣ በ x = 2 ሲተካ f'(2) = 36 - 20 + 7 = 23 ይሆናል።",
    "explanationOromo": "f'(x) = 9x² - 10x + 7 dha. Bakka x ti 2 yoo galchinu: 9(4) - 20 + 7 = 23.",
    "difficulty": "medium"
  },
  {
    "subject": "mathematics",
    "grade": 12,
    "topicId": "math_calculus",
    "unitNumber": 3,
    "qEnglish": "What is the limit of (x² - 16) / (x - 4) as x approaches 4?",
    "qAmharic": "x ወደ 4 ሲጠጋ የ (x² - 16) / (x - 4) ሊሚት (limit) ስንት ነው?",
    "qOromo": "Liimiitiin (x² - 16) / (x - 4) yeroo x gara 4 dhihaatu meeqa ta'a?",
    "correctAnswerEnglish": "8",
    "correctAnswerAmharic": "8",
    "correctAnswerOromo": "8",
    "distractorsEnglish": [
      "4",
      "0",
      "16"
    ],
    "distractorsAmharic": [
      "4",
      "0",
      "16"
    ],
    "distractorsOromo": [
      "4",
      "0",
      "16"
    ],
    "explanationEnglish": "Factor the numerator: (x - 4)(x + 4) / (x - 4) = x + 4. As x approaches 4, 4 + 4 = 8.",
    "explanationAmharic": "የላይኛውን እናቃልላለን፡ (x - 4)(x + 4)/(x - 4) = x + 4። x = 4 ሲተካ 4 + 4 = 8 ይሆናል።",
    "explanationOromo": "Facaasuu: (x - 4)(x + 4)/(x - 4) = x + 4. 4 + 4 = 8.",
    "difficulty": "easy"
  },
  {
    "subject": "mathematics",
    "grade": 11,
    "topicId": "math_vectors",
    "unitNumber": 2,
    "qEnglish": "What is the sum of the infinite geometric series: 12 + 6 + 3 + 3/2 + ... ?",
    "qAmharic": "የዚህ ማለቂያ የሌለው ጂኦሜትሪክ ቅደም ተከተል ድምር ስንት ነው፡ 12 + 6 + 3 + 3/2 + ... ?",
    "qOromo": "Ida'amni tarrisee ji'oomeetirii dhuma-hinqabnee: 12 + 6 + 3 + 3/2 + ... meeqa?",
    "correctAnswerEnglish": "24",
    "correctAnswerAmharic": "24",
    "correctAnswerOromo": "24",
    "distractorsEnglish": [
      "18",
      "36",
      "48"
    ],
    "distractorsAmharic": [
      "18",
      "36",
      "48"
    ],
    "distractorsOromo": [
      "18",
      "36",
      "48"
    ],
    "explanationEnglish": "First term a = 12, common ratio r = 6/12 = 1/2. Sum S_inf = a / (1 - r) = 12 / (1 - 0.5) = 24.",
    "explanationAmharic": "a = 12, r = 1/2 ስለሆነ፣ ድምር S = a / (1 - r) = 12 / 0.5 = 24 ይሆናል።",
    "explanationOromo": "a = 12, r = 1/2. S = a / (1 - r) = 12 / 0.5 = 24.",
    "difficulty": "easy"
  },
  {
    "subject": "mathematics",
    "grade": 12,
    "topicId": "math_matrices",
    "unitNumber": 4,
    "qEnglish": "If matrix A = [[3, 2], [1, 4]], what is the determinant of A?",
    "qAmharic": "ማትሪክስ A = [[3, 2], [1, 4]] ቢሆን፣ የ A ዲተርሚናንት ዋጋ ስንት ነው?",
    "qOromo": "Maatiriiksii A = [[3, 2], [1, 4]] yoo ta'e, diiterminaantiin A meeqa?",
    "correctAnswerEnglish": "10",
    "correctAnswerAmharic": "10",
    "correctAnswerOromo": "10",
    "distractorsEnglish": [
      "14",
      "6",
      "12"
    ],
    "distractorsAmharic": [
      "14",
      "6",
      "12"
    ],
    "distractorsOromo": [
      "14",
      "6",
      "12"
    ],
    "explanationEnglish": "det(A) = (3 * 4) - (2 * 1) = 12 - 2 = 10.",
    "explanationAmharic": "det(A) = (3 × 4) - (2 × 1) = 12 - 2 = 10 ይሆናል።",
    "explanationOromo": "det(A) = (3 * 4) - (2 * 1) = 12 - 2 = 10.",
    "difficulty": "easy"
  },
  {
    "subject": "economics",
    "grade": 12,
    "topicId": "econ_macro",
    "unitNumber": 1,
    "qEnglish": "Gross Domestic Product (GDP) measured using current prices of the year in which the output is produced is called:",
    "qAmharic": "ውጤቱ በተመረተበት አመት ወቅታዊ ዋጋ የሚሰላው ጠቅላላ የሀገር ውስጥ ምርት (GDP) ምን ይባላል?",
    "qOromo": "Oomishni Waliigalaa Biyya Keessaa (GDP) gatii yeroo ammaa irratti hundaa'uun shallagamu maal jedhama?",
    "correctAnswerEnglish": "Nominal GDP",
    "correctAnswerAmharic": "ኖሚናል ጂዲፒ (Nominal GDP)",
    "correctAnswerOromo": "GDP Noominaala",
    "distractorsEnglish": [
      "Real GDP",
      "Potential GDP",
      "Net National Product"
    ],
    "distractorsAmharic": [
      "እውነተኛ ጂዲፒ (Real GDP)",
      "ፖቴንሻል ጂዲፒ",
      "የተጣራ የሀገር ውስጥ ምርት"
    ],
    "distractorsOromo": [
      "GDP Dhugaa (Real GDP)",
      "GDP Poteenshiyaalaa",
      "NNP"
    ],
    "explanationEnglish": "Nominal GDP values goods and services at current market prices without adjusting for inflation, whereas Real GDP adjusts for price changes using a base year.",
    "explanationAmharic": "ኖሚናል ጂዲፒ የዋጋ ንረትን ሳያስተካክል በወቅቱ የገበያ ዋጋ የሚሰላ ነው።",
    "explanationOromo": "GDP Noominaalli jijjiirama gatii (inflation) osoo hin sirreessin gatii ammaan shallagama.",
    "difficulty": "easy"
  },
  {
    "subject": "economics",
    "grade": 11,
    "topicId": "econ_micro",
    "unitNumber": 2,
    "qEnglish": "If the percentage decrease in quantity demanded is exactly equal to the percentage increase in price, the price elasticity of demand is:",
    "qAmharic": "የተጠየቀው መጠን የመቀነስ መቶኛ ከዋጋው የመጨመር መቶኛ ጋር በትክክል እኩል ከሆነ፣ የፍላጎት ዋጋ የመለጠጥ ሁኔታ (Price Elasticity) ምንድን ነው?",
    "qOromo": "Dhibbeentaan fedhii xiqqaachuu dhibbeentaa gatiin dabaluu waliin qixa yoo ta'e, ji'aastiisitiin fedhii maal ta'a?",
    "correctAnswerEnglish": "Unitary elastic (|Ed| = 1)",
    "correctAnswerAmharic": "ዩኒታሪ ኢላስቲክ (|Ed| = 1)",
    "correctAnswerOromo": "Yuunitarilastikii (|Ed| = 1)",
    "distractorsEnglish": [
      "Perfectely inelastic (|Ed| = 0)",
      "Relatively elastic (|Ed| > 1)",
      "Perfectely elastic (|Ed| = ∞)"
    ],
    "distractorsAmharic": [
      "ሙሉ በሙሉ የማይለጠጥ (|Ed| = 0)",
      "ተለጣጭ (|Ed| > 1)",
      "ማለቂያ የሌለው ተለጣጭ (|Ed| = ∞)"
    ],
    "distractorsOromo": [
      "Inelaastikii guutuu",
      "Elaastikii ol-aanaa",
      "Elaastikii dhuma hinqabne"
    ],
    "explanationEnglish": "When % change in Q equals % change in P, Ed = 1, which represents unitary elasticity.",
    "explanationAmharic": "የመጠን ለውጥ መቶኛ ከዋጋ ለውጥ ጋር እኩል ሲሆን Ed = 1 (ዩኒታሪ) ይሆናል።",
    "explanationOromo": "Jijjiiramni fedhii fi gatii wal qixa yoo ta'e |Ed| = 1 ta'a.",
    "difficulty": "medium"
  },
  {
    "subject": "geography",
    "grade": 12,
    "topicId": "geo_ethiopia",
    "unitNumber": 1,
    "qEnglish": "Which physiographic sub-region of Ethiopia contains Mount Ras Dejen, the highest peak in the country?",
    "qAmharic": "የኢትዮጵያ ከፍተኛው ተራራ የሆነው ራስ ደጀን የሚገኝበት የፊዚዮግራፊክ ንዑስ-ክልል የትኛው ነው?",
    "qOromo": "Kutaa lafaa Itoophiyaa isa kam keessatti Gaarri Raas Dajani (fiixee hunda caalaa dheeraa) argama?",
    "correctAnswerEnglish": "North-Western Highlands (Simien Massif)",
    "correctAnswerAmharic": "ሰሜን-ምዕራብ ደጋማ ስፍራዎች (ስሜን ተራሮች)",
    "correctAnswerOromo": "Tulluuwwan Kaaba-Dhihaa (Simien)",
    "distractorsEnglish": [
      "South-Eastern Highlands",
      "Rift Valley Floor",
      "Western Lowlands"
    ],
    "distractorsAmharic": [
      "ደቡብ-ምስራቅ ደጋማ ስፍራዎች",
      "የስምጥ ሸለቆ ወለል",
      "ምዕራባዊ ቆላማ አካባቢዎች"
    ],
    "distractorsOromo": [
      "Tulluuwwan Kibba-Bahaa",
      "Dachee Riwufti Vaalii",
      "Gammoojjii Dhihaa"
    ],
    "explanationEnglish": "Mount Ras Dejen (4,550 m) is located in the Simien Mountains within the North-Western Highlands of Ethiopia.",
    "explanationAmharic": "ራስ ደጀን (4,550 ሜትር) በሰሜን-ምዕራብ ደጋማ ስፍራዎች ውስጥ በስሜን ተራሮች ይገኛል።",
    "explanationOromo": "Gaarri Raas Dajan (4,550 m) Tulluuwwan Kaaba-Dhihaa keessatti Gaara Siimiin irratti argama.",
    "difficulty": "easy"
  },
  {
    "subject": "history",
    "grade": 12,
    "topicId": "hist_ethiopia",
    "unitNumber": 2,
    "qEnglish": "The Battle of Adwa, where Ethiopian forces decisively defeated the Italian colonial army, took place on which date?",
    "qAmharic": "የኢትዮጵያ ጦር የጣሊያንን ቅኝ ገዢ ጦር በድል ያጠናቀቀበት የአድዋ ጦርነት የተካሄደው መቼ ነበር?",
    "qOromo": "Loli Adwaa kan waraanni Itoophiyaa weerara faashistii Xaaliyaanii itti mo'ate yoom raawwatame?",
    "correctAnswerEnglish": "March 1, 1896 (Yekatit 23, 1888 E.C.)",
    "correctAnswerAmharic": "መጋቢት 1 ቀን 1896 እ.ኤ.አ (የካቲት 23 ቀን 1888 ዓ.ም)",
    "correctAnswerOromo": "Bitootessa 1, 1896 (Guraandhala 23, 1888 E.C.)",
    "distractorsEnglish": [
      "March 1, 1936",
      "May 5, 1941",
      "October 2, 1889"
    ],
    "distractorsAmharic": [
      "መጋቢት 1 ቀን 1936",
      "ሚያዚያ 27 ቀን 1941",
      "ጥቅምት 2 ቀን 1889"
    ],
    "distractorsOromo": [
      "Bitootessa 1, 1936",
      "Caamsaa 5, 1941",
      "Onkololeessa 2, 1889"
    ],
    "explanationEnglish": "The Battle of Adwa occurred on March 1, 1896 (Yekatit 23, 1888 E.C.), cementing Ethiopian independence and sovereignty.",
    "explanationAmharic": "የአድዋ ድል መጋቢት 1 ቀን 1896 እ.ኤ.አ (የካቲት 23 ቀን 1888 ዓ.ም) የተከናወነ ታሪካዊ ድል ነው።",
    "explanationOromo": "Injifannoon Adwaa Bitootessa 1, 1896 (Guraandhala 23, 1888 E.C.) kan galmaa'edha.",
    "difficulty": "easy"
  },
  {
    "subject": "citizenship",
    "grade": 12,
    "topicId": "civ_constitution",
    "unitNumber": 1,
    "qEnglish": "Under the FDRE Constitution, sovereignty resides firmly in which of the following entities?",
    "qAmharic": "በኢፌዲሪ ህገ-መንግስት መሰረት፣ የሉዓላዊ የስልጣን ባለቤት ማን ነው?",
    "qOromo": "Akka Heera Mootummaa RDFI tiin, abbaan abbaa-biyyummaa (sovereignty) eenyu?",
    "correctAnswerEnglish": "The Nations, Nationalities and Peoples of Ethiopia",
    "correctAnswerAmharic": "የኢትዮጵያ ብሔሮች፣ ብሔረሰቦችና ሕዝቦች",
    "correctAnswerOromo": "Saboota, Sablammoota fi Ummattoota Itoophiyaa",
    "distractorsEnglish": [
      "The Prime Minister and Cabinet",
      "The Federal Supreme Court",
      "The Ministry of Peace"
    ],
    "distractorsAmharic": [
      "ጠቅላይ ሚኒስትሩና ካቢኔው",
      "የፌዴራል ጠቅላይ ፍርድ ቤት",
      "የሰላም ሚኒስቴር"
    ],
    "distractorsOromo": [
      "Muummee Ministiraa fi Kaabinee",
      "Mana Murtii Waliigalaa Federaalaa",
      "Ministeera Nageenyaa"
    ],
    "explanationEnglish": "Article 8 of the FDRE Constitution explicitly states: \"All sovereign power resides in the Nations, Nationalities and Peoples of Ethiopia.\"",
    "explanationAmharic": "በኢፌዲሪ ህገ-መንግስት አንቀጽ 8 መሰረት የሉዓላዊ ስልጣን ባለቤቶች የኢትዮጵያ ብሔሮች፣ ብሔረሰቦችና ሕዝቦች ናቸው።",
    "explanationOromo": "Heera Mootummaa RDFI Keewwata 8 irratti abbaan aango mootummaa saboota, sablammoota fi ummattoota ta'uun ibsameera.",
    "difficulty": "easy"
  },
  {
    "subject": "english",
    "grade": 12,
    "topicId": "eng_grammar",
    "unitNumber": 2,
    "qEnglish": "Select the grammatically correct sentence displaying proper subject-verb agreement with compound subjects:",
    "qAmharic": "Select the grammatically correct sentence displaying proper subject-verb agreement with compound subjects:",
    "qOromo": "Select the grammatically correct sentence displaying proper subject-verb agreement with compound subjects:",
    "correctAnswerEnglish": "Neither the teacher nor the students were aware of the schedule change.",
    "correctAnswerAmharic": "Neither the teacher nor the students were aware of the schedule change.",
    "correctAnswerOromo": "Neither the teacher nor the students were aware of the schedule change.",
    "distractorsEnglish": [
      "Neither the teacher nor the students was aware of the schedule change.",
      "Neither the teacher nor the students is aware of the schedule change.",
      "Neither the teacher nor the students has been aware of the schedule change."
    ],
    "distractorsAmharic": [
      "Neither the teacher nor the students was aware of the schedule change.",
      "Neither the teacher nor the students is aware of the schedule change.",
      "Neither the teacher nor the students has been aware of the schedule change."
    ],
    "distractorsOromo": [
      "Neither the teacher nor the students was aware of the schedule change.",
      "Neither the teacher nor the students is aware of the schedule change.",
      "Neither the teacher nor the students has been aware of the schedule change."
    ],
    "explanationEnglish": "When subjects are connected by \"neither... nor\", the verb agrees with the closer subject (\"students\" is plural, requiring \"were\").",
    "explanationAmharic": "በ \"neither... nor\" ጊዜ ግሱ ከቅርቡ ባለቤት (\"students\") ጋር በመስማማት \"were\" ይሆናል።",
    "explanationOromo": "Jechi \"neither... nor\" yoo fayyadamu gochimni gochama isa dhihootti jiru (\"students\") waliin deema.",
    "difficulty": "medium"
  }
];

/**
 * Available topics dictionary
 */
const SUBJECT_TOPICS_MAP: Record<string, QuizTopicOption[]> = {
  "physics": [
    {
      "id": "all",
      "icon": "",
      "nameOromo": "Boqonnaalee Hunda (Waliigala)",
      "nameAmharic": "ሁሉንም ምዕራፎች (አጠቃላይ)",
      "nameEnglish": "All Units (Comprehensive EUEE)"
    },
    {
      "id": "unit_1",
      "icon": "",
      "nameOromo": "Boqonnaa 1: Termoodaayinaamiksii",
      "nameAmharic": "ምዕራፍ 1፡ ቴርሞዳይናሚክስና የሙቀት ሞተሮች",
      "nameEnglish": "Unit 1: Thermodynamics & Heat Engines"
    },
    {
      "id": "unit_2",
      "icon": "",
      "nameOromo": "Boqonnaa 2: Sochii fi Veektaroota",
      "nameAmharic": "ምዕራፍ 2፡ ባለሁለት አቅጣጫ እንቅስቃሴና ቬክተሮች",
      "nameEnglish": "Unit 2: Two-Dimensional Motion & Vectors"
    },
    {
      "id": "unit_3",
      "icon": "",
      "nameOromo": "Boqonnaa 3: Elektiroomaagneetizimii & AC",
      "nameAmharic": "ምዕራፍ 3፡ ኤሌክትሮማግኔቲዝም እና ኤሲ ጅረት",
      "nameEnglish": "Unit 3: Electromagnetism & Alternating Current"
    },
    {
      "id": "unit_4",
      "icon": "",
      "nameOromo": "Boqonnaa 4: Ooptiiksii Dambalii & Leezerii",
      "nameAmharic": "ምዕራፍ 4፡ የሞገድ ኦፕቲክስ እና ሌዘር ፊዚክስ",
      "nameEnglish": "Unit 4: Wave Optics & Laser Applications"
    },
    {
      "id": "unit_5",
      "icon": "",
      "nameOromo": "Boqonnaa 5: Fiiziksii Kowaantamii",
      "nameAmharic": "ምዕራፍ 5፡ የኳንተም ፊዚክስና ፎቶኤሌክትሪክ ውጤት",
      "nameEnglish": "Unit 5: Quantum Physics & Photoelectric Effect"
    },
    {
      "id": "unit_6",
      "icon": "",
      "nameOromo": "Boqonnaa 6: Fiiziksii Niiwukilaraa",
      "nameAmharic": "ምዕራፍ 6፡ የኒውክሌር ፊዚክስና ራዲዮአክቲቪቲ",
      "nameEnglish": "Unit 6: Nuclear Physics & Radioactivity"
    }
  ],
  "chemistry": [
    {
      "id": "all",
      "icon": "",
      "nameOromo": "Boqonnaalee Hunda (Waliigala)",
      "nameAmharic": "ሁሉንም ምዕራፎች (አጠቃላይ)",
      "nameEnglish": "All Units (Comprehensive EUEE)"
    },
    {
      "id": "unit_1",
      "icon": "",
      "nameOromo": "Boqonnaa 1: Soluushinoota & Asidoota",
      "nameAmharic": "ምዕራፍ 1፡ መፍትሄዎችና አሲድ-ቤዝ ሚዛን",
      "nameEnglish": "Unit 1: Solutions & Acid-Base Equilibrium"
    },
    {
      "id": "unit_2",
      "icon": "",
      "nameOromo": "Boqonnaa 2: Termoodaayinaamiksii fi Elektirookeemistirii",
      "nameAmharic": "ምዕራፍ 2፡ ኬሚካል ቴርሞዳይናሚክስና ኤሌክትሮኬሚስትሪ",
      "nameEnglish": "Unit 2: Chemical Thermodynamics & Electrochemistry"
    },
    {
      "id": "unit_3",
      "icon": "",
      "nameOromo": "Boqonnaa 3: Keemistirii Indaastirii",
      "nameAmharic": "ምዕራፍ 3፡ የኢንዱስትሪ ኬሚስትሪና ብረታብረት",
      "nameEnglish": "Unit 3: Industrial Chemistry & Metallurgy"
    },
    {
      "id": "unit_4",
      "icon": "",
      "nameOromo": "Boqonnaa 4: Poolimaroota & Maakroomoolikiyuulii",
      "nameAmharic": "ምዕራፍ 4፡ ፖሊመሮችና ማክሮሞለኪዩሎች",
      "nameEnglish": "Unit 4: Polymers & Synthetic Macromolecules"
    },
    {
      "id": "unit_5",
      "icon": "",
      "nameOromo": "Boqonnaa 5: Keemistirii Naannoo",
      "nameAmharic": "ምዕራፍ 5፡ የአካባቢ ኬሚስትሪና ብክለት ቁጥጥር",
      "nameEnglish": "Unit 5: Environmental Chemistry & Pollution"
    },
    {
      "id": "unit_6",
      "icon": "",
      "nameOromo": "Boqonnaa 6: Kompaawundoota Ko'oordineeshiinii",
      "nameAmharic": "ምዕራፍ 6፡ የኮኦርዲኔሽን ውህዶች",
      "nameEnglish": "Unit 6: Coordination Chemistry & Transition Metals"
    }
  ],
  "biology": [
    {
      "id": "all",
      "icon": "",
      "nameOromo": "Boqonnaalee Hunda (Waliigala)",
      "nameAmharic": "ሁሉንም ምዕራፎች (አጠቃላይ)",
      "nameEnglish": "All Units (Comprehensive EUEE)"
    },
    {
      "id": "unit_1",
      "icon": "",
      "nameOromo": "Boqonnaa 1: Baayooteknooloojii fi DNA",
      "nameAmharic": "ምዕራፍ 1፡ ባዮቴክኖሎጂና ሪኮምቢናንት ዲኤንኤ",
      "nameEnglish": "Unit 1: Applications of Biotechnology"
    },
    {
      "id": "unit_2",
      "icon": "",
      "nameOromo": "Boqonnaa 2: Baayoloojii Namaa: Sirna Narvii",
      "nameAmharic": "ምዕራፍ 2፡ የሰው ስነ-ህይወት፡ ነርቭና ሆርሞኖች",
      "nameEnglish": "Unit 2: Nervous & Endocrine Control Systems"
    },
    {
      "id": "unit_3",
      "icon": "",
      "nameOromo": "Boqonnaa 3: Jeneetiiksii fi Dhaala Molekiyuulaa",
      "nameAmharic": "ምዕራፍ 3፡ ጀነቲክስና ሞለኪዩላር ውርስ",
      "nameEnglish": "Unit 3: Genetics & Molecular Inheritance"
    },
    {
      "id": "unit_4",
      "icon": "",
      "nameOromo": "Boqonnaa 4: Eevolushinii fi Filannoo Uumamaa",
      "nameAmharic": "ምዕራፍ 4፡ ኢቮሉሽንና የተፈጥሮ ምርጫ",
      "nameEnglish": "Unit 4: Evolution & Natural Selection"
    },
    {
      "id": "unit_5",
      "icon": "",
      "nameOromo": "Boqonnaa 5: Ikolojii fi Kununsa Lubbu-qabeeyyii",
      "nameAmharic": "ምዕራፍ 5፡ ስነ-ምህዳርና የብዝሃ-ህይወት ጥበቃ",
      "nameEnglish": "Unit 5: Ecology & Biodiversity Conservation"
    },
    {
      "id": "unit_6",
      "icon": "",
      "nameOromo": "Boqonnaa 6: Maayikiroobayoloojii fi Nageenya",
      "nameAmharic": "ምዕራፍ 6፡ ማይክሮባዮሎጂና የበሽታ መከላከያ",
      "nameEnglish": "Unit 6: Microorganisms, Immunology & Disease"
    }
  ],
  "mathematics": [
    {
      "id": "all",
      "icon": "",
      "nameOromo": "Boqonnaalee Hunda (Waliigala)",
      "nameAmharic": "ሁሉንም ምዕራፎች (አጠቃላይ)",
      "nameEnglish": "All Units (Comprehensive EUEE)"
    },
    {
      "id": "unit_1",
      "icon": "",
      "nameOromo": "Boqonnaa 1: Hanga fi Itti-fufiinsa",
      "nameAmharic": "ምዕራፍ 1፡ ወሰን እና ቀጣይነት (Limits & Continuity)",
      "nameEnglish": "Unit 1: Limits & Continuity of Functions"
    },
    {
      "id": "unit_2",
      "icon": "",
      "nameOromo": "Boqonnaa 2: Kaalkulasii (Derivatives)",
      "nameAmharic": "ምዕራፍ 2፡ ካልኩለስና ዴሪቬቲቭ (Differential Calculus)",
      "nameEnglish": "Unit 2: Differential Calculus & Derivatives"
    },
    {
      "id": "unit_3",
      "icon": "",
      "nameOromo": "Boqonnaa 3: Hojiirra Oolmaa ዴሪቬቲቭ",
      "nameAmharic": "ምዕራፍ 3፡ የዴሪቬቲቭ ተግባራዊ አጠቃቀም (Optimization)",
      "nameEnglish": "Unit 3: Applications of Differentiation"
    },
    {
      "id": "unit_4",
      "icon": "",
      "nameOromo": "Boqonnaa 4: Kaalkulasii Integiraalaa",
      "nameAmharic": "ምዕራፍ 4፡ ኢንቴግራይዝድ ካልኩለስ (Integral Calculus)",
      "nameEnglish": "Unit 4: Integral Calculus & Antiderivatives"
    },
    {
      "id": "unit_5",
      "icon": "",
      "nameOromo": "Boqonnaa 5: Veektaroota fi Maatiriksii",
      "nameAmharic": "ምዕራፍ 5፡ 3D ቬክተሮችና ማትሪክስ",
      "nameEnglish": "Unit 5: 3D Coordinate Vectors & Matrices"
    },
    {
      "id": "unit_6",
      "icon": "",
      "nameOromo": "Boqonnaa 6: Qorannoo fi Piroobaabiliitii",
      "nameAmharic": "ምዕራፍ 6፡ ፕሮባቢሊቲና ስታትስቲክስ ስርጭት",
      "nameEnglish": "Unit 6: Mathematical Proofs & Probability"
    }
  ],
  "english": [
    {
      "id": "all",
      "icon": "",
      "nameOromo": "Boqonnaalee Hunda (Waliigala)",
      "nameAmharic": "ሁሉንም ምዕራፎች (አጠቃላይ)",
      "nameEnglish": "All Units (Comprehensive English)"
    },
    {
      "id": "unit_1",
      "icon": "",
      "nameOromo": "Boqonnaa 1: Dubbisuu fi Hubannoo",
      "nameAmharic": "ምዕራፍ 1፡ ንባብና ግንዛቤ",
      "nameEnglish": "Unit 1: Reading Comprehension & Inferences"
    },
    {
      "id": "unit_2",
      "icon": "",
      "nameOromo": "Boqonnaa 2: Caasluga (Grammar)",
      "nameAmharic": "ምዕራፍ 2፡ ሰዋሰውና ሥርዓተ-ነጥብ",
      "nameEnglish": "Unit 2: Conditionals & Passive Voice"
    },
    {
      "id": "unit_3",
      "icon": "",
      "nameOromo": "Boqonnaa 3: Jechoota & Hiika",
      "nameAmharic": "ምዕራፍ 3፡ ቃላትና አገባብ",
      "nameEnglish": "Unit 3: Vocabulary & Idioms in Context"
    }
  ],
  "citizenship": [
    {
      "id": "all",
      "icon": "",
      "nameOromo": "Boqonnaalee Hunda (Waliigala)",
      "nameAmharic": "ሁሉንም ምዕራፎች (አጠቃላይ)",
      "nameEnglish": "All Units (Comprehensive Citizenship)"
    },
    {
      "id": "unit_1",
      "icon": "",
      "nameOromo": "Boqonnaa 1: Heera Mootummaa RDFI",
      "nameAmharic": "ምዕራፍ 1፡ የኢፌዲሪ ህገ-መንግስት መርሆዎች",
      "nameEnglish": "Unit 1: FDRE Constitution Principles"
    },
    {
      "id": "unit_2",
      "icon": "",
      "nameOromo": "Boqonnaa 2: Mirgoota Namummaa & Diimokiraasii",
      "nameAmharic": "ምዕራፍ 2፡ ሰብአዊና ዲሞክራሲያዊ መብቶች",
      "nameEnglish": "Unit 2: Human & Democratic Rights"
    },
    {
      "id": "unit_3",
      "icon": "",
      "nameOromo": "Boqonnaa 3: Caasaa Federaalawaa & Seera",
      "nameAmharic": "ምዕራፍ 3፡ ፌዴራላዊ መዋቅርና የህግ የበላይነት",
      "nameEnglish": "Unit 3: Federal Structure & Rule of Law"
    },
    {
      "id": "unit_4",
      "icon": "",
      "nameOromo": "Boqonnaa 4: Wal-qixxummaa fi Haqaa",
      "nameAmharic": "ምዕራፍ 4፡ እኩልነትና ፍትህ",
      "nameEnglish": "Unit 4: Equality & Social Justice"
    },
    {
      "id": "unit_5",
      "icon": "",
      "nameOromo": "Boqonnaa 5: Jaalala Biyyaa fi Ga'ee Lammummaa",
      "nameAmharic": "ምዕራፍ 5፡ አገር ወዳድነትና የዜግነት ኃላፊነት",
      "nameEnglish": "Unit 5: Patriotism & Civic Responsibility"
    }
  ],
  "economics": [
    {
      "id": "all",
      "icon": "",
      "nameOromo": "Boqonnaalee Hunda (Waliigala)",
      "nameAmharic": "ሁሉንም ምዕራፎች (አጠቃላይ)",
      "nameEnglish": "All Units (Comprehensive EUEE)"
    },
    {
      "id": "unit_1",
      "icon": "",
      "nameOromo": "Boqonnaa 1: Maakroo-Ikoonoomiksii & GDP",
      "nameAmharic": "ምዕራፍ 1፡ ማክሮ-ኢኮኖሚክስና ጂዲፒ",
      "nameEnglish": "Unit 1: Macroeconomics, GDP & National Accounts"
    },
    {
      "id": "unit_2",
      "icon": "",
      "nameOromo": "Boqonnaa 2: Dhiyeessii fi Fedhii Waliigalaa",
      "nameAmharic": "ምዕራፍ 2፡ አጠቃላይ አቅርቦትና ፍላጎት",
      "nameEnglish": "Unit 2: Aggregate Demand & Aggregate Supply"
    },
    {
      "id": "unit_3",
      "icon": "",
      "nameOromo": "Boqonnaa 3: Imaammata Maallaqaa fi Baankii",
      "nameAmharic": "ምዕራፍ 3፡ የገንዘብ ፖሊሲና የባንክ ስርዓት",
      "nameEnglish": "Unit 3: Monetary Policy & Banking Systems"
    },
    {
      "id": "unit_4",
      "icon": "",
      "nameOromo": "Boqonnaa 4: Imaammata Fiskaalaa fi Baajata",
      "nameAmharic": "ምዕራፍ 4፡ የፊስካል ፖሊሲና የመንግስት በጀት",
      "nameEnglish": "Unit 4: Fiscal Policy & Government Budget"
    },
    {
      "id": "unit_5",
      "icon": "",
      "nameOromo": "Boqonnaa 5: Daldala Idil-Addunyaa fi Sharafa",
      "nameAmharic": "ምዕራፍ 5፡ ዓለም አቀፍ ንግድና የውጭ ምንዛሪ",
      "nameEnglish": "Unit 5: International Trade & Exchange Rates"
    },
    {
      "id": "unit_6",
      "icon": "",
      "nameOromo": "Boqonnaa 6: Guddina Dinagdee Itoophiyaa",
      "nameAmharic": "ምዕራፍ 6፡ የኢትዮጵያ ኢኮኖሚ እድገትና ተግዳሮቶች",
      "nameEnglish": "Unit 6: Economic Development in Ethiopia"
    }
  ],
  "geography": [
    {
      "id": "all",
      "icon": "",
      "nameOromo": "Boqonnaalee Hunda (Waliigala)",
      "nameAmharic": "ሁሉንም ምዕራፎች (አጠቃላይ)",
      "nameEnglish": "All Units (Comprehensive EUEE)"
    },
    {
      "id": "unit_1",
      "icon": "",
      "nameOromo": "Boqonnaa 1: Ji'oograafii Fiizikaalaa Itoophiyaa",
      "nameAmharic": "ምዕራፍ 1፡ የኢትዮጵያ ፊዚካል ጂኦግራፊ",
      "nameEnglish": "Unit 1: Physical Geography & Topography"
    },
    {
      "id": "unit_2",
      "icon": "",
      "nameOromo": "Boqonnaa 2: Kaartaa, GIS fi Remote Sensing",
      "nameAmharic": "ምዕራፍ 2፡ ካርታ፣ ጂአይኤስና የርቀት ዳሰሳ",
      "nameEnglish": "Unit 2: Cartography, GIS & Remote Sensing"
    },
    {
      "id": "unit_3",
      "icon": "",
      "nameOromo": "Boqonnaa 3: Sirna Bishaan fi Qabeenya Lafa",
      "nameAmharic": "ምዕራፍ 3፡ የፍሳሽ ስርዓትና የውሃ ሀብቶች",
      "nameEnglish": "Unit 3: Drainage Systems & Water Resources"
    },
    {
      "id": "unit_4",
      "icon": "",
      "nameOromo": "Boqonnaa 4: Qilleensa fi Naannoo Qonnaa",
      "nameAmharic": "ምዕራፍ 4፡ የአየር ንብረትና አግሮ-ኢኮሎጂ",
      "nameEnglish": "Unit 4: Climate Regions & Agro-Ecological Zones"
    },
    {
      "id": "unit_5",
      "icon": "",
      "nameOromo": "Boqonnaa 5: Baay'ina Uummataa fi Demograafii",
      "nameAmharic": "ምዕራፍ 5፡ የህዝብ ቁጥር እድገትና ስነ-ህዝብ",
      "nameEnglish": "Unit 5: Population Dynamics & Demographics"
    },
    {
      "id": "unit_6",
      "icon": "",
      "nameOromo": "Boqonnaa 6: Sochii Dinagdee fi Misooma Itti Fufiinsa",
      "nameAmharic": "ምዕራፍ 6፡ የኢኮኖሚ እንቅስቃሴዎችና ዘላቂ ልማት",
      "nameEnglish": "Unit 6: Economic Activities & Sustainability"
    }
  ],
  "history": [
    {
      "id": "all",
      "icon": "",
      "nameOromo": "Boqonnaalee Hunda (Waliigala)",
      "nameAmharic": "ሁሉንም ምዕራፎች (አጠቃላይ)",
      "nameEnglish": "All Units (Comprehensive EUEE)"
    },
    {
      "id": "unit_1",
      "icon": "",
      "nameOromo": "Boqonnaa 1: Seenaa Itoophiyaa & Adwaa",
      "nameAmharic": "ምዕራፍ 1፡ የ 19ኛው ክ/ዘ ሀገር ምስረታና አድዋ",
      "nameEnglish": "Unit 1: Modern Ethiopian History & Adwa (1896)"
    },
    {
      "id": "unit_2",
      "icon": "",
      "nameOromo": "Boqonnaa 2: Saba fi Sablammii Itoophiyaa",
      "nameAmharic": "ምዕራፍ 2፡ የኢትዮጵያ ህዝቦችና ማህበረሰቦች",
      "nameEnglish": "Unit 2: Peoples & Society in 19th Century Ethiopia"
    },
    {
      "id": "unit_3",
      "icon": "",
      "nameOromo": "Boqonnaa 3: Guddina Keessaa fi Ta'iinsota (1906–1941)",
      "nameAmharic": "ምዕራፍ 3፡ የውስጥ እድገቶችና ሁነቶች (1906–1941)",
      "nameEnglish": "Unit 3: Internal Developments & Events (1906–1941)"
    },
    {
      "id": "unit_4",
      "icon": "",
      "nameOromo": "Boqonnaa 4: Waraana Addunyaa I fi II",
      "nameAmharic": "ምዕራፍ 4፡ አንደኛውና ሁለተኛው የዓለም ጦርነት",
      "nameEnglish": "Unit 4: Global Conflicts: WWI & WWII Dynamics"
    },
    {
      "id": "unit_5",
      "icon": "",
      "nameOromo": "Boqonnaa 5: Itoophiyaa Bilisummaa Boodaa (1941–1974)",
      "nameAmharic": "ምዕራፍ 5፡ ከድል በኋላ እስከ ንጉሳዊው ውድቀት (1941–1974)",
      "nameEnglish": "Unit 5: Post-Liberation Imperial Era (1941–1974)"
    },
    {
      "id": "unit_6",
      "icon": "",
      "nameOromo": "Boqonnaa 6: Sirna Dargii fi Jijjiirama (1974–1991)",
      "nameAmharic": "ምዕራፍ 6፡ የደርግ ዘመንና ፖለቲካዊ ሽግግር (1974–1991)",
      "nameEnglish": "Unit 6: The Derg Regime & Political Transition"
    },
    {
      "id": "unit_7",
      "icon": "",
      "nameOromo": "Boqonnaa 7: Beekumsa Dhalootaa fi Dhaala Aadaa",
      "nameAmharic": "ምዕራፍ 7፡ የሀገር በቀል እውቀትና ቅርሶች",
      "nameEnglish": "Unit 7: Indigenous Knowledge Systems & Heritage"
    }
  ],
  "agriculture": [
    {
      "id": "all",
      "icon": "",
      "nameOromo": "Boqonnaalee Hunda (Waliigala Qonnaa)",
      "nameAmharic": "ሁሉንም ምዕራፎች (አጠቃላይ ግብርና)",
      "nameEnglish": "All Units (Comprehensive Agriculture)"
    },
    {
      "id": "agri_crops",
      "icon": "",
      "nameOromo": "Boqonnaa 1: Oomisha Midhaanii fi Qonna",
      "nameAmharic": "ምዕራፍ 1፡ የሰብል ምርትና አግሮኖሚ",
      "nameEnglish": "Unit 1: Field Crops & Agronomy"
    },
    {
      "id": "agri_soil",
      "icon": "",
      "nameOromo": "Boqonnaa 2: Saayinsii Biyyoo fi Gabbina",
      "nameAmharic": "ምዕራፍ 2፡ የአፈር ሳይንስና ማዳበሪያ",
      "nameEnglish": "Unit 2: Soil Science & Fertility"
    },
    {
      "id": "agri_livestock",
      "icon": "",
      "nameOromo": "Boqonnaa 3: Saayinsii Horii fi Nyaata",
      "nameAmharic": "ምዕራፍ 3፡ የእንስሳት እርባታና አመጋገብ",
      "nameEnglish": "Unit 3: Animal Science & Breeds"
    },
    {
      "id": "agri_protection",
      "icon": "",
      "nameOromo": "Boqonnaa 4: Eegumsa Midhaanii fi Aramaa",
      "nameAmharic": "ምዕራፍ 4፡ የሰብል ጥበቃና ተባዮች",
      "nameEnglish": "Unit 4: Plant Protection & IPM"
    },
    {
      "id": "agri_irrigation",
      "icon": "",
      "nameOromo": "Boqonnaa 5: Misooma Bishaan Qonnaa",
      "nameAmharic": "ምዕራፍ 5፡ የግብርና መስኖ ልማት",
      "nameEnglish": "Unit 5: Agricultural Water Management"
    }
  ],
  "it": [
    {
      "id": "all",
      "icon": "",
      "nameOromo": "Boqonnaalee Hunda (Waliigala IT)",
      "nameAmharic": "ሁሉንም ምዕራፎች (አጠቃላይ አይቲ)",
      "nameEnglish": "All Units (Comprehensive IT)"
    },
    {
      "id": "it_hardware",
      "icon": "",
      "nameOromo": "Boqonnaa 1: Haardiweerii fi Seera Dijitaalaa",
      "nameAmharic": "ምዕራፍ 1፡ ኮምፒውተር ሃርድዌርና አርክቴክቸር",
      "nameEnglish": "Unit 1: Hardware & Computer Architecture"
    },
    {
      "id": "it_networks",
      "icon": "",
      "nameOromo": "Boqonnaa 2: Neetwoorkii fi Interneetii",
      "nameAmharic": "ምዕራፍ 2፡ የኮምፒውተር ኔትወርክና ኢንተርኔት",
      "nameEnglish": "Unit 2: Computer Networks & Protocols"
    },
    {
      "id": "it_programming",
      "icon": "",
      "nameOromo": "Boqonnaa 3: Piroogiraamii fi Algoorizimii",
      "nameAmharic": "ምዕራፍ 3፡ ፕሮግራሚንግና አልጎሪዝም",
      "nameEnglish": "Unit 3: Programming & Algorithms"
    },
    {
      "id": "it_database",
      "icon": "",
      "nameOromo": "Boqonnaa 4: Sirna Kuusaa Deetaa (DBMS)",
      "nameAmharic": "ምዕራፍ 4፡ ዳታቤዝ ማኔጅመንትና SQL",
      "nameEnglish": "Unit 4: Database Systems & SQL"
    },
    {
      "id": "it_security",
      "icon": "",
      "nameOromo": "Boqonnaa 5: Nageenya Saayibarii fi Naamusaa",
      "nameAmharic": "ምዕራፍ 5፡ የሳይበር ደህንነትና ስነ-ምግባር",
      "nameEnglish": "Unit 5: Cybersecurity & Digital Ethics"
    }
  ],
  "general_business": [
    {
      "id": "all",
      "icon": "",
      "nameOromo": "Boqonnaalee Hunda (Waliigala Daldalaa)",
      "nameAmharic": "ሁሉንም ምዕራፎች (አጠቃላይ ቢዝነስ)",
      "nameEnglish": "All Units (Comprehensive General Business)"
    },
    {
      "id": "bus_intro",
      "icon": "",
      "nameOromo": "Boqonnaa 1: Seensa Daldalaa fi Dhaabbilee",
      "nameAmharic": "ምዕራፍ 1፡ የንግድ ድርጅቶችና አደረጃጀት",
      "nameEnglish": "Unit 1: Business Forms & Enterprise"
    },
    {
      "id": "bus_accounting",
      "icon": "",
      "nameOromo": "Boqonnaa 2: Herrega Daldalaa fi Galmee",
      "nameAmharic": "ምዕራፍ 2፡ የሂሳብ አያያዝ መርሆዎች",
      "nameEnglish": "Unit 2: Principles of Accounting"
    },
    {
      "id": "bus_marketing",
      "icon": "",
      "nameOromo": "Boqonnaa 3: Gabaa fi Beeksisa (Marketing)",
      "nameAmharic": "ምዕራፍ 3፡ ገበያ ጥናትና ማርኬቲንግ",
      "nameEnglish": "Unit 3: Marketing Mix & Strategy"
    },
    {
      "id": "bus_finance",
      "icon": "",
      "nameOromo": "Boqonnaa 4: Faayinaansii fi Baankii",
      "nameAmharic": "ምዕራፍ 4፡ ፋይናንስና ባንኪንግ",
      "nameEnglish": "Unit 4: Finance, Banking & ECX"
    }
  ],
  "hpe": [
    {
      "id": "all",
      "icon": "",
      "nameOromo": "Boqonnaalee Hunda (Waliigala HPE)",
      "nameAmharic": "ሁሉንም ምዕራፎች (አጠቃላይ ሰውነት ማጎልመሻ)",
      "nameEnglish": "All Units (Comprehensive HPE)"
    },
    {
      "id": "hpe_fitness",
      "icon": "",
      "nameOromo": "Boqonnaa 1: Fayyummaa Qaamaa fi Shaakala",
      "nameAmharic": "ምዕራፍ 1፡ የአካል ብቃትና ስልጠና",
      "nameEnglish": "Unit 1: Physical Fitness & Conditioning"
    },
    {
      "id": "hpe_sports",
      "icon": "",
      "nameOromo": "Boqonnaa 2: Seera Ispoortii fi Atileetiksii",
      "nameAmharic": "ምዕራፍ 2፡ የስፖርት ህጎችና አትሌቲክስ",
      "nameEnglish": "Unit 2: Sports Rules & Athletics History"
    },
    {
      "id": "hpe_health",
      "icon": "",
      "nameOromo": "Boqonnaa 3: Fayyaa, Nyaata fi Gargaarsa Duraa",
      "nameAmharic": "ምዕራፍ 3፡ ጤና፣ ስነ-ምግብና የመጀመሪያ እርዳታ",
      "nameEnglish": "Unit 3: Health, Nutrition & First Aid"
    }
  ],
  "default": [
    {
      "id": "all",
      "icon": "",
      "nameOromo": "Boqonnaalee Hunda (Waliigala)",
      "nameAmharic": "ሁሉንም ምዕራፎች (አጠቃላይ)",
      "nameEnglish": "All Units (Comprehensive Exam)"
    }
  ]
};

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
  if (/business|daldal|ቢዝነስ|ንግድ/i.test(titleLower)) return 'general_business';
  if (/pva|visual art|ጥበብ/i.test(titleLower)) return 'pva';
  if (/hpe|physical education|ሰውነት ማጎልመሻ/i.test(titleLower)) return 'hpe';

  return 'physics';
}

export const QuizGeneratorService = {
  /**
   * Return specific topics available for this book subject
   */
  getAvailableTopics(subjectCategory?: SubjectCategory, book?: Book): QuizTopicOption[] {
    const allTopic: QuizTopicOption = {
      id: 'all',
      icon: '',
      nameOromo: 'Boqonnaalee Hunda (Waliigala)',
      nameAmharic: 'ሁሉንም ምዕራፎች (አጠቃላይ)',
      nameEnglish: 'All Units (Comprehensive EUEE)'
    };

    const subject = subjectCategory || (book ? resolveSubjectCategory(book) : 'physics');
    let subjectKey = subject;
    if (subject === 'mathematics_natural' || subject === 'mathematics_social') {
      subjectKey = 'mathematics';
    }

    const predefinedList = SUBJECT_TOPICS_MAP[subjectKey] || SUBJECT_TOPICS_MAP['default'] || [];

    // Priority 1: If book has comprehensive chapters defined covering totalUnits, use them!
    if (book && book.chapters && book.chapters.length >= (book.totalUnits || 5)) {
      const dynamicUnits: QuizTopicOption[] = book.chapters.map((ch) => ({
        id: `unit_${ch.unitNumber}`,
        icon: '',
        nameOromo: `Boqonnaa ${ch.unitNumber}: ${ch.titleOromo || ch.title}`,
        nameAmharic: `ምዕራፍ ${ch.unitNumber}፡ ${ch.titleAmharic || ch.title}`,
        nameEnglish: `Unit ${ch.unitNumber}: ${ch.title}`
      }));
      return [allTopic, ...dynamicUnits];
    }

    // Priority 2: Use enriched SUBJECT_TOPICS_MAP which has all units (e.g. all 7 units for history, 6 for physics, etc.)
    if (predefinedList.length > 2) {
      return predefinedList;
    }

    // Fallback: If chapters exist, return them
    if (book && book.chapters && book.chapters.length > 0) {
      const dynamicUnits: QuizTopicOption[] = book.chapters.map((ch) => ({
        id: `unit_${ch.unitNumber}`,
        icon: '',
        nameOromo: `Boqonnaa ${ch.unitNumber}: ${ch.titleOromo || ch.title}`,
        nameAmharic: `ምዕራፍ ${ch.unitNumber}፡ ${ch.titleAmharic || ch.title}`,
        nameEnglish: `Unit ${ch.unitNumber}: ${ch.title}`
      }));
      return [allTopic, ...dynamicUnits];
    }

    return predefinedList;
  },

  /**
   * World-Class In-Book Quiz Generator for Grades 9-12 & EUEE
   * 100% Subject Isolated & 100% Unique Guaranteed:
   * Completely eliminates duplicate questions across all selectable question counts (25, 50, 100, 200)!
   */
  async extractBookExercisesFromPdf(
    pdfDoc: pdfjsLib.PDFDocumentProxy | null,
    book: Book,
    count: number = 25,
    selectedTopicId: string = 'all'
  ): Promise<QuizQuestion[]> {
    const resolvedSubject = resolveSubjectCategory(book);
    const targetLang = book.language || 'en';

    // 1. Filter master curriculum database by this book's exact subject
    const matchingFromMaster = EXAM_PRACTICE_QUESTIONS.filter((q) =>
      isQuestionMatchingSubject(q, resolvedSubject)
    );

    // 2. Filter raw templates by subject
    const matchingRaw = HIGH_SCHOOL_QUESTION_BANK.filter((q) =>
      isQuestionMatchingSubject({ subject: q.subject } as any, resolvedSubject)
    ).map((raw, idx) =>
      buildShuffledQuestion(raw, `raw-${raw.topicId}-${book.id}-${idx}`, targetLang)
    );

    let initialPool: QuizQuestion[] = [...matchingFromMaster, ...matchingRaw];

    // 3. Apply topic filter if a specific topic was selected
    if (selectedTopicId !== 'all') {
      const unitNum = selectedTopicId.startsWith('unit_')
        ? parseInt(selectedTopicId.replace('unit_', ''), 10)
        : parseInt(selectedTopicId, 10);

      const topicMatches = initialPool.filter((q) => {
        if (!isNaN(unitNum) && q.unitNumber === unitNum) return true;
        const titleLower = (q.chapterTitle || '').toLowerCase();
        const qLower = (q.question || '').toLowerCase();
        const idLower = (q.id || '').toLowerCase();
        const selLower = selectedTopicId.toLowerCase();
        return (
          idLower.includes(selLower) ||
          titleLower.includes(selLower) ||
          qLower.includes(selLower)
        );
      });
      if (topicMatches.length > 0) {
        initialPool = topicMatches;
      }
    }

    // 4. Strict Uniqueness Guarantee: Seed result set with unique matching questions
    const seen = new Set<string>();
    const questions: QuizQuestion[] = [];

    const shuffledInitial = shuffleArray(initialPool);
    for (const base of shuffledInitial) {
      if (questions.length >= count) break;
      const key = (base.question || '').trim().toLowerCase();
      if (!key || seen.has(key)) continue;

      seen.add(key);
      const assignedUnit = base.unitNumber ? base.unitNumber : ((questions.length % 6) + 1);
      questions.push({
        ...base,
        id: `inbook-${book.id}-q${questions.length + 1}`,
        unitNumber: assignedUnit,
        grade: book.grade,
      });
    }

    // 5. If more questions are needed to satisfy `count` (e.g. 25, 50, 100, 200 Qs on a specific topic or subject),
    // dynamically generate authentic procedural questions until count is reached with ZERO duplicates!
    let procIndex = 0;
    let safetyCounter = 0;
    while (questions.length < count && safetyCounter < Math.max(1000, count * 25)) {
      safetyCounter++;
      // If a single narrow subtopic is saturated with unique questions, broaden to 'all' so count is 100% reached
      const activeTopic = (safetyCounter > count * 2 && selectedTopicId !== 'all') ? 'all' : selectedTopicId;
      const proc = generateProceduralQuestion(
        resolvedSubject,
        activeTopic,
        procIndex,
        book.grade,
        targetLang
      );
      procIndex++;

      const key = (proc.question || '').trim().toLowerCase();
      if (!key || seen.has(key)) {
        continue;
      }

      seen.add(key);
      const assignedUnit = proc.unitNumber ? proc.unitNumber : ((questions.length % 6) + 1);
      questions.push({
        ...proc,
        id: `inbook-${book.id}-proc-q${questions.length + 1}`,
        unitNumber: assignedUnit,
        grade: book.grade,
      });
    }

    return questions;
  },
};
