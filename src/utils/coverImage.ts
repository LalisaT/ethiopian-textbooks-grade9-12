import { Book } from '../types/book';

/**
 * Resolves the official front cover image path for any Ethiopian textbook or teacher's guide
 */
export function getBookCoverUrl(book: Book): string {
  if (book.coverImageUrl) {
    return decodeURIComponent(book.coverImageUrl);
  }

  // 1. Teacher's guide mapping: /teacher-guide/grade-10/Biology...pdf -> /covers/teacher-guide/grade-10/Biology...jpg
  if (book.bookType === 'teacher_guide' && book.pdfUrl) {
    const rawFilename = book.pdfUrl.split('/').pop()?.replace(/\.pdf$/i, '.jpg');
    if (rawFilename) {
      return `/covers/teacher-guide/grade-${book.grade}/${decodeURIComponent(rawFilename)}`;
    }
  }

  // 2. Direct mapping from local textbook path: /textbooks/grade-12/physics.pdf -> /covers/grade-12/physics.jpg
  if (book.pdfUrl && book.pdfUrl.startsWith('/textbooks/')) {
    const rawPath = book.pdfUrl.replace('/textbooks/', '/covers/').replace(/\.pdf$/i, '.jpg');
    return decodeURIComponent(rawPath);
  }

  // 3. Subject-based mapping fallback
  const subjectSlug = book.subject.toLowerCase().replace(/_/g, '-');
  return `/covers/grade-${book.grade}/${subjectSlug}.jpg`;
}
