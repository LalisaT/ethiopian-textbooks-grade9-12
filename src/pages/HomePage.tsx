import React, { useState, useMemo } from 'react';
import { Book, GradeLevel, AcademicStream } from '../types/book';
import { useTranslation } from '../i18n/useTranslation';
import { EXAM_PRACTICE_QUESTIONS } from '../data/examQuestions';
import { PlayStoreShelf } from '../components/home/PlayStoreShelf';
import { InteractiveBookshelf } from '../components/bookshelf/InteractiveBookshelf';
import { CosmicParticleBackground } from '../components/common/CosmicParticleBackground';
import { BackgroundDriftingShelf } from '../components/home/BackgroundDriftingShelf';
import { NativeAdCard } from '../components/ads/NativeAdCard';
import { StickyBannerAd } from '../components/ads/StickyBannerAd';
import { AdService } from '../services/adService';
import {
  BookOpen,
  Award,
  Sparkles,
  ArrowRight,
  CheckCircle,
  GraduationCap,
  Atom,
  TrendingUp,
  CheckCircle2,
  XCircle,
  Send,
  Search,
  BookMarked,
  Flame,
  Zap,
} from 'lucide-react';

interface HomePageProps {
  books: Book[];
  onOpenInteractive: (book: Book) => void;
  onOpenPdf: (book: Book) => void;
  onToggleOffline: (bookId: string) => void;
  offlineBookIds: string[];
  readingProgress: Record<string, { percentComplete: number }>;
  onSelectGradeFilter: (grade: GradeLevel) => void;
  onNavigateToExplore: () => void;
  onNavigateToExamPrep: () => void;
  onNavigateToCommunity: () => void;
  onNavigateToTeacherGuides?: () => void;
  isAdmin?: boolean;
  onEditBook?: (book: Book) => void;
  onDeleteBook?: (bookId: string) => void;
  // Deprecated compatibility props
  onSelectRegionFilter?: any;
  onSelectLanguageFilter?: any;
}

export const HomePage: React.FC<HomePageProps> = ({
  books,
  onOpenInteractive,
  onOpenPdf,
  onToggleOffline,
  offlineBookIds,
  readingProgress,
  onSelectGradeFilter,
  onNavigateToExplore,
  onNavigateToExamPrep,
  onNavigateToCommunity,
  onNavigateToTeacherGuides,
}) => {
  const { t, language } = useTranslation();
  const [activeChip, setActiveChip] = useState<'all' | 'g12' | 'g11' | 'g10' | 'g9' | 'natural' | 'social' | 'tg'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // EUEE Quick Challenge interactive state
  const quickChallengeQuestion = EXAM_PRACTICE_QUESTIONS[0];
  const [selectedChallengeOption, setSelectedChallengeOption] = useState<number | null>(null);
  const [hasSubmittedChallenge, setHasSubmittedChallenge] = useState(false);

  // Categorized Book Collections for Google Play Store Shelves
  const continueReadingBooks = useMemo(() => {
    return books.filter((b) => (readingProgress[b.id]?.percentComplete || 0) > 0);
  }, [books, readingProgress]);

  const grade12Books = useMemo(() => {
    return books.filter((b) => b.grade === 12 && b.bookType !== 'teacher_guide');
  }, [books]);

  const grade11Books = useMemo(() => {
    return books.filter((b) => b.grade === 11 && b.bookType !== 'teacher_guide');
  }, [books]);

  const naturalScienceBooks = useMemo(() => {
    return books.filter((b) => b.stream === 'natural_science' && b.bookType !== 'teacher_guide');
  }, [books]);

  const socialScienceBooks = useMemo(() => {
    return books.filter((b) => b.stream === 'social_science' && b.bookType !== 'teacher_guide');
  }, [books]);

  const teacherGuides = useMemo(() => {
    return books.filter((b) => b.bookType === 'teacher_guide');
  }, [books]);

  // Search filtered books
  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const q = searchQuery.toLowerCase().trim();
    return books.filter(
      (b) =>
        b.title.toLowerCase().includes(q) ||
        (b.titleAmharic && b.titleAmharic.toLowerCase().includes(q)) ||
        (b.titleOromo && b.titleOromo.toLowerCase().includes(q)) ||
        b.subject.toLowerCase().includes(q) ||
        `grade ${b.grade}`.includes(q)
    );
  }, [books, searchQuery]);

  return (
    <div className="relative min-h-screen space-y-6 sm:space-y-10 max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 pt-3 sm:pt-6 pb-4 sm:pb-6">
      {/* 1. Subtle Cosmic Night-Sky Particle Background */}
      <CosmicParticleBackground particleCount={30} />

      {/* 2. Search Section */}
      <div className="relative z-10 space-y-3">

        {/* Search Bar */}
        <div className="relative max-w-3xl mx-auto">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
            <Search className="w-4 h-4 text-cyan-400" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search Grade 9–12 textbooks, EUEE past papers, subjects..."
            className="w-full pl-11 pr-4 py-3 bg-slate-900/90 border border-slate-800 rounded-full text-xs sm:text-sm text-white placeholder-slate-400 shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute inset-y-0 right-0 pr-4 flex items-center text-xs font-bold text-slate-400 hover:text-white"
            >
              Clear
            </button>
          )}
        </div>

        {/* Filter Bar: Interactive Grade & Category Filter Chips */}
        <div className="flex items-center gap-2.5 overflow-x-auto no-scrollbar py-1.5 px-0.5 scroll-smooth touch-pan-x">
          {[
            { id: 'all' as const, label: 'For You' },
            { id: 'g12' as const, label: 'Grade 12 (EUEE)' },
            { id: 'g11' as const, label: 'Grade 11' },
            { id: 'g10' as const, label: 'Grade 10' },
            { id: 'g9' as const, label: 'Grade 9' },
            { id: 'natural' as const, label: 'Natural Science' },
            { id: 'social' as const, label: 'Social Science' },
            { id: 'tg' as const, label: "Teacher's Guides" },
          ].map((chip) => {
            const isSelected = activeChip === chip.id;
            return (
              <button
                key={chip.id}
                onClick={() => {
                  setActiveChip(chip.id);
                  if (chip.id === 'g12') onSelectGradeFilter(12);
                  else if (chip.id === 'g11') onSelectGradeFilter(11);
                  else if (chip.id === 'g10') onSelectGradeFilter(10);
                  else if (chip.id === 'g9') onSelectGradeFilter(9);
                  else if (chip.id === 'tg' && onNavigateToTeacherGuides) onNavigateToTeacherGuides();
                }}
                className={`shrink-0 px-4 py-2 rounded-2xl text-xs font-black whitespace-nowrap luxury-pressable luxury-sheen-sweep cursor-pointer transition-all ${
                  isSelected
                    ? 'btn-luxury-active'
                    : 'btn-luxury-idle'
                }`}
              >
                {chip.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Instant Search Results Dropdown / Shelf (if searching) */}
      {searchQuery.trim() && (
        <PlayStoreShelf
          title={`Search Results (${searchResults.length})`}
          subtitle={`Matches for "${searchQuery}"`}
          badge="Live Search"
          books={searchResults}
          onOpenPdf={onOpenPdf}
          onToggleOffline={onToggleOffline}
          offlineBookIds={offlineBookIds}
          readingProgress={readingProgress}
          onSeeAll={onNavigateToExplore}
        />
      )}

      {/* 3. Hero Section (Ultra Premium Cosmic Showcase with 3D Bookshelf Animation) */}
      {!searchQuery.trim() && (
        <section className="relative rounded-3xl bg-gradient-to-br from-[#0a101d] via-slate-900 to-[#070c16] text-white p-5 sm:p-7 md:p-8 overflow-hidden border border-slate-800 shadow-2xl">
          {/* Clean Subtle Ambient Background Video (100% free of text) */}
          <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover opacity-25 filter saturate-125"
              src="/videos/Subtle_Background_Carousel.mp4"
            />
            {/* Smooth gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/80 to-slate-950/60" />
          </div>

          {/* Subtle Ambient Glow Orbs */}
          <div className="absolute top-0 right-0 -mt-10 -mr-10 w-72 sm:w-96 h-72 sm:h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-1/3 -mb-10 w-64 sm:w-80 h-64 sm:h-80 bg-indigo-600/15 rounded-full blur-3xl pointer-events-none" />

          {/* Hero Content Grid: Left Text + Right 3D Bookshelf Animation */}
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            {/* Left Column: Crisp Clean Typography with Low-Opacity Drifting Shelf Background */}
            <div className="relative md:col-span-7 lg:col-span-8 space-y-3.5 sm:space-y-4 overflow-hidden rounded-3xl p-3 sm:p-4">
              {/* Single Horizontal Shelf behind the text block with 0.20 opacity and gentle infinite horizontal drift */}
              <BackgroundDriftingShelf opacity={0.20} />

              <div className="relative z-10 space-y-3.5 sm:space-y-4">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-500/15 text-sky-300 border border-blue-500/30 text-[11px] font-black backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
                <span>National High School Curriculum • New Edition</span>
              </div>

              <h2 className="text-xl sm:text-3xl lg:text-4xl font-black tracking-tight leading-tight">
                Ethiopian Grade 9–12 <br className="hidden sm:inline" />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-blue-300 to-indigo-300">
                  Textbooks &amp; EUEE Matric Hub
                </span>
              </h2>

              <p className="text-slate-300 text-xs sm:text-sm leading-relaxed max-w-xl">
                Official Ministry of Education textbooks and <strong>Teacher's Guides</strong>. Master <strong>Natural &amp; Social Sciences</strong> and practice for the <strong>Grade 12 Ethiopian University Entrance Examination</strong> with 100% offline study capability.
              </p>


              {/* Micro Feature Metrics */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-3 border-t border-slate-800/80 text-[11px] text-slate-300">
                <div className="flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                  <span>MOE Syllabus</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Atom className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                  <span>Natural &amp; Social</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>2020–2024 Past Papers</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <BookMarked className="w-3.5 h-3.5 text-sky-400 shrink-0" />
                  <span>100% Offline</span>
                </div>
              </div>
            </div>
          </div>

            {/* Right Column: 3D Bookshelf Animated Showcase (100% zero text) */}
            <div className="hidden md:flex md:col-span-5 lg:col-span-4 items-center justify-center">
              <div className="relative w-full max-w-[260px] aspect-[3/4] rounded-3xl overflow-hidden bg-slate-950/80 border-2 border-amber-400/30 shadow-[0_0_35px_rgba(245,158,11,0.2)]">
                <video
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover"
                  src="/videos/bookshelf_3d_animation.mp4"
                />
                <div className="absolute inset-0 ring-1 ring-inset ring-white/10 rounded-3xl pointer-events-none" />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 4. Interactive Bookshelf Component (Spines, Categories & Preview Modal) */}
      {!searchQuery.trim() && (
        <InteractiveBookshelf
          books={books}
          onOpenPdf={onOpenPdf}
          onToggleOffline={onToggleOffline}
          offlineBookIds={offlineBookIds}
        />
      )}

      {/* 3. Shelf 1: Continue Reading (Google Play Store Style) */}
      {continueReadingBooks.length > 0 && (
        <PlayStoreShelf
          title="Continue Reading"
          subtitle="Pick up where you left off"
          badge="In Progress"
          books={continueReadingBooks}
          onOpenPdf={onOpenPdf}
          onToggleOffline={onToggleOffline}
          offlineBookIds={offlineBookIds}
          readingProgress={readingProgress}
          onSeeAll={onNavigateToExplore}
        />
      )}

      {/* 4. High School Grade Levels (Grade 12, 11, 10, 9) */}
      <section className="space-y-3">
        <div className="flex items-center justify-between px-1">
          <div>
            <h3 className="text-base sm:text-xl font-black text-slate-900 dark:text-white tracking-tight">
              High School Grade Levels
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Direct access to syllabus textbooks by academic year
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4">
          {[
            {
              grade: 12 as GradeLevel,
              title: 'Grade 12 Senior',
              subtitle: 'EUEE Preparatory',
              desc: 'Calculus, Physics, Chemistry, Biology, Economics, History & Matric',
              color: 'from-amber-500 to-yellow-600',
              badge: 'Matric',
            },
            {
              grade: 11 as GradeLevel,
              title: 'Grade 11 Senior',
              subtitle: 'Stream Choice',
              desc: 'Natural Science & Social Science specialization and STEM',
              color: 'from-blue-600 to-indigo-700',
              badge: 'Stream',
            },
            {
              grade: 10 as GradeLevel,
              title: 'Grade 10 Secondary',
              subtitle: 'General Secondary',
              desc: 'Mechanics, Hydrocarbons, Physiology, Relations & ICT',
              color: 'from-blue-600 to-indigo-700',
              badge: 'Secondary',
            },
            {
              grade: 9 as GradeLevel,
              title: 'Grade 9 Freshman',
              subtitle: 'High School Entry',
              desc: 'Foundations of Algebra, Physical Quantities & General Science',
              color: 'from-purple-600 to-violet-700',
              badge: 'Freshman',
            },
          ].map((item) => (
            <div
              key={item.grade}
              onClick={() => onSelectGradeFilter(item.grade)}
              className="group cursor-pointer bg-white dark:bg-slate-900/90 rounded-3xl p-3.5 sm:p-4 border border-slate-200/90 dark:border-slate-800/90 hover:border-blue-500/50 shadow-sm hover:shadow-lg transition-all duration-200 flex flex-col justify-between active:scale-95"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-black text-[10px] rounded-lg">
                    {item.badge}
                  </span>
                  <div className={`w-7 h-7 rounded-xl bg-gradient-to-br ${item.color} text-white flex items-center justify-center font-black text-xs shadow-xs group-hover:scale-110 transition-transform`}>
                    {item.grade}
                  </div>
                </div>

                <h4 className="font-extrabold text-xs sm:text-sm text-slate-900 dark:text-white mb-0.5 group-hover:text-blue-500 transition-colors">
                  {item.title}
                </h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2">
                  {item.desc}
                </p>
              </div>

              <div className="pt-2 mt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-bold text-blue-600 dark:text-sky-400">
                <span>Open Grade</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Native In-Feed Sponsored Card */}
      <NativeAdCard />

      {/* 7. Shelf 4: Natural Science Core Textbooks */}
      {naturalScienceBooks.length > 0 && (
        <PlayStoreShelf
          title="Natural Science Stream"
          books={naturalScienceBooks}
          onOpenPdf={onOpenPdf}
          onToggleOffline={onToggleOffline}
          offlineBookIds={offlineBookIds}
          readingProgress={readingProgress}
          onSeeAll={onNavigateToExplore}
        />
      )}

      {/* 8. Active Interactive Widget: Daily EUEE Quick Challenge */}
      {quickChallengeQuestion && (
        <section className="bg-gradient-to-br from-slate-900 via-slate-950 to-indigo-950 rounded-3xl p-4 sm:p-6 border border-amber-500/30 shadow-xl relative overflow-hidden text-white space-y-3.5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <span className="p-1.5 rounded-xl bg-amber-500 text-slate-950 font-black">
                <Flame className="w-4 h-4 text-slate-950" />
              </span>
              <div>
                <div className="text-[10px] font-black uppercase tracking-wider text-amber-400">
                  Daily EUEE Quick Challenge • National Exam Prep
                </div>
                <h4 className="text-xs sm:text-sm font-black text-white">
                  {quickChallengeQuestion.chapterTitle} ({quickChallengeQuestion.subject.toUpperCase()})
                </h4>
              </div>
            </div>

            <span className="self-start sm:self-auto px-2.5 py-0.5 rounded-full bg-slate-800 text-amber-300 border border-amber-500/20 text-[10px] font-bold">
              Grade {quickChallengeQuestion.sourceGrade || 12}
            </span>
          </div>

          <p className="text-xs sm:text-sm font-medium text-slate-200 leading-relaxed">
            {quickChallengeQuestion.question}
          </p>

          {/* Interactive Options */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {quickChallengeQuestion.options.map((option, idx) => {
              const isSelected = selectedChallengeOption === idx;
              const isCorrect = idx === quickChallengeQuestion.correctOptionIndex;

              let optionStyle = 'bg-slate-800/80 hover:bg-slate-800 border-slate-700 text-slate-200';
              if (hasSubmittedChallenge) {
                if (isCorrect) {
                  optionStyle = 'bg-emerald-950/80 border-emerald-500 text-emerald-300 ring-1 ring-emerald-500';
                } else if (isSelected && !isCorrect) {
                  optionStyle = 'bg-rose-950/80 border-rose-500 text-rose-300 ring-1 ring-rose-500';
                }
              } else if (isSelected) {
                optionStyle = 'bg-amber-500/20 border-amber-400 text-amber-200 ring-1 ring-amber-400';
              }

              return (
                <button
                  key={idx}
                  disabled={hasSubmittedChallenge}
                  onClick={() => {
                    setSelectedChallengeOption(idx);
                    setHasSubmittedChallenge(true);
                  }}
                  className={`p-2.5 rounded-2xl border text-left text-xs font-bold transition-all flex items-center justify-between active:scale-[0.98] ${optionStyle}`}
                >
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-black/40 flex items-center justify-center text-[10px] font-black shrink-0">
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span className="truncate">{option}</span>
                  </div>
                  {hasSubmittedChallenge && isCorrect && (
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  )}
                  {hasSubmittedChallenge && isSelected && !isCorrect && (
                    <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Step-by-Step Answer Explanation */}
          {hasSubmittedChallenge && (
            <div className="p-3 rounded-2xl bg-slate-800/90 border border-slate-700 text-xs space-y-1 animate-in fade-in duration-200">
              <div className="font-extrabold flex items-center gap-1.5 text-amber-300">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Solution:</span>
              </div>
              <p className="text-slate-300 text-[11px] leading-relaxed">
                {quickChallengeQuestion.explanation}
              </p>
              <div className="pt-1 flex justify-end">
                <button
                  onClick={onNavigateToExamPrep}
                  className="text-xs font-black text-amber-400 hover:text-amber-300 flex items-center gap-1"
                >
                  <span>Practice More EUEE Questions</span>
                  <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          )}
        </section>
      )}

      {/* 9. Shelf 5: Social Science Core Textbooks */}
      {socialScienceBooks.length > 0 && (
        <PlayStoreShelf
          title="Social Science Stream"
          books={socialScienceBooks}
          onOpenPdf={onOpenPdf}
          onToggleOffline={onToggleOffline}
          offlineBookIds={offlineBookIds}
          readingProgress={readingProgress}
          onSeeAll={onNavigateToExplore}
        />
      )}

      {/* 10. Shelf 6: Teacher's Guides Edition */}
      {teacherGuides.length > 0 && (
        <PlayStoreShelf
          title="Official Teacher's Guides"
          subtitle="Curriculum lesson plans, answer keys & teaching manuals"
          badge="Educator Guides"
          books={teacherGuides}
          onOpenPdf={onOpenPdf}
          onToggleOffline={onToggleOffline}
          offlineBookIds={offlineBookIds}
          readingProgress={readingProgress}
          onSeeAll={onNavigateToTeacherGuides || onNavigateToExplore}
        />
      )}

      {/* 11. Official Telegram Community Banner (Compact & Clean - No Excess Void) */}
      <section className="bg-gradient-to-r from-sky-500/10 via-sky-500/5 to-slate-900/20 dark:bg-slate-900/90 rounded-2xl p-3.5 sm:p-4 border border-sky-500/30 dark:border-sky-500/20 shadow-sm transition-all hover:shadow-md">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-gradient-to-tr from-sky-500 to-sky-400 p-2 flex items-center justify-center text-white shadow-md shadow-sky-500/30 shrink-0">
              <svg className="w-5 h-5 sm:w-6 sm:h-6 fill-current" viewBox="0 0 24 24">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.75-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/>
              </svg>
            </div>

            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-xs sm:text-sm text-slate-900 dark:text-white truncate">
                  Official Telegram Channel
                </span>
                <span className="px-1.5 py-0.2 bg-sky-500 text-white rounded text-[9px] font-black uppercase tracking-wider shrink-0">
                  Verified
                </span>
              </div>
              <p className="text-[11px] sm:text-xs text-slate-500 dark:text-slate-400 truncate mt-0.5">
                @Ethiopianstudentbooks • Free Textbooks &amp; EUEE Solutions
              </p>
            </div>
          </div>

          <a
            href="https://t.me/Ethiopianstudentbooks"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 active:scale-95 text-white font-bold text-xs shadow-md shadow-sky-500/20 transition-all flex items-center gap-1.5 shrink-0"
          >
            <Send className="w-3.5 h-3.5" />
            <span>Join</span>
          </a>
        </div>
      </section>

      {/* 12. Non-Intrusive Bottom Smart Banner Ad */}
      <StickyBannerAd />
    </div>
  );
};
