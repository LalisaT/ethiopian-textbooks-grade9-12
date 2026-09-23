import React, { useState, useRef } from 'react';
import { Book } from '../../types/book';
import { BookCoverThumbnail } from '../books/BookCoverThumbnail';
import { 
  ChevronLeft, 
  ChevronRight, 
  BookOpen, 
  DownloadCloud, 
  Check, 
  Award, 
  X, 
  Star,
  Layers,
  GraduationCap
} from 'lucide-react';
import { useTranslation } from '../../i18n/useTranslation';

interface InteractiveBookshelfProps {
  books: Book[];
  onOpenPdf: (book: Book) => void;
  onOpenQuiz?: (book: Book) => void;
  onToggleOffline: (bookId: string) => void;
  offlineBookIds: string[];
}

export const InteractiveBookshelf: React.FC<InteractiveBookshelfProps> = ({
  books,
  onOpenPdf,
  onOpenQuiz,
  onToggleOffline,
  offlineBookIds,
}) => {
  const { language } = useTranslation();
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [highlightedBookId, setHighlightedBookId] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<'all' | 'natural' | 'social' | 'euee'>('all');
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const getTitle = (b: Book) => {
    if (language === 'am' && b.titleAmharic) return b.titleAmharic;
    if (language === 'om' && b.titleOromo) return b.titleOromo;
    if (language === 'ti' && b.titleTigrinya) return b.titleTigrinya;
    return b.title;
  };

  // Filter books according to category
  const filteredBooks = books.filter((b) => {
    if (activeCategory === 'natural') {
      return (
        b.stream === 'natural_science' ||
        ['physics', 'chemistry', 'biology', 'mathematics'].some((s) =>
          b.subject.toLowerCase().includes(s)
        )
      );
    }
    if (activeCategory === 'social') {
      return (
        b.stream === 'social_science' ||
        ['history', 'geography', 'economics', 'citizenship'].some((s) =>
          b.subject.toLowerCase().includes(s)
        )
      );
    }
    if (activeCategory === 'euee') {
      return b.grade === 12;
    }
    return true;
  });

  const handleScroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -320 : 320;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const handleBookTap = (book: Book) => {
    setHighlightedBookId(book.id);
    setSelectedBook(book);
  };

  return (
    <section className="space-y-4">
      {/* Bookshelf Category Selector & Carousel Controls */}
      <div className="flex items-center justify-between gap-2 px-1 max-w-full overflow-hidden">
        <div className="flex items-center gap-1.5 sm:gap-2 max-w-full overflow-x-auto no-scrollbar">
          <div className="luxury-segmented-tray p-1 sm:p-1.5 rounded-2xl flex items-center gap-1 sm:gap-1.5 text-xs font-bold shrink-0">
            <button
              onClick={() => setActiveCategory('all')}
              className={`shrink-0 whitespace-nowrap px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-xl text-[11px] sm:text-xs font-black luxury-pressable luxury-sheen-sweep cursor-pointer transition-all ${
                activeCategory === 'all'
                  ? 'btn-luxury-active'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/40'
              }`}
            >
              All Textbooks
            </button>
            <button
              onClick={() => setActiveCategory('natural')}
              className={`shrink-0 whitespace-nowrap px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-xl text-[11px] sm:text-xs font-black luxury-pressable luxury-sheen-sweep cursor-pointer transition-all ${
                activeCategory === 'natural'
                  ? 'btn-luxury-active'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/40'
              }`}
            >
              Natural
            </button>
            <button
              onClick={() => setActiveCategory('social')}
              className={`shrink-0 whitespace-nowrap px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-xl text-[11px] sm:text-xs font-black luxury-pressable luxury-sheen-sweep cursor-pointer transition-all ${
                activeCategory === 'social'
                  ? 'btn-luxury-active'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/40'
              }`}
            >
              Social
            </button>
          </div>

          {/* Navigation Arrows */}
          <div className="hidden sm:flex items-center gap-1.5 shrink-0">
            <button
              onClick={() => handleScroll('left')}
              className="w-9 h-9 rounded-xl btn-luxury-idle luxury-pressable text-slate-300 hover:text-white flex items-center justify-center transition-all cursor-pointer"
              title="Previous Books"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleScroll('right')}
              className="w-9 h-9 rounded-xl btn-luxury-idle luxury-pressable text-slate-300 hover:text-white flex items-center justify-center transition-all cursor-pointer"
              title="Next Books"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Realistic 3D Bookshelf Cabinet */}
      <div className="relative rounded-3xl bg-gradient-to-b from-[#0e1626] via-[#0a101d] to-[#070c16] p-4 sm:p-6 border border-slate-800 shadow-2xl overflow-hidden">
        {/* Subtle Shelf Ambient Lighting */}
        <div className="absolute top-0 left-1/4 w-96 h-48 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-96 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Carousel Container */}
        <div
          ref={scrollRef}
          className="relative z-10 flex gap-4 sm:gap-6 overflow-x-auto no-scrollbar scroll-smooth pb-6 pt-2 px-2 snap-x snap-mandatory"
        >
          {filteredBooks.map((book) => {
            const isHighlighted = highlightedBookId === book.id;
            const isOffline = offlineBookIds.includes(book.id);

            return (
              <div
                key={book.id}
                onClick={() => handleBookTap(book)}
                className="group relative shrink-0 snap-start cursor-pointer transition-all duration-300"
                style={{ perspective: '1000px' }}
              >
                {/* 3D Book Container */}
                <div
                  className={`w-36 sm:w-44 rounded-2xl p-2.5 transition-all duration-300 ${
                    isHighlighted
                      ? 'scale-105 ring-4 ring-cyan-400 shadow-[0_0_30px_rgba(6,182,212,0.8)] bg-slate-800/90'
                      : 'hover:scale-[1.03] hover:ring-2 hover:ring-teal-500/50 bg-slate-900/80 border border-slate-800/80'
                  }`}
                >
                  {/* Book Cover with 3D Spine Depth */}
                  <div className="relative aspect-[3/4] w-full rounded-xl overflow-hidden bg-slate-950 shadow-lg border border-slate-800/80">
                    <BookCoverThumbnail
                      book={book}
                      imgClassName="group-hover:scale-105 transition-transform duration-300"
                    />

                    {/* 3D Book Spine Shading Overlay */}
                    <div className="absolute inset-y-0 left-0 w-3.5 bg-gradient-to-r from-black/60 via-black/20 to-transparent pointer-events-none" />
                    <div className="absolute inset-y-0 left-0 w-0.5 bg-white/20 pointer-events-none" />

                    {/* Grade Level Tag */}
                    <div className="absolute top-2 left-2 px-2 py-0.5 rounded-lg bg-slate-950/90 backdrop-blur-md text-amber-300 text-[10px] font-black border border-amber-500/30">
                      Grade {book.grade}
                    </div>

                    {/* Offline Saved Indicator */}
                    {isOffline && (
                      <div className="absolute top-2 right-2 p-1 rounded-lg bg-teal-500 text-slate-950 font-black shadow-md">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </div>
                    )}
                  </div>

                  {/* Book Title & Stream */}
                  <div className="pt-2">
                    <h3 className="font-extrabold text-xs sm:text-sm text-white line-clamp-1 leading-tight group-hover:text-cyan-400 transition-colors">
                      {getTitle(book)}
                    </h3>
                    <div className="flex items-center justify-between text-[10px] text-slate-400 font-bold mt-1">
                      <span className="capitalize">{book.subject}</span>
                      {book.stream && book.stream !== 'common' ? (
                        <span className="text-[9px] text-teal-400 font-black uppercase">
                          {book.stream === 'natural_science' ? 'Natural' : 'Social'}
                        </span>
                      ) : (
                        <span className="text-[9px] text-slate-500 font-bold">Standard</span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Wooden / Dark Metallic Shelf Plank Ledge */}
                <div className="w-full h-3 mt-1.5 rounded-full bg-gradient-to-r from-amber-950 via-slate-800 to-amber-950 border-t border-amber-500/30 shadow-md" />
              </div>
            );
          })}
        </div>

        {/* Shelf Base Wood Panel Bar */}
        <div className="relative -mt-3 h-3.5 w-full rounded-b-2xl bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border-t-2 border-slate-700/80 shadow-[0_4px_12px_rgba(0,0,0,0.6)]" />
      </div>

      {/* Interactive Book Preview Modal (Triggered on Tap) */}
      {selectedBook && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
          <div className="relative w-full max-w-md rounded-3xl bg-gradient-to-b from-slate-900 to-slate-950 border border-cyan-500/30 shadow-[0_0_50px_rgba(6,182,212,0.25)] p-5 sm:p-6 overflow-hidden">
            {/* Ambient Background Glow */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />

            {/* Modal Close Button */}
            <button
              onClick={() => {
                setSelectedBook(null);
                setHighlightedBookId(null);
              }}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-800/80 text-slate-400 hover:text-white transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Modal Content */}
            <div className="flex gap-4 items-start">
              {/* Cover Artwork */}
              <div className="relative w-28 sm:w-32 aspect-[3/4] rounded-2xl overflow-hidden bg-slate-950 border border-slate-800 shrink-0 shadow-xl ring-2 ring-cyan-400/40">
                <BookCoverThumbnail book={selectedBook} />
                <div className="absolute top-1.5 left-1.5 px-1.5 py-0.5 rounded bg-slate-950/80 text-amber-300 text-[9px] font-black border border-amber-500/30">
                  Grade {selectedBook.grade}
                </div>
              </div>

              {/* Book Details */}
              <div className="min-w-0 space-y-1.5">
                <div className="inline-flex items-center gap-1 text-[10px] font-bold text-teal-400 bg-teal-500/10 px-2 py-0.5 rounded-full border border-teal-500/20">
                  <GraduationCap className="w-3 h-3" />
                  <span>MOE Curriculum 2026</span>
                </div>
                <h3 className="text-base sm:text-lg font-black text-white leading-tight">
                  {getTitle(selectedBook)}
                </h3>
                <p className="text-xs text-slate-400 capitalize">
                  Subject: <strong className="text-slate-200">{selectedBook.subject}</strong>
                </p>
                {selectedBook.stream && (
                  <p className="text-xs text-slate-400">
                    Stream:{' '}
                    <strong className="text-cyan-300 capitalize">
                      {selectedBook.stream.replace('_', ' ')}
                    </strong>
                  </p>
                )}
                <div className="flex items-center gap-2 pt-1 text-xs text-slate-300">
                  <span className="text-teal-400 font-bold">Official Ministry of Education</span>
                  <span>•</span>
                  <span>100% Free Offline</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-5 mt-4 border-t border-slate-800">
              <button
                onClick={() => {
                  onOpenPdf(selectedBook);
                  setSelectedBook(null);
                }}
                className="py-3 px-4 rounded-2xl bg-teal-500 hover:bg-teal-400 active:scale-95 text-slate-950 font-black text-xs sm:text-sm shadow-lg shadow-teal-500/25 transition-all flex items-center justify-center gap-2"
              >
                <BookOpen className="w-4 h-4" />
                <span>Read Full Book</span>
              </button>

              {onOpenQuiz ? (
                <button
                  onClick={() => {
                    onOpenQuiz(selectedBook);
                    setSelectedBook(null);
                  }}
                  className="py-3 px-4 rounded-2xl bg-amber-400 hover:bg-amber-300 active:scale-95 text-slate-950 font-black text-xs sm:text-sm shadow-lg shadow-amber-400/25 transition-all flex items-center justify-center gap-2"
                >
                  <Award className="w-4 h-4" />
                  <span>Chapter Quiz</span>
                </button>
              ) : (
                <button
                  onClick={() => {
                    onToggleOffline(selectedBook.id);
                  }}
                  className={`py-3 px-4 rounded-2xl border font-bold text-xs sm:text-sm transition-all flex items-center justify-center gap-2 active:scale-95 ${
                    offlineBookIds.includes(selectedBook.id)
                      ? 'bg-teal-500/20 text-teal-300 border-teal-500/40'
                      : 'bg-slate-800 hover:bg-slate-700 text-white border-slate-700'
                  }`}
                >
                  <DownloadCloud className="w-4 h-4" />
                  <span>
                    {offlineBookIds.includes(selectedBook.id)
                      ? 'Saved Offline'
                      : 'Save for Offline'}
                  </span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
