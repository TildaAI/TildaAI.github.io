/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        'inter': ['Inter', 'sans-serif'],
      },
      colors: {
        'ethereal-blue': '#E0F4FF',
        'pure-black': '#000000',
        'clean-white': '#FFFFFF',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-in': 'fadeIn 0.8s ease-out forwards',
        'slide-up': 'slideUp 0.6s ease-out forwards',
        'morph': 'morph 8s ease-in-out infinite',
        'liquid-float': 'liquidFloat 10s ease-in-out infinite',
        'glass-shimmer': 'glassShimmer 3s ease-in-out infinite',
        'vote-pulse': 'votePulse 0.6s ease-out',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        morph: {
          '0%, 100%': { 
            borderRadius: '20px',
            transform: 'scale(1) rotate(0deg)',
          },
          '25%': { 
            borderRadius: '35px 20px 40px 15px',
            transform: 'scale(1.02) rotate(0.5deg)',
          },
          '50%': { 
            borderRadius: '25px 40px 20px 35px',
            transform: 'scale(1.01) rotate(-0.3deg)',
          },
          '75%': { 
            borderRadius: '40px 25px 30px 20px',
            transform: 'scale(1.03) rotate(0.2deg)',
          },
        },
        liquidFloat: {
          '0%, 100%': { 
            transform: 'translateY(0px) translateX(0px) scale(1)',
            filter: 'blur(0px)',
          },
          '33%': { 
            transform: 'translateY(-15px) translateX(10px) scale(1.05)',
            filter: 'blur(0.5px)',
          },
          '66%': { 
            transform: 'translateY(10px) translateX(-8px) scale(0.98)',
            filter: 'blur(0.3px)',
          },
        },
        glassShimmer: {
          '0%': { 
            background: 'rgba(255, 255, 255, 0.05)',
            boxShadow: '0 8px 32px rgba(224, 244, 255, 0.1)',
          },
          '50%': { 
            background: 'rgba(255, 255, 255, 0.12)',
            boxShadow: '0 12px 40px rgba(224, 244, 255, 0.2)',
          },
          '100%': { 
            background: 'rgba(255, 255, 255, 0.05)',
            boxShadow: '0 8px 32px rgba(224, 244, 255, 0.1)',
          },
        },
        votePulse: {
          '0%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.2)' },
          '100%': { transform: 'scale(1)' },
        },
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
};