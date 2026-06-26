type Props = {
  name: string;
  className?: string;
};

export const SvgIcon = ({ name, className = "w-8 h-8" }: Props) => {
  switch (name) {
    case 'dna':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="url(#dna-grad)" strokeWidth="2.5" strokeLinecap="round">
          <defs>
            <linearGradient id="dna-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#818CF8" />
              <stop offset="100%" stopColor="#C084FC" />
            </linearGradient>
          </defs>
          <path d="M4.5 10.5c3-6 7-6 10 0s7 6 10 0" />
          <path d="M4.5 13.5c3 6 7 6 10 0s7-6 10 0" />
          <path d="M6 9v6M10 7v10M14 7v10M18 9v6" />
        </svg>
      );
    case 'nutrition':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="url(#nutrition-grad)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <defs>
            <linearGradient id="nutrition-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#34D399" />
              <stop offset="100%" stopColor="#059669" />
            </linearGradient>
          </defs>
          <path d="M2 22c1.25-6.75 6-12 12-12h8V2c-6 0-11.25 4.75-12 12" />
          <path d="M12 14c0 3.31-2.69 6-6 6" />
          <path d="M18 10c0 2.21-1.79 4-4 4" />
        </svg>
      );
    case 'respiration':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="url(#respiration-grad)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <defs>
            <linearGradient id="respiration-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F87171" />
              <stop offset="100%" stopColor="#DC2626" />
            </linearGradient>
          </defs>
          <path d="M12 3v13" />
          <path d="M12 7c-2-2-5-3-8-1a5 5 0 0 0-1 7c2 3 5 4 8 1" />
          <path d="M12 7c2-2 5-3 8-1a5 5 0 0 1 1 7c-2 3-5 4-8 1" />
          <path d="M9 16c-1.5 2-4.5 2-6 .5S2 12 4 10.5" />
          <path d="M15 16c1.5 2 4.5 2 6 .5S22 12 20 10.5" />
        </svg>
      );
    case 'excretion':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="url(#excretion-grad)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <defs>
            <linearGradient id="excretion-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#6366F1" />
              <stop offset="100%" stopColor="#4F46E5" />
            </linearGradient>
          </defs>
          <path d="M6 3h12" />
          <path d="M9 3v6L4 18a2 2 0 0 0 2 3h12a2 2 0 0 0 2-3L15 9V3" />
          <path d="M9 14h6" />
          <circle cx="10" cy="11" r="0.8" fill="currentColor" opacity="0.6" />
          <circle cx="13" cy="15" r="1" fill="currentColor" opacity="0.6" />
        </svg>
      );
    case 'cell_cycle':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="url(#cell-grad)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <defs>
            <linearGradient id="cell-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#06B6D4" />
              <stop offset="100%" stopColor="#0D9488" />
            </linearGradient>
          </defs>
          <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l.73-.73" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      );
    case 'genetics':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="url(#genetics-grad)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <defs>
            <linearGradient id="genetics-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F59E0B" />
              <stop offset="100%" stopColor="#D97706" />
            </linearGradient>
          </defs>
          <path d="M12 2a5 5 0 0 0-5 5c0 4 5 11 5 11s5-7 5-11a5 5 0 0 0-5-5z" />
          <circle cx="12" cy="7" r="1.5" />
          <path d="M12 22v-4" />
        </svg>
      );
    case 'water':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="url(#water-grad)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <defs>
            <linearGradient id="water-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#60A5FA" />
              <stop offset="100%" stopColor="#2563EB" />
            </linearGradient>
          </defs>
          <path d="M12 22a7 7 0 0 0 7-7c0-4.3-7-13-7-13S5 10.7 5 15a7 7 0 0 0 7 7z" />
        </svg>
      );
    case 'lipid':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="url(#lipid-grad)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <defs>
            <linearGradient id="lipid-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#10B981" />
              <stop offset="100%" stopColor="#84CC16" />
            </linearGradient>
          </defs>
          <path d="M12 2C8.5 2 5.5 5 5.5 9c0 4.5 3 13 6.5 13s6.5-8.5 6.5-13c0-4-3-7-6.5-7z" />
          <circle cx="12" cy="14" r="3" />
        </svg>
      );
    case 'aging':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="url(#aging-grad)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <defs>
            <linearGradient id="aging-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F97316" />
              <stop offset="100%" stopColor="#EF4444" />
            </linearGradient>
          </defs>
          <path d="M5 2h14M5 22h14M19 2v4a7 7 0 0 1-7 7 7 7 0 0 1-7-7V2M19 22v-4a7 7 0 0 0-7-7 7 7 0 0 0-7 7v4" />
          <path d="M12 17v4M10 19h4" />
        </svg>
      );
    case 'hospital':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="url(#hospital-grad)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <defs>
            <linearGradient id="hospital-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#EF4444" />
              <stop offset="100%" stopColor="#EC4899" />
            </linearGradient>
          </defs>
          <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2z" />
          <path d="M12 7v10M7 12h10" />
        </svg>
      );
    case 'book':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="url(#book-grad)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <defs>
            <linearGradient id="book-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3B82F6" />
              <stop offset="100%" stopColor="#6366F1" />
            </linearGradient>
          </defs>
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
        </svg>
      );
    case 'transport':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="url(#transport-grad)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <defs>
            <linearGradient id="transport-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#34D399" />
              <stop offset="100%" stopColor="#3B82F6" />
            </linearGradient>
          </defs>
          <path d="M17 3l4 4-4 4" />
          <path d="M3 7h18" />
          <path d="M7 21l-4-4 4-4" />
          <path d="M21 17H3" />
        </svg>
      );
    case 'virus':
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="url(#virus-grad)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <defs>
            <linearGradient id="virus-grad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F87171" />
              <stop offset="100%" stopColor="#F59E0B" />
            </linearGradient>
          </defs>
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
          <circle cx="12" cy="12" r="6" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
        </svg>
      );
  }
};
