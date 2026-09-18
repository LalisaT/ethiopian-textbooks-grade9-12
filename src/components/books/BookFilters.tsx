import React from 'react';
import { GradeLevel, SubjectCategory, AcademicStream, RegionId, LanguageCode } from '../../types/book';
import { ETHIOPIAN_SUBJECTS } from '../../data/subjects';
import { useTranslation } from '../../i18n/useTranslation';
import { SearchBar } from '../common/SearchBar';
import { RefreshCw, Compass, Atom, TrendingUp, BookOpen, Layers } from 'lucide-react';

interface BookFiltersProps {
  selectedGrade: GradeLevel | 'all';
  onSelectGrade: (grade: GradeLevel | 'all') => void;
  selectedStream?: AcademicStream;
  onSelectStream?: (stream: AcademicStream) => void;
  selectedSubject: SubjectCategory | 'all';
  onSelectSubject: (subject: SubjectCategory | 'all') => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onResetFilters?: () => void;
  selectedBookType?: 'all' | 'textbook' | 'teacher_guide';
  onSelectBookType?: (type: 'all' | 'textbook' | 'teacher_guide') => void;
  // Optional compatibility props (unused in 9-12 national curriculum)
  selectedRegion?: RegionId | 'all';
  onSelectRegion?: (region: RegionId | 'all') => void;
  selectedLanguage?: LanguageCode | 'all';
  onSelectLanguage?: (lang: LanguageCode | 'all') => void;
}

export const BookFilters: React.FC<BookFiltersProps> = ({
  selectedGrade,
  onSelectGrade,
  selectedStream = 'all',
  onSelectStream,
  selectedSubject,
  onSelectSubject,
  searchQuery,
  onSearchChange,
  onResetFilters,
  selectedBookType = 'all',
  onSelectBookType,
}) => {
  const { t, language } = useTranslation();

  const grades: (GradeLevel | 'all')[] = ['all', 9, 10, 11, 12];

  const streams: { id: AcademicStream; label: string; icon: any }[] = [
    { id: 'all', label: 'All Streams', icon: Compass },
    { id: 'natural_science', label: '🔬 Natural Science', icon: Atom },
    { id: 'social_science', label: '📈 Social Science', icon: TrendingUp },
    { id: 'common', label: '🌐 Common Core', icon: BookOpen },
  ];

  const hasActiveFilters =
    selectedGrade !== 'all' ||
    selectedStream !== 'all' ||
    selectedSubject !== 'all' ||
    selectedBookType !== 'all' ||
    searchQuery.trim() !== '';

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl p-4 sm:p-5 border border-slate-200/90 dark:border-slate-800/90 shadow-sm space-y-4">
      {/* Search and Quick Reset */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
        <div className="flex-1">
          <SearchBar
            value={searchQuery}
            onChange={onSearchChange}
            placeholder="Search Grade 9-12 textbooks, teacher guides, subjects..."
            className="w-full"
          />
        </div>
        {hasActiveFilters && (
          <button
            onClick={onResetFilters}
            className="flex items-center justify-center gap-1.5 px-3.5 py-2.5 text-xs font-bold text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/50 hover:bg-rose-100 rounded-2xl transition-all active:scale-95 shrink-0"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset Filters</span>
          </button>
        )}
      </div>

      {/* Book Type Selector: All Resources / Student Textbooks / Teacher Guides */}
      {onSelectBookType && (
        <div className="flex items-center gap-1.5 p-1 bg-slate-100 dark:bg-slate-800/90 rounded-2xl">
          <button
            onClick={() => onSelectBookType('all')}
            className={`flex-1 py-2 px-3 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1.5 ${
              selectedBookType === 'all'
                ? 'bg-white dark:bg-slate-700 text-slate-900 dark:text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <span>📚 All Resources</span>
          </button>
          <button
            onClick={() => onSelectBookType('textbook')}
            className={`flex-1 py-2 px-3 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1.5 ${
              selectedBookType === 'textbook'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <span>📖 Student Books</span>
          </button>
          <button
            onClick={() => onSelectBookType('teacher_guide')}
            className={`flex-1 py-2 px-3 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1.5 ${
              selectedBookType === 'teacher_guide'
                ? 'bg-amber-500 text-slate-950 shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <span>🧑‍🏫 Teacher Guides</span>
          </button>
        </div>
      )}

      {/* Stream Selector Chips (Natural Science / Social Science / Common) */}
      {onSelectStream && (
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="text-[11px] font-black text-slate-400 dark:text-slate-400 uppercase tracking-wider flex items-center gap-1">
              <Layers className="w-3 h-3 text-emerald-500" />
              <span>Academic Stream (Grades 9–12)</span>
            </label>
            <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
              National MOE Curriculum
            </span>
          </div>
          <div className="flex sm:grid sm:grid-cols-4 gap-2 overflow-x-auto no-scrollbar pb-1 -mx-1 px-1">
            {streams.map((s) => {
              const isSelected = selectedStream === s.id;
              return (
                <button
                  key={s.id}
                  onClick={() => onSelectStream(s.id)}
                  className={`py-2 px-3.5 rounded-2xl text-xs font-black transition-all text-center flex items-center justify-center gap-1.5 shrink-0 sm:shrink active:scale-95 whitespace-nowrap ${
                    isSelected
                      ? 'bg-slate-900 text-white dark:bg-emerald-600 dark:text-white shadow-md ring-2 ring-emerald-500/40'
                      : 'bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }`}
                >
                  <span>{s.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Grade Selector Pills (Grade 9 - 12) */}
      <div>
        <label className="text-[11px] font-black text-slate-400 dark:text-slate-400 uppercase tracking-wider block mb-1.5">
          Select Grade Level
        </label>
        <div className="grid grid-cols-5 gap-1.5 sm:gap-2">
          {grades.map((g) => {
            const isSelected = selectedGrade === g;
            return (
              <button
                key={String(g)}
                onClick={() => onSelectGrade(g)}
                className={`py-2 sm:py-2.5 px-2 rounded-2xl text-xs font-black transition-all text-center flex flex-col items-center justify-center gap-0.5 active:scale-95 ${
                  isSelected
                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/25 ring-2 ring-emerald-500'
                    : 'bg-slate-100 dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                <span>{g === 'all' ? t('allGrades') : `Grade ${g}`}</span>
                {g === 12 && (
                  <span className={`text-[9px] font-extrabold ${isSelected ? 'text-amber-200' : 'text-amber-500'}`}>
                    ESSLCE
                  </span>
                )}
                {g === 11 && (
                  <span className={`text-[9px] font-semibold ${isSelected ? 'text-emerald-100' : 'text-slate-400'}`}>
                    Prep
                  </span>
                )}
                {g === 10 && (
                  <span className={`text-[9px] font-semibold ${isSelected ? 'text-sky-100' : 'text-slate-400'}`}>
                    Secondary
                  </span>
                )}
                {g === 9 && (
                  <span className={`text-[9px] font-semibold ${isSelected ? 'text-emerald-100' : 'text-slate-400'}`}>
                    Freshman
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Subject Filter Row */}
      <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
        <label className="text-[11px] font-black text-slate-400 dark:text-slate-400 uppercase tracking-wider block mb-1.5">
          Filter by Subject
        </label>
        <div className="flex gap-1.5 overflow-x-auto no-scrollbar pb-1 -mx-1 px-1">
          <button
            onClick={() => onSelectSubject('all')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap active:scale-95 shrink-0 ${
              selectedSubject === 'all'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
            }`}
          >
            All Subjects
          </button>
          {ETHIOPIAN_SUBJECTS.map((s) => {
            const isSelected = selectedSubject === s.id;
            return (
              <button
                key={s.id}
                onClick={() => onSelectSubject(s.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap active:scale-95 shrink-0 ${
                  isSelected
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200'
                }`}
              >
                {language === 'am' ? s.nameAmharic : language === 'om' ? s.nameOromo : s.name}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
