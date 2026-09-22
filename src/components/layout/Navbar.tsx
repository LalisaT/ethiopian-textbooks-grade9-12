import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { BookOpen, Award, Bookmark, Info, Menu, X, Compass, Shield, UploadCloud, Megaphone, GraduationCap, Send } from 'lucide-react';
import { useTranslation } from '../../i18n/useTranslation';
import { LanguageSelector } from '../common/LanguageSelector';
import { ThemeToggle } from '../common/ThemeToggle';
import { NotificationDropdown } from '../common/NotificationDropdown';

import { NotificationService, AppNotification } from '../../services/notificationService';
import { BrandLogo } from '../common/BrandLogo';

interface NavbarProps {
  activeTab: 'home' | 'explore' | 'examprep' | 'community' | 'saved' | 'about';
  setActiveTab: (tab: 'home' | 'explore' | 'examprep' | 'community' | 'saved' | 'about') => void;
  onNavigateToTeacherGuides?: () => void;
  theme: 'light' | 'dark' | 'sepia';
  setTheme: (theme: 'light' | 'dark' | 'sepia') => void;
  offlineCount: number;
  isAdmin: boolean;
  onToggleAdmin: () => void;
  onOpenUploadModal: () => void;
  onNavigateNotification?: (notification: AppNotification) => void;
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
  onOpenUploadModal,
  onNavigateNotification,
}) => {
  const { t } = useTranslation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'home' as const, label: t('home'), icon: BookOpen },
    { id: 'explore' as const, label: 'Textbooks', icon: Compass },
    { id: 'teacher_guides' as const, label: 'Teacher Guides', icon: GraduationCap },
    { id: 'examprep' as const, label: 'EUEE Hub', icon: Award },
    {
      id: 'saved' as const,
      label: t('savedBooks'),
      icon: Bookmark,
      badge: offlineCount > 0 ? offlineCount : undefined,
    },
    { id: 'about' as const, label: t('aboutCurriculum'), icon: Info },
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
    <header className="sticky top-0 z-40 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors">
      {/* Top Professional Luxury Flowing Accent Stripe */}
      <div className="h-[2px] w-full luxury-flow-line" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo & Name */}
          <div
            className="flex items-center gap-2.5 sm:gap-3 cursor-pointer group shrink-0 min-w-0"
            onClick={() => setActiveTab('home')}
          >
            <BrandLogo size="md" />
            <div className="min-w-0">
              <span className="font-black text-slate-900 dark:text-white text-sm sm:text-base lg:text-lg tracking-tight leading-tight block truncate">
                Ethiopian Textbooks
              </span>
              <div className="flex items-center gap-1 text-[10px] sm:text-xs font-bold text-slate-500 dark:text-slate-400 leading-none mt-0.5">
                <span className="text-blue-600 dark:text-sky-400 font-black">Grades 9–12</span>
                <span className="text-slate-300 dark:text-slate-600">•</span>
                <span className="truncate">EUEE &amp; Guides</span>
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
                    <span className="ml-1 px-1.5 py-0.2 bg-blue-600 text-white text-xs rounded-full font-bold">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Controls: Language, Notifications & Theme */}
          <div className="flex items-center gap-2 shrink-0">
            {isAdmin && (
              <button
                onClick={onToggleAdmin}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-black bg-rose-500/20 text-rose-400 border border-rose-500/40 hover:bg-rose-500/30 transition-all active:scale-95"
                title="Admin Studio Active - Click to Exit"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
                <span>Studio Active</span>
              </button>
            )}

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

            <div className="flex items-center gap-1.5 sm:gap-2">
              <LanguageSelector />
              <NotificationDropdown onNavigateNotification={onNavigateNotification} />
              <ThemeToggle theme={theme} setTheme={setTheme} />

              {/* Mobile menu hamburger */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden w-9 h-9 rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700/80 text-slate-700 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-700 transition-all flex items-center justify-center active:scale-95 shadow-xs focus:outline-none"
                title="Menu"
              >
                {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
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
            className="fixed inset-y-0 right-0 z-10 w-4/5 max-w-xs h-full h-[100dvh] text-white border-l border-slate-800 shadow-2xl flex flex-col justify-between p-5 overflow-y-auto"
            style={{ backgroundColor: '#090d16' }}
          >
            <div className="space-y-6">
              {/* Drawer Header */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div className="flex items-center gap-2.5">
                  <BrandLogo size="sm" />
                  <div>
                    <h3 className="font-black text-sm text-white">Ethiopian Textbooks</h3>
                    <p className="text-[10px] text-sky-400 font-bold">Menu &amp; Navigation</p>
                  </div>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
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
                          ? 'bg-blue-600 text-white font-black shadow-md shadow-blue-600/30'
                          : 'text-slate-300 hover:bg-slate-900/90 hover:text-white'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <Icon className="w-4 h-4" />
                        <span>{item.label}</span>
                      </div>
                      {item.badge !== undefined && (
                        <span className="px-2 py-0.5 bg-blue-700 text-white text-[10px] font-black rounded-full">
                          {item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>

              {isAdmin && (
                <div className="pt-3 border-t border-slate-800">
                  <button
                    onClick={() => {
                      onToggleAdmin();
                      setMobileMenuOpen(false);
                    }}
                    className="w-full flex items-center justify-between px-3.5 py-3 rounded-2xl text-xs font-black text-rose-400 bg-rose-950/40 border border-rose-800/40"
                  >
                    <div className="flex items-center gap-2.5">
                      <Shield className="w-4 h-4" />
                      <span>Exit Admin Studio</span>
                    </div>
                  </button>
                </div>
              )}
            </div>

            {/* Drawer Footer */}
            <div className="pt-4 border-t border-slate-800 text-[11px] text-slate-500 space-y-1">
              <div className="font-bold text-slate-400">National High School Portal</div>
              <div>Grades 9–12 • EUEE Prep</div>
            </div>
          </aside>
        </div>,
        document.body
      )}
    </header>
  );
};
