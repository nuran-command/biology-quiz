import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import type { UserAnswer } from '../App';

type Props = {
  score: number;
  total: number;
  answers: UserAnswer[];
  durationSeconds: number;
  onRestart: () => void;
};

export const ResultScreen = ({ score, total, answers, durationSeconds, onRestart }: Props) => {
  const percentage = Math.round((score / total) * 100);
  const [filter, setFilter] = useState<'all' | 'correct' | 'incorrect'>('all');
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
          colors: ['#6366F1', '#10B981', '#3B82F6']
        });
        confetti({
          particleCount: 5,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ['#6366F1', '#10B981', '#3B82F6']
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
    if (filter === 'correct') return ans.isCorrect;
    if (filter === 'incorrect') return !ans.isCorrect;
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
      className="w-full max-w-4xl mx-auto bg-slate-900/50 backdrop-blur-xl p-6 md:p-10 rounded-3xl shadow-2xl border border-white/10 my-4 pt-20"
    >
      <div className="text-center mb-8">
        <div className="inline-block bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 px-4 py-1.5 rounded-full text-xs md:text-sm font-semibold mb-3">
          Тест аяқталды
        </div>
        <h2 className="text-3xl md:text-4xl font-extrabold text-white">Сіздің Нәтижеңіз</h2>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Circle Progress Card */}
        <div className="bg-slate-950/20 border border-white/5 backdrop-blur-md rounded-2xl p-6 flex flex-col items-center justify-center">
          <div className="relative w-36 h-36 flex items-center justify-center mb-2">
            <svg className="w-full h-full transform -rotate-90">
              {/* Background Circle */}
              <circle
                cx="72"
                cy="72"
                r={radius}
                className="stroke-white/5"
                strokeWidth={strokeWidth}
                fill="transparent"
              />
              {/* Foreground Animated Circle */}
              <motion.circle
                cx="72"
                cy="72"
                r={radius}
                className="stroke-indigo-500"
                strokeWidth={strokeWidth}
                fill="transparent"
                strokeDasharray={circumference}
                initial={{ strokeDashoffset: circumference }}
                animate={{ strokeDashoffset }}
                transition={{ duration: 1, ease: 'easeOut' }}
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute text-center">
              <span className="text-3xl font-black text-white">{percentage}%</span>
              <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Дұрыс</p>
            </div>
          </div>
          <p className="text-sm font-medium text-slate-300">Сұрақтардың жалпы үлесі</p>
        </div>

        {/* Breakdown Card */}
        <div className="bg-slate-950/20 border border-white/5 backdrop-blur-md rounded-2xl p-6 flex flex-col justify-center space-y-4">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 bg-emerald-500/20 text-emerald-400 border border-emerald-500/20 rounded-xl">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Дұрыс жауаптар</p>
              <p className="text-xl font-black text-white">{score} сұрақ</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="p-2.5 bg-rose-500/20 text-rose-400 border border-rose-500/20 rounded-xl">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <div>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Қате жауаптар</p>
              <p className="text-xl font-black text-white">{total - score} сұрақ</p>
            </div>
          </div>
        </div>

        {/* Time Spent Card */}
        <div className="bg-slate-950/20 border border-white/5 backdrop-blur-md rounded-2xl p-6 flex flex-col items-center justify-center text-center">
          <div className="p-4 bg-blue-500/20 text-blue-400 border border-blue-500/20 rounded-2xl mb-3">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mb-1">Жұмсалған уақыт</p>
          <p className="text-xl font-black text-white">{formatTime(durationSeconds)}</p>
        </div>
      </div>

      {/* Review Header & Filters */}
      <div className="border-t border-white/5 pt-8 mb-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <h3 className="text-xl font-bold text-white flex items-center space-x-2">
            <span>Сұрақтарды шолу</span>
            <span className="text-xs bg-white/5 text-slate-300 px-2.5 py-0.5 rounded-full font-semibold border border-white/5">
              {filteredAnswers.length}
            </span>
          </h3>

          {/* Filter Pills */}
          <div className="flex bg-slate-950/40 p-1 rounded-xl w-full sm:w-auto border border-white/5">
            <button
              onClick={() => setFilter('all')}
              className={`flex-1 sm:flex-initial px-4 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                filter === 'all' ? 'bg-white/10 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              Барлығы
            </button>
            <button
              onClick={() => setFilter('correct')}
              className={`flex-1 sm:flex-initial px-4 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                filter === 'correct' ? 'bg-white/10 text-emerald-400' : 'text-slate-400 hover:text-white'
              }`}
            >
              Дұрыс
            </button>
            <button
              onClick={() => setFilter('incorrect')}
              className={`flex-1 sm:flex-initial px-4 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                filter === 'incorrect' ? 'bg-white/10 text-rose-400' : 'text-slate-400 hover:text-white'
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
                      ? 'border-emerald-500/20 bg-emerald-500/5 hover:border-emerald-500/30' 
                      : 'border-rose-500/20 bg-rose-500/5 hover:border-rose-500/30'
                  }`}
                >
                  {/* Collapsible Trigger Header */}
                  <button
                    onClick={() => setExpandedId(isExpanded ? null : ans.questionId)}
                    className="w-full text-left p-4 flex justify-between items-center space-x-4 cursor-pointer"
                  >
                    <div className="flex items-start space-x-3">
                      {/* Correctness Icon */}
                      <span className={`mt-0.5 flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center text-[10px] ${
                        ans.isCorrect ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/20' : 'bg-rose-500/20 text-rose-400 border border-rose-500/20'
                      }`}>
                        {ans.isCorrect ? '✓' : '✗'}
                      </span>
                      <p className="font-semibold text-white text-sm sm:text-base leading-snug">
                        {ans.questionText}
                      </p>
                    </div>
                    {/* Arrow Icon */}
                    <svg 
                      className={`w-5 h-5 text-slate-400 flex-shrink-0 transition-transform ${isExpanded ? 'transform rotate-180' : ''}`}
                      fill="none" stroke="currentColor" viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {/* Expanded Body */}
                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="px-10 pb-4 pt-2 border-t border-white/5 text-sm space-y-2.5">
                          <div className={`p-3 rounded-lg ${ans.isCorrect ? 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/10' : 'bg-rose-500/10 text-rose-300 border border-rose-500/10'}`}>
                            <span className="font-bold text-[10px] uppercase tracking-wider block mb-1">Сіздің жауабыңыз:</span>
                            {ans.selectedOptions.join('; ')}
                          </div>
                          {!ans.isCorrect && (
                            <div className="p-3 bg-emerald-500/10 text-emerald-300 rounded-lg border border-emerald-500/10">
                              <span className="font-bold text-[10px] uppercase tracking-wider block mb-1">Дұрыс жауап:</span>
                              {ans.correctOptions.join('; ')}
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
      <div className="flex justify-center pt-4 border-t border-white/5">
        <button 
          onClick={onRestart}
          className="px-8 py-4 bg-indigo-600 text-white rounded-full text-lg font-bold shadow-lg shadow-indigo-600/35 hover:bg-indigo-500 hover:shadow-indigo-500/40 transition-all transform hover:scale-[1.01] active:scale-99 cursor-pointer flex items-center space-x-2"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 1121.21 8H17m-6 3a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <span>Қайтадан тапсыру</span>
        </button>
      </div>
    </motion.div>
  );
};
