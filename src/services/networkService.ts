/**
 * NetworkService
 * Real-time internet connectivity detection and reachability verification.
 * Specifically used to enforce active internet connection for quizzes & exam questions.
 */

type NetworkListener = (isOnline: boolean) => void;

class NetworkServiceClass {
  private lastCheckedTime = 0;
  private lastCheckedResult = typeof navigator !== 'undefined' ? navigator.onLine : true;
  private listeners: Set<NetworkListener> = new Set();
  private cacheDurationMs = 4000; // 4 seconds cache to prevent flooding
  private isChecking = false;

  constructor() {
    if (typeof window !== 'undefined') {
      window.addEventListener('online', () => {
        this.checkInternetConnection(true);
      });

      window.addEventListener('offline', () => {
        this.lastCheckedResult = false;
        this.notify(false);
      });
    }
  }

  /**
   * Fast synchronous check using navigator.onLine and last probe result.
   */
  public isOnlineFast(): boolean {
    if (typeof navigator === 'undefined') return true;
    if (!navigator.onLine) return false;
    return this.lastCheckedResult;
  }

  /**
   * Asynchronous check that tests actual internet reachability via lightweight ping probes.
   * @param forceCheck If true, bypasses the 4-second cache.
   */
  public async checkInternetConnection(forceCheck = false): Promise<boolean> {
    if (typeof navigator !== 'undefined' && !navigator.onLine) {
      this.lastCheckedResult = false;
      this.notify(false);
      return false;
    }

    const now = Date.now();
    if (!forceCheck && now - this.lastCheckedTime < this.cacheDurationMs) {
      return this.lastCheckedResult;
    }

    if (this.isChecking) {
      return this.lastCheckedResult;
    }

    this.isChecking = true;
    try {
      const isConnected = await this.pingProbe();
      this.lastCheckedTime = Date.now();
      this.lastCheckedResult = isConnected;
      this.notify(isConnected);
      return isConnected;
    } finally {
      this.isChecking = false;
    }
  }

  /**
   * Fast lightweight probes to verify real internet connectivity.
   */
  private async pingProbe(): Promise<boolean> {
    const endpoints = [
      'https://www.google.com/generate_204',
      'https://cloudflare.com/cdn-cgi/trace',
    ];

    for (const url of endpoints) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 3500);

        // mode: 'no-cors' allows opaque cross-origin response without CORS failure
        await fetch(`${url}?_t=${Date.now()}`, {
          method: 'HEAD',
          mode: 'no-cors',
          cache: 'no-store',
          signal: controller.signal,
        });

        clearTimeout(timeoutId);
        return true;
      } catch (err) {
        // Probe failed or timed out, try next candidate
      }
    }

    return false;
  }

  /**
   * Subscribe to real-time network status changes.
   */
  public subscribe(listener: NetworkListener): () => void {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notify(isOnline: boolean) {
    this.listeners.forEach((listener) => {
      try {
        listener(isOnline);
      } catch (err) {
        console.error('Error in network listener:', err);
      }
    });
  }
}

export const NetworkService = new NetworkServiceClass();
