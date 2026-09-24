import React from 'react';
import { Home, BookOpen, Award, Bookmark, Info } from 'lucide-react';

interface MobileBottomNavProps {
  activeTab: 'home' | 'explore' | 'examprep' | 'community' | 'saved' | 'about' | 'curriculum';
  setActiveTab: (tab: 'home' | 'explore' | 'examprep' | 'community' | 'saved' | 'about' | 'curriculum') => void;
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
    { id: 'about' as const, label: 'About', icon: Info },
  ];

  return (
    <nav
      aria-label="Mobile Navigation"
      className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0B1120]/95 backdrop-blur-2xl border-t border-slate-800/80 shadow-[0_-4px_25px_rgba(0,0,0,0.7)] transition-all px-2 py-1.5"
      style={{
        paddingBottom: 'max(env(safe-area-inset-bottom, 0px), 6px)',
      }}
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
                className={`relative flex flex-col items-center justify-center px-3 py-1 rounded-2xl transition-all duration-200 active:scale-95 ${
                  isActive
                    ? 'bg-gradient-to-tr from-amber-500 to-yellow-400 text-slate-950 shadow-md shadow-amber-500/40 ring-2 ring-amber-400/50 scale-105'
                    : 'bg-gradient-to-tr from-amber-500 to-yellow-400 text-slate-950 shadow-sm shadow-amber-500/20 hover:scale-105'
                }`}
                title="Grade 12 EUEE Hub"
              >
                <Icon className="w-4 h-4 font-black" />
                <span className="text-[10px] font-black tracking-tight mt-0.5">
                  EUEE
                </span>
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
              className={`relative flex flex-col items-center justify-center py-1 px-2.5 rounded-xl transition-all duration-150 active:scale-90 min-w-[50px] sm:min-w-[58px] ${
                isActive
                  ? 'text-sky-400 font-extrabold'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <div className="relative">
                <Icon className={`w-5 h-5 transition-transform ${isActive ? 'scale-110 text-sky-400' : ''}`} />
                {tab.badge !== undefined && (
                  <span className="absolute -top-1.5 -right-2.5 px-1.5 py-0.2 bg-sky-500 text-slate-950 text-[10px] font-black rounded-full shadow-sm animate-pulse">
                    {tab.badge}
                  </span>
                )}
              </div>
              <span className={`text-[10px] tracking-tight mt-1 ${isActive ? 'font-black text-sky-400' : 'font-medium'}`}>
                {tab.label}
              </span>
              {isActive && (
                <span className="w-1.5 h-1.5 rounded-full bg-sky-400 shadow-[0_0_8px_rgba(56,189,248,0.8)] mt-0.5" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
