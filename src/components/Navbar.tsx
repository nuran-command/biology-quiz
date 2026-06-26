import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type Props = {
  onHome: () => void;
  showHomeBtn: boolean;
};

export const Navbar = ({ onHome, showHomeBtn }: Props) => {
  const [showSubscription, setShowSubscription] = useState(false);
  const [showHelp, setShowHelp] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 w-full z-50 backdrop-blur-xl bg-white/70 border-b border-white/50 px-8 md:px-12 py-5.5 md:py-6 flex items-center justify-between transition-all shadow-[0_10px_30px_rgba(0,0,0,0.02),0_0_20px_rgba(99,102,241,0.04)] hover:shadow-[0_12px_35px_rgba(0,0,0,0.03),0_0_25px_rgba(99,102,241,0.06)]">
        {/* Logo */}
        <div 
          onClick={onHome}
          className="flex items-center space-x-2.5 cursor-pointer hover:opacity-90 transition-opacity"
        >
          <span className="text-2xl animate-pulse">🧬</span>
          <span className="font-sans font-black text-lg md:text-xl tracking-wide text-slate-800">
            Биология & Биохимия
          </span>
        </div>
        
        {/* Navigation Links */}
        <nav className="flex items-center space-x-2 md:space-x-4">
          {showHomeBtn && (
            <button
              onClick={onHome}
              className="text-xs md:text-sm font-extrabold text-slate-700 hover:text-indigo-600 px-3.5 py-1.5 rounded-full hover:bg-indigo-50/50 hover:shadow-sm border border-transparent hover:border-indigo-100 transition-all cursor-pointer"
            >
              Басты бет
            </button>
          )}
          
          <button
            onClick={() => setShowSubscription(true)}
            className="text-xs md:text-sm font-extrabold text-slate-700 hover:text-indigo-600 px-3.5 py-1.5 rounded-full hover:bg-indigo-50/50 hover:shadow-sm border border-transparent hover:border-indigo-100 transition-all cursor-pointer flex items-center space-x-1"
          >
            <span>Жазылым</span>
            <span className="text-[9px] bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded-full font-black uppercase tracking-wider scale-90">
              PRO
            </span>
          </button>
          
          <button
            onClick={() => setShowHelp(true)}
            className="text-xs md:text-sm font-extrabold text-slate-700 hover:text-indigo-600 px-3.5 py-1.5 rounded-full hover:bg-indigo-50/50 hover:shadow-sm border border-transparent hover:border-indigo-100 transition-all cursor-pointer"
          >
            Көмек
          </button>
        </nav>
      </header>

      {/* Subscription Modal */}
      <AnimatePresence>
        {showSubscription && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowSubscription(false)}
              className="absolute inset-0 bg-slate-900/30 backdrop-blur-sm"
            />
            {/* Modal Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-md bg-white/75 backdrop-blur-xl border border-white/50 rounded-3xl p-8 shadow-[0_20px_50px_rgba(0,0,0,0.06),0_0_30px_rgba(99,102,241,0.1)] z-10"
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
                
                <div className="bg-slate-50/50 border border-slate-100 rounded-2xl p-4 text-left space-y-3">
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
                  className="w-full py-4 bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white rounded-2xl font-extrabold border border-white/20 shadow-[0_8px_25px_rgba(99,102,241,0.2)] hover:shadow-[0_12px_35px_rgba(99,102,241,0.35)] transition-all duration-300 transform hover:scale-[1.02] active:scale-98 cursor-pointer mt-2"
                >
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
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowHelp(false)}
              className="absolute inset-0 bg-slate-900/30 backdrop-blur-sm"
            />
            {/* Modal Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-md bg-white/75 backdrop-blur-xl border border-white/50 rounded-3xl p-8 shadow-[0_20px_50px_rgba(0,0,0,0.06),0_0_30px_rgba(99,102,241,0.1)] z-10"
            >
              <button 
                onClick={() => setShowHelp(false)}
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
                
                <div className="text-left space-y-3 bg-slate-50/50 border border-slate-100/50 rounded-2xl p-4 text-xs text-slate-600">
                  <p>1. <strong>Бағытты таңдаңыз:</strong> Басты беттен өзіңізге қажетті биология бөлімін таңдаңыз.</p>
                  <p>2. <strong>Бөлімді таңдаңыз:</strong> Сұрақтар санын және тиісті тақырыпты таңдаңыз.</p>
                  <p>3. <strong>Параметрлер:</strong> Қаласаңыз сұрақтарды араластыру немесе 20 сұрақпен шектеу мүмкіндігін қосыңыз.</p>
                  <p>4. <strong>Нәтиже:</strong> Тест соңында әр сұрақты талдап, дұрыс және қате жауаптарыңызды салыстыра аласыз.</p>
                </div>

                <button
                  onClick={() => setShowHelp(false)}
                  className="w-full py-3.5 bg-slate-800 hover:bg-slate-700 text-white rounded-2xl font-bold transition-all transform hover:scale-[1.02] active:scale-98 cursor-pointer shadow-md hover:shadow-lg"
                >
                  Түсінікті
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

