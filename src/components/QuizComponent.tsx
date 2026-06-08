import { useState } from 'react';
import { motion } from 'framer-motion';

type Question = {
  id: number;
  question: string;
  options: string[];
  correctAnswer: string;
};

type Props = {
  question: Question;
  totalQuestions: number;
  currentIndex: number;
  onAnswer: (selectedOption: string, isCorrect: boolean) => void;
  onBack: () => void;
};

export const QuizComponent = ({ question, totalQuestions, currentIndex, onAnswer, onBack }: Props) => {
  const [selected, setSelected] = useState<string | null>(null);

  const handleSelect = (option: string) => {
    if (selected) return; // Prevent multiple clicks
    setSelected(option);
    
    // Check if correct
    const isCorrect = option === question.correctAnswer;
    
    setTimeout(() => {
      onAnswer(option, isCorrect);
      setSelected(null);
    }, 1000); // 1 second delay to show the selected state
  };

  return (
    <motion.div 
      key={question.id}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="w-full max-w-3xl mx-auto bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100"
    >
      {/* Header with Back button and progress */}
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-gray-50">
        <button 
          onClick={onBack}
          className="flex items-center space-x-1.5 text-sm font-bold text-gray-500 hover:text-primary transition-colors cursor-pointer self-start"
        >
          <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
          </svg>
          <span>Артқа қайту</span>
        </button>
        <div className="flex items-center space-x-3 w-full sm:w-auto justify-between sm:justify-end">
          <span className="text-sm font-semibold text-gray-500 whitespace-nowrap">
            Сұрақ {currentIndex + 1} / {totalQuestions}
          </span>
          <div className="w-32 h-2 bg-gray-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary rounded-full transition-all duration-300"
              style={{ width: `${((currentIndex + 1) / totalQuestions) * 100}%` }}
            />
          </div>
        </div>
      </div>

      <h2 className="text-xl md:text-2xl font-bold text-text mb-8 leading-relaxed">
        {question.question}
      </h2>

      <div className="space-y-4">
        {question.options.map((option, idx) => {
          const isSelected = selected === option;
          const isCorrect = selected && option === question.correctAnswer;
          const isWrong = isSelected && !isCorrect;

          return (
            <button
              key={idx}
              onClick={() => handleSelect(option)}
              disabled={selected !== null}
              className={`w-full text-left p-4.5 rounded-xl border-2 transition-all cursor-pointer font-medium text-sm sm:text-base ${
                selected === null 
                  ? 'border-gray-100 hover:border-primary hover:bg-primary/5 text-gray-700 bg-white' 
                  : isCorrect 
                    ? 'border-green-500 bg-green-50 text-green-700 font-bold'
                    : isWrong
                      ? 'border-red-500 bg-red-50 text-red-700 font-bold'
                      : option === question.correctAnswer
                        ? 'border-green-500 bg-green-50 text-green-700 font-bold' // Highlight correct answer if wrong selected
                        : 'border-gray-50 opacity-40 text-gray-400 bg-white'
              }`}
            >
              {option}
            </button>
          )
        })}
      </div>
    </motion.div>
  );
};
