import React, { useState, useEffect, useRef } from 'react';
import {
  Bell,
  CheckCircle,
  DownloadCloud,
  Award,
  BookOpen,
  Sparkles,
  Check,
  Trash2,
  X,
  Volume2,
  RefreshCw,
  Clock,
  ChevronRight,
  ShieldCheck,
} from 'lucide-react';
import { NotificationService, AppNotification } from '../../services/notificationService';

interface NotificationDropdownProps {
  onNavigateNotification?: (notification: AppNotification) => void;
}

function formatTimeAgo(isoString: string): string {
  try {
    const diffMs = Date.now() - new Date(isoString).getTime();
    const diffSec = Math.floor(diffMs / 1000);
    const diffMin = Math.floor(diffSec / 60);
    const diffHours = Math.floor(diffMin / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMin < 1) return 'Just now';
    if (diffMin < 60) return `${diffMin}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays}d ago`;
    return new Date(isoString).toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
  } catch {
    return 'Recently';
  }
}

export const NotificationDropdown: React.FC<NotificationDropdownProps> = ({
  onNavigateNotification,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [notifications, setNotifications] = useState<AppNotification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [permission, setPermission] = useState<NotificationPermission>('default');
  const dropdownRef = useRef<HTMLDivElement>(null);

  const refreshNotifs = () => {
    setNotifications(NotificationService.getNotifications());
    setUnreadCount(NotificationService.getUnreadCount());
    setPermission(NotificationService.getPermission());
  };

  useEffect(() => {
    refreshNotifs();

    // Close on outside click
    const handleOutsideClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleSync = () => refreshNotifs();

    window.addEventListener('notifications-changed', handleSync);
    window.addEventListener('storage', handleSync);
    window.addEventListener('focus', handleSync);
    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      window.removeEventListener('notifications-changed', handleSync);
      window.removeEventListener('storage', handleSync);
      window.removeEventListener('focus', handleSync);
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  const handleRequestPermission = async () => {
    const granted = await NotificationService.requestPermission();
    refreshNotifs();
  };

  const handleMarkAllRead = () => {
    NotificationService.markAllAsRead();
    refreshNotifs();
  };

  const handleClearAll = () => {
    NotificationService.clearAll();
    refreshNotifs();
  };

  const getNotifIcon = (type: AppNotification['type']) => {
    switch (type) {
      case 'welcome':
        return <Sparkles className="w-4 h-4 text-sky-500" />;
      case 'download':
        return <DownloadCloud className="w-4 h-4 text-sky-500" />;
      case 'exam_alert':
        return <Award className="w-4 h-4 text-amber-500" />;
      default:
        return <BookOpen className="w-4 h-4 text-sky-500" />;
    }
  };

  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleSyncNotifications = async () => {
    setIsRefreshing(true);
    try {
      await NotificationService.syncNotificationsFromRemote();
      refreshNotifs();
    } finally {
      setTimeout(() => setIsRefreshing(false), 500);
    }
  };

  return (
    <div ref={dropdownRef} className="relative">
      {/* Bell Trigger Button */}
      <button
        onClick={() => {
          const next = !isOpen;
          setIsOpen(next);
          refreshNotifs();
          if (next) {
            NotificationService.syncNotificationsFromRemote().then(() => refreshNotifs()).catch(() => {});
          }
        }}
        className={`relative w-9 h-9 rounded-2xl transition-colors flex items-center justify-center cursor-pointer shrink-0 ${
          isOpen
            ? 'bg-sky-500 text-white shadow-md shadow-sky-500/20'
            : 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300'
        }`}
        title="App & Study Notifications"
        aria-label="App & Study Notifications"
      >
        <Bell className="w-4 h-4" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="relative inline-flex rounded-full h-4 w-4 bg-sky-500 text-white text-[9px] font-black items-center justify-center ring-2 ring-white dark:ring-slate-900">
              {unreadCount}
            </span>
          </span>
        )}
      </button>

      {/* Notification Dropdown Panel - Matching Photo 1 with Full Light & Dark Theme Support */}
      {isOpen && (
        <div className="fixed inset-x-3 top-16 max-w-sm mx-auto sm:absolute sm:inset-auto sm:right-0 sm:top-full sm:mt-2 sm:w-96 bg-white dark:bg-slate-900 rounded-[28px] shadow-2xl border border-slate-200/90 dark:border-slate-800 overflow-hidden z-50 text-slate-800 dark:text-slate-100">
          {/* Main Top Header */}
          <div className="p-4 border-b border-slate-100 dark:border-slate-800/80 flex items-center justify-between bg-white dark:bg-slate-900">
            <div className="flex items-center gap-3">
              {/* Rounded Bell Container */}
              <div className="w-10 h-10 rounded-2xl bg-sky-50 dark:bg-sky-950/60 border border-sky-100 dark:border-sky-800/70 flex items-center justify-center text-sky-500 shrink-0">
                <Bell className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-extrabold text-base text-slate-900 dark:text-white leading-tight">
                    Notifications
                  </h3>
                  {unreadCount > 0 && (
                    <span className="px-2 py-0.5 bg-sky-500 text-white font-bold text-[10px] rounded-full">
                      {unreadCount} new
                    </span>
                  )}
                </div>
                <p className="text-[11px] text-slate-400 dark:text-slate-400 mt-0.5 font-normal leading-tight">
                  Live alerts for newly published tips & guides
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1 text-slate-400">
              <button
                onClick={handleSyncNotifications}
                className="p-1.5 hover:text-sky-500 transition-colors"
                title="Sync from cloud"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin text-sky-500' : ''}`} />
              </button>
              <button
                onClick={async () => {
                  await NotificationService.sendSystemNotification(
                    '📚 System Notification Test',
                    'Notification bar alerts, sound chime, and vibration are active and working!'
                  );
                }}
                className="p-1.5 hover:text-amber-500 transition-colors"
                title="Test notification chime sound & status bar alert"
              >
                <Volume2 className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                title="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Action Row: Mark all as read & Clear all */}
          <div className="px-4 py-2 border-b border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs bg-slate-50/60 dark:bg-slate-950/40">
            <button
              onClick={handleMarkAllRead}
              className="text-sky-600 dark:text-sky-400 font-bold hover:underline flex items-center gap-1 cursor-pointer transition-colors"
            >
              <Check className="w-3.5 h-3.5" />
              <span>Mark all as read</span>
            </button>
            <button
              onClick={handleClearAll}
              className="text-rose-500 dark:text-rose-400 font-bold hover:underline flex items-center gap-1 cursor-pointer transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span>Clear all</span>
            </button>
          </div>

          {/* Device Push Permission Prompt if not granted */}
          {permission !== 'granted' && (
            <div className="p-3 bg-amber-50 dark:bg-amber-950/40 border-b border-amber-200 dark:border-amber-900/60 flex items-center justify-between gap-2 text-xs">
              <div className="flex items-center gap-2 text-amber-800 dark:text-amber-300">
                <ShieldCheck className="w-4 h-4 shrink-0 text-amber-500" />
                <span className="font-medium text-[11px]">Get offline study & exam alerts on this device</span>
              </div>
              <button
                onClick={handleRequestPermission}
                className="px-2.5 py-1 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-lg text-[11px] shrink-0 shadow-sm"
              >
                Allow
              </button>
            </div>
          )}

          {/* Notification Items List */}
          <div className="max-h-80 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800/60">
            {notifications.length === 0 ? (
              <div className="p-8 text-center space-y-2 text-slate-400">
                <Bell className="w-8 h-8 mx-auto opacity-30" />
                <p className="text-xs font-medium">No new notifications</p>
              </div>
            ) : (
              notifications.map((n) => (
                <div
                  key={n.id}
                  onClick={() => {
                    NotificationService.markAsRead(n.id);
                    refreshNotifs();
                    setIsOpen(false);
                    if (onNavigateNotification) {
                      onNavigateNotification(n);
                    }
                  }}
                  className={`p-3.5 transition-colors cursor-pointer flex gap-3 items-start group ${
                    !n.read
                      ? 'bg-sky-50/40 dark:bg-sky-950/20 hover:bg-sky-50/70 dark:hover:bg-sky-950/40'
                      : 'hover:bg-slate-50 dark:hover:bg-slate-800/40'
                  }`}
                >
                  {/* Unread Blue Dot Indicator */}
                  <span
                    className={`w-2 h-2 rounded-full shrink-0 mt-3 transition-colors ${
                      !n.read ? 'bg-sky-500 shadow-xs' : 'bg-transparent'
                    }`}
                  />

                  {/* App / Category Avatar */}
                  <div className="w-8 h-8 rounded-xl bg-sky-50 dark:bg-sky-950/60 border border-sky-100 dark:border-sky-800/60 flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
                    {getNotifIcon(n.type)}
                  </div>

                  {/* Notification Content */}
                  <div className="flex-1 min-w-0 space-y-1">
                    {/* Eyebrow: Tag Pill, Timestamp & Chevron */}
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-[10px] font-black uppercase tracking-wider text-slate-600 dark:text-slate-300">
                        {n.category || (n.type === 'exam_alert' ? 'EXAM ALERT' : n.type === 'welcome' ? 'WELCOME GUIDE' : 'PULSE UPDATE')}
                      </span>
                      <span className="text-[11px] text-slate-400 dark:text-slate-500 font-medium flex items-center gap-1">
                        <Clock className="w-3 h-3 text-slate-400" />
                        <span>{formatTimeAgo(n.date)}</span>
                      </span>
                      <ChevronRight className="w-4 h-4 text-slate-300 dark:text-slate-600 ml-auto group-hover:text-slate-500 dark:group-hover:text-slate-400 transition-colors" />
                    </div>

                    {/* Title */}
                    <h4 className="font-extrabold text-xs text-slate-900 dark:text-white leading-tight line-clamp-1 group-hover:text-sky-600 dark:group-hover:text-sky-400 transition-colors">
                      {n.title.startsWith('📝') || n.title.startsWith('📢') || n.title.startsWith('📚') ? n.title : `📝 ${n.title}`}
                    </h4>

                    {/* Body Preview */}
                    <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed font-normal">
                      {n.body}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Bottom Footer - Matching Photo 1 */}
          <div className="py-2.5 bg-slate-50/80 dark:bg-slate-950/60 border-t border-slate-100 dark:border-slate-800/80 text-center">
            <span className="text-[11px] font-semibold text-slate-400 dark:text-slate-500">
              Ethiopian Textbooks Alert Center
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
