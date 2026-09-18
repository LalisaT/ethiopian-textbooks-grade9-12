// IndexedDB Database Service for storing PDFs, custom books, and modified/deleted system books

const DB_NAME = 'EthiopianTextbooksDB';
const DB_VERSION = 2;
const STORE_PDFS = 'pdf_files';
const STORE_CUSTOM_BOOKS = 'custom_books';
const STORE_EDITED_BOOKS = 'edited_books';

const STORAGE_KEY_DELETED_SYSTEM_IDS = 'ethio_deleted_system_book_ids';
const STORAGE_KEY_ALL_SYSTEM_DELETED = 'ethio_all_system_books_deleted';
const STORAGE_KEY_CUSTOM_BOOKS_BACKUP = 'ethio_custom_books_backup';
const STORAGE_KEY_OFFLINE_BOOKS = 'ethio_offline_books';
const STORAGE_KEY_UPLOADED_PDF_IDS = 'ethio_uploaded_pdf_ids';

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(STORE_PDFS)) {
        db.createObjectStore(STORE_PDFS, { keyPath: 'bookId' });
      }
      if (!db.objectStoreNames.contains(STORE_CUSTOM_BOOKS)) {
        db.createObjectStore(STORE_CUSTOM_BOOKS, { keyPath: 'id' });
      }
      if (!db.objectStoreNames.contains(STORE_EDITED_BOOKS)) {
        db.createObjectStore(STORE_EDITED_BOOKS, { keyPath: 'id' });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

export const DbService = {
  // Store PDF Blob/File
  async savePdfFile(bookId: string, file: Blob | File, filename?: string): Promise<void> {
    const db = await openDB();
    await new Promise<void>((resolve, reject) => {
      const tx = db.transaction(STORE_PDFS, 'readwrite');
      const store = tx.objectStore(STORE_PDFS);
      const record = {
        bookId,
        blob: file,
        filename: filename || (file instanceof File ? file.name : `${bookId}.pdf`),
        fileSize: file.size,
        updatedAt: new Date().toISOString(),
      };
      const req = store.put(record);
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });

    // Auto-mark book as offline saved in localStorage
    try {
      const offline = JSON.parse(localStorage.getItem(STORAGE_KEY_OFFLINE_BOOKS) || '[]');
      if (!offline.includes(bookId)) {
        offline.push(bookId);
        localStorage.setItem(STORAGE_KEY_OFFLINE_BOOKS, JSON.stringify(offline));
      }

      const pdfIds = JSON.parse(localStorage.getItem(STORAGE_KEY_UPLOADED_PDF_IDS) || '[]');
      if (!pdfIds.includes(bookId)) {
        pdfIds.push(bookId);
        localStorage.setItem(STORAGE_KEY_UPLOADED_PDF_IDS, JSON.stringify(pdfIds));
      }
    } catch (e) {
      console.error('LocalStorage sync error:', e);
    }
  },

  // Retrieve PDF Blob
  async getPdfFile(bookId: string): Promise<{ blob: Blob; filename: string } | null> {
    try {
      const db = await openDB();
      return new Promise((resolve, reject) => {
        const tx = db.transaction(STORE_PDFS, 'readonly');
        const store = tx.objectStore(STORE_PDFS);
        const req = store.get(bookId);
        req.onsuccess = () => {
          if (req.result) {
            resolve({ blob: req.result.blob, filename: req.result.filename });
          } else {
            resolve(null);
          }
        };
        req.onerror = () => reject(req.error);
      });
    } catch {
      return null;
    }
  },

  // Delete PDF Blob
  async deletePdfFile(bookId: string): Promise<void> {
    try {
      const db = await openDB();
      await new Promise<void>((resolve, reject) => {
        const tx = db.transaction(STORE_PDFS, 'readwrite');
        const store = tx.objectStore(STORE_PDFS);
        const req = store.delete(bookId);
        req.onsuccess = () => resolve();
        req.onerror = () => reject(req.error);
      });

      const pdfIds = JSON.parse(localStorage.getItem(STORAGE_KEY_UPLOADED_PDF_IDS) || '[]');
      const filtered = pdfIds.filter((id: string) => id !== bookId);
      localStorage.setItem(STORAGE_KEY_UPLOADED_PDF_IDS, JSON.stringify(filtered));
    } catch (e) {
      console.error(e);
    }
  },

  // Save Custom Book Metadata (with Dual Persistence in IndexedDB + LocalStorage Backup)
  async saveCustomBook(book: any): Promise<void> {
    const db = await openDB();
    await new Promise<void>((resolve, reject) => {
      const tx = db.transaction(STORE_CUSTOM_BOOKS, 'readwrite');
      const store = tx.objectStore(STORE_CUSTOM_BOOKS);
      const req = store.put(book);
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });

    // Backup to LocalStorage so it never vanishes
    try {
      const backup: any[] = JSON.parse(localStorage.getItem(STORAGE_KEY_CUSTOM_BOOKS_BACKUP) || '[]');
      const idx = backup.findIndex((b) => b.id === book.id);
      if (idx >= 0) {
        backup[idx] = book;
      } else {
        backup.unshift(book);
      }
      localStorage.setItem(STORAGE_KEY_CUSTOM_BOOKS_BACKUP, JSON.stringify(backup));

      // Also ensure it is marked as offline saved
      const offline = JSON.parse(localStorage.getItem(STORAGE_KEY_OFFLINE_BOOKS) || '[]');
      if (!offline.includes(book.id)) {
        offline.push(book.id);
        localStorage.setItem(STORAGE_KEY_OFFLINE_BOOKS, JSON.stringify(offline));
      }
    } catch (e) {
      console.error('Backup save error:', e);
    }
  },

  // Save Edited/Customized Book (System or Custom)
  async saveEditedBook(book: any, pdfFile?: File | Blob): Promise<void> {
    if (pdfFile) {
      await this.savePdfFile(book.id, pdfFile);
    }
    if (book.id.startsWith('custom-')) {
      return this.saveCustomBook(book);
    }
    // For edited system book, store in STORE_EDITED_BOOKS
    const db = await openDB();
    return new Promise((resolve, reject) => {
      const tx = db.transaction(STORE_EDITED_BOOKS, 'readwrite');
      const store = tx.objectStore(STORE_EDITED_BOOKS);
      const req = store.put(book);
      req.onsuccess = () => resolve();
      req.onerror = () => reject(req.error);
    });
  },

  // Get all custom books (merged with LocalStorage Backup)
  async getAllCustomBooks(): Promise<any[]> {
    let idbList: any[] = [];
    try {
      const db = await openDB();
      idbList = await new Promise((resolve, reject) => {
        const tx = db.transaction(STORE_CUSTOM_BOOKS, 'readonly');
        const store = tx.objectStore(STORE_CUSTOM_BOOKS);
        const req = store.getAll();
        req.onsuccess = () => resolve(req.result || []);
        req.onerror = () => reject(req.error);
      });
    } catch (err) {
      console.warn('IndexedDB custom books read error:', err);
    }

    let backupList: any[] = [];
    try {
      backupList = JSON.parse(localStorage.getItem(STORAGE_KEY_CUSTOM_BOOKS_BACKUP) || '[]');
    } catch {}

    // Merge and deduplicate by id
    const map = new Map<string, any>();
    backupList.forEach((b) => map.set(b.id, b));
    idbList.forEach((b) => map.set(b.id, b));

    const merged = Array.from(map.values());

    // Sync any missing items back into IndexedDB & LocalStorage
    if (merged.length > idbList.length) {
      try {
        const db = await openDB();
        const tx = db.transaction(STORE_CUSTOM_BOOKS, 'readwrite');
        const store = tx.objectStore(STORE_CUSTOM_BOOKS);
        merged.forEach((b) => store.put(b));
      } catch {}
    }

    if (merged.length > backupList.length) {
      try {
        localStorage.setItem(STORAGE_KEY_CUSTOM_BOOKS_BACKUP, JSON.stringify(merged));
      } catch {}
    }

    return merged;
  },

  // Get all edited system books
  async getAllEditedSystemBooks(): Promise<Record<string, any>> {
    try {
      const db = await openDB();
      return new Promise((resolve) => {
        const tx = db.transaction(STORE_EDITED_BOOKS, 'readonly');
        const store = tx.objectStore(STORE_EDITED_BOOKS);
        const req = store.getAll();
        req.onsuccess = () => {
          const map: Record<string, any> = {};
          (req.result || []).forEach((b: any) => {
            map[b.id] = b;
          });
          resolve(map);
        };
        req.onerror = () => resolve({});
      });
    } catch {
      return {};
    }
  },

  // Get deleted system book IDs
  getDeletedSystemBookIds(): string[] {
    try {
      const data = localStorage.getItem(STORAGE_KEY_DELETED_SYSTEM_IDS);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },

  // Are all system books marked deleted?
  isAllSystemBooksDeleted(): boolean {
    return localStorage.getItem(STORAGE_KEY_ALL_SYSTEM_DELETED) === 'true';
  },

  // Delete ANY book (Custom or System)
  async deleteBook(bookId: string): Promise<void> {
    await this.deletePdfFile(bookId);

    if (bookId.startsWith('custom-')) {
      // 1. Delete from IndexedDB
      try {
        const db = await openDB();
        await new Promise<void>((resolve, reject) => {
          const tx = db.transaction(STORE_CUSTOM_BOOKS, 'readwrite');
          const store = tx.objectStore(STORE_CUSTOM_BOOKS);
          const req = store.delete(bookId);
          req.onsuccess = () => resolve();
          req.onerror = () => reject(req.error);
        });
      } catch {}

      // 2. Delete from LocalStorage backup
      try {
        const backup: any[] = JSON.parse(localStorage.getItem(STORAGE_KEY_CUSTOM_BOOKS_BACKUP) || '[]');
        const filtered = backup.filter((b) => b.id !== bookId);
        localStorage.setItem(STORAGE_KEY_CUSTOM_BOOKS_BACKUP, JSON.stringify(filtered));
      } catch {}

      // 3. Remove from offline list
      try {
        const offline: string[] = JSON.parse(localStorage.getItem(STORAGE_KEY_OFFLINE_BOOKS) || '[]');
        const filtered = offline.filter((id) => id !== bookId);
        localStorage.setItem(STORAGE_KEY_OFFLINE_BOOKS, JSON.stringify(filtered));
      } catch {}
    } else {
      // Mark system book as deleted in persistent list
      const deletedIds = this.getDeletedSystemBookIds();
      if (!deletedIds.includes(bookId)) {
        deletedIds.push(bookId);
        localStorage.setItem(STORAGE_KEY_DELETED_SYSTEM_IDS, JSON.stringify(deletedIds));
      }
    }
  },

  // Delete ALL Books in the entire system (Nuclear wipe)
  async deleteAllBooks(): Promise<void> {
    const db = await openDB();

    // 1. Clear all custom books in IndexedDB & LocalStorage
    try {
      const tx = db.transaction(STORE_CUSTOM_BOOKS, 'readwrite');
      const store = tx.objectStore(STORE_CUSTOM_BOOKS);
      store.clear();
    } catch {}
    localStorage.removeItem(STORAGE_KEY_CUSTOM_BOOKS_BACKUP);

    // 2. Clear all PDFs in IndexedDB
    try {
      const tx = db.transaction(STORE_PDFS, 'readwrite');
      const store = tx.objectStore(STORE_PDFS);
      store.clear();
    } catch {}
    localStorage.removeItem(STORAGE_KEY_UPLOADED_PDF_IDS);

    // 3. Mark all system books as deleted
    localStorage.setItem(STORAGE_KEY_ALL_SYSTEM_DELETED, 'true');
    localStorage.removeItem(STORAGE_KEY_DELETED_SYSTEM_IDS);
  },

  // Restore Default System Books
  async restoreDefaultBooks(): Promise<void> {
    localStorage.removeItem(STORAGE_KEY_ALL_SYSTEM_DELETED);
    localStorage.removeItem(STORAGE_KEY_DELETED_SYSTEM_IDS);
    try {
      const db = await openDB();
      const tx = db.transaction(STORE_EDITED_BOOKS, 'readwrite');
      const store = tx.objectStore(STORE_EDITED_BOOKS);
      store.clear();
    } catch (e) {
      console.error(e);
    }
  },

  // Storage calculation
  async getStorageUsage(): Promise<{ usedBytes: number; usedMb: number; totalBooksCount: number }> {
    try {
      const db = await openDB();
      return new Promise((resolve) => {
        const tx = db.transaction([STORE_PDFS, STORE_CUSTOM_BOOKS], 'readonly');
        const pdfStore = tx.objectStore(STORE_PDFS);
        const bookStore = tx.objectStore(STORE_CUSTOM_BOOKS);

        let totalBytes = 0;
        let count = 0;

        const reqPdf = pdfStore.openCursor();
        reqPdf.onsuccess = (e) => {
          const cursor = (e.target as IDBRequest).result;
          if (cursor) {
            totalBytes += cursor.value.fileSize || 0;
            cursor.continue();
          } else {
            const reqBooks = bookStore.count();
            reqBooks.onsuccess = () => {
              count = reqBooks.result || 0;
              resolve({
                usedBytes: totalBytes,
                usedMb: Math.round((totalBytes / (1024 * 1024)) * 10) / 10,
                totalBooksCount: count,
              });
            };
            reqBooks.onerror = () => {
              resolve({
                usedBytes: totalBytes,
                usedMb: Math.round((totalBytes / (1024 * 1024)) * 10) / 10,
                totalBooksCount: count,
              });
            };
          }
        };
        reqPdf.onerror = () => {
          resolve({ usedBytes: 0, usedMb: 0, totalBooksCount: 0 });
        };
      });
    } catch {
      return { usedBytes: 0, usedMb: 0, totalBooksCount: 0 };
    }
  },
};
