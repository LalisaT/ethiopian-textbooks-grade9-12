import React, { useState } from 'react';
import { Book } from '../../types/book';
import { ETHIOPIAN_REGIONS } from '../../data/regions';
import { ETHIOPIAN_SUBJECTS } from '../../data/subjects';
import { useTranslation } from '../../i18n/useTranslation';
import { CloudStorageService } from '../../services/cloudStorageService';
import {
  BookOpen,
  DownloadCloud,
  CheckCircle,
  Clock,
  Sparkles,
  Edit3,
  Trash2,
  FileText,
  Zap,
  Loader2,
  Check,
  GraduationCap,
  Atom,
  TrendingUp,
} from 'lucide-react';
import * as LucideIcons from 'lucide-react';

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

  // Dynamic icon
  const IconComponent =
    (LucideIcons as any)[book.iconName] ||
    (subjectInfo && (LucideIcons as any)[subjectInfo.icon]) ||
    BookOpen;

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

  const handleDownloadClick = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isOffline) {
      onToggleOffline(book.id);
      return;
    }

    setIsDownloading(true);
    const res = await CloudStorageService.downloadAndSaveBookToDevice(book, undefined, true);
    setIsDownloading(false);
    if (res.success) {
      onToggleOffline(book.id);
    }
  };

  return (
    <div className="group relative bg-white dark:bg-slate-900 rounded-3xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
      {/* Admin Action Buttons */}
      {isAdmin && (
        <div className="absolute top-2.5 right-2.5 z-20 flex items-center gap-1 bg-black/70 backdrop-blur-md p-1 rounded-xl border border-white/20 shadow-lg">
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

      {/* Book Card Header / Visual Book Spine */}
      <div className={`relative h-44 bg-gradient-to-br ${book.coverColor} p-5 flex flex-col justify-between overflow-hidden cursor-pointer`} onClick={handleOpenReader}>
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />

        {/* Top badges */}
        <div className="relative z-10 flex items-center justify-between gap-2">
          <div className="flex items-center gap-1.5">
            <span className="px-2.5 py-1 bg-black/40 backdrop-blur-md text-white font-extrabold text-xs rounded-xl border border-white/20">
              {t('grade')} {book.grade}
            </span>
            {book.stream && book.stream !== 'all' && (
              <span className={`px-2 py-0.5 text-[10px] font-extrabold rounded-lg backdrop-blur-md border flex items-center gap-1 ${
                book.stream === 'natural_science' 
                  ? 'bg-cyan-500/40 text-cyan-100 border-cyan-300/40' 
                  : book.stream === 'social_science' 
                  ? 'bg-rose-500/40 text-rose-100 border-rose-300/40'
                  : 'bg-emerald-500/40 text-emerald-100 border-emerald-300/40'
              }`}>
                {book.stream === 'natural_science' ? (
                  <>
                    <Atom className="w-2.5 h-2.5" />
                    <span>Natural</span>
                  </>
                ) : book.stream === 'social_science' ? (
                  <>
                    <TrendingUp className="w-2.5 h-2.5" />
                    <span>Social</span>
                  </>
                ) : (
                  <span>Common</span>
                )}
              </span>
            )}
          </div>
          <div className="flex items-center gap-1.5">
            <span className="px-2 py-0.5 bg-black/40 backdrop-blur-md text-white text-[10px] font-bold rounded-lg tracking-wider">
              English
            </span>
            {book.bookType === 'teacher_guide' ? (
              <span className="px-2 py-0.5 bg-amber-400 text-slate-950 text-[10px] font-black rounded-lg shadow-sm flex items-center gap-1">
                <GraduationCap className="w-3 h-3" />
                <span>Teacher Guide</span>
              </span>
            ) : (
              <span className="px-2 py-0.5 bg-white/90 dark:bg-slate-900/90 text-slate-900 dark:text-white text-[10px] font-black rounded-lg shadow-sm flex items-center gap-1">
                <BookOpen className="w-3 h-3" />
                <span>Student Book</span>
              </span>
            )}
            {isOffline && (
              <span
                className="p-1 bg-emerald-500 text-white rounded-full shadow-sm"
                title="Saved Offline"
              >
                <CheckCircle className="w-3.5 h-3.5" />
              </span>
            )}
          </div>
        </div>

        {/* Center icon / subject illustration */}
        <div className="relative z-10 flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white shadow-inner">
            <IconComponent className="w-6 h-6" />
          </div>
          <div className="text-white">
            <span className="text-[11px] uppercase tracking-wider font-semibold text-white/80">
              {subjectInfo ? subjectInfo.name : book.subject}
            </span>
            <div className="text-xs font-medium text-white/90">
              {book.curriculum}
            </div>
          </div>
        </div>

        {/* Bottom subtle bar */}
        <div className="relative z-10 flex items-center justify-between text-[11px] text-white/80 font-medium">
          <span>{book.editionYear} Edition</span>
          <span>{book.totalUnits} Units</span>
        </div>
      </div>

      {/* Card Content Details */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <h3
            onClick={() => (onSelectBook ? onSelectBook(book) : handleOpenReader())}
            className="font-extrabold text-base text-slate-900 dark:text-white hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors line-clamp-2 cursor-pointer leading-snug"
          >
            {getBookTitle()}
          </h3>

          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
            {book.description}
          </p>
        </div>

        {/* Reading Progress Indicator */}
        {(progressPercent || (readingProgress && readingProgress.percentComplete > 0)) && (
          <div className="space-y-1.5">
            <div className="flex justify-between text-[11px] font-bold text-slate-600 dark:text-slate-300">
              <span>Progress</span>
              <span>{progressPercent || readingProgress?.percentComplete}%</span>
            </div>
            <div className="h-1.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full bg-emerald-500 rounded-full transition-all duration-300"
                style={{ width: `${progressPercent || readingProgress?.percentComplete}%` }}
              />
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="pt-2">
          <div className="flex items-center gap-2">
            <button
              onClick={handleOpenReader}
              className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-700 active:scale-[0.98] text-white rounded-2xl text-xs font-black transition-all shadow-md flex items-center justify-center gap-2"
            >
              <BookOpen className="w-4 h-4" />
              <span>Read Textbook</span>
            </button>

            <button
              onClick={handleDownloadClick}
              disabled={isDownloading}
              className={`p-2.5 rounded-2xl border transition-all active:scale-90 ${
                isOffline
                  ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border-emerald-300'
                  : 'text-slate-400 hover:text-emerald-600 dark:hover:text-white border-slate-200 dark:border-slate-800 hover:bg-slate-100'
              }`}
              title={isOffline ? 'Saved to Device (Click to toggle)' : 'Download PDF to Mobile Storage & Cache in App'}
            >
              {isDownloading ? (
                <Loader2 className="w-4 h-4 animate-spin text-emerald-600" />
              ) : (
                <DownloadCloud className="w-4 h-4" />
              )}
            </button>
          </div>

          <div className="mt-3 flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-800">
            <span>{book.totalEstimatedPages || 210} Pages</span>
            <span>{book.fileSizeMb} MB</span>
          </div>
        </div>
      </div>
    </div>
  );
};
