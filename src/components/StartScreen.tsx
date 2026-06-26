import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export type CategoryType = 'chapter1' | 'chapter3_4' | 'chapter5' | 'chapter6' | 'chapter7' | 'chapter8';
export type PartType = 'part1' | 'part2' | 'part3' | 'part4' | 'part5' | 'all';

type Settings = {
  category: CategoryType;
  part: PartType;
  shuffle: boolean;
  limitTo20: boolean;
};

type Props = {
  onStart: (settings: Settings) => void;
};

type PartItem = {
  id: PartType;
  title: string;
  desc: string;
  range: string;
  icon: string;
};

export const StartScreen = ({ onStart }: Props) => {
  const [category, setCategory] = useState<CategoryType>('chapter1');
  const [part, setPart] = useState<PartType>('all');
  const [shuffle, setShuffle] = useState(false);
  const [limitTo20, setLimitTo20] = useState(false);

  // Handle changing category (reset part selection to 'all')
  const handleCategoryChange = (cat: CategoryType) => {
    setCategory(cat);
    setPart('all');
  };

  const categories = [
    {
      id: 'chapter1' as CategoryType,
      title: '1-бөлім. Молекулалық биология және биохимия',
      desc: 'Судың маңызы, көмірсулар, полисахаридтер, липидтер, нәруыздар мен нуклеин қышқылдарының құрылысы мен қасиеттері.',
      icon: '🧬'
    },
    {
      id: 'chapter3_4' as CategoryType,
      title: '3–4 бөлім. Қоректену және Заттардың тасымалдануы',
      desc: 'Ферменттер белсенділігі, гемоглобин мен миоглобин, эритроциттер, капиллярлар, және мембрана арқылы заттардың тасымалдануы.',
      icon: '🌱'
    },
    {
      id: 'chapter5' as CategoryType,
      title: '5-бөлім. Тыныс алу',
      desc: 'АТФ құрылысы, аэробты және анаэробты тыныс алу, гликолиз, Кребс циклі және митохондриялар.',
      icon: '🫁'
    },
    {
      id: 'chapter6' as CategoryType,
      title: '6-бөлім. Бөліп шығару',
      desc: 'Зәр түзілу механизмі, нефрон құрылысы, реабсорбция, диализ түрлері және бүйрек трансплантациясы.',
      icon: '🧪'
    },
    {
      id: 'chapter7' as CategoryType,
      title: '7-бөлім. Жасушалық цикл және көбею',
      desc: 'Митоз, мейоз фазалары, гаметогенез кезеңдері, өсімдіктердегі қосарлы ұрықтану, қатерлі ісіктер және қартаю геронтологиясы.',
      icon: '🔄'
    },
    {
      id: 'chapter8' as CategoryType,
      title: '8-бөлім. Тұқымқуалаушылық пен өзгергіштік заңдылықтары',
      desc: 'Модификациялық өзгергіштік, Мендель заңдары, жыныспен тіркес аурулар, мутация түрлері мен хромосомалық аурулар.',
      icon: '🫘'
    }
  ];

  const categoryPartsMap: Record<CategoryType, PartItem[]> = {
    chapter1: [
      {
        id: 'part1',
        title: '1-бөлім 1-50',
        desc: 'Судың маңызы, моносахаридтер, дисахаридтер және олардың қасиеттері.',
        range: '1 - 50 сұрақтар',
        icon: '💧'
      },
      {
        id: 'part2',
        title: '1-бөлім 50-100',
        desc: 'Крахмал, целлюлоза, гликоген, майлар, олардың жіктелуі және энергетикалық құндылығы.',
        range: '51 - 100 сұрақтар',
        icon: '🥑'
      },
      {
        id: 'part3',
        title: '1-бөлім 100-150',
        desc: 'Нәруыздар мен нуклеин қышқылдарының құрылымы (1-4 деңгейлері), денатурация, ренатурация, ДНҚ және РНҚ құрылымы.',
        range: '101 - 150 сұрақтар',
        icon: '🧬'
      },
      {
        id: 'part4',
        title: '1-бөлім 150-200',
        desc: 'ДНҚ мен РНҚ молекулалық құрылымы, репликация гипотезалары мен модельдері, РНҚ түрлері.',
        range: '151 - 200 сұрақтар',
        icon: '🧬'
      },
      {
        id: 'part5',
        title: '1-бөлім 200-250',
        desc: 'Ақуыз синтезі, РНҚ түрлері, көмірсулар мен нәруыздардың құрылымы мен қызметі (Жаңа сұрақтар).',
        range: '201 - 250 сұрақтар',
        icon: '🧪'
      },
      {
        id: 'all',
        title: 'Жалпы жинақ (Толық тест)',
        desc: 'Молекулалық биология және биохимия бөлімінің барлық сұрақтары.',
        range: '1 - 250 сұрақтар',
        icon: '📚'
      }
    ],
    chapter3_4: [
      {
        id: 'part1',
        title: '3-бөлім. Қоректену',
        desc: 'Ферменттер, ингибиторлар мен активаторлар, гемоглобин мен миоглобин құрылысы, эритроциттер мен капиллярлар.',
        range: '1101 - 1150 сұрақтар',
        icon: '🥗'
      },
      {
        id: 'part2',
        title: '4-бөлім. Заттардың тасымалдануы',
        desc: 'Мембрана арқылы пассивті және активті тасымалдау, симпорт, antiport, унипорт, қарапайым және жеңілдетілген диффузия.',
        range: '331 - 380 сұрақтар',
        icon: '🔄'
      },
      {
        id: 'all',
        title: 'Жалпы жинақ (Толық тест)',
        desc: 'Қоректену және заттардың тасымалдануы бөлімдерінің барлық сұрақтары.',
        range: '1101 - 1150 & 331 - 380 сұрақтар',
        icon: '📚'
      }
    ],
    chapter5: [
      {
        id: 'part1',
        title: '5-бөлім. Тыныс алу',
        desc: 'АТФ құрылысы, аэробты және анаэробты тыныс алу, гликолиз, Кребс циклі және митохондриялар.',
        range: '251 - 320 сұрақтар',
        icon: '🫁'
      },
      {
        id: 'all',
        title: 'Жалпы жинақ (Толық тест)',
        desc: 'Тыныс алу бөлімінің барлық сұрақтары.',
        range: '251 - 320 сұрақтар',
        icon: '📚'
      }
    ],
    chapter6: [
      {
        id: 'part1',
        title: '6.1-бөлім: Бөліп шығару (Сүзгілеу және реттелу)',
        desc: 'Зәр түзілу механизмі, бүйрек және нефрон құрылысы, сүзу, реабсорбция және су-тұз алмасуының гормондық реттелуі.',
        range: '401 - 445 сұрақтар',
        icon: '🧪'
      },
      {
        id: 'part2',
        title: '6.2-бөлім: Бөліп шығару (Диализ және трансплантация)',
        desc: 'Диализ түрлері, бүйрек аурулары, трансплантация және жасанды тазарту әдістері бойынша мәтіндік тапсырмалар.',
        range: '446 - 490 сұрақтар',
        icon: '🏥'
      },
      {
        id: 'all',
        title: 'Жалпы жинақ (Толық тест)',
        desc: 'Бөліп шығару бөлімінің барлық сұрақтары.',
        range: '401 - 490 сұрақтар',
        icon: '📚'
      }
    ],
    chapter7: [
      {
        id: 'part1',
        title: '7.1-бөлім: Жасушалық цикл және көбею',
        desc: 'Митоз, мейоз фазалары, гаметогенез кезеңдері, өсімдіктердегі қосарлы ұрықтану және көбею.',
        range: '501 - 569 сұрақтар',
        icon: '🔄'
      },
      {
        id: 'part2',
        title: '7.2-бөлім: Қатерлі ісік және канцерогенез',
        desc: 'Қатерлі және қатерсіз ісіктер, канцерогендер, онкогендік вирустар және ісіктің алдын алу.',
        range: '601 - 636 сұрақтар',
        icon: '🦠'
      },
      {
        id: 'part3',
        title: '7.3-бөлім: Организмнің қартаюы және геронтология',
        desc: 'Физиологиялық және ерте қартаю, прогерия синдромдары, қартаю теориялары және геронтология.',
        range: '701 - 729 сұрақтар',
        icon: '⏳'
      },
      {
        id: 'all',
        title: 'Жалпы жинақ (Толық тест)',
        desc: 'Жасушалық цикл және көбею бөлімінің барлық сұрақтары.',
        range: '501 - 729 сұрақтар',
        icon: '📚'
      }
    ],
    chapter8: [
      {
        id: 'part1',
        title: '8.1-бөлім: Тұқымқуалаушылық пен өзгергіштік (Мендель заңдары)',
        desc: 'Модификациялық өзгергіштік, вариация қатары, Мендельдің І және ІІ заңдары, моногибридті және дигибридті будандастыру.',
        range: '801 - 847 сұрақтар',
        icon: '🫘'
      },
      {
        id: 'part2',
        title: '8.2-бөлім: Жыныспен тіркесіп тұқым қуалау және мутациялар',
        desc: 'Жыныспен тіркескен аурулар (гемофилия, дальтонизм), кроссинговер, гендердің әрекеттесу түрлері және мутация түрлері.',
        range: '901 - 962 сұрақтар',
        icon: '🧬'
      },
      {
        id: 'part3',
        title: '8.3-бөлім: Хромосомалық аурулар мен синдромдар',
        desc: 'Адам қан топтарының тұқым қуалауы, Клайнфельтер, Даун, Патау, Эдвардс және Шерешевский-Тернер синдромдары.',
        range: '1001 - 1038 сұрақтар',
        icon: '🏥'
      },
      {
        id: 'all',
        title: 'Жалпы жинақ (Толық тест)',
        desc: 'Тұқымқуалаушылық пен өзгергіштік бөлімінің барлық сұрақтары.',
        range: '801 - 1038 сұрақтар',
        icon: '📚'
      }
    ]
  };

  const activeParts = categoryPartsMap[category];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="flex flex-col items-center justify-center min-h-[80vh] w-full max-w-5xl mx-auto p-4"
    >
      <div className="mb-4 text-primary bg-primary/10 px-4 py-1.5 rounded-full text-sm font-bold tracking-wider uppercase">
        10-сынып • Биология Тесттері
      </div>
      
      <h1 className="text-4xl md:text-5xl font-black text-text mb-4 text-center leading-tight">
        Биология және Биохимия <br />
        <span className="text-primary bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          Интерактивті Тесттер
        </span>
      </h1>
      
      <p className="text-base md:text-lg text-gray-600 mb-8 text-center max-w-xl leading-relaxed">
        Тақырыптық бағытты таңдап, тиісті бөлім бойынша біліміңізді тексеріңіз.
      </p>

      {/* Category Tabs */}
      <h3 className="font-extrabold text-gray-700 text-sm uppercase tracking-wider mb-3 self-start">
        Тест бағытын таңдаңыз:
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full mb-8">
        {categories.map((cat) => {
          const isSelected = category === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => handleCategoryChange(cat.id)}
              className={`p-5 rounded-2xl border-2 transition-all text-left flex flex-col justify-between cursor-pointer ${
                isSelected
                  ? 'border-primary bg-primary/5 shadow-sm shadow-primary/5'
                  : 'border-gray-100 hover:border-gray-300 hover:bg-gray-50/50 bg-white'
              }`}
            >
              <div className="flex items-center space-x-3 mb-2">
                <span className="text-2xl">{cat.icon}</span>
                <h4 className="font-bold text-text text-sm md:text-base leading-tight">
                  {cat.title}
                </h4>
              </div>
              <p className="text-[11px] text-gray-500 leading-relaxed mt-1">
                {cat.desc}
              </p>
            </button>
          );
        })}
      </div>
      
      {/* Parts Grid Selection */}
      <h3 className="font-extrabold text-gray-700 text-sm uppercase tracking-wider mb-4 self-start">
        Тақырыптық бөлімді таңдаңыз:
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full mb-8">
        <AnimatePresence mode="popLayout">
          {activeParts.map((item) => {
            const isSelected = part === item.id;
            return (
              <motion.button
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                key={item.id}
                onClick={() => setPart(item.id)}
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
                  {item.icon}
                </div>
                <div className="space-y-1">
                  <span className="text-xs font-bold text-primary tracking-wider block uppercase">
                    {item.range}
                  </span>
                  <h4 className="font-bold text-text text-base md:text-lg pr-6">
                    {item.title}
                  </h4>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </motion.button>
            );
          })}
        </AnimatePresence>
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
          onClick={() => onStart({ category, part, shuffle, limitTo20 })}
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
