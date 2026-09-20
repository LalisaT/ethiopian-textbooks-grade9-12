import React, { useState, useEffect } from 'react';
import { ETHIOPIAN_SUBJECTS } from '../../data/subjects';
import { SubjectCategory, GradeLevel } from '../../types/book';
import { QuizQuestion, QuizAttempt, ExamPack, PastExamPaper, ExamStream } from '../../types/quiz';
import { useTranslation } from '../../i18n/useTranslation';
import { ExamService } from '../../services/examService';
import { AuthService } from '../../services/authService';
import { QuizGeneratorService } from '../../services/quizGeneratorService';
import { QuizModal } from './QuizModal';
import { FlashcardViewer } from './FlashcardViewer';
import { FLASHCARDS_LIST } from '../../data/examQuestions';
import { CategoryService, LanguageCategoryItem, SubjectCategoryItem } from '../../services/categoryService';
import { ExamConfigModal } from './ExamConfigModal';
import { selectBestOfBestQuestions } from '../../services/examSelectorService';
import { AdminExamEditorModal } from './AdminExamEditorModal';
import { AdminUploadPastPaperModal } from './AdminUploadPastPaperModal';
import { AdminCategoryManagerModal } from '../admin/AdminCategoryManagerModal';
import { InternetRequiredModal } from '../common/InternetRequiredModal';
import { RewardedVideoAdModal } from '../ads/RewardedVideoAdModal';
import { NetworkService } from '../../services/networkService';
import { useNetworkStatus } from '../../hooks/useNetworkStatus';
import {
  Award,
  BookOpen,
  Clock,
  CheckCircle,
  Sparkles,
  Layers,
  History,
  TrendingUp,
  Compass,
  RotateCcw,
  FileText,
  Download,
  Plus,
  Edit3,
  Trash2,
  UploadCloud,
  Shield,
  Key,
  Globe,
  Settings,
  Atom,
  GraduationCap,
  WifiOff,
  RefreshCw,
} from 'lucide-react';

interface ExamPracticeHubProps {
  onSaveQuizAttempt: (attempt: Omit<QuizAttempt, 'id' | 'date'>) => void;
  pastAttempts: QuizAttempt[];
}

export const ExamPracticeHub: React.FC<ExamPracticeHubProps> = ({
  onSaveQuizAttempt,
  pastAttempts,
}) => {
  const { t, language } = useTranslation();
  const { isOnline, isChecking: isNetworkChecking, recheck: recheckNetwork } = useNetworkStatus();
  const [isNetworkModalOpen, setIsNetworkModalOpen] = useState(false);
  const [pendingAction, setPendingAction] = useState<(() => void) | null>(null);

  const [selectedGrade, setSelectedGrade] = useState<GradeLevel>(12);
  const [selectedStream, setSelectedStream] = useState<'all' | 'natural_science' | 'social_science'>('all');
  const [selectedSubject, setSelectedSubject] = useState<SubjectCategory | 'all'>('all');
  const [selectedLanguageFilter, setSelectedLanguageFilter] = useState<string>('all');
  const [selectedSourceGrade, setSelectedSourceGrade] = useState<number | 'all'>('all');
  const [activeQuizQuestions, setActiveQuizQuestions] = useState<QuizQuestion[] | null>(null);
  const [quizModalTitle, setQuizModalTitle] = useState('');
  const [activeExamLanguage, setActiveExamLanguage] = useState<string>('en');
  const [activeExamTimeLimitMinutes, setActiveExamTimeLimitMinutes] = useState<number>(60);
  const [selectedExamForConfig, setSelectedExamForConfig] = useState<{
    title: string;
    questions: QuizQuestion[];
    language?: string;
    subject?: SubjectCategory | 'all';
    stream?: ExamStream | 'all';
  } | null>(null);
  const [activeTab, setActiveTab] = useState<'exams' | 'past_papers' | 'flashcards' | 'history'>('exams');

  // Exam packs & past papers
  const [examPacks, setExamPacks] = useState<ExamPack[]>([]);
  const [pastPapers, setPastPapers] = useState<PastExamPaper[]>([]);
  const [languageCategories, setLanguageCategories] = useState<LanguageCategoryItem[]>([]);
  const [subjectCategories, setSubjectCategories] = useState<SubjectCategoryItem[]>([]);

  // Admin modals
  const [isAdmin, setIsAdmin] = useState(false);
  const [editingExamPack, setEditingExamPack] = useState<ExamPack | null>(null);
  const [isExamEditorOpen, setIsExamEditorOpen] = useState(false);
  const [isPastPaperUploadOpen, setIsPastPaperUploadOpen] = useState(false);
  const [isCategoryManagerOpen, setIsCategoryManagerOpen] = useState(false);

  const loadData = () => {
    setIsAdmin(AuthService.isAuthenticated());
    setExamPacks(ExamService.getExamPacks(selectedGrade, selectedSubject, 'all', selectedStream));
    setPastPapers(ExamService.getPastPapers(selectedGrade, selectedSubject, 'all', selectedStream));
    setLanguageCategories(CategoryService.getLanguageCategories());
    setSubjectCategories(CategoryService.getSubjectCategories());
  };

  useEffect(() => {
    loadData();
  }, [selectedGrade, selectedStream, selectedSubject]);

  const handleStartExam = async (
    title: string,
    questions: QuizQuestion[],
    examLang?: string,
    subject?: SubjectCategory | 'all',
    stream?: ExamStream | 'all'
  ) => {
    const online = await NetworkService.checkInternetConnection();
    if (!online) {
      setPendingAction(() => () => handleStartExam(title, questions, examLang, subject, stream));
      setIsNetworkModalOpen(true);
      return;
    }

    let filteredQuestions = [...questions];
    if (selectedSourceGrade !== 'all') {
      const sourceFiltered = questions.filter(q => q.sourceGrade === selectedSourceGrade);
      if (sourceFiltered.length > 0) {
        filteredQuestions = sourceFiltered;
      }
    }
    setSelectedExamForConfig({
      title,
      questions: filteredQuestions,
      language: examLang || language || 'en',
      subject: subject || (selectedSubject !== 'all' ? selectedSubject : filteredQuestions[0]?.subject),
      stream: stream || (selectedStream !== 'all' ? selectedStream : 'all'),
    });
  };

  const [isVideoAdModalOpen, setIsVideoAdModalOpen] = useState(false);
  const [pendingExamStart, setPendingExamStart] = useState<{
    curatedQuestions: QuizQuestion[];
    title: string;
    lang: string;
    timeLimit: number;
    count: number;
  } | null>(null);

  const handleConfirmStartExam = async (
    selectedCount: number,
    timeLimitMinutes: number,
    bestOfBest: boolean
  ) => {
    if (!selectedExamForConfig) return;

    // 1. First ask internet connection
    const online = await NetworkService.checkInternetConnection();
    if (!online) {
      setIsNetworkModalOpen(true);
      return;
    }

    const curatedQuestions = selectBestOfBestQuestions(
      selectedExamForConfig.questions,
      selectedCount,
      {
        subject: selectedExamForConfig.subject,
        stream: selectedExamForConfig.stream,
        bestOfBestOnly: bestOfBest,
      }
    );

    // 2. Queue video ad requirement: student must view video to access questions
    setPendingExamStart({
      curatedQuestions,
      title: `${selectedExamForConfig.title} • ${selectedCount} Best-of-Best Questions`,
      lang: selectedExamForConfig.language || language || 'en',
      timeLimit: timeLimitMinutes,
      count: selectedCount,
    });
    setSelectedExamForConfig(null);
    setIsVideoAdModalOpen(true);
  };

  const handleRewardEarnedForExam = () => {
    if (!pendingExamStart) return;
    setActiveQuizQuestions(pendingExamStart.curatedQuestions);
    setQuizModalTitle(pendingExamStart.title);
    setActiveExamLanguage(pendingExamStart.lang);
    setActiveExamTimeLimitMinutes(pendingExamStart.timeLimit);
    setPendingExamStart(null);
  };

  const handleQuizComplete = (score: number, total: number) => {
    if (activeQuizQuestions && activeQuizQuestions.length > 0) {
      onSaveQuizAttempt({
        quizId: `quiz-${Date.now()}`,
        title: quizModalTitle,
        grade: selectedGrade,
        subject: (selectedSubject === 'all' ? activeQuizQuestions[0].subject : selectedSubject) as SubjectCategory,
        totalQuestions: total,
        score,
        timeSpentSeconds: 120,
        userAnswers: [],
      });
    }
  };

  const handleSaveExamPack = (savedPack: ExamPack) => {
    ExamService.saveExamPack(savedPack);
    loadData();
  };

  const handleDeleteExamPack = (id: string) => {
    if (confirm('Are you sure you want to delete this exam pack?')) {
      ExamService.deleteExamPack(id);
      loadData();
    }
  };

  const handleSavePastPaper = (paper: PastExamPaper) => {
    ExamService.savePastPaper(paper);
    loadData();
  };

  const handleDeletePastPaper = (id: string) => {
    if (confirm('Are you sure you want to delete this past exam paper?')) {
      ExamService.deletePastPaper(id);
      loadData();
    }
  };

  const handleDownloadPaper = (paper: PastExamPaper) => {
    alert(`Downloading ${paper.title} (${paper.fileSize || 'PDF'})...`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Hero Banner */}
      <div className="relative rounded-3xl bg-gradient-to-r from-slate-950 via-indigo-950 to-slate-900 text-white p-8 sm:p-12 border border-slate-800 shadow-2xl overflow-hidden">
        <div className="absolute -right-10 -bottom-10 opacity-10 pointer-events-none">
          <GraduationCap className="w-80 h-80 text-amber-400" />
        </div>

        <div className="relative z-10 max-w-3xl space-y-5">
          <div className="flex flex-wrap items-center gap-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-amber-500/20 text-amber-300 rounded-full border border-amber-500/30 text-xs font-black backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Grade 12 EUEE • Ethiopian University Entrance Examination Hub</span>
            </div>

            {isAdmin && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-500 text-slate-950 rounded-full text-xs font-black shadow-md">
                <Shield className="w-3.5 h-3.5" />
                <span>Admin Edit Mode Active</span>
              </span>
            )}
          </div>

          <h1 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight">
            {language === 'om'
              ? 'Wiirtuu Qormaata Seensa Yuunivarsiitii Biyyooleessaa (EUEE) Kutaa 12ffaa'
              : language === 'am'
              ? 'የ 12ኛ ክፍል የዩኒቨርሲቲ መግቢያ ብሔራዊ ፈተና (EUEE) መለማመጃ ማዕከል'
              : 'Grade 12 Ethiopian University Entrance Examination (EUEE) Hub'}
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
            {language === 'om'
              ? 'Qormaata biyyooleessaa seensa yuunivarsiitii kutaalee 9 hanga 12 of keessaa qabu qabxii fi deebii guutuu waliin shaakali.'
              : language === 'am'
              ? 'ከ 9-12 ክፍል ያሉ ትምህርቶችን ያካተቱ እውነተኛ ያለፉት ዓመታት ብሔራዊ ፈተናዎችን በጊዜ ገደብ፣ በዝርዝር ማብራሪያ እና በውጤት ሰሌዳ ይለማመዱ።'
              : 'Authentic university entrance examinations covering high school curriculum from Grades 9, 10, 11, and 12 across Natural and Social Science streams with timers, answer keys, and step-by-step solutions.'}
          </p>

          {/* Academic Stream Tabs */}
          <div className="space-y-2 pt-1">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
              Select Academic Stream:
            </span>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedStream('all')}
                className={`px-4 py-2 rounded-2xl text-xs font-extrabold transition-all flex items-center gap-1.5 ${
                  selectedStream === 'all'
                    ? 'bg-amber-400 text-slate-950 shadow-lg ring-2 ring-amber-300'
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                <Compass className="w-3.5 h-3.5" />
                <span>All Streams</span>
              </button>
              <button
                onClick={() => setSelectedStream('natural_science')}
                className={`px-4 py-2 rounded-2xl text-xs font-extrabold transition-all flex items-center gap-1.5 ${
                  selectedStream === 'natural_science'
                    ? 'bg-cyan-500 text-slate-950 shadow-lg ring-2 ring-cyan-300'
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                <Atom className="w-3.5 h-3.5" />
                <span>Natural Science Stream</span>
              </button>
              <button
                onClick={() => setSelectedStream('social_science')}
                className={`px-4 py-2 rounded-2xl text-xs font-extrabold transition-all flex items-center gap-1.5 ${
                  selectedStream === 'social_science'
                    ? 'bg-rose-500 text-white shadow-lg ring-2 ring-rose-300'
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                <TrendingUp className="w-3.5 h-3.5" />
                <span>Social Science Stream</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Offline Alert Banner for Quizzes and Exam Questions */}
      {!isOnline && (
        <div className="rounded-3xl bg-rose-500/10 dark:bg-rose-950/40 border border-rose-500/30 p-4 sm:p-5 flex items-center justify-between flex-wrap gap-4 shadow-sm animate-fadeIn">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-rose-500/20 text-rose-600 dark:text-rose-400 flex items-center justify-center shrink-0">
              <WifiOff className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full bg-rose-100 dark:bg-rose-900/60 text-rose-700 dark:text-rose-300 font-black text-[10px] uppercase tracking-wide">
                  Connection Required
                </span>
                <h3 className="text-sm sm:text-base font-black text-slate-900 dark:text-white">
                  {language === 'om'
                    ? 'Intarneetiin Barbaachisaadha'
                    : language === 'am'
                    ? 'የኢንተርኔት ግንኙነት ያስፈልጋል'
                    : 'Internet Connection Required for Exam Practice'}
                </h3>
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed">
                {language === 'om'
                  ? 'Qormaata shaakaluu fi gaaffilee dubbisuuf yeroo hunda intarneetiin jiraachuu qaba. Kitaabonni garuu intarneetii malee ni hojjetu.'
                  : language === 'am'
                  ? 'የልምምድ ፈተናዎችን እና ጥያቄዎችን ለመስራት ወይም ለማንበብ ሁልጊዜ የኢንተርኔት ግንኙነት ያስፈልጋል። የተቀመጡ መጻሕፍት ያለ ኢንተርኔት ይሰራሉ።'
                  : 'Practicing quizzes, entrance exam questions, and mock simulations requires an active internet connection. Saved textbooks remain fully readable offline.'}
              </p>
            </div>
          </div>

          <button
            onClick={recheckNetwork}
            disabled={isNetworkChecking}
            className="px-4 py-2.5 rounded-2xl bg-slate-900 dark:bg-white text-white dark:text-slate-950 hover:bg-slate-800 dark:hover:bg-slate-100 font-extrabold text-xs shadow-md transition-all active:scale-95 flex items-center gap-2 disabled:opacity-60 shrink-0 ml-auto sm:ml-0"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isNetworkChecking ? 'animate-spin' : ''}`} />
            <span>{isNetworkChecking ? 'Verifying...' : 'Check Connection'}</span>
          </button>
        </div>
      )}

      {/* Navigation Tabs */}
      <div className="flex flex-wrap items-center justify-between border-b border-slate-200 dark:border-slate-800 gap-4">
        <div className="flex gap-6 text-sm font-bold overflow-x-auto no-scrollbar">
          <button
            onClick={() => setActiveTab('exams')}
            className={`pb-3 flex items-center gap-2 transition-colors relative whitespace-nowrap ${
              activeTab === 'exams'
                ? 'text-emerald-600 dark:text-emerald-400'
                : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Award className="w-4 h-4" />
            <span>EUEE Model Examinations</span>
            {activeTab === 'exams' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-500 rounded-full" />
            )}
          </button>

          <button
            onClick={() => setActiveTab('past_papers')}
            className={`pb-3 flex items-center gap-2 transition-colors relative whitespace-nowrap ${
              activeTab === 'past_papers'
                ? 'text-emerald-600 dark:text-emerald-400'
                : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <FileText className="w-4 h-4" />
            <span>Official EUEE Past Papers (2020–2024)</span>
            <span className="px-1.5 py-0.5 bg-amber-500/20 text-amber-400 text-[10px] font-extrabold rounded-full">
              {pastPapers.length}
            </span>
            {activeTab === 'past_papers' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-500 rounded-full" />
            )}
          </button>

          <button
            onClick={() => setActiveTab('flashcards')}
            className={`pb-3 flex items-center gap-2 transition-colors relative whitespace-nowrap ${
              activeTab === 'flashcards'
                ? 'text-emerald-600 dark:text-emerald-400'
                : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>{t('flashcards')}</span>
            {activeTab === 'flashcards' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-500 rounded-full" />
            )}
          </button>

          <button
            onClick={() => setActiveTab('history')}
            className={`pb-3 flex items-center gap-2 transition-colors relative whitespace-nowrap ${
              activeTab === 'history'
                ? 'text-emerald-600 dark:text-emerald-400'
                : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <History className="w-4 h-4" />
            <span>My Exam History ({pastAttempts.length})</span>
            {activeTab === 'history' && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-500 rounded-full" />
            )}
          </button>
        </div>

        {/* Admin Action Buttons */}
        {isAdmin && (
          <div className="flex items-center gap-2 pb-2">
            {activeTab === 'exams' && (
              <button
                onClick={() => {
                  setEditingExamPack(null);
                  setIsExamEditorOpen(true);
                }}
                className="px-3.5 py-1.5 bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-slate-950 rounded-xl text-xs font-black flex items-center gap-1.5 shadow-md active:scale-95 transition-all"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add EUEE Model Exam</span>
              </button>
            )}

            {activeTab === 'past_papers' && (
              <button
                onClick={() => setIsPastPaperUploadOpen(true)}
                className="px-3.5 py-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-xl text-xs font-black flex items-center gap-1.5 shadow-md active:scale-95 transition-all"
              >
                <UploadCloud className="w-3.5 h-3.5" />
                <span>Upload Past Exam Paper (PDF)</span>
              </button>
            )}
          </div>
        )}
      </div>

      {/* Tab 1: EUEE Model Examination Tests */}
      {activeTab === 'exams' && (
        <div className="space-y-4">
          {/* Syllabus Source Grade Filter Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-3 bg-slate-50 dark:bg-slate-900/60 rounded-2xl border border-slate-200 dark:border-slate-800">
            <span className="text-xs font-bold text-slate-600 dark:text-slate-300">
              Filter Questions by High School Curriculum Grade:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {[
                { id: 'all', label: 'All High School (9–12)' },
                { id: 12, label: 'Grade 12 Units' },
                { id: 11, label: 'Grade 11 Units' },
                { id: 10, label: 'Grade 10 Units' },
                { id: 9, label: 'Grade 9 Units' },
              ].map(sg => (
                <button
                  key={String(sg.id)}
                  onClick={() => setSelectedSourceGrade(sg.id as any)}
                  className={`px-3 py-1 rounded-xl text-xs font-bold transition-all ${
                    selectedSourceGrade === sg.id
                      ? 'bg-slate-900 text-white dark:bg-emerald-600 dark:text-white shadow-sm'
                      : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                  }`}
                >
                  {sg.label}
                </button>
              ))}
            </div>
          </div>

          {/* Academic Curriculum Subjects */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <div className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                Curriculum Subject:
              </div>
            </div>

            <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
              <button
                onClick={() => setSelectedSubject('all')}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                  selectedSubject === 'all'
                    ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-sm'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
                }`}
              >
                All Subjects
              </button>
              {subjectCategories.map((s) => (
                <button
                  key={s.id}
                  onClick={() => setSelectedSubject(s.id as SubjectCategory)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                    selectedSubject === s.id
                      ? 'bg-emerald-600 text-white shadow-sm'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
                  }`}
                >
                  {s.name}
                </button>
              ))}
            </div>
          </div>

          {/* Exam Packs Grid (Separated by Subject) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
            {examPacks.map((pack) => {
              const packTitle = language === 'om' ? (pack.titleOromo || pack.title) : language === 'am' ? (pack.titleAmharic || pack.title) : pack.title;
              return (
                <div
                  key={pack.id}
                  className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between relative group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="px-2.5 py-0.5 bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-extrabold text-xs rounded-full">
                          {pack.stream === 'natural_science' ? 'Natural Sci' : pack.stream === 'social_science' ? 'Social Sci' : 'All Streams'}
                        </span>
                        <span className={`px-2 py-0.5 rounded-full text-[11px] font-extrabold ${
                          pack.language === 'am'
                            ? 'bg-blue-950 text-blue-300 border border-blue-800'
                            : pack.language === 'om'
                            ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                            : 'bg-purple-950 text-purple-300 border border-purple-800'
                        }`}>
                          {pack.language === 'am' ? 'አማርኛ' : pack.language === 'om' ? 'Afaan Oromoo' : 'English'}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs text-amber-500 font-bold font-mono">EUEE</span>
                        {isAdmin && (
                          <div className="flex items-center gap-1 ml-2">
                            <button
                              onClick={() => {
                                setEditingExamPack(pack);
                                setIsExamEditorOpen(true);
                              }}
                              className="p-1 rounded-lg text-amber-500 hover:bg-amber-500/20 transition-colors"
                              title="Edit Exam Pack"
                            >
                              <Edit3 className="w-3.5 h-3.5" />
                            </button>
                            {pack.isCustom && (
                              <button
                                onClick={() => handleDeleteExamPack(pack.id)}
                                className="p-1 rounded-lg text-rose-500 hover:bg-rose-500/20 transition-colors"
                                title="Delete Exam Pack"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            )}
                          </div>
                        )}
                      </div>
                    </div>

                    <h3 className="font-extrabold text-lg text-slate-900 dark:text-white mb-2 leading-snug">
                      {packTitle}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-3 mb-4">
                      {pack.description}
                    </p>

                    <div className="flex items-center gap-4 text-xs text-slate-500 mb-6">
                      <div className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5 text-amber-500" />
                        <span>{pack.timeLimitMinutes || 60} Mins</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
                        <span>{pack.questions.length} Questions (Grades 9-12)</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => handleStartExam(packTitle, pack.questions, pack.language, pack.subject, pack.stream)}
                    disabled={pack.questions.length === 0}
                    className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 disabled:opacity-40 text-white font-extrabold text-xs rounded-2xl transition-all shadow-md active:scale-95 flex items-center justify-center gap-2"
                  >
                    <Award className="w-4 h-4" />
                    <span>{t('startPractice')}</span>
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Tab 2: Official EUEE Past Papers (2020–2024) */}
      {activeTab === 'past_papers' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700">
            <div>
              <h3 className="text-sm font-bold text-slate-800 dark:text-white">
                Official Ethiopian Educational Assessment and Examination Service (EAES) Papers
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Direct interactive simulation with timer and scoring, plus offline PDF download links.
              </p>
            </div>
            <div className="text-xs font-bold text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/50 px-3 py-1.5 rounded-xl border border-amber-200 dark:border-amber-800">
              {pastPapers.length} Official Papers Available
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pastPapers.map((paper) => (
              <div
                key={paper.id}
                className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-2.5 py-0.5 bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 font-extrabold text-xs rounded-full">
                      {paper.year} EUEE Exam
                    </span>
                    <span className="px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-[11px] font-bold rounded-lg">
                      {paper.stream === 'natural_science' ? 'Natural Sci' : paper.stream === 'social_science' ? 'Social Sci' : 'Core'}
                    </span>
                  </div>

                  <h3 className="font-extrabold text-base text-slate-900 dark:text-white mb-2 leading-snug">
                    {paper.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mb-4">
                    {paper.description || 'Authentic national examination paper for university admission.'}
                  </p>

                  <div className="grid grid-cols-2 gap-2 text-xs text-slate-500 mb-6 py-2 border-y border-slate-100 dark:border-slate-800">
                    <div className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-amber-500" />
                      <span>{paper.timeAllowedMinutes} Mins</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-500" />
                      <span>{paper.totalQuestions} Questions</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      if (paper.questions && paper.questions.length > 0) {
                        handleStartExam(paper.title, paper.questions, paper.language, paper.subject, paper.stream);
                      } else {
                        const fallbackQ = ExamService.getQuestionsForQuiz(12, paper.subject, 10);
                        handleStartExam(paper.title, fallbackQ, paper.language, paper.subject, paper.stream);
                      }
                    }}
                    className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs rounded-xl shadow-md active:scale-95 transition-all flex items-center justify-center gap-1.5"
                  >
                    <Award className="w-3.5 h-3.5" />
                    <span>Practice Paper</span>
                  </button>

                  <button
                    onClick={() => handleDownloadPaper(paper)}
                    className="p-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 rounded-xl transition-all"
                    title="Download Past Paper PDF"
                  >
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Flashcards & Formula Deck */}
      {activeTab === 'flashcards' && (
        <div className="space-y-6">
          <FlashcardViewer flashcards={FLASHCARDS_LIST} />
        </div>
      )}

      {/* Tab 4: Exam History */}
      {activeTab === 'history' && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <h3 className="font-extrabold text-lg text-slate-900 dark:text-white flex items-center gap-2">
              <History className="w-5 h-5 text-emerald-500" />
              <span>Previous Examination Attempts</span>
            </h3>
            <span className="text-xs text-slate-400 font-bold">
              {pastAttempts.length} Completed Exams
            </span>
          </div>

          {pastAttempts.length === 0 ? (
            <div className="py-12 text-center text-slate-400 space-y-2">
              <Award className="w-12 h-12 mx-auto text-slate-300 dark:text-slate-700" />
              <p className="font-bold text-sm">No exam attempts recorded yet.</p>
              <p className="text-xs">Take an EUEE practice exam or past paper to track your progress and score history.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {pastAttempts.map((attempt) => (
                <div
                  key={attempt.id}
                  className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 flex items-center justify-between flex-wrap gap-3"
                >
                  <div>
                    <h4 className="font-extrabold text-sm text-slate-900 dark:text-white">
                      {attempt.title}
                    </h4>
                    <span className="text-xs text-slate-400">
                      Completed on {new Date(attempt.date).toLocaleDateString()} • Grade {attempt.grade}
                    </span>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="text-lg font-black text-emerald-600 dark:text-emerald-400">
                        {attempt.score} / {attempt.totalQuestions}
                      </div>
                      <div className="text-[10px] font-bold text-slate-400">
                        {Math.round((attempt.score / attempt.totalQuestions) * 100)}% Score
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Quiz Modal */}
      {activeQuizQuestions && (
        <QuizModal
          isOpen={true}
          onClose={() => setActiveQuizQuestions(null)}
          questions={activeQuizQuestions}
          title={quizModalTitle}
          timeLimitMinutes={activeExamTimeLimitMinutes}
          onComplete={handleQuizComplete}
          examLanguage={activeExamLanguage}
        />
      )}

      {/* Question Count Selection & Best of Best Config Modal */}
      {selectedExamForConfig && (
        <ExamConfigModal
          isOpen={true}
          onClose={() => setSelectedExamForConfig(null)}
          examTitle={selectedExamForConfig.title}
          availableQuestionsCount={selectedExamForConfig.questions.length}
          onConfirmStart={handleConfirmStartExam}
        />
      )}

      {/* Admin Modals */}
      {isAdmin && isExamEditorOpen && (
        <AdminExamEditorModal
          isOpen={isExamEditorOpen}
          onClose={() => setIsExamEditorOpen(false)}
          onSave={handleSaveExamPack}
          editingPack={editingExamPack}
          currentGrade={selectedGrade}
          currentSubject={selectedSubject === 'all' ? 'physics' : selectedSubject}
        />
      )}

      {isAdmin && isPastPaperUploadOpen && (
        <AdminUploadPastPaperModal
          isOpen={isPastPaperUploadOpen}
          onClose={() => setIsPastPaperUploadOpen(false)}
          onSave={handleSavePastPaper}
          currentGrade={selectedGrade}
        />
      )}

      {isAdmin && isCategoryManagerOpen && (
        <AdminCategoryManagerModal
          isOpen={isCategoryManagerOpen}
          onClose={() => {
            setIsCategoryManagerOpen(false);
            loadData();
          }}
          onCategoriesUpdated={() => {
            loadData();
          }}
        />
      )}

      {/* AdMob Rewarded Video Modal: Required to Access Questions */}
      <RewardedVideoAdModal
        isOpen={isVideoAdModalOpen}
        onClose={() => {
          setIsVideoAdModalOpen(false);
          setPendingExamStart(null);
        }}
        onRewardEarned={handleRewardEarnedForExam}
        questionCount={pendingExamStart?.count || 50}
        subjectOrTitle={pendingExamStart?.title || 'National Exam Practice'}
      />

      {/* Internet Connection Required Modal */}
      <InternetRequiredModal
        isOpen={isNetworkModalOpen}
        onClose={() => {
          setIsNetworkModalOpen(false);
          setPendingAction(null);
        }}
        onConnected={() => {
          if (pendingAction) {
            pendingAction();
            setPendingAction(null);
          }
        }}
      />
    </div>
  );
};
