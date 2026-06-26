type Props = {
  onHome: () => void;
  showHomeBtn: boolean;
};

export const Navbar = ({ onHome, showHomeBtn }: Props) => {
  return (
    <header className="fixed top-0 left-0 w-full z-50 backdrop-blur-md bg-slate-950/30 border-b border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.1)] px-6 py-4 flex items-center justify-between">
      <div className="flex items-center space-x-2">
        <span className="text-xl">🧬</span>
        <span className="font-sans font-bold text-base md:text-lg tracking-wider text-white">
          Биология & Биохимия
        </span>
      </div>
      
      {showHomeBtn && (
        <button
          onClick={onHome}
          className="flex items-center space-x-1.5 px-4 py-2 rounded-full text-xs md:text-sm font-semibold text-white/80 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all hover:scale-[1.02] active:scale-98 cursor-pointer"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
          <span>Басты бет</span>
        </button>
      )}
    </header>
  );
};
