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
        <svg viewBox="0 0 16 16" className="w-full h-full" fill="none" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" strokeLinejoin="round">
          <path d="M8.5 1.5a.5.5 0 1 0-1 0v5.243L7 7.1V4.72C7 3.77 6.23 3 5.28 3c-.524 0-1.023.27-1.443.592-.431.332-.847.773-1.216 1.229-.736.908-1.347 1.946-1.58 2.48-.176.405-.393 1.16-.556 2.011-.165.857-.283 1.857-.241 2.759.04.867.233 1.79.838 2.33.67.6 1.622.556 2.741-.004l1.795-.897A2.5 2.5 0 0 0 7 11.264V10.5a.5.5 0 0 0-1 0v.764a1.5 1.5 0 0 1-.83 1.342l-1.794.897c-.978.489-1.415.343-1.628.152-.28-.25-.467-.801-.505-1.63-.037-.795.068-1.71.224-2.525.157-.82.357-1.491.491-1.8.19-.438.75-1.4 1.44-2.25.342-.422.703-.799 1.049-1.065.358-.276.639-.385.833-.385a.72.72 0 0 1 .72.72v3.094l-1.79/1.28a.5.5 0 0 0 .58.813L8 7.614l3.21 2.293a.5.5 0 1 0 .58-.814L10 7.814V4.72a.72.72 0 0 1 .72-.72c.194 0 .475.11.833.385.346.266.706.643 1.05 1.066.688.85 1.248 1.811 1.439 2.249.134.309.334.98.491 1.8.156.814.26 1.73.224 2.525-.038.829-.224 1.38-.505 1.63-.213.19-.65.337-1.628-.152l-1.795-.897A1.5 1.5 0 0 1 10 11.264V10.5a.5.5 0 0 0-1 0v.764a2.5 2.5 0 0 0 1.382 2.236l1.795.897c1.12.56 2.07.603 2.741.004.605-.54.798-1.463.838-2.33.042-.902-.076-1.902-.24-2.759-.164-.852-.38-1.606-.558-2.012-.232-.533-.843-1.571-1.579-2.479-.37-.456-.785-.897-1.216-1.229C11.743 3.27 11.244 3 10.72 3 9.77 3 9 3.77 9 4.72V7.1l-.5-.357z"/>
        </svg>
      );
      break;
    case 'excretion':
      IconComponent = Beaker;
      iconColorClass = "text-indigo-600";
      badgeColorClass = "bg-indigo-100/60";
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
          <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
          <circle cx="12" cy="12" r="5" />
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
