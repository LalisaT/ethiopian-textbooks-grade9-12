import React from 'react';
import { Sun, Moon, Eye } from 'lucide-react';
import { useTranslation } from '../../i18n/useTranslation';

interface ThemeToggleProps {
  theme: 'light' | 'dark' | 'sepia';
  setTheme: (theme: 'light' | 'dark' | 'sepia') => void;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ theme, setTheme }) => {
  const { t } = useTranslation();

  const handleSelectTheme = (newTheme: 'light' | 'dark' | 'sepia') => {
    localStorage.setItem('ethio_explicit_theme_selected', 'true');
    setTheme(newTheme);
  };

  const cycleTheme = () => {
    if (theme === 'light') handleSelectTheme('dark');
    else if (theme === 'dark') handleSelectTheme('sepia');
    else handleSelectTheme('light');
  };

  return (
    <>
      {/* Mobile Single Compact Cycle Button */}
      <button
        onClick={cycleTheme}
        className="sm:hidden w-8 h-8 rounded-xl btn-luxury-idle luxury-pressable transition-all flex items-center justify-center cursor-pointer shrink-0"
        title={`Theme: ${theme}. Tap to change.`}
        aria-label={`Theme: ${theme}. Tap to change.`}
      >
        {theme === 'light' && <Sun className="w-4 h-4 text-amber-500" />}
        {theme === 'dark' && <Moon className="w-4 h-4 text-blue-600 dark:text-sky-400" />}
        {theme === 'sepia' && <Eye className="w-4 h-4 text-amber-600" />}
      </button>

      {/* Desktop / Tablet 3-state Segmented Control */}
      <div className="hidden sm:flex items-center luxury-segmented-tray p-1 rounded-xl">
        <button
          onClick={() => handleSelectTheme('light')}
          title={t('light')}
          className={`p-1.5 rounded-lg transition-all luxury-pressable cursor-pointer ${
            theme === 'light'
              ? 'btn-luxury-active text-amber-400'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Sun className="w-4 h-4" />
        </button>

        <button
          onClick={() => handleSelectTheme('dark')}
          title={t('dark')}
          className={`p-1.5 rounded-lg transition-all luxury-pressable cursor-pointer ${
            theme === 'dark'
              ? 'btn-luxury-active text-sky-400'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Moon className="w-4 h-4" />
        </button>

        <button
          onClick={() => handleSelectTheme('sepia')}
          title={t('sepia')}
          className={`p-1.5 rounded-lg transition-all luxury-pressable cursor-pointer ${
            theme === 'sepia'
              ? 'btn-luxury-active text-amber-300'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          <Eye className="w-4 h-4" />
        </button>
      </div>
    </>
  );
};
