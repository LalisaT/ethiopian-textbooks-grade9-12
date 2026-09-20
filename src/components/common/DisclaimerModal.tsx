import React, { useState } from 'react';
import { Shield, ExternalLink, Mail, Lock, FileText, CheckCircle2 } from 'lucide-react';

interface DisclaimerModalProps {
  isOpen: boolean;
  onAgree: () => void;
}

export const DisclaimerModal: React.FC<DisclaimerModalProps> = ({
  isOpen,
  onAgree,
}) => {
  const [activeTab, setActiveTab] = useState<'disclaimer' | 'privacy' | 'terms'>('disclaimer');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-700/80 rounded-3xl max-w-lg w-full shadow-2xl overflow-hidden flex flex-col text-slate-100 my-auto animate-in zoom-in-95 duration-200">
        
        {/* Top Header */}
        <div className="pt-6 pb-2 px-6 text-center border-b border-slate-800 bg-slate-950/80">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 mb-2 shadow-inner">
            <Shield className="w-6 h-6" />
          </div>
          <h2 className="text-xl sm:text-2xl font-black bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-200 bg-clip-text text-transparent tracking-wider uppercase">
            DISCLAIMER
          </h2>
          <p className="text-[11px] text-slate-400 mt-1">
            Ethiopian Grade 9–12 Textbooks Portal
          </p>

          {/* Sub Tabs: Disclaimer | Privacy Policy | Terms */}
          <div className="flex items-center justify-center gap-1.5 mt-3">
            <button
              type="button"
              onClick={() => setActiveTab('disclaimer')}
              className={`px-3 py-1 rounded-xl text-xs font-bold transition-all flex items-center gap-1 ${
                activeTab === 'disclaimer'
                  ? 'bg-emerald-600 text-white shadow-md ring-1 ring-emerald-400/40'
                  : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              <Shield className="w-3.5 h-3.5" />
              <span>Disclaimer</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('privacy')}
              className={`px-3 py-1 rounded-xl text-xs font-bold transition-all flex items-center gap-1 ${
                activeTab === 'privacy'
                  ? 'bg-emerald-600 text-white shadow-md ring-1 ring-emerald-400/40'
                  : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Privacy Policy</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('terms')}
              className={`px-3 py-1 rounded-xl text-xs font-bold transition-all flex items-center gap-1 ${
                activeTab === 'terms'
                  ? 'bg-emerald-600 text-white shadow-md ring-1 ring-emerald-400/40'
                  : 'bg-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Terms</span>
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-5 sm:p-6 space-y-4 max-h-[60vh] overflow-y-auto text-xs sm:text-sm text-slate-300 leading-relaxed">
          {activeTab === 'disclaimer' && (
            <div className="space-y-3.5 animate-in fade-in duration-150">
              <p>
                <strong className="text-white">Ethiopian Grade 9–12 Textbooks</strong> is a privately developed educational application and is{' '}
                <span className="text-emerald-400 font-extrabold">NOT affiliated with, endorsed by, or officially connected</span> to the Ministry of Education of Ethiopia or any government entity. The app is intended solely to provide convenient digital access to publicly available educational learning materials for reference purposes.
              </p>

              <p>
                The educational materials displayed in this app are collected from publicly accessible online sources, including the official public download section of the Ministry of Education of Ethiopia{' '}
                <a
                  href="https://www.anrseb.gov.et/downloads/textbooks/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sky-400 hover:underline inline-flex items-center gap-0.5 font-bold"
                >
                  website
                  <ExternalLink className="w-3 h-3 inline" />
                </a>{' '}
                and other clearly identified public educational platforms.
              </p>

              <p>
                This application does not claim ownership of any textbook content and does not grant any rights for commercial use, redistribution, or modification of the materials. All rights remain with the original content owners.
              </p>

              <p>
                If any content owner or legal authority believes that specific material should be removed, please contact us using the email provided, and we will review and take appropriate action promptly.
              </p>

              {/* Links metadata exactly matching user screenshot */}
              <div className="pt-2 border-t border-slate-800 space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-400">Website</span>
                  <a
                    href="https://moe.gov.et/en"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sky-400 hover:underline flex items-center gap-1 font-mono font-medium"
                  >
                    <span>https://moe.gov.et/en</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>

                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-400">Developer</span>
                  <a
                    href="mailto:qaroo24@gmail.com?subject=Ethiopian%20Textbooks%20Inquiry"
                    className="text-sky-400 hover:underline flex items-center gap-1.5 font-bold"
                  >
                    <img
                      src="/brand/lalion-logo.png"
                      alt="Lalion Logo"
                      className="w-3.5 h-3.5 rounded-full inline-block object-contain"
                    />
                    <span>Lalion</span>
                    <Mail className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'privacy' && (
            <div className="space-y-3.5 animate-in fade-in duration-150">
              <div className="p-3 bg-emerald-950/40 border border-emerald-800/50 rounded-2xl flex items-center gap-2 text-emerald-300 font-bold text-xs">
                <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
                <span>100% Student Privacy Guarantee: No Personal Data Tracking</span>
              </div>

              <div>
                <h4 className="font-bold text-white text-sm">1. Personal Information</h4>
                <p className="text-slate-300 text-xs mt-1">
                  We do not require user account registration for accessing curriculum books. We do not collect, store, or sell your name, phone number, email, or device location.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-white text-sm">2. Device Storage &amp; Offline Data</h4>
                <p className="text-slate-300 text-xs mt-1">
                  Your reading progress, book bookmarks, custom notes, and exam practice scores are stored locally in your browser/device IndexedDB and localStorage. You maintain full ownership and control over your data.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-white text-sm">3. Analytics &amp; Advertising</h4>
                <p className="text-slate-300 text-xs mt-1">
                  This educational portal is built strictly for student and teacher study. We do not integrate invasive third-party ad trackers or sell data to commercial brokers.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-white text-sm">4. Data Deletion</h4>
                <p className="text-slate-300 text-xs mt-1">
                  You can clear offline saved books and reset quiz progress at any time through the in-app storage manager or browser settings.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-white text-sm">5. Privacy Inquiries &amp; Support</h4>
                <p className="text-slate-300 text-xs mt-1">
                  If you have questions regarding privacy, data protection, or educational content, please contact us at{' '}
                  <a
                    href="mailto:qaroo24@gmail.com?subject=Privacy%20Inquiry%20-%20Ethiopian%20Textbooks"
                    className="text-sky-400 hover:underline font-bold inline-flex items-center gap-1"
                  >
                    <span>qaroo24@gmail.com</span>
                    <Mail className="w-3 h-3 inline" />
                  </a>.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'terms' && (
            <div className="space-y-3.5 animate-in fade-in duration-150">
              <div>
                <h4 className="font-bold text-white text-sm">Educational Fair Use</h4>
                <p className="text-slate-300 text-xs mt-1">
                  All textbooks, syllabi, teacher guides, and matriculation exam materials provided within this application are presented under the doctrine of educational fair use to support equal access to education for Ethiopian students across all regional states.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-white text-sm">Non-Commercial Usage</h4>
                <p className="text-slate-300 text-xs mt-1">
                  This application is free to use for individual learning and non-commercial classroom instruction. Users may not resell, package, or commercially exploit any educational content obtained through this service.
                </p>
              </div>

              <div>
                <h4 className="font-bold text-white text-sm">Copyright &amp; Intellectual Property</h4>
                <p className="text-slate-300 text-xs mt-1">
                  All intellectual property rights for textbooks belong to the Federal Democratic Republic of Ethiopia Ministry of Education (MOE) and relevant Regional State Education Bureaus.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Action Footer */}
        <div className="p-4 sm:p-6 bg-slate-950 border-t border-slate-800 flex flex-col gap-2">
          <button
            type="button"
            onClick={onAgree}
            className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-600 to-emerald-500 hover:from-emerald-500 hover:to-teal-400 active:scale-[0.98] text-white font-black text-sm sm:text-base shadow-lg shadow-emerald-600/30 transition-all flex items-center justify-center gap-2"
          >
            <CheckCircle2 className="w-5 h-5" />
            <span>Agree &amp; Continue</span>
          </button>
        </div>
      </div>
    </div>
  );
};
