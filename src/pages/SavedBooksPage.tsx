import React, { useState, useEffect } from 'react';
import { Book } from '../types/book';
import { UserBookmark, UserNote } from '../types/user';
import { StorageService } from '../services/storageService';
import { useTranslation } from '../i18n/useTranslation';
import { BookCard } from '../components/books/BookCard';
import {
  Bookmark,
  FileText,
  DownloadCloud,
  ArrowRight,
  Trash2,
  BookOpen,
  Sparkles,
  Layers,
  HardDrive,
  CheckCircle2,
} from 'lucide-react';

interface SavedBooksPageProps {
  books: Book[];
  onOpenInteractive: (book: Book, unitNumber?: number) => void;
  onOpenPdf: (book: Book) => void;
  onToggleOffline: (bookId: string) => void;
  offlineBookIds: string[];
  readingProgress: Record<string, { percentComplete: number }>;
}

export const SavedBooksPage: React.FC<SavedBooksPageProps> = ({
  books,
  onOpenInteractive,
  onOpenPdf,
  onToggleOffline,
  offlineBookIds,
  readingProgress,
}) => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<'offline' | 'bookmarks' | 'notes'>('offline');
  const [bookmarks, setBookmarks] = useState<UserBookmark[]>([]);
  const [notes, setNotes] = useState<UserNote[]>([]);

  useEffect(() => {
    setBookmarks(StorageService.getBookmarks());
    setNotes(StorageService.getNotes());
  }, [activeTab]);

  const offlineBooks = books.filter((b) => offlineBookIds.includes(b.id));

  const handleDeleteBookmark = (bookId: string, unitNumber: number) => {
    StorageService.removeBookmark(bookId, unitNumber);
    setBookmarks(StorageService.getBookmarks());
  };

  const handleDeleteNote = (noteId: string) => {
    StorageService.deleteNote(noteId);
    setNotes(StorageService.getNotes());
  };

  const handleOpenBookmark = (bm: UserBookmark) => {
    const book = books.find((b) => b.id === bm.bookId);
    if (book) {
      onOpenInteractive(book, bm.unitNumber);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2.5">
          <Bookmark className="w-7 h-7 text-blue-600 dark:text-sky-400" />
          <span>{t('savedBooks')}</span>
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          Your personal offline learning binder: downloaded textbooks, bookmarks, and revision notes
        </p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 dark:border-slate-800 gap-6 text-sm font-bold">
        <button
          onClick={() => setActiveTab('offline')}
          className={`pb-3 flex items-center gap-2 transition-colors relative ${
            activeTab === 'offline'
              ? 'text-blue-600 dark:text-sky-400'
              : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <DownloadCloud className="w-4 h-4" />
          <span>Offline Books ({offlineBooks.length})</span>
          {activeTab === 'offline' && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full" />
          )}
        </button>

        <button
          onClick={() => setActiveTab('bookmarks')}
          className={`pb-3 flex items-center gap-2 transition-colors relative ${
            activeTab === 'bookmarks'
              ? 'text-blue-600 dark:text-sky-400'
              : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <Bookmark className="w-4 h-4" />
          <span>{t('bookmarks')} ({bookmarks.length})</span>
          {activeTab === 'bookmarks' && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full" />
          )}
        </button>

        <button
          onClick={() => setActiveTab('notes')}
          className={`pb-3 flex items-center gap-2 transition-colors relative ${
            activeTab === 'notes'
              ? 'text-blue-600 dark:text-sky-400'
              : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>{t('notes')} ({notes.length})</span>
          {activeTab === 'notes' && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600 rounded-full" />
          )}
        </button>
      </div>

      {/* Offline Books Tab */}
      {activeTab === 'offline' && (
        <div className="space-y-6">
          {/* Mobile Storage Device Banner */}
          <div className="p-5 rounded-3xl bg-gradient-to-r from-blue-500/10 via-indigo-500/10 to-sky-600/10 border border-blue-300 dark:border-blue-800 flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-md">
              <HardDrive className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm sm:text-base font-extrabold text-slate-900 dark:text-white">
                Mobile Device Storage (100% Offline Binder)
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                All downloaded textbooks are stored directly on your phone / computer storage and open instantly offline without internet.
              </p>
            </div>
          </div>

          {offlineBooks.length === 0 ? (
            <div className="p-12 text-center bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
              <DownloadCloud className="w-12 h-12 mx-auto mb-3 text-slate-300 dark:text-slate-700" />
              <h3 className="font-bold text-slate-900 dark:text-white mb-1">
                No Offline Books Saved Yet
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
                {t('noSavedBooks')}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2.5 sm:gap-6">
              {offlineBooks.map((book) => (
                <BookCard
                  key={book.id}
                  book={book}
                  onOpenInteractive={onOpenInteractive}
                  onOpenPdf={onOpenPdf}
                  onToggleOffline={onToggleOffline}
                  isOffline={true}
                  progressPercent={readingProgress[book.id]?.percentComplete || 0}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {/* Bookmarks Tab */}
      {activeTab === 'bookmarks' && (
        <div className="space-y-3">
          {bookmarks.length === 0 ? (
            <div className="p-12 text-center bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
              <Bookmark className="w-12 h-12 mx-auto mb-3 text-slate-300 dark:text-slate-700" />
              <h3 className="font-bold text-slate-900 dark:text-white mb-1">
                No Bookmarked Chapters Yet
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
                Click the bookmark icon in the reading toolbar on any chapter to easily jump back here.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {bookmarks.map((bm) => (
                <div
                  key={bm.id}
                  className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-400 shadow-xs flex items-center justify-between gap-4 transition-all"
                >
                  <div
                    onClick={() => handleOpenBookmark(bm)}
                    className="cursor-pointer flex-1 space-y-1"
                  >
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-sky-300 font-extrabold text-[10px] rounded-md">
                        Grade {bm.grade}
                      </span>
                      <span className="text-xs text-slate-400">{bm.bookTitle}</span>
                    </div>
                    <h4 className="font-bold text-sm text-slate-900 dark:text-white hover:text-blue-600 transition-colors">
                      Unit {bm.unitNumber}: {bm.unitTitle}
                    </h4>
                    <div className="text-[10px] text-slate-400">
                      Saved {new Date(bm.savedAt).toLocaleDateString()}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleOpenBookmark(bm)}
                      className="p-2 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-sky-400 hover:bg-blue-100 text-xs font-bold flex items-center gap-1"
                      title="Jump to Unit"
                    >
                      <BookOpen className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteBookmark(bm.bookId, bm.unitNumber)}
                      className="p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40"
                      title="Remove Bookmark"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Notes Tab */}
      {activeTab === 'notes' && (
        <div className="space-y-4">
          {notes.length === 0 ? (
            <div className="p-12 text-center bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
              <FileText className="w-12 h-12 mx-auto mb-3 text-slate-300 dark:text-slate-700" />
              <h3 className="font-bold text-slate-900 dark:text-white mb-1">
                No Personal Study Notes Yet
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
                Take notes, record formulas, or summarize lessons while reading any chapter.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {notes.map((n) => {
                const book = books.find((b) => b.id === n.bookId);
                return (
                  <div
                    key={n.id}
                    className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col justify-between"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-bold text-blue-600 dark:text-sky-400">
                          {book ? book.title.split(' ')[0] : 'Textbook'} • Unit {n.unitNumber}
                        </span>
                        <button
                          onClick={() => handleDeleteNote(n.id)}
                          className="p-1 text-slate-400 hover:text-rose-600 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
                          title="Delete Note"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                        {n.title}
                      </h4>

                      <p className="text-xs text-slate-600 dark:text-slate-300 whitespace-pre-wrap leading-relaxed">
                        {n.content}
                      </p>
                    </div>

                    <div className="text-[10px] text-slate-400 mt-4 pt-2 border-t border-slate-100 dark:border-slate-800 flex justify-between">
                      <span>Saved: {new Date(n.updatedAt).toLocaleDateString()}</span>
                      {book && (
                        <button
                          onClick={() => onOpenInteractive(book, n.unitNumber)}
                          className="text-blue-600 dark:text-sky-400 font-semibold hover:underline"
                        >
                          Open Unit →
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
