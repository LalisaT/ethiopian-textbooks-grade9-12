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
  Send,
  ShieldCheck,
  X,
  Volume2,
} from 'lucide-react';
import { NotificationService, AppNotification } from '../../services/notificationService';

interface NotificationDropdownProps {
  onNavigateNotification?: (notification: AppNotification) => void;
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
        return <Sparkles className="w-4 h-4 text-yellow-400" />;
      case 'download':
        return <DownloadCloud className="w-4 h-4 text-sky-400" />;
      case 'exam_alert':
        return <Award className="w-4 h-4 text-amber-400" />;
      default:
        return <BookOpen className="w-4 h-4 text-blue-400" />;
    }
  };

  return (
    <div ref={dropdownRef} className="relative">
      {/* Bell Button */}
      <button
        onClick={() => {
          setIsOpen(!isOpen);
          refreshNotifs();
        }}
        className={`relative w-9 h-9 rounded-xl transition-all flex items-center justify-center luxury-pressable cursor-pointer ${
          isOpen ? 'btn-luxury-active' : 'btn-luxury-idle'
        }`}
        title="App & Study Notifications"
      >
        <Bell className={`w-4 h-4 ${isOpen ? 'text-sky-300' : 'text-slate-300'}`} />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-blue-600 text-white text-[9px] font-black items-center justify-center ring-2 ring-white dark:ring-slate-900">
              {unreadCount}
            </span>
          </span>
        )}
      </button>

      {/* Notification Dropdown Panel */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
          {/* Header */}
          <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-950/80">
            <div className="flex items-center gap-2">
              <Bell className="w-4 h-4 text-blue-600 dark:text-sky-400" />
              <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">
                Notifications
              </h3>
              {unreadCount > 0 && (
                <span className="px-2 py-0.5 bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-sky-300 font-bold text-[10px] rounded-full">
                  {unreadCount} new
                </span>
              )}
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={() => {
                  NotificationService.playSound();
                  NotificationService.vibrate();
                }}
                className="p-1 text-xs text-slate-500 hover:text-amber-500 transition-colors"
                title="Test notification chime sound"
              >
                <Volume2 className="w-3.5 h-3.5" />
              </button>
              {notifications.length > 0 && (
                <>
                  <button
                    onClick={handleMarkAllRead}
                    className="p-1 text-xs text-slate-500 hover:text-blue-600 dark:hover:text-sky-400 transition-colors"
                    title="Mark all as read"
                  >
                    <Check className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={handleClearAll}
                    className="p-1 text-xs text-slate-500 hover:text-rose-500 transition-colors"
                    title="Clear all"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </>
              )}
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* System Push Permission Banner */}
          {permission !== 'granted' ? (
            <div className="p-3 bg-amber-50 dark:bg-amber-950/40 border-b border-amber-200 dark:border-amber-900/60 flex items-center justify-between gap-2 text-xs">
              <div className="flex items-center gap-2 text-amber-800 dark:text-amber-300">
                <ShieldCheck className="w-4 h-4 shrink-0 text-amber-500" />
                <span className="font-medium">Get offline study & exam alerts on this device</span>
              </div>
              <button
                onClick={handleRequestPermission}
                className="px-2.5 py-1 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-lg text-[11px] shrink-0 shadow-sm active:scale-95"
              >
                Allow
              </button>
            </div>
          ) : (
            <div className="px-4 py-2.5 bg-blue-50/50 dark:bg-blue-950/20 border-b border-blue-200/40 dark:border-blue-800/40 flex items-center gap-1.5 text-[11px] text-blue-700 dark:text-sky-400 font-bold">
              <CheckCircle className="w-3.5 h-3.5" />
              <span>Device Push Notifications Active</span>
            </div>
          )}

          {/* Notification List */}
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
                  className={`p-4 transition-all cursor-pointer flex gap-3 items-start group ${
                    !n.read
                      ? 'bg-blue-50/30 dark:bg-blue-950/20 hover:bg-blue-100/40 dark:hover:bg-blue-900/30'
                      : 'hover:bg-slate-50 dark:hover:bg-slate-800/50'
                  }`}
                >
                  <div className="w-8 h-8 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center shrink-0 mt-0.5 shadow-sm group-hover:scale-105 transition-transform">
                    {getNotifIcon(n.type)}
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-extrabold text-xs text-slate-900 dark:text-white leading-tight group-hover:text-blue-600 dark:group-hover:text-sky-400 transition-colors">
                        {n.title}
                      </h4>
                      {!n.read && (
                        <span className="w-2 h-2 rounded-full bg-sky-400 shrink-0" />
                      )}
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                      {n.body}
                    </p>
                    <div className="flex items-center justify-between pt-1">
                      <span className="text-[10px] text-slate-400 font-medium">
                        {new Date(n.date).toLocaleDateString()} at{' '}
                        {new Date(n.date).toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </span>
                      <span className="text-[10px] font-bold text-blue-600 dark:text-sky-400 opacity-0 group-hover:opacity-100 transition-opacity">
                        Open &rarr;
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};
