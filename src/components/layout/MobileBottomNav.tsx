import React from 'react';
import { Home, BookOpen, Award, Bookmark, Info } from 'lucide-react';

interface MobileBottomNavProps {
  activeTab: 'home' | 'explore' | 'examprep' | 'community' | 'saved' | 'about';
  setActiveTab: (tab: 'home' | 'explore' | 'examprep' | 'community' | 'saved' | 'about') => void;
  offlineCount: number;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  activeTab,
  setActiveTab,
  offlineCount,
}) => {
  const tabs = [
    { id: 'home' as const, label: 'Home', icon: Home },
    { id: 'explore' as const, label: 'Textbooks', icon: BookOpen },
    { id: 'examprep' as const, label: 'EUEE', icon: Award, highlight: true },
    {
      id: 'saved' as const,
      label: 'Saved',
      icon: Bookmark,
      badge: offlineCount > 0 ? offlineCount : undefined,
    },
    { id: 'about' as const, label: 'Curriculum', icon: Info },
  ];

  return (
    <nav
      aria-label="Mobile Navigation"
      className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 dark:bg-slate-950/95 backdrop-blur-xl border-t border-slate-200/90 dark:border-slate-800/90 shadow-[0_-4px_24px_rgba(0,0,0,0.12)] transition-colors px-2 py-1.5 safe-area-pb"
    >
      <div className="flex items-center justify-around max-w-lg mx-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;

          if (tab.highlight) {
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className={`relative -top-2.5 flex flex-col items-center justify-center p-2 rounded-2xl transition-all duration-200 active:scale-90 ${
                  isActive
                    ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/40 ring-4 ring-white dark:ring-slate-950 scale-105'
                    : 'bg-gradient-to-tr from-amber-500 to-yellow-400 text-slate-950 shadow-md shadow-amber-500/20 hover:scale-105'
                }`}
                title="Grade 12 EUEE Hub"
              >
                <Icon className="w-5 h-5 font-black" />
                <span className="text-[10px] font-black tracking-tight mt-0.5">
                  EUEE
                </span>
                {isActive && (
                  <span className="absolute -bottom-1 w-1.5 h-1.5 rounded-full bg-slate-950" />
                )}
              </button>
            );
          }

          return (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className={`relative flex flex-col items-center justify-center py-1 px-3 rounded-xl transition-all duration-150 active:scale-90 min-w-[58px] ${
                isActive
                  ? 'text-emerald-600 dark:text-emerald-400 font-bold'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              <div className="relative">
                <Icon className={`w-5 h-5 transition-transform ${isActive ? 'scale-110' : ''}`} />
                {tab.badge !== undefined && (
                  <span className="absolute -top-1.5 -right-2.5 px-1.5 py-0.2 bg-emerald-600 text-white text-[10px] font-black rounded-full shadow-sm animate-pulse">
                    {tab.badge}
                  </span>
                )}
              </div>
              <span className={`text-[10px] tracking-tight mt-1 ${isActive ? 'font-black' : 'font-medium'}`}>
                {tab.label}
              </span>
              {isActive && (
                <span className="w-1 h-1 rounded-full bg-emerald-600 dark:bg-emerald-400 mt-0.5" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
