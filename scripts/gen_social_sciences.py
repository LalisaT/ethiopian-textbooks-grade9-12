# -*- coding: utf-8 -*-
"""
Social Sciences Flashcards Generator (Economics, History, Geography)
Grades 9, 10, 11, 12
"""

def generate_social_sciences(add):
    # =========================================================================
    # 📈 ECONOMICS (GRADES 9-12)
    # =========================================================================
    # Grade 9 & 10 Economics
    add(9, "economics", 1, "Define Scarcity and Opportunity Cost.", "Scarcity: Human wants are unlimited while economic resources are limited. Opportunity Cost: The value of the next best alternative forgone when making a choice.", "definition")
    add(9, "economics", 1, "What are the three fundamental economic questions?", "1. What to produce and in what quantities?\n2. How to produce (technique/resource combination)?\n3. For whom to produce (distribution)?", "concept")
    add(9, "economics", 1, "What does the Production Possibility Frontier (PPF) illustrate?", "Scarcity, choice, opportunity cost, and efficiency. Points on curve = efficient; inside = inefficient; outside = unattainable with current resources.", "concept")
    add(9, "economics", 2, "State the Law of Demand and the substitution and income effects.", "Other things being equal (ceteris paribus), as price increases, quantity demanded decreases (downward sloping demand curve).", "concept")
    add(9, "economics", 2, "State the Law of Supply.", "Other things being equal, as price increases, quantity supplied increases (upward sloping supply curve).", "concept")
    add(9, "economics", 2, "What occurs at Market Equilibrium?", "Quantity demanded equals quantity supplied (Q_d = Q_s). The market clears with no shortage (excess demand) or surplus (excess supply).", "definition")
    add(10, "economics", 1, "Distinguish between a Price Ceiling and a Price Floor.", "Price Ceiling: Maximum legal price set BELOW equilibrium (causes persistent shortages, e.g., rent control). Price Floor: Minimum legal price set ABOVE equilibrium (causes persistent surpluses, e.g., minimum wage).", "concept")
    add(10, "economics", 2, "What are the four main factors of production and their returns?", "1. Land -> Rent\n2. Labor -> Wages\n3. Capital -> Interest\n4. Entrepreneurship -> Profit", "definition")

    # Grade 11 Economics
    add(11, "economics", 1, "State the Law of Diminishing Marginal Utility.", "As a consumer consumes more units of a specific good, the additional satisfaction (marginal utility) derived from each additional unit decreases.", "concept")
    add(11, "economics", 1, "What is the Consumer Equilibrium condition under Cardinal Utility?", "MU_x / P_x = MU_y / P_y = ... = MU_m (Marginal utility per birr spent is equal across all goods).", "formula")
    add(11, "economics", 1, "What are the four properties of standard Indifference Curves?", "1. Downward sloping to the right.\n2. Convex to the origin (diminishing MRS).\n3. Indifference curves never intersect.\n4. Higher indifference curves represent higher utility levels.", "concept")
    add(11, "economics", 1, "What is the Marginal Rate of Substitution (MRS_xy)?", "The rate at which a consumer is willing to give up good Y to obtain an extra unit of good X while maintaining the same utility: MRS_xy = -ΔY/ΔX = MU_x / MU_y.", "formula")
    add(11, "economics", 2, "State the Law of Diminishing Marginal Returns in production.", "As successive units of a variable input (e.g., labor) are added to a fixed input (e.g., land/capital), marginal product of the variable input eventually diminishes.", "concept")
    add(11, "economics", 2, "Define Total Cost (TC), Average Total Cost (ATC), and Marginal Cost (MC).", "TC = TFC + TVC\nATC = TC / Q = AFC + AVC\nMC = ΔTC / ΔQ = d(TC)/dQ. (MC cuts ATC and AVC at their minimum points).", "formula")
    add(11, "economics", 3, "What are the key characteristics of Perfect Competition?", "1. Many buyers and sellers (price takers).\n2. Homogeneous product.\n3. Free entry and exit.\n4. Perfect information.\n5. Horizontal demand curve (P = MR = AR). Profit max: P = MC.", "concept")
    add(11, "economics", 3, "What is the profit-maximizing output condition for all firms?", "Marginal Revenue = Marginal Cost (MR = MC), with MC rising.", "formula")
    add(11, "economics", 3, "When should a competitive firm shut down in the short run?", "When market price falls below minimum Average Variable Cost (P < min AVC).", "concept")
    add(11, "economics", 4, "What are the four market structures ordered from most to least competitive?", "1. Perfect Competition\n2. Monopolistic Competition\n3. Oligopoly\n4. Pure Monopoly", "definition")
    add(11, "economics", 5, "What is the Expenditure Approach formula for calculating Gross Domestic Product (GDP)?", "GDP = C + I + G + (X - M)\nwhere C = Consumption, I = Investment, G = Government purchases, X = Exports, M = Imports.", "formula")
    add(11, "economics", 5, "What is the difference between Nominal GDP and Real GDP?", "Nominal GDP measures output using current-year prices. Real GDP measures output using constant base-year prices, adjusting for inflation.\nGDP Deflator = (Nominal GDP / Real GDP) * 100.", "definition")

    # Grade 12 Economics
    add(12, "economics", 1, "What are the types of Unemployment?", "1. Frictional: Workers transitioning between jobs.\n2. Structural: Mismatch between worker skills and market needs.\n3. Cyclical: Due to economic recessions and downturns.\n4. Seasonal: Fluctuations with seasons.", "definition")
    add(12, "economics", 1, "What is the Natural Rate of Unemployment (NRU)?", "The sum of frictional and structural unemployment when the economy is at full employment (cyclical unemployment = 0).", "concept")
    add(12, "economics", 2, "Distinguish Demand-Pull from Cost-Push Inflation.", "Demand-Pull: Aggregate demand outpaces aggregate supply ('too much money chasing too few goods'). Cost-Push: Rising production costs (wages, raw materials, energy) shift aggregate supply leftward.", "concept")
    add(12, "economics", 2, "What does the Phillips Curve illustrate?", "An inverse short-run relationship between inflation and unemployment (lower unemployment correlates with higher inflation).", "concept")
    add(12, "economics", 3, "What are the three quantitative monetary policy tools of a Central Bank?", "1. Reserve Requirement Ratio (RRR)\n2. Discount Rate (Central bank lending rate to commercial banks)\n3. Open Market Operations (buying/selling government treasury securities).", "concept")
    add(12, "economics", 3, "What is the Simple Money Multiplier formula?", "m = 1 / RRR\nTotal potential money creation ΔM = Initial Deposit * (1 / RRR).", "formula")
    add(12, "economics", 4, "Distinguish Expansionary from Contractionary Fiscal Policy.", "Expansionary: Increase government spending (G) and/or cut taxes (T) to boost aggregate demand. Contractionary: Decrease G and/or raise T to cool down inflation.", "concept")
    add(12, "economics", 4, "What is the Autonomous Spending Multiplier?", "k = 1 / (1 - MPC) = 1 / MPS\nwhere MPC = Marginal Propensity to Consume, MPS = Marginal Propensity to Save.", "formula")
    add(12, "economics", 5, "State the Principle of Comparative Advantage (David Ricardo).", "A country should specialize in producing and exporting goods that it can produce at a lower opportunity cost than other nations, even if it has an absolute advantage in neither.", "concept")
    add(12, "economics", 5, "What are the components of the Balance of Payments (BOP)?", "1. Current Account (Trade balance, services, primary & secondary income transfers)\n2. Capital Account (Capital transfers)\n3. Financial Account (Direct investment, portfolio investment, reserve assets).", "definition")

    # =========================================================================
    # 🏛️ HISTORY (GRADES 9-12)
    # =========================================================================
    # Grade 9 History
    add(9, "history", 1, "Distinguish Primary from Secondary historical sources with examples.", "Primary: Eyewitness accounts, original manuscripts, artifacts, decrees (e.g., Ezana stone inscription). Secondary: Textbooks, biographies, interpretations written after the event.", "definition")
    add(9, "history", 2, "Where and when was Australopithecus afarensis ('Lucy' / 'Dinkinesh') discovered?", "Discovered in Hadar, Afar Depression, Ethiopia in 1974 by Donald Johanson; dated to ~3.2 million years ago.", "date_fact")
    add(9, "history", 2, "What are the earliest known stone tools and their age?", "Oldowan pebble tools, manufactured by Homo habilis ~2.6 million years ago in the Awash Valley (Gona/Ledi-Geraru), Ethiopia.", "date_fact")
    add(9, "history", 3, "What was the Land of Punt and what goods were traded?", "An ancient Horn of Africa kingdom famed for aromatic myrrh, frankincense, gold, ivory, and ebony, visited by Egyptian Queen Hatshepsut's expedition in 1493 BC.", "date_fact")
    add(9, "history", 3, "What was the Kingdom of Da'amat and its capital?", "A pre-Aksumite polity flourishing in the 8th-7th century BC centered at Yeha, where the Great Temple of the Moon stands.", "date_fact")
    add(9, "history", 4, "What was the major port city of the Kingdom of Aksum?", "Adulis, on the Red Sea coast, an international trade hub connecting the Mediterranean, Arabia, India, and the African interior.", "date_fact")
    add(9, "history", 4, "Who was King Ezana and what was his landmark achievement?", "King of Aksum (c. 320-360 AD) who converted to Christianity c. 330 AD with Frumentius (Abba Selama), made Christianity state religion, and minted coins with the Cross.", "date_fact")
    add(9, "history", 4, "Who was King Kaleb and what military campaign did he lead?", "6th-century Aksumite King who led a naval expedition across the Red Sea in 525 AD to protect Christians in Himyar (South Arabia/Yemen).", "date_fact")

    # Grade 10 History
    add(10, "history", 1, "Who founded the Zagwe Dynasty and where was its center?", "The Agaw aristocracy of Bugna (Lasta), centered at Roha (Lalibela); King Gebre Mesqel Lalibela oversaw the carving of 11 monolithic rock-hewn churches in the 12th-13th century.", "date_fact")
    add(10, "history", 1, "When was the Solomonic Dynasty restored and by whom?", "In 1270 AD by Yekuno Amlak, claiming descent from the Aksumite monarchs and King Solomon of Israel.", "date_fact")
    add(10, "history", 2, "Who was Emperor Zara Yaqob and what were his reforms?", "Emperor (1434–1468) who instituted religious reforms (Council of Debre Mitmaq 1450), reorganized administration, and wrote ecclesiastical books (Mets'hafe Berhan).", "date_fact")
    add(10, "history", 2, "Who was Ahmad ibn Ibrahim al-Ghazi ('Ahmad Gragn')?", "Leader of the Adal Sultanate who launched a major military campaign against the Christian highland kingdom (1529–1543), defeating Lebna Dengel at Shimbra Kure (1529).", "date_fact")
    add(10, "history", 2, "What was the outcome of the Battle of Wayna Dega (1543)?", "Emperor Gelawdewos, reinforced by Portuguese musketeers under Christopher da Gama, defeated and killed Ahmad Gragn, ending the Adal-Christian war.", "date_fact")
    add(10, "history", 3, "What is the Gadaa system and its generational cycle?", "An egalitarian socio-political democratic governance system of the Oromo people, where cohorts transition through 8-year age-grades under the leadership of the Abba Gadaa.", "concept")
    add(10, "history", 4, "Who founded the city of Gondar as the permanent imperial capital?", "Emperor Fasilides in 1636 AD, beginning the Gondarine Period characterized by castle architecture (Fasil Ghebbi) and expulsion of Jesuit missionaries.", "date_fact")
    add(10, "history", 5, "What was the Zemene Mesafint ('Era of the Princes')?", "Period from 1769 (assassination of Emperor Iyoas by Ras Mikael Sehul) to 1855, characterized by weak puppet emperors and regional warlords fighting for power.", "date_fact")

    # Grade 11 History
    add(11, "history", 1, "Who was Emperor Tewodros II and what was his historic mission?", "Born Kassa Hailu of Qwara, crowned Emperor in 1855 at Deresge; initiated modern reunification, created a disciplined standing army, and manufactured cannons at Gafat.", "date_fact")
    add(11, "history", 1, "What happened at the Battle of Meqdala (1868)?", "British expedition under General Robert Napier besieged Tewodros's mountain fortress; Tewodros chose suicide over surrender on April 13, 1868.", "date_fact")
    add(11, "history", 2, "What foreign invasions did Emperor Yohannes IV defeat?", "1. Egyptian invasions: Battle of Gundet (1875) and Battle of Gura (1876).\n2. Italian invasion: Battle of Dogali (1887, led by Ras Alula Aba Nega).\n3. Mahdists of Sudan: Battle of Metemma (1889, where Yohannes was martyred).", "date_fact")
    add(11, "history", 3, "What was the Treaty of Wuchale (1889) dispute between Ethiopia and Italy?", "Article XVII: The Italian text stated Ethiopia 'consents to use Italy' for all foreign affairs (making it a protectorate), while the Amharic text stated Ethiopia 'may' use Italy. Menelik annulled the treaty.", "concept")
    add(11, "history", 3, "What was the historical significance of the Battle of Adwa (March 1, 1896)?", "Ethiopian forces under Menelik II and Empress Taytu decisively routed the Italian invading army under Baratieri; secured Ethiopian sovereignty and became a beacon of Pan-African anti-colonial victory.", "date_fact")
    add(11, "history", 4, "What was the 1884-1885 Berlin Conference?", "Meeting of 14 European imperialist nations that partitioned Africa into colonial spheres of influence without African representation, launching the 'Scramble for Africa'.", "date_fact")

    # Grade 12 History
    add(12, "history", 1, "When was Emperor Haile Selassie I crowned and when was Ethiopia's first written constitution issued?", "Coronation: November 2, 1930.\nFirst Written Constitution: July 16, 1931.", "date_fact")
    add(12, "history", 2, "What was the Walwal Incident (December 1934)?", "A border skirmish between Ethiopian and Italian-Somali colonial forces at the Walwal oasis, used by Mussolini's fascist regime as a pretext to invade Ethiopia in October 1935.", "date_fact")
    add(12, "history", 2, "What was the Yekatit 12 Massacre (Black Saturday)?", "In February 1937, after an assassination attempt by Abreha Deboch and Moges Asgedom on Italian Viceroy Rodolfo Graziani, fascist troops massacred ~30,000 Ethiopians in Addis Ababa and Debre Libanos.", "date_fact")
    add(12, "history", 2, "When was Ethiopia liberated from Italian fascist occupation?", "May 5, 1941, when Emperor Haile Selassie triumphantly re-entered Addis Ababa with Arbegnoch patriots and the Anglo-Ethiopian Gideon Force.", "date_fact")
    add(12, "history", 3, "What was the 1960 Abortive Coup d'État in Ethiopia?", "Led by Brigadier General Mengistu Neway (Imperial Bodyguard) and his brother Germame Neway while the Emperor was in Brazil, seeking progressive modernization.", "date_fact")
    add(12, "history", 4, "When was the Organization of African Unity (OAU) founded and where?", "May 25, 1963 in Addis Ababa, Ethiopia, with 32 independent African founding states; Addis Ababa became the permanent headquarters.", "date_fact")
    add(12, "history", 4, "What were the primary catalysts of the 1974 Ethiopian Revolution?", "1. 1973 Wollo Famine covered up by imperial government.\n2. Global oil crisis and inflation.\n3. Student and military mutinies chanting 'Land to the Tiller'. Derg deposed Emperor Haile Selassie on September 12, 1974.", "concept")
    add(12, "history", 5, "What was the Ethio-Somali War of 1977-1978?", "Siad Barre's Somali army invaded the eastern Ogaden region to realize 'Greater Somalia'. Ethiopian armed forces, backed by Soviet logistics and Cuban troops, expelled the invaders at the Battle of Karamara (March 1978).", "date_fact")

    # =========================================================================
    # 🌍 GEOGRAPHY (GRADES 9-12)
    # =========================================================================
    # Grade 9 Geography
    add(9, "geography", 1, "What are the three types of map scale?", "1. Representative Fraction (RF, e.g., 1:50,000)\n2. Graphic / Bar scale\n3. Verbal / Statement scale (e.g., '1 cm represents 500 m').", "definition")
    add(9, "geography", 1, "What do closely spaced contour lines indicate on a topographic map?", "A steep slope. Widely spaced contour lines indicate a gentle slope; concentric circles with increasing heights indicate a hill.", "concept")
    add(9, "geography", 2, "What are the three structural layers of the Earth?", "1. Crust (Continental SIAL and Oceanic SIMA)\n2. Mantle (Asthenosphere with convection currents)\n3. Core (Outer liquid iron-nickel and inner solid iron-nickel).", "definition")
    add(9, "geography", 2, "What causes earthquakes and where is the Epicenter located?", "Sudden release of strain energy along geological faults. Focus/Hypocenter is the underground point of origin; Epicenter is the point on Earth's surface directly above the focus.", "concept")
    add(9, "geography", 3, "Distinguish Mechanical from Chemical Weathering.", "Mechanical: Physical breakdown of rock into smaller fragments without chemical change (frost wedging, thermal expansion). Chemical: Decomposition of rock minerals via chemical reactions (carbonation, oxidation, hydrolysis).", "definition")

    # Grade 10 Geography
    add(10, "geography", 1, "What are the major greenhouse gases causing anthropogenic global warming?", "Carbon dioxide (CO₂), Methane (CH₄), Nitrous oxide (N₂O), Chlorofluorocarbons (CFCs), and Water vapor.", "definition")
    add(10, "geography", 2, "What are the three economic sectors of production?", "1. Primary: Extraction of raw natural resources (agriculture, mining, forestry).\n2. Secondary: Manufacturing and industrial processing.\n3. Tertiary: Provision of services (banking, transport, education, tourism).", "definition")

    # Grade 11 Geography
    add(11, "geography", 1, "What is the absolute geographical location of Ethiopia?", "Latitude: 3°N to 15°N\nLongitude: 33°E to 48°E\nTotal surface area: ~1,104,300 km².", "date_fact")
    add(11, "geography", 1, "What geological events occurred in Ethiopia during the Mesozoic era?", "Marine transgression (sinking of land, sea advancing from SE depositing Adigrat Sandstone then Antalo Limestone) followed by marine regression depositing Upper Sandstone.", "concept")
    add(11, "geography", 1, "What major geological structure formed in Ethiopia during the Tertiary period?", "The Great East African Rift Valley, accompanied by massive volcanic trap basalt outpourings forming the Ethiopian Highlands.", "date_fact")
    add(11, "geography", 2, "What is the highest mountain peak in Ethiopia and its elevation?", "Mount Ras Dejen (4,550 meters above sea level), located in the Simien Mountains massifs.", "date_fact")
    add(11, "geography", 2, "What is the lowest depression in Ethiopia and its depth?", "Dallol / Kobar Sink in the Danakil (Afar) Depression, reaching approximately 125 meters below sea level.", "date_fact")
    add(11, "geography", 3, "Name the three major drainage systems of Ethiopia.", "1. Western / Mediterranean Basin (Abbay, Tekeze, Baro-Akobo draining ~60% of water)\n2. South-Eastern / Indian Ocean Basin (Genale-Dawa, Wabi Shebelle)\n3. Inland / Rift Valley Basin (Awash River, Omo-Gibe, Rift lakes).", "concept")
    add(11, "geography", 3, "Where does the Abbay (Blue Nile) originate and where does it join the White Nile?", "Originates from Gilgel Abbay flowing into Lake Tana; joins the White Nile at Khartoum, Sudan, providing over 60% of the Nile's total flow.", "date_fact")
    add(11, "geography", 3, "What is the longest river within Ethiopia's national borders?", "Wabi Shebelle River (~1,340 km within Ethiopian territory).", "date_fact")
    add(11, "geography", 4, "Name the 5 traditional Ethiopian agro-climatic zones and their altitude ranges.", "1. Kur / Wirch: > 3,300 m (Cold alpine)\n2. Dega: 2,300 – 3,300 m (Cool temperate)\n3. Weyna Dega: 1,500 – 2,300 m (Warm subtropical)\n4. Kolla: 500 – 1,500 m (Warm tropical)\n5. Bereha: < 500 m (Hot arid desert).", "definition")
    add(11, "geography", 4, "What atmospheric system brings the main summer rains (Kiremt) to Ethiopia?", "The Inter-Tropical Convergence Zone (ITCZ) shifting north, drawing moist south-westerly Equatorial Westerlies / Congo Air Stream and Indian Ocean monsoons.", "concept")

    # Grade 12 Geography
    add(12, "geography", 1, "What are the dominant demographic characteristics of Ethiopia's population?", "Rapid natural increase rate (~2.6% per annum), broad-based population pyramid with high youth dependency (>40% under age 15), and ~22% urbanization rate.", "concept")
    add(12, "geography", 2, "What is the economic role of Agriculture in Ethiopia?", "Accounts for ~32% of GDP, employs ~70% of the active labor force, and provides ~75% of total foreign merchandise export earnings.", "date_fact")
    add(12, "geography", 2, "What are Ethiopia's primary agricultural export commodities?", "Arabica coffee (leading export), oilseeds (sesame, niger seed), pulses (faba beans, chickpeas), cut flowers (floriculture), and khat.", "concept")
    add(12, "geography", 3, "What is the Grand Ethiopian Renaissance Dam (GERD) and its installed capacity?", "A major hydroelectric gravity dam on the Abbay (Blue Nile) in Benishangul-Gumuz Region with an installed capacity of 5,150 MW, the largest in Africa.", "date_fact")
    add(12, "geography", 3, "What is the primary export trade corridor for landlocked Ethiopia?", "The Addis Ababa–Djibouti Transport Corridor (standard gauge electrified railway 756 km and highway handling >90% of Ethiopian import-export cargo).", "date_fact")

    print("Social Sciences generated successfully.")
