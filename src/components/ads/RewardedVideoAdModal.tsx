import React, { useState, useEffect, useRef } from 'react';
import { X, Play, Volume2, VolumeX, CheckCircle2, AlertTriangle, Sparkles, Award } from 'lucide-react';
import confetti from 'canvas-confetti';
import { ADMOB_CONFIG } from '../../services/adService';

interface RewardedVideoAdModalProps {
  isOpen: boolean;
  onClose: () => void;
  onRewardEarned: () => void;
  questionCount?: number;
  subjectOrTitle?: string;
}

export const RewardedVideoAdModal: React.FC<RewardedVideoAdModalProps> = ({
  isOpen,
  onClose,
  onRewardEarned,
  questionCount = 25,
  subjectOrTitle = 'Curriculum Exam',
}) => {
  const [secondsLeft, setSecondsLeft] = useState(5);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [showExitWarning, setShowExitWarning] = useState(false);
  const timerRef = useRef<any>(null);

  const TOTAL_DURATION = 5;

  useEffect(() => {
    if (isOpen) {
      setSecondsLeft(TOTAL_DURATION);
      setIsCompleted(false);
      setShowExitWarning(false);

      timerRef.current = setInterval(() => {
        setSecondsLeft((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current);
            setIsCompleted(true);
            try {
              confetti({ particleCount: 30, spread: 60, origin: { y: 0.6 } });
            } catch {}
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const progressPercent = Math.min(100, Math.round(((TOTAL_DURATION - secondsLeft) / TOTAL_DURATION) * 100));

  const handleClaimAndStart = () => {
    onRewardEarned();
    onClose();
  };

  const handleAttemptClose = () => {
    if (isCompleted) {
      handleClaimAndStart();
    } else {
      setShowExitWarning(true);
    }
  };

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-3 sm:p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-slate-950 rounded-3xl max-w-lg w-full border border-slate-800 shadow-2xl overflow-hidden flex flex-col relative text-white animate-in zoom-in-95 duration-200">
        {/* Top AdMob Header */}
        <div className="px-4 py-3 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded-md bg-amber-500 text-slate-950 text-[10px] font-black uppercase tracking-wider">
              Ad
            </span>
            <span className="text-xs font-bold text-slate-300">
              Google AdMob • Rewarded Video
            </span>
          </div>

          <div className="flex items-center gap-2">
            {/* Audio Toggle */}
            <button
              onClick={() => setIsMuted(!isMuted)}
              className="p-1.5 rounded-xl bg-slate-800 text-slate-300 hover:text-white transition-colors"
              title={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
            </button>

            {/* Close Button */}
            <button
              onClick={handleAttemptClose}
              className="p-1.5 rounded-xl bg-slate-800 text-slate-400 hover:text-white transition-colors"
              title="Close Ad"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Video Player Display */}
        <div className="relative aspect-video w-full bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-950 flex flex-col items-center justify-center p-6 text-center overflow-hidden">
          {/* Animated Background Visual */}
          <div className="absolute inset-0 opacity-20 pointer-events-none">
            <div className="absolute -top-10 -left-10 w-48 h-48 bg-emerald-500 rounded-full blur-3xl animate-pulse" />
            <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-amber-500 rounded-full blur-3xl animate-pulse" />
          </div>

          {!isCompleted ? (
            <div className="relative z-10 space-y-3">
              <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center mx-auto shadow-lg animate-bounce">
                <Play className="w-6 h-6 fill-current" />
              </div>

              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/80 border border-slate-800 text-xs font-bold text-amber-400 mb-1">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Reward: Unlock {questionCount} Practice Questions</span>
                </div>
                <h4 className="text-sm sm:text-base font-black text-white">
                  Sponsored Video in Progress
                </h4>
                <p className="text-[11px] text-slate-400">
                  Unit: {ADMOB_CONFIG.units.rewardedVideo}
                </p>
              </div>

              {/* Countdown Badge */}
              <div className="inline-block px-4 py-1.5 rounded-2xl bg-slate-900 border border-slate-700 text-xs font-black text-white shadow-md">
                Reward in <span className="text-emerald-400 font-mono text-sm">{secondsLeft}s</span>
              </div>
            </div>
          ) : (
            <div className="relative z-10 space-y-3 animate-in zoom-in-95 duration-200">
              <div className="w-16 h-16 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center mx-auto shadow-xl">
                <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
              </div>

              <div>
                <h4 className="text-base sm:text-lg font-black text-emerald-400">
                  Reward Earned!
                </h4>
                <p className="text-xs text-slate-300">
                  Your access to {questionCount} questions for {subjectOrTitle} is fully unlocked!
                </p>
              </div>
            </div>
          )}

          {/* Video Linear Progress Bar */}
          <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-slate-800">
            <div
              className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-300 shadow-sm"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Footer Action */}
        <div className="p-4 bg-slate-900/90 border-t border-slate-800 flex items-center justify-between gap-3">
          <div className="text-[11px] text-slate-400">
            {!isCompleted ? (
              <span>Watch full video to unlock your exam questions</span>
            ) : (
              <span className="text-emerald-400 font-bold">Ready to start your exam</span>
            )}
          </div>

          <button
            onClick={isCompleted ? handleClaimAndStart : handleAttemptClose}
            disabled={!isCompleted}
            className={`px-5 py-2.5 rounded-2xl font-black text-xs transition-all active:scale-95 flex items-center gap-1.5 ${
              isCompleted
                ? 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-lg shadow-emerald-500/25 cursor-pointer'
                : 'bg-slate-800 text-slate-500 cursor-not-allowed opacity-60'
            }`}
          >
            <Award className="w-4 h-4" />
            <span>{isCompleted ? 'Start Questions Now' : `Wait ${secondsLeft}s`}</span>
          </button>
        </div>

        {/* Early Exit Warning Overlay */}
        {showExitWarning && !isCompleted && (
          <div className="absolute inset-0 z-20 bg-slate-950/95 backdrop-blur-md p-6 flex flex-col items-center justify-center text-center space-y-4 animate-in fade-in duration-150">
            <div className="w-12 h-12 rounded-2xl bg-rose-500/20 text-rose-400 flex items-center justify-center">
              <AlertTriangle className="w-6 h-6" />
            </div>

            <div className="space-y-1 max-w-sm">
              <h4 className="text-base font-black text-white">
                Reward Not Granted Yet
              </h4>
              <p className="text-xs text-slate-300">
                You must finish viewing the video ad ({secondsLeft}s remaining) to access and solve the {questionCount} questions.
              </p>
            </div>

            <div className="flex items-center gap-2.5 w-full max-w-xs pt-2">
              <button
                onClick={() => setShowExitWarning(false)}
                className="flex-1 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs transition-all active:scale-95"
              >
                Keep Watching ({secondsLeft}s)
              </button>

              <button
                onClick={() => {
                  setShowExitWarning(false);
                  onClose();
                }}
                className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition-all"
              >
                Exit
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
