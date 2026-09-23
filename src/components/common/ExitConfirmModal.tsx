import React from 'react';
import { createPortal } from 'react-dom';
import { Power, CheckCircle, X } from 'lucide-react';
import { Capacitor } from '@capacitor/core';
import { App as CapApp } from '@capacitor/app';

interface ExitConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ExitConfirmModal: React.FC<ExitConfirmModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen || typeof document === 'undefined') return null;

  const handleConfirmExit = async () => {
    try {
      if (Capacitor.isNativePlatform()) {
        await CapApp.exitApp();
      } else {
        // In browser or PWA
        window.close();
        onClose();
      }
    } catch (err) {
      console.error('Failed to exit cleanly:', err);
      onClose();
    }
  };

  return createPortal(
    <div className="fixed inset-0 z-[250] flex items-center justify-center p-4">
      {/* Dark backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity duration-200"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div
        className="relative w-full max-w-sm bg-slate-900 border border-slate-700/80 rounded-3xl shadow-2xl overflow-hidden flex flex-col z-10 animate-in fade-in zoom-in-95 duration-200"
        style={{
          background: 'linear-gradient(180deg, #111827 0%, #080d19 100%)',
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.8), 0 0 35px rgba(244, 63, 94, 0.2)',
        }}
      >
        {/* Top Rose / Amber Accent Runner */}
        <div className="h-1 w-full bg-gradient-to-r from-rose-500 via-amber-400 to-rose-500" />

        <div className="p-6 text-center space-y-4">
          {/* Icon Badge */}
          <div className="mx-auto w-14 h-14 rounded-3xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400 shadow-lg shadow-rose-950/50">
            <Power className="w-7 h-7" />
          </div>

          <div className="space-y-1.5">
            <h3 className="text-lg font-black text-white tracking-tight">Close App?</h3>
            <p className="text-sm font-bold text-slate-300">Do you want to close the app?</p>
            <p className="text-xs text-slate-400 leading-relaxed pt-1">
              Your reading progress, bookmarked chapters, and offline books are safely saved.
            </p>
          </div>

          <div className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-800/60 border border-slate-700/50 text-[11px] text-emerald-400 font-semibold justify-center">
            <CheckCircle className="w-3.5 h-3.5 shrink-0" />
            <span>All offline books &amp; progress preserved</span>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-2 gap-3 pt-2">
            <button
              onClick={onClose}
              className="w-full py-3 px-4 rounded-2xl bg-slate-800 hover:bg-slate-700/90 text-slate-200 font-bold text-xs transition-all border border-slate-700 active:scale-95 cursor-pointer"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirmExit}
              className="w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white font-black text-xs shadow-lg shadow-rose-950/60 transition-all active:scale-95 cursor-pointer border border-rose-500/40"
            >
              Yes, Close App
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};
