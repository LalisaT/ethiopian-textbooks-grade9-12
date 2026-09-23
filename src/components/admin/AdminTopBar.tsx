import React from 'react';
import { UserCheck, Megaphone, FileText, LogOut, Radio } from 'lucide-react';
import { BrandLogo } from '../common/BrandLogo';
import { ThemeToggle } from '../common/ThemeToggle';

interface AdminTopBarProps {
  onOpenBroadcastModal: () => void;
  onOpenAnnouncements: () => void;
  onExitAdmin: () => void;
  theme?: 'light' | 'dark' | 'sepia';
  setTheme?: (theme: 'light' | 'dark' | 'sepia') => void;
}

export const AdminTopBar: React.FC<AdminTopBarProps> = ({
  onOpenBroadcastModal,
  onOpenAnnouncements,
  onExitAdmin,
  theme,
  setTheme,
}) => {
  return (
    <header className="sticky top-0 z-50 bg-slate-950 text-white border-b border-amber-500/40 shadow-2xl px-3 sm:px-6 py-2.5 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
        {/* Left: App Identity & Super Admin Status */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2.5">
            <BrandLogo size="sm" />
            <div className="hidden sm:block">
              <h1 className="text-sm font-black text-white leading-tight">Ethiopian Textbooks</h1>
              <p className="text-[10px] font-bold text-amber-400">Official Admin Studio</p>
            </div>
          </div>

          <div className="flex items-center gap-2 px-3 py-1 bg-amber-500/20 text-amber-300 rounded-full border border-amber-500/40 text-xs font-black">
            <UserCheck className="w-3.5 h-3.5 text-amber-400" />
            <span>ADMIN: @lalion</span>
          </div>

          <div className="hidden lg:flex items-center gap-1.5 px-2.5 py-0.5 rounded-lg bg-slate-900 border border-slate-800 text-[11px] font-bold text-slate-300">
            <Radio className="w-3 h-3 text-emerald-400 animate-pulse" />
            <span>Live Broadcast &amp; Announcements Mode</span>
          </div>
        </div>

        {/* Right: Only the 2 Needed Admin Features + Theme + Logout */}
        <div className="flex items-center gap-2">
          {/* Broadcast Push Notification Button */}
          <button
            onClick={onOpenBroadcastModal}
            className="flex items-center gap-1.5 px-3.5 py-1.5 bg-gradient-to-r from-orange-500 to-rose-500 hover:from-orange-400 hover:to-rose-400 text-white rounded-xl text-xs font-black shadow-md transition-all active:scale-95 cursor-pointer"
            title="Send push notification alert with sound to all student devices"
          >
            <Megaphone className="w-3.5 h-3.5" />
            <span>Send Notification</span>
          </button>

          {/* Official Announcements & Study Notices Button */}
          <button
            onClick={onOpenAnnouncements}
            className="flex items-center gap-1.5 px-3.5 py-1.5 bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 rounded-xl text-xs font-black shadow-md transition-all active:scale-95 cursor-pointer"
            title="Manage Official Announcements & Study Notices"
          >
            <FileText className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Official Announcements &amp; Notices</span>
            <span className="sm:hidden">Notices</span>
          </button>

          {/* Theme switcher */}
          {theme && setTheme && (
            <div className="hidden sm:block">
              <ThemeToggle theme={theme} setTheme={setTheme} />
            </div>
          )}

          {/* Exit Admin Mode */}
          <button
            onClick={onExitAdmin}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-rose-950/80 hover:bg-rose-900 text-rose-300 rounded-xl text-xs font-bold transition-colors border border-rose-800/60 cursor-pointer"
            title="Exit Admin Mode and return to Student View"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Logout</span>
          </button>
        </div>
      </div>
    </header>
  );
};
