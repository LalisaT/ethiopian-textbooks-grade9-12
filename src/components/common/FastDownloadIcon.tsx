import React from 'react';

interface FastDownloadIconProps {
  className?: string;
  size?: number;
}

export const FastDownloadIcon: React.FC<FastDownloadIconProps> = ({
  className = 'w-5 h-5',
  size,
}) => {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={size ? { width: size, height: size } : undefined}
    >
      <defs>
        {/* Luxury Gold/Amber Gradient */}
        <linearGradient id="luxuryFastBolt" x1="30%" y1="10%" x2="70%" y2="90%">
          <stop offset="0%" stopColor="#FDE047" />
          <stop offset="40%" stopColor="#F59E0B" />
          <stop offset="100%" stopColor="#D97706" />
        </linearGradient>
        {/* Glow Filter */}
        <filter id="luxuryFastGlow" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="1.5" stdDeviation="3.5" floodColor="#F59E0B" floodOpacity="0.55" />
        </filter>
      </defs>

      {/* Downward Lightning Arrow */}
      <path
        d="M 42 18
           L 59 12
           L 52.5 35
           L 64 32
           L 53.5 63
           L 63.5 55.5
           C 65.5 54 68 56.5 66.8 58.8
           L 50 78
           L 33.2 58.8
           C 32 56.5 34.5 54 36.5 55.5
           L 46.5 63
           L 41.5 49
           L 48 46.5
           Z"
        fill="url(#luxuryFastBolt)"
        filter="url(#luxuryFastGlow)"
      />

      {/* Modern High-End Rounded Base Tray */}
      <path
        d="M 26 71
           V 84
           C 26 87.5 28.5 90 32 90
           H 68
           C 71.5 90 74 87.5 74 84
           V 71"
        stroke="currentColor"
        strokeWidth="6.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
