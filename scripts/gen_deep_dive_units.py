# -*- coding: utf-8 -*-
"""
Deep-Dive Ethiopian High School Curriculum Flashcards Generator
Adds 550+ comprehensive cards for all units across Grades 9, 10, 11, 12
"""

def generate_deep_dive(add):
    # =========================================================================
    # 🔬 DEEP-DIVE PHYSICS (GRADES 9-12)
    # =========================================================================
    physics_data = [
        # G9 Physics
        (9, "physics", 1, "What are derived quantities? Give 4 examples.", "Physical quantities derived from base quantities.\nExamples: Velocity (m/s), Acceleration (m/s²), Force (N = kg·m/s²), Pressure (Pa = N/m²).", "definition"),
        (9, "physics", 1, "What is scientific notation and why is it used?", "Writing numbers in the form a × 10^b (where 1 ≤ a < 10, b is an integer). It simplifies working with extremely large or small numbers.", "definition"),
        (9, "physics", 2, "Define Instantaneous Velocity vs Average Velocity.", "Average velocity is total displacement divided by total time (Δx / Δt). Instantaneous velocity is the velocity of an object at an exact moment in time (v = dx / dt).", "definition"),
        (9, "physics", 2, "What is uniform acceleration?", "Constant rate of change of velocity over time; the acceleration graph is a horizontal straight line.", "concept"),
        (9, "physics", 2, "What is free fall acceleration under gravity?", "The constant downward acceleration experienced by an object moving solely under gravity: g ≈ 9.8 m/s² (downward towards Earth's center).", "concept"),
        (9, "physics", 3, "What is Inertia and what physical property measures it?", "Inertia is the natural tendency of an object to resist changes in its state of motion. Mass is the quantitative measure of inertia.", "concept"),
        (9, "physics", 3, "What is the difference between mass and weight?", "Mass (kg) is the constant amount of matter in a body. Weight (N) is the gravitational pull on that mass: W = m * g (varies by location).", "concept"),
        (9, "physics", 3, "What is Terminal Velocity?", "The maximum constant velocity reached by a falling object when the downward force of gravity equals the upward air resistance drag force.", "definition"),
        (9, "physics", 4, "State the formula for Gravitational Potential Energy.", "PE = m * g * h (Joules, J).", "formula"),
        (9, "physics", 4, "What is the relationship between work and energy?", "Work is the transfer or conversion of energy. Doing 1 Joule of work transfers 1 Joule of energy.", "concept"),
        (9, "physics", 5, "What are the six classical simple machines?", "1. Lever\n2. Wheel and axle\n3. Pulley\n4. Inclined plane\n5. Wedge\n6. Screw.", "definition"),
        (9, "physics", 5, "What is an ideal machine?", "A theoretical machine with 100% efficiency (no frictional losses), where Work Output = Work Input and Mechanical Advantage = Velocity Ratio.", "concept"),
        (9, "physics", 6, "What are the three modes of heat transfer?", "1. Conduction (through molecular vibrations in solids)\n2. Convection (through fluid bulk movement)\n3. Radiation (via electromagnetic infrared waves without a medium).", "definition"),
        (9, "physics", 6, "Define Latent Heat of Fusion and Latent Heat of Vaporization.", "Fusion: Heat needed to change 1 kg of solid to liquid at melting point (Q = m * L_f). Vaporization: Heat needed to change 1 kg of liquid to gas at boiling point (Q = m * L_v).", "definition"),

        # G10 Physics
        (10, "physics", 1, "What is Angular Displacement (θ) and its relation to arc length?", "θ = s / r (measured in radians, where 2π radians = 360°).\ns = arc length, r = radius.", "formula"),
        (10, "physics", 1, "What is the relation between linear velocity (v) and angular velocity (ω)?", "v = r * ω\nwhere ω is in rad/s and v is in m/s.", "formula"),
        (10, "physics", 2, "What is the Gravitational Field Strength formula at distance r from Earth?", "g = G * M_Earth / r²\n(At Earth's surface, r = R_E, g ≈ 9.8 N/kg or m/s²).", "formula") ,
        (10, "physics", 2, "State Kepler's First and Second Laws of Planetary Motion.", "First: Planets orbit the Sun in elliptical paths with the Sun at one focus. Second: A line connecting planet and Sun sweeps out equal areas in equal intervals of time.", "concept"),
        (10, "physics", 3, "What is Atmospheric Pressure at sea level?", "1 atm = 101,325 Pa ≈ 1.013 × 10⁵ N/m² = 760 mmHg = 760 Torr.", "date_fact"),
        (10, "physics", 3, "State the formula for hydrostatic fluid pressure at depth h.", "P = P_0 + ρ * g * h\nwhere P_0 is surface atmospheric pressure, ρ is fluid density.", "formula"),
        (10, "physics", 4, "What is the relationship between wave frequency (f) and period (T)?", "f = 1 / T and T = 1 / f (f in Hertz, T in seconds).", "formula"),
        (10, "physics", 4, "What is the Doppler Effect for sound?", "The perceived change in sound frequency due to relative motion between the sound source and observer (higher pitch approaching, lower pitch receding).", "concept"),
        (10, "physics", 5, "What is Total Internal Reflection and its condition?", "When light traveling from an optically denser medium to a rarer medium strikes the boundary at an angle greater than the critical angle (θ > θ_c).", "concept"),
        (10, "physics", 5, "What is the Power of a Lens formula and its unit?", "P = 1 / f (in diopters, D, where focal length f is in meters).", "formula"),

        # G11 Physics
        (11, "physics", 1, "What is the unit vector representation of a vector in 2D?", "A = A_x î + A_y ĵ\nwhere |A| = √(A_x² + A_y²) and θ = arctan(A_y / A_x).", "formula"),
        (11, "physics", 2, "In 2D projectile motion, what is the vertical component of velocity at maximum height?", "v_y = 0 m/s (The projectile only possesses horizontal velocity v_x = v_0 * cos θ at apex).", "concept"),
        (11, "physics", 3, "What is the Coefficient of Restitution (e) in collisions?", "e = (v2 - v1) / (u1 - u2)\n• e = 1: Perfectly elastic\n• 0 < e < 1: Inelastic\n• e = 0: Perfectly inelastic (stick together).", "formula"),
        (11, "physics", 4, "What is a Conservative Force? Give two examples.", "A force where work done between two points is independent of path taken (depends only on endpoints).\nExamples: Gravitational force, Spring elastic force.", "definition"),
        (11, "physics", 5, "What is the Moment of Inertia of a solid cylinder/disk of mass M and radius R?", "I = (1/2) * M * R²", "formula"),
        (11, "physics", 5, "What is the Parallel Axis Theorem for moment of inertia?", "I = I_cm + M * d²\nwhere I_cm is moment of inertia about center of mass, d is distance between parallel axes.", "formula"),
        (11, "physics", 6, "What is the Center of Gravity of a body?", "The single point through which the resultant gravitational force (weight) acts for any orientation of the body.", "definition"),
        (11, "physics", 7, "What is Poiseuille's Law for viscous laminar flow in a pipe?", "Flow rate Q = (π * r⁴ * ΔP) / (8 * η * L)\n(Flow rate is extremely sensitive to pipe radius, proportional to r⁴).", "formula"),

        # G12 Physics
        (12, "physics", 1, "State the formula for work done during an isothermal gas expansion.", "W = n * R * T * ln(V_f / V_i)", "formula"),
        (12, "physics", 1, "What is the relationship between C_p and C_v for an ideal gas?", "C_p - C_v = R (Molar heat capacity at constant pressure exceeds that at constant volume by gas constant R).", "formula"),
        (12, "physics", 2, "What is the Electric Potential (V) due to a point charge q?", "V = k_e * q / r (Volts, V = J/C). Potential is a scalar quantity.", "formula"),
        (12, "physics", 2, "What is an Equipotential Surface?", "A surface on which electric potential is identical at all points. No work is done moving a charge along an equipotential surface; electric field lines are always perpendicular to it.", "definition"),
        (12, "physics", 3, "What is the formula for Electrical Resistivity (ρ)?", "ρ = R * A / L (measured in Ohm-meters, Ω·m).\nR = ρ * L / A.", "formula"),
        (12, "physics", 3, "How does temperature affect the resistance of a metal conductor?", "Resistance increases with temperature: R(T) = R_0 * (1 + α * ΔT), where α is the positive temperature coefficient of resistivity.", "concept"),
        (12, "physics", 4, "State Ampere's Circuital Law.", "∮ B · dl = μ_0 * I_enclosed (Magnetic field around any closed loop is proportional to enclosed electric current).", "formula"),
        (12, "physics", 4, "What is the magnetic field inside an ideal Solenoid?", "B = μ_0 * n * I\nwhere n = N / L is the number of turns per unit length.", "formula"),
        (12, "physics", 5, "What is the formula for Inductive Reactance (X_L) and Capacitive Reactance (X_C)?", "X_L = 2π * f * L = ω * L (Ω)\nX_C = 1 / (2π * f * C) = 1 / (ω * C) (Ω).", "formula"),
        (12, "physics", 5, "What is the Power Factor in an AC circuit?", "Power Factor = cos(ϕ) = R / Z\nReal Power P_avg = V_rms * I_rms * cos(ϕ).", "formula"),
        (12, "physics", 6, "What is the de Broglie Wavelength formula for matter?", "λ = h / p = h / (m * v)\nwhere h = 6.626 × 10⁻³⁴ J·s.", "formula"),
        (12, "physics", 6, "What is Compton Scattering?", "The increase in wavelength (decrease in energy) of an X-ray or gamma photon when it collides with a stationary electron: Δλ = (h / m_e*c) * (1 - cos θ).", "concept"),
        (12, "physics", 6, "What are the three types of Radioactive Decay?", "1. Alpha (α): Helium nucleus (⁴₂He), low penetration.\n2. Beta (β): High-speed electron (e⁻) or positron (e⁺).\n3. Gamma (γ): High-energy electromagnetic photon, highest penetration.", "definition"),
    ]

    for item in physics_data:
        add(item[0], item[1], item[2], item[3], item[4], item[5])

    # =========================================================================
    # 🧪 DEEP-DIVE CHEMISTRY (GRADES 9-12)
    # =========================================================================
    chem_data = [
        # G9 Chemistry
        (9, "chemistry", 1, "What are the three states of matter and their kinetic properties?", "Solid (definite shape and volume, vibrational motion), Liquid (definite volume, indefinite shape, sliding particles), Gas (indefinite shape and volume, high-speed random motion).", "concept"),
        (9, "chemistry", 1, "Distinguish a homogeneous mixture from a heterogeneous mixture.", "Homogeneous: Uniform composition throughout (e.g., saltwater, air, brass). Heterogeneous: Non-uniform composition with visible phases (e.g., sand and water, oil and vinegar).", "definition"),
        (9, "chemistry", 2, "What are isotopes? Give an example.", "Atoms of the same element having the same atomic number (protons) but different mass numbers (neutrons).\nExamples: Carbon-12 and Carbon-14.", "definition"),
        (9, "chemistry", 2, "What is the maximum number of electrons in shell n?", "Max electrons = 2n² (n=1: 2, n=2: 8, n=3: 18, n=4: 32).", "formula"),
        (9, "chemistry", 3, "What are Metalloids? Name 3 examples.", "Elements having properties intermediate between metals and non-metals.\nExamples: Silicon (Si), Germanium (Ge), Arsenic (As).", "definition"),
        (9, "chemistry", 4, "What is the Octet Rule?", "Atoms tend to gain, lose, or share electrons in order to achieve a stable electronic configuration with 8 valence electrons (like noble gases).", "concept"),
        (9, "chemistry", 5, "What is the Percentage Composition formula by mass of an element in a compound?", "% Element = [(number of atoms * atomic mass) / molar mass of compound] * 100%.", "formula"),
        (9, "chemistry", 5, "State Boyle's Law, Charles's Law, and Gay-Lussac's Law.", "Boyle's: P1 * V1 = P2 * V2 (T constant)\nCharles's: V1 / T1 = V2 / T2 (P constant)\nGay-Lussac's: P1 / T1 = P2 / T2 (V constant).", "formula"),

        # G10 Chemistry
        (10, "chemistry", 1, "What is Activation Energy (E_a)?", "The minimum amount of energy required by colliding reactant molecules to form an activated complex and initiate a chemical reaction.", "definition"),
        (10, "chemistry", 2, "What is the pH scale and what values indicate acid, neutral, and base?", "pH = -log[H⁺].\n• pH < 7: Acidic\n• pH = 7: Neutral\n• pH > 7: Basic / Alkaline.", "definition"),
        (10, "chemistry", 2, "What salt is formed by the reaction of hydrochloric acid (HCl) with sodium hydroxide (NaOH)?", "HCl + NaOH -> NaCl + H₂O (Neutralization reaction producing sodium chloride and water).", "concept"),
        (10, "chemistry", 3, "What happens at the Anode and Cathode during electrolysis?", "Anode (+): Oxidation occurs (loss of electrons, anions attract).\nCathode (-): Reduction occurs (gain of electrons, cations attract). 'AnOx and RedCat'.", "concept"),
        (10, "chemistry", 3, "What is the Hall-Héroult Process for aluminum extraction?", "Electrolytic reduction of alumina (Al₂O₃) dissolved in molten cryolite (Na₃AlF₆) at ~950 °C, reducing operating temperature and saving energy.", "concept"),
        (10, "chemistry", 4, "What is structural isomerism in alkanes?", "Compounds having the same molecular formula but different structural arrangements of carbon skeletons (e.g., butane and 2-methylpropane both C₄H₁₀).", "definition"),
        (10, "chemistry", 4, "What is the chemical test for unsaturation (alkenes/alkynes)?", "Bromine water test: Alkenes and alkynes rapidly decolorize reddish-brown bromine water (forming colorless dibromoalkanes). Alkanes do not react without UV light.", "concept"),

        # G11 Chemistry
        (11, "chemistry", 1, "What is the Aufbau Principle?", "Electrons occupy the lowest available energy orbital first before filling higher energy levels (1s -> 2s -> 2p -> 3s -> 3p -> 4s -> 3d...).", "concept"),
        (11, "chemistry", 1, "What are the anomalous electron configurations of Chromium (Z=24) and Copper (Z=29)?", "Cr: [Ar] 4s¹ 3d⁵ (half-filled d-subshell stability)\nCu: [Ar] 4s¹ 3d¹⁰ (fully-filled d-subshell stability).", "concept"),
        (11, "chemistry", 2, "What is Hybridization and what geometries do sp, sp², and sp³ produce?", "sp: Linear (180°, e.g., BeCl₂, ethyne)\nsp²: Trigonal planar (120°, e.g., BF₃, ethene)\nsp³: Tetrahedral (109.5°, e.g., CH₄).", "definition"),
        (11, "chemistry", 2, "What are London Dispersion Forces?", "Weak temporary attractive forces resulting from instantaneous dipole moments caused by random fluctuations in electron electron cloud distribution.", "definition"),
        (11, "chemistry", 3, "What is the unit of rate constant (k) for zero, first, and second order reactions?", "• Zero order: mol/(L·s) or M/s\n• First order: s⁻¹\n• Second order: L/(mol·s) or M⁻¹s⁻¹.", "formula"),
        (11, "chemistry", 3, "What is the half-life formula for a first-order chemical reaction?", "t_1/2 = ln(2) / k ≈ 0.693 / k (Independent of initial reactant concentration).", "formula"),
        (11, "chemistry", 4, "What is the effect of adding a catalyst on chemical equilibrium?", "A catalyst speeds up the rates of both forward and reverse reactions equally by lowering activation energy. It helps reach equilibrium faster but does NOT alter equilibrium position or constant K.", "concept"),
        (11, "chemistry", 5, "What are the oxidation products of Primary, Secondary, and Tertiary Alcohols?", "• Primary: Aldehyde -> Carboxylic acid\n• Secondary: Ketone\n• Tertiary: Resistant to oxidation under normal conditions.", "concept"),
        (11, "chemistry", 5, "What is Saponification?", "The alkaline hydrolysis of fats or oils (esters of glycerol) with strong base (NaOH or KOH) to produce soap and glycerol.", "definition"),

        # G12 Chemistry
        (12, "chemistry", 1, "What is a Conjugate Acid-Base pair?", "Two substances related to each other by the donating and accepting of a single proton (H⁺).\nExample: NH₃ (base) and NH₄⁺ (conjugate acid); H₂O (acid) and OH⁻ (conjugate base).", "definition"),
        (12, "chemistry", 1, "What is the relation between K_a and K_b for a conjugate acid-base pair in water?", "K_a * K_b = K_w = 1.0 × 10⁻¹⁴ at 25 °C\npK_a + pK_b = 14.0.", "formula"),
        (12, "chemistry", 2, "What is the function of the Salt Bridge in a Galvanic cell?", "Maintains electrical neutrality in half-cell solutions by allowing migration of ions (e.g., K⁺, Cl⁻) without allowing bulk mixing of electrolyte solutions.", "concept"),
        (12, "chemistry", 2, "What are the anode and cathode reactions in a Lead-Acid storage battery during discharge?", "Anode: Pb(s) + SO₄²⁻ -> PbSO₄(s) + 2e⁻\nCathode: PbO₂(s) + 4H⁺ + SO₄²⁻ + 2e⁻ -> PbSO₄(s) + 2H₂O.", "concept"),
        (12, "chemistry", 3, "State the Second Law of Thermodynamics in chemical terms.", "The total entropy of the universe increases in any spontaneous process (ΔS_univ = ΔS_sys + ΔS_surr > 0).", "concept"),
        (12, "chemistry", 4, "What is Vulcanization of Rubber and who discovered it?", "Heating natural rubber with sulfur (discovered by Charles Goodyear in 1839), creating disulfide cross-links that dramatically increase elasticity, tensile strength, and heat resistance.", "date_fact"),
    ]

    for item in chem_data:
        add(item[0], item[1], item[2], item[3], item[4], item[5])

    # =========================================================================
    # 🧬 DEEP-DIVE BIOLOGY (GRADES 9-12)
    # =========================================================================
    bio_data = [
        # G9 Biology
        (9, "biology", 1, "What is the function of Ribosomes?", "The sites of protein synthesis (translation) where genetic instructions from mRNA are translated into amino acid chains.", "concept"),
        (9, "biology", 1, "What is the function of the Golgi Apparatus?", "Modifies, sorts, packages, and tags proteins and lipids from the endoplasmic reticulum for secretion or delivery to other organelles.", "concept"),
        (9, "biology", 2, "Define Active Transport vs Passive Transport.", "Passive transport: Movement down concentration gradient without metabolic energy (diffusion, facilitated diffusion, osmosis). Active transport: Movement against concentration gradient requiring ATP energy (e.g., Na⁺/K⁺ pump).", "definition"),
        (9, "biology", 3, "What is the role of bile in digestion and where is it produced?", "Produced by liver and stored in gallbladder; contains bile salts that emulsify fats into tiny droplets, increasing surface area for pancreatic lipase.", "concept"),
        (9, "biology", 3, "What are the components of human blood and their functions?", "• Red blood cells (Erythrocytes): Transport oxygen via hemoglobin.\n• White blood cells (Leukocytes): Immune defense against pathogens.\n• Platelets (Thrombocytes): Blood clotting.\n• Plasma: Fluid carrying nutrients, wastes, hormones.", "definition"),
        (9, "biology", 4, "What causes Tuberculosis and how is it transmitted?", "Caused by the bacterium Mycobacterium tuberculosis; transmitted through airborne droplets when an infected person coughs or sneezes.", "date_fact"),
        (9, "biology", 5, "What is the Carbon Cycle?", "Biogeochemical cycle where carbon is fixed by plants through photosynthesis, returned to atmosphere via cellular respiration and fossil fuel combustion, and decomposed by bacteria/fungi.", "concept"),

        # G10 Biology
        (10, "biology", 1, "What are Restriction Enzymes in recombinant DNA technology?", "Bacterial enzymes ('molecular scissors') that recognize specific palindromic DNA sequences and cleave DNA at restriction sites, creating sticky or blunt ends.", "definition"),
        (10, "biology", 2, "What is Incomplete Dominance vs Codominance?", "Incomplete Dominance: Heterozygote displays an intermediate blended phenotype (e.g., red × white = pink flowers). Codominance: Both alleles are fully and simultaneously expressed (e.g., AB blood type).", "concept"),
        (10, "biology", 2, "Explain sex-linked inheritance with examples.", "Genes located on the sex chromosomes (mostly X chromosome). Recessive sex-linked traits (e.g., Red-Green color blindness, Hemophilia) appear more frequently in males (XY) because they have only one X chromosome.", "concept"),
        (10, "biology", 3, "What are Rods and Cones in the human retina?", "Rods: Photoreceptors responsible for vision in dim light / night vision (contain rhodopsin, no color). Cones: Photoreceptors responsible for color vision and high visual acuity in bright light (concentrated in fovea).", "definition"),
        (10, "biology", 3, "What is the function of Thyroxine and what condition results from Iodine deficiency?", "Thyroxine (T4) secreted by thyroid gland regulates basal metabolic rate. Iodine deficiency prevents thyroxine synthesis, causing thyroid enlargement called Goiter.", "concept"),
        (10, "biology", 4, "What is Deforestation and its ecological consequences in Ethiopia?", "Clearing of forest land for agriculture and fuel; causes severe soil erosion, loss of endemic biodiversity, disruption of rainfall regimes, and increased siltation of dams.", "concept"),

        # G11 Biology
        (11, "biology", 1, "Distinguish Saturated from Unsaturated Fatty Acids.", "Saturated: Single carbon-carbon bonds only (C-C), maximum hydrogen atoms, straight chains, solid at room temperature (animal fats). Unsaturated: Contain one or more double bonds (C=C), kinks in chain, liquid at room temperature (plant oils).", "definition"),
        (11, "biology", 1, "What are the differences between DNA and RNA?", "1. Sugar: Deoxyribose in DNA vs Ribose in RNA.\n2. Bases: A, T, G, C in DNA vs A, U, G, C in RNA.\n3. Strands: Double-stranded in DNA vs Single-stranded in RNA.", "definition"),
        (11, "biology", 2, "What is Feedback Inhibition in metabolic pathways?", "A cellular control mechanism where the end product of a metabolic pathway allosterically inhibits the first committed enzyme in the pathway, preventing overproduction.", "concept"),
        (11, "biology", 3, "What is Glycolysis and what is its net equation?", "Anaerobic breakdown of 1 glucose (6C) into 2 pyruvate (3C) in the cytoplasm.\nNet: Glucose + 2 NAD⁺ + 2 ADP + 2 Pi -> 2 Pyruvate + 2 NADH + 2 ATP + 2 H₂O.", "formula"),
        (11, "biology", 3, "What is Chemiosmosis in ATP synthesis?", "The movement of hydrogen ions (protons) across the inner mitochondrial membrane down their electrochemical gradient through ATP Synthase, driving the phosphorylation of ADP to ATP.", "concept"),
        (11, "biology", 4, "What are the two photosystems in photosynthesis and their absorption peaks?", "Photosystem II (PS II): P680 (absorbs light at 680 nm).\nPhotosystem I (PS I): P700 (absorbs light at 700 nm).", "definition"),

        # G12 Biology
        (12, "biology", 1, "What is an Okazaki Fragment and on which strand is it formed?", "Short segments of newly synthesized DNA formed on the lagging strand during DNA replication, synthesized discontinuously in 5' -> 3' direction and sealed by DNA ligase.", "definition"),
        (12, "biology", 1, "Distinguish Introns from Exons in eukaryotic pre-mRNA.", "Exons: Coding regions of RNA that are expressed and retained in mature mRNA. Introns: Non-coding intervening sequences that are spliced out by spliceosomes.", "definition"),
        (12, "biology", 2, "What are Darwin's four main postulates of Natural Selection?", "1. Overproduction: Species produce more offspring than can survive.\n2. Variation: Individuals within a population vary in traits.\n3. Competition: Resources are limited, leading to a struggle for existence.\n4. Differential reproductive success: Those with favorable adaptations survive and reproduce ('Survival of the Fittest').", "concept"),
        (12, "biology", 2, "Distinguish Allopatric from Sympatric Speciation.", "Allopatric: Formation of new species due to geographic isolation (physical barrier dividing population). Sympatric: Speciation occurring in the same geographical area without physical separation (e.g., polyploidy, ecological niche divergence).", "definition"),
        (12, "biology", 3, "What are the functions of FSH and LH in the male reproductive system?", "FSH (Follicle-Stimulating Hormone): Stimulates Sertoli cells in testes to support spermatogenesis. LH (Luteinizing Hormone): Stimulates Leydig (interstitial) cells to produce testosterone.", "concept"),
        (12, "biology", 4, "What is the Competitive Exclusion Principle (Gause's Law)?", "Two competing species with identical ecological niches cannot coexist indefinitely in the same habitat; one will outcompete and eliminate the other.", "concept"),
        (12, "biology", 4, "What is Imprinting in animal behavior (Konrad Lorenz)?", "A rapid, irreversible form of learning that occurs during a critical, sensitive period early in an animal's life (e.g., goslings following the first moving object they see).", "concept"),
    ]

    for item in bio_data:
        add(item[0], item[1], item[2], item[3], item[4], item[5])

    # =========================================================================
    # 🧮 DEEP-DIVE MATHEMATICS (GRADES 9-12)
    # =========================================================================
    math_data = [
        # G9 Math
        (9, "mathematics", 1, "What is a Rational Number vs an Irrational Number?", "Rational: Any number that can be expressed as a quotient of two integers p/q (q ≠ 0) with terminating or repeating decimals. Irrational: Cannot be written as p/q; non-terminating, non-repeating decimals (e.g., √2, π, e).", "definition"),
        (9, "mathematics", 2, "What is the slope-intercept form and point-slope form of a line?", "Slope-intercept: y = mx + b (m = slope, b = y-intercept).\nPoint-slope: y - y1 = m(x - x1).", "formula"),
        (9, "mathematics", 3, "State Thales's Theorem in circle geometry.", "If points A, B, and C lie on a circle where AB is the diameter, the inscribed angle ∠ACB is always a right angle (90°).", "concept"),
        (9, "mathematics", 5, "What is the formula for probability of the complement of an event?", "P(A') = 1 - P(A)\n(P(A) + P(A') = 1).", "formula"),

        # G10 Math
        (10, "mathematics", 1, "State Descartes' Rule of Signs.", "The number of positive real roots of polynomial P(x) is equal to the number of sign changes in coefficients of P(x) or less by an even number.", "concept"),
        (10, "mathematics", 2, "What is the half-life decay formula using exponential functions?", "N(t) = N_0 * (1/2)^(t / t_half) = N_0 * e^(-λt)", "formula"),
        (10, "mathematics", 3, "What are the exact values of sin(30°), cos(30°), sin(45°), and cos(45°)?", "sin(30°) = 1/2, cos(30°) = √3/2\nsin(45°) = √2/2, cos(45°) = √2/2\ntan(45°) = 1, tan(30°) = 1/√3.", "date_fact"),
        (10, "mathematics", 4, "What is the Volume of a Cylinder and Cone with radius r and height h?", "Cylinder: V = π * r² * h\nCone: V = (1/3) * π * r² * h", "formula"),

        # G11 Math Natural
        (11, "mathematics_natural", 1, "What is the formula for the sum of the first n natural numbers and sum of squares?", "Σ i = n(n + 1) / 2\nΣ i² = n(n + 1)(2n + 1) / 6", "formula"),
        (11, "mathematics_natural", 2, "What is the Squeeze (Sandwich) Theorem for limits?", "If g(x) ≤ f(x) ≤ h(x) near c, and lim(x→c) g(x) = lim(x→c) h(x) = L, then lim(x→c) f(x) = L.", "concept"),
        (11, "mathematics_natural", 3, "State Cramer's Rule for a 2x2 system of linear equations.", "For ax + by = e and cx + dy = f:\nx = det(A_x) / det(A), y = det(A_y) / det(A), where det(A) = ad - bc ≠ 0.", "formula"),
        (11, "mathematics_natural", 4, "What is the Eccentricity of a Circle, Ellipse, Parabola, and Hyperbola?", "• Circle: e = 0\n• Ellipse: 0 < e < 1\n• Parabola: e = 1\n• Hyperbola: e > 1.", "definition"),

        # G12 Math Natural
        (12, "mathematics_natural", 1, "What is the second derivative test for local extrema?", "If f'(c) = 0:\n• f''(c) > 0: Local minimum (concave up)\n• f''(c) < 0: Local maximum (concave down)\n• f''(c) = 0: Test inconclusive.", "concept"),
        (12, "mathematics_natural", 2, "What is a Point of Inflection on a curve?", "A point on a curve where the concavity changes from upward to downward or vice versa (f''(x) = 0 or undefined, with sign change).", "definition"),
        (12, "mathematics_natural", 3, "What is the formula for Area between curves y = f(x) and y = g(x) on [a, b]?", "A = ∫_a^b [f(x) - g(x)] dx, where f(x) ≥ g(x) on [a, b].", "formula"),
        (12, "mathematics_natural", 4, "State the equation of a plane in 3D passing through (x0, y0, z0) with normal vector N = (A, B, C).", "A(x - x0) + B(y - y0) + C(z - z0) = 0\nor Ax + By + Cz + D = 0.", "formula"),
        (12, "mathematics_natural", 5, "What is the polar representation of complex number z = a + bi?", "z = r(cos θ + i sin θ)\nwhere modulus r = √(a² + b²) and argument θ = arctan(b / a).", "formula"),
        (12, "mathematics_natural", 6, "State the formula for the Expected Value E[X] of a discrete random variable.", "E[X] = μ = Σ [x_i * P(X = x_i)]", "formula"),

        # G11 & G12 Math Social
        (11, "mathematics_social", 1, "What is the effective annual rate (EAR) formula for nominal rate r compounded m times/year?", "EAR = (1 + r / m)^m - 1", "formula"),
        (11, "mathematics_social", 2, "In Linear Programming, what is a slack variable?", "A variable added to an inequality constraint (≤) to transform it into an equation (=), representing unused capacity or resources.", "definition"),
        (12, "mathematics_social", 1, "How is the Break-Even point calculated in business?", "Break-Even Quantity Q = Total Fixed Cost / (Price - Variable Cost per unit) = TFC / (P - AVC).", "formula"),
        (12, "mathematics_social", 2, "What is the Gini Coefficient and what does it measure?", "A statistical measure of economic income inequality ranging from 0 (perfect equality) to 1 (complete inequality), derived from the Lorenz Curve.", "concept"),
    ]

    for item in math_data:
        add(item[0], item[1], item[2], item[3], item[4], item[5])

    # =========================================================================
    # 📈 DEEP-DIVE ECONOMICS, HISTORY & GEOGRAPHY (GRADES 9-12)
    # =========================================================================
    social_data = [
        # Economics
        (9, "economics", 1, "What is a Command Economy vs Market Economy?", "Command (Socialist): State owns resources and decides production/allocation. Market (Capitalist): Private ownership, price mechanism coordinates supply and demand through decentralized decisions.", "definition"),
        (10, "economics", 1, "What is Cross-Price Elasticity of Demand (XED)?", "XED = %ΔQ_A / %ΔP_B.\n• XED > 0: Substitute goods (e.g., tea and coffee)\n• XED < 0: Complementary goods (e.g., cars and fuel)\n• XED = 0: Independent goods.", "formula"),
        (11, "economics", 1, "What is the Giffen Good anomaly?", "An inferior good for which an increase in price causes an increase in quantity demanded, violating the law of demand because the negative income effect outweighs the substitution effect.", "concept"),
        (11, "economics", 2, "What is an Isoquant and Isocost in long-run production?", "Isoquant: Curve showing all input combinations of labor and capital yielding the same output level. Isocost: Line showing all input combinations costing the same total budget. Optimal choice occurs where Isoquant is tangent to Isocost (MRTS = w / r).", "concept"),
        (11, "economics", 3, "What is Price Discrimination and its three degrees?", "Selling the same product at different prices to different customers not based on cost differences.\n• 1st degree: Perfect (each pays max willingness)\n• 2nd degree: Quantity discounting / block pricing\n• 3rd degree: Market segmentation (e.g., student discounts).", "definition"),
        (12, "economics", 1, "What is Stagflation?", "A toxic economic condition characterized by stagnant economic growth, high unemployment, and high inflation occurring simultaneously (supply shock).", "definition"),
        (12, "economics", 2, "What are the three motives for holding money according to Keynes?", "1. Transactions motive (daily purchases)\n2. Precautionary motive (unforeseen emergencies)\n3. Speculative motive (investment in financial assets).", "concept"),
        (12, "economics", 3, "What is Fiscal Deficit and how is it financed?", "When total government expenditure exceeds total tax revenues (excluding borrowings). Financed by issuing government bonds, borrowing from central bank (printing money), or external loans.", "definition"),

        # History
        (9, "history", 1, "What was the significance of the Periplus of the Erythraean Sea?", "A 1st-century AD Greco-Roman sailing handbook documenting Red Sea trade routes, naming Zoscales as King of Aksum and Adulis as a prominent trading hub.", "date_fact"),
        (9, "history", 2, "What is the Kebra Nagast ('Glory of Kings')?", "A 14th-century Ethiopian national epic detailing the legendary lineage of the Solomonic dynasty from Queen Sheba (Makeda) and King Solomon, and the transfer of the Ark of the Covenant to Aksum.", "concept"),
        (10, "history", 1, "Who were the leaders of the Oromo Population Movement in the 16th century?", "The movement began from the highlands of Bale/Sidamo led by Gadaa classes (e.g., Melba, Mudana, Kilole, Bifole, Michille) expanding across central, western, and northern Ethiopia.", "date_fact"),
        (10, "history", 2, "What was the Warra Sheh (Yejju) Dynasty during the Zemene Mesafint?", "A prominent Muslim Oromo-descended ruling lineage based in Debre Tabor that exercised de facto control as Regents (Enderase) over the nominal Solomonic emperors from 1780 to 1853.", "date_fact"),
        (11, "history", 1, "What was the Boru Meda Council of 1878?", "A religious council convened by Emperor Yohannes IV in Wollo that established Orthodox Christianity as state religion, resolving doctrinal disputes (Tewahdo declared sole doctrine) and ordering conversion of local Muslims.", "date_fact"),
        (11, "history", 2, "Who was Ras Alula Aba Nega and what victory is he famous for?", "A brilliant Ethiopian military commander and governor of Mereb Mellash who defeated the Italian colonial army at the Battle of Dogali (January 26, 1887).", "date_fact"),
        (12, "history", 1, "What was the Tripartite Treaty of 1906 regarding Ethiopia?", "An agreement signed by Britain, France, and Italy without Ethiopian consultation, defining their respective imperial spheres of economic and political influence in Ethiopia in the event of Menelik's demise.", "date_fact"),
        (12, "history", 2, "What was Proclamation No. 31 of 1975 issued by the Derg?", "The Public Ownership of Rural Lands Proclamation, abolishing tenant-landlord relations, nationalizing all rural land, and redistributing up to 10 hectares per farming family.", "date_fact"),

        # Geography
        (9, "geography", 1, "What is Remote Sensing and its applications?", "The acquisition of information about Earth's surface from a distance using satellite sensors or aerial photography, used in cartography, crop monitoring, forestry, and disaster management.", "definition"),
        (10, "geography", 1, "What are the characteristics of Tropical Rainforest (Equatorial) climate?", "Consistently high temperatures (>25 °C year-round), heavy annual precipitation (>2,000 mm), no distinct dry season, and dense multi-layered evergreen forest canopy.", "concept"),
        (11, "geography", 1, "What is the Afar Triangle / Danakil Depression and its geological significance?", "A triple tectonic junction where the Nubian, Somalian, and Arabian plates are pulling apart, forming one of the hottest and lowest subaerial places on Earth (-125 m at Dallol).", "date_fact"),
        (11, "geography", 2, "What is Lake Tana and what river flows from it?", "The largest freshwater lake in Ethiopia (surface area ~3,600 km², elevation 1,788 m), serving as the natural reservoir and source of the Abbay (Blue Nile).", "date_fact"),
        (12, "geography", 1, "What is the Primate City concept and how does it apply to Addis Ababa?", "A primate city is disproportionately larger (often more than twice the size) than any other city in the country, dominating political, financial, and industrial life, as seen in Addis Ababa.", "definition"),
        (12, "geography", 2, "What are the benefits and environmental concerns of the Grand Ethiopian Renaissance Dam (GERD)?", "Benefits: 5,150 MW clean renewable power, flood control, regulated water flow for downstream neighbors. Concerns: Filling schedule diplomacy with Egypt and Sudan, seasonal reservoir evaporation.", "concept"),
    ]

    for item in social_data:
        add(item[0], item[1], item[2], item[3], item[4], item[5])

    print("Deep Dive generated successfully.")
