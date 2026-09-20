import React, { useState } from 'react';
import { WifiOff, RefreshCw, X, ShieldAlert, CheckCircle2, BookOpen } from 'lucide-react';
import { useTranslation } from '../../i18n/useTranslation';
import { NetworkService } from '../../services/networkService';

interface InternetRequiredModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConnected?: () => void;
  title?: string;
  subtitle?: string;
  context?: 'quiz' | 'exam' | 'questions';
}

export const InternetRequiredModal: React.FC<InternetRequiredModalProps> = ({
  isOpen,
  onClose,
  onConnected,
  title,
  subtitle,
  context = 'quiz',
}) => {
  const { language } = useTranslation();
  const [isChecking, setIsChecking] = useState(false);
  const [showFailedMsg, setShowFailedMsg] = useState(false);

  if (!isOpen) return null;

  const handleRetry = async () => {
    setIsChecking(true);
    setShowFailedMsg(false);
    try {
      const isOnline = await NetworkService.checkInternetConnection(true);
      if (isOnline) {
        if (onConnected) onConnected();
        onClose();
      } else {
        setShowFailedMsg(true);
      }
    } catch {
      setShowFailedMsg(true);
    } finally {
      setIsChecking(false);
    }
  };

  // Localized copy
  const localizedContent = {
    om: {
      tag: 'Konneksinii Intarneetii Barbaachisa',
      defaultTitle: 'Intarneetiin Barbaachisaadha',
      defaultSubtitle:
        'Qormaata shaakaluu fi gaaffilee qajeeltoo EUEE dubbisuuf yeroo hunda intarneetiin jiraachuu qaba.',
      offlineNote:
        'Kitaabota moobaayila keessan irratti kuufaman intarneetii malee dubbisuu dandeessu. Garuu gaaffilee fi qormaanni intarneetii barbaadu.',
      retryBtn: 'Konneksinii Mirkaneessi',
      checkingBtn: 'Mirkaneessaa jira...',
      cancelBtn: 'Dhiisi',
      failedAlert: 'Ammas intarneetiin hin jiru. Maaloo Wi-Fi yookiin Daataa bilbila keessanii banatii irra deebi\'aa yaalaa.',
    },
    am: {
      tag: 'የኢንተርኔት ግንኙነት ያስፈልጋል',
      defaultTitle: 'የኢንተርኔት ግንኙነት ያስፈልጋል',
      defaultSubtitle:
        'የልምምድ ፈተናዎችን እና ጥያቄዎችን ለመስራት ወይም ለማንበብ ሁልጊዜ ንቁ የኢንተርኔት ግንኙነት ያስፈልጋል።',
      offlineNote:
        'የተቀመጡ መጻሕፍትን ያለ ኢንተርኔት በነፃ ማንበብ ይችላሉ። ሆኖም ግን የፈተና ጥያቄዎች ኢንተርኔት ይፈልጋሉ።',
      retryBtn: 'ግንኙነት አረጋግጥና ደግመህ ሞክር',
      checkingBtn: 'እያረጋገጠ ነው...',
      cancelBtn: 'ይቅር / ተመለስ',
      failedAlert: 'አሁንም የኢንተርኔት ግንኙነት የለም። እባክዎ Wi-Fi ወይም የሞባይል ዳታ አብርተው ደግመው ይሞክሩ።',
    },
    ti: {
      tag: 'ናይ ኢንተርኔት ርክብ የድሊ',
      defaultTitle: 'ናይ ኢንተርኔት ርክብ የድሊ',
      defaultSubtitle:
        'ናይ ልምምድ ፈተናታትን ሕቶታትን ንምስራሕ ወይ ንምንባብ ናይ ግድን ናይ ኢንተርኔት ርክብ የድሊ።',
      offlineNote:
        'መጻሕፍቲ ብዘይ ኢንተርኔት ምንባብ ይከኣል እዩ። ሕቶታት ግን ኢንተርኔት የድልዮም እዩ።',
      retryBtn: 'ርክብ ኣረጋግጽ',
      checkingBtn: 'የረጋግጽ ኣሎ...',
      cancelBtn: 'ይጽንሓለይ',
      failedAlert: 'ሕጂ እውን ናይ ኢንተርኔት ርክብ የለን። በጃኹም Wi-Fi ወይ ሞባይል ዳታ ኣብርሁ።',
    },
    so: {
      tag: 'Xidhiidhka Internet-ka',
      defaultTitle: 'Xidhiidhka Internet-ka ayaa loo Baahan Yahay',
      defaultSubtitle:
        'Si aad uga shaqeyso su\'aalaha ama imtixaanka, waxaad u baahan tahay xidhiidh internet.',
      offlineNote:
        'Buugaagta waxaad akhrisan kartaa internet la\'aan, laakiin su\'aalaha imtixaanka waxay u baahan yihiin internet.',
      retryBtn: 'Hubi Xidhiidhka',
      checkingBtn: 'Waa la hubinayaa...',
      cancelBtn: 'Jooji',
      failedAlert: 'Weli internet ma jiro. Fadlan hubi Wi-Fi ama Data-da taleefankaaga.',
    },
    en: {
      tag: 'Internet Connection Required',
      defaultTitle: 'Internet Connection Required',
      defaultSubtitle:
        'Quizzes and practice exam questions require an active internet connection to load authentic questions and verify scores.',
      offlineNote:
        'Your saved textbooks remain 100% available offline anytime, but quizzes and question banks require an active connection.',
      retryBtn: 'Check Connection & Retry',
      checkingBtn: 'Verifying connection...',
      cancelBtn: 'Dismiss',
      failedAlert: 'Still offline. Please connect to Wi-Fi or Mobile Data and try again.',
    },
  }[language] || {
    tag: 'Internet Connection Required',
    defaultTitle: 'Internet Connection Required',
    defaultSubtitle:
      'Quizzes and practice exam questions require an active internet connection to load authentic questions and verify scores.',
    offlineNote:
      'Your saved textbooks remain 100% available offline anytime, but quizzes and question banks require an active connection.',
    retryBtn: 'Check Connection & Retry',
    checkingBtn: 'Verifying connection...',
    cancelBtn: 'Dismiss',
    failedAlert: 'Still offline. Please connect to Wi-Fi or Mobile Data and try again.',
  };

  const modalTitle = title || localizedContent.defaultTitle;
  const modalSubtitle = subtitle || localizedContent.defaultSubtitle;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl border border-rose-200 dark:border-rose-900/40 shadow-2xl overflow-hidden p-6 sm:p-7 space-y-6">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Icon & Badge */}
        <div className="flex flex-col items-center text-center space-y-3 pt-2">
          <div className="relative">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-rose-500/20 via-amber-500/20 to-orange-500/20 border border-rose-500/30 flex items-center justify-center text-rose-600 dark:text-rose-400 shadow-inner">
              <WifiOff className="w-8 h-8" />
            </div>
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-rose-500"></span>
            </span>
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-rose-100 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-800/60 text-[11px] font-black text-rose-700 dark:text-rose-300">
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>{localizedContent.tag}</span>
          </div>

          <h3 className="text-xl font-black text-slate-900 dark:text-white leading-snug">
            {modalTitle}
          </h3>

          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed max-w-sm">
            {modalSubtitle}
          </p>
        </div>

        {/* Informative Offline Distinction Box */}
        <div className="p-3.5 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/40 text-[11px] sm:text-xs text-amber-800 dark:text-amber-300 flex items-start gap-2.5">
          <BookOpen className="w-4 h-4 flex-shrink-0 mt-0.5 text-amber-600 dark:text-amber-400" />
          <div className="leading-relaxed">
            {localizedContent.offlineNote}
          </div>
        </div>

        {/* Still Disconnected Message */}
        {showFailedMsg && (
          <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800/50 text-xs text-rose-700 dark:text-rose-300 text-center font-bold animate-shake">
            {localizedContent.failedAlert}
          </div>
        )}

        {/* Action Buttons */}
        <div className="space-y-2 pt-1">
          <button
            onClick={handleRetry}
            disabled={isChecking}
            className="w-full py-3 px-4 rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold text-sm shadow-lg shadow-emerald-500/20 active:scale-[0.98] transition flex items-center justify-center gap-2 disabled:opacity-60"
          >
            <RefreshCw className={`w-4 h-4 ${isChecking ? 'animate-spin' : ''}`} />
            <span>{isChecking ? localizedContent.checkingBtn : localizedContent.retryBtn}</span>
          </button>

          <button
            onClick={onClose}
            className="w-full py-2.5 px-4 rounded-2xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold text-xs transition"
          >
            {localizedContent.cancelBtn}
          </button>
        </div>
      </div>
    </div>
  );
};
