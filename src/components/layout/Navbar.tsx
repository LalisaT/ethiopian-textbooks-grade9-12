import React, { useState } from 'react';
import { BookOpen, Award, Bookmark, Info, Menu, X, Compass, Shield, UploadCloud, Megaphone, GraduationCap, Send } from 'lucide-react';
import { useTranslation } from '../../i18n/useTranslation';
import { LanguageSelector } from '../common/LanguageSelector';
import { ThemeToggle } from '../common/ThemeToggle';
import { NotificationDropdown } from '../common/NotificationDropdown';

import { NotificationService, AppNotification } from '../../services/notificationService';

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
      {/* Top Ethiopian accent stripe */}
      <div className="h-1 w-full ethio-gradient-bar" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo & Name */}
          <div
            className="flex items-center gap-2.5 sm:gap-3 cursor-pointer group shrink-0 min-w-0"
            onClick={() => setActiveTab('home')}
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-2xl bg-gradient-to-br from-emerald-500 via-amber-500 to-rose-500 p-0.5 shadow-sm group-hover:scale-105 transition-transform overflow-hidden shrink-0">
              <img
                src="/brand/app-icon.jpg"
                alt="Ethiopian Textbooks Logo"
                className="w-full h-full object-cover rounded-[14px]"
              />
            </div>
            <div className="min-w-0">
              <span className="font-black text-slate-900 dark:text-white text-sm sm:text-base lg:text-lg tracking-tight leading-tight block truncate">
                Ethiopian Textbooks
              </span>
              <div className="flex items-center gap-1 text-[10px] sm:text-xs font-bold text-slate-500 dark:text-slate-400 leading-none mt-0.5">
                <span className="text-emerald-600 dark:text-emerald-400 font-black">Grades 9–12</span>
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
                      ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 shadow-sm'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-800/60'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-600 dark:text-emerald-400' : ''}`} />
                  <span>{item.label}</span>
                  {item.badge !== undefined && (
                    <span className="ml-1 px-1.5 py-0.2 bg-emerald-600 text-white text-xs rounded-full font-bold">
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

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 px-4 pt-2 pb-4 space-y-1 animate-in slide-in-from-top duration-200">
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
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-semibold transition-colors ${
                  isActive
                    ? 'bg-emerald-50 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-400'
                    : 'text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </div>
                {item.badge !== undefined && (
                  <span className="px-2 py-0.5 bg-emerald-600 text-white text-xs rounded-full">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}

          {/* Telegram Channel Button in Mobile Drawer */}
          <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
            <a
              href="https://t.me/Ethiopianstudentbooks"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-bold bg-sky-500/10 dark:bg-sky-500/20 text-sky-600 dark:text-sky-300 border border-sky-500/30 hover:bg-sky-500 hover:text-white transition-all shadow-xs"
            >
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-full bg-sky-500 text-white flex items-center justify-center shrink-0 shadow-xs">
                  <Send className="w-3.5 h-3.5" />
                </div>
                <span>Join Telegram Community</span>
              </div>
              <span className="text-xs bg-sky-500 text-white px-2.5 py-1 rounded-full font-black shadow-xs">
                Join
              </span>
            </a>
          </div>

          {isAdmin && (
            <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
              <button
                onClick={() => {
                  onToggleAdmin();
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-bold text-rose-600 dark:text-rose-400 bg-rose-50 dark:bg-rose-950/30"
              >
                <div className="flex items-center gap-3">
                  <Shield className="w-4 h-4" />
                  <span>Exit Admin Studio</span>
                </div>
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
};
