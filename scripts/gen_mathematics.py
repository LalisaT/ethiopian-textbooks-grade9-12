# -*- coding: utf-8 -*-
"""
Mathematics Flashcards Generator (General, Natural Science, Social Science Streams)
Grades 9, 10, 11, 12
"""

def generate_mathematics(add):
    # =========================================================================
    # 📐 MATHEMATICS (GENERAL / GRADE 9 & 10)
    # =========================================================================
    # Grade 9 Math
    add(9, "mathematics", 1, "State De Morgan's Laws of Set Theory.", "(A ∪ B)' = A' ∩ B'\n(A ∩ B)' = A' ∪ B'", "formula")
    add(9, "mathematics", 1, "What is the formula for the number of subsets of a set with n elements?", "Total subsets = 2^n\nProper subsets = 2^n - 1", "formula")
    add(9, "mathematics", 2, "State the Quadratic Formula for ax² + bx + c = 0.", "x = (-b ± √(b² - 4ac)) / (2a)\nDiscriminant Δ = b² - 4ac.", "formula")
    add(9, "mathematics", 2, "What does the discriminant (Δ = b² - 4ac) indicate about roots?", "• Δ > 0: Two distinct real roots\n• Δ = 0: Exactly one real root (repeated/double root)\n• Δ < 0: Two complex conjugate roots (no real roots).", "concept")
    add(9, "mathematics", 2, "State Vieta's Formulas for a quadratic ax² + bx + c = 0.", "Sum of roots: x1 + x2 = -b / a\nProduct of roots: x1 * x2 = c / a", "formula")
    add(9, "mathematics", 3, "What is the distance formula between points (x1, y1) and (x2, y2)?", "d = √((x2 - x1)² + (y2 - y1)²)", "formula")
    add(9, "mathematics", 3, "What are the Midpoint coordinates between (x1, y1) and (x2, y2)?", "M = ((x1 + x2) / 2, (y1 + y2) / 2)", "formula")
    add(9, "mathematics", 3, "What is the relationship between the slopes of two perpendicular lines?", "m1 * m2 = -1 (or m2 = -1 / m1), provided neither line is vertical.", "concept")
    add(9, "mathematics", 4, "State the conditions for Triangle Congruence.", "SSS (Side-Side-Side), SAS (Side-Angle-Side), ASA (Angle-Side-Angle), AAS (Angle-Angle-Side), and RHS (Right-Hypotenuse-Side).", "concept")
    add(9, "mathematics", 4, "State the Pythagorean Theorem and its converse.", "In a right triangle with legs a, b and hypotenuse c: a² + b² = c².\nIf a² + b² = c², the angle opposite to side c is a right angle (90°).", "formula")
    add(9, "mathematics", 5, "What is the formula for the sample Mean and Sample Variance?", "Mean x̄ = (Σ x_i) / n\nVariance s² = Σ (x_i - x̄)² / (n - 1)\nStandard deviation s = √s²", "formula")

    # Grade 10 Math
    add(10, "mathematics", 1, "State the Remainder Theorem and Factor Theorem for polynomials.", "Remainder Theorem: When polynomial P(x) is divided by (x - c), the remainder is R = P(c).\nFactor Theorem: (x - c) is a factor of P(x) if and only if P(c) = 0.", "concept")
    add(10, "mathematics", 1, "How do you find the vertical and horizontal asymptotes of a rational function f(x) = P(x) / Q(x)?", "Vertical asymptotes: Real zeros of Q(x) (where P(x) ≠ 0).\nHorizontal asymptote: If deg(P) < deg(Q), y = 0; if deg(P) = deg(Q), y = leading coeff ratio; if deg(P) > deg(Q), no horizontal asymptote (slant/oblique).", "concept")
    add(10, "mathematics", 2, "State the fundamental Laws of Logarithms.", "1. log_b(xy) = log_b(x) + log_b(y)\n2. log_b(x/y) = log_b(x) - log_b(y)\n3. log_b(x^k) = k * log_b(x)\n4. Change of base: log_b(x) = ln(x) / ln(b)", "formula")
    add(10, "mathematics", 2, "What is the relationship between exponential and logarithmic forms?", "y = log_b(x) ⟺ b^y = x (where b > 0, b ≠ 1, x > 0).", "definition")
    add(10, "mathematics", 3, "State the Pythagorean Trigonometric Identities.", "1. sin²(θ) + cos²(θ) = 1\n2. 1 + tan²(θ) = sec²(θ)\n3. 1 + cot²(θ) = csc²(θ)", "formula")
    add(10, "mathematics", 3, "State the Double-Angle formulas for Sine and Cosine.", "sin(2θ) = 2 * sin(θ) * cos(θ)\ncos(2θ) = cos²(θ) - sin²(θ) = 2cos²(θ) - 1 = 1 - 2sin²(θ)", "formula")
    add(10, "mathematics", 3, "State the Law of Sines and Law of Cosines.", "Law of Sines: a / sin(A) = b / sin(B) = c / sin(C) = 2R\nLaw of Cosines: c² = a² + b² - 2ab * cos(C)", "formula")
    add(10, "mathematics", 4, "What is the standard equation of a Circle with center (h, k) and radius r?", "(x - h)² + (y - k)² = r²\n(Center at origin: x² + y² = r²).", "formula")
    add(10, "mathematics", 4, "What are the formulas for the Volume and Surface Area of a Sphere?", "Volume V = (4/3) * π * r³\nSurface Area A = 4 * π * r²", "formula")

    # =========================================================================
    # 🧮 MATHEMATICS - NATURAL SCIENCES STREAM (GRADES 11 & 12)
    # =========================================================================
    # Grade 11 Natural Math
    add(11, "mathematics_natural", 1, "State the n-th term and sum formulas for an Arithmetic Progression (AP).", "n-th term: a_n = a_1 + (n - 1)d\nSum: S_n = (n/2)[2a_1 + (n - 1)d] = (n/2)(a_1 + a_n)", "formula")
    add(11, "mathematics_natural", 1, "State the n-th term and sum of finite & infinite Geometric Series (GP).", "n-th term: a_n = a_1 * r^(n-1)\nFinite sum: S_n = a_1(1 - r^n) / (1 - r) (r ≠ 1)\nInfinite sum (converges if |r| < 1): S_∞ = a_1 / (1 - r)", "formula")
    add(11, "mathematics_natural", 2, "State the fundamental limits: lim(x->0) sin(x)/x and lim(x->0) (1 - cos(x))/x.", "lim(x→0) sin(x) / x = 1\nlim(x→0) (1 - cos(x)) / x = 0\n(where x is in radians).", "formula")
    add(11, "mathematics_natural", 2, "What are the three conditions for a function f(x) to be Continuous at x = c?", "1. f(c) is defined\n2. lim(x→c) f(x) exists\n3. lim(x→c) f(x) = f(c)", "concept")
    add(11, "mathematics_natural", 3, "What is the determinant and inverse of a 2x2 matrix A = [[a, b], [c, d]]?", "det(A) = ad - bc\nA⁻¹ = (1 / det(A)) * [[d, -b], [-c, a]] (exists if det(A) ≠ 0).", "formula")
    add(11, "mathematics_natural", 4, "What is the standard equation and focus of a Parabola opening along the x-axis?", "y² = 4ax (vertex at (0, 0), focus at (a, 0), directrix line x = -a).", "formula")
    add(11, "mathematics_natural", 4, "What is the standard equation of an Ellipse with major axis on x-axis?", "x² / a² + y² / b² = 1 (a > b)\nFoci at (±c, 0) where c² = a² - b²; Eccentricity e = c / a < 1.", "formula")
    add(11, "mathematics_natural", 4, "What is the standard equation of a Hyperbola centered at origin?", "x² / a² - y² / b² = 1\nFoci at (±c, 0) where c² = a² + b²; Asymptotes y = ±(b/a)x; Eccentricity e = c / a > 1.", "formula")

    # Grade 12 Natural Math
    add(12, "mathematics_natural", 1, "State the formal definition of the Derivative f'(x).", "f'(x) = lim(h→0) [f(x + h) - f(x)] / h", "definition")
    add(12, "mathematics_natural", 1, "State the Product Rule and Quotient Rule for differentiation.", "Product Rule: (uv)' = u'v + uv'\nQuotient Rule: (u / v)' = (u'v - uv') / v²", "formula")
    add(12, "mathematics_natural", 1, "State the Chain Rule for composite functions.", "If y = f(g(x)), then dy/dx = f'(g(x)) * g'(x) = (dy/du) * (du/dx).", "formula")
    add(12, "mathematics_natural", 1, "What are the derivatives of sin(x), cos(x), tan(x), e^x, and ln(x)?", "d/dx[sin x] = cos x\nd/dx[cos x] = -sin x\nd/dx[tan x] = sec² x\nd/dx[e^x] = e^x\nd/dx[ln x] = 1/x (for x > 0)", "formula")
    add(12, "mathematics_natural", 2, "State Rolle's Theorem and the Mean Value Theorem (MVT).", "MVT: If f is continuous on [a, b] and differentiable on (a, b), there exists c ∈ (a, b) such that f'(c) = [f(b) - f(a)] / (b - a).\nRolle's is the special case where f(a) = f(b) ⇒ f'(c) = 0.", "concept")
    add(12, "mathematics_natural", 2, "State L'Hôpital's Rule for indeterminate forms 0/0 or ∞/∞.", "lim(x→c) [f(x) / g(x)] = lim(x→c) [f'(x) / g'(x)], provided the limit on the right exists.", "concept")
    add(12, "mathematics_natural", 3, "State the Fundamental Theorem of Calculus (FTC Parts 1 & 2).", "Part 1: d/dx [∫_a^x f(t) dt] = f(x)\nPart 2: ∫_a^b f(x) dx = F(b) - F(a), where F'(x) = f(x).", "formula")
    add(12, "mathematics_natural", 3, "State the Integration by Parts formula.", "∫ u dv = u * v - ∫ v du", "formula")
    add(12, "mathematics_natural", 3, "State the Disk and Washer method formulas for Volume of Revolution about x-axis.", "Disk: V = π ∫_a^b [f(x)]² dx\nWasher: V = π ∫_a^b ([R_outer(x)]² - [r_inner(x)]²) dx", "formula")
    add(12, "mathematics_natural", 4, "What is the Dot Product and Cross Product of 3D vectors u and v?", "Dot: u · v = u1*v1 + u2*v2 + u3*v3 = |u||v|cos θ\nCross: u × v = det([[i, j, k], [u1, u2, u3], [v1, v2, v3]]) with magnitude |u||v|sin θ.", "formula")
    add(12, "mathematics_natural", 5, "State Euler's Formula and De Moivre's Theorem for complex numbers.", "Euler: e^(iθ) = cos(θ) + i * sin(θ)\nDe Moivre: [r(cos θ + i sin θ)]^n = r^n * [cos(nθ) + i sin(nθ)]", "formula")
    add(12, "mathematics_natural", 6, "State Bayes' Theorem for conditional probability.", "P(A|B) = [P(B|A) * P(A)] / P(B)", "formula")
    add(12, "mathematics_natural", 6, "What are the Mean and Variance of a Binomial Distribution B(n, p)?", "Mean μ = n * p\nVariance σ² = n * p * (1 - p)\nStandard deviation σ = √(np(1 - p))", "formula")

    # =========================================================================
    # 📊 MATHEMATICS - SOCIAL SCIENCES STREAM (GRADES 11 & 12)
    # =========================================================================
    # Grade 11 Social Math
    add(11, "mathematics_social", 1, "State the Simple Interest formula and total accumulated amount.", "Interest: I = P * r * t\nAmount: A = P(1 + r * t)\nwhere P = principal, r = annual interest rate, t = time in years.", "formula")
    add(11, "mathematics_social", 1, "State the Compound Interest formula for n compounding periods per year.", "A = P * (1 + r / n)^(n * t)\nFor continuous compounding: A = P * e^(r * t).", "formula")
    add(11, "mathematics_social", 1, "State the Future Value of an Ordinary Annuity formula.", "FV = PMT * [((1 + i)^n - 1) / i]\nwhere PMT = periodic payment, i = interest rate per period, n = total periods.", "formula")
    add(11, "mathematics_social", 1, "State the Present Value of an Ordinary Annuity formula (Loan Amortization).", "PV = PMT * [(1 - (1 + i)^(-n)) / i]", "formula")
    add(11, "mathematics_social", 2, "Define the Feasible Region in Linear Programming.", "The set of all points that satisfy all linear constraints simultaneously. The optimal value of the linear objective function always occurs at a corner point (vertex).", "concept")
    add(11, "mathematics_social", 3, "What is Pearson's Correlation Coefficient (r) and its range?", "r measures the strength and direction of a linear relationship between two variables.\n-1 ≤ r ≤ +1 (r = +1: perfect positive, r = -1: perfect negative, r = 0: no linear correlation).", "formula")

    # Grade 12 Social Math
    add(12, "mathematics_social", 1, "What are Marginal Revenue (MR), Marginal Cost (MC), and Marginal Profit (Mπ)?", "MR = d(TR)/dq\nMC = d(TC)/dq\nMπ = MR - MC\nProfit is maximized when MR = MC and d²(Profit)/dq² < 0.", "formula")
    add(12, "mathematics_social", 1, "Define Price Elasticity of Demand using calculus.", "ε = (dQ/dP) * (P / Q)\nElastic if |ε| > 1, inelastic if |ε| < 1, unit elastic if |ε| = 1.", "formula")
    add(12, "mathematics_social", 2, "What are Consumer Surplus and Producer Surplus in terms of integrals?", "Consumer Surplus CS = ∫_0^Q_e (P_demand(q) - P_e) dq\nProducer Surplus PS = ∫_0^Q_e (P_e - P_supply(q)) dq", "formula")
    add(12, "mathematics_social", 3, "State the properties of the Standard Normal Distribution (Z-distribution).", "Bell-shaped, symmetric about mean μ = 0, standard deviation σ = 1. Total area under curve = 1. Z = (X - μ) / σ.", "concept")
    add(12, "mathematics_social", 3, "State the 68-95-99.7 (Empirical) Rule for normal distributions.", "• ~68% of data lies within μ ± 1σ\n• ~95% of data lies within μ ± 2σ\n• ~99.7% of data lies within μ ± 3σ.", "concept")

    print("Mathematics generated successfully.")
