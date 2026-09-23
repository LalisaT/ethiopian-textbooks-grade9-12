import React from 'react';
import {
  Bell,
  X,
  Volume2,
  BookOpen,
  Award,
  ExternalLink,
  MessageSquare,
  Sparkles,
  ArrowRight,
  Send,
  Calendar,
  CheckCircle,
} from 'lucide-react';
import { AppNotification, NotificationService } from '../../services/notificationService';
import { Book } from '../../types/book';

interface NotificationDetailModalProps {
  notification: AppNotification | null;
  onClose: () => void;
  onOpenBook?: (book: Book) => void;
  onNavigateTab?: (tab: 'home' | 'explore' | 'examprep' | 'community' | 'saved' | 'about') => void;
  onOpenNoticeBoard?: (postId?: string) => void;
  allBooks?: Book[];
}

export const NotificationDetailModal: React.FC<NotificationDetailModalProps> = ({
  notification,
  onClose,
  onOpenBook,
  onNavigateTab,
  onOpenNoticeBoard,
  allBooks = [],
}) => {
  if (!notification) return null;

  const handleReplayChime = () => {
    NotificationService.playSound();
    NotificationService.vibrate();
  };

  // Find attached book if any
  let attachedBook: Book | undefined;
  if (notification.attachedBookId) {
    attachedBook = allBooks.find((b) => b.id === notification.attachedBookId);
  } else if (notification.actionUrl && notification.actionUrl.startsWith('book:')) {
    const bookId = notification.actionUrl.replace('book:', '').trim().toLowerCase();
    attachedBook = allBooks.find((b) => b.id.toLowerCase() === bookId);
  }

  const handleOpenAttachedBook = () => {
    if (attachedBook && onOpenBook) {
      onOpenBook(attachedBook);
      onClose();
    } else if (onNavigateTab) {
      onNavigateTab('explore');
      onClose();
    }
  };

  const handleOpenNoticeBoard = () => {
    const targetPostId =
      notification.postId ||
      (notification.actionUrl && notification.actionUrl.includes('#')
        ? notification.actionUrl.split('#')[1]
        : undefined);

    if (onOpenNoticeBoard) {
      onOpenNoticeBoard(targetPostId);
    } else if (onNavigateTab) {
      onNavigateTab('community');
    }
    onClose();
  };

  const handleOpenExamPrep = () => {
    if (onNavigateTab) {
      onNavigateTab('examprep');
    }
    onClose();
  };

  const isExamRelated =
    notification.type === 'exam_alert' ||
    notification.category === 'Exam Announcement' ||
    notification.category === 'Exam Prep' ||
    /exam|matric|esslce|euee/i.test(`${notification.title} ${notification.body}`);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="notif-modal-title"
      className="fixed inset-0 z-[100] bg-black/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200"
    >
      <div className="bg-slate-950/95 backdrop-blur-2xl rounded-3xl max-w-lg w-full border border-slate-800 shadow-[0_25px_70px_rgba(0,0,0,0.85)] overflow-hidden flex flex-col my-auto text-slate-100 animate-in zoom-in-95 duration-200 relative group">
        {/* Luxury top flowing runner */}
        <div className="luxury-flow-line h-[2px] absolute top-0 left-0 right-0 opacity-90 z-20" />
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-56 h-56 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-slate-800/80 flex items-center justify-between bg-slate-950/90 relative z-10">
          <div className="flex items-center gap-3.5 min-w-0">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600 text-slate-950 flex items-center justify-center shrink-0 shadow-lg shadow-amber-500/20 font-black">
              {notification.type === 'exam_alert' || isExamRelated ? (
                <Award className="w-5 h-5 text-slate-950" />
              ) : attachedBook ? (
                <BookOpen className="w-5 h-5 text-slate-950" />
              ) : (
                <Bell className="w-5 h-5 text-slate-950" />
              )}
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-wider text-amber-300 bg-amber-500/15 px-2.5 py-0.5 rounded-full border border-amber-500/30">
                  <Sparkles className="w-3 h-3 text-amber-400" />
                  <span>{notification.category || 'Official Alert'}</span>
                </span>
                {notification.grade && (
                  <span className="text-[10px] font-bold text-sky-300 bg-sky-500/10 border border-sky-500/20 px-2 py-0.5 rounded-md">
                    {notification.grade}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-1.5 text-[11px] text-slate-400 mt-1">
                <Calendar className="w-3 h-3 text-slate-500" />
                <span>
                  {new Date(notification.date).toLocaleDateString()} at{' '}
                  {new Date(notification.date).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <button
              type="button"
              onClick={handleReplayChime}
              title="Play push chime sound"
              className="p-2.5 rounded-xl text-amber-400 hover:bg-amber-500/15 border border-amber-500/20 transition-all cursor-pointer shadow-xs active:scale-95"
            >
              <Volume2 className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-4.5 max-h-[75vh] overflow-y-auto">
          {/* Title */}
          <h3 id="notif-modal-title" className="text-lg sm:text-xl font-black text-white leading-snug tracking-tight">
            {notification.title}
          </h3>

          {/* Attached Image if any */}
          {notification.imageUrl && (
            <div className="relative rounded-2xl overflow-hidden border border-slate-800 shadow-xl bg-black/60">
              <img
                src={notification.imageUrl}
                alt="Announcement attachment"
                className="w-full max-h-64 object-cover"
              />
              {notification.imageCaption && (
                <div className="p-2 text-center text-xs text-slate-400 bg-slate-950/80 border-t border-slate-800">
                  {notification.imageCaption}
                </div>
              )}
            </div>
          )}

          {/* Body Content */}
          <div className="p-4.5 bg-slate-900/70 rounded-2xl border border-slate-800 shadow-inner">
            <p className="text-sm text-slate-200 whitespace-pre-line leading-relaxed font-normal">
              {notification.body}
            </p>
          </div>

          {/* Attached Textbook Card if any */}
          {attachedBook && (
            <div className="p-4 bg-slate-900/90 rounded-2xl border border-sky-500/30 flex items-center justify-between gap-3 shadow-md">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-xl bg-sky-600/30 border border-sky-500/40 text-sky-300 flex items-center justify-center shrink-0 font-black text-xs shadow-sm">
                  G{attachedBook.grade}
                </div>
                <div className="min-w-0">
                  <div className="text-[10px] font-black uppercase text-sky-400 tracking-wider">
                    Attached Textbook
                  </div>
                  <div className="text-xs font-bold text-white truncate">
                    {attachedBook.title}
                  </div>
                  <div className="text-[10px] text-slate-400">
                    Grade {attachedBook.grade} • {attachedBook.subject}
                  </div>
                </div>
              </div>

              <button
                type="button"
                onClick={handleOpenAttachedBook}
                className="btn-luxury-action luxury-pressable luxury-sheen-sweep px-3.5 py-2 text-sky-200 text-xs font-bold rounded-xl shadow-sm shrink-0 transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <BookOpen className="w-3.5 h-3.5 text-sky-400" />
                <span>Open Book</span>
              </button>
            </div>
          )}

          {/* External Link if any */}
          {notification.linkUrl && (
            <a
              href={notification.linkUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-luxury-action luxury-pressable luxury-sheen-sweep p-3.5 rounded-2xl flex items-center justify-between gap-3 text-slate-200 hover:text-amber-200 transition-all group cursor-pointer"
            >
              <div className="flex items-center gap-2.5 min-w-0">
                <div className="w-8 h-8 rounded-xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center shrink-0">
                  <Send className="w-4 h-4 text-amber-400" />
                </div>
                <span className="text-xs font-bold truncate text-white">
                  {notification.linkTitle || notification.linkUrl}
                </span>
              </div>
              <ExternalLink className="w-4 h-4 shrink-0 text-amber-400 group-hover:translate-x-0.5 transition-transform" />
            </a>
          )}
        </div>

        {/* Action Buttons Footer */}
        <div className="p-4 sm:p-5 border-t border-slate-800 bg-slate-950/90 flex flex-wrap items-center justify-end gap-2.5">
          <button
            type="button"
            onClick={onClose}
            className="btn-luxury-idle luxury-pressable px-4 py-2.5 text-xs font-bold text-slate-300 rounded-2xl cursor-pointer"
          >
            Close
          </button>

          <button
            type="button"
            onClick={handleOpenNoticeBoard}
            className="btn-luxury-active luxury-pressable luxury-sheen-sweep px-5 py-2.5 text-amber-200 text-xs font-black rounded-2xl shadow-lg shadow-amber-500/20 transition-all flex items-center gap-2 cursor-pointer"
          >
            <MessageSquare className="w-3.5 h-3.5 text-amber-400" />
            <span>Open in Notice Board</span>
            <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
          </button>
        </div>
      </div>
    </div>
  );
};
