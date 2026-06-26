import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import type { UserAnswer } from "../App";

type Props = {
  score: number;
  total: number;
  answers: UserAnswer[];
  durationSeconds: number;
  onRestart: () => void;
};

export const ResultScreen = ({
  score,
  total,
  answers,
  durationSeconds,
  onRestart,
}: Props) => {
  const percentage = Math.round((score / total) * 100);
  const [filter, setFilter] = useState<"all" | "correct" | "incorrect">("all");
  const [expandedId, setExpandedId] = useState<number | null>(null);

  useEffect(() => {
    if (percentage >= 50) {
      // Celebrate with confetti!
      const duration = 3 * 1000;
      const end = Date.now() + duration;

      const frame = () => {
        confetti({
          particleCount: 5,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ["#6366F1", "#10B981", "#3B82F6"],
        });
        confetti({
          particleCount: 5,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ["#6366F1", "#10B981", "#3B82F6"],
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      };
      frame();
    }
  }, [percentage]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    if (mins > 0) {
      return `${mins} мин ${secs} сек`;
    }
    return `${secs} сек`;
  };

  const filteredAnswers = answers.filter((ans) => {
    if (filter === "correct") return ans.isCorrect;
    if (filter === "incorrect") return !ans.isCorrect;
    return true;
  });

  // SVG Circle Calculations
  const radius = 50;
  const strokeWidth = 8;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-4xl mx-auto bg-white/40 backdrop-blur-3xl p-6 md:p-10 rounded-3xl border border-white/60 shadow-[0_24px_80px_rgba(0,0,0,0.14),inset_0_0_20px_rgba(255,255,255,0.45)] my-4 pt-20"
    >
      <div className="text-center mb-8">
        <div className="inline-block bg-indigo-50 border border-indigo-100 text-indigo-600 px-4 py-1.5 rounded-full text-xs md:text-sm font-semibold mb-3">
          Тест аяқталды
        </div>
        <h2 className="text-3xl md:text-4xl font-black text-slate-800">
          Сіздің Нәтижеңіз
        </h2>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Circle Progress Card */}
        <div className="bg-white/40 border border-white/60 backdrop-blur-2xl rounded-3xl p-6 flex flex-col items-center justify-center shadow-[0_16px_60px_rgba(0,0,0,0.1),inset_0_0_12px_rgba(255,255,255,0.35)] hover:shadow-[0_18px_70px_rgba(0,0,0,0.12),inset_0_0_15px_rgba(255,255,255,0.4)] transition-all">
          <div className="relative w-36 h-36 flex items-center justify-center mb-2">
            <svg className="w-full h-full transform -rotate-90">
              {/* Background Circle */}
              <circle
                cx="72"
                cy="72"
                r={radius}
                className="stroke-slate-100"
                strokeWidth={strokeWidth}
                fill="transparent"
              />
              {/* Foreground Animated Circle */}
              <motion.circle
                cx="72"
                cy="72"
                r={radius}
                className="stroke-indigo-600"
                strokeWidth={strokeWidth}
                fill="transparent"
                strokeDasharray={circumference}
                initial={{ strokeDashoffset: circumference }}
                animate={{ strokeDashoffset }}
                transition={{ duration: 1, ease: "easeOut" }}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute text-center">
              <span className="text-3xl font-black text-slate-800">
                {percentage}%
              </span>
              <p className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">
                Дұрыс
              </p>
            </div>
          </div>
          <p className="text-sm font-medium text-slate-600">
            Сұрақтардың жалпы үлесі
          </p>
        </div>

        {/* Breakdown Card */}
        <div className="bg-white/40 border border-white/60 backdrop-blur-2xl rounded-3xl p-6 flex flex-col justify-center space-y-4 shadow-[0_16px_60px_rgba(0,0,0,0.1),inset_0_0_12px_rgba(255,255,255,0.35)] hover:shadow-[0_18px_70px_rgba(0,0,0,0.12),inset_0_0_15px_rgba(255,255,255,0.4)] transition-all">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 bg-emerald-50 text-emerald-600 border border-emerald-100 rounded-xl">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <div>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">
                Дұрыс жауаптар
              </p>
              <p className="text-xl font-black text-slate-800">{score} сұрақ</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="p-2.5 bg-rose-50 text-rose-600 border border-rose-100 rounded-xl">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2.5}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </div>
            <div>
              <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">
                Қате жауаптар
              </p>
              <p className="text-xl font-black text-slate-800">
                {total - score} сұрақ
              </p>
            </div>
          </div>
        </div>

        {/* Time Spent Card */}
        <div className="bg-white/40 border border-white/60 backdrop-blur-2xl rounded-3xl p-6 flex flex-col items-center justify-center text-center shadow-[0_8px_30px_rgba(31,38,135,0.05),inset_0_0_10px_rgba(255,255,255,0.3)] hover:shadow-[0_12px_40px_rgba(31,38,135,0.1),inset_0_0_15px_rgba(255,255,255,0.4)] transition-all">
          <div className="p-4 bg-blue-50 text-blue-600 border border-blue-100 rounded-2xl mb-3">
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mb-1">
            Жұмсалған уақыт
          </p>
          <p className="text-xl font-black text-slate-800">
            {formatTime(durationSeconds)}
          </p>
        </div>
      </div>

      {/* Review Header & Filters */}
      <div className="border-t border-slate-100 pt-8 mb-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <h3 className="text-xl font-black text-slate-800 flex items-center space-x-2">
            <span>Сұрақтарды шолу</span>
            <span className="text-xs bg-slate-100 text-slate-600 px-2.5 py-0.5 rounded-full font-semibold border border-slate-200">
              {filteredAnswers.length}
            </span>
          </h3>

          {/* Filter Pills */}
          <div className="flex bg-slate-100/60 p-1 rounded-xl w-full sm:w-auto border border-slate-200/40">
            <button
              onClick={() => setFilter("all")}
              className={`flex-1 sm:flex-initial px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                filter === "all"
                  ? "bg-white text-slate-800 shadow-sm"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              Барлығы
            </button>
            <button
              onClick={() => setFilter("correct")}
              className={`flex-1 sm:flex-initial px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                filter === "correct"
                  ? "bg-white text-emerald-600 shadow-sm"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              Дұрыс
            </button>
            <button
              onClick={() => setFilter("incorrect")}
              className={`flex-1 sm:flex-initial px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                filter === "incorrect"
                  ? "bg-white text-rose-600 shadow-sm"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              Қате
            </button>
          </div>
        </div>

        {/* Scrollable Questions list */}
        <div className="max-h-[450px] overflow-y-auto pr-2 space-y-3 scrollbar-thin">
          {filteredAnswers.length === 0 ? (
            <div className="text-center py-12 text-slate-400">
              Сәйкес сұрақтар табылмады.
            </div>
          ) : (
            filteredAnswers.map((ans) => {
              const isExpanded = expandedId === ans.questionId;

              return (
                <div
                  key={ans.questionId}
                  className={`border rounded-xl transition-all ${
                    ans.isCorrect
                      ? "border-emerald-100 bg-emerald-50/20 hover:border-emerald-200"
                      : "border-rose-100 bg-rose-50/20 hover:border-rose-200"
                  }`}
                >
                  {/* Collapsible Trigger Header */}
                  <button
                    onClick={() =>
                      setExpandedId(isExpanded ? null : ans.questionId)
                    }
                    className="w-full text-left p-4 flex justify-between items-center space-x-4 cursor-pointer"
                  >
                    <div className="flex items-start space-x-3">
                      {/* Correctness Icon */}
                      <span
                        className={`mt-0.5 flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${
                          ans.isCorrect
                            ? "bg-emerald-100 text-emerald-600 border border-emerald-200"
                            : "bg-rose-100 text-rose-600 border border-rose-200"
                        }`}
                      >
                        {ans.isCorrect ? "✓" : "✗"}
                      </span>
                      <p className="font-bold text-slate-800 text-sm sm:text-base leading-snug">
                        {ans.questionText}
                      </p>
                    </div>
                    {/* Arrow Icon */}
                    <svg
                      className={`w-5 h-5 text-slate-400 flex-shrink-0 transition-transform ${isExpanded ? "transform rotate-180" : ""}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>

                  {/* Expanded Body */}
                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="px-10 pb-4 pt-2 border-t border-slate-100/55 text-sm space-y-2.5">
                          <div
                            className={`p-3 rounded-lg ${ans.isCorrect ? "bg-emerald-50 text-emerald-800 border border-emerald-100/50" : "bg-rose-50 text-rose-800 border border-rose-100/50"}`}
                          >
                            <span className="font-bold text-[10px] uppercase tracking-wider block mb-1">
                              Сіздің жауабыңыз:
                            </span>
                            {ans.selectedOptions.join("; ")}
                          </div>
                          {!ans.isCorrect && (
                            <div className="p-3 bg-emerald-50 text-emerald-800 rounded-lg border border-emerald-100/50">
                              <span className="font-bold text-[10px] uppercase tracking-wider block mb-1">
                                Дұрыс жауап:
                              </span>
                              {ans.correctOptions.join("; ")}
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Restart Button */}
      <div className="flex justify-center pt-6 border-t border-slate-100">
        <button
          onClick={onRestart}
          className="px-8 py-4 bg-gradient-to-r from-indigo-500/85 to-purple-500/85 backdrop-blur-xl hover:from-indigo-500/95 hover:to-purple-500/95 text-white rounded-2xl text-lg font-black border border-white/40 shadow-[0_8px_32px_rgba(99,102,241,0.4),inset_0_2px_15px_rgba(255,255,255,0.3)] transition-all duration-300 transform hover:scale-[1.01] active:scale-99 cursor-pointer flex items-center space-x-2 relative overflow-hidden group"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out pointer-events-none"></div>
          <svg
            className="w-5 h-5 relative z-10"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2.5}
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 1121.21 8H17m-6 3a2 2 0 11-4 0 2 2 0 014 0z"
            />
          </svg>
          <span className="relative z-10">Қайтадан тапсыру</span>
        </button>
      </div>
    </motion.div>
  );
};
