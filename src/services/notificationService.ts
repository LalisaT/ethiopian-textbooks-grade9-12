export interface AppNotification {
  id: string;
  title: string;
  body: string;
  date: string;
  read: boolean;
  type: 'welcome' | 'download' | 'study_reminder' | 'exam_alert' | 'book_update' | 'admin_broadcast';
  actionUrl?: string;
  category?: string;
  grade?: string;
}

const STORAGE_KEY = 'ethio_app_notifications';
const SETTINGS_KEY = 'ethio_notification_settings';

export interface NotificationSettings {
  enabled: boolean;
  soundEnabled: boolean;
  vibrationEnabled: boolean;
  dailyStudyReminders: boolean;
  examAlerts: boolean;
  downloadAlerts: boolean;
}

const DEFAULT_NOTIFICATIONS: AppNotification[] = [
  {
    id: 'notif-welcome',
    title: 'Welcome to Ethiopian Digital Textbooks!',
    body: 'Your offline digital library for Grades 9-12 & ESSLCE is ready. Download books and study anytime without internet connection.',
    date: new Date().toISOString(),
    read: false,
    type: 'welcome',
  },
  {
    id: 'notif-exam-prep',
    title: 'Grade 12 ESSLCE / Matric Exam Simulation',
    body: 'Practice with authentic national entrance exam questions covering Grades 9-12 across Natural & Social Science streams with instant feedback.',
    date: new Date(Date.now() - 3600000 * 2).toISOString(),
    read: false,
    type: 'exam_alert',
  },
];

/**
 * Play a crystal-clear, pleasant notification chime sound using Web Audio API
 */
function playChimeSound() {
  try {
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;

    const ctx = new AudioContextClass();

    // 1st Tone (D5 - 587.33 Hz)
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(587.33, ctx.currentTime);
    gain1.gain.setValueAtTime(0.2, ctx.currentTime);
    gain1.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);
    osc1.connect(gain1);
    gain1.connect(ctx.destination);
    osc1.start(ctx.currentTime);
    osc1.stop(ctx.currentTime + 0.35);

    // 2nd Tone (A5 - 880 Hz) - slightly higher after 100ms
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(880, ctx.currentTime + 0.1);
    gain2.gain.setValueAtTime(0.25, ctx.currentTime + 0.1);
    gain2.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.55);
    osc2.connect(gain2);
    gain2.connect(ctx.destination);
    osc2.start(ctx.currentTime + 0.1);
    osc2.stop(ctx.currentTime + 0.55);

    // 3rd Harmonic Tone (D6 - 1174.66 Hz) for rich bell shimmer
    const osc3 = ctx.createOscillator();
    const gain3 = ctx.createGain();
    osc3.type = 'triangle';
    osc3.frequency.setValueAtTime(1174.66, ctx.currentTime + 0.18);
    gain3.gain.setValueAtTime(0.15, ctx.currentTime + 0.18);
    gain3.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.7);
    osc3.connect(gain3);
    gain3.connect(ctx.destination);
    osc3.start(ctx.currentTime + 0.18);
    osc3.stop(ctx.currentTime + 0.7);
  } catch (e) {
    console.warn('Audio chime warning:', e);
  }
}

/**
 * Trigger phone vibration
 */
function vibratePhone() {
  if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
    try {
      navigator.vibrate([200, 100, 200]);
    } catch {}
  }
}

export const NotificationService = {
  // Play the notification audio sound
  playSound() {
    playChimeSound();
  },

  // Trigger device vibration
  vibrate() {
    vibratePhone();
  },

  // Check if browser notifications are supported
  isSupported(): boolean {
    return typeof window !== 'undefined' && 'Notification' in window;
  },

  // Get current permission status
  getPermission(): NotificationPermission {
    if (!this.isSupported()) return 'denied';
    return Notification.permission;
  },

  // Request user permission for device notifications
  async requestPermission(): Promise<boolean> {
    if (!this.isSupported()) return false;
    try {
      const perm = await Notification.requestPermission();
      const enabled = perm === 'granted';
      this.saveSettings({ enabled });

      if (enabled) {
        this.sendSystemNotification(
          'Notifications & Sound Activated!',
          'You will receive real-time push alerts with sound on your phone/device whenever new books are posted or exam alerts arrive.'
        );
      }
      return enabled;
    } catch (err) {
      console.error('Error requesting notification permission:', err);
      return false;
    }
  },

  // Send a real device / browser / phone system push notification with sound & vibration
  sendSystemNotification(title: string, body: string, icon: string = '/icon-192.png') {
    // 1. Play sound
    playChimeSound();

    // 2. Vibrate phone
    vibratePhone();

    // 3. Dispatch system notification (via ServiceWorker if available, else standard Notification)
    if (!this.isSupported() || Notification.permission !== 'granted') {
      return;
    }

    try {
      if ('serviceWorker' in navigator && navigator.serviceWorker.controller) {
        navigator.serviceWorker.ready.then((reg) => {
          reg.showNotification(title, {
            body,
            icon,
            badge: icon,
            vibrate: [200, 100, 200],
            tag: `ethio-alert-${Date.now()}`,
            data: { url: window.location.origin },
          } as any);
        });
      } else {
        new Notification(title, {
          body,
          icon,
          badge: icon,
          tag: `ethio-alert-${Date.now()}`,
        });
      }
    } catch (err) {
      console.error('Failed to dispatch system notification:', err);
    }
  },

  // Get all in-app notifications (auto-cleaning any test spam)
  getNotifications(): AppNotification[] {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (!data) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_NOTIFICATIONS));
        return DEFAULT_NOTIFICATIONS;
      }
      const parsed: AppNotification[] = JSON.parse(data);
      // Clean out test notifications
      const cleaned = parsed.filter(
        (n) => !n.title.toLowerCase().includes('test notification')
      );
      if (cleaned.length !== parsed.length) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(cleaned));
      }
      return cleaned.length > 0 ? cleaned : DEFAULT_NOTIFICATIONS;
    } catch {
      return DEFAULT_NOTIFICATIONS;
    }
  },

  // Add new notification, play sound, and dispatch phone popup
  addNotification(
    title: string,
    body: string,
    type: AppNotification['type'] = 'admin_broadcast',
    actionUrl?: string,
    category?: string,
    grade?: string
  ): AppNotification {
    const list = this.getNotifications();
    const newNotif: AppNotification = {
      id: `notif-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      title,
      body,
      date: new Date().toISOString(),
      read: false,
      type,
      actionUrl,
      category,
      grade,
    };

    const updated = [newNotif, ...list.slice(0, 49)];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));

    // Dispatch phone system popup with sound & vibration
    this.sendSystemNotification(title, body);

    return newNotif;
  },

  // Admin Broadcast Alert Method
  broadcastAdminAlert(
    title: string,
    message: string,
    category: string = 'General Announcement',
    grade: string = 'All Grades',
    actionUrl: string = 'tab:community'
  ): AppNotification {
    const fullTitle = title;
    const body = `${message} (Target: ${grade} • Category: ${category})`;
    return this.addNotification(fullTitle, body, 'admin_broadcast', actionUrl, category, grade);
  },

  // Auto-Broadcast on Single Book Upload
  broadcastBookPublished(bookTitle: string, grade: number, subject: string, bookId?: string): AppNotification {
    const title = `New Textbook Added: ${bookTitle}`;
    const body = `Official Grade ${grade} ${subject} textbook has been uploaded and is ready for offline reading and 25-50 question quizzes!`;
    const actionUrl = bookId ? `book:${bookId}` : `book:${bookTitle}`;
    return this.addNotification(title, body, 'book_update', actionUrl, 'Textbook Upload', `Grade ${grade}`);
  },

  // Auto-Broadcast on Multi-PDF Batch Upload
  broadcastBatchPublished(count: number, firstBookId?: string): AppNotification {
    const title = `${count} New Textbooks Uploaded!`;
    const body = `A batch of ${count} new textbooks have been published to your library with auto-generated practice quizzes.`;
    const actionUrl = firstBookId ? `book:${firstBookId}` : 'tab:explore';
    return this.addNotification(title, body, 'book_update', actionUrl, 'Batch Upload', 'Multi-Grade');
  },

  // Trigger "App Downloaded / Installed" Notification
  notifyAppInstalled(): void {
    this.addNotification(
      'App Successfully Installed!',
      'Ethiopian Textbooks is now installed on your device. You can launch it directly from your home screen and study 100% offline!',
      'download'
    );
  },

  // Trigger "Book Downloaded Offline" Notification
  notifyBookDownloaded(bookTitle: string): void {
    this.addNotification(
      'Book Saved Offline',
      `"${bookTitle}" is now stored on your device. You can read it anytime without consuming mobile data.`,
      'download'
    );
  },

  // Mark all notifications as read
  markAllAsRead(): void {
    const list = this.getNotifications().map((n) => ({ ...n, read: true }));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  },

  // Mark single notification as read
  markAsRead(id: string): void {
    const list = this.getNotifications().map((n) => (n.id === id ? { ...n, read: true } : n));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  },

  // Clear all notifications
  clearAll(): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
  },

  // Get unread notification count
  getUnreadCount(): number {
    return this.getNotifications().filter((n) => !n.read).length;
  },

  // Get settings
  getSettings(): NotificationSettings {
    try {
      const data = localStorage.getItem(SETTINGS_KEY);
      return data
        ? JSON.parse(data)
        : {
            enabled: this.getPermission() === 'granted',
            soundEnabled: true,
            vibrationEnabled: true,
            dailyStudyReminders: true,
            examAlerts: true,
            downloadAlerts: true,
          };
    } catch {
      return {
        enabled: false,
        soundEnabled: true,
        vibrationEnabled: true,
        dailyStudyReminders: true,
        examAlerts: true,
        downloadAlerts: true,
      };
    }
  },

  // Save settings
  saveSettings(settings: Partial<NotificationSettings>): void {
    const current = this.getSettings();
    const updated = { ...current, ...settings };
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(updated));
  },
};
