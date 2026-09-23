import React, { useState, useMemo } from 'react';
import { Flashcard } from '../../types/quiz';
import { useTranslation } from '../../i18n/useTranslation';
import { RotateCw, ChevronLeft, ChevronRight, Sparkles, BookOpen, Layers, Search, Shuffle, Filter, X } from 'lucide-react';

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
  const [selectedGrade, setSelectedGrade] = useState<string>('all');
  const [selectedSubject, setSelectedSubject] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Extract unique subjects sorted
  const availableSubjects = useMemo(() => {
    const subs = Array.from(new Set(allCards.map((c) => c.subject))).sort();
    return ['all', ...subs];
  }, [allCards]);

  // Multi-tier filtering
  const filteredCards = useMemo(() => {
    return allCards.filter((c) => {
      if (selectedCategory !== 'all' && c.category !== selectedCategory) return false;
      if (selectedGrade !== 'all' && c.grade.toString() !== selectedGrade) return false;
      if (selectedSubject !== 'all' && c.subject !== selectedSubject) return false;
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const matchFront = c.front.toLowerCase().includes(q) || (c.frontAmharic && c.frontAmharic.toLowerCase().includes(q));
        const matchBack = c.back.toLowerCase().includes(q) || (c.backAmharic && c.backAmharic.toLowerCase().includes(q));
        const matchSub = c.subject.toLowerCase().includes(q);
        if (!matchFront && !matchBack && !matchSub) return false;
      }
      return true;
    });
  }, [allCards, selectedCategory, selectedGrade, selectedSubject, searchQuery]);

  const handleNext = () => {
    setIsFlipped(false);
    if (filteredCards.length > 0) {
      setCurrentIndex((prev) => (prev + 1) % filteredCards.length);
    }
  };

  const handlePrev = () => {
    setIsFlipped(false);
    if (filteredCards.length > 0) {
      setCurrentIndex((prev) => (prev - 1 + filteredCards.length) % filteredCards.length);
    }
  };

  const handleShuffle = () => {
    setIsFlipped(false);
    if (filteredCards.length > 1) {
      let rand = Math.floor(Math.random() * filteredCards.length);
      if (rand === currentIndex) {
        rand = (rand + 1) % filteredCards.length;
      }
      setCurrentIndex(rand);
    }
  };

  const resetFilters = () => {
    setSelectedCategory('all');
    setSelectedGrade('all');
    setSelectedSubject('all');
    setSearchQuery('');
    setCurrentIndex(0);
    setIsFlipped(false);
  };

  const getFrontText = (c: Flashcard) => {
    if (language === 'am' && c.frontAmharic) return c.frontAmharic;
    return c.front;
  };

  const getBackText = (c: Flashcard) => {
    if (language === 'am' && c.backAmharic) return c.backAmharic;
    return c.back;
  };

  const formatSubjectName = (sub: string) => {
    if (sub === 'all') return 'All Subjects';
    return sub
      .replace(/_/g, ' ')
      .replace(/\b\w/g, (char) => char.toUpperCase());
  };

  const currentCard = filteredCards[currentIndex % (filteredCards.length || 1)];

  return (
    <div className="space-y-5 max-w-xl mx-auto">
      {/* Search & Shuffle Bar */}
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentIndex(0);
              setIsFlipped(false);
            }}
            placeholder={`Search across ${allCards.length}+ formulas & flashcards...`}
            className="w-full pl-9 pr-8 py-2.5 bg-slate-900/80 border border-slate-800 text-white rounded-2xl text-xs placeholder-slate-400 focus:outline-none focus:ring-1 focus:ring-sky-400/50 transition-all shadow-inner"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        <button
          onClick={handleShuffle}
          disabled={filteredCards.length <= 1}
          className="px-3.5 py-2.5 rounded-2xl btn-luxury-idle luxury-pressable text-sky-400 hover:text-white text-xs font-black flex items-center gap-1.5 transition-all shrink-0 cursor-pointer disabled:opacity-40"
          title="Random Card"
        >
          <Shuffle className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Shuffle</span>
        </button>
      </div>

      {/* Grade Selector Chips */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
        <span className="text-[11px] font-bold text-slate-400 shrink-0 mr-1">Grade:</span>
        {['all', '9', '10', '11', '12'].map((g) => (
          <button
            key={g}
            onClick={() => {
              setSelectedGrade(g);
              setCurrentIndex(0);
              setIsFlipped(false);
            }}
            className={`px-2.5 py-1 rounded-xl text-xs font-bold transition-all luxury-pressable cursor-pointer shrink-0 ${
              selectedGrade === g
                ? 'btn-luxury-active ring-1 ring-sky-400/40 text-white shadow-md'
                : 'btn-luxury-idle text-slate-400 hover:text-white'
            }`}
          >
            {g === 'all' ? 'All Grades' : `Grade ${g}`}
          </button>
        ))}

        {/* Subject Dropdown */}
        <div className="ml-auto shrink-0">
          <select
            value={selectedSubject}
            onChange={(e) => {
              setSelectedSubject(e.target.value);
              setCurrentIndex(0);
              setIsFlipped(false);
            }}
            aria-label="Filter by Subject"
            className="px-2.5 py-1 rounded-xl text-xs font-bold bg-slate-900 border border-slate-800 text-sky-400 focus:outline-none focus:ring-1 focus:ring-sky-400 cursor-pointer"
          >
            {availableSubjects.map((sub) => (
              <option key={sub} value={sub} className="bg-slate-900 text-white">
                {formatSubjectName(sub)}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Category filters */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
        {[
          { id: 'all', label: 'All Cards', count: allCards.length },
          { id: 'formula', label: 'Formulas', count: allCards.filter((c) => c.category === 'formula').length },
          { id: 'definition', label: 'Definitions', count: allCards.filter((c) => c.category === 'definition').length },
          { id: 'concept', label: 'Concepts', count: allCards.filter((c) => c.category === 'concept').length },
          { id: 'date_fact', label: 'Key Facts', count: allCards.filter((c) => c.category === 'date_fact').length },
        ].map((cat) => (
          <button
            key={cat.id}
            onClick={() => {
              setSelectedCategory(cat.id);
              setCurrentIndex(0);
              setIsFlipped(false);
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all luxury-pressable flex items-center gap-1.5 cursor-pointer whitespace-nowrap shrink-0 ${
              selectedCategory === cat.id
                ? 'btn-luxury-active ring-1 ring-sky-400/40 text-white shadow-md'
                : 'btn-luxury-idle text-slate-300 dark:text-slate-400 hover:text-white'
            }`}
          >
            <span>{cat.label}</span>
            <span
              className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
                selectedCategory === cat.id
                  ? 'bg-sky-400/25 text-sky-200'
                  : 'bg-white/5 text-slate-400'
              }`}
            >
              {cat.count}
            </span>
          </button>
        ))}
      </div>

      {/* Empty State */}
      {filteredCards.length === 0 ? (
        <div className="p-10 text-center bg-slate-900/60 rounded-3xl border border-slate-800 space-y-3">
          <p className="text-sm font-semibold text-slate-300">No cards matched your current filter criteria.</p>
          <button
            onClick={resetFilters}
            className="px-4 py-2 btn-luxury-action luxury-pressable text-white rounded-xl text-xs font-bold"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <>
          {/* 3D-Like Flashcard */}
          <div
            onClick={() => setIsFlipped(!isFlipped)}
            className="relative min-h-[260px] sm:min-h-[290px] w-full cursor-pointer group select-none transition-all duration-300"
          >
            <div
              className={`w-full h-full rounded-3xl p-6 sm:p-8 shadow-2xl border flex flex-col justify-between transition-all duration-300 transform ${
                isFlipped
                  ? 'bg-gradient-to-br from-slate-900 via-indigo-950/60 to-slate-950 text-white border-sky-500/50 shadow-sky-950/40'
                  : 'bg-gradient-to-br from-slate-900 to-slate-950 text-white border-slate-800 hover:border-sky-500/40'
              }`}
            >
              {/* Top category & grade tag */}
              <div className="flex items-center justify-between text-xs gap-2">
                <span
                  className={`px-2.5 py-0.5 rounded-full font-black uppercase text-[10px] tracking-wider shrink-0 ${
                    isFlipped
                      ? 'bg-sky-500/20 text-sky-300 border border-sky-500/30'
                      : 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                  }`}
                >
                  {currentCard.category.replace('_', ' ')}
                </span>
                <span className="text-[11px] text-slate-400 font-bold truncate">
                  Grade {currentCard.grade} • {currentCard.subject.replace(/_/g, ' ').toUpperCase()} • Unit {currentCard.unitNumber}
                </span>
              </div>

              {/* Center Question / Answer text */}
              <div className="text-center my-auto py-4">
                <div className="text-sm sm:text-base font-extrabold leading-relaxed whitespace-pre-wrap text-slate-100">
                  {isFlipped ? getBackText(currentCard) : getFrontText(currentCard)}
                </div>
              </div>

              {/* Bottom Flip Hint */}
              <div className="flex items-center justify-between text-[11px] text-slate-400 pt-3 border-t border-slate-800/80">
                <span className="font-mono text-xs font-bold text-sky-400">
                  Card {(currentIndex % filteredCards.length) + 1} / {filteredCards.length}
                </span>
                <div className="flex items-center gap-1.5 text-sky-400 font-bold">
                  <RotateCw className="w-3.5 h-3.5 group-hover:rotate-180 transition-transform duration-500" />
                  <span>{isFlipped ? 'Show Front' : t('flipCard')}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation buttons */}
          <div className="flex items-center justify-between gap-3 pt-1">
            <button
              onClick={handlePrev}
              className="flex-1 flex items-center justify-center gap-1.5 px-4 py-3 btn-luxury-idle luxury-pressable text-slate-200 dark:text-slate-200 hover:text-white rounded-2xl text-xs font-black shadow-sm transition-all cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous Card</span>
            </button>

            <button
              onClick={handleNext}
              className="flex-1 flex items-center justify-center gap-1.5 px-5 py-3 btn-luxury-action luxury-pressable luxury-sheen-sweep text-white rounded-2xl text-xs font-black shadow-md transition-all cursor-pointer active:scale-95"
            >
              <span>Next Card</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </>
      )}
    </div>
  );
};
