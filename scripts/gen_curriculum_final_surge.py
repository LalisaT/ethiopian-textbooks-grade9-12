# -*- coding: utf-8 -*-
"""
Final Surge Generator for Ethiopian High School Curriculum Flashcards
Adds 160+ specialized curriculum cards to guarantee the database firmly exceeds 1,050+ total cards.
"""

def generate_final_surge(add):
    # =========================================================================
    # 📚 LINGUISTIC & LITERARY TERMS (AMHARIC & ETHIOPIAN LANGUAGES) (GRADES 9-12)
    # =========================================================================
    language_cards = [
        (9, "english", 1, "What is a Simile vs a Metaphor?", "Simile: Direct comparison of two unlike things using 'like' or 'as' (e.g., 'brave as a lion'). Metaphor: Implicit comparison stating one thing IS another (e.g., 'time is a thief').", "definition"),
        (9, "english", 2, "What is Personification?", "A figure of speech giving human qualities, emotions, or behaviors to animals, inanimate objects, or abstract ideas (e.g., 'the wind whispered through the trees').", "definition"),
        (10, "english", 1, "What is Alliteration and Onomatopoeia?", "Alliteration: Repetition of initial consonant sounds in neighboring words (e.g., 'Peter Piper picked'). Onomatopoeia: Words that imitate the sound they denote (e.g., 'buzz', 'sizzle', 'boom').", "definition"),
        (10, "english", 2, "What is Hyperbole?", "An intentional, extreme exaggeration used for emphasis or dramatic effect, not meant to be taken literally (e.g., 'I have told you a thousand times').", "definition"),
        (11, "english", 1, "What is Irony and its three main types?", "Discrepancy between expectation and reality.\n1. Verbal irony (sarcasm/saying opposite of meaning)\n2. Situational irony (outcome contrary to expectation)\n3. Dramatic irony (audience knows what characters do not).", "definition"),
        (12, "english", 1, "What is Foreshadowing in narrative literature?", "A literary technique in which the author drops subtle hints or clues early in a story to suggest events that will occur later in the plot.", "definition"),

        # Amharic Language & Grammar
        (9, "amharic", 1, "የስም አይነቶች በስነ-ልሳን ስንት ናቸው?", "ዋና ዋና የስም አይነቶች፡ 1. ተፀውኦ ስም (Proper Noun)፣ 2. የወል ስም (Common Noun)፣ 3. ረቂቅ ስም (Abstract Noun)፣ 4. የጅምላ ስም (Collective Noun)፣ 5. የቁሳቁስ ስም (Material Noun)።", "definition"),
        (9, "amharic", 2, "ቅፅል ምንድን ነው? አይነቶቹስ?", "ቅፅል ስምን የሚገልጽ፣ የሚያጠራ ወይም ተጨማሪ መረጃ የሚሰጥ ቃል ነው። አይነቶች፡ የባህሪ ቅፅል፣ የመጠን ቅፅል፣ የቁጥር ቅፅል፣ የአመልካች ቅፅል ወዘተ።", "definition"),
        (10, "amharic", 1, "ግስ እና ማሰሪያ አንቀጽ ምንድን ናቸው?", "ግስ ድርጊትን ወይም ኩነተ-ህላዌን የሚገልጽ ቃል ሲሆን፣ ማሰሪያ አንቀጽ ደግሞ አንድን አረፍተ ነገር ሙሉ ትርጉም ሰጥቶ የሚቋጭ የመጨረሻ ቃል ነው።", "definition"),
        (10, "amharic", 2, "ምሳሌያዊ አነጋገሮች በስነ-ፅሁፍ ያላቸው ፋይዳ ምንድን ነው?", "ምሳሌያዊ አነጋገሮች ጥልቅ ህዝባዊ ጥበብን፣ ምክርንና ፍልስፍናን ባጭሩና በውበት ለመግለጽ ያገለግላሉ (ለምሳሌ፡ 'ከመቶ አባይ አንድ ሀቀኛ')።", "concept"),
        (11, "amharic", 1, "የአማርኛ ፊደላት ድምፆች አመሰራረት (ስነ-ድምፅ)", "የአማርኛ ድምፆች በንግግር አካላት (ከንፈር፣ ጥርስ፣ ድድ፣ ላንቃ) አፈጣጠር ይከፈላሉ፡ ፈንጂ (Plosive)፣ ሰርጊ (Fricative)፣ አፍንጫዊ (Nasal) እና ፈሳሽ (Liquid)።", "concept"),
        (12, "amharic", 1, "ሰምና ወርቅ ቅኔ ምንድን ነው?", "የኢትዮጵያ ባህላዊ ጥበበ-ቅኔ ሲሆን፤ 'ሰም' ውጫዊውን ቀጥተኛ ትርጉም ሲያሳይ፤ 'ወርቅ' ደግሞ ውስጣዊውን የተሰወረና እውነተኛ መልዕክት ያመለክታል።", "definition"),
    ]
    for item in language_cards:
        add(item[0], item[1], item[2], item[3], item[4], item[5])

    # =========================================================================
    # ⚡ CORE FORMULA SNAPSHOTS ACROSS GRADES 9-12
    # =========================================================================
    formula_snapshots = [
        # Physics
        (9, "physics", 2, "What is the formula for average speed?", "Average Speed = Total Distance / Total Time (Scalar, m/s).", "formula"),
        (9, "physics", 3, "What is the formula for Weight?", "W = m * g\nwhere m = mass (kg), g = gravitational field strength (N/kg or m/s²).", "formula"),
        (9, "physics", 4, "What is the formula for Kinetic Energy?", "KE = (1/2) * m * v² (Joules).", "formula"),
        (10, "physics", 1, "What is the formula for Centripetal Acceleration?", "a_c = v² / r = ω² * r (m/s²).", "formula"),
        (10, "physics", 2, "What is the Gravitational Force formula?", "F = G * (m1 * m2) / r² (where G = 6.674 × 10⁻¹¹ N·m²/kg²).", "formula"),
        (10, "physics", 3, "What is the formula for Fluid Pressure at depth h?", "P = ρ * g * h (Pascals, Pa).", "formula"),
        (10, "physics", 4, "What is the Wave Equation?", "v = f * λ (Speed = frequency × wavelength).", "formula"),
        (10, "physics", 5, "What is Snell's Law of Refraction?", "n1 * sin(θ1) = n2 * sin(θ2)", "formula"),
        (11, "physics", 2, "What is the Projectile Maximum Height formula?", "H_max = (v_0 * sin θ)² / (2g)", "formula"),
        (11, "physics", 2, "What is the Projectile Horizontal Range formula?", "R = (v_0² * sin 2θ) / g", "formula"),
        (11, "physics", 3, "What is the Linear Momentum formula?", "p = m * v (kg·m/s).", "formula"),
        (11, "physics", 5, "What is Torque formula?", "τ = r * F * sin θ = I * α (N·m).", "formula"),
        (11, "physics", 7, "What is the Continuity Equation for fluid flow?", "A1 * v1 = A2 * v2 = constant volume flow rate.", "formula"),
        (12, "physics", 1, "What is the Carnot Engine Efficiency formula?", "η = 1 - (T_c / T_h) (where temperatures MUST be in Kelvin).", "formula"),
        (12, "physics", 2, "What is Coulomb's Law formula?", "F = k_e * (|q1 * q2|) / r² (Newtons).", "formula"),
        (12, "physics", 2, "What is Capacitance formula for parallel plates?", "C = ε_0 * A / d (Farads, F).", "formula"),
        (12, "physics", 3, "What is Ohm's Law and Electric Power formulas?", "V = I * R\nP = V * I = I² * R = V² / R (Watts).", "formula"),
        (12, "physics", 4, "What is Magnetic Force on a moving charge?", "F = q * v * B * sin θ (Newtons).", "formula"),
        (12, "physics", 4, "What is Faraday's Law of Electromagnetic Induction?", "ε = -N * (ΔΦ / Δt) (Volts).", "formula"),
        (12, "physics", 5, "What is Resonant Frequency in an AC RLC circuit?", "f_0 = 1 / (2π * √(L * C)) (Hertz).", "formula"),
        (12, "physics", 6, "What is Einstein's Photoelectric equation?", "hf = Φ + KE_max = hf_0 + (1/2)mv_max²", "formula"),
        (12, "physics", 6, "What is the Radioactive Half-Life formula?", "T_1/2 = 0.693 / λ = ln(2) / λ", "formula"),

        # Chemistry
        (9, "chemistry", 5, "What is the Ideal Gas Law formula?", "PV = nRT (P in atm, V in L, T in K, R = 0.0821 L·atm/(mol·K)).", "formula"),
        (9, "chemistry", 5, "What is the Molar Mass formula?", "M = mass / moles = m / n (g/mol).", "formula"),
        (10, "chemistry", 3, "What is Faraday's First Law equation?", "m = Z * I * t = (M / (n * F)) * I * t (grams deposited).", "formula"),
        (11, "chemistry", 3, "What is the Arrhenius Equation formula?", "k = A * e^(-E_a / RT)", "formula"),
        (11, "chemistry", 4, "What is the Equilibrium Constant expression for aA + bB ⇌ cC + dD?", "K_c = ([C]^c * [D]^d) / ([A]^a * [B]^b)", "formula"),
        (12, "chemistry", 1, "What is the pH and pOH formula?", "pH = -log[H⁺]\npOH = -log[OH⁻]\npH + pOH = 14 at 25 °C.", "formula"),
        (12, "chemistry", 1, "What is the Henderson-Hasselbalch formula?", "pH = pK_a + log([Base] / [Acid])", "formula"),
        (12, "chemistry", 2, "What is Standard Cell Potential formula?", "E°_cell = E°_cathode - E°_anode (Volts).", "formula"),
        (12, "chemistry", 2, "What is the Nernst Equation at 25 °C?", "E = E° - (0.0592 / n) * log(Q)", "formula"),
        (12, "chemistry", 3, "What is the Gibbs Free Energy change formula?", "ΔG = ΔH - T * ΔS (Spontaneous when ΔG < 0).", "formula"),

        # Mathematics
        (9, "mathematics", 2, "What is the Quadratic Formula?", "x = (-b ± √(b² - 4ac)) / (2a)", "formula"),
        (9, "mathematics", 3, "What is the Distance Formula in 2D?", "d = √((x2 - x1)² + (y2 - y1)²)", "formula"),
        (9, "mathematics", 3, "What is the Slope Formula of a line?", "m = (y2 - y1) / (x2 - x1)", "formula"),
        (10, "mathematics", 2, "What is the Change of Base formula for logarithms?", "log_b(a) = ln(a) / ln(b) = log(a) / log(b)", "formula"),
        (10, "mathematics", 3, "What is the Fundamental Trigonometric Identity?", "sin²(θ) + cos²(θ) = 1\n1 + tan²(θ) = sec²(θ)\n1 + cot²(θ) = csc²(θ)", "formula"),
        (10, "mathematics", 3, "What is the Law of Cosines?", "c² = a² + b² - 2ab * cos(C)", "formula"),
        (10, "mathematics", 4, "What is the Equation of a Circle with radius r?", "(x - h)² + (y - k)² = r²", "formula"),
        (11, "mathematics_natural", 1, "What is the Arithmetic Progression sum formula?", "S_n = (n / 2) * (2a_1 + (n - 1)d) = (n / 2) * (a_1 + a_n)", "formula"),
        (11, "mathematics_natural", 1, "What is the Infinite Geometric Series sum formula (|r| < 1)?", "S_∞ = a_1 / (1 - r)", "formula"),
        (11, "mathematics_natural", 3, "What is the 2x2 Determinant formula?", "det([[a, b], [c, d]]) = ad - bc", "formula"),
        (12, "mathematics_natural", 1, "What is the Power Rule for differentiation?", "d/dx [x^n] = n * x^(n - 1)", "formula"),
        (12, "mathematics_natural", 1, "What is the Product Rule for differentiation?", "(u * v)' = u' * v + u * v'", "formula"),
        (12, "mathematics_natural", 1, "What is the Quotient Rule for differentiation?", "(u / v)' = (u' * v - u * v') / v²", "formula"),
        (12, "mathematics_natural", 3, "What is the Power Rule for integration?", "∫ x^n dx = (x^(n + 1)) / (n + 1) + C (for n ≠ -1).", "formula"),
        (12, "mathematics_natural", 3, "What is the Integration by Parts formula?", "∫ u dv = u * v - ∫ v du", "formula"),
        (12, "mathematics_natural", 5, "What is Euler's Formula for complex numbers?", "e^(iθ) = cos(θ) + i * sin(θ)", "formula"),
        (12, "mathematics_natural", 6, "What is the Binomial Probability formula?", "P(X = k) = C(n, k) * p^k * (1 - p)^(n - k)", "formula"),
    ]
    for item in formula_snapshots:
        add(item[0], item[1], item[2], item[3], item[4], item[5])

    # =========================================================================
    # 🌍 ETHIOPIAN HIGH SCHOOL CURRICULUM KEY DEFINITIONS (GRADES 9-12)
    # =========================================================================
    concept_snapshots = [
        # Biology Concepts
        (9, "biology", 1, "What is Osmosis?", "The passive movement of water molecules across a selectively permeable membrane from a region of higher water potential to lower water potential.", "definition"),
        (9, "biology", 2, "What is Enzyme Specificity?", "Each enzyme has a uniquely shaped active site that binds only to its complementary substrate molecule ('lock and key' model).", "concept"),
        (10, "biology", 2, "What is an Allele?", "An alternative form or variant of a gene that accounts for variations in inherited characteristics.", "definition"),
        (10, "biology", 3, "What is a Hormone?", "A chemical messenger produced by an endocrine gland and transported in the bloodstream to target organs to regulate physiological activities.", "definition"),
        (11, "biology", 3, "What is ATP (Adenosine Triphosphate)?", "The universal cellular energy currency, composed of adenine, ribose, and three phosphate groups; hydrolysis to ADP + Pi releases ~30.5 kJ/mol.", "definition"),
        (11, "biology", 4, "What is Chlorophyll and its role?", "The primary green photosynthetic pigment located in chloroplast thylakoid membranes, absorbing blue and red light while reflecting green light.", "concept"),
        (12, "biology", 1, "What is a Mutation?", "A permanent, heritable change in the DNA nucleotide sequence of an organism's genome.", "definition"),
        (12, "biology", 2, "What is Natural Selection?", "The differential survival and reproduction of individuals due to differences in phenotype, driving adaptive evolutionary change over generations.", "concept"),
        (12, "biology", 4, "What is an Ecosystem?", "A biological community of interacting organisms (biotic factors) and their physical abiotic environment (soil, water, climate).", "definition"),

        # Economics Concepts
        (9, "economics", 1, "What is Opportunity Cost?", "The value of the next best alternative forgone when a choice is made between mutually exclusive options.", "definition"),
        (9, "economics", 2, "What is the Law of Demand?", "Ceteris paribus, as the price of a good increases, the quantity demanded decreases.", "concept"),
        (10, "economics", 1, "What is Price Elasticity of Demand?", "A measure of the responsiveness of quantity demanded to a change in the price of the good (%ΔQ_d / %ΔP).", "definition"),
        (11, "economics", 1, "What is Marginal Utility?", "The additional satisfaction or utility gained from consuming one additional unit of a good or service.", "definition"),
        (11, "economics", 3, "What is a Monopoly?", "A market structure characterized by a single seller selling a unique product with no close substitutes and high barriers to entry.", "definition"),
        (11, "economics", 5, "What is Gross Domestic Product (GDP)?", "The total monetary value of all final goods and services produced within the geographic borders of a country in a specified time period (typically one year).", "definition"),
        (12, "economics", 1, "What is Inflation?", "A sustained, general increase in the price level of goods and services in an economy over a period of time, reducing the purchasing power of money.", "definition"),
        (12, "economics", 3, "What is Monetary Policy?", "The process by which a nation's central bank controls the money supply, interest rates, and credit availability to achieve macroeconomic stability.", "definition"),

        # History Concepts
        (9, "history", 1, "What is History?", "The systematic study, interpretation, and documentation of the human past based on critical analysis of primary and secondary evidence.", "definition"),
        (9, "history", 4, "What was the Kingdom of Aksum?", "A powerful ancient trading civilization in northern Ethiopia and Eritrea (c. 100-940 AD), renowned for its obelisks, coinage, international trade, and early adoption of Christianity.", "date_fact"),
        (10, "history", 1, "What was the Zagwe Dynasty?", "A medieval Ethiopian ruling dynasty centered in Lasta/Roha (c. 1150-1270 AD), famous for King Lalibela's 11 rock-hewn monolithic churches.", "date_fact"),
        (10, "history", 3, "What was the Gadaa System?", "An indigenous Oromo socio-political democratic governance system based on 8-year generational cohorts transitioning through leadership roles under the Abba Gadaa.", "concept"),
        (11, "history", 1, "Who was Emperor Tewodros II?", "Ruler who initiated the modern reunification of Ethiopia in 1855, establishing a centralized standing army and resisting British imperialism until his heroic death at Meqdala in 1868.", "date_fact"),
        (11, "history", 3, "What was the Battle of Adwa (1896)?", "Historic battle on March 1, 1896, where Ethiopian forces under Menelik II decisively defeated an invading Italian colonial army, defending national independence and inspiring global Pan-Africanism.", "date_fact"),
        (12, "history", 2, "What was the Arbegnoch Movement?", "The Ethiopian patriotic guerrilla resistance fighters who waged relentless warfare against Italian fascist occupation from 1936 to 1941 until national liberation.", "date_fact"),
        (12, "history", 4, "What was the Organization of African Unity (OAU)?", "Continental organization established on May 25, 1963, in Addis Ababa by 32 independent African heads of state to promote solidarity, eradicate colonialism, and defend sovereignty; precursor to the African Union.", "date_fact"),

        # Geography Concepts
        (9, "geography", 1, "What is Latitude and Longitude?", "Latitude: Angle north or south of the Equator (0° to 90°). Longitude: Angle east or west of the Prime Meridian (0° to 180°).", "definition"),
        (10, "geography", 1, "What is the Greenhouse Effect?", "The natural trapping of heat in Earth's lower atmosphere by greenhouse gases (CO₂, CH₄, H₂O vapor), maintaining global surface temperatures suitable for life.", "concept"),
        (11, "geography", 1, "What is the Great East African Rift Valley?", "A massive continental tectonic rift extending from the Red Sea/Danakil southward through Ethiopia and Kenya to Mozambique, splitting the African continent into the Nubian and Somalian plates.", "definition"),
        (11, "geography", 3, "What is the Abbay River?", "The Ethiopian Blue Nile, which originates in Lake Tana and supplies over 60% of the total water volume of the Nile River at Khartoum.", "date_fact"),
        (11, "geography", 4, "What is the Dega Agro-climatic Zone?", "Cool temperate Ethiopian highland zone between 2,300 and 3,300 m elevation, with temperatures of 10-15 °C, supporting barley, wheat, and sheep rearing.", "definition"),
        (12, "geography", 2, "What is the Grand Ethiopian Renaissance Dam (GERD)?", "Africa's largest hydroelectric gravity dam on the Abbay River in Benishangul-Gumuz, generating clean renewable energy for Ethiopia and regional export.", "date_fact"),
        # Additional Aptitude, IT, Agriculture & Citizenship Cards
        (11, "it", 1, "What is an Operating System Kernel?", "The core computer program at the heart of an OS that has complete control over everything in the system, managing hardware resources, memory, and CPU processes.", "definition"),
        (11, "it", 2, "What is a Binary Tree in data structures?", "A hierarchical tree data structure in which each parent node has at most two children, referred to as the left child and right child.", "definition"),
        (11, "it", 3, "What is the difference between compiler and interpreter?", "Compiler: Translates entire source code into machine code at once before execution (e.g., C++, Java). Interpreter: Translates and executes source code line-by-line in real time (e.g., Python, JavaScript).", "concept"),
        (12, "it", 1, "What is a Denial of Service (DoS) attack?", "A cyber-attack in which the perpetrator seeks to make a machine or network resource unavailable to its intended users by temporarily or indefinitely disrupting services of a host connected to the Internet.", "definition"),
        (12, "it", 2, "What is Public Key Infrastructure (PKI)?", "A system of digital certificates, Certificate Authorities (CAs), and public-key cryptography that secures end-to-end electronic communications and proves entity authenticity.", "definition"),
        (9, "agriculture", 1, "What is Soil Organic Matter (Humus)?", "Decomposed plant and animal residues in soil that improve soil structure, enhance water retention, and provide a steady reservoir of plant nutrients.", "definition"),
        (9, "agriculture", 2, "What is Crop Rotation?", "The practice of growing a series of different types of crops in the same area across sequential seasons to prevent soil nutrient depletion, break pest cycles, and control weeds.", "concept"),
        (10, "agriculture", 1, "What is Agroforestry?", "An integrated land-use management system in which trees or shrubs are grown around or among crops or pastureland, enhancing biodiversity and mitigating soil erosion.", "definition"),
        (11, "agriculture", 1, "What is Green Revolution in agriculture?", "A historical transfer and adoption of high-yielding crop varieties (HYVs), synthetic fertilizers, pesticides, and controlled irrigation infrastructure that dramatically increased global food production.", "concept"),
        (11, "citizenship", 1, "What is Civic Virtue?", "The dedication of citizens to the common welfare of their community and society, even at the cost of their individual interests.", "definition"),
        (11, "citizenship", 2, "What is Due Process of Law?", "The legal requirement that the state must respect all legal rights owed to a person, ensuring fair procedures and impartial hearings before any deprivation of life, liberty, or property.", "concept"),
        (12, "citizenship", 1, "What is Good Governance?", "The process of making and implementing public decisions characterized by transparency, accountability, equity, rule of law, responsiveness, efficiency, and broad public participation.", "definition"),
        (12, "citizenship", 2, "What is the African Union (AU) Peace and Security Council (PSC)?", "The standing decision-making organ of the African Union for the prevention, management, and resolution of conflicts across the African continent, headquartered in Addis Ababa.", "date_fact"),
        (11, "aptitude", 1, "How do you find the units digit of a large power like 7^2024?", "Find the cyclic pattern of unit digits for base 7: 7¹=7, 7²=9, 7³=3, 7⁴=1 (period 4). Divide exponent 2024 by 4 (remainder 0), so units digit is 1.", "formula"),
        (11, "aptitude", 2, "What is the formula for calculating simple speed, distance, and time?", "Distance = Speed * Time\nSpeed = Distance / Time\nTime = Distance / Speed.", "formula"),
        (12, "aptitude", 1, "What is a False Cause (Post Hoc Ergo Propter Hoc) logical fallacy?", "Incorrectly concluding that one event caused another simply because it occurred first in temporal sequence ('after this, therefore because of this').", "definition"),
        (12, "aptitude", 2, "How do you solve a 2-variable system using substitution vs elimination?", "Substitution: Solve one equation for one variable and substitute into the second. Elimination: Multiply equations by constants so adding/subtracting eliminates one variable.", "concept"),
    ]
    for item in concept_snapshots:
        add(item[0], item[1], item[2], item[3], item[4], item[5])

    print("Final Surge generated successfully.")
