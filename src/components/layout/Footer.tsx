import React from 'react';
import { Shield, Send } from 'lucide-react';

export const Footer: React.FC = () => {

  return (
    <footer className="bg-slate-900 text-slate-400 text-sm border-t border-slate-800 transition-colors mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-32 sm:pb-12">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          {/* Brand Info */}
          <div className="space-y-3 max-w-xl">
            <div className="flex items-center gap-2.5 text-white font-extrabold text-lg">
              <div className="w-8 h-8 rounded-xl overflow-hidden shadow-md shrink-0 bg-slate-800">
                <img
                  src="/brand/app-icon.jpg"
                  alt="Ethiopian Textbooks Logo"
                  className="w-full h-full object-cover"
                />
              </div>
              <span>Ethiopian Grade 9–12 Textbooks &amp; Teacher Guides</span>
            </div>
            <p className="text-slate-400 text-sm">
              Comprehensive open educational hub for Ethiopian students, teachers, and parents.
              Covering the official Ministry of Education (MOE) and all regional state curriculum adaptations.
            </p>
            <div
              className="flex items-center gap-2 text-xs text-slate-500 cursor-default select-none"
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
              <Shield className="w-3.5 h-3.5 text-emerald-400" />
              <span>Offline-capable Progressive Web Application (PWA)</span>
            </div>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-8 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <div className="flex flex-wrap items-center gap-4 text-slate-400 text-center sm:text-left justify-center sm:justify-start">
            <p>© {new Date().getFullYear()} Ethiopian Grade 9–12 Textbooks Portal. Developed for students across all regions.</p>
            <button
              type="button"
              onClick={() => window.dispatchEvent(new CustomEvent('open-disclaimer-modal'))}
              className="text-rose-400 hover:text-rose-300 font-bold hover:underline transition-colors cursor-pointer"
            >
              Disclaimer &amp; Privacy Policy
            </button>
            <a
              href="https://t.me/Ethiopianstudentbooks"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sky-400 hover:text-sky-300 font-bold hover:underline transition-colors inline-flex items-center gap-1 cursor-pointer"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Telegram Channel</span>
            </a>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-300 bg-slate-800/90 px-3.5 py-1.5 rounded-full border border-slate-700/80 shadow-md shrink-0">
            <span className="text-slate-400">Built with</span>
            <img
              src="/brand/lalion-logo.png"
              alt="Lalion Logo"
              className="w-4 h-4 rounded-full inline-block object-contain ring-1 ring-slate-600 shadow-sm"
            />
            <span className="font-bold text-white tracking-wide">Lalion</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
