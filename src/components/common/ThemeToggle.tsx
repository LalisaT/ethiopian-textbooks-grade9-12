import React from 'react';
import { Sun, Moon, Eye } from 'lucide-react';
import { useTranslation } from '../../i18n/useTranslation';

interface ThemeToggleProps {
  theme: 'light' | 'dark' | 'sepia';
  setTheme: (theme: 'light' | 'dark' | 'sepia') => void;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ theme, setTheme }) => {
  const { t } = useTranslation();

  return (
    <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-1 rounded-xl border border-slate-200 dark:border-slate-700">
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
  );
};
