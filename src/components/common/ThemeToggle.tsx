import React from 'react';
import { Sun, Moon, Eye } from 'lucide-react';
import { useTranslation } from '../../i18n/useTranslation';

interface ThemeToggleProps {
  theme: 'light' | 'dark' | 'sepia';
  setTheme: (theme: 'light' | 'dark' | 'sepia') => void;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ theme, setTheme }) => {
  const { t } = useTranslation();

  const cycleTheme = () => {
    if (theme === 'light') setTheme('dark');
    else if (theme === 'dark') setTheme('sepia');
    else setTheme('light');
  };

  return (
    <>
      {/* Mobile Single Compact Cycle Button */}
      <button
        onClick={cycleTheme}
        className="sm:hidden w-9 h-9 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all flex items-center justify-center active:scale-95 shadow-xs"
        title={`Theme: ${theme}. Tap to change.`}
      >
        {theme === 'light' && <Sun className="w-4 h-4 text-amber-500" />}
        {theme === 'dark' && <Moon className="w-4 h-4 text-blue-400" />}
        {theme === 'sepia' && <Eye className="w-4 h-4 text-amber-700" />}
      </button>

      {/* Desktop / Tablet 3-state Segmented Control */}
      <div className="hidden sm:flex items-center bg-slate-100 dark:bg-slate-800 p-1 rounded-xl border border-slate-200 dark:border-slate-700">
        <button
          onClick={() => setTheme('light')}
          title={t('light')}
          className={`p-1.5 rounded-lg transition-all ${
            theme === 'light'
              ? 'bg-white text-amber-600 shadow-sm'
              : 'text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200'
          }`}
        >
          <Sun className="w-4 h-4" />
        </button>

        <button
          onClick={() => setTheme('dark')}
          title={t('dark')}
          className={`p-1.5 rounded-lg transition-all ${
            theme === 'dark'
              ? 'bg-slate-900 text-blue-400 shadow-sm'
              : 'text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200'
          }`}
        >
          <Moon className="w-4 h-4" />
        </button>

        <button
          onClick={() => setTheme('sepia')}
          title={t('sepia')}
          className={`p-1.5 rounded-lg transition-all ${
            theme === 'sepia'
              ? 'bg-amber-100 text-amber-900 shadow-sm font-bold'
              : 'text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200'
          }`}
        >
          <Eye className="w-4 h-4" />
        </button>
      </div>
    </>
  );
};
