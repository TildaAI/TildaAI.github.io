import React from 'react';

interface GeneratedLogoProps {
  name: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const GeneratedLogo: React.FC<GeneratedLogoProps> = ({ name, size = 'md', className = '' }) => {
  // Generate consistent colors based on name
  const generateColors = (text: string) => {
    let hash = 0;
    for (let i = 0; i < text.length; i++) {
      hash = text.charCodeAt(i) + ((hash << 5) - hash);
    }
    
    // Generate two complementary colors
    const hue1 = Math.abs(hash) % 360;
    const hue2 = (hue1 + 60) % 360;
    
    return {
      primary: `hsl(${hue1}, 70%, 60%)`,
      secondary: `hsl(${hue2}, 65%, 55%)`,
      accent: `hsl(${hue1}, 80%, 75%)`
    };
  };

  const colors = generateColors(name);
  const initials = name
    .split(' ')
    .map(word => word.charAt(0).toUpperCase())
    .slice(0, 2)
    .join('');

  const sizeClasses = {
    sm: 'w-12 h-12 text-sm',
    md: 'w-16 h-16 text-lg',
    lg: 'w-20 h-20 text-xl'
  };

  // Generate unique pattern based on name
  const patternId = `pattern-${name.replace(/\s+/g, '-').toLowerCase()}`;
  const gradientId = `gradient-${name.replace(/\s+/g, '-').toLowerCase()}`;

  return (
    <div className={`${sizeClasses[size]} ${className} relative rounded-2xl overflow-hidden flex items-center justify-center font-bold text-white shadow-lg`}>
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={colors.primary} />
            <stop offset="50%" stopColor={colors.secondary} />
            <stop offset="100%" stopColor={colors.accent} />
          </linearGradient>
          <pattern id={patternId} x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
            <circle cx="10" cy="10" r="2" fill="rgba(255,255,255,0.1)" />
            <circle cx="5" cy="5" r="1" fill="rgba(255,255,255,0.05)" />
            <circle cx="15" cy="15" r="1" fill="rgba(255,255,255,0.05)" />
          </pattern>
        </defs>
        <rect width="100" height="100" fill={`url(#${gradientId})`} />
        <rect width="100" height="100" fill={`url(#${patternId})`} />
        
        {/* Geometric shapes based on name length */}
        {name.length % 3 === 0 && (
          <polygon points="20,80 50,20 80,80" fill="rgba(255,255,255,0.1)" />
        )}
        {name.length % 3 === 1 && (
          <circle cx="50" cy="50" r="25" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="2" />
        )}
        {name.length % 3 === 2 && (
          <rect x="25" y="25" width="50" height="50" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="2" rx="5" />
        )}
      </svg>
      
      <span className="relative z-10 font-bold tracking-tight" style={{ textShadow: '0 2px 4px rgba(0,0,0,0.3)' }}>
        {initials}
      </span>
      
      {/* Subtle glow effect */}
      <div 
        className="absolute inset-0 rounded-2xl opacity-30"
        style={{
          background: `radial-gradient(circle at 30% 30%, ${colors.accent}40, transparent 70%)`
        }}
      />
    </div>
  );
};

export default GeneratedLogo;