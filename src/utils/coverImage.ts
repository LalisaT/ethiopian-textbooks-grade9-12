import { Book } from '../types/book';

/**
 * Resolves the official front cover image path for any Ethiopian textbook
 */
export function getBookCoverUrl(book: Book): string {
  if (book.coverImageUrl) {
    return book.coverImageUrl;
  }

  // 1. Teacher's guide mapping
  if (book.bookType === 'teacher_guide' && book.pdfUrl) {
    const filename = book.pdfUrl.split('/').pop()?.replace(/\.pdf$/i, '.jpg');
    if (filename) {
      return `/covers/teacher-guide/grade-${book.grade}/${filename}`;
    }
  }

  // 2. Direct mapping from local textbook path: /textbooks/grade-12/physics.pdf -> /covers/grade-12/physics.jpg
  if (book.pdfUrl && book.pdfUrl.startsWith('/textbooks/')) {
    return book.pdfUrl.replace('/textbooks/', '/covers/').replace(/\.pdf$/i, '.jpg');
  }

  // 3. Subject-based mapping
  const subjectSlug = book.subject.toLowerCase().replace(/_/g, '-');
  return `/covers/grade-${book.grade}/${subjectSlug}.jpg`;
}
