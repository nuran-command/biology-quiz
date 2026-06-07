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
          colors: ['#4F46E5', '#10B981', '#3B82F6']
        });
        confetti({
          particleCount: 5,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ['#4F46E5', '#10B981', '#3B82F6']
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
      className="w-full max-w-4xl mx-auto bg-white p-6 md:p-10 rounded-3xl shadow-xl border border-gray-100 my-4"
    >
      <div className="text-center mb-8">
        <div className="inline-block bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-semibold mb-3">
          Тест аяқталды
        </div>
        <h2 className="text-3xl md:text-4xl font-extrabold text-text">Сіздің Нәтижеңіз</h2>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Circle Progress Card */}
        <div className="bg-gray-50/50 border border-gray-100 rounded-2xl p-6 flex flex-col items-center justify-center">
          <div className="relative w-36 h-36 flex items-center justify-center mb-2">
            <svg className="w-full h-full transform -rotate-90">
              {/* Background Circle */}
              <circle
                cx="72"
                cy="72"
                r={radius}
                className="stroke-gray-100"
                strokeWidth={strokeWidth}
                fill="transparent"
              />
              {/* Foreground Animated Circle */}
              <motion.circle
                cx="72"
                cy="72"
                r={radius}
                className="stroke-primary"
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
              <span className="text-3xl font-black text-text">{percentage}%</span>
              <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Дұрыс</p>
            </div>
          </div>
          <p className="text-sm font-medium text-gray-500">Сұрақтардың жалпы үлесі</p>
        </div>

        {/* Breakdown Card */}
        <div className="bg-gray-50/50 border border-gray-100 rounded-2xl p-6 flex flex-col justify-center space-y-4">
          <div className="flex items-center space-x-3">
            <div className="p-2.5 bg-green-500/10 text-green-600 rounded-xl">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Дұрыс жауаптар</p>
              <p className="text-2xl font-black text-text">{score} сұрақ</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <div className="p-2.5 bg-red-500/10 text-red-600 rounded-xl">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <div>
              <p className="text-xs text-gray-400 font-bold uppercase tracking-wider">Қате жауаптар</p>
              <p className="text-2xl font-black text-text">{total - score} сұрақ</p>
            </div>
          </div>
        </div>

        {/* Time Spent Card */}
        <div className="bg-gray-50/50 border border-gray-100 rounded-2xl p-6 flex flex-col items-center justify-center text-center">
          <div className="p-4 bg-blue-500/10 text-blue-600 rounded-2xl mb-3">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">Жұмсалған уақыт</p>
          <p className="text-2xl font-black text-text">{formatTime(durationSeconds)}</p>
        </div>
      </div>

      {/* Review Header & Filters */}
      <div className="border-t border-gray-100 pt-8 mb-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <h3 className="text-xl font-bold text-text flex items-center space-x-2">
            <span>Сұрақтарды шолу</span>
            <span className="text-xs bg-gray-100 text-gray-600 px-2.5 py-0.5 rounded-full font-semibold">
              {filteredAnswers.length}
            </span>
          </h3>

          {/* Filter Pills */}
          <div className="flex bg-gray-100 p-1 rounded-xl w-full sm:w-auto">
            <button
              onClick={() => setFilter('all')}
              className={`flex-1 sm:flex-initial px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
                filter === 'all' ? 'bg-white shadow-sm text-text' : 'text-gray-500 hover:text-text'
              }`}
            >
              Барлығы
            </button>
            <button
              onClick={() => setFilter('correct')}
              className={`flex-1 sm:flex-initial px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
                filter === 'correct' ? 'bg-white shadow-sm text-green-600' : 'text-gray-500 hover:text-text'
              }`}
            >
              Дұрыс
            </button>
            <button
              onClick={() => setFilter('incorrect')}
              className={`flex-1 sm:flex-initial px-4 py-2 rounded-lg text-xs font-semibold transition-all ${
                filter === 'incorrect' ? 'bg-white shadow-sm text-red-600' : 'text-gray-500 hover:text-text'
              }`}
            >
              Қате
            </button>
          </div>
        </div>

        {/* Scrollable Questions list */}
        <div className="max-h-[450px] overflow-y-auto pr-2 space-y-3 scrollbar-thin">
          {filteredAnswers.length === 0 ? (
            <div className="text-center py-12 text-gray-400">
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
                      ? 'border-green-100 hover:border-green-200' 
                      : 'border-red-100 hover:border-red-200'
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
                        ans.isCorrect ? 'bg-green-500/10 text-green-600' : 'bg-red-500/10 text-red-600'
                      }`}>
                        {ans.isCorrect ? '✓' : '✗'}
                      </span>
                      <p className="font-semibold text-text text-sm sm:text-base leading-snug">
                        {ans.questionId}. {ans.questionText}
                      </p>
                    </div>
                    {/* Arrow Icon */}
                    <svg 
                      className={`w-5 h-5 text-gray-400 flex-shrink-0 transition-transform ${isExpanded ? 'transform rotate-180' : ''}`}
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
                        <div className="px-10 pb-4 pt-2 border-t border-gray-50 text-sm space-y-2.5">
                          <div className={`p-3 rounded-lg ${ans.isCorrect ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}>
                            <span className="font-bold text-xs uppercase tracking-wider block mb-1">Сіздің жауабыңыз:</span>
                            {ans.selectedOption}
                          </div>
                          {!ans.isCorrect && (
                            <div className="p-3 bg-green-50 text-green-800 rounded-lg">
                              <span className="font-bold text-xs uppercase tracking-wider block mb-1">Дұрыс жауап:</span>
                              {ans.correctOption}
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
      <div className="flex justify-center pt-4 border-t border-gray-100">
        <button 
          onClick={onRestart}
          className="px-8 py-4 bg-primary text-white rounded-full text-lg font-bold shadow-md hover:bg-primary/95 transition-all transform hover:scale-[1.01] active:scale-99 cursor-pointer flex items-center space-x-2"
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
