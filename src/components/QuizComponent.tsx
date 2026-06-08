import { useState } from 'react';
import { motion } from 'framer-motion';

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

export const QuizComponent = ({ question, totalQuestions, currentIndex, onAnswer, onBack }: Props) => {
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
    setSelectedMulti(prev => 
      prev.includes(option)
        ? prev.filter(item => item !== option)
        : [...prev, option]
    );
  };

  // Multiple-choice submit logic
  const handleSubmitMulti = () => {
    if (selectedMulti.length === 0 || submitted) return;
    setSubmitted(true);

    const correctList = question.correctAnswers || [];
    const isCorrect = selectedMulti.length === correctList.length &&
      selectedMulti.every(opt => correctList.includes(opt));

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
          {question.isMultipleChoice && (
            <span className="text-xs bg-amber-500/10 text-amber-600 font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider">
              Көп таңдаулы сұрақ
            </span>
          )}
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

      {/* Options List */}
      <div className="space-y-4">
        {question.options.map((option, idx) => {
          if (question.isMultipleChoice) {
            const isSelected = selectedMulti.includes(option);
            const isCorrectAnswer = (question.correctAnswers || []).includes(option);
            
            let buttonClass = 'border-gray-100 hover:border-primary hover:bg-primary/5 text-gray-700 bg-white';
            
            if (submitted) {
              if (isCorrectAnswer) {
                buttonClass = 'border-green-500 bg-green-50 text-green-700 font-bold';
              } else if (isSelected) {
                buttonClass = 'border-red-500 bg-red-50 text-red-700 font-bold';
              } else {
                buttonClass = 'border-gray-50 opacity-40 text-gray-400 bg-white';
              }
            } else if (isSelected) {
              buttonClass = 'border-primary bg-primary/5 text-primary font-bold';
            }

            return (
              <button
                key={idx}
                onClick={() => handleToggleMulti(option)}
                disabled={submitted}
                className={`w-full text-left p-4.5 rounded-xl border-2 transition-all cursor-pointer font-medium text-sm sm:text-base flex items-center justify-between ${buttonClass}`}
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-5 h-5 rounded flex items-center justify-center border transition-all flex-shrink-0 ${
                    isSelected
                      ? submitted
                        ? isCorrectAnswer
                          ? 'bg-green-500 border-green-500 text-white'
                          : 'bg-red-500 border-red-500 text-white'
                        : 'bg-primary border-primary text-white'
                      : submitted && isCorrectAnswer
                        ? 'bg-green-500 border-green-500 text-white'
                        : 'border-gray-300 bg-white'
                  }`}>
                    {(isSelected || (submitted && isCorrectAnswer)) && (
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                  <span>{option}</span>
                </div>
              </button>
            );
          } else {
            // Single choice questions
            const isSelected = selectedSingle === option;
            const isCorrect = selectedSingle && option === question.correctAnswer;
            const isWrong = isSelected && !isCorrect;

            let buttonClass = 'border-gray-100 hover:border-primary hover:bg-primary/5 text-gray-700 bg-white';
            
            if (selectedSingle !== null) {
              if (isCorrect) {
                buttonClass = 'border-green-500 bg-green-50 text-green-700 font-bold';
              } else if (isWrong) {
                buttonClass = 'border-red-500 bg-red-50 text-red-700 font-bold';
              } else if (option === question.correctAnswer) {
                buttonClass = 'border-green-500 bg-green-50 text-green-700 font-bold';
              } else {
                buttonClass = 'border-gray-50 opacity-40 text-gray-400 bg-white';
              }
            }

            return (
              <button
                key={idx}
                onClick={() => handleSelectSingle(option)}
                disabled={selectedSingle !== null}
                className={`w-full text-left p-4.5 rounded-xl border-2 transition-all cursor-pointer font-medium text-sm sm:text-base ${buttonClass}`}
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
            className={`px-8 py-3.5 rounded-full font-bold text-base shadow-md transition-all cursor-pointer ${
              selectedMulti.length === 0 || submitted
                ? 'bg-gray-100 text-gray-400 border border-gray-200 shadow-none cursor-not-allowed'
                : 'bg-primary text-white hover:bg-primary/95 transform hover:scale-[1.02] active:scale-98'
            }`}
          >
            {submitted ? 'Жауап тексерілуде...' : 'Жауап беру'}
          </button>
        </div>
      )}
    </motion.div>
  );
};
