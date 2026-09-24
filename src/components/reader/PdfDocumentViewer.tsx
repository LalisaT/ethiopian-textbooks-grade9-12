import React, { useState, useEffect, useRef } from 'react';
import { Book } from '../../types/book';
import { DbService } from '../../services/dbService';
import { CloudStorageService } from '../../services/cloudStorageService';
import { StorageService } from '../../services/storageService';
import { PdfCanvasViewer } from './PdfCanvasViewer';
import {
  ArrowLeft,
  Download,
  ZoomIn,
  ZoomOut,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  Sparkles,
  UploadCloud,
  BookMarked,
  Loader2,
  HardDrive,
  DownloadCloud,
  CheckCircle2,
  WifiOff,
  RefreshCw,
  ShieldAlert,
} from 'lucide-react';

import { LargeFileDownloadModal } from '../books/LargeFileDownloadModal';

interface PdfDocumentViewerProps {
  book: Book;
  onBack: () => void;
  onSwitchToInteractive?: () => void;
  onOpenDownloadModal?: () => void;
}

export const PdfDocumentViewer: React.FC<PdfDocumentViewerProps> = ({
  book,
  onBack,
  onOpenDownloadModal,
}) => {
  const [uploadedPdfBlob, setUploadedPdfBlob] = useState<Blob | null>(null);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [isLoadingPdf, setIsLoadingPdf] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [zoomLevel, setZoomLevel] = useState(100);
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [isPermissionModalOpen, setIsPermissionModalOpen] = useState(false);

  const totalPages = book.totalEstimatedPages || 210;

  // Load PDF: Check real offline cache or stream directly via URL (0 memory bloat)
  const fetchBlob = async () => {
    try {
      setIsLoadingPdf(true);

      // 1. Check if an authentic offline PDF (> 100 KB) is in IndexedDB
      const record = await DbService.getPdfFile(book.id);
      if (record && record.blob && record.blob.size > 100000) {
        setUploadedPdfBlob(record.blob);
        setPdfUrl(null);
        setIsLoadingPdf(false);
        return;
      }

      // If IndexedDB has a stale dummy sample (<= 100 KB), remove it so the real textbook is loaded
      if (record && record.blob && record.blob.size <= 100000) {
        await DbService.deletePdfFile(book.id);
      }

      // 2. Check if device is offline
      const isOnline = typeof navigator !== 'undefined' ? navigator.onLine : true;
      if (!isOnline) {
        // Book is not downloaded and user is offline -> show Internet Required screen directly
        setUploadedPdfBlob(null);
        setPdfUrl(null);
        setIsLoadingPdf(false);
        return;
      }

      // 3. Direct streaming via PDF.js HTTP requests with live download progress
      if (book.pdfUrl) {
        setPdfUrl(book.pdfUrl);
        setUploadedPdfBlob(null);
        setIsLoadingPdf(false);
        return;
      }

      // 4. Fallback for custom user uploaded books
      if (record && record.blob) {
        setUploadedPdfBlob(record.blob);
        setPdfUrl(null);
        setIsLoadingPdf(false);
        return;
      }

      // 5. If no URL and not in DB, show connection required
      setUploadedPdfBlob(null);
      setPdfUrl(null);
    } catch (e) {
      console.error('Error fetching PDF:', e);
      if (book.pdfUrl && navigator.onLine) {
        setPdfUrl(book.pdfUrl);
      }
    } finally {
      setIsLoadingPdf(false);
    }
  };

  useEffect(() => {
    fetchBlob();
  }, [book.id]);

  const executeDownload = async () => {
    setIsDownloading(true);
    setDownloadProgress(20);

    const result = await CloudStorageService.downloadAndSaveBookToDevice(book, (pct) => {
      setDownloadProgress(pct);
    }, true);

    if (result.success) {
      setTimeout(async () => {
        setIsDownloading(false);
        await fetchBlob();
      }, 500);
    } else {
      setIsDownloading(false);
      alert('Failed to download book. Please check device storage space.');
    }
  };

  const handleDownloadToPhone = () => {
    // If book is larger than 30 MB, ask student for permission first
    if (book.fileSizeMb > 30) {
      setIsPermissionModalOpen(true);
    } else {
      executeDownload();
    }
  };

  const handleUpdatePdfFile = async (file: File) => {
    try {
      await DbService.savePdfFile(book.id, file, file.name);
      await fetchBlob();
    } catch (e) {
      console.error(e);
    }
  };

  if (isLoadingPdf) {
    return (
      <div className="h-full w-full bg-slate-950 flex flex-col items-center justify-center space-y-4 text-white px-4">
        <div className="w-16 h-16 rounded-3xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center">
          <Loader2 className="w-8 h-8 animate-spin text-emerald-400" />
        </div>
        <div className="text-center space-y-1">
          <div className="text-base font-black text-white">
            Opening Textbook...
          </div>
          <p className="text-xs text-slate-400 max-w-sm">
            Streaming official textbook content directly for smooth reading.
          </p>
        </div>
      </div>
    );
  }

  // If real PDF exists (either blob or streaming URL), render the single clean pro PDF Canvas Viewer!
  if (uploadedPdfBlob || pdfUrl) {
    return (
      <>
        <PdfCanvasViewer
          pdfBlob={uploadedPdfBlob}
          pdfUrl={pdfUrl}
          book={book}
          onBack={onBack}
          onUpdatePdfFile={handleUpdatePdfFile}
        />
        <LargeFileDownloadModal
          isOpen={isPermissionModalOpen}
          onClose={() => setIsPermissionModalOpen(false)}
          onConfirm={executeDownload}
          book={book}
        />
      </>
    );
  }

  // Fallback: Book is not saved/downloaded to device and user is offline or needs initial connection
  return (
    <div className="h-full w-full overflow-y-auto bg-slate-950 text-slate-100 flex flex-col">
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
              onClick={() => fetchBlob()}
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

            {onOpenDownloadModal && (
              <button
                onClick={onOpenDownloadModal}
                className="w-full py-2.5 px-3 text-xs text-sky-400 hover:text-sky-300 font-semibold transition-colors"
              >
                Alternative Cloud Mirrors (Telegram / Drive) →
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
