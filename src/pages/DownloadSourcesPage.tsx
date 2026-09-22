import React from 'react';
import { ETHIOPIAN_DOWNLOAD_SOURCES } from '../data/downloadSources';
import { useTranslation } from '../i18n/useTranslation';
import {
  DownloadCloud,
  ExternalLink,
  Send,
  Globe,
  ShieldCheck,
  BookOpen,
  Sparkles,
  Layers,
  FileCheck,
  Flame,
  CheckCircle2,
  Target,
  Landmark,
} from 'lucide-react';

export const DownloadSourcesPage: React.FC = () => {
  const { t, language } = useTranslation();

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

  const telegramSources = ETHIOPIAN_DOWNLOAD_SOURCES.filter((s) => s.category === 'telegram');
  const portalSources = ETHIOPIAN_DOWNLOAD_SOURCES.filter((s) => s.category === 'portal');
  const moeSources = ETHIOPIAN_DOWNLOAD_SOURCES.filter((s) => s.category === 'official_moe');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Hero Banner */}
      <div className="rounded-3xl bg-gradient-to-br from-slate-950 via-slate-900 to-sky-950 text-white p-8 sm:p-12 border border-slate-800 shadow-xl space-y-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
          <DownloadCloud className="w-64 h-64" />
        </div>

        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-sky-500/20 text-sky-300 rounded-full border border-sky-500/30 text-xs font-bold">
            <Flame className="w-3.5 h-3.5 text-sky-400" />
            <span>Fastest Telegram Channels & Official Download Portals</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight">
            Ethiopian Student Textbooks Download Hub <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-blue-400 to-indigo-300">
              Grade 1 to 12 (New & Old Curriculum)
            </span>
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Download full original PDF copies of Ethiopian student textbooks and Teacher Guides directly via <strong>@ethiopian_text_book</strong>, <strong>@newbooknow</strong>, <strong>@textbooksEthiopia</strong>, <strong>Kehulum</strong>, <strong>EthiopiaTemari</strong>, and the <strong>Ministry of Education (MoE)</strong> portal.
          </p>

          <div className="flex flex-wrap gap-2 pt-2">
            <a
              href="https://t.me/ethiopian_text_book"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 bg-sky-500 hover:bg-sky-400 text-slate-950 font-black text-xs rounded-xl shadow-lg transition-transform active:scale-95 flex items-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>Join @ethiopian_text_book</span>
            </a>

            <a
              href="https://t.me/newbooknow"
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white font-bold text-xs rounded-xl border border-white/20 transition-transform active:scale-95 flex items-center gap-2"
            >
              <Send className="w-4 h-4 text-sky-400" />
              <span>Join @newbooknow</span>
            </a>
          </div>
        </div>
      </div>

      {/* 1. Telegram Channels (Fastest for Mobile Downloads) */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-sky-50 dark:bg-sky-950 text-sky-600 dark:text-sky-400">
              <Send className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                1. Telegram Channels (Fastest for Direct Mobile Downloads)
              </h2>
              <p className="text-xs text-slate-500">
                Join or open these Telegram channels to download full subject PDF files or link bundles with 1 click
              </p>
            </div>
          </div>
          <span className="hidden sm:inline-block px-3 py-1 bg-sky-100 dark:bg-sky-950 text-sky-700 dark:text-sky-300 font-extrabold text-xs rounded-full">
            Recommended
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {telegramSources.map((src) => (
            <div
              key={src.id}
              className={`rounded-3xl p-6 border shadow-sm transition-all flex flex-col justify-between ${
                src.isPopular
                  ? 'bg-sky-50/70 dark:bg-sky-950/40 border-sky-300 dark:border-sky-800 shadow-md ring-1 ring-sky-300 dark:ring-sky-800'
                  : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 hover:border-sky-400'
              }`}
            >
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="px-2.5 py-0.5 bg-sky-100 dark:bg-sky-900 text-sky-800 dark:text-sky-200 font-black text-[10px] rounded-full">
                    {src.badge}
                  </span>
                  <span className="font-mono text-xs font-black text-sky-600 dark:text-sky-400">
                    {src.telegramHandle}
                  </span>
                </div>

                <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                  {getSourceName(src)}
                </h3>

                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-3">
                  {getSourceDesc(src)}
                </p>

                <div className="p-2.5 bg-white/80 dark:bg-slate-950/60 rounded-xl border border-sky-200/50 dark:border-sky-900/50 text-[11px] text-sky-800 dark:text-sky-300 font-medium flex items-center gap-1.5">
                  <Target className="w-3.5 h-3.5 text-sky-500 shrink-0" />
                  <span><strong>Best for:</strong> {src.recommendedFor}</span>
                </div>
              </div>

              <a
                href={src.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 w-full py-3 bg-sky-500 hover:bg-sky-600 active:scale-95 text-white font-extrabold text-xs rounded-2xl transition-all shadow-sm flex items-center justify-center gap-2"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Open {src.telegramHandle} in Telegram</span>
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* 2. Dedicated Educational Portals */}
      <section className="space-y-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-sky-400">
            <Globe className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              2. Dedicated Educational Portals (Direct PDF Web Downloads)
            </h2>
            <p className="text-xs text-slate-500">
              Organized by Grade 1–12, New/Old Curriculum, and Teacher Guides
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {portalSources.map((src) => (
            <div
              key={src.id}
              className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl hover:border-blue-500 transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-sky-300 font-extrabold text-xs rounded-full">
                    {src.badge}
                  </span>
                  <span className="text-[11px] font-semibold text-slate-400">{src.coverage}</span>
                </div>

                <h3 className="text-lg font-black text-slate-900 dark:text-white">
                  {getSourceName(src)}
                </h3>

                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {getSourceDesc(src)}
                </p>

                <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-100 dark:border-slate-800 text-[11px] text-blue-700 dark:text-sky-300 font-medium">
                  ⭐ <strong>Best for:</strong> {src.recommendedFor}
                </div>
              </div>

              <a
                href={src.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 w-full py-3 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-extrabold text-xs rounded-2xl transition-all shadow-md flex items-center justify-center gap-2 shadow-blue-600/25"
              >
                <span>Download on {src.name.split(' ')[0]}</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Official Government & Digital Library Portals */}
      <section className="space-y-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-blue-50 dark:bg-blue-950 text-blue-600 dark:text-blue-400">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              3. Official Government & Digital Library Portals
            </h2>
            <p className="text-xs text-slate-500">
              Ministry of Education (MoE) Federal repositories and digital library
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {moeSources.map((src) => (
            <div
              key={src.id}
              className="bg-white dark:bg-slate-900 rounded-3xl p-6 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl hover:border-blue-500 transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 font-extrabold text-xs rounded-full">
                    {src.badge}
                  </span>
                  <span className="text-[11px] font-semibold text-slate-400">{src.coverage}</span>
                </div>

                <h3 className="text-lg font-black text-slate-900 dark:text-white">
                  {getSourceName(src)}
                </h3>

                <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                  {getSourceDesc(src)}
                </p>

                <div className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-100 dark:border-slate-800 text-[11px] text-blue-700 dark:text-blue-300 font-medium flex items-center gap-1.5">
                  <Landmark className="w-3.5 h-3.5 text-blue-500 shrink-0" />
                  <span><strong>Official Portal:</strong> {src.recommendedFor}</span>
                </div>
              </div>

              <a
                href={src.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 w-full py-3 bg-blue-600 hover:bg-blue-700 active:scale-95 text-white font-extrabold text-xs rounded-2xl transition-all shadow-md flex items-center justify-center gap-2"
              >
                <span>Visit {src.name.split(' ')[0]} Portal</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
