import * as pdfjsLib from 'pdfjs-dist';
import { Book, BookChapter, ChapterSection } from '../types/book';
import { cleanPdfExtractedText, formatIntoWordParagraphs } from '../utils/textCleaner';

// Configure PDF.js worker
try {
  if (typeof window !== 'undefined') {
    pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;
  }
} catch {}

export interface ExtractedPdfData {
  totalPages: number;
  fullText: string;
  pageTexts: string[];
  chapters: BookChapter[];
}

export const PdfExtractorService = {
  /**
   * Extract raw text content with timeout safety and UI responsiveness
   */
  async extractTextFromBlob(
    pdfBlob: Blob,
    maxPages = 30,
    timeoutMs = 4000
  ): Promise<{ totalPages: number; pageTexts: string[]; fullText: string }> {
    const extractionPromise = (async () => {
      try {
        const arrayBuffer = await pdfBlob.arrayBuffer();
        const loadingTask = pdfjsLib.getDocument({
          data: arrayBuffer,
          useWorkerFetch: false,
          isEvalSupported: false,
        });

        const doc = await loadingTask.promise;
        const totalPages = doc.numPages || 100;
        const pageTexts: string[] = [];

        // Scan first pages for units, topics and table of contents
        const pagesToScan = Math.min(totalPages, maxPages);

        for (let i = 1; i <= pagesToScan; i++) {
          try {
            const page = await doc.getPage(i);
            const textContent = await page.getTextContent();

            let pageRaw = '';
            let lastX = -1;
            let lastY = -1;

            for (const item of textContent.items as any[]) {
              const str = item.str;
              if (!str) continue;

              const currentX = item.transform ? item.transform[4] : 0;
              const currentY = item.transform ? item.transform[5] : 0;

              if (lastY !== -1 && Math.abs(currentY - lastY) < 3) {
                const distance = currentX - lastX;
                if (distance > 12) {
                  pageRaw += ' ' + str;
                } else if (distance < 2 && str.length === 1 && /^[a-zA-Z]$/.test(str)) {
                  pageRaw += str;
                } else {
                  pageRaw += ' ' + str;
                }
              } else {
                pageRaw += '\n' + str;
              }

              lastX = currentX + (item.width || str.length * 6);
              lastY = currentY;
            }

            const cleanedPage = cleanPdfExtractedText(pageRaw);
            pageTexts.push(cleanedPage);

            // Yield to browser event loop every 5 pages to keep progress bar silky smooth
            if (i % 5 === 0) {
              await new Promise((resolve) => setTimeout(resolve, 5));
            }
          } catch {
            pageTexts.push('');
          }
        }

        return {
          totalPages,
          pageTexts,
          fullText: pageTexts.join('\n\n'),
        };
      } catch (err) {
        console.warn('PDF extract inner error (falling back to metadata):', err);
        return {
          totalPages: 180,
          pageTexts: [],
          fullText: '',
        };
      }
    })();

    // Safety timeout promise
    const timeoutPromise = new Promise<{ totalPages: number; pageTexts: string[]; fullText: string }>((resolve) => {
      setTimeout(() => {
        resolve({
          totalPages: 180,
          pageTexts: [],
          fullText: '',
        });
      }, timeoutMs);
    });

    return Promise.race([extractionPromise, timeoutPromise]);
  },

  /**
   * Helper to get language-appropriate unit prefix
   */
  getUnitPrefix(lang: string, unitNum: number): string {
    switch (lang) {
      case 'om':
        return `Boqonnaa ${unitNum}`;
      case 'am':
        return `ምዕራፍ ${unitNum}`;
      case 'ti':
        return `ምዕራፍ ${unitNum}`;
      case 'so':
        return `Cutubka ${unitNum}`;
      default:
        return `Unit ${unitNum}`;
    }
  },

  /**
   * Automatically parse extracted PDF text into structured Units, Sections, and clean paragraphs
   */
  generateChaptersFromPdf(
    book: Book,
    pageTexts: string[],
    totalPages: number
  ): BookChapter[] {
    const totalUnits = Math.max(4, Math.min(8, book.totalUnits || 6));
    const pagesPerUnit = Math.max(1, Math.floor(Math.max(1, pageTexts.length) / totalUnits));
    const chapters: BookChapter[] = [];
    const lang = book.language || 'en';

    const unitRegexMap: Record<string, RegExp> = {
      om: /(?:boqonnaa|kutaa)\s*(\d+)[:.\s-–—]+([^\n\r.]+)/i,
      am: /ምዕራፍ\s*(\d+)[:.\s-–—]+([^\n\r.]+)/i,
      ti: /ምዕራፍ\s*(\d+)[:.\s-–—]+([^\n\r.]+)/i,
      so: /cutubka\s*(\d+)[:.\s-–—]+([^\n\r.]+)/i,
      en: /(?:unit|chapter)\s*(\d+)[:.\s-–—]+([^\n\r.]+)/i,
    };

    const unitRegex = unitRegexMap[lang] || unitRegexMap.en;

    for (let u = 1; u <= totalUnits; u++) {
      const startPageIndex = (u - 1) * pagesPerUnit;
      const endPageIndex = Math.min(pageTexts.length, u * pagesPerUnit);
      const unitPagesText = pageTexts.slice(startPageIndex, endPageIndex).join('\n\n');

      const unitPrefix = this.getUnitPrefix(lang, u);

      let unitTitle = `${unitPrefix}`;
      const match = unitPagesText.match(unitRegex);
      if (match && match[2] && match[2].trim().length > 3) {
        const rawFound = match[2].trim().replace(/\s+/g, ' ');
        unitTitle = `${unitPrefix}: ${rawFound.slice(0, 60)}`;
      }

      const paragraphs = formatIntoWordParagraphs(unitPagesText, 30);

      const sections: ChapterSection[] = [];
      const secCount = 3;
      const parasPerSec = Math.max(1, Math.floor(paragraphs.length / secCount));

      for (let s = 1; s <= secCount; s++) {
        const secParas = paragraphs.slice((s - 1) * parasPerSec, s * parasPerSec);
        const sectionContent =
          secParas.length > 0 ? secParas : [unitPagesText.slice(0, 300) || `${unitTitle} Overview and Core Concepts`];

        sections.push({
          id: `${book.id}-u${u}-s${s}`,
          sectionNumber: `${u}.${s}`,
          title: `${unitPrefix}.${s}`,
          content: sectionContent,
          keyTakeaways: [],
        });
      }

      const keyTerms: { term: string; definition: string }[] = [];
      const termCandidates = unitPagesText.match(/\b([A-Z][a-zA-Z]{3,25})\s*:\s*([^.!?\n]{15,120})/g);
      if (termCandidates) {
        termCandidates.slice(0, 4).forEach((tc) => {
          const parts = tc.split(':');
          if (parts[0] && parts[1]) {
            keyTerms.push({
              term: parts[0].trim(),
              definition: parts[1].trim(),
            });
          }
        });
      }

      chapters.push({
        id: `${book.id}-u${u}`,
        unitNumber: u,
        title: unitTitle,
        titleAmharic: lang === 'am' ? unitTitle : undefined,
        titleOromo: lang === 'om' ? unitTitle : undefined,
        titleTigrinya: lang === 'ti' ? unitTitle : undefined,
        titleSomali: lang === 'so' ? unitTitle : undefined,
        description: paragraphs[0]?.slice(0, 200) || `${unitTitle} - ${book.title}`,
        keyObjectives: [],
        readingTimeMinutes: Math.max(10, Math.min(40, Math.round((paragraphs.length * 45) / 60))),
        sections,
        summary: paragraphs[paragraphs.length - 1]?.slice(0, 300) || `${unitTitle}`,
        keyTerms,
        pdfPageStart: startPageIndex + 1,
        pdfPageEnd: endPageIndex + 1,
      });
    }

    return chapters;
  },

  /**
   * Extract and sync chapters into book record with fallback safety
   */
  async extractAndAttachChapters(book: Book, pdfBlob: Blob): Promise<Book> {
    try {
      const { totalPages, pageTexts } = await this.extractTextFromBlob(pdfBlob, 25, 3000);
      if (pageTexts.length === 0) return book;

      const chapters = this.generateChaptersFromPdf(book, pageTexts, totalPages);

      return {
        ...book,
        totalEstimatedPages: totalPages || book.totalEstimatedPages || 210,
        totalUnits: chapters.length || book.totalUnits || 6,
        chapters,
      };
    } catch {
      return book;
    }
  },
};
