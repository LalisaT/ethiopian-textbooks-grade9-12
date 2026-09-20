/**
 * Official Google AdMob Monetization & Ad Placement Service
 * Configured with Google AdMob Production & Test Ad Unit IDs.
 * 
 * POLICY & ARCHITECTURE:
 * 1. Pure Google AdMob containers — zero dummy company or third-party sponsor names.
 * 2. Rewarded Video Ads: Required to access Quizzes & Questions (verifies internet connection, then requires completed video view).
 * 3. Bottom Reader Banner: Rendered at the bottom of books ONLY when mobile data/internet is active (hidden when offline).
 */

export interface AdMobConfig {
  appId: {
    android: string;
    ios: string;
  };
  units: {
    banner: string;
    rewardedVideo: string;
    interstitial: string;
    nativeAdvanced: string;
  };
}

// Google Official Test Ad Unit IDs (replace with your published Google AdMob IDs when releasing to Google Play Store)
export const ADMOB_CONFIG: AdMobConfig = {
  appId: {
    android: 'ca-app-pub-3940256099942544~3347511713', // Google AdMob Test App ID
    ios: 'ca-app-pub-3940256099942544~1458602512',
  },
  units: {
    // Official Google AdMob Test Ad Units
    banner: 'ca-app-pub-3940256099942544/6300978111',
    rewardedVideo: 'ca-app-pub-3940256099942544/5224354917',
    interstitial: 'ca-app-pub-3940256099942544/1033173712',
    nativeAdvanced: 'ca-app-pub-3940256099942544/2247696110',
  },
};

class AdServiceManager {
  private config: AdMobConfig = ADMOB_CONFIG;
  private isInitialized = false;

  /**
   * Initializes AdMob SDK (Capacitor Native or Web SDK)
   */
  public async initialize(): Promise<void> {
    if (this.isInitialized) return;
    try {
      // Check if native Capacitor AdMob plugin is registered on Android
      if (typeof window !== 'undefined' && (window as any).Capacitor?.isNativePlatform?.()) {
        console.info('[AdMob] Native Android detected. Readying AdMob SDK:', this.config.appId.android);
      } else {
        console.info('[AdMob] Web/PWA environment initialized with AdMob responsive slots.');
      }
      this.isInitialized = true;
    } catch (err) {
      console.warn('[AdMob] Init warning:', err);
    }
  }

  /**
   * Returns current AdMob configuration
   */
  public getConfig(): AdMobConfig {
    return this.config;
  }

  /**
   * Updates configuration with your real production AdMob IDs from Google AdMob console
   */
  public setProductionUnitIds(newUnits: Partial<AdMobConfig['units']>): void {
    this.config.units = {
      ...this.config.units,
      ...newUnits,
    };
  }
}

export const AdService = new AdServiceManager();
