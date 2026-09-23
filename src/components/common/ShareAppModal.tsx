import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { X, Copy, Check, Send, MessageCircle, Globe, BookOpen, Sparkles, Award } from 'lucide-react';
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

// Standing 3D book items for the background horizontal shelf
interface ShelfBook {
  id: string;
  subject: string;
  grade: string;
  height: string;
  gradient: string;
  spineColor: string;
  ribColor: string;
}

const SHELF_BOOKS: ShelfBook[] = [
  {
    id: 'bio-12',
    subject: 'BIOLOGY',
    grade: '12',
    height: 'h-[78px]',
    gradient: 'from-emerald-600 to-teal-800',
    spineColor: 'bg-emerald-950',
    ribColor: 'border-emerald-400/40',
  },
  {
    id: 'phys-11',
    subject: 'PHYSICS',
    grade: '11',
    height: 'h-[84px]',
    gradient: 'from-sky-600 to-blue-800',
    spineColor: 'bg-blue-950',
    ribColor: 'border-sky-400/40',
  },
  {
    id: 'chem-12',
    subject: 'CHEMISTRY',
    grade: '12',
    height: 'h-[80px]',
    gradient: 'from-amber-600 to-orange-800',
    spineColor: 'bg-amber-950',
    ribColor: 'border-amber-400/40',
  },
  {
    id: 'math-10',
    subject: 'MATHS',
    grade: '10',
    height: 'h-[88px]',
    gradient: 'from-indigo-600 to-violet-800',
    spineColor: 'bg-indigo-950',
    ribColor: 'border-indigo-400/40',
  },
  {
    id: 'hist-11',
    subject: 'HISTORY',
    grade: '11',
    height: 'h-[74px]',
    gradient: 'from-rose-600 to-red-800',
    spineColor: 'bg-rose-950',
    ribColor: 'border-rose-400/40',
  },
  {
    id: 'econ-12',
    subject: 'ECONOMICS',
    grade: '12',
    height: 'h-[82px]',
    gradient: 'from-teal-600 to-cyan-800',
    spineColor: 'bg-teal-950',
    ribColor: 'border-teal-400/40',
  },
  {
    id: 'eng-9',
    subject: 'ENGLISH',
    grade: '9',
    height: 'h-[76px]',
    gradient: 'from-purple-600 to-fuchsia-800',
    spineColor: 'bg-purple-950',
    ribColor: 'border-purple-400/40',
  },
  {
    id: 'geo-10',
    subject: 'GEOGRAPHY',
    grade: '10',
    height: 'h-[80px]',
    gradient: 'from-amber-700 to-yellow-900',
    spineColor: 'bg-yellow-950',
    ribColor: 'border-amber-400/40',
  },
  {
    id: 'it-11',
    subject: 'IT',
    grade: '11',
    height: 'h-[84px]',
    gradient: 'from-cyan-600 to-blue-900',
    spineColor: 'bg-cyan-950',
    ribColor: 'border-cyan-400/40',
  },
  {
    id: 'civ-12',
    subject: 'CIVICS',
    grade: '12',
    height: 'h-[76px]',
    gradient: 'from-pink-600 to-rose-900',
    spineColor: 'bg-pink-950',
    ribColor: 'border-pink-400/40',
  },
];

// Double array for seamless 0% -> -50% translateX loop
const LOOPING_SHELF_BOOKS = [...SHELF_BOOKS, ...SHELF_BOOKS];

export const ShareAppModal: React.FC<ShareAppModalProps> = ({
  isOpen,
  onClose,
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
          title: 'Ethiopian Textbooks (Grades 9–12)',
          text: shareText,
          url: shareUrl,
          dialogTitle: 'Share with Classmates',
        });
      } else if (navigator.share) {
        await navigator.share({
          title: 'Ethiopian Textbooks (Grades 9–12)',
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
        className="fixed inset-0 bg-black/75 backdrop-blur-sm transition-opacity duration-200"
        onClick={onClose}
      />

      {/* Bottom Sheet Modal Dialog (dark mode matching user design reference) */}
      <div
        className="relative w-full sm:max-w-md bg-slate-900 rounded-t-[32px] sm:rounded-3xl shadow-2xl overflow-hidden flex flex-col z-10 animate-in slide-in-from-bottom-6 sm:zoom-in-95 duration-200 border-t sm:border border-slate-800"
      >
        {/* Top Accent Line */}
        <div className="h-[2px] w-full luxury-flow-line" />

        {/* Top Pull Bar (Mobile) */}
        <div className="pt-2 px-5 pb-0.5 flex items-center justify-between">
          <div className="w-10 h-1 bg-slate-700/80 rounded-full mx-auto sm:invisible" />
          <button
            onClick={onClose}
            className="sm:hidden -mr-1 p-1 rounded-full hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* EMBEDDED DIGITAL CARD IN DARK MODE WITH LOW-OPACITY HORIZONTAL SHELF DRIFT */}
        <div className="px-4 pt-1 pb-3">
          <div className="relative rounded-2xl bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 border border-slate-800/90 shadow-xl shadow-black/50 overflow-hidden flex flex-col justify-between min-h-[174px]">
            {/* Desktop Close Button */}
            <button
              onClick={onClose}
              className="hidden sm:flex absolute top-3 right-3 z-30 p-1.5 rounded-full bg-slate-900/80 hover:bg-slate-800 text-slate-400 hover:text-white transition-colors cursor-pointer border border-slate-700/50"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Ambient luxury radial glow */}
            <div className="absolute -top-12 -left-12 w-36 h-36 bg-sky-500/10 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute -bottom-10 right-10 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />

            {/* ==========================================================================
                BACKGROUND HORIZONTAL SHELF WITH LOW OPACITY (0.15 - 0.25) & SLOW DRIFT
                ========================================================================== */}
            <div
              className="absolute inset-0 pointer-events-none overflow-hidden mask-shelf-horizontal flex items-end pb-3 z-0"
              style={{ opacity: 0.20 }} // Exactly between 0.15 and 0.25 as requested
              aria-hidden="true"
            >
              {/* Subtle Horizontal Shelf Rail Ledge */}
              <div className="absolute bottom-3 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-slate-500/60 to-transparent shadow-[0_2px_4px_rgba(0,0,0,0.8)]" />

              {/* Infinite Horizontal Drift of 3D Books (translateX) */}
              <div className="flex items-end gap-2 animate-books-drift-horizontal whitespace-nowrap pl-2">
                {LOOPING_SHELF_BOOKS.map((book, idx) => (
                  <div
                    key={`${book.id}-${idx}`}
                    className={`relative w-[30px] ${book.height} rounded-t-md shadow-md flex flex-col justify-between p-1 shrink-0 bg-gradient-to-b ${book.gradient} border-t border-l border-white/20`}
                    style={{
                      transform: 'perspective(200px) rotateY(-8deg)',
                      boxShadow: '2px 4px 10px rgba(0, 0, 0, 0.5)',
                    }}
                  >
                    {/* Top Spine Gold/Silver Rib */}
                    <div className={`w-full border-b ${book.ribColor} pb-0.5 mb-1`}>
                      <div className="text-[7px] font-black text-white/90 text-center tracking-tighter leading-none">
                        G{book.grade}
                      </div>
                    </div>

                    {/* Book Spine Subject (vertical feel) */}
                    <div className="flex-1 flex items-center justify-center overflow-hidden">
                      <span
                        className="text-[7.5px] font-black tracking-widest text-white/80 uppercase select-none"
                        style={{
                          writingMode: 'vertical-rl',
                          textOrientation: 'mixed',
                          transform: 'rotate(180deg)',
                        }}
                      >
                        {book.subject}
                      </span>
                    </div>

                    {/* Bottom Spine Notch */}
                    <div className={`w-full border-t ${book.ribColor} pt-0.5 mt-1`}>
                      <div className="w-1.5 h-1 bg-white/40 rounded-full mx-auto" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ==========================================================================
                FOREGROUND TEXT BLOCK (100% Crisp Opacity, High Readability & Contrast)
                ========================================================================== */}
            <div className="relative z-10 p-4 sm:p-5 flex flex-col justify-between flex-1">
              {/* Row 1: App Icon + Official MOE & Grade Badges */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="relative group shrink-0">
                    <div className="absolute -inset-0.5 rounded-xl bg-gradient-to-tr from-amber-500/40 via-sky-500/40 to-indigo-500/40 blur-xs animate-pulse" />
                    <div className="relative w-8 h-8 rounded-xl bg-slate-900 border border-slate-700/80 p-0.5 flex items-center justify-center shadow-md">
                      <BrandLogo size="sm" showGlow={false} />
                    </div>
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      <span className="text-[11px] font-black uppercase tracking-wider text-sky-400">
                        Ethiopian Textbooks & Guide
                      </span>
                    </div>
                    <div className="text-xs font-black text-slate-200 tracking-tight leading-none mt-0.5">
                      Grades 9–12 • New Curriculum
                    </div>
                  </div>
                </div>
              </div>

              {/* Row 2: Main Title & Description */}
              <div className="my-2.5">
                <h3 className="text-base font-black text-white leading-tight tracking-tight">
                  Share with Friends & Classmates
                </h3>
                <p className="text-xs text-slate-300 font-medium leading-relaxed mt-1">
                  Free Student Textbooks, Teacher Guides & EUEE Practice Hub.
                </p>
              </div>

              {/* Row 3: Micro-Badges */}
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[10px] font-bold bg-sky-500/20 border border-sky-400/30 text-sky-200 shadow-xs">
                  <Sparkles className="w-3 h-3 text-sky-300" />
                  100% Offline
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[10px] font-bold bg-emerald-500/20 border border-emerald-400/30 text-emerald-200 shadow-xs">
                  <BookOpen className="w-3 h-3 text-emerald-300" />
                  Free Access
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[10px] font-bold bg-amber-500/20 border border-amber-400/30 text-amber-200 shadow-xs">
                  <Award className="w-3 h-3 text-amber-300" />
                  EUEE Prep
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Body / Share Actions */}
        <div className="px-5 pt-1 pb-6 space-y-3.5">
          {/* Section: SHARE TO */}
          <div>
            <div className="text-[11px] font-black uppercase tracking-wider text-slate-400 mb-2">
              SHARE TO
            </div>

            {/* 4 App Cards Grid */}
            <div className="grid grid-cols-4 gap-2.5">
              {/* 1. Telegram */}
              <button
                onClick={handleShareTelegram}
                className="flex flex-col items-center justify-center p-2.5 rounded-2xl bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 hover:border-sky-500/40 transition-all active:scale-95 cursor-pointer group"
              >
                <div className="w-11 h-11 rounded-full bg-[#24A1DE] flex items-center justify-center text-white shadow-md shadow-sky-500/25 group-hover:scale-105 transition-transform">
                  <Send className="w-5 h-5 ml-0.5" />
                </div>
                <span className="text-[11px] font-black text-slate-200 mt-2 truncate w-full text-center">
                  Telegram
                </span>
              </button>

              {/* 2. Facebook */}
              <button
                onClick={handleShareFacebook}
                className="flex flex-col items-center justify-center p-2.5 rounded-2xl bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 hover:border-blue-500/40 transition-all active:scale-95 cursor-pointer group"
              >
                <div className="w-11 h-11 rounded-full bg-[#1877F2] flex items-center justify-center text-white shadow-md shadow-blue-500/25 group-hover:scale-105 transition-transform font-black text-xl font-sans">
                  f
                </div>
                <span className="text-[11px] font-black text-slate-200 mt-2 truncate w-full text-center">
                  Facebook
                </span>
              </button>

              {/* 3. WhatsApp */}
              <button
                onClick={handleShareWhatsApp}
                className="flex flex-col items-center justify-center p-2.5 rounded-2xl bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 hover:border-emerald-500/40 transition-all active:scale-95 cursor-pointer group"
              >
                <div className="w-11 h-11 rounded-full bg-[#25D366] flex items-center justify-center text-white shadow-md shadow-emerald-500/25 group-hover:scale-105 transition-transform">
                  <MessageCircle className="w-5 h-5" />
                </div>
                <span className="text-[11px] font-black text-slate-200 mt-2 truncate w-full text-center">
                  WhatsApp
                </span>
              </button>

              {/* 4. Twitter / X */}
              <button
                onClick={handleShareTwitter}
                className="flex flex-col items-center justify-center p-2.5 rounded-2xl bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 hover:border-slate-500/40 transition-all active:scale-95 cursor-pointer group"
              >
                <div className="w-11 h-11 rounded-full bg-black flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform font-black text-sm border border-slate-700">
                  𝕏
                </div>
                <span className="text-[10px] font-black text-slate-200 mt-2 truncate w-full text-center leading-tight">
                  Twitter / X
                </span>
              </button>
            </div>
          </div>

          {/* Full-width Card: More Apps */}
          <button
            onClick={handleMoreApps}
            className="w-full rounded-2xl bg-slate-800/70 hover:bg-slate-800 border border-slate-700/70 hover:border-indigo-500/40 py-3 flex flex-col items-center justify-center gap-1.5 transition-all active:scale-[0.98] cursor-pointer group shadow-sm"
          >
            <div className="w-10 h-10 rounded-full bg-[#4F46E5] flex items-center justify-center text-white shadow-md shadow-indigo-500/25 group-hover:scale-105 transition-transform">
              <Globe className="w-5 h-5" />
            </div>
            <span className="text-xs font-black text-slate-200">
              More Apps
            </span>
          </button>

          {/* Section: OR COPY LINK */}
          <div>
            <div className="text-[11px] font-black uppercase tracking-wider text-slate-400 mb-2">
              OR COPY LINK
            </div>

            {/* Copy Link Input Bar */}
            <div className="bg-slate-950/90 rounded-2xl p-1.5 pl-3.5 flex items-center justify-between border border-slate-800 gap-2">
              <div className="text-xs text-slate-300 font-mono truncate min-w-0 select-all">
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
