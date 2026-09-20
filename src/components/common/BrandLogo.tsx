import React from 'react';

interface BrandLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  showGlow?: boolean;
}

export const BrandLogo: React.FC<BrandLogoProps> = ({
  size = 'md',
  className = '',
  showGlow = true,
}) => {
  const dimensions = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
  }[size];

  return (
    <div
      className={`relative flex items-center justify-center shrink-0 ${dimensions} ${className}`}
    >
      {/* Subtle luxury ambient glow */}
      {showGlow && (
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-emerald-500/30 via-amber-500/20 to-teal-500/30 blur-md pointer-events-none" />
      )}

      {/* Clean Single-Layer Vector Emblem - No nested icon-in-icon */}
      <svg
        viewBox="0 0 64 64"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full relative z-10 drop-shadow-md transition-transform group-hover:scale-105 duration-200"
      >
        {/* Obsidian Shield / Squircle Base */}
        <rect
          width="64"
          height="64"
          rx="18"
          className="fill-slate-950 dark:fill-slate-900"
        />
        <rect
          x="1"
          y="1"
          width="62"
          height="62"
          rx="17"
          stroke="url(#brand_border_grad)"
          strokeWidth="1.5"
        />

        {/* Ethiopian Flag Ribbon Accent on Top-Right Corner */}
        <path d="M42 2 H52 C57.5 2 62 6.5 62 12 V22 L42 2 Z" fill="#009A44" opacity="0.85" />
        <path d="M48 2 H56 C59.3 2 62 4.7 62 8 V16 L48 2 Z" fill="#FED100" opacity="0.9" />
        <path d="M54 2 H58 C60.2 2 62 3.8 62 6 V10 L54 2 Z" fill="#EF2B2D" opacity="0.95" />

        {/* Open Golden Wisdom Book */}
        {/* Left Page */}
        <path
          d="M32 44C27 41 20 40 14 42V20C20 18 27 19 32 22V44Z"
          fill="url(#left_page_grad)"
        />
        {/* Right Page */}
        <path
          d="M32 44C37 41 44 40 50 42V20C44 18 37 19 32 22V44Z"
          fill="url(#right_page_grad)"
        />
        {/* Book Spine Center Line */}
        <path d="M32 22V44" stroke="#F59E0B" strokeWidth="1.5" strokeLinecap="round" />

        {/* Page Text Line Accents */}
        <path d="M18 26H28" stroke="#334155" strokeWidth="1.2" strokeLinecap="round" opacity="0.8" />
        <path d="M18 30H26" stroke="#334155" strokeWidth="1.2" strokeLinecap="round" opacity="0.8" />
        <path d="M18 34H28" stroke="#334155" strokeWidth="1.2" strokeLinecap="round" opacity="0.8" />

        <path d="M36 26H46" stroke="#334155" strokeWidth="1.2" strokeLinecap="round" opacity="0.8" />
        <path d="M36 30H44" stroke="#334155" strokeWidth="1.2" strokeLinecap="round" opacity="0.8" />
        <path d="M36 34H46" stroke="#334155" strokeWidth="1.2" strokeLinecap="round" opacity="0.8" />

        {/* Academic Graduation Cap Floating Above */}
        {/* Diamond Crown */}
        <polygon
          points="32,10 45,15 32,20 19,15"
          fill="url(#grad_cap_grad)"
        />
        {/* Skull Cap Base */}
        <path
          d="M24 17.5V22C24 24.5 27.5 26.5 32 26.5C36.5 26.5 40 24.5 40 22V17.5L32 20.5L24 17.5Z"
          fill="#10B981"
        />
        {/* Golden Tassel Ribbon */}
        <path
          d="M32 15C39 15 45 17 46 22"
          stroke="#F59E0B"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <circle cx="46" cy="23" r="1.5" fill="#FBBF24" />

        {/* Gradients */}
        <defs>
          <linearGradient id="brand_border_grad" x1="0" y1="0" x2="64" y2="64" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#10B981" />
            <stop offset="50%" stopColor="#F59E0B" />
            <stop offset="100%" stopColor="#06B6D4" />
          </linearGradient>
          <linearGradient id="left_page_grad" x1="14" y1="20" x2="32" y2="44" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#F8FAFC" />
            <stop offset="100%" stopColor="#CBD5E1" />
          </linearGradient>
          <linearGradient id="right_page_grad" x1="32" y1="20" x2="50" y2="44" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#E2E8F0" />
          </linearGradient>
          <linearGradient id="grad_cap_grad" x1="19" y1="10" x2="45" y2="20" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#34D399" />
            <stop offset="50%" stopColor="#10B981" />
            <stop offset="100%" stopColor="#059669" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
};
