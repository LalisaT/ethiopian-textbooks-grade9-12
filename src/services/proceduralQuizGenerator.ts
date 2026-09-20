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

export interface RawGeneratedItem {
  subject: SubjectCategory;
  grade: GradeLevel;
  unitNumber: number;
  chapterTitle: string;
  qEn: string;
  qAm?: string;
  qOm?: string;
  correctEn: string;
  correctAm?: string;
  correctOm?: string;
  distractorsEn: string[];
  distractorsAm?: string[];
  distractorsOm?: string[];
  explEn: string;
  explAm?: string;
  explOm?: string;
  difficulty?: 'easy' | 'medium' | 'hard';
}

function buildQuizQuestionFromRaw(
  raw: RawGeneratedItem,
  id: string,
  targetLang: string = 'en'
): QuizQuestion {
  const allEn = [raw.correctEn, ...raw.distractorsEn.slice(0, 3)];
  const allAm = [raw.correctAm || raw.correctEn, ...(raw.distractorsAm || raw.distractorsEn).slice(0, 3)];
  const allOm = [raw.correctOm || raw.correctEn, ...(raw.distractorsOm || raw.distractorsEn).slice(0, 3)];

  // Shuffle option positions [0, 1, 2, 3]
  const perm = shuffle([0, 1, 2, 3]);
  const correctIdx = perm.indexOf(0);

  const optionsEn = perm.map((p) => allEn[p] || 'Option');
  const optionsAm = perm.map((p) => allAm[p] || allEn[p] || 'Option');
  const optionsOm = perm.map((p) => allOm[p] || allEn[p] || 'Option');

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
    difficulty: raw.difficulty || 'medium',
    isEsslceExam: true,
  };
}

// =========================================================================
// 1. MATHEMATICS PROCEDURAL GENERATOR
// =========================================================================
export function generateMathQuestion(topic: string, index: number, grade: GradeLevel = 12): RawGeneratedItem {
  const seed = index * 37 + 101;
  const subtopicType = index % 8;

  if (subtopicType === 0) {
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
    return {
      subject: 'mathematics',
      grade,
      unitNumber: 1,
      chapterTitle: 'Unit 1: Differential Calculus',
      qEn: `Problem #${index + 1}: If f(x) = ${polyStr}, what is the value of the derivative f'(${x0})?`,
      qAm: `ጥያቄ #${index + 1}: f(x) = ${polyStr} ከሆነ የ f'(${x0}) ዋጋ ስንት ነው?`,
      qOm: `Gaaffii #${index + 1}: Yoo f(x) = ${polyStr} ta'e, gatiin f'(${x0}) meeqa?`,
      correctEn: `${derVal}`,
      correctAm: `${derVal}`,
      correctOm: `${derVal}`,
      distractorsEn: [`${derVal + 4}`, `${derVal - 5}`, `${derVal + 10}`],
      explEn: `Differentiating f(x) gives f'(x) = ${3 * a}x² ${2 * b >= 0 ? '+' : ''}${2 * b}x ${c >= 0 ? '+' : ''}${c}. Evaluating at x = ${x0}: f'(${x0}) = ${derVal}.`,
      difficulty: 'medium',
    };
  } else if (subtopicType === 1) {
    const u1 = randInt(-10, 10, seed) || 3;
    const u2 = randInt(-10, 10, seed + 1) || 4;
    const v1 = randInt(-10, 10, seed + 2) || 2;
    const v2 = randInt(-10, 10, seed + 3) || 1;
    const dot = u1 * v1 + u2 * v2;
    return {
      subject: 'mathematics',
      grade,
      unitNumber: 2,
      chapterTitle: 'Unit 2: Two-Dimensional Vectors',
      qEn: `Vector Problem #${index + 1}: Given 2D vectors u = (${u1}, ${u2}) and v = (${v1}, ${v2}), what is their scalar dot product u · v?`,
      qAm: `ቬክተር #${index + 1}: ቬክተሮች u = (${u1}, ${u2}) እና v = (${v1}, ${v2}) ቢሰጡ፣ የስኬላር ብዜታቸው u · v ስንት ነው?`,
      qOm: `Veektarii #${index + 1}: Veektoroonni u = (${u1}, ${u2}) fi v = (${v1}, ${v2}) yoo kennaman, baay'anni iskaalaarii u · v meeqa?`,
      correctEn: `${dot}`,
      correctAm: `${dot}`,
      correctOm: `${dot}`,
      distractorsEn: [`${dot + 5}`, `${dot - 4}`, `${dot + 12}`],
      explEn: `Dot product u · v = (${u1} * ${v1}) + (${u2} * ${v2}) = ${dot}.`,
      difficulty: 'easy',
    };
  } else if (subtopicType === 2) {
    const a = randInt(-8, 9, seed) || 2;
    const b = randInt(-6, 8, seed + 1) || 1;
    const c = randInt(-6, 8, seed + 2) || 3;
    const d = randInt(-8, 9, seed + 3) || 4;
    const det = a * d - b * c;
    return {
      subject: 'mathematics',
      grade,
      unitNumber: 3,
      chapterTitle: 'Unit 3: Matrices and Determinants',
      qEn: `Matrix Problem #${index + 1}: What is the determinant of the 2x2 matrix M = [[${a}, ${b}], [${c}, ${d}]]?`,
      qAm: `ማትሪክስ #${index + 1}: የ 2x2 ማትሪክስ M = [[${a}, ${b}], [${c}, ${d}]] ዲተርሚናንት ዋጋ ስንት ነው?`,
      qOm: `Maatiriiksii #${index + 1}: Diiterminaantiin maatiriiksii 2x2 M = [[${a}, ${b}], [${c}, ${d}]] meeqa?`,
      correctEn: `${det}`,
      correctAm: `${det}`,
      correctOm: `${det}`,
      distractorsEn: [`${det + 6}`, `${det - 5}`, `${det * 2}`],
      explEn: `det(M) = (a * d) - (b * c) = (${a} * ${d}) - (${b} * ${c}) = ${det}.`,
      difficulty: 'easy',
    };
  } else if (subtopicType === 3) {
    const P = randInt(1, 30, seed) * 1000;
    const rate = randInt(4, 16, seed + 1);
    const years = randInt(2, 7, seed + 2);
    const interest = (P * rate * years) / 100;
    return {
      subject: 'mathematics',
      grade,
      unitNumber: 4,
      chapterTitle: 'Unit 4: Business Mathematics',
      qEn: `Financial Math #${index + 1}: An Ethiopian merchant deposits ${P} ETB in a commercial bank at an annual simple interest rate of ${rate}%. How much interest is earned after ${years} years?`,
      correctEn: `${interest} ETB`,
      distractorsEn: [`${interest + 300} ETB`, `${Math.round(interest * 0.75)} ETB`, `${interest * 2} ETB`],
      explEn: `I = (P * r * t) / 100 = (${P} * ${rate} * ${years}) / 100 = ${interest} ETB.`,
      difficulty: 'easy',
    };
  } else if (subtopicType === 4) {
    const aVal = randInt(2, 20, seed);
    const aSquared = aVal * aVal;
    const ans = 2 * aVal;
    return {
      subject: 'mathematics',
      grade,
      unitNumber: 1,
      chapterTitle: 'Unit 1: Limits & Continuity',
      qEn: `Calculus Limits #${index + 1}: Evaluate the limit: lim (x → ${aVal}) [ (x² - ${aSquared}) / (x - ${aVal}) ].`,
      correctEn: `${ans}`,
      distractorsEn: [`${aVal}`, `${aSquared}`, `${ans + 4}`],
      explEn: `Factoring gives (x - ${aVal})(x + ${aVal})/(x - ${aVal}) = x + ${aVal}. As x → ${aVal}, limit = ${ans}.`,
      difficulty: 'easy',
    };
  } else if (subtopicType === 5) {
    const aCoeff = randInt(1, 6, seed) * 2;
    const bCoeff = randInt(1, 10, seed + 1);
    const upperK = randInt(2, 6, seed + 2);
    const intVal = (aCoeff * upperK * upperK) / 2 + bCoeff * upperK;
    return {
      subject: 'mathematics',
      grade,
      unitNumber: 5,
      chapterTitle: 'Unit 5: Integral Calculus',
      qEn: `Definite Integral #${index + 1}: Evaluate the definite integral: ∫ from 0 to ${upperK} of (${aCoeff}x + ${bCoeff}) dx.`,
      correctEn: `${intVal}`,
      distractorsEn: [`${intVal + 8}`, `${Math.max(1, intVal - 6)}`, `${intVal * 2}`],
      explEn: `Antiderivative F(x) = ${aCoeff / 2}x² + ${bCoeff}x. Evaluating from 0 to ${upperK}: F(${upperK}) = ${intVal}.`,
      difficulty: 'medium',
    };
  } else if (subtopicType === 6) {
    const a = randInt(2, 25, seed);
    const d = randInt(2, 12, seed + 1);
    const n = randInt(10, 30, seed + 2);
    const termN = a + (n - 1) * d;
    return {
      subject: 'mathematics',
      grade,
      unitNumber: 2,
      chapterTitle: 'Unit 2: Sequences and Series',
      qEn: `Progression Problem #${index + 1}: In an arithmetic sequence where the first term a₁ = ${a} and the common difference d = ${d}, find the ${n}th term (a_${n}).`,
      correctEn: `${termN}`,
      distractorsEn: [`${termN + d}`, `${termN - d}`, `${termN + 2 * d}`],
      explEn: `Formula a_n = a₁ + (n - 1)d = ${a} + (${n} - 1) * ${d} = ${termN}.`,
      difficulty: 'easy',
    };
  } else {
    const triples = [[3, 4, 5], [5, 12, 13], [8, 15, 17], [7, 24, 25], [9, 40, 41], [11, 60, 61], [12, 35, 37], [20, 21, 29]];
    const trip = triples[index % triples.length];
    const mult = (index % 3) + 1;
    const x = trip[0] * mult;
    const y = trip[1] * mult;
    const hyp = trip[2] * mult;
    return {
      subject: 'mathematics',
      grade,
      unitNumber: 2,
      chapterTitle: 'Unit 2: Vector Magnitudes',
      qEn: `Vector Length #${index + 1}: What is the Euclidean magnitude of the 2D vector v = (${x}, ${y})?`,
      correctEn: `${hyp}`,
      distractorsEn: [`${hyp + 3}`, `${Math.max(1, hyp - 2)}`, `${x + y}`],
      explEn: `|v| = √(${x}² + ${y}²) = √(${hyp * hyp}) = ${hyp}.`,
      difficulty: 'easy',
    };
  }
}

// =========================================================================
// 2. PHYSICS PROCEDURAL GENERATOR
// =========================================================================
export function generatePhysicsQuestion(topic: string, index: number, grade: GradeLevel = 12): RawGeneratedItem {
  const seed = index * 41 + 203;
  const subtopic = index % 8;

  if (subtopic === 0) {
    const m = randInt(1, 12, seed);
    const v = randInt(2, 18, seed + 1);
    const r = randInt(1, 10, seed + 2);
    const fc = Math.round((m * v * v) / r);
    return {
      subject: 'physics',
      grade,
      unitNumber: 1,
      chapterTitle: 'Unit 1: Circular Motion & Dynamics',
      qEn: `Circular Dynamics #${index + 1}: A body of mass ${m} kg moves along a circular path of radius ${r} m with tangential velocity ${v} m/s. What centripetal force acts on the body?`,
      correctEn: `${fc} N`,
      distractorsEn: [`${fc + 20} N`, `${Math.max(1, fc - 15)} N`, `${fc * 2} N`],
      explEn: `Centripetal force Fc = (m * v²) / r = (${m} * ${v * v}) / ${r} ≈ ${fc} N.`,
      difficulty: 'medium',
    };
  } else if (subtopic === 1) {
    const F = randInt(20, 200, seed);
    const d = randInt(4, 40, seed + 1);
    const work = F * d;
    return {
      subject: 'physics',
      grade,
      unitNumber: 2,
      chapterTitle: 'Unit 2: Work, Energy and Power',
      qEn: `Work & Energy #${index + 1}: A constant horizontal force of ${F} N pushes an industrial container across a frictionless surface through a displacement of ${d} m. How much work is done?`,
      correctEn: `${work} J`,
      distractorsEn: [`${work + 50} J`, `${Math.round(work / 2)} J`, `${work * 2} J`],
      explEn: `Work W = F * d = ${F} N * ${d} m = ${work} Joules.`,
      difficulty: 'easy',
    };
  } else if (subtopic === 2) {
    const current = randInt(1, 20, seed);
    const resistance = randInt(3, 60, seed + 1);
    const voltage = current * resistance;
    return {
      subject: 'physics',
      grade,
      unitNumber: 4,
      chapterTitle: 'Unit 4: Electric Circuits & Ohm\'s Law',
      qEn: `Circuit Theory #${index + 1}: An electrical component with a resistance of ${resistance} Ω draws a steady direct current of ${current} A. What is the potential difference across its terminals?`,
      correctEn: `${voltage} V`,
      distractorsEn: [`${voltage + 15} V`, `${Math.round(voltage / 2)} V`, `${voltage * 2} V`],
      explEn: `Ohm's Law: V = I * R = ${current} A * ${resistance} Ω = ${voltage} V.`,
      difficulty: 'easy',
    };
  } else if (subtopic === 3) {
    const f = randInt(10, 250, seed) * 10;
    const wavelengths = [0.2, 0.4, 0.5, 0.8, 1.2, 1.5, 2.0, 2.5, 3.0, 0.1];
    const lambda = wavelengths[index % wavelengths.length];
    const v = Math.round(f * lambda);
    return {
      subject: 'physics',
      grade,
      unitNumber: 3,
      chapterTitle: 'Unit 3: Wave Motion and Sound',
      qEn: `Acoustics & Waves #${index + 1}: A sound wave traveling through air has a frequency of ${f} Hz and a wavelength of ${lambda} m. What is its propagation speed?`,
      correctEn: `${v} m/s`,
      distractorsEn: [`${v + 50} m/s`, `${Math.round(v / 2)} m/s`, `${v - 40} m/s`],
      explEn: `Wave equation: v = f * λ = ${f} Hz * ${lambda} m = ${v} m/s.`,
      difficulty: 'easy',
    };
  } else if (subtopic === 4) {
    const mass = randInt(2, 25, seed);
    const vel = randInt(3, 20, seed + 1);
    const ke = Math.round(0.5 * mass * vel * vel);
    return {
      subject: 'physics',
      grade,
      unitNumber: 2,
      chapterTitle: 'Unit 2: Kinetic & Potential Energy',
      qEn: `Kinetic Energy #${index + 1}: Calculate the translational kinetic energy of an object of mass ${mass * 10} kg traveling with a velocity of ${vel} m/s.`,
      correctEn: `${ke * 10} J`,
      distractorsEn: [`${ke * 20} J`, `${Math.round(ke * 5)} J`, `${(ke + 50) * 10} J`],
      explEn: `KE = 0.5 * m * v² = 0.5 * ${mass * 10} * ${vel * vel} = ${ke * 10} Joules.`,
      difficulty: 'easy',
    };
  } else if (subtopic === 5) {
    const h = randInt(5, 50, seed);
    const m = randInt(2, 15, seed + 1);
    const pe = Math.round(m * 9.8 * h);
    return {
      subject: 'physics',
      grade,
      unitNumber: 2,
      chapterTitle: 'Unit 2: Gravitational Energy',
      qEn: `Potential Energy #${index + 1}: A load of mass ${m} kg is lifted vertically to a height of ${h} m above ground level (taking g = 9.8 m/s²). What is its gravitational potential energy?`,
      correctEn: `${pe} J`,
      distractorsEn: [`${pe + 100} J`, `${Math.round(pe / 2)} J`, `${pe * 2} J`],
      explEn: `PE = m * g * h = ${m} * 9.8 * ${h} = ${pe} Joules.`,
      difficulty: 'easy',
    };
  } else if (subtopic === 6) {
    const materials = [
      { name: 'Crown Glass', n: 1.52 },
      { name: 'Flint Glass', n: 1.66 },
      { name: 'Water', n: 1.33 },
      { name: 'Diamond', n: 2.42 },
      { name: 'Ethanol', n: 1.36 }
    ];
    const mat = materials[index % materials.length];
    const c = 3.0e8;
    const vMat = (c / mat.n / 1e8).toFixed(2);
    return {
      subject: 'physics',
      grade,
      unitNumber: 5,
      chapterTitle: 'Unit 5: Geometrical Optics',
      qEn: `Optics #${index + 1}: If the absolute refractive index of ${mat.name} is ${mat.n} and light speed in vacuum is 3.0 × 10⁸ m/s, what is the speed of light in ${mat.name}?`,
      correctEn: `${vMat} × 10⁸ m/s`,
      distractorsEn: [`${(parseFloat(vMat) * 1.5).toFixed(2)} × 10⁸ m/s`, `${(parseFloat(vMat) * 0.7).toFixed(2)} × 10⁸ m/s`, `3.00 × 10⁸ m/s`],
      explEn: `v = c / n = 3.0 × 10⁸ / ${mat.n} ≈ ${vMat} × 10⁸ m/s.`,
      difficulty: 'medium',
    };
  } else {
    const mKg = randInt(1, 10, seed);
    const deltaT = randInt(10, 60, seed + 1);
    const cWater = 4184;
    const heat = Math.round((mKg * cWater * deltaT) / 1000);
    return {
      subject: 'physics',
      grade,
      unitNumber: 6,
      chapterTitle: 'Unit 6: Thermal Physics',
      qEn: `Thermodynamics #${index + 1}: How much heat energy in kilojoules (kJ) is required to raise the temperature of ${mKg} kg of water by ${deltaT} °C? (c = 4184 J/kg·°C)`,
      correctEn: `${heat} kJ`,
      distractorsEn: [`${heat + 50} kJ`, `${Math.round(heat / 2)} kJ`, `${heat * 2} kJ`],
      explEn: `Q = m * c * ΔT = ${mKg} * 4184 * ${deltaT} = ${heat * 1000} J = ${heat} kJ.`,
      difficulty: 'easy',
    };
  }
}

// =========================================================================
// 3. CHEMISTRY PROCEDURAL GENERATOR
// =========================================================================
export function generateChemistryQuestion(topic: string, index: number, grade: GradeLevel = 12): RawGeneratedItem {
  const seed = index * 43 + 317;
  const subtopic = index % 7;

  if (subtopic === 0) {
    const exp = randInt(1, 6, seed);
    const isBase = index % 2 === 1;
    const conc = Math.pow(10, -exp).toExponential(0);
    const val = isBase ? (14 - exp) : exp;
    const comp = isBase ? 'potassium hydroxide (KOH)' : 'hydrochloric acid (HCl)';
    return {
      subject: 'chemistry',
      grade,
      unitNumber: 1,
      chapterTitle: 'Unit 1: Acid-Base Equilibria',
      qEn: `pH Calculation #${index + 1}: What is the calculated pH of a ${conc} M solution of strong monoprotic ${comp} at 25 °C?`,
      correctEn: `${val}.0`,
      distractorsEn: [`${14 - val}.0`, `${val + 2}.0`, `7.0`],
      explEn: isBase
        ? `[OH-] = ${conc} M. pOH = -log[OH-] = ${exp}. pH = 14 - ${exp} = ${val}.0.`
        : `[H+] = ${conc} M. pH = -log[H+] = ${val}.0.`,
      difficulty: 'medium',
    };
  } else if (subtopic === 1) {
    const volumes = [0.25, 0.5, 1.0, 2.0, 2.5, 4.0, 5.0, 0.75, 1.5];
    const V = volumes[index % volumes.length];
    const moles = randInt(1, 12, seed + 1);
    const M = (moles / V).toFixed(2).replace(/\.00$/, '');
    return {
      subject: 'chemistry',
      grade,
      unitNumber: 1,
      chapterTitle: 'Unit 1: Concentration of Solutions',
      qEn: `Molarity #${index + 1}: A student dissolves ${moles} moles of pure solute in enough distilled water to prepare ${V} L of solution. What is the molar concentration (M)?`,
      correctEn: `${M} M`,
      distractorsEn: [`${(parseFloat(M) * 2).toFixed(2)} M`, `${(parseFloat(M) / 2).toFixed(2)} M`, `${(parseFloat(M) + 1.5).toFixed(2)} M`],
      explEn: `M = moles / Volume (L) = ${moles} / ${V} = ${M} M.`,
      difficulty: 'easy',
    };
  } else if (subtopic === 2) {
    const compounds = [
      { name: 'Sodium Hydroxide (NaOH)', mm: 40 },
      { name: 'Calcium Carbonate (CaCO₃)', mm: 100 },
      { name: 'Sulfuric Acid (H₂SO₄)', mm: 98 },
      { name: 'Sodium Chloride (NaCl)', mm: 58.5 },
      { name: 'Glucose (C₆H₁₂O₆)', mm: 180 },
      { name: 'Ammonium Nitrate (NH₄NO₃)', mm: 80 }
    ];
    const comp = compounds[index % compounds.length];
    const moles = randInt(1, 9, seed + 1);
    const mass = Math.round(moles * comp.mm);
    return {
      subject: 'chemistry',
      grade,
      unitNumber: 2,
      chapterTitle: 'Unit 2: Stoichiometry and Moles',
      qEn: `Moles Calculation #${index + 1}: How many moles of ${comp.name} are present in a pure sample weighing ${mass} grams? (Molar mass = ${comp.mm} g/mol)`,
      correctEn: `${moles} mol`,
      distractorsEn: [`${moles * 2} mol`, `${(moles / 2).toFixed(1)} mol`, `${moles + 3} mol`],
      explEn: `n = mass / molar mass = ${mass} / ${comp.mm} = ${moles} mol.`,
      difficulty: 'easy',
    };
  } else if (subtopic === 3) {
    const n = randInt(3, 14, seed);
    const type = index % 3;
    const typeName = type === 0 ? 'alkane' : type === 1 ? 'alkene' : 'alkyne';
    const hCount = type === 0 ? 2 * n + 2 : type === 1 ? 2 * n : 2 * n - 2;
    return {
      subject: 'chemistry',
      grade,
      unitNumber: 3,
      chapterTitle: 'Unit 3: Organic Chemistry & Hydrocarbons',
      qEn: `Hydrocarbons #${index + 1}: Which molecular formula represents an open-chain ${typeName} containing exactly ${n} carbon atoms?`,
      correctEn: `C${n}H${hCount}`,
      distractorsEn: [`C${n}H${type === 0 ? 2 * n : 2 * n + 2}`, `C${n}H${type === 2 ? 2 * n : 2 * n - 2}`, `C${n}H${2 * n + 4}`],
      explEn: `Formula for ${typeName} is CnH${type === 0 ? '2n+2' : type === 1 ? '2n' : '2n-2'}, yielding C${n}H${hCount}.`,
      difficulty: 'easy',
    };
  } else if (subtopic === 4) {
    const couples = [
      { cathode: 'Cu²⁺/Cu (+0.34 V)', anode: 'Zn²⁺/Zn (-0.76 V)', e0: '1.10 V' },
      { cathode: 'Ag⁺/Ag (+0.80 V)', anode: 'Cu²⁺/Cu (+0.34 V)', e0: '0.46 V' },
      { cathode: 'Fe³⁺/Fe²⁺ (+0.77 V)', anode: 'I₂/I⁻ (+0.54 V)', e0: '0.23 V' },
      { cathode: 'Cl₂/Cl⁻ (+1.36 V)', anode: 'Br₂/Br⁻ (+1.07 V)', e0: '0.29 V' },
    ];
    const c = couples[index % couples.length];
    return {
      subject: 'chemistry',
      grade,
      unitNumber: 4,
      chapterTitle: 'Unit 4: Electrochemistry & Galvanic Cells',
      qEn: `Electrochemistry #${index + 1}: What is the standard cell potential (E°cell) for a galvanic cell composed of cathode ${c.cathode} and anode ${c.anode}?`,
      correctEn: c.e0,
      distractorsEn: ['0.76 V', '1.50 V', '0.00 V'],
      explEn: `E°cell = E°cathode - E°anode = ${c.e0}.`,
      difficulty: 'medium',
    };
  } else if (subtopic === 5) {
    const gas = [
      { name: 'Helium', p: 1.0, v: 22.4, t: 273, n: 1.0 },
      { name: 'Nitrogen', p: 2.0, v: 11.2, t: 273, n: 1.0 },
      { name: 'Oxygen', p: 1.5, v: 14.9, t: 273, n: 1.0 },
    ];
    const g = gas[index % gas.length];
    const mult = (index % 4) + 1;
    return {
      subject: 'chemistry',
      grade,
      unitNumber: 2,
      chapterTitle: 'Unit 2: States of Matter & Gas Laws',
      qEn: `Gas Laws #${index + 1}: Under ideal behavior at STP (273 K, 1 atm), how many moles of gas occupy a volume of ${(22.4 * mult).toFixed(1)} L?`,
      correctEn: `${mult}.0 mol`,
      distractorsEn: [`${(mult * 2).toFixed(1)} mol`, `${(mult / 2).toFixed(1)} mol`, `${(mult + 1.5).toFixed(1)} mol`],
      explEn: `At STP, 1 mole of an ideal gas occupies 22.4 L. Volume = ${(22.4 * mult).toFixed(1)} L represents ${mult}.0 moles.`,
      difficulty: 'easy',
    };
  } else {
    const orders = [
      { order: 'Zero-order', unit: 'mol·L⁻¹·s⁻¹', char: 'the reaction rate is constant and independent of reactant concentrations' },
      { order: 'First-order', unit: 's⁻¹', char: 'the reaction half-life is constant and independent of the initial concentration' },
      { order: 'Second-order', unit: 'L·mol⁻¹·s⁻¹', char: 'the reaction rate quadruples when the reactant concentration is doubled' },
    ];
    const ord = orders[index % orders.length];
    return {
      subject: 'chemistry',
      grade,
      unitNumber: 5,
      chapterTitle: 'Unit 5: Chemical Kinetics',
      qEn: `Chemical Kinetics #${index + 1}: Which reaction order has the rate constant unit "${ord.unit}" and is defined by: "${ord.char}"?`,
      correctEn: ord.order,
      distractorsEn: ['Zero-order', 'First-order', 'Second-order'].filter(x => x !== ord.order),
      explEn: `For ${ord.order} reactions: ${ord.char}.`,
      difficulty: 'medium',
    };
  }
}

// =========================================================================
// 4. AGRICULTURE PROCEDURAL GENERATOR
// =========================================================================
export function generateAgricultureQuestion(topic: string, index: number, grade: GradeLevel = 12): RawGeneratedItem {
  const seed = index * 59 + 719;
  const type = index % 14;

  if (type === 0) {
    const nKg = 30 + ((index * 7) % 110);
    const ha = 2 + ((index * 3) % 15);
    const totalN = nKg * ha;
    const ureaRequired = Math.round(totalN / 0.46);
    return {
      subject: 'agriculture',
      grade,
      unitNumber: 1,
      chapterTitle: 'Unit 1: Field Crops & Soil Fertility',
      qEn: `Soil Fertility #${index + 1}: A farm enterprise needs to apply ${nKg} kg of pure Nitrogen (N) per hectare on a ${ha}-hectare cereal field. If Urea fertilizer contains 46% Nitrogen, what is the total quantity of Urea required?`,
      correctEn: `${ureaRequired} kg`,
      distractorsEn: [`${ureaRequired + 80} kg`, `${Math.round(ureaRequired * 0.5)} kg`, `${ureaRequired * 2} kg`],
      explEn: `Total N = ${nKg} kg/ha * ${ha} ha = ${totalN} kg. Urea required = ${totalN} / 0.46 ≈ ${ureaRequired} kg.`,
    };
  } else if (type === 1) {
    const phVals = ['4.2', '4.4', '4.5', '4.7', '4.8', '5.0', '5.2', '5.3', '4.6', '4.9', '5.1'];
    const ph = phVals[index % phVals.length];
    const regions = ['Western Oromia (Wollega)', 'Asosa (Benishangul)', 'Awi Zone (Amhara)', 'Kaffa Highlands', 'Jimma (Gera)', 'Gamo Highlands', 'Sidama Basin', 'Illubabor Zone', 'West Gojjam', 'South Gondar'];
    const reg = regions[(index + Math.floor(index / phVals.length)) % regions.length];
    return {
      subject: 'agriculture',
      grade,
      unitNumber: 2,
      chapterTitle: 'Unit 2: Soil Acidity & Management',
      qEn: `Soil Chemistry #${index + 1}: Soil tests in ${reg} show strongly acidic soil with a pH of ${ph}. Which amendment material is scientifically recommended to raise the pH and neutralize aluminum toxicity?`,
      correctEn: 'Agricultural Lime (CaCO₃)',
      distractorsEn: ['Elemental Sulfur', 'Ammonium Sulfate', 'Urea'],
      explEn: `Agricultural Lime (calcium carbonate) neutralizes excess hydrogen and aluminum ions, raising the pH of acidic soils.`,
    };
  } else if (type === 2) {
    const crops = [
      { name: 'Teff', rate: 15 }, { name: 'Bread Wheat', rate: 125 },
      { name: 'Hybrid Maize', rate: 25 }, { name: 'Faba Bean', rate: 140 },
      { name: 'Malted Barley', rate: 100 }, { name: 'Kabuli Chickpea', rate: 80 },
      { name: 'Field Pea', rate: 110 }, { name: 'Red Lentil', rate: 70 }
    ];
    const crop = crops[index % crops.length];
    const area = 2 + ((index * 4) % 15);
    const germPct = 80 + (index % 18);
    const needed = Math.round((crop.rate * area) / (germPct / 100));
    return {
      subject: 'agriculture',
      grade,
      unitNumber: 1,
      chapterTitle: 'Unit 1: Agronomy & Seed Technology',
      qEn: `Seed Calculation #${index + 1}: A grower plans to drill ${area} hectares of ${crop.name} with a recommended pure seed rate of ${crop.rate} kg/ha. If seed lot germination testing certifies a viability of ${germPct}%, how many kilograms of seed must be purchased?`,
      correctEn: `${needed} kg`,
      distractorsEn: [`${crop.rate * area} kg`, `${needed + 50} kg`, `${Math.round(needed * 0.75)} kg`],
      explEn: `Effective seed rate = (${crop.rate} * ${area}) / (${germPct} / 100) = ${needed} kg.`,
    };
  } else if (type === 3) {
    const elev = 450 + ((index * 37) % 3200);
    let zone = 'Weyna Dega (Mid-Altitude Sub-Humid)';
    let crop = 'Teff, Maize, Arabica Coffee, and Haricot Bean';
    if (elev > 3200) {
      zone = 'Wurch (Afro-Alpine Highland)';
      crop = 'Afro-alpine pasture, barley, and sheep production';
    } else if (elev >= 2300) {
      zone = 'Dega (Cool Temperate Highlands)';
      crop = 'Barley, Wheat, Field Pea, and Highland Pulses';
    } else if (elev < 500) {
      zone = 'Bereha (Hot Arid Desert Lowlands)';
      crop = 'Pastoral camels, goats, and oasis date palms';
    } else if (elev < 1500) {
      zone = 'Kolla (Warm Semi-Arid Lowlands)';
      crop = 'Sorghum, Sesame, Cotton, and Groundnut';
    }
    return {
      subject: 'agriculture',
      grade,
      unitNumber: 1,
      chapterTitle: 'Unit 1: Agro-Ecological Zones',
      qEn: `Agro-Ecology #${index + 1}: An agricultural station is situated at an elevation of ${elev} meters above sea level. Under Ethiopian agro-ecological classification, which thermal zone and farming system applies?`,
      correctEn: `${zone} (${crop})`,
      distractorsEn: [
        `Kolla (Sorghum, Sesame and Cotton)`,
        `Bereha (Desert Nomadic Pastoralism)`,
        `Wurch (High Afro-Alpine Pasture)`
      ].filter(x => !x.includes(zone.split(' ')[0])),
      explEn: `Elevations of ${elev}m a.s.l fall under ${zone}, supporting ${crop}.`,
    };
  } else if (type === 4) {
    const compartments = [
      { name: 'Rumen', func: 'Anaerobic microbial fermentation of plant cellulose producing volatile fatty acids (VFAs)' },
      { name: 'Reticulum', func: 'Honeycomb-lined chamber responsible for trapping dense hardware and moving cud regurgitation' },
      { name: 'Omasum', func: 'Manyplies organ with broad muscular laminae for high-efficiency absorption of water and minerals' },
      { name: 'Abomasum', func: 'True glandular stomach secreting gastric juice, hydrochloric acid (HCl), and pepsin for protein breakdown' },
    ];
    const c = compartments[index % compartments.length];
    const breeds = ['Borana bull', 'Fogera cow', 'Menz sheep', 'Arsi heifer', 'Somali goat', 'Afar camel', 'Sheko ox', 'Horro cow'];
    const animal = breeds[index % breeds.length];
    return {
      subject: 'agriculture',
      grade,
      unitNumber: 3,
      chapterTitle: 'Unit 3: Ruminant Anatomy & Digestion',
      qEn: `Animal Physiology #${index + 1}: In a healthy Ethiopian ${animal}, which stomach compartment is specifically responsible for: "${c.func}"?`,
      correctEn: c.name,
      distractorsEn: ['Rumen', 'Reticulum', 'Omasum', 'Abomasum'].filter(x => x !== c.name),
      explEn: `The ${c.name} performs: ${c.func}.`,
    };
  } else if (type === 5) {
    const breeds = [
      { breed: 'Sheko Cattle', region: 'Southwestern Bench-Maji highlands', trait: 'natural genetic tolerance to Trypanosomiasis (transmitted by tsetse flies)' },
      { breed: 'Boran Cattle', region: 'Southern rangelands (Borena)', trait: 'superior beef conformation, heat endurance, and resilience during extreme droughts' },
      { breed: 'Fogera Cattle', region: 'Lake Tana floodplains', trait: 'dual-purpose adaptation to seasonal wetlands, foot rot resistance, and tick tolerance' },
      { breed: 'Horro Cattle', region: 'Western Oromia', trait: 'adaptation to humid highland mixed crop-livestock farming with high calf survival' },
      { breed: 'Menz Sheep', region: 'North Shewa sub-alpine highlands', trait: 'dense coarse fleece wool production and resistance to extreme highland frost' },
      { breed: 'Afar Sheep', region: 'Afar lowlands', trait: 'fat-tailed desert breed with exceptional dehydration tolerance and endurance' },
      { breed: 'Arsi Cattle', region: 'Central-eastern highlands', trait: 'hardy zebu breed renowned for drafting power and adaptation to cold wet terrain' },
      { breed: 'Begait Cattle', region: 'Western Tigray', trait: 'tall dairy-type zebu breed characterized by high milk yield potential in arid scrub' }
    ];
    const b = breeds[index % breeds.length];
    return {
      subject: 'agriculture',
      grade,
      unitNumber: 3,
      chapterTitle: 'Unit 3: Indigenous Livestock Breeds',
      qEn: `Animal Genetics #${index + 1}: Which indigenous Ethiopian livestock breed, originating in ${b.region}, is globally recognized for "${b.trait}"?`,
      correctEn: b.breed,
      distractorsEn: ['Boran Cattle', 'Fogera Cattle', 'Sheko Cattle', 'Menz Sheep'].filter(x => x !== b.breed),
      explEn: `${b.breed} originated in ${b.region} and is renowned for ${b.trait}.`,
    };
  } else if (type === 6) {
    const pests = [
      { crop: 'Maize and Sorghum', pest: 'Fall Armyworm (Spodoptera frugiperda)', ctrl: 'bio-pesticides (Bt, Beauveria bassiana) and push-pull habitat manipulation' },
      { crop: 'Arabica Coffee', pest: 'Coffee Berry Borer (Hypothenemus hampei)', ctrl: 'strip picking of residual berries, pruning, and Beauveria bassiana fungus' },
      { crop: 'Bread Wheat', pest: 'Stem Rust (Puccinia graminis f. sp. tritici)', ctrl: 'deploying Ug99-resistant cultivars and targeted triazole fungicide applications' },
      { crop: 'Lowland Cereals', pest: 'Desert Locust (Schistocerca gregaria)', ctrl: 'coordinated aerial and ground ultra-low volume (ULV) biopesticide spraying' },
      { crop: 'Sorghum in Degraded Soils', pest: 'Striga weed (Striga hermonthica)', ctrl: 'intercropping with Desmodium (push-pull), legume rotation, and manure application' },
      { crop: 'Tomato & Solanaceous crops', pest: 'Tomato Leafminer (Tuta absoluta)', ctrl: 'pheromone monitoring delta traps and biological releases of Trichogramma wasps' }
    ];
    const p = pests[index % pests.length];
    return {
      subject: 'agriculture',
      grade,
      unitNumber: 4,
      chapterTitle: 'Unit 4: Plant Protection & Integrated Pest Management',
      qEn: `Plant Protection #${index + 1}: Agronomists inspect an outbreak on ${p.crop}. Which major agricultural pest/pathogen is identified, and managed via "${p.ctrl}"?`,
      correctEn: p.pest,
      distractorsEn: ['Desert Locust', 'Stem Rust', 'Fall Armyworm', 'Coffee Berry Borer'].filter(x => x !== p.pest),
      explEn: `${p.pest} attacks ${p.crop} and is controlled through ${p.ctrl}.`,
    };
  } else if (type === 7) {
    const slope = 5 + (index % 48);
    const struct = slope > 30 ? 'Bench Terracing & Stone Retaining Walls' : slope > 15 ? 'Fanya Juu & Graded Stone Bunds' : 'Contour Ploughing & Grass Vetiver Strips';
    const watersheds = ['Wollo steep slopes', 'Gamo Highlands', 'Hararghe ridge', 'Gojjam watershed', 'Sidama hillsides', 'Bale foothills', 'Tigray mountain slopes'];
    const ws = watersheds[index % watersheds.length];
    return {
      subject: 'agriculture',
      grade,
      unitNumber: 2,
      chapterTitle: 'Unit 2: Soil & Water Conservation',
      qEn: `Watershed Management #${index + 1}: On agricultural terrain in ${ws} with a slope gradient of ${slope}%, which physical soil conservation structure is most appropriate?`,
      correctEn: struct,
      distractorsEn: ['Deep Moldboard Inversion', 'Clean Fallowing', 'Unrestricted Downslope Ploughing'],
      explEn: `On a ${slope}% slope gradient, ${struct} effectively dissipates runoff velocity and halts soil detachment.`,
    };
  } else if (type === 8) {
    const methods = [
      { method: 'Drip Irrigation', eff: '90 – 95%', benefit: 'delivering pinpoint water to the crop rhizosphere with zero runoff' },
      { method: 'Center Pivot Sprinkler', eff: '75 – 85%', benefit: 'automated circular distribution suitable for undulating topography' },
      { method: 'Graded Furrow Irrigation', eff: '50 – 65%', benefit: 'gravity-driven open channel distribution along gentle gradients' }
    ];
    const m = methods[index % methods.length];
    return {
      subject: 'agriculture',
      grade,
      unitNumber: 5,
      chapterTitle: 'Unit 5: Agricultural Water Management',
      qEn: `Irrigation Engineering #${index + 1}: Which irrigation system attains a water application efficiency of ${m.eff} by ${m.benefit}?`,
      correctEn: m.method,
      distractorsEn: ['Wild Flooding', 'Border Strip Flooding', 'Basin Submersion'].filter(x => x !== m.method),
      explEn: `${m.method} achieves ${m.eff} water efficiency by ${m.benefit}.`,
    };
  } else if (type === 9) {
    const nutrients = [
      { elem: 'Nitrogen (N)', symp: 'uniform generalized chlorosis starting on older lower leaves while apex remains pale' },
      { elem: 'Phosphorus (P)', symp: 'deep purple/bronze anthocyanin pigmentation on leaf margins and severely restricted root architecture' },
      { elem: 'Potassium (K)', symp: 'marginal chlorosis followed by necrotic scorch along leaf tips and outer edges' },
      { elem: 'Zinc (Zn)', symp: 'interveinal chlorosis creating broad bleached bands on either side of the maize midrib ("white bud")' },
      { elem: 'Calcium (Ca)', symp: 'necrosis of expanding apical buds and blossom-end rot in developing fruits' },
      { elem: 'Iron (Fe)', symp: 'sharp interveinal chlorosis on the youngest upper leaves with veins remaining sharp green' }
    ];
    const n = nutrients[index % nutrients.length];
    return {
      subject: 'agriculture',
      grade,
      unitNumber: 1,
      chapterTitle: 'Unit 1: Plant Mineral Nutrition',
      qEn: `Plant Nutrition #${index + 1}: Tissue scouting identifies deficiency symptoms characterized by "${n.symp}". Which essential mineral nutrient is deficient?`,
      correctEn: n.elem,
      distractorsEn: ['Nitrogen (N)', 'Phosphorus (P)', 'Potassium (K)', 'Zinc (Zn)'].filter(x => x !== n.elem),
      explEn: `Deficiency of ${n.elem} causes: ${n.symp}.`,
    };
  } else if (type === 10) {
    const practices = [
      { name: 'Crop Rotation with Legumes', benefit: 'breaking pest cycles, improving soil organic matter, and biologically fixing atmospheric nitrogen via Rhizobium' },
      { name: 'Push-Pull Technology', benefit: 'repelling stemborers with Desmodium while attracting them to border Napier grass' },
      { name: 'Zero Tillage (Conservation Agriculture)', benefit: 'leaving crop residues on the surface to minimize soil disturbance, retain moisture, and curb erosion' },
      { name: 'Agroforestry with Faidherbia albida', benefit: 'reverse phenology shedding leaves during the rainy crop season to provide mulch without shading cereals' }
    ];
    const p = practices[index % practices.length];
    return {
      subject: 'agriculture',
      grade,
      unitNumber: 1,
      chapterTitle: 'Unit 1: Sustainable Agricultural Systems',
      qEn: `Sustainable Agriculture #${index + 1}: Which sustainable land-use practice is designed for: "${p.benefit}"?`,
      correctEn: p.name,
      distractorsEn: ['Monoculture cropping', 'Continuous deep tillage', 'Indiscriminate broad-spectrum spraying'],
      explEn: `${p.name} is adopted for: ${p.benefit}.`,
    };
  } else if (type === 11) {
    const stages = [
      { stage: 'Physiological Maturity', ind: 'formation of black layer in maize kernels or moisture drop below 30%' },
      { stage: 'Safe Storage Moisture Content', ind: 'grain moisture level reduced to 12 - 13% for cereals to prevent aflatoxin mold' },
      { stage: 'Hermetic Bag Storage (PICS)', ind: 'gas-tight bags that deplete oxygen to suffocate grain weevils without synthetic insecticides' }
    ];
    const s = stages[index % stages.length];
    return {
      subject: 'agriculture',
      grade,
      unitNumber: 1,
      chapterTitle: 'Unit 1: Post-Harvest Technology',
      qEn: `Post-Harvest Management #${index + 1}: Which post-harvest handling milestone or technology is defined by: "${s.ind}"?`,
      correctEn: s.stage,
      distractorsEn: ['Harvest Maturity', 'Field Sun Bleaching', 'Open Basket Aeration'].filter(x => x !== s.stage),
      explEn: `${s.stage} corresponds to: ${s.ind}.`,
    };
  } else if (type === 12) {
    const bees = [
      { caste: 'Queen Bee', count: '1 per colony', func: 'sole fertile female that lays up to 2,000 eggs daily and releases queen retinue pheromone' },
      { caste: 'Worker Bee', count: '20,000 to 60,000 per colony', func: 'sterile females that forage for nectar and pollen, nurse larvae, build wax combs, and defend hive' },
      { caste: 'Drone Bee', count: 'several hundred in breeding season', func: 'haploid males whose primary biological purpose is mating with a virgin queen in drone congregation areas' }
    ];
    const b = bees[index % bees.length];
    return {
      subject: 'agriculture',
      grade,
      unitNumber: 3,
      chapterTitle: 'Unit 3: Apiculture & Bee Biology',
      qEn: `Apiculture #${index + 1}: In an Ethiopian honeybee colony (Apis mellifera), which caste is described as: "${b.func}"?`,
      correctEn: b.caste,
      distractorsEn: ['Queen Bee', 'Worker Bee', 'Drone Bee', 'Nurse Larva'].filter(x => x !== b.caste),
      explEn: `In the honeybee colony, the ${b.caste} is: ${b.func}.`,
    };
  } else {
    const feeds = [
      { name: 'Roughages (Straws, Hay, Silage)', char: 'high crude fiber (> 18%) and low total digestible nutrients (TDN)' },
      { name: 'Energy Concentrates (Maize, Sorghum grain)', char: 'high soluble carbohydrates, low crude fiber (< 18%), and high metabolizable energy' },
      { name: 'Protein Supplements (Nouge cake, Cottonseed meal)', char: 'high crude protein content (> 20%) vital for lactation and tissue synthesis' },
      { name: 'Mineral Blocks (Licks)', char: 'essential micro and macro minerals (Ca, P, NaCl, Co) preventing metabolic deficiencies' }
    ];
    const f = feeds[index % feeds.length];
    return {
      subject: 'agriculture',
      grade,
      unitNumber: 3,
      chapterTitle: 'Unit 3: Animal Feeds & Nutrition',
      qEn: `Animal Nutrition #${index + 1}: Under livestock feed categorization, which class of livestock feed is characterized by: "${f.char}"?`,
      correctEn: f.name,
      distractorsEn: ['Roughages', 'Energy Concentrates', 'Protein Supplements', 'Mineral Blocks'].filter(x => !f.name.includes(x)),
      explEn: `${f.name} is characterized by: ${f.char}.`,
    };
  }
}

// =========================================================================
// 5. IT PROCEDURAL GENERATOR
// =========================================================================
export function generateITQuestion(topic: string, index: number, grade: GradeLevel = 12): RawGeneratedItem {
  const seed = index * 47 + 509;
  const subtopic = index % 12;

  if (subtopic === 0) {
    const dec = 10 + ((index * 13) % 240);
    const bin = dec.toString(2).padStart(8, '0');
    return {
      subject: 'it',
      grade,
      unitNumber: 1,
      chapterTitle: 'Unit 1: Digital Representation & Binary Logic',
      qEn: `Digital Logic #${index + 1}: What is the 8-bit unsigned binary representation of the decimal integer ${dec}?`,
      correctEn: bin,
      distractorsEn: [(dec + 1).toString(2).padStart(8, '0'), (dec - 1).toString(2).padStart(8, '0'), (dec + 4).toString(2).padStart(8, '0')],
      explEn: `Converting ${dec} to binary gives ${bin}.`,
    };
  } else if (subtopic === 1) {
    const layers = [
      { name: 'Physical Layer', pdu: 'Bits', func: 'transmission of raw bits over physical copper, fiber, or wireless media' },
      { name: 'Data Link Layer', pdu: 'Frames', func: 'media access control (MAC addressing) and hop-to-hop frame delivery' },
      { name: 'Network Layer', pdu: 'Packets', func: 'logical IP routing across interconnected networks' },
      { name: 'Transport Layer', pdu: 'Segments', func: 'end-to-end host communication, flow control, and port addressing (TCP/UDP)' },
      { name: 'Application Layer', pdu: 'Data', func: 'user-facing network protocols like HTTP, DNS, SMTP and FTP' }
    ];
    const l = layers[index % layers.length];
    return {
      subject: 'it',
      grade,
      unitNumber: 2,
      chapterTitle: 'Unit 2: Computer Networks & OSI Model',
      qEn: `Networking #${index + 1}: In the OSI Reference Model, which layer operates on "${l.pdu}" and is primarily responsible for: "${l.func}"?`,
      correctEn: l.name,
      distractorsEn: ['Physical Layer', 'Network Layer', 'Transport Layer', 'Application Layer'].filter(x => x !== l.name),
      explEn: `The ${l.name} manages: ${l.func}.`,
    };
  } else if (subtopic === 2) {
    const gates = [
      { name: 'AND gate', rule: 'outputs TRUE (1) only when all inputs are 1' },
      { name: 'OR gate', rule: 'outputs TRUE (1) if at least one input is 1' },
      { name: 'XOR gate', rule: 'outputs TRUE (1) if and only if inputs are different (odd parity)' },
      { name: 'NAND gate', rule: 'universal gate that outputs 0 only when all inputs are 1' },
      { name: 'NOR gate', rule: 'universal gate that outputs 1 only when all inputs are 0' }
    ];
    const g = gates[index % gates.length];
    return {
      subject: 'it',
      grade,
      unitNumber: 1,
      chapterTitle: 'Unit 1: Hardware Architecture & Logic Gates',
      qEn: `Logic Circuits #${index + 1}: Which fundamental digital logic gate operates according to the functional truth rule: "${g.rule}"?`,
      correctEn: g.name,
      distractorsEn: ['AND gate', 'OR gate', 'XOR gate', 'NAND gate'].filter(x => x !== g.name),
      explEn: `The ${g.name} follows the rule: ${g.rule}.`,
    };
  } else if (subtopic === 3) {
    const complexities = [
      { algo: 'Binary Search', best: 'O(1)', avg: 'O(log n)', worst: 'O(log n)' },
      { algo: 'Merge Sort', best: 'O(n log n)', avg: 'O(n log n)', worst: 'O(n log n)' },
      { algo: 'Quick Sort', best: 'O(n log n)', avg: 'O(n log n)', worst: 'O(n²)' },
      { algo: 'Bubble Sort', best: 'O(n)', avg: 'O(n²)', worst: 'O(n²)' },
      { algo: 'Array Index Access', best: 'O(1)', avg: 'O(1)', worst: 'O(1)' }
    ];
    const c = complexities[index % complexities.length];
    return {
      subject: 'it',
      grade,
      unitNumber: 3,
      chapterTitle: 'Unit 3: Data Structures & Algorithms',
      qEn: `Algorithm Analysis #${index + 1}: What is the average time complexity of "${c.algo}" when executed on a dataset of size n?`,
      correctEn: c.avg,
      distractorsEn: ['O(1)', 'O(n)', 'O(n log n)', 'O(n²)'].filter(x => x !== c.avg),
      explEn: `The average time complexity of ${c.algo} is ${c.avg}.`,
    };
  } else if (subtopic === 4) {
    const sqlQueries = [
      { clause: 'WHERE', role: 'filters rows before any grouping occurs based on specified conditional predicates' },
      { clause: 'HAVING', role: 'filters aggregated groups after GROUP BY operations have been applied' },
      { clause: 'PRIMARY KEY', role: 'uniquely identifies each record in a relational database table with non-null constraint' },
      { clause: 'FOREIGN KEY', role: 'enforces referential integrity by linking a column to a primary key in another table' },
      { clause: 'JOIN', role: 'combines columns from two or more tables based on a related common key attribute' }
    ];
    const s = sqlQueries[index % sqlQueries.length];
    return {
      subject: 'it',
      grade,
      unitNumber: 4,
      chapterTitle: 'Unit 4: Database Systems & SQL',
      qEn: `Databases #${index + 1}: In relational SQL database design, which clause or constraint is defined as: "${s.role}"?`,
      correctEn: s.clause,
      distractorsEn: ['WHERE', 'HAVING', 'PRIMARY KEY', 'FOREIGN KEY'].filter(x => x !== s.clause),
      explEn: `In SQL, ${s.clause} is defined as: ${s.role}.`,
    };
  } else if (subtopic === 5) {
    const attacks = [
      { name: 'Phishing', desc: 'deceptive communications impersonating legitimate organizations to steal user credentials' },
      { name: 'Ransomware', desc: 'malicious cryptoviral software encrypting victim files and demanding payment for decryption keys' },
      { name: 'DDoS (Distributed Denial of Service)', desc: 'overwhelming target network servers with massive traffic from a coordinated botnet' },
      { name: 'SQL Injection', desc: 'inserting malicious SQL fragments into input fields to manipulate database queries' },
      { name: 'Man-in-the-Middle (MitM)', desc: 'secretly intercepting and relaying communications between two parties' }
    ];
    const a = attacks[index % attacks.length];
    return {
      subject: 'it',
      grade,
      unitNumber: 5,
      chapterTitle: 'Unit 5: Cybersecurity & Digital Safety',
      qEn: `Cybersecurity #${index + 1}: Which cyber threat vector or security exploit is characterized by: "${a.desc}"?`,
      correctEn: a.name,
      distractorsEn: ['Phishing', 'Ransomware', 'DDoS', 'SQL Injection'].filter(x => x !== a.name),
      explEn: `${a.name} is defined by: ${a.desc}.`,
    };
  } else if (subtopic === 6) {
    const cpuParts = [
      { part: 'Arithmetic Logic Unit (ALU)', func: 'executing elementary integer arithmetic and bitwise logical comparisons' },
      { part: 'Program Counter (PC)', func: 'register holding the memory address of the next instruction to be fetched' },
      { part: 'Memory Address Register (MAR)', func: 'holding the physical address in RAM currently being accessed for read or write' },
      { part: 'Control Unit (CU)', func: 'decoding instructions and orchestrating control signals across CPU components' },
      { part: 'Accumulator', func: 'register temporarily buffering intermediate results of arithmetic operations' }
    ];
    const p = cpuParts[index % cpuParts.length];
    return {
      subject: 'it',
      grade,
      unitNumber: 1,
      chapterTitle: 'Unit 1: Computer Hardware & CPU',
      qEn: `CPU Architecture #${index + 1}: In the classic Von Neumann processor model, which hardware unit or register is tasked with "${p.func}"?`,
      correctEn: p.part,
      distractorsEn: ['ALU', 'Program Counter (PC)', 'Control Unit (CU)', 'Accumulator'].filter(x => !p.part.includes(x)),
      explEn: `The ${p.part} is responsible for ${p.func}.`,
    };
  } else if (subtopic === 7) {
    const osConcepts = [
      { name: 'Deadlock', def: 'a state where a set of processes are permanently blocked because each holds a resource and waits for another' },
      { name: 'Virtual Memory & Paging', def: 'swapping fixed-size memory blocks between RAM and disk storage to simulate larger address space' },
      { name: 'Round Robin Scheduling', def: 'allocating fixed CPU time slices (quanta) to each ready process in cyclic queue order' },
      { name: 'Semaphore', def: 'a synchronization variable used to control concurrent process access to shared critical resources' }
    ];
    const o = osConcepts[index % osConcepts.length];
    return {
      subject: 'it',
      grade,
      unitNumber: 1,
      chapterTitle: 'Unit 1: Operating Systems',
      qEn: `Operating Systems #${index + 1}: Which foundational operating system mechanism or condition is defined as: "${o.def}"?`,
      correctEn: o.name,
      distractorsEn: ['Deadlock', 'Virtual Memory & Paging', 'Round Robin Scheduling', 'Semaphore'].filter(x => x !== o.name),
      explEn: `${o.name} corresponds to: ${o.def}.`,
    };
  } else if (subtopic === 8) {
    const webItems = [
      { term: 'DNS (Domain Name System)', duty: 'resolving human-friendly domain names (e.g., moe.gov.et) to numerical IP addresses' },
      { term: 'HTTPS', duty: 'securing hypertext transport through cryptographic TLS/SSL encryption and certificate verification' },
      { term: 'RESTful API', duty: 'architectural style utilizing standard HTTP verbs (GET, POST, PUT, DELETE) for stateless data exchange' },
      { term: 'JSON', duty: 'lightweight text-based data interchange format using key-value pairs and arrays' }
    ];
    const w = webItems[index % webItems.length];
    return {
      subject: 'it',
      grade,
      unitNumber: 2,
      chapterTitle: 'Unit 2: Web & Internet Technologies',
      qEn: `Web Technologies #${index + 1}: Which web networking technology is explicitly dedicated to: "${w.duty}"?`,
      correctEn: w.term,
      distractorsEn: ['DNS', 'HTTPS', 'RESTful API', 'JSON'].filter(x => !w.term.includes(x)),
      explEn: `${w.term} is designed for: ${w.duty}.`,
    };
  } else if (subtopic === 9) {
    const cloudModels = [
      { model: 'IaaS (Infrastructure as a Service)', ex: 'provisioning virtualized computing hardware, servers, storage, and networking' },
      { model: 'PaaS (Platform as a Service)', ex: 'providing managed development platforms and runtimes for programmers to deploy code' },
      { model: 'SaaS (Software as a Service)', ex: 'delivering complete ready-to-use software applications over the web directly to end-users' }
    ];
    const m = cloudModels[index % cloudModels.length];
    return {
      subject: 'it',
      grade,
      unitNumber: 2,
      chapterTitle: 'Unit 2: Cloud Computing',
      qEn: `Cloud Models #${index + 1}: Under cloud service classifications, which service tier is characterized by: "${m.ex}"?`,
      correctEn: m.model,
      distractorsEn: ['IaaS', 'PaaS', 'SaaS', 'DaaS'].filter(x => !m.model.includes(x)),
      explEn: `${m.model} is characterized by: ${m.ex}.`,
    };
  } else if (subtopic === 10) {
    const aiTerms = [
      { term: 'Supervised Learning', char: 'training machine learning models on labeled input-output training pairs' },
      { term: 'Unsupervised Learning', char: 'discovering hidden patterns and clusters in unlabeled data without target outputs' },
      { term: 'Overfitting', char: 'a model learning training data noise so closely that it performs poorly on unseen test data' },
      { term: 'Neural Network Weights', char: 'adjustable internal parameters tuned by backpropagation algorithms during training' }
    ];
    const a = aiTerms[index % aiTerms.length];
    return {
      subject: 'it',
      grade,
      unitNumber: 3,
      chapterTitle: 'Unit 3: Artificial Intelligence Fundamentals',
      qEn: `Artificial Intelligence #${index + 1}: Which machine learning principle is defined as: "${a.char}"?`,
      correctEn: a.term,
      distractorsEn: ['Supervised Learning', 'Unsupervised Learning', 'Overfitting', 'Reinforcement Learning'].filter(x => x !== a.term),
      explEn: `${a.term} refers to: ${a.char}.`,
    };
  } else {
    const ethics = [
      { term: 'Software Piracy', desc: 'unauthorized duplication, distribution, or commercial use of copyrighted proprietary software' },
      { term: 'Open Source License (GPL/MIT)', desc: 'legal license permitting users to inspect, modify, and redistribute source code freely' },
      { term: 'Digital Divide', desc: 'economic and social inequality between demographic groups regarding access to information technology' },
      { term: 'Computer Ergonomics', desc: 'designing workplace setups and monitors to reduce musculoskeletal strain and eye fatigue' }
    ];
    const e = ethics[index % ethics.length];
    return {
      subject: 'it',
      grade,
      unitNumber: 5,
      chapterTitle: 'Unit 5: IT Ethics & Digital Citizenship',
      qEn: `IT Ethics #${index + 1}: Which concept in information technology law and society refers to: "${e.desc}"?`,
      correctEn: e.term,
      distractorsEn: ['Software Piracy', 'Open Source License', 'Digital Divide', 'Ergonomics'].filter(x => !e.term.includes(x)),
      explEn: `${e.term} refers to: ${e.desc}.`,
    };
  }
}

// =========================================================================
// 6. BIOLOGY PROCEDURAL GENERATOR
// =========================================================================
export function generateBiologyQuestion(topic: string, index: number, grade: GradeLevel = 12): RawGeneratedItem {
  const seed = index * 53 + 613;
  const subtopic = index % 10;

  if (subtopic === 0) {
    const crosses = [
      { cross: 'Bb x Bb', pDom: '75%', pRec: '25%', trait: 'brown vs blue eye color' },
      { cross: 'Aa x aa', pDom: '50%', pRec: '50%', trait: 'tall vs dwarf pea stems' },
      { cross: 'Rr x Rr', pDom: '75%', pRec: '25%', trait: 'round vs wrinkled seeds' },
      { cross: 'YY x yy', pDom: '100%', pRec: '0%', trait: 'yellow vs green cotyledons' },
      { cross: 'Tt x Tt', pDom: '75%', pRec: '25%', trait: 'axial vs terminal flowers' },
      { cross: 'Pp x pp', pDom: '50%', pRec: '50%', trait: 'purple vs white flowers' },
    ];
    const c = crosses[index % crosses.length];
    const queryDom = index % 2 === 0;
    const ans = queryDom ? c.pDom : c.pRec;
    const term = queryDom ? 'dominant' : 'recessive';
    return {
      subject: 'biology',
      grade,
      unitNumber: 2,
      chapterTitle: 'Unit 2: Mendelian Genetics & Inheritance',
      qEn: `Genetics #${index + 1}: In a standard monohybrid genetic cross between parent genotypes (${c.cross}) regarding ${c.trait}, what is the expected probability of offspring expressing the ${term} phenotype?`,
      correctEn: ans,
      distractorsEn: ['25%', '50%', '75%', '100%'].filter(x => x !== ans),
      explEn: `A cross of ${c.cross} yields an expected ${term} phenotypic ratio of ${ans}.`,
    };
  } else if (subtopic === 1) {
    const codons = [
      { codon: 'AUG', role: 'Universal start codon encoding Methionine' },
      { codon: 'UAA', role: 'Nonsense stop codon signaling termination of translation' },
      { codon: 'UAG', role: 'Amber stop codon terminating polypeptide chain synthesis' },
      { codon: 'UGA', role: 'Opal stop codon signaling release of nascent polypeptide' },
      { codon: 'UUU', role: 'Codon encoding amino acid Phenylalanine' },
      { codon: 'GGG', role: 'Codon encoding amino acid Glycine' }
    ];
    const cd = codons[index % codons.length];
    return {
      subject: 'biology',
      grade,
      unitNumber: 2,
      chapterTitle: 'Unit 2: Molecular Genetics & Protein Synthesis',
      qEn: `Molecular Genetics #${index + 1}: During eukaryotic protein translation, what is the precise biological role of the mRNA codon "${cd.codon}"?`,
      correctEn: cd.role,
      distractorsEn: ['Universal start codon encoding Methionine', 'Stop codon terminating translation', 'Codon encoding Phenylalanine'].filter(x => x !== cd.role),
      explEn: `The codon ${cd.codon} functions as: ${cd.role}.`,
    };
  } else if (subtopic === 2) {
    const organelles = [
      { name: 'Mitochondria', func: 'cellular respiration generating ATP via oxidative phosphorylation' },
      { name: 'Chloroplast', func: 'phototrophic light-dependent capture and carbon fixation in thylakoids' },
      { name: 'Ribosome', func: 'translating messenger RNA transcripts into functional polypeptide chains' },
      { name: 'Rough Endoplasmic Reticulum', func: 'synthesizing and processing membrane-bound and secretory proteins' },
      { name: 'Golgi Apparatus', func: 'post-translational modification, sorting, and packaging of macromolecules' },
      { name: 'Lysosome', func: 'hydrolytic digestion of cellular waste, autophagic recycling, and pathogens' }
    ];
    const org = organelles[index % organelles.length];
    return {
      subject: 'biology',
      grade,
      unitNumber: 1,
      chapterTitle: 'Unit 1: Cell Structure and Organelles',
      qEn: `Cell Biology #${index + 1}: Which subcellular eukaryotic organelle is uniquely specialized for: "${org.func}"?`,
      correctEn: org.name,
      distractorsEn: ['Mitochondria', 'Chloroplast', 'Ribosome', 'Golgi Apparatus'].filter(x => x !== org.name),
      explEn: `The ${org.name} is specialized for: ${org.func}.`,
    };
  } else if (subtopic === 3) {
    const respiration = [
      { stage: 'Glycolysis', loc: 'Cytoplasm (Cytosol)', netAtp: '2 ATP net + 2 NADH' },
      { stage: 'Link Reaction', loc: 'Mitochondrial Matrix', netAtp: 'produces 2 Acetyl-CoA + 2 CO₂' },
      { stage: 'Krebs Cycle (Citric Acid Cycle)', loc: 'Mitochondrial Matrix', netAtp: '2 ATP + 6 NADH + 2 FADH₂' },
      { stage: 'Oxidative Phosphorylation', loc: 'Inner Mitochondrial Membrane (Cristae)', netAtp: 'approximately 26 - 28 ATP' }
    ];
    const r = respiration[index % respiration.length];
    return {
      subject: 'biology',
      grade,
      unitNumber: 1,
      chapterTitle: 'Unit 1: Cellular Respiration & Energy',
      qEn: `Respiration #${index + 1}: In cellular aerobic respiration, in which sub-cellular location does "${r.stage}" take place?`,
      correctEn: r.loc,
      distractorsEn: ['Cytoplasm (Cytosol)', 'Mitochondrial Matrix', 'Inner Mitochondrial Membrane (Cristae)', 'Outer Membrane'].filter(x => x !== r.loc),
      explEn: `${r.stage} occurs in the ${r.loc}.`,
    };
  } else if (subtopic === 4) {
    const organs = [
      { organ: 'Nephron / Glomerulus', duty: 'ultrafiltration of blood plasma under high hydrostatic pressure' },
      { organ: 'Loop of Henle', duty: 'countercurrent multiplication creating an osmotic medullary gradient for water conservation' },
      { organ: 'Alveoli', duty: 'gas exchange across thin squamous respiratory membranes via passive diffusion' },
      { organ: 'Beta cells of Islets of Langerhans', duty: 'secretion of endocrine insulin to reduce elevated blood glucose' },
      { organ: 'Sinoatrial (SA) Node', duty: 'initiating myogenic electrical impulses as the natural pacemaker of the heart' }
    ];
    const o = organs[index % organs.length];
    return {
      subject: 'biology',
      grade,
      unitNumber: 3,
      chapterTitle: 'Unit 3: Human Biology & Physiology',
      qEn: `Physiology #${index + 1}: Which anatomical structure in the human body is specifically responsible for: "${o.duty}"?`,
      correctEn: o.organ,
      distractorsEn: ['Nephron / Glomerulus', 'Loop of Henle', 'Alveoli', 'Beta cells'].filter(x => x !== o.organ),
      explEn: `The ${o.organ} carries out: ${o.duty}.`,
    };
  } else if (subtopic === 5) {
    const cycles = [
      { microbe: 'Rhizobium', func: 'biological nitrogen fixation converting atmospheric N₂ into ammonium inside legume root nodules' },
      { microbe: 'Nitrosomonas', func: 'nitrification converting ammonia/ammonium into nitrite (NO₂⁻)' },
      { microbe: 'Nitrobacter', func: 'oxidizing nitrite (NO₂⁻) into plant-absorbable nitrate (NO₃⁻)' },
      { microbe: 'Pseudomonas denitrificans', func: 'denitrification reducing soil nitrates back into gaseous dinitrogen (N₂)' }
    ];
    const c = cycles[index % cycles.length];
    return {
      subject: 'biology',
      grade,
      unitNumber: 4,
      chapterTitle: 'Unit 4: Ecology & Biogeochemical Cycles',
      qEn: `Ecology #${index + 1}: In the biogeochemical nitrogen cycle, which specialized bacterial genus carries out: "${c.func}"?`,
      correctEn: c.microbe,
      distractorsEn: ['Rhizobium', 'Nitrosomonas', 'Nitrobacter', 'Pseudomonas'].filter(x => !c.microbe.includes(x)),
      explEn: `${c.microbe} is responsible for: ${c.func}.`,
    };
  } else if (subtopic === 6) {
    const endemics = [
      { name: 'Walia Ibex (Capra walie)', habitat: 'Simien Mountains National Park cliffs and afro-alpine crags' },
      { name: 'Ethiopian Wolf (Canis simensis)', habitat: 'Bale Mountains afro-alpine plateaus preying on giant mole rats' },
      { name: 'Gelada Baboon (Theropithecus gelada)', habitat: 'Simien and central high plateaus specialized for graminivory (grass eating)' },
      { name: 'Mountain Nyala (Tragelaphus buxtoni)', habitat: 'dense montane forests and heather moorlands of the Arsi and Bale ranges' },
      { name: 'Swayne’s Hartebeest (Alcelaphus buselaphus swaynei)', habitat: 'Senkelle Swayne’s Hartebeest Sanctuary in the central rift valley' }
    ];
    const e = endemics[index % endemics.length];
    return {
      subject: 'biology',
      grade,
      unitNumber: 4,
      chapterTitle: 'Unit 4: Ethiopian Endemic Wildlife & Conservation',
      qEn: `Conservation #${index + 1}: Which iconic endemic Ethiopian mammal is strictly protected within "${e.habitat}"?`,
      correctEn: e.name,
      distractorsEn: ['Walia Ibex', 'Ethiopian Wolf', 'Gelada Baboon', 'Mountain Nyala'].filter(x => !e.name.includes(x)),
      explEn: `${e.name} is an endemic species inhabiting: ${e.habitat}.`,
    };
  } else if (subtopic === 7) {
    const immun = [
      { entity: 'B Lymphocytes (Plasma Cells)', duty: 'humoral immunity synthesizing antigen-specific antibodies (immunoglobulins)' },
      { entity: 'Cytotoxic T Cells (CD8+)', duty: 'cell-mediated lysis of virus-infected cells and abnormal cells' },
      { entity: 'Helper T Cells (CD4+)', duty: 'secreting cytokines to coordinate and activate both B cells and cytotoxic T cells' },
      { entity: 'Macrophage', duty: 'phagocytosis of cellular debris and presenting processed foreign peptides on MHC molecules' }
    ];
    const im = immun[index % immun.length];
    return {
      subject: 'biology',
      grade,
      unitNumber: 3,
      chapterTitle: 'Unit 3: Immunology & Human Health',
      qEn: `Immunology #${index + 1}: In the human adaptive immune system, which specialized leukocyte is responsible for: "${im.duty}"?`,
      correctEn: im.entity,
      distractorsEn: ['B Lymphocytes', 'Cytotoxic T Cells', 'Helper T Cells', 'Neutrophils'].filter(x => !im.entity.includes(x)),
      explEn: `${im.entity} is responsible for: ${im.duty}.`,
    };
  } else if (subtopic === 8) {
    const plantP = [
      { struct: 'Xylem Vessel Elements', role: 'unidirectional transport of water and dissolved minerals via transpiration pull' },
      { struct: 'Phloem Sieve Tube Elements', role: 'bidirectional translocation of photosynthetic assimilates (sucrose) via pressure flow' },
      { struct: 'Stomatal Guard Cells', role: 'regulating gas exchange and transpiration via turgor-driven opening and closing' },
      { struct: 'Root Hair Epidermal Cells', role: 'maximizing surface area for passive and active mineral absorption from soil solution' }
    ];
    const pp = plantP[index % plantP.length];
    return {
      subject: 'biology',
      grade,
      unitNumber: 1,
      chapterTitle: 'Unit 1: Plant Anatomy and Physiology',
      qEn: `Plant Biology #${index + 1}: In vascular plant anatomy, which tissue structure performs: "${pp.role}"?`,
      correctEn: pp.struct,
      distractorsEn: ['Xylem Vessels', 'Phloem Sieve Tubes', 'Guard Cells', 'Cortex'].filter(x => !pp.struct.includes(x)),
      explEn: `${pp.struct} performs: ${pp.role}.`,
    };
  } else {
    const pathogens = [
      { agent: 'Plasmodium falciparum (Protozoan)', disease: 'Severe Malaria transmitted by female Anopheles mosquitoes' },
      { agent: 'Mycobacterium tuberculosis (Bacterium)', disease: 'Tuberculosis (TB) attacking human pulmonary tissues' },
      { agent: 'Human Immunodeficiency Virus (Retrovirus)', disease: 'HIV/AIDS depleting CD4+ T helper lymphocytes' },
      { agent: 'Vibrio cholerae (Gram-negative bacterium)', disease: 'Cholera causing massive watery diarrhea via enterotoxin secretion' }
    ];
    const pat = pathogens[index % pathogens.length];
    return {
      subject: 'biology',
      grade,
      unitNumber: 3,
      chapterTitle: 'Unit 3: Infectious Diseases & Pathogens',
      qEn: `Microbiology #${index + 1}: Which pathogenic microorganism is the causative etiological agent of: "${pat.disease}"?`,
      correctEn: pat.agent,
      distractorsEn: ['Plasmodium falciparum', 'Mycobacterium tuberculosis', 'HIV', 'Vibrio cholerae'].filter(x => !pat.agent.includes(x)),
      explEn: `${pat.agent} causes ${pat.disease}.`,
    };
  }
}

// =========================================================================
// 7. ECONOMICS PROCEDURAL GENERATOR
// =========================================================================
export function generateEconomicsQuestion(topic: string, index: number, grade: GradeLevel = 12): RawGeneratedItem {
  const seed = index * 67 + 811;
  const subtopic = index % 8;

  if (subtopic === 0) {
    const gdpBase = 400 + (index * 45);
    const inflation = 5 + (index % 25);
    const realGdp = Math.round(gdpBase / (1 + inflation / 100));
    return {
      subject: 'economics',
      grade,
      unitNumber: 1,
      chapterTitle: 'Unit 1: Macroeconomics & National Income',
      qEn: `National Income #${index + 1}: If an economy records a Nominal GDP of ${gdpBase} billion birr in a fiscal year with a price index of ${100 + inflation}%, what is the computed Real GDP?`,
      correctEn: `${realGdp} billion birr`,
      distractorsEn: [`${gdpBase} billion birr`, `${realGdp + 120} billion birr`, `${realGdp - 80} billion birr`],
      explEn: `Real GDP = (Nominal GDP / Price Index) * 100 = (${gdpBase} / ${100 + inflation}) * 100 ≈ ${realGdp} billion birr.`,
    };
  } else if (subtopic === 1) {
    const p1 = 20 + ((index * 5) % 80);
    const p2 = p1 + 10;
    const q1 = 200 - ((index * 7) % 120);
    const q2 = Math.max(20, q1 - 30);
    const pctP = ((p2 - p1) / p1) * 100;
    const pctQ = ((q1 - q2) / q1) * 100;
    const ped = (pctQ / pctP).toFixed(2);
    const elasticityType = parseFloat(ped) > 1.0 ? 'Price Elastic' : parseFloat(ped) < 1.0 ? 'Price Inelastic' : 'Unitary Elastic';
    return {
      subject: 'economics',
      grade,
      unitNumber: 2,
      chapterTitle: 'Unit 2: Price Elasticity of Demand',
      qEn: `Elasticity #${index + 1}: When the unit price of a good increases from ${p1} ETB to ${p2} ETB, consumer quantity demanded falls from ${q1} units to ${q2} units. What is the computed PED coefficient and elasticity classification?`,
      correctEn: `${ped} (${elasticityType})`,
      distractorsEn: [`${(parseFloat(ped) * 2).toFixed(2)} (Elastic)`, `${(parseFloat(ped) * 0.5).toFixed(2)} (Inelastic)`, `1.00 (Unitary)`],
      explEn: `PED = %ΔQ / %ΔP = ${pctQ.toFixed(1)}% / ${pctP.toFixed(1)}% = ${ped} (${elasticityType}).`,
    };
  } else if (subtopic === 2) {
    const markets = [
      { name: 'Perfect Competition', char: 'many small buyers and sellers, homogeneous products, free entry/exit, price taker (P = MR = MC)' },
      { name: 'Pure Monopoly', char: 'single seller with extreme barriers to entry, unique product with no close substitutes, price maker' },
      { name: 'Oligopoly', char: 'a small number of interdependent dominant firms, strategic behavior, game theory payoffs, kinked demand curve' },
      { name: 'Monopolistic Competition', char: 'many sellers offering differentiated products with non-price competition (advertising, branding)' }
    ];
    const m = markets[index % markets.length];
    return {
      subject: 'economics',
      grade,
      unitNumber: 3,
      chapterTitle: 'Unit 3: Market Structures & Theory of Firm',
      qEn: `Market Structures #${index + 1}: In microeconomic theory, which market structure is uniquely defined by: "${m.char}"?`,
      correctEn: m.name,
      distractorsEn: ['Perfect Competition', 'Pure Monopoly', 'Oligopoly', 'Monopolistic Competition'].filter(x => x !== m.name),
      explEn: `${m.name} is characterized by: ${m.char}.`,
    };
  } else if (subtopic === 3) {
    const output = randInt(10, 100, seed) * 10;
    const fc = randInt(20, 80, seed + 1) * 100;
    const vcPerUnit = randInt(15, 60, seed + 2);
    const tc = fc + (vcPerUnit * output);
    const atc = (tc / output).toFixed(1);
    return {
      subject: 'economics',
      grade,
      unitNumber: 2,
      chapterTitle: 'Unit 2: Theory of Production & Costs',
      qEn: `Production Costs #${index + 1}: A factory incurs fixed overhead costs of ${fc} birr and variable costs of ${vcPerUnit} birr per unit. Producing ${output} units, what is the Average Total Cost (ATC) per unit?`,
      correctEn: `${atc} birr/unit`,
      distractorsEn: [`${(parseFloat(atc) * 1.5).toFixed(1)} birr/unit`, `${(parseFloat(atc) * 0.7).toFixed(1)} birr/unit`, `${vcPerUnit} birr/unit`],
      explEn: `Total Cost = ${fc} + (${vcPerUnit} * ${output}) = ${tc} birr. ATC = ${tc} / ${output} = ${atc} birr/unit.`,
    };
  } else if (subtopic === 4) {
    const tools = [
      { tool: 'Raising the Legal Reserve Requirement Ratio', goal: 'contractionary monetary policy shrinking commercial bank credit and fighting inflation' },
      { tool: 'Lowering the Central Bank Discount Rate', goal: 'expansionary policy encouraging commercial banks to borrow reserves and expand lending' },
      { tool: 'Open Market Operations (Selling Treasury Bills)', goal: 'absorbing excess liquidity from the banking system to temper aggregate demand' },
      { tool: 'Increasing Government Capital Spending', goal: 'expansionary fiscal policy stimulating national aggregate demand and employment' }
    ];
    const t = tools[index % tools.length];
    return {
      subject: 'economics',
      grade,
      unitNumber: 4,
      chapterTitle: 'Unit 4: Monetary & Fiscal Policy in Ethiopia',
      qEn: `Macro Stabilization #${index + 1}: In macroeconomic policy by the National Bank of Ethiopia or Ministry of Finance, which intervention achieves: "${t.goal}"?`,
      correctEn: t.tool,
      distractorsEn: ['Raising Reserve Ratio', 'Lowering Discount Rate', 'Selling Treasury Bills', 'Increasing Capital Spending'].filter(x => !t.tool.includes(x)),
      explEn: `${t.tool} achieves: ${t.goal}.`,
    };
  } else if (subtopic === 5) {
    return {
      subject: 'economics',
      grade,
      unitNumber: 5,
      chapterTitle: 'Unit 5: International Trade & Exchange Rates',
      qEn: `International Trade #${index + 1}: According to David Ricardo’s Law of Comparative Advantage, a country should specialize in and export commodities that it produces at:`,
      correctEn: 'The lowest domestic opportunity cost relative to trading partners',
      distractorsEn: ['The highest absolute cost of production', 'The greatest absolute labor hours', 'An identical opportunity cost to trading partners'],
      explEn: `Comparative advantage exists when a nation produces a good at a lower relative opportunity cost.`,
    };
  } else if (subtopic === 6) {
    const indicators = [
      { name: 'Gini Coefficient', desc: 'statistical measure of income inequality ranging from 0 (perfect equality) to 1 (maximal inequality)' },
      { name: 'Human Development Index (HDI)', desc: 'composite index integrating life expectancy at birth, expected/mean years of schooling, and GNI per capita' },
      { name: 'Consumer Price Index (CPI)', desc: 'weighted basket index measuring the average change over time in the prices paid by urban consumers' },
      { name: 'Current Account Deficit', desc: 'condition where the value of imported goods and services exceeds the value of exports' }
    ];
    const ind = indicators[index % indicators.length];
    return {
      subject: 'economics',
      grade,
      unitNumber: 1,
      chapterTitle: 'Unit 1: Economic Indicators & Development',
      qEn: `Economic Indicators #${index + 1}: Which major economic metric is defined as: "${ind.desc}"?`,
      correctEn: ind.name,
      distractorsEn: ['Gini Coefficient', 'Human Development Index (HDI)', 'Consumer Price Index (CPI)', 'Current Account Deficit'].filter(x => x !== ind.name),
      explEn: `${ind.name} is defined as: ${ind.desc}.`,
    };
  } else {
    const inflations = [
      { type: 'Demand-Pull Inflation', cause: 'aggregate demand continuously exceeding aggregate supply ("too much money chasing too few goods")' },
      { type: 'Cost-Push Inflation', cause: 'increases in the cost of production (wages, raw materials, fuel) shifting aggregate supply curve to the left' },
      { type: 'Built-in / Wage-Price Spiral', cause: 'workers demanding higher wages to keep up with living costs, causing firms to raise prices further' },
      { type: 'Hyperinflation', cause: 'uncontrolled rapid monetary expansion with monthly inflation rates exceeding 50%' }
    ];
    const inf = inflations[index % inflations.length];
    return {
      subject: 'economics',
      grade,
      unitNumber: 1,
      chapterTitle: 'Unit 1: Inflation & Monetary Dynamics',
      qEn: `Inflation Theory #${index + 1}: Which type of economic inflation is caused by: "${inf.cause}"?`,
      correctEn: inf.type,
      distractorsEn: ['Demand-Pull Inflation', 'Cost-Push Inflation', 'Wage-Price Spiral', 'Hyperinflation'].filter(x => x !== inf.type),
      explEn: `${inf.type} is caused by: ${inf.cause}.`,
    };
  }
}

// =========================================================================
// 8. GEOGRAPHY PROCEDURAL GENERATOR
// =========================================================================
export function generateGeographyQuestion(topic: string, index: number, grade: GradeLevel = 12): RawGeneratedItem {
  const seed = index * 71 + 929;
  const subtopic = index % 8;

  if (subtopic === 0) {
    const mapCm = randInt(2, 16, seed);
    const scales = [25, 50, 100, 150, 200, 250];
    const scaleKm = scales[index % scales.length];
    const actualDist = mapCm * scaleKm;
    return {
      subject: 'geography',
      grade,
      unitNumber: 1,
      chapterTitle: 'Unit 1: Map Reading & Cartography',
      qEn: `Map Scale #${index + 1}: On a topographic map where a scale of 1 cm represents ${scaleKm} km on the terrain, two Ethiopian district capitals are separated by ${mapCm} cm. What is the actual ground distance?`,
      correctEn: `${actualDist} km`,
      distractorsEn: [`${Math.round(actualDist / 2)} km`, `${actualDist + 50} km`, `${actualDist * 2} km`],
      explEn: `Actual ground distance = Map distance * Scale = ${mapCm} cm * ${scaleKm} km/cm = ${actualDist} km.`,
    };
  } else if (subtopic === 1) {
    const reliefs = [
      { name: 'Ras Dejen (4,533 m)', loc: 'Simien Mountain Massif', note: 'highest mountain peak in Ethiopia and the fourth highest in Africa' },
      { name: 'Mount Tullu Dimtu (4,377 m)', loc: 'Bale Mountain Range', note: 'highest peak in the southeastern Ethiopian highlands' },
      { name: 'Danakil Depression / Dallol (-125 m)', loc: 'Afar Depression (Northern Rift Valley)', note: 'one of the hottest and lowest subaerial depressions on Earth' },
      { name: 'Mount Guna (4,120 m)', loc: 'South Gondar highlands', note: 'prominent volcanic massif serving as a key watershed divide' }
    ];
    const r = reliefs[index % reliefs.length];
    return {
      subject: 'geography',
      grade,
      unitNumber: 2,
      chapterTitle: 'Unit 2: Physical Geography & Relief of Ethiopia',
      qEn: `Ethiopian Relief #${index + 1}: Which landmark geographic relief feature, located in the "${r.loc}", is distinguished as "${r.note}"?`,
      correctEn: r.name,
      distractorsEn: ['Ras Dejen', 'Mount Tullu Dimtu', 'Danakil Depression', 'Mount Guna'].filter(x => !r.name.includes(x)),
      explEn: `${r.name} is located in ${r.loc} and is ${r.note}.`,
    };
  } else if (subtopic === 2) {
    const rivers = [
      { river: 'Abay (Blue Nile)', basin: 'Western Drainage System (flowing to Mediterranean Sea)', dam: 'Grand Ethiopian Renaissance Dam (GERD)' },
      { river: 'Awash River', basin: 'Internal (Endorheic) Rift Valley Basin (terminating in Lake Abbe)', dam: 'Koka Dam / Tendaho scheme' },
      { river: 'Omo-Gibe River', basin: 'Rift Valley Internal Basin (terminating in Lake Turkana)', dam: 'Gilgel Gibe III Hydroelectric Plant' },
      { river: 'Wabi Shebelle River', basin: 'Southeastern Drainage System (flowing toward the Indian Ocean)', dam: 'Melka Wakena Hydroelectric Dam' },
      { river: 'Baro-Akobo River', basin: 'Western Drainage System (tributary to White Nile / Sobat)', dam: 'high-discharge lowland river in Gambella' },
      { river: 'Tekeze River', basin: 'Western Drainage System (flowing to Atbara / Nile)', dam: 'Tekeze Arch Dam' }
    ];
    const rv = rivers[index % rivers.length];
    return {
      subject: 'geography',
      grade,
      unitNumber: 3,
      chapterTitle: 'Unit 3: Drainage Systems & Water Resources',
      qEn: `River Basins #${index + 1}: In which drainage system does the ${rv.river} flow, and which landmark infrastructure is situated along its course: "${rv.dam}"?`,
      correctEn: `${rv.basin}`,
      distractorsEn: ['Western Drainage System', 'Internal Rift Valley Basin', 'Southeastern Drainage System'].filter(x => x !== rv.basin),
      explEn: `The ${rv.river} is a key river of the ${rv.basin}.`,
    };
  } else if (subtopic === 3) {
    const elev = 350 + ((index * 40) % 3500);
    const lapse = ((elev / 100) * 0.65).toFixed(1);
    const seaLevelTemp = 32;
    const tempAtElev = (seaLevelTemp - parseFloat(lapse)).toFixed(1);
    return {
      subject: 'geography',
      grade,
      unitNumber: 2,
      chapterTitle: 'Unit 2: Climatology & Environmental Lapse Rate',
      qEn: `Lapse Rate Math #${index + 1}: Assuming a sea-level temperature of ${seaLevelTemp} °C and an environmental lapse rate of 0.65 °C per 100 m elevation, what is the estimated air temperature at an altitude of ${elev} m?`,
      correctEn: `${tempAtElev} °C`,
      distractorsEn: [`${(parseFloat(tempAtElev) + 5).toFixed(1)} °C`, `${(parseFloat(tempAtElev) - 5).toFixed(1)} °C`, `20.0 °C`],
      explEn: `Temperature drop = (${elev} / 100) * 0.65 = ${lapse} °C. Estimated temperature = ${seaLevelTemp} - ${lapse} = ${tempAtElev} °C.`,
    };
  } else if (subtopic === 4) {
    const soils = [
      { soil: 'Nitisols (Red Basaltic Soils)', region: 'highland areas with high rainfall (Wollega, Kaffa, Gojjam)', char: 'deep, porous, highly weathered soils with excellent agricultural fertility for coffee and teff' },
      { soil: 'Vertisols (Black Cracking Clays)', region: 'highland plateaus with poor drainage (Shewa, Gojjam, Arsi plains)', char: 'high clay content expanding when wet and cracking deeply when dry' },
      { soil: 'Fluvisols (Alluvial Floodplain Soils)', region: 'river valleys and deltaic plains (Awash, Omo, Baro valleys)', char: 'young nutrient-rich sediments deposited by annual seasonal river flooding' },
      { soil: 'Lithosols / Regosols', region: 'steep escarpments of Tigray, Wollo, and Afar margins', char: 'shallow, stony soils highly susceptible to mechanical erosion' }
    ];
    const s = soils[index % soils.length];
    return {
      subject: 'geography',
      grade,
      unitNumber: 4,
      chapterTitle: 'Unit 4: Soils & Natural Vegetation of Ethiopia',
      qEn: `Soils of Ethiopia #${index + 1}: Which major soil group, widely distributed across "${s.region}", is characterized as: "${s.char}"?`,
      correctEn: s.soil,
      distractorsEn: ['Nitisols', 'Vertisols', 'Fluvisols', 'Lithosols'].filter(x => !s.soil.includes(x)),
      explEn: `${s.soil} is prominent in ${s.region} and characterized by ${s.char}.`,
    };
  } else if (subtopic === 5) {
    const pop = randInt(50, 150, seed) * 100000;
    const births = randInt(25, 45, seed + 1);
    const deaths = randInt(5, 12, seed + 2);
    const rni = ((births - deaths) / 10).toFixed(1);
    return {
      subject: 'geography',
      grade,
      unitNumber: 5,
      chapterTitle: 'Unit 5: Population Geography of Ethiopia',
      qEn: `Demography #${index + 1}: A regional state with an estimated population of ${(pop / 1e6).toFixed(1)} million records a Crude Birth Rate of ${births} per 1,000 and a Crude Death Rate of ${deaths} per 1,000. What is the Rate of Natural Increase (RNI)?`,
      correctEn: `${rni}% per annum`,
      distractorsEn: [`${(parseFloat(rni) + 1.0).toFixed(1)}% per annum`, `${(parseFloat(rni) - 0.8).toFixed(1)}% per annum`, `${(births - deaths)}% per annum`],
      explEn: `RNI = (CBR - CDR) / 10 = (${births} - ${deaths}) / 10 = ${rni}% per annum.`,
    };
  } else if (subtopic === 6) {
    const gis = [
      { tech: 'Raster Data Model', rep: 'representing geographic phenomena as a grid matrix of square cells/pixels with assigned attribute values' },
      { tech: 'Vector Data Model', rep: 'representing discrete real-world spatial entities using geometric coordinates: points, lines, and polygons' },
      { tech: 'Global Positioning System (GPS)', rep: 'constellation of medium Earth orbit satellites delivering precise 3D spatial positioning and timing' },
      { tech: 'Normalized Difference Vegetation Index (NDVI)', rep: 'remote sensing spectral index contrasting near-infrared (NIR) and red wavelengths to monitor crop vigor' }
    ];
    const g = gis[index % gis.length];
    return {
      subject: 'geography',
      grade,
      unitNumber: 1,
      chapterTitle: 'Unit 1: GIS and Remote Sensing',
      qEn: `Geoinformatics #${index + 1}: In Geographic Information Systems (GIS), which spatial data model or technology is described as: "${g.rep}"?`,
      correctEn: g.tech,
      distractorsEn: ['Raster Data Model', 'Vector Data Model', 'GPS', 'NDVI'].filter(x => x !== g.tech),
      explEn: `${g.tech} is: ${g.rep}.`,
    };
  } else {
    const agros = [
      { zone: 'Bereha (Desert)', alt: 'below 500 m a.s.l.', temp: '> 27 °C', crop: 'Nomadic pastoralism, date palms' },
      { zone: 'Kolla (Warm Lowland)', alt: '500 – 1,500 m a.s.l.', temp: '20 – 27 °C', crop: 'Sorghum, sesame, cotton, groundnuts' },
      { zone: 'Weyna Dega (Mid-Altitude Sub-Humid)', alt: '1,500 – 2,300 m a.s.l.', temp: '15 – 20 °C', crop: 'Teff, maize, Arabica coffee, wheat' },
      { zone: 'Dega (Cool Highlands)', alt: '2,300 – 3,200 m a.s.l.', temp: '10 – 15 °C', crop: 'Barley, wheat, faba bean, sheep' },
      { zone: 'Wurch / Kur (Afro-Alpine)', alt: 'above 3,200 m a.s.l.', temp: '< 10 °C', crop: 'Afro-alpine grasses, frost-tolerant sheep' }
    ];
    const az = agros[index % agros.length];
    return {
      subject: 'geography',
      grade,
      unitNumber: 2,
      chapterTitle: 'Unit 2: Agro-Climatic Zones of Ethiopia',
      qEn: `Agro-Climatic Zones #${index + 1}: Under the traditional Ethiopian thermal classification, which altitudinal zone spans "${az.alt}" with mean temperatures of "${az.temp}" and output of "${az.crop}"?`,
      correctEn: az.zone,
      distractorsEn: ['Bereha', 'Kolla', 'Weyna Dega', 'Dega'].filter(x => !az.zone.includes(x)),
      explEn: `${az.zone} is found at ${az.alt} with ${az.crop}.`,
    };
  }
}

// =========================================================================
// 9. HISTORY PROCEDURAL GENERATOR
// =========================================================================
export function generateHistoryQuestion(topic: string, index: number, grade: GradeLevel = 12): RawGeneratedItem {
  const seed = index * 73 + 1031;
  const subtopic = index % 8;

  if (subtopic === 0) {
    const ancient = [
      { civil: 'Kingdom of Aksum', period: '1st - 8th century CE', achieve: 'minting gold, silver and bronze coinage, erecting monolithic granite stelae, and maritime trade via Adulis' },
      { civil: 'Zagwe Dynasty', period: '1150 - 1270 CE', achieve: 'excavating eleven rock-hewn monolithic churches at Roha (Lalibela) carved out of volcanic tuff' },
      { civil: 'Gondarine Period', period: '1636 - 1769 CE', achieve: 'establishing a permanent imperial stone castle capital founded by Emperor Fasilides' },
      { civil: 'Emirate of Harar', period: '16th - 19th century CE', achieve: 'constructing the historic Jugol defensive stone wall with five gates under Amir Nur ibn Mujahid' },
      { civil: 'Land of Punt', period: '2nd millennium BCE', achieve: 'ancient Red Sea trading partner documented in Egyptian Queen Hatshepsut expedition reliefs' }
    ];
    const an = ancient[index % ancient.length];
    return {
      subject: 'history',
      grade,
      unitNumber: 1,
      chapterTitle: 'Unit 1: Ancient Civilizations of Ethiopia',
      qEn: `Ancient Civilizations #${index + 1}: Which historic Ethiopian civilization or dynasty, flourishing during "${an.period}", is renowned for: "${an.achieve}"?`,
      correctEn: an.civil,
      distractorsEn: ['Kingdom of Aksum', 'Zagwe Dynasty', 'Gondarine Period', 'Emirate of Harar'].filter(x => x !== an.civil),
      explEn: `${an.civil} flourished during ${an.period} and is renowned for: ${an.achieve}.`,
    };
  } else if (subtopic === 1) {
    const adwaEvents = [
      { ev: 'Signing of the Treaty of Wuchale', date: 'May 2, 1889', detail: 'discrepancy in Article XVII where the Italian version claimed Ethiopia was an Italian protectorate' },
      { ev: 'Decisive Victory at the Battle of Adwa', date: 'March 1, 1896', detail: 'Emperor Menelik II and Empress Taytu leading united patriotic forces to defeat Italian General Baratieri' },
      { ev: 'Siege of Mekelle (Enda Yesus)', date: 'January 1896', detail: 'Empress Taytu cutting off the water supply to force the besieged Italian garrison to surrender' },
      { ev: 'Battle of Amba Alagi', date: 'December 7, 1895', detail: 'vanguard Ethiopian forces under Fitawrari Gebeyehu routing Major Toselli’s fortified Italian outpost' }
    ];
    const ad = adwaEvents[index % adwaEvents.length];
    return {
      subject: 'history',
      grade,
      unitNumber: 2,
      chapterTitle: 'Unit 2: The Adwa Campaign & Victory',
      qEn: `Adwa Campaign #${index + 1}: In the historic anti-colonial campaign, on which date did "${ad.ev}" take place, marked by: "${ad.detail}"?`,
      correctEn: ad.date,
      distractorsEn: ['May 2, 1889', 'March 1, 1896', 'January 1896', 'December 7, 1895'].filter(x => x !== ad.date),
      explEn: `${ad.ev} occurred on ${ad.date}.`,
    };
  } else if (subtopic === 2) {
    const resistance = [
      { leader: 'Belay Zeleke', arena: 'Gojjam (Mount Somma)', feat: 'celebrated patriot commander who fought fierce guerrilla battles against Italian occupying forces' },
      { leader: 'Ras Abebe Aregay', arena: 'Shewa highlands', feat: 'supreme commander of the patriotic resistance forces in central Ethiopia during the 5-year occupation' },
      { leader: 'Abune Petros', arena: 'Addis Ababa', feat: 'Ethiopian Orthodox bishop executed by Fascist Italian firing squad for refusing to endorse occupation' },
      { leader: 'Zeray Deres', arena: 'Rome, Italy', feat: 'young patriot who drew his ceremonial sword in public protest before the monument to the fallen of Dogali' },
      { leader: 'Yekatit 12 Massacre (1937)', arena: 'Addis Ababa', feat: 'brutal indiscriminate slaughter of over 30,000 Ethiopian civilians orchestrated by Marshal Rodolfo Graziani' }
    ];
    const res = resistance[index % resistance.length];
    return {
      subject: 'history',
      grade,
      unitNumber: 3,
      chapterTitle: 'Unit 3: Anti-Fascist Patriotic Resistance (1936–1941)',
      qEn: `Patriotic Resistance #${index + 1}: In the Ethiopian resistance against Fascist Italian occupation, which leader or event is remembered in "${res.arena}" for: "${res.feat}"?`,
      correctEn: res.leader,
      distractorsEn: ['Belay Zeleke', 'Ras Abebe Aregay', 'Abune Petros', 'Zeray Deres'].filter(x => x !== res.leader),
      explEn: `${res.leader} is remembered for: ${res.feat}.`,
    };
  } else if (subtopic === 3) {
    const modernMilestones = [
      { ev: 'Coronation of Emperor Haile Selassie I', year: 'November 2, 1930', sig: 'formal accession to the imperial throne following the death of Empress Zewditu' },
      { ev: 'Promulgation of the First Written Constitution of Ethiopia', year: '1931 G.C.', sig: 'centralizing imperial executive power with a bicameral consultative parliament' },
      { ev: 'Federation of Eritrea with Ethiopia under UN Resolution 390(A)', year: '1952 G.C.', sig: 'establishing federal autonomy under the Ethiopian Crown, later dissolved in 1962' },
      { ev: 'Founding of the Organization of African Unity (OAU) in Addis Ababa', year: 'May 25, 1963', sig: 'historic summit of 32 independent African heads of state establishing permanent headquarters' },
      { ev: 'The Popular Ethiopian Revolution overthrowing the Solomonic Imperial Monarchy', year: 'September 12, 1974', sig: 'military deposition of Emperor Haile Selassie by the Coordinating Committee of the Armed Forces (Derg)' }
    ];
    const mm = modernMilestones[index % modernMilestones.length];
    return {
      subject: 'history',
      grade,
      unitNumber: 4,
      chapterTitle: 'Unit 4: Modern Ethiopian History (20th Century)',
      qEn: `20th Century Milestones #${index + 1}: In which historic year did "${mm.ev}" occur, marking: "${mm.sig}"?`,
      correctEn: mm.year,
      distractorsEn: ['1930', '1931', '1963', '1974'].filter(x => !mm.year.includes(x)),
      explEn: `${mm.ev} occurred on ${mm.year}.`,
    };
  } else if (subtopic === 4) {
    const gadaa = [
      { term: 'Abba Gadaa', role: 'supreme political leader and spokesperson of the Gadaa governing council serving a strict 8-year term' },
      { term: 'Chaffe Assembly', role: 'general legislative assembly of the Gadaa system where laws (Seera) are debated, reviewed, and proclaimed' },
      { term: 'Gadaa Grade Cycle (8 years)', role: 'institutional progression through socio-political age grades from Dabballee to Luba and Yuba' },
      { term: 'Siinqee Institution', role: 'customary sacred stick wielded by Oromo women symbolizing moral authority, rights protection, and conflict mediation' }
    ];
    const gd = gadaa[index % gadaa.length];
    return {
      subject: 'history',
      grade,
      unitNumber: 2,
      chapterTitle: 'Unit 2: Indigenous Democratic Institutions',
      qEn: `Gadaa System #${index + 1}: In the indigenous Gadaa democratic socio-political system of the Oromo people, which office or institution is defined as: "${gd.role}"?`,
      correctEn: gd.term,
      distractorsEn: ['Abba Gadaa', 'Chaffe Assembly', 'Gadaa Grade Cycle', 'Siinqee'].filter(x => !gd.term.includes(x)),
      explEn: `In the Gadaa system, ${gd.term} is: ${gd.role}.`,
    };
  } else if (subtopic === 5) {
    const worldHist = [
      { ev: 'Berlin Conference (Scramble for Africa)', year: '1884 – 1885', imp: 'European imperial powers partitioning African territory without African representation' },
      { ev: 'Assassination of Archduke Franz Ferdinand in Sarajevo', year: 'June 28, 1914', imp: 'immediate geopolitical catalyst triggering the outbreak of World War I' },
      { ev: 'Signing of the Treaty of Versailles', year: '1919', imp: 'peace settlement concluding WWI that imposed severe war guilt reparations on Germany and created the League of Nations' },
      { ev: 'Invasion of Poland by Nazi Germany', year: 'September 1, 1939', imp: 'event initiating the military conflict of World War II in Europe' },
      { ev: 'Charter of the United Nations signed in San Francisco', year: '1945', imp: 'establishment of the premier global collective security organization with Ethiopia as a founding member' }
    ];
    const wh = worldHist[index % worldHist.length];
    return {
      subject: 'history',
      grade,
      unitNumber: 5,
      chapterTitle: 'Unit 5: World History & International Relations',
      qEn: `World History #${index + 1}: Which landmark global historical turning point occurred in "${wh.year}", characterized by: "${wh.imp}"?`,
      correctEn: wh.ev,
      distractorsEn: ['Berlin Conference', 'Outbreak of WWI', 'Treaty of Versailles', 'Formation of United Nations'].filter(x => !wh.ev.includes(x)),
      explEn: `${wh.ev} took place in ${wh.year}.`,
    };
  } else if (subtopic === 6) {
    const panAfrica = [
      { leader: 'Emperor Haile Selassie I', role: 'visionary champion of African unity hosting the historic May 1963 OAU founding conference in Addis Ababa' },
      { leader: 'Kwame Nkrumah', role: 'first President of Ghana and ardent advocate of immediate political federation across a United States of Africa' },
      { leader: 'W.E.B. Du Bois', role: 'intellectual father of Pan-Africanism organizing successive Pan-African Congresses in the early 20th century' },
      { leader: 'Julius Nyerere', role: 'President of Tanzania who spearheaded the Liberation Committee supporting southern African anti-apartheid struggles' }
    ];
    const pa = panAfrica[index % panAfrica.length];
    return {
      subject: 'history',
      grade,
      unitNumber: 4,
      chapterTitle: 'Unit 4: Pan-Africanism & African Independence',
      qEn: `Pan-African Movement #${index + 1}: Which prominent Pan-African leader is celebrated for: "${pa.role}"?`,
      correctEn: pa.leader,
      distractorsEn: ['Emperor Haile Selassie I', 'Kwame Nkrumah', 'W.E.B. Du Bois', 'Julius Nyerere'].filter(x => x !== pa.leader),
      explEn: `${pa.leader} is recognized for: ${pa.role}.`,
    };
  } else {
    const treaties = [
      { treaty: 'Hewett (Adwa) Treaty of 1884', parties: 'Emperor Yohannes IV and Rear Admiral Sir William Hewett of Great Britain', term: 'Ethiopia facilitating safe evacuation of Egyptian garrisons from Sudan in return for Bogos and mass transit through Massawa' },
      { treaty: 'Treaty of Addis Ababa of October 26, 1896', parties: 'Emperor Menelik II and Italian diplomatic envoy Major Nerazzini', term: 'Italy formally annulling the Treaty of Wuchale and unconditionally recognizing Ethiopia as an absolute sovereign empire' },
      { treaty: 'Tripartite Agreement of 1906', parties: 'Britain, France, and Italy', term: 'imperial powers delineating their spheres of economic interest in Ethiopia without Ethiopian consent' }
    ];
    const tr = treaties[index % treaties.length];
    return {
      subject: 'history',
      grade,
      unitNumber: 2,
      chapterTitle: 'Unit 2: Treaties & Diplomatic History',
      qEn: `Diplomatic Treaties #${index + 1}: Which diplomatic treaty between "${tr.parties}" was concluded under the terms: "${tr.term}"?`,
      correctEn: tr.treaty,
      distractorsEn: ['Hewett Treaty of 1884', 'Treaty of Wuchale 1889', 'Treaty of Addis Ababa 1896', 'Tripartite Agreement 1906'].filter(x => x !== tr.treaty),
      explEn: `${tr.treaty} was signed under: ${tr.term}.`,
    };
  }
}

// =========================================================================
// 10. CITIZENSHIP PROCEDURAL GENERATOR
// =========================================================================
export function generateCitizenshipQuestion(topic: string, index: number, grade: GradeLevel = 12): RawGeneratedItem {
  const seed = index * 79 + 1151;
  const subtopic = index % 7;

  if (subtopic === 0) {
    const articles = [
      { art: 'Article 10', title: 'Separation of State and Religion', prov: 'state shall not interfere in religious matters and religion shall not interfere in state matters' },
      { art: 'Article 14', title: 'Right to Life', prov: 'every person has the inviolable right to life, which cannot be deprived except for grave crimes defined by law' },
      { art: 'Article 25', title: 'Right to Equality', prov: 'all persons are equal before the law and entitled to equal protection without any discrimination' },
      { art: 'Article 29', title: 'Right of Thought, Opinion and Expression', prov: 'guaranteeing freedom of opinion, press, and access to information of public interest' },
      { art: 'Article 35', title: 'Rights of Women', prov: 'equal rights with men in marriage, property ownership, affirmative action, and maternal health leave' },
      { art: 'Article 39', title: 'Rights of Nations, Nationalities, and Peoples', prov: 'unconditional right to self-determination, language preservation, culture, and self-rule' },
      { art: 'Article 40', title: 'Right to Property', prov: 'vesting the right to ownership of rural and urban land exclusively in the state and peoples of Ethiopia' }
    ];
    const a = articles[index % articles.length];
    return {
      subject: 'citizenship',
      grade,
      unitNumber: 1,
      chapterTitle: 'Unit 1: The FDRE Constitution & Human Rights',
      qEn: `Constitutional Law #${index + 1}: In the 1995 Constitution of the FDRE, which specific Article guarantees "${a.title}" with the provision: "${a.prov}"?`,
      correctEn: a.art,
      distractorsEn: ['Article 10', 'Article 14', 'Article 25', 'Article 39'].filter(x => x !== a.art),
      explEn: `In the FDRE Constitution, ${a.art} guarantees ${a.title}.`,
    };
  } else if (subtopic === 1) {
    const organs = [
      { organ: 'House of Peoples’ Representatives (HoPR)', role: 'highest authority of the federal government, exercising supreme federal legislative power (maximum 550 seats)' },
      { organ: 'House of Federation (HoF)', role: 'interpreting the Constitution, organizing Council of Constitutional Inquiry, and determining federal budget subsidy formulas' },
      { organ: 'Prime Minister of the FDRE', role: 'highest executive authority, chief executive, and Commander-in-Chief of the National Armed Forces' },
      { organ: 'President of the Republic', role: 'head of state performing ceremonial duties and formally opening the annual joint session of parliament' },
      { organ: 'Federal Supreme Court', role: 'highest judicial authority of the federal government with cassation power over fundamental errors of law' }
    ];
    const o = organs[index % organs.length];
    return {
      subject: 'citizenship',
      grade,
      unitNumber: 2,
      chapterTitle: 'Unit 2: Organs of the Federal Government',
      qEn: `State Organs #${index + 1}: Under the constitutional design of the FDRE, which state organ is empowered to execute: "${o.role}"?`,
      correctEn: o.organ,
      distractorsEn: ['House of Peoples’ Representatives', 'House of Federation', 'Prime Minister', 'Federal Supreme Court'].filter(x => !o.organ.includes(x)),
      explEn: `${o.organ} executes: ${o.role}.`,
    };
  } else if (subtopic === 2) {
    const idr = [
      { system: 'Jaarsummaa', culture: 'Oromo community elder mediation', phil: 'restoring social harmony, reconciliation, and truth through respected clan elders (Jaarsolii)' },
      { system: 'Shimgillina', culture: 'Amhara traditional arbitration', phil: 'utilizing impartial community elders (Shimagle) to resolve civil and interpersonal disputes peacefully' },
      { system: 'Xeer System', culture: 'Somali customary legal code', phil: 'oral contract-based clan legal agreements defining collective responsibility and compensation' },
      { system: 'Yejoka Qicha', culture: 'Gurage traditional legislative assembly', phil: 'customary law council convened under sacred trees adjudicating communal governance and restitution' },
      { system: 'Mada’a', culture: 'Afar customary jurisprudence', phil: 'codified traditional elders council resolving inter-clan boundaries and pastoral resource access' }
    ];
    const id = idr[index % idr.length];
    return {
      subject: 'citizenship',
      grade,
      unitNumber: 3,
      chapterTitle: 'Unit 3: Indigenous Conflict Resolution Systems',
      qEn: `Customary Justice #${index + 1}: Which Ethiopian customary dispute resolution system, embedded in "${id.culture}", functions on the principle of: "${id.phil}"?`,
      correctEn: id.system,
      distractorsEn: ['Jaarsummaa', 'Shimgillina', 'Xeer System', 'Yejoka Qicha'].filter(x => x !== id.system),
      explEn: `${id.system} is an indigenous mechanism characterized by: ${id.phil}.`,
    };
  } else if (subtopic === 3) {
    const governance = [
      { pillar: 'Rule of Law', def: 'all individuals, institutions, and government authorities are equally accountable under publicly promulgated laws' },
      { pillar: 'Transparency', def: 'government decisions, budgetary allocations, and administrative actions are conducted openly with public accessibility' },
      { pillar: 'Accountability', def: 'public officials must justify their decisions, manage public assets prudently, and face sanction for maladministration' },
      { pillar: 'Civic Participation', def: 'active, informed involvement of citizens in public policy formulation, elections, and community decision-making' }
    ];
    const g = governance[index % governance.length];
    return {
      subject: 'citizenship',
      grade,
      unitNumber: 2,
      chapterTitle: 'Unit 2: Good Governance and Ethics',
      qEn: `Good Governance #${index + 1}: Under modern democratic governance frameworks, which foundational pillar is defined as: "${g.def}"?`,
      correctEn: g.pillar,
      distractorsEn: ['Rule of Law', 'Transparency', 'Accountability', 'Civic Participation'].filter(x => x !== g.pillar),
      explEn: `${g.pillar} is defined as: ${g.def}.`,
    };
  } else if (subtopic === 4) {
    const election = [
      { prin: 'Periodic Free and Fair Elections', def: 'voting conducted at constitutionally established intervals by secret ballot under an independent electoral board' },
      { prin: 'Universal Adult Suffrage', def: 'the right of all adult citizens to vote without discrimination based on ethnicity, gender, or religion' },
      { prin: 'National Election Board of Ethiopia (NEBE)', def: 'constitutionally mandated independent organ established to register political parties and conduct elections' }
    ];
    const el = election[index % election.length];
    return {
      subject: 'citizenship',
      grade,
      unitNumber: 2,
      chapterTitle: 'Unit 2: Electoral Systems & Democracy',
      qEn: `Democracy & Voting #${index + 1}: Which constitutional electoral concept or statutory institution is defined by: "${el.def}"?`,
      correctEn: el.prin,
      distractorsEn: ['Free and Fair Elections', 'Universal Adult Suffrage', 'NEBE', 'Direct Democracy'].filter(x => !el.prin.includes(x)),
      explEn: `${el.prin} refers to: ${el.def}.`,
    };
  } else if (subtopic === 5) {
    const intl = [
      { inst: 'Universal Declaration of Human Rights (UDHR)', year: '1948', imp: 'milestone UN proclamation setting out fundamental human rights to be universally protected' },
      { inst: 'African Union (AU)', year: '2002 (transformed from OAU)', imp: 'continental union of 55 African states with permanent headquarters located in Addis Ababa' },
      { inst: 'International Court of Justice (ICJ)', year: '1945 (The Hague)', imp: 'principal judicial organ of the UN settling legal disputes submitted by sovereign states' }
    ];
    const in_ = intl[index % intl.length];
    return {
      subject: 'citizenship',
      grade,
      unitNumber: 4,
      chapterTitle: 'Unit 4: International Law & Multilateral Institutions',
      qEn: `International Law #${index + 1}: Which international body or charter, established in "${in_.year}", carries the mandate: "${in_.imp}"?`,
      correctEn: in_.inst,
      distractorsEn: ['UDHR', 'African Union (AU)', 'ICJ', 'League of Nations'].filter(x => !in_.inst.includes(x)),
      explEn: `${in_.inst} was established in ${in_.year} for: ${in_.imp}.`,
    };
  } else {
    const ethical = [
      { val: 'Integrity', desc: 'steadfast adherence to strict moral and ethical principles, honesty, and incorruptibility in public and private duty' },
      { val: 'Civic Responsibility', desc: 'the obligation of citizens to respect laws, pay lawful taxes, protect public property, and defend national sovereignty' },
      { val: 'Patriotism', desc: 'devotion to the welfare, unity, and progress of one’s country while respecting diversity and democratic coexistence' }
    ];
    const et = ethical[index % ethical.length];
    return {
      subject: 'citizenship',
      grade,
      unitNumber: 5,
      chapterTitle: 'Unit 5: Civic Values & Moral Duties',
      qEn: `Civic Values #${index + 1}: Which core civic value or citizen virtue is defined as: "${et.desc}"?`,
      correctEn: et.val,
      distractorsEn: ['Integrity', 'Civic Responsibility', 'Patriotism', 'Tolerance'].filter(x => x !== et.val),
      explEn: `${et.val} is defined as: ${et.desc}.`,
    };
  }
}

// =========================================================================
// 11. GENERAL BUSINESS PROCEDURAL GENERATOR
// =========================================================================
export function generateGeneralBusinessQuestion(topic: string, index: number, grade: GradeLevel = 12): RawGeneratedItem {
  const seed = index * 83 + 1277;
  const subtopic = index % 7;

  if (subtopic === 0) {
    const assets = randInt(10, 100, seed) * 10000;
    const liabilities = randInt(3, 40, seed + 1) * 10000;
    const equity = assets - liabilities;
    return {
      subject: 'general_business',
      grade,
      unitNumber: 2,
      chapterTitle: 'Unit 2: Fundamentals of Accounting',
      qEn: `Accounting Equation #${index + 1}: An enterprise reports total economic assets of ${assets} ETB and creditor liabilities of ${liabilities} ETB. According to the fundamental accounting equation (Assets = Liabilities + Owner’s Equity), what is the Owner’s Equity?`,
      correctEn: `${equity} ETB`,
      distractorsEn: [`${assets + liabilities} ETB`, `${equity + 50000} ETB`, `${Math.round(assets / 2)} ETB`],
      explEn: `Assets = Liabilities + Equity -> Equity = Assets - Liabilities = ${assets} - ${liabilities} = ${equity} ETB.`,
    };
  } else if (subtopic === 1) {
    const forms = [
      { form: 'Sole Proprietorship', char: 'unincorporated business owned by one individual who carries unlimited personal liability for debts' },
      { form: 'General Partnership', char: 'business association of two or more co-owners where each partner shares unlimited joint and several liability' },
      { form: 'Share Company (S.C.)', char: 'capital-based company with minimum 5 shareholders where owner liability is strictly limited to the par value of subscribed shares' },
      { form: 'Cooperative Society', char: 'member-owned enterprise operating on democratic governance ("one member, one vote") distributing surplus according to patronage' }
    ];
    const f = forms[index % forms.length];
    return {
      subject: 'general_business',
      grade,
      unitNumber: 1,
      chapterTitle: 'Unit 1: Business Organizations & Legal Forms',
      qEn: `Business Organization #${index + 1}: In the Commercial Code of Ethiopia, which legal form of business ownership is defined by: "${f.char}"?`,
      correctEn: f.form,
      distractorsEn: ['Sole Proprietorship', 'General Partnership', 'Share Company (S.C.)', 'Cooperative Society'].filter(x => x !== f.form),
      explEn: `${f.form} is characterized by: ${f.char}.`,
    };
  } else if (subtopic === 2) {
    const ps = [
      { p: 'Product', def: 'the physical good, digital service, or bundled features designed to satisfy consumer desires' },
      { p: 'Price', def: 'the monetary amount charged for the good, incorporating cost structure, competitive positioning, and markup margins' },
      { p: 'Place (Distribution)', def: 'the logistics channels, wholesalers, and retail outlets ensuring customer accessibility' },
      { p: 'Promotion', def: 'the communication blend including advertising, personal selling, direct marketing, and public relations' }
    ];
    const p_item = ps[index % ps.length];
    return {
      subject: 'general_business',
      grade,
      unitNumber: 3,
      chapterTitle: 'Unit 3: Marketing Management & Strategy',
      qEn: `Marketing Mix #${index + 1}: In marketing management, which element of the classic 4 Ps framework corresponds to: "${p_item.def}"?`,
      correctEn: p_item.p,
      distractorsEn: ['Product', 'Price', 'Place (Distribution)', 'Promotion'].filter(x => x !== p_item.p),
      explEn: `In marketing, ${p_item.p} corresponds to: ${p_item.def}.`,
    };
  } else if (subtopic === 3) {
    const inventory = [
      { method: 'FIFO (First-In, First-Out)', effect: 'assumes older acquired inventory is sold first, resulting in higher ending inventory valuation during inflationary periods' },
      { method: 'LIFO (Last-In, First-Out)', effect: 'assumes the most recently acquired goods are sold first, matching current higher replacement costs against revenues' },
      { method: 'Weighted Average Cost', effect: 'values both ending inventory and Cost of Goods Sold based on the average unit cost of all goods available for sale' }
    ];
    const inv = inventory[index % inventory.length];
    return {
      subject: 'general_business',
      grade,
      unitNumber: 2,
      chapterTitle: 'Unit 2: Financial Accounting & Inventory',
      qEn: `Inventory Valuation #${index + 1}: Which cost flow assumption method in accounting is characterized by: "${inv.effect}"?`,
      correctEn: inv.method,
      distractorsEn: ['FIFO', 'LIFO', 'Weighted Average Cost', 'Specific Identification'].filter(x => !inv.method.includes(x)),
      explEn: `${inv.method} is defined by: ${inv.effect}.`,
    };
  } else if (subtopic === 4) {
    const ecx = [
      { inst: 'Ethiopian Commodity Exchange (ECX)', role: 'modern trading platform ensuring quality grading, warehousing, and reliable settlement for agricultural crops (coffee, sesame)' },
      { inst: 'National Bank of Ethiopia (NBE)', role: 'apex regulatory central bank controlling foreign currency allocation, bank licensing, and monetary policy' },
      { inst: 'Microfinance Institutions (MFIs)', role: 'providing collateral-flexible micro-credit and savings mobilization to smallholder farmers and micro-enterprises' }
    ];
    const e = ecx[index % ecx.length];
    return {
      subject: 'general_business',
      grade,
      unitNumber: 4,
      chapterTitle: 'Unit 4: Financial Institutions & Markets in Ethiopia',
      qEn: `Financial Institutions #${index + 1}: Which key financial or commodity market institution in Ethiopia fulfills the operational role: "${e.role}"?`,
      correctEn: e.inst,
      distractorsEn: ['ECX', 'National Bank of Ethiopia (NBE)', 'Microfinance Institutions (MFIs)', 'Commercial Bank of Ethiopia'].filter(x => !e.inst.includes(x)),
      explEn: `${e.inst} fulfills the mission: ${e.role}.`,
    };
  } else if (subtopic === 5) {
    const doubleEntry = [
      { trans: 'Owner invests cash of 50,000 ETB into business', debit: 'Cash (Asset increases)', credit: 'Owner’s Capital (Equity increases)' },
      { trans: 'Purchased office equipment on credit for 25,000 ETB', debit: 'Office Equipment (Asset increases)', credit: 'Accounts Payable (Liability increases)' },
      { trans: 'Paid monthly office rental expense of 8,000 ETB in cash', debit: 'Rent Expense (Expense increases)', credit: 'Cash (Asset decreases)' },
      { trans: 'Provided services to client and received 15,000 ETB cash immediately', debit: 'Cash (Asset increases)', credit: 'Service Revenue (Revenue increases)' }
    ];
    const de = doubleEntry[index % doubleEntry.length];
    return {
      subject: 'general_business',
      grade,
      unitNumber: 2,
      chapterTitle: 'Unit 2: Double-Entry Bookkeeping',
      qEn: `Bookkeeping #${index + 1}: What is the correct journal entry for the transaction: "${de.trans}"?`,
      correctEn: `Debit: ${de.debit} | Credit: ${de.credit}`,
      distractorsEn: [
        `Debit: ${de.credit} | Credit: ${de.debit}`,
        `Debit: Accounts Receivable | Credit: Cash`,
        `Debit: Miscellaneous Expense | Credit: Capital`
      ],
      explEn: `Proper double-entry accounting records: Debit: ${de.debit} | Credit: ${de.credit}.`,
    };
  } else {
    const entrepreneurship = [
      { step: 'Executive Summary', purpose: 'concise snapshot highlighting the business concept, unique value proposition, and key financial projections' },
      { step: 'Market Analysis', purpose: 'evaluating target customer demographics, industry market size, and competitor strengths and weaknesses' },
      { step: 'Break-Even Analysis', purpose: 'calculating the exact sales volume at which total revenues exactly equal total fixed and variable costs' }
    ];
    const ent = entrepreneurship[index % entrepreneurship.length];
    return {
      subject: 'general_business',
      grade,
      unitNumber: 1,
      chapterTitle: 'Unit 1: Entrepreneurship & Business Planning',
      qEn: `Business Planning #${index + 1}: In developing a bankable business plan, which section serves to: "${ent.purpose}"?`,
      correctEn: ent.step,
      distractorsEn: ['Executive Summary', 'Market Analysis', 'Break-Even Analysis', 'Appendix'].filter(x => x !== ent.step),
      explEn: `The ${ent.step} is designed to: ${ent.purpose}.`,
    };
  }
}

// =========================================================================
// 12. HPE PROCEDURAL GENERATOR
// =========================================================================
export function generateHPEQuestion(topic: string, index: number, grade: GradeLevel = 12): RawGeneratedItem {
  const seed = index * 89 + 1381;
  const subtopic = index % 7;

  if (subtopic === 0) {
    const systems = [
      { name: 'ATP-PC (Phosphagen) System', duration: '0 – 10 seconds of maximal explosive effort (e.g. 100m sprint, shot put)', fuel: 'stored adenosine triphosphate and intramuscular creatine phosphate without oxygen' },
      { name: 'Anaerobic Glycolysis (Lactic Acid System)', duration: '10 – 90 seconds of high-intensity effort (e.g. 400m sprint)', fuel: 'breakdown of muscle glycogen into lactic acid without requiring oxygen' },
      { name: 'Aerobic (Oxidative) Energy System', duration: 'sustained endurance activities lasting over 2 minutes (e.g. 5,000m, marathon)', fuel: 'mitochondrial oxidation of carbohydrates and fatty acids using oxygen yielding large ATP volumes' }
    ];
    const sys = systems[index % systems.length];
    return {
      subject: 'hpe',
      grade,
      unitNumber: 1,
      chapterTitle: 'Unit 1: Exercise Physiology & Energy Systems',
      qEn: `Exercise Physiology #${index + 1}: Which biological energy system sustains muscular work during "${sys.duration}", utilizing "${sys.fuel}"?`,
      correctEn: sys.name,
      distractorsEn: ['ATP-PC System', 'Anaerobic Glycolysis', 'Aerobic System', 'Phosphagen System'].filter(x => !sys.name.includes(x)),
      explEn: `Muscular work during ${sys.duration} is powered by the ${sys.name}.`,
    };
  } else if (subtopic === 1) {
    const components = [
      { comp: 'Cardiorespiratory Endurance', test: '12-minute Cooper run or 20m Multi-Stage Shuttle Run (Beep Test)' },
      { comp: 'Muscular Strength', test: 'One-Repetition Maximum (1RM) bench press or leg press test' },
      { comp: 'Muscular Endurance', test: 'Maximum continuous push-up or bent-knee sit-up endurance test' },
      { comp: 'Flexibility', test: 'Sit-and-Reach test measuring hamstring and lower back range of motion' },
      { comp: 'Agility', test: 'Illinois Agility Run or T-Test measuring quick changes of body direction' }
    ];
    const c = components[index % components.length];
    return {
      subject: 'hpe',
      grade,
      unitNumber: 1,
      chapterTitle: 'Unit 1: Physical Fitness Testing & Conditioning',
      qEn: `Fitness Testing #${index + 1}: Which component of physical fitness is scientifically assessed using the "${c.test}"?`,
      correctEn: c.comp,
      distractorsEn: ['Cardiorespiratory Endurance', 'Muscular Strength', 'Muscular Endurance', 'Flexibility'].filter(x => x !== c.comp),
      explEn: `${c.comp} is evaluated with the ${c.test}.`,
    };
  } else if (subtopic === 2) {
    const legends = [
      { athlete: 'Abebe Bikila', triumph: 'winning Olympic Marathon gold barefoot at Rome 1960 and repeating gold at Tokyo 1964 with world records' },
      { athlete: 'Mamo Wolde', triumph: 'capturing Olympic Marathon gold at Mexico City 1968 and silver at Munich 1972' },
      { athlete: 'Miruts Yifter ("Yifter the Shifter")', triumph: 'historic double Olympic gold in 5,000m and 10,000m at Moscow 1980 with legendary final-lap acceleration' },
      { athlete: 'Derartu Tulu', triumph: 'first black African woman to win Olympic gold, triumphing in the 10,000m at Barcelona 1992 and Sydney 2000' },
      { athlete: 'Haile Gebrselassie', triumph: 'two-time 10,000m Olympic champion (Atlanta 1996, Sydney 2000) who broke 27 official world records' },
      { athlete: 'Kenenisa Bekele', triumph: 'legendary triple Olympic champion and long-standing world record holder in both 5,000m and 10,000m' }
    ];
    const l = legends[index % legends.length];
    return {
      subject: 'hpe',
      grade,
      unitNumber: 2,
      chapterTitle: 'Unit 2: Ethiopian Athletics & Olympic History',
      qEn: `Athletics Legend #${index + 1}: Which legendary Ethiopian Olympic pioneer is immortalized for: "${l.triumph}"?`,
      correctEn: l.athlete,
      distractorsEn: ['Abebe Bikila', 'Mamo Wolde', 'Miruts Yifter', 'Haile Gebrselassie', 'Kenenisa Bekele'].filter(x => x !== l.athlete),
      explEn: `${l.athlete} achieved: ${l.triumph}.`,
    };
  } else if (subtopic === 3) {
    const rice = [
      { step: 'R - Rest', purpose: 'immediately cease athletic activity to prevent further mechanical tissue damage' },
      { step: 'I - Ice', purpose: 'apply cold packs for 15-20 minutes every 2-3 hours to induce vasoconstriction and reduce swelling' },
      { step: 'C - Compression', purpose: 'wrap an elastic bandage firmly around the injury to limit interstitial fluid accumulation' },
      { step: 'E - Elevation', purpose: 'raise the injured extremity above heart level to assist venous and lymphatic drainage' }
    ];
    const r = rice[index % rice.length];
    return {
      subject: 'hpe',
      grade,
      unitNumber: 3,
      chapterTitle: 'Unit 3: Sports Medicine & First Aid',
      qEn: `First Aid #${index + 1}: In the standardized R.I.C.E. protocol for acute soft tissue sprains and strains, which action is defined by: "${r.purpose}"?`,
      correctEn: r.step,
      distractorsEn: ['R - Rest', 'I - Ice', 'C - Compression', 'E - Elevation'].filter(x => x !== r.step),
      explEn: `In R.I.C.E., ${r.step} serves to: ${r.purpose}.`,
    };
  } else if (subtopic === 4) {
    const sports = [
      { sport: 'Football (Soccer)', rule: 'a player is in an offside position if nearer to the opponents’ goal line than both the ball and second-last opponent when ball is played' },
      { sport: 'Basketball', rule: 'the offensive team has 24 seconds to attempt a field goal that strikes the rim, and 8 seconds to advance the ball across half-court' },
      { sport: 'Volleyball', rule: 'a team is permitted a maximum of three consecutive touches to return the ball over the net (excluding block touches)' }
    ];
    const sp = sports[index % sports.length];
    return {
      subject: 'hpe',
      grade,
      unitNumber: 2,
      chapterTitle: 'Unit 2: Rules of Major Sports',
      qEn: `Sports Rules #${index + 1}: In which world sports code does the official governing rule state: "${sp.rule}"?`,
      correctEn: sp.sport,
      distractorsEn: ['Football (Soccer)', 'Basketball', 'Volleyball', 'Handball'].filter(x => x !== sp.sport),
      explEn: `In ${sp.sport}, the rule specifies: ${sp.rule}.`,
    };
  } else if (subtopic === 5) {
    const nutrition = [
      { nutrient: 'Carbohydrates (Glycogen)', val: '4 kcal/gram', role: 'primary energetic substrate stored in liver and skeletal muscles for moderate-to-vigorous exercise' },
      { nutrient: 'Proteins (Amino Acids)', val: '4 kcal/gram', role: 'essential structural substrate required for myofibrillar repair, hypertrophy, and enzyme synthesis' },
      { nutrient: 'Lipids (Fats)', val: '9 kcal/gram', role: 'concentrated energy store serving as predominant fuel source during prolonged low-intensity aerobic activity' }
    ];
    const n = nutrition[index % nutrition.length];
    return {
      subject: 'hpe',
      grade,
      unitNumber: 3,
      chapterTitle: 'Unit 3: Sports Nutrition & Metabolism',
      qEn: `Sports Nutrition #${index + 1}: Which dietary macronutrient yields "${n.val}" of metabolizable energy and performs the athletic role: "${n.role}"?`,
      correctEn: n.nutrient,
      distractorsEn: ['Carbohydrates', 'Proteins', 'Lipids (Fats)', 'Vitamins'].filter(x => !n.nutrient.includes(x)),
      explEn: `${n.nutrient} yields ${n.val} and functions to: ${n.role}.`,
    };
  } else {
    const training = [
      { principle: 'Principle of Progressive Overload', desc: 'gradually increasing training stimulus (intensity, volume, or frequency) to drive continuous physiological adaptation' },
      { principle: 'Principle of Specificity (SAID)', desc: 'physiological adaptations are specific to the muscle groups, energy systems, and movement patterns trained' },
      { principle: 'Principle of Reversibility', desc: 'training-induced fitness gains decline rapidly when training frequency and intensity are discontinued ("use it or lose it")' }
    ];
    const tr = training[index % training.length];
    return {
      subject: 'hpe',
      grade,
      unitNumber: 1,
      chapterTitle: 'Unit 1: Exercise Prescription Principles',
      qEn: `Training Principles #${index + 1}: Which fundamental law of physical conditioning is defined as: "${tr.desc}"?`,
      correctEn: tr.principle,
      distractorsEn: ['Principle of Progressive Overload', 'Principle of Specificity', 'Principle of Reversibility', 'Principle of Tedium'].filter(x => !tr.principle.includes(x)),
      explEn: `${tr.principle} specifies: ${tr.desc}.`,
    };
  }
}

// =========================================================================
// 13. ENGLISH PROCEDURAL GENERATOR
// =========================================================================
export function generateEnglishQuestion(topic: string, index: number, grade: GradeLevel = 12): RawGeneratedItem {
  const seed = index * 97 + 1499;
  const subtopic = index % 8;

  if (subtopic === 0) {
    const conditionals = [
      {
        q: `If the national university entrance examination ________ postponed, the students would have had additional time for comprehensive review.`,
        correct: 'had been',
        distractors: ['was', 'is', 'would be'],
        expl: 'Third conditional (unreal past passive condition): If + past perfect passive (had been + V3).'
      },
      {
        q: `If farmers in the rift valley ________ modernized drip irrigation systems earlier, their harvest yields would be substantially higher today.`,
        correct: 'had adopted',
        distractors: ['adopt', 'adopted', 'will adopt'],
        expl: 'Mixed conditional (past action with present outcome): If + past perfect (had adopted).'
      },
      {
        q: `Had she ________ the laboratory instructions meticulously, the chemical reaction would not have produced toxic vapor.`,
        correct: 'followed',
        distractors: ['follow', 'following', 'been follow'],
        expl: 'Inverted third conditional: Had + subject + past participle (V3).'
      }
    ];
    const cd = conditionals[index % conditionals.length];
    return {
      subject: 'english',
      grade,
      unitNumber: 2,
      chapterTitle: 'Unit 2: Conditionals & Unreal Past',
      qEn: `Grammar #${index + 1}: Choose the grammatically correct verb form to complete the sentence: "${cd.q}"`,
      correctEn: cd.correct,
      distractorsEn: cd.distractors,
      explEn: cd.expl,
    };
  } else if (subtopic === 1) {
    const passives = [
      {
        q: `The historic research archives in Gondar ________ by international restoration conservators at this very moment.`,
        correct: 'are being restored',
        distractors: ['are restoring', 'were restored', 'have restored'],
        expl: 'Present Continuous Passive: am/is/are + being + past participle.'
      },
      {
        q: `All national matriculation results ________ by the Ministry of Education before the university placement deadline expires next week.`,
        correct: 'will have been announced',
        distractors: ['will announce', 'have announced', 'will be announcing'],
        expl: 'Future Perfect Passive: will have been + past participle.'
      },
      {
        q: `A state-of-the-art agricultural biotechnology laboratory ________ in Hawassa University last semester.`,
        correct: 'was established',
        distractors: ['is establishing', 'established', 'has established'],
        expl: 'Simple Past Passive: was/were + past participle.'
      }
    ];
    const ps = passives[index % passives.length];
    return {
      subject: 'english',
      grade,
      unitNumber: 2,
      chapterTitle: 'Unit 2: Passive Voice & Syntax',
      qEn: `Voice & Syntax #${index + 1}: Select the correct passive verb phrase: "${ps.q}"`,
      correctEn: ps.correct,
      distractorsEn: ps.distractors,
      explEn: ps.expl,
    };
  } else if (subtopic === 2) {
    const discourse = [
      {
        q: `________ the torrential monsoon downpour, the rural high school students walked five kilometers to sit for their physics examination.`,
        correct: 'Despite',
        distractors: ['Although', 'Even though', 'However'],
        expl: '"Despite" is a preposition followed by a noun phrase ("the torrential monsoon downpour"). "Although" requires a full clause.'
      },
      {
        q: `The macroeconomic reforms stimulated export growth; ________, domestic headline inflation initially placed pressure on consumer savings.`,
        correct: 'nevertheless',
        distractors: ['because', 'therefore', 'consequently'],
        expl: '"Nevertheless" is an adversative conjunctive adverb showing contrast between two independent clauses.'
      },
      {
        q: `The agricultural co-op invested in solar cold storage; ________, post-harvest tomato losses decreased by over forty percent.`,
        correct: 'consequently',
        distractors: ['although', 'in spite of', 'whereas'],
        expl: '"Consequently" denotes a direct logical cause-and-effect result.'
      }
    ];
    const dc = discourse[index % discourse.length];
    return {
      subject: 'english',
      grade,
      unitNumber: 3,
      chapterTitle: 'Unit 3: Cohesion & Discourse Markers',
      qEn: `Discourse Markers #${index + 1}: Complete the statement with the most appropriate transition word: "${dc.q}"`,
      correctEn: dc.correct,
      distractorsEn: dc.distractors,
      explEn: dc.expl,
    };
  } else if (subtopic === 3) {
    const modals = [
      {
        q: `The classroom lights were completely switched off and the iron gates were locked; the faculty ________ already departed for the day.`,
        correct: 'must have',
        distractors: ['can’t have', 'shouldn’t have', 'could not'],
        expl: '"Must have + V3" expresses a logical conclusion or near certainty about an event in the past.'
      },
      {
        q: `Yonas was sitting in the examination hall in Addis Ababa during the whole morning; he ________ seen at the market in Adama at that time.`,
        correct: 'can’t have been',
        distractors: ['must have been', 'might have been', 'should have been'],
        expl: '"Can’t have been" expresses logical impossibility about a past situation.'
      }
    ];
    const md = modals[index % modals.length];
    return {
      subject: 'english',
      grade,
      unitNumber: 3,
      chapterTitle: 'Unit 3: Modals of Deduction',
      qEn: `Modals of Deduction #${index + 1}: Choose the correct modal phrase indicating logical deduction: "${md.q}"`,
      correctEn: md.correct,
      distractorsEn: md.distractors,
      explEn: md.expl,
    };
  } else if (subtopic === 4) {
    const phrasals = [
      {
        q: `The curriculum revision committee decided to ________ the regional workshop until all textbook proofs had been verified.`,
        correct: 'call off',
        distractors: ['call out', 'call on', 'call for'],
        expl: '"Call off" means to cancel an event.'
      },
      {
        q: `Federal epidemiologists were dispatched to ________ the mysterious livestock disease outbreak in the lowlands.`,
        correct: 'look into',
        distractors: ['look up', 'look after', 'look down upon'],
        expl: '"Look into" is a transitive phrasal verb meaning to investigate.'
      },
      {
        q: `Agricultural research scientists in Debre Zeit ________ numerous field trials on high-yielding teff cultivars.`,
        correct: 'carried out',
        distractors: ['carried on', 'carried away', 'carried through'],
        expl: '"Carry out" means to conduct or execute experiments or duties.'
      }
    ];
    const ph = phrasals[index % phrasals.length];
    return {
      subject: 'english',
      grade,
      unitNumber: 3,
      chapterTitle: 'Unit 3: Academic Phrasal Verbs',
      qEn: `Phrasal Verbs #${index + 1}: Select the phrasal verb that precisely matches the intended academic meaning: "${ph.q}"`,
      correctEn: ph.correct,
      distractorsEn: ph.distractors,
      explEn: ph.expl,
    };
  } else if (subtopic === 5) {
    const agreement = [
      {
        q: `Neither the chief laboratory technician nor the senior research fellows ________ capable of operating the defective electron microscope.`,
        correct: 'were',
        distractors: ['was', 'is', 'has been'],
        expl: 'When subjects are connected by "neither... nor", the finite verb agrees with the closer subject ("senior research fellows" is plural).'
      },
      {
        q: `A substantial number of candidates ________ registered for the national entrance exam online through the new digital portal.`,
        correct: 'have',
        distractors: ['has', 'is', 'was'],
        expl: '"A number of + plural noun" takes a plural verb ("have").'
      },
      {
        q: `Every single book, reference manual, and experimental apparatus in the science department ________ cataloged accurately.`,
        correct: 'was',
        distractors: ['were', 'are', 'have been'],
        expl: 'Subjects modified by "Every" or "Each" take a singular verb ("was").'
      }
    ];
    const ag = agreement[index % agreement.length];
    return {
      subject: 'english',
      grade,
      unitNumber: 1,
      chapterTitle: 'Unit 1: Subject-Verb Concord',
      qEn: `Concord #${index + 1}: Choose the grammatically concordant verb: "${ag.q}"`,
      correctEn: ag.correct,
      distractorsEn: ag.distractors,
      explEn: ag.expl,
    };
  } else if (subtopic === 6) {
    const relatives = [
      {
        q: `Dr. Amanuel, ________ groundbreaking research on drought-tolerant enset received international acclaim, addressed the national symposium.`,
        correct: 'whose',
        distractors: ['who', 'whom', 'which'],
        expl: '"Whose" indicates possession or authorship relating to a person.'
      },
      {
        q: `The newly renovated historical library, ________ was commissioned during the imperial era, contains rare ancient manuscripts.`,
        correct: 'which',
        distractors: ['that', 'who', 'where'],
        expl: 'Non-defining relative clauses set off by commas must use "which" for things, never "that".'
      }
    ];
    const rel = relatives[index % relatives.length];
    return {
      subject: 'english',
      grade,
      unitNumber: 2,
      chapterTitle: 'Unit 2: Relative Clauses & Pronouns',
      qEn: `Relative Clauses #${index + 1}: Select the correct relative pronoun: "${rel.q}"`,
      correctEn: rel.correct,
      distractorsEn: rel.distractors,
      explEn: rel.expl,
    };
  } else {
    const reported = [
      {
        q: `"I have already submitted my university scholarship application," Rahel stated. -> Rahel stated that she ________ her university scholarship application.`,
        correct: 'had already submitted',
        distractors: ['has already submitted', 'already submitted', 'would submit'],
        expl: 'In indirect speech with a past reporting verb ("stated"), present perfect shifts to past perfect.'
      },
      {
        q: `"Will the national electricity grid connect our village next year?" the elder asked. -> The elder asked whether the national electricity grid ________ their village the following year.`,
        correct: 'would connect',
        distractors: ['will connect', 'shall connect', 'connected'],
        expl: 'In reported questions, "will" backshifts to "would", and "next year" becomes "the following year".'
      }
    ];
    const rep = reported[index % reported.length];
    return {
      subject: 'english',
      grade,
      unitNumber: 2,
      chapterTitle: 'Unit 2: Indirect Speech Backshifting',
      qEn: `Indirect Speech #${index + 1}: Complete the indirect speech sentence correctly: "${rep.q}"`,
      correctEn: rep.correct,
      distractorsEn: rep.distractors,
      explEn: rep.expl,
    };
  }
}

// =========================================================================
// MASTER PROCEDURAL FACTORY (Guarantees infinite unique questions per subject)
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
  } else if (subject === 'agriculture') {
    raw = generateAgricultureQuestion(topic, index, grade);
  } else if (subject === 'it') {
    raw = generateITQuestion(topic, index, grade);
  } else if (subject === 'biology') {
    raw = generateBiologyQuestion(topic, index, grade);
  } else if (subject === 'economics') {
    raw = generateEconomicsQuestion(topic, index, grade);
  } else if (subject === 'geography') {
    raw = generateGeographyQuestion(topic, index, grade);
  } else if (subject === 'history') {
    raw = generateHistoryQuestion(topic, index, grade);
  } else if (subject === 'citizenship') {
    raw = generateCitizenshipQuestion(topic, index, grade);
  } else if (subject === 'general_business') {
    raw = generateGeneralBusinessQuestion(topic, index, grade);
  } else if (subject === 'hpe') {
    raw = generateHPEQuestion(topic, index, grade);
  } else {
    raw = generateEnglishQuestion(topic, index, grade);
  }

  return buildQuizQuestionFromRaw(raw, `proc-${subject}-${index}-${Date.now()}`, targetLang);
}
