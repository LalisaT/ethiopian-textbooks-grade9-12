import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { LanguageCode } from '../types/book';
import { TRANSLATIONS } from './translations';

interface TranslationContextType {
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  t: (key: string, defaultText?: string) => string;
}

const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

export const TranslationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<LanguageCode>(() => {
    const saved = localStorage.getItem('ethio_app_lang');
    if (saved && ['en', 'am', 'om', 'ti', 'so'].includes(saved)) {
      return saved as LanguageCode;
    }
    return 'en';
  });

  const setLanguage = (lang: LanguageCode) => {
    setLanguageState(lang);
    localStorage.setItem('ethio_app_lang', lang);
    document.documentElement.lang = lang;
  };

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const t = (key: string, defaultText?: string): string => {
    const currentDict = TRANSLATIONS[language] || TRANSLATIONS.en;
    if (currentDict && currentDict[key]) {
      return currentDict[key];
    }
    const fallback = TRANSLATIONS.en[key];
    return fallback || defaultText || key;
  };

  return (
    <TranslationContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </TranslationContext.Provider>
  );
};

export const useTranslation = () => {
  const context = useContext(TranslationContext);
  if (!context) {
    throw new Error('useTranslation must be used within a TranslationProvider');
  }
  return context;
};
