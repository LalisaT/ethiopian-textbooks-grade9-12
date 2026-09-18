import React, { useState, useRef } from 'react';
import { Book, GradeLevel, RegionId, SubjectCategory, LanguageCode } from '../../types/book';
import { ETHIOPIAN_REGIONS } from '../../data/regions';
import { ETHIOPIAN_SUBJECTS } from '../../data/subjects';
import { DbService } from '../../services/dbService';
import { parseFilenameToBookDraft, ParsedBookDraft } from '../../utils/filenameParser';
import { PdfExtractorService } from '../../services/pdfExtractorService';
import { NotificationService } from '../../services/notificationService';
import {
  X,
  UploadCloud,
  FolderPlus,
  Zap,
  CheckCircle2,
  AlertCircle,
  FileText,
  Trash2,
  Loader2,
  Sparkles,
  Layers,
  ShieldCheck,
} from 'lucide-react';

interface BatchUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBatchUploaded: (books: Book[]) => void;
}

export const BatchUploadModal: React.FC<BatchUploadModalProps> = ({
  isOpen,
  onClose,
  onBatchUploaded,
}) => {
  const multiFileInputRef = useRef<HTMLInputElement>(null);
  const folderInputRef = useRef<HTMLInputElement>(null);
  const [drafts, setDrafts] = useState<ParsedBookDraft[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState({ current: 0, total: 0, currentTitle: '' });
  const [isDragOver, setIsDragOver] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  if (!isOpen) return null;

  const handleProcessFiles = (fileList: FileList | File[]) => {
    const files = Array.from(fileList).filter(
      (f) => f.type === 'application/pdf' || f.name.toLowerCase().endsWith('.pdf')
    );

    if (files.length === 0) {
      setErrorMsg('No PDF files found. Please select or drop .pdf files.');
      return;
    }

    setErrorMsg('');
    const newDrafts = files.map((f) => parseFilenameToBookDraft(f));
    setDrafts((prev) => [...prev, ...newDrafts]);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleProcessFiles(e.dataTransfer.files);
    }
  };

  const handleUpdateDraft = (id: string, updates: Partial<ParsedBookDraft>) => {
    setDrafts((prev) =>
      prev.map((d) => (d.id === id ? { ...d, ...updates } : d))
    );
  };

  const handleRemoveDraft = (id: string) => {
    setDrafts((prev) => prev.filter((d) => d.id !== id));
  };

  const handleClearAllDrafts = () => {
    setDrafts([]);
  };

  const handleUploadAll = async () => {
    if (drafts.length === 0) return;

    setIsUploading(true);
    setErrorMsg('');
    setUploadProgress({ current: 0, total: drafts.length, currentTitle: 'Preparing...' });

    const publishedBooks: Book[] = [];

    for (let i = 0; i < drafts.length; i++) {
      const draft = drafts[i];
      setUploadProgress({ current: i + 1, total: drafts.length, currentTitle: draft.title });

      try {
        let bookRecord: Book = {
          id: draft.id,
          title: draft.title,
          titleAmharic: draft.titleAmharic,
          titleOromo: draft.titleOromo,
          titleTigrinya: draft.titleTigrinya,
          titleSomali: draft.titleSomali,
          grade: draft.grade,
          stream: draft.stream,
          bookType: draft.bookType,
          subject: draft.subject,
          regionId: draft.regionId,
          language: draft.language,
          editionYear: draft.editionYear,
          curriculum: draft.curriculum,
          coverColor: draft.coverColor,
          accentColor: draft.accentColor,
          totalUnits: draft.totalUnits,
          totalEstimatedPages: draft.totalEstimatedPages,
          fileSizeMb: draft.fileSizeMb,
          description: draft.bookType === 'teacher_guide'
            ? `Official Grade ${draft.grade} ${draft.subject} Teacher's Guide with lesson plans, competencies, and answer keys.`
            : `Official Grade ${draft.grade} ${draft.subject} curriculum student textbook.`,
          iconName: 'BookOpen',
          isOfficialMoe: true,
          chapters: [],
        };

        // 1. Save PDF binary to IndexedDB persistent storage
        await DbService.savePdfFile(draft.id, draft.file, draft.file.name);

        // 2. Extract chapters and notes from PDF with safety
        try {
          bookRecord = await PdfExtractorService.extractAndAttachChapters(bookRecord, draft.file);
        } catch (extractErr) {
          console.warn(`Note extraction fallback on ${draft.title}:`, extractErr);
        }

        // 3. Save Custom Book Metadata to IndexedDB & local backup
        await DbService.saveCustomBook(bookRecord);

        publishedBooks.push(bookRecord);

        // Small pause to allow UI repaint
        await new Promise((r) => setTimeout(r, 50));
      } catch (err) {
        console.error(`Failed to upload ${draft.title}:`, err);
      }
    }

    setIsUploading(false);
    if (publishedBooks.length > 0) {
      const firstBookId = publishedBooks[0]?.id;
      NotificationService.broadcastBatchPublished(publishedBooks.length, firstBookId);
      onBatchUploaded(publishedBooks);
      onClose();
    } else {
      setErrorMsg('Failed to upload files. Please try again.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-5xl w-full shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col my-auto max-h-[94vh]">
        {/* Header */}
        <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-950 text-white">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-amber-500 to-yellow-500 text-slate-950 flex items-center justify-center font-black shadow-md">
              <Zap className="w-6 h-6" />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-amber-500/20 text-amber-300 rounded-full border border-amber-500/30 text-[10px] font-black">
                <Sparkles className="w-3 h-3" />
                <span>Auto Extracts Notes & Saves Permanently</span>
              </div>
              <h3 className="font-black text-lg sm:text-xl text-white">
                Upload All Textbooks in Seconds
              </h3>
            </div>
          </div>

          <button
            onClick={onClose}
            disabled={isUploading}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 flex-1 overflow-y-auto space-y-6">
          {errorMsg && (
            <div className="p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-800 text-rose-800 dark:text-rose-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Persistent Storage Badge Notice */}
          <div className="p-3.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-xs text-emerald-800 dark:text-emerald-300 flex items-center gap-2.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
            <span>
              <strong>100% Persistent Storage:</strong> All uploaded books and PDFs are stored in your browser's dedicated IndexedDB storage and survive page refreshes, browser restarts, and offline usage.
            </span>
          </div>

          {/* Drag & Drop Multi-File Target */}
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragOver(true);
            }}
            onDragLeave={() => setIsDragOver(false)}
            onDrop={handleDrop}
            className={`border-2 border-dashed rounded-3xl p-8 sm:p-10 text-center transition-all cursor-pointer ${
              isDragOver
                ? 'border-amber-400 bg-amber-500/10 scale-[1.01]'
                : 'border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/40 hover:border-amber-400'
            }`}
          >
            <input
              type="file"
              ref={multiFileInputRef}
              onChange={(e) => e.target.files && handleProcessFiles(e.target.files)}
              multiple
              accept="application/pdf"
              className="hidden"
            />
            <input
              type="file"
              ref={folderInputRef}
              onChange={(e) => e.target.files && handleProcessFiles(e.target.files)}
              {...({ webkitdirectory: '', directory: '' } as any)}
              className="hidden"
            />

            <div className="w-16 h-16 rounded-3xl bg-amber-500/10 dark:bg-amber-500/20 text-amber-500 mx-auto flex items-center justify-center mb-4">
              <Layers className="w-8 h-8" />
            </div>

            <h4 className="font-extrabold text-base text-slate-900 dark:text-white">
              Drag & Drop Your Ethiopian Textbook PDFs Here
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-md mx-auto mb-5">
              Select multiple files or an entire folder. Grade, Subject, Language, and Region are automatically detected from the filenames!
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => multiFileInputRef.current?.click()}
                className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs rounded-xl shadow-md transition-transform active:scale-95 flex items-center gap-2"
              >
                <UploadCloud className="w-4 h-4" />
                <span>Select Multiple Files (.pdf)</span>
              </button>

              <button
                type="button"
                onClick={() => folderInputRef.current?.click()}
                className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs rounded-xl border border-slate-700 transition-colors flex items-center gap-2"
              >
                <FolderPlus className="w-4 h-4 text-emerald-400" />
                <span>Select Whole Folder</span>
              </button>
            </div>
          </div>

          {/* Drafts Queue Table */}
          {drafts.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-extrabold text-sm text-slate-900 dark:text-white">
                    Queued Books to Upload ({drafts.length})
                  </span>
                  <span className="text-xs text-emerald-600 dark:text-emerald-400 font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>Metadata Auto-Detected</span>
                  </span>
                </div>

                <button
                  type="button"
                  onClick={handleClearAllDrafts}
                  className="text-xs font-semibold text-rose-500 hover:underline"
                >
                  Clear Queue
                </button>
              </div>

              {/* Progress bar when uploading */}
              {isUploading && (
                <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 space-y-2">
                  <div className="flex items-center justify-between text-xs font-bold text-amber-900 dark:text-amber-300">
                    <span className="flex items-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin text-amber-500" />
                      <span>
                        Publishing & Saving to Persistent Storage ({uploadProgress.current} / {uploadProgress.total}):{' '}
                        <span className="text-emerald-600 dark:text-emerald-400">{uploadProgress.currentTitle}</span>
                      </span>
                    </span>
                    <span>
                      {Math.round((uploadProgress.current / Math.max(1, uploadProgress.total)) * 100)}%
                    </span>
                  </div>
                  <div className="w-full bg-amber-200 dark:bg-slate-800 h-2.5 rounded-full overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-amber-500 to-emerald-500 h-full rounded-full transition-all duration-300"
                      style={{
                        width: `${(uploadProgress.current / Math.max(1, uploadProgress.total)) * 100}%`,
                      }}
                    />
                  </div>
                </div>
              )}

              {/* List of files with inline fast edit */}
              <div className="max-h-80 overflow-y-auto space-y-2 rounded-2xl border border-slate-200 dark:border-slate-800 p-2">
                {drafts.map((draft) => (
                  <div
                    key={draft.id}
                    className="p-3 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700/60 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-xs"
                  >
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center font-black text-xs shrink-0">
                        {draft.grade}
                      </div>
                      <div className="flex-1 min-w-0">
                        <input
                          type="text"
                          value={draft.title}
                          onChange={(e) =>
                            handleUpdateDraft(draft.id, {
                              title: e.target.value,
                              titleAmharic: e.target.value,
                              titleOromo: e.target.value,
                            })
                          }
                          className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-2.5 py-1 font-bold text-slate-900 dark:text-white"
                        />
                        <div className="text-[10px] text-slate-400 truncate mt-0.5">
                          {draft.file.name} • {draft.fileSizeMb} MB
                        </div>
                      </div>
                    </div>

                    {/* Quick dropdown selectors */}
                    <div className="flex items-center gap-2 shrink-0">
                      {/* Grade */}
                      <select
                        value={draft.grade}
                        onChange={(e) =>
                          handleUpdateDraft(draft.id, {
                            grade: parseInt(e.target.value) as GradeLevel,
                          })
                        }
                        className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-2 py-1 font-bold text-slate-800 dark:text-slate-200"
                      >
                        <option value={9}>Grade 9</option>
                        <option value={10}>Grade 10</option>
                        <option value={11}>Grade 11</option>
                        <option value={12}>Grade 12</option>
                      </select>

                      {/* Type: Student Book vs Teacher Guide */}
                      <select
                        value={draft.bookType || 'textbook'}
                        onChange={(e) =>
                          handleUpdateDraft(draft.id, {
                            bookType: e.target.value as 'textbook' | 'teacher_guide',
                          })
                        }
                        className={`rounded-lg px-2 py-1 font-black text-xs border ${
                          draft.bookType === 'teacher_guide'
                            ? 'bg-amber-100 text-amber-900 border-amber-300 dark:bg-amber-950 dark:text-amber-200 dark:border-amber-800'
                            : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200'
                        }`}
                      >
                        <option value="textbook">Student Book</option>
                        <option value="teacher_guide">Teacher Guide</option>
                      </select>

                      {/* Subject */}
                      <select
                        value={draft.subject}
                        onChange={(e) =>
                          handleUpdateDraft(draft.id, {
                            subject: e.target.value as SubjectCategory,
                          })
                        }
                        className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-2 py-1 font-bold text-slate-800 dark:text-slate-200 max-w-[130px]"
                      >
                        {ETHIOPIAN_SUBJECTS.map((s) => (
                          <option key={s.id} value={s.id}>
                            {s.name}
                          </option>
                        ))}
                      </select>

                      {/* Language */}
                      <select
                        value={draft.language}
                        onChange={(e) =>
                          handleUpdateDraft(draft.id, {
                            language: e.target.value as LanguageCode,
                          })
                        }
                        className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-2 py-1 font-bold text-slate-800 dark:text-slate-200"
                      >
                        <option value="en">EN</option>
                        <option value="om">OM</option>
                        <option value="am">AM</option>
                        <option value="ti">TI</option>
                        <option value="so">SO</option>
                      </select>

                      {/* Remove Button */}
                      <button
                        type="button"
                        onClick={() => handleRemoveDraft(draft.id)}
                        className="p-1.5 text-slate-400 hover:text-rose-500 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-4 sm:p-6 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 flex items-center justify-between">
          <button
            type="button"
            onClick={onClose}
            disabled={isUploading}
            className="px-5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs font-bold hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            Cancel
          </button>

          {drafts.length > 0 && (
            <button
              type="button"
              onClick={handleUploadAll}
              disabled={isUploading}
              className="px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-black rounded-xl shadow-lg transition-transform active:scale-95 flex items-center gap-2"
            >
              {isUploading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Publishing ({uploadProgress.current}/{uploadProgress.total})...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Publish All {drafts.length} Textbooks Permanently</span>
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
