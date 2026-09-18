import React from 'react';
import { Volume2, VolumeX, FastForward, Play, Pause, X } from 'lucide-react';
import { useTranslation } from '../../i18n/useTranslation';

interface AudioPlayerControlProps {
  isPlaying: boolean;
  onStop: () => void;
  title: string;
}

export const AudioPlayerControl: React.FC<AudioPlayerControlProps> = ({
  isPlaying,
  onStop,
  title,
}) => {
  const { t } = useTranslation();

  if (!isPlaying) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 bg-slate-900/95 text-white rounded-3xl p-4 shadow-2xl border border-emerald-500/50 backdrop-blur-xl flex items-center gap-4 max-w-sm animate-in slide-in-from-bottom-4 duration-300">
      <div className="w-10 h-10 rounded-2xl bg-emerald-500 flex items-center justify-center text-slate-950 font-bold shrink-0 animate-pulse">
        <Volume2 className="w-5 h-5 text-white" />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider">
            Audio Reader Active
          </span>
        </div>
        <div className="text-xs font-semibold text-slate-200 truncate mt-0.5">
          {title}
        </div>
      </div>

      <button
        onClick={onStop}
        className="p-2 rounded-xl bg-slate-800 hover:bg-rose-600 text-slate-300 hover:text-white transition-colors"
        title="Stop Speech"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};
