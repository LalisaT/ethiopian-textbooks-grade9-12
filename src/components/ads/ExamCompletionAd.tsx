import React from 'react';
import { Award, Sparkles } from 'lucide-react';
import { ADMOB_CONFIG } from '../../services/adService';

interface ExamCompletionAdProps {
  score: number;
  total: number;
  adUnitId?: string;
}

export const ExamCompletionAd: React.FC<ExamCompletionAdProps> = ({
  score,
  total,
  adUnitId = ADMOB_CONFIG.units.interstitial,
}) => {
  const percent = Math.round((score / total) * 100);

  return (
    <div className="rounded-3xl bg-gradient-to-br from-slate-900 via-slate-950 to-indigo-950 border border-amber-500/30 p-4 sm:p-5 text-left space-y-3 shadow-xl relative overflow-hidden">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-500/15 text-amber-400 border border-amber-500/30 text-[10px] font-black uppercase tracking-wider">
          <Sparkles className="w-3 h-3" />
          <span>Sponsored • Educational Opportunity</span>
        </div>
        <span className="text-[10px] font-bold text-slate-400">
          Partner
        </span>
      </div>

      <div className="flex items-start gap-3">
        <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-500 to-yellow-500 p-2 flex items-center justify-center text-slate-950 shadow-md shrink-0 font-black">
          <Award className="w-5 h-5" />
        </div>

        <div className="space-y-0.5 flex-1 min-w-0">
          <h4 className="text-sm font-black text-white truncate">
            University Admission &amp; Matric Scholarships
          </h4>
          <p className="text-xs text-slate-400 line-clamp-1">
            Top curated opportunities for Ethiopian high school graduates.
          </p>
        </div>
      </div>

      <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between gap-3">
        <div className="text-[11px] text-slate-400">
          Exam Score: <strong className="text-emerald-400">{percent}%</strong> • High-Yield Practice Complete
        </div>
        <div className="px-3 py-1 bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 font-bold text-xs rounded-xl">
          Sponsored
        </div>
      </div>
    </div>
  );
};
