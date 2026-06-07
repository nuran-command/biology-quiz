import { useEffect } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';

type Props = {
  score: number;
  total: number;
  onRestart: () => void;
};

export const ResultScreen = ({ score, total, onRestart }: Props) => {
  const percentage = Math.round((score / total) * 100);
  
  useEffect(() => {
    if (percentage > 50) {
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  }, [percentage]);

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center w-full max-w-xl mx-auto bg-white p-12 rounded-3xl shadow-xl"
    >
      <h2 className="text-4xl font-bold mb-4 text-text">Нәтиже</h2>
      <div className="text-6xl font-extrabold text-primary mb-6">
        {score} / {total}
      </div>
      <p className="text-xl text-gray-600 mb-8">
        Сіз {percentage}% сұраққа дұрыс жауап бердіңіз!
      </p>
      
      <button 
        onClick={onRestart}
        className="px-8 py-4 bg-primary text-white rounded-full text-lg font-semibold shadow-md hover:bg-primary/90 transition-all"
      >
        Қайтадан бастау
      </button>
    </motion.div>
  );
};
