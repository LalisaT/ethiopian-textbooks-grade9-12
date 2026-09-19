import React, { useState } from 'react';
import { Book, GradeLevel, AcademicStream } from '../types/book';
import { useTranslation } from '../i18n/useTranslation';
import { BookCard } from '../components/books/BookCard';
import { EXAM_PRACTICE_QUESTIONS } from '../data/examQuestions';
import {
  BookOpen,
  Award,
  Sparkles,
  ArrowRight,
  Compass,
  CheckCircle,
  Shield,
  Layers,
  GraduationCap,
  Atom,
  TrendingUp,
  CheckCircle2,
  XCircle,
  HelpCircle,
  BookMarked,
  Send,
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
  onNavigateToTeacherGuides,
  isAdmin = false,
  onEditBook,
  onDeleteBook,
}) => {
  const { t } = useTranslation();
  const [activeStream, setActiveStream] = useState<AcademicStream>('all');

  // EUEE Quick Challenge interactive state
  const quickChallengeQuestion = EXAM_PRACTICE_QUESTIONS[0]; // Physics Carnot engine or Kinematics
  const [selectedChallengeOption, setSelectedChallengeOption] = useState<number | null>(null);
  const [hasSubmittedChallenge, setHasSubmittedChallenge] = useState(false);

  // Filter featured books by active stream
  const filteredFeaturedBooks = books
    .filter((b) => {
      if (activeStream === 'all') return true;
      return b.stream === activeStream || b.stream === 'common';
    })
    .slice(0, 6);

  return (
    <div className="space-y-8 sm:space-y-12 max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 pt-4 sm:pt-8 pb-28 sm:pb-12">
      {/* Hero Section */}
      <section className="relative rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 text-white p-5 sm:p-12 overflow-hidden border border-slate-800 shadow-2xl">
        <div className="absolute top-0 right-0 -mt-12 -mr-12 w-80 sm:w-96 h-80 sm:h-96 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 -mb-12 w-64 sm:w-80 h-64 sm:h-80 bg-amber-500/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl space-y-4 sm:space-y-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[11px] sm:text-xs font-black backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span>Ethiopian National High School Portal • Grades 9–12</span>
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
            Ethiopian Grade 9–12 <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-cyan-400 to-amber-300">
              Textbooks & EUEE Hub
            </span>
          </h1>

          <p className="text-slate-300 text-xs sm:text-sm sm:leading-relaxed max-w-2xl">
            Official Ministry of Education curriculum textbooks and <strong>Teacher's Guides</strong> for Secondary and Preparatory schools. Master <strong>Natural Sciences</strong> and <strong>Social Sciences</strong> streams and prepare for the <strong>Grade 12 Ethiopian University Entrance Examination (EUEE)</strong> across all high schools nationwide.
          </p>

          {/* Quick CTA Buttons - Full Width on Mobile for Better Ergonomics */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 pt-1 sm:pt-2">
            <button
              onClick={onNavigateToExplore}
              className="px-5 py-3.5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs sm:text-sm shadow-lg shadow-emerald-500/20 transition-all active:scale-95 flex items-center justify-center gap-2"
            >
              <Compass className="w-4 h-4" />
              <span>Grade 9–12 Textbooks</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onNavigateToTeacherGuides || onNavigateToExplore}
              className="px-5 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-400 hover:from-amber-400 hover:to-amber-300 text-slate-950 font-black text-xs sm:text-sm shadow-lg shadow-amber-500/20 transition-all active:scale-95 flex items-center justify-center gap-2 ring-2 ring-amber-400/40"
            >
              <GraduationCap className="w-4 h-4" />
              <span>Teacher Guides</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onNavigateToExamPrep}
              className="px-5 py-3.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white font-black text-xs sm:text-sm border border-slate-700 shadow-md transition-all active:scale-95 flex items-center justify-center gap-2"
            >
              <Award className="w-4 h-4 text-amber-400" />
              <span>EUEE Entrance Exam Hub</span>
              <Sparkles className="w-4 h-4 text-amber-400" />
            </button>
          </div>

          {/* Value props badges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-4 pt-3 sm:pt-4 border-t border-slate-800/80 text-[11px] sm:text-xs">
            <div className="flex items-center gap-1.5 text-slate-300">
              <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>MOE New Curriculum (2023+)</span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-300">
              <Atom className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
              <span>Natural & Social Streams</span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-300">
              <Award className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>Grade 12 EUEE Past Exams</span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-300">
              <GraduationCap className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>Official Teacher Guides</span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-300">
              <BookMarked className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>Offline Study & Fast Reader</span>
            </div>
          </div>
        </div>
      </section>

      {/* Grade Level Cards (9, 10, 11, 12) */}
      <section className="space-y-3 sm:space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
              Secondary & Preparatory Grade Levels
            </h2>
            <p className="text-xs text-slate-500">
              Select your grade level to explore national curriculum textbooks and study units
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-5">
          {[
            {
              grade: 12 as GradeLevel,
              title: 'Grade 12 Senior',
              subtitle: 'Preparatory & Matric',
              desc: 'Calculus, Physics, Chemistry, Biology, Economics, History & EUEE Matric Prep',
              color: 'from-amber-600 to-yellow-800',
              badge: 'EUEE Matric',
            },
            {
              grade: 11 as GradeLevel,
              title: 'Grade 11 Senior',
              subtitle: 'Stream Separation',
              desc: 'Natural Science & Social Science specialization, Vectors, Bonding & Consumer Theory',
              color: 'from-blue-600 to-indigo-800',
              badge: 'Stream Choice',
            },
            {
              grade: 10 as GradeLevel,
              title: 'Grade 10 Secondary',
              subtitle: 'General Secondary',
              desc: 'Newton Laws, Hydrocarbons, Physiology, Relations, Trigonometry & ICT',
              color: 'from-emerald-600 to-teal-800',
              badge: 'Secondary',
            },
            {
              grade: 9 as GradeLevel,
              title: 'Grade 9 Freshman',
              subtitle: 'High School Entry',
              desc: 'Quadratic Equations, Real Numbers, Physical Quantities & Foundation STEM',
              color: 'from-purple-600 to-violet-800',
              badge: 'Freshman',
            },
          ].map((item) => (
            <div
              key={item.grade}
              onClick={() => onSelectGradeFilter(item.grade)}
              className="group cursor-pointer bg-white dark:bg-slate-900 rounded-3xl p-4 sm:p-5 border border-slate-200/90 dark:border-slate-800/90 hover:border-emerald-500 shadow-sm hover:shadow-xl transition-all duration-200 flex flex-col justify-between active:scale-95"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-extrabold text-[10px] rounded-lg">
                    {item.badge}
                  </span>
                  <div className={`w-8 h-8 rounded-xl bg-gradient-to-br ${item.color} text-white flex items-center justify-center font-black text-xs shadow-sm group-hover:scale-110 transition-transform`}>
                    {item.grade}
                  </div>
                </div>

                <h3 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white mb-0.5 group-hover:text-emerald-600 transition-colors">
                  {item.title}
                </h3>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2">
                  {item.desc}
                </p>
              </div>

              <div className="pt-3 mt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-bold text-emerald-600 dark:text-emerald-400">
                <span>View Textbooks</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Official Telegram Channel Banner - Compact & Clean */}
      <section className="bg-gradient-to-r from-sky-500/10 via-sky-500/5 to-slate-900/20 dark:bg-slate-900/90 rounded-2xl p-3.5 sm:p-4 border border-sky-500/30 dark:border-sky-500/20 shadow-sm transition-all hover:shadow-md">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            {/* Sleek Circular Telegram Icon */}
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

      {/* Active Interactive Widget: Quick EUEE Challenge of the Day */}
      {quickChallengeQuestion && (
        <section className="bg-gradient-to-br from-slate-900 via-slate-950 to-indigo-950 rounded-3xl p-5 sm:p-7 border border-amber-500/30 shadow-xl relative overflow-hidden text-white">
          <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="p-1.5 rounded-xl bg-amber-500 text-slate-950 font-black">
                  <Award className="w-4 h-4" />
                </span>
                <div>
                  <div className="text-[10px] font-black uppercase tracking-wider text-amber-400">
                    Daily EUEE Quick Challenge • Grade 12 National Exam
                  </div>
                  <h3 className="text-sm sm:text-base font-black text-white">
                    {quickChallengeQuestion.chapterTitle} ({quickChallengeQuestion.subject.toUpperCase()})
                  </h3>
                </div>
              </div>

              <span className="self-start sm:self-auto px-2.5 py-0.5 rounded-full bg-slate-800 text-amber-300 border border-amber-500/20 text-[10px] font-bold">
                Source: Grade {quickChallengeQuestion.sourceGrade || 12} Curriculum
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
                    className={`p-3 rounded-2xl border text-left text-xs font-bold transition-all flex items-center justify-between active:scale-[0.98] ${optionStyle}`}
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-black/40 flex items-center justify-center text-[10px] font-black shrink-0">
                        {String.fromCharCode(65 + idx)}
                      </span>
                      <span>{option}</span>
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

            {/* Answer explanation banner */}
            {hasSubmittedChallenge && (
              <div className="p-3.5 rounded-2xl bg-slate-800/90 border border-slate-700 text-xs space-y-1.5 animate-in fade-in duration-200">
                <div className="font-extrabold flex items-center gap-1.5 text-amber-300">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Step-by-Step Solution:</span>
                </div>
                <p className="text-slate-300 text-[11px] leading-relaxed">
                  {quickChallengeQuestion.explanation}
                </p>
                <div className="pt-2 flex justify-end">
                  <button
                    onClick={onNavigateToExamPrep}
                    className="text-xs font-black text-amber-400 hover:text-amber-300 flex items-center gap-1"
                  >
                    <span>Practice 100+ More EUEE Questions</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Featured Textbooks Grid with Stream Quick Switcher */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-lg sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
              Featured Grade 9–12 Textbooks
            </h2>
            <p className="text-xs text-slate-500">
              Official Ministry of Education National Curriculum (Grades 9–12)
            </p>
          </div>

          {/* Academic Stream Switcher */}
          <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800/80 p-1 rounded-2xl self-start sm:self-auto overflow-x-auto no-scrollbar">
            {[
              { id: 'all' as AcademicStream, label: 'All Subjects' },
              { id: 'natural_science' as AcademicStream, label: 'Natural Science' },
              { id: 'social_science' as AcademicStream, label: 'Social Science' },
            ].map((stream) => (
              <button
                key={stream.id}
                onClick={() => setActiveStream(stream.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap active:scale-95 ${
                  activeStream === stream.id
                    ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm font-black'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                }`}
              >
                {stream.label}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filteredFeaturedBooks.map((book) => (
            <BookCard
              key={book.id}
              book={book}
              onOpenInteractive={onOpenInteractive}
              onOpenPdf={onOpenPdf}
              onToggleOffline={onToggleOffline}
              isOffline={offlineBookIds.includes(book.id)}
              progressPercent={readingProgress[book.id]?.percentComplete || 0}
              isAdmin={isAdmin}
              onEditBook={onEditBook}
              onDeleteBook={onDeleteBook}
            />
          ))}
        </div>

        <div className="text-center pt-2">
          <button
            onClick={onNavigateToExplore}
            className="w-full sm:w-auto px-6 py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 font-bold text-xs transition-all active:scale-95 inline-flex items-center justify-center gap-2"
          >
            <span>Explore All 31+ High School Textbooks</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* EUEE Callout Banner */}
      <section className="rounded-3xl bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 text-slate-950 p-6 sm:p-10 shadow-lg flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl text-center md:text-left">
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 bg-black/20 text-white rounded-full text-xs font-black">
            <Award className="w-3.5 h-3.5" />
            <span>Grade 12 Ethiopian University Entrance Examination (EUEE)</span>
          </div>
          <h2 className="text-xl sm:text-3xl font-black tracking-tight text-white">
            Master the National Matric Exam
          </h2>
          <p className="text-white/90 text-xs sm:text-sm leading-relaxed">
            Practice official EUEE past papers and high-yield question sets drawn across the entire high school curriculum (Grades 9 to 12) for Natural and Social sciences.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-2.5 w-full md:w-auto shrink-0">
          <button
            onClick={onNavigateToExamPrep}
            className="px-6 py-3.5 bg-slate-950 hover:bg-slate-900 text-white font-black text-xs sm:text-sm rounded-2xl shadow-xl transition-all active:scale-95 flex items-center justify-center gap-2"
          >
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Start Practice Exam</span>
          </button>
          <button
            onClick={onNavigateToExamPrep}
            className="px-6 py-3.5 bg-white/20 hover:bg-white/30 text-white font-extrabold text-xs sm:text-sm rounded-2xl backdrop-blur-md transition-all active:scale-95 flex items-center justify-center gap-2"
          >
            <span>Past Papers (2020–2024)</span>
          </button>
        </div>
      </section>

      {/* Official Telegram Channel Showcase Card (Matches Circled Area in User Reference) */}
      <section className="bg-gradient-to-b from-sky-50 via-white to-sky-100/50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800 rounded-3xl p-6 sm:p-10 border border-sky-200/80 dark:border-sky-800/80 shadow-xl flex flex-col items-center text-center space-y-4">
        {/* Centered Circular Telegram Icon */}
        <div className="w-20 h-20 sm:w-22 sm:h-22 rounded-full bg-gradient-to-tr from-sky-500 to-sky-400 p-4 flex items-center justify-center text-white shadow-xl shadow-sky-500/40 ring-8 ring-sky-500/15">
          <svg className="w-10 h-10 sm:w-11 sm:h-11 fill-current" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.75-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/>
          </svg>
        </div>

        {/* Title & Verified Badge */}
        <div className="space-y-1.5 max-w-md">
          <div className="flex items-center justify-center gap-2">
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
              Official Telegram Channel
            </h3>
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-black bg-sky-500 text-white uppercase tracking-wider shadow-sm">
              VERIFIED
            </span>
          </div>

          <p className="text-xs sm:text-sm font-extrabold text-slate-700 dark:text-slate-200">
            News, Updates, PDF Textbooks &amp; EUEE Matric Solutions
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Join our official student community: <span className="font-bold text-sky-500">@Ethiopianstudentbooks</span>
          </p>
        </div>

        {/* Join Telegram Button */}
        <a
          href="https://t.me/Ethiopianstudentbooks"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full max-w-sm py-3.5 px-6 rounded-2xl bg-sky-500 hover:bg-sky-400 active:scale-95 text-white font-black text-sm sm:text-base shadow-lg shadow-sky-500/30 transition-all flex items-center justify-center gap-2"
        >
          <Send className="w-4 h-4" />
          <span>Join Telegram</span>
        </a>
      </section>
    </div>
  );
};
