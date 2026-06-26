import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SvgIcon } from './SvgIcon';

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
      icon: 'dna'
    },
    {
      id: 'chapter3_4' as CategoryType,
      title: '3–4 бөлім. Қоректену және Заттардың тасымалдануы',
      desc: 'Ферменттер белсенділігі, гемоглобин мен миоглобин, эритроциттер, капиллярлар, және мембрана арқылы заттардың тасымалдануы.',
      icon: 'nutrition'
    },
    {
      id: 'chapter5' as CategoryType,
      title: '5-бөлім. Тыныс алу',
      desc: 'АТФ құрылысы, аэробты және анаэробты тыныс алу, гликолиз, Кребс циклі және митохондриялар.',
      icon: 'respiration'
    },
    {
      id: 'chapter6' as CategoryType,
      title: '6-бөлім. Бөліп шығару',
      desc: 'Зәр түзілу механизмі, нефрон құрылысы, реабсорбция, диализ түрлері және бүйрек трансплантациясы.',
      icon: 'excretion'
    },
    {
      id: 'chapter7' as CategoryType,
      title: '7-бөлім. Жасушалық цикл және көбею',
      desc: 'Митоз, мейоз фазалары, гаметогенез кезеңдері, өсімдіктердегі қосарлы ұрықтану, қатерлі ісіктер және қартаю геронтологиясы.',
      icon: 'cell_cycle'
    },
    {
      id: 'chapter8' as CategoryType,
      title: '8-бөлім. Тұқымқуалаушылық пен өзгергіштік заңдылықтары',
      desc: 'Модификациялық өзгергіштік, Мендель заңдары, жыныспен тіркес аурулар, мутация түрлері мен хромосомалық аурулар.',
      icon: 'genetics'
    }
  ];

  const categoryPartsMap: Record<CategoryType, PartItem[]> = {
    chapter1: [
      {
        id: 'part1',
        title: '1-бөлім 1-50',
        desc: 'Судың маңызы, моносахаридтер, дисахаридтер және олардың қасиеттері.',
        range: '1 - 50 сұрақтар',
        icon: 'water'
      },
      {
        id: 'part2',
        title: '1-бөлім 50-100',
        desc: 'Крахмал, целлюлоза, гликоген, майлар, олардың жіктелуі және энергетикалық құндылығы.',
        range: '51 - 100 сұрақтар',
        icon: 'lipid'
      },
      {
        id: 'part3',
        title: '1-бөлім 100-150',
        desc: 'Нәруыздар мен нуклеин қышқылдарының құрылымы (1-4 деңгейлері), денатурация, ренатурация, ДНҚ және РНҚ құрылымы.',
        range: '101 - 150 сұрақтар',
        icon: 'dna'
      },
      {
        id: 'part4',
        title: '1-бөлім 150-200',
        desc: 'ДНҚ мен РНҚ молекулалық құрылымы, репликация гипотезалары мен модельдері, РНҚ түрлері.',
        range: '151 - 200 сұрақтар',
        icon: 'dna'
      },
      {
        id: 'part5',
        title: '1-бөлім 200-250',
        desc: 'Ақуыз синтезі, РНҚ түрлері, көмірсулар мен нәруыздардың құрылымы мен қызметі (Жаңа сұрақтар).',
        range: '201 - 250 сұрақтар',
        icon: 'excretion'
      },
      {
        id: 'all',
        title: 'Жалпы жинақ (Толық тест)',
        desc: 'Молекулалық биология және биохимия бөлімінің барлық сұрақтары.',
        range: '1 - 250 сұрақтар',
        icon: 'book'
      }
    ],
    chapter3_4: [
      {
        id: 'part1',
        title: '3-бөлім. Қоректену',
        desc: 'Ферменттер, ингибиторлар мен активаторлар, гемоглобин мен миоглобин құрылысы, эритроциттер мен капиллярлар.',
        range: '1 - 50 сұрақтар',
        icon: 'nutrition'
      },
      {
        id: 'part2',
        title: '4-бөлім. Заттардың тасымалдануы',
        desc: 'Мембрана арқылы пассивті және активті тасымалдау, симпорт, antiport, унипорт, қарапайым және жеңілдетілген диффузия.',
        range: '51 - 100 сұрақтар',
        icon: 'transport'
      },
      {
        id: 'all',
        title: 'Жалпы жинақ (Толық тест)',
        desc: 'Қоректену және заттардың тасымалдануы бөлімдерінің барлық сұрақтары.',
        range: '1 - 100 сұрақтар',
        icon: 'book'
      }
    ],
    chapter5: [
      {
        id: 'part1',
        title: '5-бөлім. Тыныс алу',
        desc: 'АТФ құрылысы, аэробты және анаэробты тыныс алу, гликолиз, Кребс циклі және митохондриялар.',
        range: '1 - 70 сұрақтар',
        icon: 'respiration'
      },
      {
        id: 'all',
        title: 'Жалпы жинақ (Толық тест)',
        desc: 'Тыныс алу бөлімінің барлық сұрақтары.',
        range: '1 - 70 сұрақтар',
        icon: 'book'
      }
    ],
    chapter6: [
      {
        id: 'part1',
        title: '6.1-бөлім: Бөліп шығару (Сүзгілеу және реттелу)',
        desc: 'Зәр түзілу механизмі, бүйрек және нефрон құрылысы, сүзу, реабсорбция және су-тұз алмасуының гормондық реттелуі.',
        range: '1 - 45 сұрақтар',
        icon: 'excretion'
      },
      {
        id: 'part2',
        title: '6.2-бөлім: Бөліп шығару (Диализ және трансплантация)',
        desc: 'Диализ түрлері, бүйрек аурулары, трансплантация және жасанды тазарту әдістері бойынша мәтіндік тапсырмалар.',
        range: '46 - 90 сұрақтар',
        icon: 'hospital'
      },
      {
        id: 'all',
        title: 'Жалпы жинақ (Толық тест)',
        desc: 'Бөліп шығару бөлімінің барлық сұрақтары.',
        range: '1 - 90 сұрақтар',
        icon: 'book'
      }
    ],
    chapter7: [
      {
        id: 'part1',
        title: '7.1-бөлім: Жасушалық цикл және көбею',
        desc: 'Митоз, мейоз фазалары, гаметогенез кезеңдері, өсімдіктердегі қосарлы ұрықтану және көбею.',
        range: '1 - 69 сұрақтар',
        icon: 'cell_cycle'
      },
      {
        id: 'part2',
        title: '7.2-бөлім: Қатерлі ісік және канцерогенез',
        desc: 'Қатерлі және қатерсіз ісіктер, канцерогендер, онкогендік вирустар және ісіктің алдын алу.',
        range: '70 - 105 сұрақтар',
        icon: 'virus'
      },
      {
        id: 'part3',
        title: '7.3-бөлім: Организмнің қартаюы және геронтология',
        desc: 'Физиологиялық және ерте қартаю, прогерия синдромдары, қартаю теориялары және геронтология.',
        range: '106 - 134 сұрақтар',
        icon: 'aging'
      },
      {
        id: 'all',
        title: 'Жалпы жинақ (Толық тест)',
        desc: 'Жасушалық цикл және көбею бөлімінің барлық сұрақтары.',
        range: '1 - 134 сұрақтар',
        icon: 'book'
      }
    ],
    chapter8: [
      {
        id: 'part1',
        title: '8.1-бөлім: Тұқымқуалаушылық пен өзгергіштік (Мендель заңдары)',
        desc: 'Модификациялық өзгергіштік, вариация қатары, Мендельдің І және ІІ заңдары, моногибридті және дигибридті будандастыру.',
        range: '1 - 47 сұрақтар',
        icon: 'genetics'
      },
      {
        id: 'part2',
        title: '8.2-бөлім: Жыныспен тіркесіп тұқым қуалау және мутациялар',
        desc: 'Жыныспен тіркескен аурулар (гемофилия, дальтонизм), кроссинговер, гендердің әрекеттесу түрлері және мутация түрлері.',
        range: '48 - 109 сұрақтар',
        icon: 'dna'
      },
      {
        id: 'part3',
        title: '8.3-бөлім: Хромосомалық аурулар мен синдромдар',
        desc: 'Адам қан топтарының тұқым қуалауы, Клайнфельтер, Даун, Патау, Эдвардс және Шерешевский-Тернер синдромдары.',
        range: '110 - 147 сұрақтар',
        icon: 'hospital'
      },
      {
        id: 'all',
        title: 'Жалпы жинақ (Толық тест)',
        desc: 'Тұқымқуалаушылық пен өзгергіштік бөлімінің барлық сұрақтары.',
        range: '1 - 147 сұрақтар',
        icon: 'book'
      }
    ]
  };

  const activeParts = categoryPartsMap[category];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="flex flex-col items-center justify-center min-h-[80vh] w-full max-w-5xl mx-auto p-4 pt-20"
    >
      <div className="mb-4 text-indigo-600 bg-indigo-50 border border-indigo-100 px-4 py-1.5 rounded-full text-xs md:text-sm font-bold tracking-wider uppercase shadow-[0_2px_10px_rgba(99,102,241,0.05)]">
        10-сынып • Биология Тесттері
      </div>
      
      <h1 className="text-4xl md:text-5xl font-black text-slate-800 mb-4 text-center leading-tight">
        Биология және Биохимия <br />
        <span className="font-marck text-5xl md:text-6xl text-primary bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent font-normal">
          Интерактивті Тесттер
        </span>
      </h1>
      
      <p className="text-base md:text-lg text-slate-500 mb-8 text-center max-w-xl leading-relaxed">
        Тақырыптық бағытты таңдап, тиісті бөлім бойынша біліміңізді тексеріңіз.
      </p>

      {/* Category Tabs */}
      <h3 className="font-extrabold text-slate-700 text-xs md:text-sm uppercase tracking-wider mb-4 self-start">
        Тест бағытын таңдаңыз:
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full mb-8">
        {categories.map((cat) => {
          const isSelected = category === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => handleCategoryChange(cat.id)}
              className={`p-5 rounded-2xl border transition-all text-left flex flex-col justify-between cursor-pointer relative overflow-hidden group ${
                isSelected
                  ? 'border-indigo-300 bg-indigo-50/80 shadow-[0_8px_32px_rgba(99,102,241,0.12),0_0_25px_rgba(99,102,241,0.18)] backdrop-blur-xl'
                  : 'border-white/50 bg-white/65 backdrop-blur-xl hover:bg-white/80 hover:border-white/80 shadow-[0_8px_30px_rgba(0,0,0,0.02)] hover:shadow-[0_12px_40px_rgba(99,102,241,0.08),0_0_20px_rgba(99,102,241,0.04)]'
              }`}
            >
              <div className="flex items-center space-x-3 mb-2">
                <div className="p-2 bg-slate-50/60 rounded-xl flex-shrink-0 group-hover:scale-105 transition-transform duration-300 border border-white/40">
                  <SvgIcon name={cat.icon} className="w-8 h-8" />
                </div>
                <h4 className="font-bold text-slate-800 text-sm md:text-base leading-tight">
                  {cat.title}
                </h4>
              </div>
              <p className="text-[11px] text-slate-500 leading-relaxed mt-2">
                {cat.desc}
              </p>
            </button>
          );
        })}
      </div>
      
      {/* Parts Grid Selection */}
      <h3 className="font-extrabold text-slate-700 text-xs md:text-sm uppercase tracking-wider mb-4 self-start">
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
                className={`text-left p-5 rounded-2xl border transition-all flex items-start space-x-4 cursor-pointer relative overflow-hidden group ${
                  isSelected 
                    ? 'border-indigo-300 bg-indigo-50/80 shadow-[0_8px_32px_rgba(99,102,241,0.12),0_0_25px_rgba(99,102,241,0.18)] backdrop-blur-xl' 
                    : 'border-white/50 bg-white/65 backdrop-blur-xl hover:bg-white/80 hover:border-white/80 shadow-[0_8px_30px_rgba(0,0,0,0.02)] hover:shadow-[0_12px_40px_rgba(99,102,241,0.08),0_0_20px_rgba(99,102,241,0.04)]'
                }`}
              >
                {isSelected && (
                  <div className="absolute top-0 right-0 w-8 h-8 bg-indigo-500 text-white flex items-center justify-center rounded-bl-xl z-10">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                )}
                <div className="p-3 bg-slate-50/60 rounded-xl flex-shrink-0 flex items-center justify-center group-hover:scale-105 transition-transform duration-300 border border-white/40">
                  <SvgIcon name={item.icon} className="w-8 h-8" />
                </div>
                <div className="space-y-1">
                  <span className="text-xs font-bold text-indigo-600 tracking-wider block uppercase">
                    {item.range}
                  </span>
                  <h4 className="font-bold text-slate-800 text-base md:text-lg pr-6">
                    {item.title}
                  </h4>
                  <p className="text-xs text-slate-500 leading-relaxed mt-1">
                    {item.desc}
                  </p>
                </div>
              </motion.button>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Settings & Controls */}
      <div className="w-full bg-white/65 backdrop-blur-xl p-6 rounded-2xl shadow-[0_10px_35px_rgba(0,0,0,0.03),0_0_20px_rgba(99,102,241,0.04)] border border-white/50 mb-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex flex-col sm:flex-row gap-6">
          <label className="flex items-center space-x-3 cursor-pointer group">
            <input 
              type="checkbox" 
              checked={shuffle}
              onChange={(e) => setShuffle(e.target.checked)}
              className="w-5 h-5 rounded border-slate-300 bg-white text-indigo-600 focus:ring-indigo-500 focus:ring-offset-2 accent-indigo-500"
            />
            <div className="flex flex-col">
              <span className="font-semibold text-slate-800 group-hover:text-indigo-600 transition-colors text-sm">
                Сұрақтарды араластыру
              </span>
              <span className="text-[11px] text-slate-500">
                Кездейсоқ ретпен көрсету
              </span>
            </div>
          </label>

          <label className="flex items-center space-x-3 cursor-pointer group">
            <input 
              type="checkbox" 
              checked={limitTo20}
              onChange={(e) => setLimitTo20(e.target.checked)}
              className="w-5 h-5 rounded border-slate-300 bg-white text-indigo-600 focus:ring-indigo-500 focus:ring-offset-2 accent-indigo-500"
            />
            <div className="flex flex-col">
              <span className="font-semibold text-slate-800 group-hover:text-indigo-600 transition-colors text-sm">
                Жылдам режим (20 сұрақ)
              </span>
              <span className="text-[11px] text-slate-500">
                Кездейсоқ 20 сұрақ таңдау
              </span>
            </div>
          </label>
        </div>

        <button 
          onClick={() => onStart({ category, part, shuffle, limitTo20 })}
          className="px-8 py-4 bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white rounded-2xl text-lg font-black border border-white/30 shadow-[0_8px_25px_rgba(99,102,241,0.2)] hover:shadow-[0_12px_35px_rgba(99,102,241,0.35)] transition-all duration-300 transform hover:scale-[1.02] active:scale-98 cursor-pointer flex items-center justify-center space-x-2 w-full md:w-auto"
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
