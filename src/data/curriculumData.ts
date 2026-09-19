import { BookChapter } from '../types/book';

export const SAMPLE_CHAPTERS_MAP: Record<string, BookChapter[]> = {
  // ==========================================
  // 🔬 GRADE 12 PHYSICS (NATURAL SCIENCE STREAM)
  // ==========================================
  'g12-physics-en': [
    {
      id: 'g12-phys-u1',
      unitNumber: 1,
      title: 'Thermodynamics & Heat Engines',
      titleAmharic: 'ቴርሞዳይናሚክስ እና የሙቀት ሞተሮች',
      titleOromo: 'Termooodaayinaamiksii fi Mootoroota Ho\'aa',
      description: 'First and Second laws of thermodynamics, PV diagrams, isobaric, isochoric, isothermal, and adiabatic processes, Carnot engine efficiency, and entropy in closed systems.',
      readingTimeMinutes: 30,
      keyObjectives: [
        'State and mathematically apply the First Law of Thermodynamics: ΔU = Q - W.',
        'Distinguish between isothermal (ΔT=0), adiabatic (Q=0), isobaric (constant P), and isochoric (W=0) processes on PV diagrams.',
        'Calculate mechanical work done by an expanding gas using W = PΔV or the area under a PV curve.',
        'Compute maximum theoretical efficiency of a Carnot cycle: η = 1 - (Tc / Th).',
        'Define entropy and explain the direction of natural spontaneous processes according to the Second Law.'
      ],
      sections: [
        {
          id: 'g12-phys-u1-s1',
          sectionNumber: '1.1',
          title: 'The First Law of Thermodynamics & Thermodynamic Systems',
          content: [
            'Thermodynamics studies the transformations of thermal energy into mechanical work and vice versa.',
            'A thermodynamic system is a quantity of matter or a region in space chosen for study, enclosed by a boundary. Surroundings represent everything outside the system.',
            'The First Law of Thermodynamics is an expression of the principle of conservation of energy: ΔU = Q - W, where ΔU is change in internal energy, Q is heat added to the system, and W is work done by the system on surroundings.',
            'Sign Conventions for EUEE Examination:',
            '• Heat added to system: Q > 0 (positive); Heat released by system: Q < 0 (negative).',
            '• Work done BY system on surroundings: W > 0 (expansion, ΔV > 0); Work done ON system: W < 0 (compression, ΔV < 0).'
          ],
          keyTakeaways: [
            'Internal energy U of an ideal gas depends solely on its absolute temperature T: U = (3/2)nRT (for monatomic gas).',
            'In a cyclic process that returns to initial state, ΔU_cycle = 0, so Q_net = W_net.'
          ]
        },
        {
          id: 'g12-phys-u1-s2',
          sectionNumber: '1.2',
          title: 'Special Thermodynamic Processes & Work Done',
          content: [
            '1. Isobaric Process (Constant Pressure): Pressure remains constant. Work done is W = P(V2 - V1). Heat transfer: Q = nCpΔT.',
            '2. Isochoric / Isovolumetric Process (Constant Volume): Volume is constant (ΔV = 0), so NO boundary work is done (W = 0). Therefore, ΔU = Q = nCvΔT.',
            '3. Isothermal Process (Constant Temperature): Temperature is constant (ΔT = 0). For an ideal gas, ΔU = 0, hence Q = W = nRT ln(V2 / V1).',
            '4. Adiabatic Process (No Heat Exchange, Q = 0): System is thermally insulated or process occurs extremely rapidly. ΔU = -W. Formula: P1*V1^γ = P2*V2^γ, where γ = Cp/Cv.'
          ],
          diagramOrIllustration: {
            caption: 'Summary of Thermodynamic Processes for Ideal Gas',
            diagramType: 'table',
            data: [
              { Process: 'Isobaric', Condition: 'P = constant', Work_W: 'PΔV', Heat_Q: 'nCpΔT', Delta_U: 'nCvΔT' },
              { Process: 'Isochoric', Condition: 'V = constant', Work_W: '0', Heat_Q: 'nCvΔT', Delta_U: 'Q' },
              { Process: 'Isothermal', Condition: 'T = constant', Work_W: 'nRT ln(V2/V1)', Heat_Q: 'W', Delta_U: '0' },
              { Process: 'Adiabatic', Condition: 'Q = 0', Work_W: '-ΔU', Heat_Q: '0', Delta_U: '-W' }
            ]
          }
        },
        {
          id: 'g12-phys-u1-s3',
          sectionNumber: '1.3',
          title: 'Heat Engines, The Second Law & Carnot Efficiency',
          content: [
            'A heat engine absorbs heat Qh from a hot reservoir at temperature Th, converts part of it into mechanical work W, and expels waste heat Qc to a cold reservoir at Tc.',
            'Thermal Efficiency: η = W / Qh = (Qh - Qc) / Qh = 1 - (Qc / Qh).',
            'Carnot Theorem: No real heat engine operating between two given temperatures can be more efficient than a reversible Carnot engine operating between the same reservoirs.',
            'Maximum Carnot Efficiency: η_carnot = 1 - (Tc / Th), where temperatures MUST be in Kelvin (K)!'
          ]
        }
      ],
      summary: 'Unit 1 establishes energy conservation in thermal systems (First Law), examines work in isobaric, isothermal, and adiabatic changes, and establishes the limits of heat engine performance via the Carnot cycle and Second Law.',
      keyTerms: [
        { term: 'Thermodynamics', definition: 'The branch of physics dealing with relationships between heat, work, temperature, and energy.' },
        { term: 'Internal Energy (U)', definition: 'Total microscopic kinetic and potential energy associated with molecular motion in a system.' },
        { term: 'Adiabatic Process', definition: 'A thermodynamic process occurring with zero heat transfer into or out of the system (Q = 0).' },
        { term: 'Carnot Efficiency', definition: 'The theoretical maximum efficiency attainable by any engine operating between high and low temperatures Th and Tc: η = 1 - Tc/Th.' }
      ],
      formulasOrRules: [
        { title: 'First Law of Thermodynamics', content: 'ΔU = Q - W' },
        { title: 'Ideal Gas Law', content: 'PV = nRT  (R = 8.314 J/mol·K)' },
        { title: 'Isobaric Work', content: 'W = P · ΔV = P(V2 - V1)' },
        { title: 'Carnot Efficiency', content: 'η = 1 - (Tc / Th)  [Temperatures in Kelvin]' }
      ]
    },
    {
      id: 'g12-phys-u2',
      unitNumber: 2,
      title: 'Electromagnetic Oscillations & Waves',
      titleAmharic: 'የኤሌክትሮማግኔቲክ ሞገዶች እና ንዝረቶች',
      description: 'LC and RLC resonant circuits, Maxwell equations, production and properties of electromagnetic spectrum, Poynting vector, radiation pressure, and wireless communication.',
      readingTimeMinutes: 28,
      keyObjectives: [
        'Analyze energy transfer between capacitor electric field and inductor magnetic field in LC circuits.',
        'Calculate resonant frequency f0 = 1 / (2π√(LC)).',
        'State Maxwell equations and explain how changing magnetic fields generate electric fields (Faraday) and changing electric fields generate magnetic fields (Ampère-Maxwell).',
        'Identify EM spectrum order by frequency and wavelength: Radio, Micro, IR, Visible, UV, X-Ray, Gamma.'
      ],
      sections: [
        {
          id: 'g12-phys-u2-s1',
          sectionNumber: '2.1',
          title: 'LC Resonant Circuits & Electrical Oscillations',
          content: [
            'In an LC circuit consisting of a charged capacitor C and inductor L, energy oscillates back and forth continuously between the electric field of the capacitor (U_E = Q² / 2C) and the magnetic field of the inductor (U_B = L*I² / 2).',
            'Conservation of total energy: E_total = Q² / (2C) + (1/2) L I² = constant.',
            'Angular resonant frequency: ω0 = 1 / √(LC), and frequency: f0 = 1 / (2π√(LC)).'
          ]
        },
        {
          id: 'g12-phys-u2-s2',
          sectionNumber: '2.2',
          title: 'Electromagnetic Wave Spectrum & Propagation',
          content: [
            'James Clerk Maxwell unified electricity and magnetism by demonstrating that accelerated electric charges generate transverse oscillating electric (E) and magnetic (B) fields that propagate through vacuum at the speed of light: c = 3.0 × 10⁸ m/s.',
            'Relation: c = f · λ, and E / B = c at all points in the wave.',
            'Poynting Vector (S): Represents directional energy flux density (W/m²): S = (1/μ0) * (E × B).'
          ]
        }
      ],
      summary: 'Electromagnetic oscillation demonstrates interchange between capacitive and inductive energies. Maxwell synthesis shows oscillating EM fields propagate in vacuum at speed c.',
      keyTerms: [
        { term: 'Resonant Frequency', definition: 'Frequency at which electrical energy transfers with zero reactance: f = 1 / (2π√(LC)).' },
        { term: 'Poynting Vector', definition: 'Vector representing instantaneous directional energy flow per unit area in an EM wave.' }
      ],
      formulasOrRules: [
        { title: 'Resonance Frequency', content: 'f0 = 1 / (2π√(LC))' },
        { title: 'Wave Speed Equation', content: 'c = f · λ  = 3.0 × 10⁸ m/s' },
        { title: 'E and B Amplitude Ratio', content: 'E0 / B0 = c' }
      ]
    }
  ],

  // ==========================================
  // ⚗️ GRADE 12 CHEMISTRY (NATURAL SCIENCE STREAM)
  // ==========================================
  'g12-chem-en': [
    {
      id: 'g12-chem-u1',
      unitNumber: 1,
      title: 'Solutions and Colloidal Dispersions',
      titleAmharic: 'መፍትሄዎች (Solutions) እና ኮሎይዶች',
      description: 'Types of solutions, solution formation thermodynamics, factors affecting solubility, Raoult Law for ideal solutions, and colligative properties (vapor pressure lowering, boiling point elevation, freezing point depression, osmotic pressure).',
      readingTimeMinutes: 32,
      keyObjectives: [
        'Express concentration in molarity (M), molality (m), mole fraction (X), and mass percent (%).',
        'Explain Henry Law: C = kP for gas solubility in liquids.',
        'Apply Raoult Law: P_solution = X_solvent * P°_solvent for ideal binary mixtures.',
        'Calculate boiling point elevation: ΔTb = Kb * m * i and freezing point depression: ΔTf = Kf * m * i.',
        'Calculate osmotic pressure using van t Hoff equation: Π = iMRT.'
      ],
      sections: [
        {
          id: 'g12-chem-u1-s1',
          sectionNumber: '1.1',
          title: 'Concentration Units in Chemical Analysis',
          content: [
            '1. Molarity (M): Moles of solute per liter of solution (mol/L). Depends on temperature due to volume expansion.',
            '2. Molality (m): Moles of solute per kilogram of solvent (mol/kg). Temperature INDEPENDENT, making it ideal for colligative property calculations.',
            '3. Mole Fraction (X_A): Ratio of moles of component A to total moles: X_A = n_A / (n_A + n_B).',
            '4. Mass Percent: (Mass of solute / Total mass of solution) × 100%.'
          ]
        },
        {
          id: 'g12-chem-u1-s2',
          sectionNumber: '1.2',
          title: 'Colligative Properties of Solutions',
          content: [
            'Colligative properties depend SOLELY on the number of solute particles present in solution, not their chemical identity.',
            '1. Vapor Pressure Lowering: Adding a non-volatile solute lowers vapor pressure: ΔP = X_solute * P°_solvent.',
            '2. Boiling Point Elevation: ΔTb = i * Kb * m, where i is the van t Hoff factor (e.g. i=1 for glucose, i=2 for NaCl, i=3 for CaCl2).',
            '3. Freezing Point Depression: ΔTf = i * Kf * m.',
            '4. Osmotic Pressure (Π): Π = i * M * R * T.'
          ]
        }
      ],
      summary: 'Solutions exhibit colligative properties directly proportional to solute particle concentration. Molality and van t Hoff factor i are critical for correct molecular mass determination.',
      keyTerms: [
        { term: 'Colligative Property', definition: 'A property of a solution that depends only on the number of solute particles, not their nature.' },
        { term: 'Molality (m)', definition: 'Number of moles of solute dissolved in 1 kilogram of pure solvent.' },
        { term: 'Van t Hoff Factor (i)', definition: 'Ratio of moles of particles produced in solution per mole of solute dissolved.' }
      ],
      formulasOrRules: [
        { title: 'Raoult Law', content: 'P_solution = X_solvent · P°_solvent' },
        { title: 'Boiling Elevation', content: 'ΔTb = i · Kb · m' },
        { title: 'Freezing Depression', content: 'ΔTf = i · Kf · m' },
        { title: 'Osmotic Pressure', content: 'Π = i · M · R · T' }
      ]
    },
    {
      id: 'g12-chem-u2',
      unitNumber: 2,
      title: 'Acid-Base Equilibria & Buffer Systems',
      titleAmharic: 'የአሲድ እና ቤዝ ሚዛን እና ባፈር ሶሉሽኖች',
      description: 'Arrhenius, Brønsted-Lowry, and Lewis acid-base theories, autoionization of water, pH and pOH calculations, Ka and Kb relationships, hydrolysis of salts, buffer action, and titration curves.',
      readingTimeMinutes: 35,
      keyObjectives: [
        'Differentiate between Brønsted-Lowry conjugate acid-base pairs and Lewis electron donors/acceptors.',
        'Calculate pH, pOH, [H3O+], and [OH-] using Kw = 1.0 × 10⁻¹⁴ at 25°C.',
        'Compute pH of weak acids and weak bases using Ka, Kb, and ICE tables.',
        'Formulate Henderson-Hasselbalch equation: pH = pKa + log([Conjugate Base] / [Weak Acid]).',
        'Analyze neutralization titrations and appropriate acid-base indicator selection.'
      ],
      sections: [
        {
          id: 'g12-chem-u2-s1',
          sectionNumber: '2.1',
          title: 'Theories of Acids and Bases & Ionization Constants',
          content: [
            'Brønsted-Lowry definition: An acid is a proton (H+) donor; a base is a proton acceptor.',
            'Every Brønsted acid has a conjugate base formed when it donates H+. Conjugate pairs differ by exactly one proton.',
            'Ion product of water: Kw = [H3O+][OH-] = 1.0 × 10⁻¹⁴ at 25°C. Hence pH + pOH = 14.',
            'For weak acid HA + H2O ⇌ H3O+ + A-: Ka = [H3O+][A-] / [HA]. Smaller Ka means weaker acid.'
          ]
        },
        {
          id: 'g12-chem-u2-s2',
          sectionNumber: '2.2',
          title: 'Buffer Solutions & Henderson-Hasselbalch Equation',
          content: [
            'A buffer solution resists changes in pH when small amounts of strong acid or strong base are added.',
            'It consists of a mixture of a weak acid and its conjugate base (e.g., CH3COOH + CH3COONa) or a weak base and its conjugate acid (e.g., NH3 + NH4Cl).',
            'Henderson-Hasselbalch Equation: pH = pKa + log( [A-] / [HA] ).'
          ]
        }
      ],
      summary: 'Acid-base equilibria govern chemical and biological systems. Buffer solutions maintain constant pH via the conjugate acid-base equilibrium, calculated using the Henderson-Hasselbalch relation.',
      keyTerms: [
        { term: 'Buffer Solution', definition: 'A solution containing a weak acid and its conjugate salt that resists drastic changes in pH upon addition of acid or base.' },
        { term: 'Kw (Autoionization Constant)', definition: 'The equilibrium constant for self-ionization of water, equal to 1.0 × 10⁻¹⁴ at 25°C.' }
      ],
      formulasOrRules: [
        { title: 'pH Definition', content: 'pH = -log10[H3O+]' },
        { title: 'Water Equilibrium', content: 'Kw = [H3O+][OH-] = 1.0 × 10⁻¹⁴' },
        { title: 'Henderson-Hasselbalch', content: 'pH = pKa + log([A-] / [HA])' }
      ]
    }
  ],

  // ==========================================
  // 📐 GRADE 12 MATHEMATICS (NATURAL SCIENCE)
  // ==========================================
  'g12-math-nat-en': [
    {
      id: 'g12-math-u1',
      unitNumber: 1,
      title: 'Sequences, Series & Mathematical Induction',
      titleAmharic: 'ቅደም ተከተሎች (Sequences) እና ተከታታይ ድምሮች (Series)',
      description: 'Arithmetic progressions (AP), geometric progressions (GP), convergence and divergence of infinite geometric series, sigma notation, and mathematical induction proofs.',
      readingTimeMinutes: 26,
      keyObjectives: [
        'Find the nth term and sum of n terms for Arithmetic Progressions: an = a1 + (n-1)d, Sn = (n/2)(2a1 + (n-1)d).',
        'Find nth term and sum of Geometric Progressions: an = a1 * r^(n-1), Sn = a1(1 - r^n)/(1 - r).',
        'Evaluate infinite geometric series sum S_inf = a1 / (1 - r) when |r| < 1.',
        'Apply the Principle of Mathematical Induction to verify algebraic identities.'
      ],
      sections: [
        {
          id: 'g12-math-u1-s1',
          sectionNumber: '1.1',
          title: 'Arithmetic and Geometric Sequences',
          content: [
            'An arithmetic sequence has a constant common difference d = a_(n) - a_(n-1). General term: a_n = a1 + (n-1)d.',
            'Sum of first n terms of an AP: S_n = (n/2)(a1 + a_n) = (n/2)[2a1 + (n-1)d].',
            'A geometric sequence has a constant common ratio r = a_n / a_(n-1). General term: a_n = a1 * r^(n-1).',
            'Infinite Geometric Series: If |r| < 1, the series converges to S_inf = a1 / (1 - r). If |r| ≥ 1, the series diverges.'
          ]
        }
      ],
      summary: 'Sequences form the bedrock of discrete mathematics and calculus. Convergence of geometric series requires |r| < 1.',
      keyTerms: [
        { term: 'Arithmetic Progression (AP)', definition: 'A sequence where each term after the first is obtained by adding a fixed constant d.' },
        { term: 'Geometric Progression (GP)', definition: 'A sequence where each term after the first is obtained by multiplying by a fixed non-zero ratio r.' },
        { term: 'Convergence', definition: 'The property of an infinite series having a finite numerical sum as n approaches infinity.' }
      ],
      formulasOrRules: [
        { title: 'nth term of AP', content: 'an = a1 + (n - 1)d' },
        { title: 'Sum of n terms of AP', content: 'Sn = (n/2)[2a1 + (n - 1)d]' },
        { title: 'nth term of GP', content: 'an = a1 · r^(n - 1)' },
        { title: 'Infinite GP Sum (|r|<1)', content: 'S_inf = a1 / (1 - r)' }
      ]
    },
    {
      id: 'g12-math-u2',
      unitNumber: 2,
      title: 'Limits, Continuity & Differential Calculus',
      titleAmharic: 'ሊሚት፣ ቀጣይነት እና ዲፈረንሻል ካልኩለስ',
      description: 'Concept of limit, limit laws, one-sided limits, limits at infinity, continuity, derivative as a rate of change, differentiation rules (product, quotient, chain rule), and implicit differentiation.',
      readingTimeMinutes: 35,
      keyObjectives: [
        'Evaluate algebraic and trigonometric limits using factorization, rationalization, and L Hopital Rule.',
        'Test continuity of a function f(x) at x=c: (1) f(c) defined, (2) lim f(x) exists, (3) lim f(x) = f(c).',
        'Find derivatives using first principles and power, product, quotient, and chain rules.',
        'Determine equations of tangent and normal lines to a curve.',
        'Find local extrema and points of inflection using First and Second Derivative tests.'
      ],
      sections: [
        {
          id: 'g12-math-u2-s1',
          sectionNumber: '2.1',
          title: 'Limits and Limit Evaluation Techniques',
          content: [
            'The limit lim_(x->c) f(x) = L means f(x) approaches L as x approaches c from both left and right sides.',
            'Indeterminate forms 0/0 and inf/inf can be resolved by algebraic simplification or by applying L Hopital Rule: lim f(x)/g(x) = lim f (x)/g (x).',
            'Fundamental Trigonometric Limit: lim_(x->0) (sin x / x) = 1 (where x is in radians).'
          ]
        },
        {
          id: 'g12-math-u2-s2',
          sectionNumber: '2.2',
          title: 'Differentiation Rules & Extrema Analysis',
          content: [
            '1. Power Rule: d/dx(x^n) = n * x^(n-1).',
            '2. Product Rule: d/dx(u * v) = u v + v u.',
            '3. Quotient Rule: d/dx(u / v) = (u v - u v) / v².',
            '4. Chain Rule: d/dx[f(g(x))] = f (g(x)) * g (x).',
            'Critical points occur where f (x) = 0 or f (x) is undefined. If f (c) = 0 and f (c) < 0, then f has a local maximum at c; if f (c) > 0, local minimum.'
          ]
        }
      ],
      summary: 'Calculus analyzes rates of change. Derivatives quantify tangent slopes, velocity, and optimization in engineering and natural sciences.',
      keyTerms: [
        { term: 'Derivative', definition: 'The instantaneous rate of change of a function with respect to its variable: f (x) = lim_(h->0) [f(x+h) - f(x)] / h.' },
        { term: 'Critical Point', definition: 'A point c in domain of f where f (c) = 0 or derivative does not exist.' }
      ],
      formulasOrRules: [
        { title: 'Product Rule', content: '(u · v) = u · v + u · v' },
        { title: 'Quotient Rule', content: '(u / v) = (u · v - u · v) / v²' },
        { title: 'Chain Rule', content: 'd/dx[f(g(x))] = f (g(x)) · g (x)' },
        { title: 'L Hopital Rule', content: 'lim f(x)/g(x) = lim f (x)/g (x)  [for 0/0, inf/inf]' }
      ]
    }
  ],

  // ==========================================
  // 🧬 GRADE 12 BIOLOGY (NATURAL SCIENCE STREAM)
  // ==========================================
  'g12-bio-en': [
    {
      id: 'g12-bio-u1',
      unitNumber: 1,
      title: 'Molecular Genetics & Protein Synthesis',
      titleAmharic: 'ሞለኪውላዊ ጀነቲክስ እና የፕሮቲን ውህደት',
      description: 'DNA and RNA structures, semi-conservative DNA replication, transcription, genetic code properties, translation on ribosomes, and gene regulation.',
      readingTimeMinutes: 30,
      keyObjectives: [
        'Describe Watson-Crick double helix structure of DNA with complementary base pairing (A=T, G≡C).',
        'Explain semi-conservative DNA replication enzymes: Helicase, DNA Polymerase, Primase, and Ligase.',
        'Outline transcription from DNA to mRNA by RNA Polymerase.',
        'Decipher the genetic code: universal, triplet, non-overlapping, and degenerate codons.',
        'Explain translation steps: initiation, elongation, and termination at the ribosome.'
      ],
      sections: [
        {
          id: 'g12-bio-u1-s1',
          sectionNumber: '1.1',
          title: 'Structure of Nucleic Acids & DNA Replication',
          content: [
            'DNA is a polymer of nucleotides, each comprising a deoxyribose sugar, a phosphate group, and one of four nitrogenous bases: Adenine (A), Thymine (T), Guanine (G), Cytosine (C).',
            'Chargaff Rule: Amount of A equals T (2 hydrogen bonds), and G equals C (3 hydrogen bonds).',
            'DNA strands are antiparallel (5 to 3 and 3 to 5).',
            'During replication, DNA Helicase unwinds the double helix, while DNA Polymerase synthesizes new complementary strands strictly in the 5 to 3 direction.'
          ]
        },
        {
          id: 'g12-bio-u1-s2',
          sectionNumber: '1.2',
          title: 'The Central Dogma: Transcription and Translation',
          content: [
            'The Central Dogma states: DNA -> mRNA -> Protein.',
            'Transcription: Inside the nucleus, RNA Polymerase binds to the promoter and transcribes the template DNA strand into pre-mRNA (replacing T with Uracil U).',
            'Translation: In the cytoplasm, ribosomes read mRNA codons (3 nucleotides). Transfer RNA (tRNA) carrying specific amino acids matches its anticodon to the mRNA codon until a STOP codon (UAA, UAG, UGA) is reached.'
          ]
        }
      ],
      summary: 'Genetic information encoded in DNA nucleotides is faithfully replicated and transcribed into mRNA, then translated into structural and functional cellular proteins.',
      keyTerms: [
        { term: 'Central Dogma', definition: 'The fundamental biological paradigm: genetic information flows from DNA to RNA to protein.' },
        { term: 'Codon', definition: 'A sequence of three consecutive mRNA nucleotides that specifies an amino acid or stop signal.' }
      ],
      formulasOrRules: [
        { title: 'Chargaff Rule', content: '%A = %T  and  %G = %C' },
        { title: 'Start Codon', content: 'AUG (encodes Methionine)' },
        { title: 'Stop Codons', content: 'UAA, UAG, UGA (signal termination)' }
      ]
    }
  ],

  // ==========================================
  // 📈 GRADE 12 ECONOMICS (SOCIAL SCIENCE STREAM)
  // ==========================================
  'g12-econ-en': [
    {
      id: 'g12-econ-u1',
      unitNumber: 1,
      title: 'National Income Accounting & Macroeconomic Policy',
      titleAmharic: 'የሀገራዊ ገቢ ስሌት እና ማክሮ ኢኮኖሚክስ ፖሊሲ',
      description: 'Gross Domestic Product (GDP), Gross National Product (GNP), nominal vs real GDP, GDP deflator, approaches to measuring national income (expenditure, income, and output), and fiscal/monetary policies.',
      readingTimeMinutes: 28,
      keyObjectives: [
        'Differentiate between GDP (domestic territory production) and GNP (national citizen ownership production).',
        'Calculate GDP via expenditure approach: GDP = C + I + G + (X - M).',
        'Distinguish nominal GDP from real GDP and calculate GDP Deflator = (Nominal GDP / Real GDP) × 100.',
        'Analyze fiscal policy tools (government spending and taxation) and monetary policy tools (reserve requirement, discount rate, open market operations).'
      ],
      sections: [
        {
          id: 'g12-econ-u1-s1',
          sectionNumber: '1.1',
          title: 'Gross Domestic Product & Measurement Approaches',
          content: [
            'GDP is the total market value of all final goods and services produced within the economic borders of a country during a given period (usually one year).',
            'Expenditure Method: GDP = C + I + G + NX, where C = Household consumption, I = Gross private investment, G = Government purchases, NX = Net exports (Exports X - Imports M).',
            'Real GDP is adjusted for inflation using base year prices, providing an accurate measure of economic growth.'
          ]
        }
      ],
      summary: 'National income aggregates quantify the macroeconomic performance of nations. Fiscal and monetary policy stabilizes business cycles of inflation and unemployment.',
      keyTerms: [
        { term: 'Gross Domestic Product (GDP)', definition: 'The market value of all final goods and services produced within a country in a year.' },
        { term: 'Real GDP', definition: 'GDP evaluated at constant base-year prices, eliminating the distortive effect of price inflation.' }
      ],
      formulasOrRules: [
        { title: 'Expenditure GDP Formula', content: 'GDP = C + I + G + (X - M)' },
        { title: 'GDP Deflator', content: 'Deflator = (Nominal GDP / Real GDP) × 100' },
        { title: 'GNP Formula', content: 'GNP = GDP + Net Factor Income from Abroad (NFIA)' }
      ]
    }
  ],

  // ==========================================
  // 🏛️ GRADE 12 HISTORY (SOCIAL SCIENCE STREAM)
  // ==========================================
  'g12-hist-en': [
    {
      id: 'g12-hist-u1',
      unitNumber: 1,
      title: '19th Century State Formation & The Battle of Adwa (1896)',
      titleAmharic: 'የ 19ኛው ክፍለ ዘመን የሀገር ምስረታ እና የዓድዋ ጦርነት',
      description: 'The unification process under Tewodros II, Yohannes IV, Menelik II, European colonial partition of Africa (Scramble for Africa), the Treaty of Wuchale (Article XVII controversy), and the historic victory at Adwa in March 1896.',
      readingTimeMinutes: 30,
      keyObjectives: [
        'Analyze the visions and challenges of Emperor Tewodros II in ending the Zemene Mesafint.',
        'Explain Emperor Yohannes IV strategy of shared sovereignty and defense against Egyptian and Mahdist invasions.',
        'Trace Emperor Menelik II southern, western, and eastern territorial integration and diplomatic negotiations.',
        'Critique Article XVII of the Treaty of Wuchale (Amharic vs Italian version disparity).',
        'Assess the global and pan-African significance of the Ethiopian victory at the Battle of Adwa on March 1, 1896.'
      ],
      sections: [
        {
          id: 'g12-hist-u1-s1',
          sectionNumber: '1.1',
          title: 'The Treaty of Wuchale & Prelude to Adwa',
          content: [
            'Signed on May 2, 1889, between Emperor Menelik II and Italian representative Count Pietro Antonelli.',
            'The central deception lay in Article XVII: The Amharic version stated Ethiopia "may" use Italian good offices for international diplomacy; the Italian version deceptively claimed Ethiopia "must" conduct all foreign affairs through Italy, implying an Italian protectorate over Ethiopia.',
            'When Italy notified European powers of its protectorate claim, Menelik strongly protested and formally abrogated the treaty in February 1893 after acquiring modern firearms.'
          ]
        },
        {
          id: 'g12-hist-u1-s2',
          sectionNumber: '1.2',
          title: 'The Battle of Adwa (March 1, 1896) & Its Pan-African Legacy',
          content: [
            'Over 100,000 Ethiopian patriots united from across all ethnic and regional backgrounds under the leadership of Emperor Menelik II and Empress Taytu Betul.',
            'At the Battle of Adwa on March 1, 1896 (Yekatit 23, 1888 E.C.), the Ethiopian forces decisively defeated the Italian invading army led by General Oreste Baratieri.',
            'Treaty of Addis Ababa (October 1896) forced Italy to unconditionally recognize the total sovereignty and independence of Ethiopia.',
            'Adwa became a beacon of black liberation, anti-colonial resistance, and Pan-Africanism worldwide.'
          ]
        }
      ],
      summary: 'The 19th century in Ethiopia was defined by modernization, territorial integration, and the historic defense of national sovereignty culminating in the landmark victory at Adwa.',
      keyTerms: [
        { term: 'Treaty of Wuchale', definition: 'The 1889 treaty between Ethiopia and Italy containing the infamous discrepancy in Article XVII regarding protectorate status.' },
        { term: 'Battle of Adwa', definition: 'Decisive battle on March 1, 1896, where Ethiopian patriots defeated an imperialist European colonial army.' }
      ]
    }
  ],

  // ==========================================
  // 🗺️ GRADE 12 GEOGRAPHY (SOCIAL SCIENCE STREAM)
  // ==========================================
  'g12-geo-en': [
    {
      id: 'g12-geo-u1',
      unitNumber: 1,
      title: 'Geographic Information Systems (GIS) & Remote Sensing',
      titleAmharic: 'የጂኦግራፊ መረጃ ስርዓት (GIS) እና የርቀት ዳሰሳ (Remote Sensing)',
      description: 'Principles of GIS, spatial and attribute data, raster vs vector models, remote sensing platforms, electromagnetic sensors, and applications in resource mapping and disaster management in Ethiopia.',
      readingTimeMinutes: 25,
      keyObjectives: [
        'Define GIS components: hardware, software, data, people, and spatial analysis methods.',
        'Distinguish between Vector data (points, lines, polygons) and Raster data (grid cells/pixels).',
        'Explain remote sensing principles: energy source, atmospheric interaction, target reflection, and sensor recording.',
        'Demonstrate practical applications of satellite imagery in monitoring Ethiopian agriculture, deforestation, and water basins.'
      ],
      sections: [
        {
          id: 'g12-geo-u1-s1',
          sectionNumber: '1.1',
          title: 'Spatial Data Models: Vector vs Raster',
          content: [
            'Vector data model represents discrete features using coordinate geometries: Points (water wells, towns), Lines (roads, rivers), Polygons (forest reserves, administrative zones).',
            'Raster data model represents continuous geographical phenomena using a grid of rows and columns (pixels), ideal for elevation (DEM), temperature, and satellite imagery.'
          ]
        }
      ],
      summary: 'GIS and Remote Sensing represent modern digital geographic science, essential for environmental planning, water basin management, and urban development in Ethiopia.',
      keyTerms: [
        { term: 'GIS', definition: 'A computer system for capturing, storing, checking, and displaying data related to positions on Earth surface.' },
        { term: 'Raster Model', definition: 'A spatial data structure composed of equal-sized grid cells/pixels arranged in rows and columns.' }
      ]
    }
  ],

  // ==========================================
  // 📘 GRADE 11 & 10 HIGH-YIELD STEM UNITS
  // ==========================================
  'g11-physics-en': [
    {
      id: 'g11-phys-u1',
      unitNumber: 1,
      title: 'Two-Dimensional Kinematics & Projectile Motion',
      titleAmharic: 'ሁለት አቅጣጫዊ እንቅስቃሴ እና የፕሮጀክታይል እንቅስቃሴ',
      description: 'Vector resolution, independent horizontal and vertical motions, trajectory of projectiles, time of flight, maximum height, and horizontal range formulas.',
      readingTimeMinutes: 28,
      keyObjectives: [
        'Resolve velocity vectors into horizontal (vx = v0 cos θ) and vertical (vy = v0 sin θ) components.',
        'Calculate maximum height H = (v0² sin² θ) / (2g).',
        'Derive total time of flight T = (2v0 sin θ) / g.',
        'Determine horizontal range R = (v0² sin 2θ) / g and identify that range is maximized at 45° launch angle.'
      ],
      sections: [
        {
          id: 'g11-phys-u1-s1',
          sectionNumber: '1.1',
          title: 'Projectile Motion Fundamentals',
          content: [
            'Projectile motion is a combination of two independent perpendicular motions:',
            '1. Horizontal motion with constant velocity (ax = 0): x = (v0 cos θ) * t.',
            '2. Vertical motion under constant gravitational acceleration (ay = -g): vy = v0 sin θ - g*t.',
            'The parabolic trajectory equation: y = (tan θ)x - [g / (2v0² cos² θ)] * x².'
          ]
        }
      ],
      summary: 'Projectile motion demonstrates vector independence in two dimensions under gravity.',
      keyTerms: [
        { term: 'Trajectory', definition: 'The curved parabolic path followed by an object moving through space under the influence of gravity alone.' },
        { term: 'Range (R)', definition: 'The total horizontal displacement achieved by a projectile before returning to its launch altitude.' }
      ],
      formulasOrRules: [
        { title: 'Time of Flight', content: 'T = (2v0 · sin θ) / g' },
        { title: 'Maximum Height', content: 'H = (v0² · sin² θ) / (2g)' },
        { title: 'Horizontal Range', content: 'R = (v0² · sin 2θ) / g' }
      ]
    }
  ],

  'g10-physics-en': [
    {
      id: 'g10-phys-u1',
      unitNumber: 1,
      title: 'Motion in a Straight Line & Newton Laws',
      titleAmharic: 'በቀጥታ መስመር ላይ የሚደረግ እንቅስቃሴ እና የኒውተን ህጎች',
      description: 'Uniform motion, acceleration, kinematic equations, Newton three laws of motion, momentum, and conservation of linear momentum.',
      readingTimeMinutes: 24,
      keyObjectives: [
        'Differentiate between distance/displacement and speed/velocity.',
        'Use kinematic equations: v = u + at, s = ut + (1/2)at², v² = u² + 2as.',
        'State and apply Newton three laws of motion in daily life and engineering problems.'
      ],
      sections: [
        {
          id: 'g10-phys-u1-s1',
          sectionNumber: '1.1',
          title: 'Kinematics & Newton Three Laws',
          content: [
            'Newton First Law (Inertia): A body remains at rest or uniform straight-line motion unless acted on by a net external force.',
            'Newton Second Law: F_net = m * a. Net force produces acceleration directly proportional to force and inversely to mass.',
            'Newton Third Law (Action-Reaction): For every action force, there is an equal and opposite reaction force.'
          ]
        }
      ],
      summary: 'Foundational Newtonian mechanics explaining classical motion and force interactions.',
      keyTerms: [
        { term: 'Inertia', definition: 'The natural resistance of any physical object to a change in its velocity or state of motion.' },
        { term: 'Linear Momentum (p)', definition: 'The product of mass and velocity of an object: p = m * v.' }
      ],
      formulasOrRules: [
        { title: 'Newton 2nd Law', content: 'F = m · a' },
        { title: 'Kinematic 1', content: 'v = u + a · t' },
        { title: 'Kinematic 2', content: 's = u · t + 0.5 · a · t²' },
        { title: 'Kinematic 3', content: 'v² = u² + 2 · a · s' }
      ]
    }
  ],

  'g9-math-en': [
    {
      id: 'g9-math-u1',
      unitNumber: 1,
      title: 'Number Systems & Quadratic Equations',
      titleAmharic: 'የቁጥር ስርዓቶች እና ኳድራቲክ እኩልታዎች',
      description: 'Rational and irrational numbers, radical expressions, solving quadratic equations by factoring, completing the square, and the quadratic formula.',
      readingTimeMinutes: 22,
      keyObjectives: [
        'Simplify radicals and rationalize denominators.',
        'Solve ax² + bx + c = 0 using the quadratic formula: x = [-b ± √(b² - 4ac)] / (2a).',
        'Use the discriminant D = b² - 4ac to determine nature of roots.'
      ],
      sections: [
        {
          id: 'g9-math-u1-s1',
          sectionNumber: '1.1',
          title: 'Quadratic Formula and the Discriminant',
          content: [
            'For any quadratic equation in standard form ax² + bx + c = 0 (where a ≠ 0):',
            'Quadratic Formula: x = [ -b ± √(b² - 4ac) ] / (2a).',
            'The Discriminant D = b² - 4ac reveals root characteristics:',
            '• D > 0: Two distinct real roots.',
            '• D = 0: Exactly one real root (repeated root).',
            '• D < 0: No real roots (two complex conjugate roots).'
          ]
        }
      ],
      summary: 'Grade 9 establishes high school algebraic foundations essential for secondary and preparatory mathematics.',
      keyTerms: [
        { term: 'Quadratic Equation', definition: 'A polynomial equation of second degree with standard form ax² + bx + c = 0.' },
        { term: 'Discriminant (D)', definition: 'The term b² - 4ac under the radical in the quadratic formula determining root nature.' }
      ],
      formulasOrRules: [
        { title: 'Quadratic Formula', content: 'x = [-b ± √(b² - 4ac)] / (2a)' },
        { title: 'Discriminant', content: 'D = b² - 4ac' }
      ]
    }
  ]
};
