import React from 'react';

interface BookSpine {
  title: string;
  grade: number;
  bgGradient: string;
  heightClass: string;
  accentColor: string;
}

const SPINES_DATA: BookSpine[] = [
  {
    title: 'Physics',
    grade: 12,
    bgGradient: 'from-blue-700 via-indigo-800 to-slate-950',
    heightClass: 'h-36 sm:h-44',
    accentColor: '#38bdf8',
  },
  {
    title: 'Chemistry',
    grade: 12,
    bgGradient: 'from-emerald-700 via-teal-800 to-slate-950',
    heightClass: 'h-38 sm:h-46',
    accentColor: '#34d399',
  },
  {
    title: 'Mathematics (Nat)',
    grade: 12,
    bgGradient: 'from-indigo-700 via-blue-900 to-slate-950',
    heightClass: 'h-40 sm:h-48',
    accentColor: '#818cf8',
  },
  {
    title: 'Biology',
    grade: 12,
    bgGradient: 'from-green-700 via-emerald-900 to-slate-950',
    heightClass: 'h-35 sm:h-43',
    accentColor: '#4ade80',
  },
  {
    title: 'English',
    grade: 12,
    bgGradient: 'from-purple-700 via-violet-900 to-slate-950',
    heightClass: 'h-37 sm:h-45',
    accentColor: '#c084fc',
  },
  {
    title: 'SAT Aptitude',
    grade: 12,
    bgGradient: 'from-amber-600 via-yellow-700 to-slate-950',
    heightClass: 'h-39 sm:h-47',
    accentColor: '#fbbf24',
  },
  {
    title: 'Economics',
    grade: 12,
    bgGradient: 'from-orange-700 via-amber-900 to-slate-950',
    heightClass: 'h-36 sm:h-44',
    accentColor: '#fb923c',
  },
  {
    title: 'History',
    grade: 12,
    bgGradient: 'from-rose-700 via-red-900 to-slate-950',
    heightClass: 'h-38 sm:h-46',
    accentColor: '#f87171',
  },
  {
    title: 'Mathematics (Soc)',
    grade: 12,
    bgGradient: 'from-violet-700 via-indigo-900 to-slate-950',
    heightClass: 'h-37 sm:h-45',
    accentColor: '#a78bfa',
  },
  {
    title: 'Geography',
    grade: 12,
    bgGradient: 'from-cyan-700 via-sky-900 to-slate-950',
    heightClass: 'h-35 sm:h-43',
    accentColor: '#22d3ee',
  },
  {
    title: 'Citizenship',
    grade: 12,
    bgGradient: 'from-red-700 via-rose-900 to-slate-950',
    heightClass: 'h-36 sm:h-44',
    accentColor: '#fb7185',
  },
  {
    title: 'IT & Computing',
    grade: 12,
    bgGradient: 'from-sky-700 via-blue-900 to-slate-950',
    heightClass: 'h-38 sm:h-46',
    accentColor: '#38bdf8',
  },
  {
    title: 'Physics G11',
    grade: 11,
    bgGradient: 'from-blue-600 via-indigo-700 to-slate-950',
    heightClass: 'h-35 sm:h-43',
    accentColor: '#60a5fa',
  },
  {
    title: 'Chemistry G11',
    grade: 11,
    bgGradient: 'from-teal-700 via-emerald-800 to-slate-950',
    heightClass: 'h-39 sm:h-47',
    accentColor: '#2dd4bf',
  },
];

interface BackgroundDriftingShelfProps {
  opacity?: number;
}

export const BackgroundDriftingShelf: React.FC<BackgroundDriftingShelfProps> = ({
  opacity = 0.20,
}) => {
  // Seamless loop by duplicating the spine set twice
  const duplicatedSpines = [...SPINES_DATA, ...SPINES_DATA];

  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden select-none flex items-center z-0"
      style={{ opacity }}
      aria-hidden="true"
    >
      <div className="relative w-full flex flex-col items-start justify-center">
        {/* Bookshelf track with smooth infinite horizontal drift (translateX) */}
        <div className="shelf-drift-track flex items-end gap-2 sm:gap-2.5 pb-1">
          {duplicatedSpines.map((spine, idx) => (
            <div
              key={`${spine.title}-${idx}`}
              className={`relative ${spine.heightClass} w-8 sm:w-10 rounded-sm bg-gradient-to-b ${spine.bgGradient} border-t border-r border-white/20 shadow-lg flex flex-col justify-between items-center py-2 px-0.5 shrink-0 overflow-hidden`}
              style={{
                boxShadow: `inset 2px 0 4px rgba(255,255,255,0.15), inset -2px 0 5px rgba(0,0,0,0.6), 0 4px 10px rgba(0,0,0,0.5)`,
              }}
            >
              {/* Spine Curvature & 3D Lighting effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-white/10 to-black/45 pointer-events-none" />

              {/* Top Embossed Ribbing & Grade Badge */}
              <div className="relative z-10 w-full flex flex-col items-center gap-1">
                <div className="w-4/5 h-[1.5px] bg-amber-400/50 rounded-full" />
                <div
                  className="px-1 py-0.5 rounded text-[8px] sm:text-[9px] font-black text-slate-950 leading-none"
                  style={{ backgroundColor: spine.accentColor }}
                >
                  G{spine.grade}
                </div>
                <div className="w-4/5 h-[1.5px] bg-amber-400/50 rounded-full" />
              </div>

              {/* Vertical Spine Title (Ethiopian Textbook Name) */}
              <div className="relative z-10 my-auto">
                <span
                  className="block text-[8px] sm:text-[9px] font-extrabold uppercase tracking-wider text-slate-200/90 whitespace-nowrap [writing-mode:vertical-rl] rotate-180"
                  style={{ textShadow: '0 1px 2px rgba(0,0,0,0.9)' }}
                >
                  {spine.title}
                </span>
              </div>

              {/* Bottom Decorative Ribbing & Emblem */}
              <div className="relative z-10 w-full flex flex-col items-center gap-1">
                <div className="w-4/5 h-[1.5px] bg-amber-400/50 rounded-full" />
                <div className="w-2 h-2 rounded-full border border-amber-300/60 bg-amber-400/20" />
                <div className="w-4/5 h-[1.5px] bg-amber-400/50 rounded-full" />
              </div>
            </div>
          ))}
        </div>

        {/* Shelf Ledge Line */}
        <div className="w-full h-2 bg-gradient-to-r from-slate-900 via-slate-700 to-slate-900 border-t border-slate-600/40 shadow-[0_4px_12px_rgba(0,0,0,0.8)]" />
      </div>
    </div>
  );
};
