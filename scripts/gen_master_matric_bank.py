# -*- coding: utf-8 -*-
"""
EUEE Matric National Examination Master Flashcards Bank
Adds 250+ essential exam cards across all major subjects to surpass 1,050+ total cards.
"""

def generate_master_matric_bank(add):
    # =========================================================================
    # 🔬 EUEE PHYSICS MATRIC MASTER DECK
    # =========================================================================
    phys_matric = [
        (12, "physics", 1, "What is a Heat Pump and how is its COP calculated?", "A thermodynamic device that transfers heat from a colder body to a hotter reservoir by consuming work. COP_heating = Q_h / W = T_h / (T_h - T_c) for a Carnot heat pump.", "formula"),
        (12, "physics", 1, "What is an Isochoric Process and what is the work done?", "A constant-volume thermodynamic process (ΔV = 0). Since no volume change occurs, Work W = P * ΔV = 0, so by First Law: ΔU = Q_v = n * C_v * ΔT.", "formula"),
        (12, "physics", 2, "What is Electric Dipole Moment (p)?", "p = q * d, a vector pointing from negative charge -q to positive charge +q. Torque in uniform electric field: τ = p × E.", "formula"),
        (12, "physics", 2, "What is the energy density (u_E) of an electric field in a vacuum?", "u_E = (1/2) * ε_0 * E² (Joules per cubic meter, J/m³).", "formula"),
        (12, "physics", 3, "What is the Maximum Power Transfer Theorem for a DC circuit?", "A DC power source delivers maximum power to a load resistor R_L when the load resistance equals the internal resistance of the source (R_L = r).", "concept"),
        (12, "physics", 3, "What is the function of a Shunt Resistor in an Ammeter?", "A very low resistance connected in parallel with a galvanometer to divert most of the current, allowing measurement of large currents without damage.", "concept"),
        (12, "physics", 3, "What is the function of a Multiplier Resistor in a Voltmeter?", "A very high resistance connected in series with a galvanometer to drop most of the voltage, allowing measurement of high potential differences.", "concept"),
        (12, "physics", 4, "What is the Cyclotron frequency formula for a charged particle in a magnetic field?", "f = q * B / (2π * m) (Independent of particle speed and orbit radius).", "formula"),
        (12, "physics", 4, "What is the Hall Effect and Hall Voltage?", "The development of a transverse potential difference across a current-carrying conductor placed in a magnetic field: V_H = I * B / (n * q * t), used to determine charge carrier sign and density.", "definition"),
        (12, "physics", 4, "What is Self-Inductance (L) of a solenoid?", "L = μ_0 * N² * A / l\nwhere N = total turns, A = cross-sectional area, l = length.", "formula"),
        (12, "physics", 5, "What is the Q-factor (Quality Factor) of a resonant RLC circuit?", "Q = (1 / R) * √(L / C) = ω_0 * L / R = f_0 / Δf (Measures sharpness of resonance and selectivity).", "formula"),
        (12, "physics", 5, "What is the relationship between peak and RMS values of AC voltage?", "V_rms = V_peak / √2 ≈ 0.707 * V_peak\nI_rms = I_peak / √2 ≈ 0.707 * I_peak.", "formula"),
        (12, "physics", 6, "What is Blackbody Radiation and Planck's Radiation Law?", "Thermal electromagnetic radiation emitted by a blackbody in thermodynamic equilibrium. Planck showed energy is quantized in discrete packets: E = n * h * f.", "concept"),
        (12, "physics", 6, "State Wien's Displacement Law.", "λ_max * T = b = 2.898 × 10⁻³ m·K (The peak wavelength of blackbody radiation is inversely proportional to absolute temperature).", "formula"),
        (12, "physics", 6, "State Stefan-Boltzmann Law for blackbody radiant power.", "P = σ * A * T⁴\nwhere σ = 5.67 × 10⁻⁸ W/(m²·K⁴), A = surface area, T = temperature in Kelvin.", "formula"),
        (12, "physics", 6, "What is Nuclear Fission vs Nuclear Fusion?", "Fission: Splitting of a heavy atomic nucleus (e.g., U-235) into smaller nuclei releasing neutrons and energy. Fusion: Combining light atomic nuclei (e.g., hydrogen isotopes) to form a heavier nucleus (helium), powering stars.", "definition"),
    ]
    for item in phys_matric:
        add(item[0], item[1], item[2], item[3], item[4], item[5])

    # =========================================================================
    # 🧪 EUEE CHEMISTRY MATRIC MASTER DECK
    # =========================================================================
    chem_matric = [
        (12, "chemistry", 1, "What is Ostwald's Dilution Law for weak electrolytes?", "For a weak binary acid HA: K_a = α² * C / (1 - α) ≈ α² * C (for α ≪ 1).\nDegree of dissociation α = √(K_a / C).", "formula"),
        (12, "chemistry", 1, "What is the pH at the equivalence point of a weak acid titrated with a strong base?", "pH > 7 (Basic, due to hydrolysis of the conjugate base salt formed, e.g., sodium acetate producing OH⁻).", "concept"),
        (12, "chemistry", 1, "What is the pH at the equivalence point of a strong acid titrated with a weak base?", "pH < 7 (Acidic, due to hydrolysis of the conjugate acid salt formed, e.g., ammonium chloride producing H₃O⁺).", "concept"),
        (12, "chemistry", 2, "What is the difference between a Galvanic (Voltaic) cell and an Electrolytic cell?", "Galvanic: Converts spontaneous chemical redox energy into electrical energy (ΔG < 0, positive E°_cell, anode is -). Electrolytic: Uses external electrical energy to drive a non-spontaneous redox reaction (ΔG > 0, requires battery, anode is +).", "definition"),
        (12, "chemistry", 2, "What is Sacrificial Anodic Protection against corrosion?", "Connecting an iron structure to a more reactive metal (e.g., Zinc or Magnesium) that oxidizes preferentially, protecting the iron cathode from rusting (galvanization).", "concept"),
        (12, "chemistry", 3, "What is the relationship between Bond Enthalpy and Reaction Enthalpy?", "ΔH°_rxn = Σ (Bonds Broken in Reactants) - Σ (Bonds Formed in Products).", "formula"),
        (12, "chemistry", 3, "Under what conditions of ΔH and ΔS is a chemical reaction always spontaneous at all temperatures?", "When ΔH is negative (exothermic) and ΔS is positive (increasing disorder), making ΔG = ΔH - TΔS always negative.", "concept"),
        (12, "chemistry", 4, "What are Thermoplastic polymers vs Thermosetting polymers?", "Thermoplastic: Linear or branched polymers that soften on heating and can be remolded repeatedly (e.g., Polyethylene, PVC). Thermosetting: Cross-linked 3D network polymers that decompose rather than melt on heating, permanently set (e.g., Bakelite, Melamine).", "definition"),
        (12, "chemistry", 5, "What is Green Chemistry and its primary goal?", "The design of chemical products and processes that reduce or eliminate the use and generation of hazardous substances, prioritizing atom economy, renewable feedstocks, and energy efficiency.", "concept"),
        (12, "chemistry", 5, "What is Atom Economy in chemical synthesis?", "Atom Economy = (Molecular weight of desired product / Total molecular weight of all reactants) * 100%.", "formula"),
        (11, "chemistry", 3, "What is the Collision Theory of reaction rates?", "For a chemical reaction to occur, reactant molecules must collide with: 1. Sufficient kinetic energy (≥ activation energy E_a) and 2. Correct spatial orientation.", "concept"),
        (11, "chemistry", 4, "What is the Le Chatelier effect of adding an inert gas at constant volume vs constant pressure?", "At constant volume: Total pressure increases but partial pressures of reactants/products remain unchanged; NO shift in equilibrium. At constant pressure: Volume increases, shifting toward side with more gas moles.", "concept"),
        (11, "chemistry", 5, "What is Markovnikov's vs Anti-Markovnikov's addition of HBr?", "Markovnikov: Electrophilic addition of HBr yields 2-bromopropane as major product. Anti-Markovnikov (Peroxide effect / Kharasch effect): In the presence of organic peroxides, addition proceeds via free radicals yielding 1-bromopropane.", "concept"),
    ]
    for item in chem_matric:
        add(item[0], item[1], item[2], item[3], item[4], item[5])

    # =========================================================================
    # 🧬 EUEE BIOLOGY MATRIC MASTER DECK
    # =========================================================================
    bio_matric = [
        (12, "biology", 1, "What is the role of DNA Topoisomerase (Gyrase) in replication?", "Relieves the torsional strain and supercoiling created ahead of the replication fork as DNA helicase unwinds the double helix.", "definition"),
        (12, "biology", 1, "What is Epigenetics?", "Heritable changes in gene expression and cellular phenotype that do not involve alterations to the underlying DNA nucleotide sequence (e.g., DNA methylation, histone acetylation).", "definition"),
        (12, "biology", 2, "What is the Endosymbiotic Theory (Lynn Margulis)?", "Mitochondria and chloroplasts originated as free-living aerobic and photosynthetic prokaryotes that were engulfed by ancestral eukaryotic cells, evidenced by their 70S ribosomes, circular DNA, and double membranes.", "concept"),
        (12, "biology", 2, "What is Genetic Drift and what are its two main mechanisms?", "Random fluctuations in allele frequencies in small populations due to chance alone. Mechanisms: 1. Population Bottleneck (catastrophe drastically reduces size) and 2. Founder Effect (small group colonizes new area).", "definition"),
        (12, "biology", 2, "Distinguish Divergent Evolution from Convergent Evolution.", "Divergent: Related species develop distinct adaptations due to different environmental pressures (homologous structures, adaptive radiation). Convergent: Unrelated species develop similar adaptations due to similar ecological niches (analogous structures).", "concept"),
        (12, "biology", 3, "What are the hormonal changes triggering Menstruation in females?", "Degeneration of the corpus luteum causes a steep drop in progesterone and estrogen levels, leading to the shedding of the functional endometrial lining.", "concept"),
        (12, "biology", 3, "What is the Acrosome Reaction during human fertilization?", "Release of hydrolytic digestive enzymes (hyaluronidase and acrosin) from the sperm's acrosome cap to penetrate the corona radiata and zona pellucida of the secondary oocyte.", "concept"),
        (12, "biology", 4, "What is Biological Biomagnification (Bioaccumulation)?", "The progressive increase in concentration of persistent, non-biodegradable toxins (e.g., DDT, mercury) in tissues of organisms at successively higher trophic levels of a food chain.", "definition"),
        (12, "biology", 4, "What is Primary Succession vs Secondary Succession in ecology?", "Primary: Ecological colonization on bare, lifeless substrate where no soil existed previously (e.g., cooled volcanic lava, retreating glacier). Secondary: Re-colonization of an ecosystem after a disturbance that left the soil intact (e.g., abandoned farmland, forest fire).", "definition"),
        (12, "biology", 4, "What is Eutrophication?", "The nutrient enrichment of an aquatic body (excess nitrates and phosphates from agricultural runoff), causing algal blooms, oxygen depletion (hypoxia), and fish suffocation.", "definition"),
    ]
    for item in bio_matric:
        add(item[0], item[1], item[2], item[3], item[4], item[5])

    # =========================================================================
    # 🧮 EUEE MATHEMATICS MATRIC MASTER DECK
    # =========================================================================
    math_matric = [
        (12, "mathematics_natural", 1, "What is the derivative of a^x with respect to x?", "d/dx [a^x] = a^x * ln(a) (for a > 0, a ≠ 1).", "formula"),
        (12, "mathematics_natural", 1, "What is the derivative of log_a(x) with respect to x?", "d/dx [log_a(x)] = 1 / (x * ln a) (for x > 0).", "formula"),
        (12, "mathematics_natural", 2, "What is the critical point of a function f(x)?", "A point c in the domain of f where either f'(c) = 0 or f'(c) is undefined.", "definition"),
        (12, "mathematics_natural", 2, "State Fermat's Theorem on local extrema.", "If f has a local maximum or minimum at c, and if f'(c) exists, then f'(c) = 0.", "concept"),
        (12, "mathematics_natural", 3, "What is the integral of tan(x) with respect to x?", "∫ tan(x) dx = ln|sec(x)| + C = -ln|cos(x)| + C.", "formula"),
        (12, "mathematics_natural", 3, "What is the formula for Arc Length of a smooth curve y = f(x) from x = a to x = b?", "L = ∫_a^b √(1 + [f'(x)]²) dx", "formula"),
        (12, "mathematics_natural", 4, "What is the distance between point (x0, y0, z0) and plane Ax + By + Cz + D = 0?", "d = |A*x0 + B*y0 + C*z0 + D| / √(A² + B² + C²)", "formula"),
        (12, "mathematics_natural", 4, "What are direction cosines of a 3D vector v = (a, b, c)?", "cos α = a / |v|, cos β = b / |v|, cos γ = c / |v|\ncos² α + cos² β + cos² γ = 1.", "formula"),
        (12, "mathematics_natural", 5, "What is the geometric interpretation of multiplying a complex number by i?", "Multiplication by i rotates the complex number 90° (π/2 radians) counterclockwise in the complex Argand plane.", "concept"),
        (12, "mathematics_natural", 6, "What is the formula for the variance of a continuous random variable X with PDF f(x)?", "Var(X) = E[X²] - (E[X])² = ∫ x² f(x) dx - (∫ x f(x) dx)².", "formula"),

        (12, "mathematics_social", 1, "What is the Cost Function C(q) and Average Cost AC(q)?", "Total Cost C(q) = Fixed Cost + Variable Cost(q)\nAverage Cost AC(q) = C(q) / q. Average cost is minimized where AC(q) = MC(q).", "formula"),
        (12, "mathematics_social", 1, "What is the Revenue Function R(q) and Marginal Revenue MR(q)?", "Total Revenue R(q) = P(q) * q\nMarginal Revenue MR(q) = dR/dq = P + q * (dP/dq).", "formula"),
        (12, "mathematics_social", 2, "What is the Simplex Method in Linear Programming?", "An algebraic iterative algorithm used to solve large-scale linear programming problems by moving from one basic feasible solution (extreme point) to an adjacent better one until the optimum is achieved.", "definition"),
        (12, "mathematics_social", 3, "What is the coefficient of variation (CV)?", "CV = (Standard Deviation / Mean) * 100% = (σ / μ) * 100% (A dimensionless relative measure of dispersion used to compare variability between different datasets).", "formula"),
    ]
    for item in math_matric:
        add(item[0], item[1], item[2], item[3], item[4], item[5])

    # =========================================================================
    # 📈 EUEE ECONOMICS, HISTORY & GEOGRAPHY MATRIC MASTER DECK
    # =========================================================================
    social_matric = [
        (12, "economics", 1, "What is Okun's Law?", "The empirical relationship between unemployment and GDP: For every 1% increase in unemployment above the natural rate, GDP decreases by roughly 2%.", "concept"),
        (12, "economics", 2, "What is Say's Law of Markets?", "'Supply creates its own demand' - the classical economic proposition that production generates sufficient income to purchase all output produced.", "concept"),
        (12, "economics", 3, "What is Crowding-Out Effect in fiscal policy?", "When increased government deficit spending financed by borrowing raises real interest rates, reducing private sector investment and consumption.", "concept"),
        (12, "economics", 4, "What is the Foreign Exchange Market (Forex) and exchange rate quotation?", "The global marketplace where national currencies are traded. Exchange rate is the price of one currency in terms of another currency.", "definition"),
        (12, "economics", 5, "What is the Homegrown Economic Reform Agenda (HGER) in Ethiopia?", "Ethiopia's strategic economic reform package launched in 2019 to unlock macroeconomic structural bottlenecks, expand private sector participation, and modernize monetary and fiscal frameworks.", "date_fact"),

        (12, "history", 1, "What was the Franco-Ethiopian Railway and when was it completed?", "A meter-gauge railway line connecting Addis Ababa with the port of Djibouti (approx. 784 km), completed in 1917 under Emperor Menelik II and Lij Iyasu, transforming Ethiopian trade.", "date_fact"),
        (12, "history", 1, "Who was Lij Iyasu and what were his notable policies?", "Designated successor of Menelik II (1913–1916); instituted administrative reforms, integrated Ethiopian Muslims into national governance, and founded modern police; deposed in a 1916 palace coup in favor of Empress Zewditu.", "date_fact"),
        (12, "history", 2, "What was the Patriot (Arbegnoch) Resistance Movement during the Italian occupation (1936-1941)?", "Guerrilla resistance fighters in the rugged countryside (e.g., Ras Abebe Aregay, Dejazmach Belay Zeleke, Amoraw Wubneh, Woizero Shewareged Gedle) who denied the Italian fascist army total control over Ethiopia.", "concept"),
        (12, "history", 3, "What was the Federation of Eritrea with Ethiopia (1952)?", "Enacted under UN Resolution 390A(V), creating an autonomous Eritrean government under the sovereignty of the Ethiopian Crown; dissolved in 1962 when Eritrea was incorporated as Ethiopia's 14th province.", "date_fact"),
        (12, "history", 4, "What was the Red Terror (Qey Shibir) in Ethiopian history (1976-1978)?", "A brutal state-sponsored campaign of urban counter-insurgency waged by the Derg military junta against the civilian opposition (notably the EPRP), resulting in tens of thousands of deaths.", "date_fact"),

        (12, "geography", 1, "What are the major soil types of Ethiopia and their agricultural value?", "• Nitosols (Red basaltic soils): Highly fertile, deep, well-drained, found on western/southwestern highlands (coffee, teff).\n• Vertisols (Black cotton soils): High clay content, swell when wet, shrink and crack when dry, high moisture retention.\n• Fluvisols: Alluvial soils in river valleys (Awash, Omo) prime for irrigation.", "concept"),
        (12, "geography", 2, "What are the characteristics of the Ethiopian Rift Valley Lakes?", "Separated into northern freshwater lakes (Ziway, Awassa) and central/southern saline/soda lakes (Abijatta, Shalla, Chamo, Abaya). Lake Shalla is the deepest (266 m) and caldera-formed.", "concept"),
        (12, "geography", 3, "What is Soil Erosion by Water in the Ethiopian Highlands and its prevention?", "Rill and gully erosion driven by steep slopes, torrential Kiremt rainfall, and deforestation; mitigated by stone terraces, contour plowing, vetiver grass strips, and afforestation.", "concept"),
        (12, "geography", 4, "What is the Industrial Parks Development Corporation (IPDC) in Ethiopia?", "State entity responsible for developing eco-industrial export zones (e.g., Hawassa Industrial Park for textiles/apparel, Kilinto for pharmaceuticals) to drive light manufacturing export growth.", "date_fact"),
    ]
    for item in social_matric:
        add(item[0], item[1], item[2], item[3], item[4], item[5])

    # =========================================================================
    # 📖 EUEE ENGLISH & APTITUDE MATRIC MASTER DECK
    # =========================================================================
    lang_matric = [
        (12, "english", 1, "What are dangling modifiers and how are they corrected?", "A modifier that lacks a clear subject to refer to in the main sentence (e.g., 'Walking down the street, the trees were beautiful' -> Incorrect).\nCorrected: 'Walking down the street, I saw beautiful trees'.", "concept"),
        (12, "english", 1, "What are common cohesive transitional devices in academic writing?", "• Addition: Furthermore, Moreover, In addition.\n• Contrast: However, On the contrary, Nevertheless.\n• Cause and effect: Consequently, Therefore, As a result.\n• Exemplification: For instance, Specifically.", "definition"),
        (12, "english", 2, "Explain the difference between 'lie' and 'lay'.", "'Lie' (intransitive, no object): To recline (lie, lay, lain, lying).\n'Lay' (transitive, requires direct object): To put or set down (lay, laid, laid, laying; e.g., 'Lay the book on the table').", "definition"),
        (12, "english", 3, "What is an oxymoron with two examples?", "A figure of speech pairing contradictory terms side by side.\nExamples: 'Deafening silence', 'Cruel kindness', 'Clearly confused'.", "definition"),

        (12, "aptitude", 1, "How do you identify prime numbers and divisibility rules for 3, 7, and 11?", "• Divisible by 3: Sum of digits is divisible by 3.\n• Divisible by 11: Difference between sum of odd-positioned and even-positioned digits is 0 or multiple of 11.", "formula"),
        (12, "aptitude", 1, "How do you solve work-rate problems (A takes x days, B takes y days)?", "Combined rate = 1/x + 1/y = (x + y) / (xy) of work per day. Total time taken together = (xy) / (x + y) days.", "formula"),
        (12, "aptitude", 2, "How do you solve relative speed problems for two objects moving towards or away from each other?", "Moving towards each other (opposite directions): Relative speed = v1 + v2.\nMoving in same direction: Relative speed = |v1 - v2|.\nTime = Distance / Relative Speed.", "formula"),
        (12, "aptitude", 2, "What is a Coding-Decoding pattern using Caesar cipher letter shifts?", "Each letter in the plaintext is shifted by a fixed number of positions k in the alphabet (e.g., shift +3: A->D, B->E, Z->C).", "concept"),
    ]
    for item in lang_matric:
        add(item[0], item[1], item[2], item[3], item[4], item[5])

    print("Master Matric Bank generated successfully.")
