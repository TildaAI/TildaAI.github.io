import React from 'react';
import { Mail } from 'lucide-react';

const Footer: React.FC = () => {
  const handleXClick = () => {
    window.open('https://x.com/theTildaAI', '_blank', 'noopener,noreferrer');
  };

  return (
    <footer className="relative z-10 border-t border-white/10 mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-center space-y-6">
          {/* Logo and Name */}
          <div className="flex items-center gap-4">
            <div className="relative">
              <img 
                src="/photo_2025-06-17_14-36-36.png" 
                alt="Tilda AI Logo" 
                className="w-12 h-12 rounded-xl"
                style={{ filter: 'drop-shadow(0 0 15px rgba(224, 244, 255, 0.2))' }}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-ethereal-blue/10 to-transparent rounded-xl blur-lg animate-pulse-slow"></div>
            </div>
            <h3 className="text-2xl font-bold text-white hero-text">
              Tilda AI
            </h3>
          </div>

          {/* Social and Contact Links */}
          <div className="flex flex-col sm:flex-row items-center gap-4">
            {/* Email */}
            <div className="flex items-center gap-3 liquid-glass rounded-full px-6 py-3 hover:liquid-glass-hover transition-all duration-500">
              <Mail className="w-5 h-5 text-ethereal-blue" />
              <a 
                href="mailto:TildaAI@proton.me" 
                className="text-gray-200 hover:text-ethereal-blue transition-colors duration-300 hero-text"
              >
                TildaAI@proton.me
              </a>
            </div>

            {/* X (Twitter) Button */}
            <button
              onClick={handleXClick}
              className="flex items-center gap-3 liquid-glass rounded-full px-6 py-3 hover:liquid-glass-hover transition-all duration-500 hover:scale-105 group"
            >
              <svg 
                className="w-5 h-5 text-ethereal-blue group-hover:text-white transition-colors duration-300" 
                fill="currentColor" 
                viewBox="0 0 24 24"
              >
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
              <span className="text-gray-200 group-hover:text-ethereal-blue transition-colors duration-300 hero-text">
                Follow us on X
              </span>
            </button>
          </div>

          {/* Copyright */}
          <div className="text-center pt-6 border-t border-white/5 w-full max-w-md">
            <p className="text-gray-400 text-sm hero-text">
              © {new Date().getFullYear()} Tilda AI. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;