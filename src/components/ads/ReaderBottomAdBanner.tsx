import React from 'react';
import { useNetworkStatus } from '../../hooks/useNetworkStatus';
import { ADMOB_CONFIG } from '../../services/adService';

interface ReaderBottomAdBannerProps {
  className?: string;
}

export const ReaderBottomAdBanner: React.FC<ReaderBottomAdBannerProps> = ({ className = '' }) => {
  const { isOnline } = useNetworkStatus();

  // ONLY show if mobile data / internet is OPEN (user is online).
  // If student data is closed / offline, do not display anything!
  if (!isOnline) {
    return null;
  }

  return (
    <div
      className={`w-full max-w-lg mx-auto z-30 pointer-events-auto animate-in fade-in slide-in-from-bottom duration-200 ${className}`}
    >
      <div className="bg-slate-900/95 dark:bg-slate-950/95 backdrop-blur-md border border-slate-800 rounded-2xl p-2 sm:p-2.5 shadow-2xl flex items-center justify-between gap-2.5">
        <div className="flex items-center gap-2 min-w-0">
          <span className="px-1.5 py-0.5 rounded bg-amber-500 text-slate-950 text-[9px] font-black uppercase tracking-wider shrink-0">
            Ad
          </span>
          <div className="min-w-0">
            <div className="text-xs font-black text-white truncate">
              Sponsored Student Resource
            </div>
            <div className="text-[10px] text-slate-400 truncate">
              National Examination &amp; High School Reference
            </div>
          </div>
        </div>

        <div className="px-2.5 py-1 bg-blue-500/15 border border-blue-500/30 text-sky-300 rounded-xl text-[10px] font-black shrink-0">
          Sponsored
        </div>
      </div>
    </div>
  );
};
