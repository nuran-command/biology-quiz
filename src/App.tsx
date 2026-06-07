import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { StartScreen } from './components/StartScreen';
import { QuizComponent } from './components/QuizComponent';
import { ResultScreen } from './components/ResultScreen';
import questionsData from './data/questions.json';

function App() {
  const [gameState, setGameState] = useState<'start' | 'quiz' | 'result'>('start');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);

  const handleStart = () => {
    setGameState('quiz');
    setCurrentIndex(0);
    setScore(0);
  };

  const handleAnswer = (isCorrect: boolean) => {
    if (isCorrect) setScore(s => s + 1);
    
    if (currentIndex + 1 < questionsData.length) {
      setCurrentIndex(i => i + 1);
    } else {
      setGameState('result');
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <AnimatePresence mode="wait">
        {gameState === 'start' && (
          <StartScreen key="start" onStart={handleStart} />
        )}
        
        {gameState === 'quiz' && (
          <QuizComponent 
            key={`quiz-${currentIndex}`}
            question={questionsData[currentIndex]} 
            currentIndex={currentIndex}
            totalQuestions={questionsData.length}
            onAnswer={handleAnswer}
          />
        )}
        
        {gameState === 'result' && (
          <ResultScreen 
            key="result"
            score={score}
            total={questionsData.length}
            onRestart={handleStart}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
