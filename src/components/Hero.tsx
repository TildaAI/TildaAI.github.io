import React from 'react';

interface HeroProps {
  onBrowseProjects: () => void;
}

const Hero: React.FC<HeroProps> = ({ onBrowseProjects }) => {
  return (
    <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 pb-20">
      <div className="text-center space-y-8 max-w-4xl mx-auto">
        {/* Logo */}
        <div className="animate-fade-in">
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="relative">
              <img 
                src="/photo_2025-06-17_14-36-36.png" 
                alt="Tilda AI Logo" 
                className="w-20 h-20 md:w-24 md:h-24 rounded-2xl"
                style={{ filter: 'drop-shadow(0 0 20px rgba(224, 244, 255, 0.3))' }}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-ethereal-blue/20 to-transparent rounded-2xl blur-xl animate-pulse-slow"></div>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold text-white">
              Tilda AI
            </h1>
          </div>
        </div>

        {/* Tagline */}
        <div className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
          <p className="text-xl md:text-2xl text-gray-200 font-light leading-relaxed hero-text">
            Accelerating the next generation of
            <span className="text-ethereal-blue font-medium text-shadow-glow"> AI-powered </span>
            innovations and breakthrough projects
          </p>
        </div>

        {/* Subtitle */}
        <div className="animate-slide-up" style={{ animationDelay: '0.4s' }}>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto hero-text">
            Discover cutting-edge AI projects, vote for your favorites, and connect with the most promising ventures in artificial intelligence.
          </p>
        </div>

        {/* CTA Button */}
        <div className="animate-slide-up" style={{ animationDelay: '0.6s' }}>
          <button
            onClick={onBrowseProjects}
            className="btn-primary text-lg font-semibold shadow-2xl shadow-ethereal-blue/20 animate-liquid-float"
          >
            Browse Projects
            <span className="ml-2">→</span>
          </button>
        </div>

        {/* Stats */}
        <div className="animate-fade-in grid grid-cols-3 gap-8 pt-16 max-w-2xl mx-auto" style={{ animationDelay: '0.8s' }}>
          <div className="text-center liquid-glass rounded-2xl p-6 animate-morph stats-glow">
            <div className="text-3xl font-bold text-ethereal-blue text-shadow-glow">50+</div>
            <div className="text-sm text-gray-300 mt-1 hero-text">AI Projects</div>
          </div>
          <div className="text-center liquid-glass rounded-2xl p-6 animate-morph stats-glow" style={{ animationDelay: '0.2s' }}>
            <div className="text-3xl font-bold text-ethereal-blue text-shadow-glow">4.8K</div>
            <div className="text-sm text-gray-300 mt-1 hero-text">Total Votes</div>
          </div>
          <div className="text-center liquid-glass rounded-2xl p-6 animate-morph stats-glow" style={{ animationDelay: '0.4s' }}>
            <div className="text-3xl font-bold text-ethereal-blue text-shadow-glow">98%</div>
            <div className="text-sm text-gray-300 mt-1 hero-text">Success Rate</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;