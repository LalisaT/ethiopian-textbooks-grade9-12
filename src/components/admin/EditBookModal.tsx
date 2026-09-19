import React, { useState, useRef } from 'react';
import { Book, BookType, GradeLevel, RegionId, SubjectCategory, LanguageCode, AcademicStream } from '../../types/book';
import { ETHIOPIAN_REGIONS } from '../../data/regions';
import { ETHIOPIAN_SUBJECTS } from '../../data/subjects';
import { DbService } from '../../services/dbService';
import {
  X,
  Edit3,
  UploadCloud,
  FileText,
  CheckCircle2,
  AlertCircle,
  Palette,
  Loader2,
} from 'lucide-react';

interface EditBookModalProps {
  isOpen: boolean;
  book: Book | null;
  onClose: () => void;
  onBookUpdated: (updatedBook: Book) => void;
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

export const EditBookModal: React.FC<EditBookModalProps> = ({
  isOpen,
  book,
  onClose,
  onBookUpdated,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Initial State from Book
  const [bookType, setBookType] = useState<BookType>(book?.bookType || 'textbook');
  const [title, setTitle] = useState(book?.title || '');
  const [titleAmharic, setTitleAmharic] = useState(book?.titleAmharic || '');
  const [titleOromo, setTitleOromo] = useState(book?.titleOromo || '');
  const [titleTigrinya, setTitleTigrinya] = useState(book?.titleTigrinya || '');
  const [titleSomali, setTitleSomali] = useState(book?.titleSomali || '');
  const [grade, setGrade] = useState<GradeLevel>(book?.grade || 12);
  const [stream, setStream] = useState<AcademicStream>(book?.stream || 'all');
  const [subject, setSubject] = useState<SubjectCategory>(book?.subject || 'physics');
  const [regionId, setRegionId] = useState<RegionId>(book?.regionId || 'national');
  const [language, setLanguage] = useState<LanguageCode>(book?.language || 'en');
  const [editionYear, setEditionYear] = useState<number>(book?.editionYear || 2024);
  const [curriculum, setCurriculum] = useState<Book['curriculum']>(
    book?.curriculum || 'New Curriculum (2023+)'
  );
  const [totalUnits, setTotalUnits] = useState<number>(book?.totalUnits || 6);
  const [totalEstimatedPages, setTotalEstimatedPages] = useState<number>(
    book?.totalEstimatedPages || 180
  );
  const [description, setDescription] = useState(book?.description || '');
  const [coverColor, setCoverColor] = useState(book?.coverColor || COLOR_PRESETS[0].value);
  const [accentColor, setAccentColor] = useState(book?.accentColor || COLOR_PRESETS[0].accent);

  if (!isOpen || !book) return null;

  const handleFileChange = (file: File) => {
    if (file.type !== 'application/pdf' && !file.name.toLowerCase().endsWith('.pdf')) {
      setErrorMsg('Please upload a valid PDF file (.pdf)');
      return;
    }
    setErrorMsg('');
    setSelectedFile(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      setErrorMsg('Title cannot be empty');
      return;
    }

    setIsSaving(true);
    setErrorMsg('');

    try {
      const fileSizeMb = selectedFile
        ? Math.round((selectedFile.size / (1024 * 1024)) * 10) / 10
        : book.fileSizeMb;

      const updated: Book = {
        ...book,
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
        totalUnits: Number(totalUnits) || 6,
        totalEstimatedPages: Number(totalEstimatedPages) || 180,
        description: description.trim(),
        fileSizeMb,
      };

      await DbService.saveEditedBook(updated, selectedFile || undefined);

      onBookUpdated(updated);
      onClose();
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to update textbook');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-3xl w-full shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col my-auto max-h-[92vh]">
        {/* Header */}
        <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-slate-50 dark:bg-slate-950">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500 text-slate-950 flex items-center justify-center font-black shadow-md">
              <Edit3 className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-base text-slate-900 dark:text-white flex items-center gap-2">
                <span>Customize Textbook: {book.title}</span>
              </h3>
              <p className="text-xs text-slate-500">
                Edit titles, grade level, language medium, cover gradient, or replace the PDF file
              </p>
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

          {/* Replace PDF */}
          <div className="space-y-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              Replace Textbook PDF (Optional)
            </label>
            <div
              onClick={() => fileInputRef.current?.click()}
              className="cursor-pointer p-4 rounded-2xl border-2 border-dashed border-slate-300 dark:border-slate-700 hover:border-amber-400 bg-slate-50 dark:bg-slate-800/40 text-center flex items-center justify-center gap-3"
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
              <UploadCloud className="w-5 h-5 text-amber-500" />
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                {selectedFile ? `Selected: ${selectedFile.name}` : 'Click to replace PDF file'}
              </span>
            </div>
          </div>

          {/* Classification */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                Resource Type
              </label>
              <select
                value={bookType}
                onChange={(e) => setBookType(e.target.value as BookType)}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-bold text-slate-900 dark:text-white"
              >
                <option value="textbook">Student Textbook</option>
                <option value="teacher_guide">Teacher's Guide (የመምህር መመሪያ)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                Grade Level
              </label>
              <select
                value={grade}
                onChange={(e) => setGrade(Number(e.target.value) as GradeLevel)}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-bold text-slate-900 dark:text-white"
              >
                <option value={12}>Grade 12 (EUEE / Matric)</option>
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
                <option value="natural_science">Natural Science</option>
                <option value="social_science">Social Science</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                Subject
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
                Language
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
                Region
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
                Main Title *
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-medium text-slate-900 dark:text-white"
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
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-medium text-slate-900 dark:text-white"
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
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-medium text-slate-900 dark:text-white"
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
                className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-medium text-slate-900 dark:text-white"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
              Description & Syllabus Outline
            </label>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-xs font-medium text-slate-900 dark:text-white"
            />
          </div>

          {/* Cover Color Preset */}
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
                      ? 'border-amber-500 ring-2 ring-amber-500 bg-slate-50 dark:bg-slate-800'
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

          {/* Submit */}
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
              disabled={isSaving}
              className="px-6 py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-xs rounded-xl shadow-md transition-all active:scale-95 flex items-center gap-2"
            >
              {isSaving ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Saving Customizations...</span>
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Save All Changes</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
