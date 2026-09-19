import React, { useState } from 'react';
import { X, Award, Clock, Sparkles, CheckCircle2, Zap, Trophy, Rocket, ShieldCheck } from 'lucide-react';

interface ExamConfigModalProps {
  isOpen: boolean;
  onClose: () => void;
  examTitle: string;
  availableQuestionsCount: number;
  onConfirmStart: (selectedCount: number, timeLimitMinutes: number, bestOfBest: boolean) => void;
}

interface QuestionCountOption {
  count: number;
  label: string;
  timeLimitMinutes: number;
  tag: string;
  description: string;
  icon: React.ElementType;
  badgeColor: string;
}

const QUESTION_OPTIONS: QuestionCountOption[] = [
  {
    count: 10,
    label: '10 Questions',
    timeLimitMinutes: 15,
    tag: 'Quick Drill',
    description: 'Fast high-yield warmup covering essential exam concepts & formulas.',
    icon: Zap,
    badgeColor: 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/30',
  },
  {
    count: 50,
    label: '50 Questions',
    timeLimitMinutes: 60,
    tag: 'Standard Paper',
    description: 'Official standard examination length with rigorous topic distribution.',
    icon: CheckCircle2,
    badgeColor: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/30',
  },
  {
    count: 100,
    label: '100 Questions',
    timeLimitMinutes: 120,
    tag: 'Full Mock Exam',
    description: 'Comprehensive entrance exam simulation across all Grades 9–12 units.',
    icon: Trophy,
    badgeColor: 'bg-sky-500/10 text-sky-600 dark:text-sky-400 border-sky-500/30',
  },
  {
    count: 200,
    label: '200 Questions',
    timeLimitMinutes: 240,
    tag: 'Marathon Mastery',
    description: 'Exhaustive university entrance question bank drill for maximum score.',
    icon: Rocket,
    badgeColor: 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border-purple-500/30',
  },
];

export const ExamConfigModal: React.FC<ExamConfigModalProps> = ({
  isOpen,
  onClose,
  examTitle,
  availableQuestionsCount,
  onConfirmStart,
}) => {
  const [selectedCount, setSelectedCount] = useState<number>(50);
  const [bestOfBestOnly, setBestOfBestOnly] = useState<boolean>(true);

  if (!isOpen) return null;

  const currentOption = QUESTION_OPTIONS.find((o) => o.count === selectedCount) || QUESTION_OPTIONS[1];

  const handleStart = () => {
    onConfirmStart(selectedCount, currentOption.timeLimitMinutes, bestOfBestOnly);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 rounded-3xl max-w-xl w-full border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">
        {/* Top Ethiopian Accent Bar */}
        <div className="h-1.5 w-full ethio-gradient-bar shrink-0" />

        {/* Modal Header */}
        <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-start justify-between gap-4 shrink-0">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 rounded-full text-[11px] font-black border border-emerald-300 dark:border-emerald-800">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Grade 12 EUEE Preparation</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
              Select Question Count
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-1">
              {examTitle}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-2xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 overflow-y-auto flex-1">
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 block">
              How many questions would you like to practice?
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {QUESTION_OPTIONS.map((opt) => {
                const Icon = opt.icon;
                const isSelected = selectedCount === opt.count;
                return (
                  <div
                    key={opt.count}
                    onClick={() => setSelectedCount(opt.count)}
                    className={`p-4 rounded-2xl border-2 transition-all cursor-pointer select-none relative flex flex-col justify-between ${
                      isSelected
                        ? 'border-emerald-600 bg-emerald-50/50 dark:bg-emerald-950/30 shadow-md ring-2 ring-emerald-500/20'
                        : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 bg-slate-50/50 dark:bg-slate-800/30'
                    }`}
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-black border ${opt.badgeColor}`}>
                          {opt.tag}
                        </span>
                        <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                          isSelected
                            ? 'border-emerald-600 bg-emerald-600 text-white'
                            : 'border-slate-400'
                        }`}>
                          {isSelected && <div className="w-1.5 h-1.5 bg-white rounded-full" />}
                        </div>
                      </div>

                      <div className="flex items-baseline gap-2">
                        <h4 className="text-xl font-black text-slate-900 dark:text-white">
                          {opt.count}
                        </h4>
                        <span className="text-xs font-bold text-slate-500">Questions</span>
                      </div>

                      <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                        {opt.description}
                      </p>
                    </div>

                    <div className="flex items-center gap-1.5 text-[11px] font-bold text-slate-600 dark:text-slate-300 pt-3 border-t border-slate-200/60 dark:border-slate-800/60 mt-3">
                      <Clock className="w-3.5 h-3.5 text-amber-500" />
                      <span>{opt.timeLimitMinutes} Minutes</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Best of Best High-Yield Priority Box */}
          <div
            onClick={() => setBestOfBestOnly(!bestOfBestOnly)}
            className="p-4 rounded-2xl bg-gradient-to-r from-amber-500/10 via-yellow-500/10 to-emerald-500/10 border border-amber-500/30 flex items-center justify-between gap-3 cursor-pointer select-none transition-all hover:bg-amber-500/15"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <div className="space-y-0.5">
                <div className="text-xs font-black text-slate-900 dark:text-white flex items-center gap-1.5">
                  <span>Best of Best High-Yield Questions</span>
                  <span className="px-1.5 py-0.2 bg-amber-500 text-slate-950 text-[10px] font-black rounded-md">
                    MoE Verified
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Prioritize official entrance questions with step-by-step solutions & formulas.
                </p>
              </div>
            </div>

            <div className={`w-5 h-5 rounded-lg border flex items-center justify-center shrink-0 ${
              bestOfBestOnly
                ? 'bg-emerald-600 border-emerald-600 text-white'
                : 'border-slate-400'
            }`}>
              {bestOfBestOnly && <CheckCircle2 className="w-4 h-4" />}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-6 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <div className="text-xs text-slate-500 flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-amber-500" />
            <span>Allowed Time: <strong className="text-slate-800 dark:text-slate-200">{currentOption.timeLimitMinutes} Mins</strong></span>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="flex-1 sm:flex-none px-5 py-3 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-extrabold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleStart}
              className="flex-1 sm:flex-none px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-black rounded-xl shadow-lg shadow-emerald-600/25 active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              <Award className="w-4 h-4" />
              <span>Start Exam ({selectedCount} Questions)</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
