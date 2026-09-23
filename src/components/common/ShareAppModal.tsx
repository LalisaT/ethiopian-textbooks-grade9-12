import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { X, Copy, Check, Share2, Send, MessageCircle, Globe } from 'lucide-react';
import { Capacitor } from '@capacitor/core';
import { Share } from '@capacitor/share';
import { BrandLogo } from './BrandLogo';

interface ShareAppModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  subtitle?: string;
  shareUrl?: string;
  shareText?: string;
}

export const ShareAppModal: React.FC<ShareAppModalProps> = ({
  isOpen,
  onClose,
  title = 'Share App',
  subtitle = 'Grades 9–12 • EUEE Prep & Textbooks',
  shareUrl = 'https://play.google.com/store/apps/details?id=com.ethiopian.grade912textbooks',
  shareText = 'Download Ethiopian Textbooks (Grades 9–12) - Free Official New Curriculum Textbooks, Teacher Guides & EUEE Practice Hub:',
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen || typeof document === 'undefined') return null;

  const handleCopyLink = async () => {
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        await navigator.clipboard.writeText(shareUrl);
      } else {
        const textArea = document.createElement('textarea');
        textArea.value = shareUrl;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (err) {
      console.error('Failed to copy link:', err);
    }
  };

  const handleShareTelegram = () => {
    const telegramUrl = `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(
      shareText
    )}`;
    window.open(telegramUrl, '_blank', 'noopener,noreferrer');
  };

  const handleShareFacebook = () => {
    const fbUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
    window.open(fbUrl, '_blank', 'noopener,noreferrer');
  };

  const handleShareWhatsApp = () => {
    const waUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(
      shareText + '\n' + shareUrl
    )}`;
    window.open(waUrl, '_blank', 'noopener,noreferrer');
  };

  const handleShareTwitter = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
      shareUrl
    )}&text=${encodeURIComponent(shareText)}`;
    window.open(twitterUrl, '_blank', 'noopener,noreferrer');
  };

  const handleMoreApps = async () => {
    try {
      if (Capacitor.isNativePlatform()) {
        await Share.share({
          title,
          text: shareText,
          url: shareUrl,
          dialogTitle: 'Share with Classmates',
        });
      } else if (navigator.share) {
        await navigator.share({
          title,
          text: shareText,
          url: shareUrl,
        });
      } else {
        handleCopyLink();
      }
    } catch (err) {
      console.warn('Share dismissed or cancelled:', err);
    }
  };

  return createPortal(
    <div className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center sm:p-4">
      {/* Dark backdrop */}
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity duration-200"
        onClick={onClose}
      />

      {/* Bottom Sheet / Modal Dialog (matches user screenshot exactly) */}
      <div
        className="relative w-full sm:max-w-md bg-white dark:bg-slate-900 rounded-t-[28px] sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col z-10 animate-in slide-in-from-bottom-6 sm:zoom-in-95 duration-200 border-t sm:border border-slate-200/80 dark:border-slate-800"
      >
        {/* Top Luxury Flowing Accent Runner */}
        <div className="h-[2px] w-full luxury-flow-line" />

        {/* Top Pull Bar Indicator */}
        <div className="pt-2.5 pb-1 flex justify-center sm:hidden">
          <div className="w-12 h-1.5 bg-slate-300 dark:bg-slate-700 rounded-full" />
        </div>

        {/* Header Row */}
        <div className="flex items-center justify-between px-5 pt-3 pb-2">
          <div className="flex items-center gap-3 min-w-0">
            {/* Animated App Logo with subtle pulsing ambient aura & micro-badge */}
            <div className="relative group shrink-0">
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-tr from-amber-500/40 via-sky-500/40 to-indigo-500/40 blur-sm animate-pulse" />
              <div className="relative w-11 h-11 rounded-2xl bg-slate-900 border border-slate-700/80 p-0.5 flex items-center justify-center shadow-lg transition-transform hover:scale-105">
                <BrandLogo size="sm" showGlow={false} />
                {/* Tiny Share node micro-badge */}
                <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-gradient-to-r from-sky-500 to-indigo-600 text-white flex items-center justify-center shadow-sm border border-slate-900">
                  <Share2 className="w-2.5 h-2.5" />
                </div>
              </div>
            </div>
            <div className="min-w-0">
              <h3 className="text-base font-black text-slate-900 dark:text-white leading-tight">
                {title}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium truncate max-w-[220px] sm:max-w-xs mt-0.5">
                {subtitle}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body Content */}
        <div className="px-5 pt-3 pb-6 space-y-4">
          {/* Section: SHARE TO */}
          <div>
            <div className="text-[11px] font-black uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2.5">
              SHARE TO
            </div>

            {/* 4 App Cards Grid */}
            <div className="grid grid-cols-4 gap-2.5">
              {/* 1. Telegram */}
              <button
                onClick={handleShareTelegram}
                className="flex flex-col items-center justify-center p-2.5 rounded-2xl bg-sky-50/90 dark:bg-sky-950/30 hover:bg-sky-100 dark:hover:bg-sky-900/50 border border-sky-100/90 dark:border-sky-900/40 transition-all active:scale-95 cursor-pointer group"
              >
                <div className="w-11 h-11 rounded-full bg-[#24A1DE] flex items-center justify-center text-white shadow-md shadow-sky-500/25 group-hover:scale-105 transition-transform">
                  <Send className="w-5 h-5 ml-0.5" />
                </div>
                <span className="text-[11px] font-black text-slate-800 dark:text-slate-200 mt-2 truncate w-full text-center">
                  Telegram
                </span>
              </button>

              {/* 2. Facebook */}
              <button
                onClick={handleShareFacebook}
                className="flex flex-col items-center justify-center p-2.5 rounded-2xl bg-blue-50/90 dark:bg-blue-950/30 hover:bg-blue-100 dark:hover:bg-blue-900/50 border border-blue-100/90 dark:border-blue-900/40 transition-all active:scale-95 cursor-pointer group"
              >
                <div className="w-11 h-11 rounded-full bg-[#1877F2] flex items-center justify-center text-white shadow-md shadow-blue-500/25 group-hover:scale-105 transition-transform font-black text-xl font-sans">
                  f
                </div>
                <span className="text-[11px] font-black text-slate-800 dark:text-slate-200 mt-2 truncate w-full text-center">
                  Facebook
                </span>
              </button>

              {/* 3. WhatsApp */}
              <button
                onClick={handleShareWhatsApp}
                className="flex flex-col items-center justify-center p-2.5 rounded-2xl bg-emerald-50/90 dark:bg-emerald-950/30 hover:bg-emerald-100 dark:hover:bg-emerald-900/50 border border-emerald-100/90 dark:border-emerald-900/40 transition-all active:scale-95 cursor-pointer group"
              >
                <div className="w-11 h-11 rounded-full bg-[#25D366] flex items-center justify-center text-white shadow-md shadow-emerald-500/25 group-hover:scale-105 transition-transform">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <span className="text-[11px] font-black text-slate-800 dark:text-slate-200 mt-2 truncate w-full text-center">
                  WhatsApp
                </span>
              </button>

              {/* 4. Twitter / X */}
              <button
                onClick={handleShareTwitter}
                className="flex flex-col items-center justify-center p-2.5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 hover:bg-slate-100 dark:hover:bg-slate-800/70 border border-slate-200/70 dark:border-slate-700/50 transition-all active:scale-95 cursor-pointer group"
              >
                <div className="w-11 h-11 rounded-full bg-black flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform font-black text-sm">
                  𝕏
                </div>
                <span className="text-[10px] font-black text-slate-800 dark:text-slate-200 mt-2 truncate w-full text-center leading-tight">
                  Twitter / X
                </span>
              </button>
            </div>
          </div>

          {/* Full-width Card: More Apps */}
          <button
            onClick={handleMoreApps}
            className="w-full rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/40 hover:bg-indigo-100/80 dark:hover:bg-indigo-900/60 border border-indigo-100/80 dark:border-indigo-900/40 py-3.5 flex flex-col items-center justify-center gap-1.5 transition-all active:scale-[0.98] cursor-pointer group shadow-sm"
          >
            <div className="w-10 h-10 rounded-full bg-[#4F46E5] flex items-center justify-center text-white shadow-md shadow-indigo-500/25 group-hover:scale-105 transition-transform">
              <Globe className="w-5 h-5" />
            </div>
            <span className="text-xs font-black text-slate-800 dark:text-slate-200">
              More Apps
            </span>
          </button>

          {/* Section: OR COPY LINK */}
          <div>
            <div className="text-[11px] font-black uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2">
              OR COPY LINK
            </div>

            {/* Copy Link Input Bar */}
            <div className="bg-slate-100 dark:bg-slate-800/90 rounded-2xl p-1.5 pl-3.5 flex items-center justify-between border border-slate-200 dark:border-slate-700/70 gap-2">
              <div className="text-xs text-slate-600 dark:text-slate-300 font-mono truncate min-w-0 select-all">
                {shareUrl}
              </div>
              <button
                onClick={handleCopyLink}
                className={`px-4 py-2 rounded-xl text-xs font-black flex items-center gap-1.5 shadow-md active:scale-95 transition-all cursor-pointer shrink-0 text-white ${
                  copied
                    ? 'bg-emerald-600 shadow-emerald-600/30'
                    : 'bg-[#4F46E5] hover:bg-[#4338CA] shadow-indigo-500/25'
                }`}
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};
