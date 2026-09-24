import React, { useState, useEffect, useRef } from 'react';
import * as pdfjsLib from 'pdfjs-dist';
import { TTSService } from '../../services/ttsService';
import { StorageService } from '../../services/storageService';
import { DbService } from '../../services/dbService';
import { CloudStorageService, DEFAULT_CLOUD_CONFIG } from '../../services/cloudStorageService';
import { QuizGeneratorService } from '../../services/quizGeneratorService';
import { UserNote } from '../../types/user';
import { Book } from '../../types/book';
import { NotesDrawer } from './NotesDrawer';
import { QuizModal } from '../study/QuizModal';
import { InternetRequiredModal } from '../common/InternetRequiredModal';
import { RewardedVideoAdModal } from '../ads/RewardedVideoAdModal';
import { ReaderBottomAdBanner } from '../ads/ReaderBottomAdBanner';
import { NetworkService } from '../../services/networkService';
import { FastDownloadIcon } from '../common/FastDownloadIcon';
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
  RefreshCw,
  UploadCloud,
  Check,
  BookOpen,
  Layers,
  Compass,
  Sun,
  Moon,
  WifiOff,
  ShieldAlert,
} from 'lucide-react';

// Configure PDF.js worker locally for 100% offline & same-origin security compliance
if (typeof window !== 'undefined') {
  const origin = window.location.origin && window.location.origin !== 'null' ? window.location.origin : '';
  pdfjsLib.GlobalWorkerOptions.workerSrc = `${origin}/pdf.worker.min.js`;
} else {
  pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.js';
}

interface ContinuousPdfPageProps {
  pageNumber: number;
  pdfDoc: pdfjsLib.PDFDocumentProxy;
  scale: number;
  rotation: number;
  fitMode: 'custom' | 'width' | 'page';
  canvasFilterStyle: string;
  containerRef: React.RefObject<HTMLDivElement | null>;
  readerTheme?: 'normal' | 'sepia' | 'dark' | 'contrast';
  isActive: boolean;
  onBecomeVisible: (pageNumber: number) => void;
  onTextExtracted?: (pageNumber: number, text: string) => void;
}

const ContinuousPdfPage: React.FC<ContinuousPdfPageProps> = React.memo(({
  pageNumber,
  pdfDoc,
  scale,
  rotation,
  fitMode,
  canvasFilterStyle,
  containerRef,
  readerTheme = 'normal',
  isActive,
  onBecomeVisible,
  onTextExtracted,
}) => {
  const pageWrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isInViewportRange, setIsInViewportRange] = useState(false);
  const [hasRendered, setHasRendered] = useState(false);
  const [pageDims, setPageDims] = useState<{ width: number; height: number } | null>(null);
  const renderedKeyRef = useRef<string>('');

  // 1. IntersectionObserver for pre-loading pages (1200px prefetch buffer)
  useEffect(() => {
    const el = pageWrapperRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          setIsInViewportRange(true);
        }
      },
      {
        root: containerRef.current,
        rootMargin: '1200px 0px 1200px 0px',
        threshold: 0,
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [containerRef]);

  // 2. IntersectionObserver for active page tracking
  useEffect(() => {
    const el = pageWrapperRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting && entry.intersectionRatio >= 0.4) {
          onBecomeVisible(pageNumber);
        }
      },
      {
        root: containerRef.current,
        threshold: [0.4, 0.7],
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [pageNumber, containerRef, onBecomeVisible]);

  // 3. Render page to canvas - 100% of the original page, NEVER CROPPED
  useEffect(() => {
    if (!isInViewportRange || !pdfDoc) return;

    const currentRenderKey = `${scale}-${rotation}-${fitMode}`;
    if (renderedKeyRef.current === currentRenderKey && hasRendered) {
      return;
    }

    let renderTask: pdfjsLib.RenderTask | null = null;
    let isCancelled = false;

    const render = async () => {
      try {
        const page = await pdfDoc.getPage(pageNumber);
        if (isCancelled) return;

        const intrinsicRotate = (page as any).rotate || 0;
        const totalRotation = (intrinsicRotate + rotation) % 360;
        const unscaledViewport = page.getViewport({ scale: 1, rotation: totalRotation });

        let effectiveScale = scale;
        if (fitMode === 'page' || fitMode === 'width') {
          if (containerRef.current) {
            const isMobileDevice = window.innerWidth < 768;
            const horizontalPadding = isMobileDevice ? 8 : 48;
            const verticalPadding = isMobileDevice ? 16 : 48;
            const containerW = Math.max(260, containerRef.current.clientWidth - horizontalPadding);
            const containerH = Math.max(300, containerRef.current.clientHeight - verticalPadding);

            if (fitMode === 'page') {
              const scaleW = containerW / unscaledViewport.width;
              const scaleH = containerH / unscaledViewport.height;
              effectiveScale = Math.max(0.35, Math.min(2.5, Math.min(scaleW, scaleH)));
            } else if (fitMode === 'width') {
              effectiveScale = Math.max(0.35, Math.min(3.0, containerW / unscaledViewport.width));
            }
          }
        }

        const viewport = page.getViewport({ scale: effectiveScale, rotation: totalRotation });
        const displayWidth = Math.floor(viewport.width);
        const displayHeight = Math.floor(viewport.height);

        setPageDims({ width: displayWidth, height: displayHeight });

        if (!canvasRef.current || isCancelled) return;
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d', { alpha: false });
        if (!context) return;

        const outputScale = Math.min(window.devicePixelRatio || 1, 2.0);
        canvas.width = Math.floor(viewport.width * outputScale);
        canvas.height = Math.floor(viewport.height * outputScale);
        canvas.style.width = `${displayWidth}px`;
        canvas.style.height = `${displayHeight}px`;
        canvas.style.aspectRatio = `${unscaledViewport.width} / ${unscaledViewport.height}`;
        canvas.style.maxWidth = fitMode === 'width' ? '100%' : 'none';

        const transform = outputScale !== 1 ? [outputScale, 0, 0, outputScale, 0, 0] : undefined;
        renderTask = page.render({
          canvasContext: context,
          viewport,
          transform,
        });

        await renderTask.promise;

        if (!isCancelled) {
          renderedKeyRef.current = currentRenderKey;
          setHasRendered(true);
        }

        if (onTextExtracted) {
          setTimeout(async () => {
            if (isCancelled) return;
            try {
              const textContent = await page.getTextContent();
              const textStr = textContent.items
                // @ts-ignore
                .map((it) => it.str)
                .join(' ')
                .replace(/\s+/g, ' ')
                .trim();
              if (!isCancelled && textStr) onTextExtracted(pageNumber, textStr);
            } catch {}
          }, 80);
        }
      } catch (err: any) {
        if (err.name !== 'RenderingCancelledException') {
          console.error(`Error rendering page ${pageNumber}:`, err);
        }
      }
    };

    render();

    return () => {
      isCancelled = true;
      if (renderTask) renderTask.cancel();
    };
  }, [isInViewportRange, pdfDoc, pageNumber, scale, rotation, fitMode]);

  // Use matching paper color so there is never a black-and-white blink
  const paperBgColor =
    readerTheme === 'dark'
      ? 'bg-slate-900'
      : readerTheme === 'sepia'
      ? 'bg-[#fbf0d9]'
      : 'bg-white';
  const paperTextColor = readerTheme === 'dark' ? 'text-slate-500' : 'text-slate-300';

  return (
    <div
      ref={pageWrapperRef}
      id={`pdf-page-${pageNumber}`}
      data-page-number={pageNumber}
      className={`w-full flex flex-col items-center justify-center relative ${
        isActive ? 'ring-2 ring-blue-500/40 rounded-xl' : ''
      }`}
    >
      <div
        className={`${paperBgColor} rounded-xl sm:rounded-2xl shadow-xl border border-slate-700/60 relative flex flex-col items-center justify-center shrink-0 ${canvasFilterStyle}`}
        style={{
          width: pageDims ? `${pageDims.width}px` : '100%',
          height: pageDims ? `${pageDims.height}px` : 'auto',
          minHeight: pageDims ? `${pageDims.height}px` : '480px',
          maxWidth: fitMode === 'width' ? '100%' : 'none',
          aspectRatio: pageDims ? `${pageDims.width} / ${pageDims.height}` : undefined,
        }}
      >
        {/* Canvas - displays 100% of original page from top to bottom, ZERO CROPPING */}
        {(isInViewportRange || hasRendered) && (
          <canvas
            ref={canvasRef}
            className={`block mx-auto transition-opacity duration-200 ${
              hasRendered ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              width: pageDims ? `${pageDims.width}px` : '100%',
              height: pageDims ? `${pageDims.height}px` : 'auto',
              maxWidth: fitMode === 'width' ? '100%' : 'none',
              aspectRatio: pageDims ? `${pageDims.width} / ${pageDims.height}` : undefined,
            }}
          />
        )}

        {/* Paper Skeleton matching the canvas background exactly (ZERO black-white flashing) */}
        {!hasRendered && (
          <div
            className={`w-full flex flex-col items-center justify-center ${paperBgColor} select-none py-32 px-4`}
            style={{ minHeight: pageDims ? `${pageDims.height}px` : '480px' }}
          >
            <div className={`flex items-center gap-2 text-xs font-mono font-bold ${paperTextColor}`}>
              <Loader2 className="w-4 h-4 animate-spin text-sky-400/80" />
              <span>Page {pageNumber}</span>
            </div>
          </div>
        )}

        {/* Crisp page watermark badge */}
        <div className="absolute bottom-2.5 right-3 px-2 py-0.5 rounded-md bg-slate-950/75 text-white font-mono text-[10px] font-black pointer-events-none backdrop-blur-xs border border-slate-800/80 shadow-xs">
          p. {pageNumber}
        </div>
      </div>
    </div>
  );
});

interface PdfCanvasViewerProps {
  pdfBlob?: Blob | null;
  pdfUrl?: string | null;
  book: Book;
  onBack: () => void;
  onUpdatePdfFile?: (newFile: File) => void;
}

export const PdfCanvasViewer: React.FC<PdfCanvasViewerProps> = ({
  pdfBlob,
  pdfUrl,
  book,
  onBack,
  onUpdatePdfFile,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const rootWrapperRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [pdfDoc, setPdfDoc] = useState<pdfjsLib.PDFDocumentProxy | null>(null);
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [scale, setScale] = useState(isMobile ? 1.0 : 1.2);
  const [rotation, setRotation] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [downloadStats, setDownloadStats] = useState<{ loadedMb: string; totalMb: string } | null>(null);
  const [isOfflineRequired, setIsOfflineRequired] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isZenMode, setIsZenMode] = useState(false);
  const [isContinuousScroll, setIsContinuousScroll] = useState(true);
  const [showCleanOverlay, setShowCleanOverlay] = useState(true);
  const hideTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isHoveringOverlayRef = useRef(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [fitMode, setFitMode] = useState<'custom' | 'width' | 'page'>(isMobile ? 'width' : 'page');
  const [readerTheme, setReaderTheme] = useState<'normal' | 'sepia' | 'dark' | 'contrast'>('normal');
  const [showZoomToast, setShowZoomToast] = useState(false);

  // Auto-hide zoom indicator toast after 1000ms so it NEVER gets stuck on screen
  useEffect(() => {
    if (showZoomToast) {
      const timer = setTimeout(() => {
        setShowZoomToast(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [showZoomToast, scale]);

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
  const [isNetworkModalOpen, setIsNetworkModalOpen] = useState(false);
  const [isExtractingQuiz, setIsExtractingQuiz] = useState(false);
  const [isQuizActive, setIsQuizActive] = useState(false);
  const [quizQuestionCount, setQuizQuestionCount] = useState<25 | 50 | 100 | 200>(25);
  const [selectedQuizTopic, setSelectedQuizTopic] = useState<string>('all');
  const [generatedQuestions, setGeneratedQuestions] = useState<any[]>([]);
  const [isVideoAdModalOpen, setIsVideoAdModalOpen] = useState(false);
  const [pendingQuizConfig, setPendingQuizConfig] = useState<{
    count: 25 | 50 | 100 | 200;
    topicId: string;
  } | null>(null);

  const isOromoBook =
    book.language === 'om' ||
    /oromo|kutaa|herrega|oromiyaa/i.test(book.title) ||
    /oromo|kutaa|herrega|oromiyaa/i.test(book.subject);

  const isAmharicBook =
    book.language === 'am' ||
    /[\u1200-\u137F]/.test(book.title);

  const lang = isOromoBook ? 'om' : isAmharicBook ? 'am' : (book.language || 'en');

  // Multi-tier resilient loader: Blob -> IndexedDB -> Stream Download with Live Progress -> Offline Screen
  const loadDocument = async (isRetry = false) => {
    let isCancelled = false;
    try {
      setIsLoading(true);
      setErrorMsg('');
      setIsOfflineRequired(false);
      setDownloadProgress(0);
      setDownloadStats(null);

      let doc: pdfjsLib.PDFDocumentProxy | null = null;
      let lastError: any = null;

      // Tier 1: Authentic offline Blob from props (> 100 KB)
      if (pdfBlob && pdfBlob.size > 100000) {
        try {
          const arrayBuffer = await pdfBlob.arrayBuffer();
          const loadingTask = pdfjsLib.getDocument({
            data: arrayBuffer,
            isEvalSupported: false,
          });
          doc = await loadingTask.promise;
        } catch (err) {
          console.warn('Loading from pdfBlob failed, trying IndexedDB cache...', err);
          lastError = err;
        }
      }

      // Tier 2: Check device offline cache in IndexedDB (Immediate 0ms load if previously downloaded)
      if (!doc) {
        try {
          const cached = await DbService.getPdfFile(book.id);
          if (cached && cached.blob) {
            if (cached.blob.size > 100000) {
              const arrayBuffer = await cached.blob.arrayBuffer();
              const loadingTask = pdfjsLib.getDocument({
                data: arrayBuffer,
                isEvalSupported: false,
              });
              doc = await loadingTask.promise;
            } else {
              // Stale dummy sample detected; purge it so it doesn't block authentic PDF
              try {
                await DbService.deletePdfFile(book.id);
              } catch {}
            }
          }
        } catch (err) {
          console.warn('DbService cache read failed:', err);
          lastError = err;
        }
      }

      // If document was found in local storage / blob, finish immediately!
      if (doc) {
        if (!isCancelled) {
          setPdfDoc(doc);
          setTotalPages(doc.numPages);
          setCurrentPage(1);
          setIsLoading(false);
          setErrorMsg('');
        }
        return;
      }

      // Tier 3: Book is NOT downloaded yet. Check connectivity.
      const isOnline = typeof navigator !== 'undefined' ? navigator.onLine : true;
      if (!isOnline) {
        if (!isCancelled) {
          setIsOfflineRequired(true);
          setIsLoading(false);
        }
        return;
      }

      // Safe URL helper avoiding double-encoding (%20 -> %2520)
      const getSafeUrl = (rawUrl: string) => {
        try {
          return encodeURI(decodeURI(rawUrl));
        } catch {
          return encodeURI(rawUrl);
        }
      };

      // Helper to stream chunks and track download progress with percentages (1, 2, 3, 5, 10, 25, 50, 75, 95, 100%)
      const streamDownloadPdf = async (url: string): Promise<Uint8Array | null> => {
        try {
          const resp = await fetch(url);
          if (!resp.ok) return null;
          const contentType = resp.headers.get('content-type') || '';
          if (contentType.includes('text/html')) return null;

          const contentLength = resp.headers.get('content-length');
          const totalBytes = contentLength ? parseInt(contentLength, 10) : 0;
          const totalMb = totalBytes > 0
            ? (totalBytes / (1024 * 1024)).toFixed(1)
            : (book.fileSizeMb ? String(book.fileSizeMb) : '18.5');

          if (!isCancelled) {
            setDownloadProgress(1);
            setDownloadStats({ loadedMb: '0.1', totalMb });
          }

          if (!resp.body) {
            const buf = await resp.arrayBuffer();
            if (buf.byteLength > 100000) {
              if (!isCancelled) {
                setDownloadProgress(100);
                setDownloadStats({ loadedMb: (buf.byteLength / (1024 * 1024)).toFixed(1), totalMb });
              }
              return new Uint8Array(buf);
            }
            return null;
          }

          const reader = resp.body.getReader();
          const chunks: Uint8Array[] = [];
          let loadedBytes = 0;
          let lastReportedPct = 1;

          while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            if (value) {
              chunks.push(value);
              loadedBytes += value.length;
              const loadedMb = (loadedBytes / (1024 * 1024)).toFixed(1);

              let pct: number;
              if (totalBytes > 0) {
                pct = Math.min(99, Math.max(1, Math.round((loadedBytes / totalBytes) * 100)));
              } else {
                // Adaptive estimator based on textbook size
                const estBytes = (book.fileSizeMb || 18) * 1024 * 1024;
                pct = Math.min(98, Math.max(1, Math.round((loadedBytes / estBytes) * 100)));
              }

              if (pct !== lastReportedPct && !isCancelled) {
                lastReportedPct = pct;
                setDownloadProgress(pct);
                setDownloadStats({ loadedMb, totalMb });
              }
            }
          }

          const allBytes = new Uint8Array(loadedBytes);
          let offset = 0;
          for (const chunk of chunks) {
            allBytes.set(chunk, offset);
            offset += chunk.length;
          }

          if (allBytes.byteLength > 100000) {
            if (!isCancelled) {
              setDownloadProgress(100);
              setDownloadStats({ loadedMb: (allBytes.byteLength / (1024 * 1024)).toFixed(1), totalMb });
            }
            return allBytes;
          }
          return null;
        } catch (err) {
          console.warn('streamDownloadPdf failed:', url, err);
          return null;
        }
      };

      // Candidate URLs for authentic textbook
      const candidateUrls: string[] = [];
      const targetUrl = pdfUrl || book.pdfUrl;
      if (targetUrl) candidateUrls.push(getSafeUrl(targetUrl));
      if (book.cdnPdfUrl && !candidateUrls.includes(book.cdnPdfUrl)) candidateUrls.push(book.cdnPdfUrl);
      const githubUrl = `${DEFAULT_CLOUD_CONFIG.githubReleaseBaseUrl}/${book.id}.pdf`;
      if (!candidateUrls.includes(githubUrl)) candidateUrls.push(githubUrl);

      // Attempt stream downloading
      let downloadedBytes: Uint8Array | null = null;
      for (const url of candidateUrls) {
        if (isCancelled) break;
        downloadedBytes = await streamDownloadPdf(url);
        if (downloadedBytes) break;
      }

      if (downloadedBytes && !isCancelled) {
        // Cache immediately in IndexedDB for permanent offline reading
        try {
          const blob = new Blob([downloadedBytes as unknown as BlobPart], { type: 'application/pdf' });
          await DbService.savePdfFile(book.id, blob, `${book.title}.pdf`);
          StorageService.markBookOffline(book.id);
        } catch (saveErr) {
          console.warn('Failed to cache downloaded PDF:', saveErr);
        }

        // Render PDF
        const loadingTask = pdfjsLib.getDocument({
          data: downloadedBytes as any,
          isEvalSupported: false,
        });
        doc = await loadingTask.promise;
      }

      // If document was not loaded (failed download, network loss, etc.)
      if (!doc && !isCancelled) {
        const stillOnline = typeof navigator !== 'undefined' ? navigator.onLine : false;
        if (!stillOnline) {
          setIsOfflineRequired(true);
          setIsLoading(false);
          return;
        }
        setErrorMsg('Unable to download authentic textbook. Please check your internet connection and try again.');
        setIsLoading(false);
        return;
      }

      if (doc && !isCancelled) {
        setPdfDoc(doc);
        setTotalPages(doc.numPages);
        setCurrentPage(1);
        setIsLoading(false);
        setErrorMsg('');
      }
    } catch (err: any) {
      console.error('Error loading PDF:', err);
      if (!isCancelled) {
        const stillOnline = typeof navigator !== 'undefined' ? navigator.onLine : false;
        if (!stillOnline) {
          setIsOfflineRequired(true);
        } else {
          setErrorMsg('Failed to load PDF document.');
        }
        setIsLoading(false);
      }
    }

    return () => {
      isCancelled = true;
    };
  };

  useEffect(() => {
    loadDocument();
    return () => {
      TTSService.stop();
    };
  }, [pdfBlob, pdfUrl, book.pdfUrl]);

  // Load notes for current page
  useEffect(() => {
    setNotes(StorageService.getNotes(book.id, currentPage));
  }, [book.id, currentPage]);

  // Handle hardware / back button inside Reader: Close inner modals step-by-step
  useEffect(() => {
    const handleReaderBack = (e: any) => {
      if (isQuizConfigOpen) {
        setIsQuizConfigOpen(false);
        e.detail?.setHandled();
        return;
      }
      if (isQuizActive) {
        setIsQuizActive(false);
        e.detail?.setHandled();
        return;
      }
      if (isVideoAdModalOpen) {
        setIsVideoAdModalOpen(false);
        e.detail?.setHandled();
        return;
      }
      if (isNetworkModalOpen) {
        setIsNetworkModalOpen(false);
        e.detail?.setHandled();
        return;
      }
      if (isSidebarOpen) {
        setIsSidebarOpen(false);
        e.detail?.setHandled();
        return;
      }
      if (isNotesOpen) {
        setIsNotesOpen(false);
        e.detail?.setHandled();
        return;
      }
      if (isSearchOpen) {
        setIsSearchOpen(false);
        e.detail?.setHandled();
        return;
      }
    };

    window.addEventListener('reader-back-requested', handleReaderBack);
    return () => {
      window.removeEventListener('reader-back-requested', handleReaderBack);
    };
  }, [
    isQuizConfigOpen,
    isQuizActive,
    isVideoAdModalOpen,
    isNetworkModalOpen,
    isSidebarOpen,
    isNotesOpen,
    isSearchOpen,
  ]);

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
      if (isPinching) {
        if (e.touches.length < 2) {
          isPinching = false;
          touchStartDist = 0;
          setTimeout(() => setShowZoomToast(false), 500);
        }
      } else if (e.changedTouches.length === 1) {
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

    const handleTouchCancel = () => {
      isPinching = false;
      touchStartDist = 0;
      setTimeout(() => setShowZoomToast(false), 300);
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
    container.addEventListener('touchcancel', handleTouchCancel, { passive: true });
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
      container.removeEventListener('touchcancel', handleTouchCancel);
      container.removeEventListener('mousedown', handleMouseDown);
      container.removeEventListener('mouseup', handleMouseUp);
      container.removeEventListener('wheel', handleWheel);
    };
  }, [scale, totalPages]);

  // Render Current Page on Canvas & Extract Page Text for Audio Read Aloud (Single Page Mode)
  useEffect(() => {
    if (!pdfDoc || !canvasRef.current || isContinuousScroll) return;

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

        // Optimized DPI capping: keeps text pin-sharp while saving memory
        const outputScale = Math.min(window.devicePixelRatio || 1, 2.0);
        canvas.width = Math.floor(viewport.width * outputScale);
        canvas.height = Math.floor(viewport.height * outputScale);
        canvas.style.width = `${Math.floor(viewport.width)}px`;
        canvas.style.height = `${Math.floor(viewport.height)}px`;
        canvas.style.aspectRatio = `${viewport.width} / ${viewport.height}`;
        canvas.style.maxWidth = fitMode === 'width' ? '100%' : 'none';

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
  }, [pdfDoc, currentPage, scale, rotation, fitMode, isContinuousScroll]);

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

  // Check network before opening quiz options or starting quiz
  const handleOpenQuizConfig = async () => {
    const isOnline = await NetworkService.checkInternetConnection();
    if (!isOnline) {
      setIsNetworkModalOpen(true);
      return;
    }
    setIsQuizConfigOpen(true);
  };

  // Launch Dynamic 25-200 Question Quiz directly from PDF: Requires internet first, then rewarded video view
  const handleStartDynamicQuiz = async (count: 25 | 50 | 100 | 200, topicId: string = selectedQuizTopic) => {
    // 1. First ask internet connection
    const isOnline = await NetworkService.checkInternetConnection();
    if (!isOnline) {
      setIsQuizConfigOpen(false);
      setIsNetworkModalOpen(true);
      return;
    }

    // 2. Queue rewarded video ad view: student must view video to access questions
    setPendingQuizConfig({ count, topicId });
    setIsQuizConfigOpen(false);
    setIsVideoAdModalOpen(true);
  };

  const handleRewardEarnedForQuiz = async () => {
    if (!pendingQuizConfig) return;
    const { count, topicId } = pendingQuizConfig;
    try {
      setIsExtractingQuiz(true);
      const qs = await QuizGeneratorService.extractBookExercisesFromPdf(pdfDoc, book, count, topicId);
      setGeneratedQuestions(qs);
      setQuizQuestionCount(count);
      setIsExtractingQuiz(false);
      setIsQuizActive(true);
    } catch (err) {
      console.error(err);
      setIsExtractingQuiz(false);
    } finally {
      setPendingQuizConfig(null);
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

  const scrollToPage = (targetPage: number) => {
    const validPage = Math.max(1, Math.min(totalPages, targetPage));
    setCurrentPage(validPage);
    if (isContinuousScroll) {
      const pageEl = document.getElementById(`pdf-page-${validPage}`);
      if (pageEl) {
        pageEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } else {
      containerRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handlePrevPage = () => {
    if (isContinuousScroll) {
      const prevP = Math.max(1, currentPage - 1);
      scrollToPage(prevP);
    } else {
      setCurrentPage((p) => Math.max(1, p - 1));
      containerRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleNextPage = () => {
    if (isContinuousScroll) {
      const nextP = Math.min(totalPages, currentPage + 1);
      scrollToPage(nextP);
    } else {
      setCurrentPage((p) => Math.min(totalPages, p + 1));
      containerRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleZoomIn = () => {
    setFitMode('custom');
    setScale((s) => Math.min(3.0, s + 0.15));
  };

  const handleZoomOut = () => {
    setFitMode('custom');
    setScale((s) => Math.max(0.5, s - 0.15));
  };

  const [showSavedToast, setShowSavedToast] = useState(false);

  const handleDownload = async () => {
    try {
      if (pdfBlob) {
        await DbService.savePdfFile(book.id, pdfBlob, `${book.title}.pdf`);
      } else {
        await CloudStorageService.downloadAndSaveBookToDevice(book);
      }
      StorageService.markBookOffline(book.id);
      setShowSavedToast(true);
      setTimeout(() => setShowSavedToast(false), 2500);
    } catch (err) {
      console.error('Failed to save to private in-app storage:', err);
    }
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
      quizBtn: 'Qormaata (Gaaffii 25-200)',
      modalTitle: 'Qormaata Shaakalaa Kitaaba Irraa',
      modalSubtitle: `Baay'ina gaaffilee ${book.title} keessaa barbaaddu filadhu:`,
      q25: 'Gaaffilee 25 (Shaakala Salphaa)',
      q25desc: 'Gaaffilee gilgaalaa fi yaad-rimee (~25 daqiiqaa)',
      q50: 'Gaaffilee 50 (Qormaata Waliigalaa)',
      q50desc: 'Qormaata boqonnaalee hunda hammatu (~50 daqiiqaa)',
      q100: 'Gaaffilee 100 (Qormaata Biyyooleessaa Guutuu)',
      q100desc: 'Qormaata qajeeltoo Ministeera Barnootaa (~100 daqiiqaa)',
      q200: 'Gaaffilee 200 (Qormaata Dorgommii Ol-aanaa)',
      q200desc: 'Qormaata dorgommii yuunivarsitii maraa (~200 daqiiqaa)',
      cancel: 'Dhiisi',
      quizModalTitle: `Kutaa ${book.grade} ${book.title} • Shaakala Qormaataa (${quizQuestionCount} Gaaffilee)`,
    },
    am: {
      quizBtn: 'ፈተና (25-200 ጥያቄዎች)',
      modalTitle: 'ከመጽሐፉ የተዘጋጀ የልምምድ ፈተና',
      modalSubtitle: `ከ ${book.title} መጽሐፍ የሚወጡትን የጥያቄዎች ብዛት ይምረጡ:`,
      q25: '25 ጥያቄዎች (ቀላል ልምምድ)',
      q25desc: 'የምዕራፍ መልመጃዎች እና ጽንሰ-ሀሳቦች (~25 ደቂቃ)',
      q50: '50 ጥያቄዎች (መደበኛ ፈተና)',
      q50desc: 'ሁሉንም ምዕራፎች ያካተተ ፈተና (~50 ደቂቃ)',
      q100: '100 ጥያቄዎች (ሙሉ የፈተና ሞዴል)',
      q100desc: 'የትምህርት ሚኒስቴር ሙሉ ፈተና ስታንዳርድ (~100 ደቂቃ)',
      q200: '200 ጥያቄዎች (የጥልቀት ፈተና ማራቶን)',
      q200desc: 'ለከፍተኛ ውጤት የሚያበቃ አጠቃላይ የጥያቄዎች ማራቶን (~200 ደቂቃ)',
      cancel: 'ይቅር',
      quizModalTitle: `${book.grade}ኛ ክፍል ${book.title} • የልምምድ ፈተና (${quizQuestionCount} ጥያቄዎች)`,
    },
    en: {
      quizBtn: 'Quiz (25-200 Qs)',
      modalTitle: 'Generate In-Book Practice Quiz',
      modalSubtitle: `Select the number of questions to extract directly from ${book.title}:`,
      q25: '25 Questions (Quick Review)',
      q25desc: 'Chapter exercises & core concepts (~25 mins)',
      q50: '50 Questions (Standard Mock)',
      q50desc: 'Official standard curriculum exam (~50 mins)',
      q100: '100 Questions (Full Mock Exam)',
      q100desc: 'Comprehensive multi-unit marathon (~100 mins)',
      q200: '200 Questions (Mastery Challenge)',
      q200desc: 'Exhaustive question bank drill for top scores (~200 mins)',
      cancel: 'Cancel',
      quizModalTitle: `Grade ${book.grade} ${book.title} • In-Book Quiz (${quizQuestionCount} Questions)`,
    },
  }[lang === 'om' ? 'om' : lang === 'am' ? 'am' : 'en'];

  const handleFileImport = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && onUpdatePdfFile) {
      onUpdatePdfFile(file);
    }
  };

  // 1. Internet Connection Required Screen (Never shows dummy mock syllabus - Photo 2)
  if (isOfflineRequired) {
    return (
      <div className="fixed inset-0 h-screen h-[100dvh] w-screen overflow-y-auto bg-slate-950 text-slate-100 flex flex-col z-50">
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileImport}
          accept="application/pdf"
          className="hidden"
        />

        {/* Top Single Header */}
        <div className="sticky top-0 z-40 bg-slate-900 border-b border-slate-800 px-4 py-3 flex items-center justify-between shadow-xl">
          <button
            onClick={onBack}
            className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white transition-colors flex items-center gap-1.5 text-xs font-bold border border-slate-700 shadow-sm"
          >
            <ArrowLeft className="w-4 h-4 text-sky-400" />
            <span>Return to Library</span>
          </button>
          <div className="text-right">
            <div className="text-xs sm:text-sm font-black text-white truncate max-w-xs sm:max-w-md">
              {book.title}
            </div>
            <div className="text-[10px] text-slate-400">
              Grade {book.grade} • {book.subject}
            </div>
          </div>
        </div>

        {/* Main Internet Required Screen */}
        <div className="flex-1 w-full flex items-center justify-center p-4 sm:p-8">
          <div className="w-full max-w-md bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-8 text-center space-y-6 shadow-2xl shadow-slate-950/80">
            {/* Animated Offline Icon */}
            <div className="relative mx-auto w-20 h-20">
              <div className="w-20 h-20 rounded-3xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 shadow-xl shadow-amber-950/40">
                <WifiOff className="w-10 h-10" />
              </div>
              <span className="absolute -top-1 -right-1 flex h-4 w-4">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-4 w-4 bg-amber-500"></span>
              </span>
            </div>

            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-[11px] font-bold text-amber-300">
                <ShieldAlert className="w-3.5 h-3.5" />
                <span>Offline • Initial Download Required</span>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
                Internet Connection Required
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm mx-auto">
                <strong className="text-slate-200">{book.title} (Grade {book.grade})</strong> has not been downloaded to your device yet. Please connect to Wi-Fi or mobile data once to download and store it for permanent offline reading.
              </p>
            </div>

            {/* Student Guarantee Banner */}
            <div className="p-3.5 rounded-2xl bg-slate-800/80 border border-slate-700/60 text-[11px] sm:text-xs text-slate-300 text-left flex items-start gap-2.5">
              <BookOpen className="w-4 h-4 flex-shrink-0 mt-0.5 text-sky-400" />
              <div className="leading-relaxed">
                <strong className="text-white">One-Time Download Guarantee:</strong> You only need an internet connection <span className="text-sky-300 font-semibold">ONCE</span> to download this book. After that, it remains on your device forever with zero mobile data!
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 pt-2">
              <button
                onClick={() => loadDocument(true)}
                className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white font-extrabold text-xs sm:text-sm shadow-lg shadow-sky-500/25 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Connect to Internet & Retry</span>
              </button>

              <button
                onClick={onBack}
                className="w-full py-3 px-4 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white font-bold text-xs transition-all flex items-center justify-center gap-2 border border-slate-700"
              >
                <BookOpen className="w-4 h-4 text-emerald-400" />
                <span>Browse Saved Offline Books</span>
              </button>

              {onUpdatePdfFile && (
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full py-2.5 px-4 bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 text-slate-300 rounded-xl text-xs font-semibold transition-all flex items-center justify-center gap-2"
                >
                  <UploadCloud className="w-4 h-4 text-sky-400" />
                  <span>Import PDF from Device Storage</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 2. Dynamic Download Progress Loading Screen (Photo 1)
  if (isLoading) {
    return (
      <div className="py-20 sm:py-32 px-4 flex flex-col items-center justify-center space-y-5 bg-slate-950 text-white min-h-screen">
        {/* Animated Glowing Spinner Icon */}
        <div className="relative">
          <div className="w-16 h-16 rounded-3xl bg-sky-500/10 border border-sky-500/30 flex items-center justify-center text-sky-400 shadow-xl shadow-sky-950/40">
            <Loader2 className="w-8 h-8 animate-spin text-sky-400" />
          </div>
          <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-sky-500"></span>
          </span>
        </div>

        <div className="text-center space-y-1.5 max-w-sm">
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-slate-900 border border-slate-800 text-[11px] font-bold text-slate-400">
            <span>Grade {book.grade} • {book.subject}</span>
          </div>
          <div className="text-base sm:text-lg font-black text-white truncate max-w-xs sm:max-w-sm mx-auto">
            {downloadProgress > 0 && downloadProgress < 100
              ? 'Downloading Official Textbook...'
              : 'Opening Authentic Textbook Canvas...'}
          </div>
          <div className="text-xs text-slate-400">
            {downloadProgress > 0 && downloadProgress < 100
              ? 'Fast-downloading original edition & caching for offline study'
              : 'Preparing pixel-perfect pages with all math equations and figures'}
          </div>
        </div>

        {/* Real-time Dynamic Download Progress Bar (Photo 1) */}
        <div className="w-full max-w-sm px-4 pt-2 space-y-3 animate-fadeIn">
          {/* Progress Header */}
          <div className="flex items-center justify-between text-xs font-bold">
            <div className="flex items-center gap-2 text-sky-400">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500"></span>
              </span>
              <span>
                {downloadProgress >= 100
                  ? 'Finalizing Pages...'
                  : downloadProgress > 0
                  ? `Downloading ${downloadProgress}%`
                  : 'Preparing Connection...'}
              </span>
            </div>
            <div className="text-slate-400 font-mono text-[11px]">
              {downloadStats ? `${downloadStats.loadedMb} MB / ${downloadStats.totalMb} MB` : `${downloadProgress}%`}
            </div>
          </div>

          {/* Progress Track & Fill */}
          <div className="h-3 w-full bg-slate-900 rounded-full overflow-hidden p-0.5 border border-slate-800 shadow-inner">
            <div
              className="h-full rounded-full transition-all duration-200 ease-out bg-gradient-to-r from-sky-500 via-indigo-500 to-emerald-400 shadow-[0_0_12px_rgba(56,189,248,0.5)]"
              style={{ width: `${Math.max(4, downloadProgress)}%` }}
            />
          </div>

          {/* Stepped Milestones (1, 10, 25, 50, 75, 95, 100%) */}
          <div className="flex justify-between items-center text-[10px] font-mono px-0.5">
            {[1, 10, 25, 50, 75, 95, 100].map((step) => (
              <span
                key={step}
                className={`transition-colors duration-200 ${
                  downloadProgress >= step ? 'text-sky-400 font-bold' : 'text-slate-600'
                }`}
              >
                {step}%
              </span>
            ))}
          </div>

          {/* Low-data student optimization note */}
          <div className="p-3 rounded-2xl bg-gradient-to-r from-slate-900/95 via-slate-900/90 to-slate-900/95 border border-slate-800/90 text-[11px] text-slate-400 flex items-center gap-3 text-left leading-relaxed shadow-lg">
            <div className="w-8 h-8 rounded-xl bg-amber-500/10 border border-amber-500/25 flex items-center justify-center shrink-0 shadow-inner">
              <FastDownloadIcon className="w-4 h-4 text-sky-400" />
            </div>
            <div>
              <span className="text-slate-200 font-bold block text-xs">Fast Low-Data Download</span>
              <span>Downloading once saves this textbook to your device for unlimited 100% offline study.</span>
            </div>
          </div>
        </div>

        {/* Return Button */}
        <button
          onClick={onBack}
          className="mt-2 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-xs font-semibold text-slate-400 hover:text-white transition-all flex items-center gap-1.5"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Return to Library</span>
        </button>
      </div>
    );
  }

  // 3. Error Screen
  if (errorMsg) {
    return (
      <div className="p-6 sm:p-12 text-center max-w-md mx-auto space-y-5 bg-slate-950 text-white min-h-screen flex flex-col items-center justify-center">
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileImport}
          accept="application/pdf"
          className="hidden"
        />

        <div className="w-16 h-16 rounded-2xl bg-rose-500/15 border border-rose-500/30 text-rose-400 flex items-center justify-center mx-auto shadow-lg shadow-rose-950/40">
          <AlertCircle className="w-8 h-8" />
        </div>

        <div className="space-y-1.5">
          <h4 className="text-base sm:text-lg font-black text-white">{book.title}</h4>
          <p className="text-xs text-slate-400">
            Grade {book.grade} • {(book.language || 'English').toUpperCase()}
          </p>
          <div className="inline-block px-3 py-1 rounded-lg bg-rose-500/10 text-rose-300 text-xs font-medium border border-rose-500/20 mt-2">
            {errorMsg}
          </div>
        </div>

        <div className="w-full space-y-2.5 pt-2">
          {onUpdatePdfFile && (
            <button
              onClick={() => fileInputRef.current?.click()}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 rounded-xl text-xs font-bold transition-all"
            >
              <UploadCloud className="w-4 h-4 text-sky-400" />
              <span>Import PDF from Device Storage</span>
            </button>
          )}

          <div className="flex gap-2">
            <button
              onClick={() => loadDocument(true)}
              className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-500 hover:to-indigo-500 text-white rounded-xl text-xs font-bold transition-all shadow-md"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Retry</span>
            </button>
            <button
              onClick={onBack}
              className="flex-1 py-2.5 px-3 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-xl text-xs font-semibold text-slate-300 hover:text-white transition-all"
            >
              Return to Library
            </button>
          </div>
        </div>
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
      className={`fixed inset-0 h-screen h-[100dvh] w-screen w-[100dvw] overflow-hidden flex flex-col items-stretch select-none bg-slate-950 text-slate-100 z-50 overscroll-none ${
        isFullscreen ? 'p-1 sm:p-2' : ''
      }`}
    >
      {/* 🔍 Realtime Touch Pinch Zoom Feedback Badge */}
      {showZoomToast && (
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 pointer-events-none bg-slate-900/95 backdrop-blur-md border border-blue-500/60 text-white px-5 py-2.5 rounded-2xl shadow-2xl font-mono text-sm font-black flex items-center gap-2 animate-in zoom-in-90 duration-150">
          <ZoomIn className="w-4 h-4 text-sky-400" />
          <span>Zoom: {Math.round(scale * 100)}%</span>
        </div>
      )}

      {/* 💾 In-App Offline Storage Feedback Toast */}
      {showSavedToast && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 pointer-events-none bg-blue-950/95 backdrop-blur-md border border-blue-500/80 text-white px-5 py-2.5 rounded-2xl shadow-2xl text-xs font-black flex items-center gap-2 animate-in fade-in duration-150">
          <Check className="w-4 h-4 text-sky-400" />
          <span>Saved to Private In-App Storage (Offline Ready)</span>
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
              className="flex items-center gap-1.5 text-xs font-bold text-sky-400 hover:text-sky-300"
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
              <Edit3 className="w-3.5 h-3.5 text-sky-400" />
              <span>Notes</span>
              {notes.length > 0 && (
                <span className="px-1.5 py-0.2 bg-blue-600 text-white rounded-full text-[10px]">
                  {notes.length}
                </span>
              )}
            </button>
            <div className="h-3.5 w-px bg-slate-700" />
            <button
              onClick={() => setRotation((r) => (r + 90) % 360)}
              className="flex items-center gap-1.5 text-xs text-slate-300 hover:text-sky-400 font-bold transition-colors"
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
        <div
          style={{ paddingTop: 'calc(env(safe-area-inset-top, 0px) + 12px)' }}
          className="md:hidden sticky top-0 z-40 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 px-3 pb-2 flex items-center justify-between gap-2 shadow-xl w-full"
        >
          <div className="flex items-center gap-2 min-w-0">
            <button
              onClick={onBack}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white transition-colors flex items-center gap-1 text-xs font-bold border border-slate-700 shadow-sm active:scale-95 shrink-0"
            >
              <ArrowLeft className="w-4 h-4 text-sky-400" />
              <span className="text-[11px]">Library</span>
            </button>

            <div className="min-w-0 max-w-[125px] xs:max-w-[165px]">
              <div className="text-xs font-black text-white truncate">
                {book.title}
              </div>
              <div className="text-[10px] text-slate-400 flex items-center gap-1.5 truncate">
                <span className="text-sky-400 font-bold">Grade {book.grade}</span>
                <span>•</span>
                <span className="capitalize">{book.subject}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            {/* Top-to-Down Continuous Scroll Toggle */}
            <button
              onClick={() => setIsContinuousScroll(!isContinuousScroll)}
              className={`flex items-center gap-1 px-2.5 py-1.5 rounded-xl border text-xs font-black shadow-sm active:scale-95 transition-all ${
                isContinuousScroll
                  ? 'bg-blue-500/20 text-sky-400 border-blue-500/40'
                  : 'bg-slate-950 text-slate-400 border-slate-800'
              }`}
              title={isContinuousScroll ? 'Continuous Scroll Active (Tap for Page-by-Page)' : 'Page Mode Active (Tap for Top-to-Down Scroll)'}
            >
              <MoveVertical className="w-3.5 h-3.5" />
              <span className="text-[11px]">{isContinuousScroll ? 'Scroll' : 'Page'}</span>
            </button>

            {/* Dedicated prominent Clean View button */}
            <button
              onClick={() => setIsZenMode(true)}
              className="flex items-center gap-1 px-2.5 py-1.5 bg-blue-500/15 hover:bg-blue-500/25 text-sky-400 hover:text-sky-300 rounded-xl border border-blue-500/40 text-xs font-black shadow-sm active:scale-95 transition-all"
              title="Clean View (Hide all controls for full-screen reading)"
            >
              <Eye className="w-3.5 h-3.5" />
              <span className="text-[11px]">Clean</span>
            </button>

            {/* Sidebar / Jump drawer */}
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className={`p-2 rounded-xl border transition-all active:scale-95 cursor-pointer ${
                isSidebarOpen
                  ? 'btn-luxury-active'
                  : 'bg-slate-950 text-slate-300 border-slate-800'
              }`}
              title="Chapters & Page Jump"
            >
              <Sidebar className="w-4 h-4" />
            </button>

            {/* Search */}
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className={`p-2 rounded-xl border transition-colors active:scale-95 cursor-pointer ${
                isSearchOpen
                  ? 'btn-luxury-active'
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
                <ArrowLeft className="w-4 h-4 text-sky-400" />
                <span>Library</span>
              </button>

              <div>
                <div className="text-xs sm:text-sm font-black text-white truncate max-w-[200px] lg:max-w-md">
                  {book.title}
                </div>
                <div className="text-[10px] text-slate-400 flex items-center gap-2">
                  <span>Grade {book.grade} • {book.subject}</span>
                  <span className="text-sky-400 font-bold bg-blue-950/80 px-2 py-0.2 rounded border border-blue-800">
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
              className={`p-2 rounded-xl border transition-all cursor-pointer ${
                isSidebarOpen
                  ? 'btn-luxury-active'
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
                  className="w-12 text-center bg-slate-900 border border-slate-700 rounded px-1 text-sky-400 font-bold text-xs focus:ring-1 focus:ring-blue-400"
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
                className={`px-2.5 py-1 rounded-lg font-bold transition-all flex items-center gap-1 cursor-pointer ${
                  fitMode === 'page'
                    ? 'btn-luxury-active'
                    : 'text-slate-400 hover:text-white'
                }`}
                title="Fit Full Page in Viewport"
              >
                <MoveVertical className="w-3.5 h-3.5" />
                <span>Full Page</span>
              </button>

              <button
                onClick={() => setFitMode('width')}
                className={`px-2.5 py-1 rounded-lg font-bold transition-all flex items-center gap-1 cursor-pointer ${
                  fitMode === 'width'
                    ? 'btn-luxury-active'
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
                    : 'bg-blue-500/20 text-sky-300 hover:bg-blue-500/30 border border-blue-500/40'
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
              <Edit3 className="w-3.5 h-3.5 text-sky-400" />
              <span className="hidden lg:inline">Notes</span>
              {notes.length > 0 && (
                <span className="px-1.5 py-0.2 bg-blue-600 text-white rounded-full text-[10px]">
                  {notes.length}
                </span>
              )}
            </button>

            {/* 25-50 Question Quiz Generator Button */}
            {!isFullscreen && (
              <button
                onClick={handleOpenQuizConfig}
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
              className="flex items-center gap-1 px-2.5 py-1.5 bg-blue-500/10 hover:bg-blue-500/20 text-sky-400 hover:text-sky-300 rounded-xl border border-blue-500/30 text-xs font-bold transition-colors"
              title="Hide All Bars for 100% Clean View (Press H)"
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Clean View</span>
            </button>

            {/* Search Toggle */}
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className={`p-2 rounded-xl border text-xs transition-colors cursor-pointer ${
                isSearchOpen
                  ? 'btn-luxury-active'
                  : 'bg-slate-950 text-slate-400 hover:text-white border-slate-800'
              }`}
              title="Search Text in Book"
            >
              <Search className="w-3.5 h-3.5" />
            </button>

            {/* Top-to-Down Continuous Scroll Toggle */}
            <button
              onClick={() => setIsContinuousScroll(!isContinuousScroll)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-bold transition-all active:scale-95 ${
                isContinuousScroll
                  ? 'bg-blue-500/20 text-sky-400 border-blue-500/40'
                  : 'bg-slate-950 text-slate-300 border-slate-800 hover:text-white'
              }`}
              title={isContinuousScroll ? 'Continuous Top-to-Down Scroll (Click for Single Page)' : 'Single Page View (Click for Continuous Top-to-Down Scroll)'}
            >
              <MoveVertical className="w-3.5 h-3.5" />
              <span>{isContinuousScroll ? 'Top-Down Scroll' : 'Single Page'}</span>
            </button>

            {/* Theme / Eye-care filters */}
            <select
              value={readerTheme}
              onChange={(e) => setReaderTheme(e.target.value as any)}
              className="px-2.5 py-1.5 bg-slate-950 border border-slate-800 rounded-xl text-xs font-bold text-slate-300 focus:outline-none"
              title="Page Display Tone"
            >
              <option value="normal">Clean White</option>
              <option value="sepia">Sepia Eye-Care</option>
              <option value="dark">Dark Inverted</option>
              <option value="contrast">High Contrast</option>
            </select>

            {/* Zoom controls */}
            <div className="flex items-center gap-1 bg-slate-950 px-2 py-1 rounded-xl border border-slate-800 text-xs">
              <button onClick={handleZoomOut} className="p-1 text-slate-400 hover:text-sky-400">
                <ZoomOut className="w-3.5 h-3.5" />
              </button>
              <span className="font-mono text-[11px] px-1 font-bold text-slate-300">
                {Math.round(scale * 100)}%
              </span>
              <button onClick={handleZoomIn} className="p-1 text-slate-400 hover:text-sky-400">
                <ZoomIn className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Rotate Page Button */}
            <button
              onClick={() => setRotation((r) => (r + 90) % 360)}
              className="p-2 bg-slate-950 hover:bg-slate-800 text-slate-300 hover:text-sky-400 rounded-xl border border-slate-800 shadow-sm active:scale-95 transition-colors"
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
              className="p-2 btn-luxury-action luxury-pressable text-white rounded-xl shadow-md cursor-pointer"
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
            className="flex-1 bg-slate-950 border border-slate-700 rounded-xl px-3 py-1.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500"
          />
          <button
            onClick={handleSearch}
            disabled={isSearching}
            className="px-4 py-1.5 btn-luxury-action luxury-pressable text-white text-xs font-bold rounded-xl flex items-center gap-1 cursor-pointer"
          >
            {isSearching ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <span>Search</span>}
          </button>

          {searchResults.length > 0 && (
            <div className="text-xs font-bold text-sky-400 flex items-center gap-2">
              <span>Found in {searchResults.length} pages:</span>
              <div className="flex gap-1 overflow-x-auto max-w-xs">
                {searchResults.slice(0, 8).map((pNum) => (
                  <button
                    key={pNum}
                    onClick={() => scrollToPage(pNum)}
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
      <div className="flex-1 min-h-0 w-full flex overflow-hidden relative">
        {/* Page Thumbnails / Jump Drawer */}
        {isSidebarOpen && (
          <div className="w-48 sm:w-56 h-full bg-slate-900/95 border-r border-slate-800 overflow-y-auto overscroll-contain p-3 space-y-2 shrink-0 animate-in slide-in-from-left duration-200 z-20">
            <div className="text-xs font-black text-slate-400 uppercase tracking-wider px-1 pb-1 border-b border-slate-800 flex justify-between items-center">
              <span>All Pages ({totalPages})</span>
              <button onClick={() => setIsSidebarOpen(false)} className="text-slate-500 hover:text-white p-1">
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                <button
                  key={pageNum}
                  onClick={() => {
                    scrollToPage(pageNum);
                  }}
                  className={`p-2 rounded-xl text-xs font-bold text-center border transition-all cursor-pointer ${
                    currentPage === pageNum
                      ? 'btn-luxury-active scale-105'
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
          className={`flex-1 min-h-0 h-full w-full flex justify-center items-start overflow-y-auto ${
            scale > 1.05 || fitMode === 'custom' ? 'overflow-x-auto touch-pan-x touch-pan-y' : 'overflow-x-hidden'
          } p-1 sm:p-4 md:p-6 relative cursor-default overscroll-contain ${
            isZenMode ? 'pb-16' : 'pb-36 md:pb-8'
          }`}
          style={!isZenMode ? { paddingBottom: 'calc(135px + max(env(safe-area-inset-bottom, 0px), 16px))' } : undefined}
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

          {isContinuousScroll && pdfDoc ? (
            <div className="w-full max-w-4xl mx-auto flex flex-col items-center gap-4 sm:gap-6 py-2 sm:py-4">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
                <ContinuousPdfPage
                  key={pageNum}
                  pageNumber={pageNum}
                  pdfDoc={pdfDoc}
                  scale={scale}
                  rotation={rotation}
                  fitMode={fitMode}
                  canvasFilterStyle={canvasFilterStyle}
                  containerRef={containerRef}
                  readerTheme={readerTheme}
                  isActive={currentPage === pageNum}
                  onBecomeVisible={(p) => {
                    if (currentPage !== p) setCurrentPage(p);
                  }}
                  onTextExtracted={(p, text) => {
                    if (p === currentPage) setCurrentPageText(text);
                  }}
                />
              ))}
            </div>
          ) : (
            <div
              className={`bg-white rounded-xl sm:rounded-2xl shadow-2xl overflow-hidden border border-slate-700/60 transition-all shrink-0 ${canvasFilterStyle}`}
              style={{
                maxWidth: fitMode === 'width' ? '100%' : 'none',
              }}
            >
              <canvas
                ref={canvasRef}
                className="block mx-auto"
                style={{
                  maxWidth: fitMode === 'width' ? '100%' : 'none',
                }}
              />
            </div>
          )}
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
                className="flex items-center gap-1.5 px-3 py-1 btn-luxury-action luxury-pressable text-white rounded-full text-xs font-black shadow-md cursor-pointer transition-all"
                title="Exit Clean View"
              >
                <Eye className="w-3.5 h-3.5" />
                <span>Exit Clean</span>
              </button>
            </div>
          </>
        )}

        {/* AdMob Bottom Reader Banner (Rendered exclusively when mobile data/internet is OPEN) */}
        {!isZenMode && (
          <div
            style={{ bottom: 'calc(54px + max(env(safe-area-inset-bottom, 0px), 16px))' }}
            className="fixed inset-x-0 z-30 px-3 flex justify-center pointer-events-none md:bottom-2"
          >
            <ReaderBottomAdBanner />
          </div>
        )}

        {/* MOBILE PRO BOTTOM BAR (Hidden in Clean View or on Desktop) */}
        {!isZenMode && (
          <div
            style={{ paddingBottom: 'max(env(safe-area-inset-bottom, 0px), 16px)' }}
            className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-slate-900/95 backdrop-blur-md border-t border-slate-800 px-3 pt-2 flex items-center justify-between shadow-2xl safe-area-bottom"
          >
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
              <span className="text-sky-400 font-black">{currentPage}</span>
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
                  ? 'bg-blue-600 text-white border-blue-500'
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
              className="p-2 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 active:scale-95 text-xs font-bold flex items-center justify-center"
              title="Cycle Reader Tone: White -> Sepia -> Dark"
            >
              {readerTheme === 'normal' ? (
                <Sun className="w-4 h-4 text-amber-300" />
              ) : readerTheme === 'sepia' ? (
                <BookOpen className="w-4 h-4 text-amber-500" />
              ) : (
                <Moon className="w-4 h-4 text-cyan-300" />
              )}
            </button>

            {/* Practice Quiz */}
            <button
              onClick={handleOpenQuizConfig}
              className="p-2 rounded-xl bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 font-black text-xs active:scale-95 shadow-md flex items-center gap-1"
              title="Generate Practice Quiz"
            >
              <Award className="w-4 h-4 text-slate-950" />
            </button>
          </div>
        )}
      </div>

      {/* Quiz Question Count Picker Modal */}
      {/* Quiz Question Count Picker Modal */}
      {isQuizConfigOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
          <div className="bg-slate-900 rounded-3xl p-5 sm:p-7 max-w-md w-full border border-slate-800 shadow-2xl space-y-4 sm:space-y-5 animate-in zoom-in-95 duration-200 my-auto max-h-[92vh] overflow-y-auto relative">
            {/* Top Close Icon Button */}
            <button
              onClick={() => setIsQuizConfigOpen(false)}
              className="absolute top-4 right-4 p-2 rounded-xl text-slate-400 hover:text-white bg-slate-800/80 hover:bg-slate-700 transition-colors z-10 cursor-pointer"
              title="Close"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Header */}
            <div className="text-center space-y-1.5 pt-1">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center mx-auto shadow-md">
                <Award className="w-6 h-6 sm:w-7 sm:h-7" />
              </div>
              <h3 className="text-lg sm:text-xl font-black text-white">
                {pickerLabels.modalTitle}
              </h3>
              <p className="text-xs text-slate-400 max-w-xs sm:max-w-sm mx-auto">
                {pickerLabels.modalSubtitle}
              </p>
            </div>

            {isExtractingQuiz ? (
              <div className="py-12 flex flex-col items-center justify-center space-y-3">
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
              <div className="space-y-4 text-left">
                {/* Topic / Unit Selector */}
                <div>
                  <div className="text-xs font-extrabold text-slate-300 uppercase tracking-wider mb-2 flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <Compass className="w-3.5 h-3.5 text-amber-400" />
                      <span>
                        {lang === 'om'
                          ? 'Mata-duree / Boqonnaa Filadhu:'
                          : lang === 'am'
                          ? 'ርዕስ ወይም ምዕራፍ ይምረጡ:'
                          : 'Select Topic / Chapter:'}
                      </span>
                    </span>
                    <span className="text-[10px] text-slate-400 lowercase">
                      ({QuizGeneratorService.getAvailableTopics(book.subject, book).length} options)
                    </span>
                  </div>

                  <div className="grid grid-cols-1 gap-1.5 max-h-36 overflow-y-auto pr-1">
                    {QuizGeneratorService.getAvailableTopics(book.subject, book).map((t) => {
                      const isSelected = selectedQuizTopic === t.id;
                      const topicName = lang === 'om' ? t.nameOromo : lang === 'am' ? t.nameAmharic : t.nameEnglish;
                      return (
                        <button
                          key={t.id}
                          type="button"
                          onClick={() => setSelectedQuizTopic(t.id)}
                          className={`p-2.5 rounded-xl border text-left text-xs font-bold flex items-center gap-2.5 transition-all cursor-pointer ${
                            isSelected
                              ? 'bg-blue-950/80 border-sky-400 text-sky-300 ring-2 ring-blue-500/40 shadow-sm'
                              : 'bg-slate-800/80 border-slate-700/80 text-slate-300 hover:bg-slate-700 hover:text-white'
                          }`}
                        >
                          {t.id === 'all' ? (
                            <Layers className="w-4 h-4 text-amber-400 shrink-0" />
                          ) : (
                            <BookOpen className="w-4 h-4 text-sky-400 shrink-0" />
                          )}
                          <span className="truncate flex-1">{topicName}</span>
                          {isSelected && <Check className="w-4 h-4 text-sky-400 shrink-0" />}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Question Count Selection */}
                <div className="space-y-2 pt-2 border-t border-slate-800">
                  <div className="text-xs font-extrabold text-slate-300 uppercase tracking-wider mb-1">
                    {lang === 'om' ? 'Baay’ina Gaaffilee Filadhu:' : lang === 'am' ? 'የጥያቄዎች ብዛት:' : 'Select Question Count & Start Exam:'}
                  </div>

                  <div className="grid grid-cols-1 gap-2">
                    <button
                      type="button"
                      onClick={() => handleStartDynamicQuiz(25)}
                      className="w-full p-2.5 sm:p-3 rounded-2xl bg-slate-800/90 hover:bg-slate-700/90 border border-slate-700 hover:border-sky-500/50 flex items-center justify-between text-left transition-all active:scale-[0.99] cursor-pointer"
                    >
                      <div>
                        <div className="font-extrabold text-xs sm:text-sm text-white">{pickerLabels.q25}</div>
                        <div className="text-[10px] sm:text-[11px] text-slate-400">{pickerLabels.q25desc}</div>
                      </div>
                      <span className="px-2.5 py-1 bg-blue-500/20 text-sky-300 border border-blue-500/30 rounded-xl text-xs font-bold shrink-0 ml-2">
                        25 Qs
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleStartDynamicQuiz(50)}
                      className="w-full p-2.5 sm:p-3 rounded-2xl bg-slate-800/90 hover:bg-slate-700/90 border border-slate-700 hover:border-amber-500/50 flex items-center justify-between text-left transition-all active:scale-[0.99] cursor-pointer"
                    >
                      <div>
                        <div className="font-extrabold text-xs sm:text-sm text-white">{pickerLabels.q50}</div>
                        <div className="text-[10px] sm:text-[11px] text-slate-400">{pickerLabels.q50desc}</div>
                      </div>
                      <span className="px-2.5 py-1 bg-amber-500/20 text-amber-300 border border-amber-500/30 rounded-xl text-xs font-bold shrink-0 ml-2">
                        50 Qs
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleStartDynamicQuiz(100)}
                      className="w-full p-2.5 sm:p-3 rounded-2xl bg-slate-800/90 hover:bg-slate-700/90 border border-slate-700 hover:border-sky-500/50 flex items-center justify-between text-left transition-all active:scale-[0.99] cursor-pointer"
                    >
                      <div>
                        <div className="font-extrabold text-xs sm:text-sm text-white">{pickerLabels.q100}</div>
                        <div className="text-[10px] sm:text-[11px] text-slate-400">{pickerLabels.q100desc}</div>
                      </div>
                      <span className="px-2.5 py-1 bg-sky-500/20 text-sky-300 border border-sky-500/30 rounded-xl text-xs font-bold shrink-0 ml-2">
                        100 Qs
                      </span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleStartDynamicQuiz(200)}
                      className="w-full p-2.5 sm:p-3 rounded-2xl bg-gradient-to-r from-purple-950/40 via-indigo-950/40 to-amber-950/40 hover:from-purple-900/50 hover:to-amber-900/50 border border-purple-500/40 flex items-center justify-between text-left transition-all active:scale-[0.99] cursor-pointer"
                    >
                      <div>
                        <div className="font-extrabold text-xs sm:text-sm text-purple-200">{pickerLabels.q200}</div>
                        <div className="text-[10px] sm:text-[11px] text-slate-300">{pickerLabels.q200desc}</div>
                      </div>
                      <span className="px-2.5 py-1 bg-purple-500 text-slate-950 font-black rounded-xl text-xs shrink-0 ml-2 shadow-sm">
                        200 Qs
                      </span>
                    </button>
                  </div>
                </div>

                {/* Cancel / Dismiss Button */}
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => setIsQuizConfigOpen(false)}
                    className="w-full py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-extrabold transition-colors cursor-pointer"
                  >
                    {pickerLabels.cancel}
                  </button>
                </div>
              </div>
            )}
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

      {/* Dynamic 25-200 Question Quiz Modal */}
      {isQuizActive && (
        <QuizModal
          isOpen={isQuizActive}
          onClose={() => setIsQuizActive(false)}
          title={pickerLabels.quizModalTitle}
          questions={generatedQuestions}
          language={lang}
          timeLimitMinutes={quizQuestionCount}
        />
      )}

      {/* AdMob Rewarded Video Modal: Required to Access Questions */}
      <RewardedVideoAdModal
        isOpen={isVideoAdModalOpen}
        onClose={() => {
          setIsVideoAdModalOpen(false);
          setPendingQuizConfig(null);
        }}
        onRewardEarned={handleRewardEarnedForQuiz}
        questionCount={pendingQuizConfig?.count || 25}
        subjectOrTitle={`${book.title} (Grade ${book.grade})`}
      />

      {/* Internet Connection Required Modal for In-Book Quizzes */}
      <InternetRequiredModal
        isOpen={isNetworkModalOpen}
        onClose={() => setIsNetworkModalOpen(false)}
        onConnected={() => setIsQuizConfigOpen(true)}
      />
    </div>
  );
};
