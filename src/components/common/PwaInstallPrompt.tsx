import React, { useState, useEffect } from 'react';
import { Download, Sparkles, X, Smartphone } from 'lucide-react';
import { NotificationService } from '../../services/notificationService';

export const PwaInstallPrompt: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    // Listen for PWA install prompt
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowPrompt(true);
    };

    // Listen for successful app install/download
    const handleAppInstalled = () => {
      setShowPrompt(false);
      setDeferredPrompt(null);
      NotificationService.notifyAppInstalled();
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) {
      // Fallback for devices without direct prompt
      NotificationService.notifyAppInstalled();
      alert('To install on your device: Tap the menu (⋮ or Share) and select "Add to Home Screen" or "Install App".');
      setShowPrompt(false);
      return;
    }

    try {
      deferredPrompt.prompt();
      const { outcome } = await deferredPrompt.userChoice;
      if (outcome === 'accepted') {
        NotificationService.notifyAppInstalled();
      }
      setDeferredPrompt(null);
      setShowPrompt(false);
    } catch (err) {
      console.error('Install prompt error:', err);
    }
  };

  if (!showPrompt) return null;

  return (
    <div className="fixed bottom-4 right-4 z-50 max-w-sm w-full bg-slate-900 text-white rounded-3xl p-4 shadow-2xl border border-slate-700 animate-in slide-in-from-bottom-5 duration-300 flex items-center justify-between gap-3">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-blue-600 to-sky-500 text-white flex items-center justify-center font-black shrink-0 shadow-md">
          <Smartphone className="w-5 h-5" />
        </div>
        <div>
          <div className="flex items-center gap-1 text-[10px] font-black text-amber-400 uppercase tracking-wider">
            <Sparkles className="w-3 h-3" />
            <span>Install App</span>
          </div>
          <h4 className="font-extrabold text-xs text-white leading-tight">
            Download App for Offline Study
          </h4>
          <p className="text-[11px] text-slate-400">
            Read all books & take quizzes without data
          </p>
        </div>
      </div>

      <div className="flex items-center gap-1.5 shrink-0">
        <button
          onClick={handleInstallClick}
          className="px-3.5 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-black shadow-md transition-all active:scale-95 flex items-center gap-1"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Install</span>
        </button>

        <button
          onClick={() => setShowPrompt(false)}
          className="p-1.5 text-slate-500 hover:text-white rounded-lg"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
