/**
 * High-quality Text Normalizer & PDF Fragment Cleaner
 * Fixes broken PDF glyph spacing (e.g. "K utaa 7" -> "Kutaa 7", "lakkoo f sa" -> "lakkoofsa")
 * and formats raw PDF stream text into clean, cohesive Microsoft Word style paragraphs.
 */

export function cleanPdfExtractedText(rawText: string): string {
  if (!rawText) return '';

  let text = rawText;

  // 1. Normalize line endings and multiple spaces
  text = text.replace(/\r\n/g, '\n').replace(/\r/g, '\n');

  // 2. Fix common PDF character-level space splits
  // e.g., "K utaa" -> "Kutaa", "G ilgaala" -> "Gilgaala", "F akkaatanii" -> "Fakkaatanii"
  text = text.replace(/\b([A-Z])\s+([a-z]{2,})/g, '$1$2');

  // Fix broken multi-split syllables (e.g., "lakkoo f sa" -> "lakkoofsa", "poozat iiv" -> "poozatiiv")
  text = text.replace(/([a-zA-Z]{3,})\s+([a-zA-Z]{1,2})\s+([a-zA-Z]{2,})/g, '$1$2$3');
  text = text.replace(/([a-zA-Z]{2,})\s+([a-zA-Z]{1})\s+([a-zA-Z]{2,})/g, '$1$2$3');

  // Fix split suffix particles in Afaan Oromoo & English
  // e.g., "d ha" -> "dha", "t a'a" -> "ta'a", "ta' an" -> "ta'an", "s a" -> "sa", "k an" -> "kan"
  text = text.replace(/\b([a-zA-Z])\s+ha\b/g, '$1ha');
  text = text.replace(/\b([a-zA-Z]{2,})\s+(dha|ti|sa|an|on|ol)\b/g, '$1$2');
  text = text.replace(/\b([a-zA-Z]{2,})\s*'\s*([a-zA-Z]{1,3})\b/g, "$1'$2");
  text = text.replace(/\b([a-zA-Z]{2,})\s*’\s*([a-zA-Z]{1,3})\b/g, "$1'$2");

  // Fix numbers attached to words (e.g. "Kutaa 7 33 Gilgaala 2")
  text = text.replace(/\s+/g, ' ');

  // 3. Remove standalone page headers/footers numbers artifacts
  text = text.replace(/(?:page|\bpg\b)\s*\d+/gi, '');

  return text.trim();
}

/**
 * Group clean sentences into natural, readable Microsoft Word paragraphs
 */
export function formatIntoWordParagraphs(cleanText: string, minWordsPerPara = 30): string[] {
  if (!cleanText) return [];

  // Split by genuine sentence ends (. ! ? or Ethiopian ።)
  const rawSentences = cleanText
    .split(/(?<=[.!?።])\s+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 8 && !/^\d+$/.test(s));

  if (rawSentences.length === 0) {
    return cleanText.split('\n').filter((l) => l.trim().length > 0);
  }

  const paragraphs: string[] = [];
  let currentPara: string[] = [];
  let currentWordCount = 0;

  for (const sentence of rawSentences) {
    const words = sentence.split(/\s+/).length;
    currentPara.push(sentence);
    currentWordCount += words;

    if (currentWordCount >= minWordsPerPara) {
      paragraphs.push(currentPara.join(' '));
      currentPara = [];
      currentWordCount = 0;
    }
  }

  if (currentPara.length > 0) {
    if (paragraphs.length > 0 && currentWordCount < 20) {
      paragraphs[paragraphs.length - 1] += ' ' + currentPara.join(' ');
    } else {
      paragraphs.push(currentPara.join(' '));
    }
  }

  return paragraphs;
}
