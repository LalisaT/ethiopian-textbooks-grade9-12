import React, { useState, useEffect, useMemo } from 'react';
import { Book, GradeLevel, RegionId, LanguageCode } from './types/book';
import { QuizAttempt } from './types/quiz';
import { ETHIOPIAN_BOOKS } from './data/booksDatabase';
import { StorageService } from './services/storageService';
import { DbService } from './services/dbService';
import { AuthService } from './services/authService';
import { Navbar } from './components/layout/Navbar';
import { MobileBottomNav } from './components/layout/MobileBottomNav';
import { Footer } from './components/layout/Footer';
import { HomePage } from './pages/HomePage';
import { BooksExplorePage } from './pages/BooksExplorePage';
import { BookDetailPage } from './pages/BookDetailPage';
import { ReaderPage } from './pages/ReaderPage';
import { ExamPracticeHub } from './components/study/ExamPracticeHub';
import { SavedBooksPage } from './pages/SavedBooksPage';
import { AboutCurriculumPage } from './pages/AboutCurriculumPage';
import { CommunityPostsPage } from './pages/CommunityPostsPage';
import { AdminTopBar } from './components/admin/AdminTopBar';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { UploadBookModal } from './components/admin/UploadBookModal';
import { BatchUploadModal } from './components/admin/BatchUploadModal';
import { EditBookModal } from './components/admin/EditBookModal';
import { AdminLoginModal } from './components/admin/AdminLoginModal';
import { BroadcastNotificationModal } from './components/admin/BroadcastNotificationModal';
import { DownloadSourcesModal } from './components/books/DownloadSourcesModal';
import { PwaInstallPrompt } from './components/common/PwaInstallPrompt';
import { AppNotification } from './services/notificationService';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'home' | 'explore' | 'examprep' | 'community' | 'saved' | 'about'>('home');
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [readerState, setReaderState] = useState<{
    book: Book;
    unitNumber: number;
    mode: 'interactive' | 'pdf';
  } | null>(null);

  // Admin State & Modals
  const [isAdmin, setIsAdmin] = useState<boolean>(() => AuthService.isAuthenticated());
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isAdminDashboardOpen, setIsAdminDashboardOpen] = useState(false);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isBatchModalOpen, setIsBatchModalOpen] = useState(false);
  const [isBroadcastModalOpen, setIsBroadcastModalOpen] = useState(false);
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);
  const [downloadModalBook, setDownloadModalBook] = useState<Book | null>(null);
  const [editingBook, setEditingBook] = useState<Book | null>(null);

  // Custom & Edited Books Data
  const [customBooks, setCustomBooks] = useState<Book[]>([]);
  const [editedSystemBooksMap, setEditedSystemBooksMap] = useState<Record<string, Book>>({});
  const [deletedSystemIds, setDeletedSystemIds] = useState<string[]>(() => DbService.getDeletedSystemBookIds());
  const [isAllSystemDeleted, setIsAllSystemDeleted] = useState<boolean>(() => DbService.isAllSystemBooksDeleted());
  const [storageUsage, setStorageUsage] = useState({ usedBytes: 0, usedMb: 0, totalBooksCount: 0 });

  const [theme, setTheme] = useState<'light' | 'dark' | 'sepia'>(() => {
    const savedSettings = StorageService.getSettings();
    return savedSettings.theme || 'light';
  });

  const [offlineBookIds, setOfflineBookIds] = useState<string[]>(() => {
    return StorageService.getOfflineBookIds();
  });

  const [pastQuizAttempts, setPastQuizAttempts] = useState<QuizAttempt[]>(() => {
    return StorageService.getQuizAttempts();
  });

  // Load Custom & Edited Books from IndexedDB
  const refreshLibraryState = async () => {
    try {
      const customs = await DbService.getAllCustomBooks();
      setCustomBooks(customs);

      const editedMap = await DbService.getAllEditedSystemBooks();
      setEditedSystemBooksMap(editedMap);

      setDeletedSystemIds(DbService.getDeletedSystemBookIds());
      setIsAllSystemDeleted(DbService.isAllSystemBooksDeleted());

      const usage = await DbService.getStorageUsage();
      setStorageUsage(usage);
    } catch (e) {
      console.error('Error loading library state:', e);
    }
  };

  useEffect(() => {
    refreshLibraryState();

    const handleSync = () => {
      refreshLibraryState();
      setOfflineBookIds(StorageService.getOfflineBookIds());
    };

    window.addEventListener('focus', handleSync);
    window.addEventListener('visibilitychange', handleSync);
    window.addEventListener('storage', handleSync);

    return () => {
      window.removeEventListener('focus', handleSync);
      window.removeEventListener('visibilitychange', handleSync);
      window.removeEventListener('storage', handleSync);
    };
  }, []);

  // Compute final effective library of books
  const allBooks = useMemo(() => {
    let baseBooks: Book[] = [];

    if (!isAllSystemDeleted) {
      baseBooks = ETHIOPIAN_BOOKS.filter((b) => !deletedSystemIds.includes(b.id)).map((b) => {
        // Overlay any admin customizations
        if (editedSystemBooksMap[b.id]) {
          return editedSystemBooksMap[b.id];
        }
        return b;
      });
    }

    return [...customBooks, ...baseBooks];
  }, [customBooks, editedSystemBooksMap, deletedSystemIds, isAllSystemDeleted]);

  const [readingProgress, setReadingProgress] = useState<
    Record<string, { completedUnits: number[]; percentComplete: number }>
  >(() => {
    const progressMap: Record<string, { completedUnits: number[]; percentComplete: number }> = {};
    ETHIOPIAN_BOOKS.forEach((b) => {
      progressMap[b.id] = StorageService.getProgress(b.id);
    });
    return progressMap;
  });

  const [exploreInitialGrade, setExploreInitialGrade] = useState<GradeLevel | 'all'>('all');
  const [exploreInitialBookType, setExploreInitialBookType] = useState<'all' | 'textbook' | 'teacher_guide'>('all');
  const [exploreInitialRegion, setExploreInitialRegion] = useState<RegionId | 'all'>('all');
  const [exploreInitialLanguage, setExploreInitialLanguage] = useState<LanguageCode | 'all'>('all');

  // Sync Theme with DOM
  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('dark', 'theme-sepia');
    if (theme === 'dark') {
      root.classList.add('dark');
    } else if (theme === 'sepia') {
      root.classList.add('theme-sepia');
    }
    StorageService.saveSettings({ theme });
  }, [theme]);

  // Admin Login / Logout Trigger
  const handleToggleAdmin = () => {
    if (isAdmin) {
      handleExitAdmin();
    } else {
      setIsLoginModalOpen(true);
    }
  };

  const handleCloseAdminStudio = () => {
    setIsAdminDashboardOpen(false);
    if (window.location.hash === '#admin-studio') {
      window.history.replaceState(null, '', window.location.pathname + window.location.search);
    }
  };

  const handleExitAdmin = () => {
    AuthService.logout();
    setIsAdmin(false);
    setIsAdminDashboardOpen(false);
    if (window.location.hash === '#admin-studio') {
      window.history.replaceState(null, '', window.location.pathname + window.location.search);
    }
  };

  const handleLoginSuccess = () => {
    setIsAdmin(true);
    setIsAdminDashboardOpen(true);
    setIsLoginModalOpen(false);
    refreshLibraryState();
  };

  // Discrete Admin Studio Live Entry Listeners (URL hash, query param, shortcut, custom event)
  useEffect(() => {
    const checkAdminStudioIntent = () => {
      const isStudioRequested =
        window.location.hash === '#admin-studio' ||
        window.location.search.includes('admin=studio');

      if (isStudioRequested) {
        if (AuthService.isAuthenticated()) {
          setIsAdmin(true);
          setIsAdminDashboardOpen(true);
        } else {
          setIsLoginModalOpen(true);
        }
      }
    };

    checkAdminStudioIntent();
    window.addEventListener('hashchange', checkAdminStudioIntent);

    // Global discrete keyboard shortcut: Ctrl+Shift+A (or Cmd+Shift+A)
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
        e.preventDefault();
        if (AuthService.isAuthenticated()) {
          setIsAdmin(true);
          setIsAdminDashboardOpen((prev) => !prev);
        } else {
          setIsLoginModalOpen(true);
        }
      }
    };

    // Custom event listener for discrete UI triggers (e.g. 5 taps on footer badge)
    const handleOpenStudioEvent = () => {
      if (AuthService.isAuthenticated()) {
        setIsAdmin(true);
        setIsAdminDashboardOpen(true);
      } else {
        setIsLoginModalOpen(true);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('open-admin-studio', handleOpenStudioEvent);

    return () => {
      window.removeEventListener('hashchange', checkAdminStudioIntent);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('open-admin-studio', handleOpenStudioEvent);
    };
  }, []);

  // Handle Single Book Uploaded
  const handleBookUploaded = (newBook: Book) => {
    refreshLibraryState();
    handleOpenPdf(newBook);
  };

  // Handle Batch Books Uploaded
  const handleBatchBooksUploaded = (newBooks: Book[]) => {
    refreshLibraryState();
    if (newBooks.length > 0) {
      handleOpenPdf(newBooks[0]);
    }
  };

  // Handle Book Edited / Customized
  const handleBookUpdated = (updatedBook: Book) => {
    setEditingBook(null);
    refreshLibraryState();
    if (selectedBook && selectedBook.id === updatedBook.id) {
      setSelectedBook(updatedBook);
    }
  };

  // Handle Delete Any Book
  const handleDeleteBook = async (bookId: string) => {
    await DbService.deleteBook(bookId);
    if (selectedBook && selectedBook.id === bookId) {
      setSelectedBook(null);
    }
    await refreshLibraryState();
  };

  // Handle Delete ALL Books
  const handleDeleteAllBooks = async () => {
    await DbService.deleteAllBooks();
    setSelectedBook(null);
    setReaderState(null);
    await refreshLibraryState();
  };

  // Handle Restore Default Books
  const handleRestoreDefaultBooks = async () => {
    await DbService.restoreDefaultBooks();
    await refreshLibraryState();
  };

  // Open Interactive Reader
  const handleOpenInteractive = (book: Book, unitNumber = 1) => {
    if (book.id.startsWith('custom-') && (!book.chapters || book.chapters.length === 0)) {
      handleOpenPdf(book);
      return;
    }

    setReaderState({
      book,
      unitNumber,
      mode: 'interactive',
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Open PDF Document Reader
  const handleOpenPdf = (book: Book) => {
    setReaderState({
      book,
      unitNumber: 1,
      mode: 'pdf',
    });
    setIsAdminDashboardOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Open Download & Mirrors Modal
  const handleOpenDownloadModal = (book?: Book) => {
    setDownloadModalBook(book || null);
    setIsDownloadModalOpen(true);
  };

  // Toggle Offline Storage
  const handleToggleOffline = (bookId: string) => {
    const isNowOffline = StorageService.toggleOfflineBook(bookId);
    setOfflineBookIds(StorageService.getOfflineBookIds());
  };

  // Update Reading Progress
  const handleUpdateReadingProgress = (bookId: string, unitNumber: number, totalUnits: number) => {
    StorageService.updateProgress(bookId, unitNumber, totalUnits);
    setReadingProgress((prev) => ({
      ...prev,
      [bookId]: StorageService.getProgress(bookId),
    }));
  };

  // Save Quiz Attempt
  const handleSaveQuizAttempt = (attempt: Omit<QuizAttempt, 'id' | 'date'>) => {
    const saved = StorageService.saveQuizAttempt(attempt);
    setPastQuizAttempts(StorageService.getQuizAttempts());
  };

  // Navigate to Explore with Grade filter
  const handleSelectGradeFilter = (grade: GradeLevel) => {
    setExploreInitialGrade(grade);
    setExploreInitialRegion('all');
    setExploreInitialLanguage('all');
    setActiveTab('explore');
    setSelectedBook(null);
    setReaderState(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Navigate to Explore with Region filter
  const handleSelectRegionFilter = (region: RegionId) => {
    setExploreInitialRegion(region);
    setExploreInitialGrade('all');
    setExploreInitialLanguage('all');
    setActiveTab('explore');
    setSelectedBook(null);
    setReaderState(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Navigate to Explore with Language filter
  const handleSelectLanguageFilter = (lang: LanguageCode) => {
    setExploreInitialLanguage(lang);
    setExploreInitialRegion('all');
    setExploreInitialGrade('all');
    setExploreInitialBookType('all');
    setActiveTab('explore');
    setSelectedBook(null);
    setReaderState(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Direct shortcut to Teacher Guides in Explore
  const handleNavigateToTeacherGuides = () => {
    setExploreInitialBookType('teacher_guide');
    setExploreInitialGrade('all');
    setActiveTab('explore');
    setSelectedBook(null);
    setReaderState(null);
    setIsAdminDashboardOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateToExplore = () => {
    setExploreInitialBookType('all');
    setActiveTab('explore');
    setSelectedBook(null);
    setReaderState(null);
    setIsAdminDashboardOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNotificationNavigation = (n: AppNotification) => {
    setIsAdminDashboardOpen(false);

    // 1. Helper to find a matching book from notification metadata
    const findTargetBook = (): Book | undefined => {
      // Check explicit book: actionUrl
      if (n.actionUrl && n.actionUrl.startsWith('book:')) {
        const bookId = n.actionUrl.replace('book:', '').trim().toLowerCase();
        const found = allBooks.find(
          (b) =>
            b.id.toLowerCase() === bookId ||
            b.title.toLowerCase() === bookId ||
            b.title.toLowerCase().includes(bookId) ||
            bookId.includes(b.id.toLowerCase())
        );
        if (found) return found;
      }

      // Check notification title & body text for book titles or keywords
      const fullText = `${n.title} ${n.body} ${n.grade || ''} ${n.actionUrl || ''}`.toLowerCase();

      // Check exact textbook title match
      for (const b of allBooks) {
        if (
          fullText.includes(b.title.toLowerCase()) ||
          (b.titleAmharic && fullText.includes(b.titleAmharic.toLowerCase())) ||
          (b.titleOromo && fullText.includes(b.titleOromo.toLowerCase()))
        ) {
          return b;
        }
      }

      // Check subject + grade match (e.g. "Grade 7" and "Mathematics")
      for (const b of allBooks) {
        const gradeTag = `grade ${b.grade}`;
        const subjectTag = b.subject.toLowerCase();
        if (fullText.includes(gradeTag) && fullText.includes(subjectTag)) {
          return b;
        }
      }

      // Check grade match if specific (e.g. "Grade 7" -> returns first Grade 7 textbook)
      for (const g of [8, 7, 6, 5]) {
        if (fullText.includes(`grade ${g}`)) {
          const match = allBooks.find((b) => b.grade === g);
          if (match) return match;
        }
      }

      // If notification is a book_update or New Book category, default to first available book
      if (
        n.type === 'book_update' ||
        n.category === 'New Book' ||
        n.category === 'Textbook Upload' ||
        n.category === 'New Textbook Published'
      ) {
        return allBooks.length > 0 ? allBooks[0] : undefined;
      }

      return undefined;
    };

    const targetBook = findTargetBook();

    // 2. If a textbook is identified, OPEN IT IMMEDIATELY IN THE READER!
    if (targetBook) {
      setSelectedBook(targetBook);
      setActiveTab('home');

      // Launch the reader directly
      if (targetBook.chapters && targetBook.chapters.length > 0) {
        handleOpenInteractive(targetBook, 1);
      } else {
        handleOpenPdf(targetBook);
      }

      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    // 3. If no specific book matched, route to requested destination tab
    setReaderState(null);

    if (n.actionUrl === 'tab:examprep' || n.actionUrl === 'tab:exam' || n.type === 'exam_alert') {
      setSelectedBook(null);
      setActiveTab('examprep');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (n.actionUrl === 'tab:saved' || n.type === 'download') {
      setSelectedBook(null);
      setActiveTab('saved');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (n.actionUrl === 'tab:explore') {
      setSelectedBook(null);
      setActiveTab('explore');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    // Default fallback to Notice Board (Community)
    setSelectedBook(null);
    setActiveTab('community');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // If Reader is active, render full-screen reading experience
  if (readerState) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 transition-colors">
        <ReaderPage
          book={readerState.book}
          initialUnitNumber={readerState.unitNumber}
          mode={readerState.mode}
          onBack={() => {
            setOfflineBookIds(StorageService.getOfflineBookIds());
            setReaderState(null);
          }}
          onUpdateReadingProgress={handleUpdateReadingProgress}
          onOpenDownloadModal={() => handleOpenDownloadModal(readerState.book)}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      {/* Admin Top Bar */}
      {isAdmin && (
        <AdminTopBar
          storageUsedMb={storageUsage.usedMb}
          customBooksCount={customBooks.length}
          onOpenUploadModal={() => setIsUploadModalOpen(true)}
          onOpenBatchModal={() => setIsBatchModalOpen(true)}
          onOpenBroadcastModal={() => setIsBroadcastModalOpen(true)}
          onOpenDashboard={() => setIsAdminDashboardOpen(!isAdminDashboardOpen)}
          onExitAdmin={handleExitAdmin}
          isDashboardOpen={isAdminDashboardOpen}
        />
      )}

      {/* Navigation Bar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={(tab) => {
          if (tab === 'explore') {
            setExploreInitialBookType('all');
          }
          setActiveTab(tab);
          setSelectedBook(null);
          setReaderState(null);
          setIsAdminDashboardOpen(false);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onNavigateToTeacherGuides={handleNavigateToTeacherGuides}
        theme={theme}
        setTheme={setTheme}
        offlineCount={offlineBookIds.length}
        isAdmin={isAdmin}
        onToggleAdmin={handleToggleAdmin}
        onOpenUploadModal={() => {
          if (isAdmin) {
            setIsBatchModalOpen(true);
          } else {
            setIsLoginModalOpen(true);
          }
        }}
        onNavigateNotification={handleNotificationNavigation}
      />

      {/* Main Page Routing */}
      <main className="flex-1 pb-24 md:pb-6">
        {isAdminDashboardOpen ? (
          <AdminDashboard
            allBooks={allBooks}
            customBooks={customBooks}
            storageUsage={storageUsage}
            onOpenUploadModal={() => setIsUploadModalOpen(true)}
            onOpenBatchModal={() => setIsBatchModalOpen(true)}
            onEditBook={(book) => setEditingBook(book)}
            onDeleteBook={handleDeleteBook}
            onDeleteAllBooks={handleDeleteAllBooks}
            onRestoreDefaultBooks={handleRestoreDefaultBooks}
            onPreviewBook={(book) => handleOpenPdf(book)}
            onClose={handleCloseAdminStudio}
            onLogout={handleExitAdmin}
          />
        ) : selectedBook ? (
          <BookDetailPage
            book={selectedBook}
            onBack={() => setSelectedBook(null)}
            onOpenInteractive={handleOpenInteractive}
            onOpenPdf={handleOpenPdf}
            onToggleOffline={handleToggleOffline}
            isOffline={offlineBookIds.includes(selectedBook.id)}
            readingProgress={readingProgress[selectedBook.id]}
            isAdmin={isAdmin}
            onEditBook={(b) => setEditingBook(b)}
            onDeleteBook={handleDeleteBook}
            onOpenDownloadModal={handleOpenDownloadModal}
          />
        ) : (
          <>
            {activeTab === 'home' && (
              <HomePage
                books={allBooks}
                onOpenInteractive={handleOpenInteractive}
                onOpenPdf={handleOpenPdf}
                onToggleOffline={handleToggleOffline}
                offlineBookIds={offlineBookIds}
                readingProgress={readingProgress}
                onSelectGradeFilter={handleSelectGradeFilter}
                onSelectRegionFilter={handleSelectRegionFilter}
                onSelectLanguageFilter={handleSelectLanguageFilter}
                onNavigateToExplore={handleNavigateToExplore}
                onNavigateToTeacherGuides={handleNavigateToTeacherGuides}
                onNavigateToExamPrep={() => {
                  setActiveTab('examprep');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                onNavigateToCommunity={() => {
                  setActiveTab('community');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                isAdmin={isAdmin}
                onEditBook={(b) => setEditingBook(b)}
                onDeleteBook={handleDeleteBook}
              />
            )}

            {activeTab === 'explore' && (
              <BooksExplorePage
                books={allBooks}
                onOpenInteractive={handleOpenInteractive}
                onOpenPdf={handleOpenPdf}
                onToggleOffline={handleToggleOffline}
                offlineBookIds={offlineBookIds}
                readingProgress={readingProgress}
                initialGrade={exploreInitialGrade}
                initialBookType={exploreInitialBookType}
                initialRegion={exploreInitialRegion}
                initialLanguage={exploreInitialLanguage}
                isAdmin={isAdmin}
                onEditBook={(b) => setEditingBook(b)}
                onDeleteBook={handleDeleteBook}
              />
            )}

            {activeTab === 'examprep' && (
              <ExamPracticeHub
                onSaveQuizAttempt={handleSaveQuizAttempt}
                pastAttempts={pastQuizAttempts}
              />
            )}

            {activeTab === 'community' && (
              <CommunityPostsPage
                isAdmin={isAdmin}
                onOpenAdminLogin={() => setIsLoginModalOpen(true)}
                onSelectBook={(book) => {
                  setSelectedBook(book);
                  setActiveTab('home');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                onNavigateTab={(tab) => {
                  setActiveTab(tab);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                allBooks={allBooks}
              />
            )}

            {activeTab === 'saved' && (
              <SavedBooksPage
                books={allBooks}
                onOpenInteractive={handleOpenInteractive}
                onOpenPdf={handleOpenPdf}
                onToggleOffline={handleToggleOffline}
                offlineBookIds={offlineBookIds}
                readingProgress={readingProgress}
              />
            )}

            {activeTab === 'about' && <AboutCurriculumPage />}
          </>
        )}
      </main>

      {/* Admin Login Modal */}
      {isLoginModalOpen && (
        <AdminLoginModal
          isOpen={isLoginModalOpen}
          onClose={() => setIsLoginModalOpen(false)}
          onLoginSuccess={handleLoginSuccess}
        />
      )}

      {/* Single Upload Book Modal */}
      {isUploadModalOpen && (
        <UploadBookModal
          isOpen={isUploadModalOpen}
          onClose={() => setIsUploadModalOpen(false)}
          onBookUploaded={handleBookUploaded}
        />
      )}

      {/* Fast Multi-PDF Batch Upload Modal */}
      {isBatchModalOpen && (
        <BatchUploadModal
          isOpen={isBatchModalOpen}
          onClose={() => setIsBatchModalOpen(false)}
          onBatchUploaded={handleBatchBooksUploaded}
        />
      )}

      {/* Admin Broadcast Notification Modal */}
      {isBroadcastModalOpen && (
        <BroadcastNotificationModal
          isOpen={isBroadcastModalOpen}
          onClose={() => setIsBroadcastModalOpen(false)}
          allBooks={allBooks}
        />
      )}

      {/* Edit Book Modal */}
      {editingBook && (
        <EditBookModal
          isOpen={!!editingBook}
          book={editingBook}
          onClose={() => setEditingBook(null)}
          onBookUpdated={handleBookUpdated}
        />
      )}

      {/* Download Sources Modal (Mobile Storage & Cloud Mirrors) */}
      <DownloadSourcesModal
        isOpen={isDownloadModalOpen}
        onClose={() => setIsDownloadModalOpen(false)}
        book={downloadModalBook}
        onOpenInApp={(b) => {
          setIsDownloadModalOpen(false);
          handleOpenPdf(b);
        }}
      />

      {/* PWA 1-Click Install Banner & Notification */}
      <PwaInstallPrompt />

      {/* Mobile Bottom Navigation Bar (Grades 9-12 & ESSLCE Hub) */}
      <MobileBottomNav
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        offlineCount={offlineBookIds.length}
      />

      {/* Footer */}
      <Footer />
    </div>
  );
};
