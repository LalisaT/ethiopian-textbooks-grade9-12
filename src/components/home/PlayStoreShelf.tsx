import React from 'react';
import { Book } from '../../types/book';
import { useTranslation } from '../../i18n/useTranslation';
import { BookOpen, DownloadCloud, Check, Star, ChevronRight, Sparkles } from 'lucide-react';

interface PlayStoreShelfProps {
  title: string;
  subtitle?: string;
  badge?: string;
  books: Book[];
  onOpenPdf: (book: Book) => void;
  onOpenInteractive?: (book: Book) => void;
  onToggleOffline: (bookId: string) => void;
  offlineBookIds: string[];
  readingProgress?: Record<string, { percentComplete: number }>;
  onSeeAll?: () => void;
}

export const PlayStoreShelf: React.FC<PlayStoreShelfProps> = ({
  title,
  subtitle,
  badge,
  books,
  onOpenPdf,
  onToggleOffline,
  offlineBookIds,
  readingProgress = {},
  onSeeAll,
}) => {
  const { language } = useTranslation();

  const getTitle = (b: Book) => {
    if (language === 'am' && b.titleAmharic) return b.titleAmharic;
    if (language === 'om' && b.titleOromo) return b.titleOromo;
    if (language === 'ti' && b.titleTigrinya) return b.titleTigrinya;
    return b.title;
  };

  if (!books || books.length === 0) return null;

  return (
    <section className="space-y-3">
      {/* Shelf Header (Google Play Store Style) */}
      <div className="flex items-end justify-between px-1">
        <div>
          {badge && (
            <div className="inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-wider text-emerald-400 mb-0.5">
              <Sparkles className="w-3 h-3" />
              <span>{badge}</span>
            </div>
          )}
          <h3 className="text-base sm:text-xl font-black text-slate-900 dark:text-white tracking-tight flex items-center gap-2">
            <span>{title}</span>
          </h3>
          {subtitle && (
            <p className="text-xs text-slate-500 dark:text-slate-400">
              {subtitle}
            </p>
          )}
        </div>

        {onSeeAll && (
          <button
            onClick={onSeeAll}
            className="text-xs font-black text-emerald-600 dark:text-emerald-400 hover:text-emerald-500 flex items-center gap-0.5 transition-colors group shrink-0 pb-0.5"
          >
            <span>See all</span>
            <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </button>
        )}
      </div>

      {/* Horizontal Carousel Shelf with Smooth Momentum Scrolling */}
      <div className="flex gap-3 sm:gap-4 overflow-x-auto no-scrollbar scroll-smooth pb-2 pt-1 px-1 snap-x snap-mandatory">
        {books.map((book) => {
          const isDownloaded = offlineBookIds.includes(book.id);
          const progress = readingProgress[book.id]?.percentComplete || 0;

          return (
            <div
              key={book.id}
              onClick={() => onOpenPdf(book)}
              className="w-40 sm:w-48 shrink-0 snap-start group cursor-pointer bg-white dark:bg-slate-900/90 rounded-3xl p-3 border border-slate-200/90 dark:border-slate-800/90 hover:border-emerald-500/50 shadow-sm hover:shadow-xl transition-all duration-200 flex flex-col justify-between active:scale-[0.98]"
            >
              <div>
                {/* Book Cover Container */}
                <div className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden bg-slate-950 mb-2.5 shadow-md border border-slate-800/60">
                  {book.coverImageUrl ? (
                    <img
                      src={book.coverImageUrl}
                      alt={book.title}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full p-3 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 flex flex-col justify-between text-white">
                      <div className="text-[10px] font-black uppercase text-amber-400 tracking-wider">
                        Grade {book.grade}
                      </div>
                      <div className="font-extrabold text-xs leading-tight line-clamp-3">
                        {book.title}
                      </div>
                      <div className="text-[9px] text-slate-400">
                        MOE Ethiopia
                      </div>
                    </div>
                  )}

                  {/* Grade Level Badge */}
                  <div className="absolute top-2 left-2 px-2 py-0.5 rounded-lg bg-slate-950/80 backdrop-blur-md text-amber-300 text-[10px] font-black border border-amber-500/30">
                    Grade {book.grade}
                  </div>

                  {/* Offline Cached Tag */}
                  {isDownloaded && (
                    <div className="absolute top-2 right-2 p-1 rounded-lg bg-emerald-500 text-slate-950 font-black shadow-md">
                      <Check className="w-3 h-3 stroke-[3]" />
                    </div>
                  )}

                  {/* Reading Progress Bar (if in progress) */}
                  {progress > 0 && (
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-slate-800">
                      <div
                        className="h-full bg-emerald-400"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                  )}
                </div>

                {/* Rating & Stream Badges */}
                <div className="flex items-center justify-between gap-1 mb-1">
                  <div className="flex items-center gap-1 text-[10px] font-bold text-amber-400">
                    <Star className="w-3 h-3 fill-current" />
                    <span>4.9</span>
                  </div>
                  {book.stream && book.stream !== 'common' && (
                    <span className="text-[9px] font-black px-1.5 py-0.2 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 uppercase tracking-tight">
                      {book.stream === 'natural_science' ? 'Natural' : 'Social'}
                    </span>
                  )}
                </div>

                {/* Book Title */}
                <h4 className="font-extrabold text-xs sm:text-sm text-slate-900 dark:text-white line-clamp-2 leading-tight group-hover:text-emerald-500 transition-colors">
                  {getTitle(book)}
                </h4>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 mt-2 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between gap-1.5">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onOpenPdf(book);
                  }}
                  className="flex-1 py-1.5 px-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-[11px] rounded-xl transition-all shadow-xs flex items-center justify-center gap-1"
                >
                  <BookOpen className="w-3 h-3" />
                  <span>Read</span>
                </button>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onToggleOffline(book.id);
                  }}
                  className={`p-1.5 rounded-xl border transition-all ${
                    isDownloaded
                      ? 'bg-emerald-500/15 border-emerald-500/30 text-emerald-400'
                      : 'bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:text-white'
                  }`}
                  title={isDownloaded ? 'Saved Offline' : 'Save for Offline'}
                >
                  {isDownloaded ? (
                    <Check className="w-3 h-3 stroke-[2.5]" />
                  ) : (
                    <DownloadCloud className="w-3 h-3" />
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
