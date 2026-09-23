import { UserNote, UserBookmark, ReadingProgress, UserSettings } from '../types/user';
import { QuizAttempt } from '../types/quiz';

const KEYS = {
  OFFLINE_BOOKS: 'ethio_offline_books',
  BOOKMARKS: 'ethio_bookmarks',
  NOTES: 'ethio_user_notes',
  PROGRESS: 'ethio_reading_progress',
  QUIZ_ATTEMPTS: 'ethio_quiz_attempts',
  SETTINGS: 'ethio_user_settings',
};

export const StorageService = {
  // Offline Books (book IDs)
  getOfflineBookIds(): string[] {
    try {
      const data = localStorage.getItem(KEYS.OFFLINE_BOOKS);
      return data ? JSON.parse(data) : ['g8-science-nat', 'g8-math-nat'];
    } catch {
      return ['g8-science-nat', 'g8-math-nat'];
    }
  },

  toggleOfflineBook(bookId: string): boolean {
    const current = this.getOfflineBookIds();
    const exists = current.includes(bookId);
    let updated: string[];
    if (exists) {
      updated = current.filter(id => id !== bookId);
    } else {
      updated = [...current, bookId];
    }
    localStorage.setItem(KEYS.OFFLINE_BOOKS, JSON.stringify(updated));
    return !exists;
  },

  isBookOffline(bookId: string): boolean {
    return this.getOfflineBookIds().includes(bookId);
  },

  markBookOffline(bookId: string): void {
    const current = this.getOfflineBookIds();
    if (!current.includes(bookId)) {
      localStorage.setItem(KEYS.OFFLINE_BOOKS, JSON.stringify([...current, bookId]));
    }
  },

  // Bookmarks
  getBookmarks(): UserBookmark[] {
    try {
      const data = localStorage.getItem(KEYS.BOOKMARKS);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },

  addBookmark(bookmark: Omit<UserBookmark, 'id' | 'savedAt'>): UserBookmark {
    const list = this.getBookmarks();
    const newBookmark: UserBookmark = {
      ...bookmark,
      id: `bm-${Date.now()}`,
      savedAt: new Date().toISOString(),
    };
    const updated = [newBookmark, ...list.filter(b => !(b.bookId === bookmark.bookId && b.unitNumber === bookmark.unitNumber))];
    localStorage.setItem(KEYS.BOOKMARKS, JSON.stringify(updated));
    return newBookmark;
  },

  removeBookmark(bookId: string, unitNumber: number) {
    const list = this.getBookmarks();
    const updated = list.filter(b => !(b.bookId === bookId && b.unitNumber === unitNumber));
    localStorage.setItem(KEYS.BOOKMARKS, JSON.stringify(updated));
  },

  isBookmarked(bookId: string, unitNumber: number): boolean {
    return this.getBookmarks().some(b => b.bookId === bookId && b.unitNumber === unitNumber);
  },

  // Notes
  getNotes(bookId?: string, unitNumber?: number): UserNote[] {
    try {
      const data = localStorage.getItem(KEYS.NOTES);
      const list: UserNote[] = data ? JSON.parse(data) : [];
      if (bookId && unitNumber !== undefined) {
        return list.filter(n => n.bookId === bookId && n.unitNumber === unitNumber);
      }
      if (bookId) {
        return list.filter(n => n.bookId === bookId);
      }
      return list;
    } catch {
      return [];
    }
  },

  saveNote(note: Omit<UserNote, 'id' | 'createdAt' | 'updatedAt'> & { id?: string }): UserNote {
    const list = this.getNotes();
    const now = new Date().toISOString();
    let saved: UserNote;

    if (note.id) {
      saved = {
        ...note,
        id: note.id,
        createdAt: list.find(n => n.id === note.id)?.createdAt || now,
        updatedAt: now,
      };
      const updated = list.map(n => (n.id === note.id ? saved : n));
      localStorage.setItem(KEYS.NOTES, JSON.stringify(updated));
    } else {
      saved = {
        ...note,
        id: `note-${Date.now()}`,
        createdAt: now,
        updatedAt: now,
      };
      localStorage.setItem(KEYS.NOTES, JSON.stringify([saved, ...list]));
    }
    return saved;
  },

  deleteNote(noteId: string) {
    const list = this.getNotes();
    const updated = list.filter(n => n.id !== noteId);
    localStorage.setItem(KEYS.NOTES, JSON.stringify(updated));
  },

  // Reading Progress
  getProgress(bookId: string): ReadingProgress {
    try {
      const data = localStorage.getItem(KEYS.PROGRESS);
      const all: Record<string, ReadingProgress> = data ? JSON.parse(data) : {};
      return (
        all[bookId] || {
          bookId,
          completedUnits: [],
          lastUnitNumber: 1,
          lastReadTimestamp: new Date().toISOString(),
          percentComplete: 0,
        }
      );
    } catch {
      return {
        bookId,
        completedUnits: [],
        lastUnitNumber: 1,
        lastReadTimestamp: new Date().toISOString(),
        percentComplete: 0,
      };
    }
  },

  updateProgress(bookId: string, unitNumber: number, totalUnits: number) {
    try {
      const data = localStorage.getItem(KEYS.PROGRESS);
      const all: Record<string, ReadingProgress> = data ? JSON.parse(data) : {};
      const current = all[bookId] || {
        bookId,
        completedUnits: [],
        lastUnitNumber: unitNumber,
        lastReadTimestamp: new Date().toISOString(),
        percentComplete: 0,
      };

      const completed = Array.from(new Set([...current.completedUnits, unitNumber]));
      const percent = Math.round((completed.length / (totalUnits || 1)) * 100);

      all[bookId] = {
        bookId,
        completedUnits: completed,
        lastUnitNumber: unitNumber,
        lastReadTimestamp: new Date().toISOString(),
        percentComplete: Math.min(100, percent),
      };

      localStorage.setItem(KEYS.PROGRESS, JSON.stringify(all));
    } catch (e) {
      console.error(e);
    }
  },

  // Quiz Attempts
  saveQuizAttempt(attempt: Omit<QuizAttempt, 'id' | 'date'>): QuizAttempt {
    try {
      const data = localStorage.getItem(KEYS.QUIZ_ATTEMPTS);
      const list: QuizAttempt[] = data ? JSON.parse(data) : [];
      const newAttempt: QuizAttempt = {
        ...attempt,
        id: `att-${Date.now()}`,
        date: new Date().toISOString(),
      };
      localStorage.setItem(KEYS.QUIZ_ATTEMPTS, JSON.stringify([newAttempt, ...list.slice(0, 49)]));
      return newAttempt;
    } catch {
      return {
        ...attempt,
        id: `att-${Date.now()}`,
        date: new Date().toISOString(),
      };
    }
  },

  getQuizAttempts(): QuizAttempt[] {
    try {
      const data = localStorage.getItem(KEYS.QUIZ_ATTEMPTS);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },

  // Settings
  getSettings(): UserSettings {
    try {
      const data = localStorage.getItem(KEYS.SETTINGS);
      if (!data) {
        return {
          selectedGrade: 12,
          selectedRegion: 'national',
          language: 'en',
          theme: 'dark',
          fontSize: 'base',
          autoSpeechRate: 1.0,
        };
      }
      const parsed = JSON.parse(data);
      const isExplicitChoice = localStorage.getItem('ethio_explicit_theme_selected');
      return {
        ...parsed,
        theme: isExplicitChoice ? (parsed.theme || 'dark') : 'dark',
      };
    } catch {
      return {
        selectedGrade: 12,
        selectedRegion: 'national',
        language: 'en',
        theme: 'dark',
        fontSize: 'base',
        autoSpeechRate: 1.0,
      };
    }
  },

  saveSettings(settings: Partial<UserSettings>) {
    const current = this.getSettings();
    const updated = { ...current, ...settings };
    localStorage.setItem(KEYS.SETTINGS, JSON.stringify(updated));
  },
};
