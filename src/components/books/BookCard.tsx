import React, { useState } from 'react';
import { Book } from '../../types/book';
import { ETHIOPIAN_REGIONS } from '../../data/regions';
import { ETHIOPIAN_SUBJECTS } from '../../data/subjects';
import { useTranslation } from '../../i18n/useTranslation';
import { CloudStorageService } from '../../services/cloudStorageService';
import { LargeFileDownloadModal } from './LargeFileDownloadModal';
import { BookCoverThumbnail } from './BookCoverThumbnail';
import {
  BookOpen,
  DownloadCloud,
  CheckCircle,
  Edit3,
  Trash2,
  Loader2,
  Check,
  GraduationCap,
  Atom,
  TrendingUp,
} from 'lucide-react';

interface BookCardProps {
  book: Book;
  onOpenInteractive: (book: Book, unitNumber?: number) => void;
  onOpenPdf: (book: Book) => void;
  onSelectBook?: (book: Book) => void;
  onToggleOffline: (bookId: string) => void;
  isOffline: boolean;
  progressPercent?: number;
  readingProgress?: { lastUnit?: number; percentComplete: number };
  isAdmin?: boolean;
  onEditBook?: (book: Book) => void;
  onDeleteBook?: (bookId: string) => void;
}

export const BookCard: React.FC<BookCardProps> = ({
  book,
  onOpenInteractive,
  onOpenPdf,
  onSelectBook,
  onToggleOffline,
  isOffline,
  progressPercent,
  readingProgress,
  isAdmin,
  onEditBook,
  onDeleteBook,
}) => {
  const { language, t } = useTranslation();

  const regionInfo = ETHIOPIAN_REGIONS.find((r) => r.id === book.regionId);
  const subjectInfo = ETHIOPIAN_SUBJECTS.find((s) => s.id === book.subject);

  const getBookTitle = () => {
    switch (language) {
      case 'am':
        return book.titleAmharic || book.title;
      case 'om':
        return book.titleOromo || book.title;
      case 'ti':
        return book.titleTigrinya || book.title;
      case 'so':
        return book.titleSomali || book.title;
      default:
        return book.title;
    }
  };

  const [isDownloading, setIsDownloading] = useState(false);

  const handleOpenReader = () => {
    onOpenPdf(book);
  };

  const [isPermissionModalOpen, setIsPermissionModalOpen] = useState(false);

  const executeDownload = async () => {
    setIsDownloading(true);
    const res = await CloudStorageService.downloadAndSaveBookToDevice(book, undefined, true);
    setIsDownloading(false);
    if (res.success) {
      onToggleOffline(book.id);
    }
  };

  const handleDownloadClick = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isOffline) {
      onToggleOffline(book.id);
      return;
    }

    // Ask permission if book exceeds 30 MB
    if (book.fileSizeMb > 30) {
      setIsPermissionModalOpen(true);
    } else {
      executeDownload();
    }
  };

  const currentProgress = progressPercent || readingProgress?.percentComplete || 0;

  return (
    <div className="group relative bg-white dark:bg-slate-900/95 rounded-2xl sm:rounded-3xl p-2.5 sm:p-3.5 border border-slate-200/90 dark:border-slate-800/90 hover:border-blue-500/50 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between active:scale-[0.99]">
      {/* Admin Action Buttons */}
      {isAdmin && (
        <div className="absolute top-2.5 right-2.5 z-30 flex items-center gap-1 bg-black/80 backdrop-blur-md p-1 rounded-xl border border-white/20 shadow-lg">
          {onEditBook && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onEditBook(book);
              }}
              className="p-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold transition-transform active:scale-90"
              title="Edit / Customize this book"
            >
              <Edit3 className="w-3.5 h-3.5" />
            </button>
          )}
          {onDeleteBook && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                if (window.confirm(`Delete "${book.title}"?`)) {
                  onDeleteBook(book.id);
                }
              }}
              className="p-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white font-bold transition-transform active:scale-90"
              title="Delete this book"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      )}

      <div>
        {/* Book Cover Container (Aspect Ratio 3:4) */}
        <div
          onClick={handleOpenReader}
          className="relative aspect-[3/4] w-full rounded-xl sm:rounded-2xl overflow-hidden bg-slate-950 mb-2 sm:mb-2.5 shadow-md border border-slate-800/60 cursor-pointer"
        >
          <BookCoverThumbnail
            book={book}
            imgClassName="group-hover:scale-105 transition-transform duration-300"
          />

          {/* Grade Level Badge */}
          <div className="absolute top-1.5 left-1.5 sm:top-2 sm:left-2 px-1.5 sm:px-2 py-0.5 rounded-lg bg-slate-950/85 backdrop-blur-md text-amber-300 text-[9px] sm:text-[10px] font-black border border-amber-500/30 shadow-sm">
            Grade {book.grade}
          </div>

          {/* Top Right Badges: TG / Stream / Language / Offline */}
          <div className="absolute top-1.5 right-1.5 sm:top-2 sm:right-2 flex items-center gap-1 z-10">
            {book.bookType === 'teacher_guide' ? (
              <span className="px-1.5 py-0.5 bg-amber-400 text-slate-950 text-[9px] sm:text-[10px] font-black rounded-lg shadow-sm flex items-center gap-0.5">
                <GraduationCap className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                <span>TG</span>
              </span>
            ) : book.stream && book.stream !== 'all' && book.stream !== 'common' ? (
              <span className={`px-1.5 py-0.5 text-[8px] sm:text-[9px] font-black rounded-lg backdrop-blur-md border flex items-center gap-0.5 ${
                book.stream === 'natural_science'
                  ? 'bg-cyan-950/85 text-cyan-300 border-cyan-500/30'
                  : 'bg-rose-950/85 text-rose-300 border-rose-500/30'
              }`}>
                {book.stream === 'natural_science' ? (
                  <>
                    <Atom className="w-2.5 h-2.5" />
                    <span className="hidden xs:inline">Natural</span>
                  </>
                ) : (
                  <>
                    <TrendingUp className="w-2.5 h-2.5" />
                    <span className="hidden xs:inline">Social</span>
                  </>
                )}
              </span>
            ) : null}

            {isOffline && (
              <span className="p-1 bg-blue-600 text-white rounded-lg shadow-md" title="Saved Offline">
                <Check className="w-2.5 h-2.5 stroke-[3]" />
              </span>
            )}
          </div>

          {/* Reading Progress Bar (if in progress) */}
          {currentProgress > 0 && (
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-slate-800/80">
              <div
                className="h-full bg-sky-400"
                style={{ width: `${currentProgress}%` }}
              />
            </div>
          )}
        </div>

        {/* Subject & Stream Info */}
        <div className="flex items-center justify-between gap-1 mb-1 text-[10px] sm:text-xs">
          <span className="font-bold text-blue-600 dark:text-sky-400 truncate uppercase tracking-wider text-[9px] sm:text-[11px]">
            {subjectInfo ? subjectInfo.name : book.subject}
          </span>
          <span className="text-slate-400 text-[9px] sm:text-[10px] shrink-0 font-medium">
            {book.editionYear}
          </span>
        </div>

        {/* Book Title */}
        <h3
          onClick={() => (onSelectBook ? onSelectBook(book) : handleOpenReader())}
          className="font-extrabold text-xs sm:text-sm text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-sky-400 transition-colors line-clamp-2 cursor-pointer leading-tight min-h-[2rem] sm:min-h-[2.5rem]"
        >
          {getBookTitle()}
        </h3>

        {/* Desktop Description */}
        <p className="hidden sm:block mt-1 text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
          {book.description}
        </p>
      </div>

      {/* Action Buttons & Card Footer */}
      <div className="pt-2 sm:pt-2.5">
        <div className="flex items-center gap-1.5 sm:gap-2">
          <button
            onClick={handleOpenReader}
            className="flex-1 py-1.5 sm:py-2 px-2 bg-blue-600 hover:bg-blue-700 active:scale-[0.98] text-white rounded-xl sm:rounded-2xl text-[11px] sm:text-xs font-black transition-all shadow-md shadow-blue-600/25 flex items-center justify-center gap-1 sm:gap-1.5"
          >
            <BookOpen className="w-3.5 h-3.5 shrink-0" />
            <span>Read</span>
          </button>

          <button
            onClick={handleDownloadClick}
            disabled={isDownloading}
            className={`p-1.5 sm:p-2 rounded-xl sm:rounded-2xl border transition-all active:scale-90 shrink-0 ${
              isOffline
                ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-sky-400 border-blue-300 dark:border-blue-700'
                : 'text-slate-400 hover:text-blue-600 dark:hover:text-white border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800/60'
            }`}
            title={isOffline ? 'Saved to Device (Click to toggle)' : 'Download PDF to Mobile Storage & Cache in App'}
          >
            {isDownloading ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin text-blue-600" />
            ) : isOffline ? (
              <CheckCircle className="w-3.5 h-3.5 text-sky-400" />
            ) : (
              <DownloadCloud className="w-3.5 h-3.5" />
            )}
          </button>
        </div>

        <div className="mt-1.5 flex items-center justify-between text-[9px] sm:text-[10px] text-slate-400 pt-1 border-t border-slate-100 dark:border-slate-800/80">
          <span>{book.totalEstimatedPages || 210} Pages</span>
          <span>{book.fileSizeMb} MB</span>
        </div>
      </div>

      <LargeFileDownloadModal
        isOpen={isPermissionModalOpen}
        onClose={() => setIsPermissionModalOpen(false)}
        onConfirm={executeDownload}
        book={book}
      />
    </div>
  );
};
