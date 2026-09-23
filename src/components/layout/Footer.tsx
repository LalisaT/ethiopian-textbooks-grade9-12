import React from 'react';
import { Shield, Send, GraduationCap } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="relative bg-gradient-to-b from-slate-950/95 via-slate-900 to-slate-950 border-t border-slate-800/80 rounded-t-[2.5rem] shadow-[0_-12px_40px_rgba(0,0,0,0.6)] backdrop-blur-2xl transition-colors mt-6 overflow-hidden">
      {/* Subtle Luxury Top Accent Hairline */}
      <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-cyan-500/35 to-transparent" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-20 sm:pb-8 space-y-5 text-center flex flex-col items-center">
        {/* Centered Brand Icon & Title Card */}
        <div className="flex flex-col items-center text-center gap-3 w-full">
          {/* Centered Icon with Glowing Luxury Border & Animation */}
          <div className="relative p-1 rounded-2xl bg-gradient-to-tr from-blue-600/40 via-indigo-600/30 to-sky-500/40 ring-1 ring-blue-500/30 shrink-0 mx-auto luxury-brand-icon-anim cursor-pointer">
            <div className="w-14 h-14 rounded-[14px] overflow-hidden bg-slate-950 shadow-inner">
              <img
                src="/brand/app-icon.jpg"
                alt="Ethiopian Textbooks Logo"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div>
            <h3 className="text-base sm:text-lg font-black text-white tracking-tight leading-snug">
              Ethiopian Grade 9–12 Textbooks &amp; Teacher Guides
            </h3>
          </div>
        </div>

        {/* Centered Description */}
        <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-xl mx-auto text-center">
          Comprehensive open educational hub for Ethiopian students, teachers, and parents. Covering official high school curriculum resources with 100% offline study capability.
        </p>

        {/* Centered Feature Badges */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
          <div
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900/90 border border-slate-800 text-[11px] font-bold text-slate-300 cursor-default select-none shadow-xs hover:border-slate-700 transition-colors"
            onClick={() => {
              const now = Date.now();
              const tapCount = parseInt(sessionStorage.getItem('studio_tap_count') || '0', 10);
              const lastTap = parseInt(sessionStorage.getItem('studio_last_tap') || '0', 10);
              if (now - lastTap < 1500) {
                const newCount = tapCount + 1;
                sessionStorage.setItem('studio_tap_count', newCount.toString());
                sessionStorage.setItem('studio_last_tap', now.toString());
                if (newCount >= 5) {
                  sessionStorage.removeItem('studio_tap_count');
                  window.dispatchEvent(new CustomEvent('open-admin-studio'));
                }
              } else {
                sessionStorage.setItem('studio_tap_count', '1');
                sessionStorage.setItem('studio_last_tap', now.toString());
              }
            }}
            title="MOE Ethiopia Verified PWA"
          >
            <Shield className="w-3.5 h-3.5 text-sky-400" />
            <span>100% Offline PWA</span>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900/90 border border-slate-800 text-[11px] font-bold text-slate-300 shadow-xs">
            <span className="text-xs">🇪🇹</span>
            <span>National Curriculum</span>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-900/90 border border-slate-800 text-[11px] font-bold text-slate-300 shadow-xs">
            <GraduationCap className="w-3.5 h-3.5 text-cyan-400" />
            <span>Grades 9–12 &amp; Guides</span>
          </div>
        </div>

        {/* Bottom Metadata & Quick Links */}
        <div className="w-full border-t border-slate-800/80 pt-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p className="text-center sm:text-left text-[11px] text-slate-500">
            © {new Date().getFullYear()} Ethiopian Textbooks Portal. Developed for students across all regions.
          </p>

          <div className="flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => window.dispatchEvent(new CustomEvent('open-disclaimer-modal'))}
              className="text-slate-400 hover:text-rose-400 transition-colors font-semibold text-[11px]"
            >
              Disclaimer &amp; Privacy Policy
            </button>

            <a
              href="https://t.me/Ethiopianstudentbooks"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-400 hover:text-sky-300 hover:bg-sky-500/20 font-bold transition-all shadow-xs text-[11px]"
            >
              <Send className="w-3 h-3" />
              <span>Telegram Channel</span>
            </a>
          </div>

          <div className="flex items-center gap-2 text-xs text-slate-300 bg-slate-900/90 px-3.5 py-1 rounded-full border border-slate-800 shadow-md">
            <span className="text-slate-400 text-[11px]">Built with</span>
            <img
              src="/brand/lalion-logo.png"
              alt="Lalion Logo"
              className="w-4 h-4 rounded-full inline-block object-contain ring-1 ring-slate-700 shadow-sm"
            />
            <span className="font-bold text-white tracking-wide text-xs">Lalion</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
