import React from 'react';
import { Mail } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="relative z-10 mt-20 border-t border-white/10">
      <div className="container mx-auto px-4 py-12">
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