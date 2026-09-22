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
    sm: 'w-8 h-8 rounded-xl',
    md: 'w-10 h-10 rounded-2xl',
    lg: 'w-12 h-12 rounded-2xl',
    xl: 'w-16 h-16 rounded-3xl',
  }[size];

  return (
    <div
      className={`relative flex items-center justify-center shrink-0 ${className}`}
    >
      {/* Subtle luxury ambient glow */}
      {showGlow && (
        <div className={`absolute inset-0 ${dimensions} bg-gradient-to-tr from-blue-600/30 via-indigo-500/20 to-sky-500/30 blur-md pointer-events-none`} />
      )}

      {/* Official 3D Wisdom Book & Graduation Cap Icon */}
      <img
        src="/brand/app-icon.jpg"
        alt="Ethiopian Textbooks Logo"
        className={`${dimensions} object-cover shadow-md relative z-10 transition-transform group-hover:scale-105 duration-200`}
      />
    </div>
  );
};
