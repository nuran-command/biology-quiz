import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { StartScreen, type CategoryType, type PartType } from './components/StartScreen';
import { QuizComponent } from './components/QuizComponent';
import { ResultScreen } from './components/ResultScreen';
import questionsData from './data/questions.json';

export type Question = {
  id: number;
  question: string;
  options: string[];
  correctAnswer: string | null;
  correctAnswers?: string[] | null;
  isMultipleChoice?: boolean;
};

export type UserAnswer = {
  questionId: number;
  questionText: string;
  selectedOptions: string[];
  correctOptions: string[];
  isCorrect: boolean;
  isMultipleChoice: boolean;
};

type Settings = {
  category: CategoryType;
  part: PartType;
  shuffle: boolean;
  limitTo20: boolean;
};

function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function App() {
  const [gameState, setGameState] = useState<'start' | 'quiz' | 'result'>('start');
  const [activeQuestions, setActiveQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<UserAnswer[]>([]);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [endTime, setEndTime] = useState<number | null>(null);

  const handleStart = (settings: Settings) => {
    let questionsList = [...questionsData] as Question[];
    
    // Filter by category and part
    if (settings.category === 'molecular_biology') {
      questionsList = questionsList.filter(q => q.id >= 1 && q.id <= 150);
      if (settings.part === 'part1') {
        questionsList = questionsList.filter(q => q.id >= 1 && q.id <= 50);
      } else if (settings.part === 'part2') {
        questionsList = questionsList.filter(q => q.id >= 51 && q.id <= 100);
      } else if (settings.part === 'part3') {
        questionsList = questionsList.filter(q => q.id >= 101 && q.id <= 150);
      }
    } else if (settings.category === 'nutrition_transport') {
      questionsList = questionsList.filter(q => q.id >= 151 && q.id <= 250);
      if (settings.part === 'part1') {
        questionsList = questionsList.filter(q => q.id >= 151 && q.id <= 200);
      } else if (settings.part === 'part2') {
        questionsList = questionsList.filter(q => q.id >= 201 && q.id <= 250);
      }
    }
    
    if (settings.shuffle) {
      questionsList = shuffleArray(questionsList);
    }
    
    if (settings.limitTo20) {
      questionsList = questionsList.slice(0, 20);
    }
    
    setActiveQuestions(questionsList);
    setCurrentIndex(0);
    setScore(0);
    setAnswers([]);
    setStartTime(Date.now());
    setEndTime(null);
    setGameState('quiz');
  };

  const handleAnswer = (selectedOptions: string[], isCorrect: boolean) => {
    const currentQuestion = activeQuestions[currentIndex];
    
    const newAnswer: UserAnswer = {
      questionId: currentQuestion.id,
      questionText: currentQuestion.question,
      selectedOptions,
      correctOptions: currentQuestion.isMultipleChoice && currentQuestion.correctAnswers
        ? currentQuestion.correctAnswers
        : [currentQuestion.correctAnswer || ''],
      isCorrect,
      isMultipleChoice: !!currentQuestion.isMultipleChoice
    };

    setAnswers(prev => [...prev, newAnswer]);
    if (isCorrect) setScore(s => s + 1);
    
    if (currentIndex + 1 < activeQuestions.length) {
      setCurrentIndex(i => i + 1);
    } else {
      setEndTime(Date.now());
      setGameState('result');
    }
  };

  const totalTimeSeconds = startTime && endTime ? Math.round((endTime - startTime) / 1000) : 0;

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4 py-8">
      <AnimatePresence mode="wait">
        {gameState === 'start' && (
          <StartScreen key="start" onStart={handleStart} />
        )}
        
        {gameState === 'quiz' && activeQuestions.length > 0 && (
          <QuizComponent 
            key={`quiz-${currentIndex}`}
            question={activeQuestions[currentIndex]} 
            currentIndex={currentIndex}
            totalQuestions={activeQuestions.length}
            onAnswer={handleAnswer}
            onBack={() => setGameState('start')}
          />
        )}
        
        {gameState === 'result' && (
          <ResultScreen 
            key="result"
            score={score}
            total={activeQuestions.length}
            answers={answers}
            durationSeconds={totalTimeSeconds}
            onRestart={() => setGameState('start')}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;

