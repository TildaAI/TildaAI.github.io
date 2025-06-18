import React, { useEffect, useRef } from 'react';

const ParticleBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const particles: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      opacity: number;
      pulsePhase: number;
      glowIntensity: number;
    }> = [];

    // Create more particles with enhanced properties
    for (let i = 0; i < 120; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        size: Math.random() * 4 + 1,
        opacity: Math.random() * 0.6 + 0.2,
        pulsePhase: Math.random() * Math.PI * 2,
        glowIntensity: Math.random() * 0.8 + 0.2,
      });
    }

    let time = 0;

    const animate = () => {
      time += 0.008;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle, index) => {
        // Update position with enhanced liquid motion
        particle.x += particle.vx + Math.sin(time + index * 0.1) * 0.15;
        particle.y += particle.vy + Math.cos(time + index * 0.15) * 0.15;

        // Wrap around edges
        if (particle.x < 0) particle.x = canvas.width;
        if (particle.x > canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = canvas.height;
        if (particle.y > canvas.height) particle.y = 0;

        // Enhanced pulsing opacity
        const pulseOpacity = particle.opacity + Math.sin(time * 2 + particle.pulsePhase) * 0.3;
        const glowSize = particle.size * (3 + Math.sin(time + particle.pulsePhase) * 1.5);

        // Draw enhanced particle with multiple glow layers
        const gradient = ctx.createRadialGradient(
          particle.x, particle.y, 0,
          particle.x, particle.y, glowSize
        );
        gradient.addColorStop(0, `rgba(224, 244, 255, ${pulseOpacity * particle.glowIntensity})`);
        gradient.addColorStop(0.3, `rgba(224, 244, 255, ${pulseOpacity * 0.4})`);
        gradient.addColorStop(0.7, `rgba(224, 244, 255, ${pulseOpacity * 0.1})`);
        gradient.addColorStop(1, 'rgba(224, 244, 255, 0)');

        ctx.beginPath();
        ctx.arc(particle.x, particle.y, glowSize, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        // Core particle with enhanced glow
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(224, 244, 255, ${pulseOpacity})`;
        ctx.shadowBlur = 15;
        ctx.shadowColor = `rgba(224, 244, 255, ${pulseOpacity * 0.8})`;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // Draw enhanced liquid connections
      particles.forEach((particle, i) => {
        particles.slice(i + 1).forEach((otherParticle) => {
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 150) {
            const opacity = 0.2 * (1 - distance / 150);
            const gradient = ctx.createLinearGradient(
              particle.x, particle.y,
              otherParticle.x, otherParticle.y
            );
            gradient.addColorStop(0, `rgba(224, 244, 255, ${opacity})`);
            gradient.addColorStop(0.5, `rgba(224, 244, 255, ${opacity * 0.6})`);
            gradient.addColorStop(1, `rgba(224, 244, 255, ${opacity})`);

            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.strokeStyle = gradient;
            ctx.lineWidth = 1.5 + Math.sin(time * 3) * 0.8;
            ctx.stroke();
          }
        });
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full z-0"
    />
  );
};

export default ParticleBackground;