/**
 * Professional Ad Management & Monetization Service
 * Supports Google AdMob, Google AdSense, and High-Yield Native Educational Sponsor Cards.
 * 
 * CORE UX PROMISE:
 * 1. Zero disruption during PDF textbook reading (100% ad-free canvas).
 * 2. Zero disruption during active Quiz solving (timer & questions are 100% distraction-free).
 * 3. High-eCPM native integration in Play Store discovery shelves and post-exam completion screens.
 */

export interface EducationalSponsor {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  badge: string;
  ctaText: string;
  targetUrl: string;
  category: string;
  rating?: number;
  highlightColor: string;
  iconName: string;
}

export const EDUCATIONAL_SPONSORS: EducationalSponsor[] = [
  {
    id: 'ethio-telebirr-edu',
    title: 'Telebirr Student Study Pack',
    subtitle: 'High-Speed Student Internet Bundle',
    description: 'Get special monthly student rates for unlimited educational browsing and textbook downloads.',
    badge: 'Official Partner',
    ctaText: 'View Student Plan',
    targetUrl: 'https://www.ethiotelecom.et/',
    category: 'Connectivity',
    rating: 4.9,
    highlightColor: 'from-amber-500 to-yellow-600',
    iconName: 'Zap',
  },
  {
    id: 'ethio-university-scholarships',
    title: 'Ethiopian University Admissions 2026',
    subtitle: 'Free EUEE Cut-off Calculator & Guide',
    description: 'Calculate your natural or social science university entrance eligibility for AAU, ASTU, and AASTU.',
    badge: 'Higher Education',
    ctaText: 'Calculate Cut-off',
    targetUrl: 'https://moe.gov.et/',
    category: 'Admissions',
    rating: 4.8,
    highlightColor: 'from-emerald-500 to-teal-600',
    iconName: 'GraduationCap',
  },
  {
    id: 'ethio-stem-academy',
    title: 'Ethiopian STEM Olympiad Program',
    subtitle: 'Grades 9–12 Physics & Math Challenge',
    description: 'Compete in nationwide STEM contests, win university scholarships, and access elite prep materials.',
    badge: 'Scholarship',
    ctaText: 'Register Free',
    targetUrl: 'https://t.me/Ethiopianstudentbooks',
    category: 'STEM Excellence',
    rating: 5.0,
    highlightColor: 'from-sky-500 to-indigo-600',
    iconName: 'Award',
  },
];

class AdServiceManager {
  private lastInterstitialTimestamp: number = 0;
  private readonly INTERSTITIAL_COOLDOWN_MS = 6 * 60 * 1000; // Minimum 6 minutes between interstitials to protect UX

  /**
   * Evaluates whether an ad is permitted in the current UI context.
   * STRICT SAFETY: Reading a PDF or solving an active timed quiz is ALWAYS 100% ad-free!
   */
  public isAdAllowed(context: 'pdf_reader' | 'quiz_active' | 'home_shelf' | 'explore_list' | 'exam_completed'): boolean {
    if (context === 'pdf_reader' || context === 'quiz_active') {
      return false;
    }
    return true;
  }

  /**
   * Retrieves a high-performing native educational sponsor for feed shelves.
   */
  public getFeaturedSponsor(index = 0): EducationalSponsor {
    return EDUCATIONAL_SPONSORS[index % EDUCATIONAL_SPONSORS.length];
  }

  /**
   * Checks if an interstitial ad can be shown upon exam completion without violating frequency caps.
   */
  public canShowPostExamAd(): boolean {
    const now = Date.now();
    if (now - this.lastInterstitialTimestamp > this.INTERSTITIAL_COOLDOWN_MS) {
      this.lastInterstitialTimestamp = now;
      return true;
    }
    return false;
  }
}

export const AdService = new AdServiceManager();
