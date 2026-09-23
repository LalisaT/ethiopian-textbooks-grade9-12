// Ethiopian Curriculum Grades 9–12 Flashcards & Formula Cards Database
// Comprehensive dataset containing 1025 verified curriculum cards across all subjects and grades
import { Flashcard } from '../types/quiz';

export const FLASHCARDS_LIST: Flashcard[] = [
  {
    "id": "fc-phys-1",
    "grade": 12,
    "subject": "physics",
    "unitNumber": 1,
    "front": "What is the Carnot Efficiency formula and what units must temperatures be in?",
    "frontAmharic": "የካርኖት ቅልጥፍና (Carnot Efficiency) ቀመር ምንድን ነው? የሙቀት መለኪያስ?",
    "back": "Formula: η = 1 - (Tc / Th)\nTemperatures MUST be in absolute Kelvin (K = °C + 273.15). Tc = cold reservoir, Th = hot reservoir.",
    "backAmharic": "ቀመር፡ η = 1 - (Tc / Th)። የሙቀት መጠኖች የግድ በ ኬልቪን (K = °C + 273) መሆን አለባቸው።",
    "category": "formula"
  },
  {
    "id": "fc-phys-2",
    "grade": 12,
    "subject": "physics",
    "unitNumber": 1,
    "front": "State the First Law of Thermodynamics and sign conventions.",
    "frontAmharic": "የመጀመሪያውን የቴርሞዳይናሚክስ ህግ እና የምልክት ደንቦችን ግለጽ።",
    "back": "ΔU = Q - W\n• Q > 0: Heat added to system\n• Q < 0: Heat released by system\n• W > 0: Work done BY system (expansion)\n• W < 0: Work done ON system (compression)",
    "backAmharic": "ΔU = Q - W\n• Q > 0: ሙቀት ወደ ስርዓቱ ሲገባ\n• Q < 0: ሙቀት ሲወጣ\n• W > 0: ስራ በስርዓቱ ሲሰራ\n• W < 0: ስራ በስርዓቱ ላይ ሲሰራ",
    "category": "formula"
  },
  {
    "id": "fc-phys-3",
    "grade": 12,
    "subject": "physics",
    "unitNumber": 2,
    "front": "State Snell's Law of Refraction and Total Internal Reflection condition.",
    "back": "Snell's Law: n1 * sin(θ1) = n2 * sin(θ2)\nCritical Angle: sin(θc) = n2 / n1 (when light travels from denser to rarer medium, n1 > n2).",
    "category": "formula"
  },
  {
    "id": "fc-phys-4",
    "grade": 12,
    "subject": "physics",
    "unitNumber": 3,
    "front": "State the Electrical Power formulas and Ohm's Law.",
    "back": "Ohm's Law: V = I * R\nPower Formulas: P = V * I = I² * R = V² / R (Watts, W).",
    "category": "formula"
  },
  {
    "id": "fc-phys-5",
    "grade": 12,
    "subject": "physics",
    "unitNumber": 4,
    "front": "State the de Broglie Wavelength equation for matter waves.",
    "back": "λ = h / p = h / (m * v)\nwhere h = Planck's constant (6.63 × 10⁻³⁴ J·s), p = momentum.",
    "category": "formula"
  },
  {
    "id": "fc-phys-6",
    "grade": 9,
    "subject": "physics",
    "unitNumber": 1,
    "front": "What is the difference between a scalar and a vector quantity?",
    "back": "• Scalar: Has magnitude and unit only (e.g., mass, time, temperature, distance, speed).\n• Vector: Has magnitude, unit, AND specific direction (e.g., displacement, velocity, acceleration, force).",
    "category": "definition"
  },
  {
    "id": "fc-phys-7",
    "grade": 9,
    "subject": "physics",
    "unitNumber": 2,
    "front": "What are the 3 kinematic equations for uniform acceleration (along a straight line)?",
    "back": "1. v = u + at\n2. s = ut + (1/2)at²\n3. v² = u² + 2as\nwhere u = initial velocity, v = final velocity, a = acceleration, s = displacement, t = time.",
    "category": "formula"
  },
  {
    "id": "fc-phys-8",
    "grade": 9,
    "subject": "physics",
    "unitNumber": 3,
    "front": "State Newton's Three Laws of Motion.",
    "back": "1. Law of Inertia: An object remains at rest or in uniform motion unless acted upon by a net external force.\n2. F_net = m * a (Force = mass × acceleration).\n3. Action-Reaction: For every action force, there is an equal and opposite reaction force.",
    "category": "concept"
  },
  {
    "id": "fc-phys-9",
    "grade": 9,
    "subject": "physics",
    "unitNumber": 4,
    "front": "What are the formulas for Work, Kinetic Energy, and Gravitational Potential Energy?",
    "back": "• Work: W = F * d * cos(θ) (Joules)\n• Kinetic Energy: KE = (1/2) * m * v²\n• Potential Energy: PE = m * g * h (g ≈ 9.8 m/s² or 10 m/s²).",
    "category": "formula"
  },
  {
    "id": "fc-phys-10",
    "grade": 9,
    "subject": "physics",
    "unitNumber": 5,
    "front": "What are Mechanical Advantage (MA), Velocity Ratio (VR), and Efficiency of a machine?",
    "back": "• MA = Load / Effort = L / E\n• VR = Distance moved by Effort / Distance moved by Load = d_E / d_L\n• Efficiency (η) = (MA / VR) × 100% = (Work Output / Work Input) × 100%.",
    "category": "formula"
  },
  {
    "id": "fc-phys-11",
    "grade": 10,
    "subject": "physics",
    "unitNumber": 1,
    "front": "State Archimedes' Principle and the condition for flotation.",
    "back": "• Principle: Any object completely or partially submerged in a fluid experiences an upward buoyant force equal to the weight of fluid displaced: F_b = ρ_fluid * V_submerged * g.\n• Flotation: Object floats when F_b = Weight of the object.",
    "category": "concept"
  },
  {
    "id": "fc-phys-12",
    "grade": 10,
    "subject": "physics",
    "unitNumber": 2,
    "front": "What is the formula for Heat Capacity and Latent Heat?",
    "back": "• Sensible Heat: Q = m * c * ΔT (c = specific heat capacity, J/kg·K)\n• Latent Heat (phase change at const. temp): Q = m * L (L_f = fusion, L_v = vaporization).",
    "category": "formula"
  },
  {
    "id": "fc-phys-13",
    "grade": 10,
    "subject": "physics",
    "unitNumber": 3,
    "front": "State Coulomb's Law of Electrostatic Force.",
    "back": "F = k * (|q1 * q2|) / r²\nwhere k = 1 / (4πε0) ≈ 8.99 × 10⁹ N·m²/C², q1 and q2 are charges, r is the separation distance.",
    "category": "formula"
  },
  {
    "id": "fc-phys-14",
    "grade": 10,
    "subject": "physics",
    "unitNumber": 4,
    "front": "Compare equivalent resistance in Series vs Parallel circuits.",
    "back": "• Series: R_eq = R1 + R2 + R3 (current I is the same through all resistors)\n• Parallel: 1 / R_eq = 1/R1 + 1/R2 + 1/R3 (voltage V is identical across each branch).",
    "category": "formula"
  },
  {
    "id": "fc-phys-15",
    "grade": 11,
    "subject": "physics",
    "unitNumber": 1,
    "front": "What is the formula for Centripetal Acceleration and Centripetal Force?",
    "back": "• Centripetal Acceleration: a_c = v² / r = ω² * r\n• Centripetal Force: F_c = m * a_c = (m * v²) / r = m * ω² * r (always directed radially inward).",
    "category": "formula"
  },
  {
    "id": "fc-phys-16",
    "grade": 11,
    "subject": "physics",
    "unitNumber": 2,
    "front": "State Newton's Law of Universal Gravitation and gravitational acceleration g.",
    "back": "• Force: F = G * (m1 * m2) / r² (G = 6.67 × 10⁻¹¹ N·m²/kg²)\n• Acceleration at surface: g = (G * M_earth) / R_earth² ≈ 9.8 m/s².",
    "category": "formula"
  },
  {
    "id": "fc-phys-17",
    "grade": 11,
    "subject": "physics",
    "unitNumber": 3,
    "front": "State Kepler's Three Laws of Planetary Motion.",
    "back": "1. Law of Orbits: All planets move in elliptical orbits with the Sun at one focus.\n2. Law of Areas: A line connecting Sun to planet sweeps out equal areas in equal intervals of time.\n3. Law of Periods: T² ∝ r³ (orbital period squared is proportional to semi-major axis cubed).",
    "category": "concept"
  },
  {
    "id": "fc-phys-18",
    "grade": 11,
    "subject": "physics",
    "unitNumber": 4,
    "front": "What is Torque and the conditions for static equilibrium?",
    "back": "• Torque: τ = r * F * sin(θ) (N·m)\n• Static Equilibrium Conditions:\n  1. Translational Equilibrium: ΣF = 0\n  2. Rotational Equilibrium: Στ = 0 (about any pivot).",
    "category": "concept"
  },
  {
    "id": "fc-phys-19",
    "grade": 11,
    "subject": "physics",
    "unitNumber": 5,
    "front": "What are the period formulas for a Simple Pendulum and a Mass-Spring System?",
    "back": "• Simple Pendulum: T = 2π * √(L / g) (independent of mass)\n• Mass on Spring: T = 2π * √(m / k) (independent of amplitude in small oscillations).",
    "category": "formula"
  },
  {
    "id": "fc-phys-20",
    "grade": 11,
    "subject": "physics",
    "unitNumber": 6,
    "front": "What is the Universal Wave Equation and definition of frequency?",
    "back": "• Wave Equation: v = f * λ (Speed = frequency × wavelength)\n• Period and Frequency: f = 1 / T (Hertz, Hz).",
    "category": "formula"
  },
  {
    "id": "fc-phys-21",
    "grade": 12,
    "subject": "physics",
    "unitNumber": 3,
    "front": "What is the Magnetic Force on a moving charge and on a current-carrying wire?",
    "back": "• Moving Charge: F = q * v * B * sin(θ)\n• Current Wire: F = I * L * B * sin(θ)\nDirection given by Right-Hand Rule.",
    "category": "formula"
  },
  {
    "id": "fc-phys-22",
    "grade": 12,
    "subject": "physics",
    "unitNumber": 3,
    "front": "State Faraday's Law of Induction and Lenz's Law.",
    "back": "• Faraday's Law: Induced EMF ε = -N * (ΔΦ_B / Δt) where Φ_B = B * A * cos(θ).\n• Lenz's Law: The direction of induced current opposes the change in magnetic flux that caused it (represented by the negative sign).",
    "category": "concept"
  },
  {
    "id": "fc-phys-23",
    "grade": 12,
    "subject": "physics",
    "unitNumber": 4,
    "front": "State Einstein's Photoelectric Equation and work function.",
    "back": "E_photon = h * f = W0 + KE_max\nKE_max = h * f - h * f0 = e * V_stopping\nwhere W0 = h * f0 is the work function of the metal.",
    "category": "formula"
  },
  {
    "id": "fc-phys-24",
    "grade": 12,
    "subject": "physics",
    "unitNumber": 5,
    "front": "State Einstein's Mass-Energy Equivalence and Radioactive Half-life formula.",
    "back": "• Mass-Energy: E = m * c² (c = 3.0 × 10⁸ m/s)\n• Radioactive Decay: N(t) = N0 * (1/2)^(t / T_half) = N0 * e^(-λt)\n• Decay constant: λ = ln(2) / T_half ≈ 0.693 / T_half.",
    "category": "formula"
  },
  {
    "id": "fc-phys-25",
    "grade": 10,
    "subject": "physics",
    "unitNumber": 5,
    "front": "What is the difference between Transverse and Longitudinal waves?",
    "back": "• Transverse: Particle oscillations are perpendicular to wave propagation (e.g., light, water waves, S-waves).\n• Longitudinal: Particle oscillations are parallel to wave propagation (e.g., sound waves, P-waves, compression in springs).",
    "category": "definition"
  },
  {
    "id": "fc-chem-1",
    "grade": 12,
    "subject": "chemistry",
    "unitNumber": 2,
    "front": "What is the Henderson-Hasselbalch equation for buffer solutions?",
    "back": "pH = pKa + log([Conjugate Base] / [Weak Acid])\npOH = pKb + log([Conjugate Acid] / [Weak Base])",
    "category": "formula"
  },
  {
    "id": "fc-chem-2",
    "grade": 12,
    "subject": "chemistry",
    "unitNumber": 1,
    "front": "What is the Ideal Gas Law equation and standard molar volume at STP?",
    "back": "P * V = n * R * T (R = 0.0821 L·atm/mol·K = 8.314 J/mol·K)\nStandard Molar Volume at STP (0°C, 1 atm): 1 mole of any ideal gas = 22.4 Liters.",
    "category": "formula"
  },
  {
    "id": "fc-chem-3",
    "grade": 12,
    "subject": "chemistry",
    "unitNumber": 3,
    "front": "What is the relationship between pH, pOH, and Kw at 25°C?",
    "back": "pH = -log[H3O+]\npOH = -log[OH-]\npH + pOH = 14.0\nKw = [H3O+][OH-] = 1.0 × 10⁻¹⁴ at 25°C.",
    "category": "formula"
  },
  {
    "id": "fc-chem-4",
    "grade": 12,
    "subject": "chemistry",
    "unitNumber": 4,
    "front": "State the Gibbs Free Energy equation and spontaneity criteria.",
    "back": "ΔG = ΔH - T * ΔS\n• ΔG < 0: Spontaneous reaction (exergonic)\n• ΔG = 0: Dynamic equilibrium\n• ΔG > 0: Non-spontaneous reaction (endergonic).",
    "category": "formula"
  },
  {
    "id": "fc-chem-5",
    "grade": 9,
    "subject": "chemistry",
    "unitNumber": 1,
    "front": "State the main postulates of Dalton's Atomic Theory.",
    "back": "1. Elements are composed of tiny, indivisible particles called atoms.\n2. All atoms of a given element are identical in mass and properties.\n3. Atoms cannot be created, divided, or destroyed.\n4. Compounds are formed by combinations of different atoms in fixed integer ratios.",
    "category": "concept"
  },
  {
    "id": "fc-chem-6",
    "grade": 9,
    "subject": "chemistry",
    "unitNumber": 2,
    "front": "What are the four Quantum Numbers and their physical meanings?",
    "back": "1. Principal (n): Main energy level / shell (n = 1, 2, 3...)\n2. Angular Momentum (l): Subshell shape (0=s, 1=p, 2=d, 3=f)\n3. Magnetic (m_l): Orbital spatial orientation (-l to +l)\n4. Spin (m_s): Electron spin direction (+1/2 or -1/2).",
    "category": "definition"
  },
  {
    "id": "fc-chem-7",
    "grade": 9,
    "subject": "chemistry",
    "unitNumber": 3,
    "front": "State the periodic trends for Ionization Energy, Electronegativity, and Atomic Radius.",
    "back": "• Across a Period (Left to Right): Atomic Radius decreases; Ionization Energy and Electronegativity increase.\n• Down a Group (Top to Bottom): Atomic Radius increases; Ionization Energy and Electronegativity decrease.",
    "category": "concept"
  },
  {
    "id": "fc-chem-8",
    "grade": 10,
    "subject": "chemistry",
    "unitNumber": 1,
    "front": "What is Avogadro's Number and the formula for moles from mass and particles?",
    "back": "• Avogadro's Number: N_A = 6.022 × 10²³ particles/mol\n• Moles from mass: n = mass (g) / Molar Mass (g/mol)\n• Moles from particles: n = N / N_A.",
    "category": "formula"
  },
  {
    "id": "fc-chem-9",
    "grade": 10,
    "subject": "chemistry",
    "unitNumber": 2,
    "front": "What is the difference between Empirical Formula and Molecular Formula?",
    "back": "• Empirical Formula: Lowest whole-number ratio of atoms of elements in a compound (e.g., CH2O for glucose).\n• Molecular Formula: Actual number of atoms of each element in a molecule (e.g., C6H12O6 = 6 × CH2O).",
    "category": "definition"
  },
  {
    "id": "fc-chem-10",
    "grade": 10,
    "subject": "chemistry",
    "unitNumber": 3,
    "front": "Define Oxidation, Reduction, Oxidizing Agent, and Reducing Agent (OIL RIG).",
    "back": "• Oxidation: Loss of electrons (Oxidation number increases)\n• Reduction: Gain of electrons (Oxidation number decreases)\n• Oxidizing Agent: Gets reduced; causes oxidation in another substance\n• Reducing Agent: Gets oxidized; causes reduction in another substance.",
    "category": "concept"
  },
  {
    "id": "fc-chem-11",
    "grade": 11,
    "subject": "chemistry",
    "unitNumber": 1,
    "front": "State Boyle's Law, Charles's Law, and Gay-Lussac's Law.",
    "back": "• Boyle's Law: P1 * V1 = P2 * V2 (at constant T)\n• Charles's Law: V1 / T1 = V2 / T2 (at constant P, T in Kelvin)\n• Gay-Lussac's Law: P1 / T1 = P2 / T2 (at constant V)\n• Combined Gas Law: (P1 * V1) / T1 = (P2 * V2) / T2.",
    "category": "formula"
  },
  {
    "id": "fc-chem-12",
    "grade": 11,
    "subject": "chemistry",
    "unitNumber": 2,
    "front": "Define Molarity (M), Molality (m), and Mole Fraction (X).",
    "back": "• Molarity (M) = moles of solute / Liters of solution (mol/L)\n• Molality (m) = moles of solute / kilograms of solvent (mol/kg)\n• Mole Fraction (X_A) = moles of A / Total moles in mixture.",
    "category": "formula"
  },
  {
    "id": "fc-chem-13",
    "grade": 11,
    "subject": "chemistry",
    "unitNumber": 3,
    "front": "State the general Differential Rate Law and order of reaction.",
    "back": "Rate = k * [A]^m * [B]^n\n• Overall Reaction Order = m + n\n• k = rate constant (units depend on overall order: for 1st order s⁻¹, for 2nd order L·mol⁻¹·s⁻¹).",
    "category": "formula"
  },
  {
    "id": "fc-chem-14",
    "grade": 11,
    "subject": "chemistry",
    "unitNumber": 4,
    "front": "State Le Chatelier's Principle for chemical equilibria.",
    "back": "If a system at dynamic equilibrium is disturbed by a change in temperature, pressure/volume, or concentration, the system shifts in the direction that counteracts the disturbance.",
    "category": "concept"
  },
  {
    "id": "fc-chem-15",
    "grade": 12,
    "subject": "chemistry",
    "unitNumber": 4,
    "front": "How do you calculate Standard Cell Potential (E°cell)?",
    "back": "E°cell = E°cathode (reduction) - E°anode (reduction)\n• If E°cell > 0: Galvanic / Voltaic cell (spontaneous, ΔG° < 0)\n• If E°cell < 0: Electrolytic cell (requires external power source, ΔG° > 0).",
    "category": "formula"
  },
  {
    "id": "fc-chem-16",
    "grade": 12,
    "subject": "chemistry",
    "unitNumber": 5,
    "front": "What are the IUPAC Functional Groups: Alcohol, Aldehyde, Ketone, Carboxylic Acid, Ester?",
    "back": "• Alcohol: -OH (hydroxy, suffix -ol)\n• Aldehyde: -CHO (terminal carbonyl, suffix -al)\n• Ketone: -C(=O)- (internal carbonyl, suffix -one)\n• Carboxylic Acid: -COOH (carboxyl, suffix -oic acid)\n• Ester: -COOR (carboxylate, suffix -oate).",
    "category": "definition"
  },
  {
    "id": "fc-chem-17",
    "grade": 10,
    "subject": "chemistry",
    "unitNumber": 4,
    "front": "Distinguish between Arrhenius, Brønsted-Lowry, and Lewis acid-base theories.",
    "back": "• Arrhenius: Acid yields H+ in water; Base yields OH- in water.\n• Brønsted-Lowry: Acid is a proton (H+) donor; Base is a proton acceptor.\n• Lewis: Acid is an electron-pair acceptor; Base is an electron-pair donor.",
    "category": "concept"
  },
  {
    "id": "fc-bio-1",
    "grade": 12,
    "subject": "biology",
    "unitNumber": 1,
    "front": "What are the start codon and three stop codons in mRNA translation?",
    "back": "Start Codon: AUG (codes for Methionine)\nStop Codons: UAA, UAG, UGA (signal termination of polypeptide translation).",
    "category": "definition"
  },
  {
    "id": "fc-bio-2",
    "grade": 12,
    "subject": "biology",
    "unitNumber": 1,
    "front": "What is the Central Dogma of Molecular Biology?",
    "back": "DNA (Replication) → Transcription (RNA Polymerase) → mRNA → Translation (Ribosomes / tRNA) → Functional Protein.",
    "category": "concept"
  },
  {
    "id": "fc-bio-3",
    "grade": 12,
    "subject": "biology",
    "unitNumber": 2,
    "front": "What is the overall balanced chemical equation of aerobic cellular respiration?",
    "back": "C6H12O6 + 6 O2 → 6 CO2 + 6 H2O + 30-32 ATP\nYields ATP through Glycolysis (cytoplasm), Krebs Cycle (mitochondrial matrix), and Electron Transport Chain (cristae).",
    "category": "formula"
  },
  {
    "id": "fc-bio-4",
    "grade": 12,
    "subject": "biology",
    "unitNumber": 3,
    "front": "What is the overall balanced chemical equation of photosynthesis?",
    "back": "6 CO2 + 6 H2O + Light Energy → C6H12O6 + 6 O2\nLight reactions occur in thylakoid membranes; Calvin Cycle occurs in the stroma of chloroplasts.",
    "category": "formula"
  },
  {
    "id": "fc-bio-5",
    "grade": 9,
    "subject": "biology",
    "unitNumber": 1,
    "front": "State the three tenets of the Classical Cell Theory.",
    "back": "1. All living organisms are composed of one or more cells.\n2. The cell is the basic structural and functional unit of life.\n3. All cells arise from pre-existing cells through cell division (Omnis cellula e cellula).",
    "category": "concept"
  },
  {
    "id": "fc-bio-6",
    "grade": 9,
    "subject": "biology",
    "unitNumber": 2,
    "front": "Compare Prokaryotic and Eukaryotic cells.",
    "back": "• Prokaryotes: No true membrane-bound nucleus; circular naked DNA in nucleoid; 70S ribosomes; no membrane organelles (e.g., bacteria).\n• Eukaryotes: True nucleus with nuclear envelope; linear DNA with histones; 80S ribosomes; organelles like mitochondria and ER (e.g., plants, animals, fungi).",
    "category": "definition"
  },
  {
    "id": "fc-bio-7",
    "grade": 9,
    "subject": "biology",
    "unitNumber": 3,
    "front": "What are the reagents and color outcomes for biochemical food tests?",
    "back": "• Reducing Sugars: Benedict's test (Blue → Brick-Red precipitate on boiling)\n• Starch: Iodine solution (Yellow-brown → Blue-Black)\n• Proteins: Biuret test (Blue → Violet/Purple)\n• Lipids: Emulsion test (Ethanol + water → Milky white emulsion).",
    "category": "concept"
  },
  {
    "id": "fc-bio-8",
    "grade": 10,
    "subject": "biology",
    "unitNumber": 1,
    "front": "Define Diffusion, Osmosis, and Active Transport.",
    "back": "• Diffusion: Net movement of particles from high to low concentration (passive, no ATP).\n• Osmosis: Net diffusion of water molecules across a selectively permeable membrane from high to low water potential.\n• Active Transport: Movement of substances against concentration gradient using ATP and carrier proteins.",
    "category": "definition"
  },
  {
    "id": "fc-bio-9",
    "grade": 10,
    "subject": "biology",
    "unitNumber": 2,
    "front": "What is an Enzyme and what does the Induced Fit Model explain?",
    "back": "• Enzyme: Biological catalyst made of protein that lowers activation energy without being consumed.\n• Induced Fit Model: Enzyme's active site changes shape slightly upon substrate binding to create an optimal catalytic orientation.",
    "category": "concept"
  },
  {
    "id": "fc-bio-10",
    "grade": 10,
    "subject": "biology",
    "unitNumber": 3,
    "front": "What are the differences between Aerobic and Anaerobic Respiration (Fermentation)?",
    "back": "• Aerobic: Requires O2, fully oxidizes glucose into CO2 and H2O, yields ~32 ATP per glucose.\n• Anaerobic: Occurs without O2 in cytoplasm, yields only 2 ATP per glucose. Produces Lactic Acid in animal muscles, or Ethanol + CO2 in yeast.",
    "category": "concept"
  },
  {
    "id": "fc-bio-11",
    "grade": 11,
    "subject": "biology",
    "unitNumber": 1,
    "front": "Compare Mitosis and Meiosis in terms of cell division and chromosome count.",
    "back": "• Mitosis: 1 division → 2 genetically identical diploid (2n) daughter cells. Used for growth, tissue repair, and asexual reproduction.\n• Meiosis: 2 divisions → 4 genetically unique haploid (n) gametes. Includes crossing over in Prophase I for genetic diversity.",
    "category": "definition"
  },
  {
    "id": "fc-bio-12",
    "grade": 11,
    "subject": "biology",
    "unitNumber": 2,
    "front": "State Mendel's Law of Segregation and Law of Independent Assortment.",
    "back": "1. Law of Segregation: Two alleles for each trait separate during gamete formation so each gamete carries only one allele.\n2. Law of Independent Assortment: Genes for different traits segregate independently of one another during gamete formation (for unlinked genes).",
    "category": "concept"
  },
  {
    "id": "fc-bio-13",
    "grade": 11,
    "subject": "biology",
    "unitNumber": 3,
    "front": "What phenotypic ratios are expected in Mendelian monohybrid and dihybrid crosses?",
    "back": "• Monohybrid cross (Bb × Bb): 3:1 phenotypic ratio (3 dominant : 1 recessive), 1:2:1 genotypic ratio.\n• Dihybrid cross (BbSs × BbSs): 9:3:3:1 phenotypic ratio.",
    "category": "formula"
  },
  {
    "id": "fc-bio-14",
    "grade": 11,
    "subject": "biology",
    "unitNumber": 4,
    "front": "Trace the flow of blood through the human Heart and double circulatory system.",
    "back": "Vena Cava → Right Atrium → Right Ventricle → Pulmonary Artery → Lungs (oxygenation) → Pulmonary Veins → Left Atrium → Left Ventricle (thickest wall) → Aorta → Systemic body circulation.",
    "category": "concept"
  },
  {
    "id": "fc-bio-15",
    "grade": 12,
    "subject": "biology",
    "unitNumber": 4,
    "front": "Name three endemic wildlife species of Ethiopia and their protected national parks.",
    "back": "1. Walia Ibex (Capra walie) – Simien Mountains National Park\n2. Gelada Baboon (Theropithecus gelada) – Simien & Guassa highlands\n3. Ethiopian Wolf (Canis simensis) – Bale Mountains National Park.",
    "category": "date_fact"
  },
  {
    "id": "fc-bio-16",
    "grade": 12,
    "subject": "biology",
    "unitNumber": 5,
    "front": "What are Homologous vs Analogous structures in evolutionary biology?",
    "back": "• Homologous: Similar internal anatomy/origin due to common ancestor, but different functions (e.g., human arm, bat wing, whale flipper - divergent evolution).\n• Analogous: Similar function due to similar environmental pressure, but different evolutionary origin (e.g., bird wing vs butterfly wing - convergent evolution).",
    "category": "concept"
  },
  {
    "id": "fc-math-1",
    "grade": 12,
    "subject": "mathematics_natural",
    "unitNumber": 3,
    "front": "State the Product Rule and Quotient Rule in Calculus.",
    "back": "Product Rule: (u · v)' = u'v + uv'\nQuotient Rule: (u / v)' = (u'v - uv') / v²",
    "category": "formula"
  },
  {
    "id": "fc-math-2",
    "grade": 12,
    "subject": "mathematics_natural",
    "unitNumber": 1,
    "front": "State the Quadratic Formula and the nature of roots based on the discriminant.",
    "back": "x = [-b ± √(b² - 4ac)] / (2a)\nDiscriminant D = b² - 4ac:\n• D > 0: Two distinct real roots\n• D = 0: Exactly one repeated real root\n• D < 0: Two complex conjugate roots (no real roots).",
    "category": "formula"
  },
  {
    "id": "fc-math-3",
    "grade": 12,
    "subject": "mathematics_natural",
    "unitNumber": 4,
    "front": "State the Fundamental Theorem of Calculus (Definite Integral).",
    "back": "∫[a to b] f(x) dx = F(b) - F(a)\nwhere F'(x) = f(x) is any antiderivative of f(x) on [a, b].",
    "category": "formula"
  },
  {
    "id": "fc-math-4",
    "grade": 12,
    "subject": "mathematics",
    "unitNumber": 2,
    "front": "State the sum of an Arithmetic Series (Sn) formulas.",
    "back": "Sn = (n / 2) * [a1 + an]\nSn = (n / 2) * [2a1 + (n - 1)d]\nwhere a1 = first term, an = nth term, d = common difference, n = number of terms.",
    "category": "formula"
  },
  {
    "id": "fc-math-5",
    "grade": 12,
    "subject": "mathematics",
    "unitNumber": 3,
    "front": "State the sum of a Finite and Infinite Geometric Series.",
    "back": "• Finite: Sn = a1 * (1 - r^n) / (1 - r), for r ≠ 1\n• Infinite (|r| < 1): S_inf = a1 / (1 - r). If |r| ≥ 1, the infinite series diverges.",
    "category": "formula"
  },
  {
    "id": "fc-math-6",
    "grade": 9,
    "subject": "mathematics",
    "unitNumber": 1,
    "front": "State the Pythagorean Theorem and distance formula in 2D.",
    "back": "• Pythagorean Theorem: in right triangle with legs a, b and hypotenuse c: a² + b² = c²\n• Distance Formula between (x1, y1) and (x2, y2): d = √[(x2 - x1)² + (y2 - y1)²].",
    "category": "formula"
  },
  {
    "id": "fc-math-7",
    "grade": 9,
    "subject": "mathematics",
    "unitNumber": 2,
    "front": "What is the formula for the slope of a line and slope-intercept form?",
    "back": "• Slope: m = (y2 - y1) / (x2 - x1)\n• Slope-Intercept Form: y = mx + c (where m = slope, c = y-intercept)\n• Parallel lines: m1 = m2\n• Perpendicular lines: m1 * m2 = -1.",
    "category": "formula"
  },
  {
    "id": "fc-math-8",
    "grade": 10,
    "subject": "mathematics",
    "unitNumber": 1,
    "front": "State the Remainder Theorem and Factor Theorem for polynomials.",
    "back": "• Remainder Theorem: When a polynomial P(x) is divided by (x - c), the remainder is R = P(c).\n• Factor Theorem: (x - c) is a factor of P(x) if and only if P(c) = 0.",
    "category": "concept"
  },
  {
    "id": "fc-math-9",
    "grade": 10,
    "subject": "mathematics",
    "unitNumber": 2,
    "front": "What are the essential Logarithm Rules?",
    "back": "1. log_b(x * y) = log_b(x) + log_b(y)\n2. log_b(x / y) = log_b(x) - log_b(y)\n3. log_b(x^k) = k * log_b(x)\n4. Change of Base: log_b(x) = ln(x) / ln(b) = log10(x) / log10(b)\n5. log_b(1) = 0, log_b(b) = 1.",
    "category": "formula"
  },
  {
    "id": "fc-math-10",
    "grade": 10,
    "subject": "mathematics",
    "unitNumber": 3,
    "front": "State the Law of Sines and Law of Cosines for any triangle ABC.",
    "back": "• Law of Sines: a / sin(A) = b / sin(B) = c / sin(C) = 2R\n• Law of Cosines: c² = a² + b² - 2ab * cos(C)\n(Useful when SAS or SSS is known).",
    "category": "formula"
  },
  {
    "id": "fc-math-11",
    "grade": 11,
    "subject": "mathematics_natural",
    "unitNumber": 1,
    "front": "State the Fundamental Pythagorean Trigonometric Identities.",
    "back": "1. sin²(θ) + cos²(θ) = 1\n2. 1 + tan²(θ) = sec²(θ)\n3. 1 + cot²(θ) = csc²(θ).",
    "category": "formula"
  },
  {
    "id": "fc-math-12",
    "grade": 11,
    "subject": "mathematics_natural",
    "unitNumber": 2,
    "front": "State the Double Angle Formulas for Sine, Cosine, and Tangent.",
    "back": "• sin(2θ) = 2sin(θ)cos(θ)\n• cos(2θ) = cos²(θ) - sin²(θ) = 2cos²(θ) - 1 = 1 - 2sin²(θ)\n• tan(2θ) = [2tan(θ)] / [1 - tan²(θ)].",
    "category": "formula"
  },
  {
    "id": "fc-math-13",
    "grade": 11,
    "subject": "mathematics_natural",
    "unitNumber": 3,
    "front": "What is the Dot Product and Cross Product of vectors?",
    "back": "• Dot Product: u · v = |u||v|cos(θ) = ux*vx + uy*vy + uz*vz (Scalar result; u ⊥ v iff u · v = 0)\n• Cross Product: |u × v| = |u||v|sin(θ) (Vector result perpendicular to both u and v).",
    "category": "formula"
  },
  {
    "id": "fc-math-14",
    "grade": 11,
    "subject": "mathematics",
    "unitNumber": 4,
    "front": "How do you calculate the Determinant and Inverse of a 2×2 Matrix A = [[a, b], [c, d]]?",
    "back": "• Determinant: det(A) = |A| = ad - bc\n• Inverse: A⁻¹ = (1 / det(A)) * [[d, -b], [-c, a]], provided det(A) ≠ 0.",
    "category": "formula"
  },
  {
    "id": "fc-math-15",
    "grade": 12,
    "subject": "mathematics_natural",
    "unitNumber": 2,
    "front": "What is the Chain Rule for differentiation?",
    "back": "If y = f(u) and u = g(x), then dy/dx = (dy/du) * (du/dx)\nIn prime notation: [f(g(x))]' = f'(g(x)) * g'(x).",
    "category": "formula"
  },
  {
    "id": "fc-math-16",
    "grade": 12,
    "subject": "mathematics_natural",
    "unitNumber": 3,
    "front": "State the derivatives of sin(x), cos(x), e^x, and ln(x).",
    "back": "• d/dx [sin(x)] = cos(x)\n• d/dx [cos(x)] = -sin(x)\n• d/dx [e^x] = e^x\n• d/dx [ln(x)] = 1 / x (for x > 0)\n• d/dx [tan(x)] = sec²(x).",
    "category": "formula"
  },
  {
    "id": "fc-math-17",
    "grade": 12,
    "subject": "mathematics_natural",
    "unitNumber": 4,
    "front": "What is the formula for Integration by Parts?",
    "back": "∫ u dv = u * v - ∫ v du\nChoose 'u' using the LIATE rule: Logarithmic, Inverse trig, Algebraic, Trigonometric, Exponential.",
    "category": "formula"
  },
  {
    "id": "fc-math-18",
    "grade": 12,
    "subject": "mathematics_social",
    "unitNumber": 1,
    "front": "What are the formulas for Permutations P(n, r) and Combinations C(n, r)?",
    "back": "• Permutation (Order matters): P(n, r) = n! / (n - r)!\n• Combination (Order does NOT matter): C(n, r) = (n r) = n! / [r! * (n - r)!].",
    "category": "formula"
  },
  {
    "id": "fc-math-19",
    "grade": 12,
    "subject": "mathematics_social",
    "unitNumber": 2,
    "front": "What is the Empirical Rule (68-95-99.7 Rule) for Normal Distributions?",
    "back": "In a standard normal distribution:\n• ~68% of data falls within μ ± 1σ\n• ~95% of data falls within μ ± 2σ\n• ~99.7% of data falls within μ ± 3σ.",
    "category": "concept"
  },
  {
    "id": "fc-econ-1",
    "grade": 12,
    "subject": "economics",
    "unitNumber": 1,
    "front": "State the GDP Expenditure Approach formula.",
    "back": "GDP = C + I + G + (X - M)\nC = Consumption, I = Investment, G = Government purchases, X = Exports, M = Imports (Net Exports NX = X - M).",
    "category": "formula"
  },
  {
    "id": "fc-econ-2",
    "grade": 12,
    "subject": "economics",
    "unitNumber": 2,
    "front": "What is the formula for Price Elasticity of Demand (Ed) and its interpretations?",
    "back": "Ed = (% Change in Q_demanded) / (% Change in Price) = (ΔQ / Q_avg) / (ΔP / P_avg)\n• |Ed| > 1: Elastic\n• |Ed| = 1: Unitary elastic\n• |Ed| < 1: Inelastic\n• |Ed| = 0: Perfectly inelastic.",
    "category": "formula"
  },
  {
    "id": "fc-econ-3",
    "grade": 11,
    "subject": "economics",
    "unitNumber": 1,
    "front": "Define Opportunity Cost and the Production Possibility Frontier (PPF).",
    "back": "• Opportunity Cost: The value of the next best alternative forgone when a choice is made.\n• PPF: A curve showing maximum combinations of two goods an economy can produce with available resources and technology. Points inside are inefficient; points outside are unattainable.",
    "category": "definition"
  },
  {
    "id": "fc-econ-4",
    "grade": 11,
    "subject": "economics",
    "unitNumber": 2,
    "front": "State the Law of Demand and the Law of Supply.",
    "back": "• Law of Demand: Ceteris paribus, as price increases, quantity demanded decreases (inverse relationship).\n• Law of Supply: Ceteris paribus, as price increases, quantity supplied increases (direct relationship).",
    "category": "concept"
  },
  {
    "id": "fc-econ-5",
    "grade": 11,
    "subject": "economics",
    "unitNumber": 3,
    "front": "What are Consumer Surplus and Producer Surplus at market equilibrium?",
    "back": "• Consumer Surplus: Difference between the maximum amount consumers are willing to pay and the market price actually paid (area below demand curve and above price line).\n• Producer Surplus: Difference between market price and minimum price sellers are willing to accept.",
    "category": "concept"
  },
  {
    "id": "fc-econ-6",
    "grade": 11,
    "subject": "economics",
    "unitNumber": 4,
    "front": "State the Law of Diminishing Marginal Utility and Utility Maximizing Rule.",
    "back": "• Law: As consumption of a good increases, additional satisfaction (MU) from each extra unit declines.\n• Maximizing Rule: (MU_x / P_x) = (MU_y / P_y) with total expenditure = Income.",
    "category": "formula"
  },
  {
    "id": "fc-econ-7",
    "grade": 11,
    "subject": "economics",
    "unitNumber": 5,
    "front": "What are the relationships between Total Cost (TC), Fixed Cost (FC), and Variable Cost (VC)?",
    "back": "• TC = TFC + TVC\n• ATC = AFC + AVC = TC / Q\n• Marginal Cost: MC = ΔTC / ΔQ (MC crosses ATC and AVC at their minimum points).",
    "category": "formula"
  },
  {
    "id": "fc-econ-8",
    "grade": 12,
    "subject": "economics",
    "unitNumber": 1,
    "front": "How do you calculate Real GDP using the GDP Deflator?",
    "back": "Real GDP = (Nominal GDP / GDP Deflator) × 100\nReal GDP adjusts for inflation by evaluating output at constant base-year prices.",
    "category": "formula"
  },
  {
    "id": "fc-econ-9",
    "grade": 12,
    "subject": "economics",
    "unitNumber": 2,
    "front": "What is the Consumer Price Index (CPI) and Inflation Rate formula?",
    "back": "• CPI = (Cost of Market Basket in Current Year / Cost of Basket in Base Year) × 100\n• Inflation Rate = [(CPI_current - CPI_previous) / CPI_previous] × 100%.",
    "category": "formula"
  },
  {
    "id": "fc-econ-10",
    "grade": 12,
    "subject": "economics",
    "unitNumber": 3,
    "front": "Name and define the three main types of Unemployment.",
    "back": "1. Frictional: Voluntary job transitions, searching for better fit (temporary).\n2. Structural: Skills mismatch due to technological changes or restructuring.\n3. Cyclical: Caused by economic recession / downturn in business cycle.",
    "category": "definition"
  },
  {
    "id": "fc-econ-11",
    "grade": 12,
    "subject": "economics",
    "unitNumber": 4,
    "front": "What is the difference between Expansionary and Contractionary Fiscal Policy?",
    "back": "• Expansionary: Increases Government Spending (G) and/or reduces Taxes (T) to stimulate aggregate demand during recessions.\n• Contractionary: Decreases Government Spending (G) and/or increases Taxes (T) to cool down inflation.",
    "category": "concept"
  },
  {
    "id": "fc-econ-12",
    "grade": 12,
    "subject": "economics",
    "unitNumber": 5,
    "front": "What are the three core instruments of Central Bank Monetary Policy?",
    "back": "1. Open Market Operations (buying/selling government bonds)\n2. Reserve Requirement Ratio (percentage of deposits banks must hold)\n3. Discount / Policy Interest Rate (rate charged to commercial banks).",
    "category": "concept"
  },
  {
    "id": "fc-hist-1",
    "grade": 12,
    "subject": "history",
    "unitNumber": 1,
    "front": "When was the Battle of Adwa fought and who led the Ethiopian army?",
    "back": "March 1, 1896 (Yekatit 23, 1888 E.C.).\nLed by Emperor Menelik II and Empress Taytu Betul, decisively defeating the Italian invading army under General Oreste Baratieri.",
    "category": "date_fact"
  },
  {
    "id": "fc-hist-2",
    "grade": 9,
    "subject": "history",
    "unitNumber": 1,
    "front": "Where were the fossil remains of Lucy (Dinknesh) discovered and how old are they?",
    "back": "Discovered in Hadar, Afar Depression, Ethiopia in 1974 by Donald Johanson.\nAustralopithecus afarensis, approximately 3.2 million years old, providing pivotal evidence for early bipedalism.",
    "category": "date_fact"
  },
  {
    "id": "fc-hist-3",
    "grade": 9,
    "subject": "history",
    "unitNumber": 2,
    "front": "What was the significance of King Ezana of Aksum in the 4th century AD?",
    "back": "King Ezana officially adopted Christianity as the state religion around 330 AD (guided by Frumentius / Abba Selama Kesate Berhan) and produced trilingual inscriptions (Ge'ez, Sabaean, Greek).",
    "category": "concept"
  },
  {
    "id": "fc-hist-4",
    "grade": 10,
    "subject": "history",
    "unitNumber": 1,
    "front": "Which king built the 11 rock-hewn monolithic churches of Roha (Lalibela)?",
    "back": "King Gebre Mesqel Lalibela of the Zagwe Dynasty in the 12th/13th century, designated a UNESCO World Heritage site (e.g., Biete Giyorgis).",
    "category": "date_fact"
  },
  {
    "id": "fc-hist-5",
    "grade": 10,
    "subject": "history",
    "unitNumber": 2,
    "front": "When and by whom was the Solomonic Dynasty 'restored' in medieval Ethiopia?",
    "back": "1270 AD by Yekuno Amlak, establishing the medieval mobile royal court in Shewa.",
    "category": "date_fact"
  },
  {
    "id": "fc-hist-6",
    "grade": 10,
    "subject": "history",
    "unitNumber": 3,
    "front": "What is the Gadaa system of the Oromo people and how long is each Gadaa grade?",
    "back": "An indigenous democratic socio-political and judicial system where leadership transitions peacefully every 8 years. Decisions are made by the assembly (Chaffe). Inscribed on UNESCO Intangible Cultural Heritage list.",
    "category": "concept"
  },
  {
    "id": "fc-hist-7",
    "grade": 10,
    "subject": "history",
    "unitNumber": 4,
    "front": "Who founded the permanent imperial capital at Gondar in 1636?",
    "back": "Emperor Fasilides (Fasil), who built the famous Fasil Ghebbi stone castle compound, ending the era of roving royal tent camps.",
    "category": "date_fact"
  },
  {
    "id": "fc-hist-8",
    "grade": 11,
    "subject": "history",
    "unitNumber": 1,
    "front": "What was the Zemene Mesafint (Era of the Princes) and its dates?",
    "back": "1769 to 1855 AD. Characterized by the breakdown of central imperial authority, continuous civil conflicts among regional warlords (Rases), and puppet emperors in Gondar.",
    "category": "date_fact"
  },
  {
    "id": "fc-hist-9",
    "grade": 11,
    "subject": "history",
    "unitNumber": 2,
    "front": "What were Emperor Tewodros II's primary modernization and unification goals?",
    "back": "Emperor Tewodros II (reigned 1855–1868) sought to end feudal division, unify Ethiopia, build a national salaried army, and manufacture modern armaments (e.g., the mortar 'Sebastopol' at Gafat). Died at Meqdala in 1868.",
    "category": "concept"
  },
  {
    "id": "fc-hist-10",
    "grade": 11,
    "subject": "history",
    "unitNumber": 3,
    "front": "What was the dispute over Article XVII of the 1889 Treaty of Wuchale?",
    "back": "• Amharic version: Ethiopia 'may' choose to utilize Italian diplomatic channels.\n• Italian version: Ethiopia 'must' conduct all foreign affairs through Italy, effectively reducing Ethiopia to an Italian protectorate. Menelik II rejected and abrogated the treaty.",
    "category": "concept"
  },
  {
    "id": "fc-hist-11",
    "grade": 12,
    "subject": "history",
    "unitNumber": 2,
    "front": "When did Fascist Italy invade Ethiopia, and what marked the liberation?",
    "back": "• Invasion: October 3, 1935, using banned mustard gas.\n• Occupation: 1936–1941 (resisted by patriotic Arbegnoch guerrilla forces).\n• Liberation: May 5, 1941, when Emperor Haile Selassie re-entered Addis Ababa.",
    "category": "date_fact"
  },
  {
    "id": "fc-hist-12",
    "grade": 12,
    "subject": "history",
    "unitNumber": 3,
    "front": "When and where was the Organization of African Unity (OAU) founded?",
    "back": "Founded on May 25, 1963 in Addis Ababa, Ethiopia, by 32 independent African heads of state, with its permanent headquarters established in Addis Ababa (later transformed into African Union - AU in 2002).",
    "category": "date_fact"
  },
  {
    "id": "fc-geo-1",
    "grade": 10,
    "subject": "geography",
    "unitNumber": 1,
    "front": "What is the highest mountain peak in Ethiopia and what is its elevation?",
    "back": "Ras Dejen (Ras Dashen) in the Simien Mountains National Park, rising to 4,550 meters (14,928 ft) above sea level.",
    "category": "date_fact"
  },
  {
    "id": "fc-geo-2",
    "grade": 10,
    "subject": "geography",
    "unitNumber": 1,
    "front": "What is the lowest depression in Ethiopia and its elevation?",
    "back": "The Danakil (Afar) Depression around Lake Asale / Dallol, dropping to approximately 125 meters below sea level, one of the hottest places on Earth.",
    "category": "date_fact"
  },
  {
    "id": "fc-geo-3",
    "grade": 11,
    "subject": "geography",
    "unitNumber": 2,
    "front": "List the 5 traditional agro-climatic zones of Ethiopia and their altitude ranges.",
    "back": "1. Bereha (Hot arid): Below 500 m\n2. Kolla (Warm semi-arid): 500 – 1,500 m\n3. Woina Dega (Temperate/Sub-tropical): 1,500 – 2,300 m\n4. Dega (Cool highland): 2,300 – 3,200 m\n5. Wurch / Kur (Alpine / Cold): Above 3,200 m.",
    "category": "definition"
  },
  {
    "id": "fc-geo-4",
    "grade": 11,
    "subject": "geography",
    "unitNumber": 3,
    "front": "Name the three major Drainage Systems of Ethiopia and primary rivers in each.",
    "back": "1. Western (Mediterranean) Basin: Abbay (Blue Nile), Tekeze, Baro-Akobo (drains ~60% of runoff).\n2. South-Eastern (Indian Ocean) Basin: Wabe Shebelle, Genale-Dawa.\n3. Rift Valley (Inland Closed) Basin: Awash, Omo-Gibe (flows into Lake Turkana), Bilate.",
    "category": "concept"
  },
  {
    "id": "fc-geo-5",
    "grade": 11,
    "subject": "geography",
    "unitNumber": 4,
    "front": "What is the source of the Blue Nile (Abbay) River?",
    "back": "Lake Tana in the Amhara region of the northwestern Ethiopian highlands, joining the White Nile at Khartoum, Sudan.",
    "category": "concept"
  },
  {
    "id": "fc-geo-6",
    "grade": 9,
    "subject": "geography",
    "unitNumber": 1,
    "front": "What is the difference between Large-Scale and Small-Scale maps?",
    "back": "• Large-Scale Map: Shows a small geographic area with great detail (e.g., 1:10,000 or 1:25,000 city cadastral map).\n• Small-Scale Map: Shows a large geographic area with little detail (e.g., 1:1,000,000 or 1:50,000,000 world map).",
    "category": "definition"
  },
  {
    "id": "fc-geo-7",
    "grade": 9,
    "subject": "geography",
    "unitNumber": 2,
    "front": "What causes Earth's Day/Night cycle and the four Seasons?",
    "back": "• Day & Night: Earth's rotation on its axis once every 24 hours from west to east.\n• Seasons: Earth's revolution around the Sun (365.25 days) combined with the fixed 23.5° axial tilt.",
    "category": "concept"
  },
  {
    "id": "fc-geo-8",
    "grade": 10,
    "subject": "geography",
    "unitNumber": 2,
    "front": "What geological process created the Great East African Rift Valley?",
    "back": "Divergent tectonic plate boundary where the African continent is splitting into the Nubian and Somalian plates, accompanied by crustal stretching, faulting, and volcanic activity.",
    "category": "concept"
  },
  {
    "id": "fc-geo-9",
    "grade": 12,
    "subject": "geography",
    "unitNumber": 1,
    "front": "What are the 5 stages of the Demographic Transition Model (DTM)?",
    "back": "1. High Stationary: High birth rate, high death rate, low growth.\n2. Early Expanding: High birth rate, falling death rate, rapid population explosion.\n3. Late Expanding: Falling birth rate, low death rate, slowing growth.\n4. Low Stationary: Low birth rate, low death rate, stable population.\n5. Declining: Birth rate falls below death rate (natural decrease).",
    "category": "concept"
  },
  {
    "id": "fc-geo-10",
    "grade": 12,
    "subject": "geography",
    "unitNumber": 2,
    "front": "What is the formula for Rate of Natural Increase (RNI) and Dependency Ratio?",
    "back": "• RNI (%) = (CBR - CDR) / 10\n• Dependency Ratio = [(Population aged 0-14 + Population aged 65+) / (Working-age population aged 15-64)] × 100.",
    "category": "formula"
  },
  {
    "id": "fc-eng-1",
    "grade": 11,
    "subject": "english",
    "unitNumber": 1,
    "front": "What are the structures and uses of the 4 English Conditionals (0, 1st, 2nd, 3rd)?",
    "back": "• Zero: If + Present Simple, Present Simple (Universal truths / scientific laws).\n• 1st: If + Present Simple, will + V_base (Real possible future outcome).\n• 2nd: If + Past Simple, would + V_base (Hypothetical / imaginary present or future).\n• 3rd: If + Past Perfect, would have + V_past_participle (Unreal past regret).",
    "category": "formula"
  },
  {
    "id": "fc-eng-2",
    "grade": 10,
    "subject": "english",
    "unitNumber": 2,
    "front": "How do you transform an Active Voice sentence to Passive Voice?",
    "back": "Active: Subject + Verb + Object\nPassive: Object + appropriate form of 'to be' + Past Participle (V3) + [by Subject]\ne.g., 'Abebe wrote the essay' → 'The essay was written by Abebe'.",
    "category": "formula"
  },
  {
    "id": "fc-eng-3",
    "grade": 10,
    "subject": "english",
    "unitNumber": 3,
    "front": "What are the standard tense shifts in Reported (Indirect) Speech?",
    "back": "• Present Simple → Past Simple\n• Present Continuous → Past Continuous\n• Present Perfect / Past Simple → Past Perfect\n• Will → Would, Can → Could, May → Might\n• Time shifts: 'now' → 'then', 'today' → 'that day', 'yesterday' → 'the day before'.",
    "category": "concept"
  },
  {
    "id": "fc-eng-4",
    "grade": 12,
    "subject": "english",
    "unitNumber": 1,
    "front": "What are Relative Pronouns and when is 'Whom' used instead of 'Who'?",
    "back": "• Who: Refers to people acting as the Subject of the relative clause.\n• Whom: Refers to people acting as the Object of the verb or after prepositions (e.g., 'To whom it may concern').\n• Whose: Possessive.\n• Which / That: Things / concepts.",
    "category": "definition"
  },
  {
    "id": "fc-eng-5",
    "grade": 12,
    "subject": "english",
    "unitNumber": 2,
    "front": "Explain Subject-Verb Agreement rules for 'Neither... nor' and collective nouns.",
    "back": "• 'Neither A nor B' / 'Either A or B': Verb agrees with the nearer subject (e.g., 'Neither the teacher nor the students WERE present').\n• Indefinite pronouns like 'Everyone', 'Each', 'Somebody' always take SINGULAR verbs.",
    "category": "concept"
  },
  {
    "id": "fc-eng-6",
    "grade": 9,
    "subject": "english",
    "unitNumber": 1,
    "front": "What is the difference between Transitive and Intransitive verbs?",
    "back": "• Transitive Verb: Requires a direct object to complete its meaning (e.g., 'She bought a book'). Can be converted into passive voice.\n• Intransitive Verb: Does not take a direct object (e.g., 'The baby slept'). Cannot be made passive.",
    "category": "definition"
  },
  {
    "id": "fc-it-1",
    "grade": 12,
    "subject": "it",
    "unitNumber": 1,
    "front": "Name the 7 layers of the OSI Reference Model from Layer 7 to Layer 1.",
    "back": "7. Application\n6. Presentation\n5. Session\n4. Transport (TCP/UDP)\n3. Network (IP, Routers)\n2. Data Link (Ethernet, MAC, Switches)\n1. Physical (Cables, Bits, Voltages)\nMnemonic: All People Seem To Need Data Processing.",
    "category": "concept"
  },
  {
    "id": "fc-it-2",
    "grade": 12,
    "subject": "it",
    "unitNumber": 2,
    "front": "What is the difference between IPv4 and IPv6 addresses?",
    "back": "• IPv4: 32-bit address, written in dotted decimal (4 octets, e.g., 192.168.1.1), provides ~4.3 billion addresses.\n• IPv6: 128-bit address, written in hexadecimal separated by colons (8 groups of 4 hex digits), provides ~3.4 × 10³⁸ unique addresses.",
    "category": "definition"
  },
  {
    "id": "fc-it-3",
    "grade": 11,
    "subject": "it",
    "unitNumber": 1,
    "front": "In Relational Databases (RDBMS), what are Primary Keys and Foreign Keys?",
    "back": "• Primary Key: A column (or set of columns) that uniquely identifies each record in a table; cannot contain NULL.\n• Foreign Key: A column that references the primary key of another table to establish a relation and enforce referential integrity.",
    "category": "definition"
  },
  {
    "id": "fc-it-4",
    "grade": 11,
    "subject": "it",
    "unitNumber": 2,
    "front": "Write the basic SQL query syntax to retrieve, filter, and sort records.",
    "back": "SELECT column1, column2 \nFROM TableName \nWHERE condition \nORDER BY column1 ASC/DESC;\nExamples of aggregate functions: COUNT(), SUM(), AVG(), MAX(), MIN().",
    "category": "formula"
  },
  {
    "id": "fc-it-5",
    "grade": 10,
    "subject": "it",
    "unitNumber": 1,
    "front": "What is the CIA Triad in Information Cybersecurity?",
    "back": "1. Confidentiality: Ensuring only authorized users have access to sensitive information.\n2. Integrity: Ensuring data is accurate, authentic, and protected against unauthorized modification.\n3. Availability: Ensuring authorized users have reliable and timely access to data and systems.",
    "category": "concept"
  },
  {
    "id": "fc-it-6",
    "grade": 10,
    "subject": "it",
    "unitNumber": 2,
    "front": "Compare Symmetric and Asymmetric Encryption.",
    "back": "• Symmetric: Uses the same secret key for both encryption and decryption (fast, e.g., AES).\n• Asymmetric (Public Key): Uses a mathematically linked key pair: Public Key encrypts, Private Key decrypts (e.g., RSA, TLS/HTTPS).",
    "category": "concept"
  },
  {
    "id": "fc-it-7",
    "grade": 9,
    "subject": "it",
    "unitNumber": 1,
    "front": "What are the core components of the CPU in the Von Neumann Architecture?",
    "back": "1. ALU (Arithmetic Logic Unit): Performs mathematical and logical comparisons.\n2. CU (Control Unit): Directs the flow of instructions and data through the Fetch-Decode-Execute cycle.\n3. Registers: Ultra-fast internal memory storage locations (e.g., PC, MAR, MDR, Accumulator).",
    "category": "definition"
  },
  {
    "id": "fc-cit-1",
    "grade": 11,
    "subject": "citizenship",
    "unitNumber": 1,
    "front": "What is the Rule of Law and its fundamental principles?",
    "back": "The principle that all people, institutions, and leaders are accountable to laws that are publicly promulgated, equally enforced, independently adjudicated, and consistent with international human rights standards.",
    "category": "concept"
  },
  {
    "id": "fc-cit-2",
    "grade": 12,
    "subject": "citizenship",
    "unitNumber": 1,
    "front": "What is the difference between Human Rights and Democratic Rights in the FDRE Constitution?",
    "back": "• Human Rights (Articles 14–28): Inalienable rights inherent to human existence (Right to life, security, liberty, freedom from torture).\n• Democratic Rights (Articles 29–44): Rights exercised through citizenship and political participation (Freedom of expression, assembly, voting).",
    "category": "definition"
  },
  {
    "id": "fc-agri-1",
    "grade": 11,
    "subject": "agriculture",
    "unitNumber": 1,
    "front": "What role do Rhizobium bacteria play in agricultural crop rotation?",
    "back": "Rhizobium bacteria form symbiotic nodules on the roots of leguminous plants (pulses like beans, peas, lentils) to fix atmospheric nitrogen (N2) into bioavailable ammonium, replenishing soil fertility naturally without synthetic fertilizers.",
    "category": "concept"
  },
  {
    "id": "fc-agri-2",
    "grade": 12,
    "subject": "agriculture",
    "unitNumber": 2,
    "front": "Name major indigenous cattle breeds of Ethiopia and their key adaptations.",
    "back": "• Boran: Famous for drought tolerance, beef yield, and heat resistance in semi-arid pastoral lowlands.\n• Fogera: Adapted to waterlogged floodplains around Lake Tana; good milk yield.\n• Sheko: Trypanotolerant humpless cattle adapted to tsetse-fly areas in southwestern rainforests.",
    "category": "concept"
  },
  {
    "id": "fc-phys-ext-1",
    "grade": 9,
    "subject": "physics",
    "unitNumber": 2,
    "front": "What is the formula for average velocity and average acceleration?",
    "back": "• Average Velocity: v_avg = Δs / Δt = (u + v) / 2\n• Average Acceleration: a = (v - u) / Δt (m/s²).",
    "category": "formula"
  },
  {
    "id": "fc-phys-ext-2",
    "grade": 9,
    "subject": "physics",
    "unitNumber": 3,
    "front": "What is the relationship between Mass and Weight on Earth?",
    "back": "W = m * g\nMass is constant scalar (kg); Weight is downward gravitational force vector (N). On Earth g ≈ 9.8 m/s².",
    "category": "formula"
  },
  {
    "id": "fc-phys-ext-3",
    "grade": 9,
    "subject": "physics",
    "unitNumber": 4,
    "front": "State the Law of Conservation of Mechanical Energy.",
    "back": "In an isolated system with only conservative forces: E_total = KE + PE = constant.\n(1/2)m*v1² + m*g*h1 = (1/2)m*v2² + m*g*h2.",
    "category": "concept"
  },
  {
    "id": "fc-phys-ext-4",
    "grade": 10,
    "subject": "physics",
    "unitNumber": 1,
    "front": "What is Pressure and the Hydrostatic Pressure equation?",
    "back": "• Pressure: P = F / A (Pascal, Pa = N/m²)\n• Liquid Pressure at depth h: P = ρ * g * h (where ρ is liquid density).",
    "category": "formula"
  },
  {
    "id": "fc-phys-ext-5",
    "grade": 10,
    "subject": "physics",
    "unitNumber": 2,
    "front": "What is the Linear Thermal Expansion formula for solids?",
    "back": "ΔL = α * L0 * ΔT\nwhere α is the coefficient of linear expansion (K⁻¹), L0 is initial length, ΔT is temperature change.",
    "category": "formula"
  },
  {
    "id": "fc-phys-ext-6",
    "grade": 10,
    "subject": "physics",
    "unitNumber": 3,
    "front": "What is Electric Current and Electric Potential Difference?",
    "back": "• Current: I = Q / t (Ampere, A = C/s)\n• Potential Difference: V = W / Q (Volt, V = J/C).",
    "category": "formula"
  },
  {
    "id": "fc-phys-ext-7",
    "grade": 10,
    "subject": "physics",
    "unitNumber": 4,
    "front": "State the Law of Reflection and the Focal Length of a spherical mirror.",
    "back": "• Law of Reflection: Angle of incidence equals angle of reflection (θ_i = θ_r).\n• Spherical Mirror: f = R / 2 (focal length is half the radius of curvature).",
    "category": "concept"
  },
  {
    "id": "fc-phys-ext-8",
    "grade": 11,
    "subject": "physics",
    "unitNumber": 1,
    "front": "What is the formula for Linear Momentum and Impulse?",
    "back": "• Momentum: p = m * v (kg·m/s)\n• Impulse: J = F * Δt = Δp = m*v - m*u (Impulse-Momentum Theorem).",
    "category": "formula"
  },
  {
    "id": "fc-phys-ext-9",
    "grade": 11,
    "subject": "physics",
    "unitNumber": 2,
    "front": "State the Principle of Conservation of Linear Momentum.",
    "back": "In an isolated system with no net external force: Σp_initial = Σp_final.\nm1*u1 + m2*u2 = m1*v1 + m2*v2.",
    "category": "concept"
  },
  {
    "id": "fc-phys-ext-10",
    "grade": 11,
    "subject": "physics",
    "unitNumber": 3,
    "front": "Compare Elastic and Inelastic Collisions.",
    "back": "• Elastic: Both momentum and kinetic energy are conserved.\n• Inelastic: Momentum is conserved, but kinetic energy is converted into heat/sound (perfectly inelastic: objects stick together).",
    "category": "definition"
  },
  {
    "id": "fc-phys-ext-11",
    "grade": 11,
    "subject": "physics",
    "unitNumber": 4,
    "front": "What is the Escape Velocity formula from a celestial body of mass M and radius R?",
    "back": "v_escape = √(2 * G * M / R)\nFor Earth, v_escape ≈ 11.2 km/s.",
    "category": "formula"
  },
  {
    "id": "fc-phys-ext-12",
    "grade": 11,
    "subject": "physics",
    "unitNumber": 5,
    "front": "What is the formula for Doppler Effect frequency shift for sound?",
    "back": "f_observed = f_source * [(v ± v_observer) / (v ∓ v_source)]\nwhere v is the speed of sound in air.",
    "category": "formula"
  },
  {
    "id": "fc-phys-ext-13",
    "grade": 12,
    "subject": "physics",
    "unitNumber": 1,
    "front": "What is Entropy and the Second Law of Thermodynamics?",
    "back": "Entropy (S) is a measure of molecular disorder. In any spontaneous process, the total entropy of the universe always increases: ΔS_universe > 0.",
    "category": "concept"
  },
  {
    "id": "fc-phys-ext-14",
    "grade": 12,
    "subject": "physics",
    "unitNumber": 2,
    "front": "What is the Transformer Equation for voltage and turns ratio?",
    "back": "V_p / V_s = N_p / N_s = I_s / I_p\n• Step-up: N_s > N_p (increases voltage, decreases current)\n• Step-down: N_s < N_p (decreases voltage, increases current).",
    "category": "formula"
  },
  {
    "id": "fc-phys-ext-15",
    "grade": 12,
    "subject": "physics",
    "unitNumber": 3,
    "front": "What are the three main types of Nuclear Radiation and their charges?",
    "back": "1. Alpha (α): Helium nucleus (⁴₂He), charge +2, low penetration (stopped by paper).\n2. Beta (β⁻): High-speed electron (⁰₋₁e), charge -1, moderate penetration.\n3. Gamma (γ): High-energy electromagnetic photon, charge 0, high penetration (stopped by dense lead).",
    "category": "definition"
  },
  {
    "id": "fc-phys-ext-16",
    "grade": 12,
    "subject": "physics",
    "unitNumber": 4,
    "front": "State the formulas for Capacitance and Energy Stored in a Capacitor.",
    "back": "• Capacitance: C = Q / V = ε * (A / d)\n• Energy Stored: U = (1/2) * C * V² = (1/2) * Q * V = Q² / (2C) (Joules).",
    "category": "formula"
  },
  {
    "id": "fc-chem-ext-1",
    "grade": 9,
    "subject": "chemistry",
    "unitNumber": 1,
    "front": "Define Mass Number (A) and Atomic Number (Z).",
    "back": "• Atomic Number (Z) = Number of protons in the nucleus.\n• Mass Number (A) = Protons + Neutrons (A = Z + N).\n• Isotopes have identical Z but different A.",
    "category": "definition"
  },
  {
    "id": "fc-chem-ext-2",
    "grade": 9,
    "subject": "chemistry",
    "unitNumber": 2,
    "front": "Compare Ionic, Covalent, and Metallic bonds.",
    "back": "• Ionic: Electrostatic attraction between positive cations and negative anions formed by electron transfer (metals + nonmetals).\n• Covalent: Sharing of electron pairs between nonmetal atoms.\n• Metallic: Attraction between metal cations and a delocalized sea of free electrons.",
    "category": "concept"
  },
  {
    "id": "fc-chem-ext-3",
    "grade": 10,
    "subject": "chemistry",
    "unitNumber": 1,
    "front": "How do you calculate Percentage Composition by mass of an element in a compound?",
    "back": "% Element = [(number of atoms of element × molar mass of element) / Molar Mass of Compound] × 100%.",
    "category": "formula"
  },
  {
    "id": "fc-chem-ext-4",
    "grade": 10,
    "subject": "chemistry",
    "unitNumber": 2,
    "front": "State the four main types of Chemical Reactions.",
    "back": "1. Synthesis (Combination): A + B → AB\n2. Decomposition: AB → A + B\n3. Single Replacement: A + BC → AC + B\n4. Double Replacement (Metathesis): AB + CD → AD + CB.",
    "category": "concept"
  },
  {
    "id": "fc-chem-ext-5",
    "grade": 10,
    "subject": "chemistry",
    "unitNumber": 3,
    "front": "What are Endothermic and Exothermic reactions in terms of Enthalpy (ΔH)?",
    "back": "• Exothermic: Releases heat to surroundings; ΔH < 0 (products have lower energy than reactants).\n• Endothermic: Absorbs heat from surroundings; ΔH > 0 (products have higher energy than reactants).",
    "category": "concept"
  },
  {
    "id": "fc-chem-ext-6",
    "grade": 11,
    "subject": "chemistry",
    "unitNumber": 1,
    "front": "State Graham’s Law of Effusion.",
    "back": "Rate1 / Rate2 = √(M2 / M1)\nLighter gases effuse/diffuse faster than heavier gases at the same temperature.",
    "category": "formula"
  },
  {
    "id": "fc-chem-ext-7",
    "grade": 11,
    "subject": "chemistry",
    "unitNumber": 2,
    "front": "What are the formulas for Boiling Point Elevation and Freezing Point Depression?",
    "back": "• ΔT_b = i * K_b * m (Boiling point increases)\n• ΔT_f = i * K_f * m (Freezing point decreases)\nwhere i = van 't Hoff factor, m = molality.",
    "category": "formula"
  },
  {
    "id": "fc-chem-ext-8",
    "grade": 11,
    "subject": "chemistry",
    "unitNumber": 3,
    "front": "State the Arrhenius Equation for temperature dependence of reaction rate.",
    "back": "k = A * e^(-E_a / (R * T))\nln(k2 / k1) = (E_a / R) * (1/T1 - 1/T2)\nwhere E_a = activation energy (J/mol).",
    "category": "formula"
  },
  {
    "id": "fc-chem-ext-9",
    "grade": 12,
    "subject": "chemistry",
    "unitNumber": 1,
    "front": "What is the Equilibrium Constant expression (Kc) for aA + bB ⇌ cC + dD?",
    "back": "Kc = ([C]^c * [D]^d) / ([A]^a * [B]^b)\nPure solids (s) and pure liquids (l) are excluded from the equilibrium expression.",
    "category": "formula"
  },
  {
    "id": "fc-chem-ext-10",
    "grade": 12,
    "subject": "chemistry",
    "unitNumber": 2,
    "front": "What is the relationship between Kp and Kc for gas-phase reactions?",
    "back": "Kp = Kc * (R * T)^(Δn)\nwhere Δn = (moles of gaseous products) - (moles of gaseous reactants).",
    "category": "formula"
  },
  {
    "id": "fc-chem-ext-11",
    "grade": 12,
    "subject": "chemistry",
    "unitNumber": 3,
    "front": "State Faraday’s First Law of Electrolysis.",
    "back": "m = Z * I * t = (M * I * t) / (n * F)\nwhere m = mass deposited (g), I = current (A), t = time (s), F = 96,500 C/mol (Faraday constant), n = electrons transferred.",
    "category": "formula"
  },
  {
    "id": "fc-chem-ext-12",
    "grade": 12,
    "subject": "chemistry",
    "unitNumber": 4,
    "front": "What is the difference between Saturated, Unsaturated, and Aromatic hydrocarbons?",
    "back": "• Saturated: Alkanes (C_n H_2n+2), single C-C bonds only.\n• Unsaturated: Alkenes (C=C, C_n H_2n) and Alkynes (C≡C, C_n H_2n-2).\n• Aromatic: Contain delocalized pi-electron benzene ring system (C6H6).",
    "category": "definition"
  },
  {
    "id": "fc-bio-ext-1",
    "grade": 9,
    "subject": "biology",
    "unitNumber": 1,
    "front": "What is the function of Mitochondria, Ribosomes, and Chloroplasts?",
    "back": "• Mitochondria: Site of aerobic respiration and ATP generation (powerhouse of cell).\n• Ribosomes: Site of protein synthesis.\n• Chloroplasts: Site of photosynthesis in plants, containing chlorophyll.",
    "category": "definition"
  },
  {
    "id": "fc-bio-ext-2",
    "grade": 9,
    "subject": "biology",
    "unitNumber": 2,
    "front": "Name the 4 stages of Mitosis in order.",
    "back": "1. Prophase (chromosomes condense, spindle forms)\n2. Metaphase (chromosomes align at equator/metaphase plate)\n3. Anaphase (sister chromatids pulled to opposite poles)\n4. Telophase (nuclear envelopes reform, cytokinesis follows).",
    "category": "concept"
  },
  {
    "id": "fc-bio-ext-3",
    "grade": 10,
    "subject": "biology",
    "unitNumber": 1,
    "front": "What are the two main vascular tissues in plants and their transport roles?",
    "back": "• Xylem: Transports water and dissolved mineral ions upward from roots to leaves (one-way flow; dead hollow vessels).\n• Phloem: Transports sucrose and amino acids bidirectionally between source and sink (translocation; living cells).",
    "category": "concept"
  },
  {
    "id": "fc-bio-ext-4",
    "grade": 10,
    "subject": "biology",
    "unitNumber": 2,
    "front": "What is the difference between Gene and Allele?",
    "back": "• Gene: A segment of DNA on a chromosome that codes for a specific polypeptide or trait.\n• Allele: An alternative variant form of a gene located at the same locus (e.g., allele B for black hair, b for blonde).",
    "category": "definition"
  },
  {
    "id": "fc-bio-ext-5",
    "grade": 10,
    "subject": "biology",
    "unitNumber": 3,
    "front": "Distinguish between Genotype and Phenotype.",
    "back": "• Genotype: The genetic makeup or allele combination of an organism (e.g., BB, Bb, bb).\n• Phenotype: The observable physical or physiological characteristic resulting from genotype and environment.",
    "category": "definition"
  },
  {
    "id": "fc-bio-ext-6",
    "grade": 11,
    "subject": "biology",
    "unitNumber": 1,
    "front": "Explain Incomplete Dominance vs Codominance.",
    "back": "• Incomplete Dominance: Heterozygote displays an intermediate blended phenotype (e.g., Red × White → Pink flowers).\n• Codominance: Both alleles are equally and simultaneously expressed in heterozygote (e.g., ABO blood type IA IB → Type AB).",
    "category": "concept"
  },
  {
    "id": "fc-bio-ext-7",
    "grade": 11,
    "subject": "biology",
    "unitNumber": 2,
    "front": "What are Sex-Linked Genes and give two common examples in humans.",
    "back": "Genes located on the sex chromosomes (usually the X chromosome).\nExamples: Red-green color blindness and Hemophilia (recessive alleles expressed much more frequently in males XY).",
    "category": "concept"
  },
  {
    "id": "fc-bio-ext-8",
    "grade": 11,
    "subject": "biology",
    "unitNumber": 3,
    "front": "Describe the structure and functional parts of a Neuron.",
    "back": "• Dendrites: Receive incoming chemical signals from other neurons.\n• Cell Body (Soma): Contains nucleus and organelles.\n• Axon: Conducts electrical action potentials away from soma.\n• Myelin Sheath: Fatty insulating layer that accelerates nerve impulse transmission via saltatory conduction.",
    "category": "definition"
  },
  {
    "id": "fc-bio-ext-9",
    "grade": 11,
    "subject": "biology",
    "unitNumber": 4,
    "front": "What is the function of the Nephron in human kidneys?",
    "back": "The basic functional unit of the kidney responsible for:\n1. Ultrafiltration in the glomerulus/Bowman's capsule\n2. Selective reabsorption in convoluted tubules\n3. Osmoregulation and urine concentration in the Loop of Henle.",
    "category": "concept"
  },
  {
    "id": "fc-bio-ext-10",
    "grade": 12,
    "subject": "biology",
    "unitNumber": 1,
    "front": "What is the difference between DNA and RNA in structure and bases?",
    "back": "• DNA: Double-stranded helix; Deoxyribose sugar; Nitrogenous bases: A, T, C, G (Adenine pairs with Thymine).\n• RNA: Single-stranded; Ribose sugar; Nitrogenous bases: A, U, C, G (Adenine pairs with Uracil).",
    "category": "concept"
  },
  {
    "id": "fc-bio-ext-11",
    "grade": 12,
    "subject": "biology",
    "unitNumber": 2,
    "front": "What is Recombinant DNA technology and what do Restriction Enzymes do?",
    "back": "• Recombinant DNA: DNA created by combining genetic material from different sources.\n• Restriction Endonucleases: Molecular scissors that recognize and cut DNA at specific palindromic nucleotide sequences.\n• DNA Ligase: Molecular glue that seals phosphodiester bonds.",
    "category": "concept"
  },
  {
    "id": "fc-bio-ext-12",
    "grade": 12,
    "subject": "biology",
    "unitNumber": 3,
    "front": "What are the three main types of Ecological Pyramids?",
    "back": "1. Pyramid of Numbers (count of individuals at each trophic level)\n2. Pyramid of Biomass (total dry mass of organic matter at each level)\n3. Pyramid of Energy (always upright, obeys 10% energy transfer rule from one trophic level to the next).",
    "category": "concept"
  },
  {
    "id": "fc-math-ext-1",
    "grade": 9,
    "subject": "mathematics",
    "unitNumber": 1,
    "front": "What are the formulas for Perimeter and Area of basic shapes?",
    "back": "• Rectangle: P = 2(l + w), Area = l * w\n• Triangle: Area = (1/2) * base * height\n• Circle: Circumference = 2πr, Area = πr²\n• Trapezoid: Area = (1/2) * (a + b) * h.",
    "category": "formula"
  },
  {
    "id": "fc-math-ext-2",
    "grade": 9,
    "subject": "mathematics",
    "unitNumber": 2,
    "front": "What are the formulas for Volume of Sphere, Cylinder, and Cone?",
    "back": "• Sphere: V = (4/3) * π * r³ (Surface Area = 4πr²)\n• Cylinder: V = π * r² * h (Lateral Area = 2πrh)\n• Cone: V = (1/3) * π * r² * h.",
    "category": "formula"
  },
  {
    "id": "fc-math-ext-3",
    "grade": 10,
    "subject": "mathematics",
    "unitNumber": 1,
    "front": "State the Midpoint Formula and Section Formula in Cartesian coordinates.",
    "back": "• Midpoint between (x1, y1) and (x2, y2): M = ((x1 + x2)/2, (y1 + y2)/2)\n• Internal division in ratio m:n: P = ((m*x2 + n*x1)/(m + n), (m*y2 + n*y1)/(m + n)).",
    "category": "formula"
  },
  {
    "id": "fc-math-ext-4",
    "grade": 10,
    "subject": "mathematics",
    "unitNumber": 2,
    "front": "What are the values of sin, cos, tan for special angles 0°, 30°, 45°, 60°, 90°?",
    "back": "• sin: 0°=0, 30°=1/2, 45°=√2/2, 60°=√3/2, 90°=1\n• cos: 0°=1, 30°=√3/2, 45°=√2/2, 60°=1/2, 90°=0\n• tan: 0°=0, 30°=1/√3, 45°=1, 60°=√3, 90°=undefined.",
    "category": "formula"
  },
  {
    "id": "fc-math-ext-5",
    "grade": 11,
    "subject": "mathematics",
    "unitNumber": 1,
    "front": "State the Arithmetic Mean and Geometric Mean formulas.",
    "back": "• Arithmetic Mean of two numbers a and b: AM = (a + b) / 2\n• Geometric Mean of positive numbers a and b: GM = √(a * b)\n(Note: AM ≥ GM always).",
    "category": "formula"
  },
  {
    "id": "fc-math-ext-6",
    "grade": 11,
    "subject": "mathematics",
    "unitNumber": 2,
    "front": "What is the Binomial Theorem formula for (a + b)^n?",
    "back": "(a + b)^n = Σ [k=0 to n] (n k) * a^(n-k) * b^k\nwhere (n k) = n! / [k!(n - k)!].",
    "category": "formula"
  },
  {
    "id": "fc-math-ext-7",
    "grade": 11,
    "subject": "mathematics_natural",
    "unitNumber": 1,
    "front": "What is the Angle Addition formula for Sine and Cosine?",
    "back": "• sin(A ± B) = sin(A)cos(B) ± cos(A)sin(B)\n• cos(A ± B) = cos(A)cos(B) ∓ sin(A)sin(B).",
    "category": "formula"
  },
  {
    "id": "fc-math-ext-8",
    "grade": 11,
    "subject": "mathematics_natural",
    "unitNumber": 2,
    "front": "What is the standard equation of a Circle, Parabola, and Ellipse centered at (0,0)?",
    "back": "• Circle: x² + y² = r²\n• Parabola: y² = 4ax (focus at (a, 0), directrix x = -a)\n• Ellipse: (x² / a²) + (y² / b²) = 1 (foci at (±c, 0) where c² = a² - b²).",
    "category": "formula"
  },
  {
    "id": "fc-math-ext-9",
    "grade": 12,
    "subject": "mathematics_natural",
    "unitNumber": 1,
    "front": "What is L'Hôpital's Rule for evaluating limits?",
    "back": "If lim f(x)/g(x) produces an indeterminate form 0/0 or ±∞/±∞, then:\nlim [f(x) / g(x)] = lim [f'(x) / g'(x)], provided the limit on the right exists.",
    "category": "formula"
  },
  {
    "id": "fc-math-ext-10",
    "grade": 12,
    "subject": "mathematics_natural",
    "unitNumber": 2,
    "front": "What is the relationship between position, velocity, and acceleration in Calculus?",
    "back": "• Position: s(t)\n• Velocity: v(t) = s'(t) = ds/dt\n• Acceleration: a(t) = v'(t) = s''(t) = d²s/dt²\n• Displacement: s(t2) - s(t1) = ∫[t1 to t2] v(t) dt.",
    "category": "concept"
  },
  {
    "id": "fc-math-ext-11",
    "grade": 12,
    "subject": "mathematics_natural",
    "unitNumber": 3,
    "front": "State the Integral Power Rule and integral of 1/x.",
    "back": "• ∫ x^n dx = (x^(n+1) / (n + 1)) + C, for n ≠ -1\n• ∫ (1 / x) dx = ln|x| + C\n• ∫ e^(kx) dx = (1/k) * e^(kx) + C.",
    "category": "formula"
  },
  {
    "id": "fc-math-ext-12",
    "grade": 12,
    "subject": "mathematics",
    "unitNumber": 1,
    "front": "What are the formulas for Sample Mean, Variance, and Standard Deviation?",
    "back": "• Mean: x̄ = (Σ x_i) / n\n• Variance: s² = Σ (x_i - x̄)² / (n - 1)\n• Standard Deviation: s = √[Variance].",
    "category": "formula"
  },
  {
    "id": "fc-math-ext-13",
    "grade": 12,
    "subject": "mathematics",
    "unitNumber": 2,
    "front": "State the Addition Rule and Multiplication Rule of Probability.",
    "back": "• Addition Rule: P(A ∪ B) = P(A) + P(B) - P(A ∩ B)\n(If mutually exclusive: P(A ∪ B) = P(A) + P(B))\n• Conditional Probability: P(A|B) = P(A ∩ B) / P(B)\n• Independent events: P(A ∩ B) = P(A) * P(B).",
    "category": "formula"
  },
  {
    "id": "fc-econ-ext-1",
    "grade": 11,
    "subject": "economics",
    "unitNumber": 1,
    "front": "What are the 4 Factors of Production and their factor payments?",
    "back": "1. Land → Rent\n2. Labor → Wages\n3. Capital → Interest\n4. Entrepreneurship → Profit.",
    "category": "definition"
  },
  {
    "id": "fc-econ-ext-2",
    "grade": 11,
    "subject": "economics",
    "unitNumber": 2,
    "front": "Compare Perfect Competition and Pure Monopoly.",
    "back": "• Perfect Competition: Many buyers/sellers, homogeneous products, price takers, zero economic profit in long run, free entry/exit.\n• Monopoly: Single seller, unique product with no close substitutes, price maker, high barriers to entry, potential long-run economic profit.",
    "category": "concept"
  },
  {
    "id": "fc-econ-ext-3",
    "grade": 11,
    "subject": "economics",
    "unitNumber": 3,
    "front": "What are Price Ceiling and Price Floor and where must they be set to be effective?",
    "back": "• Price Ceiling: Maximum legal price set BELOW equilibrium (causes market shortage, e.g., rent control).\n• Price Floor: Minimum legal price set ABOVE equilibrium (causes market surplus, e.g., minimum wage).",
    "category": "concept"
  },
  {
    "id": "fc-econ-ext-4",
    "grade": 11,
    "subject": "economics",
    "unitNumber": 4,
    "front": "What is Cross-Price Elasticity of Demand (Exy)?",
    "back": "Exy = (% Change in Q_x) / (% Change in Price_y)\n• Exy > 0: Substitute goods (e.g., tea and coffee)\n• Exy < 0: Complementary goods (e.g., cars and fuel)\n• Exy = 0: Unrelated goods.",
    "category": "formula"
  },
  {
    "id": "fc-econ-ext-5",
    "grade": 11,
    "subject": "economics",
    "unitNumber": 5,
    "front": "What is Income Elasticity of Demand (Ei)?",
    "back": "Ei = (% Change in Q_demanded) / (% Change in Income)\n• Ei > 0: Normal Good (if Ei > 1, Luxury Good)\n• Ei < 0: Inferior Good (demand falls as income rises).",
    "category": "formula"
  },
  {
    "id": "fc-econ-ext-6",
    "grade": 12,
    "subject": "economics",
    "unitNumber": 1,
    "front": "What is the Money Multiplier formula?",
    "back": "Money Multiplier (m) = 1 / Required Reserve Ratio (RRR)\nTotal Potential Money Supply Created = Initial Excess Deposit × (1 / RRR).",
    "category": "formula"
  },
  {
    "id": "fc-econ-ext-7",
    "grade": 12,
    "subject": "economics",
    "unitNumber": 2,
    "front": "Explain the three functions of Money.",
    "back": "1. Medium of Exchange: Eliminates double coincidence of wants in barter.\n2. Unit of Account: Standard numerical measure of economic value / prices.\n3. Store of Value: Allows saving purchasing power for future consumption.",
    "category": "definition"
  },
  {
    "id": "fc-econ-ext-8",
    "grade": 12,
    "subject": "economics",
    "unitNumber": 3,
    "front": "What is Comparative Advantage and the Law of Comparative Advantage?",
    "back": "A country has comparative advantage in producing a good if it can produce it at a lower opportunity cost than another country. Specialization and free trade based on comparative advantage maximizes global output and consumption.",
    "category": "concept"
  },
  {
    "id": "fc-econ-ext-9",
    "grade": 12,
    "subject": "economics",
    "unitNumber": 4,
    "front": "What are the components of the Balance of Payments (BOP)?",
    "back": "1. Current Account (Trade balance of goods & services, net income from abroad, net transfers)\n2. Capital and Financial Account (Foreign direct investment FDI, portfolio investment, reserve assets).\nIn equilibrium: Current Account + Capital/Financial Account = 0.",
    "category": "definition"
  },
  {
    "id": "fc-hist-ext-1",
    "grade": 9,
    "subject": "history",
    "unitNumber": 1,
    "front": "What was the ancient Kingdom of Punt and its historical trade relations?",
    "back": "An ancient trading civilization located in the Horn of Africa (c. 3rd to 1st millennium BC) known from Egyptian hieroglyphic records for trading frankincense, myrrh, gold, ebony, and ivory with Pharaonic Egypt (e.g., Queen Hatshepsut's expedition).",
    "category": "concept"
  },
  {
    "id": "fc-hist-ext-2",
    "grade": 9,
    "subject": "history",
    "unitNumber": 2,
    "front": "What was the First Hijra in Islamic history and its connection to Ethiopia?",
    "back": "In 615 AD, early companions and family of Prophet Muhammad sought asylum from persecution in the Aksumite Kingdom, where Christian King Armah (Al-Najashi) granted them sanctuary and protection at Negash.",
    "category": "date_fact"
  },
  {
    "id": "fc-hist-ext-3",
    "grade": 10,
    "subject": "history",
    "unitNumber": 1,
    "front": "Who was Imam Ahmad ibn Ibrahim al-Ghazi (Ahmad Gragn) and when did the conflict occur?",
    "back": "Leader of the Adal Sultanate who launched a major military campaign against the Christian highland kingdom between 1529 and 1543 AD, fundamentally altering regional demographics until his defeat at the Battle of Wayna Daga (1543).",
    "category": "date_fact"
  },
  {
    "id": "fc-hist-ext-4",
    "grade": 11,
    "subject": "history",
    "unitNumber": 1,
    "front": "What were the major defensive battles fought by Emperor Yohannes IV?",
    "back": "• Battle of Gundet (1875) & Battle of Gura (1876): Defeated Egyptian invading armies.\n• Battle of Kufit (1885): Ras Alula defeated Mahdist forces.\n• Battle of Dogali (1887): Ras Alula defeated Italian battalion.\n• Battle of Metemma (1889): Yohannes IV fell defending against Mahdists.",
    "category": "date_fact"
  },
  {
    "id": "fc-hist-ext-5",
    "grade": 11,
    "subject": "history",
    "unitNumber": 2,
    "front": "What was the strategic role of Empress Taytu Betul during the Adwa campaign?",
    "back": "Empress Taytu devised the siege tactic at the Battle of Mekelle (cutting off Italian water supplies at Endeyesus fortress) and led her own 6,000-strong army to victory at the Battle of Adwa in 1896.",
    "category": "concept"
  },
  {
    "id": "fc-hist-ext-6",
    "grade": 12,
    "subject": "history",
    "unitNumber": 1,
    "front": "When was the League of Nations founded and why did it fail to protect Ethiopia in 1935?",
    "back": "Founded in 1919 after WWI to ensure collective security. Failed in 1935 when Britain and France appeased Fascist Italy, imposing ineffective economic sanctions that excluded oil, leading to the collapse of the League's credibility.",
    "category": "concept"
  },
  {
    "id": "fc-hist-ext-7",
    "grade": 12,
    "subject": "history",
    "unitNumber": 2,
    "front": "When did the Ethiopian Revolution break out and what brought the end of the Solomonic Monarchy?",
    "back": "February 1974 mass protests led to the deposition of Emperor Haile Selassie on September 12, 1974, by the military committee known as the Derg, ending centuries of imperial rule.",
    "category": "date_fact"
  },
  {
    "id": "fc-geo-ext-1",
    "grade": 9,
    "subject": "geography",
    "unitNumber": 1,
    "front": "Define Latitude and Longitude.",
    "back": "• Latitude (Parallels): Angular distance north or south of the Equator (0° to 90°).\n• Longitude (Meridians): Angular distance east or west of the Prime Meridian at Greenwich, London (0° to 180°).",
    "category": "definition"
  },
  {
    "id": "fc-geo-ext-2",
    "grade": 9,
    "subject": "geography",
    "unitNumber": 2,
    "front": "Explain the three main types of Rainfall.",
    "back": "1. Convectional: Sun heats ground, warm moist air rises, cools and condenses (common in tropical afternoons).\n2. Orographic (Relief): Moist air forced to rise over mountain barrier, cools on windward side; leeward side forms rain shadow.\n3. Frontal (Cyclonic): Warm air mass meets cold air mass and rises over it.",
    "category": "concept"
  },
  {
    "id": "fc-geo-ext-3",
    "grade": 10,
    "subject": "geography",
    "unitNumber": 1,
    "front": "What are the main causes and consequences of Soil Erosion in the Ethiopian highlands?",
    "back": "• Causes: Steep slopes, heavy torrential rains, deforestation, overgrazing, and traditional farming techniques.\n• Consequences: Loss of fertile topsoil, siltation of hydroelectric dams, decline in crop yields, desertification.",
    "category": "concept"
  },
  {
    "id": "fc-geo-ext-4",
    "grade": 11,
    "subject": "geography",
    "unitNumber": 1,
    "front": "What is the Inter-Tropical Convergence Zone (ITCZ) and how does it determine Ethiopian rainfall?",
    "back": "The low-pressure belt near the equator where northeast and southeast trade winds converge. Its northward movement in June–August brings moist Atlantic/Indian Ocean air producing the Kiremt (main rainy season); its southward shift brings dry Bega season.",
    "category": "concept"
  },
  {
    "id": "fc-geo-ext-5",
    "grade": 11,
    "subject": "geography",
    "unitNumber": 2,
    "front": "Name the major soil types of Ethiopia.",
    "back": "• Nitosols (Red basaltic soils): Deep, fertile, well-drained, dominant in southwest highlands (coffee/grain crops).\n• Vertisols (Black cotton soils): Heavy clay, high water retention, crack when dry, fertile.\n• Fluvisols: Alluvial soils along major river valleys.",
    "category": "definition"
  },
  {
    "id": "fc-geo-ext-6",
    "grade": 12,
    "subject": "geography",
    "unitNumber": 1,
    "front": "What are the main agro-ecological strategies for sustainable soil conservation in Ethiopia?",
    "back": "1. Terracing on steep hillsides\n2. Contour ploughing across slopes\n3. Afforestation and Reforestation (e.g., Green Legacy Initiative)\n4. Agroforestry (integrating trees with crops)\n5. Strip cropping and check dams.",
    "category": "concept"
  },
  {
    "id": "fc-eng-ext-1",
    "grade": 9,
    "subject": "english",
    "unitNumber": 1,
    "front": "What are Phrasal Verbs and give three examples with 'Look'?",
    "back": "A verb combined with a preposition or adverb that creates a unique idiomatic meaning:\n• Look after: To take care of someone/something\n• Look forward to: To anticipate with pleasure\n• Look up to: To admire and respect someone.",
    "category": "definition"
  },
  {
    "id": "fc-eng-ext-2",
    "grade": 10,
    "subject": "english",
    "unitNumber": 1,
    "front": "What is the difference between Gerund and Infinitive?",
    "back": "• Gerund: The '-ing' form of a verb acting as a noun (e.g., 'Swimming is great exercise').\n• Infinitive: 'to + base verb' (e.g., 'I want to swim'). Certain verbs take only gerunds (enjoy, avoid, suggest), others take infinitives (decide, promise, hope).",
    "category": "concept"
  },
  {
    "id": "fc-eng-ext-3",
    "grade": 11,
    "subject": "english",
    "unitNumber": 1,
    "front": "Explain Modal Verbs of Probability: Must, Can't, Might/May.",
    "back": "• Must: 95%+ certainty of truth (e.g., 'He has studied all day; he must be tired').\n• Can't: 95%+ certainty of impossibility (e.g., 'She can't be asleep; the music is blasting').\n• Might / May / Could: 50% possibility (e.g., 'It might rain tomorrow').",
    "category": "concept"
  },
  {
    "id": "fc-eng-ext-4",
    "grade": 12,
    "subject": "english",
    "unitNumber": 1,
    "front": "What are Common Transition Connectors for Contrast, Addition, and Cause?",
    "back": "• Contrast: However, nevertheless, on the other hand, in spite of / despite (+ noun/-ing).\n• Addition: Furthermore, moreover, in addition, besides.\n• Cause & Effect: Therefore, consequently, as a result, owing to / due to.",
    "category": "concept"
  },
  {
    "id": "fc-it-ext-1",
    "grade": 9,
    "subject": "it",
    "unitNumber": 1,
    "front": "What is the difference between RAM and ROM?",
    "back": "• RAM (Random Access Memory): Volatile read-and-write primary memory that loses contents when powered off; stores active programs.\n• ROM (Read Only Memory): Non-volatile permanent memory containing startup BIOS/firmware; retains data when power is disconnected.",
    "category": "definition"
  },
  {
    "id": "fc-it-ext-2",
    "grade": 10,
    "subject": "it",
    "unitNumber": 1,
    "front": "What are the truth tables for Basic Logic Gates: AND, OR, NOT?",
    "back": "• AND Gate: Output 1 only if BOTH inputs are 1 (A · B).\n• OR Gate: Output 1 if AT LEAST ONE input is 1 (A + B).\n• NOT Gate (Inverter): Inverts the input (0 → 1, 1 → 0).\n• NAND / NOR: Universal gates capable of implementing any boolean function.",
    "category": "concept"
  },
  {
    "id": "fc-it-ext-3",
    "grade": 11,
    "subject": "it",
    "unitNumber": 1,
    "front": "In Python programming, compare Lists, Tuples, and Dictionaries.",
    "back": "• List: Ordered, mutable, indexed by integer [1, 2, 'apple'].\n• Tuple: Ordered, immutable (cannot be altered), (1, 2, 3).\n• Dictionary: Key-value pairs, unordered/insertion-ordered, keys must be unique { 'name': 'Abebe', 'age': 18 }.",
    "category": "definition"
  },
  {
    "id": "fc-it-ext-4",
    "grade": 12,
    "subject": "it",
    "unitNumber": 1,
    "front": "What is Big-O Notation and common time complexities?",
    "back": "Big-O describes upper bound algorithmic efficiency as input size n grows:\n• O(1): Constant time (hash table lookup)\n• O(log n): Logarithmic (binary search)\n• O(n): Linear (simple sequential scan)\n• O(n log n): Efficient sorting (Merge sort, Quick sort)\n• O(n²): Quadratic (nested loops, Bubble sort).",
    "category": "concept"
  },
  {
    "id": "fc-sci-ext-1",
    "grade": 9,
    "subject": "citizenship",
    "unitNumber": 1,
    "front": "What is Citizenship and what are the primary methods of acquiring it?",
    "back": "• By Birth (Jus sanguinis - bloodline/descent, or Jus soli - birthplace)\n• By Naturalization (legal process through residency, marriage, or petition according to constitutional law).",
    "category": "definition"
  },
  {
    "id": "fc-sci-ext-2",
    "grade": 10,
    "subject": "citizenship",
    "unitNumber": 1,
    "front": "What is Patriotism and how is it distinguished from Chauvinism?",
    "back": "• Patriotism: Devotion, love, and loyalty to one’s country combined with respect for human rights, diversity, and other nations.\n• Chauvinism: Blind, aggressive, and intolerant nationalism that looks down upon other cultures or groups.",
    "category": "concept"
  },
  {
    "id": "fc-sci-ext-3",
    "grade": 11,
    "subject": "agriculture",
    "unitNumber": 1,
    "front": "What are the essential Plant Macronutrients (NPK) and their roles?",
    "back": "1. Nitrogen (N): Promotes vegetative leafy growth and chlorophyll formation.\n2. Phosphorus (P): Stimulates root development and flowering/seed formation.\n3. Potassium (K): Enhances disease resistance, water regulation, and enzyme activation.",
    "category": "concept"
  },
  {
    "id": "fc-sci-ext-4",
    "grade": 12,
    "subject": "agriculture",
    "unitNumber": 1,
    "front": "What is Organic Farming and what are its key principles?",
    "back": "An ecological production management system that promotes soil biodiversity and excludes synthetic chemical fertilizers, pesticides, GMOs, and artificial growth hormones in favor of composting, green manure, and biological pest control.",
    "category": "concept"
  },
  {
    "id": "fc-phys-g9-u1-216",
    "grade": 9,
    "subject": "physics",
    "unitNumber": 1,
    "front": "What is the SI base unit for thermodynamic temperature?",
    "back": "Kelvin (K). Absolute zero is 0 K or -273.15 °C.",
    "category": "definition"
  },
  {
    "id": "fc-phys-g9-u1-217",
    "grade": 9,
    "subject": "physics",
    "unitNumber": 1,
    "front": "Define precision vs accuracy in scientific measurements.",
    "back": "Accuracy refers to how close a measured value is to the true value. Precision refers to the closeness of agreement among repeated measurements.",
    "category": "concept"
  },
  {
    "id": "fc-phys-g9-u1-218",
    "grade": 9,
    "subject": "physics",
    "unitNumber": 1,
    "front": "What are the 7 SI base quantities and their units?",
    "back": "Length (m), Mass (kg), Time (s), Electric current (A), Temperature (K), Amount of substance (mol), Luminous intensity (cd).",
    "category": "definition"
  },
  {
    "id": "fc-phys-g9-u2-219",
    "grade": 9,
    "subject": "physics",
    "unitNumber": 2,
    "front": "What is the formula for average velocity?",
    "back": "v_avg = Δx / Δt = (x_f - x_i) / (t_f - t_i), measured in m/s.",
    "category": "formula"
  },
  {
    "id": "fc-phys-g9-u2-220",
    "grade": 9,
    "subject": "physics",
    "unitNumber": 2,
    "front": "State the three kinematic equations for uniform acceleration.",
    "back": "1. v = u + at\n2. s = ut + (1/2)at²\n3. v² = u² + 2as",
    "category": "formula"
  },
  {
    "id": "fc-phys-g9-u2-221",
    "grade": 9,
    "subject": "physics",
    "unitNumber": 2,
    "front": "What does the slope of a velocity-time graph represent?",
    "back": "The slope of a velocity-time graph represents instantaneous acceleration (a = dv/dt).",
    "category": "concept"
  },
  {
    "id": "fc-phys-g9-u2-222",
    "grade": 9,
    "subject": "physics",
    "unitNumber": 2,
    "front": "What does the area under a velocity-time graph represent?",
    "back": "The area under a velocity-time graph represents the total displacement (Δx).",
    "category": "concept"
  },
  {
    "id": "fc-phys-g9-u3-223",
    "grade": 9,
    "subject": "physics",
    "unitNumber": 3,
    "front": "State Newton's First Law of Motion (Law of Inertia).",
    "back": "An object will remain at rest or in uniform motion in a straight line unless acted upon by a net external force.",
    "category": "concept"
  },
  {
    "id": "fc-phys-g9-u3-224",
    "grade": 9,
    "subject": "physics",
    "unitNumber": 3,
    "front": "State Newton's Second Law of Motion formula.",
    "back": "F_net = m * a\nwhere F is net force in Newtons (N), m is mass in kg, and a is acceleration in m/s².",
    "category": "formula"
  },
  {
    "id": "fc-phys-g9-u3-225",
    "grade": 9,
    "subject": "physics",
    "unitNumber": 3,
    "front": "State Newton's Third Law of Motion.",
    "back": "For every action, there is an equal and opposite reaction (F_AB = -F_BA). Forces always occur in matched action-reaction pairs acting on different bodies.",
    "category": "concept"
  },
  {
    "id": "fc-phys-g9-u3-226",
    "grade": 9,
    "subject": "physics",
    "unitNumber": 3,
    "front": "What is the formula for frictional force?",
    "back": "f = μ * N\nwhere μ is the coefficient of friction and N is the normal force. (μ_s > μ_k)",
    "category": "formula"
  },
  {
    "id": "fc-phys-g9-u4-227",
    "grade": 9,
    "subject": "physics",
    "unitNumber": 4,
    "front": "Define Work in physics and its formula.",
    "back": "Work is done when a force causes displacement.\nW = F * d * cos(θ) (Joules, J = N·m).",
    "category": "formula"
  },
  {
    "id": "fc-phys-g9-u4-228",
    "grade": 9,
    "subject": "physics",
    "unitNumber": 4,
    "front": "State the Kinetic Energy formula.",
    "back": "KE = (1/2) * m * v² (Joules, J).",
    "category": "formula"
  },
  {
    "id": "fc-phys-g9-u4-229",
    "grade": 9,
    "subject": "physics",
    "unitNumber": 4,
    "front": "State the Gravitational Potential Energy formula near Earth's surface.",
    "back": "PE = m * g * h\nwhere m = mass (kg), g ≈ 9.8 m/s² (or 10 m/s²), h = height (m).",
    "category": "formula"
  },
  {
    "id": "fc-phys-g9-u4-230",
    "grade": 9,
    "subject": "physics",
    "unitNumber": 4,
    "front": "State the Principle of Conservation of Mechanical Energy.",
    "back": "In an isolated system with only conservative forces: Total Mechanical Energy E = KE + PE = constant.",
    "category": "concept"
  },
  {
    "id": "fc-phys-g9-u4-231",
    "grade": 9,
    "subject": "physics",
    "unitNumber": 4,
    "front": "Define Power and its formula.",
    "back": "Power is the rate of doing work or transferring energy.\nP = W / Δt = F * v (Watts, W = J/s).",
    "category": "formula"
  },
  {
    "id": "fc-phys-g9-u5-232",
    "grade": 9,
    "subject": "physics",
    "unitNumber": 5,
    "front": "What are the formulas for Mechanical Advantage (MA) and Velocity Ratio (VR)?",
    "back": "MA = Load / Effort = L / E\nVR = Distance moved by effort / Distance moved by load = d_e / d_L",
    "category": "formula"
  },
  {
    "id": "fc-phys-g9-u5-233",
    "grade": 9,
    "subject": "physics",
    "unitNumber": 5,
    "front": "What is the Efficiency (η) of a simple machine?",
    "back": "Efficiency η = (Work output / Work input) * 100% = (MA / VR) * 100%.",
    "category": "formula"
  },
  {
    "id": "fc-phys-g9-u6-234",
    "grade": 9,
    "subject": "physics",
    "unitNumber": 6,
    "front": "What is the difference between Heat and Temperature?",
    "back": "Temperature is a measure of the average kinetic energy of the molecules. Heat is the thermal energy transferred between bodies due to a temperature difference.",
    "category": "definition"
  },
  {
    "id": "fc-phys-g9-u6-235",
    "grade": 9,
    "subject": "physics",
    "unitNumber": 6,
    "front": "State the Specific Heat Capacity formula.",
    "back": "Q = m * c * ΔT\nwhere Q = heat energy (J), m = mass (kg), c = specific heat capacity (J/kg·°C), ΔT = temperature change.",
    "category": "formula"
  },
  {
    "id": "fc-phys-g10-u1-236",
    "grade": 10,
    "subject": "physics",
    "unitNumber": 1,
    "front": "State the formula for centripetal acceleration in uniform circular motion.",
    "back": "a_c = v² / r = ω² * r\nwhere v = tangential speed, r = radius, ω = angular speed.",
    "category": "formula"
  },
  {
    "id": "fc-phys-g10-u1-237",
    "grade": 10,
    "subject": "physics",
    "unitNumber": 1,
    "front": "State the formula for centripetal force.",
    "back": "F_c = m * v² / r = m * ω² * r (directed towards the center of curvature).",
    "category": "formula"
  },
  {
    "id": "fc-phys-g10-u2-238",
    "grade": 10,
    "subject": "physics",
    "unitNumber": 2,
    "front": "State Newton's Law of Universal Gravitation.",
    "back": "F = G * (m1 * m2) / r²\nwhere G = 6.674 × 10⁻¹¹ N·m²/kg².",
    "category": "formula"
  },
  {
    "id": "fc-phys-g10-u2-239",
    "grade": 10,
    "subject": "physics",
    "unitNumber": 2,
    "front": "State Kepler's Third Law of Planetary Motion.",
    "back": "T² ∝ r³ (The square of the orbital period is proportional to the cube of the semi-major axis of orbit).",
    "category": "concept"
  },
  {
    "id": "fc-phys-g10-u3-240",
    "grade": 10,
    "subject": "physics",
    "unitNumber": 3,
    "front": "State Hooke's Law for an elastic material.",
    "back": "F = -k * x\nwhere k is the spring stiffness constant (N/m) and x is extension.",
    "category": "formula"
  },
  {
    "id": "fc-phys-g10-u3-241",
    "grade": 10,
    "subject": "physics",
    "unitNumber": 3,
    "front": "Define Stress, Strain, and Young's Modulus.",
    "back": "Stress σ = F / A (N/m² or Pa)\nStrain ε = ΔL / L_0 (dimensionless)\nYoung's Modulus Y = Stress / Strain = (F * L_0) / (A * ΔL).",
    "category": "formula"
  },
  {
    "id": "fc-phys-g10-u3-242",
    "grade": 10,
    "subject": "physics",
    "unitNumber": 3,
    "front": "State Pascal's Principle and its hydraulic application.",
    "back": "Pressure applied to an enclosed fluid is transmitted undiminished to every portion of the fluid and walls.\nF1 / A1 = F2 / A2.",
    "category": "concept"
  },
  {
    "id": "fc-phys-g10-u3-243",
    "grade": 10,
    "subject": "physics",
    "unitNumber": 3,
    "front": "State Archimedes' Principle of Buoyancy.",
    "back": "A body submerged in a fluid experiences an upward buoyant force equal to the weight of fluid displaced.\nF_b = ρ_fluid * V_submerged * g.",
    "category": "concept"
  },
  {
    "id": "fc-phys-g10-u4-244",
    "grade": 10,
    "subject": "physics",
    "unitNumber": 4,
    "front": "What is the formula for the period of a simple pendulum?",
    "back": "T = 2π * √(L / g)\n(Independent of mass of the bob and small amplitude).",
    "category": "formula"
  },
  {
    "id": "fc-phys-g10-u4-245",
    "grade": 10,
    "subject": "physics",
    "unitNumber": 4,
    "front": "State the universal wave equation.",
    "back": "v = f * λ\nwhere v = wave speed (m/s), f = frequency (Hz), λ = wavelength (m).",
    "category": "formula"
  },
  {
    "id": "fc-phys-g10-u4-246",
    "grade": 10,
    "subject": "physics",
    "unitNumber": 4,
    "front": "What is the speed of sound in air at 0 °C and its temperature dependence?",
    "back": "v ≈ 331 m/s at 0 °C, increasing by ~0.6 m/s per °C increase: v ≈ 331 + 0.6 * T(°C).",
    "category": "concept"
  },
  {
    "id": "fc-phys-g10-u5-247",
    "grade": 10,
    "subject": "physics",
    "unitNumber": 5,
    "front": "State the Mirror Equation and Thin Lens Equation.",
    "back": "1/f = 1/d_o + 1/d_i\nwhere f = focal length, d_o = object distance, d_i = image distance.",
    "category": "formula"
  },
  {
    "id": "fc-phys-g10-u5-248",
    "grade": 10,
    "subject": "physics",
    "unitNumber": 5,
    "front": "What is the formula for linear magnification in optics?",
    "back": "m = h_i / h_o = -d_i / d_o\n(Positive m: upright/virtual, Negative m: inverted/real).",
    "category": "formula"
  },
  {
    "id": "fc-phys-g11-u1-249",
    "grade": 11,
    "subject": "physics",
    "unitNumber": 1,
    "front": "What is the scalar (dot) product of two vectors?",
    "back": "A · B = |A| * |B| * cos(θ) = A_x * B_x + A_y * B_y + A_z * B_z\n(Result is a scalar; zero if vectors are perpendicular).",
    "category": "formula"
  },
  {
    "id": "fc-phys-g11-u1-250",
    "grade": 11,
    "subject": "physics",
    "unitNumber": 1,
    "front": "What is the vector (cross) product magnitude of two vectors?",
    "back": "|A × B| = |A| * |B| * sin(θ)\nDirection given by the right-hand rule. Equal to the area of the parallelogram formed by A and B.",
    "category": "formula"
  },
  {
    "id": "fc-phys-g11-u2-251",
    "grade": 11,
    "subject": "physics",
    "unitNumber": 2,
    "front": "In projectile motion, what is the maximum height formula?",
    "back": "H = (v_0 * sin θ)² / (2g)",
    "category": "formula"
  },
  {
    "id": "fc-phys-g11-u2-252",
    "grade": 11,
    "subject": "physics",
    "unitNumber": 2,
    "front": "In projectile motion, what is the horizontal range formula over level ground?",
    "back": "R = (v_0² * sin(2θ)) / g\n(Maximum range occurs at launching angle θ = 45°).",
    "category": "formula"
  },
  {
    "id": "fc-phys-g11-u2-253",
    "grade": 11,
    "subject": "physics",
    "unitNumber": 2,
    "front": "What is the total flight time formula for a projectile over level ground?",
    "back": "T = (2 * v_0 * sin θ) / g",
    "category": "formula"
  },
  {
    "id": "fc-phys-g11-u3-254",
    "grade": 11,
    "subject": "physics",
    "unitNumber": 3,
    "front": "State the Impulse-Momentum Theorem.",
    "back": "Impulse J = F_avg * Δt = Δp = m * v_f - m * v_i (kg·m/s or N·s).",
    "category": "formula"
  },
  {
    "id": "fc-phys-g11-u3-255",
    "grade": 11,
    "subject": "physics",
    "unitNumber": 3,
    "front": "What is the Law of Conservation of Linear Momentum?",
    "back": "In an isolated system (no external net force): Total Initial Momentum = Total Final Momentum (Σ p_i = Σ p_f).",
    "category": "concept"
  },
  {
    "id": "fc-phys-g11-u3-256",
    "grade": 11,
    "subject": "physics",
    "unitNumber": 3,
    "front": "Distinguish between elastic and perfectly inelastic collisions.",
    "back": "Elastic collision: Both momentum and kinetic energy are conserved. Perfectly inelastic collision: Momentum is conserved, kinetic energy is lost, and colliding bodies stick together.",
    "category": "definition"
  },
  {
    "id": "fc-phys-g11-u4-257",
    "grade": 11,
    "subject": "physics",
    "unitNumber": 4,
    "front": "State the Work-Energy Theorem.",
    "back": "The net work done on an object equals the change in its kinetic energy:\nW_net = ΔKE = (1/2)mv_f² - (1/2)mv_i².",
    "category": "concept"
  },
  {
    "id": "fc-phys-g11-u5-258",
    "grade": 11,
    "subject": "physics",
    "unitNumber": 5,
    "front": "State the formula for Torque.",
    "back": "τ = r * F * sin(θ) = I * α\nwhere r = lever arm, F = applied force, I = moment of inertia, α = angular acceleration.",
    "category": "formula"
  },
  {
    "id": "fc-phys-g11-u5-259",
    "grade": 11,
    "subject": "physics",
    "unitNumber": 5,
    "front": "What is the rotational kinetic energy formula?",
    "back": "KE_rot = (1/2) * I * ω²\nwhere I = moment of inertia (kg·m²), ω = angular velocity (rad/s).",
    "category": "formula"
  },
  {
    "id": "fc-phys-g11-u5-260",
    "grade": 11,
    "subject": "physics",
    "unitNumber": 5,
    "front": "State the Law of Conservation of Angular Momentum.",
    "back": "When net external torque is zero: L = I * ω = constant.",
    "category": "concept"
  },
  {
    "id": "fc-phys-g11-u6-261",
    "grade": 11,
    "subject": "physics",
    "unitNumber": 6,
    "front": "What are the two conditions for static equilibrium of a rigid body?",
    "back": "1. Net force must be zero: Σ F = 0 (Translational equilibrium)\n2. Net torque about any pivot must be zero: Σ τ = 0 (Rotational equilibrium).",
    "category": "concept"
  },
  {
    "id": "fc-phys-g11-u7-262",
    "grade": 11,
    "subject": "physics",
    "unitNumber": 7,
    "front": "State the Equation of Continuity for incompressible fluid flow.",
    "back": "A1 * v1 = A2 * v2 = Volume flow rate Q (m³/s) = constant.",
    "category": "formula"
  },
  {
    "id": "fc-phys-g11-u7-263",
    "grade": 11,
    "subject": "physics",
    "unitNumber": 7,
    "front": "State Bernoulli's Equation for ideal fluid flow.",
    "back": "P + (1/2) * ρ * v² + ρ * g * h = constant along a streamline.",
    "category": "formula"
  },
  {
    "id": "fc-phys-g11-u7-264",
    "grade": 11,
    "subject": "physics",
    "unitNumber": 7,
    "front": "What is Torricelli's Law for efflux speed through an orifice?",
    "back": "v = √(2 * g * h)\nwhere h is depth below the liquid surface.",
    "category": "formula"
  },
  {
    "id": "fc-phys-g12-u1-265",
    "grade": 12,
    "subject": "physics",
    "unitNumber": 1,
    "front": "What is the Zeroth Law of Thermodynamics?",
    "back": "If two bodies A and B are each in thermal equilibrium with a third body C, then A and B are in thermal equilibrium with each other.",
    "category": "concept"
  },
  {
    "id": "fc-phys-g12-u1-266",
    "grade": 12,
    "subject": "physics",
    "unitNumber": 1,
    "front": "What is the work done during an isobaric (constant pressure) gas expansion?",
    "back": "W = P * ΔV = P * (V_f - V_i)",
    "category": "formula"
  },
  {
    "id": "fc-phys-g12-u1-267",
    "grade": 12,
    "subject": "physics",
    "unitNumber": 1,
    "front": "What is an adiabatic process and its equation?",
    "back": "A process where no heat enters or leaves the system (Q = 0).\nΔU = -W; P * V^γ = constant, where γ = C_p / C_v.",
    "category": "definition"
  },
  {
    "id": "fc-phys-g12-u1-268",
    "grade": 12,
    "subject": "physics",
    "unitNumber": 1,
    "front": "State the Kelvin-Planck statement of the Second Law of Thermodynamics.",
    "back": "It is impossible for any heat engine to operate in a cycle and absorb heat from a single reservoir and convert all of it into work without rejecting some heat.",
    "category": "concept"
  },
  {
    "id": "fc-phys-g12-u1-269",
    "grade": 12,
    "subject": "physics",
    "unitNumber": 1,
    "front": "Define Entropy change for a reversible isothermal process.",
    "back": "ΔS = Q_rev / T (Joules per Kelvin, J/K). The entropy of the universe never decreases in any natural process.",
    "category": "definition"
  },
  {
    "id": "fc-phys-g12-u2-270",
    "grade": 12,
    "subject": "physics",
    "unitNumber": 2,
    "front": "State Coulomb's Law of Electrostatics.",
    "back": "F = k_e * (|q1 * q2|) / r²\nwhere k_e = 1 / (4πε_0) ≈ 8.99 × 10⁹ N·m²/C².",
    "category": "formula"
  },
  {
    "id": "fc-phys-g12-u2-271",
    "grade": 12,
    "subject": "physics",
    "unitNumber": 2,
    "front": "What is the Electric Field formula due to a point charge?",
    "back": "E = F / q_0 = k_e * q / r² (N/C or V/m, directed radially outward from positive charges).",
    "category": "formula"
  },
  {
    "id": "fc-phys-g12-u2-272",
    "grade": 12,
    "subject": "physics",
    "unitNumber": 2,
    "front": "State Gauss's Law in electrostatics.",
    "back": "Electric flux Φ_E = ∮ E · dA = Q_enclosed / ε_0.",
    "category": "concept"
  },
  {
    "id": "fc-phys-g12-u2-273",
    "grade": 12,
    "subject": "physics",
    "unitNumber": 2,
    "front": "What is the capacitance of a parallel-plate capacitor with dielectric?",
    "back": "C = κ * ε_0 * (A / d)\nwhere κ is dielectric constant, A is plate area, d is separation.",
    "category": "formula"
  },
  {
    "id": "fc-phys-g12-u2-274",
    "grade": 12,
    "subject": "physics",
    "unitNumber": 2,
    "front": "What is the energy stored in a charged capacitor?",
    "back": "U = (1/2) * Q * V = (1/2) * C * V² = Q² / (2C) (Joules).",
    "category": "formula"
  },
  {
    "id": "fc-phys-g12-u3-275",
    "grade": 12,
    "subject": "physics",
    "unitNumber": 3,
    "front": "What is the formula relating electric current to drift velocity?",
    "back": "I = n * q * A * v_d\nwhere n = carrier density, q = charge, A = cross-sectional area, v_d = drift velocity.",
    "category": "formula"
  },
  {
    "id": "fc-phys-g12-u3-276",
    "grade": 12,
    "subject": "physics",
    "unitNumber": 3,
    "front": "State Kirchhoff's Current Law (KCL) and Voltage Law (KVL).",
    "back": "KCL (Junction rule): Σ I_in = Σ I_out (Conservation of charge).\nKVL (Loop rule): Σ ΔV = 0 around any closed loop (Conservation of energy).",
    "category": "concept"
  },
  {
    "id": "fc-phys-g12-u3-277",
    "grade": 12,
    "subject": "physics",
    "unitNumber": 3,
    "front": "State the balanced condition for a Wheatstone Bridge.",
    "back": "R1 / R2 = R3 / R4 (Current through galvanometer is zero).",
    "category": "formula"
  },
  {
    "id": "fc-phys-g12-u4-278",
    "grade": 12,
    "subject": "physics",
    "unitNumber": 4,
    "front": "State the magnetic force on a moving charge (Lorentz force component).",
    "back": "F_B = q * (v × B) = q * v * B * sin(θ) (Newtons, N; directed by right-hand rule).",
    "category": "formula"
  },
  {
    "id": "fc-phys-g12-u4-279",
    "grade": 12,
    "subject": "physics",
    "unitNumber": 4,
    "front": "State Faraday's Law of Electromagnetic Induction.",
    "back": "ε = -N * (dΦ_B / dt)\nwhere ε = induced EMF (V), N = turns, Φ_B = magnetic flux (B * A * cos θ). Negative sign is Lenz's law.",
    "category": "formula"
  },
  {
    "id": "fc-phys-g12-u4-280",
    "grade": 12,
    "subject": "physics",
    "unitNumber": 4,
    "front": "State Lenz's Law.",
    "back": "The direction of induced current is always such that its magnetic field opposes the change in magnetic flux that produced it.",
    "category": "concept"
  },
  {
    "id": "fc-phys-g12-u5-281",
    "grade": 12,
    "subject": "physics",
    "unitNumber": 5,
    "front": "What are the impedance (Z) and resonant frequency (f_0) in an RLC series circuit?",
    "back": "Z = √(R² + (X_L - X_C)²)\nf_0 = 1 / (2π * √(L * C))",
    "category": "formula"
  },
  {
    "id": "fc-phys-g12-u6-282",
    "grade": 12,
    "subject": "physics",
    "unitNumber": 6,
    "front": "State Einstein's Photoelectric Effect equation.",
    "back": "hf = Φ + KE_max = hf_0 + (1/2)m*v_max²\nwhere h = Planck constant, f = frequency, Φ = work function, f_0 = threshold frequency.",
    "category": "formula"
  },
  {
    "id": "fc-phys-g12-u6-283",
    "grade": 12,
    "subject": "physics",
    "unitNumber": 6,
    "front": "What is the Bohr formula for energy levels of hydrogen atom?",
    "back": "E_n = -13.6 eV / n²\n(n = 1 is ground state, -13.6 eV).",
    "category": "formula"
  },
  {
    "id": "fc-phys-g12-u6-284",
    "grade": 12,
    "subject": "physics",
    "unitNumber": 6,
    "front": "State the Radioactive Decay Law and Half-life relation.",
    "back": "N(t) = N_0 * e^(-λt)\nT_1/2 = ln(2) / λ ≈ 0.693 / λ",
    "category": "formula"
  },
  {
    "id": "fc-phys-g12-u6-285",
    "grade": 12,
    "subject": "physics",
    "unitNumber": 6,
    "front": "What is Einstein's mass-energy equivalence equation?",
    "back": "E = Δm * c²\nwhere c = 3.0 × 10⁸ m/s, explaining nuclear binding energy and mass defect.",
    "category": "formula"
  },
  {
    "id": "fc-chem-g9-u1-286",
    "grade": 9,
    "subject": "chemistry",
    "unitNumber": 1,
    "front": "State the Law of Conservation of Mass (Lavoisier).",
    "back": "In a chemical reaction, mass is neither created nor destroyed; total mass of reactants equals total mass of products.",
    "category": "concept"
  },
  {
    "id": "fc-chem-g9-u1-287",
    "grade": 9,
    "subject": "chemistry",
    "unitNumber": 1,
    "front": "State the Law of Definite Proportions (Proust).",
    "back": "A given chemical compound always contains its component elements in fixed, definite proportion by mass.",
    "category": "concept"
  },
  {
    "id": "fc-chem-g9-u2-288",
    "grade": 9,
    "subject": "chemistry",
    "unitNumber": 2,
    "front": "Define atomic number (Z) and mass number (A).",
    "back": "Atomic number Z = number of protons in nucleus. Mass number A = protons + neutrons. Isotopes have the same Z but different A.",
    "category": "definition"
  },
  {
    "id": "fc-chem-g9-u2-289",
    "grade": 9,
    "subject": "chemistry",
    "unitNumber": 2,
    "front": "What did Rutherford's Alpha Scattering Experiment discover?",
    "back": "The existence of a tiny, dense, positively charged nucleus in the center of the atom with electrons orbiting in mostly empty space.",
    "category": "concept"
  },
  {
    "id": "fc-chem-g9-u3-290",
    "grade": 9,
    "subject": "chemistry",
    "unitNumber": 3,
    "front": "State the Modern Periodic Law (Moseley).",
    "back": "The physical and chemical properties of elements are periodic functions of their atomic numbers.",
    "category": "concept"
  },
  {
    "id": "fc-chem-g9-u3-291",
    "grade": 9,
    "subject": "chemistry",
    "unitNumber": 3,
    "front": "How do atomic radius and ionization energy trend across the periodic table?",
    "back": "Atomic radius decreases across a period (left to right) and increases down a group. Ionization energy increases across a period and decreases down a group.",
    "category": "concept"
  },
  {
    "id": "fc-chem-g9-u4-292",
    "grade": 9,
    "subject": "chemistry",
    "unitNumber": 4,
    "front": "Define Ionic vs Covalent bonding.",
    "back": "Ionic bond: Complete transfer of electrons from metal to nonmetal forming cations and anions. Covalent bond: Sharing of electron pairs between nonmetal atoms.",
    "category": "definition"
  },
  {
    "id": "fc-chem-g9-u4-293",
    "grade": 9,
    "subject": "chemistry",
    "unitNumber": 4,
    "front": "What is electronegativity and how does it determine bond polarity?",
    "back": "Electronegativity is the ability of an atom in a molecule to attract shared electrons.\nΔEN > 1.7: mostly ionic; 0.4–1.7: polar covalent; < 0.4: nonpolar covalent.",
    "category": "concept"
  },
  {
    "id": "fc-chem-g9-u5-294",
    "grade": 9,
    "subject": "chemistry",
    "unitNumber": 5,
    "front": "What is Avogadro's Number and the Mole concept?",
    "back": "1 mole = 6.022 × 10²³ particles (atoms, molecules, ions). Molar mass (g/mol) = mass of 1 mole of substance.",
    "category": "definition"
  },
  {
    "id": "fc-chem-g9-u5-295",
    "grade": 9,
    "subject": "chemistry",
    "unitNumber": 5,
    "front": "What is the molar volume of an ideal gas at STP (0 °C, 1 atm)?",
    "back": "V_m = 22.4 L/mol (or 22.4 dm³/mol). At room temperature (25 °C, 1 atm), V_m ≈ 24.0 L/mol.",
    "category": "formula"
  },
  {
    "id": "fc-chem-g9-u5-296",
    "grade": 9,
    "subject": "chemistry",
    "unitNumber": 5,
    "front": "State the Ideal Gas Law.",
    "back": "P * V = n * R * T\nwhere R = 0.0821 L·atm/(mol·K) = 8.314 J/(mol·K).",
    "category": "formula"
  },
  {
    "id": "fc-chem-g10-u1-297",
    "grade": 10,
    "subject": "chemistry",
    "unitNumber": 1,
    "front": "Define Exothermic and Endothermic reactions.",
    "back": "Exothermic: Heat is released to surroundings, ΔH < 0, products have lower energy than reactants. Endothermic: Heat is absorbed from surroundings, ΔH > 0.",
    "category": "definition"
  },
  {
    "id": "fc-chem-g10-u2-298",
    "grade": 10,
    "subject": "chemistry",
    "unitNumber": 2,
    "front": "Classify Oxides with examples.",
    "back": "Acidic oxides: Non-metal oxides (SO₂, CO₂) forming acids in water. Basic oxides: Metal oxides (Na₂O, CaO) forming bases. Amphoteric: React with both acids and bases (Al₂O₃, ZnO). Neutral: CO, NO, N₂O.",
    "category": "concept"
  },
  {
    "id": "fc-chem-g10-u2-299",
    "grade": 10,
    "subject": "chemistry",
    "unitNumber": 2,
    "front": "Define an Arrhenius acid and base.",
    "back": "Arrhenius acid: A substance that produces H⁺ (or H₃O⁺) ions in aqueous solution. Arrhenius base: A substance that produces OH⁻ ions in aqueous solution.",
    "category": "definition"
  },
  {
    "id": "fc-chem-g10-u2-300",
    "grade": 10,
    "subject": "chemistry",
    "unitNumber": 2,
    "front": "What is the chemical equation for the industrial Haber Process?",
    "back": "N₂(g) + 3H₂(g) ⇌ 2NH₃(g) (ΔH = -92 kJ/mol)\nConditions: 450 °C, 200 atm, finely divided iron catalyst.",
    "category": "concept"
  },
  {
    "id": "fc-chem-g10-u2-301",
    "grade": 10,
    "subject": "chemistry",
    "unitNumber": 2,
    "front": "What is the Contact Process used for and its key catalyst?",
    "back": "Manufacture of sulfuric acid (H₂SO₄). Key reaction: 2SO₂ + O₂ ⇌ 2SO₃ using Vanadium(V) oxide (V₂O₅) catalyst at ~450 °C.",
    "category": "concept"
  },
  {
    "id": "fc-chem-g10-u3-302",
    "grade": 10,
    "subject": "chemistry",
    "unitNumber": 3,
    "front": "State Faraday's First Law of Electrolysis.",
    "back": "Mass of substance deposited or liberated at an electrode is directly proportional to quantity of electricity (charge) passed:\nm = Z * Q = Z * I * t\nwhere Z = electrochemical equivalent.",
    "category": "formula"
  },
  {
    "id": "fc-chem-g10-u3-303",
    "grade": 10,
    "subject": "chemistry",
    "unitNumber": 3,
    "front": "State Faraday's Second Law of Electrolysis.",
    "back": "When the same quantity of electricity passes through different electrolytes, the masses of substances deposited are proportional to their chemical equivalent weights.",
    "category": "concept"
  },
  {
    "id": "fc-chem-g10-u4-304",
    "grade": 10,
    "subject": "chemistry",
    "unitNumber": 4,
    "front": "What are the general formulas for Alkanes, Alkenes, and Alkynes?",
    "back": "Alkanes (saturated): C_n H_{2n+2}\nAlkenes (double bond): C_n H_{2n}\nAlkynes (triple bond): C_n H_{2n-2}",
    "category": "formula"
  },
  {
    "id": "fc-chem-g10-u4-305",
    "grade": 10,
    "subject": "chemistry",
    "unitNumber": 4,
    "front": "State Markovnikov's Rule in alkene addition reactions.",
    "back": "When an asymmetrical reagent (HX) adds to an asymmetrical alkene, hydrogen attaches to the carbon with more hydrogen atoms ('the rich get richer').",
    "category": "concept"
  },
  {
    "id": "fc-chem-g11-u1-306",
    "grade": 11,
    "subject": "chemistry",
    "unitNumber": 1,
    "front": "What are the four Quantum Numbers and their significance?",
    "back": "1. Principal (n): energy level/shell (1, 2, 3...)\n2. Angular momentum (l): subshell shape (0=s, 1=p, 2=d, 3=f)\n3. Magnetic (m_l): orbital orientation (-l to +l)\n4. Spin (m_s): electron spin (+1/2, -1/2).",
    "category": "definition"
  },
  {
    "id": "fc-chem-g11-u1-307",
    "grade": 11,
    "subject": "chemistry",
    "unitNumber": 1,
    "front": "State the Pauli Exclusion Principle and Hund's Rule.",
    "back": "Pauli Exclusion: No two electrons in an atom can have the same set of four quantum numbers. Hund's Rule: Orbitals of equal energy are each occupied by one electron with parallel spins before any is doubly occupied.",
    "category": "concept"
  },
  {
    "id": "fc-chem-g11-u2-308",
    "grade": 11,
    "subject": "chemistry",
    "unitNumber": 2,
    "front": "What is VSEPR theory and the geometry of methane (CH₄), ammonia (NH₃), and water (H₂O)?",
    "back": "All have 4 electron pairs (sp³): CH₄ is Tetrahedral (109.5°), NH₃ is Trigonal pyramidal (107°), H₂O is Bent (104.5°). Lone pairs exert greater repulsion.",
    "category": "concept"
  },
  {
    "id": "fc-chem-g11-u2-309",
    "grade": 11,
    "subject": "chemistry",
    "unitNumber": 2,
    "front": "What is Hydrogen Bonding and which elements form it?",
    "back": "An unusually strong dipole-dipole attraction between hydrogen bonded to highly electronegative, small atoms: Nitrogen (N), Oxygen (O), or Fluorine (F).",
    "category": "definition"
  },
  {
    "id": "fc-chem-g11-u3-310",
    "grade": 11,
    "subject": "chemistry",
    "unitNumber": 3,
    "front": "State the Rate Law equation for a reaction aA + bB -> products.",
    "back": "Rate = k * [A]^m * [B]^n\nwhere k = rate constant, m and n = orders of reaction (determined experimentally, not from stoichiometric coefficients).",
    "category": "formula"
  },
  {
    "id": "fc-chem-g11-u3-311",
    "grade": 11,
    "subject": "chemistry",
    "unitNumber": 3,
    "front": "State the Arrhenius Equation for temperature dependence of reaction rates.",
    "back": "k = A * e^(-E_a / (RT))\nwhere E_a = activation energy (J/mol), R = 8.314 J/mol·K, T = temperature (K), A = frequency factor.",
    "category": "formula"
  },
  {
    "id": "fc-chem-g11-u4-312",
    "grade": 11,
    "subject": "chemistry",
    "unitNumber": 4,
    "front": "State the relationship between K_p and K_c for gas-phase equilibrium.",
    "back": "K_p = K_c * (RT)^(Δn_g)\nwhere Δn_g = (moles of gaseous products) - (moles of gaseous reactants).",
    "category": "formula"
  },
  {
    "id": "fc-chem-g11-u4-313",
    "grade": 11,
    "subject": "chemistry",
    "unitNumber": 4,
    "front": "State Le Chatelier's Principle.",
    "back": "If a dynamic equilibrium is disturbed by changing conditions (temperature, pressure, concentration), the position of equilibrium shifts in a direction that counteracts the change.",
    "category": "concept"
  },
  {
    "id": "fc-chem-g11-u5-314",
    "grade": 11,
    "subject": "chemistry",
    "unitNumber": 5,
    "front": "What are the functional groups of Alcohol, Aldehyde, Ketone, Carboxylic Acid, and Ester?",
    "back": "Alcohol: -OH\nAldehyde: -CHO (terminal)\nKetone: -C(=O)- (internal)\nCarboxylic acid: -COOH\nEster: -COOR",
    "category": "definition"
  },
  {
    "id": "fc-chem-g11-u5-315",
    "grade": 11,
    "subject": "chemistry",
    "unitNumber": 5,
    "front": "What is Tollens' reagent test and what does it distinguish?",
    "back": "Tollens' reagent [Ag(NH₃)₂]⁺ tests for aldehydes. Aldehydes reduce Ag⁺ to metallic silver (silver mirror), while ketones do not react.",
    "category": "concept"
  },
  {
    "id": "fc-chem-g12-u1-316",
    "grade": 12,
    "subject": "chemistry",
    "unitNumber": 1,
    "front": "State the Brønsted-Lowry and Lewis acid-base definitions.",
    "back": "Brønsted-Lowry: Acid is a proton (H⁺) donor; Base is a proton acceptor. Lewis: Acid is an electron pair acceptor; Base is an electron pair donor.",
    "category": "definition"
  },
  {
    "id": "fc-chem-g12-u1-317",
    "grade": 12,
    "subject": "chemistry",
    "unitNumber": 1,
    "front": "What is the autoionization constant of water (K_w) and the pH relation at 25 °C?",
    "back": "K_w = [H₃O⁺][OH⁻] = 1.0 × 10⁻¹⁴\npH = -log[H⁺], pOH = -log[OH⁻]\npH + pOH = 14.0",
    "category": "formula"
  },
  {
    "id": "fc-chem-g12-u1-318",
    "grade": 12,
    "subject": "chemistry",
    "unitNumber": 1,
    "front": "State the Henderson-Hasselbalch equation for an acid buffer.",
    "back": "pH = pK_a + log([Conjugate Base] / [Weak Acid]) = pK_a + log([A⁻] / [HA])",
    "category": "formula"
  },
  {
    "id": "fc-chem-g12-u1-319",
    "grade": 12,
    "subject": "chemistry",
    "unitNumber": 1,
    "front": "What is the Common Ion Effect?",
    "back": "The suppression of the ionization of a weak electrolyte by the addition of a strong electrolyte containing a common ion.",
    "category": "concept"
  },
  {
    "id": "fc-chem-g12-u1-320",
    "grade": 12,
    "subject": "chemistry",
    "unitNumber": 1,
    "front": "What is the condition for precipitation based on Q_sp and K_sp?",
    "back": "If Q_sp > K_sp: Supersaturated, precipitation occurs.\nIf Q_sp = K_sp: Saturated at equilibrium.\nIf Q_sp < K_sp: Unsaturated, no precipitation.",
    "category": "concept"
  },
  {
    "id": "fc-chem-g12-u2-321",
    "grade": 12,
    "subject": "chemistry",
    "unitNumber": 2,
    "front": "How is standard cell potential (E°_cell) calculated from reduction potentials?",
    "back": "E°_cell = E°_cathode - E°_anode\n(Spontaneous reaction if E°_cell > 0).",
    "category": "formula"
  },
  {
    "id": "fc-chem-g12-u2-322",
    "grade": 12,
    "subject": "chemistry",
    "unitNumber": 2,
    "front": "State the Nernst Equation at 298 K (25 °C).",
    "back": "E_cell = E°_cell - (0.0592 / n) * log(Q)\nwhere n = moles of electrons transferred, Q = reaction quotient.",
    "category": "formula"
  },
  {
    "id": "fc-chem-g12-u2-323",
    "grade": 12,
    "subject": "chemistry",
    "unitNumber": 2,
    "front": "Relate standard Gibbs free energy (ΔG°) to E°_cell and equilibrium constant K.",
    "back": "ΔG° = -n * F * E°_cell = -R * T * ln(K)\nwhere F = Faraday's constant ≈ 96,485 C/mol.",
    "category": "formula"
  },
  {
    "id": "fc-chem-g12-u3-324",
    "grade": 12,
    "subject": "chemistry",
    "unitNumber": 3,
    "front": "State Hess's Law of Constant Heat Summation.",
    "back": "The total enthalpy change for a chemical reaction is independent of the pathway or number of steps taken, depending only on the initial and final states.",
    "category": "concept"
  },
  {
    "id": "fc-chem-g12-u3-325",
    "grade": 12,
    "subject": "chemistry",
    "unitNumber": 3,
    "front": "State the Gibbs Free Energy equation and criteria for spontaneity.",
    "back": "ΔG = ΔH - T * ΔS\n• ΔG < 0: Spontaneous\n• ΔG = 0: Equilibrium\n• ΔG > 0: Non-spontaneous (endergonic).",
    "category": "formula"
  },
  {
    "id": "fc-chem-g12-u4-326",
    "grade": 12,
    "subject": "chemistry",
    "unitNumber": 4,
    "front": "Distinguish between addition and condensation polymerization.",
    "back": "Addition polymerization: Monomers with double bonds join without eliminating small molecules (e.g., polyethylene). Condensation: Monomers with two functional groups join with elimination of small molecules like H₂O (e.g., Nylon-6,6, Dacron).",
    "category": "definition"
  },
  {
    "id": "fc-biol-g9-u1-327",
    "grade": 9,
    "subject": "biology",
    "unitNumber": 1,
    "front": "Define Magnification vs Resolving Power of a microscope.",
    "back": "Magnification is the ratio of image size to actual object size. Resolving power (resolution) is the ability to distinguish two separate adjacent points as distinct.",
    "category": "definition"
  },
  {
    "id": "fc-biol-g9-u1-328",
    "grade": 9,
    "subject": "biology",
    "unitNumber": 1,
    "front": "Compare Prokaryotic and Eukaryotic cells.",
    "back": "Prokaryotes (bacteria): Lack membrane-bound nucleus and organelles, circular DNA in nucleoid, 70S ribosomes. Eukaryotes (plants, animals): True nucleus with nuclear membrane, membrane-bound organelles, linear chromosomes, 80S ribosomes.",
    "category": "concept"
  },
  {
    "id": "fc-biol-g9-u1-329",
    "grade": 9,
    "subject": "biology",
    "unitNumber": 1,
    "front": "State the function of Mitochondria.",
    "back": "The 'powerhouse of the cell': Site of aerobic cellular respiration, generating adenosine triphosphate (ATP) through Krebs cycle and oxidative phosphorylation.",
    "category": "concept"
  },
  {
    "id": "fc-biol-g9-u1-330",
    "grade": 9,
    "subject": "biology",
    "unitNumber": 1,
    "front": "Describe the Fluid Mosaic Model of the cell membrane (Singer & Nicolson).",
    "back": "Phospholipid bilayer with hydrophilic heads facing outwards and hydrophobic fatty acid tails inwards, with embedded integral and peripheral proteins moving fluidly.",
    "category": "concept"
  },
  {
    "id": "fc-biol-g9-u2-331",
    "grade": 9,
    "subject": "biology",
    "unitNumber": 2,
    "front": "Define Osmosis and distinguish Hypotonic, Isotonic, and Hypertonic solutions.",
    "back": "Osmosis is net diffusion of water molecules across a selectively permeable membrane down its water potential gradient. Hypotonic: Cell swells (turgid in plants, lysis in animals). Hypertonic: Cell shrinks (plasmolysis/crenation).",
    "category": "definition"
  },
  {
    "id": "fc-biol-g9-u3-332",
    "grade": 9,
    "subject": "biology",
    "unitNumber": 3,
    "front": "Name the main digestive enzymes and their substrate and products.",
    "back": "Amylase (salivary/pancreatic): Starch -> Maltose.\nPepsin (stomach): Proteins -> Peptides.\nLipase (pancreas): Lipids -> Fatty acids + Glycerol.\nTrypsin: Peptides -> Amino acids.",
    "category": "concept"
  },
  {
    "id": "fc-biol-g9-u3-333",
    "grade": 9,
    "subject": "biology",
    "unitNumber": 3,
    "front": "Describe double circulation in mammals.",
    "back": "Blood passes through the heart twice in one complete circuit:\n1. Pulmonary circulation: Heart -> Lungs -> Heart.\n2. Systemic circulation: Heart -> Body tissues -> Heart.",
    "category": "concept"
  },
  {
    "id": "fc-biol-g9-u4-334",
    "grade": 9,
    "subject": "biology",
    "unitNumber": 4,
    "front": "What pathogen causes Malaria and what is its transmission vector?",
    "back": "Pathogen: Plasmodium species (P. falciparum most fatal).\nVector: Female Anopheles mosquito.",
    "category": "date_fact"
  },
  {
    "id": "fc-biol-g9-u5-335",
    "grade": 9,
    "subject": "biology",
    "unitNumber": 5,
    "front": "What is the 10% Ecological Efficiency Rule (Lindeman)?",
    "back": "Only about 10% of the energy stored as biomass in one trophic level is transferred to the next higher level; 90% is lost as heat, respiration, and waste.",
    "category": "concept"
  },
  {
    "id": "fc-biol-g10-u1-336",
    "grade": 10,
    "subject": "biology",
    "unitNumber": 1,
    "front": "What microorganisms are involved in traditional Ethiopian fermentation?",
    "back": "Injera: Yeast (Saccharomyces) and lactic acid bacteria.\nTella: Gesho (Rhamnus prinoides) and barley yeast.\nTej: Natural honey yeasts.",
    "category": "concept"
  },
  {
    "id": "fc-biol-g10-u2-337",
    "grade": 10,
    "subject": "biology",
    "unitNumber": 2,
    "front": "State Mendel's Law of Segregation (First Law).",
    "back": "The two alleles for each gene segregate during gamete formation (meiosis), so that each gamete carries only one allele for each gene.",
    "category": "concept"
  },
  {
    "id": "fc-biol-g10-u2-338",
    "grade": 10,
    "subject": "biology",
    "unitNumber": 2,
    "front": "State Mendel's Law of Independent Assortment (Second Law).",
    "back": "Alleles of two or more different genes assort independently of each other during gamete formation, applicable to genes on non-homologous chromosomes.",
    "category": "concept"
  },
  {
    "id": "fc-biol-g10-u2-339",
    "grade": 10,
    "subject": "biology",
    "unitNumber": 2,
    "front": "What phenotypic ratio is expected in a Mendelian dihybrid cross (AaBb x AaBb)?",
    "back": "9 : 3 : 3 : 1 (9 dominant for both, 3 dominant-recessive, 3 recessive-dominant, 1 recessive for both).",
    "category": "formula"
  },
  {
    "id": "fc-biol-g10-u3-340",
    "grade": 10,
    "subject": "biology",
    "unitNumber": 3,
    "front": "Describe the structure of a Motor Neuron.",
    "back": "Dendrites (receive impulses) -> Cell body / Soma (nucleus) -> Axon (conducts impulses away, insulated by myelin sheath with Nodes of Ranvier) -> Axon terminals (synapse).",
    "category": "definition"
  },
  {
    "id": "fc-biol-g10-u3-341",
    "grade": 10,
    "subject": "biology",
    "unitNumber": 3,
    "front": "What are the components of a Reflex Arc?",
    "back": "Receptor -> Sensory (afferent) neuron -> Interneuron (in spinal cord gray matter) -> Motor (efferent) neuron -> Effector (muscle or gland).",
    "category": "concept"
  },
  {
    "id": "fc-biol-g10-u3-342",
    "grade": 10,
    "subject": "biology",
    "unitNumber": 3,
    "front": "What hormones regulate blood glucose levels in humans?",
    "back": "Insulin (secreted by beta-cells of Islets of Langerhans, lowers glucose by promoting glycogen synthesis) and Glucagon (secreted by alpha-cells, raises glucose by glycogenolysis).",
    "category": "concept"
  },
  {
    "id": "fc-biol-g10-u4-343",
    "grade": 10,
    "subject": "biology",
    "unitNumber": 4,
    "front": "Name four endemic mammal species of Ethiopia.",
    "back": "1. Walia Ibex (Capra walie, Simien Mountains)\n2. Ethiopian Wolf (Canis simensis, Bale Mountains)\n3. Gelada Baboon (Theropithecus gelada)\n4. Mountain Nyala (Tragelaphus buxtoni).",
    "category": "date_fact"
  },
  {
    "id": "fc-biol-g11-u1-344",
    "grade": 11,
    "subject": "biology",
    "unitNumber": 1,
    "front": "What are the monomers and linkages of Carbohydrates, Proteins, and Nucleic acids?",
    "back": "Carbohydrates: Monosaccharides linked by Glycosidic bonds.\nProteins: Amino acids linked by Peptide bonds.\nNucleic acids: Nucleotides linked by Phosphodiester bonds.",
    "category": "definition"
  },
  {
    "id": "fc-biol-g11-u1-345",
    "grade": 11,
    "subject": "biology",
    "unitNumber": 1,
    "front": "Describe the four levels of protein structure.",
    "back": "1. Primary: Linear amino acid sequence.\n2. Secondary: α-helix and β-pleated sheets stabilized by hydrogen bonds.\n3. Tertiary: 3D folding driven by R-group interactions (disulfide, ionic, hydrophobic).\n4. Quaternary: Association of two or more polypeptide chains (e.g., hemoglobin with 4 subunits).",
    "category": "concept"
  },
  {
    "id": "fc-biol-g11-u2-346",
    "grade": 11,
    "subject": "biology",
    "unitNumber": 2,
    "front": "Explain the Induced Fit Model of enzyme action (Koshland).",
    "back": "The substrate induces a conformational change in the enzyme's active site, enabling tight binding and lowering the activation energy.",
    "category": "concept"
  },
  {
    "id": "fc-biol-g11-u2-347",
    "grade": 11,
    "subject": "biology",
    "unitNumber": 2,
    "front": "Distinguish Competitive vs Non-competitive Enzyme Inhibition.",
    "back": "Competitive: Inhibitor resembles substrate and binds active site (reversible by increasing [substrate], same V_max, higher K_m). Non-competitive: Binds allosteric site altering active site shape (lowers V_max, unchanged K_m).",
    "category": "concept"
  },
  {
    "id": "fc-biol-g11-u3-348",
    "grade": 11,
    "subject": "biology",
    "unitNumber": 3,
    "front": "What are the 4 stages of Aerobic Cellular Respiration and their cellular locations?",
    "back": "1. Glycolysis (Cytoplasm)\n2. Link reaction / Pyruvate oxidation (Mitochondrial matrix)\n3. Krebs / Citric Acid Cycle (Mitochondrial matrix)\n4. Oxidative Phosphorylation & Electron Transport Chain (Inner mitochondrial membrane / cristae).",
    "category": "concept"
  },
  {
    "id": "fc-biol-g11-u3-349",
    "grade": 11,
    "subject": "biology",
    "unitNumber": 3,
    "front": "What is the net yield of ATP, NADH, and FADH₂ per glucose molecule in aerobic respiration?",
    "back": "Net ATP: ~30 to 32 ATP.\nGlycolysis: 2 ATP + 2 NADH.\nLink reaction: 2 NADH.\nKrebs cycle: 2 ATP + 6 NADH + 2 FADH₂.",
    "category": "formula"
  },
  {
    "id": "fc-biol-g11-u4-350",
    "grade": 11,
    "subject": "biology",
    "unitNumber": 4,
    "front": "What happens during the Light-Dependent reactions of Photosynthesis?",
    "back": "In thylakoid membranes: Chlorophyll absorbs photons, photolysis of water releases O₂ + protons + electrons; electron transport drives ATP synthesis (photophosphorylation) and produces NADPH.",
    "category": "concept"
  },
  {
    "id": "fc-biol-g11-u4-351",
    "grade": 11,
    "subject": "biology",
    "unitNumber": 4,
    "front": "What is RuBisCO and its role in the Calvin Cycle?",
    "back": "Ribulose-1,5-bisphosphate carboxylase-oxygenase: The primary enzyme catalyzing carbon fixation, joining CO₂ with 5-carbon RuBP to form 3-phosphoglycerate (3-PGA).",
    "category": "definition"
  },
  {
    "id": "fc-biol-g11-u4-352",
    "grade": 11,
    "subject": "biology",
    "unitNumber": 4,
    "front": "How do C₄ and CAM plants minimize Photorespiration?",
    "back": "C₄ plants (e.g., maize, sorghum) spatially separate carbon fixation (mesophyll cells using PEP carboxylase) and Calvin cycle (bundle sheath cells). CAM plants (e.g., pineapple) temporally separate them by opening stomata at night.",
    "category": "concept"
  },
  {
    "id": "fc-biol-g12-u1-353",
    "grade": 12,
    "subject": "biology",
    "unitNumber": 1,
    "front": "State Chargaff's Rules for DNA base composition.",
    "back": "In double-stranded DNA: % Adenine (A) = % Thymine (T) and % Guanine (G) = % Cytosine (C). Ratio of purines (A+G) to pyrimidines (T+C) is 1:1.",
    "category": "concept"
  },
  {
    "id": "fc-biol-g12-u1-354",
    "grade": 12,
    "subject": "biology",
    "unitNumber": 1,
    "front": "What are the functions of Helicase, DNA Polymerase, and Ligase in DNA replication?",
    "back": "Helicase: Unwinds and separates the double helix.\nDNA Polymerase: Synthesizes complementary DNA strand in 5' to 3' direction.\nDNA Ligase: Seals nicks in the sugar-phosphate backbone, joining Okazaki fragments.",
    "category": "definition"
  },
  {
    "id": "fc-biol-g12-u1-355",
    "grade": 12,
    "subject": "biology",
    "unitNumber": 1,
    "front": "What is the Central Dogma of Molecular Biology?",
    "back": "DNA -> (Transcription by RNA Polymerase) -> mRNA -> (Translation by Ribosomes) -> Protein. (Reverse transcription: RNA -> DNA by retroviruses).",
    "category": "concept"
  },
  {
    "id": "fc-biol-g12-u1-356",
    "grade": 12,
    "subject": "biology",
    "unitNumber": 1,
    "front": "What are the Start codon and Stop codons in the genetic code?",
    "back": "Start codon: AUG (codes for Methionine).\nStop codons: UAA, UAG, UGA (do not code for amino acids; signal termination).",
    "category": "date_fact"
  },
  {
    "id": "fc-biol-g12-u2-357",
    "grade": 12,
    "subject": "biology",
    "unitNumber": 2,
    "front": "Distinguish Homologous vs Analogous structures with examples.",
    "back": "Homologous: Similar anatomical structure due to common evolutionary ancestry, different function (e.g., human arm, bat wing, whale flipper - Divergent evolution). Analogous: Similar function, different evolutionary origin (e.g., bird wing and butterfly wing - Convergent evolution).",
    "category": "definition"
  },
  {
    "id": "fc-biol-g12-u2-358",
    "grade": 12,
    "subject": "biology",
    "unitNumber": 2,
    "front": "State the Hardy-Weinberg Equilibrium equation and conditions.",
    "back": "p² + 2pq + q² = 1 and p + q = 1\n(p = frequency of dominant allele, q = recessive allele). Conditions: 1. Large population, 2. Random mating, 3. No mutation, 4. No migration (gene flow), 5. No natural selection.",
    "category": "formula"
  },
  {
    "id": "fc-biol-g12-u3-359",
    "grade": 12,
    "subject": "biology",
    "unitNumber": 3,
    "front": "What hormones trigger Ovulation in the human ovarian cycle?",
    "back": "A mid-cycle surge in Luteinizing Hormone (LH), triggered by peak Estrogen levels from the mature Graafian follicle on approximately Day 14.",
    "category": "concept"
  },
  {
    "id": "fc-biol-g12-u3-360",
    "grade": 12,
    "subject": "biology",
    "unitNumber": 3,
    "front": "What are the three primary embryonic germ layers and their adult derivatives?",
    "back": "1. Ectoderm: Skin epidermis, nervous system (brain, spinal cord).\n2. Mesoderm: Muscles, skeleton, circulatory, excretory systems.\n3. Endoderm: Inner lining of digestive and respiratory tracts, liver, pancreas.",
    "category": "definition"
  },
  {
    "id": "fc-biol-g12-u4-361",
    "grade": 12,
    "subject": "biology",
    "unitNumber": 4,
    "front": "Define Carrying Capacity (K) in population ecology.",
    "back": "The maximum population size of a species that a given environment can sustainably support without degrading the habitat.",
    "category": "definition"
  },
  {
    "id": "fc-biol-g12-u4-362",
    "grade": 12,
    "subject": "biology",
    "unitNumber": 4,
    "front": "Distinguish Innate behavior from Learned behavior with examples.",
    "back": "Innate: Genetically programmed, present at birth, instinctive (e.g., spider web spinning, suckling reflex, bird migration). Learned: Acquired or modified through environmental experience (e.g., habituation, Pavlovian conditioning, trial-and-error).",
    "category": "concept"
  },
  {
    "id": "fc-math-g9-u1-363",
    "grade": 9,
    "subject": "mathematics",
    "unitNumber": 1,
    "front": "State De Morgan's Laws of Set Theory.",
    "back": "(A ∪ B)' = A' ∩ B'\n(A ∩ B)' = A' ∪ B'",
    "category": "formula"
  },
  {
    "id": "fc-math-g9-u1-364",
    "grade": 9,
    "subject": "mathematics",
    "unitNumber": 1,
    "front": "What is the formula for the number of subsets of a set with n elements?",
    "back": "Total subsets = 2^n\nProper subsets = 2^n - 1",
    "category": "formula"
  },
  {
    "id": "fc-math-g9-u2-365",
    "grade": 9,
    "subject": "mathematics",
    "unitNumber": 2,
    "front": "State the Quadratic Formula for ax² + bx + c = 0.",
    "back": "x = (-b ± √(b² - 4ac)) / (2a)\nDiscriminant Δ = b² - 4ac.",
    "category": "formula"
  },
  {
    "id": "fc-math-g9-u2-366",
    "grade": 9,
    "subject": "mathematics",
    "unitNumber": 2,
    "front": "What does the discriminant (Δ = b² - 4ac) indicate about roots?",
    "back": "• Δ > 0: Two distinct real roots\n• Δ = 0: Exactly one real root (repeated/double root)\n• Δ < 0: Two complex conjugate roots (no real roots).",
    "category": "concept"
  },
  {
    "id": "fc-math-g9-u2-367",
    "grade": 9,
    "subject": "mathematics",
    "unitNumber": 2,
    "front": "State Vieta's Formulas for a quadratic ax² + bx + c = 0.",
    "back": "Sum of roots: x1 + x2 = -b / a\nProduct of roots: x1 * x2 = c / a",
    "category": "formula"
  },
  {
    "id": "fc-math-g9-u3-368",
    "grade": 9,
    "subject": "mathematics",
    "unitNumber": 3,
    "front": "What is the distance formula between points (x1, y1) and (x2, y2)?",
    "back": "d = √((x2 - x1)² + (y2 - y1)²)",
    "category": "formula"
  },
  {
    "id": "fc-math-g9-u3-369",
    "grade": 9,
    "subject": "mathematics",
    "unitNumber": 3,
    "front": "What are the Midpoint coordinates between (x1, y1) and (x2, y2)?",
    "back": "M = ((x1 + x2) / 2, (y1 + y2) / 2)",
    "category": "formula"
  },
  {
    "id": "fc-math-g9-u3-370",
    "grade": 9,
    "subject": "mathematics",
    "unitNumber": 3,
    "front": "What is the relationship between the slopes of two perpendicular lines?",
    "back": "m1 * m2 = -1 (or m2 = -1 / m1), provided neither line is vertical.",
    "category": "concept"
  },
  {
    "id": "fc-math-g9-u4-371",
    "grade": 9,
    "subject": "mathematics",
    "unitNumber": 4,
    "front": "State the conditions for Triangle Congruence.",
    "back": "SSS (Side-Side-Side), SAS (Side-Angle-Side), ASA (Angle-Side-Angle), AAS (Angle-Angle-Side), and RHS (Right-Hypotenuse-Side).",
    "category": "concept"
  },
  {
    "id": "fc-math-g9-u4-372",
    "grade": 9,
    "subject": "mathematics",
    "unitNumber": 4,
    "front": "State the Pythagorean Theorem and its converse.",
    "back": "In a right triangle with legs a, b and hypotenuse c: a² + b² = c².\nIf a² + b² = c², the angle opposite to side c is a right angle (90°).",
    "category": "formula"
  },
  {
    "id": "fc-math-g9-u5-373",
    "grade": 9,
    "subject": "mathematics",
    "unitNumber": 5,
    "front": "What is the formula for the sample Mean and Sample Variance?",
    "back": "Mean x̄ = (Σ x_i) / n\nVariance s² = Σ (x_i - x̄)² / (n - 1)\nStandard deviation s = √s²",
    "category": "formula"
  },
  {
    "id": "fc-math-g10-u1-374",
    "grade": 10,
    "subject": "mathematics",
    "unitNumber": 1,
    "front": "State the Remainder Theorem and Factor Theorem for polynomials.",
    "back": "Remainder Theorem: When polynomial P(x) is divided by (x - c), the remainder is R = P(c).\nFactor Theorem: (x - c) is a factor of P(x) if and only if P(c) = 0.",
    "category": "concept"
  },
  {
    "id": "fc-math-g10-u1-375",
    "grade": 10,
    "subject": "mathematics",
    "unitNumber": 1,
    "front": "How do you find the vertical and horizontal asymptotes of a rational function f(x) = P(x) / Q(x)?",
    "back": "Vertical asymptotes: Real zeros of Q(x) (where P(x) ≠ 0).\nHorizontal asymptote: If deg(P) < deg(Q), y = 0; if deg(P) = deg(Q), y = leading coeff ratio; if deg(P) > deg(Q), no horizontal asymptote (slant/oblique).",
    "category": "concept"
  },
  {
    "id": "fc-math-g10-u2-376",
    "grade": 10,
    "subject": "mathematics",
    "unitNumber": 2,
    "front": "State the fundamental Laws of Logarithms.",
    "back": "1. log_b(xy) = log_b(x) + log_b(y)\n2. log_b(x/y) = log_b(x) - log_b(y)\n3. log_b(x^k) = k * log_b(x)\n4. Change of base: log_b(x) = ln(x) / ln(b)",
    "category": "formula"
  },
  {
    "id": "fc-math-g10-u2-377",
    "grade": 10,
    "subject": "mathematics",
    "unitNumber": 2,
    "front": "What is the relationship between exponential and logarithmic forms?",
    "back": "y = log_b(x) ⟺ b^y = x (where b > 0, b ≠ 1, x > 0).",
    "category": "definition"
  },
  {
    "id": "fc-math-g10-u3-378",
    "grade": 10,
    "subject": "mathematics",
    "unitNumber": 3,
    "front": "State the Pythagorean Trigonometric Identities.",
    "back": "1. sin²(θ) + cos²(θ) = 1\n2. 1 + tan²(θ) = sec²(θ)\n3. 1 + cot²(θ) = csc²(θ)",
    "category": "formula"
  },
  {
    "id": "fc-math-g10-u3-379",
    "grade": 10,
    "subject": "mathematics",
    "unitNumber": 3,
    "front": "State the Double-Angle formulas for Sine and Cosine.",
    "back": "sin(2θ) = 2 * sin(θ) * cos(θ)\ncos(2θ) = cos²(θ) - sin²(θ) = 2cos²(θ) - 1 = 1 - 2sin²(θ)",
    "category": "formula"
  },
  {
    "id": "fc-math-g10-u3-380",
    "grade": 10,
    "subject": "mathematics",
    "unitNumber": 3,
    "front": "State the Law of Sines and Law of Cosines.",
    "back": "Law of Sines: a / sin(A) = b / sin(B) = c / sin(C) = 2R\nLaw of Cosines: c² = a² + b² - 2ab * cos(C)",
    "category": "formula"
  },
  {
    "id": "fc-math-g10-u4-381",
    "grade": 10,
    "subject": "mathematics",
    "unitNumber": 4,
    "front": "What is the standard equation of a Circle with center (h, k) and radius r?",
    "back": "(x - h)² + (y - k)² = r²\n(Center at origin: x² + y² = r²).",
    "category": "formula"
  },
  {
    "id": "fc-math-g10-u4-382",
    "grade": 10,
    "subject": "mathematics",
    "unitNumber": 4,
    "front": "What are the formulas for the Volume and Surface Area of a Sphere?",
    "back": "Volume V = (4/3) * π * r³\nSurface Area A = 4 * π * r²",
    "category": "formula"
  },
  {
    "id": "fc-math-g11-u1-383",
    "grade": 11,
    "subject": "mathematics_natural",
    "unitNumber": 1,
    "front": "State the n-th term and sum formulas for an Arithmetic Progression (AP).",
    "back": "n-th term: a_n = a_1 + (n - 1)d\nSum: S_n = (n/2)[2a_1 + (n - 1)d] = (n/2)(a_1 + a_n)",
    "category": "formula"
  },
  {
    "id": "fc-math-g11-u1-384",
    "grade": 11,
    "subject": "mathematics_natural",
    "unitNumber": 1,
    "front": "State the n-th term and sum of finite & infinite Geometric Series (GP).",
    "back": "n-th term: a_n = a_1 * r^(n-1)\nFinite sum: S_n = a_1(1 - r^n) / (1 - r) (r ≠ 1)\nInfinite sum (converges if |r| < 1): S_∞ = a_1 / (1 - r)",
    "category": "formula"
  },
  {
    "id": "fc-math-g11-u2-385",
    "grade": 11,
    "subject": "mathematics_natural",
    "unitNumber": 2,
    "front": "State the fundamental limits: lim(x->0) sin(x)/x and lim(x->0) (1 - cos(x))/x.",
    "back": "lim(x→0) sin(x) / x = 1\nlim(x→0) (1 - cos(x)) / x = 0\n(where x is in radians).",
    "category": "formula"
  },
  {
    "id": "fc-math-g11-u2-386",
    "grade": 11,
    "subject": "mathematics_natural",
    "unitNumber": 2,
    "front": "What are the three conditions for a function f(x) to be Continuous at x = c?",
    "back": "1. f(c) is defined\n2. lim(x→c) f(x) exists\n3. lim(x→c) f(x) = f(c)",
    "category": "concept"
  },
  {
    "id": "fc-math-g11-u3-387",
    "grade": 11,
    "subject": "mathematics_natural",
    "unitNumber": 3,
    "front": "What is the determinant and inverse of a 2x2 matrix A = [[a, b], [c, d]]?",
    "back": "det(A) = ad - bc\nA⁻¹ = (1 / det(A)) * [[d, -b], [-c, a]] (exists if det(A) ≠ 0).",
    "category": "formula"
  },
  {
    "id": "fc-math-g11-u4-388",
    "grade": 11,
    "subject": "mathematics_natural",
    "unitNumber": 4,
    "front": "What is the standard equation and focus of a Parabola opening along the x-axis?",
    "back": "y² = 4ax (vertex at (0, 0), focus at (a, 0), directrix line x = -a).",
    "category": "formula"
  },
  {
    "id": "fc-math-g11-u4-389",
    "grade": 11,
    "subject": "mathematics_natural",
    "unitNumber": 4,
    "front": "What is the standard equation of an Ellipse with major axis on x-axis?",
    "back": "x² / a² + y² / b² = 1 (a > b)\nFoci at (±c, 0) where c² = a² - b²; Eccentricity e = c / a < 1.",
    "category": "formula"
  },
  {
    "id": "fc-math-g11-u4-390",
    "grade": 11,
    "subject": "mathematics_natural",
    "unitNumber": 4,
    "front": "What is the standard equation of a Hyperbola centered at origin?",
    "back": "x² / a² - y² / b² = 1\nFoci at (±c, 0) where c² = a² + b²; Asymptotes y = ±(b/a)x; Eccentricity e = c / a > 1.",
    "category": "formula"
  },
  {
    "id": "fc-math-g12-u1-391",
    "grade": 12,
    "subject": "mathematics_natural",
    "unitNumber": 1,
    "front": "State the formal definition of the Derivative f'(x).",
    "back": "f'(x) = lim(h→0) [f(x + h) - f(x)] / h",
    "category": "definition"
  },
  {
    "id": "fc-math-g12-u1-392",
    "grade": 12,
    "subject": "mathematics_natural",
    "unitNumber": 1,
    "front": "State the Product Rule and Quotient Rule for differentiation.",
    "back": "Product Rule: (uv)' = u'v + uv'\nQuotient Rule: (u / v)' = (u'v - uv') / v²",
    "category": "formula"
  },
  {
    "id": "fc-math-g12-u1-393",
    "grade": 12,
    "subject": "mathematics_natural",
    "unitNumber": 1,
    "front": "State the Chain Rule for composite functions.",
    "back": "If y = f(g(x)), then dy/dx = f'(g(x)) * g'(x) = (dy/du) * (du/dx).",
    "category": "formula"
  },
  {
    "id": "fc-math-g12-u1-394",
    "grade": 12,
    "subject": "mathematics_natural",
    "unitNumber": 1,
    "front": "What are the derivatives of sin(x), cos(x), tan(x), e^x, and ln(x)?",
    "back": "d/dx[sin x] = cos x\nd/dx[cos x] = -sin x\nd/dx[tan x] = sec² x\nd/dx[e^x] = e^x\nd/dx[ln x] = 1/x (for x > 0)",
    "category": "formula"
  },
  {
    "id": "fc-math-g12-u2-395",
    "grade": 12,
    "subject": "mathematics_natural",
    "unitNumber": 2,
    "front": "State Rolle's Theorem and the Mean Value Theorem (MVT).",
    "back": "MVT: If f is continuous on [a, b] and differentiable on (a, b), there exists c ∈ (a, b) such that f'(c) = [f(b) - f(a)] / (b - a).\nRolle's is the special case where f(a) = f(b) ⇒ f'(c) = 0.",
    "category": "concept"
  },
  {
    "id": "fc-math-g12-u2-396",
    "grade": 12,
    "subject": "mathematics_natural",
    "unitNumber": 2,
    "front": "State L'Hôpital's Rule for indeterminate forms 0/0 or ∞/∞.",
    "back": "lim(x→c) [f(x) / g(x)] = lim(x→c) [f'(x) / g'(x)], provided the limit on the right exists.",
    "category": "concept"
  },
  {
    "id": "fc-math-g12-u3-397",
    "grade": 12,
    "subject": "mathematics_natural",
    "unitNumber": 3,
    "front": "State the Fundamental Theorem of Calculus (FTC Parts 1 & 2).",
    "back": "Part 1: d/dx [∫_a^x f(t) dt] = f(x)\nPart 2: ∫_a^b f(x) dx = F(b) - F(a), where F'(x) = f(x).",
    "category": "formula"
  },
  {
    "id": "fc-math-g12-u3-398",
    "grade": 12,
    "subject": "mathematics_natural",
    "unitNumber": 3,
    "front": "State the Integration by Parts formula.",
    "back": "∫ u dv = u * v - ∫ v du",
    "category": "formula"
  },
  {
    "id": "fc-math-g12-u3-399",
    "grade": 12,
    "subject": "mathematics_natural",
    "unitNumber": 3,
    "front": "State the Disk and Washer method formulas for Volume of Revolution about x-axis.",
    "back": "Disk: V = π ∫_a^b [f(x)]² dx\nWasher: V = π ∫_a^b ([R_outer(x)]² - [r_inner(x)]²) dx",
    "category": "formula"
  },
  {
    "id": "fc-math-g12-u4-400",
    "grade": 12,
    "subject": "mathematics_natural",
    "unitNumber": 4,
    "front": "What is the Dot Product and Cross Product of 3D vectors u and v?",
    "back": "Dot: u · v = u1*v1 + u2*v2 + u3*v3 = |u||v|cos θ\nCross: u × v = det([[i, j, k], [u1, u2, u3], [v1, v2, v3]]) with magnitude |u||v|sin θ.",
    "category": "formula"
  },
  {
    "id": "fc-math-g12-u5-401",
    "grade": 12,
    "subject": "mathematics_natural",
    "unitNumber": 5,
    "front": "State Euler's Formula and De Moivre's Theorem for complex numbers.",
    "back": "Euler: e^(iθ) = cos(θ) + i * sin(θ)\nDe Moivre: [r(cos θ + i sin θ)]^n = r^n * [cos(nθ) + i sin(nθ)]",
    "category": "formula"
  },
  {
    "id": "fc-math-g12-u6-402",
    "grade": 12,
    "subject": "mathematics_natural",
    "unitNumber": 6,
    "front": "State Bayes' Theorem for conditional probability.",
    "back": "P(A|B) = [P(B|A) * P(A)] / P(B)",
    "category": "formula"
  },
  {
    "id": "fc-math-g12-u6-403",
    "grade": 12,
    "subject": "mathematics_natural",
    "unitNumber": 6,
    "front": "What are the Mean and Variance of a Binomial Distribution B(n, p)?",
    "back": "Mean μ = n * p\nVariance σ² = n * p * (1 - p)\nStandard deviation σ = √(np(1 - p))",
    "category": "formula"
  },
  {
    "id": "fc-math-g11-u1-404",
    "grade": 11,
    "subject": "mathematics_social",
    "unitNumber": 1,
    "front": "State the Simple Interest formula and total accumulated amount.",
    "back": "Interest: I = P * r * t\nAmount: A = P(1 + r * t)\nwhere P = principal, r = annual interest rate, t = time in years.",
    "category": "formula"
  },
  {
    "id": "fc-math-g11-u1-405",
    "grade": 11,
    "subject": "mathematics_social",
    "unitNumber": 1,
    "front": "State the Compound Interest formula for n compounding periods per year.",
    "back": "A = P * (1 + r / n)^(n * t)\nFor continuous compounding: A = P * e^(r * t).",
    "category": "formula"
  },
  {
    "id": "fc-math-g11-u1-406",
    "grade": 11,
    "subject": "mathematics_social",
    "unitNumber": 1,
    "front": "State the Future Value of an Ordinary Annuity formula.",
    "back": "FV = PMT * [((1 + i)^n - 1) / i]\nwhere PMT = periodic payment, i = interest rate per period, n = total periods.",
    "category": "formula"
  },
  {
    "id": "fc-math-g11-u1-407",
    "grade": 11,
    "subject": "mathematics_social",
    "unitNumber": 1,
    "front": "State the Present Value of an Ordinary Annuity formula (Loan Amortization).",
    "back": "PV = PMT * [(1 - (1 + i)^(-n)) / i]",
    "category": "formula"
  },
  {
    "id": "fc-math-g11-u2-408",
    "grade": 11,
    "subject": "mathematics_social",
    "unitNumber": 2,
    "front": "Define the Feasible Region in Linear Programming.",
    "back": "The set of all points that satisfy all linear constraints simultaneously. The optimal value of the linear objective function always occurs at a corner point (vertex).",
    "category": "concept"
  },
  {
    "id": "fc-math-g11-u3-409",
    "grade": 11,
    "subject": "mathematics_social",
    "unitNumber": 3,
    "front": "What is Pearson's Correlation Coefficient (r) and its range?",
    "back": "r measures the strength and direction of a linear relationship between two variables.\n-1 ≤ r ≤ +1 (r = +1: perfect positive, r = -1: perfect negative, r = 0: no linear correlation).",
    "category": "formula"
  },
  {
    "id": "fc-math-g12-u1-410",
    "grade": 12,
    "subject": "mathematics_social",
    "unitNumber": 1,
    "front": "What are Marginal Revenue (MR), Marginal Cost (MC), and Marginal Profit (Mπ)?",
    "back": "MR = d(TR)/dq\nMC = d(TC)/dq\nMπ = MR - MC\nProfit is maximized when MR = MC and d²(Profit)/dq² < 0.",
    "category": "formula"
  },
  {
    "id": "fc-math-g12-u1-411",
    "grade": 12,
    "subject": "mathematics_social",
    "unitNumber": 1,
    "front": "Define Price Elasticity of Demand using calculus.",
    "back": "ε = (dQ/dP) * (P / Q)\nElastic if |ε| > 1, inelastic if |ε| < 1, unit elastic if |ε| = 1.",
    "category": "formula"
  },
  {
    "id": "fc-math-g12-u2-412",
    "grade": 12,
    "subject": "mathematics_social",
    "unitNumber": 2,
    "front": "What are Consumer Surplus and Producer Surplus in terms of integrals?",
    "back": "Consumer Surplus CS = ∫_0^Q_e (P_demand(q) - P_e) dq\nProducer Surplus PS = ∫_0^Q_e (P_e - P_supply(q)) dq",
    "category": "formula"
  },
  {
    "id": "fc-math-g12-u3-413",
    "grade": 12,
    "subject": "mathematics_social",
    "unitNumber": 3,
    "front": "State the properties of the Standard Normal Distribution (Z-distribution).",
    "back": "Bell-shaped, symmetric about mean μ = 0, standard deviation σ = 1. Total area under curve = 1. Z = (X - μ) / σ.",
    "category": "concept"
  },
  {
    "id": "fc-math-g12-u3-414",
    "grade": 12,
    "subject": "mathematics_social",
    "unitNumber": 3,
    "front": "State the 68-95-99.7 (Empirical) Rule for normal distributions.",
    "back": "• ~68% of data lies within μ ± 1σ\n• ~95% of data lies within μ ± 2σ\n• ~99.7% of data lies within μ ± 3σ.",
    "category": "concept"
  },
  {
    "id": "fc-econ-g9-u1-415",
    "grade": 9,
    "subject": "economics",
    "unitNumber": 1,
    "front": "Define Scarcity and Opportunity Cost.",
    "back": "Scarcity: Human wants are unlimited while economic resources are limited. Opportunity Cost: The value of the next best alternative forgone when making a choice.",
    "category": "definition"
  },
  {
    "id": "fc-econ-g9-u1-416",
    "grade": 9,
    "subject": "economics",
    "unitNumber": 1,
    "front": "What are the three fundamental economic questions?",
    "back": "1. What to produce and in what quantities?\n2. How to produce (technique/resource combination)?\n3. For whom to produce (distribution)?",
    "category": "concept"
  },
  {
    "id": "fc-econ-g9-u1-417",
    "grade": 9,
    "subject": "economics",
    "unitNumber": 1,
    "front": "What does the Production Possibility Frontier (PPF) illustrate?",
    "back": "Scarcity, choice, opportunity cost, and efficiency. Points on curve = efficient; inside = inefficient; outside = unattainable with current resources.",
    "category": "concept"
  },
  {
    "id": "fc-econ-g9-u2-418",
    "grade": 9,
    "subject": "economics",
    "unitNumber": 2,
    "front": "State the Law of Demand and the substitution and income effects.",
    "back": "Other things being equal (ceteris paribus), as price increases, quantity demanded decreases (downward sloping demand curve).",
    "category": "concept"
  },
  {
    "id": "fc-econ-g9-u2-419",
    "grade": 9,
    "subject": "economics",
    "unitNumber": 2,
    "front": "State the Law of Supply.",
    "back": "Other things being equal, as price increases, quantity supplied increases (upward sloping supply curve).",
    "category": "concept"
  },
  {
    "id": "fc-econ-g9-u2-420",
    "grade": 9,
    "subject": "economics",
    "unitNumber": 2,
    "front": "What occurs at Market Equilibrium?",
    "back": "Quantity demanded equals quantity supplied (Q_d = Q_s). The market clears with no shortage (excess demand) or surplus (excess supply).",
    "category": "definition"
  },
  {
    "id": "fc-econ-g10-u1-421",
    "grade": 10,
    "subject": "economics",
    "unitNumber": 1,
    "front": "Distinguish between a Price Ceiling and a Price Floor.",
    "back": "Price Ceiling: Maximum legal price set BELOW equilibrium (causes persistent shortages, e.g., rent control). Price Floor: Minimum legal price set ABOVE equilibrium (causes persistent surpluses, e.g., minimum wage).",
    "category": "concept"
  },
  {
    "id": "fc-econ-g10-u2-422",
    "grade": 10,
    "subject": "economics",
    "unitNumber": 2,
    "front": "What are the four main factors of production and their returns?",
    "back": "1. Land -> Rent\n2. Labor -> Wages\n3. Capital -> Interest\n4. Entrepreneurship -> Profit",
    "category": "definition"
  },
  {
    "id": "fc-econ-g11-u1-423",
    "grade": 11,
    "subject": "economics",
    "unitNumber": 1,
    "front": "State the Law of Diminishing Marginal Utility.",
    "back": "As a consumer consumes more units of a specific good, the additional satisfaction (marginal utility) derived from each additional unit decreases.",
    "category": "concept"
  },
  {
    "id": "fc-econ-g11-u1-424",
    "grade": 11,
    "subject": "economics",
    "unitNumber": 1,
    "front": "What is the Consumer Equilibrium condition under Cardinal Utility?",
    "back": "MU_x / P_x = MU_y / P_y = ... = MU_m (Marginal utility per birr spent is equal across all goods).",
    "category": "formula"
  },
  {
    "id": "fc-econ-g11-u1-425",
    "grade": 11,
    "subject": "economics",
    "unitNumber": 1,
    "front": "What are the four properties of standard Indifference Curves?",
    "back": "1. Downward sloping to the right.\n2. Convex to the origin (diminishing MRS).\n3. Indifference curves never intersect.\n4. Higher indifference curves represent higher utility levels.",
    "category": "concept"
  },
  {
    "id": "fc-econ-g11-u1-426",
    "grade": 11,
    "subject": "economics",
    "unitNumber": 1,
    "front": "What is the Marginal Rate of Substitution (MRS_xy)?",
    "back": "The rate at which a consumer is willing to give up good Y to obtain an extra unit of good X while maintaining the same utility: MRS_xy = -ΔY/ΔX = MU_x / MU_y.",
    "category": "formula"
  },
  {
    "id": "fc-econ-g11-u2-427",
    "grade": 11,
    "subject": "economics",
    "unitNumber": 2,
    "front": "State the Law of Diminishing Marginal Returns in production.",
    "back": "As successive units of a variable input (e.g., labor) are added to a fixed input (e.g., land/capital), marginal product of the variable input eventually diminishes.",
    "category": "concept"
  },
  {
    "id": "fc-econ-g11-u2-428",
    "grade": 11,
    "subject": "economics",
    "unitNumber": 2,
    "front": "Define Total Cost (TC), Average Total Cost (ATC), and Marginal Cost (MC).",
    "back": "TC = TFC + TVC\nATC = TC / Q = AFC + AVC\nMC = ΔTC / ΔQ = d(TC)/dQ. (MC cuts ATC and AVC at their minimum points).",
    "category": "formula"
  },
  {
    "id": "fc-econ-g11-u3-429",
    "grade": 11,
    "subject": "economics",
    "unitNumber": 3,
    "front": "What are the key characteristics of Perfect Competition?",
    "back": "1. Many buyers and sellers (price takers).\n2. Homogeneous product.\n3. Free entry and exit.\n4. Perfect information.\n5. Horizontal demand curve (P = MR = AR). Profit max: P = MC.",
    "category": "concept"
  },
  {
    "id": "fc-econ-g11-u3-430",
    "grade": 11,
    "subject": "economics",
    "unitNumber": 3,
    "front": "What is the profit-maximizing output condition for all firms?",
    "back": "Marginal Revenue = Marginal Cost (MR = MC), with MC rising.",
    "category": "formula"
  },
  {
    "id": "fc-econ-g11-u3-431",
    "grade": 11,
    "subject": "economics",
    "unitNumber": 3,
    "front": "When should a competitive firm shut down in the short run?",
    "back": "When market price falls below minimum Average Variable Cost (P < min AVC).",
    "category": "concept"
  },
  {
    "id": "fc-econ-g11-u4-432",
    "grade": 11,
    "subject": "economics",
    "unitNumber": 4,
    "front": "What are the four market structures ordered from most to least competitive?",
    "back": "1. Perfect Competition\n2. Monopolistic Competition\n3. Oligopoly\n4. Pure Monopoly",
    "category": "definition"
  },
  {
    "id": "fc-econ-g11-u5-433",
    "grade": 11,
    "subject": "economics",
    "unitNumber": 5,
    "front": "What is the Expenditure Approach formula for calculating Gross Domestic Product (GDP)?",
    "back": "GDP = C + I + G + (X - M)\nwhere C = Consumption, I = Investment, G = Government purchases, X = Exports, M = Imports.",
    "category": "formula"
  },
  {
    "id": "fc-econ-g11-u5-434",
    "grade": 11,
    "subject": "economics",
    "unitNumber": 5,
    "front": "What is the difference between Nominal GDP and Real GDP?",
    "back": "Nominal GDP measures output using current-year prices. Real GDP measures output using constant base-year prices, adjusting for inflation.\nGDP Deflator = (Nominal GDP / Real GDP) * 100.",
    "category": "definition"
  },
  {
    "id": "fc-econ-g12-u1-435",
    "grade": 12,
    "subject": "economics",
    "unitNumber": 1,
    "front": "What are the types of Unemployment?",
    "back": "1. Frictional: Workers transitioning between jobs.\n2. Structural: Mismatch between worker skills and market needs.\n3. Cyclical: Due to economic recessions and downturns.\n4. Seasonal: Fluctuations with seasons.",
    "category": "definition"
  },
  {
    "id": "fc-econ-g12-u1-436",
    "grade": 12,
    "subject": "economics",
    "unitNumber": 1,
    "front": "What is the Natural Rate of Unemployment (NRU)?",
    "back": "The sum of frictional and structural unemployment when the economy is at full employment (cyclical unemployment = 0).",
    "category": "concept"
  },
  {
    "id": "fc-econ-g12-u2-437",
    "grade": 12,
    "subject": "economics",
    "unitNumber": 2,
    "front": "Distinguish Demand-Pull from Cost-Push Inflation.",
    "back": "Demand-Pull: Aggregate demand outpaces aggregate supply ('too much money chasing too few goods'). Cost-Push: Rising production costs (wages, raw materials, energy) shift aggregate supply leftward.",
    "category": "concept"
  },
  {
    "id": "fc-econ-g12-u2-438",
    "grade": 12,
    "subject": "economics",
    "unitNumber": 2,
    "front": "What does the Phillips Curve illustrate?",
    "back": "An inverse short-run relationship between inflation and unemployment (lower unemployment correlates with higher inflation).",
    "category": "concept"
  },
  {
    "id": "fc-econ-g12-u3-439",
    "grade": 12,
    "subject": "economics",
    "unitNumber": 3,
    "front": "What are the three quantitative monetary policy tools of a Central Bank?",
    "back": "1. Reserve Requirement Ratio (RRR)\n2. Discount Rate (Central bank lending rate to commercial banks)\n3. Open Market Operations (buying/selling government treasury securities).",
    "category": "concept"
  },
  {
    "id": "fc-econ-g12-u3-440",
    "grade": 12,
    "subject": "economics",
    "unitNumber": 3,
    "front": "What is the Simple Money Multiplier formula?",
    "back": "m = 1 / RRR\nTotal potential money creation ΔM = Initial Deposit * (1 / RRR).",
    "category": "formula"
  },
  {
    "id": "fc-econ-g12-u4-441",
    "grade": 12,
    "subject": "economics",
    "unitNumber": 4,
    "front": "Distinguish Expansionary from Contractionary Fiscal Policy.",
    "back": "Expansionary: Increase government spending (G) and/or cut taxes (T) to boost aggregate demand. Contractionary: Decrease G and/or raise T to cool down inflation.",
    "category": "concept"
  },
  {
    "id": "fc-econ-g12-u4-442",
    "grade": 12,
    "subject": "economics",
    "unitNumber": 4,
    "front": "What is the Autonomous Spending Multiplier?",
    "back": "k = 1 / (1 - MPC) = 1 / MPS\nwhere MPC = Marginal Propensity to Consume, MPS = Marginal Propensity to Save.",
    "category": "formula"
  },
  {
    "id": "fc-econ-g12-u5-443",
    "grade": 12,
    "subject": "economics",
    "unitNumber": 5,
    "front": "State the Principle of Comparative Advantage (David Ricardo).",
    "back": "A country should specialize in producing and exporting goods that it can produce at a lower opportunity cost than other nations, even if it has an absolute advantage in neither.",
    "category": "concept"
  },
  {
    "id": "fc-econ-g12-u5-444",
    "grade": 12,
    "subject": "economics",
    "unitNumber": 5,
    "front": "What are the components of the Balance of Payments (BOP)?",
    "back": "1. Current Account (Trade balance, services, primary & secondary income transfers)\n2. Capital Account (Capital transfers)\n3. Financial Account (Direct investment, portfolio investment, reserve assets).",
    "category": "definition"
  },
  {
    "id": "fc-hist-g9-u1-445",
    "grade": 9,
    "subject": "history",
    "unitNumber": 1,
    "front": "Distinguish Primary from Secondary historical sources with examples.",
    "back": "Primary: Eyewitness accounts, original manuscripts, artifacts, decrees (e.g., Ezana stone inscription). Secondary: Textbooks, biographies, interpretations written after the event.",
    "category": "definition"
  },
  {
    "id": "fc-hist-g9-u2-446",
    "grade": 9,
    "subject": "history",
    "unitNumber": 2,
    "front": "Where and when was Australopithecus afarensis ('Lucy' / 'Dinkinesh') discovered?",
    "back": "Discovered in Hadar, Afar Depression, Ethiopia in 1974 by Donald Johanson; dated to ~3.2 million years ago.",
    "category": "date_fact"
  },
  {
    "id": "fc-hist-g9-u2-447",
    "grade": 9,
    "subject": "history",
    "unitNumber": 2,
    "front": "What are the earliest known stone tools and their age?",
    "back": "Oldowan pebble tools, manufactured by Homo habilis ~2.6 million years ago in the Awash Valley (Gona/Ledi-Geraru), Ethiopia.",
    "category": "date_fact"
  },
  {
    "id": "fc-hist-g9-u3-448",
    "grade": 9,
    "subject": "history",
    "unitNumber": 3,
    "front": "What was the Land of Punt and what goods were traded?",
    "back": "An ancient Horn of Africa kingdom famed for aromatic myrrh, frankincense, gold, ivory, and ebony, visited by Egyptian Queen Hatshepsut's expedition in 1493 BC.",
    "category": "date_fact"
  },
  {
    "id": "fc-hist-g9-u3-449",
    "grade": 9,
    "subject": "history",
    "unitNumber": 3,
    "front": "What was the Kingdom of Da'amat and its capital?",
    "back": "A pre-Aksumite polity flourishing in the 8th-7th century BC centered at Yeha, where the Great Temple of the Moon stands.",
    "category": "date_fact"
  },
  {
    "id": "fc-hist-g9-u4-450",
    "grade": 9,
    "subject": "history",
    "unitNumber": 4,
    "front": "What was the major port city of the Kingdom of Aksum?",
    "back": "Adulis, on the Red Sea coast, an international trade hub connecting the Mediterranean, Arabia, India, and the African interior.",
    "category": "date_fact"
  },
  {
    "id": "fc-hist-g9-u4-451",
    "grade": 9,
    "subject": "history",
    "unitNumber": 4,
    "front": "Who was King Ezana and what was his landmark achievement?",
    "back": "King of Aksum (c. 320-360 AD) who converted to Christianity c. 330 AD with Frumentius (Abba Selama), made Christianity state religion, and minted coins with the Cross.",
    "category": "date_fact"
  },
  {
    "id": "fc-hist-g9-u4-452",
    "grade": 9,
    "subject": "history",
    "unitNumber": 4,
    "front": "Who was King Kaleb and what military campaign did he lead?",
    "back": "6th-century Aksumite King who led a naval expedition across the Red Sea in 525 AD to protect Christians in Himyar (South Arabia/Yemen).",
    "category": "date_fact"
  },
  {
    "id": "fc-hist-g10-u1-453",
    "grade": 10,
    "subject": "history",
    "unitNumber": 1,
    "front": "Who founded the Zagwe Dynasty and where was its center?",
    "back": "The Agaw aristocracy of Bugna (Lasta), centered at Roha (Lalibela); King Gebre Mesqel Lalibela oversaw the carving of 11 monolithic rock-hewn churches in the 12th-13th century.",
    "category": "date_fact"
  },
  {
    "id": "fc-hist-g10-u1-454",
    "grade": 10,
    "subject": "history",
    "unitNumber": 1,
    "front": "When was the Solomonic Dynasty restored and by whom?",
    "back": "In 1270 AD by Yekuno Amlak, claiming descent from the Aksumite monarchs and King Solomon of Israel.",
    "category": "date_fact"
  },
  {
    "id": "fc-hist-g10-u2-455",
    "grade": 10,
    "subject": "history",
    "unitNumber": 2,
    "front": "Who was Emperor Zara Yaqob and what were his reforms?",
    "back": "Emperor (1434–1468) who instituted religious reforms (Council of Debre Mitmaq 1450), reorganized administration, and wrote ecclesiastical books (Mets'hafe Berhan).",
    "category": "date_fact"
  },
  {
    "id": "fc-hist-g10-u2-456",
    "grade": 10,
    "subject": "history",
    "unitNumber": 2,
    "front": "Who was Ahmad ibn Ibrahim al-Ghazi ('Ahmad Gragn')?",
    "back": "Leader of the Adal Sultanate who launched a major military campaign against the Christian highland kingdom (1529–1543), defeating Lebna Dengel at Shimbra Kure (1529).",
    "category": "date_fact"
  },
  {
    "id": "fc-hist-g10-u2-457",
    "grade": 10,
    "subject": "history",
    "unitNumber": 2,
    "front": "What was the outcome of the Battle of Wayna Dega (1543)?",
    "back": "Emperor Gelawdewos, reinforced by Portuguese musketeers under Christopher da Gama, defeated and killed Ahmad Gragn, ending the Adal-Christian war.",
    "category": "date_fact"
  },
  {
    "id": "fc-hist-g10-u3-458",
    "grade": 10,
    "subject": "history",
    "unitNumber": 3,
    "front": "What is the Gadaa system and its generational cycle?",
    "back": "An egalitarian socio-political democratic governance system of the Oromo people, where cohorts transition through 8-year age-grades under the leadership of the Abba Gadaa.",
    "category": "concept"
  },
  {
    "id": "fc-hist-g10-u4-459",
    "grade": 10,
    "subject": "history",
    "unitNumber": 4,
    "front": "Who founded the city of Gondar as the permanent imperial capital?",
    "back": "Emperor Fasilides in 1636 AD, beginning the Gondarine Period characterized by castle architecture (Fasil Ghebbi) and expulsion of Jesuit missionaries.",
    "category": "date_fact"
  },
  {
    "id": "fc-hist-g10-u5-460",
    "grade": 10,
    "subject": "history",
    "unitNumber": 5,
    "front": "What was the Zemene Mesafint ('Era of the Princes')?",
    "back": "Period from 1769 (assassination of Emperor Iyoas by Ras Mikael Sehul) to 1855, characterized by weak puppet emperors and regional warlords fighting for power.",
    "category": "date_fact"
  },
  {
    "id": "fc-hist-g11-u1-461",
    "grade": 11,
    "subject": "history",
    "unitNumber": 1,
    "front": "Who was Emperor Tewodros II and what was his historic mission?",
    "back": "Born Kassa Hailu of Qwara, crowned Emperor in 1855 at Deresge; initiated modern reunification, created a disciplined standing army, and manufactured cannons at Gafat.",
    "category": "date_fact"
  },
  {
    "id": "fc-hist-g11-u1-462",
    "grade": 11,
    "subject": "history",
    "unitNumber": 1,
    "front": "What happened at the Battle of Meqdala (1868)?",
    "back": "British expedition under General Robert Napier besieged Tewodros's mountain fortress; Tewodros chose suicide over surrender on April 13, 1868.",
    "category": "date_fact"
  },
  {
    "id": "fc-hist-g11-u2-463",
    "grade": 11,
    "subject": "history",
    "unitNumber": 2,
    "front": "What foreign invasions did Emperor Yohannes IV defeat?",
    "back": "1. Egyptian invasions: Battle of Gundet (1875) and Battle of Gura (1876).\n2. Italian invasion: Battle of Dogali (1887, led by Ras Alula Aba Nega).\n3. Mahdists of Sudan: Battle of Metemma (1889, where Yohannes was martyred).",
    "category": "date_fact"
  },
  {
    "id": "fc-hist-g11-u3-464",
    "grade": 11,
    "subject": "history",
    "unitNumber": 3,
    "front": "What was the Treaty of Wuchale (1889) dispute between Ethiopia and Italy?",
    "back": "Article XVII: The Italian text stated Ethiopia 'consents to use Italy' for all foreign affairs (making it a protectorate), while the Amharic text stated Ethiopia 'may' use Italy. Menelik annulled the treaty.",
    "category": "concept"
  },
  {
    "id": "fc-hist-g11-u3-465",
    "grade": 11,
    "subject": "history",
    "unitNumber": 3,
    "front": "What was the historical significance of the Battle of Adwa (March 1, 1896)?",
    "back": "Ethiopian forces under Menelik II and Empress Taytu decisively routed the Italian invading army under Baratieri; secured Ethiopian sovereignty and became a beacon of Pan-African anti-colonial victory.",
    "category": "date_fact"
  },
  {
    "id": "fc-hist-g11-u4-466",
    "grade": 11,
    "subject": "history",
    "unitNumber": 4,
    "front": "What was the 1884-1885 Berlin Conference?",
    "back": "Meeting of 14 European imperialist nations that partitioned Africa into colonial spheres of influence without African representation, launching the 'Scramble for Africa'.",
    "category": "date_fact"
  },
  {
    "id": "fc-hist-g12-u1-467",
    "grade": 12,
    "subject": "history",
    "unitNumber": 1,
    "front": "When was Emperor Haile Selassie I crowned and when was Ethiopia's first written constitution issued?",
    "back": "Coronation: November 2, 1930.\nFirst Written Constitution: July 16, 1931.",
    "category": "date_fact"
  },
  {
    "id": "fc-hist-g12-u2-468",
    "grade": 12,
    "subject": "history",
    "unitNumber": 2,
    "front": "What was the Walwal Incident (December 1934)?",
    "back": "A border skirmish between Ethiopian and Italian-Somali colonial forces at the Walwal oasis, used by Mussolini's fascist regime as a pretext to invade Ethiopia in October 1935.",
    "category": "date_fact"
  },
  {
    "id": "fc-hist-g12-u2-469",
    "grade": 12,
    "subject": "history",
    "unitNumber": 2,
    "front": "What was the Yekatit 12 Massacre (Black Saturday)?",
    "back": "In February 1937, after an assassination attempt by Abreha Deboch and Moges Asgedom on Italian Viceroy Rodolfo Graziani, fascist troops massacred ~30,000 Ethiopians in Addis Ababa and Debre Libanos.",
    "category": "date_fact"
  },
  {
    "id": "fc-hist-g12-u2-470",
    "grade": 12,
    "subject": "history",
    "unitNumber": 2,
    "front": "When was Ethiopia liberated from Italian fascist occupation?",
    "back": "May 5, 1941, when Emperor Haile Selassie triumphantly re-entered Addis Ababa with Arbegnoch patriots and the Anglo-Ethiopian Gideon Force.",
    "category": "date_fact"
  },
  {
    "id": "fc-hist-g12-u3-471",
    "grade": 12,
    "subject": "history",
    "unitNumber": 3,
    "front": "What was the 1960 Abortive Coup d'État in Ethiopia?",
    "back": "Led by Brigadier General Mengistu Neway (Imperial Bodyguard) and his brother Germame Neway while the Emperor was in Brazil, seeking progressive modernization.",
    "category": "date_fact"
  },
  {
    "id": "fc-hist-g12-u4-472",
    "grade": 12,
    "subject": "history",
    "unitNumber": 4,
    "front": "When was the Organization of African Unity (OAU) founded and where?",
    "back": "May 25, 1963 in Addis Ababa, Ethiopia, with 32 independent African founding states; Addis Ababa became the permanent headquarters.",
    "category": "date_fact"
  },
  {
    "id": "fc-hist-g12-u4-473",
    "grade": 12,
    "subject": "history",
    "unitNumber": 4,
    "front": "What were the primary catalysts of the 1974 Ethiopian Revolution?",
    "back": "1. 1973 Wollo Famine covered up by imperial government.\n2. Global oil crisis and inflation.\n3. Student and military mutinies chanting 'Land to the Tiller'. Derg deposed Emperor Haile Selassie on September 12, 1974.",
    "category": "concept"
  },
  {
    "id": "fc-hist-g12-u5-474",
    "grade": 12,
    "subject": "history",
    "unitNumber": 5,
    "front": "What was the Ethio-Somali War of 1977-1978?",
    "back": "Siad Barre's Somali army invaded the eastern Ogaden region to realize 'Greater Somalia'. Ethiopian armed forces, backed by Soviet logistics and Cuban troops, expelled the invaders at the Battle of Karamara (March 1978).",
    "category": "date_fact"
  },
  {
    "id": "fc-geog-g9-u1-475",
    "grade": 9,
    "subject": "geography",
    "unitNumber": 1,
    "front": "What are the three types of map scale?",
    "back": "1. Representative Fraction (RF, e.g., 1:50,000)\n2. Graphic / Bar scale\n3. Verbal / Statement scale (e.g., '1 cm represents 500 m').",
    "category": "definition"
  },
  {
    "id": "fc-geog-g9-u1-476",
    "grade": 9,
    "subject": "geography",
    "unitNumber": 1,
    "front": "What do closely spaced contour lines indicate on a topographic map?",
    "back": "A steep slope. Widely spaced contour lines indicate a gentle slope; concentric circles with increasing heights indicate a hill.",
    "category": "concept"
  },
  {
    "id": "fc-geog-g9-u2-477",
    "grade": 9,
    "subject": "geography",
    "unitNumber": 2,
    "front": "What are the three structural layers of the Earth?",
    "back": "1. Crust (Continental SIAL and Oceanic SIMA)\n2. Mantle (Asthenosphere with convection currents)\n3. Core (Outer liquid iron-nickel and inner solid iron-nickel).",
    "category": "definition"
  },
  {
    "id": "fc-geog-g9-u2-478",
    "grade": 9,
    "subject": "geography",
    "unitNumber": 2,
    "front": "What causes earthquakes and where is the Epicenter located?",
    "back": "Sudden release of strain energy along geological faults. Focus/Hypocenter is the underground point of origin; Epicenter is the point on Earth's surface directly above the focus.",
    "category": "concept"
  },
  {
    "id": "fc-geog-g9-u3-479",
    "grade": 9,
    "subject": "geography",
    "unitNumber": 3,
    "front": "Distinguish Mechanical from Chemical Weathering.",
    "back": "Mechanical: Physical breakdown of rock into smaller fragments without chemical change (frost wedging, thermal expansion). Chemical: Decomposition of rock minerals via chemical reactions (carbonation, oxidation, hydrolysis).",
    "category": "definition"
  },
  {
    "id": "fc-geog-g10-u1-480",
    "grade": 10,
    "subject": "geography",
    "unitNumber": 1,
    "front": "What are the major greenhouse gases causing anthropogenic global warming?",
    "back": "Carbon dioxide (CO₂), Methane (CH₄), Nitrous oxide (N₂O), Chlorofluorocarbons (CFCs), and Water vapor.",
    "category": "definition"
  },
  {
    "id": "fc-geog-g10-u2-481",
    "grade": 10,
    "subject": "geography",
    "unitNumber": 2,
    "front": "What are the three economic sectors of production?",
    "back": "1. Primary: Extraction of raw natural resources (agriculture, mining, forestry).\n2. Secondary: Manufacturing and industrial processing.\n3. Tertiary: Provision of services (banking, transport, education, tourism).",
    "category": "definition"
  },
  {
    "id": "fc-geog-g11-u1-482",
    "grade": 11,
    "subject": "geography",
    "unitNumber": 1,
    "front": "What is the absolute geographical location of Ethiopia?",
    "back": "Latitude: 3°N to 15°N\nLongitude: 33°E to 48°E\nTotal surface area: ~1,104,300 km².",
    "category": "date_fact"
  },
  {
    "id": "fc-geog-g11-u1-483",
    "grade": 11,
    "subject": "geography",
    "unitNumber": 1,
    "front": "What geological events occurred in Ethiopia during the Mesozoic era?",
    "back": "Marine transgression (sinking of land, sea advancing from SE depositing Adigrat Sandstone then Antalo Limestone) followed by marine regression depositing Upper Sandstone.",
    "category": "concept"
  },
  {
    "id": "fc-geog-g11-u1-484",
    "grade": 11,
    "subject": "geography",
    "unitNumber": 1,
    "front": "What major geological structure formed in Ethiopia during the Tertiary period?",
    "back": "The Great East African Rift Valley, accompanied by massive volcanic trap basalt outpourings forming the Ethiopian Highlands.",
    "category": "date_fact"
  },
  {
    "id": "fc-geog-g11-u2-485",
    "grade": 11,
    "subject": "geography",
    "unitNumber": 2,
    "front": "What is the highest mountain peak in Ethiopia and its elevation?",
    "back": "Mount Ras Dejen (4,550 meters above sea level), located in the Simien Mountains massifs.",
    "category": "date_fact"
  },
  {
    "id": "fc-geog-g11-u2-486",
    "grade": 11,
    "subject": "geography",
    "unitNumber": 2,
    "front": "What is the lowest depression in Ethiopia and its depth?",
    "back": "Dallol / Kobar Sink in the Danakil (Afar) Depression, reaching approximately 125 meters below sea level.",
    "category": "date_fact"
  },
  {
    "id": "fc-geog-g11-u3-487",
    "grade": 11,
    "subject": "geography",
    "unitNumber": 3,
    "front": "Name the three major drainage systems of Ethiopia.",
    "back": "1. Western / Mediterranean Basin (Abbay, Tekeze, Baro-Akobo draining ~60% of water)\n2. South-Eastern / Indian Ocean Basin (Genale-Dawa, Wabi Shebelle)\n3. Inland / Rift Valley Basin (Awash River, Omo-Gibe, Rift lakes).",
    "category": "concept"
  },
  {
    "id": "fc-geog-g11-u3-488",
    "grade": 11,
    "subject": "geography",
    "unitNumber": 3,
    "front": "Where does the Abbay (Blue Nile) originate and where does it join the White Nile?",
    "back": "Originates from Gilgel Abbay flowing into Lake Tana; joins the White Nile at Khartoum, Sudan, providing over 60% of the Nile's total flow.",
    "category": "date_fact"
  },
  {
    "id": "fc-geog-g11-u3-489",
    "grade": 11,
    "subject": "geography",
    "unitNumber": 3,
    "front": "What is the longest river within Ethiopia's national borders?",
    "back": "Wabi Shebelle River (~1,340 km within Ethiopian territory).",
    "category": "date_fact"
  },
  {
    "id": "fc-geog-g11-u4-490",
    "grade": 11,
    "subject": "geography",
    "unitNumber": 4,
    "front": "Name the 5 traditional Ethiopian agro-climatic zones and their altitude ranges.",
    "back": "1. Kur / Wirch: > 3,300 m (Cold alpine)\n2. Dega: 2,300 – 3,300 m (Cool temperate)\n3. Weyna Dega: 1,500 – 2,300 m (Warm subtropical)\n4. Kolla: 500 – 1,500 m (Warm tropical)\n5. Bereha: < 500 m (Hot arid desert).",
    "category": "definition"
  },
  {
    "id": "fc-geog-g11-u4-491",
    "grade": 11,
    "subject": "geography",
    "unitNumber": 4,
    "front": "What atmospheric system brings the main summer rains (Kiremt) to Ethiopia?",
    "back": "The Inter-Tropical Convergence Zone (ITCZ) shifting north, drawing moist south-westerly Equatorial Westerlies / Congo Air Stream and Indian Ocean monsoons.",
    "category": "concept"
  },
  {
    "id": "fc-geog-g12-u1-492",
    "grade": 12,
    "subject": "geography",
    "unitNumber": 1,
    "front": "What are the dominant demographic characteristics of Ethiopia's population?",
    "back": "Rapid natural increase rate (~2.6% per annum), broad-based population pyramid with high youth dependency (>40% under age 15), and ~22% urbanization rate.",
    "category": "concept"
  },
  {
    "id": "fc-geog-g12-u2-493",
    "grade": 12,
    "subject": "geography",
    "unitNumber": 2,
    "front": "What is the economic role of Agriculture in Ethiopia?",
    "back": "Accounts for ~32% of GDP, employs ~70% of the active labor force, and provides ~75% of total foreign merchandise export earnings.",
    "category": "date_fact"
  },
  {
    "id": "fc-geog-g12-u2-494",
    "grade": 12,
    "subject": "geography",
    "unitNumber": 2,
    "front": "What are Ethiopia's primary agricultural export commodities?",
    "back": "Arabica coffee (leading export), oilseeds (sesame, niger seed), pulses (faba beans, chickpeas), cut flowers (floriculture), and khat.",
    "category": "concept"
  },
  {
    "id": "fc-geog-g12-u3-495",
    "grade": 12,
    "subject": "geography",
    "unitNumber": 3,
    "front": "What is the Grand Ethiopian Renaissance Dam (GERD) and its installed capacity?",
    "back": "A major hydroelectric gravity dam on the Abbay (Blue Nile) in Benishangul-Gumuz Region with an installed capacity of 5,150 MW, the largest in Africa.",
    "category": "date_fact"
  },
  {
    "id": "fc-geog-g12-u3-496",
    "grade": 12,
    "subject": "geography",
    "unitNumber": 3,
    "front": "What is the primary export trade corridor for landlocked Ethiopia?",
    "back": "The Addis Ababa–Djibouti Transport Corridor (standard gauge electrified railway 756 km and highway handling >90% of Ethiopian import-export cargo).",
    "category": "date_fact"
  },
  {
    "id": "fc-engl-g9-u1-497",
    "grade": 9,
    "subject": "english",
    "unitNumber": 1,
    "front": "State the structure and usage of the Zero Conditional.",
    "back": "Structure: If + Present Simple, Present Simple.\nUsage: Scientific facts, universal laws, and general truths.\nExample: If you heat ice, it melts.",
    "category": "formula"
  },
  {
    "id": "fc-engl-g9-u1-498",
    "grade": 9,
    "subject": "english",
    "unitNumber": 1,
    "front": "State the structure and usage of the First Conditional.",
    "back": "Structure: If + Present Simple, will + Base Verb.\nUsage: Real or very likely future possibilities.\nExample: If it rains tomorrow, we will stay home.",
    "category": "formula"
  },
  {
    "id": "fc-engl-g9-u2-499",
    "grade": 9,
    "subject": "english",
    "unitNumber": 2,
    "front": "State the structure and usage of the Second Conditional.",
    "back": "Structure: If + Past Simple, would + Base Verb.\nUsage: Hypothetical, unreal, or imaginary present/future situations.\nExample: If I had a million dollars, I would travel the world.",
    "category": "formula"
  },
  {
    "id": "fc-engl-g9-u2-500",
    "grade": 9,
    "subject": "english",
    "unitNumber": 2,
    "front": "State the structure and usage of the Third Conditional.",
    "back": "Structure: If + Past Perfect, would have + Past Participle.\nUsage: Unreal past events, expressing regrets or impossible past conditions.\nExample: If she had studied harder, she would have passed the matric exam.",
    "category": "formula"
  },
  {
    "id": "fc-engl-g9-u3-501",
    "grade": 9,
    "subject": "english",
    "unitNumber": 3,
    "front": "What is the Passive Voice transformation rule for the Present Simple?",
    "back": "Active: Subject + Verb(s) + Object.\nPassive: Object + is/am/are + Past Participle (V3) + (by Subject).\nExample: 'He writes the report' -> 'The report is written by him'.",
    "category": "formula"
  },
  {
    "id": "fc-engl-g9-u3-502",
    "grade": 9,
    "subject": "english",
    "unitNumber": 3,
    "front": "What is the Passive Voice transformation rule for the Past Simple?",
    "back": "Active: Subject + V2 + Object.\nPassive: Object + was/were + Past Participle (V3) + (by Subject).\nExample: 'The workers built the bridge' -> 'The bridge was built by the workers'.",
    "category": "formula"
  },
  {
    "id": "fc-engl-g9-u4-503",
    "grade": 9,
    "subject": "english",
    "unitNumber": 4,
    "front": "What tense changes occur when converting Direct Speech to Reported Speech?",
    "back": "Present Simple -> Past Simple\nPresent Continuous -> Past Continuous\nPresent Perfect -> Past Perfect\nPast Simple -> Past Perfect\nwill -> would, can -> could, may -> might.",
    "category": "concept"
  },
  {
    "id": "fc-engl-g9-u4-504",
    "grade": 9,
    "subject": "english",
    "unitNumber": 4,
    "front": "How do time expressions change in Reported Speech?",
    "back": "today -> that day\nyesterday -> the day before / the previous day\ntomorrow -> the next day / the following day\nnow -> then\nhere -> there\nthis -> that.",
    "category": "definition"
  },
  {
    "id": "fc-engl-g9-u5-505",
    "grade": 9,
    "subject": "english",
    "unitNumber": 5,
    "front": "State the Subject-Verb Agreement rule for 'Either...or' and 'Neither...nor'.",
    "back": "When two subjects are joined by 'either...or' or 'neither...nor', the verb agrees in number and person with the nearer subject.\nExample: Neither the teacher nor the students were present.",
    "category": "concept"
  },
  {
    "id": "fc-engl-g10-u1-506",
    "grade": 10,
    "subject": "english",
    "unitNumber": 1,
    "front": "Distinguish Defining from Non-defining Relative Clauses.",
    "back": "Defining: Essential to identify the noun; no commas; can use 'that'. (e.g., 'The student who scored 100 received an award'). Non-defining: Gives extra non-essential info; separated by commas; cannot use 'that' (must use 'which/who').",
    "category": "definition"
  },
  {
    "id": "fc-engl-g10-u2-507",
    "grade": 10,
    "subject": "english",
    "unitNumber": 2,
    "front": "Which modal verbs express strong obligation vs advice?",
    "back": "Strong Obligation: 'Must' (internal obligation/rule) and 'Have to' (external law/regulation).\nAdvice: 'Should' and 'Ought to'.",
    "category": "concept"
  },
  {
    "id": "fc-engl-g10-u3-508",
    "grade": 10,
    "subject": "english",
    "unitNumber": 3,
    "front": "What is the difference between a Gerund and a Present Participle?",
    "back": "Both end in -ing. A Gerund functions as a noun (e.g., 'Swimming is great exercise'). A Present Participle functions as a verb tense component or an adjective (e.g., 'She is swimming', 'a crying baby').",
    "category": "definition"
  },
  {
    "id": "fc-engl-g10-u4-509",
    "grade": 10,
    "subject": "english",
    "unitNumber": 4,
    "front": "Name 5 verbs followed exclusively by Gerunds (-ing).",
    "back": "1. Enjoy, 2. Avoid, 3. Postpone, 4. Admit, 5. Consider.\nExample: 'He avoids eating junk food'.",
    "category": "concept"
  },
  {
    "id": "fc-engl-g10-u4-510",
    "grade": 10,
    "subject": "english",
    "unitNumber": 4,
    "front": "Name 5 verbs followed exclusively by Infinitives (to + verb).",
    "back": "1. Decide, 2. Hope, 3. Promise, 4. Refuse, 5. Manage.\nExample: 'They decided to leave early'.",
    "category": "concept"
  },
  {
    "id": "fc-engl-g11-u1-511",
    "grade": 11,
    "subject": "english",
    "unitNumber": 1,
    "front": "What is an Inversion after negative adverbials?",
    "back": "When a sentence begins with a negative or restrictive adverbial (Never, Seldom, Rarely, Hardly, Scarcely, No sooner), the auxiliary verb comes before the subject.\nExample: 'Never have I seen such dedication'.",
    "category": "concept"
  },
  {
    "id": "fc-engl-g11-u2-512",
    "grade": 11,
    "subject": "english",
    "unitNumber": 2,
    "front": "Explain the difference between 'used to + verb' and 'be used to + -ing'.",
    "back": "'Used to + base verb': Past habits/states that no longer happen (e.g., 'I used to live in Gondar').\n'Be used to + -ing/noun': Accustomed to something (e.g., 'She is used to waking up early').",
    "category": "definition"
  },
  {
    "id": "fc-engl-g12-u1-513",
    "grade": 12,
    "subject": "english",
    "unitNumber": 1,
    "front": "What are Cleft Sentences and why are they used?",
    "back": "Sentences split into two clauses to emphasize a specific part: 'It was... that...' or 'What... is/was...'.\nExample: 'It was Menelik II who led the forces at Adwa'.",
    "category": "concept"
  },
  {
    "id": "fc-engl-g12-u2-514",
    "grade": 12,
    "subject": "english",
    "unitNumber": 2,
    "front": "Define the Subjunctive Mood in English with an example.",
    "back": "Used to express wishes, recommendations, demands, or conditions contrary to fact. Uses base form of verb regardless of subject.\nExample: 'The doctor recommended that he take (not takes) a rest'.",
    "category": "definition"
  },
  {
    "id": "fc-engl-g12-u3-515",
    "grade": 12,
    "subject": "english",
    "unitNumber": 3,
    "front": "Explain the meanings of phrasal verbs: 'carry out', 'put up with', 'call off', 'bring about'.",
    "back": "• Carry out: Execute or perform (a task/research)\n• Put up with: Tolerate or endure\n• Call off: Cancel an event\n• Bring about: Cause something to happen.",
    "category": "definition"
  },
  {
    "id": "fc-citi-g9-u1-516",
    "grade": 9,
    "subject": "citizenship",
    "unitNumber": 1,
    "front": "Define Democracy and its core principles.",
    "back": "Democracy (government of the people, by the people, for the people): Popular sovereignty, citizen participation, majority rule with protection of minority rights, periodic free and fair elections, and rule of law.",
    "category": "definition"
  },
  {
    "id": "fc-citi-g9-u1-517",
    "grade": 9,
    "subject": "citizenship",
    "unitNumber": 1,
    "front": "What is the Rule of Law?",
    "back": "The principle that all people, institutions, and leaders are accountable to laws that are publicly promulgated, equally enforced, and independently adjudicated.",
    "category": "concept"
  },
  {
    "id": "fc-citi-g9-u2-518",
    "grade": 9,
    "subject": "citizenship",
    "unitNumber": 2,
    "front": "What are the three branches of democratic government and their functions?",
    "back": "1. Legislative: Enacts and passes laws (Parliament / HoPR).\n2. Executive: Enforces and implements laws (Prime Minister and Cabinet).\n3. Judiciary: Interprets laws and administers justice (Courts).",
    "category": "definition"
  },
  {
    "id": "fc-citi-g9-u3-519",
    "grade": 9,
    "subject": "citizenship",
    "unitNumber": 3,
    "front": "What are the primary Civic Rights vs Civic Duties of an Ethiopian citizen?",
    "back": "Rights: Right to life, liberty, freedom of speech, voting, equality. Duties: Paying taxes, obeying the law, defending the country, protecting public property and environment.",
    "category": "concept"
  },
  {
    "id": "fc-citi-g10-u1-520",
    "grade": 10,
    "subject": "citizenship",
    "unitNumber": 1,
    "front": "What is the Universal Declaration of Human Rights (UDHR) and when was it adopted?",
    "back": "A landmark international document outlining fundamental human rights to be universally protected; adopted by the United Nations General Assembly on December 10, 1948.",
    "category": "date_fact"
  },
  {
    "id": "fc-citi-g10-u2-521",
    "grade": 10,
    "subject": "citizenship",
    "unitNumber": 2,
    "front": "What are the three generations of Human Rights?",
    "back": "1. First Generation: Civil and political liberty rights (free speech, fair trial).\n2. Second Generation: Socio-economic rights (education, work, healthcare).\n3. Third Generation: Collective / solidarity rights (peace, healthy environment, development).",
    "category": "definition"
  },
  {
    "id": "fc-citi-g10-u3-522",
    "grade": 10,
    "subject": "citizenship",
    "unitNumber": 3,
    "front": "What is Corruption and what are its harmful societal effects?",
    "back": "The abuse of entrusted power for private gain (bribery, embezzlement, nepotism). It undermines the rule of law, misallocates public resources, discourages investment, and deepens poverty.",
    "category": "concept"
  },
  {
    "id": "fc-citi-g11-u1-523",
    "grade": 11,
    "subject": "citizenship",
    "unitNumber": 1,
    "front": "When was the Constitution of the Federal Democratic Republic of Ethiopia (FDRE) adopted?",
    "back": "Adopted on December 8, 1994, and entered into full legal force on August 21, 1995.",
    "category": "date_fact"
  },
  {
    "id": "fc-citi-g11-u1-524",
    "grade": 11,
    "subject": "citizenship",
    "unitNumber": 1,
    "front": "What are the roles of the House of Peoples' Representatives (HoPR) and House of Federation (HoF)?",
    "back": "HoPR: Highest legislative authority, representing the whole Ethiopian population (up to 550 members). HoF: Represents Nations, Nationalities, and Peoples; interprets the Federal Constitution.",
    "category": "concept"
  },
  {
    "id": "fc-citi-g11-u2-525",
    "grade": 11,
    "subject": "citizenship",
    "unitNumber": 2,
    "front": "What does Article 39 of the 1995 Ethiopian Constitution guarantee?",
    "back": "The unconditional right of every Nation, Nationality, and People in Ethiopia to self-determination, including the right to develop their language, culture, and self-administration up to secession.",
    "category": "concept"
  },
  {
    "id": "fc-citi-g11-u3-526",
    "grade": 11,
    "subject": "citizenship",
    "unitNumber": 3,
    "front": "What is Secularism according to Article 11 of the FDRE Constitution?",
    "back": "Separation of State and Religion: State shall not interfere in religious matters and religion shall not interfere in state affairs. There is no state religion.",
    "category": "concept"
  },
  {
    "id": "fc-citi-g12-u1-527",
    "grade": 12,
    "subject": "citizenship",
    "unitNumber": 1,
    "front": "What is Federalism and how does it balance power?",
    "back": "A system of government where sovereignty is constitutionally shared between a central national authority and regional constituent political units (Regions/States).",
    "category": "definition"
  },
  {
    "id": "fc-citi-g12-u2-528",
    "grade": 12,
    "subject": "citizenship",
    "unitNumber": 2,
    "front": "What are Peaceful Conflict Resolution mechanisms?",
    "back": "1. Negotiation (direct discussion between parties)\n2. Mediation (assisted by a neutral third party)\n3. Arbitration (binding decision by third party)\n4. Traditional customary institutions (e.g., Shimagelena, Jaarsummaa).",
    "category": "concept"
  },
  {
    "id": "fc-citi-g12-u3-529",
    "grade": 12,
    "subject": "citizenship",
    "unitNumber": 3,
    "front": "Distinguish Utilitarianism from Deontological Ethics.",
    "back": "Utilitarianism (Bentham, Mill): An action is morally right if it produces the greatest happiness/good for the greatest number. Deontology (Kant): Actions are morally right based on duty and moral rules (categorical imperative), regardless of consequences.",
    "category": "definition"
  },
  {
    "id": "fc-it-g9-u1-530",
    "grade": 9,
    "subject": "it",
    "unitNumber": 1,
    "front": "What is the Von Neumann Computer Architecture?",
    "back": "A computer architecture consisting of a Central Processing Unit (ALU + Control Unit + Registers), Memory Unit (RAM/ROM), Input/Output mechanisms, and a shared system bus.",
    "category": "concept"
  },
  {
    "id": "fc-it-g9-u1-531",
    "grade": 9,
    "subject": "it",
    "unitNumber": 1,
    "front": "What is the difference between Primary Memory (RAM) and Secondary Memory (ROM/Storage)?",
    "back": "RAM (Random Access Memory): Volatile, temporary working memory read/written directly by CPU. ROM (Read-Only Memory): Non-volatile, retains BIOS firmware permanently. Storage (SSD/HDD): High-capacity persistent data storage.",
    "category": "definition"
  },
  {
    "id": "fc-it-g9-u2-532",
    "grade": 9,
    "subject": "it",
    "unitNumber": 2,
    "front": "What are the three main types of System Software?",
    "back": "1. Operating System (OS: Windows, Linux, Android)\n2. Device Drivers (interface between OS and hardware)\n3. Utility Programs (antivirus, disk defragmenter, file compression).",
    "category": "definition"
  },
  {
    "id": "fc-it-g9-u3-533",
    "grade": 9,
    "subject": "it",
    "unitNumber": 3,
    "front": "What are Network Topologies and the most common types?",
    "back": "The geometric arrangement of devices in a network:\n1. Star (devices connect to central switch/hub - most common)\n2. Bus (single backbone cable with terminators)\n3. Ring (circular token passing)\n4. Mesh (redundant point-to-point links).",
    "category": "concept"
  },
  {
    "id": "fc-it-g10-u1-534",
    "grade": 10,
    "subject": "it",
    "unitNumber": 1,
    "front": "What are the 7 layers of the OSI Reference Model?",
    "back": "1. Physical, 2. Data Link, 3. Network, 4. Transport, 5. Session, 6. Presentation, 7. Application. ('Please Do Not Throw Sausage Pizza Away').",
    "category": "definition"
  },
  {
    "id": "fc-it-g10-u1-535",
    "grade": 10,
    "subject": "it",
    "unitNumber": 1,
    "front": "Distinguish TCP from UDP protocols.",
    "back": "TCP (Transmission Control Protocol): Connection-oriented, reliable, guarantees packet delivery and ordering (e.g., HTTP, email). UDP (User Datagram Protocol): Connectionless, fast, no acknowledgment (e.g., video streaming, DNS).",
    "category": "concept"
  },
  {
    "id": "fc-it-g10-u2-536",
    "grade": 10,
    "subject": "it",
    "unitNumber": 2,
    "front": "What is the function of the Domain Name System (DNS)?",
    "back": "Resolves human-readable domain names (e.g., www.moe.gov.et) into machine-readable numerical IP addresses (e.g., 196.188.10.5).",
    "category": "definition"
  },
  {
    "id": "fc-it-g10-u3-537",
    "grade": 10,
    "subject": "it",
    "unitNumber": 3,
    "front": "What is a Relational Database Management System (RDBMS) and Primary Key?",
    "back": "RDBMS: Stores structured data in related 2D tables of rows (records) and columns (attributes). Primary Key: A unique, non-null field that uniquely identifies each record in a table.",
    "category": "definition"
  },
  {
    "id": "fc-it-g10-u3-538",
    "grade": 10,
    "subject": "it",
    "unitNumber": 3,
    "front": "What is the purpose of a Foreign Key in a database?",
    "back": "A field in one table that uniquely identifies a row in another table, establishing a relationship and enforcing referential integrity.",
    "category": "concept"
  },
  {
    "id": "fc-it-g11-u1-539",
    "grade": 11,
    "subject": "it",
    "unitNumber": 1,
    "front": "What are the core SQL commands: DDL vs DML?",
    "back": "DDL (Data Definition Language): CREATE, ALTER, DROP (defines table schema).\nDML (Data Manipulation Language): SELECT, INSERT, UPDATE, DELETE (manages records).",
    "category": "definition"
  },
  {
    "id": "fc-it-g11-u2-540",
    "grade": 11,
    "subject": "it",
    "unitNumber": 2,
    "front": "What is an Algorithm and its 5 fundamental characteristics?",
    "back": "A step-by-step finite set of instructions to solve a problem.\n1. Finiteness, 2. Definiteness, 3. Input, 4. Output, 5. Effectiveness.",
    "category": "definition"
  },
  {
    "id": "fc-it-g11-u2-541",
    "grade": 11,
    "subject": "it",
    "unitNumber": 2,
    "front": "What is the time complexity (Big-O) of Linear Search vs Binary Search?",
    "back": "Linear Search: O(n) (checks elements sequentially).\nBinary Search: O(log n) (requires sorted array, halves search space each iteration).",
    "category": "formula"
  },
  {
    "id": "fc-it-g11-u3-542",
    "grade": 11,
    "subject": "it",
    "unitNumber": 3,
    "front": "Distinguish Stack (LIFO) from Queue (FIFO) data structures.",
    "back": "Stack: Last-In, First-Out (push to add, pop to remove, e.g., browser back button, function call stack). Queue: First-In, First-Out (enqueue to add, dequeue to remove, e.g., print job queue).",
    "category": "definition"
  },
  {
    "id": "fc-it-g12-u1-543",
    "grade": 12,
    "subject": "it",
    "unitNumber": 1,
    "front": "What is the CIA Triad in Information Security?",
    "back": "1. Confidentiality: Preventing unauthorized access to data (encryption, access control).\n2. Integrity: Ensuring data is accurate and untampered (checksums, hashing).\n3. Availability: Ensuring authorized users have timely access (redundancy, DDoS protection).",
    "category": "concept"
  },
  {
    "id": "fc-it-g12-u2-544",
    "grade": 12,
    "subject": "it",
    "unitNumber": 2,
    "front": "Distinguish Symmetric from Asymmetric Encryption.",
    "back": "Symmetric (AES, DES): Uses the same secret key for both encryption and decryption; faster. Asymmetric (RSA, ECC): Uses a mathematically linked key pair: Public key (encrypts) and Private key (decrypts).",
    "category": "definition"
  },
  {
    "id": "fc-it-g12-u3-545",
    "grade": 12,
    "subject": "it",
    "unitNumber": 3,
    "front": "What is a Firewall and its function?",
    "back": "A network security device or software that monitors and filters incoming and outgoing network traffic based on predetermined security rules.",
    "category": "definition"
  },
  {
    "id": "fc-it-g12-u4-546",
    "grade": 12,
    "subject": "it",
    "unitNumber": 4,
    "front": "What is Cloud Computing and its three service models?",
    "back": "On-demand delivery of computing services over the internet.\n1. IaaS (Infrastructure as a Service: VMs, AWS EC2)\n2. PaaS (Platform as a Service: Heroku, Google App Engine)\n3. SaaS (Software as a Service: Google Docs, Microsoft 365).",
    "category": "definition"
  },
  {
    "id": "fc-agri-g9-u1-547",
    "grade": 9,
    "subject": "agriculture",
    "unitNumber": 1,
    "front": "What are the four components of healthy agricultural soil?",
    "back": "1. Mineral particles (Sand, Silt, Clay): ~45%\n2. Organic matter (Humus): ~5%\n3. Soil water: ~25%\n4. Soil air: ~25%.",
    "category": "concept"
  },
  {
    "id": "fc-agri-g9-u1-548",
    "grade": 9,
    "subject": "agriculture",
    "unitNumber": 1,
    "front": "What are the three primary plant macronutrients (NPK) and their roles?",
    "back": "• Nitrogen (N): Promotes vegetative leafy growth and chlorophyll formation.\n• Phosphorus (P): Stimulates root development and early flowering.\n• Potassium (K): Enhances disease resistance and regulates stomatal water balance.",
    "category": "definition"
  },
  {
    "id": "fc-agri-g9-u2-549",
    "grade": 9,
    "subject": "agriculture",
    "unitNumber": 2,
    "front": "What is Teff (Eragrostis tef) and its agronomic significance in Ethiopia?",
    "back": "An indigenous cereal grain domesticated in Ethiopia, gluten-free, rich in iron and calcium, adaptable to varied agro-ecologies, and the primary staple for baking Injera.",
    "category": "concept"
  },
  {
    "id": "fc-agri-g9-u2-550",
    "grade": 9,
    "subject": "agriculture",
    "unitNumber": 2,
    "front": "What is Enset (Ensete ventricosum) and what foods are processed from it?",
    "back": "The 'false banana', an indigenous perennial crop in south/southwestern Ethiopia with high drought resilience. Processed products include Kocho (fermented pseudostem paste), Bulla (starch precipitate), and Amicho (boiled corm).",
    "category": "concept"
  },
  {
    "id": "fc-agri-g10-u1-551",
    "grade": 10,
    "subject": "agriculture",
    "unitNumber": 1,
    "front": "What is Integrated Pest Management (IPM)?",
    "back": "An ecosystem-based strategy that combines biological control, cultural practices, crop rotation, and resistant crop varieties, using synthetic chemical pesticides only as a last resort.",
    "category": "definition"
  },
  {
    "id": "fc-agri-g10-u2-552",
    "grade": 10,
    "subject": "agriculture",
    "unitNumber": 2,
    "front": "Name four prominent indigenous cattle breeds of Ethiopia.",
    "back": "1. Boran (famed beef breed adapted to arid rangelands)\n2. Fogera (dual-purpose around Lake Tana)\n3. Horro (highlands of western Oromia)\n4. Sheko (trypanotolerant humpless cattle of southwestern forests).",
    "category": "date_fact"
  },
  {
    "id": "fc-agri-g10-u3-553",
    "grade": 10,
    "subject": "agriculture",
    "unitNumber": 3,
    "front": "What are the common soil and water conservation structures used in Ethiopian highlands?",
    "back": "Stone bunds, soil bunds, Fanya-juu terracing (digging a ditch and throwing soil upslope), check dams in gullies, and agroforestry hedgerows.",
    "category": "concept"
  },
  {
    "id": "fc-agri-g11-u1-554",
    "grade": 11,
    "subject": "agriculture",
    "unitNumber": 1,
    "front": "Distinguish Drip Irrigation from Furrow Irrigation.",
    "back": "Drip Irrigation: Pressurized localized delivery directly to plant roots; achieves >90% water-use efficiency. Furrow Irrigation: Gravity-fed surface trenches; lower capital cost but higher water loss via evaporation and seepage.",
    "category": "definition"
  },
  {
    "id": "fc-agri-g11-u2-555",
    "grade": 11,
    "subject": "agriculture",
    "unitNumber": 2,
    "front": "What is Coffea arabica and what are its two main processing methods?",
    "back": "Originating in the wild montane forests of Kaffa/Ethiopia; processed via:\n1. Wet (washed) method: Pulp removed before fermentation; yields clean, bright acidity (e.g., Yirgacheffe).\n2. Dry (natural) method: Cherries sun-dried whole on raised beds; yields heavy body and fruity sweetness (e.g., Harar).",
    "category": "concept"
  },
  {
    "id": "fc-agri-g12-u1-556",
    "grade": 12,
    "subject": "agriculture",
    "unitNumber": 1,
    "front": "What is Post-Harvest Loss and how do PICS bags mitigate it?",
    "back": "Post-Harvest Loss: Degradation or destruction of harvested grain by insects, molds, and rodents. Purdue Improved Crop Storage (PICS) bags use triple-layer hermetic sealing to suffocate storage pests without chemicals.",
    "category": "concept"
  },
  {
    "id": "fc-agri-g12-u2-557",
    "grade": 12,
    "subject": "agriculture",
    "unitNumber": 2,
    "front": "What is Apiculture and what makes Ethiopian honey unique?",
    "back": "Beekeeping. Ethiopia is Africa's leading honey and beeswax producer. Known for specialty honeys like Tigray white honey (from Becium grandiflorum) and yellow forest honeys.",
    "category": "date_fact"
  },
  {
    "id": "fc-gene-g11-u1-558",
    "grade": 11,
    "subject": "general_business",
    "unitNumber": 1,
    "front": "What are the three main forms of business organizations?",
    "back": "1. Sole Proprietorship (one owner, unlimited personal liability)\n2. Partnership (two or more co-owners, shared liability)\n3. Corporation / Share Company (separate legal entity, limited liability, transferable shares).",
    "category": "definition"
  },
  {
    "id": "fc-gene-g11-u1-559",
    "grade": 11,
    "subject": "general_business",
    "unitNumber": 1,
    "front": "What is a Private Limited Company (PLC)?",
    "back": "A business organization owned by 2 to 50 shareholders where liability is limited to subscribed shares and shares cannot be offered to the general public.",
    "category": "definition"
  },
  {
    "id": "fc-gene-g11-u2-560",
    "grade": 11,
    "subject": "general_business",
    "unitNumber": 2,
    "front": "What are the four functions of Management (Fayol)?",
    "back": "1. Planning: Setting organizational objectives and determining courses of action.\n2. Organizing: Assigning tasks, allocating resources, establishing hierarchy.\n3. Leading: Motivating, directing, and inspiring employees.\n4. Controlling: Monitoring performance against targets and taking corrective actions.",
    "category": "concept"
  },
  {
    "id": "fc-gene-g11-u3-561",
    "grade": 11,
    "subject": "general_business",
    "unitNumber": 3,
    "front": "What are the 4 Ps of the Marketing Mix?",
    "back": "1. Product (features, quality, branding)\n2. Price (pricing strategy, discounts)\n3. Place (distribution channels, logistics)\n4. Promotion (advertising, sales promotions, public relations).",
    "category": "definition"
  },
  {
    "id": "fc-gene-g12-u1-562",
    "grade": 12,
    "subject": "general_business",
    "unitNumber": 1,
    "front": "State the fundamental Accounting Equation.",
    "back": "Assets = Liabilities + Owner's Equity\n(Every financial transaction maintains this equality via double-entry bookkeeping: Total Debits = Total Credits).",
    "category": "formula"
  },
  {
    "id": "fc-gene-g12-u1-563",
    "grade": 12,
    "subject": "general_business",
    "unitNumber": 1,
    "front": "Distinguish a Balance Sheet from an Income Statement.",
    "back": "Balance Sheet: Financial snapshot of Assets, Liabilities, and Equity at a specific point in time. Income Statement: Financial performance showing Revenues - Expenses = Net Profit/Loss over an accounting period.",
    "category": "definition"
  },
  {
    "id": "fc-gene-g12-u2-564",
    "grade": 12,
    "subject": "general_business",
    "unitNumber": 2,
    "front": "What is the Current Ratio and what does it measure?",
    "back": "Current Ratio = Current Assets / Current Liabilities\nMeasures short-term liquidity and ability to cover debts due within one year (ideal ratio is typically 1.5 to 2.0).",
    "category": "formula"
  },
  {
    "id": "fc-gene-g12-u3-565",
    "grade": 12,
    "subject": "general_business",
    "unitNumber": 3,
    "front": "What are Maslow's Hierarchy of Human Needs?",
    "back": "From base to peak:\n1. Physiological (food, water)\n2. Safety & Security\n3. Love & Belonging\n4. Esteem\n5. Self-Actualization.",
    "category": "concept"
  },
  {
    "id": "fc-tech-g11-u1-566",
    "grade": 11,
    "subject": "technical_drawing",
    "unitNumber": 1,
    "front": "Distinguish First-Angle from Third-Angle Orthographic Projection.",
    "back": "First-Angle (European/ISO): Object is between observer and projection plane (Plan is below Elevation, Right view is on the left). Third-Angle (US/ANSI): Projection plane is between observer and object (Plan is above Elevation, Right view is on the right).",
    "category": "concept"
  },
  {
    "id": "fc-tech-g11-u1-567",
    "grade": 11,
    "subject": "technical_drawing",
    "unitNumber": 1,
    "front": "What are the three principal views in multi-view orthographic drawing?",
    "back": "1. Front View (Elevation): Shows height and width.\n2. Top View (Plan): Shows width and depth.\n3. Side View (End Elevation): Shows height and depth.",
    "category": "definition"
  },
  {
    "id": "fc-tech-g11-u2-568",
    "grade": 11,
    "subject": "technical_drawing",
    "unitNumber": 2,
    "front": "What are the angles of the three axes in an Isometric Drawing?",
    "back": "The three axes are spaced at 120° to each other; the two receding horizontal axes are drawn at 30° above the horizontal baseline.",
    "category": "formula"
  },
  {
    "id": "fc-tech-g12-u1-569",
    "grade": 12,
    "subject": "technical_drawing",
    "unitNumber": 1,
    "front": "What is a Sectional View and why are hatching lines used?",
    "back": "A view showing internal features by imagining the object cut by a cutting plane. Hatching lines (thin parallel lines drawn at 45°) indicate solid material intersected by the cutting plane.",
    "category": "definition"
  },
  {
    "id": "fc-tech-g12-u2-570",
    "grade": 12,
    "subject": "technical_drawing",
    "unitNumber": 2,
    "front": "State standard dimensioning rules in engineering drawing.",
    "back": "Dimension lines should never cross extension lines. Extension lines extend ~2-3 mm past dimension line arrowheads. Dimensions are placed above the dimension line or broken in the center.",
    "category": "concept"
  },
  {
    "id": "fc-hpe-g9-u1-571",
    "grade": 9,
    "subject": "hpe",
    "unitNumber": 1,
    "front": "What are the 5 components of Health-Related Physical Fitness?",
    "back": "1. Cardiorespiratory endurance\n2. Muscular strength\n3. Muscular endurance\n4. Flexibility\n5. Body composition.",
    "category": "definition"
  },
  {
    "id": "fc-hpe-g9-u1-572",
    "grade": 9,
    "subject": "hpe",
    "unitNumber": 1,
    "front": "What does the F.I.T.T. principle stand for in exercise prescription?",
    "back": "• F: Frequency (how often)\n• I: Intensity (how hard)\n• T: Time (how long / duration)\n• T: Type (mode of activity).",
    "category": "definition"
  },
  {
    "id": "fc-hpe-g10-u1-573",
    "grade": 10,
    "subject": "hpe",
    "unitNumber": 1,
    "front": "What are the three human body energy systems?",
    "back": "1. ATP-CP / Phosphagen: Immediate anaerobic energy for 0-10 seconds.\n2. Anaerobic Glycolytic: High-intensity energy for 30-90 seconds, producing lactic acid.\n3. Aerobic / Oxidative: Sustained endurance energy for >2 minutes utilizing oxygen and fats/carbs.",
    "category": "concept"
  },
  {
    "id": "fc-hpe-g10-u2-574",
    "grade": 10,
    "subject": "hpe",
    "unitNumber": 2,
    "front": "How do you calculate Maximum Heart Rate (MHR) and Target Heart Rate?",
    "back": "Estimated MHR = 220 - Age (in years).\nTarget Heart Rate Zone for aerobic conditioning is 60% to 85% of MHR.",
    "category": "formula"
  },
  {
    "id": "fc-hpe-g11-u1-575",
    "grade": 11,
    "subject": "hpe",
    "unitNumber": 1,
    "front": "State the R.I.C.E. protocol for acute soft-tissue sports injuries.",
    "back": "• Rest: Stop activity to prevent further injury.\n• Ice: Apply cold packs for 15-20 min to reduce swelling.\n• Compression: Wrap with elastic bandage to limit edema.\n• Elevation: Raise injured limb above heart level.",
    "category": "definition"
  },
  {
    "id": "fc-hpe-g12-u1-576",
    "grade": 12,
    "subject": "hpe",
    "unitNumber": 1,
    "front": "What are the major physiological benefits of regular aerobic exercise on the cardiovascular system?",
    "back": "Increases cardiac stroke volume, lowers resting heart rate (bradycardia in athletes), strengthens heart myocardium, improves capillary density, and raises HDL ('good') cholesterol.",
    "category": "concept"
  },
  {
    "id": "fc-apti-g11-u1-577",
    "grade": 11,
    "subject": "aptitude",
    "unitNumber": 1,
    "front": "How do you solve a Word Analogy question (A : B :: C : D)?",
    "back": "Identify the precise relationship between pair A and B (e.g., cause/effect, part/whole, tool/worker, degree of intensity, antonym/synonym) and select the pair C and D with the exact same relationship.",
    "category": "concept"
  },
  {
    "id": "fc-apti-g11-u1-578",
    "grade": 11,
    "subject": "aptitude",
    "unitNumber": 1,
    "front": "What is a Syllogism and the rule of transitivity?",
    "back": "Deductive argument: If Premise 1 is 'All A are B' and Premise 2 is 'All B are C', the valid transitive conclusion is 'All A are C'.",
    "category": "concept"
  },
  {
    "id": "fc-apti-g12-u1-579",
    "grade": 12,
    "subject": "aptitude",
    "unitNumber": 1,
    "front": "What is the common pattern in the Fibonacci sequence?",
    "back": "Each number is the sum of the two preceding numbers: 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, ... (F_n = F_{n-1} + F_{n-2}).",
    "category": "formula"
  },
  {
    "id": "fc-apti-g12-u1-580",
    "grade": 12,
    "subject": "aptitude",
    "unitNumber": 1,
    "front": "How do you determine the angle between the hour and minute hands of an analog clock at H:M?",
    "back": "Angle θ = |30*H - 5.5*M| (degrees). If θ > 180°, the acute angle is 360° - θ.",
    "category": "formula"
  },
  {
    "id": "fc-apti-g12-u2-581",
    "grade": 12,
    "subject": "aptitude",
    "unitNumber": 2,
    "front": "What is an Ad Hominem fallacy in logical argumentation?",
    "back": "Attacking the character, motive, or background of the person making an argument rather than addressing the substance and validity of the argument itself.",
    "category": "definition"
  },
  {
    "id": "fc-apti-g12-u2-582",
    "grade": 12,
    "subject": "aptitude",
    "unitNumber": 2,
    "front": "How do you solve Venn diagram set overlap problems with 3 sets?",
    "back": "n(A ∪ B ∪ C) = n(A) + n(B) + n(C) - n(A ∩ B) - n(A ∩ C) - n(B ∩ C) + n(A ∩ B ∩ C).",
    "category": "formula"
  },
  {
    "id": "fc-phys-g9-u1-583",
    "grade": 9,
    "subject": "physics",
    "unitNumber": 1,
    "front": "What are derived quantities? Give 4 examples.",
    "back": "Physical quantities derived from base quantities.\nExamples: Velocity (m/s), Acceleration (m/s²), Force (N = kg·m/s²), Pressure (Pa = N/m²).",
    "category": "definition"
  },
  {
    "id": "fc-phys-g9-u1-584",
    "grade": 9,
    "subject": "physics",
    "unitNumber": 1,
    "front": "What is scientific notation and why is it used?",
    "back": "Writing numbers in the form a × 10^b (where 1 ≤ a < 10, b is an integer). It simplifies working with extremely large or small numbers.",
    "category": "definition"
  },
  {
    "id": "fc-phys-g9-u2-585",
    "grade": 9,
    "subject": "physics",
    "unitNumber": 2,
    "front": "Define Instantaneous Velocity vs Average Velocity.",
    "back": "Average velocity is total displacement divided by total time (Δx / Δt). Instantaneous velocity is the velocity of an object at an exact moment in time (v = dx / dt).",
    "category": "definition"
  },
  {
    "id": "fc-phys-g9-u2-586",
    "grade": 9,
    "subject": "physics",
    "unitNumber": 2,
    "front": "What is uniform acceleration?",
    "back": "Constant rate of change of velocity over time; the acceleration graph is a horizontal straight line.",
    "category": "concept"
  },
  {
    "id": "fc-phys-g9-u2-587",
    "grade": 9,
    "subject": "physics",
    "unitNumber": 2,
    "front": "What is free fall acceleration under gravity?",
    "back": "The constant downward acceleration experienced by an object moving solely under gravity: g ≈ 9.8 m/s² (downward towards Earth's center).",
    "category": "concept"
  },
  {
    "id": "fc-phys-g9-u3-588",
    "grade": 9,
    "subject": "physics",
    "unitNumber": 3,
    "front": "What is Inertia and what physical property measures it?",
    "back": "Inertia is the natural tendency of an object to resist changes in its state of motion. Mass is the quantitative measure of inertia.",
    "category": "concept"
  },
  {
    "id": "fc-phys-g9-u3-589",
    "grade": 9,
    "subject": "physics",
    "unitNumber": 3,
    "front": "What is the difference between mass and weight?",
    "back": "Mass (kg) is the constant amount of matter in a body. Weight (N) is the gravitational pull on that mass: W = m * g (varies by location).",
    "category": "concept"
  },
  {
    "id": "fc-phys-g9-u3-590",
    "grade": 9,
    "subject": "physics",
    "unitNumber": 3,
    "front": "What is Terminal Velocity?",
    "back": "The maximum constant velocity reached by a falling object when the downward force of gravity equals the upward air resistance drag force.",
    "category": "definition"
  },
  {
    "id": "fc-phys-g9-u4-591",
    "grade": 9,
    "subject": "physics",
    "unitNumber": 4,
    "front": "State the formula for Gravitational Potential Energy.",
    "back": "PE = m * g * h (Joules, J).",
    "category": "formula"
  },
  {
    "id": "fc-phys-g9-u4-592",
    "grade": 9,
    "subject": "physics",
    "unitNumber": 4,
    "front": "What is the relationship between work and energy?",
    "back": "Work is the transfer or conversion of energy. Doing 1 Joule of work transfers 1 Joule of energy.",
    "category": "concept"
  },
  {
    "id": "fc-phys-g9-u5-593",
    "grade": 9,
    "subject": "physics",
    "unitNumber": 5,
    "front": "What are the six classical simple machines?",
    "back": "1. Lever\n2. Wheel and axle\n3. Pulley\n4. Inclined plane\n5. Wedge\n6. Screw.",
    "category": "definition"
  },
  {
    "id": "fc-phys-g9-u5-594",
    "grade": 9,
    "subject": "physics",
    "unitNumber": 5,
    "front": "What is an ideal machine?",
    "back": "A theoretical machine with 100% efficiency (no frictional losses), where Work Output = Work Input and Mechanical Advantage = Velocity Ratio.",
    "category": "concept"
  },
  {
    "id": "fc-phys-g9-u6-595",
    "grade": 9,
    "subject": "physics",
    "unitNumber": 6,
    "front": "What are the three modes of heat transfer?",
    "back": "1. Conduction (through molecular vibrations in solids)\n2. Convection (through fluid bulk movement)\n3. Radiation (via electromagnetic infrared waves without a medium).",
    "category": "definition"
  },
  {
    "id": "fc-phys-g9-u6-596",
    "grade": 9,
    "subject": "physics",
    "unitNumber": 6,
    "front": "Define Latent Heat of Fusion and Latent Heat of Vaporization.",
    "back": "Fusion: Heat needed to change 1 kg of solid to liquid at melting point (Q = m * L_f). Vaporization: Heat needed to change 1 kg of liquid to gas at boiling point (Q = m * L_v).",
    "category": "definition"
  },
  {
    "id": "fc-phys-g10-u1-597",
    "grade": 10,
    "subject": "physics",
    "unitNumber": 1,
    "front": "What is Angular Displacement (θ) and its relation to arc length?",
    "back": "θ = s / r (measured in radians, where 2π radians = 360°).\ns = arc length, r = radius.",
    "category": "formula"
  },
  {
    "id": "fc-phys-g10-u1-598",
    "grade": 10,
    "subject": "physics",
    "unitNumber": 1,
    "front": "What is the relation between linear velocity (v) and angular velocity (ω)?",
    "back": "v = r * ω\nwhere ω is in rad/s and v is in m/s.",
    "category": "formula"
  },
  {
    "id": "fc-phys-g10-u2-599",
    "grade": 10,
    "subject": "physics",
    "unitNumber": 2,
    "front": "What is the Gravitational Field Strength formula at distance r from Earth?",
    "back": "g = G * M_Earth / r²\n(At Earth's surface, r = R_E, g ≈ 9.8 N/kg or m/s²).",
    "category": "formula"
  },
  {
    "id": "fc-phys-g10-u2-600",
    "grade": 10,
    "subject": "physics",
    "unitNumber": 2,
    "front": "State Kepler's First and Second Laws of Planetary Motion.",
    "back": "First: Planets orbit the Sun in elliptical paths with the Sun at one focus. Second: A line connecting planet and Sun sweeps out equal areas in equal intervals of time.",
    "category": "concept"
  },
  {
    "id": "fc-phys-g10-u3-601",
    "grade": 10,
    "subject": "physics",
    "unitNumber": 3,
    "front": "What is Atmospheric Pressure at sea level?",
    "back": "1 atm = 101,325 Pa ≈ 1.013 × 10⁵ N/m² = 760 mmHg = 760 Torr.",
    "category": "date_fact"
  },
  {
    "id": "fc-phys-g10-u3-602",
    "grade": 10,
    "subject": "physics",
    "unitNumber": 3,
    "front": "State the formula for hydrostatic fluid pressure at depth h.",
    "back": "P = P_0 + ρ * g * h\nwhere P_0 is surface atmospheric pressure, ρ is fluid density.",
    "category": "formula"
  },
  {
    "id": "fc-phys-g10-u4-603",
    "grade": 10,
    "subject": "physics",
    "unitNumber": 4,
    "front": "What is the relationship between wave frequency (f) and period (T)?",
    "back": "f = 1 / T and T = 1 / f (f in Hertz, T in seconds).",
    "category": "formula"
  },
  {
    "id": "fc-phys-g10-u4-604",
    "grade": 10,
    "subject": "physics",
    "unitNumber": 4,
    "front": "What is the Doppler Effect for sound?",
    "back": "The perceived change in sound frequency due to relative motion between the sound source and observer (higher pitch approaching, lower pitch receding).",
    "category": "concept"
  },
  {
    "id": "fc-phys-g10-u5-605",
    "grade": 10,
    "subject": "physics",
    "unitNumber": 5,
    "front": "What is Total Internal Reflection and its condition?",
    "back": "When light traveling from an optically denser medium to a rarer medium strikes the boundary at an angle greater than the critical angle (θ > θ_c).",
    "category": "concept"
  },
  {
    "id": "fc-phys-g10-u5-606",
    "grade": 10,
    "subject": "physics",
    "unitNumber": 5,
    "front": "What is the Power of a Lens formula and its unit?",
    "back": "P = 1 / f (in diopters, D, where focal length f is in meters).",
    "category": "formula"
  },
  {
    "id": "fc-phys-g11-u1-607",
    "grade": 11,
    "subject": "physics",
    "unitNumber": 1,
    "front": "What is the unit vector representation of a vector in 2D?",
    "back": "A = A_x î + A_y ĵ\nwhere |A| = √(A_x² + A_y²) and θ = arctan(A_y / A_x).",
    "category": "formula"
  },
  {
    "id": "fc-phys-g11-u2-608",
    "grade": 11,
    "subject": "physics",
    "unitNumber": 2,
    "front": "In 2D projectile motion, what is the vertical component of velocity at maximum height?",
    "back": "v_y = 0 m/s (The projectile only possesses horizontal velocity v_x = v_0 * cos θ at apex).",
    "category": "concept"
  },
  {
    "id": "fc-phys-g11-u3-609",
    "grade": 11,
    "subject": "physics",
    "unitNumber": 3,
    "front": "What is the Coefficient of Restitution (e) in collisions?",
    "back": "e = (v2 - v1) / (u1 - u2)\n• e = 1: Perfectly elastic\n• 0 < e < 1: Inelastic\n• e = 0: Perfectly inelastic (stick together).",
    "category": "formula"
  },
  {
    "id": "fc-phys-g11-u4-610",
    "grade": 11,
    "subject": "physics",
    "unitNumber": 4,
    "front": "What is a Conservative Force? Give two examples.",
    "back": "A force where work done between two points is independent of path taken (depends only on endpoints).\nExamples: Gravitational force, Spring elastic force.",
    "category": "definition"
  },
  {
    "id": "fc-phys-g11-u5-611",
    "grade": 11,
    "subject": "physics",
    "unitNumber": 5,
    "front": "What is the Moment of Inertia of a solid cylinder/disk of mass M and radius R?",
    "back": "I = (1/2) * M * R²",
    "category": "formula"
  },
  {
    "id": "fc-phys-g11-u5-612",
    "grade": 11,
    "subject": "physics",
    "unitNumber": 5,
    "front": "What is the Parallel Axis Theorem for moment of inertia?",
    "back": "I = I_cm + M * d²\nwhere I_cm is moment of inertia about center of mass, d is distance between parallel axes.",
    "category": "formula"
  },
  {
    "id": "fc-phys-g11-u6-613",
    "grade": 11,
    "subject": "physics",
    "unitNumber": 6,
    "front": "What is the Center of Gravity of a body?",
    "back": "The single point through which the resultant gravitational force (weight) acts for any orientation of the body.",
    "category": "definition"
  },
  {
    "id": "fc-phys-g11-u7-614",
    "grade": 11,
    "subject": "physics",
    "unitNumber": 7,
    "front": "What is Poiseuille's Law for viscous laminar flow in a pipe?",
    "back": "Flow rate Q = (π * r⁴ * ΔP) / (8 * η * L)\n(Flow rate is extremely sensitive to pipe radius, proportional to r⁴).",
    "category": "formula"
  },
  {
    "id": "fc-phys-g12-u1-615",
    "grade": 12,
    "subject": "physics",
    "unitNumber": 1,
    "front": "State the formula for work done during an isothermal gas expansion.",
    "back": "W = n * R * T * ln(V_f / V_i)",
    "category": "formula"
  },
  {
    "id": "fc-phys-g12-u1-616",
    "grade": 12,
    "subject": "physics",
    "unitNumber": 1,
    "front": "What is the relationship between C_p and C_v for an ideal gas?",
    "back": "C_p - C_v = R (Molar heat capacity at constant pressure exceeds that at constant volume by gas constant R).",
    "category": "formula"
  },
  {
    "id": "fc-phys-g12-u2-617",
    "grade": 12,
    "subject": "physics",
    "unitNumber": 2,
    "front": "What is the Electric Potential (V) due to a point charge q?",
    "back": "V = k_e * q / r (Volts, V = J/C). Potential is a scalar quantity.",
    "category": "formula"
  },
  {
    "id": "fc-phys-g12-u2-618",
    "grade": 12,
    "subject": "physics",
    "unitNumber": 2,
    "front": "What is an Equipotential Surface?",
    "back": "A surface on which electric potential is identical at all points. No work is done moving a charge along an equipotential surface; electric field lines are always perpendicular to it.",
    "category": "definition"
  },
  {
    "id": "fc-phys-g12-u3-619",
    "grade": 12,
    "subject": "physics",
    "unitNumber": 3,
    "front": "What is the formula for Electrical Resistivity (ρ)?",
    "back": "ρ = R * A / L (measured in Ohm-meters, Ω·m).\nR = ρ * L / A.",
    "category": "formula"
  },
  {
    "id": "fc-phys-g12-u3-620",
    "grade": 12,
    "subject": "physics",
    "unitNumber": 3,
    "front": "How does temperature affect the resistance of a metal conductor?",
    "back": "Resistance increases with temperature: R(T) = R_0 * (1 + α * ΔT), where α is the positive temperature coefficient of resistivity.",
    "category": "concept"
  },
  {
    "id": "fc-phys-g12-u4-621",
    "grade": 12,
    "subject": "physics",
    "unitNumber": 4,
    "front": "State Ampere's Circuital Law.",
    "back": "∮ B · dl = μ_0 * I_enclosed (Magnetic field around any closed loop is proportional to enclosed electric current).",
    "category": "formula"
  },
  {
    "id": "fc-phys-g12-u4-622",
    "grade": 12,
    "subject": "physics",
    "unitNumber": 4,
    "front": "What is the magnetic field inside an ideal Solenoid?",
    "back": "B = μ_0 * n * I\nwhere n = N / L is the number of turns per unit length.",
    "category": "formula"
  },
  {
    "id": "fc-phys-g12-u5-623",
    "grade": 12,
    "subject": "physics",
    "unitNumber": 5,
    "front": "What is the formula for Inductive Reactance (X_L) and Capacitive Reactance (X_C)?",
    "back": "X_L = 2π * f * L = ω * L (Ω)\nX_C = 1 / (2π * f * C) = 1 / (ω * C) (Ω).",
    "category": "formula"
  },
  {
    "id": "fc-phys-g12-u5-624",
    "grade": 12,
    "subject": "physics",
    "unitNumber": 5,
    "front": "What is the Power Factor in an AC circuit?",
    "back": "Power Factor = cos(ϕ) = R / Z\nReal Power P_avg = V_rms * I_rms * cos(ϕ).",
    "category": "formula"
  },
  {
    "id": "fc-phys-g12-u6-625",
    "grade": 12,
    "subject": "physics",
    "unitNumber": 6,
    "front": "What is the de Broglie Wavelength formula for matter?",
    "back": "λ = h / p = h / (m * v)\nwhere h = 6.626 × 10⁻³⁴ J·s.",
    "category": "formula"
  },
  {
    "id": "fc-phys-g12-u6-626",
    "grade": 12,
    "subject": "physics",
    "unitNumber": 6,
    "front": "What is Compton Scattering?",
    "back": "The increase in wavelength (decrease in energy) of an X-ray or gamma photon when it collides with a stationary electron: Δλ = (h / m_e*c) * (1 - cos θ).",
    "category": "concept"
  },
  {
    "id": "fc-phys-g12-u6-627",
    "grade": 12,
    "subject": "physics",
    "unitNumber": 6,
    "front": "What are the three types of Radioactive Decay?",
    "back": "1. Alpha (α): Helium nucleus (⁴₂He), low penetration.\n2. Beta (β): High-speed electron (e⁻) or positron (e⁺).\n3. Gamma (γ): High-energy electromagnetic photon, highest penetration.",
    "category": "definition"
  },
  {
    "id": "fc-chem-g9-u1-628",
    "grade": 9,
    "subject": "chemistry",
    "unitNumber": 1,
    "front": "What are the three states of matter and their kinetic properties?",
    "back": "Solid (definite shape and volume, vibrational motion), Liquid (definite volume, indefinite shape, sliding particles), Gas (indefinite shape and volume, high-speed random motion).",
    "category": "concept"
  },
  {
    "id": "fc-chem-g9-u1-629",
    "grade": 9,
    "subject": "chemistry",
    "unitNumber": 1,
    "front": "Distinguish a homogeneous mixture from a heterogeneous mixture.",
    "back": "Homogeneous: Uniform composition throughout (e.g., saltwater, air, brass). Heterogeneous: Non-uniform composition with visible phases (e.g., sand and water, oil and vinegar).",
    "category": "definition"
  },
  {
    "id": "fc-chem-g9-u2-630",
    "grade": 9,
    "subject": "chemistry",
    "unitNumber": 2,
    "front": "What are isotopes? Give an example.",
    "back": "Atoms of the same element having the same atomic number (protons) but different mass numbers (neutrons).\nExamples: Carbon-12 and Carbon-14.",
    "category": "definition"
  },
  {
    "id": "fc-chem-g9-u2-631",
    "grade": 9,
    "subject": "chemistry",
    "unitNumber": 2,
    "front": "What is the maximum number of electrons in shell n?",
    "back": "Max electrons = 2n² (n=1: 2, n=2: 8, n=3: 18, n=4: 32).",
    "category": "formula"
  },
  {
    "id": "fc-chem-g9-u3-632",
    "grade": 9,
    "subject": "chemistry",
    "unitNumber": 3,
    "front": "What are Metalloids? Name 3 examples.",
    "back": "Elements having properties intermediate between metals and non-metals.\nExamples: Silicon (Si), Germanium (Ge), Arsenic (As).",
    "category": "definition"
  },
  {
    "id": "fc-chem-g9-u4-633",
    "grade": 9,
    "subject": "chemistry",
    "unitNumber": 4,
    "front": "What is the Octet Rule?",
    "back": "Atoms tend to gain, lose, or share electrons in order to achieve a stable electronic configuration with 8 valence electrons (like noble gases).",
    "category": "concept"
  },
  {
    "id": "fc-chem-g9-u5-634",
    "grade": 9,
    "subject": "chemistry",
    "unitNumber": 5,
    "front": "What is the Percentage Composition formula by mass of an element in a compound?",
    "back": "% Element = [(number of atoms * atomic mass) / molar mass of compound] * 100%.",
    "category": "formula"
  },
  {
    "id": "fc-chem-g9-u5-635",
    "grade": 9,
    "subject": "chemistry",
    "unitNumber": 5,
    "front": "State Boyle's Law, Charles's Law, and Gay-Lussac's Law.",
    "back": "Boyle's: P1 * V1 = P2 * V2 (T constant)\nCharles's: V1 / T1 = V2 / T2 (P constant)\nGay-Lussac's: P1 / T1 = P2 / T2 (V constant).",
    "category": "formula"
  },
  {
    "id": "fc-chem-g10-u1-636",
    "grade": 10,
    "subject": "chemistry",
    "unitNumber": 1,
    "front": "What is Activation Energy (E_a)?",
    "back": "The minimum amount of energy required by colliding reactant molecules to form an activated complex and initiate a chemical reaction.",
    "category": "definition"
  },
  {
    "id": "fc-chem-g10-u2-637",
    "grade": 10,
    "subject": "chemistry",
    "unitNumber": 2,
    "front": "What is the pH scale and what values indicate acid, neutral, and base?",
    "back": "pH = -log[H⁺].\n• pH < 7: Acidic\n• pH = 7: Neutral\n• pH > 7: Basic / Alkaline.",
    "category": "definition"
  },
  {
    "id": "fc-chem-g10-u2-638",
    "grade": 10,
    "subject": "chemistry",
    "unitNumber": 2,
    "front": "What salt is formed by the reaction of hydrochloric acid (HCl) with sodium hydroxide (NaOH)?",
    "back": "HCl + NaOH -> NaCl + H₂O (Neutralization reaction producing sodium chloride and water).",
    "category": "concept"
  },
  {
    "id": "fc-chem-g10-u3-639",
    "grade": 10,
    "subject": "chemistry",
    "unitNumber": 3,
    "front": "What happens at the Anode and Cathode during electrolysis?",
    "back": "Anode (+): Oxidation occurs (loss of electrons, anions attract).\nCathode (-): Reduction occurs (gain of electrons, cations attract). 'AnOx and RedCat'.",
    "category": "concept"
  },
  {
    "id": "fc-chem-g10-u3-640",
    "grade": 10,
    "subject": "chemistry",
    "unitNumber": 3,
    "front": "What is the Hall-Héroult Process for aluminum extraction?",
    "back": "Electrolytic reduction of alumina (Al₂O₃) dissolved in molten cryolite (Na₃AlF₆) at ~950 °C, reducing operating temperature and saving energy.",
    "category": "concept"
  },
  {
    "id": "fc-chem-g10-u4-641",
    "grade": 10,
    "subject": "chemistry",
    "unitNumber": 4,
    "front": "What is structural isomerism in alkanes?",
    "back": "Compounds having the same molecular formula but different structural arrangements of carbon skeletons (e.g., butane and 2-methylpropane both C₄H₁₀).",
    "category": "definition"
  },
  {
    "id": "fc-chem-g10-u4-642",
    "grade": 10,
    "subject": "chemistry",
    "unitNumber": 4,
    "front": "What is the chemical test for unsaturation (alkenes/alkynes)?",
    "back": "Bromine water test: Alkenes and alkynes rapidly decolorize reddish-brown bromine water (forming colorless dibromoalkanes). Alkanes do not react without UV light.",
    "category": "concept"
  },
  {
    "id": "fc-chem-g11-u1-643",
    "grade": 11,
    "subject": "chemistry",
    "unitNumber": 1,
    "front": "What is the Aufbau Principle?",
    "back": "Electrons occupy the lowest available energy orbital first before filling higher energy levels (1s -> 2s -> 2p -> 3s -> 3p -> 4s -> 3d...).",
    "category": "concept"
  },
  {
    "id": "fc-chem-g11-u1-644",
    "grade": 11,
    "subject": "chemistry",
    "unitNumber": 1,
    "front": "What are the anomalous electron configurations of Chromium (Z=24) and Copper (Z=29)?",
    "back": "Cr: [Ar] 4s¹ 3d⁵ (half-filled d-subshell stability)\nCu: [Ar] 4s¹ 3d¹⁰ (fully-filled d-subshell stability).",
    "category": "concept"
  },
  {
    "id": "fc-chem-g11-u2-645",
    "grade": 11,
    "subject": "chemistry",
    "unitNumber": 2,
    "front": "What is Hybridization and what geometries do sp, sp², and sp³ produce?",
    "back": "sp: Linear (180°, e.g., BeCl₂, ethyne)\nsp²: Trigonal planar (120°, e.g., BF₃, ethene)\nsp³: Tetrahedral (109.5°, e.g., CH₄).",
    "category": "definition"
  },
  {
    "id": "fc-chem-g11-u2-646",
    "grade": 11,
    "subject": "chemistry",
    "unitNumber": 2,
    "front": "What are London Dispersion Forces?",
    "back": "Weak temporary attractive forces resulting from instantaneous dipole moments caused by random fluctuations in electron electron cloud distribution.",
    "category": "definition"
  },
  {
    "id": "fc-chem-g11-u3-647",
    "grade": 11,
    "subject": "chemistry",
    "unitNumber": 3,
    "front": "What is the unit of rate constant (k) for zero, first, and second order reactions?",
    "back": "• Zero order: mol/(L·s) or M/s\n• First order: s⁻¹\n• Second order: L/(mol·s) or M⁻¹s⁻¹.",
    "category": "formula"
  },
  {
    "id": "fc-chem-g11-u3-648",
    "grade": 11,
    "subject": "chemistry",
    "unitNumber": 3,
    "front": "What is the half-life formula for a first-order chemical reaction?",
    "back": "t_1/2 = ln(2) / k ≈ 0.693 / k (Independent of initial reactant concentration).",
    "category": "formula"
  },
  {
    "id": "fc-chem-g11-u4-649",
    "grade": 11,
    "subject": "chemistry",
    "unitNumber": 4,
    "front": "What is the effect of adding a catalyst on chemical equilibrium?",
    "back": "A catalyst speeds up the rates of both forward and reverse reactions equally by lowering activation energy. It helps reach equilibrium faster but does NOT alter equilibrium position or constant K.",
    "category": "concept"
  },
  {
    "id": "fc-chem-g11-u5-650",
    "grade": 11,
    "subject": "chemistry",
    "unitNumber": 5,
    "front": "What are the oxidation products of Primary, Secondary, and Tertiary Alcohols?",
    "back": "• Primary: Aldehyde -> Carboxylic acid\n• Secondary: Ketone\n• Tertiary: Resistant to oxidation under normal conditions.",
    "category": "concept"
  },
  {
    "id": "fc-chem-g11-u5-651",
    "grade": 11,
    "subject": "chemistry",
    "unitNumber": 5,
    "front": "What is Saponification?",
    "back": "The alkaline hydrolysis of fats or oils (esters of glycerol) with strong base (NaOH or KOH) to produce soap and glycerol.",
    "category": "definition"
  },
  {
    "id": "fc-chem-g12-u1-652",
    "grade": 12,
    "subject": "chemistry",
    "unitNumber": 1,
    "front": "What is a Conjugate Acid-Base pair?",
    "back": "Two substances related to each other by the donating and accepting of a single proton (H⁺).\nExample: NH₃ (base) and NH₄⁺ (conjugate acid); H₂O (acid) and OH⁻ (conjugate base).",
    "category": "definition"
  },
  {
    "id": "fc-chem-g12-u1-653",
    "grade": 12,
    "subject": "chemistry",
    "unitNumber": 1,
    "front": "What is the relation between K_a and K_b for a conjugate acid-base pair in water?",
    "back": "K_a * K_b = K_w = 1.0 × 10⁻¹⁴ at 25 °C\npK_a + pK_b = 14.0.",
    "category": "formula"
  },
  {
    "id": "fc-chem-g12-u2-654",
    "grade": 12,
    "subject": "chemistry",
    "unitNumber": 2,
    "front": "What is the function of the Salt Bridge in a Galvanic cell?",
    "back": "Maintains electrical neutrality in half-cell solutions by allowing migration of ions (e.g., K⁺, Cl⁻) without allowing bulk mixing of electrolyte solutions.",
    "category": "concept"
  },
  {
    "id": "fc-chem-g12-u2-655",
    "grade": 12,
    "subject": "chemistry",
    "unitNumber": 2,
    "front": "What are the anode and cathode reactions in a Lead-Acid storage battery during discharge?",
    "back": "Anode: Pb(s) + SO₄²⁻ -> PbSO₄(s) + 2e⁻\nCathode: PbO₂(s) + 4H⁺ + SO₄²⁻ + 2e⁻ -> PbSO₄(s) + 2H₂O.",
    "category": "concept"
  },
  {
    "id": "fc-chem-g12-u3-656",
    "grade": 12,
    "subject": "chemistry",
    "unitNumber": 3,
    "front": "State the Second Law of Thermodynamics in chemical terms.",
    "back": "The total entropy of the universe increases in any spontaneous process (ΔS_univ = ΔS_sys + ΔS_surr > 0).",
    "category": "concept"
  },
  {
    "id": "fc-chem-g12-u4-657",
    "grade": 12,
    "subject": "chemistry",
    "unitNumber": 4,
    "front": "What is Vulcanization of Rubber and who discovered it?",
    "back": "Heating natural rubber with sulfur (discovered by Charles Goodyear in 1839), creating disulfide cross-links that dramatically increase elasticity, tensile strength, and heat resistance.",
    "category": "date_fact"
  },
  {
    "id": "fc-biol-g9-u1-658",
    "grade": 9,
    "subject": "biology",
    "unitNumber": 1,
    "front": "What is the function of Ribosomes?",
    "back": "The sites of protein synthesis (translation) where genetic instructions from mRNA are translated into amino acid chains.",
    "category": "concept"
  },
  {
    "id": "fc-biol-g9-u1-659",
    "grade": 9,
    "subject": "biology",
    "unitNumber": 1,
    "front": "What is the function of the Golgi Apparatus?",
    "back": "Modifies, sorts, packages, and tags proteins and lipids from the endoplasmic reticulum for secretion or delivery to other organelles.",
    "category": "concept"
  },
  {
    "id": "fc-biol-g9-u2-660",
    "grade": 9,
    "subject": "biology",
    "unitNumber": 2,
    "front": "Define Active Transport vs Passive Transport.",
    "back": "Passive transport: Movement down concentration gradient without metabolic energy (diffusion, facilitated diffusion, osmosis). Active transport: Movement against concentration gradient requiring ATP energy (e.g., Na⁺/K⁺ pump).",
    "category": "definition"
  },
  {
    "id": "fc-biol-g9-u3-661",
    "grade": 9,
    "subject": "biology",
    "unitNumber": 3,
    "front": "What is the role of bile in digestion and where is it produced?",
    "back": "Produced by liver and stored in gallbladder; contains bile salts that emulsify fats into tiny droplets, increasing surface area for pancreatic lipase.",
    "category": "concept"
  },
  {
    "id": "fc-biol-g9-u3-662",
    "grade": 9,
    "subject": "biology",
    "unitNumber": 3,
    "front": "What are the components of human blood and their functions?",
    "back": "• Red blood cells (Erythrocytes): Transport oxygen via hemoglobin.\n• White blood cells (Leukocytes): Immune defense against pathogens.\n• Platelets (Thrombocytes): Blood clotting.\n• Plasma: Fluid carrying nutrients, wastes, hormones.",
    "category": "definition"
  },
  {
    "id": "fc-biol-g9-u4-663",
    "grade": 9,
    "subject": "biology",
    "unitNumber": 4,
    "front": "What causes Tuberculosis and how is it transmitted?",
    "back": "Caused by the bacterium Mycobacterium tuberculosis; transmitted through airborne droplets when an infected person coughs or sneezes.",
    "category": "date_fact"
  },
  {
    "id": "fc-biol-g9-u5-664",
    "grade": 9,
    "subject": "biology",
    "unitNumber": 5,
    "front": "What is the Carbon Cycle?",
    "back": "Biogeochemical cycle where carbon is fixed by plants through photosynthesis, returned to atmosphere via cellular respiration and fossil fuel combustion, and decomposed by bacteria/fungi.",
    "category": "concept"
  },
  {
    "id": "fc-biol-g10-u1-665",
    "grade": 10,
    "subject": "biology",
    "unitNumber": 1,
    "front": "What are Restriction Enzymes in recombinant DNA technology?",
    "back": "Bacterial enzymes ('molecular scissors') that recognize specific palindromic DNA sequences and cleave DNA at restriction sites, creating sticky or blunt ends.",
    "category": "definition"
  },
  {
    "id": "fc-biol-g10-u2-666",
    "grade": 10,
    "subject": "biology",
    "unitNumber": 2,
    "front": "What is Incomplete Dominance vs Codominance?",
    "back": "Incomplete Dominance: Heterozygote displays an intermediate blended phenotype (e.g., red × white = pink flowers). Codominance: Both alleles are fully and simultaneously expressed (e.g., AB blood type).",
    "category": "concept"
  },
  {
    "id": "fc-biol-g10-u2-667",
    "grade": 10,
    "subject": "biology",
    "unitNumber": 2,
    "front": "Explain sex-linked inheritance with examples.",
    "back": "Genes located on the sex chromosomes (mostly X chromosome). Recessive sex-linked traits (e.g., Red-Green color blindness, Hemophilia) appear more frequently in males (XY) because they have only one X chromosome.",
    "category": "concept"
  },
  {
    "id": "fc-biol-g10-u3-668",
    "grade": 10,
    "subject": "biology",
    "unitNumber": 3,
    "front": "What are Rods and Cones in the human retina?",
    "back": "Rods: Photoreceptors responsible for vision in dim light / night vision (contain rhodopsin, no color). Cones: Photoreceptors responsible for color vision and high visual acuity in bright light (concentrated in fovea).",
    "category": "definition"
  },
  {
    "id": "fc-biol-g10-u3-669",
    "grade": 10,
    "subject": "biology",
    "unitNumber": 3,
    "front": "What is the function of Thyroxine and what condition results from Iodine deficiency?",
    "back": "Thyroxine (T4) secreted by thyroid gland regulates basal metabolic rate. Iodine deficiency prevents thyroxine synthesis, causing thyroid enlargement called Goiter.",
    "category": "concept"
  },
  {
    "id": "fc-biol-g10-u4-670",
    "grade": 10,
    "subject": "biology",
    "unitNumber": 4,
    "front": "What is Deforestation and its ecological consequences in Ethiopia?",
    "back": "Clearing of forest land for agriculture and fuel; causes severe soil erosion, loss of endemic biodiversity, disruption of rainfall regimes, and increased siltation of dams.",
    "category": "concept"
  },
  {
    "id": "fc-biol-g11-u1-671",
    "grade": 11,
    "subject": "biology",
    "unitNumber": 1,
    "front": "Distinguish Saturated from Unsaturated Fatty Acids.",
    "back": "Saturated: Single carbon-carbon bonds only (C-C), maximum hydrogen atoms, straight chains, solid at room temperature (animal fats). Unsaturated: Contain one or more double bonds (C=C), kinks in chain, liquid at room temperature (plant oils).",
    "category": "definition"
  },
  {
    "id": "fc-biol-g11-u1-672",
    "grade": 11,
    "subject": "biology",
    "unitNumber": 1,
    "front": "What are the differences between DNA and RNA?",
    "back": "1. Sugar: Deoxyribose in DNA vs Ribose in RNA.\n2. Bases: A, T, G, C in DNA vs A, U, G, C in RNA.\n3. Strands: Double-stranded in DNA vs Single-stranded in RNA.",
    "category": "definition"
  },
  {
    "id": "fc-biol-g11-u2-673",
    "grade": 11,
    "subject": "biology",
    "unitNumber": 2,
    "front": "What is Feedback Inhibition in metabolic pathways?",
    "back": "A cellular control mechanism where the end product of a metabolic pathway allosterically inhibits the first committed enzyme in the pathway, preventing overproduction.",
    "category": "concept"
  },
  {
    "id": "fc-biol-g11-u3-674",
    "grade": 11,
    "subject": "biology",
    "unitNumber": 3,
    "front": "What is Glycolysis and what is its net equation?",
    "back": "Anaerobic breakdown of 1 glucose (6C) into 2 pyruvate (3C) in the cytoplasm.\nNet: Glucose + 2 NAD⁺ + 2 ADP + 2 Pi -> 2 Pyruvate + 2 NADH + 2 ATP + 2 H₂O.",
    "category": "formula"
  },
  {
    "id": "fc-biol-g11-u3-675",
    "grade": 11,
    "subject": "biology",
    "unitNumber": 3,
    "front": "What is Chemiosmosis in ATP synthesis?",
    "back": "The movement of hydrogen ions (protons) across the inner mitochondrial membrane down their electrochemical gradient through ATP Synthase, driving the phosphorylation of ADP to ATP.",
    "category": "concept"
  },
  {
    "id": "fc-biol-g11-u4-676",
    "grade": 11,
    "subject": "biology",
    "unitNumber": 4,
    "front": "What are the two photosystems in photosynthesis and their absorption peaks?",
    "back": "Photosystem II (PS II): P680 (absorbs light at 680 nm).\nPhotosystem I (PS I): P700 (absorbs light at 700 nm).",
    "category": "definition"
  },
  {
    "id": "fc-biol-g12-u1-677",
    "grade": 12,
    "subject": "biology",
    "unitNumber": 1,
    "front": "What is an Okazaki Fragment and on which strand is it formed?",
    "back": "Short segments of newly synthesized DNA formed on the lagging strand during DNA replication, synthesized discontinuously in 5' -> 3' direction and sealed by DNA ligase.",
    "category": "definition"
  },
  {
    "id": "fc-biol-g12-u1-678",
    "grade": 12,
    "subject": "biology",
    "unitNumber": 1,
    "front": "Distinguish Introns from Exons in eukaryotic pre-mRNA.",
    "back": "Exons: Coding regions of RNA that are expressed and retained in mature mRNA. Introns: Non-coding intervening sequences that are spliced out by spliceosomes.",
    "category": "definition"
  },
  {
    "id": "fc-biol-g12-u2-679",
    "grade": 12,
    "subject": "biology",
    "unitNumber": 2,
    "front": "What are Darwin's four main postulates of Natural Selection?",
    "back": "1. Overproduction: Species produce more offspring than can survive.\n2. Variation: Individuals within a population vary in traits.\n3. Competition: Resources are limited, leading to a struggle for existence.\n4. Differential reproductive success: Those with favorable adaptations survive and reproduce ('Survival of the Fittest').",
    "category": "concept"
  },
  {
    "id": "fc-biol-g12-u2-680",
    "grade": 12,
    "subject": "biology",
    "unitNumber": 2,
    "front": "Distinguish Allopatric from Sympatric Speciation.",
    "back": "Allopatric: Formation of new species due to geographic isolation (physical barrier dividing population). Sympatric: Speciation occurring in the same geographical area without physical separation (e.g., polyploidy, ecological niche divergence).",
    "category": "definition"
  },
  {
    "id": "fc-biol-g12-u3-681",
    "grade": 12,
    "subject": "biology",
    "unitNumber": 3,
    "front": "What are the functions of FSH and LH in the male reproductive system?",
    "back": "FSH (Follicle-Stimulating Hormone): Stimulates Sertoli cells in testes to support spermatogenesis. LH (Luteinizing Hormone): Stimulates Leydig (interstitial) cells to produce testosterone.",
    "category": "concept"
  },
  {
    "id": "fc-biol-g12-u4-682",
    "grade": 12,
    "subject": "biology",
    "unitNumber": 4,
    "front": "What is the Competitive Exclusion Principle (Gause's Law)?",
    "back": "Two competing species with identical ecological niches cannot coexist indefinitely in the same habitat; one will outcompete and eliminate the other.",
    "category": "concept"
  },
  {
    "id": "fc-biol-g12-u4-683",
    "grade": 12,
    "subject": "biology",
    "unitNumber": 4,
    "front": "What is Imprinting in animal behavior (Konrad Lorenz)?",
    "back": "A rapid, irreversible form of learning that occurs during a critical, sensitive period early in an animal's life (e.g., goslings following the first moving object they see).",
    "category": "concept"
  },
  {
    "id": "fc-math-g9-u1-684",
    "grade": 9,
    "subject": "mathematics",
    "unitNumber": 1,
    "front": "What is a Rational Number vs an Irrational Number?",
    "back": "Rational: Any number that can be expressed as a quotient of two integers p/q (q ≠ 0) with terminating or repeating decimals. Irrational: Cannot be written as p/q; non-terminating, non-repeating decimals (e.g., √2, π, e).",
    "category": "definition"
  },
  {
    "id": "fc-math-g9-u2-685",
    "grade": 9,
    "subject": "mathematics",
    "unitNumber": 2,
    "front": "What is the slope-intercept form and point-slope form of a line?",
    "back": "Slope-intercept: y = mx + b (m = slope, b = y-intercept).\nPoint-slope: y - y1 = m(x - x1).",
    "category": "formula"
  },
  {
    "id": "fc-math-g9-u3-686",
    "grade": 9,
    "subject": "mathematics",
    "unitNumber": 3,
    "front": "State Thales's Theorem in circle geometry.",
    "back": "If points A, B, and C lie on a circle where AB is the diameter, the inscribed angle ∠ACB is always a right angle (90°).",
    "category": "concept"
  },
  {
    "id": "fc-math-g9-u5-687",
    "grade": 9,
    "subject": "mathematics",
    "unitNumber": 5,
    "front": "What is the formula for probability of the complement of an event?",
    "back": "P(A') = 1 - P(A)\n(P(A) + P(A') = 1).",
    "category": "formula"
  },
  {
    "id": "fc-math-g10-u1-688",
    "grade": 10,
    "subject": "mathematics",
    "unitNumber": 1,
    "front": "State Descartes' Rule of Signs.",
    "back": "The number of positive real roots of polynomial P(x) is equal to the number of sign changes in coefficients of P(x) or less by an even number.",
    "category": "concept"
  },
  {
    "id": "fc-math-g10-u2-689",
    "grade": 10,
    "subject": "mathematics",
    "unitNumber": 2,
    "front": "What is the half-life decay formula using exponential functions?",
    "back": "N(t) = N_0 * (1/2)^(t / t_half) = N_0 * e^(-λt)",
    "category": "formula"
  },
  {
    "id": "fc-math-g10-u3-690",
    "grade": 10,
    "subject": "mathematics",
    "unitNumber": 3,
    "front": "What are the exact values of sin(30°), cos(30°), sin(45°), and cos(45°)?",
    "back": "sin(30°) = 1/2, cos(30°) = √3/2\nsin(45°) = √2/2, cos(45°) = √2/2\ntan(45°) = 1, tan(30°) = 1/√3.",
    "category": "date_fact"
  },
  {
    "id": "fc-math-g10-u4-691",
    "grade": 10,
    "subject": "mathematics",
    "unitNumber": 4,
    "front": "What is the Volume of a Cylinder and Cone with radius r and height h?",
    "back": "Cylinder: V = π * r² * h\nCone: V = (1/3) * π * r² * h",
    "category": "formula"
  },
  {
    "id": "fc-math-g11-u1-692",
    "grade": 11,
    "subject": "mathematics_natural",
    "unitNumber": 1,
    "front": "What is the formula for the sum of the first n natural numbers and sum of squares?",
    "back": "Σ i = n(n + 1) / 2\nΣ i² = n(n + 1)(2n + 1) / 6",
    "category": "formula"
  },
  {
    "id": "fc-math-g11-u2-693",
    "grade": 11,
    "subject": "mathematics_natural",
    "unitNumber": 2,
    "front": "What is the Squeeze (Sandwich) Theorem for limits?",
    "back": "If g(x) ≤ f(x) ≤ h(x) near c, and lim(x→c) g(x) = lim(x→c) h(x) = L, then lim(x→c) f(x) = L.",
    "category": "concept"
  },
  {
    "id": "fc-math-g11-u3-694",
    "grade": 11,
    "subject": "mathematics_natural",
    "unitNumber": 3,
    "front": "State Cramer's Rule for a 2x2 system of linear equations.",
    "back": "For ax + by = e and cx + dy = f:\nx = det(A_x) / det(A), y = det(A_y) / det(A), where det(A) = ad - bc ≠ 0.",
    "category": "formula"
  },
  {
    "id": "fc-math-g11-u4-695",
    "grade": 11,
    "subject": "mathematics_natural",
    "unitNumber": 4,
    "front": "What is the Eccentricity of a Circle, Ellipse, Parabola, and Hyperbola?",
    "back": "• Circle: e = 0\n• Ellipse: 0 < e < 1\n• Parabola: e = 1\n• Hyperbola: e > 1.",
    "category": "definition"
  },
  {
    "id": "fc-math-g12-u1-696",
    "grade": 12,
    "subject": "mathematics_natural",
    "unitNumber": 1,
    "front": "What is the second derivative test for local extrema?",
    "back": "If f'(c) = 0:\n• f''(c) > 0: Local minimum (concave up)\n• f''(c) < 0: Local maximum (concave down)\n• f''(c) = 0: Test inconclusive.",
    "category": "concept"
  },
  {
    "id": "fc-math-g12-u2-697",
    "grade": 12,
    "subject": "mathematics_natural",
    "unitNumber": 2,
    "front": "What is a Point of Inflection on a curve?",
    "back": "A point on a curve where the concavity changes from upward to downward or vice versa (f''(x) = 0 or undefined, with sign change).",
    "category": "definition"
  },
  {
    "id": "fc-math-g12-u3-698",
    "grade": 12,
    "subject": "mathematics_natural",
    "unitNumber": 3,
    "front": "What is the formula for Area between curves y = f(x) and y = g(x) on [a, b]?",
    "back": "A = ∫_a^b [f(x) - g(x)] dx, where f(x) ≥ g(x) on [a, b].",
    "category": "formula"
  },
  {
    "id": "fc-math-g12-u4-699",
    "grade": 12,
    "subject": "mathematics_natural",
    "unitNumber": 4,
    "front": "State the equation of a plane in 3D passing through (x0, y0, z0) with normal vector N = (A, B, C).",
    "back": "A(x - x0) + B(y - y0) + C(z - z0) = 0\nor Ax + By + Cz + D = 0.",
    "category": "formula"
  },
  {
    "id": "fc-math-g12-u5-700",
    "grade": 12,
    "subject": "mathematics_natural",
    "unitNumber": 5,
    "front": "What is the polar representation of complex number z = a + bi?",
    "back": "z = r(cos θ + i sin θ)\nwhere modulus r = √(a² + b²) and argument θ = arctan(b / a).",
    "category": "formula"
  },
  {
    "id": "fc-math-g12-u6-701",
    "grade": 12,
    "subject": "mathematics_natural",
    "unitNumber": 6,
    "front": "State the formula for the Expected Value E[X] of a discrete random variable.",
    "back": "E[X] = μ = Σ [x_i * P(X = x_i)]",
    "category": "formula"
  },
  {
    "id": "fc-math-g11-u1-702",
    "grade": 11,
    "subject": "mathematics_social",
    "unitNumber": 1,
    "front": "What is the effective annual rate (EAR) formula for nominal rate r compounded m times/year?",
    "back": "EAR = (1 + r / m)^m - 1",
    "category": "formula"
  },
  {
    "id": "fc-math-g11-u2-703",
    "grade": 11,
    "subject": "mathematics_social",
    "unitNumber": 2,
    "front": "In Linear Programming, what is a slack variable?",
    "back": "A variable added to an inequality constraint (≤) to transform it into an equation (=), representing unused capacity or resources.",
    "category": "definition"
  },
  {
    "id": "fc-math-g12-u1-704",
    "grade": 12,
    "subject": "mathematics_social",
    "unitNumber": 1,
    "front": "How is the Break-Even point calculated in business?",
    "back": "Break-Even Quantity Q = Total Fixed Cost / (Price - Variable Cost per unit) = TFC / (P - AVC).",
    "category": "formula"
  },
  {
    "id": "fc-math-g12-u2-705",
    "grade": 12,
    "subject": "mathematics_social",
    "unitNumber": 2,
    "front": "What is the Gini Coefficient and what does it measure?",
    "back": "A statistical measure of economic income inequality ranging from 0 (perfect equality) to 1 (complete inequality), derived from the Lorenz Curve.",
    "category": "concept"
  },
  {
    "id": "fc-econ-g9-u1-706",
    "grade": 9,
    "subject": "economics",
    "unitNumber": 1,
    "front": "What is a Command Economy vs Market Economy?",
    "back": "Command (Socialist): State owns resources and decides production/allocation. Market (Capitalist): Private ownership, price mechanism coordinates supply and demand through decentralized decisions.",
    "category": "definition"
  },
  {
    "id": "fc-econ-g10-u1-707",
    "grade": 10,
    "subject": "economics",
    "unitNumber": 1,
    "front": "What is Cross-Price Elasticity of Demand (XED)?",
    "back": "XED = %ΔQ_A / %ΔP_B.\n• XED > 0: Substitute goods (e.g., tea and coffee)\n• XED < 0: Complementary goods (e.g., cars and fuel)\n• XED = 0: Independent goods.",
    "category": "formula"
  },
  {
    "id": "fc-econ-g11-u1-708",
    "grade": 11,
    "subject": "economics",
    "unitNumber": 1,
    "front": "What is the Giffen Good anomaly?",
    "back": "An inferior good for which an increase in price causes an increase in quantity demanded, violating the law of demand because the negative income effect outweighs the substitution effect.",
    "category": "concept"
  },
  {
    "id": "fc-econ-g11-u2-709",
    "grade": 11,
    "subject": "economics",
    "unitNumber": 2,
    "front": "What is an Isoquant and Isocost in long-run production?",
    "back": "Isoquant: Curve showing all input combinations of labor and capital yielding the same output level. Isocost: Line showing all input combinations costing the same total budget. Optimal choice occurs where Isoquant is tangent to Isocost (MRTS = w / r).",
    "category": "concept"
  },
  {
    "id": "fc-econ-g11-u3-710",
    "grade": 11,
    "subject": "economics",
    "unitNumber": 3,
    "front": "What is Price Discrimination and its three degrees?",
    "back": "Selling the same product at different prices to different customers not based on cost differences.\n• 1st degree: Perfect (each pays max willingness)\n• 2nd degree: Quantity discounting / block pricing\n• 3rd degree: Market segmentation (e.g., student discounts).",
    "category": "definition"
  },
  {
    "id": "fc-econ-g12-u1-711",
    "grade": 12,
    "subject": "economics",
    "unitNumber": 1,
    "front": "What is Stagflation?",
    "back": "A toxic economic condition characterized by stagnant economic growth, high unemployment, and high inflation occurring simultaneously (supply shock).",
    "category": "definition"
  },
  {
    "id": "fc-econ-g12-u2-712",
    "grade": 12,
    "subject": "economics",
    "unitNumber": 2,
    "front": "What are the three motives for holding money according to Keynes?",
    "back": "1. Transactions motive (daily purchases)\n2. Precautionary motive (unforeseen emergencies)\n3. Speculative motive (investment in financial assets).",
    "category": "concept"
  },
  {
    "id": "fc-econ-g12-u3-713",
    "grade": 12,
    "subject": "economics",
    "unitNumber": 3,
    "front": "What is Fiscal Deficit and how is it financed?",
    "back": "When total government expenditure exceeds total tax revenues (excluding borrowings). Financed by issuing government bonds, borrowing from central bank (printing money), or external loans.",
    "category": "definition"
  },
  {
    "id": "fc-hist-g9-u1-714",
    "grade": 9,
    "subject": "history",
    "unitNumber": 1,
    "front": "What was the significance of the Periplus of the Erythraean Sea?",
    "back": "A 1st-century AD Greco-Roman sailing handbook documenting Red Sea trade routes, naming Zoscales as King of Aksum and Adulis as a prominent trading hub.",
    "category": "date_fact"
  },
  {
    "id": "fc-hist-g9-u2-715",
    "grade": 9,
    "subject": "history",
    "unitNumber": 2,
    "front": "What is the Kebra Nagast ('Glory of Kings')?",
    "back": "A 14th-century Ethiopian national epic detailing the legendary lineage of the Solomonic dynasty from Queen Sheba (Makeda) and King Solomon, and the transfer of the Ark of the Covenant to Aksum.",
    "category": "concept"
  },
  {
    "id": "fc-hist-g10-u1-716",
    "grade": 10,
    "subject": "history",
    "unitNumber": 1,
    "front": "Who were the leaders of the Oromo Population Movement in the 16th century?",
    "back": "The movement began from the highlands of Bale/Sidamo led by Gadaa classes (e.g., Melba, Mudana, Kilole, Bifole, Michille) expanding across central, western, and northern Ethiopia.",
    "category": "date_fact"
  },
  {
    "id": "fc-hist-g10-u2-717",
    "grade": 10,
    "subject": "history",
    "unitNumber": 2,
    "front": "What was the Warra Sheh (Yejju) Dynasty during the Zemene Mesafint?",
    "back": "A prominent Muslim Oromo-descended ruling lineage based in Debre Tabor that exercised de facto control as Regents (Enderase) over the nominal Solomonic emperors from 1780 to 1853.",
    "category": "date_fact"
  },
  {
    "id": "fc-hist-g11-u1-718",
    "grade": 11,
    "subject": "history",
    "unitNumber": 1,
    "front": "What was the Boru Meda Council of 1878?",
    "back": "A religious council convened by Emperor Yohannes IV in Wollo that established Orthodox Christianity as state religion, resolving doctrinal disputes (Tewahdo declared sole doctrine) and ordering conversion of local Muslims.",
    "category": "date_fact"
  },
  {
    "id": "fc-hist-g11-u2-719",
    "grade": 11,
    "subject": "history",
    "unitNumber": 2,
    "front": "Who was Ras Alula Aba Nega and what victory is he famous for?",
    "back": "A brilliant Ethiopian military commander and governor of Mereb Mellash who defeated the Italian colonial army at the Battle of Dogali (January 26, 1887).",
    "category": "date_fact"
  },
  {
    "id": "fc-hist-g12-u1-720",
    "grade": 12,
    "subject": "history",
    "unitNumber": 1,
    "front": "What was the Tripartite Treaty of 1906 regarding Ethiopia?",
    "back": "An agreement signed by Britain, France, and Italy without Ethiopian consultation, defining their respective imperial spheres of economic and political influence in Ethiopia in the event of Menelik's demise.",
    "category": "date_fact"
  },
  {
    "id": "fc-hist-g12-u2-721",
    "grade": 12,
    "subject": "history",
    "unitNumber": 2,
    "front": "What was Proclamation No. 31 of 1975 issued by the Derg?",
    "back": "The Public Ownership of Rural Lands Proclamation, abolishing tenant-landlord relations, nationalizing all rural land, and redistributing up to 10 hectares per farming family.",
    "category": "date_fact"
  },
  {
    "id": "fc-geog-g9-u1-722",
    "grade": 9,
    "subject": "geography",
    "unitNumber": 1,
    "front": "What is Remote Sensing and its applications?",
    "back": "The acquisition of information about Earth's surface from a distance using satellite sensors or aerial photography, used in cartography, crop monitoring, forestry, and disaster management.",
    "category": "definition"
  },
  {
    "id": "fc-geog-g10-u1-723",
    "grade": 10,
    "subject": "geography",
    "unitNumber": 1,
    "front": "What are the characteristics of Tropical Rainforest (Equatorial) climate?",
    "back": "Consistently high temperatures (>25 °C year-round), heavy annual precipitation (>2,000 mm), no distinct dry season, and dense multi-layered evergreen forest canopy.",
    "category": "concept"
  },
  {
    "id": "fc-geog-g11-u1-724",
    "grade": 11,
    "subject": "geography",
    "unitNumber": 1,
    "front": "What is the Afar Triangle / Danakil Depression and its geological significance?",
    "back": "A triple tectonic junction where the Nubian, Somalian, and Arabian plates are pulling apart, forming one of the hottest and lowest subaerial places on Earth (-125 m at Dallol).",
    "category": "date_fact"
  },
  {
    "id": "fc-geog-g11-u2-725",
    "grade": 11,
    "subject": "geography",
    "unitNumber": 2,
    "front": "What is Lake Tana and what river flows from it?",
    "back": "The largest freshwater lake in Ethiopia (surface area ~3,600 km², elevation 1,788 m), serving as the natural reservoir and source of the Abbay (Blue Nile).",
    "category": "date_fact"
  },
  {
    "id": "fc-geog-g12-u1-726",
    "grade": 12,
    "subject": "geography",
    "unitNumber": 1,
    "front": "What is the Primate City concept and how does it apply to Addis Ababa?",
    "back": "A primate city is disproportionately larger (often more than twice the size) than any other city in the country, dominating political, financial, and industrial life, as seen in Addis Ababa.",
    "category": "definition"
  },
  {
    "id": "fc-geog-g12-u2-727",
    "grade": 12,
    "subject": "geography",
    "unitNumber": 2,
    "front": "What are the benefits and environmental concerns of the Grand Ethiopian Renaissance Dam (GERD)?",
    "back": "Benefits: 5,150 MW clean renewable power, flood control, regulated water flow for downstream neighbors. Concerns: Filling schedule diplomacy with Egypt and Sudan, seasonal reservoir evaporation.",
    "category": "concept"
  },
  {
    "id": "fc-phys-g9-u1-728",
    "grade": 9,
    "subject": "physics",
    "unitNumber": 1,
    "front": "What is the density formula and unit?",
    "back": "Density ρ = Mass / Volume = m / V (kg/m³ or g/cm³).",
    "category": "formula"
  },
  {
    "id": "fc-phys-g9-u2-729",
    "grade": 9,
    "subject": "physics",
    "unitNumber": 2,
    "front": "State the equation for speed and velocity.",
    "back": "Speed = Distance / Time\nVelocity = Displacement / Time (vector quantity with magnitude and direction).",
    "category": "formula"
  },
  {
    "id": "fc-phys-g9-u3-730",
    "grade": 9,
    "subject": "physics",
    "unitNumber": 3,
    "front": "What is Momentum and its formula?",
    "back": "Momentum p = mass * velocity = m * v (kg·m/s). It is a vector pointing in the direction of velocity.",
    "category": "formula"
  },
  {
    "id": "fc-phys-g9-u4-731",
    "grade": 9,
    "subject": "physics",
    "unitNumber": 4,
    "front": "What is the Law of Conservation of Energy?",
    "back": "Energy cannot be created or destroyed; it can only be transformed from one form to another. Total energy of an isolated system remains constant.",
    "category": "concept"
  },
  {
    "id": "fc-phys-g9-u5-732",
    "grade": 9,
    "subject": "physics",
    "unitNumber": 5,
    "front": "What is the Mechanical Advantage of an inclined plane?",
    "back": "MA = Length of ramp / Height of ramp = L / h (neglecting friction).",
    "category": "formula"
  },
  {
    "id": "fc-phys-g9-u6-733",
    "grade": 9,
    "subject": "physics",
    "unitNumber": 6,
    "front": "What is Boyle's Law formula and condition?",
    "back": "P1 * V1 = P2 * V2 (at constant temperature and mass of ideal gas).",
    "category": "formula"
  },
  {
    "id": "fc-phys-g9-u7-734",
    "grade": 9,
    "subject": "physics",
    "unitNumber": 7,
    "front": "What is Charles's Law formula and condition?",
    "back": "V1 / T1 = V2 / T2 (at constant pressure, temperature in Kelvin).",
    "category": "formula"
  },
  {
    "id": "fc-phys-g10-u1-735",
    "grade": 10,
    "subject": "physics",
    "unitNumber": 1,
    "front": "What is the formula for Period (T) in uniform circular motion?",
    "back": "T = 2π * r / v = 2π / ω",
    "category": "formula"
  },
  {
    "id": "fc-phys-g10-u2-736",
    "grade": 10,
    "subject": "physics",
    "unitNumber": 2,
    "front": "What is Escape Velocity from Earth's surface?",
    "back": "v_esc = √(2 * G * M / R) ≈ 11.2 km/s (Speed needed to break free of Earth's gravity without further propulsion).",
    "category": "formula"
  },
  {
    "id": "fc-phys-g10-u3-737",
    "grade": 10,
    "subject": "physics",
    "unitNumber": 3,
    "front": "State Hooke's Law for elastic potential energy.",
    "back": "PE_elastic = (1/2) * k * x²\nwhere k = spring stiffness constant (N/m), x = displacement (m).",
    "category": "formula"
  },
  {
    "id": "fc-phys-g10-u4-738",
    "grade": 10,
    "subject": "physics",
    "unitNumber": 4,
    "front": "What is the formula for the speed of a transverse wave on a stretched string?",
    "back": "v = √(T / μ)\nwhere T = string tension (N), μ = linear mass density (m / L in kg/m).",
    "category": "formula"
  },
  {
    "id": "fc-phys-g10-u5-739",
    "grade": 10,
    "subject": "physics",
    "unitNumber": 5,
    "front": "What is Refractive Index (n)?",
    "back": "n = c / v\nwhere c = speed of light in vacuum (3 × 10⁸ m/s), v = speed of light in the medium.",
    "category": "formula"
  },
  {
    "id": "fc-phys-g10-u5-740",
    "grade": 10,
    "subject": "physics",
    "unitNumber": 5,
    "front": "State the Law of Reflection.",
    "back": "1. Angle of incidence equals angle of reflection (θ_i = θ_r).\n2. Incident ray, reflected ray, and normal all lie in the same plane.",
    "category": "concept"
  },
  {
    "id": "fc-phys-g11-u1-741",
    "grade": 11,
    "subject": "physics",
    "unitNumber": 1,
    "front": "What is the Dot Product condition for perpendicular vectors?",
    "back": "A · B = 0 (since cos 90° = 0).",
    "category": "formula"
  },
  {
    "id": "fc-phys-g11-u1-742",
    "grade": 11,
    "subject": "physics",
    "unitNumber": 1,
    "front": "What is the Cross Product condition for parallel vectors?",
    "back": "A × B = 0 (since sin 0° = sin 180° = 0).",
    "category": "formula"
  },
  {
    "id": "fc-phys-g11-u2-743",
    "grade": 11,
    "subject": "physics",
    "unitNumber": 2,
    "front": "What is the trajectory shape of a projectile under gravity without air resistance?",
    "back": "A parabola (y = ax + bx²).",
    "category": "concept"
  },
  {
    "id": "fc-phys-g11-u3-744",
    "grade": 11,
    "subject": "physics",
    "unitNumber": 3,
    "front": "What is the Center of Mass formula for a discrete system of particles?",
    "back": "x_cm = (Σ m_i * x_i) / (Σ m_i)",
    "category": "formula"
  },
  {
    "id": "fc-phys-g11-u4-745",
    "grade": 11,
    "subject": "physics",
    "unitNumber": 4,
    "front": "What is the Kinetic Energy of a rolling object without slipping?",
    "back": "KE_total = KE_trans + KE_rot = (1/2)mv² + (1/2)Iω².",
    "category": "formula"
  },
  {
    "id": "fc-phys-g11-u5-746",
    "grade": 11,
    "subject": "physics",
    "unitNumber": 5,
    "front": "What is the relationship between torque and angular momentum?",
    "back": "τ_net = dL / dt (Torque is the time rate of change of angular momentum).",
    "category": "formula"
  },
  {
    "id": "fc-phys-g11-u6-747",
    "grade": 11,
    "subject": "physics",
    "unitNumber": 6,
    "front": "What is Stable, Unstable, and Neutral Equilibrium?",
    "back": "Stable: Center of gravity rises when displaced (restoring torque). Unstable: Center of gravity lowers when displaced (toppling torque). Neutral: Center of gravity remains at same height.",
    "category": "definition"
  },
  {
    "id": "fc-phys-g11-u7-748",
    "grade": 11,
    "subject": "physics",
    "unitNumber": 7,
    "front": "What is the Reynolds Number and what does it predict?",
    "back": "Re = (ρ * v * D) / η. Predicts flow regime: Re < 2000 is laminar flow; Re > 4000 is turbulent flow.",
    "category": "formula"
  },
  {
    "id": "fc-phys-g12-u1-749",
    "grade": 12,
    "subject": "physics",
    "unitNumber": 1,
    "front": "What is the ideal gas law equation of state?",
    "back": "PV = nRT = N * k_B * T\nwhere R = 8.314 J/(mol·K), k_B = Boltzmann constant (1.38 × 10⁻²³ J/K).",
    "category": "formula"
  },
  {
    "id": "fc-phys-g12-u2-750",
    "grade": 12,
    "subject": "physics",
    "unitNumber": 2,
    "front": "What is Electric Potential Energy of two point charges q1 and q2?",
    "back": "U = k_e * (q1 * q2) / r (Joules).",
    "category": "formula"
  },
  {
    "id": "fc-phys-g12-u2-751",
    "grade": 12,
    "subject": "physics",
    "unitNumber": 2,
    "front": "What is the capacitance formula for a cylindrical capacitor?",
    "back": "C = 2π * ε_0 * L / ln(b / a)\nwhere b is outer radius, a is inner radius.",
    "category": "formula"
  },
  {
    "id": "fc-phys-g12-u3-752",
    "grade": 12,
    "subject": "physics",
    "unitNumber": 3,
    "front": "State the formula for equivalent resistance in series and parallel.",
    "back": "Series: R_eq = R1 + R2 + ...\nParallel: 1/R_eq = 1/R1 + 1/R2 + ...",
    "category": "formula"
  },
  {
    "id": "fc-phys-g12-u3-753",
    "grade": 12,
    "subject": "physics",
    "unitNumber": 3,
    "front": "State the formula for equivalent capacitance in series and parallel.",
    "back": "Series: 1/C_eq = 1/C1 + 1/C2 + ...\nParallel: C_eq = C1 + C2 + ...",
    "category": "formula"
  },
  {
    "id": "fc-phys-g12-u4-754",
    "grade": 12,
    "subject": "physics",
    "unitNumber": 4,
    "front": "State the magnetic force between two parallel current-carrying wires.",
    "back": "F / L = (μ_0 * I1 * I2) / (2π * d)\n(Attractive if currents flow in same direction, repulsive if opposite).",
    "category": "formula"
  },
  {
    "id": "fc-phys-g12-u4-755",
    "grade": 12,
    "subject": "physics",
    "unitNumber": 4,
    "front": "What is the Transformer Equation relating voltages and coil turns?",
    "back": "V_s / V_p = N_s / N_p = I_p / I_s (for ideal transformer with 100% efficiency).",
    "category": "formula"
  },
  {
    "id": "fc-phys-g12-u5-756",
    "grade": 12,
    "subject": "physics",
    "unitNumber": 5,
    "front": "What is Resonance in an RLC AC circuit?",
    "back": "When inductive reactance equals capacitive reactance (X_L = X_C), impedance is minimized (Z = R), and current reaches its maximum value.",
    "category": "concept"
  },
  {
    "id": "fc-phys-g12-u6-757",
    "grade": 12,
    "subject": "physics",
    "unitNumber": 6,
    "front": "What is Heisenberg's Uncertainty Principle?",
    "back": "Δx * Δp ≥ h / (4π)\nIt is physically impossible to simultaneously measure both the position and momentum of a subatomic particle with arbitrary precision.",
    "category": "formula"
  },
  {
    "id": "fc-phys-g12-u6-758",
    "grade": 12,
    "subject": "physics",
    "unitNumber": 6,
    "front": "What is the Pauli Exclusion Principle in atomic physics?",
    "back": "No two electrons in the same atom can have identical values for all four quantum numbers (n, l, m_l, m_s).",
    "category": "concept"
  },
  {
    "id": "fc-chem-g9-u1-759",
    "grade": 9,
    "subject": "chemistry",
    "unitNumber": 1,
    "front": "What are the common indicators and their colors in acid vs base?",
    "back": "• Litmus: Red in acid, Blue in base.\n• Phenolphthalein: Colorless in acid, Pink in base.\n• Methyl orange: Red in acid, Yellow in base.",
    "category": "definition"
  },
  {
    "id": "fc-chem-g9-u2-760",
    "grade": 9,
    "subject": "chemistry",
    "unitNumber": 2,
    "front": "What is the electronic configuration of Sodium (Na, Z=11) and Chlorine (Cl, Z=17)?",
    "back": "Na: 2, 8, 1 (or 1s² 2s² 2p⁶ 3s¹)\nCl: 2, 8, 7 (or 1s² 2s² 2p⁶ 3s² 3p⁵).",
    "category": "concept"
  },
  {
    "id": "fc-chem-g9-u3-761",
    "grade": 9,
    "subject": "chemistry",
    "unitNumber": 3,
    "front": "Why are Noble Gases chemically unreactive?",
    "back": "They have completely filled valence electron shells (octet: s²p⁶, helium: 1s²), giving them exceptional thermodynamic stability.",
    "category": "concept"
  },
  {
    "id": "fc-chem-g9-u4-762",
    "grade": 9,
    "subject": "chemistry",
    "unitNumber": 4,
    "front": "What is a Coordinate Covalent (Dative) Bond?",
    "back": "A covalent bond in which both shared electrons in the bond pair are donated by only one of the participating atoms (e.g., in NH₄⁺ or H₃O⁺).",
    "category": "definition"
  },
  {
    "id": "fc-chem-g9-u5-763",
    "grade": 9,
    "subject": "chemistry",
    "unitNumber": 5,
    "front": "What is Molarity (M) and its formula?",
    "back": "Molarity M = moles of solute / liters of solution = n / V (mol/L).",
    "category": "formula"
  },
  {
    "id": "fc-chem-g10-u1-764",
    "grade": 10,
    "subject": "chemistry",
    "unitNumber": 1,
    "front": "What is the formula for calculating Enthalpy of Reaction from bond energies?",
    "back": "ΔH_rxn = Σ (Bond energies of bonds broken in reactants) - Σ (Bond energies of bonds formed in products).",
    "category": "formula"
  },
  {
    "id": "fc-chem-g10-u2-765",
    "grade": 10,
    "subject": "chemistry",
    "unitNumber": 2,
    "front": "What are Deliquescent, Efflorescent, and Hygroscopic substances?",
    "back": "• Deliquescent: Absorbs moisture from air to dissolve and form a solution (e.g., solid NaOH, anhydrous CaCl₂).\n• Efflorescent: Loses water of crystallization to air (e.g., Na₂CO₃·10H₂O).\n• Hygroscopic: Absorbs moisture without forming liquid (e.g., concentrated H₂SO₄).",
    "category": "definition"
  },
  {
    "id": "fc-chem-g10-u3-766",
    "grade": 10,
    "subject": "chemistry",
    "unitNumber": 3,
    "front": "What is the product at the cathode and anode in electrolysis of molten NaCl?",
    "back": "Cathode (-): 2Na⁺ + 2e⁻ -> 2Na(l) (Sodium metal reduction)\nAnode (+): 2Cl⁻ -> Cl₂(g) + 2e⁻ (Chlorine gas oxidation).",
    "category": "concept"
  },
  {
    "id": "fc-chem-g10-u4-767",
    "grade": 10,
    "subject": "chemistry",
    "unitNumber": 4,
    "front": "What is cracking of petroleum hydrocarbons?",
    "back": "The process of breaking down long-chain heavy hydrocarbon molecules into smaller, more valuable short-chain alkanes and alkenes using heat (thermal) or catalysts.",
    "category": "definition"
  },
  {
    "id": "fc-chem-g10-u4-768",
    "grade": 10,
    "subject": "chemistry",
    "unitNumber": 4,
    "front": "What is the functional group and formula of Acetylene (Ethyne)?",
    "back": "H-C≡C-H (triple bond), simplest alkyne, used in oxy-acetylene welding torches due to its high combustion flame temperature (~3,000 °C).",
    "category": "date_fact"
  },
  {
    "id": "fc-chem-g11-u1-769",
    "grade": 11,
    "subject": "chemistry",
    "unitNumber": 1,
    "front": "What is the shape and bond angle of Boron Trifluoride (BF₃)?",
    "back": "Trigonal planar with 120° bond angles (sp² hybridized boron atom with no lone pairs).",
    "category": "concept"
  },
  {
    "id": "fc-chem-g11-u2-770",
    "grade": 11,
    "subject": "chemistry",
    "unitNumber": 2,
    "front": "What is Dipole-Dipole attraction?",
    "back": "Attractive intermolecular electrostatic forces between permanent positive and negative ends of polar molecules (e.g., HCl molecules).",
    "category": "definition"
  },
  {
    "id": "fc-chem-g11-u3-771",
    "grade": 11,
    "subject": "chemistry",
    "unitNumber": 3,
    "front": "What is an Activated Complex (Transition State)?",
    "back": "An unstable, high-energy grouping of atoms at the peak of the potential energy barrier that can either form products or revert to reactants.",
    "category": "definition"
  },
  {
    "id": "fc-chem-g11-u4-772",
    "grade": 11,
    "subject": "chemistry",
    "unitNumber": 4,
    "front": "How does increasing pressure affect a gaseous equilibrium?",
    "back": "Equilibrium shifts toward the side with fewer moles of gas to counteract the increased pressure.",
    "category": "concept"
  },
  {
    "id": "fc-chem-g11-u5-773",
    "grade": 11,
    "subject": "chemistry",
    "unitNumber": 5,
    "front": "What is Esterification?",
    "back": "The acid-catalyzed condensation reaction between a carboxylic acid and an alcohol producing an ester and water: R-COOH + R'-OH ⇌ R-COOR' + H₂O.",
    "category": "formula"
  },
  {
    "id": "fc-chem-g12-u1-774",
    "grade": 12,
    "subject": "chemistry",
    "unitNumber": 1,
    "front": "What is the conjugate base of HSO₄⁻ and conjugate acid of HPO₄²⁻?",
    "back": "Conjugate base of HSO₄⁻ is SO₄²⁻.\nConjugate acid of HPO₄²⁻ is H₂PO₄⁻.",
    "category": "definition"
  },
  {
    "id": "fc-chem-g12-u1-775",
    "grade": 12,
    "subject": "chemistry",
    "unitNumber": 1,
    "front": "What makes a good Acid-Base Buffer solution?",
    "back": "A mixture containing roughly equimolar amounts of a weak acid and its conjugate base (or a weak base and its conjugate acid), resisting pH changes upon addition of small amounts of strong acid or base.",
    "category": "concept"
  },
  {
    "id": "fc-chem-g12-u2-776",
    "grade": 12,
    "subject": "chemistry",
    "unitNumber": 2,
    "front": "What is standard reduction potential (E°) measured relative to?",
    "back": "The Standard Hydrogen Electrode (SHE), which is assigned an arbitrary potential of 0.00 V at all temperatures (2H⁺ + 2e⁻ ⇌ H₂(g) at 1 atm, 1 M H⁺, 25 °C).",
    "category": "concept"
  },
  {
    "id": "fc-chem-g12-u3-777",
    "grade": 12,
    "subject": "chemistry",
    "unitNumber": 3,
    "front": "What is Standard Enthalpy of Formation (ΔH°_f)?",
    "back": "The enthalpy change when 1 mole of a compound is formed from its pure constituent elements in their standard states at 298 K and 1 atm (ΔH°_f of pure elements in standard state is 0).",
    "category": "definition"
  },
  {
    "id": "fc-chem-g12-u4-778",
    "grade": 12,
    "subject": "chemistry",
    "unitNumber": 4,
    "front": "What are Monomers of Natural Rubber, Starch, and Proteins?",
    "back": "• Natural rubber: Isoprene (2-methyl-1,3-butadiene)\n• Starch: α-Glucose\n• Proteins: Amino acids.",
    "category": "definition"
  },
  {
    "id": "fc-biol-g9-u1-779",
    "grade": 9,
    "subject": "biology",
    "unitNumber": 1,
    "front": "What is the cell theory and who proposed it?",
    "back": "1. All living organisms are composed of one or more cells.\n2. The cell is the basic structural and functional unit of life.\n3. All cells arise from pre-existing cells (Virchow).\nProposed by Schleiden, Schwann, and Virchow.",
    "category": "concept"
  },
  {
    "id": "fc-biol-g9-u2-780",
    "grade": 9,
    "subject": "biology",
    "unitNumber": 2,
    "front": "What is Phagocytosis vs Pinocytosis?",
    "back": "Phagocytosis ('cell eating'): Engulfing large solid particles or microorganisms (e.g., macrophages).\nPinocytosis ('cell drinking'): Ingestion of extracellular liquid droplets via vesicle invagination.",
    "category": "definition"
  },
  {
    "id": "fc-biol-g9-u3-781",
    "grade": 9,
    "subject": "biology",
    "unitNumber": 3,
    "front": "What is the function of the human Kidneys and Nephrons?",
    "back": "Nephrons are the functional filtration units of the kidney, performing ultrafiltration (glomerulus), selective reabsorption (convoluted tubules), and tubular secretion to maintain osmoregulation and excrete urea.",
    "category": "concept"
  },
  {
    "id": "fc-biol-g9-u4-782",
    "grade": 9,
    "subject": "biology",
    "unitNumber": 4,
    "front": "What is the causal agent and vector of Sleeping Sickness (African Trypanosomiasis)?",
    "back": "Pathogen: Trypanosoma brucei (protozoan parasite).\nVector: Tsetse fly (genus Glossina).",
    "category": "date_fact"
  },
  {
    "id": "fc-biol-g9-u5-783",
    "grade": 9,
    "subject": "biology",
    "unitNumber": 5,
    "front": "What are the components of the Nitrogen Cycle?",
    "back": "1. Nitrogen fixation (Rhizobium, Azotobacter convert N₂ -> NH₃)\n2. Nitrification (Nitrosomonas converts NH₄⁺ -> NO₂⁻; Nitrobacter converts NO₂⁻ -> NO₃⁻)\n3. Assimilation by plants\n4. Ammonification\n5. Denitrification (Pseudomonas converts NO₃⁻ -> N₂ gas).",
    "category": "concept"
  },
  {
    "id": "fc-biol-g10-u1-784",
    "grade": 10,
    "subject": "biology",
    "unitNumber": 1,
    "front": "What is Polymerase Chain Reaction (PCR) and who invented it?",
    "back": "A molecular biotechnology technique used to amplify a specific DNA sequence exponentially into millions of copies in vitro; invented by Kary Mullis in 1983.",
    "category": "date_fact"
  },
  {
    "id": "fc-biol-g10-u2-785",
    "grade": 10,
    "subject": "biology",
    "unitNumber": 2,
    "front": "What is a Test Cross and what is its purpose?",
    "back": "Breeding an individual of dominant phenotype but unknown genotype (AA or Aa) with a homozygous recessive individual (aa) to determine if it is homozygous or heterozygous.",
    "category": "definition"
  },
  {
    "id": "fc-biol-g10-u3-786",
    "grade": 10,
    "subject": "biology",
    "unitNumber": 3,
    "front": "What is the Synapse and how do neurotransmitters cross it?",
    "back": "The junction between two neurons. Action potential reaches axon terminal, causing influx of Ca²⁺, releasing neurotransmitters (e.g., Acetylcholine) from vesicles by exocytosis to diffuse across the synaptic cleft.",
    "category": "concept"
  },
  {
    "id": "fc-biol-g10-u4-787",
    "grade": 10,
    "subject": "biology",
    "unitNumber": 4,
    "front": "What are the Simien Mountains and Bale Mountains National Parks noted for?",
    "back": "Simien: Home of endemic Walia Ibex, Gelada Baboon, and Ras Dejen peak. Bale: Largest Afro-alpine habitat in Africa, primary refuge of the endangered Ethiopian Wolf (Canis simensis) and Mountain Nyala.",
    "category": "date_fact"
  },
  {
    "id": "fc-biol-g11-u1-788",
    "grade": 11,
    "subject": "biology",
    "unitNumber": 1,
    "front": "What is the structure of an Amino Acid?",
    "back": "A central carbon (α-carbon) bonded to: 1. Amino group (-NH₂), 2. Carboxyl group (-COOH), 3. Hydrogen atom (-H), and 4. Variable side chain (R-group).",
    "category": "definition"
  },
  {
    "id": "fc-biol-g11-u2-789",
    "grade": 11,
    "subject": "biology",
    "unitNumber": 2,
    "front": "What are Cofactors and Coenzymes?",
    "back": "Non-protein chemical compounds required for an enzyme's biological activity. Cofactors are inorganic metal ions (e.g., Fe²⁺, Mg²⁺, Zn²⁺). Coenzymes are organic molecules (often derived from vitamins, e.g., NAD⁺, FAD, Coenzyme A).",
    "category": "definition"
  },
  {
    "id": "fc-biol-g11-u3-790",
    "grade": 11,
    "subject": "biology",
    "unitNumber": 3,
    "front": "Where does the Krebs (Citric Acid) Cycle take place and what enters it?",
    "back": "Takes place in the mitochondrial matrix. Acetyl-CoA (2C) combines with Oxaloacetate (4C) to form Citrate (6C).",
    "category": "concept"
  },
  {
    "id": "fc-biol-g11-u4-791",
    "grade": 11,
    "subject": "biology",
    "unitNumber": 4,
    "front": "What is Photolysis of Water and in which photosystem does it occur?",
    "back": "The splitting of water molecules into oxygen, protons, and electrons (2H₂O -> O₂ + 4H⁺ + 4e⁻) catalyzed by the oxygen-evolving complex at Photosystem II (PS II).",
    "category": "concept"
  },
  {
    "id": "fc-biol-g12-u1-792",
    "grade": 12,
    "subject": "biology",
    "unitNumber": 1,
    "front": "What is the role of tRNA in protein translation?",
    "back": "Transfer RNA molecules fold into a cloverleaf shape, carrying a specific amino acid at the 3' CCA acceptor stem and matching mRNA codons via its complementary anticodon triplet.",
    "category": "concept"
  },
  {
    "id": "fc-biol-g12-u2-793",
    "grade": 12,
    "subject": "biology",
    "unitNumber": 2,
    "front": "What are Vestigial Structures? Give human examples.",
    "back": "Anatomical structures that have lost most or all of their ancestral function through evolution.\nHuman examples: Appendix, coccyx (tailbone), wisdom teeth, auricular ear muscles.",
    "category": "definition"
  },
  {
    "id": "fc-biol-g12-u3-794",
    "grade": 12,
    "subject": "biology",
    "unitNumber": 3,
    "front": "What is the function of the Human Placenta?",
    "back": "An endocrine and exchange organ connecting fetus and mother, facilitating nutrient uptake, waste elimination, gas exchange, and secreting hormones (HCG, progesterone, estrogen).",
    "category": "concept"
  },
  {
    "id": "fc-biol-g12-u4-795",
    "grade": 12,
    "subject": "biology",
    "unitNumber": 4,
    "front": "What are r-selected vs K-selected ecological life strategies?",
    "back": "r-selected: High reproductive rate, many small offspring, minimal parental care, rapid maturity (e.g., insects, weeds). K-selected: Stable population near carrying capacity, few large offspring, high parental investment (e.g., humans, elephants).",
    "category": "definition"
  },
  {
    "id": "fc-math-g9-u1-796",
    "grade": 9,
    "subject": "mathematics",
    "unitNumber": 1,
    "front": "What is the prime factorization of a composite number?",
    "back": "Expressing a composite number as a unique product of prime numbers (Fundamental Theorem of Arithmetic).",
    "category": "definition"
  },
  {
    "id": "fc-math-g9-u2-797",
    "grade": 9,
    "subject": "mathematics",
    "unitNumber": 2,
    "front": "What is the formula for the sum and difference of cubes?",
    "back": "a³ + b³ = (a + b)(a² - ab + b²)\na³ - b³ = (a - b)(a² + ab + b²)",
    "category": "formula"
  },
  {
    "id": "fc-math-g9-u3-798",
    "grade": 9,
    "subject": "mathematics",
    "unitNumber": 3,
    "front": "What is the area of a triangle given two sides a, b and included angle C?",
    "back": "Area = (1/2) * a * b * sin(C)",
    "category": "formula"
  },
  {
    "id": "fc-math-g9-u4-799",
    "grade": 9,
    "subject": "mathematics",
    "unitNumber": 4,
    "front": "What is Heron's Formula for the area of a triangle?",
    "back": "Area = √(s(s - a)(s - b)(s - c))\nwhere semi-perimeter s = (a + b + c) / 2.",
    "category": "formula"
  },
  {
    "id": "fc-math-g9-u5-800",
    "grade": 9,
    "subject": "mathematics",
    "unitNumber": 5,
    "front": "What is the definition of standard deviation?",
    "back": "The square root of the variance, measuring the average dispersion of data values around the mean: σ = √(Σ(x_i - μ)² / N).",
    "category": "definition"
  },
  {
    "id": "fc-math-g10-u1-801",
    "grade": 10,
    "subject": "mathematics",
    "unitNumber": 1,
    "front": "What is the Rational Root Theorem?",
    "back": "If polynomial a_n*x^n + ... + a_0 has rational roots p/q (in lowest terms), then p must be an integer factor of constant term a_0, and q must be an integer factor of leading coefficient a_n.",
    "category": "concept"
  },
  {
    "id": "fc-math-g10-u2-802",
    "grade": 10,
    "subject": "mathematics",
    "unitNumber": 2,
    "front": "State the logarithm quotient rule and power rule.",
    "back": "log_b(M / N) = log_b(M) - log_b(N)\nlog_b(M^k) = k * log_b(M)",
    "category": "formula"
  },
  {
    "id": "fc-math-g10-u3-803",
    "grade": 10,
    "subject": "mathematics",
    "unitNumber": 3,
    "front": "What are the trigonometric formulas for tan(A + B) and tan(2A)?",
    "back": "tan(A + B) = (tan A + tan B) / (1 - tan A * tan B)\ntan(2A) = (2 * tan A) / (1 - tan² A)",
    "category": "formula"
  },
  {
    "id": "fc-math-g10-u4-804",
    "grade": 10,
    "subject": "mathematics",
    "unitNumber": 4,
    "front": "What is the equation of a line tangent to a circle x² + y² = r² at point (x1, y1)?",
    "back": "x * x1 + y * y1 = r²",
    "category": "formula"
  },
  {
    "id": "fc-math-g11-u1-805",
    "grade": 11,
    "subject": "mathematics_natural",
    "unitNumber": 1,
    "front": "State the formula for the sum of cubes of first n integers.",
    "back": "Σ i³ = [n(n + 1) / 2]² = (Σ i)²",
    "category": "formula"
  },
  {
    "id": "fc-math-g11-u2-806",
    "grade": 11,
    "subject": "mathematics_natural",
    "unitNumber": 2,
    "front": "What is the definition of a Derivative as instantaneous rate of change?",
    "back": "f'(x) represents the slope of the tangent line to the graph of y = f(x) at point (x, f(x)).",
    "category": "definition"
  },
  {
    "id": "fc-math-g11-u3-807",
    "grade": 11,
    "subject": "mathematics_natural",
    "unitNumber": 3,
    "front": "How do you multiply two matrices A (m x k) and B (k x n)?",
    "back": "The entry c_ij of product C = AB is the dot product of the i-th row of A and the j-th column of B: c_ij = Σ (a_ir * b_rj). Result is an (m x n) matrix.",
    "category": "definition"
  },
  {
    "id": "fc-math-g11-u4-808",
    "grade": 11,
    "subject": "mathematics_natural",
    "unitNumber": 4,
    "front": "What is the length of the Latus Rectum of a Parabola y² = 4ax?",
    "back": "Length of latus rectum = 4a.",
    "category": "formula"
  },
  {
    "id": "fc-math-g12-u1-809",
    "grade": 12,
    "subject": "mathematics_natural",
    "unitNumber": 1,
    "front": "What is the derivative of the inverse trigonometric function arcsin(x)?",
    "back": "d/dx [arcsin(x)] = 1 / √(1 - x²) for |x| < 1.",
    "category": "formula"
  },
  {
    "id": "fc-math-g12-u2-810",
    "grade": 12,
    "subject": "mathematics_natural",
    "unitNumber": 2,
    "front": "What is the derivative of arctan(x)?",
    "back": "d/dx [arctan(x)] = 1 / (1 + x²).",
    "category": "formula"
  },
  {
    "id": "fc-math-g12-u3-811",
    "grade": 12,
    "subject": "mathematics_natural",
    "unitNumber": 3,
    "front": "What is the integral of 1 / (x² + a²)?",
    "back": "∫ 1 / (x² + a²) dx = (1 / a) * arctan(x / a) + C.",
    "category": "formula"
  },
  {
    "id": "fc-math-g12-u4-812",
    "grade": 12,
    "subject": "mathematics_natural",
    "unitNumber": 4,
    "front": "What is the scalar triple product of vectors u, v, w?",
    "back": "u · (v × w) = determinant of matrix with rows u, v, w. Represents the volume of the parallelepiped formed by the three vectors.",
    "category": "formula"
  },
  {
    "id": "fc-math-g12-u5-813",
    "grade": 12,
    "subject": "mathematics_natural",
    "unitNumber": 5,
    "front": "What is De Moivre's formula for finding the n-th roots of a complex number?",
    "back": "z_k = r^(1/n) * [cos((θ + 2kπ)/n) + i sin((θ + 2kπ)/n)] for k = 0, 1, 2, ..., n-1.",
    "category": "formula"
  },
  {
    "id": "fc-math-g12-u6-814",
    "grade": 12,
    "subject": "mathematics_natural",
    "unitNumber": 6,
    "front": "What is the Central Limit Theorem (CLT)?",
    "back": "For a sufficiently large sample size (typically n ≥ 30), the sampling distribution of the sample mean approaches a normal distribution regardless of the shape of the underlying population.",
    "category": "concept"
  },
  {
    "id": "fc-math-g11-u1-815",
    "grade": 11,
    "subject": "mathematics_social",
    "unitNumber": 1,
    "front": "What is Amortization in business finance?",
    "back": "The process of spreading out a loan into a series of equal periodic payments over time, where each payment covers both interest and principal repayment.",
    "category": "definition"
  },
  {
    "id": "fc-math-g12-u1-816",
    "grade": 12,
    "subject": "mathematics_social",
    "unitNumber": 1,
    "front": "What is the Profit Function in terms of Total Revenue and Total Cost?",
    "back": "Profit π(q) = TR(q) - TC(q) = P * q - TC(q). Profit is maximized where Marginal Revenue equals Marginal Cost (MR = MC).",
    "category": "formula"
  },
  {
    "id": "fc-econ-g9-u1-817",
    "grade": 9,
    "subject": "economics",
    "unitNumber": 1,
    "front": "What is Microeconomics vs Macroeconomics?",
    "back": "Microeconomics analyzes individual economic units (consumers, firms, markets, prices). Macroeconomics analyzes the aggregate economy as a whole (GDP, inflation, unemployment, fiscal/monetary policy).",
    "category": "definition"
  },
  {
    "id": "fc-econ-g10-u1-818",
    "grade": 10,
    "subject": "economics",
    "unitNumber": 1,
    "front": "What are normal goods vs inferior goods?",
    "back": "Normal goods: Demand increases as consumer income increases (positive income elasticity > 0). Inferior goods: Demand decreases as consumer income increases (negative income elasticity < 0).",
    "category": "definition"
  },
  {
    "id": "fc-econ-g11-u1-819",
    "grade": 11,
    "subject": "economics",
    "unitNumber": 1,
    "front": "What is an Economic Cartel? Give a global example.",
    "back": "A formal collusive agreement between competing oligopolistic firms to fix prices, restrict output, and divide markets to act as a monopoly (e.g., OPEC in crude oil).",
    "category": "definition"
  },
  {
    "id": "fc-econ-g12-u1-820",
    "grade": 12,
    "subject": "economics",
    "unitNumber": 1,
    "front": "What is the difference between Currency Devaluation and Depreciation?",
    "back": "Devaluation is a deliberate downward adjustment of a nation's official exchange rate under a fixed exchange regime. Depreciation is a market-driven decrease in currency value under a floating exchange regime.",
    "category": "definition"
  },
  {
    "id": "fc-hist-g9-u1-821",
    "grade": 9,
    "subject": "history",
    "unitNumber": 1,
    "front": "Who deciphered the Rosetta Stone and why was it significant?",
    "back": "Jean-François Champollion in 1822; it contained the same royal decree in hieroglyphs, demotic script, and ancient Greek, unlocking the understanding of ancient Egyptian civilization.",
    "category": "date_fact"
  },
  {
    "id": "fc-hist-g10-u1-822",
    "grade": 10,
    "subject": "history",
    "unitNumber": 1,
    "front": "What was the Medhicha and Moggaasa adoption system in Oromo society?",
    "back": "Institutions of peaceful socio-political integration where non-Oromo individuals (Medhicha) or entire clans/communities (Moggaasa) were adopted as equal brothers with full clan rights under the Gadaa system.",
    "category": "concept"
  },
  {
    "id": "fc-hist-g11-u1-823",
    "grade": 11,
    "subject": "history",
    "unitNumber": 1,
    "front": "Who was Empress Taytu Betul and what was her diplomatic stance?",
    "back": "Consort of Emperor Menelik II, visionary political and military strategist who founded Addis Ababa and famously declared to Italian diplomats: 'I am a woman. I do not like war. But I would rather die than accept your treaty (Wuchale Article XVII)'.",
    "category": "date_fact"
  },
  {
    "id": "fc-hist-g12-u1-824",
    "grade": 12,
    "subject": "history",
    "unitNumber": 1,
    "front": "What was the League of Nations' response to Mussolini's invasion of Ethiopia in 1935?",
    "back": "Imposed ineffective and delayed economic sanctions that excluded oil and coal, failing to halt fascist aggression and leading to the collapse of collective security.",
    "category": "concept"
  },
  {
    "id": "fc-hist-g12-u2-825",
    "grade": 12,
    "subject": "history",
    "unitNumber": 2,
    "front": "Who was Abune Petros and why is he revered as an Ethiopian national martyr?",
    "back": "Bishop of Wollo who refused to submit to the Italian fascist occupation or excommunicate the Arbegnoch patriots; executed by firing squad in Addis Ababa on July 29, 1936.",
    "category": "date_fact"
  },
  {
    "id": "fc-geog-g9-u1-826",
    "grade": 9,
    "subject": "geography",
    "unitNumber": 1,
    "front": "What is the Prime Meridian and International Date Line?",
    "back": "Prime Meridian: 0° longitude running through Greenwich, London. International Date Line: ~180° longitude, where the calendar date changes by one day upon crossing.",
    "category": "definition"
  },
  {
    "id": "fc-geog-g10-u1-827",
    "grade": 10,
    "subject": "geography",
    "unitNumber": 1,
    "front": "What are Isobars and Isotherms on meteorological maps?",
    "back": "Isobars: Lines connecting points of equal atmospheric pressure. Isotherms: Lines connecting points of equal temperature.",
    "category": "definition"
  },
  {
    "id": "fc-geog-g11-u1-828",
    "grade": 11,
    "subject": "geography",
    "unitNumber": 1,
    "front": "What is the Awash River basin and why is it unique in Ethiopia?",
    "back": "An entirely inland endorheic drainage basin originating in the central highlands and terminating in Lake Abbe on the Djibouti border; Ethiopia's most extensively developed basin for commercial irrigation (sugar, cotton).",
    "category": "date_fact"
  },
  {
    "id": "fc-geog-g12-u1-829",
    "grade": 12,
    "subject": "geography",
    "unitNumber": 1,
    "front": "What is the Weyna Dega zone and why does it hold the largest share of Ethiopia's population?",
    "back": "Altitude between 1,500 and 2,300 m; characterized by moderate temperate climate (15-20 °C), reliable rainfall, fertile soils, and historically low malaria risk, making it ideal for agriculture and human settlement.",
    "category": "concept"
  },
  {
    "id": "fc-engl-g9-u1-830",
    "grade": 9,
    "subject": "english",
    "unitNumber": 1,
    "front": "What is an Adverb of Frequency and where is it placed?",
    "back": "Words like always, usually, often, sometimes, rarely, never. Placed before main verbs, but after auxiliary verbs and the verb 'be' (e.g., 'He always arrives on time', 'She is never late').",
    "category": "concept"
  },
  {
    "id": "fc-engl-g10-u1-831",
    "grade": 10,
    "subject": "english",
    "unitNumber": 1,
    "front": "What is a Collocation in English?",
    "back": "Words that habitually co-occur together naturally (e.g., 'make a decision', 'take a photo', 'heavy rain', 'fast food').",
    "category": "definition"
  },
  {
    "id": "fc-engl-g11-u1-832",
    "grade": 11,
    "subject": "english",
    "unitNumber": 1,
    "front": "What is the difference between 'despite' and 'although'?",
    "back": "'Despite / In spite of' is followed by a noun, pronoun, or gerund (-ing) (e.g., 'Despite the rain, they went out'). 'Although / Even though' is followed by a complete clause with subject and verb.",
    "category": "concept"
  },
  {
    "id": "fc-engl-g12-u1-833",
    "grade": 12,
    "subject": "english",
    "unitNumber": 1,
    "front": "What is parallel structure in sentence composition?",
    "back": "Using the same grammatical form for elements that have the same level of importance in a series (e.g., 'He enjoys swimming, hiking, and reading' instead of 'He enjoys swimming, hiking, and to read').",
    "category": "concept"
  },
  {
    "id": "fc-citi-g9-u1-834",
    "grade": 9,
    "subject": "citizenship",
    "unitNumber": 1,
    "front": "What is Patriotism?",
    "back": "Love, devotion, and sense of attachment to one's homeland, expressed through active civic participation, promoting social justice, paying taxes, and defending national unity.",
    "category": "definition"
  },
  {
    "id": "fc-citi-g10-u1-835",
    "grade": 10,
    "subject": "citizenship",
    "unitNumber": 1,
    "front": "What is the difference between direct and representative democracy?",
    "back": "Direct: Citizens participate directly in policy decision-making without intermediaries (e.g., referendums). Representative: Citizens elect representatives (e.g., MPs) to debate and enact legislation on their behalf.",
    "category": "definition"
  },
  {
    "id": "fc-citi-g11-u1-836",
    "grade": 11,
    "subject": "citizenship",
    "unitNumber": 1,
    "front": "What is the principle of Separation of Powers (Montesquieu)?",
    "back": "Dividing government authority into distinct branches (Legislative, Executive, Judicial) with checks and balances to prevent tyranny and concentration of absolute power.",
    "category": "concept"
  },
  {
    "id": "fc-citi-g12-u1-837",
    "grade": 12,
    "subject": "citizenship",
    "unitNumber": 1,
    "front": "What are Human Rights according to international law?",
    "back": "Inalienable, fundamental entitlements and freedoms inherent to all human beings, regardless of race, sex, nationality, ethnicity, language, or religion.",
    "category": "definition"
  },
  {
    "id": "fc-it-g9-u1-838",
    "grade": 9,
    "subject": "it",
    "unitNumber": 1,
    "front": "What are Input Devices vs Output Devices?",
    "back": "Input: Keyboards, mice, scanners, microphones (feed data into computer). Output: Monitors, printers, speakers, projectors (present processed data to users).",
    "category": "definition"
  },
  {
    "id": "fc-it-g10-u1-839",
    "grade": 10,
    "subject": "it",
    "unitNumber": 1,
    "front": "What is an IP address and difference between IPv4 and IPv6?",
    "back": "A unique numerical identifier for a device on a network. IPv4: 32-bit (e.g., 192.168.1.1, ~4.3 billion addresses). IPv6: 128-bit hexadecimal, providing a virtually limitless address pool.",
    "category": "definition"
  },
  {
    "id": "fc-it-g11-u1-840",
    "grade": 11,
    "subject": "it",
    "unitNumber": 1,
    "front": "What is Object-Oriented Programming (OOP) and its 4 pillars?",
    "back": "1. Encapsulation: Bundling data and methods into objects.\n2. Abstraction: Hiding internal complexity.\n3. Inheritance: Reusing parent class attributes/methods.\n4. Polymorphism: Ability to take multiple forms.",
    "category": "definition"
  },
  {
    "id": "fc-it-g12-u1-841",
    "grade": 12,
    "subject": "it",
    "unitNumber": 1,
    "front": "What is Artificial Intelligence (AI) and Machine Learning (ML)?",
    "back": "AI: Simulation of human intelligence by computer systems. ML: A subset of AI where algorithms learn patterns from training data to make predictions without being explicitly programmed.",
    "category": "definition"
  },
  {
    "id": "fc-phys-g12-u1-842",
    "grade": 12,
    "subject": "physics",
    "unitNumber": 1,
    "front": "What is a Heat Pump and how is its COP calculated?",
    "back": "A thermodynamic device that transfers heat from a colder body to a hotter reservoir by consuming work. COP_heating = Q_h / W = T_h / (T_h - T_c) for a Carnot heat pump.",
    "category": "formula"
  },
  {
    "id": "fc-phys-g12-u1-843",
    "grade": 12,
    "subject": "physics",
    "unitNumber": 1,
    "front": "What is an Isochoric Process and what is the work done?",
    "back": "A constant-volume thermodynamic process (ΔV = 0). Since no volume change occurs, Work W = P * ΔV = 0, so by First Law: ΔU = Q_v = n * C_v * ΔT.",
    "category": "formula"
  },
  {
    "id": "fc-phys-g12-u2-844",
    "grade": 12,
    "subject": "physics",
    "unitNumber": 2,
    "front": "What is Electric Dipole Moment (p)?",
    "back": "p = q * d, a vector pointing from negative charge -q to positive charge +q. Torque in uniform electric field: τ = p × E.",
    "category": "formula"
  },
  {
    "id": "fc-phys-g12-u2-845",
    "grade": 12,
    "subject": "physics",
    "unitNumber": 2,
    "front": "What is the energy density (u_E) of an electric field in a vacuum?",
    "back": "u_E = (1/2) * ε_0 * E² (Joules per cubic meter, J/m³).",
    "category": "formula"
  },
  {
    "id": "fc-phys-g12-u3-846",
    "grade": 12,
    "subject": "physics",
    "unitNumber": 3,
    "front": "What is the Maximum Power Transfer Theorem for a DC circuit?",
    "back": "A DC power source delivers maximum power to a load resistor R_L when the load resistance equals the internal resistance of the source (R_L = r).",
    "category": "concept"
  },
  {
    "id": "fc-phys-g12-u3-847",
    "grade": 12,
    "subject": "physics",
    "unitNumber": 3,
    "front": "What is the function of a Shunt Resistor in an Ammeter?",
    "back": "A very low resistance connected in parallel with a galvanometer to divert most of the current, allowing measurement of large currents without damage.",
    "category": "concept"
  },
  {
    "id": "fc-phys-g12-u3-848",
    "grade": 12,
    "subject": "physics",
    "unitNumber": 3,
    "front": "What is the function of a Multiplier Resistor in a Voltmeter?",
    "back": "A very high resistance connected in series with a galvanometer to drop most of the voltage, allowing measurement of high potential differences.",
    "category": "concept"
  },
  {
    "id": "fc-phys-g12-u4-849",
    "grade": 12,
    "subject": "physics",
    "unitNumber": 4,
    "front": "What is the Cyclotron frequency formula for a charged particle in a magnetic field?",
    "back": "f = q * B / (2π * m) (Independent of particle speed and orbit radius).",
    "category": "formula"
  },
  {
    "id": "fc-phys-g12-u4-850",
    "grade": 12,
    "subject": "physics",
    "unitNumber": 4,
    "front": "What is the Hall Effect and Hall Voltage?",
    "back": "The development of a transverse potential difference across a current-carrying conductor placed in a magnetic field: V_H = I * B / (n * q * t), used to determine charge carrier sign and density.",
    "category": "definition"
  },
  {
    "id": "fc-phys-g12-u4-851",
    "grade": 12,
    "subject": "physics",
    "unitNumber": 4,
    "front": "What is Self-Inductance (L) of a solenoid?",
    "back": "L = μ_0 * N² * A / l\nwhere N = total turns, A = cross-sectional area, l = length.",
    "category": "formula"
  },
  {
    "id": "fc-phys-g12-u5-852",
    "grade": 12,
    "subject": "physics",
    "unitNumber": 5,
    "front": "What is the Q-factor (Quality Factor) of a resonant RLC circuit?",
    "back": "Q = (1 / R) * √(L / C) = ω_0 * L / R = f_0 / Δf (Measures sharpness of resonance and selectivity).",
    "category": "formula"
  },
  {
    "id": "fc-phys-g12-u5-853",
    "grade": 12,
    "subject": "physics",
    "unitNumber": 5,
    "front": "What is the relationship between peak and RMS values of AC voltage?",
    "back": "V_rms = V_peak / √2 ≈ 0.707 * V_peak\nI_rms = I_peak / √2 ≈ 0.707 * I_peak.",
    "category": "formula"
  },
  {
    "id": "fc-phys-g12-u6-854",
    "grade": 12,
    "subject": "physics",
    "unitNumber": 6,
    "front": "What is Blackbody Radiation and Planck's Radiation Law?",
    "back": "Thermal electromagnetic radiation emitted by a blackbody in thermodynamic equilibrium. Planck showed energy is quantized in discrete packets: E = n * h * f.",
    "category": "concept"
  },
  {
    "id": "fc-phys-g12-u6-855",
    "grade": 12,
    "subject": "physics",
    "unitNumber": 6,
    "front": "State Wien's Displacement Law.",
    "back": "λ_max * T = b = 2.898 × 10⁻³ m·K (The peak wavelength of blackbody radiation is inversely proportional to absolute temperature).",
    "category": "formula"
  },
  {
    "id": "fc-phys-g12-u6-856",
    "grade": 12,
    "subject": "physics",
    "unitNumber": 6,
    "front": "State Stefan-Boltzmann Law for blackbody radiant power.",
    "back": "P = σ * A * T⁴\nwhere σ = 5.67 × 10⁻⁸ W/(m²·K⁴), A = surface area, T = temperature in Kelvin.",
    "category": "formula"
  },
  {
    "id": "fc-phys-g12-u6-857",
    "grade": 12,
    "subject": "physics",
    "unitNumber": 6,
    "front": "What is Nuclear Fission vs Nuclear Fusion?",
    "back": "Fission: Splitting of a heavy atomic nucleus (e.g., U-235) into smaller nuclei releasing neutrons and energy. Fusion: Combining light atomic nuclei (e.g., hydrogen isotopes) to form a heavier nucleus (helium), powering stars.",
    "category": "definition"
  },
  {
    "id": "fc-chem-g12-u1-858",
    "grade": 12,
    "subject": "chemistry",
    "unitNumber": 1,
    "front": "What is Ostwald's Dilution Law for weak electrolytes?",
    "back": "For a weak binary acid HA: K_a = α² * C / (1 - α) ≈ α² * C (for α ≪ 1).\nDegree of dissociation α = √(K_a / C).",
    "category": "formula"
  },
  {
    "id": "fc-chem-g12-u1-859",
    "grade": 12,
    "subject": "chemistry",
    "unitNumber": 1,
    "front": "What is the pH at the equivalence point of a weak acid titrated with a strong base?",
    "back": "pH > 7 (Basic, due to hydrolysis of the conjugate base salt formed, e.g., sodium acetate producing OH⁻).",
    "category": "concept"
  },
  {
    "id": "fc-chem-g12-u1-860",
    "grade": 12,
    "subject": "chemistry",
    "unitNumber": 1,
    "front": "What is the pH at the equivalence point of a strong acid titrated with a weak base?",
    "back": "pH < 7 (Acidic, due to hydrolysis of the conjugate acid salt formed, e.g., ammonium chloride producing H₃O⁺).",
    "category": "concept"
  },
  {
    "id": "fc-chem-g12-u2-861",
    "grade": 12,
    "subject": "chemistry",
    "unitNumber": 2,
    "front": "What is the difference between a Galvanic (Voltaic) cell and an Electrolytic cell?",
    "back": "Galvanic: Converts spontaneous chemical redox energy into electrical energy (ΔG < 0, positive E°_cell, anode is -). Electrolytic: Uses external electrical energy to drive a non-spontaneous redox reaction (ΔG > 0, requires battery, anode is +).",
    "category": "definition"
  },
  {
    "id": "fc-chem-g12-u2-862",
    "grade": 12,
    "subject": "chemistry",
    "unitNumber": 2,
    "front": "What is Sacrificial Anodic Protection against corrosion?",
    "back": "Connecting an iron structure to a more reactive metal (e.g., Zinc or Magnesium) that oxidizes preferentially, protecting the iron cathode from rusting (galvanization).",
    "category": "concept"
  },
  {
    "id": "fc-chem-g12-u3-863",
    "grade": 12,
    "subject": "chemistry",
    "unitNumber": 3,
    "front": "What is the relationship between Bond Enthalpy and Reaction Enthalpy?",
    "back": "ΔH°_rxn = Σ (Bonds Broken in Reactants) - Σ (Bonds Formed in Products).",
    "category": "formula"
  },
  {
    "id": "fc-chem-g12-u3-864",
    "grade": 12,
    "subject": "chemistry",
    "unitNumber": 3,
    "front": "Under what conditions of ΔH and ΔS is a chemical reaction always spontaneous at all temperatures?",
    "back": "When ΔH is negative (exothermic) and ΔS is positive (increasing disorder), making ΔG = ΔH - TΔS always negative.",
    "category": "concept"
  },
  {
    "id": "fc-chem-g12-u4-865",
    "grade": 12,
    "subject": "chemistry",
    "unitNumber": 4,
    "front": "What are Thermoplastic polymers vs Thermosetting polymers?",
    "back": "Thermoplastic: Linear or branched polymers that soften on heating and can be remolded repeatedly (e.g., Polyethylene, PVC). Thermosetting: Cross-linked 3D network polymers that decompose rather than melt on heating, permanently set (e.g., Bakelite, Melamine).",
    "category": "definition"
  },
  {
    "id": "fc-chem-g12-u5-866",
    "grade": 12,
    "subject": "chemistry",
    "unitNumber": 5,
    "front": "What is Green Chemistry and its primary goal?",
    "back": "The design of chemical products and processes that reduce or eliminate the use and generation of hazardous substances, prioritizing atom economy, renewable feedstocks, and energy efficiency.",
    "category": "concept"
  },
  {
    "id": "fc-chem-g12-u5-867",
    "grade": 12,
    "subject": "chemistry",
    "unitNumber": 5,
    "front": "What is Atom Economy in chemical synthesis?",
    "back": "Atom Economy = (Molecular weight of desired product / Total molecular weight of all reactants) * 100%.",
    "category": "formula"
  },
  {
    "id": "fc-chem-g11-u3-868",
    "grade": 11,
    "subject": "chemistry",
    "unitNumber": 3,
    "front": "What is the Collision Theory of reaction rates?",
    "back": "For a chemical reaction to occur, reactant molecules must collide with: 1. Sufficient kinetic energy (≥ activation energy E_a) and 2. Correct spatial orientation.",
    "category": "concept"
  },
  {
    "id": "fc-chem-g11-u4-869",
    "grade": 11,
    "subject": "chemistry",
    "unitNumber": 4,
    "front": "What is the Le Chatelier effect of adding an inert gas at constant volume vs constant pressure?",
    "back": "At constant volume: Total pressure increases but partial pressures of reactants/products remain unchanged; NO shift in equilibrium. At constant pressure: Volume increases, shifting toward side with more gas moles.",
    "category": "concept"
  },
  {
    "id": "fc-chem-g11-u5-870",
    "grade": 11,
    "subject": "chemistry",
    "unitNumber": 5,
    "front": "What is Markovnikov's vs Anti-Markovnikov's addition of HBr?",
    "back": "Markovnikov: Electrophilic addition of HBr yields 2-bromopropane as major product. Anti-Markovnikov (Peroxide effect / Kharasch effect): In the presence of organic peroxides, addition proceeds via free radicals yielding 1-bromopropane.",
    "category": "concept"
  },
  {
    "id": "fc-biol-g12-u1-871",
    "grade": 12,
    "subject": "biology",
    "unitNumber": 1,
    "front": "What is the role of DNA Topoisomerase (Gyrase) in replication?",
    "back": "Relieves the torsional strain and supercoiling created ahead of the replication fork as DNA helicase unwinds the double helix.",
    "category": "definition"
  },
  {
    "id": "fc-biol-g12-u1-872",
    "grade": 12,
    "subject": "biology",
    "unitNumber": 1,
    "front": "What is Epigenetics?",
    "back": "Heritable changes in gene expression and cellular phenotype that do not involve alterations to the underlying DNA nucleotide sequence (e.g., DNA methylation, histone acetylation).",
    "category": "definition"
  },
  {
    "id": "fc-biol-g12-u2-873",
    "grade": 12,
    "subject": "biology",
    "unitNumber": 2,
    "front": "What is the Endosymbiotic Theory (Lynn Margulis)?",
    "back": "Mitochondria and chloroplasts originated as free-living aerobic and photosynthetic prokaryotes that were engulfed by ancestral eukaryotic cells, evidenced by their 70S ribosomes, circular DNA, and double membranes.",
    "category": "concept"
  },
  {
    "id": "fc-biol-g12-u2-874",
    "grade": 12,
    "subject": "biology",
    "unitNumber": 2,
    "front": "What is Genetic Drift and what are its two main mechanisms?",
    "back": "Random fluctuations in allele frequencies in small populations due to chance alone. Mechanisms: 1. Population Bottleneck (catastrophe drastically reduces size) and 2. Founder Effect (small group colonizes new area).",
    "category": "definition"
  },
  {
    "id": "fc-biol-g12-u2-875",
    "grade": 12,
    "subject": "biology",
    "unitNumber": 2,
    "front": "Distinguish Divergent Evolution from Convergent Evolution.",
    "back": "Divergent: Related species develop distinct adaptations due to different environmental pressures (homologous structures, adaptive radiation). Convergent: Unrelated species develop similar adaptations due to similar ecological niches (analogous structures).",
    "category": "concept"
  },
  {
    "id": "fc-biol-g12-u3-876",
    "grade": 12,
    "subject": "biology",
    "unitNumber": 3,
    "front": "What are the hormonal changes triggering Menstruation in females?",
    "back": "Degeneration of the corpus luteum causes a steep drop in progesterone and estrogen levels, leading to the shedding of the functional endometrial lining.",
    "category": "concept"
  },
  {
    "id": "fc-biol-g12-u3-877",
    "grade": 12,
    "subject": "biology",
    "unitNumber": 3,
    "front": "What is the Acrosome Reaction during human fertilization?",
    "back": "Release of hydrolytic digestive enzymes (hyaluronidase and acrosin) from the sperm's acrosome cap to penetrate the corona radiata and zona pellucida of the secondary oocyte.",
    "category": "concept"
  },
  {
    "id": "fc-biol-g12-u4-878",
    "grade": 12,
    "subject": "biology",
    "unitNumber": 4,
    "front": "What is Biological Biomagnification (Bioaccumulation)?",
    "back": "The progressive increase in concentration of persistent, non-biodegradable toxins (e.g., DDT, mercury) in tissues of organisms at successively higher trophic levels of a food chain.",
    "category": "definition"
  },
  {
    "id": "fc-biol-g12-u4-879",
    "grade": 12,
    "subject": "biology",
    "unitNumber": 4,
    "front": "What is Primary Succession vs Secondary Succession in ecology?",
    "back": "Primary: Ecological colonization on bare, lifeless substrate where no soil existed previously (e.g., cooled volcanic lava, retreating glacier). Secondary: Re-colonization of an ecosystem after a disturbance that left the soil intact (e.g., abandoned farmland, forest fire).",
    "category": "definition"
  },
  {
    "id": "fc-biol-g12-u4-880",
    "grade": 12,
    "subject": "biology",
    "unitNumber": 4,
    "front": "What is Eutrophication?",
    "back": "The nutrient enrichment of an aquatic body (excess nitrates and phosphates from agricultural runoff), causing algal blooms, oxygen depletion (hypoxia), and fish suffocation.",
    "category": "definition"
  },
  {
    "id": "fc-math-g12-u1-881",
    "grade": 12,
    "subject": "mathematics_natural",
    "unitNumber": 1,
    "front": "What is the derivative of a^x with respect to x?",
    "back": "d/dx [a^x] = a^x * ln(a) (for a > 0, a ≠ 1).",
    "category": "formula"
  },
  {
    "id": "fc-math-g12-u1-882",
    "grade": 12,
    "subject": "mathematics_natural",
    "unitNumber": 1,
    "front": "What is the derivative of log_a(x) with respect to x?",
    "back": "d/dx [log_a(x)] = 1 / (x * ln a) (for x > 0).",
    "category": "formula"
  },
  {
    "id": "fc-math-g12-u2-883",
    "grade": 12,
    "subject": "mathematics_natural",
    "unitNumber": 2,
    "front": "What is the critical point of a function f(x)?",
    "back": "A point c in the domain of f where either f'(c) = 0 or f'(c) is undefined.",
    "category": "definition"
  },
  {
    "id": "fc-math-g12-u2-884",
    "grade": 12,
    "subject": "mathematics_natural",
    "unitNumber": 2,
    "front": "State Fermat's Theorem on local extrema.",
    "back": "If f has a local maximum or minimum at c, and if f'(c) exists, then f'(c) = 0.",
    "category": "concept"
  },
  {
    "id": "fc-math-g12-u3-885",
    "grade": 12,
    "subject": "mathematics_natural",
    "unitNumber": 3,
    "front": "What is the integral of tan(x) with respect to x?",
    "back": "∫ tan(x) dx = ln|sec(x)| + C = -ln|cos(x)| + C.",
    "category": "formula"
  },
  {
    "id": "fc-math-g12-u3-886",
    "grade": 12,
    "subject": "mathematics_natural",
    "unitNumber": 3,
    "front": "What is the formula for Arc Length of a smooth curve y = f(x) from x = a to x = b?",
    "back": "L = ∫_a^b √(1 + [f'(x)]²) dx",
    "category": "formula"
  },
  {
    "id": "fc-math-g12-u4-887",
    "grade": 12,
    "subject": "mathematics_natural",
    "unitNumber": 4,
    "front": "What is the distance between point (x0, y0, z0) and plane Ax + By + Cz + D = 0?",
    "back": "d = |A*x0 + B*y0 + C*z0 + D| / √(A² + B² + C²)",
    "category": "formula"
  },
  {
    "id": "fc-math-g12-u4-888",
    "grade": 12,
    "subject": "mathematics_natural",
    "unitNumber": 4,
    "front": "What are direction cosines of a 3D vector v = (a, b, c)?",
    "back": "cos α = a / |v|, cos β = b / |v|, cos γ = c / |v|\ncos² α + cos² β + cos² γ = 1.",
    "category": "formula"
  },
  {
    "id": "fc-math-g12-u5-889",
    "grade": 12,
    "subject": "mathematics_natural",
    "unitNumber": 5,
    "front": "What is the geometric interpretation of multiplying a complex number by i?",
    "back": "Multiplication by i rotates the complex number 90° (π/2 radians) counterclockwise in the complex Argand plane.",
    "category": "concept"
  },
  {
    "id": "fc-math-g12-u6-890",
    "grade": 12,
    "subject": "mathematics_natural",
    "unitNumber": 6,
    "front": "What is the formula for the variance of a continuous random variable X with PDF f(x)?",
    "back": "Var(X) = E[X²] - (E[X])² = ∫ x² f(x) dx - (∫ x f(x) dx)².",
    "category": "formula"
  },
  {
    "id": "fc-math-g12-u1-891",
    "grade": 12,
    "subject": "mathematics_social",
    "unitNumber": 1,
    "front": "What is the Cost Function C(q) and Average Cost AC(q)?",
    "back": "Total Cost C(q) = Fixed Cost + Variable Cost(q)\nAverage Cost AC(q) = C(q) / q. Average cost is minimized where AC(q) = MC(q).",
    "category": "formula"
  },
  {
    "id": "fc-math-g12-u1-892",
    "grade": 12,
    "subject": "mathematics_social",
    "unitNumber": 1,
    "front": "What is the Revenue Function R(q) and Marginal Revenue MR(q)?",
    "back": "Total Revenue R(q) = P(q) * q\nMarginal Revenue MR(q) = dR/dq = P + q * (dP/dq).",
    "category": "formula"
  },
  {
    "id": "fc-math-g12-u2-893",
    "grade": 12,
    "subject": "mathematics_social",
    "unitNumber": 2,
    "front": "What is the Simplex Method in Linear Programming?",
    "back": "An algebraic iterative algorithm used to solve large-scale linear programming problems by moving from one basic feasible solution (extreme point) to an adjacent better one until the optimum is achieved.",
    "category": "definition"
  },
  {
    "id": "fc-math-g12-u3-894",
    "grade": 12,
    "subject": "mathematics_social",
    "unitNumber": 3,
    "front": "What is the coefficient of variation (CV)?",
    "back": "CV = (Standard Deviation / Mean) * 100% = (σ / μ) * 100% (A dimensionless relative measure of dispersion used to compare variability between different datasets).",
    "category": "formula"
  },
  {
    "id": "fc-econ-g12-u1-895",
    "grade": 12,
    "subject": "economics",
    "unitNumber": 1,
    "front": "What is Okun's Law?",
    "back": "The empirical relationship between unemployment and GDP: For every 1% increase in unemployment above the natural rate, GDP decreases by roughly 2%.",
    "category": "concept"
  },
  {
    "id": "fc-econ-g12-u2-896",
    "grade": 12,
    "subject": "economics",
    "unitNumber": 2,
    "front": "What is Say's Law of Markets?",
    "back": "'Supply creates its own demand' - the classical economic proposition that production generates sufficient income to purchase all output produced.",
    "category": "concept"
  },
  {
    "id": "fc-econ-g12-u3-897",
    "grade": 12,
    "subject": "economics",
    "unitNumber": 3,
    "front": "What is Crowding-Out Effect in fiscal policy?",
    "back": "When increased government deficit spending financed by borrowing raises real interest rates, reducing private sector investment and consumption.",
    "category": "concept"
  },
  {
    "id": "fc-econ-g12-u4-898",
    "grade": 12,
    "subject": "economics",
    "unitNumber": 4,
    "front": "What is the Foreign Exchange Market (Forex) and exchange rate quotation?",
    "back": "The global marketplace where national currencies are traded. Exchange rate is the price of one currency in terms of another currency.",
    "category": "definition"
  },
  {
    "id": "fc-econ-g12-u5-899",
    "grade": 12,
    "subject": "economics",
    "unitNumber": 5,
    "front": "What is the Homegrown Economic Reform Agenda (HGER) in Ethiopia?",
    "back": "Ethiopia's strategic economic reform package launched in 2019 to unlock macroeconomic structural bottlenecks, expand private sector participation, and modernize monetary and fiscal frameworks.",
    "category": "date_fact"
  },
  {
    "id": "fc-hist-g12-u1-900",
    "grade": 12,
    "subject": "history",
    "unitNumber": 1,
    "front": "What was the Franco-Ethiopian Railway and when was it completed?",
    "back": "A meter-gauge railway line connecting Addis Ababa with the port of Djibouti (approx. 784 km), completed in 1917 under Emperor Menelik II and Lij Iyasu, transforming Ethiopian trade.",
    "category": "date_fact"
  },
  {
    "id": "fc-hist-g12-u1-901",
    "grade": 12,
    "subject": "history",
    "unitNumber": 1,
    "front": "Who was Lij Iyasu and what were his notable policies?",
    "back": "Designated successor of Menelik II (1913–1916); instituted administrative reforms, integrated Ethiopian Muslims into national governance, and founded modern police; deposed in a 1916 palace coup in favor of Empress Zewditu.",
    "category": "date_fact"
  },
  {
    "id": "fc-hist-g12-u2-902",
    "grade": 12,
    "subject": "history",
    "unitNumber": 2,
    "front": "What was the Patriot (Arbegnoch) Resistance Movement during the Italian occupation (1936-1941)?",
    "back": "Guerrilla resistance fighters in the rugged countryside (e.g., Ras Abebe Aregay, Dejazmach Belay Zeleke, Amoraw Wubneh, Woizero Shewareged Gedle) who denied the Italian fascist army total control over Ethiopia.",
    "category": "concept"
  },
  {
    "id": "fc-hist-g12-u3-903",
    "grade": 12,
    "subject": "history",
    "unitNumber": 3,
    "front": "What was the Federation of Eritrea with Ethiopia (1952)?",
    "back": "Enacted under UN Resolution 390A(V), creating an autonomous Eritrean government under the sovereignty of the Ethiopian Crown; dissolved in 1962 when Eritrea was incorporated as Ethiopia's 14th province.",
    "category": "date_fact"
  },
  {
    "id": "fc-hist-g12-u4-904",
    "grade": 12,
    "subject": "history",
    "unitNumber": 4,
    "front": "What was the Red Terror (Qey Shibir) in Ethiopian history (1976-1978)?",
    "back": "A brutal state-sponsored campaign of urban counter-insurgency waged by the Derg military junta against the civilian opposition (notably the EPRP), resulting in tens of thousands of deaths.",
    "category": "date_fact"
  },
  {
    "id": "fc-geog-g12-u1-905",
    "grade": 12,
    "subject": "geography",
    "unitNumber": 1,
    "front": "What are the major soil types of Ethiopia and their agricultural value?",
    "back": "• Nitosols (Red basaltic soils): Highly fertile, deep, well-drained, found on western/southwestern highlands (coffee, teff).\n• Vertisols (Black cotton soils): High clay content, swell when wet, shrink and crack when dry, high moisture retention.\n• Fluvisols: Alluvial soils in river valleys (Awash, Omo) prime for irrigation.",
    "category": "concept"
  },
  {
    "id": "fc-geog-g12-u2-906",
    "grade": 12,
    "subject": "geography",
    "unitNumber": 2,
    "front": "What are the characteristics of the Ethiopian Rift Valley Lakes?",
    "back": "Separated into northern freshwater lakes (Ziway, Awassa) and central/southern saline/soda lakes (Abijatta, Shalla, Chamo, Abaya). Lake Shalla is the deepest (266 m) and caldera-formed.",
    "category": "concept"
  },
  {
    "id": "fc-geog-g12-u3-907",
    "grade": 12,
    "subject": "geography",
    "unitNumber": 3,
    "front": "What is Soil Erosion by Water in the Ethiopian Highlands and its prevention?",
    "back": "Rill and gully erosion driven by steep slopes, torrential Kiremt rainfall, and deforestation; mitigated by stone terraces, contour plowing, vetiver grass strips, and afforestation.",
    "category": "concept"
  },
  {
    "id": "fc-geog-g12-u4-908",
    "grade": 12,
    "subject": "geography",
    "unitNumber": 4,
    "front": "What is the Industrial Parks Development Corporation (IPDC) in Ethiopia?",
    "back": "State entity responsible for developing eco-industrial export zones (e.g., Hawassa Industrial Park for textiles/apparel, Kilinto for pharmaceuticals) to drive light manufacturing export growth.",
    "category": "date_fact"
  },
  {
    "id": "fc-engl-g12-u1-909",
    "grade": 12,
    "subject": "english",
    "unitNumber": 1,
    "front": "What are dangling modifiers and how are they corrected?",
    "back": "A modifier that lacks a clear subject to refer to in the main sentence (e.g., 'Walking down the street, the trees were beautiful' -> Incorrect).\nCorrected: 'Walking down the street, I saw beautiful trees'.",
    "category": "concept"
  },
  {
    "id": "fc-engl-g12-u1-910",
    "grade": 12,
    "subject": "english",
    "unitNumber": 1,
    "front": "What are common cohesive transitional devices in academic writing?",
    "back": "• Addition: Furthermore, Moreover, In addition.\n• Contrast: However, On the contrary, Nevertheless.\n• Cause and effect: Consequently, Therefore, As a result.\n• Exemplification: For instance, Specifically.",
    "category": "definition"
  },
  {
    "id": "fc-engl-g12-u2-911",
    "grade": 12,
    "subject": "english",
    "unitNumber": 2,
    "front": "Explain the difference between 'lie' and 'lay'.",
    "back": "'Lie' (intransitive, no object): To recline (lie, lay, lain, lying).\n'Lay' (transitive, requires direct object): To put or set down (lay, laid, laid, laying; e.g., 'Lay the book on the table').",
    "category": "definition"
  },
  {
    "id": "fc-engl-g12-u3-912",
    "grade": 12,
    "subject": "english",
    "unitNumber": 3,
    "front": "What is an oxymoron with two examples?",
    "back": "A figure of speech pairing contradictory terms side by side.\nExamples: 'Deafening silence', 'Cruel kindness', 'Clearly confused'.",
    "category": "definition"
  },
  {
    "id": "fc-apti-g12-u1-913",
    "grade": 12,
    "subject": "aptitude",
    "unitNumber": 1,
    "front": "How do you identify prime numbers and divisibility rules for 3, 7, and 11?",
    "back": "• Divisible by 3: Sum of digits is divisible by 3.\n• Divisible by 11: Difference between sum of odd-positioned and even-positioned digits is 0 or multiple of 11.",
    "category": "formula"
  },
  {
    "id": "fc-apti-g12-u1-914",
    "grade": 12,
    "subject": "aptitude",
    "unitNumber": 1,
    "front": "How do you solve work-rate problems (A takes x days, B takes y days)?",
    "back": "Combined rate = 1/x + 1/y = (x + y) / (xy) of work per day. Total time taken together = (xy) / (x + y) days.",
    "category": "formula"
  },
  {
    "id": "fc-apti-g12-u2-915",
    "grade": 12,
    "subject": "aptitude",
    "unitNumber": 2,
    "front": "How do you solve relative speed problems for two objects moving towards or away from each other?",
    "back": "Moving towards each other (opposite directions): Relative speed = v1 + v2.\nMoving in same direction: Relative speed = |v1 - v2|.\nTime = Distance / Relative Speed.",
    "category": "formula"
  },
  {
    "id": "fc-apti-g12-u2-916",
    "grade": 12,
    "subject": "aptitude",
    "unitNumber": 2,
    "front": "What is a Coding-Decoding pattern using Caesar cipher letter shifts?",
    "back": "Each letter in the plaintext is shifted by a fixed number of positions k in the alphabet (e.g., shift +3: A->D, B->E, Z->C).",
    "category": "concept"
  },
  {
    "id": "fc-engl-g9-u1-917",
    "grade": 9,
    "subject": "english",
    "unitNumber": 1,
    "front": "What is a Simile vs a Metaphor?",
    "back": "Simile: Direct comparison of two unlike things using 'like' or 'as' (e.g., 'brave as a lion'). Metaphor: Implicit comparison stating one thing IS another (e.g., 'time is a thief').",
    "category": "definition"
  },
  {
    "id": "fc-engl-g9-u2-918",
    "grade": 9,
    "subject": "english",
    "unitNumber": 2,
    "front": "What is Personification?",
    "back": "A figure of speech giving human qualities, emotions, or behaviors to animals, inanimate objects, or abstract ideas (e.g., 'the wind whispered through the trees').",
    "category": "definition"
  },
  {
    "id": "fc-engl-g10-u1-919",
    "grade": 10,
    "subject": "english",
    "unitNumber": 1,
    "front": "What is Alliteration and Onomatopoeia?",
    "back": "Alliteration: Repetition of initial consonant sounds in neighboring words (e.g., 'Peter Piper picked'). Onomatopoeia: Words that imitate the sound they denote (e.g., 'buzz', 'sizzle', 'boom').",
    "category": "definition"
  },
  {
    "id": "fc-engl-g10-u2-920",
    "grade": 10,
    "subject": "english",
    "unitNumber": 2,
    "front": "What is Hyperbole?",
    "back": "An intentional, extreme exaggeration used for emphasis or dramatic effect, not meant to be taken literally (e.g., 'I have told you a thousand times').",
    "category": "definition"
  },
  {
    "id": "fc-engl-g11-u1-921",
    "grade": 11,
    "subject": "english",
    "unitNumber": 1,
    "front": "What is Irony and its three main types?",
    "back": "Discrepancy between expectation and reality.\n1. Verbal irony (sarcasm/saying opposite of meaning)\n2. Situational irony (outcome contrary to expectation)\n3. Dramatic irony (audience knows what characters do not).",
    "category": "definition"
  },
  {
    "id": "fc-engl-g12-u1-922",
    "grade": 12,
    "subject": "english",
    "unitNumber": 1,
    "front": "What is Foreshadowing in narrative literature?",
    "back": "A literary technique in which the author drops subtle hints or clues early in a story to suggest events that will occur later in the plot.",
    "category": "definition"
  },
  {
    "id": "fc-amha-g9-u1-923",
    "grade": 9,
    "subject": "amharic",
    "unitNumber": 1,
    "front": "የስም አይነቶች በስነ-ልሳን ስንት ናቸው?",
    "back": "ዋና ዋና የስም አይነቶች፡ 1. ተፀውኦ ስም (Proper Noun)፣ 2. የወል ስም (Common Noun)፣ 3. ረቂቅ ስም (Abstract Noun)፣ 4. የጅምላ ስም (Collective Noun)፣ 5. የቁሳቁስ ስም (Material Noun)።",
    "category": "definition"
  },
  {
    "id": "fc-amha-g9-u2-924",
    "grade": 9,
    "subject": "amharic",
    "unitNumber": 2,
    "front": "ቅፅል ምንድን ነው? አይነቶቹስ?",
    "back": "ቅፅል ስምን የሚገልጽ፣ የሚያጠራ ወይም ተጨማሪ መረጃ የሚሰጥ ቃል ነው። አይነቶች፡ የባህሪ ቅፅል፣ የመጠን ቅፅል፣ የቁጥር ቅፅል፣ የአመልካች ቅፅል ወዘተ።",
    "category": "definition"
  },
  {
    "id": "fc-amha-g10-u1-925",
    "grade": 10,
    "subject": "amharic",
    "unitNumber": 1,
    "front": "ግስ እና ማሰሪያ አንቀጽ ምንድን ናቸው?",
    "back": "ግስ ድርጊትን ወይም ኩነተ-ህላዌን የሚገልጽ ቃል ሲሆን፣ ማሰሪያ አንቀጽ ደግሞ አንድን አረፍተ ነገር ሙሉ ትርጉም ሰጥቶ የሚቋጭ የመጨረሻ ቃል ነው።",
    "category": "definition"
  },
  {
    "id": "fc-amha-g10-u2-926",
    "grade": 10,
    "subject": "amharic",
    "unitNumber": 2,
    "front": "ምሳሌያዊ አነጋገሮች በስነ-ፅሁፍ ያላቸው ፋይዳ ምንድን ነው?",
    "back": "ምሳሌያዊ አነጋገሮች ጥልቅ ህዝባዊ ጥበብን፣ ምክርንና ፍልስፍናን ባጭሩና በውበት ለመግለጽ ያገለግላሉ (ለምሳሌ፡ 'ከመቶ አባይ አንድ ሀቀኛ')።",
    "category": "concept"
  },
  {
    "id": "fc-amha-g11-u1-927",
    "grade": 11,
    "subject": "amharic",
    "unitNumber": 1,
    "front": "የአማርኛ ፊደላት ድምፆች አመሰራረት (ስነ-ድምፅ)",
    "back": "የአማርኛ ድምፆች በንግግር አካላት (ከንፈር፣ ጥርስ፣ ድድ፣ ላንቃ) አፈጣጠር ይከፈላሉ፡ ፈንጂ (Plosive)፣ ሰርጊ (Fricative)፣ አፍንጫዊ (Nasal) እና ፈሳሽ (Liquid)።",
    "category": "concept"
  },
  {
    "id": "fc-amha-g12-u1-928",
    "grade": 12,
    "subject": "amharic",
    "unitNumber": 1,
    "front": "ሰምና ወርቅ ቅኔ ምንድን ነው?",
    "back": "የኢትዮጵያ ባህላዊ ጥበበ-ቅኔ ሲሆን፤ 'ሰም' ውጫዊውን ቀጥተኛ ትርጉም ሲያሳይ፤ 'ወርቅ' ደግሞ ውስጣዊውን የተሰወረና እውነተኛ መልዕክት ያመለክታል።",
    "category": "definition"
  },
  {
    "id": "fc-phys-g9-u2-929",
    "grade": 9,
    "subject": "physics",
    "unitNumber": 2,
    "front": "What is the formula for average speed?",
    "back": "Average Speed = Total Distance / Total Time (Scalar, m/s).",
    "category": "formula"
  },
  {
    "id": "fc-phys-g9-u3-930",
    "grade": 9,
    "subject": "physics",
    "unitNumber": 3,
    "front": "What is the formula for Weight?",
    "back": "W = m * g\nwhere m = mass (kg), g = gravitational field strength (N/kg or m/s²).",
    "category": "formula"
  },
  {
    "id": "fc-phys-g9-u4-931",
    "grade": 9,
    "subject": "physics",
    "unitNumber": 4,
    "front": "What is the formula for Kinetic Energy?",
    "back": "KE = (1/2) * m * v² (Joules).",
    "category": "formula"
  },
  {
    "id": "fc-phys-g10-u1-932",
    "grade": 10,
    "subject": "physics",
    "unitNumber": 1,
    "front": "What is the formula for Centripetal Acceleration?",
    "back": "a_c = v² / r = ω² * r (m/s²).",
    "category": "formula"
  },
  {
    "id": "fc-phys-g10-u2-933",
    "grade": 10,
    "subject": "physics",
    "unitNumber": 2,
    "front": "What is the Gravitational Force formula?",
    "back": "F = G * (m1 * m2) / r² (where G = 6.674 × 10⁻¹¹ N·m²/kg²).",
    "category": "formula"
  },
  {
    "id": "fc-phys-g10-u3-934",
    "grade": 10,
    "subject": "physics",
    "unitNumber": 3,
    "front": "What is the formula for Fluid Pressure at depth h?",
    "back": "P = ρ * g * h (Pascals, Pa).",
    "category": "formula"
  },
  {
    "id": "fc-phys-g10-u4-935",
    "grade": 10,
    "subject": "physics",
    "unitNumber": 4,
    "front": "What is the Wave Equation?",
    "back": "v = f * λ (Speed = frequency × wavelength).",
    "category": "formula"
  },
  {
    "id": "fc-phys-g10-u5-936",
    "grade": 10,
    "subject": "physics",
    "unitNumber": 5,
    "front": "What is Snell's Law of Refraction?",
    "back": "n1 * sin(θ1) = n2 * sin(θ2)",
    "category": "formula"
  },
  {
    "id": "fc-phys-g11-u2-937",
    "grade": 11,
    "subject": "physics",
    "unitNumber": 2,
    "front": "What is the Projectile Maximum Height formula?",
    "back": "H_max = (v_0 * sin θ)² / (2g)",
    "category": "formula"
  },
  {
    "id": "fc-phys-g11-u2-938",
    "grade": 11,
    "subject": "physics",
    "unitNumber": 2,
    "front": "What is the Projectile Horizontal Range formula?",
    "back": "R = (v_0² * sin 2θ) / g",
    "category": "formula"
  },
  {
    "id": "fc-phys-g11-u3-939",
    "grade": 11,
    "subject": "physics",
    "unitNumber": 3,
    "front": "What is the Linear Momentum formula?",
    "back": "p = m * v (kg·m/s).",
    "category": "formula"
  },
  {
    "id": "fc-phys-g11-u5-940",
    "grade": 11,
    "subject": "physics",
    "unitNumber": 5,
    "front": "What is Torque formula?",
    "back": "τ = r * F * sin θ = I * α (N·m).",
    "category": "formula"
  },
  {
    "id": "fc-phys-g11-u7-941",
    "grade": 11,
    "subject": "physics",
    "unitNumber": 7,
    "front": "What is the Continuity Equation for fluid flow?",
    "back": "A1 * v1 = A2 * v2 = constant volume flow rate.",
    "category": "formula"
  },
  {
    "id": "fc-phys-g12-u1-942",
    "grade": 12,
    "subject": "physics",
    "unitNumber": 1,
    "front": "What is the Carnot Engine Efficiency formula?",
    "back": "η = 1 - (T_c / T_h) (where temperatures MUST be in Kelvin).",
    "category": "formula"
  },
  {
    "id": "fc-phys-g12-u2-943",
    "grade": 12,
    "subject": "physics",
    "unitNumber": 2,
    "front": "What is Coulomb's Law formula?",
    "back": "F = k_e * (|q1 * q2|) / r² (Newtons).",
    "category": "formula"
  },
  {
    "id": "fc-phys-g12-u2-944",
    "grade": 12,
    "subject": "physics",
    "unitNumber": 2,
    "front": "What is Capacitance formula for parallel plates?",
    "back": "C = ε_0 * A / d (Farads, F).",
    "category": "formula"
  },
  {
    "id": "fc-phys-g12-u3-945",
    "grade": 12,
    "subject": "physics",
    "unitNumber": 3,
    "front": "What is Ohm's Law and Electric Power formulas?",
    "back": "V = I * R\nP = V * I = I² * R = V² / R (Watts).",
    "category": "formula"
  },
  {
    "id": "fc-phys-g12-u4-946",
    "grade": 12,
    "subject": "physics",
    "unitNumber": 4,
    "front": "What is Magnetic Force on a moving charge?",
    "back": "F = q * v * B * sin θ (Newtons).",
    "category": "formula"
  },
  {
    "id": "fc-phys-g12-u4-947",
    "grade": 12,
    "subject": "physics",
    "unitNumber": 4,
    "front": "What is Faraday's Law of Electromagnetic Induction?",
    "back": "ε = -N * (ΔΦ / Δt) (Volts).",
    "category": "formula"
  },
  {
    "id": "fc-phys-g12-u5-948",
    "grade": 12,
    "subject": "physics",
    "unitNumber": 5,
    "front": "What is Resonant Frequency in an AC RLC circuit?",
    "back": "f_0 = 1 / (2π * √(L * C)) (Hertz).",
    "category": "formula"
  },
  {
    "id": "fc-phys-g12-u6-949",
    "grade": 12,
    "subject": "physics",
    "unitNumber": 6,
    "front": "What is Einstein's Photoelectric equation?",
    "back": "hf = Φ + KE_max = hf_0 + (1/2)mv_max²",
    "category": "formula"
  },
  {
    "id": "fc-phys-g12-u6-950",
    "grade": 12,
    "subject": "physics",
    "unitNumber": 6,
    "front": "What is the Radioactive Half-Life formula?",
    "back": "T_1/2 = 0.693 / λ = ln(2) / λ",
    "category": "formula"
  },
  {
    "id": "fc-chem-g9-u5-951",
    "grade": 9,
    "subject": "chemistry",
    "unitNumber": 5,
    "front": "What is the Ideal Gas Law formula?",
    "back": "PV = nRT (P in atm, V in L, T in K, R = 0.0821 L·atm/(mol·K)).",
    "category": "formula"
  },
  {
    "id": "fc-chem-g9-u5-952",
    "grade": 9,
    "subject": "chemistry",
    "unitNumber": 5,
    "front": "What is the Molar Mass formula?",
    "back": "M = mass / moles = m / n (g/mol).",
    "category": "formula"
  },
  {
    "id": "fc-chem-g10-u3-953",
    "grade": 10,
    "subject": "chemistry",
    "unitNumber": 3,
    "front": "What is Faraday's First Law equation?",
    "back": "m = Z * I * t = (M / (n * F)) * I * t (grams deposited).",
    "category": "formula"
  },
  {
    "id": "fc-chem-g11-u3-954",
    "grade": 11,
    "subject": "chemistry",
    "unitNumber": 3,
    "front": "What is the Arrhenius Equation formula?",
    "back": "k = A * e^(-E_a / RT)",
    "category": "formula"
  },
  {
    "id": "fc-chem-g11-u4-955",
    "grade": 11,
    "subject": "chemistry",
    "unitNumber": 4,
    "front": "What is the Equilibrium Constant expression for aA + bB ⇌ cC + dD?",
    "back": "K_c = ([C]^c * [D]^d) / ([A]^a * [B]^b)",
    "category": "formula"
  },
  {
    "id": "fc-chem-g12-u1-956",
    "grade": 12,
    "subject": "chemistry",
    "unitNumber": 1,
    "front": "What is the pH and pOH formula?",
    "back": "pH = -log[H⁺]\npOH = -log[OH⁻]\npH + pOH = 14 at 25 °C.",
    "category": "formula"
  },
  {
    "id": "fc-chem-g12-u1-957",
    "grade": 12,
    "subject": "chemistry",
    "unitNumber": 1,
    "front": "What is the Henderson-Hasselbalch formula?",
    "back": "pH = pK_a + log([Base] / [Acid])",
    "category": "formula"
  },
  {
    "id": "fc-chem-g12-u2-958",
    "grade": 12,
    "subject": "chemistry",
    "unitNumber": 2,
    "front": "What is Standard Cell Potential formula?",
    "back": "E°_cell = E°_cathode - E°_anode (Volts).",
    "category": "formula"
  },
  {
    "id": "fc-chem-g12-u2-959",
    "grade": 12,
    "subject": "chemistry",
    "unitNumber": 2,
    "front": "What is the Nernst Equation at 25 °C?",
    "back": "E = E° - (0.0592 / n) * log(Q)",
    "category": "formula"
  },
  {
    "id": "fc-chem-g12-u3-960",
    "grade": 12,
    "subject": "chemistry",
    "unitNumber": 3,
    "front": "What is the Gibbs Free Energy change formula?",
    "back": "ΔG = ΔH - T * ΔS (Spontaneous when ΔG < 0).",
    "category": "formula"
  },
  {
    "id": "fc-math-g9-u2-961",
    "grade": 9,
    "subject": "mathematics",
    "unitNumber": 2,
    "front": "What is the Quadratic Formula?",
    "back": "x = (-b ± √(b² - 4ac)) / (2a)",
    "category": "formula"
  },
  {
    "id": "fc-math-g9-u3-962",
    "grade": 9,
    "subject": "mathematics",
    "unitNumber": 3,
    "front": "What is the Distance Formula in 2D?",
    "back": "d = √((x2 - x1)² + (y2 - y1)²)",
    "category": "formula"
  },
  {
    "id": "fc-math-g9-u3-963",
    "grade": 9,
    "subject": "mathematics",
    "unitNumber": 3,
    "front": "What is the Slope Formula of a line?",
    "back": "m = (y2 - y1) / (x2 - x1)",
    "category": "formula"
  },
  {
    "id": "fc-math-g10-u2-964",
    "grade": 10,
    "subject": "mathematics",
    "unitNumber": 2,
    "front": "What is the Change of Base formula for logarithms?",
    "back": "log_b(a) = ln(a) / ln(b) = log(a) / log(b)",
    "category": "formula"
  },
  {
    "id": "fc-math-g10-u3-965",
    "grade": 10,
    "subject": "mathematics",
    "unitNumber": 3,
    "front": "What is the Fundamental Trigonometric Identity?",
    "back": "sin²(θ) + cos²(θ) = 1\n1 + tan²(θ) = sec²(θ)\n1 + cot²(θ) = csc²(θ)",
    "category": "formula"
  },
  {
    "id": "fc-math-g10-u3-966",
    "grade": 10,
    "subject": "mathematics",
    "unitNumber": 3,
    "front": "What is the Law of Cosines?",
    "back": "c² = a² + b² - 2ab * cos(C)",
    "category": "formula"
  },
  {
    "id": "fc-math-g10-u4-967",
    "grade": 10,
    "subject": "mathematics",
    "unitNumber": 4,
    "front": "What is the Equation of a Circle with radius r?",
    "back": "(x - h)² + (y - k)² = r²",
    "category": "formula"
  },
  {
    "id": "fc-math-g11-u1-968",
    "grade": 11,
    "subject": "mathematics_natural",
    "unitNumber": 1,
    "front": "What is the Arithmetic Progression sum formula?",
    "back": "S_n = (n / 2) * (2a_1 + (n - 1)d) = (n / 2) * (a_1 + a_n)",
    "category": "formula"
  },
  {
    "id": "fc-math-g11-u1-969",
    "grade": 11,
    "subject": "mathematics_natural",
    "unitNumber": 1,
    "front": "What is the Infinite Geometric Series sum formula (|r| < 1)?",
    "back": "S_∞ = a_1 / (1 - r)",
    "category": "formula"
  },
  {
    "id": "fc-math-g11-u3-970",
    "grade": 11,
    "subject": "mathematics_natural",
    "unitNumber": 3,
    "front": "What is the 2x2 Determinant formula?",
    "back": "det([[a, b], [c, d]]) = ad - bc",
    "category": "formula"
  },
  {
    "id": "fc-math-g12-u1-971",
    "grade": 12,
    "subject": "mathematics_natural",
    "unitNumber": 1,
    "front": "What is the Power Rule for differentiation?",
    "back": "d/dx [x^n] = n * x^(n - 1)",
    "category": "formula"
  },
  {
    "id": "fc-math-g12-u1-972",
    "grade": 12,
    "subject": "mathematics_natural",
    "unitNumber": 1,
    "front": "What is the Product Rule for differentiation?",
    "back": "(u * v)' = u' * v + u * v'",
    "category": "formula"
  },
  {
    "id": "fc-math-g12-u1-973",
    "grade": 12,
    "subject": "mathematics_natural",
    "unitNumber": 1,
    "front": "What is the Quotient Rule for differentiation?",
    "back": "(u / v)' = (u' * v - u * v') / v²",
    "category": "formula"
  },
  {
    "id": "fc-math-g12-u3-974",
    "grade": 12,
    "subject": "mathematics_natural",
    "unitNumber": 3,
    "front": "What is the Power Rule for integration?",
    "back": "∫ x^n dx = (x^(n + 1)) / (n + 1) + C (for n ≠ -1).",
    "category": "formula"
  },
  {
    "id": "fc-math-g12-u3-975",
    "grade": 12,
    "subject": "mathematics_natural",
    "unitNumber": 3,
    "front": "What is the Integration by Parts formula?",
    "back": "∫ u dv = u * v - ∫ v du",
    "category": "formula"
  },
  {
    "id": "fc-math-g12-u5-976",
    "grade": 12,
    "subject": "mathematics_natural",
    "unitNumber": 5,
    "front": "What is Euler's Formula for complex numbers?",
    "back": "e^(iθ) = cos(θ) + i * sin(θ)",
    "category": "formula"
  },
  {
    "id": "fc-math-g12-u6-977",
    "grade": 12,
    "subject": "mathematics_natural",
    "unitNumber": 6,
    "front": "What is the Binomial Probability formula?",
    "back": "P(X = k) = C(n, k) * p^k * (1 - p)^(n - k)",
    "category": "formula"
  },
  {
    "id": "fc-biol-g9-u1-978",
    "grade": 9,
    "subject": "biology",
    "unitNumber": 1,
    "front": "What is Osmosis?",
    "back": "The passive movement of water molecules across a selectively permeable membrane from a region of higher water potential to lower water potential.",
    "category": "definition"
  },
  {
    "id": "fc-biol-g9-u2-979",
    "grade": 9,
    "subject": "biology",
    "unitNumber": 2,
    "front": "What is Enzyme Specificity?",
    "back": "Each enzyme has a uniquely shaped active site that binds only to its complementary substrate molecule ('lock and key' model).",
    "category": "concept"
  },
  {
    "id": "fc-biol-g10-u2-980",
    "grade": 10,
    "subject": "biology",
    "unitNumber": 2,
    "front": "What is an Allele?",
    "back": "An alternative form or variant of a gene that accounts for variations in inherited characteristics.",
    "category": "definition"
  },
  {
    "id": "fc-biol-g10-u3-981",
    "grade": 10,
    "subject": "biology",
    "unitNumber": 3,
    "front": "What is a Hormone?",
    "back": "A chemical messenger produced by an endocrine gland and transported in the bloodstream to target organs to regulate physiological activities.",
    "category": "definition"
  },
  {
    "id": "fc-biol-g11-u3-982",
    "grade": 11,
    "subject": "biology",
    "unitNumber": 3,
    "front": "What is ATP (Adenosine Triphosphate)?",
    "back": "The universal cellular energy currency, composed of adenine, ribose, and three phosphate groups; hydrolysis to ADP + Pi releases ~30.5 kJ/mol.",
    "category": "definition"
  },
  {
    "id": "fc-biol-g11-u4-983",
    "grade": 11,
    "subject": "biology",
    "unitNumber": 4,
    "front": "What is Chlorophyll and its role?",
    "back": "The primary green photosynthetic pigment located in chloroplast thylakoid membranes, absorbing blue and red light while reflecting green light.",
    "category": "concept"
  },
  {
    "id": "fc-biol-g12-u1-984",
    "grade": 12,
    "subject": "biology",
    "unitNumber": 1,
    "front": "What is a Mutation?",
    "back": "A permanent, heritable change in the DNA nucleotide sequence of an organism's genome.",
    "category": "definition"
  },
  {
    "id": "fc-biol-g12-u2-985",
    "grade": 12,
    "subject": "biology",
    "unitNumber": 2,
    "front": "What is Natural Selection?",
    "back": "The differential survival and reproduction of individuals due to differences in phenotype, driving adaptive evolutionary change over generations.",
    "category": "concept"
  },
  {
    "id": "fc-biol-g12-u4-986",
    "grade": 12,
    "subject": "biology",
    "unitNumber": 4,
    "front": "What is an Ecosystem?",
    "back": "A biological community of interacting organisms (biotic factors) and their physical abiotic environment (soil, water, climate).",
    "category": "definition"
  },
  {
    "id": "fc-econ-g9-u1-987",
    "grade": 9,
    "subject": "economics",
    "unitNumber": 1,
    "front": "What is Opportunity Cost?",
    "back": "The value of the next best alternative forgone when a choice is made between mutually exclusive options.",
    "category": "definition"
  },
  {
    "id": "fc-econ-g9-u2-988",
    "grade": 9,
    "subject": "economics",
    "unitNumber": 2,
    "front": "What is the Law of Demand?",
    "back": "Ceteris paribus, as the price of a good increases, the quantity demanded decreases.",
    "category": "concept"
  },
  {
    "id": "fc-econ-g10-u1-989",
    "grade": 10,
    "subject": "economics",
    "unitNumber": 1,
    "front": "What is Price Elasticity of Demand?",
    "back": "A measure of the responsiveness of quantity demanded to a change in the price of the good (%ΔQ_d / %ΔP).",
    "category": "definition"
  },
  {
    "id": "fc-econ-g11-u1-990",
    "grade": 11,
    "subject": "economics",
    "unitNumber": 1,
    "front": "What is Marginal Utility?",
    "back": "The additional satisfaction or utility gained from consuming one additional unit of a good or service.",
    "category": "definition"
  },
  {
    "id": "fc-econ-g11-u3-991",
    "grade": 11,
    "subject": "economics",
    "unitNumber": 3,
    "front": "What is a Monopoly?",
    "back": "A market structure characterized by a single seller selling a unique product with no close substitutes and high barriers to entry.",
    "category": "definition"
  },
  {
    "id": "fc-econ-g11-u5-992",
    "grade": 11,
    "subject": "economics",
    "unitNumber": 5,
    "front": "What is Gross Domestic Product (GDP)?",
    "back": "The total monetary value of all final goods and services produced within the geographic borders of a country in a specified time period (typically one year).",
    "category": "definition"
  },
  {
    "id": "fc-econ-g12-u1-993",
    "grade": 12,
    "subject": "economics",
    "unitNumber": 1,
    "front": "What is Inflation?",
    "back": "A sustained, general increase in the price level of goods and services in an economy over a period of time, reducing the purchasing power of money.",
    "category": "definition"
  },
  {
    "id": "fc-econ-g12-u3-994",
    "grade": 12,
    "subject": "economics",
    "unitNumber": 3,
    "front": "What is Monetary Policy?",
    "back": "The process by which a nation's central bank controls the money supply, interest rates, and credit availability to achieve macroeconomic stability.",
    "category": "definition"
  },
  {
    "id": "fc-hist-g9-u1-995",
    "grade": 9,
    "subject": "history",
    "unitNumber": 1,
    "front": "What is History?",
    "back": "The systematic study, interpretation, and documentation of the human past based on critical analysis of primary and secondary evidence.",
    "category": "definition"
  },
  {
    "id": "fc-hist-g9-u4-996",
    "grade": 9,
    "subject": "history",
    "unitNumber": 4,
    "front": "What was the Kingdom of Aksum?",
    "back": "A powerful ancient trading civilization in northern Ethiopia and Eritrea (c. 100-940 AD), renowned for its obelisks, coinage, international trade, and early adoption of Christianity.",
    "category": "date_fact"
  },
  {
    "id": "fc-hist-g10-u1-997",
    "grade": 10,
    "subject": "history",
    "unitNumber": 1,
    "front": "What was the Zagwe Dynasty?",
    "back": "A medieval Ethiopian ruling dynasty centered in Lasta/Roha (c. 1150-1270 AD), famous for King Lalibela's 11 rock-hewn monolithic churches.",
    "category": "date_fact"
  },
  {
    "id": "fc-hist-g10-u3-998",
    "grade": 10,
    "subject": "history",
    "unitNumber": 3,
    "front": "What was the Gadaa System?",
    "back": "An indigenous Oromo socio-political democratic governance system based on 8-year generational cohorts transitioning through leadership roles under the Abba Gadaa.",
    "category": "concept"
  },
  {
    "id": "fc-hist-g11-u1-999",
    "grade": 11,
    "subject": "history",
    "unitNumber": 1,
    "front": "Who was Emperor Tewodros II?",
    "back": "Ruler who initiated the modern reunification of Ethiopia in 1855, establishing a centralized standing army and resisting British imperialism until his heroic death at Meqdala in 1868.",
    "category": "date_fact"
  },
  {
    "id": "fc-hist-g11-u3-1000",
    "grade": 11,
    "subject": "history",
    "unitNumber": 3,
    "front": "What was the Battle of Adwa (1896)?",
    "back": "Historic battle on March 1, 1896, where Ethiopian forces under Menelik II decisively defeated an invading Italian colonial army, defending national independence and inspiring global Pan-Africanism.",
    "category": "date_fact"
  },
  {
    "id": "fc-hist-g12-u2-1001",
    "grade": 12,
    "subject": "history",
    "unitNumber": 2,
    "front": "What was the Arbegnoch Movement?",
    "back": "The Ethiopian patriotic guerrilla resistance fighters who waged relentless warfare against Italian fascist occupation from 1936 to 1941 until national liberation.",
    "category": "date_fact"
  },
  {
    "id": "fc-hist-g12-u4-1002",
    "grade": 12,
    "subject": "history",
    "unitNumber": 4,
    "front": "What was the Organization of African Unity (OAU)?",
    "back": "Continental organization established on May 25, 1963, in Addis Ababa by 32 independent African heads of state to promote solidarity, eradicate colonialism, and defend sovereignty; precursor to the African Union.",
    "category": "date_fact"
  },
  {
    "id": "fc-geog-g9-u1-1003",
    "grade": 9,
    "subject": "geography",
    "unitNumber": 1,
    "front": "What is Latitude and Longitude?",
    "back": "Latitude: Angle north or south of the Equator (0° to 90°). Longitude: Angle east or west of the Prime Meridian (0° to 180°).",
    "category": "definition"
  },
  {
    "id": "fc-geog-g10-u1-1004",
    "grade": 10,
    "subject": "geography",
    "unitNumber": 1,
    "front": "What is the Greenhouse Effect?",
    "back": "The natural trapping of heat in Earth's lower atmosphere by greenhouse gases (CO₂, CH₄, H₂O vapor), maintaining global surface temperatures suitable for life.",
    "category": "concept"
  },
  {
    "id": "fc-geog-g11-u1-1005",
    "grade": 11,
    "subject": "geography",
    "unitNumber": 1,
    "front": "What is the Great East African Rift Valley?",
    "back": "A massive continental tectonic rift extending from the Red Sea/Danakil southward through Ethiopia and Kenya to Mozambique, splitting the African continent into the Nubian and Somalian plates.",
    "category": "definition"
  },
  {
    "id": "fc-geog-g11-u3-1006",
    "grade": 11,
    "subject": "geography",
    "unitNumber": 3,
    "front": "What is the Abbay River?",
    "back": "The Ethiopian Blue Nile, which originates in Lake Tana and supplies over 60% of the total water volume of the Nile River at Khartoum.",
    "category": "date_fact"
  },
  {
    "id": "fc-geog-g11-u4-1007",
    "grade": 11,
    "subject": "geography",
    "unitNumber": 4,
    "front": "What is the Dega Agro-climatic Zone?",
    "back": "Cool temperate Ethiopian highland zone between 2,300 and 3,300 m elevation, with temperatures of 10-15 °C, supporting barley, wheat, and sheep rearing.",
    "category": "definition"
  },
  {
    "id": "fc-geog-g12-u2-1008",
    "grade": 12,
    "subject": "geography",
    "unitNumber": 2,
    "front": "What is the Grand Ethiopian Renaissance Dam (GERD)?",
    "back": "Africa's largest hydroelectric gravity dam on the Abbay River in Benishangul-Gumuz, generating clean renewable energy for Ethiopia and regional export.",
    "category": "date_fact"
  },
  {
    "id": "fc-it-g11-u1-1009",
    "grade": 11,
    "subject": "it",
    "unitNumber": 1,
    "front": "What is an Operating System Kernel?",
    "back": "The core computer program at the heart of an OS that has complete control over everything in the system, managing hardware resources, memory, and CPU processes.",
    "category": "definition"
  },
  {
    "id": "fc-it-g11-u2-1010",
    "grade": 11,
    "subject": "it",
    "unitNumber": 2,
    "front": "What is a Binary Tree in data structures?",
    "back": "A hierarchical tree data structure in which each parent node has at most two children, referred to as the left child and right child.",
    "category": "definition"
  },
  {
    "id": "fc-it-g11-u3-1011",
    "grade": 11,
    "subject": "it",
    "unitNumber": 3,
    "front": "What is the difference between compiler and interpreter?",
    "back": "Compiler: Translates entire source code into machine code at once before execution (e.g., C++, Java). Interpreter: Translates and executes source code line-by-line in real time (e.g., Python, JavaScript).",
    "category": "concept"
  },
  {
    "id": "fc-it-g12-u1-1012",
    "grade": 12,
    "subject": "it",
    "unitNumber": 1,
    "front": "What is a Denial of Service (DoS) attack?",
    "back": "A cyber-attack in which the perpetrator seeks to make a machine or network resource unavailable to its intended users by temporarily or indefinitely disrupting services of a host connected to the Internet.",
    "category": "definition"
  },
  {
    "id": "fc-it-g12-u2-1013",
    "grade": 12,
    "subject": "it",
    "unitNumber": 2,
    "front": "What is Public Key Infrastructure (PKI)?",
    "back": "A system of digital certificates, Certificate Authorities (CAs), and public-key cryptography that secures end-to-end electronic communications and proves entity authenticity.",
    "category": "definition"
  },
  {
    "id": "fc-agri-g9-u1-1014",
    "grade": 9,
    "subject": "agriculture",
    "unitNumber": 1,
    "front": "What is Soil Organic Matter (Humus)?",
    "back": "Decomposed plant and animal residues in soil that improve soil structure, enhance water retention, and provide a steady reservoir of plant nutrients.",
    "category": "definition"
  },
  {
    "id": "fc-agri-g9-u2-1015",
    "grade": 9,
    "subject": "agriculture",
    "unitNumber": 2,
    "front": "What is Crop Rotation?",
    "back": "The practice of growing a series of different types of crops in the same area across sequential seasons to prevent soil nutrient depletion, break pest cycles, and control weeds.",
    "category": "concept"
  },
  {
    "id": "fc-agri-g10-u1-1016",
    "grade": 10,
    "subject": "agriculture",
    "unitNumber": 1,
    "front": "What is Agroforestry?",
    "back": "An integrated land-use management system in which trees or shrubs are grown around or among crops or pastureland, enhancing biodiversity and mitigating soil erosion.",
    "category": "definition"
  },
  {
    "id": "fc-agri-g11-u1-1017",
    "grade": 11,
    "subject": "agriculture",
    "unitNumber": 1,
    "front": "What is Green Revolution in agriculture?",
    "back": "A historical transfer and adoption of high-yielding crop varieties (HYVs), synthetic fertilizers, pesticides, and controlled irrigation infrastructure that dramatically increased global food production.",
    "category": "concept"
  },
  {
    "id": "fc-citi-g11-u1-1018",
    "grade": 11,
    "subject": "citizenship",
    "unitNumber": 1,
    "front": "What is Civic Virtue?",
    "back": "The dedication of citizens to the common welfare of their community and society, even at the cost of their individual interests.",
    "category": "definition"
  },
  {
    "id": "fc-citi-g11-u2-1019",
    "grade": 11,
    "subject": "citizenship",
    "unitNumber": 2,
    "front": "What is Due Process of Law?",
    "back": "The legal requirement that the state must respect all legal rights owed to a person, ensuring fair procedures and impartial hearings before any deprivation of life, liberty, or property.",
    "category": "concept"
  },
  {
    "id": "fc-citi-g12-u1-1020",
    "grade": 12,
    "subject": "citizenship",
    "unitNumber": 1,
    "front": "What is Good Governance?",
    "back": "The process of making and implementing public decisions characterized by transparency, accountability, equity, rule of law, responsiveness, efficiency, and broad public participation.",
    "category": "definition"
  },
  {
    "id": "fc-citi-g12-u2-1021",
    "grade": 12,
    "subject": "citizenship",
    "unitNumber": 2,
    "front": "What is the African Union (AU) Peace and Security Council (PSC)?",
    "back": "The standing decision-making organ of the African Union for the prevention, management, and resolution of conflicts across the African continent, headquartered in Addis Ababa.",
    "category": "date_fact"
  },
  {
    "id": "fc-apti-g11-u1-1022",
    "grade": 11,
    "subject": "aptitude",
    "unitNumber": 1,
    "front": "How do you find the units digit of a large power like 7^2024?",
    "back": "Find the cyclic pattern of unit digits for base 7: 7¹=7, 7²=9, 7³=3, 7⁴=1 (period 4). Divide exponent 2024 by 4 (remainder 0), so units digit is 1.",
    "category": "formula"
  },
  {
    "id": "fc-apti-g11-u2-1023",
    "grade": 11,
    "subject": "aptitude",
    "unitNumber": 2,
    "front": "What is the formula for calculating simple speed, distance, and time?",
    "back": "Distance = Speed * Time\nSpeed = Distance / Time\nTime = Distance / Speed.",
    "category": "formula"
  },
  {
    "id": "fc-apti-g12-u1-1024",
    "grade": 12,
    "subject": "aptitude",
    "unitNumber": 1,
    "front": "What is a False Cause (Post Hoc Ergo Propter Hoc) logical fallacy?",
    "back": "Incorrectly concluding that one event caused another simply because it occurred first in temporal sequence ('after this, therefore because of this').",
    "category": "definition"
  },
  {
    "id": "fc-apti-g12-u2-1025",
    "grade": 12,
    "subject": "aptitude",
    "unitNumber": 2,
    "front": "How do you solve a 2-variable system using substitution vs elimination?",
    "back": "Substitution: Solve one equation for one variable and substitute into the second. Elimination: Multiply equations by constants so adding/subtracting eliminates one variable.",
    "category": "concept"
  }
];
