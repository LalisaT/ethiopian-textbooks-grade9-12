import React, { useState, useRef, useEffect } from 'react';
import { Globe, Check } from 'lucide-react';
import { useTranslation } from '../../i18n/useTranslation';
import { LanguageCode } from '../../types/book';

const LANGUAGES: { code: LanguageCode; label: string; native: string; flag: string }[] = [
  { code: 'en', label: 'English', native: 'English', flag: '🇬🇧' },
  { code: 'am', label: 'Amharic', native: 'አማርኛ', flag: '🇪🇹' },
  { code: 'om', label: 'Afaan Oromoo', native: 'Afaan Oromoo', flag: '🇪🇹' },
  { code: 'ti', label: 'Tigrinya', native: 'ትግርኛ', flag: '🇪🇹' },
  { code: 'so', label: 'Somali', native: 'Af-Soomaali', flag: '🇸🇴' },
];

export const LanguageSelector: React.FC = () => {
  const { language, setLanguage } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentLang = LANGUAGES.find((l) => l.code === language) || LANGUAGES[0];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 h-9 px-2.5 rounded-xl text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all border border-slate-200/80 dark:border-slate-700/80 shadow-xs active:scale-95"
        title="Change Language"
      >
        <Globe className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400 shrink-0" />
        <span className="hidden sm:inline font-semibold">{currentLang.native}</span>
        <span className="font-black text-[10px] tracking-wider uppercase text-emerald-600 dark:text-emerald-400">
          {currentLang.code}
        </span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-52 bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-800 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
          <div className="px-3 py-1 text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Select Language
          </div>
          {LANGUAGES.map((lang) => (
            <button
              key={lang.code}
              onClick={() => {
                setLanguage(lang.code);
                setIsOpen(false);
              }}
              className={`w-full text-left px-3 py-2 flex items-center justify-between text-sm transition-colors ${
                language === lang.code
                  ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 font-semibold'
                  : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/60'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <span className="text-base">{lang.flag}</span>
                <div>
                  <div className="leading-tight">{lang.native}</div>
                  <div className="text-xs text-slate-400">{lang.label}</div>
                </div>
              </div>
              {language === lang.code && <Check className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
