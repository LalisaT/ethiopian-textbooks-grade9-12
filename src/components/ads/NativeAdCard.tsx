import React from 'react';
import { Sparkles, ExternalLink } from 'lucide-react';
import { ADMOB_CONFIG } from '../../services/adService';

interface NativeAdCardProps {
  className?: string;
  adUnitId?: string;
}

export const NativeAdCard: React.FC<NativeAdCardProps> = ({
  className = '',
  adUnitId = ADMOB_CONFIG.units.nativeAdvanced,
}) => {
  return (
    <div
      className={`relative overflow-hidden rounded-3xl bg-slate-900/90 dark:bg-slate-900/95 border border-slate-800 hover:border-emerald-500/40 shadow-xl transition-all duration-200 p-4 sm:p-5 group ${className}`}
    >
      {/* Top subtle Ethiopian accent */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 via-amber-500 to-teal-500 opacity-80" />

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3.5 min-w-0">
          {/* AdMob Visual Icon Box */}
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-500 via-orange-500 to-emerald-600 p-2.5 flex items-center justify-center text-slate-950 font-black text-xs shadow-lg shrink-0 group-hover:scale-105 transition-transform">
            <span className="font-black text-sm text-slate-950">Ad</span>
          </div>

          <div className="space-y-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-2 py-0.5 rounded-md bg-amber-500/15 text-amber-400 border border-amber-500/30 text-[10px] font-black uppercase tracking-wider">
                Ad
              </span>
              <span className="text-[11px] font-bold text-slate-400">
                Google AdMob Native Unit
              </span>
            </div>

            <h4 className="text-sm sm:text-base font-black text-white group-hover:text-emerald-400 transition-colors truncate">
              Google AdMob Responsive Placement
            </h4>

            <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed font-mono">
              Ad Unit ID: {adUnitId}
            </p>
          </div>
        </div>

        {/* CTA Button */}
        <div className="w-full sm:w-auto px-5 py-2.5 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-black text-xs transition-all flex items-center justify-center gap-1.5 shrink-0">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>Sponsored Space</span>
        </div>
      </div>
    </div>
  );
};
