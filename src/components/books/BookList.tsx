import React from 'react';
import { Book } from '../../types/book';
import { BookCard } from './BookCard';
import { useTranslation } from '../../i18n/useTranslation';
import { BookX, Sparkles, RefreshCw } from 'lucide-react';

interface BookListProps {
  books: Book[];
  onOpenInteractive: (book: Book) => void;
  onOpenPdf: (book: Book) => void;
  onToggleOffline: (bookId: string) => void;
  offlineBookIds: string[];
  readingProgress: Record<string, { percentComplete: number }>;
  isAdmin?: boolean;
  onEditBook?: (book: Book) => void;
  onDeleteBook?: (bookId: string) => void;
}

export const BookList: React.FC<BookListProps> = ({
  books,
  onOpenInteractive,
  onOpenPdf,
  onToggleOffline,
  offlineBookIds,
  readingProgress,
  isAdmin = false,
  onEditBook,
  onDeleteBook,
}) => {
  const { t } = useTranslation();

  if (books.length === 0) {
    return (
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-12 text-center border border-slate-200 dark:border-slate-800 shadow-sm my-6 space-y-4">
        <div className="w-16 h-16 rounded-2xl bg-amber-50 dark:bg-amber-950/60 text-amber-500 flex items-center justify-center mx-auto">
          <BookX className="w-8 h-8" />
        </div>
        <div>
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            No Textbooks Match Your Search
          </h3>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 max-w-md mx-auto mt-1">
            Try choosing <strong>"All Grades"</strong> or <strong>"All Languages"</strong> above, or search for keywords like <em>"Physics", "Economics", "Biology", "ፊዚክስ", "Herrega", "Grade 12"</em>.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {books.map((book) => (
        <BookCard
          key={book.id}
          book={book}
          onOpenInteractive={onOpenInteractive}
          onOpenPdf={onOpenPdf}
          onToggleOffline={onToggleOffline}
          isOffline={offlineBookIds.includes(book.id)}
          progressPercent={readingProgress[book.id]?.percentComplete || 0}
          isAdmin={isAdmin}
          onEditBook={onEditBook}
          onDeleteBook={onDeleteBook}
        />
      ))}
    </div>
  );
};
