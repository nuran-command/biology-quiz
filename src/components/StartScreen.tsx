
import { motion } from 'framer-motion';

export const StartScreen = ({ onStart }: { onStart: () => void }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="flex flex-col items-center justify-center min-h-[60vh] text-center"
    >
      <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6">
        Биология және Биохимия
      </h1>
      <p className="text-xl text-gray-600 mb-8 max-w-2xl">
        10-сыныпқа арналған молекулалық биология және биохимия бойынша тест
      </p>
      <button 
        onClick={onStart}
        className="px-8 py-4 bg-primary text-white rounded-full text-xl font-semibold shadow-lg hover:bg-primary/90 transition-all transform hover:scale-105 active:scale-95"
      >
        Тестті Бастау
      </button>
    </motion.div>
  );
};
