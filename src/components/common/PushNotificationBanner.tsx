import React, { useEffect, useState } from 'react';
import {
  Bell,
  Volume2,
  X,
  ExternalLink,
  Sparkles,
  Award,
  BookOpen,
  ArrowRight,
} from 'lucide-react';
import { AppNotification, NotificationService } from '../../services/notificationService';

interface PushNotificationBannerProps {
  notification: AppNotification | null;
  onClose: () => void;
  onNavigate?: (notification: AppNotification) => void;
  durationMs?: number;
}

export const PushNotificationBanner: React.FC<PushNotificationBannerProps> = ({
  notification,
  onClose,
  onNavigate,
  durationMs = 9000,
}) => {
  const [progress, setProgress] = useState(100);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);

  useEffect(() => {
    if (!notification) return;

    setProgress(100);
    const startTime = Date.now();
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const remaining = Math.max(0, 100 - (elapsed / durationMs) * 100);
      setProgress(remaining);

      if (elapsed >= durationMs) {
        clearInterval(interval);
        onClose();
      }
    }, 50);

    return () => clearInterval(interval);
  }, [notification, durationMs, onClose]);

  if (!notification) return null;

  const handlePlaySound = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsAudioPlaying(true);
    NotificationService.playSound();
    NotificationService.vibrate();
    setTimeout(() => setIsAudioPlaying(false), 800);
  };

  const handleAction = () => {
    if (onNavigate) {
      onNavigate(notification);
    }
    onClose();
  };

  const getBadgeIcon = () => {
    if (notification.type === 'exam_alert') {
      return <Award className="w-4 h-4 text-amber-400" />;
    }
    if (notification.type === 'book_update') {
      return <BookOpen className="w-4 h-4 text-blue-400" />;
    }
    return <Bell className="w-4 h-4 text-amber-400 animate-bounce" />;
  };

  return (
    <aside
      aria-label="Push Alert"
      className="fixed top-4 left-1/2 -translate-x-1/2 z-[9999] w-[94vw] max-w-lg transition-all transform animate-in slide-in-from-top-6 fade-in duration-300"
    >
      <div className="relative overflow-hidden rounded-3xl bg-slate-950/95 backdrop-blur-2xl border border-slate-800 shadow-[0_25px_65px_rgba(0,0,0,0.85)] text-slate-100 p-4 sm:p-5 group">
        {/* Luxury top flowing runner */}
        <div className="luxury-flow-line h-[2px] absolute top-0 left-0 right-0 opacity-90 z-20" />
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-48 h-48 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex items-start gap-3.5 relative z-10">
          {/* Bell / Category Icon with Glow */}
          <div className="relative shrink-0">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600 border border-amber-400/40 text-slate-950 flex items-center justify-center shadow-lg shadow-amber-500/20 font-black">
              {getBadgeIcon()}
            </div>
            {/* Ping beacon */}
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-amber-500"></span>
            </span>
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0 pr-1">
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <span className="inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-wider text-amber-300 bg-amber-500/15 px-2.5 py-0.5 rounded-full border border-amber-500/30">
                <Sparkles className="w-3 h-3 text-amber-400" />
                <span>{notification.category || 'Official Broadcast'}</span>
              </span>
              {notification.grade && (
                <span className="text-[10px] font-bold text-sky-300 bg-sky-500/10 border border-sky-500/20 px-2 py-0.5 rounded-md">
                  {notification.grade}
                </span>
              )}
            </div>

            <h4 className="text-sm font-black text-white leading-snug truncate">
              {notification.title}
            </h4>
            <p className="text-xs text-slate-300 line-clamp-2 mt-1 leading-relaxed font-normal">
              {notification.body}
            </p>

            {/* Quick Actions Row */}
            <div className="flex items-center gap-2 mt-3 pt-1">
              <button
                type="button"
                onClick={handleAction}
                className="btn-luxury-active luxury-pressable luxury-sheen-sweep inline-flex items-center gap-1.5 px-3.5 py-1.5 text-amber-200 font-black text-xs rounded-xl shadow-md cursor-pointer transition-all"
              >
                <span>View Now</span>
                <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
              </button>

              <button
                type="button"
                onClick={handlePlaySound}
                title="Play notification chime sound"
                className={`btn-luxury-idle luxury-pressable inline-flex items-center gap-1.5 px-3 py-1.5 text-slate-300 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  isAudioPlaying ? 'border-amber-400 bg-amber-500/20 text-amber-300' : ''
                }`}
              >
                <Volume2 className={`w-3.5 h-3.5 ${isAudioPlaying ? 'animate-bounce text-amber-400' : 'text-amber-400'}`} />
                <span className="hidden sm:inline">Chime</span>
              </button>
            </div>
          </div>

          {/* Dismiss Button */}
          <button
            type="button"
            onClick={onClose}
            aria-label="Dismiss notification"
            className="p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors shrink-0 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Auto-Dismiss Progress Bar */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-slate-800/80">
          <div
            className="h-full bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 transition-all ease-linear shadow-[0_0_8px_rgba(245,158,11,0.5)]"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </aside>
  );
};
