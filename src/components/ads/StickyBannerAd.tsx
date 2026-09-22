import React from 'react';
import { ADMOB_CONFIG } from '../../services/adService';

interface StickyBannerAdProps {
  className?: string;
  adUnitId?: string;
}

export const StickyBannerAd: React.FC<StickyBannerAdProps> = ({
  className = '',
  adUnitId = ADMOB_CONFIG.units.banner,
}) => {
  return (
    <div
      className={`w-full max-w-lg mx-auto px-3.5 py-2 rounded-2xl bg-slate-900/90 dark:bg-slate-900/95 border border-slate-800 shadow-sm flex items-center justify-between gap-3 text-left backdrop-blur-md ${className}`}
    >
      <div className="flex items-center gap-2 min-w-0">
        <span className="px-1.5 py-0.5 rounded bg-amber-500 text-slate-950 text-[9px] font-black uppercase tracking-wider shrink-0">
          Ad
        </span>
        <div className="min-w-0">
          <div className="font-extrabold text-xs text-white truncate">
            Sponsored Learning Partner
          </div>
          <div className="text-[10px] text-slate-400 truncate">
            Empowering Ethiopian Secondary &amp; Preparatory Education
          </div>
        </div>
      </div>

      <div className="px-3 py-1 bg-blue-500/20 border border-blue-500/40 text-sky-300 font-black text-[11px] rounded-xl shrink-0">
        Sponsored
      </div>
    </div>
  );
};
