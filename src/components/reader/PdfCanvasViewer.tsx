import React, { useState, useEffect, useRef } from 'react';
import * as pdfjsLib from 'pdfjs-dist';
import { TTSService } from '../../services/ttsService';
import { StorageService } from '../../services/storageService';
import { QuizGeneratorService } from '../../services/quizGeneratorService';
import { UserNote } from '../../types/user';
import { Book } from '../../types/book';
import { NotesDrawer } from './NotesDrawer';
import { QuizModal } from '../study/QuizModal';
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  ZoomIn,
  ZoomOut,
  Loader2,
  AlertCircle,
  Maximize2,
  Minimize2,
  Sidebar,
  MoveHorizontal,
  MoveVertical,
  Volume2,
  VolumeX,
  Edit3,
  Award,
  Search,
  X,
  ArrowLeft,
  Download,
  Eye,
  EyeOff,
  RotateCw,
  Check,
} from 'lucide-react';

// Configure PDF.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

interface PdfCanvasViewerProps {
  pdfBlob: Blob;
  book: Book;
  onBack: () => void;
  onUpdatePdfFile?: (newFile: File) => void;
}

export const PdfCanvasViewer: React.FC<PdfCanvasViewerProps> = ({
  pdfBlob,
  book,
  onBack,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const rootWrapperRef = useRef<HTMLDivElement>(null);

  const [pdfDoc, setPdfDoc] = useState<pdfjsLib.PDFDocumentProxy | null>(null);
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [scale, setScale] = useState(isMobile ? 1.0 : 1.2);
  const [rotation, setRotation] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isZenMode, setIsZenMode] = useState(false);
  const [showCleanOverlay, setShowCleanOverlay] = useState(true);
  const hideTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isHoveringOverlayRef = useRef(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [fitMode, setFitMode] = useState<'custom' | 'width' | 'page'>(isMobile ? 'width' : 'page');
  const [showZoomToast, setShowZoomToast] = useState(false);
  const [readerTheme, setReaderTheme] = useState<'normal' | 'sepia' | 'dark' | 'contrast'>('normal');

  // Study Tools State
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [currentPageText, setCurrentPageText] = useState('');
  const [isNotesOpen, setIsNotesOpen] = useState(false);
  const [notes, setNotes] = useState<UserNote[]>([]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<number[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  // Dynamic 25-50 Question Quiz State
  const [isQuizConfigOpen, setIsQuizConfigOpen] = useState(false);
  const [isExtractingQuiz, setIsExtractingQuiz] = useState(false);
  const [isQuizActive, setIsQuizActive] = useState(false);
  const [quizQuestionCount, setQuizQuestionCount] = useState<25 | 35 | 50>(25);
  const [selectedQuizTopic, setSelectedQuizTopic] = useState<string>('all');
  const [generatedQuestions, setGeneratedQuestions] = useState<any[]>([]);

  const isOromoBook =
    book.language === 'om' ||
    /oromo|kutaa|herrega|oromiyaa/i.test(book.title) ||
    /oromo|kutaa|herrega|oromiyaa/i.test(book.subject);

  const isAmharicBook =
    book.language === 'am' ||
    /[\u1200-\u137F]/.test(book.title);

  const lang = isOromoBook ? 'om' : isAmharicBook ? 'am' : (book.language || 'en');

  // Load PDF Document from Blob
  useEffect(() => {
    let isCancelled = false;

    const loadDocument = async () => {
      try {
        setIsLoading(true);
        setErrorMsg('');
        const arrayBuffer = await pdfBlob.arrayBuffer();
        const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
        const doc = await loadingTask.promise;

        if (!isCancelled) {
          setPdfDoc(doc);
          setTotalPages(doc.numPages);
          setCurrentPage(1);
          setIsLoading(false);
        }
      } catch (err: any) {
        console.error('Error loading PDF:', err);
        if (!isCancelled) {
          setErrorMsg('Failed to load PDF document.');
          setIsLoading(false);
        }
      }
    };

    loadDocument();

    return () => {
      isCancelled = true;
      TTSService.stop();
    };
  }, [pdfBlob]);

  // Load notes for current page
  useEffect(() => {
    setNotes(StorageService.getNotes(book.id, currentPage));
  }, [book.id, currentPage]);

  // Auto-hide floating Clean View capsules after 0.5s of inactivity
  const triggerOverlayActivity = () => {
    setShowCleanOverlay(true);
    if (hideTimeoutRef.current) {
      clearTimeout(hideTimeoutRef.current);
    }
    if (!isHoveringOverlayRef.current) {
      hideTimeoutRef.current = setTimeout(() => {
        if (!isHoveringOverlayRef.current) {
          setShowCleanOverlay(false);
        }
      }, 500);
    }
  };

  useEffect(() => {
    if (isZenMode) {
      triggerOverlayActivity();
    } else {
      setShowCleanOverlay(true);
      if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
    }
    return () => {
      if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
    };
  }, [isZenMode]);

  // Fullscreen change listener
  useEffect(() => {
    const handleFsChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFsChange);
    return () => document.removeEventListener('fullscreenchange', handleFsChange);
  }, []);

  // Keyboard navigation shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) return;

      if (e.key === 'ArrowRight' || e.key === 'PageDown' || e.key === ' ') {
        e.preventDefault();
        setCurrentPage((p) => Math.min(totalPages, p + 1));
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault();
        setCurrentPage((p) => Math.max(1, p - 1));
      } else if (e.key === 'f' || e.key === 'F') {
        e.preventDefault();
        toggleFullscreen();
      } else if (e.key === 'h' || e.key === 'H' || e.key === 'c' || e.key === 'C') {
        e.preventDefault();
        setIsZenMode((z) => !z);
      } else if (e.key === 'Escape' && isZenMode) {
        setIsZenMode(false);
      } else if (e.key === 'r' || e.key === 'R') {
        e.preventDefault();
        setRotation((r) => (r + 90) % 360);
      } else if (e.key === '+' || e.key === '=') {
        e.preventDefault();
        handleZoomIn();
      } else if (e.key === '-' || e.key === '_') {
        e.preventDefault();
        handleZoomOut();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [totalPages, isZenMode]);

  // Touch Screen Pinch-to-Zoom & Swipe Navigation Gestures
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let touchStartDist = 0;
    let initialTouchScale = scale;
    let isPinching = false;
    let touchStartX = 0;
    let touchStartY = 0;
    let touchStartTime = 0;

    let mouseStartX = 0;
    let mouseStartY = 0;
    let mouseStartTime = 0;
    let isMouseDown = false;

    const handleTouchStart = (e: TouchEvent) => {
      triggerOverlayActivity();

      if (e.touches.length === 2) {
        isPinching = true;
        touchStartDist = Math.hypot(
          e.touches[0].clientX - e.touches[1].clientX,
          e.touches[0].clientY - e.touches[1].clientY
        );
        initialTouchScale = scale;
      } else if (e.touches.length === 1) {
        isPinching = false;
        touchStartX = e.touches[0].clientX;
        touchStartY = e.touches[0].clientY;
        touchStartTime = Date.now();
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 2 && isPinching && touchStartDist > 0) {
        e.preventDefault(); // Prevent standard browser zoom to let PDF scale natively
        const currentDist = Math.hypot(
          e.touches[0].clientX - e.touches[1].clientX,
          e.touches[0].clientY - e.touches[1].clientY
        );
        const factor = currentDist / touchStartDist;
        const newScale = Math.max(0.5, Math.min(3.5, initialTouchScale * factor));
        setFitMode('custom');
        setScale(newScale);
        setShowZoomToast(true);
      }
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (isPinching && e.touches.length < 2) {
        isPinching = false;
        touchStartDist = 0;
        setTimeout(() => setShowZoomToast(false), 800);
      } else if (!isPinching && e.changedTouches.length === 1) {
        const deltaX = e.changedTouches[0].clientX - touchStartX;
        const deltaY = e.changedTouches[0].clientY - touchStartY;
        const deltaTime = Date.now() - touchStartTime;

        // Smooth horizontal swipe (both left-to-right and right-to-left)
        if (deltaTime < 600 && Math.abs(deltaX) > 40 && Math.abs(deltaX) > Math.abs(deltaY) * 1.1) {
          if (deltaX < -40) {
            // Swiped right-to-left (finger moved left) -> Next Page
            handleNextPage();
          } else if (deltaX > 40) {
            // Swiped left-to-right (finger moved right) -> Previous Page
            handlePrevPage();
          }
        }
      }
    };

    // Mouse drag-to-swipe on desktop/trackpad
    const handleMouseDown = (e: MouseEvent) => {
      if (['BUTTON', 'INPUT', 'SELECT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) return;
      isMouseDown = true;
      mouseStartX = e.clientX;
      mouseStartY = e.clientY;
      mouseStartTime = Date.now();
    };

    const handleMouseUp = (e: MouseEvent) => {
      if (!isMouseDown) return;
      isMouseDown = false;
      const deltaX = e.clientX - mouseStartX;
      const deltaY = e.clientY - mouseStartY;
      const deltaTime = Date.now() - mouseStartTime;

      if (deltaTime < 500 && Math.abs(deltaX) > 50 && Math.abs(deltaX) > Math.abs(deltaY) * 1.2) {
        if (deltaX < -50) {
          handleNextPage();
        } else if (deltaX > 50) {
          handlePrevPage();
        }
      }
    };

    // Trackpad Pinch / Ctrl + Wheel Zoom
    const handleWheel = (e: WheelEvent) => {
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault();
        const factor = e.deltaY < 0 ? 1.08 : 0.92;
        setFitMode('custom');
        setScale((s) => Math.max(0.5, Math.min(3.5, s * factor)));
        setShowZoomToast(true);
        clearTimeout((window as any).__zoomToastTimer);
        (window as any).__zoomToastTimer = setTimeout(() => setShowZoomToast(false), 800);
      }
    };

    // Disable native browser 2-finger rotation gestures (Safari/Chrome/Edge)
    const preventGesture = (e: any) => {
      e.preventDefault();
    };
    container.addEventListener('gesturestart', preventGesture, { passive: false });
    container.addEventListener('gesturechange', preventGesture, { passive: false });
    container.addEventListener('gestureend', preventGesture, { passive: false });

    container.addEventListener('touchstart', handleTouchStart, { passive: true });
    container.addEventListener('touchmove', handleTouchMove, { passive: false });
    container.addEventListener('touchend', handleTouchEnd, { passive: true });
    container.addEventListener('mousedown', handleMouseDown);
    container.addEventListener('mouseup', handleMouseUp);
    container.addEventListener('wheel', handleWheel, { passive: false });

    return () => {
      container.removeEventListener('gesturestart', preventGesture);
      container.removeEventListener('gesturechange', preventGesture);
      container.removeEventListener('gestureend', preventGesture);
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchmove', handleTouchMove);
      container.removeEventListener('touchend', handleTouchEnd);
      container.removeEventListener('mousedown', handleMouseDown);
      container.removeEventListener('mouseup', handleMouseUp);
      container.removeEventListener('wheel', handleWheel);
    };
  }, [scale, totalPages]);

  // Render Current Page on Canvas & Extract Page Text for Audio Read Aloud
  useEffect(() => {
    if (!pdfDoc || !canvasRef.current) return;

    let renderTask: pdfjsLib.RenderTask | null = null;
    let isCancelled = false;

    const renderPage = async () => {
      try {
        const page = await pdfDoc.getPage(currentPage);
        if (isCancelled || !canvasRef.current) return;

        // Always respect intrinsic PDF page.rotate combined with user rotation
        const intrinsicRotate = (page as any).rotate || 0;
        const totalRotation = (intrinsicRotate + rotation) % 360;

        // Auto-scale if fit mode is active
        let effectiveScale = scale;
        if (fitMode === 'page' || fitMode === 'width') {
          if (containerRef.current) {
            const unscaledViewport = page.getViewport({ scale: 1, rotation: totalRotation });
            const isMobileDevice = window.innerWidth < 768;
            const horizontalPadding = isMobileDevice ? 8 : 48;
            const verticalPadding = isMobileDevice ? 16 : 48;
            const containerWidth = Math.max(260, containerRef.current.clientWidth - horizontalPadding);
            const containerHeight = Math.max(300, containerRef.current.clientHeight - verticalPadding);

            if (fitMode === 'page') {
              const scaleW = containerWidth / unscaledViewport.width;
              const scaleH = containerHeight / unscaledViewport.height;
              effectiveScale = Math.max(0.35, Math.min(2.5, Math.min(scaleW, scaleH)));
            } else if (fitMode === 'width') {
              effectiveScale = Math.max(0.35, Math.min(3.0, containerWidth / unscaledViewport.width));
            }
          }
        }

        const viewport = page.getViewport({ scale: effectiveScale, rotation: totalRotation });
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d', { alpha: false });

        if (!context) return;

        // Optimized DPI capping: keeps text pin-sharp while saving 60% memory & preventing lag on BlueStacks/emulators
        const outputScale = Math.min(window.devicePixelRatio || 1, 1.75);
        canvas.width = Math.floor(viewport.width * outputScale);
        canvas.height = Math.floor(viewport.height * outputScale);
        canvas.style.width = `${Math.floor(viewport.width)}px`;
        canvas.style.height = `${Math.floor(viewport.height)}px`;
        canvas.style.maxWidth = '100%';

        const transform = outputScale !== 1 ? [outputScale, 0, 0, outputScale, 0, 0] : undefined;

        const renderContext = {
          canvasContext: context,
          viewport,
          transform,
        };

        renderTask = page.render(renderContext);
        await renderTask.promise;

        // Non-blocking text extraction for audio read-aloud: runs asynchronously AFTER visual render
        setTimeout(async () => {
          if (isCancelled) return;
          try {
            const textContent = await page.getTextContent();
            const pageStr = textContent.items
              // @ts-ignore
              .map((item) => item.str)
              .join(' ')
              .replace(/\s+/g, ' ')
              .trim();
            if (!isCancelled) setCurrentPageText(pageStr);
          } catch {}
        }, 50);
      } catch (err: any) {
        if (err.name !== 'RenderingCancelledException') {
          console.error('Render error:', err);
        }
      }
    };

    renderPage();

    return () => {
      isCancelled = true;
      if (renderTask) {
        renderTask.cancel();
      }
    };
  }, [pdfDoc, currentPage, scale, rotation, fitMode]);

  // Audio Read Aloud for Current Page
  const handleToggleAudio = () => {
    if (isAudioPlaying) {
      TTSService.stop();
      setIsAudioPlaying(false);
    } else {
      const textToSpeak =
        currentPageText ||
        (lang === 'om'
          ? `${book.title}. Kutaa ${book.grade}. Fuula ${currentPage}. Kitaaba Barataa Oromiyaa.`
          : `${book.title}. Grade ${book.grade}. Page ${currentPage}. Official Ethiopian Student Textbook.`);

      setIsAudioPlaying(true);
      TTSService.speak(
        textToSpeak,
        book.language === 'am' ? 'am-ET' : 'en-US',
        0.95,
        () => setIsAudioPlaying(false),
        () => setIsAudioPlaying(false)
      );
    }
  };

  // Perform full-text search across PDF
  const handleSearch = async () => {
    if (!pdfDoc || !searchQuery.trim()) return;
    setIsSearching(true);
    const query = searchQuery.toLowerCase().trim();
    const matches: number[] = [];

    for (let i = 1; i <= Math.min(totalPages, 150); i++) {
      try {
        const page = await pdfDoc.getPage(i);
        const textContent = await page.getTextContent();
        // @ts-ignore
        const text = textContent.items.map((it) => it.str).join(' ').toLowerCase();
        if (text.includes(query)) {
          matches.push(i);
        }
      } catch {}
    }

    setSearchResults(matches);
    setIsSearching(false);
    if (matches.length > 0) {
      setCurrentPage(matches[0]);
    }
  };

  // Launch Dynamic 25-50 Question Quiz directly from PDF with specific topic filtering
  const handleStartDynamicQuiz = async (count: 25 | 35 | 50, topicId: string = selectedQuizTopic) => {
    try {
      setIsExtractingQuiz(true);
      const qs = await QuizGeneratorService.extractBookExercisesFromPdf(pdfDoc, book, count, topicId);
      setGeneratedQuestions(qs);
      setQuizQuestionCount(count);
      setIsExtractingQuiz(false);
      setIsQuizConfigOpen(false);
      setIsQuizActive(true);
    } catch (err) {
      console.error(err);
      setIsExtractingQuiz(false);
    }
  };

  const toggleFullscreen = () => {
    if (!rootWrapperRef.current) return;
    if (!document.fullscreenElement) {
      rootWrapperRef.current.requestFullscreen().catch((err) => console.error(err));
    } else {
      document.exitFullscreen().catch((err) => console.error(err));
    }
  };

  const handlePrevPage = () => {
    setCurrentPage((p) => Math.max(1, p - 1));
    containerRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNextPage = () => {
    setCurrentPage((p) => Math.min(totalPages, p + 1));
    containerRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleZoomIn = () => {
    setFitMode('custom');
    setScale((s) => Math.min(3.0, s + 0.15));
  };

  const handleZoomOut = () => {
    setFitMode('custom');
    setScale((s) => Math.max(0.5, s - 0.15));
  };

  const handleDownload = () => {
    const url = URL.createObjectURL(pdfBlob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${book.title}.pdf`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Canvas visual filter based on theme
  const canvasFilterStyle = {
    normal: 'filter-none',
    sepia: 'sepia-[0.35] brightness-[0.96] contrast-[1.05]',
    dark: 'invert-[0.92] hue-rotate-180 brightness-[1.05]',
    contrast: 'contrast-[1.25] brightness-[0.98]',
  }[readerTheme];

  // Localized Quiz Header & Picker strings
  const pickerLabels = {
    om: {
      quizBtn: 'Qormaata (Gaaffii 25-50)',
      modalTitle: 'Qormaata Shaakalaa Kitaaba Irraa',
      modalSubtitle: `Baay'ina gaaffilee ${book.title} keessaa barbaaddu filadhu:`,
      q25: 'Gaaffilee 25 (Shaakala Salphaa)',
      q25desc: 'Gaaffilee gilgaalaa fi yaad-rimee (~20 daqiiqaa)',
      q35: 'Gaaffilee 35 (Qormaata Waliigalaa)',
      q35desc: 'Qormaata boqonnaalee hunda hammatu (~30 daqiiqaa)',
      q50: 'Gaaffilee 50 (Qormaata Biyyooleessaa Guutuu)',
      q50desc: 'Waliigala qormaata qajeeltoo Ministeera Barnootaa (~45 daqiiqaa)',
      cancel: 'Dhiisi',
      quizModalTitle: `Kutaa ${book.grade} ${book.title} • Shaakala Qormaataa (${quizQuestionCount} Gaaffilee)`,
    },
    am: {
      quizBtn: 'ፈተና (25-50 ጥያቄዎች)',
      modalTitle: 'ከመጽሐፉ የተዘጋጀ የልምምድ ፈተና',
      modalSubtitle: `ከ ${book.title} መጽሐፍ የሚወጡትን የጥያቄዎች ብዛት ይምረጡ:`,
      q25: '25 ጥያቄዎች (ቀላል ልምምድ)',
      q25desc: 'የምዕራፍ መልመጃዎች እና ጽንሰ-ሀሳቦች (~20 ደቂቃ)',
      q35: '35 ጥያቄዎች (አጠቃላይ ፈተና)',
      q35desc: 'ሁሉንም ምዕራፎች ያካተተ ፈተና (~30 ደቂቃ)',
      q50: '50 ጥያቄዎች (ሙሉ የፈተና ሞዴል)',
      q50desc: 'የትምህርት ሚኒስቴር ሙሉ ፈተና ስታንዳርድ (~45 ደቂቃ)',
      cancel: 'ይቅር',
      quizModalTitle: `${book.grade}ኛ ክፍል ${book.title} • የልምምድ ፈተና (${quizQuestionCount} ጥያቄዎች)`,
    },
    en: {
      quizBtn: 'Quiz (25-50 Qs)',
      modalTitle: 'Generate In-Book Practice Quiz',
      modalSubtitle: `Select the number of questions to extract directly from ${book.title}:`,
      q25: '25 Questions (Quick Review)',
      q25desc: 'Chapter exercises & core concepts (~20 mins)',
      q35: '35 Questions (Comprehensive Test)',
      q35desc: 'Multi-unit standard assessment (~30 mins)',
      q50: '50 Questions (Full National Exam)',
      q50desc: 'Complete Ministry of Education mock examination (~45 mins)',
      cancel: 'Cancel',
      quizModalTitle: `Grade ${book.grade} ${book.title} • In-Book Quiz (${quizQuestionCount} Questions)`,
    },
  }[lang === 'om' ? 'om' : lang === 'am' ? 'am' : 'en'];

  if (isLoading) {
    return (
      <div className="py-40 flex flex-col items-center justify-center space-y-4 bg-slate-950 text-white min-h-screen">
        <Loader2 className="w-12 h-12 animate-spin text-emerald-400" />
        <div className="text-base font-black">Opening Authentic Textbook Canvas...</div>
        <div className="text-xs text-slate-500">Preparing pixel-perfect pages with all math equations and figures</div>
      </div>
    );
  }

  if (errorMsg) {
    return (
      <div className="p-12 text-center max-w-md mx-auto space-y-4 bg-slate-950 text-white min-h-screen flex flex-col items-center justify-center">
        <div className="w-14 h-14 rounded-2xl bg-rose-500/20 text-rose-400 flex items-center justify-center mx-auto">
          <AlertCircle className="w-8 h-8" />
        </div>
        <h4 className="text-base font-bold">{errorMsg}</h4>
        <button onClick={onBack} className="px-4 py-2 bg-slate-800 rounded-xl text-xs font-bold">
          Return to Library
        </button>
      </div>
    );
  }

  return (
    <div
      ref={rootWrapperRef}
      onMouseMove={triggerOverlayActivity}
      onTouchStart={triggerOverlayActivity}
      onTouchMove={triggerOverlayActivity}
      onScroll={triggerOverlayActivity}
      className={`flex-1 w-full flex flex-col items-center select-none bg-slate-950 text-slate-100 ${
        isFullscreen ? 'fixed inset-0 z-50 bg-slate-950 p-1 sm:p-2' : 'min-h-screen'
      }`}
    >
      {/* 🔍 Realtime Touch Pinch Zoom Feedback Badge */}
      {showZoomToast && (
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 pointer-events-none bg-slate-900/95 backdrop-blur-md border border-emerald-500/60 text-white px-5 py-2.5 rounded-2xl shadow-2xl font-mono text-sm font-black flex items-center gap-2 animate-in zoom-in-90 duration-150">
          <ZoomIn className="w-4 h-4 text-emerald-400" />
          <span>Zoom: {Math.round(scale * 100)}%</span>
        </div>
      )}

      {/* 🌟 FLOATING CONTROLS FOR 100% PURE CLEAN VIEW (ZEN MODE - AUTO-HIDES AFTER 0.5s) */}
      {isZenMode && (
        <>
          {/* Top Edge Hover Wakeup Zone */}
          <div
            onMouseEnter={triggerOverlayActivity}
            className="fixed top-0 inset-x-0 h-6 z-40 pointer-events-auto"
          />

          <div
            onMouseEnter={() => {
              isHoveringOverlayRef.current = true;
              setShowCleanOverlay(true);
              if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
            }}
            onMouseLeave={() => {
              isHoveringOverlayRef.current = false;
              triggerOverlayActivity();
            }}
            className={`fixed top-3 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 bg-slate-900/95 backdrop-blur-md border border-slate-700/80 px-4 py-1.5 rounded-full shadow-2xl transition-all duration-300 ${
              showCleanOverlay
                ? 'opacity-100 translate-y-0 pointer-events-auto'
                : 'opacity-0 -translate-y-4 pointer-events-none'
            }`}
          >
            <button
              onClick={() => setIsZenMode(false)}
              className="flex items-center gap-1.5 text-xs font-bold text-emerald-400 hover:text-emerald-300"
              title="Restore Toolbars (Press H)"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Exit Clean View</span>
            </button>
            <div className="h-3.5 w-px bg-slate-700" />
            <button
              onClick={() => setIsNotesOpen(true)}
              className="flex items-center gap-1.5 text-xs text-slate-300 hover:text-white font-bold"
              title="Open Notes"
            >
              <Edit3 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Notes</span>
              {notes.length > 0 && (
                <span className="px-1.5 py-0.2 bg-emerald-600 text-white rounded-full text-[10px]">
                  {notes.length}
                </span>
              )}
            </button>
            <div className="h-3.5 w-px bg-slate-700" />
            <button
              onClick={() => setRotation((r) => (r + 90) % 360)}
              className="flex items-center gap-1.5 text-xs text-slate-300 hover:text-emerald-400 font-bold transition-colors"
              title="Rotate Page 90° Clockwise (Press R)"
            >
              <RotateCw className="w-3.5 h-3.5" />
              <span>Rotate</span>
            </button>
            <div className="h-3.5 w-px bg-slate-700" />
            <button
              onClick={toggleFullscreen}
              className="flex items-center gap-1 text-xs text-slate-300 hover:text-white font-bold"
              title="Toggle Fullscreen (F)"
            >
              {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
              <span className="hidden sm:inline">{isFullscreen ? 'Exit Full' : 'Full'}</span>
            </button>
          </div>
        </>
      )}

      {/* MOBILE COMPACT TOP BAR (Hidden on md+ screens and in Clean View) */}
      {!isZenMode && (
        <div className="md:hidden sticky top-0 z-40 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 px-3 py-2 flex items-center justify-between gap-2 shadow-xl w-full">
          <div className="flex items-center gap-2 min-w-0">
            <button
              onClick={onBack}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white transition-colors flex items-center gap-1 text-xs font-bold border border-slate-700 shadow-sm active:scale-95 shrink-0"
            >
              <ArrowLeft className="w-4 h-4 text-emerald-400" />
              <span className="text-[11px]">Library</span>
            </button>

            <div className="min-w-0">
              <div className="text-xs font-black text-white truncate">
                {book.title}
              </div>
              <div className="text-[10px] text-slate-400 flex items-center gap-1.5 truncate">
                <span className="text-emerald-400 font-bold">Grade {book.grade}</span>
                <span>•</span>
                <span className="capitalize">{book.subject}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            {/* Dedicated prominent Clean View button */}
            <button
              onClick={() => setIsZenMode(true)}
              className="flex items-center gap-1 px-2.5 py-1.5 bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-400 hover:text-emerald-300 rounded-xl border border-emerald-500/40 text-xs font-black shadow-sm active:scale-95 transition-all"
              title="Clean View (Hide all controls for full-screen reading)"
            >
              <Eye className="w-3.5 h-3.5" />
              <span className="text-[11px]">Clean</span>
            </button>

            {/* Sidebar / Jump drawer */}
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className={`p-2 rounded-xl border transition-all active:scale-95 ${
                isSidebarOpen
                  ? 'bg-emerald-600 text-white border-emerald-500'
                  : 'bg-slate-950 text-slate-300 border-slate-800'
              }`}
              title="Chapters & Page Jump"
            >
              <Sidebar className="w-4 h-4" />
            </button>

            {/* Search */}
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className={`p-2 rounded-xl border transition-colors active:scale-95 ${
                isSearchOpen
                  ? 'bg-blue-600 text-white border-blue-500'
                  : 'bg-slate-950 text-slate-400 border-slate-800'
              }`}
              title="Search In Book"
            >
              <Search className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* DESKTOP FULL TOP TOOLBAR (Hidden on mobile and in Clean View) */}
      {!isZenMode && (
        <div className="hidden md:flex sticky top-0 z-40 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 px-4 py-2 items-center justify-between gap-2.5 shadow-2xl w-full transition-all">
          {/* Left: Library Back & Book Title */}
          {!isFullscreen && (
            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={onBack}
                className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white transition-colors flex items-center gap-1.5 text-xs font-bold border border-slate-700 shadow-sm"
              >
                <ArrowLeft className="w-4 h-4 text-emerald-400" />
                <span>Library</span>
              </button>

              <div>
                <div className="text-xs sm:text-sm font-black text-white truncate max-w-[200px] lg:max-w-md">
                  {book.title}
                </div>
                <div className="text-[10px] text-slate-400 flex items-center gap-2">
                  <span>Grade {book.grade} • {book.subject}</span>
                  <span className="text-emerald-400 font-bold bg-emerald-950/80 px-2 py-0.2 rounded border border-emerald-800">
                    Official MoE Textbook
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Center: Page Flip Navigator & Fit Modes */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Sidebar Drawer Toggle */}
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className={`p-2 rounded-xl border transition-all ${
                isSidebarOpen
                  ? 'bg-emerald-600 text-white border-emerald-500'
                  : 'bg-slate-950 text-slate-400 hover:text-white border-slate-800'
              }`}
              title="Page Thumbnails & Jump Drawer"
            >
              <Sidebar className="w-4 h-4" />
            </button>

            {/* Page Controls */}
            <div className="flex items-center gap-1 bg-slate-950 px-2.5 py-1 rounded-xl border border-slate-800 shadow-inner">
              <button
                onClick={() => setCurrentPage(1)}
                disabled={currentPage <= 1}
                className="p-1 rounded text-slate-400 hover:text-white disabled:opacity-30"
                title="First Page"
              >
                <ChevronsLeft className="w-4 h-4" />
              </button>

              <button
                onClick={handlePrevPage}
                disabled={currentPage <= 1}
                className="p-1 rounded text-slate-400 hover:text-white disabled:opacity-30"
                title="Previous Page (←)"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <div className="font-mono font-bold text-slate-200 px-1 flex items-center gap-1 text-xs">
                <input
                  type="number"
                  min={1}
                  max={totalPages}
                  value={currentPage}
                  onChange={(e) => {
                    const val = Number(e.target.value);
                    if (val >= 1 && val <= totalPages) setCurrentPage(val);
                  }}
                  className="w-12 text-center bg-slate-900 border border-slate-700 rounded px-1 text-emerald-400 font-bold text-xs focus:ring-1 focus:ring-emerald-400"
                />
                <span className="text-slate-500">/ {totalPages}</span>
              </div>

              <button
                onClick={handleNextPage}
                disabled={currentPage >= totalPages}
                className="p-1 rounded text-slate-400 hover:text-white disabled:opacity-30"
                title="Next Page (→)"
              >
                <ChevronRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => setCurrentPage(totalPages)}
                disabled={currentPage >= totalPages}
                className="p-1 rounded text-slate-400 hover:text-white disabled:opacity-30"
                title="Last Page"
              >
                <ChevronsRight className="w-4 h-4" />
              </button>
            </div>

            {/* Fit modes */}
            <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs">
              <button
                onClick={() => setFitMode('page')}
                className={`px-2.5 py-1 rounded-lg font-bold transition-all flex items-center gap-1 ${
                  fitMode === 'page'
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
                title="Fit Full Page in Viewport"
              >
                <MoveVertical className="w-3.5 h-3.5" />
                <span>Full Page</span>
              </button>

              <button
                onClick={() => setFitMode('width')}
                className={`px-2.5 py-1 rounded-lg font-bold transition-all flex items-center gap-1 ${
                  fitMode === 'width'
                    ? 'bg-emerald-600 text-white shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
                title="Fit Page to Width"
              >
                <MoveHorizontal className="w-3.5 h-3.5" />
                <span>Fit Width</span>
              </button>
            </div>
          </div>

          {/* Right: Study Tools & Fullscreen Controls */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Audio Read-Aloud (Shown when not fullscreen) */}
            {!isFullscreen && (
              <button
                onClick={handleToggleAudio}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  isAudioPlaying
                    ? 'bg-rose-500 text-white shadow-md animate-pulse'
                    : 'bg-emerald-500/20 text-emerald-300 hover:bg-emerald-500/30 border border-emerald-500/40'
                }`}
                title="Read Current Page Aloud"
              >
                {isAudioPlaying ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                <span className="hidden lg:inline">{isAudioPlaying ? 'Stop Audio' : 'Read Aloud'}</span>
              </button>
            )}

            {/* Notes Drawer */}
            <button
              onClick={() => setIsNotesOpen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-950 hover:bg-slate-800 text-slate-200 border border-slate-800"
              title="Open Notes for Current Page"
            >
              <Edit3 className="w-3.5 h-3.5 text-emerald-400" />
              <span className="hidden lg:inline">Notes</span>
              {notes.length > 0 && (
                <span className="px-1.5 py-0.2 bg-emerald-600 text-white rounded-full text-[10px]">
                  {notes.length}
                </span>
              )}
            </button>

            {/* 25-50 Question Quiz Generator Button */}
            {!isFullscreen && (
              <button
                onClick={() => setIsQuizConfigOpen(true)}
                className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-black bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-400 hover:to-yellow-400 text-slate-950 shadow-md transition-all active:scale-95"
                title="Generate 25 to 50 Practice Quiz Questions"
              >
                <Award className="w-4 h-4 text-slate-950" />
                <span>{pickerLabels.quizBtn}</span>
              </button>
            )}

            {/* Clean View / Zen Mode Toggle */}
            <button
              onClick={() => setIsZenMode(true)}
              className="flex items-center gap-1 px-2.5 py-1.5 bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 hover:text-emerald-300 rounded-xl border border-emerald-500/30 text-xs font-bold transition-colors"
              title="Hide All Bars for 100% Clean View (Press H)"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Clean View</span>
            </button>

            {/* Search Toggle */}
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className={`p-2 rounded-xl border text-xs transition-colors ${
                isSearchOpen
                  ? 'bg-blue-600 text-white border-blue-500'
                  : 'bg-slate-950 text-slate-400 hover:text-white border-slate-800'
              }`}
              title="Search Text in Book"
            >
              <Search className="w-3.5 h-3.5" />
            </button>

            {/* Theme / Eye-care filters */}
            <select
              value={readerTheme}
              onChange={(e) => setReaderTheme(e.target.value as any)}
              className="px-2.5 py-1.5 bg-slate-950 border border-slate-800 rounded-xl text-xs font-bold text-slate-300 focus:outline-none"
              title="Page Display Tone"
            >
              <option value="normal">⚪ Clean White</option>
              <option value="sepia">📜 Sepia Eye-Care</option>
              <option value="dark">🌙 Dark Inverted</option>
              <option value="contrast">✨ High Contrast</option>
            </select>

            {/* Zoom controls */}
            <div className="flex items-center gap-1 bg-slate-950 px-2 py-1 rounded-xl border border-slate-800 text-xs">
              <button onClick={handleZoomOut} className="p-1 text-slate-400 hover:text-emerald-400">
                <ZoomOut className="w-3.5 h-3.5" />
              </button>
              <span className="font-mono text-[11px] px-1 font-bold text-slate-300">
                {Math.round(scale * 100)}%
              </span>
              <button onClick={handleZoomIn} className="p-1 text-slate-400 hover:text-emerald-400">
                <ZoomIn className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Rotate Page Button */}
            <button
              onClick={() => setRotation((r) => (r + 90) % 360)}
              className="p-2 bg-slate-950 hover:bg-slate-800 text-slate-300 hover:text-emerald-400 rounded-xl border border-slate-800 shadow-sm active:scale-95 transition-colors"
              title="Rotate Page 90° Clockwise (Press R)"
            >
              <RotateCw className="w-3.5 h-3.5" />
            </button>

            {/* Fullscreen Button */}
            <button
              onClick={toggleFullscreen}
              className="flex items-center gap-1 px-3 py-1.5 bg-slate-950 hover:bg-slate-800 text-slate-200 font-bold rounded-xl border border-slate-800 shadow-sm active:scale-95"
              title="Toggle Fullscreen View (F)"
            >
              {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
              <span>{isFullscreen ? 'Exit' : 'Full'}</span>
            </button>

            {/* Download */}
            <button
              onClick={handleDownload}
              className="p-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl shadow-md active:scale-95"
              title="Download PDF Document"
            >
              <Download className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}

      {/* Floating In-Book Search Bar */}
      {isSearchOpen && (
        <div className="w-full bg-slate-900 border-b border-slate-800 p-3 px-6 flex items-center gap-3 z-30 animate-in slide-in-from-top duration-200">
          <Search className="w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            placeholder="Search words, terms, equations in this textbook..."
            className="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
          <button
            onClick={handleSearch}
            disabled={isSearching}
            className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl flex items-center gap-1"
          >
            {isSearching ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <span>Search</span>}
          </button>

          {searchResults.length > 0 && (
            <div className="text-xs font-bold text-emerald-400 flex items-center gap-2">
              <span>Found in {searchResults.length} pages:</span>
              <div className="flex gap-1 overflow-x-auto max-w-xs">
                {searchResults.slice(0, 8).map((pNum) => (
                  <button
                    key={pNum}
                    onClick={() => setCurrentPage(pNum)}
                    className="px-2 py-0.5 bg-slate-800 hover:bg-slate-700 text-white rounded text-[11px] font-mono"
                  >
                    p.{pNum}
                  </button>
                ))}
              </div>
            </div>
          )}

          <button onClick={() => setIsSearchOpen(false)} className="text-slate-400 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Main Canvas Viewport with Optional Thumbnail Sidebar */}
      <div className="flex-1 w-full flex overflow-hidden relative">
        {/* Page Thumbnails / Jump Drawer */}
        {isSidebarOpen && (
          <div className="w-48 sm:w-56 bg-slate-900/95 border-r border-slate-800 overflow-y-auto p-3 space-y-2 shrink-0 animate-in slide-in-from-left duration-200 z-20">
            <div className="text-xs font-black text-slate-400 uppercase tracking-wider px-1 pb-1 border-b border-slate-800 flex justify-between items-center">
              <span>All Pages ({totalPages})</span>
              <button onClick={() => setIsSidebarOpen(false)} className="text-slate-500 hover:text-white">
                ✕
              </button>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                <button
                  key={pageNum}
                  onClick={() => {
                    setCurrentPage(pageNum);
                    containerRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className={`p-2 rounded-xl text-xs font-bold text-center border transition-all ${
                    currentPage === pageNum
                      ? 'bg-emerald-600 text-white border-emerald-400 shadow-md scale-105'
                      : 'bg-slate-950 text-slate-300 border-slate-800 hover:border-slate-600'
                  }`}
                >
                  <div className="text-[10px] text-slate-400">Page</div>
                  <div className="text-sm font-black">{pageNum}</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Real PDF Page Canvas Container with Tone Filter & Double Click Toggle */}
        <div
          ref={containerRef}
          onClick={() => {
            if (isZenMode) triggerOverlayActivity();
          }}
          onDoubleClick={(e) => {
            // Ignore double clicks on inputs or buttons
            if (['INPUT', 'SELECT', 'BUTTON', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) return;
            setIsZenMode((z) => !z);
          }}
          className={`flex-1 w-full flex justify-center items-start overflow-y-auto overflow-x-hidden p-1 sm:p-4 md:p-6 relative cursor-default ${
            isFullscreen ? 'h-screen' : 'min-h-[85vh]'
          } ${isZenMode ? 'pb-16' : 'pb-20 md:pb-6'}`}
          title="Double-click page to toggle Clean View / Full Screen"
        >
          {/* Left Side Page Turn Button (Desktop only - hidden on mobile to prevent covering text) */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handlePrevPage();
              triggerOverlayActivity();
            }}
            disabled={currentPage <= 1}
            className={`hidden md:flex fixed sm:absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-30 p-2.5 sm:p-3.5 rounded-2xl bg-slate-900/70 hover:bg-slate-900/95 text-white/70 hover:text-white backdrop-blur-md border border-slate-700/60 shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95 disabled:opacity-0 disabled:pointer-events-none group ${
              isZenMode && !showCleanOverlay ? 'opacity-0 pointer-events-none' : 'opacity-40 hover:opacity-100'
            }`}
            title="Previous Page (Click left or press ←)"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 group-hover:-translate-x-0.5 transition-transform" />
          </button>

          {/* Right Side Page Turn Button (Desktop only - hidden on mobile to prevent covering text) */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleNextPage();
              triggerOverlayActivity();
            }}
            disabled={currentPage >= totalPages}
            className={`hidden md:flex fixed sm:absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-30 p-2.5 sm:p-3.5 rounded-2xl bg-slate-900/70 hover:bg-slate-900/95 text-white/70 hover:text-white backdrop-blur-md border border-slate-700/60 shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95 disabled:opacity-0 disabled:pointer-events-none group ${
              isZenMode && !showCleanOverlay ? 'opacity-0 pointer-events-none' : 'opacity-40 hover:opacity-100'
            }`}
            title="Next Page (Click right or press →)"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-0.5 transition-transform" />
          </button>

          <div
            className={`bg-white rounded-xl sm:rounded-2xl shadow-2xl overflow-hidden border border-slate-700/60 transition-all max-w-full ${canvasFilterStyle}`}
          >
            <canvas ref={canvasRef} className="block mx-auto max-w-full" />
          </div>
        </div>

        {/* Clean View Bottom Floating Pill (Auto-hides after inactivity or stays visible on touch) */}
        {isZenMode && (
          <>
            {/* Bottom Edge Hover/Touch Wakeup Zone */}
            <div
              onMouseEnter={triggerOverlayActivity}
              onTouchStart={triggerOverlayActivity}
              className="fixed bottom-0 inset-x-0 h-12 z-40 pointer-events-auto"
            />

            <div
              onMouseEnter={() => {
                isHoveringOverlayRef.current = true;
                setShowCleanOverlay(true);
                if (hideTimeoutRef.current) clearTimeout(hideTimeoutRef.current);
              }}
              onMouseLeave={() => {
                isHoveringOverlayRef.current = false;
                triggerOverlayActivity();
              }}
              className={`fixed bottom-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 bg-slate-900/95 backdrop-blur-md border border-slate-700/90 px-4 py-2 rounded-full shadow-2xl transition-all duration-300 ${
                showCleanOverlay
                  ? 'opacity-100 translate-y-0 pointer-events-auto'
                  : 'opacity-0 translate-y-6 pointer-events-none'
              }`}
            >
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handlePrevPage();
                  triggerOverlayActivity();
                }}
                disabled={currentPage <= 1}
                className="p-1 text-slate-300 hover:text-white disabled:opacity-25 active:scale-95 transition-transform"
                title="Previous Page (←)"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <span className="font-mono text-xs font-black text-white px-2 tracking-wide">
                {currentPage} / {totalPages}
              </span>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleNextPage();
                  triggerOverlayActivity();
                }}
                disabled={currentPage >= totalPages}
                className="p-1 text-slate-300 hover:text-white disabled:opacity-25 active:scale-95 transition-transform"
                title="Next Page (→)"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              <div className="w-px h-4 bg-slate-700 mx-1" />

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsZenMode(false);
                }}
                className="flex items-center gap-1.5 px-3 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full text-xs font-black shadow-md active:scale-95 transition-all"
                title="Exit Clean View"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Exit Clean</span>
              </button>
            </div>
          </>
        )}

        {/* MOBILE PRO BOTTOM BAR (Hidden in Clean View or on Desktop) */}
        {!isZenMode && (
          <div className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-slate-900/95 backdrop-blur-md border-t border-slate-800 px-3 py-2 flex items-center justify-between shadow-2xl safe-area-bottom">
            {/* Prev Page */}
            <button
              onClick={handlePrevPage}
              disabled={currentPage <= 1}
              className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white disabled:opacity-30 disabled:pointer-events-none active:scale-90 transition-transform shadow-sm"
              title="Previous Page"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Page Jump / Drawer trigger */}
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 font-mono text-xs font-bold text-slate-200 hover:border-slate-600 transition-colors flex items-center gap-1.5"
            >
              <span className="text-emerald-400 font-black">{currentPage}</span>
              <span className="text-slate-500">/</span>
              <span className="text-slate-400">{totalPages}</span>
            </button>

            {/* Next Page */}
            <button
              onClick={handleNextPage}
              disabled={currentPage >= totalPages}
              className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white disabled:opacity-30 disabled:pointer-events-none active:scale-90 transition-transform shadow-sm"
              title="Next Page"
            >
              <ChevronRight className="w-5 h-5" />
            </button>

            {/* Fit Width toggle */}
            <button
              onClick={() => setFitMode(fitMode === 'width' ? 'page' : 'width')}
              className={`px-2.5 py-1.5 rounded-xl text-xs font-bold border transition-colors flex items-center gap-1 ${
                fitMode === 'width'
                  ? 'bg-emerald-600 text-white border-emerald-500'
                  : 'bg-slate-950 text-slate-300 border-slate-800'
              }`}
              title="Fit Page to Width"
            >
              <MoveHorizontal className="w-3.5 h-3.5" />
              <span className="text-[11px]">{fitMode === 'width' ? 'Width' : 'Page'}</span>
            </button>

            {/* Reading Tone cycle */}
            <button
              onClick={() => {
                const themes: ('normal' | 'sepia' | 'dark')[] = ['normal', 'sepia', 'dark'];
                const nextIdx = (themes.indexOf(readerTheme as any) + 1) % themes.length;
                setReaderTheme(themes[nextIdx]);
              }}
              className="p-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 active:scale-95 text-xs font-bold"
              title="Cycle Reader Tone: White -> Sepia -> Dark"
            >
              {readerTheme === 'normal' ? '⚪' : readerTheme === 'sepia' ? '📜' : '🌙'}
            </button>

            {/* Practice Quiz */}
            <button
              onClick={() => setIsQuizConfigOpen(true)}
              className="p-2 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 font-black text-xs active:scale-95 shadow-md flex items-center gap-1"
              title="Generate Practice Quiz"
            >
              <Award className="w-4 h-4 text-slate-950" />
            </button>
          </div>
        )}
      </div>

      {/* Quiz Question Count Picker Modal */}
      {isQuizConfigOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 max-w-md w-full border border-slate-800 shadow-2xl text-center space-y-6 animate-in zoom-in-95 duration-200">
            <div className="w-16 h-16 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center mx-auto shadow-md">
              <Award className="w-8 h-8" />
            </div>

            <div>
              <h3 className="text-xl font-black text-white">
                {pickerLabels.modalTitle}
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                {pickerLabels.modalSubtitle}
              </p>
            </div>

            {isExtractingQuiz ? (
              <div className="py-8 flex flex-col items-center justify-center space-y-3">
                <Loader2 className="w-8 h-8 animate-spin text-amber-400" />
                <div className="text-xs font-bold text-amber-300">
                  {lang === 'om'
                    ? 'Kitaaba keessaa gaaffilee qormaataa funaana jira...'
                    : lang === 'am'
                    ? 'ከመጽሐፉ ውስጥ የፈተና ጥያቄዎችን በማሰባሰብ ላይ...'
                    : 'Extracting exercise questions directly from textbook...'}
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Topic / Unit Selector */}
                <div>
                  <div className="text-xs font-extrabold text-slate-300 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <span>🎯</span>
                    <span>
                      {lang === 'om'
                        ? 'Mata-duree / Boqonnaa Filadhu:'
                        : lang === 'am'
                        ? 'ርዕስ ወይም ምዕራፍ ይምረጡ:'
                        : 'Select Topic / Chapter:'}
                    </span>
                  </div>
                  <div className="grid grid-cols-1 gap-1.5 max-h-44 overflow-y-auto pr-1">
                    {QuizGeneratorService.getAvailableTopics(book.subject, book).map((t) => {
                      const isSelected = selectedQuizTopic === t.id;
                      const topicName = lang === 'om' ? t.nameOromo : lang === 'am' ? t.nameAmharic : t.nameEnglish;
                      return (
                        <button
                          key={t.id}
                          type="button"
                          onClick={() => setSelectedQuizTopic(t.id)}
                          className={`p-2.5 rounded-xl border text-left text-xs font-bold flex items-center gap-2.5 transition-all ${
                            isSelected
                              ? 'bg-emerald-950/80 border-emerald-400 text-emerald-300 ring-2 ring-emerald-500/40 shadow-sm'
                              : 'bg-slate-800/80 border-slate-700/80 text-slate-300 hover:bg-slate-700 hover:text-white'
                          }`}
                        >
                          <span className="text-base">{t.icon}</span>
                          <span className="truncate flex-1">{topicName}</span>
                          {isSelected && <Check className="w-4 h-4 text-emerald-400 shrink-0" />}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="space-y-2 pt-2 border-t border-slate-800">
                  <div className="text-xs font-extrabold text-slate-300 uppercase tracking-wider mb-1">
                    {lang === 'om' ? 'Baay’ina Gaaffilee Filadhu:' : lang === 'am' ? 'የጥያቄዎች ብዛት:' : 'Select Question Count:'}
                  </div>

                  <button
                    onClick={() => handleStartDynamicQuiz(25)}
                    className="w-full p-3.5 rounded-2xl bg-slate-800 hover:bg-slate-700 border border-slate-700 flex items-center justify-between text-left transition-all hover:scale-[1.01]"
                  >
                    <div>
                      <div className="font-extrabold text-sm text-white">{pickerLabels.q25}</div>
                      <div className="text-[11px] text-slate-400">{pickerLabels.q25desc}</div>
                    </div>
                    <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 rounded-xl text-xs font-bold">
                      25 Qs
                    </span>
                  </button>

                  <button
                    onClick={() => handleStartDynamicQuiz(35)}
                    className="w-full p-3.5 rounded-2xl bg-slate-800 hover:bg-slate-700 border border-slate-700 flex items-center justify-between text-left transition-all hover:scale-[1.01]"
                  >
                    <div>
                      <div className="font-extrabold text-sm text-white">{pickerLabels.q35}</div>
                      <div className="text-[11px] text-slate-400">{pickerLabels.q35desc}</div>
                    </div>
                    <span className="px-3 py-1 bg-amber-500/20 text-amber-300 rounded-xl text-xs font-bold">
                      35 Qs
                    </span>
                  </button>

                  <button
                    onClick={() => handleStartDynamicQuiz(50)}
                    className="w-full p-3.5 rounded-2xl bg-gradient-to-r from-amber-600/30 to-yellow-600/30 hover:from-amber-600/40 hover:to-yellow-600/40 border border-amber-500/50 flex items-center justify-between text-left transition-all hover:scale-[1.01]"
                  >
                    <div>
                      <div className="font-extrabold text-sm text-amber-300">{pickerLabels.q50}</div>
                      <div className="text-[11px] text-slate-300">{pickerLabels.q50desc}</div>
                    </div>
                    <span className="px-3 py-1 bg-amber-500 text-slate-950 rounded-xl text-xs font-black">
                      50 Qs 🔥
                    </span>
                  </button>
                </div>
              </div>
            )}

            <button
              onClick={() => setIsQuizConfigOpen(false)}
              className="text-xs text-slate-400 hover:text-white font-bold"
            >
              {pickerLabels.cancel}
            </button>
          </div>
        </div>
      )}

      {/* Slide-over Notes Drawer */}
      <NotesDrawer
        isOpen={isNotesOpen}
        onClose={() => setIsNotesOpen(false)}
        notes={notes}
        onSaveNote={(noteData) => {
          StorageService.saveNote({
            ...noteData,
            bookId: book.id,
            unitNumber: currentPage,
          });
          setNotes(StorageService.getNotes(book.id, currentPage));
        }}
        onDeleteNote={(noteId) => {
          StorageService.deleteNote(noteId);
          setNotes(StorageService.getNotes(book.id, currentPage));
        }}
        unitNumber={currentPage}
        bookTitle={book.title}
      />

      {/* Dynamic 25-50 Question Quiz Modal */}
      {isQuizActive && (
        <QuizModal
          isOpen={isQuizActive}
          onClose={() => setIsQuizActive(false)}
          title={pickerLabels.quizModalTitle}
          questions={generatedQuestions}
          language={lang}
        />
      )}
    </div>
  );
};
