import { useState } from 'react';
import { motion } from 'framer-motion';

export type TestType = 'part1' | 'part2' | 'part3' | 'all';

type Settings = {
  testType: TestType;
  shuffle: boolean;
  limitTo20: boolean;
};

type Props = {
  onStart: (settings: Settings) => void;
};

export const StartScreen = ({ onStart }: Props) => {
  const [testType, setTestType] = useState<TestType>('all');
  const [shuffle, setShuffle] = useState(false);
  const [limitTo20, setLimitTo20] = useState(false);

  const tests = [
    {
      id: 'part1' as TestType,
      title: '1-бөлім: Су және көмірсулар',
      desc: 'Судың маңызы, моносахаридтер, дисахаридтер және олардың қасиеттері.',
      range: '1 - 50 сұрақтар',
      icon: '💧'
    },
    {
      id: 'part2' as TestType,
      title: '2-бөлім: Полисахаридтер мен липидтер',
      desc: 'Крахмал, целлюлоза, гликоген, майлар, олардың жіктелуі және энергетикалық құндылығы.',
      range: '51 - 100 сұрақтар',
      icon: '🥑'
    },
    {
      id: 'part3' as TestType,
      title: '3-бөлім: Нәруыздар мен нуклеин қышқылдары',
      desc: 'Нәруыздардың құрылымы (1-4 деңгейлері), денатурация, ренатурация, ДНҚ және РНҚ құрылымы.',
      range: '101 - 150 сұрақтар',
      icon: '🧬'
    },
    {
      id: 'all' as TestType,
      title: 'Жалпы жинақ (Толық тест)',
      desc: 'Жоғарыдағы барлық 3 бөлімді қамтитын толық көлемді тест жинағы.',
      range: '1 - 150 сұрақтар',
      icon: '📚'
    }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="flex flex-col items-center justify-center min-h-[80vh] w-full max-w-4xl mx-auto p-4"
    >
      <div className="mb-4 text-primary bg-primary/10 px-4 py-1.5 rounded-full text-sm font-bold tracking-wider uppercase">
        10-сынып • Молекулалық биология және биохимия
      </div>
      
      <h1 className="text-4xl md:text-5xl font-black text-text mb-4 text-center leading-tight">
        Биология және Биохимия <br />
        <span className="text-primary bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Интерактивті Тесттер
        </span>
      </h1>
      
      <p className="text-base md:text-lg text-gray-600 mb-10 text-center max-w-xl leading-relaxed">
        Тақырыпты таңдап, біліміңізді тексеріңіз. Әр бөлім сәйкес бағдарламаға сай дұрыс жауаптарымен толықтырылған.
      </p>

      {/* Grid Selection */}
      <h3 className="font-extrabold text-gray-700 text-sm uppercase tracking-wider mb-4 self-start">
        Тест тақырыбын таңдаңыз:
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full mb-8">
        {tests.map((test) => {
          const isSelected = testType === test.id;
          return (
            <button
              key={test.id}
              onClick={() => setTestType(test.id)}
              className={`text-left p-5 rounded-2xl border-2 transition-all flex items-start space-x-4 cursor-pointer relative overflow-hidden ${
                isSelected 
                  ? 'border-primary bg-primary/5 shadow-md shadow-primary/5' 
                  : 'border-gray-100 hover:border-gray-300 hover:bg-gray-50/50 bg-white'
              }`}
            >
              {isSelected && (
                <div className="absolute top-0 right-0 w-8 h-8 bg-primary text-white flex items-center justify-center rounded-bl-xl">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              )}
              <div className="text-3xl p-3 bg-gray-100 rounded-xl flex-shrink-0">
                {test.icon}
              </div>
              <div className="space-y-1">
                <span className="text-xs font-bold text-primary tracking-wider block uppercase">
                  {test.range}
                </span>
                <h4 className="font-bold text-text text-base md:text-lg pr-6">
                  {test.title}
                </h4>
                <p className="text-xs text-gray-500 leading-relaxed">
                  {test.desc}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Settings & Controls */}
      <div className="w-full bg-white p-6 rounded-2xl shadow-sm border border-gray-100 mb-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex flex-col sm:flex-row gap-6">
          <label className="flex items-center space-x-3 cursor-pointer group">
            <input 
              type="checkbox" 
              checked={shuffle}
              onChange={(e) => setShuffle(e.target.checked)}
              className="w-5 h-5 rounded border-gray-300 text-primary focus:ring-primary focus:ring-offset-2 accent-primary"
            />
            <div className="flex flex-col">
              <span className="font-semibold text-text group-hover:text-primary transition-colors text-sm">
                Сұрақтарды араластыру
              </span>
              <span className="text-[11px] text-gray-500">
                Кездейсоқ ретпен көрсету
              </span>
            </div>
          </label>

          <label className="flex items-center space-x-3 cursor-pointer group">
            <input 
              type="checkbox" 
              checked={limitTo20}
              onChange={(e) => setLimitTo20(e.target.checked)}
              className="w-5 h-5 rounded border-gray-300 text-primary focus:ring-primary focus:ring-offset-2 accent-primary"
            />
            <div className="flex flex-col">
              <span className="font-semibold text-text group-hover:text-primary transition-colors text-sm">
                Жылдам режим (20 сұрақ)
              </span>
              <span className="text-[11px] text-gray-500">
                Кездейсоқ 20 сұрақ таңдау
              </span>
            </div>
          </label>
        </div>

        <button 
          onClick={() => onStart({ testType, shuffle, limitTo20 })}
          className="px-8 py-4 bg-primary text-white rounded-full text-lg font-bold shadow-lg hover:bg-primary/95 transition-all transform hover:scale-[1.02] active:scale-98 cursor-pointer flex items-center justify-center space-x-2 w-full md:w-auto"
        >
          <span>Тестті Бастау</span>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </button>
      </div>
    </motion.div>
  );
};
