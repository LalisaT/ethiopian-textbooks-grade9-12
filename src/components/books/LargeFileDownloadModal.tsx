import React from 'react';
import { Book } from '../../types/book';
import { HardDrive, DownloadCloud, X, AlertTriangle, BookOpen } from 'lucide-react';

interface LargeFileDownloadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  book: Book;
}

export const LargeFileDownloadModal: React.FC<LargeFileDownloadModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  book,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-md w-full border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 flex flex-col my-auto">
        {/* Top Ethiopian Accent Bar */}
        <div className="h-1.5 w-full ethio-gradient-bar shrink-0" />

        {/* Modal Header */}
        <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex items-start justify-between gap-3 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/15 text-amber-600 dark:text-amber-400 border border-amber-500/30 flex items-center justify-center shrink-0">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md bg-amber-500/10 text-amber-600 dark:text-amber-400 text-[10px] font-black border border-amber-500/20 mb-0.5">
                <span>Storage & Data Notice</span>
              </div>
              <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white leading-tight">
                Download Permission
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 space-y-4 text-xs">
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
            This textbook is <strong className="text-slate-900 dark:text-white font-black">{book.fileSizeMb} MB</strong> (larger than 30 MB). Because phone and computer storage is valuable for students, please confirm before downloading.
          </p>

          {/* Book Summary Card */}
          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 space-y-2.5">
            <div className="flex items-center justify-between gap-2">
              <span className="font-bold text-slate-500 dark:text-slate-400">Textbook:</span>
              <span className="font-extrabold text-slate-900 dark:text-white text-right truncate max-w-[220px]">
                {book.title}
              </span>
            </div>

            <div className="flex items-center justify-between gap-2">
              <span className="font-bold text-slate-500 dark:text-slate-400">File Size:</span>
              <span className="px-2 py-0.5 rounded-md bg-rose-500/10 text-rose-600 dark:text-rose-400 font-black text-[11px] border border-rose-500/20">
                {book.fileSizeMb} MB
              </span>
            </div>

            <div className="flex items-center justify-between gap-2">
              <span className="font-bold text-slate-500 dark:text-slate-400">Estimated Pages:</span>
              <span className="font-extrabold text-slate-700 dark:text-slate-300">
                ~{book.totalEstimatedPages || 250} Pages
              </span>
            </div>

            <div className="flex items-center justify-between gap-2">
              <span className="font-bold text-slate-500 dark:text-slate-400">Location:</span>
              <span className="font-extrabold text-slate-700 dark:text-slate-300">
                Device Storage & Downloads
              </span>
            </div>
          </div>

          {/* Tip */}
          <div className="p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 flex items-start gap-2.5 text-emerald-800 dark:text-emerald-300">
            <BookOpen className="w-4 h-4 shrink-0 mt-0.5 text-emerald-600 dark:text-emerald-400" />
            <p className="text-[11px] leading-tight">
              <strong>Free Online Reading:</strong> You can read the entire textbook in the app anytime without using your device storage space.
            </p>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-5 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 flex items-center justify-end gap-2.5 shrink-0">
          <button
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-extrabold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onClose();
              onConfirm();
            }}
            className="px-5 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-black rounded-xl shadow-lg shadow-emerald-600/25 active:scale-95 transition-all flex items-center gap-1.5"
          >
            <DownloadCloud className="w-4 h-4" />
            <span>Download ({book.fileSizeMb} MB)</span>
          </button>
        </div>
      </div>
    </div>
  );
};
