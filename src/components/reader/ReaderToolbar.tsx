import React from 'react';
import { Book, BookChapter } from '../../types/book';
import { useTranslation } from '../../i18n/useTranslation';
import {
  ArrowLeft,
  Volume2,
  VolumeX,
  Bookmark,
  Edit3,
  Award,
  ChevronLeft,
  ChevronRight,
  Type,
  Maximize2,
  Sparkles,
} from 'lucide-react';

interface ReaderToolbarProps {
  book: Book;
  currentUnitNumber: number;
  onSelectUnit: (unitNumber: number) => void;
  onBack: () => void;
  isAudioPlaying: boolean;
  onToggleAudio: () => void;
  isBookmarked: boolean;
  onToggleBookmark: () => void;
  onOpenNotes: () => void;
  onOpenQuiz: () => void;
  fontSize: 'sm' | 'base' | 'lg' | 'xl';
  onChangeFontSize: (size: 'sm' | 'base' | 'lg' | 'xl') => void;
  notesCount: number;
}

export const ReaderToolbar: React.FC<ReaderToolbarProps> = ({
  book,
  currentUnitNumber,
  onSelectUnit,
  onBack,
  isAudioPlaying,
  onToggleAudio,
  isBookmarked,
  onToggleBookmark,
  onOpenNotes,
  onOpenQuiz,
  fontSize,
  onChangeFontSize,
  notesCount,
}) => {
  const { t } = useTranslation();

  const totalChapters = book.chapters.length || book.totalUnits;
  const currentChapter = book.chapters.find((c) => c.unitNumber === currentUnitNumber);

  return (
    <div className="sticky top-16 z-30 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 px-4 py-2.5 transition-colors">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
        {/* Left: Back & Chapter Selector */}
        <div className="flex items-center gap-2">
          <button
            onClick={onBack}
            className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center gap-1 text-xs font-bold"
            title="Back to Books"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Back</span>
          </button>

          <div className="h-5 w-px bg-slate-200 dark:bg-slate-700 hidden sm:block" />

          {/* Unit selector dropdown */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => onSelectUnit(Math.max(1, currentUnitNumber - 1))}
              disabled={currentUnitNumber <= 1}
              className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-30 disabled:pointer-events-none"
              title={t('previousUnit')}
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <select
              value={currentUnitNumber}
              onChange={(e) => onSelectUnit(Number(e.target.value))}
              className="px-3 py-1.5 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-bold text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 max-w-[200px] sm:max-w-[300px] truncate"
            >
              {book.chapters.length > 0 ? (
                book.chapters.map((ch) => {
                  const titleInLang =
                    book.language === 'om'
                      ? ch.titleOromo || ch.title
                      : book.language === 'am'
                      ? ch.titleAmharic || ch.title
                      : book.language === 'ti'
                      ? ch.titleTigrinya || ch.title
                      : book.language === 'so'
                      ? ch.titleSomali || ch.title
                      : ch.title;
                  return (
                    <option key={ch.unitNumber} value={ch.unitNumber}>
                      {titleInLang}
                    </option>
                  );
                })
              ) : (
                Array.from({ length: book.totalUnits || 6 }, (_, i) => {
                  const prefix =
                    book.language === 'om'
                      ? `Boqonnaa ${i + 1}`
                      : book.language === 'am'
                      ? `ምዕራፍ ${i + 1}`
                      : book.language === 'ti'
                      ? `ምዕራፍ ${i + 1}`
                      : book.language === 'so'
                      ? `Cutubka ${i + 1}`
                      : `Unit ${i + 1}`;
                  return (
                    <option key={i + 1} value={i + 1}>
                      {prefix}
                    </option>
                  );
                })
              )}
            </select>

            <button
              onClick={() => onSelectUnit(Math.min(totalChapters, currentUnitNumber + 1))}
              disabled={currentUnitNumber >= totalChapters}
              className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 disabled:opacity-30 disabled:pointer-events-none"
              title={t('nextUnit')}
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Right: Audio, Quiz, Font Size, Bookmark, Notes */}
        <div className="flex items-center gap-2">
          {/* Audio speech button */}
          <button
            onClick={onToggleAudio}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
              isAudioPlaying
                ? 'bg-rose-500 text-white shadow-md animate-pulse'
                : 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 hover:bg-emerald-100'
            }`}
            title={isAudioPlaying ? t('stopAudio') : t('readAloud')}
          >
            {isAudioPlaying ? (
              <>
                <VolumeX className="w-3.5 h-3.5" />
                <span>{t('stopAudio')}</span>
              </>
            ) : (
              <>
                <Volume2 className="w-3.5 h-3.5" />
                <span>{t('readAloud')}</span>
              </>
            )}
          </button>

          {/* Unit Quiz Button */}
          <button
            onClick={onOpenQuiz}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 hover:bg-amber-100 dark:hover:bg-amber-900/60 transition-colors"
            title="Take Unit Practice Quiz"
          >
            <Award className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Unit Quiz</span>
          </button>

          {/* Font Size Adjuster */}
          <div className="hidden md:flex items-center bg-slate-100 dark:bg-slate-800 p-1 rounded-xl border border-slate-200 dark:border-slate-700">
            {(['sm', 'base', 'lg', 'xl'] as const).map((s) => (
              <button
                key={s}
                onClick={() => onChangeFontSize(s)}
                className={`px-2 py-0.5 text-xs font-semibold rounded-lg transition-all ${
                  fontSize === s
                    ? 'bg-white dark:bg-slate-900 text-emerald-600 dark:text-emerald-400 shadow-xs'
                    : 'text-slate-500 hover:text-slate-800 dark:text-slate-400'
                }`}
              >
                {s === 'sm' ? 'A-' : s === 'base' ? 'A' : s === 'lg' ? 'A+' : 'A++'}
              </button>
            ))}
          </div>

          {/* Bookmark */}
          <button
            onClick={onToggleBookmark}
            className={`p-2 rounded-xl text-xs transition-colors border ${
              isBookmarked
                ? 'bg-yellow-50 dark:bg-yellow-950/60 text-yellow-600 border-yellow-300 dark:border-yellow-800'
                : 'text-slate-500 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
            title={isBookmarked ? t('removeBookmark') : t('addBookmark')}
          >
            <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-yellow-500 text-yellow-500' : ''}`} />
          </button>

          {/* Notes Drawer Toggle */}
          <button
            onClick={onOpenNotes}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 transition-colors"
            title={t('notes')}
          >
            <Edit3 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span className="hidden sm:inline">{t('notes')}</span>
            {notesCount > 0 && (
              <span className="px-1.5 py-0.2 bg-emerald-600 text-white rounded-full text-[10px]">
                {notesCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
