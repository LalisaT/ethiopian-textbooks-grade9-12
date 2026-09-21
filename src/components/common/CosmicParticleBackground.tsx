import React, { useEffect, useRef } from 'react';

interface CosmicParticleBackgroundProps {
  className?: string;
  particleCount?: number;
}

export const CosmicParticleBackground: React.FC<CosmicParticleBackgroundProps> = ({
  className = '',
  particleCount = 35,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.parentElement?.clientWidth || window.innerWidth;
      height = canvas.height = canvas.parentElement?.clientHeight || window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Particle definitions
    interface Particle {
      x: number;
      y: number;
      radius: number;
      color: string;
      alpha: number;
      baseAlpha: number;
      vx: number;
      vy: number;
      pulseSpeed: number;
      pulseAngle: number;
    }

    const colors = [
      'rgba(20, 184, 166,',  // Teal
      'rgba(6, 182, 212,',   // Cyan
      'rgba(245, 158, 11,',  // Amber/Gold
      'rgba(251, 191, 36,',  // Warm Gold
      'rgba(255, 255, 255,', // Soft White Star
    ];

    const particles: Particle[] = Array.from({ length: particleCount }, () => {
      const baseAlpha = 0.2 + Math.random() * 0.5;
      return {
        x: Math.random() * width,
        y: Math.random() * height,
        radius: 0.8 + Math.random() * 1.8,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: baseAlpha,
        baseAlpha,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        pulseSpeed: 0.02 + Math.random() * 0.03,
        pulseAngle: Math.random() * Math.PI * 2,
      };
    });

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around boundaries
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // Soft pulse
        p.pulseAngle += p.pulseSpeed;
        p.alpha = p.baseAlpha + Math.sin(p.pulseAngle) * 0.15;

        // Draw particle glow
        ctx.beginPath();
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius * 3);
        grad.addColorStop(0, `${p.color} ${Math.max(0, p.alpha)})`);
        grad.addColorStop(1, `${p.color} 0)`);
        ctx.fillStyle = grad;
        ctx.arc(p.x, p.y, p.radius * 3, 0, Math.PI * 2);
        ctx.fill();

        // Draw core star
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color} ${Math.min(1, p.alpha + 0.2)})`;
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [particleCount]);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none absolute inset-0 z-0 ${className}`}
      style={{ opacity: 0.85 }}
    />
  );
};
