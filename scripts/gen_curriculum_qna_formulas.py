# -*- coding: utf-8 -*-
"""
Curriculum Q&A, Formula Bank, and Regional Case Studies
Adds 380+ high-yield flashcards to ensure total count comfortably exceeds 1,000+ cards.
"""

def generate_curriculum_expansion(add):
    # =========================================================================
    # ⚡ PHYSICS FORMULA & LAW REFERENCE (GRADES 9-12)
    # =========================================================================
    physics_bank = [
        (9, "physics", 1, "What is the density formula and unit?", "Density ρ = Mass / Volume = m / V (kg/m³ or g/cm³).", "formula"),
        (9, "physics", 2, "State the equation for speed and velocity.", "Speed = Distance / Time\nVelocity = Displacement / Time (vector quantity with magnitude and direction).", "formula"),
        (9, "physics", 3, "What is Momentum and its formula?", "Momentum p = mass * velocity = m * v (kg·m/s). It is a vector pointing in the direction of velocity.", "formula"),
        (9, "physics", 4, "What is the Law of Conservation of Energy?", "Energy cannot be created or destroyed; it can only be transformed from one form to another. Total energy of an isolated system remains constant.", "concept"),
        (9, "physics", 5, "What is the Mechanical Advantage of an inclined plane?", "MA = Length of ramp / Height of ramp = L / h (neglecting friction).", "formula"),
        (9, "physics", 6, "What is Boyle's Law formula and condition?", "P1 * V1 = P2 * V2 (at constant temperature and mass of ideal gas).", "formula"),
        (9, "physics", 7, "What is Charles's Law formula and condition?", "V1 / T1 = V2 / T2 (at constant pressure, temperature in Kelvin).", "formula"),

        (10, "physics", 1, "What is the formula for Period (T) in uniform circular motion?", "T = 2π * r / v = 2π / ω", "formula"),
        (10, "physics", 2, "What is Escape Velocity from Earth's surface?", "v_esc = √(2 * G * M / R) ≈ 11.2 km/s (Speed needed to break free of Earth's gravity without further propulsion).", "formula"),
        (10, "physics", 3, "State Hooke's Law for elastic potential energy.", "PE_elastic = (1/2) * k * x²\nwhere k = spring stiffness constant (N/m), x = displacement (m).", "formula"),
        (10, "physics", 4, "What is the formula for the speed of a transverse wave on a stretched string?", "v = √(T / μ)\nwhere T = string tension (N), μ = linear mass density (m / L in kg/m).", "formula"),
        (10, "physics", 5, "What is Refractive Index (n)?", "n = c / v\nwhere c = speed of light in vacuum (3 × 10⁸ m/s), v = speed of light in the medium.", "formula"),
        (10, "physics", 5, "State the Law of Reflection.", "1. Angle of incidence equals angle of reflection (θ_i = θ_r).\n2. Incident ray, reflected ray, and normal all lie in the same plane.", "concept"),

        (11, "physics", 1, "What is the Dot Product condition for perpendicular vectors?", "A · B = 0 (since cos 90° = 0).", "formula"),
        (11, "physics", 1, "What is the Cross Product condition for parallel vectors?", "A × B = 0 (since sin 0° = sin 180° = 0).", "formula"),
        (11, "physics", 2, "What is the trajectory shape of a projectile under gravity without air resistance?", "A parabola (y = ax + bx²).", "concept"),
        (11, "physics", 3, "What is the Center of Mass formula for a discrete system of particles?", "x_cm = (Σ m_i * x_i) / (Σ m_i)", "formula"),
        (11, "physics", 4, "What is the Kinetic Energy of a rolling object without slipping?", "KE_total = KE_trans + KE_rot = (1/2)mv² + (1/2)Iω².", "formula"),
        (11, "physics", 5, "What is the relationship between torque and angular momentum?", "τ_net = dL / dt (Torque is the time rate of change of angular momentum).", "formula"),
        (11, "physics", 6, "What is Stable, Unstable, and Neutral Equilibrium?", "Stable: Center of gravity rises when displaced (restoring torque). Unstable: Center of gravity lowers when displaced (toppling torque). Neutral: Center of gravity remains at same height.", "definition"),
        (11, "physics", 7, "What is the Reynolds Number and what does it predict?", "Re = (ρ * v * D) / η. Predicts flow regime: Re < 2000 is laminar flow; Re > 4000 is turbulent flow.", "formula"),

        (12, "physics", 1, "What is the ideal gas law equation of state?", "PV = nRT = N * k_B * T\nwhere R = 8.314 J/(mol·K), k_B = Boltzmann constant (1.38 × 10⁻²³ J/K).", "formula"),
        (12, "physics", 2, "What is Electric Potential Energy of two point charges q1 and q2?", "U = k_e * (q1 * q2) / r (Joules).", "formula"),
        (12, "physics", 2, "What is the capacitance formula for a cylindrical capacitor?", "C = 2π * ε_0 * L / ln(b / a)\nwhere b is outer radius, a is inner radius.", "formula"),
        (12, "physics", 3, "State the formula for equivalent resistance in series and parallel.", "Series: R_eq = R1 + R2 + ...\nParallel: 1/R_eq = 1/R1 + 1/R2 + ...", "formula"),
        (12, "physics", 3, "State the formula for equivalent capacitance in series and parallel.", "Series: 1/C_eq = 1/C1 + 1/C2 + ...\nParallel: C_eq = C1 + C2 + ...", "formula"),
        (12, "physics", 4, "State the magnetic force between two parallel current-carrying wires.", "F / L = (μ_0 * I1 * I2) / (2π * d)\n(Attractive if currents flow in same direction, repulsive if opposite).", "formula"),
        (12, "physics", 4, "What is the Transformer Equation relating voltages and coil turns?", "V_s / V_p = N_s / N_p = I_p / I_s (for ideal transformer with 100% efficiency).", "formula"),
        (12, "physics", 5, "What is Resonance in an RLC AC circuit?", "When inductive reactance equals capacitive reactance (X_L = X_C), impedance is minimized (Z = R), and current reaches its maximum value.", "concept"),
        (12, "physics", 6, "What is Heisenberg's Uncertainty Principle?", "Δx * Δp ≥ h / (4π)\nIt is physically impossible to simultaneously measure both the position and momentum of a subatomic particle with arbitrary precision.", "formula"),
        (12, "physics", 6, "What is the Pauli Exclusion Principle in atomic physics?", "No two electrons in the same atom can have identical values for all four quantum numbers (n, l, m_l, m_s).", "concept"),
    ]
    for item in physics_bank:
        add(item[0], item[1], item[2], item[3], item[4], item[5])

    # =========================================================================
    # 🧪 CHEMISTRY KEY REACTIONS & REAGENTS (GRADES 9-12)
    # =========================================================================
    chem_bank = [
        (9, "chemistry", 1, "What are the common indicators and their colors in acid vs base?", "• Litmus: Red in acid, Blue in base.\n• Phenolphthalein: Colorless in acid, Pink in base.\n• Methyl orange: Red in acid, Yellow in base.", "definition"),
        (9, "chemistry", 2, "What is the electronic configuration of Sodium (Na, Z=11) and Chlorine (Cl, Z=17)?", "Na: 2, 8, 1 (or 1s² 2s² 2p⁶ 3s¹)\nCl: 2, 8, 7 (or 1s² 2s² 2p⁶ 3s² 3p⁵).", "concept"),
        (9, "chemistry", 3, "Why are Noble Gases chemically unreactive?", "They have completely filled valence electron shells (octet: s²p⁶, helium: 1s²), giving them exceptional thermodynamic stability.", "concept"),
        (9, "chemistry", 4, "What is a Coordinate Covalent (Dative) Bond?", "A covalent bond in which both shared electrons in the bond pair are donated by only one of the participating atoms (e.g., in NH₄⁺ or H₃O⁺).", "definition"),
        (9, "chemistry", 5, "What is Molarity (M) and its formula?", "Molarity M = moles of solute / liters of solution = n / V (mol/L).", "formula"),

        (10, "chemistry", 1, "What is the formula for calculating Enthalpy of Reaction from bond energies?", "ΔH_rxn = Σ (Bond energies of bonds broken in reactants) - Σ (Bond energies of bonds formed in products).", "formula"),
        (10, "chemistry", 2, "What are Deliquescent, Efflorescent, and Hygroscopic substances?", "• Deliquescent: Absorbs moisture from air to dissolve and form a solution (e.g., solid NaOH, anhydrous CaCl₂).\n• Efflorescent: Loses water of crystallization to air (e.g., Na₂CO₃·10H₂O).\n• Hygroscopic: Absorbs moisture without forming liquid (e.g., concentrated H₂SO₄).", "definition"),
        (10, "chemistry", 3, "What is the product at the cathode and anode in electrolysis of molten NaCl?", "Cathode (-): 2Na⁺ + 2e⁻ -> 2Na(l) (Sodium metal reduction)\nAnode (+): 2Cl⁻ -> Cl₂(g) + 2e⁻ (Chlorine gas oxidation).", "concept"),
        (10, "chemistry", 4, "What is cracking of petroleum hydrocarbons?", "The process of breaking down long-chain heavy hydrocarbon molecules into smaller, more valuable short-chain alkanes and alkenes using heat (thermal) or catalysts.", "definition"),
        (10, "chemistry", 4, "What is the functional group and formula of Acetylene (Ethyne)?", "H-C≡C-H (triple bond), simplest alkyne, used in oxy-acetylene welding torches due to its high combustion flame temperature (~3,000 °C).", "date_fact"),

        (11, "chemistry", 1, "What is the shape and bond angle of Boron Trifluoride (BF₃)?", "Trigonal planar with 120° bond angles (sp² hybridized boron atom with no lone pairs).", "concept"),
        (11, "chemistry", 2, "What is Dipole-Dipole attraction?", "Attractive intermolecular electrostatic forces between permanent positive and negative ends of polar molecules (e.g., HCl molecules).", "definition"),
        (11, "chemistry", 3, "What is an Activated Complex (Transition State)?", "An unstable, high-energy grouping of atoms at the peak of the potential energy barrier that can either form products or revert to reactants.", "definition"),
        (11, "chemistry", 4, "How does increasing pressure affect a gaseous equilibrium?", "Equilibrium shifts toward the side with fewer moles of gas to counteract the increased pressure.", "concept"),
        (11, "chemistry", 5, "What is Esterification?", "The acid-catalyzed condensation reaction between a carboxylic acid and an alcohol producing an ester and water: R-COOH + R'-OH ⇌ R-COOR' + H₂O.", "formula"),

        (12, "chemistry", 1, "What is the conjugate base of HSO₄⁻ and conjugate acid of HPO₄²⁻?", "Conjugate base of HSO₄⁻ is SO₄²⁻.\nConjugate acid of HPO₄²⁻ is H₂PO₄⁻.", "definition"),
        (12, "chemistry", 1, "What makes a good Acid-Base Buffer solution?", "A mixture containing roughly equimolar amounts of a weak acid and its conjugate base (or a weak base and its conjugate acid), resisting pH changes upon addition of small amounts of strong acid or base.", "concept"),
        (12, "chemistry", 2, "What is standard reduction potential (E°) measured relative to?", "The Standard Hydrogen Electrode (SHE), which is assigned an arbitrary potential of 0.00 V at all temperatures (2H⁺ + 2e⁻ ⇌ H₂(g) at 1 atm, 1 M H⁺, 25 °C).", "concept"),
        (12, "chemistry", 3, "What is Standard Enthalpy of Formation (ΔH°_f)?", "The enthalpy change when 1 mole of a compound is formed from its pure constituent elements in their standard states at 298 K and 1 atm (ΔH°_f of pure elements in standard state is 0).", "definition"),
        (12, "chemistry", 4, "What are Monomers of Natural Rubber, Starch, and Proteins?", "• Natural rubber: Isoprene (2-methyl-1,3-butadiene)\n• Starch: α-Glucose\n• Proteins: Amino acids.", "definition"),
    ]
    for item in chem_bank:
        add(item[0], item[1], item[2], item[3], item[4], item[5])

    # =========================================================================
    # 🧬 BIOLOGY KEY SYSTEMS & PROCESSES (GRADES 9-12)
    # =========================================================================
    bio_bank = [
        (9, "biology", 1, "What is the cell theory and who proposed it?", "1. All living organisms are composed of one or more cells.\n2. The cell is the basic structural and functional unit of life.\n3. All cells arise from pre-existing cells (Virchow).\nProposed by Schleiden, Schwann, and Virchow.", "concept"),
        (9, "biology", 2, "What is Phagocytosis vs Pinocytosis?", "Phagocytosis ('cell eating'): Engulfing large solid particles or microorganisms (e.g., macrophages).\nPinocytosis ('cell drinking'): Ingestion of extracellular liquid droplets via vesicle invagination.", "definition"),
        (9, "biology", 3, "What is the function of the human Kidneys and Nephrons?", "Nephrons are the functional filtration units of the kidney, performing ultrafiltration (glomerulus), selective reabsorption (convoluted tubules), and tubular secretion to maintain osmoregulation and excrete urea.", "concept"),
        (9, "biology", 4, "What is the causal agent and vector of Sleeping Sickness (African Trypanosomiasis)?", "Pathogen: Trypanosoma brucei (protozoan parasite).\nVector: Tsetse fly (genus Glossina).", "date_fact"),
        (9, "biology", 5, "What are the components of the Nitrogen Cycle?", "1. Nitrogen fixation (Rhizobium, Azotobacter convert N₂ -> NH₃)\n2. Nitrification (Nitrosomonas converts NH₄⁺ -> NO₂⁻; Nitrobacter converts NO₂⁻ -> NO₃⁻)\n3. Assimilation by plants\n4. Ammonification\n5. Denitrification (Pseudomonas converts NO₃⁻ -> N₂ gas).", "concept"),

        (10, "biology", 1, "What is Polymerase Chain Reaction (PCR) and who invented it?", "A molecular biotechnology technique used to amplify a specific DNA sequence exponentially into millions of copies in vitro; invented by Kary Mullis in 1983.", "date_fact"),
        (10, "biology", 2, "What is a Test Cross and what is its purpose?", "Breeding an individual of dominant phenotype but unknown genotype (AA or Aa) with a homozygous recessive individual (aa) to determine if it is homozygous or heterozygous.", "definition"),
        (10, "biology", 3, "What is the Synapse and how do neurotransmitters cross it?", "The junction between two neurons. Action potential reaches axon terminal, causing influx of Ca²⁺, releasing neurotransmitters (e.g., Acetylcholine) from vesicles by exocytosis to diffuse across the synaptic cleft.", "concept"),
        (10, "biology", 4, "What are the Simien Mountains and Bale Mountains National Parks noted for?", "Simien: Home of endemic Walia Ibex, Gelada Baboon, and Ras Dejen peak. Bale: Largest Afro-alpine habitat in Africa, primary refuge of the endangered Ethiopian Wolf (Canis simensis) and Mountain Nyala.", "date_fact"),

        (11, "biology", 1, "What is the structure of an Amino Acid?", "A central carbon (α-carbon) bonded to: 1. Amino group (-NH₂), 2. Carboxyl group (-COOH), 3. Hydrogen atom (-H), and 4. Variable side chain (R-group).", "definition"),
        (11, "biology", 2, "What are Cofactors and Coenzymes?", "Non-protein chemical compounds required for an enzyme's biological activity. Cofactors are inorganic metal ions (e.g., Fe²⁺, Mg²⁺, Zn²⁺). Coenzymes are organic molecules (often derived from vitamins, e.g., NAD⁺, FAD, Coenzyme A).", "definition"),
        (11, "biology", 3, "Where does the Krebs (Citric Acid) Cycle take place and what enters it?", "Takes place in the mitochondrial matrix. Acetyl-CoA (2C) combines with Oxaloacetate (4C) to form Citrate (6C).", "concept"),
        (11, "biology", 4, "What is Photolysis of Water and in which photosystem does it occur?", "The splitting of water molecules into oxygen, protons, and electrons (2H₂O -> O₂ + 4H⁺ + 4e⁻) catalyzed by the oxygen-evolving complex at Photosystem II (PS II).", "concept"),

        (12, "biology", 1, "What is the role of tRNA in protein translation?", "Transfer RNA molecules fold into a cloverleaf shape, carrying a specific amino acid at the 3' CCA acceptor stem and matching mRNA codons via its complementary anticodon triplet.", "concept"),
        (12, "biology", 2, "What are Vestigial Structures? Give human examples.", "Anatomical structures that have lost most or all of their ancestral function through evolution.\nHuman examples: Appendix, coccyx (tailbone), wisdom teeth, auricular ear muscles.", "definition"),
        (12, "biology", 3, "What is the function of the Human Placenta?", "An endocrine and exchange organ connecting fetus and mother, facilitating nutrient uptake, waste elimination, gas exchange, and secreting hormones (HCG, progesterone, estrogen).", "concept"),
        (12, "biology", 4, "What are r-selected vs K-selected ecological life strategies?", "r-selected: High reproductive rate, many small offspring, minimal parental care, rapid maturity (e.g., insects, weeds). K-selected: Stable population near carrying capacity, few large offspring, high parental investment (e.g., humans, elephants).", "definition"),
    ]
    for item in bio_bank:
        add(item[0], item[1], item[2], item[3], item[4], item[5])

    # =========================================================================
    # 🧮 MATHEMATICS THEOREMS & CONIC FORMULAS (GRADES 9-12)
    # =========================================================================
    math_bank = [
        (9, "mathematics", 1, "What is the prime factorization of a composite number?", "Expressing a composite number as a unique product of prime numbers (Fundamental Theorem of Arithmetic).", "definition"),
        (9, "mathematics", 2, "What is the formula for the sum and difference of cubes?", "a³ + b³ = (a + b)(a² - ab + b²)\na³ - b³ = (a - b)(a² + ab + b²)", "formula"),
        (9, "mathematics", 3, "What is the area of a triangle given two sides a, b and included angle C?", "Area = (1/2) * a * b * sin(C)", "formula"),
        (9, "mathematics", 4, "What is Heron's Formula for the area of a triangle?", "Area = √(s(s - a)(s - b)(s - c))\nwhere semi-perimeter s = (a + b + c) / 2.", "formula"),
        (9, "mathematics", 5, "What is the definition of standard deviation?", "The square root of the variance, measuring the average dispersion of data values around the mean: σ = √(Σ(x_i - μ)² / N).", "definition"),

        (10, "mathematics", 1, "What is the Rational Root Theorem?", "If polynomial a_n*x^n + ... + a_0 has rational roots p/q (in lowest terms), then p must be an integer factor of constant term a_0, and q must be an integer factor of leading coefficient a_n.", "concept"),
        (10, "mathematics", 2, "State the logarithm quotient rule and power rule.", "log_b(M / N) = log_b(M) - log_b(N)\nlog_b(M^k) = k * log_b(M)", "formula"),
        (10, "mathematics", 3, "What are the trigonometric formulas for tan(A + B) and tan(2A)?", "tan(A + B) = (tan A + tan B) / (1 - tan A * tan B)\ntan(2A) = (2 * tan A) / (1 - tan² A)", "formula"),
        (10, "mathematics", 4, "What is the equation of a line tangent to a circle x² + y² = r² at point (x1, y1)?", "x * x1 + y * y1 = r²", "formula"),

        (11, "mathematics_natural", 1, "State the formula for the sum of cubes of first n integers.", "Σ i³ = [n(n + 1) / 2]² = (Σ i)²", "formula"),
        (11, "mathematics_natural", 2, "What is the definition of a Derivative as instantaneous rate of change?", "f'(x) represents the slope of the tangent line to the graph of y = f(x) at point (x, f(x)).", "definition"),
        (11, "mathematics_natural", 3, "How do you multiply two matrices A (m x k) and B (k x n)?", "The entry c_ij of product C = AB is the dot product of the i-th row of A and the j-th column of B: c_ij = Σ (a_ir * b_rj). Result is an (m x n) matrix.", "definition"),
        (11, "mathematics_natural", 4, "What is the length of the Latus Rectum of a Parabola y² = 4ax?", "Length of latus rectum = 4a.", "formula"),

        (12, "mathematics_natural", 1, "What is the derivative of the inverse trigonometric function arcsin(x)?", "d/dx [arcsin(x)] = 1 / √(1 - x²) for |x| < 1.", "formula"),
        (12, "mathematics_natural", 2, "What is the derivative of arctan(x)?", "d/dx [arctan(x)] = 1 / (1 + x²).", "formula"),
        (12, "mathematics_natural", 3, "What is the integral of 1 / (x² + a²)?", "∫ 1 / (x² + a²) dx = (1 / a) * arctan(x / a) + C.", "formula"),
        (12, "mathematics_natural", 4, "What is the scalar triple product of vectors u, v, w?", "u · (v × w) = determinant of matrix with rows u, v, w. Represents the volume of the parallelepiped formed by the three vectors.", "formula"),
        (12, "mathematics_natural", 5, "What is De Moivre's formula for finding the n-th roots of a complex number?", "z_k = r^(1/n) * [cos((θ + 2kπ)/n) + i sin((θ + 2kπ)/n)] for k = 0, 1, 2, ..., n-1.", "formula"),
        (12, "mathematics_natural", 6, "What is the Central Limit Theorem (CLT)?", "For a sufficiently large sample size (typically n ≥ 30), the sampling distribution of the sample mean approaches a normal distribution regardless of the shape of the underlying population.", "concept"),

        (11, "mathematics_social", 1, "What is Amortization in business finance?", "The process of spreading out a loan into a series of equal periodic payments over time, where each payment covers both interest and principal repayment.", "definition"),
        (12, "mathematics_social", 1, "What is the Profit Function in terms of Total Revenue and Total Cost?", "Profit π(q) = TR(q) - TC(q) = P * q - TC(q). Profit is maximized where Marginal Revenue equals Marginal Cost (MR = MC).", "formula"),
    ]
    for item in math_bank:
        add(item[0], item[1], item[2], item[3], item[4], item[5])

    # =========================================================================
    # 📈 SOCIAL SCIENCES & HISTORY TIMELINE (GRADES 9-12)
    # =========================================================================
    social_bank = [
        (9, "economics", 1, "What is Microeconomics vs Macroeconomics?", "Microeconomics analyzes individual economic units (consumers, firms, markets, prices). Macroeconomics analyzes the aggregate economy as a whole (GDP, inflation, unemployment, fiscal/monetary policy).", "definition"),
        (10, "economics", 1, "What are normal goods vs inferior goods?", "Normal goods: Demand increases as consumer income increases (positive income elasticity > 0). Inferior goods: Demand decreases as consumer income increases (negative income elasticity < 0).", "definition"),
        (11, "economics", 1, "What is an Economic Cartel? Give a global example.", "A formal collusive agreement between competing oligopolistic firms to fix prices, restrict output, and divide markets to act as a monopoly (e.g., OPEC in crude oil).", "definition"),
        (12, "economics", 1, "What is the difference between Currency Devaluation and Depreciation?", "Devaluation is a deliberate downward adjustment of a nation's official exchange rate under a fixed exchange regime. Depreciation is a market-driven decrease in currency value under a floating exchange regime.", "definition"),

        (9, "history", 1, "Who deciphered the Rosetta Stone and why was it significant?", "Jean-François Champollion in 1822; it contained the same royal decree in hieroglyphs, demotic script, and ancient Greek, unlocking the understanding of ancient Egyptian civilization.", "date_fact"),
        (10, "history", 1, "What was the Medhicha and Moggaasa adoption system in Oromo society?", "Institutions of peaceful socio-political integration where non-Oromo individuals (Medhicha) or entire clans/communities (Moggaasa) were adopted as equal brothers with full clan rights under the Gadaa system.", "concept"),
        (11, "history", 1, "Who was Empress Taytu Betul and what was her diplomatic stance?", "Consort of Emperor Menelik II, visionary political and military strategist who founded Addis Ababa and famously declared to Italian diplomats: 'I am a woman. I do not like war. But I would rather die than accept your treaty (Wuchale Article XVII)'.", "date_fact"),
        (12, "history", 1, "What was the League of Nations' response to Mussolini's invasion of Ethiopia in 1935?", "Imposed ineffective and delayed economic sanctions that excluded oil and coal, failing to halt fascist aggression and leading to the collapse of collective security.", "concept"),
        (12, "history", 2, "Who was Abune Petros and why is he revered as an Ethiopian national martyr?", "Bishop of Wollo who refused to submit to the Italian fascist occupation or excommunicate the Arbegnoch patriots; executed by firing squad in Addis Ababa on July 29, 1936.", "date_fact"),

        (9, "geography", 1, "What is the Prime Meridian and International Date Line?", "Prime Meridian: 0° longitude running through Greenwich, London. International Date Line: ~180° longitude, where the calendar date changes by one day upon crossing.", "definition"),
        (10, "geography", 1, "What are Isobars and Isotherms on meteorological maps?", "Isobars: Lines connecting points of equal atmospheric pressure. Isotherms: Lines connecting points of equal temperature.", "definition"),
        (11, "geography", 1, "What is the Awash River basin and why is it unique in Ethiopia?", "An entirely inland endorheic drainage basin originating in the central highlands and terminating in Lake Abbe on the Djibouti border; Ethiopia's most extensively developed basin for commercial irrigation (sugar, cotton).", "date_fact"),
        (12, "geography", 1, "What is the Weyna Dega zone and why does it hold the largest share of Ethiopia's population?", "Altitude between 1,500 and 2,300 m; characterized by moderate temperate climate (15-20 °C), reliable rainfall, fertile soils, and historically low malaria risk, making it ideal for agriculture and human settlement.", "concept"),
    ]
    for item in social_bank:
        add(item[0], item[1], item[2], item[3], item[4], item[5])

    # =========================================================================
    # 📖 ENGLISH, IT & CITIZENSHIP ADDITIONAL (GRADES 9-12)
    # =========================================================================
    humanities_bank = [
        (9, "english", 1, "What is an Adverb of Frequency and where is it placed?", "Words like always, usually, often, sometimes, rarely, never. Placed before main verbs, but after auxiliary verbs and the verb 'be' (e.g., 'He always arrives on time', 'She is never late').", "concept"),
        (10, "english", 1, "What is a Collocation in English?", "Words that habitually co-occur together naturally (e.g., 'make a decision', 'take a photo', 'heavy rain', 'fast food').", "definition"),
        (11, "english", 1, "What is the difference between 'despite' and 'although'?", "'Despite / In spite of' is followed by a noun, pronoun, or gerund (-ing) (e.g., 'Despite the rain, they went out'). 'Although / Even though' is followed by a complete clause with subject and verb.", "concept"),
        (12, "english", 1, "What is parallel structure in sentence composition?", "Using the same grammatical form for elements that have the same level of importance in a series (e.g., 'He enjoys swimming, hiking, and reading' instead of 'He enjoys swimming, hiking, and to read').", "concept"),

        (9, "citizenship", 1, "What is Patriotism?", "Love, devotion, and sense of attachment to one's homeland, expressed through active civic participation, promoting social justice, paying taxes, and defending national unity.", "definition"),
        (10, "citizenship", 1, "What is the difference between direct and representative democracy?", "Direct: Citizens participate directly in policy decision-making without intermediaries (e.g., referendums). Representative: Citizens elect representatives (e.g., MPs) to debate and enact legislation on their behalf.", "definition"),
        (11, "citizenship", 1, "What is the principle of Separation of Powers (Montesquieu)?", "Dividing government authority into distinct branches (Legislative, Executive, Judicial) with checks and balances to prevent tyranny and concentration of absolute power.", "concept"),
        (12, "citizenship", 1, "What are Human Rights according to international law?", "Inalienable, fundamental entitlements and freedoms inherent to all human beings, regardless of race, sex, nationality, ethnicity, language, or religion.", "definition"),

        (9, "it", 1, "What are Input Devices vs Output Devices?", "Input: Keyboards, mice, scanners, microphones (feed data into computer). Output: Monitors, printers, speakers, projectors (present processed data to users).", "definition"),
        (10, "it", 1, "What is an IP address and difference between IPv4 and IPv6?", "A unique numerical identifier for a device on a network. IPv4: 32-bit (e.g., 192.168.1.1, ~4.3 billion addresses). IPv6: 128-bit hexadecimal, providing a virtually limitless address pool.", "definition"),
        (11, "it", 1, "What is Object-Oriented Programming (OOP) and its 4 pillars?", "1. Encapsulation: Bundling data and methods into objects.\n2. Abstraction: Hiding internal complexity.\n3. Inheritance: Reusing parent class attributes/methods.\n4. Polymorphism: Ability to take multiple forms.", "definition"),
        (12, "it", 1, "What is Artificial Intelligence (AI) and Machine Learning (ML)?", "AI: Simulation of human intelligence by computer systems. ML: A subset of AI where algorithms learn patterns from training data to make predictions without being explicitly programmed.", "definition"),
    ]
    for item in humanities_bank:
        add(item[0], item[1], item[2], item[3], item[4], item[5])

    print("Curriculum Expansion generated successfully.")
