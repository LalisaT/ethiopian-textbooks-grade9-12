import React, { useState, useMemo, useEffect } from 'react';
import { Book, GradeLevel, SubjectCategory, AcademicStream } from '../types/book';
import { useTranslation } from '../i18n/useTranslation';
import { BookFilters } from '../components/books/BookFilters';
import { BookList } from '../components/books/BookList';
import { StickyBannerAd } from '../components/ads/StickyBannerAd';
import { BookOpen, Sparkles, RefreshCw, Compass } from 'lucide-react';

interface BooksExplorePageProps {
  books: Book[];
  onOpenInteractive: (book: Book) => void;
  onOpenPdf: (book: Book) => void;
  onToggleOffline: (bookId: string) => void;
  offlineBookIds: string[];
  readingProgress: Record<string, { percentComplete: number }>;
  initialGrade?: GradeLevel | 'all';
  initialStream?: AcademicStream;
  initialBookType?: 'all' | 'textbook' | 'teacher_guide';
  isAdmin?: boolean;
  onEditBook?: (book: Book) => void;
  onDeleteBook?: (bookId: string) => void;
  // Deprecated compatibility props
  initialRegion?: any;
  initialLanguage?: any;
}

export const BooksExplorePage: React.FC<BooksExplorePageProps> = ({
  books,
  onOpenInteractive,
  onOpenPdf,
  onToggleOffline,
  offlineBookIds,
  readingProgress,
  initialGrade = 'all',
  initialStream = 'all',
  initialBookType = 'all',
  isAdmin = false,
  onEditBook,
  onDeleteBook,
}) => {
  const { t } = useTranslation();
  const [selectedGrade, setSelectedGrade] = useState<GradeLevel | 'all'>(initialGrade);
  const [selectedStream, setSelectedStream] = useState<AcademicStream>(initialStream);
  const [selectedSubject, setSelectedSubject] = useState<SubjectCategory | 'all'>('all');
  const [selectedBookType, setSelectedBookType] = useState<'all' | 'textbook' | 'teacher_guide'>(initialBookType);
  const [searchQuery, setSearchQuery] = useState('');

  // Synchronize state when navigation triggers changes in props
  useEffect(() => {
    if (initialGrade !== undefined) {
      setSelectedGrade(initialGrade);
    }
  }, [initialGrade]);

  useEffect(() => {
    if (initialStream !== undefined) {
      setSelectedStream(initialStream);
    }
  }, [initialStream]);

  useEffect(() => {
    if (initialBookType !== undefined) {
      setSelectedBookType(initialBookType);
    }
  }, [initialBookType]);

  // Robust, multi-keyword search & filter algorithm for Grade 9-12
  const filteredBooks = useMemo(() => {
    return books.filter((book) => {
      // 1. Book Type filter (Student Textbook vs Teacher's Guide)
      if (selectedBookType !== 'all') {
        const isTG = book.bookType === 'teacher_guide';
        if (selectedBookType === 'teacher_guide' && !isTG) return false;
        if (selectedBookType === 'textbook' && isTG) return false;
      }

      // 2. Grade filter
      if (selectedGrade !== 'all' && book.grade !== selectedGrade) {
        return false;
      }

      // 3. Stream filter (natural_science, social_science, common)
      if (selectedStream !== 'all') {
        if (book.stream && book.stream !== selectedStream && book.stream !== 'common') {
          return false;
        }
      }

      // 4. Subject filter
      if (selectedSubject !== 'all' && book.subject !== selectedSubject) {
        return false;
      }

      // 5. Smart multi-word search query
      if (searchQuery.trim()) {
        const queryClean = searchQuery.toLowerCase().trim();
        const searchWords = queryClean.split(/\s+/).filter(Boolean);

        const searchableCorpus = [
          book.title,
          book.description,
          book.subject,
          `grade ${book.grade}`,
          `grade${book.grade}`,
          book.curriculum,
          book.stream,
          book.bookType === 'teacher_guide' ? "teacher guide teacher's guide መምህር መምሪያ" : "student textbook",
          book.editionYear.toString(),
        ]
          .filter(Boolean)
          .join(' ')
          .toLowerCase();

        // Every search word must match anywhere in the corpus
        const matchesAll = searchWords.every((word) => searchableCorpus.includes(word));
        if (!matchesAll) {
          return false;
        }
      }

      return true;
    });
  }, [books, selectedGrade, selectedStream, selectedSubject, selectedBookType, searchQuery]);

  const handleResetFilters = () => {
    setSelectedGrade('all');
    setSelectedStream('all');
    setSelectedSubject('all');
    setSelectedBookType('all');
    setSearchQuery('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-2.5">
            <span className="p-2 rounded-2xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
              <BookOpen className="w-5 h-5 sm:w-6 sm:h-6" />
            </span>
            <span>Secondary & Preparatory Textbooks</span>
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-xs sm:text-sm mt-1">
            Official Ministry of Education National Curriculum (Grades 9–12)
          </p>
        </div>

        <div className="flex items-center gap-2 sm:gap-3 self-start sm:self-auto">
          <div className="px-3 py-1.5 rounded-full bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 text-xs font-black flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
            <span>{filteredBooks.length} Textbooks</span>
          </div>

          {(selectedGrade !== 'all' || selectedStream !== 'all' || selectedSubject !== 'all' || searchQuery) && (
            <button
              onClick={handleResetFilters}
              className="flex items-center gap-1 px-3 py-1.5 text-xs font-bold text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/40 rounded-xl hover:bg-rose-100 transition-colors active:scale-95"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Clear</span>
            </button>
          )}
        </div>
      </div>

      {/* Streamlined Grade 9-12 Filters */}
      <BookFilters
        selectedGrade={selectedGrade}
        onSelectGrade={setSelectedGrade}
        selectedStream={selectedStream}
        onSelectStream={setSelectedStream}
        selectedSubject={selectedSubject}
        onSelectSubject={setSelectedSubject}
        selectedBookType={selectedBookType}
        onSelectBookType={setSelectedBookType}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onResetFilters={handleResetFilters}
      />

      {/* Book Grid List */}
      <BookList
        books={filteredBooks}
        onOpenInteractive={onOpenInteractive}
        onOpenPdf={onOpenPdf}
        onToggleOffline={onToggleOffline}
        offlineBookIds={offlineBookIds}
        readingProgress={readingProgress}
        isAdmin={isAdmin}
        onEditBook={onEditBook}
        onDeleteBook={onDeleteBook}
      />

      {/* Discrete Non-Reading Bottom Banner Ad */}
      <StickyBannerAd />
    </div>
  );
};
