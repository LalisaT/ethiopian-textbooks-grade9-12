import React from 'react';
import { ExternalLink, Star, ShieldCheck, Zap, GraduationCap, Award } from 'lucide-react';
import { EducationalSponsor } from '../../services/adService';

interface NativeAdCardProps {
  sponsor: EducationalSponsor;
  className?: string;
}

export const NativeAdCard: React.FC<NativeAdCardProps> = ({ sponsor, className = '' }) => {
  const IconComponent =
    sponsor.iconName === 'Zap'
      ? Zap
      : sponsor.iconName === 'GraduationCap'
      ? GraduationCap
      : Award;

  return (
    <div
      className={`relative overflow-hidden rounded-3xl bg-slate-900/90 dark:bg-slate-900/95 border border-slate-800 hover:border-emerald-500/40 shadow-xl transition-all duration-200 p-4 sm:p-5 group ${className}`}
    >
      {/* Subtle top Ethiopian ribbon */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 via-amber-500 to-teal-500 opacity-80" />

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3.5 min-w-0">
          {/* Sponsor Icon Badge */}
          <div
            className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${sponsor.highlightColor} p-2.5 flex items-center justify-center text-white shadow-lg shrink-0 group-hover:scale-105 transition-transform`}
          >
            <IconComponent className="w-6 h-6" />
          </div>

          <div className="space-y-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-2 py-0.5 rounded-md bg-amber-500/15 text-amber-400 border border-amber-500/30 text-[10px] font-black uppercase tracking-wider">
                Sponsored
              </span>
              <span className="text-[11px] font-bold text-slate-400">
                {sponsor.badge}
              </span>
              {sponsor.rating && (
                <div className="flex items-center gap-1 text-[11px] font-bold text-amber-300">
                  <Star className="w-3 h-3 fill-current text-amber-400" />
                  <span>{sponsor.rating}</span>
                </div>
              )}
            </div>

            <h4 className="text-sm sm:text-base font-black text-white group-hover:text-emerald-400 transition-colors truncate">
              {sponsor.title}
            </h4>

            <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
              {sponsor.description}
            </p>
          </div>
        </div>

        {/* CTA Button */}
        <a
          href={sponsor.targetUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full sm:w-auto px-5 py-2.5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 active:scale-95 text-slate-950 font-black text-xs shadow-md shadow-emerald-500/20 transition-all flex items-center justify-center gap-1.5 shrink-0"
        >
          <span>{sponsor.ctaText}</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>
    </div>
  );
};
