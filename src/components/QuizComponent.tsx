import { useState } from "react";
import { motion } from "framer-motion";

type Question = {
  id: number;
  question: string;
  options: string[];
  correctAnswer: string | null;
  correctAnswers?: string[] | null;
  isMultipleChoice?: boolean;
};

type Props = {
  question: Question;
  totalQuestions: number;
  currentIndex: number;
  onAnswer: (selectedOptions: string[], isCorrect: boolean) => void;
  onBack: () => void;
};

export const QuizComponent = ({
  question,
  totalQuestions,
  currentIndex,
  onAnswer,
  onBack,
}: Props) => {
  // For single-choice questions
  const [selectedSingle, setSelectedSingle] = useState<string | null>(null);

  // For multiple-choice questions
  const [selectedMulti, setSelectedMulti] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);

  // Single-choice select logic
  const handleSelectSingle = (option: string) => {
    if (selectedSingle) return;
    setSelectedSingle(option);

    const isCorrect = option === question.correctAnswer;

    setTimeout(() => {
      onAnswer([option], isCorrect);
      setSelectedSingle(null);
    }, 1200);
  };

  // Multiple-choice toggle logic
  const handleToggleMulti = (option: string) => {
    if (submitted) return;
    setSelectedMulti((prev) =>
      prev.includes(option)
        ? prev.filter((item) => item !== option)
        : [...prev, option],
    );
  };

  // Multiple-choice submit logic
  const handleSubmitMulti = () => {
    if (selectedMulti.length === 0 || submitted) return;
    setSubmitted(true);

    const correctList = question.correctAnswers || [];
    const isCorrect =
      selectedMulti.length === correctList.length &&
      selectedMulti.every((opt) => correctList.includes(opt));

    setTimeout(() => {
      onAnswer(selectedMulti, isCorrect);
      setSelectedMulti([]);
      setSubmitted(false);
    }, 1800);
  };

  return (
    <motion.div
      key={question.id}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="w-full max-w-3xl mx-auto bg-white/40 backdrop-blur-3xl p-6 md:p-8 rounded-3xl border border-white/60 shadow-[0_24px_80px_rgba(0,0,0,0.14),inset_0_0_20px_rgba(255,255,255,0.45)] my-4 relative overflow-hidden"
    >
      {/* Header with Back button and progress */}
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100/80">
        <button
          onClick={onBack}
          className="flex items-center space-x-1.5 text-sm font-extrabold text-slate-500 hover:text-indigo-600 transition-colors cursor-pointer self-start"
        >
          <i className="fi-sr-angle-left text-lg text-slate-600" aria-hidden />
          <span>Артқа қайту</span>
        </button>

        <div className="flex items-center space-x-3 w-full sm:w-auto justify-between sm:justify-end">
          {question.isMultipleChoice && (
            <span className="text-[10px] md:text-xs bg-amber-50 text-amber-700 border border-amber-200/80 font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider">
              Көп таңдаулы сұрақ
            </span>
          )}
          <span className="text-sm font-semibold text-slate-600 whitespace-nowrap">
            Сұрақ {currentIndex + 1} / {totalQuestions}
          </span>
          <div className="w-32 h-2 bg-slate-100 rounded-full overflow-hidden border border-slate-200/50">
            <div
              className="h-full bg-indigo-600 rounded-full transition-all duration-300 shadow-sm"
              style={{
                width: `${((currentIndex + 1) / totalQuestions) * 100}%`,
              }}
            />
          </div>
        </div>
      </div>

      <h2 className="text-xl md:text-2xl font-black text-slate-800 mb-8 leading-relaxed">
        {question.question}
      </h2>

      {/* Options List */}
      <div className="space-y-4">
        {question.options.map((option, idx) => {
          if (question.isMultipleChoice) {
            const isSelected = selectedMulti.includes(option);
            const isCorrectAnswer = (question.correctAnswers || []).includes(
              option,
            );

            let buttonClass =
              "border-white/60 bg-white/60 hover:bg-white/80 hover:border-indigo-300 text-slate-700 shadow-[0_4px_15px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_25px_rgba(99,102,241,0.06)] transform hover:scale-[1.01] active:scale-[0.99]";

            if (submitted) {
              if (isCorrectAnswer) {
                buttonClass =
                  "border-emerald-300/80 bg-emerald-50/80 text-emerald-800 font-bold shadow-[0_6px_20px_rgba(16,185,129,0.12),0_0_15px_rgba(16,185,129,0.15)]";
              } else if (isSelected) {
                buttonClass =
                  "border-rose-300/80 bg-rose-50/80 text-rose-800 font-bold shadow-[0_6px_20px_rgba(244,63,94,0.12),0_0_15px_rgba(244,63,94,0.15)]";
              } else {
                buttonClass =
                  "border-slate-100 opacity-40 text-slate-400 bg-transparent";
              }
            } else if (isSelected) {
              buttonClass =
                "border-indigo-300/80 bg-indigo-50/80 text-indigo-900 font-bold shadow-[0_6px_20px_rgba(99,102,241,0.12),0_0_15px_rgba(99,102,241,0.15)] transform scale-[1.01]";
            }

            return (
              <button
                key={idx}
                onClick={() => handleToggleMulti(option)}
                disabled={submitted}
                className={`w-full text-left p-4.5 rounded-xl border transition-all cursor-pointer font-medium text-sm sm:text-base flex items-center justify-between ${buttonClass}`}
              >
                <div className="flex items-center space-x-3">
                  <div
                    className={`w-5 h-5 rounded flex items-center justify-center border transition-all flex-shrink-0 ${
                      isSelected
                        ? submitted
                          ? isCorrectAnswer
                            ? "bg-emerald-600 border-emerald-600 text-white"
                            : "bg-rose-600 border-rose-600 text-white"
                          : "bg-indigo-600 border-indigo-600 text-white"
                        : submitted && isCorrectAnswer
                          ? "bg-emerald-600 border-emerald-600 text-white"
                          : "border-slate-200 bg-slate-50"
                    }`}
                  >
                    {(isSelected || (submitted && isCorrectAnswer)) && (
                      <i
                        className="fi-sr-check text-[14px] text-white"
                        aria-hidden
                      />
                    )}
                  </div>
                  <span>{option}</span>
                </div>
              </button>
            );
          } else {
            // Single choice questions
            const isSelected = selectedSingle === option;
            const isCorrect =
              selectedSingle && option === question.correctAnswer;
            const isWrong = isSelected && !isCorrect;

            let buttonClass =
              "border-white/60 bg-white/60 hover:bg-white/80 hover:border-indigo-300 text-slate-700 shadow-[0_4px_15px_rgba(0,0,0,0.02)] hover:shadow-[0_8px_25px_rgba(99,102,241,0.06)] transform hover:scale-[1.01] active:scale-[0.99]";

            if (selectedSingle !== null) {
              if (isCorrect) {
                buttonClass =
                  "border-emerald-300/80 bg-emerald-50/80 text-emerald-800 font-bold shadow-[0_6px_20px_rgba(16,185,129,0.12),0_0_15px_rgba(16,185,129,0.15)]";
              } else if (isWrong) {
                buttonClass =
                  "border-rose-300/80 bg-rose-50/80 text-rose-800 font-bold shadow-[0_6px_20px_rgba(244,63,94,0.12),0_0_15px_rgba(244,63,94,0.15)]";
              } else if (option === question.correctAnswer) {
                buttonClass =
                  "border-emerald-300/80 bg-emerald-50/80 text-emerald-800 font-bold shadow-[0_6px_20px_rgba(16,185,129,0.12),0_0_15px_rgba(16,185,129,0.15)]";
              } else {
                buttonClass =
                  "border-slate-100 opacity-40 text-slate-400 bg-transparent";
              }
            }

            return (
              <button
                key={idx}
                onClick={() => handleSelectSingle(option)}
                disabled={selectedSingle !== null}
                className={`w-full text-left p-4.5 rounded-xl border transition-all cursor-pointer font-medium text-sm sm:text-base ${buttonClass}`}
              >
                {option}
              </button>
            );
          }
        })}
      </div>

      {/* Submit button for Multiple Choice */}
      {question.isMultipleChoice && (
        <div className="mt-8 flex justify-end">
          <button
            onClick={handleSubmitMulti}
            disabled={selectedMulti.length === 0 || submitted}
            className={`px-8 py-3.5 rounded-2xl font-black text-base transition-all duration-300 cursor-pointer relative overflow-hidden group ${
              selectedMulti.length === 0 || submitted
                ? "bg-slate-100/60 text-slate-400 border border-slate-200/50 cursor-not-allowed shadow-none"
                : "bg-gradient-to-r from-indigo-500/85 to-purple-500/85 backdrop-blur-xl hover:from-indigo-500/95 hover:to-purple-500/95 text-white border border-white/40 shadow-[0_8px_32px_rgba(99,102,241,0.4),inset_0_2px_15px_rgba(255,255,255,0.3)] transform hover:scale-[1.02] active:scale-98"
            }`}
          >
            {!(selectedMulti.length === 0 || submitted) && (
              <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out pointer-events-none"></div>
            )}
            <span className="relative z-10">
              {submitted ? "Жауап тексерілуде..." : "Жауап беру"}
            </span>
          </button>
        </div>
      )}
    </motion.div>
  );
};
