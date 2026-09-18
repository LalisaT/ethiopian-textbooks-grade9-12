import React, { useState } from 'react';
import { Book, BookChapter } from '../../types/book';
import { useTranslation } from '../../i18n/useTranslation';
import {
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  Loader2,
  FileText,
  AlignLeft,
  Sun,
  Moon,
  Sparkles,
  BookOpen,
} from 'lucide-react';

interface InteractiveChapterReaderProps {
  book: Book;
  chapter: BookChapter;
  fontSize: 'sm' | 'base' | 'lg' | 'xl';
  onNextChapter: () => void;
  onPrevChapter: () => void;
  onOpenQuiz: () => void;
  hasNext: boolean;
  hasPrev: boolean;
  hasUploadedPdf?: boolean;
  isSyncingPdfNotes?: boolean;
  onResyncPdfNotes?: () => void;
}

export const InteractiveChapterReader: React.FC<InteractiveChapterReaderProps> = ({
  book,
  chapter,
  fontSize,
  onNextChapter,
  onPrevChapter,
  onOpenQuiz,
  hasNext,
  hasPrev,
  hasUploadedPdf,
  isSyncingPdfNotes,
  onResyncPdfNotes,
}) => {
  const { language, t } = useTranslation();
  const [docTheme, setDocTheme] = useState<'word-white' | 'sepia' | 'dark'>('word-white');
  const [fontFamily, setFontFamily] = useState<'sans' | 'serif' | 'mono'>('sans');

  const getChapterTitle = () => {
    switch (book.language) {
      case 'am':
        return chapter.titleAmharic || chapter.title;
      case 'om':
        return chapter.titleOromo || chapter.title;
      case 'ti':
        return chapter.titleTigrinya || chapter.title;
      case 'so':
        return chapter.titleSomali || chapter.title;
      default:
        return chapter.title;
    }
  };

  const themeStyles = {
    'word-white': {
      wrapperBg: 'bg-slate-200/90 dark:bg-slate-950',
      paperBg: 'bg-white text-slate-900 border-slate-300/80 shadow-2xl',
      headingColor: 'text-slate-900 border-b-2 border-slate-800/20',
      sectionHeading: 'text-blue-950 dark:text-blue-900 border-b border-slate-200',
      paragraphColor: 'text-slate-800',
      headerFooterColor: 'text-slate-400 border-slate-200',
      cardBg: 'bg-slate-50 border-slate-200 text-slate-800',
    },
    sepia: {
      wrapperBg: 'bg-[#f4ecd8]',
      paperBg: 'bg-[#fbf0d9] text-[#433422] border-[#e4d5b7] shadow-xl',
      headingColor: 'text-[#2b1f11] border-b-2 border-[#d5c39e]',
      sectionHeading: 'text-[#5a3e1b] border-b border-[#e4d5b7]',
      paragraphColor: 'text-[#433422]',
      headerFooterColor: 'text-[#8c7355] border-[#e4d5b7]',
      cardBg: 'bg-[#f4e6c9] border-[#dccab0] text-[#433422]',
    },
    dark: {
      wrapperBg: 'bg-slate-950',
      paperBg: 'bg-slate-900 text-slate-100 border-slate-800 shadow-2xl',
      headingColor: 'text-white border-b-2 border-slate-700',
      sectionHeading: 'text-emerald-400 border-b border-slate-800',
      paragraphColor: 'text-slate-300',
      headerFooterColor: 'text-slate-500 border-slate-800',
      cardBg: 'bg-slate-950 border-slate-800 text-slate-200',
    },
  }[docTheme];

  const fontSizeClasses = {
    sm: 'text-sm leading-relaxed',
    base: 'text-base leading-relaxed',
    lg: 'text-lg leading-loose',
    xl: 'text-xl leading-loose',
  }[fontSize];

  const fontClasses = {
    sans: 'font-sans',
    serif: 'font-serif',
    mono: 'font-mono',
  }[fontFamily];

  return (
    <div className={`min-h-screen ${themeStyles.wrapperBg} py-4 sm:py-8 px-2 sm:px-6 transition-colors`}>
      {/* Microsoft Word Document Toolbar */}
      <div className="max-w-4xl mx-auto mb-4 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md rounded-2xl border border-slate-300/80 dark:border-slate-800 p-2.5 px-4 shadow-md flex flex-wrap items-center justify-between gap-3 text-xs">
        {/* Left: Document details */}
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-blue-600 text-white font-bold">
            <FileText className="w-4 h-4" />
          </div>
          <div>
            <div className="font-bold text-slate-900 dark:text-white truncate max-w-[220px] sm:max-w-md">
              {book.title}
            </div>
            <div className="text-[10px] text-slate-500">
              Word Document View • Unit {chapter.unitNumber}
            </div>
          </div>
        </div>

        {/* Center: Font & Theme selector */}
        <div className="flex items-center gap-2">
          {/* Font switcher */}
          <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-0.5 rounded-xl border border-slate-200 dark:border-slate-700">
            <button
              onClick={() => setFontFamily('sans')}
              className={`px-2.5 py-1 rounded-lg font-sans font-bold text-xs ${
                fontFamily === 'sans'
                  ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-xs'
                  : 'text-slate-500 hover:text-slate-800 dark:text-slate-300'
              }`}
            >
              Calibri
            </button>
            <button
              onClick={() => setFontFamily('serif')}
              className={`px-2.5 py-1 rounded-lg font-serif font-bold text-xs ${
                fontFamily === 'serif'
                  ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-xs'
                  : 'text-slate-500 hover:text-slate-800 dark:text-slate-300'
              }`}
            >
              Georgia
            </button>
          </div>

          {/* Theme switcher */}
          <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-0.5 rounded-xl border border-slate-200 dark:border-slate-700">
            <button
              onClick={() => setDocTheme('word-white')}
              className={`px-2.5 py-1 rounded-lg font-bold text-xs flex items-center gap-1 ${
                docTheme === 'word-white'
                  ? 'bg-white dark:bg-slate-900 text-blue-600 dark:text-blue-400 shadow-xs'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
              title="Microsoft Word Classic White"
            >
              <Sun className="w-3.5 h-3.5" />
              <span>Word</span>
            </button>

            <button
              onClick={() => setDocTheme('sepia')}
              className={`px-2.5 py-1 rounded-lg font-bold text-xs ${
                docTheme === 'sepia'
                  ? 'bg-[#f4ecd8] text-[#5a3e1b] shadow-xs'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
              title="Soft Sepia Reading"
            >
              Sepia
            </button>

            <button
              onClick={() => setDocTheme('dark')}
              className={`px-2.5 py-1 rounded-lg font-bold text-xs flex items-center gap-1 ${
                docTheme === 'dark'
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
              title="Night Reading"
            >
              <Moon className="w-3.5 h-3.5" />
              <span>Dark</span>
            </button>
          </div>
        </div>

        {/* Right: Re-sync action if uploaded PDF exists */}
        {hasUploadedPdf && onResyncPdfNotes && (
          <button
            onClick={onResyncPdfNotes}
            disabled={isSyncingPdfNotes}
            className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold transition-colors flex items-center gap-1.5 shadow-sm active:scale-95"
            title="Clean and re-extract text directly from PDF"
          >
            {isSyncingPdfNotes ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <RotateCcw className="w-3.5 h-3.5" />
            )}
            <span>{isSyncingPdfNotes ? 'Cleaning...' : 'Clean Re-Sync'}</span>
          </button>
        )}
      </div>

      {/* Microsoft Word Document Sheet (A4 Canvas) */}
      <div
        className={`max-w-4xl mx-auto ${themeStyles.paperBg} border rounded-lg sm:rounded-xl p-8 sm:p-16 my-4 transition-all ${fontClasses} ${fontSizeClasses}`}
        style={{ minHeight: '1000px' }}
      >
        {/* Document Header Line (Standard Word Header) */}
        <div className={`flex items-center justify-between pb-4 mb-8 text-xs font-semibold uppercase tracking-wider ${themeStyles.headerFooterColor} border-b`}>
          <span>{book.title}</span>
          <span>{getChapterTitle()}</span>
        </div>

        {/* Document Title Heading */}
        <div className="space-y-4 mb-10">
          <h1 className={`text-2xl sm:text-4xl font-extrabold pb-3 tracking-tight ${themeStyles.headingColor}`}>
            {getChapterTitle()}
          </h1>
        </div>

        {/* Document Paragraphs & Sections */}
        <div className="space-y-8">
          {chapter.sections.map((section, sIdx) => (
            <div key={section.id || sIdx} className="space-y-4">
              {/* Section Sub-heading */}
              <h2 className={`text-xl font-bold pb-1.5 pt-2 ${themeStyles.sectionHeading}`}>
                {section.title}
              </h2>

              {/* Clean Paragraphs */}
              <div className="space-y-4 text-justify">
                {section.content.map((paragraph, pIdx) => (
                  <p key={pIdx} className={`${themeStyles.paragraphColor} leading-relaxed`}>
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Key Terms (if present) */}
        {chapter.keyTerms && chapter.keyTerms.length > 0 && (
          <div className={`mt-12 p-6 rounded-xl border ${themeStyles.cardBg} space-y-4`}>
            <h3 className="font-bold text-base border-b border-slate-300/40 pb-2">
              Key Concepts & Definitions
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              {chapter.keyTerms.map((term, tIdx) => (
                <div key={tIdx} className="space-y-1">
                  <div className="font-bold">{term.term}</div>
                  <p className="opacity-90">{term.definition}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Document Footer Line (Standard Word Footer) */}
        <div className={`flex items-center justify-between pt-8 mt-14 text-xs font-medium ${themeStyles.headerFooterColor} border-t`}>
          <span>Grade {book.grade} • {book.editionYear || 2024} Edition</span>
          <span className="font-mono font-bold">Page {chapter.unitNumber}</span>
        </div>
      </div>

      {/* Bottom Navigation Buttons */}
      <div className="max-w-4xl mx-auto flex items-center justify-between pt-4 text-xs font-bold">
        <button
          onClick={onPrevChapter}
          disabled={!hasPrev}
          className="px-5 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-100 disabled:opacity-30 transition-colors shadow-sm flex items-center gap-1.5"
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Previous Unit</span>
        </button>

        <button
          onClick={onNextChapter}
          disabled={!hasNext}
          className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-30 transition-colors shadow-md flex items-center gap-1.5"
        >
          <span>Next Unit</span>
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
