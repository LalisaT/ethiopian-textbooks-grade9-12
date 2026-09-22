import React, { useState } from 'react';
import { Flashcard } from '../../types/quiz';
import { useTranslation } from '../../i18n/useTranslation';
import { RotateCw, ChevronLeft, ChevronRight, Sparkles, BookOpen, Layers } from 'lucide-react';

interface FlashcardViewerProps {
  cards?: Flashcard[];
  flashcards?: Flashcard[];
}

export const FlashcardViewer: React.FC<FlashcardViewerProps> = ({ cards = [], flashcards = [] }) => {
  const allCards = cards.length > 0 ? cards : flashcards;
  const { t, language } = useTranslation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredCards =
    selectedCategory === 'all'
      ? allCards
      : allCards.filter((c) => c.category === selectedCategory);

  if (filteredCards.length === 0) {
    return (
      <div className="p-8 text-center bg-slate-50 dark:bg-slate-800/40 rounded-3xl border border-slate-200 dark:border-slate-800">
        <p className="text-xs text-slate-400">No flashcards available in this category.</p>
      </div>
    );
  }

  const currentCard = filteredCards[currentIndex % filteredCards.length];

  const handleNext = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev + 1) % filteredCards.length);
  };

  const handlePrev = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev - 1 + filteredCards.length) % filteredCards.length);
  };

  const getFrontText = (c: Flashcard) => {
    if (language === 'am' && c.frontAmharic) return c.frontAmharic;
    return c.front;
  };

  const getBackText = (c: Flashcard) => {
    if (language === 'am' && c.backAmharic) return c.backAmharic;
    return c.back;
  };

  return (
    <div className="space-y-6 max-w-xl mx-auto">
      {/* Category filters */}
      <div className="flex items-center justify-center gap-2 overflow-x-auto pb-1">
        {['all', 'formula', 'definition', 'concept'].map((cat) => (
          <button
            key={cat}
            onClick={() => {
              setSelectedCategory(cat);
              setCurrentIndex(0);
              setIsFlipped(false);
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold capitalize transition-all ${
              selectedCategory === cat
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* 3D-Like Flashcard */}
      <div
        onClick={() => setIsFlipped(!isFlipped)}
        className="relative h-64 sm:h-72 w-full cursor-pointer group select-none transition-all duration-300"
      >
        <div
          className={`w-full h-full rounded-3xl p-8 shadow-xl border flex flex-col justify-between transition-all duration-300 transform ${
            isFlipped
              ? 'bg-gradient-to-br from-slate-900 to-slate-950 text-white border-blue-500/50 shadow-blue-950/30'
              : 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white border-slate-200 dark:border-slate-800 hover:border-blue-400'
          }`}
        >
          {/* Top category & grade tag */}
          <div className="flex items-center justify-between text-xs">
            <span
              className={`px-2.5 py-0.5 rounded-full font-bold uppercase text-[10px] tracking-wider ${
                isFlipped
                  ? 'bg-blue-500/20 text-sky-300 border border-blue-500/30'
                  : 'bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300'
              }`}
            >
              {currentCard.category}
            </span>
            <span className="text-[11px] text-slate-400">
              Grade {currentCard.grade} • Unit {currentCard.unitNumber}
            </span>
          </div>

          {/* Center Question / Answer text */}
          <div className="text-center my-auto py-2">
            <div className="text-sm sm:text-base font-bold leading-relaxed whitespace-pre-wrap">
              {isFlipped ? getBackText(currentCard) : getFrontText(currentCard)}
            </div>
          </div>

          {/* Bottom Flip Hint */}
          <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-800">
            <span className="font-mono">
              Card {currentIndex + 1} / {filteredCards.length}
            </span>
            <div className="flex items-center gap-1 text-blue-600 dark:text-sky-400 font-semibold">
              <RotateCw className="w-3 h-3 group-hover:rotate-180 transition-transform duration-500" />
              <span>{t('flipCard')}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation buttons */}
      <div className="flex items-center justify-between">
        <button
          onClick={handlePrev}
          className="flex items-center gap-1.5 px-4 py-2 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-xl text-xs font-bold hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Previous Card</span>
        </button>

        <button
          onClick={handleNext}
          className="flex items-center gap-1.5 px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-extrabold shadow-sm transition-all active:scale-95"
        >
          <span>Next Card</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
