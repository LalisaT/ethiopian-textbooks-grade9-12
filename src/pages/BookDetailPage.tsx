import React, { useState, useRef } from 'react';
import { Book, BookChapter } from '../types/book';
import { ETHIOPIAN_REGIONS } from '../data/regions';
import { ETHIOPIAN_SUBJECTS } from '../data/subjects';
import { useTranslation } from '../i18n/useTranslation';
import { CloudStorageService } from '../services/cloudStorageService';
import { DbService } from '../services/dbService';
import { LargeFileDownloadModal } from '../components/books/LargeFileDownloadModal';
import {
  BookOpen,
  DownloadCloud,
  ArrowLeft,
  Share2,
  Calendar,
  Layers,
  FileText,
  Clock,
  Sparkles,
  ChevronRight,
  ExternalLink,
  Edit3,
  Trash2,
  Zap,
  HardDrive,
  CheckCircle2,
  Loader2,
  Globe,
} from 'lucide-react';

interface BookDetailPageProps {
  book: Book;
  onBack: () => void;
  onOpenInteractive: (book: Book, unitNumber?: number) => void;
  onOpenPdf: (book: Book) => void;
  onToggleOffline: (bookId: string) => void;
  isOffline: boolean;
  readingProgress?: { lastUnit?: number; percentComplete: number };
  isAdmin?: boolean;
  onEditBook?: (book: Book) => void;
  onDeleteBook?: (bookId: string) => void;
  onOpenDownloadModal?: (book: Book) => void;
}

export const BookDetailPage: React.FC<BookDetailPageProps> = ({
  book,
  onBack,
  onOpenInteractive,
  onOpenPdf,
  onToggleOffline,
  isOffline,
  readingProgress,
  isAdmin,
  onEditBook,
  onDeleteBook,
  onOpenDownloadModal,
}) => {
  const { language, t } = useTranslation();
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

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

  const handleOpenReader = (unitNumber?: number) => {
    onOpenPdf(book);
  };

  const [isPermissionModalOpen, setIsPermissionModalOpen] = useState(false);

  const executeDownloadToPhone = async () => {
    setIsDownloading(true);
    setDownloadProgress(20);
    setDownloadSuccess(false);

    const result = await CloudStorageService.downloadAndSaveBookToDevice(book, (pct) => {
      setDownloadProgress(pct);
    }, true);

    if (result.success) {
      setDownloadSuccess(true);
      onToggleOffline(book.id);
      setTimeout(() => {
        setIsDownloading(false);
      }, 1500);
    } else {
      setIsDownloading(false);
      alert('Failed to download book. Please check device storage space.');
    }
  };

  const handleDownloadToPhone = () => {
    // If book is larger than 30 MB, ask student for permission first
    if (book.fileSizeMb > 30) {
      setIsPermissionModalOpen(true);
    } else {
      executeDownloadToPhone();
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Back Button & Admin Controls */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Books Catalog</span>
        </button>

        {isAdmin && (
          <div className="flex items-center gap-2">
            {onEditBook && (
              <button
                onClick={() => onEditBook(book)}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-xl text-xs font-bold shadow-sm transition-all"
              >
                <Edit3 className="w-3.5 h-3.5" />
                <span>Customize Book</span>
              </button>
            )}

            {onDeleteBook && (
              <button
                onClick={() => {
                  if (window.confirm(`Are you sure you want to delete "${book.title}"?`)) {
                    onDeleteBook(book.id);
                    onBack();
                  }
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-rose-600 hover:bg-rose-500 text-white rounded-xl text-xs font-bold shadow-sm transition-all"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete</span>
              </button>
            )}
          </div>
        )}
      </div>

      {/* Book Hero Card */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-10 border border-slate-200 dark:border-slate-800 shadow-md flex flex-col md:flex-row gap-8 items-start">
        {/* Book Cover Simulated Spine */}
        <div
          className={`w-full md:w-64 h-80 rounded-2xl bg-gradient-to-br ${book.coverColor} text-white p-6 shadow-xl flex flex-col justify-between shrink-0 relative overflow-hidden`}
        >
          <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
            <BookOpen className="w-32 h-32" />
          </div>

          <div className="flex items-center justify-between">
            <span className="px-2.5 py-1 bg-black/40 backdrop-blur-md rounded-xl text-xs font-black">
              Grade {book.grade}
            </span>
            <div className="flex items-center gap-1">
              <span className="px-2 py-0.5 bg-black/30 backdrop-blur-md rounded-md text-[10px] font-bold uppercase">
                {book.language.toUpperCase()}
              </span>
            </div>
          </div>

          <div className="space-y-1 relative z-10">
            <div className="text-xs uppercase tracking-wider opacity-80 font-bold">
              {subjectInfo ? subjectInfo.name : book.subject}
            </div>
            <div className="text-lg font-black leading-tight line-clamp-3">
              {getBookTitle()}
            </div>
          </div>

          <div className="flex items-center justify-between text-xs opacity-80 pt-2 border-t border-white/20">
            <span>{book.editionYear} Edition</span>
            <span>{book.totalUnits} Units</span>
          </div>
        </div>

        {/* Metadata Details & Actions */}
        <div className="flex-1 space-y-5">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-sky-300 font-extrabold text-xs rounded-full">
                {t('grade')} {book.grade}
              </span>
              {regionInfo && (
                <span className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-bold text-xs rounded-full">
                  {regionInfo.name}
                </span>
              )}
              <span className="px-3 py-1 bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 font-bold text-xs rounded-full">
                {book.curriculum}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-tight">
              {getBookTitle()}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              {book.description}
            </p>
          </div>

          {/* Progress tracker */}
          {readingProgress && readingProgress.percentComplete > 0 && (
            <div className="p-4 rounded-2xl bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800 space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-blue-800 dark:text-sky-300">
                <span>Reading Progress</span>
                <span>{readingProgress.percentComplete}% Complete</span>
              </div>
              <div className="w-full bg-blue-200 dark:bg-blue-900 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-blue-600 h-full rounded-full transition-all duration-300"
                  style={{ width: `${readingProgress.percentComplete}%` }}
                />
              </div>
            </div>
          )}

          {/* Main Action Buttons & 2-Way Mobile Storage Workflow */}
          <div className="space-y-3 pt-2">
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => handleOpenReader()}
                className="px-8 py-4 rounded-2xl bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-black text-sm shadow-xl shadow-blue-600/25 transition-all flex items-center gap-2.5"
              >
                <BookOpen className="w-5 h-5" />
                <span>Read Textbook</span>
              </button>

              {/* Download to mobile storage button */}
              <button
                onClick={handleDownloadToPhone}
                disabled={isDownloading}
                className="px-6 py-4 rounded-2xl bg-slate-900 hover:bg-slate-800 dark:bg-white dark:text-slate-900 active:scale-95 text-white font-extrabold text-xs shadow-lg transition-all flex items-center gap-2 border border-slate-700 disabled:opacity-50"
              >
                {downloadSuccess ? (
                  <>
                    <CheckCircle2 className="w-4 h-4 text-sky-400 dark:text-sky-600" />
                    <span>Saved to Phone & App!</span>
                  </>
                ) : isDownloading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Downloading ({downloadProgress}%)...</span>
                  </>
                ) : (
                  <>
                    <DownloadCloud className="w-4 h-4 text-sky-400 dark:text-sky-600" />
                    <span>Download to Phone Storage</span>
                  </>
                )}
              </button>

              {/* View Cloud Mirrors & Telegram */}
              {onOpenDownloadModal && (
                <button
                  onClick={() => onOpenDownloadModal(book)}
                  className="px-4 py-4 rounded-2xl bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 font-bold text-xs border border-slate-200 dark:border-slate-800 transition-all flex items-center gap-2"
                  title="View Telegram, Google Drive & MoE portal links"
                >
                  <Globe className="w-4 h-4 text-sky-500" />
                  <span>Cloud Mirrors</span>
                </button>
              )}
            </div>

            {/* Mobile Storage helper note */}
            <div className="flex items-center gap-2 text-[11px] text-slate-500 dark:text-slate-400">
              <HardDrive className="w-3.5 h-3.5 text-blue-600 dark:text-sky-400" />
              <span>
                <strong>Mobile Storage Ready:</strong> Downloading saves the PDF into your phone's <em>Downloads</em> folder AND keeps it cached in the app for offline reading.
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Curriculum Units & Chapters Outline */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4">
          <div>
            <h2 className="text-lg font-black text-slate-900 dark:text-white">
              Curriculum Units ({book.totalUnits} Units)
            </h2>
            <p className="text-xs text-slate-500">
              Click any unit to jump directly into the reader
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {Array.from({ length: book.totalUnits || 6 }, (_, i) => i + 1).map((unitNum) => {
            const prefix =
              book.language === 'om'
                ? `Boqonnaa ${unitNum}`
                : book.language === 'am'
                ? `ምዕራፍ ${unitNum}`
                : book.language === 'ti'
                ? `ምዕራፍ ${unitNum}`
                : book.language === 'so'
                ? `Cutubka ${unitNum}`
                : `Unit ${unitNum}`;

            return (
              <div
                key={unitNum}
                onClick={() => handleOpenReader(unitNum)}
                className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 hover:bg-blue-50/50 dark:hover:bg-blue-950/20 border border-slate-200 dark:border-slate-700/60 hover:border-blue-400 transition-all cursor-pointer flex items-center justify-between group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-600 text-white font-black flex items-center justify-center text-sm shadow-sm group-hover:scale-105 transition-transform shadow-blue-600/20">
                    {unitNum}
                  </div>
                  <div>
                    <div className="font-extrabold text-sm text-slate-900 dark:text-white">
                      {prefix}
                    </div>
                    <div className="text-xs text-slate-500">
                      Official Ethiopian Curriculum
                    </div>
                  </div>
                </div>

                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-blue-500 transition-colors" />
              </div>
            );
          })}
        </div>
      </div>

      <LargeFileDownloadModal
        isOpen={isPermissionModalOpen}
        onClose={() => setIsPermissionModalOpen(false)}
        onConfirm={executeDownloadToPhone}
        book={book}
      />
    </div>
  );
};
