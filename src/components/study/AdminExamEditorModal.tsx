import React, { useState, useEffect } from 'react';
import { ExamPack, QuizQuestion, ExamStream } from '../../types/quiz';
import { GradeLevel, SubjectCategory } from '../../types/book';
import { ETHIOPIAN_SUBJECTS } from '../../data/subjects';
import { QuizGeneratorService } from '../../services/quizGeneratorService';
import {
  X,
  Plus,
  Trash2,
  Save,
  Clock,
  BookOpen,
  Sparkles,
  HelpCircle,
  CheckCircle,
  Award,
} from 'lucide-react';

interface AdminExamEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  examPack?: ExamPack | null;
  editingPack?: ExamPack | null;
  currentGrade?: GradeLevel;
  currentSubject?: SubjectCategory;
  onSave: (savedPack: ExamPack) => void;
}

export const AdminExamEditorModal: React.FC<AdminExamEditorModalProps> = ({
  isOpen,
  onClose,
  examPack,
  editingPack,
  currentGrade = 12,
  currentSubject = 'physics',
  onSave,
}) => {
  const activePack = examPack || editingPack || null;
  const [title, setTitle] = useState('');
  const [titleOromo, setTitleOromo] = useState('');
  const [titleAmharic, setTitleAmharic] = useState('');
  const [description, setDescription] = useState('');
  const [grade, setGrade] = useState<GradeLevel>(currentGrade);
  const [stream, setStream] = useState<ExamStream>('natural_science');
  const [subject, setSubject] = useState<SubjectCategory | 'all'>(currentSubject);
  const [language, setLanguage] = useState<string>('en');
  const [timeLimitMinutes, setTimeLimitMinutes] = useState<number>(60);
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);

  useEffect(() => {
    if (activePack) {
      setTitle(activePack.title || '');
      setTitleOromo(activePack.titleOromo || '');
      setTitleAmharic(activePack.titleAmharic || '');
      setDescription(activePack.description || '');
      setGrade(activePack.grade || currentGrade);
      setStream(activePack.stream || 'natural_science');
      setSubject(activePack.subject || currentSubject);
      setLanguage(activePack.language || 'en');
      setTimeLimitMinutes(activePack.timeLimitMinutes || 60);
      setQuestions(activePack.questions ? [...activePack.questions] : []);
    } else {
      setTitle('');
      setTitleOromo('');
      setTitleAmharic('');
      setDescription('');
      setGrade(currentGrade);
      setStream('natural_science');
      setSubject(currentSubject);
      setLanguage('en');
      setTimeLimitMinutes(60);
      setQuestions([]);
    }
  }, [activePack, currentGrade, currentSubject, isOpen]);

  if (!isOpen) return null;

  const handleAddBlankQuestion = () => {
    const newQ: QuizQuestion = {
      id: `q-custom-${Date.now()}-${questions.length + 1}`,
      grade,
      subject: (subject === 'all' ? 'mathematics' : subject) as SubjectCategory,
      unitNumber: 1,
      question: '',
      questionOromo: '',
      questionAmharic: '',
      options: ['Option A', 'Option B', 'Option C', 'Option D'],
      optionsOromo: ['Filannoo A', 'Filannoo B', 'Filannoo C', 'Filannoo D'],
      optionsAmharic: ['ምርጫ ሀ', 'ምርጫ ለ', 'ምርጫ ሐ', 'ምርጫ መ'],
      correctOptionIndex: 0,
      explanation: '',
      explanationOromo: '',
      explanationAmharic: '',
      difficulty: 'medium',
      isMinistryExamSample: true,
    };
    setQuestions([...questions, newQ]);
  };

  const handleAutoGenerateQuestions = async (count: 25 | 50 | 100) => {
    const tempBook: any = {
      id: `exam-gen-${grade}-${subject}`,
      title: title || 'Ministry Model Exam',
      grade,
      subject: subject === 'all' ? 'mathematics' : subject,
      language,
    };

    const autoQs = await QuizGeneratorService.extractBookExercisesFromPdf(null, tempBook, count, 'all');

    // Ensure questions are strictly formatted for the chosen language
    const formatted = autoQs.map((q) => {
      const qText = language === 'am' ? (q.questionAmharic || q.question) : language === 'om' ? (q.questionOromo || q.question) : q.question;
      const opts = language === 'am' ? (q.optionsAmharic || q.options) : language === 'om' ? (q.optionsOromo || q.options) : q.options;
      const exp = language === 'am' ? (q.explanationAmharic || q.explanation) : language === 'om' ? (q.explanationOromo || q.explanation) : q.explanation;

      return {
        ...q,
        question: qText,
        options: opts,
        explanation: exp,
      };
    });

    setQuestions(formatted);
  };

  const handleUpdateQuestion = (index: number, updated: Partial<QuizQuestion>) => {
    const updatedQs = [...questions];
    updatedQs[index] = { ...updatedQs[index], ...updated };
    setQuestions(updatedQs);
  };

  const handleUpdateOption = (qIdx: number, optIdx: number, text: string) => {
    const updatedQs = [...questions];
    const q = updatedQs[qIdx];
    const opts = [...q.options];
    opts[optIdx] = text;
    q.options = opts;

    if (language === 'om') {
      const optsOm = [...(q.optionsOromo || q.options)];
      optsOm[optIdx] = text;
      q.optionsOromo = optsOm;
    } else if (language === 'am') {
      const optsAm = [...(q.optionsAmharic || q.options)];
      optsAm[optIdx] = text;
      q.optionsAmharic = optsAm;
    }

    setQuestions(updatedQs);
  };

  const handleDeleteQuestion = (index: number) => {
    setQuestions(questions.filter((_, idx) => idx !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      alert('Please enter an exam title.');
      return;
    }

    const saved: ExamPack = {
      id: examPack?.id || `custom-exam-${Date.now()}`,
      title,
      titleOromo: titleOromo || title,
      titleAmharic: titleAmharic || title,
      description,
      grade,
      stream,
      isEsslceExam: grade === 12,
      subject,
      language,
      timeLimitMinutes,
      questions,
      isCustom: true,
    };

    onSave(saved);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-slate-900 rounded-3xl max-w-4xl w-full shadow-2xl border border-slate-800 flex flex-col my-auto max-h-[92vh] text-slate-100 overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-slate-800 bg-slate-950/90 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500 text-slate-950 flex items-center justify-center font-black shadow-lg">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-base sm:text-lg text-white">
                {examPack ? 'Edit EUEE / Model Exam Pack' : 'Create New EUEE / Model Exam Pack'}
              </h3>
              <p className="text-xs text-amber-400 font-bold">
                Grade 12 University Entrance & Preparatory Exam Configuration
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

        {/* Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-6 flex-1">
          {/* Basic Info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-xs font-bold text-slate-300 mb-1">
                Exam Title (English / Universal) *
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Grade 12 EUEE National Physics Model Entrance Exam"
                className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-2xl text-xs text-white focus:ring-2 focus:ring-amber-500 focus:outline-none"
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
                placeholder="e.g. Qormaata Shaakalaa Fiiziksii Seensaa Yuunivarsitii Kutaa 12ffaa"
                className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-2xl text-xs text-white focus:ring-2 focus:ring-amber-500 focus:outline-none"
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
                placeholder="e.g. የ 12ኛ ክፍል ማትሪክ የፊዚክስ ሞዴል ፈተና"
                className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-2xl text-xs text-white focus:ring-2 focus:ring-amber-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">
                Grade Level
              </label>
              <select
                value={grade}
                onChange={(e) => setGrade(Number(e.target.value) as GradeLevel)}
                className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-2xl text-xs text-white focus:ring-2 focus:ring-amber-500 focus:outline-none"
              >
                <option value={12}>Grade 12 (EUEE / Matric)</option>
                <option value={11}>Grade 11 (Preparatory Model)</option>
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
                onChange={(e) => setStream(e.target.value as ExamStream)}
                className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-2xl text-xs text-white focus:ring-2 focus:ring-amber-500 focus:outline-none"
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
                onChange={(e) => setSubject(e.target.value as SubjectCategory | 'all')}
                className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-2xl text-xs text-white focus:ring-2 focus:ring-amber-500 focus:outline-none"
              >
                <option value="all">Comprehensive (All Subjects Combined)</option>
                {ETHIOPIAN_SUBJECTS.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name} ({s.nameAmharic})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">
                Language
              </label>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-2xl text-xs text-white focus:ring-2 focus:ring-amber-500 focus:outline-none"
              >
                <option value="om">Afaan Oromoo (Oromia)</option>
                <option value="am">Amharic (አማርኛ)</option>
                <option value="en">English (National)</option>
                <option value="ti">Tigrinya (ትግርኛ)</option>
                <option value="so">Somali (Af-Soomaali)</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-300 mb-1">
                Time Limit (Minutes)
              </label>
              <input
                type="number"
                min={5}
                max={180}
                value={timeLimitMinutes}
                onChange={(e) => setTimeLimitMinutes(Number(e.target.value))}
                className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-2xl text-xs text-white focus:ring-2 focus:ring-amber-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 mb-1">
              Description / Instructions
            </label>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Instructions for students taking this model exam..."
              className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-2xl text-xs text-white focus:ring-2 focus:ring-amber-500 focus:outline-none resize-none"
            />
          </div>

          {/* Question List Section */}
          <div className="pt-4 border-t border-slate-800 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h4 className="font-extrabold text-sm text-white">
                  Exam Questions ({questions.length})
                </h4>
                <p className="text-[11px] text-slate-400">
                  Add custom questions or generate verified curriculum questions.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleAutoGenerateQuestions(25)}
                  className="px-2.5 py-1.5 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 rounded-xl text-xs font-bold flex items-center gap-1 transition-all"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>25 Qs</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleAutoGenerateQuestions(50)}
                  className="px-2.5 py-1.5 bg-amber-500/30 hover:bg-amber-500/40 text-amber-300 border border-amber-500/50 rounded-xl text-xs font-bold flex items-center gap-1 transition-all"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>50 Qs</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleAutoGenerateQuestions(100)}
                  className="px-2.5 py-1.5 bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-slate-950 rounded-xl text-xs font-black flex items-center gap-1 transition-all shadow-md"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>100 Qs</span>
                </button>

                <button
                  type="button"
                  onClick={handleAddBlankQuestion}
                  className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold flex items-center gap-1 transition-all shadow-sm"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Question</span>
                </button>
              </div>
            </div>

            {questions.length === 0 ? (
              <div className="text-center py-10 bg-slate-950/60 rounded-3xl border border-slate-800 text-slate-400 text-xs space-y-2">
                <BookOpen className="w-8 h-8 mx-auto text-slate-600" />
                <div>No questions added yet. Click &quot;Add Question&quot; or &quot;Auto-Fill 25 Verified Qs&quot; above.</div>
              </div>
            ) : (
              <div className="space-y-4 max-h-96 overflow-y-auto pr-1">
                {questions.map((q, idx) => {
                  const qText = language === 'om' ? (q.questionOromo || q.question) : language === 'am' ? (q.questionAmharic || q.question) : q.question;
                  const opts = language === 'om' ? (q.optionsOromo || q.options) : language === 'am' ? (q.optionsAmharic || q.options) : q.options;

                  return (
                    <div
                      key={q.id || idx}
                      className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-3"
                    >
                      <div className="flex items-center justify-between">
                        <span className="px-2.5 py-0.5 bg-emerald-950 text-emerald-400 font-bold text-xs rounded-lg border border-emerald-800">
                          Question {idx + 1}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleDeleteQuestion(idx)}
                          className="p-1.5 text-rose-400 hover:bg-rose-950/60 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      <input
                        type="text"
                        value={qText}
                        onChange={(e) => {
                          if (language === 'om') handleUpdateQuestion(idx, { questionOromo: e.target.value, question: e.target.value });
                          else if (language === 'am') handleUpdateQuestion(idx, { questionAmharic: e.target.value, question: e.target.value });
                          else handleUpdateQuestion(idx, { question: e.target.value });
                        }}
                        placeholder={`Enter question text in ${language.toUpperCase()}...`}
                        className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white focus:ring-2 focus:ring-amber-500 focus:outline-none"
                      />

                      {/* 4 Choices */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {[0, 1, 2, 3].map((optIdx) => {
                          const isCorrect = q.correctOptionIndex === optIdx;
                          return (
                            <div key={optIdx} className="flex items-center gap-2">
                              <button
                                type="button"
                                onClick={() => handleUpdateQuestion(idx, { correctOptionIndex: optIdx })}
                                className={`w-6 h-6 rounded-lg text-xs font-black shrink-0 flex items-center justify-center transition-all ${
                                  isCorrect
                                    ? 'bg-emerald-500 text-slate-950 ring-2 ring-emerald-400'
                                    : 'bg-slate-800 text-slate-400 hover:bg-slate-700'
                                }`}
                                title="Click to mark as correct answer"
                              >
                                {String.fromCharCode(65 + optIdx)}
                              </button>
                              <input
                                type="text"
                                value={opts[optIdx] || ''}
                                onChange={(e) => handleUpdateOption(idx, optIdx, e.target.value)}
                                placeholder={`Choice ${String.fromCharCode(65 + optIdx)}`}
                                className={`flex-1 px-3 py-1.5 bg-slate-900 border rounded-xl text-xs text-white focus:outline-none ${
                                  isCorrect ? 'border-emerald-500/80 bg-emerald-950/20' : 'border-slate-800'
                                }`}
                              />
                            </div>
                          );
                        })}
                      </div>

                      {/* Explanation */}
                      <input
                        type="text"
                        value={language === 'om' ? (q.explanationOromo || q.explanation) : language === 'am' ? (q.explanationAmharic || q.explanation) : q.explanation}
                        onChange={(e) => {
                          if (language === 'om') handleUpdateQuestion(idx, { explanationOromo: e.target.value, explanation: e.target.value });
                          else if (language === 'am') handleUpdateQuestion(idx, { explanationAmharic: e.target.value, explanation: e.target.value });
                          else handleUpdateQuestion(idx, { explanation: e.target.value });
                        }}
                        placeholder="Step-by-step solution / explanation..."
                        className="w-full px-3 py-1.5 bg-slate-900/80 border border-slate-800 rounded-xl text-[11px] text-slate-300 focus:outline-none"
                      />
                    </div>
                  );
                })}
              </div>
            )}
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
              className="px-6 py-2.5 bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 text-slate-950 font-black text-xs rounded-2xl shadow-lg transition-all active:scale-95 flex items-center gap-1.5"
            >
              <Save className="w-4 h-4" />
              <span>Save Exam Pack</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
