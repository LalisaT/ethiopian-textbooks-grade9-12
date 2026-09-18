import React, { useState, useEffect } from 'react';
import { QuizQuestion } from '../../types/quiz';
import confetti from 'canvas-confetti';
import {
  X,
  CheckCircle,
  XCircle,
  Award,
  ChevronRight,
  ChevronLeft,
  RotateCcw,
  Clock,
  Check,
  Filter,
  Flame,
  HelpCircle,
} from 'lucide-react';

interface QuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  questions: QuizQuestion[];
  language?: string;
  examLanguage?: string;
  onComplete?: (score: number, total: number) => void;
}

export const QuizModal: React.FC<QuizModalProps> = ({
  isOpen,
  onClose,
  title,
  questions,
  language = 'en',
  examLanguage,
  onComplete,
}) => {
  language = examLanguage || language || 'en';
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [reviewFilter, setReviewFilter] = useState<'all' | 'wrong' | 'correct'>('all');
  const [secondsRemaining, setSecondsRemaining] = useState(questions.length * 60); // 1 min per question

  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(0);
      setSelectedAnswers({});
      setIsSubmitted(false);
      setReviewFilter('all');
      setSecondsRemaining(questions.length * 60);
    }
  }, [isOpen, questions]);

  // Exam Countdown Timer
  useEffect(() => {
    if (!isOpen || isSubmitted) return;
    const timer = setInterval(() => {
      setSecondsRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen, isSubmitted]);

  if (!isOpen || questions.length === 0) return null;

  const currentQ = questions[currentIndex] || questions[0];

  const handleSelectOption = (optIdx: number) => {
    if (isSubmitted) return;
    setSelectedAnswers((prev) => ({
      ...prev,
      [currentIndex]: optIdx,
    }));
  };

  const calculateScore = () => {
    let score = 0;
    questions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctOptionIndex) {
        score += 1;
      }
    });
    return score;
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
    const score = calculateScore();
    if (onComplete) onComplete(score, questions.length);

    if (score / questions.length >= 0.7) {
      try {
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.6 },
        });
      } catch {}
    }
  };

  const handleRestart = () => {
    setSelectedAnswers({});
    setIsSubmitted(false);
    setCurrentIndex(0);
    setReviewFilter('all');
    setSecondsRemaining(questions.length * 60);
  };

  const getQuestionText = (q: QuizQuestion) => {
    if (language === 'om' && q.questionOromo) return q.questionOromo;
    if (language === 'am' && q.questionAmharic) return q.questionAmharic;
    return q.question;
  };

  const getOptions = (q: QuizQuestion) => {
    if (language === 'om' && q.optionsOromo) return q.optionsOromo;
    if (language === 'am' && q.optionsAmharic) return q.optionsAmharic;
    return q.options;
  };

  const getExplanation = (q: QuizQuestion) => {
    if (language === 'om' && q.explanationOromo) return q.explanationOromo;
    if (language === 'am' && q.explanationAmharic) return q.explanationAmharic;
    return q.explanation;
  };

  const score = calculateScore();
  const percent = Math.round((score / questions.length) * 100);
  const answeredCount = Object.keys(selectedAnswers).length;

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainingSecs = secs % 60;
    return `${mins}:${remainingSecs < 10 ? '0' : ''}${remainingSecs}`;
  };

  // Pure Language UI Labels
  const labels = {
    om: {
      questionOf: `Gaaffii ${currentIndex + 1} / ${questions.length}`,
      yourAnswer: 'Deebii kee:',
      notAnswered: 'Hin deebifamne',
      correctAnswer: 'Deebii sirrii:',
      explanation: 'Ibsa:',
      questionReview: 'Irra-Deebii Gaaffilee fi Ibsa',
      excellent: 'Baay’ee Gaarii! Qaxalee Biyyooleessaa!',
      goodTry: 'Shaakala Gaarii! Qabxiikee Fooyyessi!',
      scoreSummary: `Gaaffilee ${questions.length} keessaa ${score} (${percent}%) sirriitti deebisteerta.`,
      retake: 'Irra Deebi’ii Qori',
      prev: 'Gara Duubaa',
      next: 'Gara Fuulduraa',
      submit: 'Qormaata Xumuri',
      all: 'Hunda',
      wrong: 'Kanneen Dogoggorte',
      correct: 'Kanneen Sirriitti Deebiste',
      answered: 'Deebifame',
    },
    am: {
      questionOf: `ጥያቄ ${currentIndex + 1} ከ ${questions.length}`,
      yourAnswer: 'የእርስዎ መልስ:',
      notAnswered: 'አልተመለሰም',
      correctAnswer: 'ትክክለኛ መልስ:',
      explanation: 'ማብራሪያ:',
      questionReview: 'የጥያቄዎች ክለሳ እና ማብራሪያ',
      excellent: 'በጣም ድንቅ ውጤት!',
      goodTry: 'ጥሩ ጥረት! ይቀጥሉ!',
      scoreSummary: `ከ ${questions.length} ጥያቄዎች ውስጥ ${score} (${percent}%) በትክክል መልሰዋል።`,
      retake: 'እንደገና ይሞክሩ',
      prev: 'ቀዳሚ',
      next: 'ቀጣይ',
      submit: 'ፈተናውን ጨርስ',
      all: 'ሁሉም',
      wrong: 'የተሳሳቱት',
      correct: 'ትክክለኛ',
      answered: 'የተመለሰ',
    },
    en: {
      questionOf: `Question ${currentIndex + 1} of ${questions.length}`,
      yourAnswer: 'Your answer:',
      notAnswered: 'Not answered',
      correctAnswer: 'Correct answer:',
      explanation: 'Explanation:',
      questionReview: 'Detailed Question Review & Explanations',
      excellent: 'Excellent! National Honor Roll Score!',
      goodTry: 'Good Practice! Keep Pushing!',
      scoreSummary: `You scored ${score} out of ${questions.length} (${percent}%) correctly.`,
      retake: 'Retake Quiz',
      prev: 'Previous',
      next: 'Next',
      submit: 'Submit Exam',
      all: 'All',
      wrong: 'Incorrect Only',
      correct: 'Correct Only',
      answered: 'Answered',
    },
  }[language === 'om' ? 'om' : language === 'am' ? 'am' : 'en'];

  const filteredQuestions = questions.map((q, idx) => ({ q, idx })).filter(({ q, idx }) => {
    const isCorrect = selectedAnswers[idx] === q.correctOptionIndex;
    if (reviewFilter === 'wrong') return !isCorrect;
    if (reviewFilter === 'correct') return isCorrect;
    return true;
  });

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 overflow-y-auto animate-in fade-in duration-200">
      <div className="bg-slate-900 rounded-3xl max-w-3xl w-full shadow-2xl border border-slate-800 overflow-hidden flex flex-col my-auto max-h-[95vh] text-slate-100">
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-slate-800 flex items-center justify-between bg-slate-950/90">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-500 to-yellow-400 text-slate-950 flex items-center justify-center font-black shadow-lg">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-black text-sm sm:text-base text-white truncate max-w-[200px] sm:max-w-md">
                {title}
              </h3>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-xs text-emerald-400 font-bold">
                  {labels.questionOf}
                </span>
                <span className="text-slate-600">•</span>
                <span className="text-xs text-slate-400 font-medium">
                  {answeredCount}/{questions.length} {labels.answered}
                </span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Live Exam Timer */}
            {!isSubmitted && (
              <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-mono font-bold shadow-inner ${
                secondsRemaining < 180
                  ? 'bg-rose-950/80 border-rose-600 text-rose-300 animate-pulse'
                  : 'bg-slate-950 border-slate-800 text-amber-400'
              }`}>
                <Clock className="w-3.5 h-3.5" />
                <span>{formatTime(secondsRemaining)}</span>
              </div>
            )}

            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Question Jump Palette (1 to 50) */}
        {!isSubmitted && (
          <div className="bg-slate-950/60 px-4 sm:px-6 py-2.5 border-b border-slate-800/80 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            {questions.map((_, idx) => {
              const isAnswered = selectedAnswers[idx] !== undefined;
              const isCurrent = currentIndex === idx;
              return (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  className={`w-7 h-7 shrink-0 rounded-lg text-xs font-bold transition-all flex items-center justify-center ${
                    isCurrent
                      ? 'bg-emerald-500 text-slate-950 ring-2 ring-emerald-300 font-black scale-110 shadow-md'
                      : isAnswered
                      ? 'bg-emerald-950/80 text-emerald-300 border border-emerald-700/80'
                      : 'bg-slate-800/60 text-slate-400 hover:bg-slate-700 hover:text-white'
                  }`}
                  title={`Question ${idx + 1}`}
                >
                  {idx + 1}
                </button>
              );
            })}
          </div>
        )}

        {/* Progress Bar */}
        <div className="w-full bg-slate-800 h-1.5">
          <div
            className="bg-emerald-500 h-full transition-all duration-300 shadow-sm"
            style={{ width: `${((currentIndex + 1) / questions.length) * 100}%` }}
          />
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-8 flex-1 overflow-y-auto space-y-6">
          {isSubmitted ? (
            /* Result Summary & Deep Question Review */
            <div className="space-y-6 animate-in zoom-in-95 duration-200">
              <div className="text-center py-4 space-y-3 bg-slate-950/70 p-6 rounded-3xl border border-slate-800">
                <div className="w-20 h-20 rounded-full mx-auto flex items-center justify-center text-3xl font-black bg-gradient-to-tr from-emerald-500 to-teal-400 text-white shadow-2xl">
                  {percent}%
                </div>

                <h4 className="text-lg sm:text-xl font-extrabold text-white">
                  {percent >= 70 ? labels.excellent : labels.goodTry}
                </h4>
                <p className="text-xs text-slate-300 max-w-md mx-auto">
                  {labels.scoreSummary}
                </p>

                {/* Filter Tabs for Review */}
                <div className="flex items-center justify-center gap-2 pt-2">
                  <button
                    onClick={() => setReviewFilter('all')}
                    className={`px-3 py-1 rounded-xl text-xs font-bold transition-all ${
                      reviewFilter === 'all'
                        ? 'bg-emerald-600 text-white shadow-md'
                        : 'bg-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    {labels.all} ({questions.length})
                  </button>
                  <button
                    onClick={() => setReviewFilter('wrong')}
                    className={`px-3 py-1 rounded-xl text-xs font-bold transition-all ${
                      reviewFilter === 'wrong'
                        ? 'bg-rose-600 text-white shadow-md'
                        : 'bg-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    {labels.wrong} ({questions.length - score})
                  </button>
                  <button
                    onClick={() => setReviewFilter('correct')}
                    className={`px-3 py-1 rounded-xl text-xs font-bold transition-all ${
                      reviewFilter === 'correct'
                        ? 'bg-emerald-600 text-white shadow-md'
                        : 'bg-slate-800 text-slate-400 hover:text-white'
                    }`}
                  >
                    {labels.correct} ({score})
                  </button>
                </div>
              </div>

              {/* Review answers list */}
              <div className="space-y-4">
                <div className="font-bold text-xs text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                  <Filter className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{labels.questionReview}</span>
                </div>

                {filteredQuestions.map(({ q, idx }) => {
                  const userChoice = selectedAnswers[idx];
                  const isCorrect = userChoice === q.correctOptionIndex;
                  const opts = getOptions(q);

                  return (
                    <div
                      key={q.id}
                      className={`p-4 sm:p-5 rounded-2xl border text-xs space-y-3 transition-all ${
                        isCorrect
                          ? 'bg-emerald-950/30 border-emerald-800/60 text-emerald-200'
                          : 'bg-rose-950/30 border-rose-800/60 text-rose-200'
                      }`}
                    >
                      <div className="font-bold flex items-start gap-2.5 text-white text-sm">
                        {isCorrect ? (
                          <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                        ) : (
                          <XCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
                        )}
                        <span>
                          {idx + 1}. {getQuestionText(q)}
                        </span>
                      </div>

                      <div className="pl-7 space-y-1.5">
                        <div className="text-xs">
                          {labels.yourAnswer}{' '}
                          <span className={`font-bold ${isCorrect ? 'text-emerald-400' : 'text-rose-400'}`}>
                            {userChoice !== undefined ? opts[userChoice] : labels.notAnswered}
                          </span>
                        </div>
                        {!isCorrect && (
                          <div className="text-emerald-400 font-bold text-xs">
                            {labels.correctAnswer} {opts[q.correctOptionIndex]}
                          </div>
                        )}
                      </div>

                      <div className="bg-slate-950/90 p-3.5 rounded-2xl border border-slate-800 text-xs text-slate-300 pl-4 space-y-1">
                        <div className="font-bold text-amber-400 flex items-center gap-1">
                          <HelpCircle className="w-3.5 h-3.5" />
                          <span>{labels.explanation}</span>
                        </div>
                        <p className="leading-relaxed text-slate-200">
                          {getExplanation(q)}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            /* Active Question Screen */
            <div className="space-y-6 animate-in fade-in duration-150">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 bg-emerald-950 text-emerald-400 border border-emerald-800 font-black text-xs rounded-xl shadow-xs">
                    {language === 'om'
                      ? `Boqonnaa ${currentQ.unitNumber || 1}`
                      : language === 'am'
                      ? `ምዕራፍ ${currentQ.unitNumber || 1}`
                      : `Unit ${currentQ.unitNumber || 1}`}
                  </span>
                  <span className="px-2.5 py-0.5 bg-slate-800 text-slate-300 text-[11px] font-bold rounded-lg uppercase">
                    {currentQ.difficulty}
                  </span>
                </div>
                <h4 className="text-base sm:text-lg font-black text-white leading-relaxed">
                  {currentIndex + 1}. {getQuestionText(currentQ)}
                </h4>
              </div>

              {/* Shuffled Options (A, B, C, D) */}
              <div className="space-y-3">
                {getOptions(currentQ).map((opt, optIdx) => {
                  const isSelected = selectedAnswers[currentIndex] === optIdx;
                  return (
                    <button
                      key={optIdx}
                      type="button"
                      onClick={() => handleSelectOption(optIdx)}
                      className={`w-full text-left p-4 rounded-2xl border text-sm font-semibold transition-all flex items-center justify-between group active:scale-[0.99] ${
                        isSelected
                          ? 'bg-emerald-950/80 border-emerald-400 text-white ring-2 ring-emerald-500 shadow-lg'
                          : 'bg-slate-950 border-slate-800 text-slate-200 hover:bg-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-center gap-3.5">
                        <span className={`w-7 h-7 rounded-xl flex items-center justify-center text-xs font-black shrink-0 transition-colors ${
                          isSelected ? 'bg-emerald-500 text-slate-950' : 'bg-slate-800 text-emerald-400 group-hover:bg-slate-700'
                        }`}>
                          {String.fromCharCode(65 + optIdx)}
                        </span>
                        <span className="leading-snug">{opt}</span>
                      </div>
                      {isSelected && <Check className="w-5 h-5 text-emerald-400 shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* Footer controls */}
        <div className="p-4 sm:p-5 border-t border-slate-800 bg-slate-950/90 flex items-center justify-between">
          {isSubmitted ? (
            <button
              onClick={handleRestart}
              className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-2xl text-xs font-black flex items-center gap-2 transition-all shadow-md active:scale-95"
            >
              <RotateCcw className="w-4 h-4" />
              <span>{labels.retake}</span>
            </button>
          ) : (
            <>
              <button
                onClick={() => setCurrentIndex((i) => Math.max(0, i - 1))}
                disabled={currentIndex === 0}
                className="px-4 py-2 bg-slate-800 text-slate-300 rounded-xl text-xs font-bold disabled:opacity-30 flex items-center gap-1 hover:text-white transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>{labels.prev}</span>
              </button>

              <div className="flex items-center gap-2">
                {currentIndex === questions.length - 1 ? (
                  <button
                    onClick={handleSubmit}
                    className="px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white rounded-2xl text-xs font-black shadow-lg transition-all active:scale-95"
                  >
                    {labels.submit}
                  </button>
                ) : (
                  <button
                    onClick={() => setCurrentIndex((i) => Math.min(questions.length - 1, i + 1))}
                    className="px-5 py-2.5 bg-white hover:bg-slate-200 text-slate-950 rounded-2xl text-xs font-black flex items-center gap-1.5 shadow-sm active:scale-95 transition-colors"
                  >
                    <span>{labels.next}</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
