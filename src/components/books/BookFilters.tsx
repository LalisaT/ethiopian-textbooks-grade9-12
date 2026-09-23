import React from 'react';
import { GradeLevel, SubjectCategory, AcademicStream, RegionId, LanguageCode } from '../../types/book';
import { ETHIOPIAN_SUBJECTS } from '../../data/subjects';
import { useTranslation } from '../../i18n/useTranslation';
import { RefreshCw, Compass, Atom, TrendingUp, BookOpen, Layers, GraduationCap } from 'lucide-react';

interface BookFiltersProps {
  selectedGrade: GradeLevel | 'all';
  onSelectGrade: (grade: GradeLevel | 'all') => void;
  selectedStream?: AcademicStream;
  onSelectStream?: (stream: AcademicStream) => void;
  selectedSubject: SubjectCategory | 'all';
  onSelectSubject: (subject: SubjectCategory | 'all') => void;
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
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
  searchQuery = '',
  onSearchChange,
  onResetFilters,
  selectedBookType = 'all',
  onSelectBookType,
}) => {
  const { t, language } = useTranslation();

  const grades: (GradeLevel | 'all')[] = ['all', 9, 10, 11, 12];

  const streams: { id: AcademicStream; label: string; icon: any }[] = [
    { id: 'all', label: 'All Streams', icon: Compass },
    { id: 'natural_science', label: 'Natural Science', icon: Atom },
    { id: 'social_science', label: 'Social Science', icon: TrendingUp },
    { id: 'common', label: 'Common Core', icon: BookOpen },
  ];

  const hasActiveFilters =
    selectedGrade !== 'all' ||
    selectedStream !== 'all' ||
    selectedSubject !== 'all' ||
    selectedBookType !== 'all' ||
    Boolean(searchQuery && searchQuery.trim());

  return (
    <div className="luxury-control-deck rounded-3xl p-4 sm:p-5 space-y-4 sm:space-y-5 transition-all">
      {/* Book Type Segmented Selector: All Books / Textbooks / Teacher Guides */}
      {onSelectBookType && (
        <div className="luxury-segmented-tray p-1.5 rounded-2xl flex items-center gap-1.5">
          <button
            onClick={() => onSelectBookType('all')}
            className={`group flex-1 py-2.5 px-3 rounded-xl text-xs font-black luxury-pressable luxury-sheen-sweep flex items-center justify-center gap-2 cursor-pointer ${
              selectedBookType === 'all'
                ? 'btn-luxury-active ring-1 ring-sky-400/50'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/40'
            }`}
          >
            <Layers className="w-3.5 h-3.5 transition-transform duration-200 group-hover:scale-110 group-active:scale-95" />
            <span>All Books</span>
          </button>
          <button
            onClick={() => onSelectBookType('textbook')}
            className={`group flex-1 py-2.5 px-3 rounded-xl text-xs font-black luxury-pressable luxury-sheen-sweep flex items-center justify-center gap-2 cursor-pointer ${
              selectedBookType === 'textbook'
                ? 'btn-luxury-active ring-1 ring-sky-400/50'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/40'
            }`}
          >
            <BookOpen className="w-3.5 h-3.5 transition-transform duration-200 group-hover:scale-110 group-active:scale-95" />
            <span>Textbooks</span>
          </button>
          <button
            onClick={() => onSelectBookType('teacher_guide')}
            className={`group flex-1 py-2.5 px-3 rounded-xl text-xs font-black luxury-pressable luxury-sheen-sweep flex items-center justify-center gap-2 cursor-pointer ${
              selectedBookType === 'teacher_guide'
                ? 'btn-luxury-active ring-1 ring-sky-400/50'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/40'
            }`}
          >
            <GraduationCap className="w-3.5 h-3.5 transition-transform duration-200 group-hover:scale-110 group-active:scale-95" />
            <span>Teacher Guides</span>
          </button>
        </div>
      )}

      {/* Stream Selector Chips (Natural Science / Social Science / Common) */}
      {onSelectStream && (
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-[11px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-sky-400" />
              <span>Stream</span>
            </label>
            {hasActiveFilters && onResetFilters && (
              <button
                onClick={onResetFilters}
                aria-label="Reset all filters"
                className="group btn-luxury-reset luxury-pressable luxury-sheen-sweep flex items-center justify-center gap-1 px-2.5 py-1 text-[11px] font-black rounded-xl cursor-pointer"
              >
                <RefreshCw className="w-3 h-3 transition-transform duration-500 ease-out group-hover:rotate-180 group-active:rotate-180" />
                <span>Reset</span>
              </button>
            )}
          </div>
          <div className="flex sm:grid sm:grid-cols-4 gap-2 overflow-x-auto no-scrollbar pb-1 -mx-1 px-1">
            {streams.map((s) => {
              const isSelected = selectedStream === s.id;
              const StreamIcon = s.icon;
              return (
                <button
                  key={s.id}
                  onClick={() => onSelectStream(s.id)}
                  className={`group py-2.5 px-3.5 rounded-2xl text-xs font-black luxury-pressable luxury-sheen-sweep text-center flex items-center justify-center gap-2 shrink-0 sm:shrink whitespace-nowrap cursor-pointer ${
                    isSelected
                      ? 'btn-luxury-active ring-1 ring-sky-400/40'
                      : 'btn-luxury-idle'
                  }`}
                >
                  <StreamIcon className={`w-3.5 h-3.5 transition-transform duration-200 group-hover:scale-110 group-active:scale-95 ${isSelected ? 'text-sky-200' : 'text-slate-400 group-hover:text-sky-400'}`} />
                  <span>{s.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Grade Selector Pills (Grade 9 - 12) */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-[11px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
            <GraduationCap className="w-3.5 h-3.5 text-sky-400" />
            <span>Grade Level</span>
          </label>
        </div>
        <div className="grid grid-cols-5 gap-1.5 sm:gap-2">
          {grades.map((g) => {
            const isSelected = selectedGrade === g;
            return (
              <button
                key={String(g)}
                onClick={() => onSelectGrade(g)}
                className={`group py-2 sm:py-2.5 px-1.5 sm:px-2 rounded-2xl text-xs font-black luxury-pressable luxury-sheen-sweep text-center flex flex-col items-center justify-center gap-0.5 cursor-pointer ${
                  isSelected
                    ? 'btn-luxury-active ring-2 ring-sky-400/50'
                    : 'btn-luxury-idle'
                }`}
              >
                <span className="leading-tight">{g === 'all' ? 'All' : `Grade ${g}`}</span>
                {g === 12 && (
                  <span className={`text-[9px] font-extrabold tracking-wide uppercase px-1.5 py-0.5 rounded-full ${
                    isSelected 
                      ? 'text-amber-300 bg-amber-400/25 shadow-xs' 
                      : 'text-amber-400 bg-amber-400/10'
                  }`}>
                    EUEE
                  </span>
                )}
                {g === 11 && (
                  <span className={`text-[9px] font-semibold ${isSelected ? 'text-sky-200' : 'text-slate-400 group-hover:text-slate-300'}`}>
                    Prep
                  </span>
                )}
                {g === 10 && (
                  <span className={`text-[9px] font-semibold ${isSelected ? 'text-sky-200' : 'text-slate-400 group-hover:text-slate-300'}`}>
                    Sec
                  </span>
                )}
                {g === 9 && (
                  <span className={`text-[9px] font-semibold ${isSelected ? 'text-sky-200' : 'text-slate-400 group-hover:text-slate-300'}`}>
                    Fresh
                  </span>
                )}
                {g === 'all' && (
                  <span className={`text-[9px] font-semibold ${isSelected ? 'text-sky-200' : 'text-slate-400 group-hover:text-slate-300'}`}>
                    9–12
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Subject Filter Row */}
      <div className="pt-3 border-t border-slate-200/50 dark:border-slate-800/80">
        <label className="text-[11px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-wider block mb-2">
          Subject
        </label>
        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1 -mx-1 px-1">
          <button
            onClick={() => onSelectSubject('all')}
            className={`px-3.5 py-2 rounded-xl text-xs font-black luxury-pressable luxury-sheen-sweep whitespace-nowrap shrink-0 cursor-pointer ${
              selectedSubject === 'all'
                ? 'btn-luxury-active ring-1 ring-sky-400/40'
                : 'btn-luxury-idle'
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
                className={`px-3.5 py-2 rounded-xl text-xs font-black luxury-pressable luxury-sheen-sweep whitespace-nowrap shrink-0 cursor-pointer ${
                  isSelected
                    ? 'btn-luxury-active ring-1 ring-sky-400/40'
                    : 'btn-luxury-idle'
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
