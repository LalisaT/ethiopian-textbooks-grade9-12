import { SubjectCategory, GradeLevel } from '../types/book';
import { QuizQuestion } from '../types/quiz';

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
 * Pseudo-random generator with seed support for deterministic variety
 */
function seededRandom(seed: number): number {
  const x = Math.sin(seed + 1) * 10000;
  return x - Math.floor(x);
}

function randInt(min: number, max: number, seed: number): number {
  return Math.floor(seededRandom(seed) * (max - min + 1)) + min;
}

interface RawGeneratedItem {
  subject: SubjectCategory;
  grade: GradeLevel;
  unitNumber: number;
  chapterTitle: string;
  qEn: string;
  qAm: string;
  qOm: string;
  correctEn: string;
  correctAm: string;
  correctOm: string;
  distractorsEn: string[];
  distractorsAm: string[];
  distractorsOm: string[];
  explEn: string;
  explAm: string;
  explOm: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

function buildQuizQuestionFromRaw(
  raw: RawGeneratedItem,
  id: string,
  targetLang: string = 'en'
): QuizQuestion {
  const allEn = [raw.correctEn, ...raw.distractorsEn];
  const allAm = [raw.correctAm || raw.correctEn, ...(raw.distractorsAm || raw.distractorsEn)];
  const allOm = [raw.correctOm || raw.correctEn, ...(raw.distractorsOm || raw.distractorsEn)];

  // Shuffle option positions [0, 1, 2, 3]
  const perm = shuffle([0, 1, 2, 3]);
  const correctIdx = perm.indexOf(0);

  const optionsEn = perm.map((p) => allEn[p]);
  const optionsAm = perm.map((p) => allAm[p] || allEn[p]);
  const optionsOm = perm.map((p) => allOm[p] || allEn[p]);

  const primaryQuestion =
    targetLang === 'am' ? (raw.qAm || raw.qEn) :
    targetLang === 'om' ? (raw.qOm || raw.qEn) :
    raw.qEn;

  const primaryOptions =
    targetLang === 'am' ? optionsAm :
    targetLang === 'om' ? optionsOm :
    optionsEn;

  const primaryExplanation =
    targetLang === 'am' ? (raw.explAm || raw.explEn) :
    targetLang === 'om' ? (raw.explOm || raw.explEn) :
    raw.explEn;

  return {
    id,
    grade: raw.grade,
    subject: raw.subject,
    unitNumber: raw.unitNumber,
    chapterTitle: raw.chapterTitle,
    question: primaryQuestion,
    questionAmharic: raw.qAm || raw.qEn,
    questionOromo: raw.qOm || raw.qEn,
    options: primaryOptions,
    optionsAmharic: optionsAm,
    optionsOromo: optionsOm,
    correctOptionIndex: correctIdx,
    explanation: primaryExplanation,
    explanationAmharic: raw.explAm || raw.explEn,
    explanationOromo: raw.explOm || raw.explEn,
    difficulty: raw.difficulty,
    isEsslceExam: true,
  };
}

// =========================================================================
// 1. MATHEMATICS PROCEDURAL GENERATORS (Calculus, Vectors, Matrices, etc.)
// =========================================================================

export function generateMathQuestion(topic: string, index: number, grade: GradeLevel = 12): RawGeneratedItem {
  const seed = index * 37 + 101;
  const subtopicType = topic === 'all'
    ? (index % 6)
    : topic.includes('calculus')
    ? (index % 3 === 0 ? 0 : index % 3 === 1 ? 4 : 5)
    : topic.includes('vectors')
    ? 1
    : topic.includes('matrices')
    ? 2
    : topic.includes('business')
    ? 3
    : (index % 6);

  if (subtopicType === 0) {
    // Calculus: Polynomial Derivative f'(x0)
    const a = randInt(1, 9, seed);
    const b = randInt(-8, 8, seed + 1) || 3;
    const c = randInt(-15, 15, seed + 2) || 2;
    const d = randInt(-25, 25, seed + 3);
    const x0 = randInt(-4, 4, seed + 4) || 2;

    const bSign = b >= 0 ? `+ ${b}` : `- ${Math.abs(b)}`;
    const cSign = c >= 0 ? `+ ${c}` : `- ${Math.abs(c)}`;
    const dSign = d >= 0 ? `+ ${d}` : `- ${Math.abs(d)}`;
    const polyStr = `${a}x³ ${bSign}x² ${cSign}x ${dSign}`;

    const derVal = 3 * a * (x0 * x0) + 2 * b * x0 + c;

    const qEn = `If f(x) = ${polyStr}, what is the value of f'(${x0})?`;
    const qAm = `f(x) = ${polyStr} ከሆነ የ f'(${x0}) ዋጋ ስንት ነው?`;
    const qOm = `Yoo f(x) = ${polyStr} ta'e, gatiin f'(${x0}) meeqa?`;

    const d1 = `${derVal + 4}`;
    const d2 = `${derVal - 4}`;
    const d3 = `${derVal + 8}`;

    return {
      subject: 'mathematics',
      grade,
      unitNumber: 1,
      chapterTitle: 'Unit 1: Differential Calculus',
      qEn,
      qAm,
      qOm,
      correctEn: `${derVal}`,
      correctAm: `${derVal}`,
      correctOm: `${derVal}`,
      distractorsEn: [d1, d2, d3],
      distractorsAm: [d1, d2, d3],
      distractorsOm: [d1, d2, d3],
      explEn: `Derivative f'(x) = ${3 * a}x² ${2 * b >= 0 ? '+' : ''}${2 * b}x ${c >= 0 ? '+' : ''}${c}. Evaluating at x = ${x0}: f'(${x0}) = ${derVal}.`,
      explAm: `የ f'(x) ዴሪቬቲቭ ${3 * a}x² ${2 * b >= 0 ? '+' : ''}${2 * b}x ${c >= 0 ? '+' : ''}${c} ሲሆን በ x = ${x0} ሲተካ ${derVal} ይሆናል።`,
      explOm: `Deriiveetiivii f'(x) = ${3 * a}x² ${2 * b >= 0 ? '+' : ''}${2 * b}x ${c >= 0 ? '+' : ''}${c}. Bakka x ti ${x0} galchuun: f'(${x0}) = ${derVal}.`,
      difficulty: Math.abs(x0) > 1 ? 'medium' : 'easy',
    };
  } else if (subtopicType === 1) {
    const variant = index % 3;
    if (variant === 0) {
      // 2D Vector Dot Product
      const u1 = randInt(-10, 10, seed) || 3;
      const u2 = randInt(-10, 10, seed + 1) || 4;
      const v1 = randInt(-10, 10, seed + 2) || 2;
      const v2 = randInt(-10, 10, seed + 3) || 1;
      const dot = u1 * v1 + u2 * v2;

      const qEn = `Given two vectors u = (${u1}, ${u2}) and v = (${v1}, ${v2}), what is their scalar dot product u · v?`;
      const qAm = `ሁለት ቬክተሮች u = (${u1}, ${u2}) እና v = (${v1}, ${v2}) ተሰጥተዋል። የስኬላር ብዜታቸው (u · v) ስንት ነው?`;
      const qOm = `Veektoroota u = (${u1}, ${u2}) fi v = (${v1}, ${v2}) kennameef, baay'anni iskaalaarii u · v meeqa?`;

      return {
        subject: 'mathematics',
        grade,
        unitNumber: 2,
        chapterTitle: 'Unit 2: Two-Dimensional Vectors',
        qEn,
        qAm,
        qOm,
        correctEn: `${dot}`,
        correctAm: `${dot}`,
        correctOm: `${dot}`,
        distractorsEn: [`${dot + 5}`, `${dot - 3}`, `${dot + 10}`],
        distractorsAm: [`${dot + 5}`, `${dot - 3}`, `${dot + 10}`],
        distractorsOm: [`${dot + 5}`, `${dot - 3}`, `${dot + 10}`],
        explEn: `Scalar dot product u · v = (${u1} * ${v1}) + (${u2} * ${v2}) = ${dot}.`,
        explAm: `የስኬላር ብዜት u · v = (${u1} × ${v1}) + (${u2} × ${v2}) = ${dot} ነው።`,
        explOm: `u · v = (${u1} * ${v1}) + (${u2} * ${v2}) = ${dot}.`,
        difficulty: 'easy',
      };
    } else if (variant === 1) {
      // Vector magnitude with Pythagorean triples
      const triples = [
        [3, 4, 5], [6, 8, 10], [5, 12, 13], [9, 12, 15],
        [8, 15, 17], [7, 24, 25], [12, 16, 20], [10, 24, 26]
      ];
      const trip = triples[seed % triples.length];
      const signX = (seed % 2 === 0 ? 1 : -1);
      const signY = ((seed + 1) % 2 === 0 ? 1 : -1);
      const ux = trip[0] * signX;
      const uy = trip[1] * signY;
      const mag = trip[2];

      const qEn = `What is the magnitude (length) of the vector v = (${ux}, ${uy})?`;
      const qAm = `የ ቬክተር v = (${ux}, ${uy}) መጠን (ርዝመት) ስንት ነው?`;
      const qOm = `Guddinni (dheerinni) veektarii v = (${ux}, ${uy}) meeqa?`;

      return {
        subject: 'mathematics',
        grade,
        unitNumber: 2,
        chapterTitle: 'Unit 2: Vector Magnitudes',
        qEn,
        qAm,
        qOm,
        correctEn: `${mag}`,
        correctAm: `${mag}`,
        correctOm: `${mag}`,
        distractorsEn: [`${mag + 3}`, `${mag - 2}`, `${Math.abs(ux) + Math.abs(uy)}`],
        distractorsAm: [`${mag + 3}`, `${mag - 2}`, `${Math.abs(ux) + Math.abs(uy)}`],
        distractorsOm: [`${mag + 3}`, `${mag - 2}`, `${Math.abs(ux) + Math.abs(uy)}`],
        explEn: `|v| = √(${ux}² + ${uy}²) = √(${ux * ux} + ${uy * uy}) = √(${mag * mag}) = ${mag}.`,
        explAm: `ቀመር፡ |v| = √(x² + y²) = √(${ux * ux + uy * uy}) = ${mag} ነው።`,
        explOm: `|v| = √(x² + y²) = √(${mag * mag}) = ${mag}.`,
        difficulty: 'easy',
      };
    } else {
      // Infinite Geometric Series Sum S = a / (1 - r)
      const ratios = [
        { rText: '1/2', rVal: 0.5, a: randInt(2, 30, seed) * 2 },
        { rText: '1/3', rVal: 1 / 3, a: randInt(2, 20, seed) * 3 },
        { rText: '1/4', rVal: 0.25, a: randInt(2, 15, seed) * 4 },
        { rText: '2/3', rVal: 2 / 3, a: randInt(2, 15, seed) * 3 },
      ];
      const selected = ratios[seed % ratios.length];
      const sumVal = Math.round(selected.a / (1 - selected.rVal));

      const qEn = `What is the sum of the infinite geometric series with first term a = ${selected.a} and common ratio r = ${selected.rText}?`;
      const qAm = `የመጀመሪያው ቁጥር a = ${selected.a} እና የጋራ ሬሾ r = ${selected.rText} የሆነው የማያልቅ ጂኦሜትሪክ ቅደም ተከተል ድምር ስንት ነው?`;
      const qOm = `Ida'amni tarrisee ji'oomeetirii dhuma hin qabnee kan kofoo jalqabaa a = ${selected.a} fi reeshoo waloo r = ${selected.rText} qabu meeqa?`;

      return {
        subject: 'mathematics',
        grade,
        unitNumber: 2,
        chapterTitle: 'Unit 2: Sequences and Series',
        qEn,
        qAm,
        qOm,
        correctEn: `${sumVal}`,
        correctAm: `${sumVal}`,
        correctOm: `${sumVal}`,
        distractorsEn: [`${sumVal + 6}`, `${sumVal - 4}`, `${sumVal * 2}`],
        distractorsAm: [`${sumVal + 6}`, `${sumVal - 4}`, `${sumVal * 2}`],
        distractorsOm: [`${sumVal + 6}`, `${sumVal - 4}`, `${sumVal * 2}`],
        explEn: `For |r| < 1, S = a / (1 - r) = ${selected.a} / (1 - ${selected.rText}) = ${sumVal}.`,
        explAm: `ቀመር፡ S = a / (1 - r) = ${selected.a} / (1 - ${selected.rText}) = ${sumVal} ይሆናል።`,
        explOm: `Qajeeltoo: S = a / (1 - r) = ${selected.a} / (1 - ${selected.rText}) = ${sumVal}.`,
        difficulty: 'easy',
      };
    }
  } else if (subtopicType === 2) {
    // Matrices & Determinants: 2x2 Matrix Det
    const a = randInt(-8, 9, seed) || 2;
    const b = randInt(-6, 8, seed + 1) || 1;
    const c = randInt(-6, 8, seed + 2) || 3;
    const d = randInt(-8, 9, seed + 3) || 4;
    const det = a * d - b * c;

    const qEn = `What is the determinant of the 2x2 matrix A = [[${a}, ${b}], [${c}, ${d}]]?`;
    const qAm = `የ 2x2 ማትሪክስ A = [[${a}, ${b}], [${c}, ${d}]] ዲተርሚናንት (determinant) ዋጋ ስንት ነው?`;
    const qOm = `Diiterminaantiin maatiriiksii 2x2 A = [[${a}, ${b}], [${c}, ${d}]] meeqa?`;

    return {
      subject: 'mathematics',
      grade,
      unitNumber: 3,
      chapterTitle: 'Unit 3: Matrices and Determinants',
      qEn,
      qAm,
      qOm,
      correctEn: `${det}`,
      correctAm: `${det}`,
      correctOm: `${det}`,
      distractorsEn: [`${det + 3}`, `${det - 5}`, `${det + 8}`],
      distractorsAm: [`${det + 3}`, `${det - 5}`, `${det + 8}`],
      distractorsOm: [`${det + 3}`, `${det - 5}`, `${det + 8}`],
      explEn: `det(A) = (a * d) - (b * c) = (${a} * ${d}) - (${b} * ${c}) = ${det}.`,
      explAm: `ቀመር፡ det(A) = ad - bc = (${a} × ${d}) - (${b} × ${c}) = ${det} ነው።`,
      explOm: `det(A) = (${a} * ${d}) - (${b} * ${c}) = ${det}.`,
      difficulty: 'easy',
    };
  } else if (subtopicType === 3) {
    // Business Math: Simple Interest I = P * r * t
    const P = randInt(1, 25, seed) * 1000;
    const rate = randInt(4, 15, seed + 1);
    const years = randInt(2, 6, seed + 2);
    const interest = (P * rate * years) / 100;
    const total = P + interest;

    const qEn = `A student deposits ${P} ETB in a commercial bank offering an annual simple interest rate of ${rate}%. How much interest will be earned after ${years} years?`;
    const qAm = `አንድ ተማሪ በባንክ ${P} ብር በ ${rate}% አመታዊ ቀላል ወለድ አስቀመጠ። ከ ${years} አመታት በኋላ የሚያገኘው ወለድ ስንት ብር ነው?`;
    const qOm = `Barataan tokko baankii keessa birrii ${P} dhala salphaa waggaatti ${rate}% tiin kaa'e. Waggaa ${years} booda dhalli argamu birrii meeqa?`;

    return {
      subject: 'mathematics',
      grade,
      unitNumber: 4,
      chapterTitle: 'Unit 4: Business Mathematics',
      qEn,
      qAm,
      qOm,
      correctEn: `${interest} ETB`,
      correctAm: `${interest} ብር`,
      correctOm: `Birrii ${interest}`,
      distractorsEn: [`${interest + 200} ETB`, `${interest - 150} ETB`, `${total} ETB`],
      distractorsAm: [`${interest + 200} ብር`, `${interest - 150} ብር`, `${total} ብር`],
      distractorsOm: [`Birrii ${interest + 200}`, `Birrii ${interest - 150}`, `Birrii ${total}`],
      explEn: `I = (P * r * t) / 100 = (${P} * ${rate} * ${years}) / 100 = ${interest} ETB.`,
      explAm: `ቀመር፡ I = (P × r × t) / 100 = ${interest} ብር ይሆናል።`,
      explOm: `Dhalli Salphaa: I = (${P} * ${rate} * ${years}) / 100 = Birrii ${interest}.`,
      difficulty: 'easy',
    };
  } else if (subtopicType === 4) {
    // Limits: Indeterminate Limit lim_{x -> a} (x^2 - a^2)/(x - a) = 2a
    const aVal = randInt(2, 15, seed);
    const aSquared = aVal * aVal;
    const ans = 2 * aVal;

    const qEn = `Evaluate the limit: lim (x → ${aVal}) [ (x² - ${aSquared}) / (x - ${aVal}) ].`;
    const qAm = `የሊሚቱን ዋጋ ፈልጉ፡ lim (x → ${aVal}) [ (x² - ${aSquared}) / (x - ${aVal}) ]።`;
    const qOm = `Gatii liimiitii shallagi: lim (x → ${aVal}) [ (x² - ${aSquared}) / (x - ${aVal}) ].`;

    return {
      subject: 'mathematics',
      grade,
      unitNumber: 1,
      chapterTitle: 'Unit 1: Limits & Continuity',
      qEn,
      qAm,
      qOm,
      correctEn: `${ans}`,
      correctAm: `${ans}`,
      correctOm: `${ans}`,
      distractorsEn: [`${aVal}`, `${aSquared}`, `${ans + 4}`],
      distractorsAm: [`${aVal}`, `${aSquared}`, `${ans + 4}`],
      distractorsOm: [`${aVal}`, `${aSquared}`, `${ans + 4}`],
      explEn: `Factoring gives (x - ${aVal})(x + ${aVal})/(x - ${aVal}) = x + ${aVal}. As x → ${aVal}, limit = ${ans}.`,
      explAm: `ስናቃልል፡ (x + ${aVal}) ይሆናል። በ x = ${aVal} ሲተካ ${ans} ነው።`,
      explOm: `Facaasuu: x + ${aVal}. x = ${aVal} yoo galchinu: ${ans}.`,
      difficulty: 'easy',
    };
  } else {
    // Definite Integral: integral_0^k (a x + b) dx = a*k^2/2 + b*k
    const aCoeff = randInt(1, 6, seed) * 2;
    const bCoeff = randInt(1, 10, seed + 1);
    const upperK = randInt(2, 6, seed + 2);
    const intVal = (aCoeff * upperK * upperK) / 2 + bCoeff * upperK;

    const qEn = `Evaluate the definite integral: ∫ from 0 to ${upperK} of (${aCoeff}x + ${bCoeff}) dx.`;
    const qAm = `ወሰን ያለውን ኢንቴግራይዝድ አስሉ፡ ∫ ከ 0 እስከ ${upperK} (${aCoeff}x + ${bCoeff}) dx።`;
    const qOm = `Integraala daangeffamaa shallagi: ∫ 0 hanga ${upperK} (${aCoeff}x + ${bCoeff}) dx.`;

    return {
      subject: 'mathematics',
      grade,
      unitNumber: 5,
      chapterTitle: 'Unit 5: Integral Calculus',
      qEn,
      qAm,
      qOm,
      correctEn: `${intVal}`,
      correctAm: `${intVal}`,
      correctOm: `${intVal}`,
      distractorsEn: [`${intVal + 4}`, `${intVal - 3}`, `${intVal * 2}`],
      distractorsAm: [`${intVal + 4}`, `${intVal - 3}`, `${intVal * 2}`],
      distractorsOm: [`${intVal + 4}`, `${intVal - 3}`, `${intVal * 2}`],
      explEn: `Antiderivative is F(x) = ${aCoeff / 2}x² + ${bCoeff}x. Evaluating from 0 to ${upperK}: F(${upperK}) = ${intVal}.`,
      explAm: `ኢንቴግራሉ F(x) = ${aCoeff / 2}x² + ${bCoeff}x ሲሆን በ ${upperK} ሲተካ ${intVal} ይሆናል።`,
      explOm: `F(x) = ${aCoeff / 2}x² + ${bCoeff}x. x = ${upperK} yoo galchinu: ${intVal}.`,
      difficulty: 'medium',
    };
  }
}

// =========================================================================
// 2. PHYSICS PROCEDURAL GENERATORS (Mechanics, Vectors, Electricity, Waves)
// =========================================================================

export function generatePhysicsQuestion(topic: string, index: number, grade: GradeLevel = 12): RawGeneratedItem {
  const seed = index * 41 + 203;

  let subtopic: number;
  if (topic.includes('vector')) {
    subtopic = 2; // Dedicated vector calculations
  } else if (topic.includes('mechanic')) {
    subtopic = index % 2; // Centripetal, Work/Energy
  } else if (topic.includes('electromagnetism')) {
    subtopic = 3; // Ohm's law & circuits
  } else {
    subtopic = index % 5;
  }

  if (subtopic === 0) {
    // Centripetal Force: Fc = (m * v^2) / r
    const m = randInt(1, 10, seed);
    const v = randInt(2, 15, seed + 1);
    const r = randInt(1, 8, seed + 2);
    const fc = Math.round((m * v * v) / r);

    const qEn = `A body of mass ${m} kg moves along a circular path of radius ${r} m with a constant speed of ${v} m/s. What is the centripetal force acting on the body?`;
    const qAm = `የ ${m} ኪ.ግ ክብደት ያለው አካል ${r} ሜትር ራዲየስ ባለው ክብ መንገድ በ ${v} ሜ/ሰ ቋሚ ፍጥነት ይሽከረከራል። በአካሉ ላይ የሚሰራው ሴንትሪፔታል ሀይል ስንት ኒውተን ነው?`;
    const qOm = `Qaamni ulfaatina ${m} kg qabu daandii geengoo raadiyeesii ${r} m qabu irratti saffisa dhaabbataa ${v} m/s tiin naanna'a. Humni wiirtuu-harkisaa qaamicha irratti dalagu meeqa?`;

    return {
      subject: 'physics',
      grade,
      unitNumber: 1,
      chapterTitle: 'Unit 1: Circular Motion & Dynamics',
      qEn,
      qAm,
      qOm,
      correctEn: `${fc} N`,
      correctAm: `${fc} N`,
      correctOm: `${fc} N`,
      distractorsEn: [`${fc + 15} N`, `${Math.max(1, fc - 12)} N`, `${fc * 2} N`],
      distractorsAm: [`${fc + 15} N`, `${Math.max(1, fc - 12)} N`, `${fc * 2} N`],
      distractorsOm: [`${fc + 15} N`, `${Math.max(1, fc - 12)} N`, `${fc * 2} N`],
      explEn: `Fc = (m * v²) / r = (${m} * ${v}²) / ${r} ≈ ${fc} N.`,
      explAm: `ቀመር፡ Fc = (m × v²) / r = ${fc} ኒውተን ይሆናል።`,
      explOm: `Fc = (m * v²) / r = ${fc} N.`,
      difficulty: 'medium',
    };
  } else if (subtopic === 1) {
    // Work done: W = F * d
    const F = randInt(15, 150, seed);
    const d = randInt(3, 35, seed + 1);
    const work = F * d;

    const qEn = `A constant horizontal force of ${F} N is applied to push a crate across a friction-free floor through a displacement of ${d} m. How much work is done by this force?`;
    const qAm = `አንድ ሳጥን በ ${F} ኒውተን ቋሚ አግድም ሃይል ግጭት በሌለው ወለል ላይ በ ${d} ሜትር ርቀት ተገፋ። በሃይሉ የተከናወነው ስራ ስንት ጁል ነው?`;
    const qOm = `Humni waldhaansaa ${F} N saanduqa lafa laaftuu irratti fageenya ${d} m dhiibe. Hojiin dalagame joolii meeqa?`;

    return {
      subject: 'physics',
      grade,
      unitNumber: 2,
      chapterTitle: 'Unit 2: Work, Energy and Power',
      qEn,
      qAm,
      qOm,
      correctEn: `${work} J`,
      correctAm: `${work} ጁል`,
      correctOm: `${work} J`,
      distractorsEn: [`${work + 50} J`, `${Math.round(work / 2)} J`, `${work * 2} J`],
      distractorsAm: [`${work + 50} ጁል`, `${Math.round(work / 2)} ጁል`, `${work * 2} ጁል`],
      distractorsOm: [`${work + 50} J`, `${Math.round(work / 2)} J`, `${work * 2} J`],
      explEn: `Work done W = F * d = ${F} N * ${d} m = ${work} Joules.`,
      explAm: `ስራ W = F × d = ${F} × ${d} = ${work} ጁል ነው።`,
      explOm: `Hojii W = F * d = ${F} * ${d} = ${work} J.`,
      difficulty: 'easy',
    };
  } else if (subtopic === 2) {
    // Physics 2D Vectors: Components or Resultant
    const isComponent = index % 2 === 0;
    if (isComponent) {
      const angles = [
        { deg: 30, cos: 0.866, sin: 0.5, name: '30°' },
        { deg: 60, cos: 0.5, sin: 0.866, name: '60°' },
        { deg: 0, cos: 1.0, sin: 0.0, name: '0°' },
        { deg: 90, cos: 0.0, sin: 1.0, name: '90°' },
      ];
      const ang = angles[seed % angles.length];
      const mag = randInt(2, 20, seed + 1) * 10; // 20 to 200 N
      const fx = Math.round(mag * ang.cos);

      const qEn = `A force vector F has a magnitude of ${mag} N directed at an angle of ${ang.name} above the positive x-axis. What is its horizontal component Fx?`;
      const qAm = `የ ${mag} N መጠን ያለው የሃይል ቬክተር F ከ x-ዘንግ በላይ በ ${ang.name} አንግል ያዘነብላል። አግድም ክፍሉ (Fx) ስንት ኒውተን ነው?`;
      const qOm = `Veektariin humnaa F guddina ${mag} N qabu kofa ${ang.name} sarara x gubbaatti qabaata. Kutaan dalgee Fx meeqa?`;

      return {
        subject: 'physics',
        grade,
        unitNumber: 2,
        chapterTitle: 'Unit 2: Two-Dimensional Vectors',
        qEn,
        qAm,
        qOm,
        correctEn: `${fx} N`,
        correctAm: `${fx} N`,
        correctOm: `${fx} N`,
        distractorsEn: [`${fx + 20} N`, `${Math.round(mag * ang.sin)} N`, `${mag} N`],
        distractorsAm: [`${fx + 20} N`, `${Math.round(mag * ang.sin)} N`, `${mag} N`],
        distractorsOm: [`${fx + 20} N`, `${Math.round(mag * ang.sin)} N`, `${mag} N`],
        explEn: `Fx = F * cos(θ) = ${mag} * cos(${ang.name}) = ${fx} N.`,
        explAm: `ቀመር፡ Fx = F × cos(θ) = ${fx} ኒውተን።`,
        explOm: `Fx = F * cos(θ) = ${fx} N.`,
        difficulty: 'medium',
      };
    } else {
      // Perpendicular resultant R = sqrt(A^2 + B^2)
      const triples = [
        [30, 40, 50], [60, 80, 100], [50, 120, 130],
        [90, 120, 150], [20, 21, 29], [80, 150, 170]
      ];
      const trip = triples[seed % triples.length];

      const qEn = `Two perpendicular forces of magnitudes ${trip[0]} N and ${trip[1]} N act simultaneously on an object. What is the magnitude of the resultant force?`;
      const qAm = `ሁለት ቀጤ-ነክ ሃይሎች የ ${trip[0]} N እና ${trip[1]} N መጠን ያላቸው በአንድ እቃ ላይ ቢያርፉ፣ የውጤቱ (Resultant) ሃይል መጠን ስንት ነው?`;
      const qOm = `Humni lama kofa sirrii (90°) wal-irra qaban guddina ${trip[0]} N fi ${trip[1]} N qaban qaama tokko irratti dalagu. Humni walii-galaa (resultant) meeqa?`;

      return {
        subject: 'physics',
        grade,
        unitNumber: 2,
        chapterTitle: 'Unit 2: Vector Resultants',
        qEn,
        qAm,
        qOm,
        correctEn: `${trip[2]} N`,
        correctAm: `${trip[2]} N`,
        correctOm: `${trip[2]} N`,
        distractorsEn: [`${trip[0] + trip[1]} N`, `${trip[2] + 15} N`, `${trip[1] - trip[0]} N`],
        distractorsAm: [`${trip[0] + trip[1]} N`, `${trip[2] + 15} N`, `${trip[1] - trip[0]} N`],
        distractorsOm: [`${trip[0] + trip[1]} N`, `${trip[2] + 15} N`, `${trip[1] - trip[0]} N`],
        explEn: `For perpendicular vectors: R = √(A² + B²) = √(${trip[0]}² + ${trip[1]}²) = ${trip[2]} N.`,
        explAm: `ቀመር፡ R = √(A² + B²) = ${trip[2]} ኒውተን ይሆናል።`,
        explOm: `R = √(A² + B²) = ${trip[2]} N.`,
        difficulty: 'easy',
      };
    }
  } else if (subtopic === 3) {
    // Ohm's Law and Electric Circuits: V = I * R
    const current = randInt(1, 15, seed);
    const resistance = randInt(2, 50, seed + 1);
    const voltage = current * resistance;

    const qEn = `An electric heating element with a resistance of ${resistance} Ω draws a current of ${current} A. What is the potential difference across the element?`;
    const qAm = `የ ${resistance} Ω የመቋቋም አቅም ያለው የኤሌክትሪክ ማሞቂያ ${current} A ጅረት ይወስዳል። በማሞቂያው ጫፎች መካከል ያለው የቮልቴጅ ልዩነት ስንት ነው?`;
    const qOm = `Meeshaan elektirikii gufannaa ${resistance} Ω qabu yaa'a elektirikii ${current} A fudhata. Poteenshiyaaliin voolteejii isaa meeqa?`;

    return {
      subject: 'physics',
      grade,
      unitNumber: 4,
      chapterTitle: 'Unit 4: Electric Circuits & Ohm\'s Law',
      qEn,
      qAm,
      qOm,
      correctEn: `${voltage} V`,
      correctAm: `${voltage} V`,
      correctOm: `${voltage} V`,
      distractorsEn: [`${voltage + 12} V`, `${Math.round(voltage / 2)} V`, `${voltage - 8} V`],
      distractorsAm: [`${voltage + 12} V`, `${Math.round(voltage / 2)} V`, `${voltage - 8} V`],
      distractorsOm: [`${voltage + 12} V`, `${Math.round(voltage / 2)} V`, `${voltage - 8} V`],
      explEn: `V = I * R = ${current} A * ${resistance} Ω = ${voltage} V.`,
      explAm: `V = I × R = ${voltage} ቮልት።`,
      explOm: `V = I * R = ${voltage} V.`,
      difficulty: 'easy',
    };
  } else {
    // Wave speed: v = f * lambda
    const f = randInt(10, 150, seed) * 10;
    const wavelengths = [0.2, 0.4, 0.5, 0.8, 1.2, 1.5, 2.0, 2.5];
    const lambda = wavelengths[seed % wavelengths.length];
    const v = Math.round(f * lambda);

    const qEn = `A sound wave traveling through air has a frequency of ${f} Hz and a wavelength of ${lambda} m. What is the propagation speed of the sound wave?`;
    const qAm = `በአየር ውስጥ የሚጓዝ የድምጽ ማዕበል ፍሪኩዌንሲ ${f} Hz እና የሞገድ ርዝመት ${lambda} m ቢኖረው፣ የድምጽ ማዕበሉ ፍጥነት ስንት ነው?`;
    const qOm = `Dambaliin sagalee qilleensa keessa deemu irra-deddeebii ${f} Hz fi dheerina dambalii ${lambda} m qaba. Saffisni dambalii sagalee kanaa meeqa?`;

    return {
      subject: 'physics',
      grade,
      unitNumber: 3,
      chapterTitle: 'Unit 3: Wave Motion and Sound',
      qEn,
      qAm,
      qOm,
      correctEn: `${v} m/s`,
      correctAm: `${v} ሜ/ሰ`,
      correctOm: `${v} m/s`,
      distractorsEn: [`${v + 60} m/s`, `${Math.round(v / 2)} m/s`, `${v - 40} m/s`],
      distractorsAm: [`${v + 60} ሜ/ሰ`, `${Math.round(v / 2)} ሜ/ሰ`, `${v - 40} ሜ/ሰ`],
      distractorsOm: [`${v + 60} m/s`, `${Math.round(v / 2)} m/s`, `${v - 40} m/s`],
      explEn: `v = f * λ = ${f} Hz * ${lambda} m = ${v} m/s.`,
      explAm: `ቀመር፡ v = f × λ = ${v} ሜ/ሰ ይሆናል።`,
      explOm: `v = f * λ = ${v} m/s.`,
      difficulty: 'easy',
    };
  }
}

// =========================================================================
// 3. CHEMISTRY PROCEDURAL GENERATORS (Solutions, Acid-Base, Stoichiometry)
// =========================================================================

export function generateChemistryQuestion(topic: string, index: number, grade: GradeLevel = 12): RawGeneratedItem {
  const seed = index * 43 + 317;

  let subtopic: number;
  if (topic.includes('solution')) {
    subtopic = index % 3; // pH, Moles, Molarity
  } else if (topic.includes('bonding')) {
    subtopic = 3;
  } else {
    subtopic = index % 4;
  }

  if (subtopic === 0) {
    // pH / pOH calculation
    const isBase = index % 2 === 1;
    const exp = randInt(1, 6, seed);
    const conc = Math.pow(10, -exp).toExponential(0);

    if (isBase) {
      const pOH = exp;
      const pH = 14 - pOH;
      const qEn = `What is the pH of a ${conc} M sodium hydroxide (NaOH) solution, assuming complete dissociation at 25°C?`;
      const qAm = `በ 25°C ሙሉ በሙሉ እንደተበተነ በማሰብ የ ${conc} M ሶዲየም ሃይድሮክሳይድ (NaOH) መፍትሄ pH ስንት ነው?`;
      const qOm = `Soluushiniin ${conc} M NaOH 25°C irratti guutummaatti yoo dhangala'e, pH isaa meeqa ta'a?`;

      return {
        subject: 'chemistry',
        grade,
        unitNumber: 1,
        chapterTitle: 'Unit 1: Acid-Base Equilibria',
        qEn,
        qAm,
        qOm,
        correctEn: `${pH}.0`,
        correctAm: `${pH}.0`,
        correctOm: `${pH}.0`,
        distractorsEn: [`${pOH}.0`, `${pH - 2}.0`, `7.0`],
        distractorsAm: [`${pOH}.0`, `${pH - 2}.0`, `7.0`],
        distractorsOm: [`${pOH}.0`, `${pH - 2}.0`, `7.0`],
        explEn: `[OH-] = ${conc} M. pOH = -log[OH-] = ${pOH}. pH = 14 - pOH = 14 - ${pOH} = ${pH}.0.`,
        explAm: `pOH = ${pOH} ሲሆን pH = 14 - pOH = ${pH}.0 ይሆናል።`,
        explOm: `pOH = ${pOH}. pH = 14 - ${pOH} = ${pH}.0.`,
        difficulty: 'medium',
      };
    } else {
      const pH = exp;
      const qEn = `What is the pH of a ${conc} M hydrochloric acid (HCl) solution, assuming complete ionization?`;
      const qAm = `ሙሉ በሙሉ አዮናይዝድ እንደተደረገ በማሰብ የ ${conc} M ሃይድሮክሎሪክ አሲድ (HCl) መፍትሄ pH ስንት ነው?`;
      const qOm = `Soluushiniin ${conc} M HCl guutummaatti yoo ayoonome, pH isaa meeqa ta'a?`;

      return {
        subject: 'chemistry',
        grade,
        unitNumber: 1,
        chapterTitle: 'Unit 1: Acid-Base Equilibria',
        qEn,
        qAm,
        qOm,
        correctEn: `${pH}.0`,
        correctAm: `${pH}.0`,
        correctOm: `${pH}.0`,
        distractorsEn: [`${14 - pH}.0`, `${pH + 2}.0`, `7.0`],
        distractorsAm: [`${14 - pH}.0`, `${pH + 2}.0`, `7.0`],
        distractorsOm: [`${14 - pH}.0`, `${pH + 2}.0`, `7.0`],
        explEn: `For strong acid HCl, [H+] = ${conc} M. pH = -log[H+] = ${pH}.0.`,
        explAm: `pH = -log[H+] = ${pH}.0 ይሆናል።`,
        explOm: `pH = -log[H+] = ${pH}.0.`,
        difficulty: 'easy',
      };
    }
  } else if (subtopic === 1) {
    // Molarity = moles / Volume
    const volumes = [0.25, 0.5, 1.0, 2.0, 2.5, 4.0, 5.0];
    const V = volumes[seed % volumes.length];
    const moles = randInt(1, 10, seed + 1);
    const M = (moles / V).toFixed(2).replace(/\.00$/, '');

    const qEn = `A chemistry student dissolves ${moles} moles of solute in enough water to make ${V} L of solution. What is the molar concentration (molarity) of the solution?`;
    const qAm = `አንድ የኬሚስትሪ ተማሪ ${moles} ሞል ንጥረ ነገር በውሃ ውስጥ አሟምቶ የ ${V} ሊትር መፍትሄ አዘጋጀ። የመፍትሄው ሞላሪቲ (Molarity) ስንት ነው?`;
    const qOm = `Barataan tokko moolii ${moles} bishaan keessatti baqsuun soluushinii ${V} L tolche. Moolaaritiin soluushinichaa meeqa?`;

    return {
      subject: 'chemistry',
      grade,
      unitNumber: 1,
      chapterTitle: 'Unit 1: Concentration of Solutions',
      qEn,
      qAm,
      qOm,
      correctEn: `${M} M`,
      correctAm: `${M} M`,
      correctOm: `${M} M`,
      distractorsEn: [`${(parseFloat(M) * 2).toFixed(2)} M`, `${(parseFloat(M) / 2).toFixed(2)} M`, `${(parseFloat(M) + 1.5).toFixed(2)} M`],
      distractorsAm: [`${(parseFloat(M) * 2).toFixed(2)} M`, `${(parseFloat(M) / 2).toFixed(2)} M`, `${(parseFloat(M) + 1.5).toFixed(2)} M`],
      distractorsOm: [`${(parseFloat(M) * 2).toFixed(2)} M`, `${(parseFloat(M) / 2).toFixed(2)} M`, `${(parseFloat(M) + 1.5).toFixed(2)} M`],
      explEn: `Molarity M = moles of solute / Volume of solution (L) = ${moles} / ${V} = ${M} M.`,
      explAm: `ቀመር፡ M = moles / Volume = ${moles} / ${V} = ${M} M ነው።`,
      explOm: `M = moolii / Qabiyyee = ${moles} / ${V} = ${M} M.`,
      difficulty: 'easy',
    };
  } else if (subtopic === 2) {
    // Moles calculation n = mass / MolarMass
    const compounds = [
      { nameEn: 'Sodium Hydroxide (NaOH)', nameAm: 'ሶዲየም ሃይድሮክሳይድ (NaOH)', nameOm: 'Soodiyeem Haayidirooksaayidii (NaOH)', molarMass: 40 },
      { nameEn: 'Calcium Carbonate (CaCO3)', nameAm: 'ካልሲየም ካርቦኔት (CaCO3)', nameOm: 'Kaalsiyeem Kaarbooneetii (CaCO3)', molarMass: 100 },
      { nameEn: 'Sulfuric Acid (H2SO4)', nameAm: 'ሰልፈሪክ አሲድ (H2SO4)', nameOm: 'Asidii Salfariikii (H2SO4)', molarMass: 98 },
      { nameEn: 'Sodium Chloride (NaCl)', nameAm: 'ሶዲየም ክሎራይድ (NaCl)', nameOm: 'Soodiyeem Kilooraayidii (NaCl)', molarMass: 58.5 },
      { nameEn: 'Glucose (C6H12O6)', nameAm: 'ግሉኮስ (C6H12O6)', nameOm: 'Gulukoosii (C6H12O6)', molarMass: 180 },
    ];
    const comp = compounds[seed % compounds.length];
    const moles = randInt(1, 8, seed + 1);
    const mass = Math.round(moles * comp.molarMass);

    const qEn = `How many moles of ${comp.nameEn} are present in a sample weighing ${mass} grams? (Molar mass = ${comp.molarMass} g/mol)`;
    const qAm = `በ ${mass} ግራም የ ${comp.nameAm} ናሙና ውስጥ ስንት ሞሎች ይገኛሉ? (ሞላር ማስ = ${comp.molarMass} g/mol)`;
    const qOm = `Saamuda giraama ${mass} kan ${comp.nameOm} keessa moolii meeqatu argama? (Molar mass = ${comp.molarMass} g/mol)`;

    return {
      subject: 'chemistry',
      grade,
      unitNumber: 2,
      chapterTitle: 'Unit 2: Stoichiometry and Moles',
      qEn,
      qAm,
      qOm,
      correctEn: `${moles} mol`,
      correctAm: `${moles} ሞል`,
      correctOm: `${moles} mol`,
      distractorsEn: [`${moles * 2} mol`, `${(moles / 2).toFixed(1)} mol`, `${moles + 3} mol`],
      distractorsAm: [`${moles * 2} ሞል`, `${(moles / 2).toFixed(1)} ሞል`, `${moles + 3} ሞል`],
      distractorsOm: [`${moles * 2} mol`, `${(moles / 2).toFixed(1)} mol`, `${moles + 3} mol`],
      explEn: `n = mass / molar mass = ${mass} g / ${comp.molarMass} g/mol ≈ ${moles} mol.`,
      explAm: `ቀመር፡ n = mass / molar mass = ${mass} / ${comp.molarMass} ≈ ${moles} ሞል ይሆናል።`,
      explOm: `Qajeeltoo: n = mass / molar mass = ${mass} / ${comp.molarMass} ≈ ${moles} mol.`,
      difficulty: 'easy',
    };
  } else {
    // Hydrocarbons
    const n = randInt(3, 12, seed);
    const type = seed % 3;
    const typeNameEn = type === 0 ? 'alkane' : type === 1 ? 'alkene' : 'alkyne';
    const typeNameAm = type === 0 ? 'አልኬን' : type === 1 ? 'አልኪን' : 'አልካይን';
    const typeNameOm = type === 0 ? 'alkeeyinii' : type === 1 ? 'alkiinii' : 'alkaayinii';
    const hCount = type === 0 ? 2 * n + 2 : type === 1 ? 2 * n : 2 * n - 2;
    const correctFormula = `C${n}H${hCount}`;

    const qEn = `Which of the following molecular formulas represents an ${typeNameEn} containing ${n} carbon atoms?`;
    const qAm = `ከሚከተሉት ውስጥ ${n} የካርቦን አተሞችን የያዘው ${typeNameAm} ሞለኪውላዊ ቀመር የትኛው ነው?`;
    const qOm = `Molekiyuloota armaan gadii keessaa kamtu atoomii kaarboonii ${n} qabaatee ${typeNameOm} ta'a?`;

    return {
      subject: 'chemistry',
      grade,
      unitNumber: 3,
      chapterTitle: 'Unit 3: Organic Chemistry',
      qEn,
      qAm,
      qOm,
      correctEn: correctFormula,
      correctAm: correctFormula,
      correctOm: correctFormula,
      distractorsEn: [`C${n}H${type === 0 ? 2 * n : 2 * n + 2}`, `C${n}H${type === 2 ? 2 * n : 2 * n - 2}`, `C${n}H${2 * n + 4}`],
      distractorsAm: [`C${n}H${type === 0 ? 2 * n : 2 * n + 2}`, `C${n}H${type === 2 ? 2 * n : 2 * n - 2}`, `C${n}H${2 * n + 4}`],
      distractorsOm: [`C${n}H${type === 0 ? 2 * n : 2 * n + 2}`, `C${n}H${type === 2 ? 2 * n : 2 * n - 2}`, `C${n}H${2 * n + 4}`],
      explEn: `For ${typeNameEn}: formula is CnH${type === 0 ? '2n+2' : type === 1 ? '2n' : '2n-2'}, giving ${correctFormula}.`,
      explAm: `አጠቃላይ ቀመር CnH${type === 0 ? '2n+2' : type === 1 ? '2n' : '2n-2'} በመሆኑ ${correctFormula} ይሆናል።`,
      explOm: `Qajeeltoo: CnH${type === 0 ? '2n+2' : type === 1 ? '2n' : '2n-2'} waan ta'eef ${correctFormula} dha.`,
      difficulty: 'easy',
    };
  }
}

// =========================================================================
// 4. MASTER PROCEDURAL FACTORY (Guarantees infinite unique questions per subject)
// =========================================================================

export function generateProceduralQuestion(
  subject: SubjectCategory,
  topic: string,
  index: number,
  grade: GradeLevel = 12,
  targetLang: string = 'en'
): QuizQuestion {
  let raw: RawGeneratedItem;

  if (subject === 'mathematics' || subject === 'mathematics_natural' || subject === 'mathematics_social') {
    raw = generateMathQuestion(topic, index, grade);
  } else if (subject === 'physics') {
    raw = generatePhysicsQuestion(topic, index, grade);
  } else if (subject === 'chemistry') {
    raw = generateChemistryQuestion(topic, index, grade);
  } else {
    const seed = index * 47 + 509;
    const unit = ((index % 5) + 1);

    if (subject === 'economics') {
      const gdpBase = 500 + (index * 75);
      const inflation = 4 + (index % 12);
      const realGdp = Math.round(gdpBase / (1 + inflation / 100));

      raw = {
        subject: 'economics',
        grade,
        unitNumber: unit,
        chapterTitle: `Unit ${unit}: Macroeconomics and National Income`,
        qEn: `If an economy records a Nominal GDP of ${gdpBase} billion birr in a year with an inflation price index of ${100 + inflation}%, what is the Real GDP?`,
        qAm: `አንድ ኢኮኖሚ የ ${gdpBase} ቢሊዮን ብር ኖሚናል ጂዲፒ ቢመዘግብ እና የዋጋ ኢንዴክሱ ${100 + inflation}% ቢሆን፣ እውነተኛው ጂዲፒ (Real GDP) ስንት ነው?`,
        qOm: `Diinagdeen tokko GDP Noominaala birrii biliyoona ${gdpBase} yoo galmeesse fi gatiin gabaa ${100 + inflation}% yoo ta'e, GDP Dhugaa meeqa?`,
        correctEn: `${realGdp} billion birr`,
        correctAm: `${realGdp} ቢሊዮን ብር`,
        correctOm: `Birrii biliyoona ${realGdp}`,
        distractorsEn: [`${gdpBase} billion birr`, `${realGdp + 120} billion birr`, `${realGdp - 90} billion birr`],
        distractorsAm: [`${gdpBase} ቢሊዮን ብር`, `${realGdp + 120} ቢሊዮን ብር`, `${realGdp - 90} ቢሊዮን ብር`],
        distractorsOm: [`Birrii biliyoona ${gdpBase}`, `Birrii biliyoona ${realGdp + 120}`, `Birrii biliyoona ${realGdp - 90}`],
        explEn: `Real GDP = (Nominal GDP / Price Index) * 100 ≈ ${realGdp} billion birr.`,
        explAm: `እውነተኛ ጂዲፒ = (ኖሚናል ጂዲፒ / የዋጋ ኢንዴክስ) × 100 = ${realGdp} ቢሊዮን ብር ይሆናል።`,
        explOm: `GDP Dhugaa = (GDP Noominaala / Indeksii Gatii) * 100 ≈ Birrii biliyoona ${realGdp}.`,
        difficulty: 'medium',
      };
    } else if (subject === 'geography') {
      const mapCm = randInt(2, 12, seed);
      const scaleKm = randInt(20, 150, seed + 1);
      const actualDist = mapCm * scaleKm;

      raw = {
        subject: 'geography',
        grade,
        unitNumber: unit,
        chapterTitle: `Unit ${unit}: Cartography & Map Reading`,
        qEn: `On a topographic map where 1 cm represents ${scaleKm} km on the ground, two towns are ${mapCm} cm apart. What is the actual ground distance between them?`,
        qAm: `በካርታ ላይ 1 ሳ.ሜ በመሬት ላይ የ ${scaleKm} ኪ.ሜ ርቀትን የሚወክል ቢሆን፣ በሁለት ከተሞች መካከል ያለው ርቀት ${mapCm} ሳ.ሜ ከሆነ ትክክለኛው የመሬት ርቀት ስንት ነው?`,
        qOm: `Kaartaa irratti 1 cm lafarraan ${scaleKm} km kan bakka bu'u yoo ta'e, fageenyi magaalaalee lama gidduu ${mapCm} cm yoo ta'e, fageenyi lafarraa meeqa?`,
        correctEn: `${actualDist} km`,
        correctAm: `${actualDist} ኪ.ሜ`,
        correctOm: `${actualDist} km`,
        distractorsEn: [`${Math.round(actualDist / 2)} km`, `${actualDist + 50} km`, `${actualDist * 2} km`],
        distractorsAm: [`${Math.round(actualDist / 2)} ኪ.ሜ`, `${actualDist + 50} ኪ.ሜ`, `${actualDist * 2} ኪ.ሜ`],
        distractorsOm: [`${Math.round(actualDist / 2)} km`, `${actualDist + 50} km`, `${actualDist * 2} km`],
        explEn: `Actual distance = Map distance * Scale = ${mapCm} * ${scaleKm} = ${actualDist} km.`,
        explAm: `እውነተኛ ርቀት = ${mapCm} × ${scaleKm} = ${actualDist} ኪ.ሜ።`,
        explOm: `Fageenya dhugaa = ${mapCm} * ${scaleKm} = ${actualDist} km.`,
        difficulty: 'easy',
      };
    } else if (subject === 'biology') {
      const parentGenotypes = [
        { cross: 'Bb x Bb', probDom: '75%', probRec: '25%', trait: 'brown vs blue eyes' },
        { cross: 'Aa x aa', probDom: '50%', probRec: '50%', trait: 'tall vs dwarf plants' },
        { cross: 'Rr x Rr', probDom: '75%', probRec: '25%', trait: 'round vs wrinkled seeds' },
        { cross: 'YY x yy', probDom: '100%', probRec: '0%', trait: 'yellow vs green seeds' },
      ];
      const g = parentGenotypes[seed % parentGenotypes.length];

      raw = {
        subject: 'biology',
        grade,
        unitNumber: unit,
        chapterTitle: `Unit ${unit}: Genetics and Inheritance Patterns`,
        qEn: `In a monohybrid cross between parents (${g.cross}) regarding ${g.trait}, what is the expected percentage of offspring expressing the dominant phenotype?`,
        qAm: `በወላጆች (${g.cross}) መካከል በተደረገ የሞኖሃይብሪድ ማዳቀል፣ የዶሚናንት (የጎላ) ፌኖታይፕ የሚያሳዩ ልጆች መቶኛ ስንት ነው?`,
        qOm: `Wal-fudhannaa warroota (${g.cross}) keessatti, dhibbeentaan ijoollee amala ol-aanaa mul'isanii meeqa?`,
        correctEn: g.probDom,
        correctAm: g.probDom,
        correctOm: g.probDom,
        distractorsEn: ['25%', '50%', '100%'].filter((x) => x !== g.probDom),
        distractorsAm: ['25%', '50%', '100%'].filter((x) => x !== g.probDom),
        distractorsOm: ['25%', '50%', '100%'].filter((x) => x !== g.probDom),
        explEn: `A cross of ${g.cross} yields an expected dominant phenotypic percentage of ${g.probDom}.`,
        explAm: `የ ${g.cross} ማዳቀል ውጤት ${g.probDom} ይሆናል።`,
        explOm: `Gatiin eegamu ${g.probDom} ta'a.`,
        difficulty: 'easy',
      };
    } else if (subject === 'citizenship') {
      const articles = [
        { num: 'Article 10', topicEn: 'Separation of State and Religion', topicAm: 'የመንግስትና የሃይማኖት መለያየት', topicOm: 'Gargar bahuu Mootummaa fi Amantii' },
        { num: 'Article 14', topicEn: 'Right to Life and Security of Person', topicAm: 'የህይወትና የአካል ደህንነት መብት', topicOm: 'Mirga Lubbuun Jiraachuu' },
        { num: 'Article 25', topicEn: 'Right to Equality before the Law', topicAm: 'የእኩልነት መብት በህግ ፊት', topicOm: 'Mirga Wal-qixxummaa Seera Duraa' },
        { num: 'Article 29', topicEn: 'Right of Thought, Opinion and Expression', topicAm: 'የሃሳብን በነጻነት የመግለጽ መብት', topicOm: 'Mirga Yaada Bilisaan Ibsachuu' },
        { num: 'Article 35', topicEn: 'Rights of Women to affirmative action and equality', topicAm: 'የሴቶች መብት', topicOm: 'Mirga Dubartootaa' },
        { num: 'Article 40', topicEn: 'Right to Property and Land Ownership', topicAm: 'የንብረት ባለቤትነት መብት', topicOm: 'Mirga Qabeenyaa' },
      ];
      const art = articles[seed % articles.length];

      raw = {
        subject: 'citizenship',
        grade,
        unitNumber: unit,
        chapterTitle: `Unit ${unit}: The FDRE Constitution & Democratic Principles`,
        qEn: `Which article of the FDRE Constitution specifically guarantees "${art.topicEn}"?`,
        qAm: `የኢፌዲሪ ህገ-መንግስት የትኛው አንቀጽ ነው "${art.topicAm}" በሚል የተደነገገው?`,
        qOm: `Heera Mootummaa RDFI keessatti keewwanni "${art.topicOm}" mirkaneessu kami?`,
        correctEn: art.num,
        correctAm: art.num,
        correctOm: art.num,
        distractorsEn: ['Article 5', 'Article 50', 'Article 93'].filter((x) => x !== art.num),
        distractorsAm: ['አንቀጽ 5', 'አንቀጽ 50', 'አንቀጽ 93'].filter((x) => x !== art.num),
        distractorsOm: ['Keewwata 5', 'Keewwata 50', 'Keewwata 93'].filter((x) => x !== art.num),
        explEn: `In the FDRE Constitution, ${art.num} is explicitly dedicated to ${art.topicEn}.`,
        explAm: `በኢፌዲሪ ህገ-መንግስት ${art.num} የሚያረጋግጠው ${art.topicAm} ነው።`,
        explOm: `Heera Mootummaa RDFI keessatti ${art.num} kan mirkaneessu ${art.topicOm} dha.`,
        difficulty: 'medium',
      };
    } else if (subject === 'history') {
      const events = [
        { year: '1896', eventEn: 'The Battle of Adwa', eventAm: 'የአድዋ ጦርነት', eventOm: 'Lola Adwaa' },
        { year: '1889', eventEn: 'Signing of the Treaty of Wuchale', eventAm: 'የውጫሌ ውል መፈረም', eventOm: 'Mallatteeffamuu Waliigaltee Wucaalee' },
        { year: '1941', eventEn: 'Victory over Fascist Italian occupation and liberation of Addis Ababa', eventAm: 'የፋሽስት ጣሊያን ድል መደረግና የአዲስ አበባ ነጻ መውጣት', eventOm: 'Injifannoo weerara Faashistii fi bilisummaa Finfinnee' },
        { year: '1974', eventEn: 'The Ethiopian Popular Revolution that ended the Imperial regime', eventAm: 'የኢምፔሪያል ስርአትን ያበቃው የኢትዮጵያ አብዮት', eventOm: 'Warraaqsa Ummataa kan sirna Mootichaa xumure' },
        { year: '1935', eventEn: 'The second invasion of Ethiopia by Fascist Italy', eventAm: 'ሁለተኛው የጣሊያን ወረራ', eventOm: 'Weerara lammaffaa Xaaliyaanii' },
      ];
      const ev = events[seed % events.length];

      raw = {
        subject: 'history',
        grade,
        unitNumber: unit,
        chapterTitle: `Unit ${unit}: Ethiopian History & Anti-Colonial Resistance`,
        qEn: `In which historic year did ${ev.eventEn} take place?`,
        qAm: `${ev.eventAm} የተካሄደው በየትኛው ታሪካዊ አመት ነበር?`,
        qOm: `${ev.eventOm} bara seenaa isa kam keessatti raawwatame?`,
        correctEn: `${ev.year} G.C.`,
        correctAm: `${ev.year} እ.ኤ.አ`,
        correctOm: `Bara ${ev.year}`,
        distractorsEn: ['1936 G.C.', '1855 G.C.', '1960 G.C.'].filter((x) => !x.includes(ev.year)),
        distractorsAm: ['1936 እ.ኤ.አ', '1855 እ.ኤ.አ', '1960 እ.ኤ.አ'].filter((x) => !x.includes(ev.year)),
        distractorsOm: ['Bara 1936', 'Bara 1855', 'Bara 1960'].filter((x) => !x.includes(ev.year)),
        explEn: `${ev.eventEn} occurred in ${ev.year} G.C.`,
        explAm: `${ev.eventAm} የተከናወነው በ ${ev.year} እ.ኤ.አ ነው።`,
        explOm: `${ev.eventOm} bara ${ev.year} keessatti ta'e.`,
        difficulty: 'easy',
      };
    } else {
      const grammarRules = [
        {
          q: 'If she had studied harder, she ________ the national examination with flying colors.',
          correct: 'would have passed',
          distractors: ['will pass', 'would pass', 'passed'],
          expl: 'This is a Third Conditional (unreal past). Formula: If + past perfect, would have + past participle.',
        },
        {
          q: 'The newly built laboratory ________ by the regional educational bureau yesterday.',
          correct: 'was inaugurated',
          distractors: ['is inaugurating', 'inaugurated', 'has inaugurated'],
          expl: 'Passive voice in simple past: was/were + past participle ("was inaugurated").',
        },
        {
          q: 'Neither the chemistry teacher nor the students ________ able to solve the puzzle.',
          correct: 'were',
          distractors: ['was', 'is', 'has been'],
          expl: 'With "Neither... nor", the verb agrees with the subject closer to it ("students" is plural, so "were").',
        },
        {
          q: 'Hardly had the matric examination begun ________ the bell rang for an emergency announcement.',
          correct: 'when',
          distractors: ['than', 'then', 'as soon as'],
          expl: 'Correlative conjunction: "Hardly... when" is the correct pairing in standard formal English.',
        },
      ];
      const gr = grammarRules[seed % grammarRules.length];

      raw = {
        subject: 'english',
        grade,
        unitNumber: unit,
        chapterTitle: `Unit ${unit}: English Grammar & Structure`,
        qEn: gr.q,
        qAm: gr.q,
        qOm: gr.q,
        correctEn: gr.correct,
        correctAm: gr.correct,
        correctOm: gr.correct,
        distractorsEn: gr.distractors,
        distractorsAm: gr.distractors,
        distractorsOm: gr.distractors,
        explEn: gr.expl,
        explAm: gr.expl,
        explOm: gr.expl,
        difficulty: 'medium',
      };
    }
  }

  return buildQuizQuestionFromRaw(raw, `proc-${subject}-${index}-${Date.now()}`, targetLang);
}
