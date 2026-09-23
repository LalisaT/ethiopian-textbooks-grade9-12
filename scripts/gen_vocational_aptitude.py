# -*- coding: utf-8 -*-
"""
Vocational, Business, Technical & Aptitude Flashcards Generator
(Agriculture, General Business, Technical Drawing, HPE, Aptitude)
Grades 9, 10, 11, 12
"""

def generate_vocational_aptitude(add):
    # =========================================================================
    # 🌾 AGRICULTURE (GRADES 9-12)
    # =========================================================================
    # Grade 9 & 10 Agriculture
    add(9, "agriculture", 1, "What are the four components of healthy agricultural soil?", "1. Mineral particles (Sand, Silt, Clay): ~45%\n2. Organic matter (Humus): ~5%\n3. Soil water: ~25%\n4. Soil air: ~25%.", "concept")
    add(9, "agriculture", 1, "What are the three primary plant macronutrients (NPK) and their roles?", "• Nitrogen (N): Promotes vegetative leafy growth and chlorophyll formation.\n• Phosphorus (P): Stimulates root development and early flowering.\n• Potassium (K): Enhances disease resistance and regulates stomatal water balance.", "definition")
    add(9, "agriculture", 2, "What is Teff (Eragrostis tef) and its agronomic significance in Ethiopia?", "An indigenous cereal grain domesticated in Ethiopia, gluten-free, rich in iron and calcium, adaptable to varied agro-ecologies, and the primary staple for baking Injera.", "concept")
    add(9, "agriculture", 2, "What is Enset (Ensete ventricosum) and what foods are processed from it?", "The 'false banana', an indigenous perennial crop in south/southwestern Ethiopia with high drought resilience. Processed products include Kocho (fermented pseudostem paste), Bulla (starch precipitate), and Amicho (boiled corm).", "concept")
    add(10, "agriculture", 1, "What is Integrated Pest Management (IPM)?", "An ecosystem-based strategy that combines biological control, cultural practices, crop rotation, and resistant crop varieties, using synthetic chemical pesticides only as a last resort.", "definition")
    add(10, "agriculture", 2, "Name four prominent indigenous cattle breeds of Ethiopia.", "1. Boran (famed beef breed adapted to arid rangelands)\n2. Fogera (dual-purpose around Lake Tana)\n3. Horro (highlands of western Oromia)\n4. Sheko (trypanotolerant humpless cattle of southwestern forests).", "date_fact")
    add(10, "agriculture", 3, "What are the common soil and water conservation structures used in Ethiopian highlands?", "Stone bunds, soil bunds, Fanya-juu terracing (digging a ditch and throwing soil upslope), check dams in gullies, and agroforestry hedgerows.", "concept")

    # Grade 11 & 12 Agriculture
    add(11, "agriculture", 1, "Distinguish Drip Irrigation from Furrow Irrigation.", "Drip Irrigation: Pressurized localized delivery directly to plant roots; achieves >90% water-use efficiency. Furrow Irrigation: Gravity-fed surface trenches; lower capital cost but higher water loss via evaporation and seepage.", "definition")
    add(11, "agriculture", 2, "What is Coffea arabica and what are its two main processing methods?", "Originating in the wild montane forests of Kaffa/Ethiopia; processed via:\n1. Wet (washed) method: Pulp removed before fermentation; yields clean, bright acidity (e.g., Yirgacheffe).\n2. Dry (natural) method: Cherries sun-dried whole on raised beds; yields heavy body and fruity sweetness (e.g., Harar).", "concept")
    add(12, "agriculture", 1, "What is Post-Harvest Loss and how do PICS bags mitigate it?", "Post-Harvest Loss: Degradation or destruction of harvested grain by insects, molds, and rodents. Purdue Improved Crop Storage (PICS) bags use triple-layer hermetic sealing to suffocate storage pests without chemicals.", "concept")
    add(12, "agriculture", 2, "What is Apiculture and what makes Ethiopian honey unique?", "Beekeeping. Ethiopia is Africa's leading honey and beeswax producer. Known for specialty honeys like Tigray white honey (from Becium grandiflorum) and yellow forest honeys.", "date_fact")

    # =========================================================================
    # 💼 GENERAL BUSINESS (GRADES 11 & 12)
    # =========================================================================
    add(11, "general_business", 1, "What are the three main forms of business organizations?", "1. Sole Proprietorship (one owner, unlimited personal liability)\n2. Partnership (two or more co-owners, shared liability)\n3. Corporation / Share Company (separate legal entity, limited liability, transferable shares).", "definition")
    add(11, "general_business", 1, "What is a Private Limited Company (PLC)?", "A business organization owned by 2 to 50 shareholders where liability is limited to subscribed shares and shares cannot be offered to the general public.", "definition")
    add(11, "general_business", 2, "What are the four functions of Management (Fayol)?", "1. Planning: Setting organizational objectives and determining courses of action.\n2. Organizing: Assigning tasks, allocating resources, establishing hierarchy.\n3. Leading: Motivating, directing, and inspiring employees.\n4. Controlling: Monitoring performance against targets and taking corrective actions.", "concept")
    add(11, "general_business", 3, "What are the 4 Ps of the Marketing Mix?", "1. Product (features, quality, branding)\n2. Price (pricing strategy, discounts)\n3. Place (distribution channels, logistics)\n4. Promotion (advertising, sales promotions, public relations).", "definition")
    add(12, "general_business", 1, "State the fundamental Accounting Equation.", "Assets = Liabilities + Owner's Equity\n(Every financial transaction maintains this equality via double-entry bookkeeping: Total Debits = Total Credits).", "formula")
    add(12, "general_business", 1, "Distinguish a Balance Sheet from an Income Statement.", "Balance Sheet: Financial snapshot of Assets, Liabilities, and Equity at a specific point in time. Income Statement: Financial performance showing Revenues - Expenses = Net Profit/Loss over an accounting period.", "definition")
    add(12, "general_business", 2, "What is the Current Ratio and what does it measure?", "Current Ratio = Current Assets / Current Liabilities\nMeasures short-term liquidity and ability to cover debts due within one year (ideal ratio is typically 1.5 to 2.0).", "formula")
    add(12, "general_business", 3, "What are Maslow's Hierarchy of Human Needs?", "From base to peak:\n1. Physiological (food, water)\n2. Safety & Security\n3. Love & Belonging\n4. Esteem\n5. Self-Actualization.", "concept")

    # =========================================================================
    # 📐 TECHNICAL DRAWING (GRADES 11 & 12)
    # =========================================================================
    add(11, "technical_drawing", 1, "Distinguish First-Angle from Third-Angle Orthographic Projection.", "First-Angle (European/ISO): Object is between observer and projection plane (Plan is below Elevation, Right view is on the left). Third-Angle (US/ANSI): Projection plane is between observer and object (Plan is above Elevation, Right view is on the right).", "concept")
    add(11, "technical_drawing", 1, "What are the three principal views in multi-view orthographic drawing?", "1. Front View (Elevation): Shows height and width.\n2. Top View (Plan): Shows width and depth.\n3. Side View (End Elevation): Shows height and depth.", "definition")
    add(11, "technical_drawing", 2, "What are the angles of the three axes in an Isometric Drawing?", "The three axes are spaced at 120° to each other; the two receding horizontal axes are drawn at 30° above the horizontal baseline.", "formula")
    add(12, "technical_drawing", 1, "What is a Sectional View and why are hatching lines used?", "A view showing internal features by imagining the object cut by a cutting plane. Hatching lines (thin parallel lines drawn at 45°) indicate solid material intersected by the cutting plane.", "definition")
    add(12, "technical_drawing", 2, "State standard dimensioning rules in engineering drawing.", "Dimension lines should never cross extension lines. Extension lines extend ~2-3 mm past dimension line arrowheads. Dimensions are placed above the dimension line or broken in the center.", "concept")

    # =========================================================================
    # 🏃 HEALTH & PHYSICAL EDUCATION (HPE) (GRADES 9-12)
    # =========================================================================
    add(9, "hpe", 1, "What are the 5 components of Health-Related Physical Fitness?", "1. Cardiorespiratory endurance\n2. Muscular strength\n3. Muscular endurance\n4. Flexibility\n5. Body composition.", "definition")
    add(9, "hpe", 1, "What does the F.I.T.T. principle stand for in exercise prescription?", "• F: Frequency (how often)\n• I: Intensity (how hard)\n• T: Time (how long / duration)\n• T: Type (mode of activity).", "definition")
    add(10, "hpe", 1, "What are the three human body energy systems?", "1. ATP-CP / Phosphagen: Immediate anaerobic energy for 0-10 seconds.\n2. Anaerobic Glycolytic: High-intensity energy for 30-90 seconds, producing lactic acid.\n3. Aerobic / Oxidative: Sustained endurance energy for >2 minutes utilizing oxygen and fats/carbs.", "concept")
    add(10, "hpe", 2, "How do you calculate Maximum Heart Rate (MHR) and Target Heart Rate?", "Estimated MHR = 220 - Age (in years).\nTarget Heart Rate Zone for aerobic conditioning is 60% to 85% of MHR.", "formula")
    add(11, "hpe", 1, "State the R.I.C.E. protocol for acute soft-tissue sports injuries.", "• Rest: Stop activity to prevent further injury.\n• Ice: Apply cold packs for 15-20 min to reduce swelling.\n• Compression: Wrap with elastic bandage to limit edema.\n• Elevation: Raise injured limb above heart level.", "definition")
    add(12, "hpe", 1, "What are the major physiological benefits of regular aerobic exercise on the cardiovascular system?", "Increases cardiac stroke volume, lowers resting heart rate (bradycardia in athletes), strengthens heart myocardium, improves capillary density, and raises HDL ('good') cholesterol.", "concept")

    # =========================================================================
    # 💡 SCHOLASTIC APTITUDE & LOGICAL REASONING (EUEE SAT) (GRADES 11 & 12)
    # =========================================================================
    add(11, "aptitude", 1, "How do you solve a Word Analogy question (A : B :: C : D)?", "Identify the precise relationship between pair A and B (e.g., cause/effect, part/whole, tool/worker, degree of intensity, antonym/synonym) and select the pair C and D with the exact same relationship.", "concept")
    add(11, "aptitude", 1, "What is a Syllogism and the rule of transitivity?", "Deductive argument: If Premise 1 is 'All A are B' and Premise 2 is 'All B are C', the valid transitive conclusion is 'All A are C'.", "concept")
    add(12, "aptitude", 1, "What is the common pattern in the Fibonacci sequence?", "Each number is the sum of the two preceding numbers: 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, ... (F_n = F_{n-1} + F_{n-2}).", "formula")
    add(12, "aptitude", 1, "How do you determine the angle between the hour and minute hands of an analog clock at H:M?", "Angle θ = |30*H - 5.5*M| (degrees). If θ > 180°, the acute angle is 360° - θ.", "formula")
    add(12, "aptitude", 2, "What is an Ad Hominem fallacy in logical argumentation?", "Attacking the character, motive, or background of the person making an argument rather than addressing the substance and validity of the argument itself.", "definition")
    add(12, "aptitude", 2, "How do you solve Venn diagram set overlap problems with 3 sets?", "n(A ∪ B ∪ C) = n(A) + n(B) + n(C) - n(A ∩ B) - n(A ∩ C) - n(B ∩ C) + n(A ∩ B ∩ C).", "formula")

    print("Vocational & Aptitude generated successfully.")
