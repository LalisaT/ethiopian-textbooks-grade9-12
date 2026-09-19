import React from 'react';
import { Shield } from 'lucide-react';

export const Footer: React.FC = () => {

  return (
    <footer className="bg-slate-900 text-slate-400 text-sm border-t border-slate-800 transition-colors mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Col */}
          <div className="md:col-span-2 space-y-3">
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
            <p className="text-slate-400 text-sm max-w-md">
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

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold text-xs uppercase tracking-wider mb-3">
              Regions Covered
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-400">
              <li>National (MOE Ethiopia)</li>
              <li>Addis Ababa & Oromia</li>
              <li>Amhara & Tigray</li>
              <li>Somali & Sidama</li>
              <li>South & Central Ethiopia</li>
              <li>Afar, Benishangul, Gambella, Harari, Dire Dawa</li>
            </ul>
          </div>

          {/* Grades */}
          <div>
            <h4 className="text-white font-semibold text-xs uppercase tracking-wider mb-3">
              Grade Levels
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-400">
              <li>Grade 9 General Secondary</li>
              <li>Grade 10 Secondary Foundations</li>
              <li>Grade 11 Preparatory (Natural & Social)</li>
              <li>Grade 12 ESSLCE / Matric Prep</li>
              <li>National University Entrance Hub</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-8 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p>© {new Date().getFullYear()} Ethiopian Textbooks Digital Portal. Developed for students across all regions.</p>
          <div className="flex items-center gap-1.5 text-slate-400">
            <span>Built with</span>
            <img
              src="/brand/lalion-logo.png"
              alt="Lalion Logo"
              className="w-4 h-4 rounded-full inline-block object-contain ring-1 ring-slate-700/80"
            />
            <span className="font-semibold text-slate-200">Lalion</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
