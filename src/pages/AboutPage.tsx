import React from 'react';
import { Shield, Send, GraduationCap, Award, BookOpen, Sparkles, CheckCircle2 } from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center max-w-3xl mx-auto px-4 sm:px-6 py-6 sm:py-10">
      {/* Luxury Centered Brand & Educational Framework Card (Ticked in user photo) */}
      <div className="w-full bg-slate-900/90 dark:bg-slate-950/90 backdrop-blur-2xl rounded-3xl p-6 sm:p-10 border border-slate-800 shadow-[0_8px_32px_rgba(0,0,0,0.6)] flex flex-col items-center text-center space-y-6">
        
        {/* Centered Brand Icon with Glowing Luxury Border & Animation */}
        <div className="relative p-1 rounded-2xl bg-gradient-to-tr from-blue-600/50 via-indigo-500/30 to-sky-400/50 ring-1 ring-sky-500/40 shrink-0 mx-auto luxury-brand-icon-anim cursor-pointer">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-[14px] overflow-hidden bg-slate-950 shadow-inner">
            <img
              src="/brand/app-icon.jpg"
              alt="Ethiopian Textbooks Logo"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Title */}
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-white tracking-tight leading-snug">
            Ethiopian Grade 9–12 Textbooks &amp; Teacher Guides
          </h1>
        </div>

        {/* Description */}
        <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-lg mx-auto text-center">
          Comprehensive open educational hub for Ethiopian students, teachers, and parents. Covering official high school curriculum resources with 100% offline study capability.
        </p>

        {/* Feature Badges */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-1">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-slate-800 text-[11px] font-bold text-slate-300 shadow-sm">
            <Shield className="w-3.5 h-3.5 text-sky-400" />
            <span>100% Offline PWA</span>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-slate-800 text-[11px] font-bold text-slate-300 shadow-sm">
            <span className="text-xs">🇪🇹</span>
            <span>National Curriculum</span>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-slate-900/90 border border-slate-800 text-[11px] font-bold text-slate-300 shadow-sm">
            <GraduationCap className="w-3.5 h-3.5 text-cyan-400" />
            <span>Grades 9–12 &amp; Guides</span>
          </div>
        </div>

        {/* Bottom Metadata & Quick Links */}
        <div className="w-full border-t border-slate-800/80 pt-6 space-y-4">
          <p className="text-[11px] text-slate-500">
            © {new Date().getFullYear()} Ethiopian Textbooks Portal. Developed for students across all regions.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => window.dispatchEvent(new CustomEvent('open-disclaimer-modal'))}
              className="text-slate-400 hover:text-rose-400 transition-colors font-bold text-xs px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-850 border border-slate-800 shadow-xs"
            >
              Disclaimer &amp; Privacy Policy
            </button>

            <a
              href="https://t.me/Ethiopianstudentbooks"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-sky-500/10 border border-sky-500/30 text-sky-400 hover:text-sky-300 hover:bg-sky-500/20 font-bold transition-all shadow-xs text-xs"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Telegram Channel</span>
            </a>
          </div>

          <div className="flex items-center justify-center gap-2 pt-2">
            <div className="flex items-center gap-2 text-xs text-slate-300 bg-slate-900/90 px-3.5 py-1 rounded-full border border-slate-800 shadow-sm">
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

      </div>
    </div>
  );
};
