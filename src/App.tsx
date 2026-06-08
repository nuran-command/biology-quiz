import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { StartScreen, type TestType } from './components/StartScreen';
import { QuizComponent } from './components/QuizComponent';
import { ResultScreen } from './components/ResultScreen';
import questionsData from './data/questions.json';

type Question = {
  id: number;
  question: string;
  options: string[];
  correctAnswer: string;
};

export type UserAnswer = {
  questionId: number;
  questionText: string;
  selectedOption: string;
  correctOption: string;
  isCorrect: boolean;
};

type Settings = {
  testType: TestType;
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
    let questionsList = [...questionsData];
    
    // Filter by test section
    if (settings.testType === 'part1') {
      questionsList = questionsList.filter(q => q.id >= 1 && q.id <= 50);
    } else if (settings.testType === 'part2') {
      questionsList = questionsList.filter(q => q.id >= 51 && q.id <= 100);
    } else if (settings.testType === 'part3') {
      questionsList = questionsList.filter(q => q.id >= 101 && q.id <= 150);
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

  const handleAnswer = (selectedOption: string, isCorrect: boolean) => {
    const currentQuestion = activeQuestions[currentIndex];
    
    const newAnswer: UserAnswer = {
      questionId: currentQuestion.id,
      questionText: currentQuestion.question,
      selectedOption,
      correctOption: currentQuestion.correctAnswer,
      isCorrect
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

