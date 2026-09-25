import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { BookOpen, Award, Bookmark, Info, Menu, X, Compass, Shield, UploadCloud, Megaphone, GraduationCap, Send, Share2, Globe, ChevronDown, Check } from 'lucide-react';
import { useTranslation } from '../../i18n/useTranslation';
import { LanguageSelector } from '../common/LanguageSelector';
import { ThemeToggle } from '../common/ThemeToggle';
import { NotificationDropdown } from '../common/NotificationDropdown';
import { LanguageCode } from '../../types/book';

import { NotificationService, AppNotification } from '../../services/notificationService';
import { BrandLogo } from '../common/BrandLogo';

const LANGUAGES = [
  { code: 'en' as LanguageCode, label: 'English', native: 'English', flag: '🇬🇧' },
  { code: 'am' as LanguageCode, label: 'Amharic', native: 'አማርኛ', flag: '🇪🇹' },
  { code: 'om' as LanguageCode, label: 'Afaan Oromoo', native: 'Afaan Oromoo', flag: '🇪🇹' },
  { code: 'ti' as LanguageCode, label: 'Tigrinya', native: 'ትግርኛ', flag: '🇪🇹' },
  { code: 'so' as LanguageCode, label: 'Somali', native: 'Af-Soomaali', flag: '🇸🇴' },
];

interface NavbarProps {
  activeTab: 'home' | 'explore' | 'examprep' | 'community' | 'saved' | 'about' | 'curriculum';
  setActiveTab: (tab: 'home' | 'explore' | 'examprep' | 'community' | 'saved' | 'about' | 'curriculum') => void;
  onNavigateToTeacherGuides?: () => void;
  theme: 'light' | 'dark' | 'sepia';
  setTheme: (theme: 'light' | 'dark' | 'sepia') => void;
  offlineCount: number;
  isAdmin: boolean;
  onToggleAdmin: () => void;
  onOpenUploadModal?: () => void;
  onNavigateNotification?: (notification: AppNotification) => void;
  onOpenShareModal?: () => void;
  canGoBack?: boolean;
  onBackStep?: () => void;
  isMobileMenuOpen?: boolean;
  setIsMobileMenuOpen?: (open: boolean) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onNavigateToTeacherGuides,
  theme,
  setTheme,
  offlineCount,
  isAdmin,
  onToggleAdmin,
  onNavigateNotification,
  onOpenShareModal,
  isMobileMenuOpen,
  setIsMobileMenuOpen,
}) => {
  const { t, language, setLanguage } = useTranslation();
  const [internalMenuOpen, setInternalMenuOpen] = useState(false);
  const [drawerLangOpen, setDrawerLangOpen] = useState(false);
  const mobileMenuOpen = isMobileMenuOpen !== undefined ? isMobileMenuOpen : internalMenuOpen;
  const setMobileMenuOpen = setIsMobileMenuOpen || setInternalMenuOpen;
  const currentLang = LANGUAGES.find((l) => l.code === language) || LANGUAGES[0];

  const navItems = [
    { id: 'home' as const, label: t('home'), icon: BookOpen },
    { id: 'explore' as const, label: t('books', 'Books'), icon: Compass },
    { id: 'teacher_guides' as const, label: t('teacherGuides', "Teacher's Guides"), icon: GraduationCap },
    { id: 'examprep' as const, label: t('eueeHub', 'EUEE Hub'), icon: Award },
    {
      id: 'saved' as const,
      label: t('savedBooks'),
      icon: Bookmark,
      badge: offlineCount > 0 ? offlineCount : undefined,
    },
    { id: 'curriculum' as const, label: t('aboutCurriculum'), icon: Info },
  ];

  const handleNavClick = (id: string) => {
    if (id === 'teacher_guides') {
      if (onNavigateToTeacherGuides) {
        onNavigateToTeacherGuides();
      } else {
        setActiveTab('explore');
      }
    } else {
      setActiveTab(id as any);
    }
  };

  return (
    <header
      className="sticky top-0 z-40 bg-white/95 dark:bg-[#0B1120]/95 backdrop-blur-md border-b border-slate-200/90 dark:border-slate-800/80 text-slate-900 dark:text-white transition-colors"
      style={{ paddingTop: 'env(safe-area-inset-top, 0px)' }}
    >
      {/* Top Professional Glowing Accent Stripe */}
      <div className="h-[2px] w-full bg-gradient-to-r from-blue-600 via-sky-400 to-indigo-600 shadow-[0_0_10px_rgba(56,189,248,0.7)]" />

      <div className="max-w-7xl mx-auto px-2.5 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16">
          {/* Brand Logo & Name */}
          <div className="flex items-center gap-1.5 sm:gap-3 flex-1 min-w-0 pr-1">
            <div
              className="flex items-center gap-2 sm:gap-2.5 cursor-pointer group min-w-0"
              onClick={() => setActiveTab('home')}
            >
              <div className="shrink-0">
                <BrandLogo size="md" />
              </div>
              <div className="min-w-0">
                <span className="font-extrabold text-slate-900 dark:text-white text-sm sm:text-base lg:text-lg tracking-tight leading-tight block truncate">
                  Ethiopian Textbooks
                </span>
                <div className="flex items-center gap-1 sm:gap-1.5 text-[10px] sm:text-xs font-bold leading-none mt-0.5 whitespace-nowrap">
                  <span className="text-sky-500 dark:text-sky-400 font-black">Grades 9–12</span>
                  <span className="text-slate-400 dark:text-slate-500">•</span>
                  <span className="text-slate-600 dark:text-slate-300 font-medium">EUEE &amp; Guides</span>
                </div>
              </div>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative flex items-center gap-2 px-3.5 py-2 rounded-xl text-sm font-semibold whitespace-nowrap transition-all ${
                    isActive
                      ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-sky-400 shadow-sm'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800/60'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-blue-600 dark:text-sky-400' : ''}`} />
                  <span>{item.label}</span>
                  {item.badge !== undefined && (
                    <span className="ml-1 px-1.5 py-0.2 bg-slate-800 text-sky-400 border border-sky-500/30 text-xs rounded-full font-bold">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Controls: Language, Notifications & Theme */}
          <div className="flex items-center gap-1 sm:gap-2 shrink-0">
            {/* Join Telegram Channel Quick Action Button */}
            <a
              href="https://t.me/Ethiopianstudentbooks"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-black bg-sky-500 hover:bg-sky-400 active:scale-95 text-white shadow-sm shadow-sky-500/25 transition-all"
              title="Join Official Telegram Channel (@Ethiopianstudentbooks)"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Telegram</span>
            </a>

            <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
              <div className="hidden md:block">
                <LanguageSelector />
              </div>
              <NotificationDropdown onNavigateNotification={onNavigateNotification} />
              <ThemeToggle theme={theme} setTheme={setTheme} />

              {/* Mobile menu hamburger */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className={`md:hidden w-9 h-9 rounded-2xl transition-all flex items-center justify-center luxury-pressable cursor-pointer focus:outline-none shrink-0 ${
                  mobileMenuOpen ? 'btn-luxury-active' : 'btn-luxury-idle'
                }`}
                title={t('menu', 'Menu')}
                aria-label={t('menu', 'Menu')}
              >
                {mobileMenuOpen ? <X className="w-4 h-4 text-sky-500 dark:text-sky-300" /> : <Menu className="w-4 h-4 text-slate-700 dark:text-slate-300" />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Side Drawer Menu (Portal to document.body with solid background) */}
      {mobileMenuOpen && typeof document !== 'undefined' && createPortal(
        <div className="fixed inset-0 z-[150] md:hidden">
          {/* Backdrop overlay */}
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity duration-200"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Right Slide-over Panel with Guaranteed Solid Background */}
          <aside
            className="fixed inset-y-0 right-0 z-10 w-4/5 max-w-xs h-full h-[100dvh] bg-white dark:bg-[#090d16] text-slate-900 dark:text-white border-l border-slate-200 dark:border-slate-800 shadow-2xl flex flex-col justify-between p-5 overflow-y-auto transition-colors"
          >
            <div className="space-y-5">
              {/* Drawer Header */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
                <div className="flex items-center gap-2.5">
                  <BrandLogo size="sm" />
                  <div>
                    <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">Ethiopian Textbooks</h3>
                    <div className="flex items-center gap-1 text-[10px] font-bold mt-0.5 whitespace-nowrap">
                      <span className="text-sky-500 dark:text-sky-400 font-black">Grades 9–12</span>
                      <span className="text-slate-400 dark:text-slate-500">•</span>
                      <span className="text-slate-600 dark:text-slate-300 font-medium">EUEE &amp; Guides</span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Drawer Language Selector - Minimized Compact Dropdown */}
              <div className="relative flex items-center justify-end px-1">
                <div className="relative">
                  <button
                    onClick={() => setDrawerLangOpen(!drawerLangOpen)}
                    className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer luxury-pressable ${
                      drawerLangOpen ? 'btn-luxury-active' : 'btn-luxury-idle'
                    }`}
                    title="Select Language"
                    aria-label="Select Language"
                  >
                    <Globe className={`w-3.5 h-3.5 shrink-0 ${drawerLangOpen ? 'text-white dark:text-sky-300' : 'text-blue-600 dark:text-sky-400'}`} />
                    <span className="font-black text-blue-600 dark:text-sky-400 leading-none">{currentLang.native}</span>
                    <ChevronDown className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-200 ${drawerLangOpen ? 'rotate-180 text-blue-600 dark:text-sky-400' : ''}`} />
                  </button>

                  {drawerLangOpen && (
                    <div className="absolute right-0 top-full mt-1.5 w-56 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 py-1.5 shadow-2xl z-30 animate-in fade-in slide-in-from-top-1 duration-150 space-y-0.5">
                      <div className="px-3 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                        Select Language
                      </div>
                      {LANGUAGES.map((lang) => {
                        const isSelected = language === lang.code;
                        return (
                          <button
                            key={lang.code}
                            onClick={() => {
                              setLanguage(lang.code);
                              setDrawerLangOpen(false);
                            }}
                            className={`w-full text-left px-3 py-2 flex items-center justify-between text-xs transition-colors cursor-pointer ${
                              isSelected
                                ? 'bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-sky-400 font-bold'
                                : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/60'
                            }`}
                          >
                            <div className="flex items-center gap-2.5">
                              <span className="text-base">{lang.flag}</span>
                              <div>
                                <div className="font-bold leading-tight">{lang.native}</div>
                                <div className="text-[10px] text-slate-400">{lang.label}</div>
                              </div>
                            </div>
                            {isSelected && <Check className="w-4 h-4 text-blue-600 dark:text-sky-400" />}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>

              {/* Navigation Links */}
              <div className="space-y-1.5">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = activeTab === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => {
                        handleNavClick(item.id);
                        setMobileMenuOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3.5 py-3 rounded-2xl text-xs font-bold transition-all ${
                        isActive
                          ? 'btn-luxury-active font-black'
                          : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-900/90 hover:text-slate-900 dark:hover:text-white'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className="w-4 h-4" />
                        <span>{item.label}</span>
                      </div>
                      {item.badge !== undefined && (
                        <span className="px-2 py-0.5 bg-slate-200 dark:bg-slate-800 text-blue-700 dark:text-sky-400 border border-blue-300 dark:border-sky-500/30 text-[10px] font-black rounded-full">
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              {isAdmin && (
                <div className="pt-3 border-t border-slate-200 dark:border-slate-800">
                  <button
                    onClick={() => {
                      onToggleAdmin();
                      setMobileMenuOpen(false);
                    }}
                    className="w-full flex items-center justify-between px-3.5 py-3 rounded-2xl text-xs font-black text-rose-500 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800/40"
                  >
                    <div className="flex items-center gap-2.5">
                      <Shield className="w-4 h-4" />
                      <span>Exit Admin Studio</span>
                    </div>
                  </button>
                </div>
              )}

              {/* Share App Action (Mobile Drawer Circled Area) */}
              {onOpenShareModal && (
                <div className="pt-2">
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false);
                      onOpenShareModal();
                    }}
                    className="w-full flex items-center justify-between px-3.5 py-3 rounded-2xl text-xs font-bold text-white bg-gradient-to-r from-sky-600/90 via-indigo-600/90 to-blue-600/90 shadow-lg shadow-sky-500/20 transition-all hover:scale-[1.01] active:scale-95 group cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center text-white transition-all shadow-inner">
                        <Share2 className="w-4 h-4" />
                      </div>
                      <div className="text-left">
                        <div className="font-black text-white text-xs">{t('shareApp', 'Share App')}</div>
                        <div className="text-[10px] text-sky-100 font-medium">Telegram, Facebook, Link</div>
                      </div>
                    </div>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/20 text-white font-bold">
                      Invite
                    </span>
                  </button>
                </div>
              )}
            </div>

            {/* Drawer Footer */}
            <div className="pt-4 border-t border-slate-200 dark:border-slate-800 text-[11px] text-slate-500 space-y-1">
              <div className="font-bold text-slate-700 dark:text-slate-400">National High School Portal</div>
              <div>Grades 9–12 • EUEE Prep</div>
            </div>
          </aside>
        </div>,
        document.body
      )}
    </header>
  );
};
