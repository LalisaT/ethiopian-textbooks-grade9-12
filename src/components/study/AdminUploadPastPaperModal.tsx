import React, { useState } from 'react';
import { PastExamPaper } from '../../types/quiz';
import { GradeLevel, SubjectCategory, AcademicStream } from '../../types/book';
import { ETHIOPIAN_SUBJECTS } from '../../data/subjects';
import {
  X,
  UploadCloud,
  FileText,
  Save,
  CheckCircle,
  AlertCircle,
  FileUp,
} from 'lucide-react';

interface AdminUploadPastPaperModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentGrade?: GradeLevel;
  onSave: (paper: PastExamPaper) => void;
}

export const AdminUploadPastPaperModal: React.FC<AdminUploadPastPaperModalProps> = ({
  isOpen,
  onClose,
  currentGrade = 12,
  onSave,
}) => {
  const [title, setTitle] = useState('');
  const [titleOromo, setTitleOromo] = useState('');
  const [titleAmharic, setTitleAmharic] = useState('');
  const [grade, setGrade] = useState<GradeLevel>(currentGrade);
  const [stream, setStream] = useState<AcademicStream>('natural_science');
  const [subject, setSubject] = useState<SubjectCategory>('physics');
  const [year, setYear] = useState<number>(2016);
  const [region, setRegion] = useState('National');
  const [language, setLanguage] = useState('en');
  const [totalQuestions, setTotalQuestions] = useState<number>(60);
  const [timeAllowedMinutes, setTimeAllowedMinutes] = useState<number>(120);
  const [hasAnswerKey, setHasAnswerKey] = useState<boolean>(true);
  const [description, setDescription] = useState('');
  const [selectedFileName, setSelectedFileName] = useState('');
  const [fileSize, setFileSize] = useState('3.2 MB');

  if (!isOpen) return null;

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFileName(file.name);
      const sizeMb = (file.size / (1024 * 1024)).toFixed(1);
      setFileSize(`${sizeMb} MB`);
      if (!title) {
        setTitle(file.name.replace(/\.pdf$/i, '').replace(/[-_]/g, ' '));
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      alert('Please enter a paper title.');
      return;
    }

    const newPaper: PastExamPaper = {
      id: `past-custom-${Date.now()}`,
      title,
      titleOromo: titleOromo || title,
      titleAmharic: titleAmharic || title,
      grade,
      stream,
      isEsslce: grade === 12,
      subject,
      year,
      region,
      language,
      totalQuestions,
      timeAllowedMinutes,
      hasAnswerKey,
      fileSize,
      description,
      isCustomUploaded: true,
    };

    onSave(newPaper);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-slate-900 rounded-3xl max-w-2xl w-full shadow-2xl border border-slate-800 flex flex-col my-auto max-h-[92vh] text-slate-100 overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-slate-800 bg-slate-950/90 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-500 text-slate-950 flex items-center justify-center font-black shadow-lg">
              <UploadCloud className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-base sm:text-lg text-white">
                Upload Past EUEE / Grade 12 National Exam Paper
              </h3>
              <p className="text-xs text-blue-400 font-bold">
                Grade 12 University Entrance & Preparatory Resource Center
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-5 flex-1">
          {/* File Upload Zone */}
          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1.5">
              Select Exam Paper PDF File
            </label>
            <label className="border-2 border-dashed border-slate-700 hover:border-blue-500 bg-slate-950/80 rounded-2xl p-5 flex flex-col items-center justify-center cursor-pointer transition-all text-center group">
              <FileUp className="w-8 h-8 text-slate-500 group-hover:text-blue-400 mb-2 transition-colors" />
              <div className="text-xs font-bold text-slate-200">
                {selectedFileName ? (
                  <span className="text-emerald-400">{selectedFileName} ({fileSize})</span>
                ) : (
                  <span>Click to select PDF or drag & drop past exam paper</span>
                )}
              </div>
              <p className="text-[11px] text-slate-500 mt-1">Supports Grade 12 EUEE & Preparatory PDF test papers</p>
              <input
                type="file"
                accept=".pdf"
                onChange={handleFileSelect}
                className="hidden"
              />
            </label>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-slate-300 mb-1">
                Paper Title (Universal) *
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. 2016 E.C. Grade 12 Physics EUEE National Entrance Exam"
                className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-2xl text-xs text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">
                Afaan Oromoo Title (Optional)
              </label>
              <input
                type="text"
                value={titleOromo}
                onChange={(e) => setTitleOromo(e.target.value)}
                placeholder="e.g. Qormaata Biyyooleessaa Seensaa Fiiziksii 2016 E.C."
                className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-2xl text-xs text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">
                Amharic Title (Optional)
              </label>
              <input
                type="text"
                value={titleAmharic}
                onChange={(e) => setTitleAmharic(e.target.value)}
                placeholder="e.g. የ 2016 ዓ.ም የ 12ኛ ክፍል ፊዚክስ ማትሪክ ሀገር አቀፍ ፈተና"
                className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-2xl text-xs text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">
                Grade Level
              </label>
              <select
                value={grade}
                onChange={(e) => setGrade(Number(e.target.value) as GradeLevel)}
                className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-2xl text-xs text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                <option value={12}>Grade 12 (EUEE / Matric)</option>
                <option value={11}>Grade 11 (Preparatory Model Exam)</option>
                <option value={10}>Grade 10 (Secondary Model)</option>
                <option value={9}>Grade 9 (Secondary Model)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">
                Stream Specialization
              </label>
              <select
                value={stream}
                onChange={(e) => setStream(e.target.value as AcademicStream)}
                className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-2xl text-xs text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                <option value="all">Common / All Streams</option>
                <option value="natural_science">Natural Science</option>
                <option value="social_science">Social Science</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">
                Subject
              </label>
              <select
                value={subject}
                onChange={(e) => setSubject(e.target.value as SubjectCategory)}
                className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-2xl text-xs text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                {ETHIOPIAN_SUBJECTS.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name} ({s.nameAmharic})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">
                Examination Year (E.C.)
              </label>
              <select
                value={year}
                onChange={(e) => setYear(Number(e.target.value))}
                className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-2xl text-xs text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                <option value={2016}>2016 E.C. (2024)</option>
                <option value={2015}>2015 E.C. (2023)</option>
                <option value={2014}>2014 E.C. (2022)</option>
                <option value={2013}>2013 E.C. (2021)</option>
                <option value={2012}>2012 E.C. (2020)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">
                Region / Administration
              </label>
              <select
                value={region}
                onChange={(e) => setRegion(e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-2xl text-xs text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                <option value="Oromia">Oromia Regional State</option>
                <option value="National">National Ministry (Federal)</option>
                <option value="Addis Ababa">Addis Ababa City Admin</option>
                <option value="Amhara">Amhara Regional State</option>
                <option value="Tigray">Tigray Regional State</option>
                <option value="Somali">Somali Regional State</option>
                <option value="Sidama">Sidama Regional State</option>
                <option value="Dire Dawa">Dire Dawa City Admin</option>
                <option value="Harari">Harari Regional State</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">
                Language
              </label>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-2xl text-xs text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
              >
                <option value="om">Afaan Oromoo</option>
                <option value="am">Amharic (አማርኛ)</option>
                <option value="en">English</option>
                <option value="ti">Tigrinya (ትግርኛ)</option>
                <option value="so">Somali (Af-Soomaali)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">
                Total Questions
              </label>
              <input
                type="number"
                value={totalQuestions}
                onChange={(e) => setTotalQuestions(Number(e.target.value))}
                className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-2xl text-xs text-white focus:ring-2 focus:ring-blue-500 focus:outline-none"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 pt-1">
            <input
              type="checkbox"
              id="hasAnsKey"
              checked={hasAnswerKey}
              onChange={(e) => setHasAnswerKey(e.target.checked)}
              className="w-4 h-4 rounded text-blue-500 bg-slate-950 border-slate-800 focus:ring-blue-500"
            />
            <label htmlFor="hasAnsKey" className="text-xs text-slate-300 font-bold cursor-pointer">
              Includes Official Answer Key & Step-by-Step Solutions
            </label>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1">
              Description & Study Notes
            </label>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Important notes, curriculum syllabus references, or examination guidelines..."
              className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-2xl text-xs text-white focus:ring-2 focus:ring-blue-500 focus:outline-none resize-none"
            />
          </div>

          {/* Footer Controls */}
          <div className="pt-4 border-t border-slate-800 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-2xl text-xs font-bold transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-black text-xs rounded-2xl shadow-lg transition-all active:scale-95 flex items-center gap-1.5"
            >
              <Save className="w-4 h-4" />
              <span>Save & Publish Past Paper</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
