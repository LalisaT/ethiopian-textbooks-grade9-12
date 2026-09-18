import React, { useState, useRef } from 'react';
import { Book, BookType, GradeLevel, RegionId, SubjectCategory, LanguageCode, AcademicStream } from '../../types/book';
import { ETHIOPIAN_REGIONS } from '../../data/regions';
import { ETHIOPIAN_SUBJECTS } from '../../data/subjects';
import { DbService } from '../../services/dbService';
import { PdfExtractorService } from '../../services/pdfExtractorService';
import { NotificationService } from '../../services/notificationService';
import {
  X,
  UploadCloud,
  FileText,
  CheckCircle2,
  AlertCircle,
  Palette,
  Loader2,
  Sparkles,
} from 'lucide-react';

interface UploadBookModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBookUploaded: (newBook: Book) => void;
}

const COLOR_PRESETS = [
  { name: 'Emerald Forest', value: 'from-emerald-600 to-teal-800', accent: 'emerald' },
  { name: 'National Blue', value: 'from-blue-600 to-indigo-800', accent: 'blue' },
  { name: 'Oromia Crimson', value: 'from-red-600 to-amber-800', accent: 'red' },
  { name: 'Golden Sun', value: 'from-amber-600 to-orange-800', accent: 'amber' },
  { name: 'Tigray Amber', value: 'from-yellow-600 to-rose-700', accent: 'yellow' },
  { name: 'Somali Turquoise', value: 'from-teal-600 to-cyan-900', accent: 'teal' },
  { name: 'Royal Purple', value: 'from-purple-600 to-violet-800', accent: 'purple' },
  { name: 'Slate Steel', value: 'from-slate-700 to-slate-900', accent: 'slate' },
];

export const UploadBookModal: React.FC<UploadBookModalProps> = ({
  isOpen,
  onClose,
  onBookUploaded,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isExtractingNotes, setIsExtractingNotes] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Form State
  const [title, setTitle] = useState('');
  const [titleAmharic, setTitleAmharic] = useState('');
  const [titleOromo, setTitleOromo] = useState('');
  const [titleTigrinya, setTitleTigrinya] = useState('');
  const [titleSomali, setTitleSomali] = useState('');
  const [grade, setGrade] = useState<GradeLevel>(12);
  const [stream, setStream] = useState<AcademicStream>('all');
  const [bookType, setBookType] = useState<BookType>('textbook');
  const [subject, setSubject] = useState<SubjectCategory>('physics');
  const [regionId, setRegionId] = useState<RegionId>('national');
  const [language, setLanguage] = useState<LanguageCode>('en');
  const [editionYear, setEditionYear] = useState<number>(2024);
  const [curriculum, setCurriculum] = useState<Book['curriculum']>('New Curriculum (2023+)');
  const [totalUnits, setTotalUnits] = useState<number>(6);
  const [totalEstimatedPages, setTotalEstimatedPages] = useState<number>(180);
  const [description, setDescription] = useState('');
  const [coverColor, setCoverColor] = useState(COLOR_PRESETS[0].value);
  const [accentColor, setAccentColor] = useState(COLOR_PRESETS[0].accent);

  if (!isOpen) return null;

  const handleFileChange = (file: File) => {
    if (file.type !== 'application/pdf' && !file.name.toLowerCase().endsWith('.pdf')) {
      setErrorMsg('Please upload a valid PDF file (.pdf)');
      return;
    }
    setErrorMsg('');
    setSelectedFile(file);

    // Auto-fill title from filename if empty
    if (/teacher|guide|መምህር|መምሪያ|\btg\b/i.test(file.name)) {
      setBookType('teacher_guide');
    }
    if (!title) {
      const cleanName = file.name.replace(/\.pdf$/i, '').replace(/[-_]/g, ' ');
      setTitle(cleanName);
      setTitleAmharic(cleanName);
      setTitleOromo(cleanName);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setErrorMsg('Please provide a title for the textbook');
      return;
    }
    if (!selectedFile) {
      setErrorMsg('Please select a PDF file to upload');
      return;
    }

    setIsUploading(true);
    setIsExtractingNotes(true);
    setErrorMsg('');

    try {
      const bookId = `custom-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`;
      const fileSizeMb = Math.round((selectedFile.size / (1024 * 1024)) * 10) / 10 || 12.0;

      let newBook: Book = {
        id: bookId,
        title: title.trim(),
        titleAmharic: titleAmharic.trim() || title.trim(),
        titleOromo: titleOromo.trim() || title.trim(),
        titleTigrinya: titleTigrinya.trim() || title.trim(),
        titleSomali: titleSomali.trim() || title.trim(),
        grade,
        stream,
        bookType,
        subject,
        regionId,
        language,
        editionYear,
        curriculum,
        coverColor,
        accentColor,
        iconName: 'BookOpen',
        totalUnits: Number(totalUnits) || 6,
        totalEstimatedPages: Number(totalEstimatedPages) || 180,
        description: description.trim() || (bookType === 'teacher_guide' ? `Official Grade ${grade} ${subject} Teacher's Guide.` : `Official Grade ${grade} ${subject} student textbook.`),
        isOfficialMoe: true,
        fileSizeMb,
        chapters: [],
      };

      // 1. Save PDF file to IndexedDB
      await DbService.savePdfFile(bookId, selectedFile, selectedFile.name);

      // 2. Automatically extract notes, units & chapters from the uploaded PDF!
      try {
        newBook = await PdfExtractorService.extractAndAttachChapters(newBook, selectedFile);
      } catch (extractErr) {
        console.error('Note extraction warning:', extractErr);
      }

      // 3. Save Custom Book metadata to IndexedDB
      await DbService.saveCustomBook(newBook);

      // 4. Trigger Phone Push Notification with sound
      NotificationService.broadcastBookPublished(newBook.title, newBook.grade, newBook.subject, newBook.id);

      onBookUploaded(newBook);
      onClose();
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to upload and save textbook');
    } finally {
      setIsUploading(false);
      setIsExtractingNotes(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-3xl w-full shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col my-auto max-h-[92vh]">
        {/* Header */}
        <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-950">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-600 text-white flex items-center justify-center font-black shadow-md">
              <UploadCloud className="w-5 h-5" />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-emerald-50 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 rounded-full text-[10px] font-bold">
                <Sparkles className="w-3 h-3" />
                <span>Auto Extracts Interactive Notes from PDF</span>
              </div>
              <h3 className="font-extrabold text-base text-slate-900 dark:text-white">
                Upload New Textbook
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 sm:p-8 flex-1 overflow-y-auto space-y-6">
          {errorMsg && (
            <div className="p-4 rounded-2xl bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-800 text-rose-800 dark:text-rose-300 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* PDF Dropzone */}
          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              Textbook PDF File *
            </label>
            <div
              onClick={() => fileInputRef.current?.click()}
              className={`cursor-pointer p-6 rounded-2xl border-2 border-dashed transition-all text-center flex flex-col items-center justify-center gap-2 ${
                selectedFile
                  ? 'border-emerald-500 bg-emerald-50/40 dark:bg-emerald-950/20'
                  : 'border-slate-300 dark:border-slate-700 hover:border-emerald-400 bg-slate-50 dark:bg-slate-800/40'
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,application/pdf"
                className="hidden"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    handleFileChange(e.target.files[0]);
                  }
                }}
              />
              {selectedFile ? (
                <div className="space-y-1">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500 text-white flex items-center justify-center mx-auto shadow-md">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div className="text-xs font-bold text-slate-900 dark:text-white">
                    {selectedFile.name}
                  </div>
                  <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold">
                    ✓ {(selectedFile.size / (1024 * 1024)).toFixed(1)} MB • Click to change
                  </div>
                </div>
              ) : (
                <div className="space-y-1">
                  <div className="w-10 h-10 rounded-xl bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 flex items-center justify-center mx-auto">
                    <UploadCloud className="w-5 h-5" />
                  </div>
                  <div className="text-xs font-bold text-slate-800 dark:text-slate-200">
                    Click to select or drag & drop PDF file
                  </div>
                  <div className="text-[10px] text-slate-400">
                    Supports Ethiopian textbook PDF documents up to 100MB
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Classification */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                Resource Type *
              </label>
              <select
                value={bookType}
                onChange={(e) => setBookType(e.target.value as BookType)}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-bold text-slate-900 dark:text-white"
              >
                <option value="textbook">📖 Student Textbook</option>
                <option value="teacher_guide">🧑‍🏫 Teacher's Guide (የመምህር መመሪያ)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                Grade Level *
              </label>
              <select
                value={grade}
                onChange={(e) => setGrade(Number(e.target.value) as GradeLevel)}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-bold text-slate-900 dark:text-white"
              >
                <option value={12}>Grade 12 (ESSLCE / Matric)</option>
                <option value={11}>Grade 11 (Preparatory)</option>
                <option value={10}>Grade 10 (Secondary)</option>
                <option value={9}>Grade 9 (Secondary)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                Stream Specialization
              </label>
              <select
                value={stream}
                onChange={(e) => setStream(e.target.value as AcademicStream)}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-bold text-slate-900 dark:text-white"
              >
                <option value="all">Common / All Streams</option>
                <option value="natural_science">🔬 Natural Science</option>
                <option value="social_science">📈 Social Science</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                Subject Category *
              </label>
              <select
                value={subject}
                onChange={(e) => setSubject(e.target.value as SubjectCategory)}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-bold text-slate-900 dark:text-white"
              >
                {ETHIOPIAN_SUBJECTS.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                Language Medium *
              </label>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value as LanguageCode)}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-bold text-slate-900 dark:text-white"
              >
                <option value="en">English</option>
                <option value="am">Amharic (አማርኛ)</option>
                <option value="om">Afaan Oromoo</option>
                <option value="ti">Tigrinya (ትግርኛ)</option>
                <option value="so">Somali (Af-Soomaali)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                Regional State *
              </label>
              <select
                value={regionId}
                onChange={(e) => setRegionId(e.target.value as RegionId)}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-bold text-slate-900 dark:text-white"
              >
                {ETHIOPIAN_REGIONS.map((r) => (
                  <option key={r.id} value={r.id}>
                    {r.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Multilingual Titles */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                Textbook Title (English / Latin) *
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Mathematics Grade 12 Natural Science Student Textbook"
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-medium text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                Amharic Title (አማርኛ ርዕስ)
              </label>
              <input
                type="text"
                value={titleAmharic}
                onChange={(e) => setTitleAmharic(e.target.value)}
                placeholder="ምሳሌ፡ ሒሳብ 12ኛ ክፍል የተማሪ መጽሐፍ"
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-medium text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                Afaan Oromoo Title
              </label>
              <input
                type="text"
                value={titleOromo}
                onChange={(e) => setTitleOromo(e.target.value)}
                placeholder="fakkeenya: Fiiziksii Kutaa 12 Kitaaba Barataa"
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-medium text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                Tigrinya / Somali Title
              </label>
              <input
                type="text"
                value={titleTigrinya || titleSomali}
                onChange={(e) => {
                  setTitleTigrinya(e.target.value);
                  setTitleSomali(e.target.value);
                }}
                placeholder="Tigrinya / Somali Title"
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-medium text-slate-900 dark:text-white focus:ring-2 focus:ring-emerald-500"
              />
            </div>
          </div>

          {/* Color Presets */}
          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              Cover Theme Color
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {COLOR_PRESETS.map((preset) => (
                <button
                  type="button"
                  key={preset.name}
                  onClick={() => {
                    setCoverColor(preset.value);
                    setAccentColor(preset.accent);
                  }}
                  className={`p-2.5 rounded-xl border flex items-center gap-2 transition-all ${
                    coverColor === preset.value
                      ? 'border-emerald-500 ring-2 ring-emerald-500 bg-slate-50 dark:bg-slate-800'
                      : 'border-slate-200 dark:border-slate-800 hover:border-slate-400'
                  }`}
                >
                  <div className={`w-5 h-5 rounded-lg bg-gradient-to-br ${preset.value}`} />
                  <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                    {preset.name}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Submit Action */}
          <div className="pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 text-xs font-bold rounded-xl"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isUploading}
              className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs rounded-xl shadow-md transition-all active:scale-95 flex items-center gap-2"
            >
              {isUploading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>
                    {isExtractingNotes ? 'Extracting Notes from PDF...' : 'Saving Textbook...'}
                  </span>
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Upload & Publish to App</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
