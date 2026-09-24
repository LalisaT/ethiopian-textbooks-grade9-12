import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Book, GradeLevel, RegionId, LanguageCode } from './types/book';
import { QuizAttempt } from './types/quiz';
import { ETHIOPIAN_BOOKS } from './data/booksDatabase';
import { StorageService } from './services/storageService';
import { DbService } from './services/dbService';
import { AuthService } from './services/authService';
import { Navbar } from './components/layout/Navbar';
import { MobileBottomNav } from './components/layout/MobileBottomNav';
import { HomePage } from './pages/HomePage';
import { BooksExplorePage } from './pages/BooksExplorePage';
import { ReaderPage } from './pages/ReaderPage';
import { ExamPracticeHub } from './components/study/ExamPracticeHub';
import { SavedBooksPage } from './pages/SavedBooksPage';
import { AboutCurriculumPage } from './pages/AboutCurriculumPage';
import { AboutPage } from './pages/AboutPage';
import { CommunityPostsPage } from './pages/CommunityPostsPage';
import { AdminTopBar } from './components/admin/AdminTopBar';
import { AdminLoginModal } from './components/admin/AdminLoginModal';
import { BroadcastNotificationModal } from './components/admin/BroadcastNotificationModal';
import { DownloadSourcesModal } from './components/books/DownloadSourcesModal';
import { DisclaimerModal } from './components/common/DisclaimerModal';
import { PwaInstallPrompt } from './components/common/PwaInstallPrompt';
import { PushNotificationBanner } from './components/common/PushNotificationBanner';
import { NotificationDetailModal } from './components/common/NotificationDetailModal';
import { AppNotification, NotificationService, initNativeNotifications } from './services/notificationService';
import { PostService } from './services/postService';
import { AdminWebLoginPage } from './components/admin/AdminWebLoginPage';
import { ShareAppModal } from './components/common/ShareAppModal';
import { ExitConfirmModal } from './components/common/ExitConfirmModal';
import { Capacitor } from '@capacitor/core';
import { App as CapApp } from '@capacitor/app';
import { SplashScreen } from '@capacitor/splash-screen';

export const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'home' | 'explore' | 'examprep' | 'community' | 'saved' | 'about' | 'curriculum'>('home');
  // Navigation history stack for professional step-by-step back navigation
  const [tabHistory, setTabHistory] = useState<('home' | 'explore' | 'examprep' | 'community' | 'saved' | 'about' | 'curriculum')[]>(['home']);

  const [readerState, setReaderState] = useState<{
    book: Book;
    unitNumber: number;
    mode: 'interactive' | 'pdf';
  } | null>(null);

  // Live Push Notification Banner State
  const [activePushNotification, setActivePushNotification] = useState<AppNotification | null>(null);

  // Interactive Notification Details Modal State
  const [selectedNotificationDetail, setSelectedNotificationDetail] = useState<AppNotification | null>(null);
  const [targetPostId, setTargetPostId] = useState<string | null>(null);

  // Share App Modal State
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const handleNotificationNavRef = useRef<(n: AppNotification) => void>(() => {});

  // Exit App Confirmation Modal State & 3-Tap Counter
  const [isExitConfirmOpen, setIsExitConfirmOpen] = useState(false);
  const [exitToastMessage, setExitToastMessage] = useState<string | null>(null);
  const exitTapCountRef = useRef(0);
  const lastExitTapTimeRef = useRef(0);
  const exitToastTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Mobile Navigation Drawer State
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Admin State (Strictly for Broadcast Notifications & Official Announcements)
  const [isAdmin, setIsAdmin] = useState<boolean>(() => AuthService.isAuthenticated());
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isBroadcastModalOpen, setIsBroadcastModalOpen] = useState(false);
  const [isDownloadModalOpen, setIsDownloadModalOpen] = useState(false);
  const [downloadModalBook, setDownloadModalBook] = useState<Book | null>(null);

  // Dedicated Web Admin Studio detection (Firebase hosting ethiopian-textbooks.web.app or #admin)
  const [forceStudentView, setForceStudentView] = useState(false);
  const isWebDeploy = useMemo(() => {
    if (forceStudentView) return false;
    if (typeof window === 'undefined') return false;
    if (Capacitor.isNativePlatform()) return false;
    return (
      window.location.hostname.includes('web.app') ||
      window.location.hostname.includes('firebaseapp.com') ||
      window.location.hash === '#admin' ||
      window.location.hash === '#admin-studio' ||
      window.location.search.toLowerCase().includes('admin')
    );
  }, [forceStudentView]);

  // Legal Disclaimer & Privacy Policy (First-open requirement for students)
  const [isDisclaimerOpen, setIsDisclaimerOpen] = useState<boolean>(() => {
    if (
      typeof window !== 'undefined' &&
      (window.location.hostname.includes('web.app') || window.location.hostname.includes('firebaseapp.com'))
    ) {
      return false;
    }
    return localStorage.getItem('ethio_disclaimer_agreed') !== 'true';
  });

  const handleAgreeDisclaimer = () => {
    localStorage.setItem('ethio_disclaimer_agreed', 'true');
    setIsDisclaimerOpen(false);
  };

  useEffect(() => {
    const handleOpenDisclaimer = () => {
      setIsDisclaimerOpen(true);
    };
    window.addEventListener('open-disclaimer-modal', handleOpenDisclaimer);
    return () => window.removeEventListener('open-disclaimer-modal', handleOpenDisclaimer);
  }, []);

  // Custom & Edited Books Data
  const [customBooks, setCustomBooks] = useState<Book[]>([]);
  const [editedSystemBooksMap, setEditedSystemBooksMap] = useState<Record<string, Book>>({});
  const [deletedSystemIds, setDeletedSystemIds] = useState<string[]>(() => DbService.getDeletedSystemBookIds());
  const [isAllSystemDeleted, setIsAllSystemDeleted] = useState<boolean>(() => DbService.isAllSystemBooksDeleted());
  const [storageUsage, setStorageUsage] = useState({ usedBytes: 0, usedMb: 0, totalBooksCount: 0 });

  const [theme, setTheme] = useState<'light' | 'dark' | 'sepia'>(() => {
    try {
      const saved = StorageService.getSettings().theme;
      if (saved === 'light' || saved === 'dark' || saved === 'sepia') return saved;
    } catch {}
    return 'dark';
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

    // 1. Guaranteed Direct Cloud REST Sync on launch (ensures posts & notifications load instantly on mobile)
    PostService.syncPostsFromRemote().catch(() => {});
    NotificationService.syncNotificationsFromRemote((newAlert) => {
      setActivePushNotification(newAlert);
    }).catch(() => {});

    // 2. Background cloud polling every 20 seconds (ensures instant delivery on mobile even if WebSockets sleep)
    const cloudSyncInterval = setInterval(() => {
      PostService.syncPostsFromRemote().catch(() => {});
      NotificationService.syncNotificationsFromRemote((newAlert) => {
        setActivePushNotification(newAlert);
      }).catch(() => {});
    }, 20000);

    const handleSyncWithCloud = () => {
      handleSync();
      PostService.syncPostsFromRemote().catch(() => {});
      NotificationService.syncNotificationsFromRemote((newAlert) => {
        setActivePushNotification(newAlert);
      }).catch(() => {});
    };

    window.addEventListener('focus', handleSyncWithCloud);
    window.addEventListener('visibilitychange', handleSyncWithCloud);
    window.addEventListener('online', handleSyncWithCloud);
    window.addEventListener('storage', handleSync);

    // Real-time Firestore Broadcast Alert Listener (triggers chime & popup for all students)
    const unsubscribeBroadcast = NotificationService.subscribeToBroadcastNotifications((newAlert) => {
      setActivePushNotification(newAlert);
    });

    // Real-time Firestore Posts Listener (ensures community bulletins and posts are always synced on mobile)
    const unsubscribePosts = PostService.subscribeToPosts(() => {});

    // Initialize native Android & iOS push notification channels, FCM, and background alarms
    initNativeNotifications((tappedNotif) => {
      if (tappedNotif) {
        handleNotificationNavRef.current(tappedNotif);
      }
    });

    if (Capacitor.isNativePlatform()) {
      SplashScreen.hide().catch(() => {});
    }

    return () => {
      clearInterval(cloudSyncInterval);
      unsubscribeBroadcast();
      unsubscribePosts();
      window.removeEventListener('focus', handleSyncWithCloud);
      window.removeEventListener('visibilitychange', handleSyncWithCloud);
      window.removeEventListener('online', handleSyncWithCloud);
      window.removeEventListener('storage', handleSync);
    };
  }, []);

  // Automatically activate Admin Announcements tab when in Web Admin Studio
  useEffect(() => {
    if (isWebDeploy && isAdmin) {
      setActiveTab('community');
    }
  }, [isWebDeploy, isAdmin]);

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
    const body = document.body;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('theme-sepia', 'theme-light');
      body.classList.add('dark');
      body.classList.remove('theme-sepia', 'theme-light');
    } else if (theme === 'light') {
      root.classList.remove('dark', 'theme-sepia');
      root.classList.add('theme-light');
      body.classList.remove('dark', 'theme-sepia');
      body.classList.add('theme-light');
    } else if (theme === 'sepia') {
      root.classList.remove('dark', 'theme-light');
      root.classList.add('theme-sepia');
      body.classList.remove('dark', 'theme-light');
      body.classList.add('theme-sepia');
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

  const handleExitAdmin = () => {
    AuthService.logout();
    setIsAdmin(false);
    if (window.location.hash === '#admin-studio' || window.location.hash === '#admin') {
      window.history.replaceState(null, '', window.location.pathname + window.location.search);
    }
  };

  const handleLoginSuccess = () => {
    setIsAdmin(true);
    setIsLoginModalOpen(false);
    setActiveTab('community');
    refreshLibraryState();
  };

  // Discrete Admin Studio Live Entry Listeners (URL hash, query param, shortcut, custom event)
  useEffect(() => {
    const checkAdminStudioIntent = () => {
      const isStudioRequested =
        window.location.hash === '#admin-studio' ||
        window.location.hash === '#admin' ||
        window.location.search.toLowerCase().includes('admin');

      if (isStudioRequested) {
        if (AuthService.isAuthenticated()) {
          setIsAdmin(true);
          setActiveTab('community');
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
          setIsAdmin((prev) => !prev);
        } else {
          setIsLoginModalOpen(true);
        }
      }
    };

    // Custom event listener for discrete UI triggers (e.g. 5 taps on footer badge)
    const handleOpenStudioEvent = () => {
      if (AuthService.isAuthenticated()) {
        setIsAdmin(true);
        setActiveTab('community');
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

  // Step-by-step history navigation handler
  const handleNavigateTab = (
    newTab: 'home' | 'explore' | 'examprep' | 'community' | 'saved' | 'about' | 'curriculum',
    replace = false
  ) => {
    if (newTab === 'explore') {
      setExploreInitialBookType('all');
    }
    setReaderState(null);
    setActiveTab(newTab);
    setTabHistory((prev) => {
      if (replace) {
        return [...prev.slice(0, -1), newTab];
      }
      if (prev[prev.length - 1] === newTab) {
        return prev;
      }
      return [...prev, newTab];
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Professional Step-by-Step Back Navigation & 3-Tap Exit Flow
  const handleStepBack = () => {
    // 1. If Exit Confirm modal is open, cancel exit
    if (isExitConfirmOpen) {
      setIsExitConfirmOpen(false);
      exitTapCountRef.current = 0;
      return;
    }

    // 2. If Share modal is open, close it
    if (isShareModalOpen) {
      setIsShareModalOpen(false);
      return;
    }

    // 3. If Mobile menu drawer is open, close it
    if (isMobileMenuOpen) {
      setIsMobileMenuOpen(false);
      return;
    }

    // 4. If Notification detail modal is open, close it
    if (selectedNotificationDetail) {
      setSelectedNotificationDetail(null);
      return;
    }

    // 5. If Download sources modal is open, close it
    if (isDownloadModalOpen) {
      setIsDownloadModalOpen(false);
      return;
    }

    // 6. If Admin login or broadcast modal is open, close it
    if (isLoginModalOpen) {
      setIsLoginModalOpen(false);
      return;
    }
    if (isBroadcastModalOpen) {
      setIsBroadcastModalOpen(false);
      return;
    }

    // 7. If Reader is open:
    // First ask inner reader component if any inner modal (quiz modal, search, notes) is open
    if (readerState) {
      let innerHandled = false;
      window.dispatchEvent(
        new CustomEvent('reader-back-requested', {
          detail: {
            setHandled: () => {
              innerHandled = true;
            },
          },
        })
      );
      if (innerHandled) {
        return; // Inner reader dialog was dismissed
      }
      // No inner dialog was open, exit reader to library
      setOfflineBookIds(StorageService.getOfflineBookIds());
      setReaderState(null);
      return;
    }

    // 8. If user navigated tabs and history has more than 1 entry:
    // Step back to the previous tab they were on
    if (tabHistory.length > 1) {
      const nextHistory = tabHistory.slice(0, -1);
      const prevTab = nextHistory[nextHistory.length - 1] || 'home';
      setTabHistory(nextHistory);
      setActiveTab(prevTab);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    // 9. If activeTab is not home, go to home
    if (activeTab !== 'home') {
      setActiveTab('home');
      setTabHistory(['home']);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    // 10. From Home: "From the Home : Tapping < exits the app cleanly but if user Tapping < exits click 3 times ask, this do you want to close app ? if yes close"
    const now = Date.now();
    if (now - lastExitTapTimeRef.current > 3000) {
      exitTapCountRef.current = 1;
    } else {
      exitTapCountRef.current += 1;
    }
    lastExitTapTimeRef.current = now;

    if (exitToastTimerRef.current) {
      clearTimeout(exitToastTimerRef.current);
    }

    if (exitTapCountRef.current === 1) {
      setExitToastMessage('Press back 2 more times to close app');
      exitToastTimerRef.current = setTimeout(() => {
        setExitToastMessage(null);
      }, 2500);
    } else if (exitTapCountRef.current === 2) {
      setExitToastMessage('Press back 1 more time to close app');
      exitToastTimerRef.current = setTimeout(() => {
        setExitToastMessage(null);
      }, 2500);
    } else if (exitTapCountRef.current >= 3) {
      exitTapCountRef.current = 0;
      setExitToastMessage(null);
      setIsExitConfirmOpen(true);
    }
  };

  // Hardware Back Button (Android Capacitor) & Browser Popstate Listener
  useEffect(() => {
    let backSub: any = null;

    const initBackButton = async () => {
      try {
        backSub = await CapApp.addListener('backButton', () => {
          handleStepBack();
        });
      } catch (err) {
        // Not native Android platform
      }
    };

    initBackButton();

    const handlePopState = (e: PopStateEvent) => {
      handleStepBack();
    };
    window.addEventListener('popstate', handlePopState);

    return () => {
      if (backSub) {
        backSub.remove();
      }
      window.removeEventListener('popstate', handlePopState);
    };
  }, [
    isExitConfirmOpen,
    isShareModalOpen,
    isMobileMenuOpen,
    selectedNotificationDetail,
    isDownloadModalOpen,
    isLoginModalOpen,
    isBroadcastModalOpen,
    readerState,
    tabHistory,
    activeTab,
  ]);

  // Navigate to Explore with Grade filter
  const handleSelectGradeFilter = (grade: GradeLevel) => {
    setExploreInitialGrade(grade);
    setExploreInitialRegion('all');
    setExploreInitialLanguage('all');
    handleNavigateTab('explore');
  };

  // Navigate to Explore with Region filter
  const handleSelectRegionFilter = (region: RegionId) => {
    setExploreInitialRegion(region);
    setExploreInitialGrade('all');
    setExploreInitialLanguage('all');
    handleNavigateTab('explore');
  };

  // Navigate to Explore with Language filter
  const handleSelectLanguageFilter = (lang: LanguageCode) => {
    setExploreInitialLanguage(lang);
    setExploreInitialRegion('all');
    setExploreInitialGrade('all');
    setExploreInitialBookType('all');
    handleNavigateTab('explore');
  };

  // Direct shortcut to Teacher Guides in Explore
  const handleNavigateToTeacherGuides = () => {
    setExploreInitialBookType('teacher_guide');
    setExploreInitialGrade('all');
    handleNavigateTab('explore');
  };

  const handleNavigateToExplore = () => {
    setExploreInitialBookType('all');
    handleNavigateTab('explore');
  };

  const handleNotificationNavigation = (n: AppNotification) => {
    // 1. Immediately open the rich Interactive Notification Detail Modal
    setSelectedNotificationDetail(n);

    // 2. Direct offline download navigation
    if (n.actionUrl === 'tab:saved' || n.type === 'download') {
      handleNavigateTab('saved');
      return;
    }

    // 3. Exam Prep specific navigation
    if (n.actionUrl === 'tab:examprep') {
      handleNavigateTab('examprep');
      return;
    }

    // 4. Community / Announcements / Notices / Study Tips
    // Navigate in the background so closing or interacting with the modal reveals the post
    const targetPostIdCandidate =
      n.postId ||
      (n.actionUrl && n.actionUrl.includes('#') ? n.actionUrl.split('#')[1] : null);

    if (targetPostIdCandidate) {
      setTargetPostId(targetPostIdCandidate);
    }

    handleNavigateTab('community');
  };
  handleNotificationNavRef.current = handleNotificationNavigation;

  // If Reader is active, render full-screen reading experience
  if (readerState) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 transition-colors">
        <ReaderPage
          book={readerState.book}
          initialUnitNumber={readerState.unitNumber}
          mode={readerState.mode}
          onBack={handleStepBack}
          onUpdateReadingProgress={handleUpdateReadingProgress}
          onOpenDownloadModal={() => handleOpenDownloadModal(readerState.book)}
        />
      </div>
    );
  }

  // Dedicated Web Admin Studio: If running on ethiopian-textbooks.web.app and not logged in, show Admin Login Page!
  if (isWebDeploy && !isAdmin) {
    return (
      <AdminWebLoginPage
        onLoginSuccess={handleLoginSuccess}
        onViewStudentMode={() => setForceStudentView(true)}
      />
    );
  }

  return (
    <div className="min-h-screen w-full max-w-[100vw] overflow-x-hidden flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      {/* Admin Top Bar */}
      {isAdmin && (
        <AdminTopBar
          onOpenBroadcastModal={() => setIsBroadcastModalOpen(true)}
          onOpenAnnouncements={() => {
            handleNavigateTab('community');
          }}
          onExitAdmin={handleExitAdmin}
          theme={theme}
          setTheme={setTheme}
        />
      )}

      {/* Navigation Bar - Only for Students, hidden for Admin */}
      {!isAdmin && (
        <Navbar
          activeTab={activeTab}
          setActiveTab={handleNavigateTab}
          onNavigateToTeacherGuides={handleNavigateToTeacherGuides}
          theme={theme}
          setTheme={setTheme}
          offlineCount={offlineBookIds.length}
          isAdmin={isAdmin}
          onToggleAdmin={handleToggleAdmin}
          onNavigateNotification={handleNotificationNavigation}
          onOpenShareModal={() => setIsShareModalOpen(true)}
          canGoBack={tabHistory.length > 1 || activeTab !== 'home'}
          onBackStep={handleStepBack}
          isMobileMenuOpen={isMobileMenuOpen}
          setIsMobileMenuOpen={setIsMobileMenuOpen}
        />
      )}

      {/* Main Page Routing */}
      <main className={`flex-1 ${activeTab === 'about' ? 'pb-28 sm:pb-2' : 'pb-36 sm:pb-28 lg:pb-8'}`}>
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
              handleNavigateTab('examprep');
            }}
            onNavigateToCommunity={() => {
              handleNavigateTab('community');
            }}
            isAdmin={isAdmin}
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
              handleOpenPdf(book);
            }}
            onNavigateTab={(tab) => {
              handleNavigateTab(tab);
            }}
            allBooks={allBooks}
            targetPostId={targetPostId}
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

        {activeTab === 'curriculum' && <AboutCurriculumPage />}
        {activeTab === 'about' && <AboutPage />}
      </main>

      {/* Admin Login Modal */}
      {isLoginModalOpen && (
        <AdminLoginModal
          isOpen={isLoginModalOpen}
          onClose={() => setIsLoginModalOpen(false)}
          onLoginSuccess={handleLoginSuccess}
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

      {/* Real-time Push Notification Floating Banner with Sound Replay */}
      <PushNotificationBanner
        notification={activePushNotification}
        onClose={() => setActivePushNotification(null)}
        onNavigate={handleNotificationNavigation}
      />

      {/* Interactive Notification Details & Announcement Reader Modal */}
      <NotificationDetailModal
        notification={selectedNotificationDetail}
        onClose={() => setSelectedNotificationDetail(null)}
        onOpenBook={(book) => {
          setSelectedNotificationDetail(null);
          handleOpenPdf(book);
        }}
        onNavigateTab={(tab) => {
          setSelectedNotificationDetail(null);
          handleNavigateTab(tab);
        }}
        onOpenNoticeBoard={(postId) => {
          setSelectedNotificationDetail(null);
          if (postId) {
            setTargetPostId(postId);
          }
          handleNavigateTab('community');
        }}
        allBooks={allBooks}
      />

      {/* Legal Disclaimer, Privacy Policy & Terms Modal */}
      <DisclaimerModal
        isOpen={isDisclaimerOpen}
        onAgree={handleAgreeDisclaimer}
      />

      {/* Mobile Bottom Navigation Bar (Grades 9-12 & EUEE Hub) - Only for Students */}
      {!isAdmin && (
        <MobileBottomNav
          activeTab={activeTab}
          setActiveTab={handleNavigateTab}
          offlineCount={offlineBookIds.length}
        />
      )}

      {/* Share App Modal (Circled Area in Mobile Drawer: Telegram, Facebook, WhatsApp, Copy Link & System Share) */}
      <ShareAppModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
      />

      {/* Exit App Confirmation Modal (3-Tap Exit Prompt from Home) */}
      <ExitConfirmModal
        isOpen={isExitConfirmOpen}
        onClose={() => {
          setIsExitConfirmOpen(false);
          exitTapCountRef.current = 0;
        }}
      />

      {/* Android-style Exit Toast Notification Pill */}
      {exitToastMessage && (
        <div
          role="status"
          className="fixed bottom-20 left-1/2 -translate-x-1/2 z-[240] bg-slate-900/95 text-white px-4 py-2.5 rounded-full border border-slate-700/80 shadow-2xl flex items-center gap-2.5 backdrop-blur-md text-xs font-bold pointer-events-none animate-in fade-in slide-in-from-bottom-3 duration-200"
          style={{
            boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.7), 0 0 15px rgba(244, 63, 94, 0.3)',
          }}
        >
          <div className="w-2 h-2 rounded-full bg-rose-500 animate-ping shrink-0" />
          <span>{exitToastMessage}</span>
        </div>
      )}
    </div>
  );
};
