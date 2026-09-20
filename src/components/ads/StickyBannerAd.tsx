import React from 'react';
import { ExternalLink, Sparkles } from 'lucide-react';
import { AdService } from '../../services/adService';

interface StickyBannerAdProps {
  className?: string;
}

export const StickyBannerAd: React.FC<StickyBannerAdProps> = ({ className = '' }) => {
  const sponsor = AdService.getFeaturedSponsor(0);

  return (
    <div
      className={`w-full max-w-lg mx-auto px-3 py-1.5 rounded-2xl bg-slate-900/90 dark:bg-slate-900/95 border border-slate-800 shadow-sm flex items-center justify-between gap-3 text-left backdrop-blur-md ${className}`}
    >
      <div className="flex items-center gap-2 min-w-0">
        <span className="px-1.5 py-0.2 rounded-md bg-amber-500/20 text-amber-300 text-[9px] font-black uppercase tracking-wider shrink-0">
          Ad
        </span>
        <div className="min-w-0">
          <div className="font-extrabold text-xs text-white truncate">
            {sponsor.title}
          </div>
          <div className="text-[10px] text-slate-400 truncate">
            {sponsor.subtitle}
          </div>
        </div>
      </div>

      <a
        href={sponsor.targetUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="px-3 py-1 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-[11px] rounded-xl shadow-xs transition-transform active:scale-95 flex items-center gap-1 shrink-0"
      >
        <span>{sponsor.ctaText}</span>
        <ExternalLink className="w-2.5 h-2.5" />
      </a>
    </div>
  );
};
