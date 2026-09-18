import React, { useState } from 'react';
import { Book } from '../../types/book';
import { ETHIOPIAN_DOWNLOAD_SOURCES } from '../../data/downloadSources';
import { CloudStorageService } from '../../services/cloudStorageService';
import { useTranslation } from '../../i18n/useTranslation';
import {
  X,
  ExternalLink,
  DownloadCloud,
  Send,
  Globe,
  ShieldCheck,
  BookOpen,
  Sparkles,
  Flame,
  CheckCircle2,
  Zap,
  HardDrive,
  Cloud,
} from 'lucide-react';

interface DownloadSourcesModalProps {
  isOpen: boolean;
  onClose: () => void;
  book?: Book | null;
  onOpenInApp?: (book: Book) => void;
}

export const DownloadSourcesModal: React.FC<DownloadSourcesModalProps> = ({
  isOpen,
  onClose,
  book,
  onOpenInApp,
}) => {
  const { t, language } = useTranslation();
  const [downloadProgress, setDownloadProgress] = useState<number | null>(null);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  if (!isOpen) return null;

  const handleDownloadSample = async () => {
    if (!book) return;
    setDownloadProgress(10);
    setDownloadSuccess(false);

    const result = await CloudStorageService.downloadAndSaveBookToDevice(book, (pct) => {
      setDownloadProgress(pct);
    });

    if (result.success) {
      setDownloadSuccess(true);
      setTimeout(() => {
        setDownloadProgress(null);
      }, 4000);
    } else {
      setDownloadProgress(null);
      alert('Failed to save book to device. Please check storage space.');
    }
  };

  const getSourceDesc = (s: typeof ETHIOPIAN_DOWNLOAD_SOURCES[0]) => {
    if (language === 'am') return s.descriptionAmharic;
    if (language === 'om') return s.descriptionOromo;
    return s.description;
  };

  const getSourceName = (s: typeof ETHIOPIAN_DOWNLOAD_SOURCES[0]) => {
    if (language === 'am') return s.nameAmharic;
    if (language === 'om') return s.nameOromo;
    return s.name;
  };

  const directMirrors = book ? CloudStorageService.getDownloadMirrors(book) : [];
  const telegramSources = ETHIOPIAN_DOWNLOAD_SOURCES.filter((s) => s.category === 'telegram');
  const portalSources = ETHIOPIAN_DOWNLOAD_SOURCES.filter((s) => s.category === 'portal');
  const moeSources = ETHIOPIAN_DOWNLOAD_SOURCES.filter((s) => s.category === 'official_moe');

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-3xl w-full shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col my-auto max-h-[90vh]">
        {/* Header */}
        <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-950">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-600 text-white flex items-center justify-center font-bold">
              <DownloadCloud className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-base text-slate-900 dark:text-white">
                Download PDF Copies & Cloud Mirrors
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {book
                  ? `Direct CDN & Cloud Mirrors for: ${book.title}`
                  : 'Official Educational Portals, MoE Digital Libraries & Telegram Channels'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 sm:p-8 flex-1 overflow-y-auto space-y-8">
          {/* Specific Book Direct Download / Sample Offline Caching */}
          {book && (
            <div className="p-5 rounded-3xl bg-gradient-to-br from-emerald-600 to-teal-800 text-white shadow-xl space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <span className="px-2.5 py-1 bg-white/20 backdrop-blur-md rounded-lg text-xs font-bold uppercase tracking-wider">
                    Grade {book.grade} • {book.subject.replace('_', ' ').toUpperCase()}
                  </span>
                  <h4 className="text-lg font-black mt-1">{book.title}</h4>
                  <p className="text-xs text-white/80 mt-0.5">
                    {book.totalUnits} Units • ~{book.totalEstimatedPages} Pages • {book.fileSizeMb} MB
                  </p>
                </div>

                <div className="shrink-0 flex items-center gap-2">
                  <button
                    onClick={handleDownloadSample}
                    disabled={downloadProgress !== null}
                    className="px-4 py-2.5 rounded-2xl bg-white text-emerald-800 font-extrabold text-xs shadow-lg hover:bg-emerald-50 active:scale-95 transition-all flex items-center gap-2"
                  >
                    {downloadSuccess ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        <span>Saved to Phone & App!</span>
                      </>
                    ) : downloadProgress !== null ? (
                      <>
                        <Sparkles className="w-4 h-4 animate-spin text-emerald-600" />
                        <span>Downloading ({downloadProgress}%)...</span>
                      </>
                    ) : (
                      <>
                        <HardDrive className="w-4 h-4 text-emerald-700" />
                        <span>Save to Phone Storage</span>
                      </>
                    )}
                  </button>

                  {downloadSuccess && onOpenInApp && (
                    <button
                      onClick={() => {
                        onClose();
                        onOpenInApp(book);
                      }}
                      className="px-4 py-2.5 rounded-2xl bg-emerald-950 text-white font-extrabold text-xs shadow-lg hover:bg-black active:scale-95 transition-all flex items-center gap-1.5 border border-emerald-500/40 animate-pulse"
                    >
                      <BookOpen className="w-4 h-4 text-emerald-400" />
                      <span>Read in App</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Progress bar */}
              {downloadProgress !== null && (
                <div className="w-full bg-white/20 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-white h-full transition-all duration-300"
                    style={{ width: `${downloadProgress}%` }}
                  />
                </div>
              )}

              {/* Direct CDN & Cloud Mirrors */}
              <div className="pt-2 border-t border-white/20">
                <span className="text-xs font-bold uppercase tracking-wider text-white/90 block mb-2">
                  ⚡ Direct Cloud & CDN Download Mirrors
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {directMirrors.slice(0, 4).map((mirror, idx) => (
                    <a
                      key={idx}
                      href={mirror.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-2xl bg-white/10 hover:bg-white/20 backdrop-blur-md transition-all border border-white/15 flex items-center justify-between text-xs font-semibold"
                    >
                      <span className="truncate">{mirror.name}</span>
                      <ExternalLink className="w-3.5 h-3.5 shrink-0 ml-1 opacity-70" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Quick Notice */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-sky-50 to-emerald-50 dark:from-sky-950/40 dark:to-emerald-950/40 border border-sky-200 dark:border-sky-800/60 text-xs text-slate-700 dark:text-slate-300 flex items-start gap-3">
            <HardDrive className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <strong className="text-emerald-800 dark:text-emerald-300 font-bold">
                📱 Mobile Device Storage & In-App Offline Reading:
              </strong>{' '}
              When you download via Telegram, Google Drive, or Direct Mirrors, the textbook saves into your phone's <strong>Downloads</strong> storage. You can then open and study any of these PDFs right inside this app without using any mobile data!
            </div>
          </div>

          {/* 1. Telegram Channels */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400">
                <Send className="w-4 h-4 text-sky-500" />
                <span>1. Telegram Channels (Fast Direct Mobile Downloads)</span>
              </div>
              <span className="text-[11px] font-bold text-sky-600 bg-sky-50 dark:bg-sky-950 px-2 py-0.5 rounded-md">
                Fast Mobile Direct
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {telegramSources.map((src) => (
                <a
                  key={src.id}
                  href={src.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`p-4 rounded-2xl border transition-all flex flex-col justify-between group ${
                    src.isPopular
                      ? 'bg-sky-50/80 dark:bg-sky-950/30 border-sky-300 dark:border-sky-800 shadow-xs hover:border-sky-500'
                      : 'bg-slate-50 dark:bg-slate-800/40 border-slate-200 dark:border-slate-800 hover:border-sky-400'
                  }`}
                >
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between">
                      <span className="px-2 py-0.5 bg-sky-100 dark:bg-sky-900 text-sky-800 dark:text-sky-200 font-black text-[10px] rounded-full">
                        {src.badge}
                      </span>
                      <span className="font-mono text-xs font-black text-sky-600 dark:text-sky-400">
                        {src.telegramHandle}
                      </span>
                    </div>

                    <h4 className="font-extrabold text-sm text-slate-900 dark:text-white group-hover:text-sky-600 transition-colors flex items-center justify-between">
                      <span>{getSourceName(src)}</span>
                      <Send className="w-3.5 h-3.5 text-sky-500 opacity-80 group-hover:opacity-100 group-hover:translate-x-0.5 transition-transform" />
                    </h4>

                    <p className="text-[11px] text-slate-600 dark:text-slate-400 leading-relaxed">
                      {getSourceDesc(src)}
                    </p>
                  </div>

                  <div className="text-[11px] text-sky-600 dark:text-sky-400 font-bold mt-3 pt-2 border-t border-sky-200/50 dark:border-sky-800/50 flex items-center justify-between">
                    <span>Open {src.telegramHandle}</span>
                    <span>→</span>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* 2. Dedicated Educational Portals */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400">
              <Globe className="w-4 h-4 text-emerald-500" />
              <span>2. Dedicated Educational Portals (Direct Web Downloads)</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {portalSources.map((src) => (
                <a
                  key={src.id}
                  href={src.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 hover:bg-emerald-50/60 dark:hover:bg-emerald-950/40 border border-slate-200 dark:border-slate-800 hover:border-emerald-400 transition-all flex flex-col justify-between group"
                >
                  <div className="space-y-1.5">
                    <span className="px-2 py-0.5 bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-extrabold text-[10px] rounded-full">
                      {src.badge}
                    </span>
                    <h4 className="font-extrabold text-sm text-slate-900 dark:text-white group-hover:text-emerald-600 transition-colors flex items-center justify-between">
                      <span>{getSourceName(src)}</span>
                      <ExternalLink className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100" />
                    </h4>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-2">
                      {getSourceDesc(src)}
                    </p>
                  </div>

                  <div className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold mt-3 pt-2 border-t border-slate-200/60 dark:border-slate-700">
                    Open {src.name.split(' ')[0]} →
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* 3. Official Government & Digital Library Portals */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-400">
              <ShieldCheck className="w-4 h-4 text-blue-500" />
              <span>3. Official Ministry of Education Portals</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {moeSources.map((src) => (
                <a
                  key={src.id}
                  href={src.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 hover:bg-blue-50/60 dark:hover:bg-blue-950/40 border border-slate-200 dark:border-slate-800 hover:border-blue-400 transition-all flex flex-col justify-between group"
                >
                  <div className="space-y-1.5">
                    <span className="px-2 py-0.5 bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 font-extrabold text-[10px] rounded-full">
                      {src.badge}
                    </span>
                    <h4 className="font-extrabold text-sm text-slate-900 dark:text-white group-hover:text-blue-600 transition-colors flex items-center justify-between">
                      <span>{getSourceName(src)}</span>
                      <ExternalLink className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100" />
                    </h4>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400">
                      {getSourceDesc(src)}
                    </p>
                  </div>

                  <div className="text-[10px] text-blue-600 dark:text-blue-400 font-bold mt-3 pt-2 border-t border-slate-200/60 dark:border-slate-700">
                    Visit Official Portal →
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 flex items-center justify-between text-xs text-slate-400">
          <span>All channels and portals link directly to genuine curriculum documents.</span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl font-bold text-xs hover:bg-slate-800"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
