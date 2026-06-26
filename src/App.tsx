import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import Lottie from 'lottie-react';
import { StartScreen, type CategoryType, type PartType } from './components/StartScreen';
import { QuizComponent } from './components/QuizComponent';
import { ResultScreen } from './components/ResultScreen';
import { Navbar } from './components/Navbar';
import { allQuestions as questionsData } from './data/questions';
import lottieBg from './assets/bg1.json';
import bgVideo from './assets/bg3.mp4';

// Handle CommonJS/ESM interop mismatch for Lottie
const LottiePlayer = (Lottie as any).default || Lottie;

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
    
    if (settings.category === 'chapter1') {
      questionsList = questionsList.filter(q => q.id >= 1 && q.id <= 250);
      if (settings.part === 'part1') {
        questionsList = questionsList.filter(q => q.id >= 1 && q.id <= 50);
      } else if (settings.part === 'part2') {
        questionsList = questionsList.filter(q => q.id >= 51 && q.id <= 100);
      } else if (settings.part === 'part3') {
        questionsList = questionsList.filter(q => q.id >= 101 && q.id <= 150);
      } else if (settings.part === 'part4') {
        questionsList = questionsList.filter(q => q.id >= 151 && q.id <= 200);
      } else if (settings.part === 'part5') {
        questionsList = questionsList.filter(q => q.id >= 201 && q.id <= 250);
      }
    } else if (settings.category === 'chapter3_4') {
      questionsList = questionsList.filter(q => (q.id >= 1101 && q.id <= 1150) || (q.id >= 331 && q.id <= 380));
      if (settings.part === 'part1') {
        questionsList = questionsList.filter(q => q.id >= 1101 && q.id <= 1150);
      } else if (settings.part === 'part2') {
        questionsList = questionsList.filter(q => q.id >= 331 && q.id <= 380);
      }
    } else if (settings.category === 'chapter5') {
      questionsList = questionsList.filter(q => q.id >= 251 && q.id <= 320);
    } else if (settings.category === 'chapter6') {
      questionsList = questionsList.filter(q => q.id >= 401 && q.id <= 490);
      if (settings.part === 'part1') {
        questionsList = questionsList.filter(q => q.id >= 401 && q.id <= 445);
      } else if (settings.part === 'part2') {
        questionsList = questionsList.filter(q => q.id >= 446 && q.id <= 490);
      }
    } else if (settings.category === 'chapter7') {
      questionsList = questionsList.filter(q => q.id >= 501 && q.id <= 729);
      if (settings.part === 'part1') {
        questionsList = questionsList.filter(q => q.id >= 501 && q.id <= 569);
      } else if (settings.part === 'part2') {
        questionsList = questionsList.filter(q => q.id >= 601 && q.id <= 636);
      } else if (settings.part === 'part3') {
        questionsList = questionsList.filter(q => q.id >= 701 && q.id <= 729);
      }
    } else if (settings.category === 'chapter8') {
      questionsList = questionsList.filter(q => q.id >= 801 && q.id <= 1038);
      if (settings.part === 'part1') {
        questionsList = questionsList.filter(q => q.id >= 801 && q.id <= 847);
      } else if (settings.part === 'part2') {
        questionsList = questionsList.filter(q => q.id >= 901 && q.id <= 962);
      } else if (settings.part === 'part3') {
        questionsList = questionsList.filter(q => q.id >= 1001 && q.id <= 1038);
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
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col items-center justify-center p-4 py-8 relative overflow-x-hidden pt-28">
      <Navbar onHome={() => setGameState('start')} />
      
      {/* Background Media */}
      {gameState === 'start' ? (
        <video
          autoPlay
          loop
          muted
          playsInline
          className="fixed inset-0 w-full h-full object-cover -z-10 opacity-[0.22] pointer-events-none"
        >
          <source src={bgVideo} type="video/mp4" />
        </video>
      ) : (
        /* Global Background Lottie Player for other pages */
        <div className="fixed inset-0 w-screen h-screen pointer-events-none flex items-center justify-center overflow-hidden -z-10">
          <LottiePlayer 
            animationData={lottieBg} 
            loop={true} 
            className="w-full h-full object-cover opacity-[0.2]"
          />
        </div>
      )}
      
      <div className="relative z-10 w-full flex flex-col items-center justify-center">
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
    </div>
  );
}

export default App;

