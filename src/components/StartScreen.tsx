import { useState } from 'react';
import { motion } from 'framer-motion';

type Settings = {
  shuffle: boolean;
  limitTo20: boolean;
};

type Props = {
  onStart: (settings: Settings) => void;
};

export const StartScreen = ({ onStart }: Props) => {
  const [shuffle, setShuffle] = useState(false);
  const [limitTo20, setLimitTo20] = useState(false);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="flex flex-col items-center justify-center min-h-[60vh] text-center max-w-2xl mx-auto p-6"
    >
      <div className="mb-4 text-primary bg-primary/10 px-4 py-1.5 rounded-full text-sm font-semibold tracking-wider uppercase">
        10-сынып • Молекулалық биология
      </div>
      
      <h1 className="text-4xl md:text-5xl font-extrabold text-text mb-6 tracking-tight leading-tight">
        Биология және Биохимия <br />
        <span className="text-primary bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Интерактивті Тест
        </span>
      </h1>
      
      <p className="text-lg text-gray-600 mb-8 max-w-lg leading-relaxed">
        Молекулалық биология және биохимия тараулары бойынша біліміңізді тексеріңіз. Жалпы 100 сұрақ қамтылған.
      </p>

      {/* Settings Panel */}
      <div className="w-full max-w-md bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-8 text-left space-y-4">
        <h3 className="font-semibold text-gray-700 text-sm uppercase tracking-wider mb-2">
          Тест баптаулары:
        </h3>
        
        <label className="flex items-center space-x-3 cursor-pointer group p-2 rounded-lg hover:bg-gray-50 transition-colors">
          <input 
            type="checkbox" 
            checked={shuffle}
            onChange={(e) => setShuffle(e.target.checked)}
            className="w-5 h-5 rounded border-gray-300 text-primary focus:ring-primary focus:ring-offset-2 accent-primary"
          />
          <div className="flex flex-col">
            <span className="font-medium text-text group-hover:text-primary transition-colors">
              Сұрақтарды араластыру
            </span>
            <span className="text-xs text-gray-500">
              Сұрақтар мен жауаптар нұсқалары кездейсоқ ретпен көрсетіледі
            </span>
          </div>
        </label>

        <label className="flex items-center space-x-3 cursor-pointer group p-2 rounded-lg hover:bg-gray-50 transition-colors">
          <input 
            type="checkbox" 
            checked={limitTo20}
            onChange={(e) => setLimitTo20(e.target.checked)}
            className="w-5 h-5 rounded border-gray-300 text-primary focus:ring-primary focus:ring-offset-2 accent-primary"
          />
          <div className="flex flex-col">
            <span className="font-medium text-text group-hover:text-primary transition-colors">
              Жылдам режим (20 сұрақ)
            </span>
            <span className="text-xs text-gray-500">
              100 сұрақтың ішінен кездейсоқ 20 сұрақ таңдалады
            </span>
          </div>
        </label>
      </div>

      <button 
        onClick={() => onStart({ shuffle, limitTo20 })}
        className="px-10 py-4.5 bg-primary text-white rounded-full text-xl font-bold shadow-lg hover:bg-primary/95 transition-all transform hover:scale-[1.02] active:scale-98 cursor-pointer flex items-center space-x-2"
      >
        <span>Тестті Бастау</span>
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
        </svg>
      </button>
    </motion.div>
  );
};

