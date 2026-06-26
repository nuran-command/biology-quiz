import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type Props = {
  onHome: () => void;
};

const LogoIcon = () => (
  <svg className="w-8 h-8 text-indigo-600 flex-shrink-0" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M16 3C8.82 3 3 8.82 3 16C3 23.18 8.82 29 16 29C23.18 29 29 23.18 29 16C29 8.82 23.18 3 16 3Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" className="opacity-15" />
    <path d="M9 16C9 12 12.5 9 16 9C19.5 9 23 12 23 16C23 20 19.5 23 16 23C12.5 23 9 20 9 16Z" stroke="url(#logo-grad-1)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M12 12C14 14 18 18 20 20" stroke="url(#logo-grad-2)" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M20 12C18 14 14 18 12 20" stroke="url(#logo-grad-2)" strokeWidth="2.5" strokeLinecap="round" />
    <circle cx="12" cy="12" r="1.75" fill="#818CF8" />
    <circle cx="20" cy="12" r="1.75" fill="#C084FC" />
    <circle cx="12" cy="20" r="1.75" fill="#C084FC" />
    <circle cx="20" cy="20" r="1.75" fill="#818CF8" />
    <defs>
      <linearGradient id="logo-grad-1" x1="9" y1="9" x2="23" y2="23" gradientUnits="userSpaceOnUse">
        <stop stopColor="#6366F1" />
        <stop offset="1" stopColor="#A855F7" />
      </linearGradient>
      <linearGradient id="logo-grad-2" x1="12" y1="12" x2="20" y2="20" gradientUnits="userSpaceOnUse">
        <stop stopColor="#A855F7" />
        <stop offset="1" stopColor="#6366F1" />
      </linearGradient>
    </defs>
  </svg>
);

export const Navbar = ({ onHome }: Props) => {
  const [showSubscription, setShowSubscription] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  const [activeTab, setActiveTab] = useState('home');

  const tabs = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'help', label: 'Help' }
  ];

  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId);
    if (tabId === 'home') {
      onHome();
    } else if (tabId === 'about') {
      setShowAbout(true);
    } else if (tabId === 'help') {
      setShowHelp(true);
    }
  };

  const closeAbout = () => {
    setShowAbout(false);
    setActiveTab('home');
  };

  const closeHelp = () => {
    setShowHelp(false);
    setActiveTab('home');
  };

  return (
    <>
      <header className="fixed top-4 left-1/2 -translate-x-1/2 w-[92%] max-w-7xl z-50 backdrop-blur-2xl bg-white/45 border border-white/60 rounded-full px-6 md:px-8 py-3 flex items-center justify-between transition-all shadow-[0_12px_40px_rgba(31,38,135,0.08),inset_0_0_12px_rgba(255,255,255,0.4)] hover:shadow-[0_16px_48px_rgba(31,38,135,0.12),inset_0_0_16px_rgba(255,255,255,0.5)]">
        {/* Logo and Branding */}
        <div 
          onClick={() => handleTabClick('home')}
          className="flex items-center space-x-2.5 cursor-pointer hover:opacity-90 transition-opacity"
        >
          <LogoIcon />
          <span className="font-sans font-black text-lg md:text-xl tracking-wide text-slate-800 bg-clip-text text-transparent bg-gradient-to-r from-slate-800 to-slate-900">
            Biomate
          </span>
        </div>

        {/* Center Pill Navigation Container */}
        <div className="flex items-center space-x-1 bg-slate-950/[0.04] p-1 rounded-full border border-slate-950/[0.02]">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => handleTabClick(tab.id)}
                className={`relative px-4 md:px-6 py-1.5 md:py-2 text-xs md:text-sm font-extrabold transition-all duration-300 rounded-full cursor-pointer z-10 ${
                  isActive ? 'text-indigo-600' : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="active-pill"
                    className="absolute inset-0 bg-white shadow-[0_2px_8px_rgba(0,0,0,0.04),0_0_12px_rgba(99,102,241,0.06)] rounded-full -z-10"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* End Actions Container - Liquid Glass Get Subscription Button */}
        <div>
          <button
            onClick={() => setShowSubscription(true)}
            className="px-4 md:px-6 py-2 md:py-2.5 bg-gradient-to-r from-indigo-500/85 to-purple-500/85 backdrop-blur-xl hover:from-indigo-500/95 hover:to-purple-500/95 text-white rounded-full text-xs md:text-sm font-black border border-white/40 shadow-[0_6px_20px_rgba(99,102,241,0.25),inset_0_2px_10px_rgba(255,255,255,0.3)] hover:shadow-[0_8px_28px_rgba(99,102,241,0.4)] transition-all duration-300 transform hover:scale-[1.02] active:scale-98 cursor-pointer flex items-center space-x-1.5 relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/25 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out pointer-events-none"></div>
            
            {/* Subscription Icon */}
            <svg className="w-3.5 h-3.5 relative z-10 hidden sm:inline" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
            </svg>
            
            <span className="relative z-10 hidden sm:inline">Get Subscription</span>
            <span className="relative z-10 inline sm:hidden">PRO</span>
          </button>
        </div>
      </header>

      {/* Subscription Modal */}
      <AnimatePresence>
        {showSubscription && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowSubscription(false)}
              className="absolute inset-0 bg-slate-900/30 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-md bg-white/40 backdrop-blur-3xl border border-white/60 rounded-3xl p-8 shadow-[0_20px_50px_rgba(31,38,135,0.15),inset_0_0_20px_rgba(255,255,255,0.5)] z-10"
            >
              <button 
                onClick={() => setShowSubscription(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              
              <div className="text-center space-y-4">
                <div className="inline-block p-4 bg-amber-50 rounded-2xl text-3xl">
                  ✨
                </div>
                <h3 className="text-2xl font-black text-slate-800">PRO Жазылым</h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  Барлық тест сұрақтарына шектеусіз қолжетімділік алыңыз, жарнамасыз дайындалыңыз және егжей-тегжейлі талдауларды қараңыз.
                </p>
                
                <div className="bg-white/40 backdrop-blur-md border border-white/60 shadow-sm rounded-2xl p-4 text-left space-y-3">
                  <div className="flex items-center space-x-2 text-sm text-slate-700 font-semibold">
                    <span className="text-emerald-500">✓</span>
                    <span>1000+ тест сұрағы және жауаптары</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-slate-700 font-semibold">
                    <span className="text-emerald-500">✓</span>
                    <span>ҰБТ-ға дайындалуға арналған арнайы сұрақтар</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-slate-700 font-semibold">
                    <span className="text-emerald-500">✓</span>
                    <span>Тақырыптық бөлімдер мен кезеңдерді таңдау</span>
                  </div>
                </div>

                <button
                  onClick={() => setShowSubscription(false)}
                  className="w-full py-4 bg-gradient-to-r from-indigo-500/80 to-purple-500/80 backdrop-blur-xl hover:from-indigo-500/90 hover:to-purple-500/90 text-white rounded-2xl font-extrabold border border-white/40 shadow-[0_8px_32px_rgba(99,102,241,0.4),inset_0_2px_10px_rgba(255,255,255,0.3)] transition-all duration-300 transform hover:scale-[1.02] active:scale-98 cursor-pointer mt-2 relative overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out"></div>
                  Жазылу — 1 490 ₸ / айына
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Help Modal */}
      <AnimatePresence>
        {showHelp && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeHelp}
              className="absolute inset-0 bg-slate-900/30 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-md bg-white/40 backdrop-blur-3xl border border-white/60 rounded-3xl p-8 shadow-[0_20px_50px_rgba(31,38,135,0.15),inset_0_0_20px_rgba(255,255,255,0.5)] z-10"
            >
              <button 
                onClick={closeHelp}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              
              <div className="text-center space-y-4">
                <div className="inline-block p-4 bg-indigo-50 rounded-2xl text-3xl">
                  ❓
                </div>
                <h3 className="text-2xl font-black text-slate-800">Көмек & Нұсқаулық</h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  Бұл платформа биология және биохимия пәндері бойынша тест тапсырып, өз біліміңізді жетілдіруге көмектеседі.
                </p>
                
                <div className="text-left space-y-3 bg-white/40 backdrop-blur-md border border-white/60 shadow-sm rounded-2xl p-4 text-xs text-slate-800">
                  <p>1. <strong>Бағытты таңдаңыз:</strong> Басты беттен өзіңізге қажетті биология бөлімін таңдаңыз.</p>
                  <p>2. <strong>Бөлімді таңдаңыз:</strong> Сұрақтар санын және тиісті тақырыпты таңдаңыз.</p>
                  <p>3. <strong>Параметрлер:</strong> Қаласаңыз сұрақтарды араластыру немесе 20 сұрақпен шектеу мүмкіндігін қосыңыз.</p>
                  <p>4. <strong>Нәтиже:</strong> Тест соңында әр сұрақты талдап, дұрыс және қате жауаптарыңызды салыстыра аласыз.</p>
                </div>

                <button
                  onClick={closeHelp}
                  className="w-full py-3.5 bg-gradient-to-r from-slate-700/80 to-slate-800/80 backdrop-blur-xl text-white rounded-2xl font-bold border border-white/30 shadow-[0_8px_32px_rgba(0,0,0,0.2),inset_0_2px_10px_rgba(255,255,255,0.2)] transition-all transform hover:scale-[1.02] active:scale-98 cursor-pointer relative overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out"></div>
                  Түсінікті
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* About Modal */}
      <AnimatePresence>
        {showAbout && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeAbout}
              className="absolute inset-0 bg-slate-900/30 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-md bg-white/40 backdrop-blur-3xl border border-white/60 rounded-3xl p-8 shadow-[0_20px_50px_rgba(31,38,135,0.15),inset_0_0_20px_rgba(255,255,255,0.5)] z-10"
            >
              <button 
                onClick={closeAbout}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              
              <div className="text-center space-y-4">
                <div className="inline-block p-3.5 bg-indigo-50/80 rounded-2xl">
                  <LogoIcon />
                </div>
                <h3 className="text-2xl font-black text-slate-800">About Biomate</h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  <strong>Biomate</strong> is a modern biological & biochemical learning and self-assessment assistant designed to help students master complex life science concepts.
                </p>
                
                <div className="bg-white/40 backdrop-blur-md border border-white/60 shadow-sm rounded-2xl p-4 text-left space-y-3">
                  <div className="flex items-center space-x-3 text-sm text-slate-700 font-semibold">
                    <span className="text-indigo-500 text-lg">🧬</span>
                    <span>1000+ custom self-test biology questions</span>
                  </div>
                  <div className="flex items-center space-x-3 text-sm text-slate-700 font-semibold">
                    <span className="text-indigo-500 text-lg">📈</span>
                    <span>Detailed result analytics & performance graphs</span>
                  </div>
                  <div className="flex items-center space-x-3 text-sm text-slate-700 font-semibold">
                    <span className="text-indigo-500 text-lg">⚡</span>
                    <span>Zero Ads for focused study & learning environments</span>
                  </div>
                </div>

                <button
                  onClick={closeAbout}
                  className="w-full py-3.5 bg-gradient-to-r from-indigo-500/80 to-purple-500/80 backdrop-blur-xl text-white rounded-2xl font-bold border border-white/30 shadow-[0_8px_32px_rgba(99,102,241,0.2),inset_0_2px_10px_rgba(255,255,255,0.2)] transition-all transform hover:scale-[1.02] active:scale-98 cursor-pointer relative overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 ease-in-out"></div>
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
