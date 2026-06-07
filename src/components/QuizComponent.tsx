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
};

export const QuizComponent = ({ question, totalQuestions, currentIndex, onAnswer }: Props) => {
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
      className="w-full max-w-3xl mx-auto bg-white p-8 rounded-3xl shadow-sm"
    >
      <div className="mb-8 flex justify-between items-center">
        <span className="text-sm font-semibold text-gray-500">Сұрақ {currentIndex + 1} / {totalQuestions}</span>
        <div className="w-full max-w-[200px] h-2 bg-gray-200 rounded-full ml-4">
          <div 
            className="h-full bg-primary rounded-full transition-all duration-300"
            style={{ width: `${((currentIndex + 1) / totalQuestions) * 100}%` }}
          />
        </div>
      </div>

      <h2 className="text-2xl font-semibold text-text mb-8 leading-relaxed">
        {question.id}. {question.question}
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
              className={`w-full text-left p-4 rounded-xl border-2 transition-all ${
                selected === null 
                  ? 'border-gray-200 hover:border-primary hover:bg-primary/5' 
                  : isCorrect 
                    ? 'border-green-500 bg-green-50 text-green-700'
                    : isWrong
                      ? 'border-red-500 bg-red-50 text-red-700'
                      : option === question.correctAnswer
                        ? 'border-green-500 bg-green-50 text-green-700' // Highlight correct answer if wrong selected
                        : 'border-gray-200 opacity-50'
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
