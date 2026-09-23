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

      // 2. Direct streaming via PDF.js HTTP requests (loads page 1 in 100ms)
      if (book.pdfUrl) {
        setPdfUrl(book.pdfUrl);
        setUploadedPdfBlob(null);
        setIsLoadingPdf(false);
        return;
      }

      // 3. Fallback for custom user uploaded books
      if (record && record.blob) {
        setUploadedPdfBlob(record.blob);
        setPdfUrl(null);
        setIsLoadingPdf(false);
        return;
      }

      // 4. Sample generation ONLY for mock/test books without real pdfUrl
      const result = await CloudStorageService.downloadAndSaveBookToDevice(book, undefined, false);
      if (result.success && result.blob) {
        setUploadedPdfBlob(result.blob);
        setPdfUrl(null);
      }
    } catch (e) {
      console.error('Error fetching PDF:', e);
      if (book.pdfUrl) {
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

  // Fallback for system books without attached PDF
  return (
    <div className="h-full w-full overflow-hidden bg-slate-950 text-slate-100 flex flex-col">
      {/* Top Single Header */}
      <div className="sticky top-0 z-40 bg-slate-900 border-b border-slate-800 px-4 py-2.5 flex items-center justify-between shadow-xl">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="px-3.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white transition-colors flex items-center gap-1.5 text-xs font-bold border border-slate-700 shadow-sm"
          >
            <ArrowLeft className="w-4 h-4 text-emerald-400" />
            <span>Library</span>
          </button>
          <div>
            <div className="text-xs sm:text-sm font-black text-white truncate max-w-md">
              {book.title}
            </div>
            <div className="text-[10px] text-slate-400">
              Grade {book.grade} • {book.subject}
            </div>
          </div>
        </div>

        {/* Page Nav */}
        <div className="flex items-center gap-2 bg-slate-950 px-3.5 py-1.5 rounded-2xl border border-slate-800 shadow-inner">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage <= 1}
            className="p-1 rounded text-slate-400 hover:text-white disabled:opacity-30"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <div className="text-xs font-mono font-bold px-2">
            Page {currentPage} of {totalPages}
          </div>
          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage >= totalPages}
            className="p-1 rounded text-slate-400 hover:text-white disabled:opacity-30"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Zoom */}
        <div className="flex items-center gap-1 bg-slate-950 px-2 py-1 rounded-xl border border-slate-800 text-xs">
          <button onClick={() => setZoomLevel((z) => Math.max(80, z - 10))} className="p-1 text-slate-400 hover:text-white">
            <ZoomOut className="w-3.5 h-3.5" />
          </button>
          <span className="font-mono text-[11px] px-1">{zoomLevel}%</span>
          <button onClick={() => setZoomLevel((z) => Math.min(130, z + 10))} className="p-1 text-slate-400 hover:text-white">
            <ZoomIn className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Main Canvas */}
      <div className="flex-1 w-full bg-slate-950 flex flex-col items-center justify-start p-4 sm:p-8 overflow-y-auto">
        <div
          className="bg-white text-slate-900 rounded-3xl shadow-2xl transition-all overflow-hidden border border-slate-300 w-full max-w-4xl p-8 sm:p-14 space-y-8"
          style={{ transform: `scale(${zoomLevel / 100})`, minHeight: '900px' }}
        >
          <div className="flex items-center justify-between border-b-2 border-emerald-600 pb-3 text-xs font-bold text-slate-500 uppercase tracking-wider">
            <span>FEDERAL DEMOCRATIC REPUBLIC OF ETHIOPIA • MINISTRY OF EDUCATION</span>
            <span>GRADE {book.grade} {book.subject.toUpperCase()}</span>
          </div>

          <div className="text-center py-14 space-y-8">
            <div className="w-28 h-28 rounded-3xl mx-auto bg-gradient-to-br from-emerald-600 via-yellow-500 to-red-600 p-1 shadow-2xl">
              <div className="w-full h-full bg-slate-950 rounded-[22px] flex items-center justify-center text-4xl shadow-inner">
                🇪🇹
              </div>
            </div>

            <div className="space-y-3">
              <div className="inline-block px-4 py-1.5 bg-emerald-50 text-emerald-800 font-extrabold text-xs rounded-full border border-emerald-200 uppercase tracking-wider">
                OFFICIAL ETHIOPIAN STUDENT TEXTBOOK
              </div>
              <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight leading-tight pt-2">
                {book.title}
              </h1>
            </div>

            <div className="p-6 max-w-xl mx-auto rounded-2xl bg-slate-50 border border-slate-200 text-left space-y-2.5 text-xs text-slate-700 shadow-sm">
              <div className="flex justify-between border-b border-slate-200 pb-1.5">
                <span className="font-semibold text-slate-500">Grade Level:</span>
                <span className="font-bold text-slate-900">Grade {book.grade}</span>
              </div>
              <div className="flex justify-between border-b border-slate-200 pb-1.5">
                <span className="font-semibold text-slate-500">Language:</span>
                <span className="font-bold uppercase text-slate-900">{book.language}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-semibold text-slate-500">Total Units:</span>
                <span className="font-bold text-slate-900">{book.totalUnits} Units</span>
              </div>
            </div>

            {/* 📱 Mobile Storage & In-App Offline Reader Actions */}
            <div className="max-w-xl mx-auto pt-4 space-y-4">
              <div className="p-6 rounded-3xl bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/40 dark:to-teal-950/40 border border-emerald-300 dark:border-emerald-800 text-left space-y-3 shadow-lg">
                <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-300 font-extrabold text-sm sm:text-base">
                  <HardDrive className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span>Mobile Storage & In-App Offline Reading</span>
                </div>

                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  <strong>Save to Mobile Storage:</strong> Download this textbook directly to your phone / computer storage (Downloads folder) and cache it in the app for 100% offline reading with zero internet.
                </p>

                <div className="pt-2">
                  {/* Action: Download to phone */}
                  <button
                    onClick={handleDownloadToPhone}
                    disabled={isDownloading}
                    className="w-full p-4 rounded-2xl bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-black text-sm shadow-md transition-all flex items-center justify-center gap-2.5 disabled:opacity-50"
                  >
                    {isDownloading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>Saving to Phone ({downloadProgress}%)...</span>
                      </>
                    ) : (
                      <>
                        <DownloadCloud className="w-5 h-5" />
                        <span>Download to Phone & Read</span>
                      </>
                    )}
                  </button>
                </div>

                {onOpenDownloadModal && (
                  <div className="pt-2 border-t border-emerald-200 dark:border-emerald-800/60 flex items-center justify-between text-xs">
                    <span className="text-slate-500 dark:text-slate-400">Prefer Telegram or Google Drive?</span>
                    <button
                      onClick={onOpenDownloadModal}
                      className="text-emerald-700 dark:text-emerald-400 font-bold hover:underline"
                    >
                      View Cloud Mirrors →
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
