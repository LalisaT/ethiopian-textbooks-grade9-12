import { db, sanitizeForFirestore } from './firebaseConfig';
import {
  collection,
  doc,
  setDoc,
  deleteDoc,
  onSnapshot,
  query,
  orderBy,
  limit,
} from 'firebase/firestore';
import { LocalNotifications } from '@capacitor/local-notifications';
import { PushNotifications, Token, ActionPerformed } from '@capacitor/push-notifications';
import { Capacitor } from '@capacitor/core';

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
  imageUrl?: string;
  imageCaption?: string;
  attachedBookId?: string;
  attachedBookTitle?: string;
  linkUrl?: string;
  linkTitle?: string;
  postId?: string;
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
    body: 'Your offline digital library for Grades 9-12 & EUEE is ready. Download books and study anytime without internet connection.',
    date: new Date().toISOString(),
    read: false,
    type: 'welcome',
  },
  {
    id: 'notif-exam-prep',
    title: 'Grade 12 EUEE / Matric Exam Simulation',
    body: 'Practice with authentic national entrance exam questions covering Grades 9-12 across Natural & Social Science streams with instant feedback.',
    date: new Date(Date.now() - 3600000 * 2).toISOString(),
    read: false,
    type: 'exam_alert',
    actionUrl: 'tab:examprep',
  },
];

let sharedAudioCtx: AudioContext | null = null;
let sharedAudioElement: HTMLAudioElement | null = null;
let isAudioUnlocked = false;

/**
 * Get or initialize shared AudioContext safely
 */
function getSharedAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  try {
    if (!sharedAudioCtx) {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioContextClass) {
        sharedAudioCtx = new AudioContextClass();
      }
    }
    if (sharedAudioCtx && sharedAudioCtx.state === 'suspended') {
      sharedAudioCtx.resume().catch(() => {});
    }
    return sharedAudioCtx;
  } catch {
    return null;
  }
}

/**
 * Get or initialize HTML5 audio element with fallback
 */
function getSharedAudioElement(): HTMLAudioElement | null {
  if (typeof window === 'undefined') return null;
  try {
    if (!sharedAudioElement) {
      sharedAudioElement = new Audio('/sounds/notification-chime.wav');
      sharedAudioElement.preload = 'auto';
      sharedAudioElement.volume = 0.9;
    }
    return sharedAudioElement;
  } catch {
    return null;
  }
}

/**
 * Global unlocker for mobile and browser autoplay policies
 */
function unlockAudioEngine() {
  if (isAudioUnlocked) return;
  isAudioUnlocked = true;

  try {
    const ctx = getSharedAudioContext();
    if (ctx && ctx.state === 'suspended') {
      ctx.resume().catch(() => {});
    }
  } catch {}

  try {
    const audio = getSharedAudioElement();
    if (audio) {
      audio.load();
    }
  } catch {}

  // Remove listeners after first interaction
  if (typeof window !== 'undefined') {
    window.removeEventListener('click', unlockAudioEngine);
    window.removeEventListener('touchstart', unlockAudioEngine);
    window.removeEventListener('keydown', unlockAudioEngine);
    window.removeEventListener('pointerdown', unlockAudioEngine);
  }
}

// Auto-register unlock listeners
if (typeof window !== 'undefined') {
  window.addEventListener('click', unlockAudioEngine, { passive: true, once: true });
  window.addEventListener('touchstart', unlockAudioEngine, { passive: true, once: true });
  window.addEventListener('keydown', unlockAudioEngine, { passive: true, once: true });
  window.addEventListener('pointerdown', unlockAudioEngine, { passive: true, once: true });
}

/**
 * Play synthesized Web Audio push notification chime (Apple / Telegram style dual-bell)
 */
function playWebAudioChime() {
  const ctx = getSharedAudioContext();
  if (!ctx) return false;

  try {
    if (ctx.state === 'suspended') {
      ctx.resume().catch(() => {});
    }

    const now = ctx.currentTime;

    // 1st Bell Tone: G#5 (830.61 Hz) - Crisp attack with bell decay
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(830.61, now);
    gain1.gain.setValueAtTime(0.001, now);
    gain1.gain.linearRampToValueAtTime(0.45, now + 0.006);
    gain1.gain.exponentialRampToValueAtTime(0.0001, now + 0.45);
    osc1.connect(gain1);
    gain1.connect(ctx.destination);
    osc1.start(now);
    osc1.stop(now + 0.45);

    // 2nd Bell Tone: C#6 (1108.73 Hz) - Enters at 85ms for the iconic "Ding-Dong" chime
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(1108.73, now + 0.085);
    gain2.gain.setValueAtTime(0.001, now + 0.085);
    gain2.gain.linearRampToValueAtTime(0.5, now + 0.092);
    gain2.gain.exponentialRampToValueAtTime(0.0001, now + 0.7);
    osc2.connect(gain2);
    gain2.connect(ctx.destination);
    osc2.start(now + 0.085);
    osc2.stop(now + 0.7);

    // 3rd Overtone Harmonic: G#6 (1661.22 Hz) - Glassy bell shimmer
    const osc3 = ctx.createOscillator();
    const gain3 = ctx.createGain();
    osc3.type = 'triangle';
    osc3.frequency.setValueAtTime(1661.22, now + 0.09);
    gain3.gain.setValueAtTime(0.001, now + 0.09);
    gain3.gain.linearRampToValueAtTime(0.2, now + 0.098);
    gain3.gain.exponentialRampToValueAtTime(0.0001, now + 0.55);
    osc3.connect(gain3);
    gain3.connect(ctx.destination);
    osc3.start(now + 0.09);
    osc3.stop(now + 0.55);

    return true;
  } catch (e) {
    console.warn('Web Audio chime warning:', e);
    return false;
  }
}

/**
 * Play a crystal-clear, pleasant notification chime sound across all devices
 */
export function playChimeSound() {
  unlockAudioEngine();

  // Primary: Try HTML5 audio file first (cleanest acoustic recording)
  let played = false;
  try {
    const audio = getSharedAudioElement();
    if (audio) {
      audio.currentTime = 0;
      const promise = audio.play();
      if (promise !== undefined) {
        promise
          .then(() => {
            played = true;
          })
          .catch(() => {
            // If browser blocked HTML5 audio, fallback to Web Audio API
            playWebAudioChime();
          });
      }
    }
  } catch {
    // Fallback immediately
  }

  // Also trigger Web Audio chime if audio element was not immediately successful
  if (!played) {
    playWebAudioChime();
  }
}

/**
 * Trigger phone vibration
 */
export function vibratePhone() {
  if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
    try {
      navigator.vibrate([200, 100, 200]);
    } catch {}
  }
}
let isNativeNotifInitialized = false;

/**
 * Initialize native Android & iOS push notification channels, FCM registration, and background alarms
 */
export async function initNativeNotifications(
  onNotificationTapped?: (notification: AppNotification) => void
) {
  if (typeof window === 'undefined') return;
  if (!Capacitor.isNativePlatform()) return;
  if (isNativeNotifInitialized) return;
  isNativeNotifInitialized = true;

  try {
    // 1. Create Android Notification Channel (High priority heads-up status bar alert with sound & vibration)
    await LocalNotifications.createChannel({
      id: 'ethio_announcements_channel',
      name: 'Ethiopian Textbooks & Alerts',
      description: 'Textbook updates, daily study reminders, and EUEE exam alerts',
      importance: 5, // High importance (heads-up notification on top)
      visibility: 1, // Visible on secure lockscreen
      sound: 'notification_chime.wav',
      vibration: true,
      lights: true,
      lightColor: '#F59E0B',
    });

    // 2. Request Standard In-App Notification Permission (POST_NOTIFICATIONS) & Register FCM
    // Using PushNotifications.requestPermissions() displays the native in-app dialog popup
    // (identical to Facebook, Telegram, WhatsApp) without ever leaving the app.
    try {
      const pushPerm = await PushNotifications.requestPermissions();
      if (pushPerm.receive === 'granted') {
        NotificationService.saveSettings({ enabled: true });
        await PushNotifications.register();
      }

      PushNotifications.addListener('registration', async (token: Token) => {
        try {
          await setDoc(
            doc(db, 'device_push_tokens', token.value),
            {
              token: token.value,
              platform: Capacitor.getPlatform(),
              updatedAt: new Date().toISOString(),
              appName: 'Ethiopian Textbooks Grade 9-12',
            },
            { merge: true }
          );
        } catch (e) {
          console.warn('Could not save FCM device push token to Firestore:', e);
        }
      });

      PushNotifications.addListener('registrationError', (err) => {
        console.warn('Push registration warning:', err);
      });

      // Handle push notification received in foreground
      PushNotifications.addListener('pushNotificationReceived', (notification) => {
        playChimeSound();
        vibratePhone();
        NotificationService.addNotification(
          notification.title || 'Official Announcement',
          notification.body || '',
          'admin_broadcast',
          notification.data?.actionUrl,
          notification.data?.category,
          notification.data?.grade,
          notification.data
        );
      });

      // Handle push notification tapped from Android status bar / lockscreen
      PushNotifications.addListener('pushNotificationActionPerformed', (action: ActionPerformed) => {
        const notifData = action.notification.data as AppNotification;
        if (onNotificationTapped && notifData) {
          onNotificationTapped(notifData);
        }
      });
    } catch (pushErr) {
      console.warn('Push notification registration warning:', pushErr);
    }

    // 4. Handle Local notification tapped from Android status bar
    LocalNotifications.addListener('localNotificationActionPerformed', (action) => {
      const extra = action.notification.extra as AppNotification;
      if (onNotificationTapped && extra) {
        onNotificationTapped(extra);
      }
    });

  } catch (err) {
    console.warn('Native notification initialization error:', err);
  }
}

/**
 * Inexact recurring study reminder (standard Android non-exact alarm, zero battery impact, never leaves app)
 */
export async function scheduleDailyStudyReminder() {
  if (typeof window === 'undefined' || !Capacitor.isNativePlatform()) return;
  try {
    const pending = await LocalNotifications.getPending();
    const hasReminder = pending.notifications.some((n) => n.id === 99901);
    if (!hasReminder) {
      await LocalNotifications.schedule({
        notifications: [
          {
            id: 99901,
            title: '📚 Daily Study Reminder',
            body: 'Keep your study streak going! Review Grade 9-12 textbooks & take a quick exam quiz today.',
            channelId: 'ethio_announcements_channel',
            sound: 'notification_chime.wav',
            // Inexact notification configuration to ensure Android never requests Alarms & Reminders permission
            extra: { type: 'study_reminder' },
            schedule: {
              on: { hour: 19, minute: 0 },
              repeats: true,
            },
          } as any,
        ],
      });
    }
  } catch (e) {
    console.warn('Failed to schedule daily study reminder:', e);
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
    if (typeof window === 'undefined') return false;
    if (Capacitor.isNativePlatform()) return true;
    return 'Notification' in window;
  },

  // Get current permission status
  getPermission(): NotificationPermission {
    if (typeof window === 'undefined') return 'denied';
    if (Capacitor.isNativePlatform()) {
      return this.getSettings().enabled ? 'granted' : 'default';
    }
    if (!this.isSupported()) return 'denied';
    return Notification.permission;
  },

  // Request user permission for device notifications
  async requestPermission(): Promise<boolean> {
    if (Capacitor.isNativePlatform()) {
      try {
        let granted = false;
        try {
          // Request Android 13+ in-app POST_NOTIFICATIONS dialog (identical to Facebook/Telegram)
          const push = await PushNotifications.requestPermissions();
          granted = push.receive === 'granted';
          if (granted) {
            await PushNotifications.register();
          }
        } catch (e) {
          console.warn('Push notification permission error:', e);
        }

        this.saveSettings({ enabled: granted });

        if (granted) {
          await this.sendSystemNotification(
            'Notifications & Sound Activated!',
            'You will receive real-time push alerts with sound on your status bar whenever new books are posted or exam alerts arrive.'
          );
        }
        return granted;
      } catch (err) {
        console.error('Error requesting native notification permission:', err);
        return false;
      }
    }

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
  async sendSystemNotification(title: string, body: string, icon: string = '/icon-192.png', extraData?: any) {
    // 1. Play sound
    playChimeSound();

    // 2. Vibrate phone
    vibratePhone();

    // 3. Dispatch on native Android status bar with sound & high priority heads-up!
    if (Capacitor.isNativePlatform()) {
      try {
        const notifId = Math.floor(Math.random() * 2147483647);
        await LocalNotifications.schedule({
          notifications: [
            {
              id: notifId,
              title,
              body,
              channelId: 'ethio_announcements_channel',
              sound: 'notification_chime.wav',
              extra: extraData || {},
            },
          ],
        });
        return;
      } catch (nativeErr) {
        console.warn('Native LocalNotifications.schedule error:', nativeErr);
      }
    }

    // 4. Fallback for Web/PWA
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
            data: { url: window.location.origin, ...(extraData || {}) },
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

  // Get all in-app notifications
  getNotifications(): AppNotification[] {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (!data) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_NOTIFICATIONS));
        return DEFAULT_NOTIFICATIONS;
      }
      const parsed: AppNotification[] = JSON.parse(data);
      let deletedPostIds: string[] = [];
      try {
        deletedPostIds = JSON.parse(localStorage.getItem('ethio_community_deleted_posts') || '[]');
      } catch {}

      // Clean out deleted post notifications and route exam prep properly
      const cleaned = parsed
        .filter((n) => {
          if (!n || !n.title) return false;
          if (n.postId && deletedPostIds.includes(n.postId)) return false;
          if (n.id && deletedPostIds.some((delId) => n.id.includes(delId))) return false;
          return true;
        })
        .map((n) => {
          if (
            n.id === 'notif-exam-prep' ||
            n.type === 'exam_alert' ||
            /exam|matric|esslce|euee|simulation|quiz|question/i.test(`${n.title} ${n.body}`)
          ) {
            return { ...n, actionUrl: 'tab:examprep' };
          }
          return n;
        });
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cleaned));
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
    grade?: string,
    extra?: Partial<AppNotification>
  ): AppNotification {
    const list = this.getNotifications();
    const newNotif: AppNotification = {
      id: extra?.id || `notif-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`,
      title,
      body,
      date: new Date().toISOString(),
      read: false,
      type,
      actionUrl,
      category,
      grade,
      ...extra,
    };

    // If an item with this ID already exists, replace it, else prepend
    const existingIndex = list.findIndex((n) => n.id === newNotif.id);
    let updated: AppNotification[];
    if (existingIndex !== -1) {
      updated = [...list];
      updated[existingIndex] = { ...updated[existingIndex], ...newNotif };
    } else {
      updated = [newNotif, ...list.slice(0, 49)];
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));

    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('notifications-changed'));
    }

    // Dispatch phone system popup with sound & vibration
    this.sendSystemNotification(title, body);

    return newNotif;
  },

  // Admin Broadcast Alert Method (Writes to Firestore for instant delivery to all students)
  broadcastAdminAlert(
    title: string,
    message: string,
    category: string = 'General Announcement',
    grade: string = 'All Grades',
    actionUrl: string = 'tab:community',
    extra?: Partial<AppNotification>
  ): AppNotification {
    const fullTitle = title.trim();
    const body = message.trim();
    const notif = this.addNotification(fullTitle, body, 'admin_broadcast', actionUrl, category, grade, extra);

    // Sync to Cloud Firestore broadcast collection safely
    try {
      setDoc(doc(db, 'broadcast_notifications', notif.id), sanitizeForFirestore(notif), { merge: true }).catch((err) => {
        console.warn('Firestore broadcast notification warning:', err);
      });
    } catch (err) {
      console.warn('Firestore setDoc failed for notification:', err);
    }

    return notif;
  },

  // Synchronize a Community Post / Announcement to Notifications
  syncPostNotification(
    post: {
      id: string;
      title: string;
      content: string;
      category?: string;
      grade?: string;
      actionUrl?: string;
      imageUrl?: string;
      imageCaption?: string;
      attachedBookId?: string;
      attachedBookTitle?: string;
      linkUrl?: string;
      linkTitle?: string;
      linkType?: string;
    },
    shouldBroadcast: boolean = false
  ): AppNotification {
    const notifId = `notif-post-${post.id}`;
    const destination = post.attachedBookId
      ? `book:${post.attachedBookId}`
      : post.actionUrl || `tab:community#${post.id}`;
    const extra: Partial<AppNotification> = {
      id: notifId,
      postId: post.id,
      imageUrl: post.imageUrl || '',
      attachedBookId: post.attachedBookId || '',
      attachedBookTitle: post.attachedBookTitle || '',
      linkUrl: post.linkUrl || '',
      linkTitle: post.linkTitle || '',
    };

    const notif = this.addNotification(
      post.title,
      post.content,
      'admin_broadcast',
      destination,
      post.category || 'Official Announcement',
      post.grade || 'All Grades',
      extra
    );

    // Always sync official post notification to Firestore broadcast_notifications
    try {
      setDoc(doc(db, 'broadcast_notifications', notif.id), sanitizeForFirestore(notif), { merge: true }).catch((err) => {
        console.warn('Firestore syncPostNotification warning:', err);
      });
    } catch (err) {
      console.warn('Firestore setDoc failed for syncPostNotification:', err);
    }

    // If live broadcast requested, play sound & vibrate on sender device as well
    if (shouldBroadcast) {
      this.playSound();
      this.vibrate();
      this.sendSystemNotification(notif.title, notif.body);
    }

    return notif;
  },

  // Listen for live broadcast alerts sent by Admin from anywhere in real-time
  subscribeToBroadcastNotifications(onNewAlert?: (notif: AppNotification) => void): () => void {
    try {
      let isInitialLoad = true;
      // Index-free query: works immediately on all Firebase setups without requiring manual index creation
      const broadcastColl = collection(db, 'broadcast_notifications');
      const unsubscribe = onSnapshot(
        broadcastColl,
        (snapshot) => {
          let listChanged = false;
          const currentList = this.getNotifications();
          const notifMap = new Map<string, AppNotification>();
          currentList.forEach((n) => notifMap.set(n.id, n));

          snapshot.docChanges().forEach((change) => {
            const remoteNotif = change.doc.data() as AppNotification;
            if (!remoteNotif || !remoteNotif.title) return;

            if (change.type === 'added') {
              const alreadyExists = notifMap.has(remoteNotif.id);
              notifMap.set(remoteNotif.id, {
                ...remoteNotif,
                read: alreadyExists ? (notifMap.get(remoteNotif.id)?.read ?? false) : false,
              });
              listChanged = true;

              // If a new broadcast arrives while the app is active, immediately alert student!
              if (!isInitialLoad) {
                playChimeSound();
                vibratePhone();
                this.sendSystemNotification(remoteNotif.title, remoteNotif.body);
                if (onNewAlert) onNewAlert(remoteNotif);
              }
            } else if (change.type === 'modified') {
              // Notification was edited by Admin - update it live in real-time!
              const prevRead = notifMap.get(remoteNotif.id)?.read ?? false;
              notifMap.set(remoteNotif.id, {
                ...remoteNotif,
                read: prevRead,
              });
              listChanged = true;

              if (!isInitialLoad && onNewAlert) {
                playChimeSound();
                vibratePhone();
                onNewAlert(remoteNotif);
              }
            } else if (change.type === 'removed') {
              notifMap.delete(change.doc.id);
              for (const [id, notif] of notifMap.entries()) {
                if (notif.postId === change.doc.id || id === `notif-post-${change.doc.id}`) {
                  notifMap.delete(id);
                }
              }
              listChanged = true;
            }
          });

          // Purge any broadcast notifications whose post was explicitly deleted
          const firestoreNotifIds = new Set(snapshot.docs.map((d) => d.id));
          let deletedPostIds: string[] = [];
          try {
            deletedPostIds = JSON.parse(localStorage.getItem('ethio_community_deleted_posts') || '[]');
          } catch {}

          for (const [id, notif] of notifMap.entries()) {
            if (notif.type === 'admin_broadcast' && !id.startsWith('notif-welcome') && !id.startsWith('notif-exam-prep')) {
              const shouldPurge =
                !firestoreNotifIds.has(id) ||
                (notif.postId && deletedPostIds.includes(notif.postId));
              if (shouldPurge) {
                notifMap.delete(id);
                listChanged = true;
              }
            }
          }

          if (listChanged) {
            const updated = Array.from(notifMap.values()).sort(
              (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
            );
            localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
            if (typeof window !== 'undefined') {
              window.dispatchEvent(new CustomEvent('notifications-changed'));
            }
          }

          // On first launch, if there is a recent unread broadcast, display prominent in-app banner & notify
          if (isInitialLoad && snapshot.docs.length > 0) {
            const now = Date.now();
            const unreadRecent = snapshot.docs
              .map((d) => d.data() as AppNotification)
              .filter((n) => {
                if (!n || !n.title) return false;
                const existing = notifMap.get(n.id);
                if (existing && existing.read) return false;
                const time = new Date(n.date).getTime();
                return !isNaN(time) && now - time < 1000 * 60 * 60 * 48; // within last 48 hours
              })
              .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())[0];

            if (unreadRecent && onNewAlert) {
              playChimeSound();
              vibratePhone();
              this.sendSystemNotification(unreadRecent.title, unreadRecent.body);
              onNewAlert(unreadRecent);
            }
          }

          isInitialLoad = false;
        },
        (err) => {
          console.warn('Broadcast notification listener notice:', err);
        }
      );
      return unsubscribe;
    } catch (e) {
      console.warn('Error subscribing to broadcast notifications:', e);
      return () => {};
    }
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
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('notifications-changed'));
    }
  },

  // Mark single notification as read
  markAsRead(id: string): void {
    const list = this.getNotifications().map((n) => (n.id === id ? { ...n, read: true } : n));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('notifications-changed'));
    }
  },

  // Clear all notifications
  clearAll(): void {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('notifications-changed'));
    }
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
