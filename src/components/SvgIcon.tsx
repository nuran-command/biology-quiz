import React from 'react';
import { 
  Dna, 
  Leaf, 
  Beaker, 
  RotateCw, 
  GitBranch, 
  Droplet, 
  Flame, 
  Hourglass, 
  Hospital, 
  BookOpen, 
  ArrowLeftRight 
} from 'lucide-react';

type Props = {
  name: string;
  className?: string;
};

export const SvgIcon = ({ name, className = "w-8 h-8" }: Props) => {
  let IconComponent: React.ComponentType<any> | null = null;
  let iconColorClass = "";
  let badgeColorClass = "";
  let customSvg: React.ReactNode = null;

  switch (name) {
    case 'dna':
      IconComponent = Dna;
      iconColorClass = "text-indigo-600";
      badgeColorClass = "bg-indigo-100/60";
      break;
    case 'nutrition':
      IconComponent = Leaf;
      iconColorClass = "text-emerald-600";
      badgeColorClass = "bg-emerald-100/60";
      break;
    case 'respiration':
      iconColorClass = "text-rose-600";
      badgeColorClass = "bg-rose-100/60";
      customSvg = (
        <svg viewBox="0 0 24 24" className="w-full h-full" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 4v5" />
          <path d="M12 9c-1.5 1-3 2-4.5 3.5" />
          <path d="M12 9c1.5 1 3 2 4.5 3.5" />
          <path d="M7.5 12.5c-2.5 1-3.5 4.5-2.5 7s4 3 6 1.5v-5c-1-1-2.5-2.5-3.5-3.5z" />
          <path d="M16.5 12.5c2.5 1 3.5 4.5 2.5 7s-4 3-6 1.5v-5c1-1 2.5-2.5 3.5-3.5z" />
        </svg>
      );
      break;
    case 'excretion':
      iconColorClass = "text-indigo-600";
      badgeColorClass = "bg-indigo-100/60";
      customSvg = (
        <svg viewBox="0 0 24 24" className="w-full h-full" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 7c-2.2 0-3.8 1.8-3.8 4.5s1.2 4.5 3.8 4.5c0.8 0 1.2-.4 1.2-1.2v-6.6C10.2 7.4 9.8 7 9 7z" />
          <path d="M15 7c2.2 0 3.8 1.8 3.8 4.5s-1.2 4.5-3.8 4.5c-.8 0-1.2-.4-1.2-1.2v-6.6c0-.4.4-.8 1.2-.8z" />
          <path d="M10.2 12.5c0 1.8.8 3.5 1.8 4.5" />
          <path d="M13.8 12.5c0 1.8-.8 3.5-1.8 4.5" />
          <circle cx="12" cy="18.5" r="1.2" />
        </svg>
      );
      break;
    case 'cell_cycle':
      IconComponent = RotateCw;
      iconColorClass = "text-cyan-600";
      badgeColorClass = "bg-cyan-100/60";
      break;
    case 'genetics':
      IconComponent = GitBranch;
      iconColorClass = "text-amber-600";
      badgeColorClass = "bg-amber-100/60";
      break;
    case 'water':
      IconComponent = Droplet;
      iconColorClass = "text-blue-600";
      badgeColorClass = "bg-blue-100/60";
      break;
    case 'lipid':
      IconComponent = Flame;
      iconColorClass = "text-lime-600";
      badgeColorClass = "bg-lime-100/60";
      break;
    case 'transport':
      IconComponent = ArrowLeftRight;
      iconColorClass = "text-teal-600";
      badgeColorClass = "bg-teal-100/60";
      break;
    case 'aging':
      IconComponent = Hourglass;
      iconColorClass = "text-orange-600";
      badgeColorClass = "bg-orange-100/60";
      break;
    case 'hospital':
      IconComponent = Hospital;
      iconColorClass = "text-pink-600";
      badgeColorClass = "bg-pink-100/60";
      break;
    case 'book':
      IconComponent = BookOpen;
      iconColorClass = "text-slate-600";
      badgeColorClass = "bg-slate-100";
      break;
    case 'virus':
      iconColorClass = "text-rose-600";
      badgeColorClass = "bg-rose-100/60";
      customSvg = (
        <svg viewBox="0 0 24 24" className="w-full h-full" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="5.5" />
          <path d="M12 6.5V2m0 0a1 1 0 100-2 1 1 0 000 2z" />
          <path d="M12 17.5v4.5m0 0a1 1 0 100 2 1 1 0 000-2z" />
          <path d="M6.5 12H2m0 0a1 1 0 10-2 0 1 1 0 002 0z" />
          <path d="M17.5 12h4.5m0 0a1 1 0 102 0 1 1 0 00-2 0z" />
          <path d="M8.11 8.11L4.93 4.93m0 0a1 1 0 10-1.41-1.41 1 1 0 001.41 1.41z" />
          <path d="M15.89 15.89l3.18 3.18m0 0a1 1 0 101.41 1.41 1 1 0 00-1.41-1.41z" />
          <path d="M8.11 15.89l-3.18 3.18m0 0a1 1 0 10-1.41 1.41 1 1 0 001.41-1.41z" />
          <path d="M15.89 8.11l3.18-3.18m0 0a1 1 0 101.41-1.41 1 1 0 00-1.41 1.41z" />
        </svg>
      );
      break;
    default:
      break;
  }

  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      {/* Centered Background Circle */}
      {badgeColorClass && (
        <span className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[70%] h-[70%] rounded-full ${badgeColorClass}`} />
      )}
      
      {/* Front Vector Line Icon */}
      {IconComponent ? (
        <IconComponent className={`relative z-10 w-full h-full ${iconColorClass}`} strokeWidth={2.2} />
      ) : customSvg ? (
        <div className={`relative z-10 w-full h-full ${iconColorClass}`}>
          {customSvg}
        </div>
      ) : (
        <svg viewBox="0 0 24 24" className={`relative z-10 w-full h-full text-slate-400`} fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
        </svg>
      )}
    </div>
  );
};
