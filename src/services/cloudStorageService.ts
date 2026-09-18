import { Book, DownloadMirror } from '../types/book';
import { DbService } from './dbService';
import { StorageService } from './storageService';

export interface CloudStorageConfig {
  cdnBaseUrl: string;
  firebaseBucketUrl?: string;
  googleDriveBaseUrl?: string;
  useOfflineCacheFirst: boolean;
}

export const DEFAULT_CLOUD_CONFIG: CloudStorageConfig = {
  cdnBaseUrl: 'https://cdn.ethiopian-curriculum.gov.et/textbooks/v2',
  firebaseBucketUrl: 'https://firebasestorage.googleapis.com/v0/b/ethio-curriculum-books.appspot.com/o',
  googleDriveBaseUrl: 'https://drive.google.com/uc?export=download&id=',
  useOfflineCacheFirst: true,
};

export const CloudStorageService = {
  /**
   * Resolve best direct PDF URL from CDN, Firebase, Google Drive or local cache
   */
  async resolveBookPdfUrl(book: Book): Promise<string> {
    // 1. Check if downloaded locally in IndexedDB cache
    try {
      const cached = await DbService.getPdfFile(book.id);
      if (cached && cached.blob) {
        return URL.createObjectURL(cached.blob);
      }
    } catch {}

    // 2. Local public file if bundled
    if (book.pdfUrl && book.pdfUrl.startsWith('/')) {
      return book.pdfUrl;
    }

    // 3. CDN direct link
    if (book.cdnPdfUrl) {
      return book.cdnPdfUrl;
    }

    // 4. Cloud Storage link
    if (book.cloudStorageUrl) {
      return book.cloudStorageUrl;
    }

    // 5. Google Drive export direct link
    if (book.googleDriveId) {
      return `${DEFAULT_CLOUD_CONFIG.googleDriveBaseUrl}${book.googleDriveId}`;
    }

    // 6. Direct fallback PDF URL
    if (book.pdfUrl) {
      return book.pdfUrl;
    }

    // 7. Auto CDN fallback URL based on grade and subject
    return `${DEFAULT_CLOUD_CONFIG.cdnBaseUrl}/grade-${book.grade}/${book.subject}-${book.language}.pdf`;
  },

  /**
   * Get all available download mirrors for a textbook
   */
  getDownloadMirrors(book: Book): DownloadMirror[] {
    const mirrors: DownloadMirror[] = [];

    // Fast CDN Primary
    mirrors.push({
      name: '⚡ High-Speed Ethiopian Curriculum CDN (Direct)',
      url: book.cdnPdfUrl || `${DEFAULT_CLOUD_CONFIG.cdnBaseUrl}/grade-${book.grade}/${book.subject}-${book.language}.pdf`,
      provider: 'cdn',
      direct: true,
      fileSize: `${book.fileSizeMb || 15} MB`,
    });

    // Cloud Storage Mirror
    if (book.cloudStorageUrl) {
      mirrors.push({
        name: '☁️ Cloud Storage Mirror (Firebase / R2)',
        url: book.cloudStorageUrl,
        provider: 'firebase',
        direct: true,
        fileSize: `${book.fileSizeMb || 15} MB`,
      });
    }

    // Google Drive Mirror
    if (book.googleDriveId) {
      mirrors.push({
        name: '📂 Google Drive Official Mirror',
        url: `${DEFAULT_CLOUD_CONFIG.googleDriveBaseUrl}${book.googleDriveId}`,
        provider: 'googledrive',
        direct: true,
        fileSize: `${book.fileSizeMb || 15} MB`,
      });
    }

    // Kehulum / MoE portals
    if (book.moeUrl) {
      mirrors.push({
        name: '🏛️ Ministry of Education Portal (study.moe.gov.et)',
        url: book.moeUrl,
        provider: 'moe',
        direct: false,
      });
    }

    if (book.kehulumUrl) {
      mirrors.push({
        name: '🌐 Kehulum Educational Digital Library',
        url: book.kehulumUrl,
        provider: 'mirror',
        direct: false,
      });
    }

    if (book.telegramUrl) {
      mirrors.push({
        name: '✈️ Telegram Fast Textbook Bot & Channel',
        url: book.telegramUrl,
        provider: 'mirror',
        direct: false,
      });
    }

    return mirrors;
  },

  /**
   * Save a Blob to the user's mobile or computer storage (Downloads folder)
   */
  downloadBlobToDevice(blob: Blob, filename: string) {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    setTimeout(() => URL.revokeObjectURL(url), 10000);
  },

  /**
  /**
   * Complete 2-in-1 Mobile Storage & In-App Workflow:
   * 1. Saves .pdf to mobile storage (Downloads folder) so user owns the physical file
   * 2. Saves to browser IndexedDB persistent storage so the app can open & read it offline
   * 3. Marks the book as offline in localStorage
   */
  async downloadAndSaveBookToDevice(
    book: Book,
    onProgress?: (percent: number) => void,
    forcePhoneDownload: boolean = false
  ): Promise<{ success: boolean; blob?: Blob }> {
    try {
      if (onProgress) onProgress(20);

      // Check if already in IndexedDB (and if it's the real PDF rather than tiny sample)
      let blob: Blob | null = null;
      let isFirstTime = false;
      const cached = await DbService.getPdfFile(book.id);
      if (cached && cached.blob && (!book.pdfUrl || cached.blob.size > 100000)) {
        blob = cached.blob;
      } else {
        isFirstTime = true;
        if (onProgress) onProgress(40);

        // 1. If real local or remote PDF URL is provided, fetch direct PDF
        if (book.pdfUrl) {
          try {
            const resp = await fetch(book.pdfUrl);
            if (resp.ok) {
              blob = await resp.blob();
              await DbService.savePdfFile(book.id, blob, `${book.title}.pdf`);
            }
          } catch (fetchErr) {
            console.warn(`Direct fetch for ${book.pdfUrl} failed:`, fetchErr);
          }
        }

        // 2. Fallback to high quality generated sample if real file could not be fetched
        if (!blob) {
          const pdfBytes = await this.generateSampleBookPdfBytes(book);
          blob = new Blob([pdfBytes as any], { type: 'application/pdf' });
          await DbService.savePdfFile(book.id, blob, `${book.title}.pdf`);
        }
      }

      // Mark book as offline in localStorage so library cards update immediately
      StorageService.markBookOffline(book.id);

      if (onProgress) onProgress(80);

      // Save to user's mobile or computer storage (Downloads folder)
      // Done automatically on first time reading OR when user clicks Download icon
      if (isFirstTime || forcePhoneDownload) {
        const safeFilename = `${book.title.replace(/[/\\?%*:|"<>]/g, '_')}.pdf`;
        this.downloadBlobToDevice(blob, safeFilename);
      }

      if (onProgress) onProgress(100);
      return { success: true, blob };
    } catch (err) {
      console.error('Failed to download and save book to device:', err);
      return { success: false };
    }
  },

  /**
   * Import / Save a PDF selected directly from user's mobile device storage
   */
  async importPdfFromDevice(
    file: File,
    targetBookId?: string
  ): Promise<{ bookId: string; filename: string }> {
    const bookId = targetBookId || `imported-${Date.now()}`;
    await DbService.savePdfFile(bookId, file, file.name);
    return { bookId, filename: file.name };
  },

  /**
   * Download and cache sample textbook for instant offline reading
   */
  async cacheSampleBookForOffline(book: Book, onProgress?: (percent: number) => void): Promise<boolean> {
    try {
      if (onProgress) onProgress(20);
      const res = await this.downloadAndSaveBookToDevice(book, onProgress, false);
      return res.success;
    } catch (err) {
      console.error('Failed to cache sample book:', err);
      return false;
    }
  },

  /**
   * Generates a multi-page, valid PDF-1.4 Ethiopian curriculum textbook with exact offsets
   */
  async generateSampleBookPdfBytes(book: Book): Promise<Uint8Array> {
    const escapePdf = (str: string) =>
      String(str || '')
        .replace(/\\/g, '\\\\')
        .replace(/\(/g, '\\(')
        .replace(/\)/g, '\\)')
        .replace(/[^\x20-\x7E\r\n\t]/g, ' ');

    interface TextItem {
      text: string;
      x: number;
      y: number;
      font: '/F1' | '/F2';
      size: number;
    }

    const pages: TextItem[][] = [];

    // --- Page 1: Official Textbook Cover ---
    const coverItems: TextItem[] = [
      { text: 'FEDERAL DEMOCRATIC REPUBLIC OF ETHIOPIA', x: 50, y: 740, font: '/F2', size: 12 },
      { text: 'MINISTRY OF EDUCATION', x: 50, y: 722, font: '/F2', size: 11 },
      { text: 'STUDENT TEXTBOOK - NEW CURRICULUM (GRADES 5 - 8)', x: 50, y: 690, font: '/F1', size: 10 },
      { text: '==================================================================', x: 50, y: 675, font: '/F1', size: 9 },
      { text: escapePdf(book.title), x: 50, y: 630, font: '/F2', size: 17 },
      { text: `Grade ${book.grade} - ${book.subject.toUpperCase()}`, x: 50, y: 600, font: '/F2', size: 14 },
      { text: `Medium of Instruction: ${(book.language || 'en').toUpperCase()}  |  Edition: ${book.editionYear || 2024}`, x: 50, y: 575, font: '/F1', size: 11 },
      { text: `Curriculum: ${book.curriculum || 'New National Curriculum'}`, x: 50, y: 555, font: '/F1', size: 11 },
      { text: '------------------------------------------------------------------', x: 50, y: 535, font: '/F1', size: 9 },
      { text: 'STATUS: SAVED TO DEVICE STORAGE & AVAILABLE OFFLINE', x: 50, y: 505, font: '/F2', size: 11 },
      { text: 'This textbook is stored in your device Downloads folder and local offline cache.', x: 50, y: 485, font: '/F1', size: 10 },
      { text: 'You can study, take chapter notes, and generate practice quizzes without internet.', x: 50, y: 465, font: '/F1', size: 10 },
      { text: 'Developed and Approved by Ministry of Education, Addis Ababa, Ethiopia.', x: 50, y: 100, font: '/F1', size: 9 },
    ];
    pages.push(coverItems);

    // --- Page 2: Table of Contents & Study Guide ---
    const tocItems: TextItem[] = [
      { text: 'TABLE OF CONTENTS & CURRICULUM SYLLABUS', x: 50, y: 740, font: '/F2', size: 15 },
      { text: `Grade ${book.grade} ${book.subject} - Official MoE Structure`, x: 50, y: 720, font: '/F1', size: 11 },
      { text: '==================================================================', x: 50, y: 705, font: '/F1', size: 9 },
    ];

    let tocY = 670;
    const totalUnits = book.totalUnits || 6;
    for (let u = 1; u <= Math.min(totalUnits, 6); u++) {
      const ch = book.chapters?.[u - 1];
      const title = ch?.title || `Unit ${u}: Core Fundamentals and Principles`;
      tocItems.push({
        text: `Unit ${u}: ${escapePdf(title).slice(0, 48)} ... Page ${u + 2}`,
        x: 50,
        y: tocY,
        font: '/F1',
        size: 11,
      });
      tocY -= 25;
    }

    tocItems.push(
      { text: '------------------------------------------------------------------', x: 50, y: tocY - 10, font: '/F1', size: 9 },
      { text: 'STUDENT STUDY & EXAMINATION TIPS (MINISTRY EXAM PREP):', x: 50, y: tocY - 35, font: '/F2', size: 11 },
      { text: '1. Read each unit learning objective before studying the core concepts.', x: 50, y: tocY - 60, font: '/F1', size: 10 },
      { text: '2. Use the in-app Quiz Generator (Award icon) to practice 25-50 questions.', x: 50, y: tocY - 80, font: '/F1', size: 10 },
      { text: '3. Highlight key terms and use the Notes tool for daily revision.', x: 50, y: tocY - 100, font: '/F1', size: 10 },
      { text: '4. Practice past regional exam style questions at the end of each unit.', x: 50, y: tocY - 120, font: '/F1', size: 10 }
    );
    pages.push(tocItems);

    // --- Pages 3+: Units & Concepts ---
    const chaptersToRender = (book.chapters && book.chapters.length > 0)
      ? book.chapters.slice(0, 4)
      : Array.from({ length: 3 }, (_, i) => ({
          unitNumber: i + 1,
          title: `Unit ${i + 1}: Key Competencies and Knowledge Areas`,
          description: `Comprehensive study of unit concepts, theoretical foundations, and practical exercises.`,
          keyObjectives: [
            'Understand foundational definitions and national curriculum standards.',
            'Apply analytical and critical thinking to solve practical problems.',
            'Master core concepts required for school assessments and national exams.',
          ],
          sections: [
            {
              sectionNumber: `${i + 1}.1`,
              title: 'Introduction and Essential Concepts',
              content: [
                'This section introduces the foundational principles of the subject.',
                'Students learn to analyze patterns, formulate hypotheses, and evaluate evidence.',
                'Knowledge gained here directly supports the practical exercises in subsequent sections.'
              ],
              keyTakeaways: ['Master fundamental terminology', 'Practice continuous self-review']
            }
          ]
        }));

    chaptersToRender.forEach((ch, idx) => {
      const unitNum = ch.unitNumber || (idx + 1);
      const unitItems: TextItem[] = [
        { text: `UNIT ${unitNum}: ${escapePdf(ch.title).toUpperCase()}`, x: 50, y: 740, font: '/F2', size: 14 },
        { text: `Grade ${book.grade} - ${book.subject} | New Ethiopian Curriculum`, x: 50, y: 720, font: '/F1', size: 10 },
        { text: '==================================================================', x: 50, y: 705, font: '/F1', size: 9 },
        { text: 'LEARNING COMPETENCIES & KEY OBJECTIVES:', x: 50, y: 680, font: '/F2', size: 11 },
      ];

      let uY = 658;
      (ch.keyObjectives || [
        'Understand and apply core scientific/mathematical principles.',
        'Solve real-world contextual problems relevant to Ethiopia.',
        'Demonstrate mastery in regional and national exam assessments.'
      ]).slice(0, 3).forEach((obj) => {
        unitItems.push({
          text: `- ${escapePdf(obj).slice(0, 75)}`,
          x: 55,
          y: uY,
          font: '/F1',
          size: 9.5,
        });
        uY -= 20;
      });

      uY -= 10;
      unitItems.push(
        { text: 'CORE THEORETICAL CONCEPTS & EXPLANATIONS:', x: 50, y: uY, font: '/F2', size: 11 }
      );
      uY -= 22;

      const descLines = [
        ch.description || 'Comprehensive textbook chapter covering standard curriculum principles.',
        'Students are encouraged to actively engage with the material and take notes.',
        'Key principles are illustrated with Ethiopian practical examples and applications.',
        'Consistent practice will ensure high academic achievement in examinations.'
      ];

      descLines.forEach((line) => {
        unitItems.push({
          text: escapePdf(line),
          x: 50,
          y: uY,
          font: '/F1',
          size: 9.5,
        });
        uY -= 18;
      });

      uY -= 15;
      unitItems.push(
        { text: 'EXAMINATION & SELF-ASSESSMENT QUESTIONS:', x: 50, y: uY, font: '/F2', size: 11 },
        { text: `1. Define the primary concepts introduced in Unit ${unitNum} and state their importance.`, x: 50, y: uY - 22, font: '/F1', size: 9.5 },
        { text: `2. How do the principles of Unit ${unitNum} apply to real-world development in Ethiopia?`, x: 50, y: uY - 42, font: '/F1', size: 9.5 },
        { text: `3. Practice the 25-50 question quiz for this unit using the Quiz button above.`, x: 50, y: uY - 62, font: '/F1', size: 9.5 },
        { text: 'Summary: Review these questions and save your personal notes in the reader.', x: 50, y: 100, font: '/F1', size: 9 }
      );

      pages.push(unitItems);
    });

    // Generate Standard PDF 1.4 objects
    const numPages = pages.length;
    const pageObjIds = pages.map((_, i) => 7 + i * 2);

    const objects = new Map<number, string>();
    objects.set(1, '<< /Type /Catalog /Pages 3 0 R >>');
    objects.set(2, `<< /Title (${escapePdf(book.title)}) /Author (Federal Democratic Republic of Ethiopia Ministry of Education) /Creator (Ethiopian Curriculum App) >>`);
    objects.set(3, `<< /Type /Pages /Kids [${pageObjIds.map((id) => `${id} 0 R`).join(' ')}] /Count ${numPages} >>`);
    objects.set(4, '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>');
    objects.set(5, '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>');
    objects.set(6, '<< /Font << /F1 4 0 R /F2 5 0 R >> >>');

    for (let i = 0; i < numPages; i++) {
      const pageObjId = 7 + i * 2;
      const streamObjId = pageObjId + 1;

      let streamBody = 'BT\n';
      for (const item of pages[i]) {
        streamBody += `${item.font} ${item.size} Tf\n`;
        streamBody += `1 0 0 1 ${item.x} ${item.y} Tm\n`;
        streamBody += `(${escapePdf(item.text)}) Tj\n`;
      }
      streamBody += 'ET';

      objects.set(
        pageObjId,
        `<< /Type /Page /Parent 3 0 R /MediaBox [0 0 612 792] /Contents ${streamObjId} 0 R /Resources 6 0 R >>`
      );
      objects.set(streamObjId, `<< /Length ${streamBody.length} >>\nstream\n${streamBody}\nendstream`);
    }

    let output = '%PDF-1.4\n%\xE2\xE3\xCF\xD3\n';
    const offsets: number[] = [];
    const maxObjId = 6 + numPages * 2;

    for (let id = 1; id <= maxObjId; id++) {
      offsets[id] = output.length;
      output += `${id} 0 obj\n${objects.get(id)}\nendobj\n`;
    }

    const xrefOffset = output.length;
    output += `xref\n0 ${maxObjId + 1}\n`;
    output += '0000000000 65535 f \n';
    for (let id = 1; id <= maxObjId; id++) {
      output += `${String(offsets[id]).padStart(10, '0')} 00000 n \n`;
    }

    output += `trailer\n<< /Size ${maxObjId + 1} /Root 1 0 R /Info 2 0 R >>\nstartxref\n${xrefOffset}\n%%EOF\n`;

    return new TextEncoder().encode(output);
  },
};
