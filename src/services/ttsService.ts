export class TTSService {
  private static synth: SpeechSynthesis | null = typeof window !== 'undefined' ? window.speechSynthesis : null;
  private static currentUtterance: SpeechSynthesisUtterance | null = null;
  private static isSpeakingState = false;

  public static speak(
    text: string,
    lang = 'en-US',
    rate = 0.95,
    onEnd?: () => void,
    onError?: (e: any) => void
  ) {
    if (!this.synth) {
      if (onError) onError(new Error('Speech Synthesis not supported in this browser.'));
      return;
    }

    this.stop();

    const cleanText = text.replace(/<[^>]*>?/gm, '').trim();
    if (!cleanText) return;

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = rate;
    utterance.pitch = 1.0;
    utterance.lang = lang;

    utterance.onstart = () => {
      this.isSpeakingState = true;
    };

    utterance.onend = () => {
      this.isSpeakingState = false;
      this.currentUtterance = null;
      if (onEnd) onEnd();
    };

    utterance.onerror = (e) => {
      this.isSpeakingState = false;
      this.currentUtterance = null;
      if (onError) onError(e);
    };

    this.currentUtterance = utterance;
    this.synth.speak(utterance);
  }

  public static stop() {
    if (this.synth) {
      this.synth.cancel();
      this.isSpeakingState = false;
      this.currentUtterance = null;
    }
  }

  public static isSpeaking(): boolean {
    return this.isSpeakingState && (this.synth?.speaking || false);
  }
}
