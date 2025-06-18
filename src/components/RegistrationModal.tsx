import React, { useState } from 'react';
import { X, User, Mail, Lock, Check } from 'lucide-react';

interface RegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  actionType: 'contact' | 'learn' | null;
  projectName?: string;
}

const RegistrationModal: React.FC<RegistrationModalProps> = ({ 
  isOpen, 
  onClose, 
  actionType,
  projectName 
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [isRegistered, setIsRegistered] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.password.trim()) {
      return;
    }

    setIsRegistered(true);
    
    // Close modal after 2 seconds
    setTimeout(() => {
      onClose();
      setIsRegistered(false);
      setFormData({ name: '', email: '', password: '' });
    }, 2000);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleClose = () => {
    onClose();
    setIsRegistered(false);
    setFormData({ name: '', email: '', password: '' });
  };

  if (!isOpen) return null;

  const getTitle = () => {
    if (actionType === 'contact') {
      return `Contact ${projectName} Team`;
    }
    return `Learn More About ${projectName}`;
  };

  const getDescription = () => {
    if (actionType === 'contact') {
      return 'Register to get in touch with the project team and explore collaboration opportunities.';
    }
    return 'Register to access detailed project information, documentation, and exclusive updates.';
  };

  return (
    <div 
      className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      style={{ animation: 'fadeIn 0.3s ease-out' }}
      onClick={(e) => e.target === e.currentTarget && handleClose()}
    >
      <div 
        className="liquid-glass rounded-3xl p-8 w-full max-w-md relative"
        style={{ 
          animation: isRegistered ? 'none' : 'slideInScale 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
          transform: isRegistered ? 'scale(1.05)' : 'scale(1)',
          transition: 'transform 0.3s ease-out'
        }}
      >
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 rounded-full liquid-glass hover:liquid-glass-hover transition-all duration-300 hover:scale-110"
        >
          <X className="w-5 h-5 text-gray-300" />
        </button>

        {!isRegistered ? (
          <>
            {/* Header */}
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-white mb-2">{getTitle()}</h2>
              <p className="text-gray-300">{getDescription()}</p>
            </div>

            {/* Registration Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">
                  Full Name *
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    className="w-full pl-12 pr-4 py-3 liquid-glass rounded-xl border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:border-ethereal-blue/50 focus:liquid-glass-hover transition-all duration-300"
                    placeholder="Enter your full name"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">
                  Email Address *
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="w-full pl-12 pr-4 py-3 liquid-glass rounded-xl border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:border-ethereal-blue/50 focus:liquid-glass-hover transition-all duration-300"
                    placeholder="Enter your email address"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-200 mb-2">
                  Password *
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="password"
                    value={formData.password}
                    onChange={(e) => handleInputChange('password', e.target.value)}
                    className="w-full pl-12 pr-4 py-3 liquid-glass rounded-xl border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:border-ethereal-blue/50 focus:liquid-glass-hover transition-all duration-300"
                    placeholder="Create a password"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={!formData.name.trim() || !formData.email.trim() || !formData.password.trim()}
                className="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                <User className="w-5 h-5" />
                Register
              </button>
            </form>

            {/* Additional Info */}
            <div className="mt-6 text-center">
              <p className="text-gray-400 text-sm">
                By registering, you agree to our Terms of Service and Privacy Policy
              </p>
            </div>
          </>
        ) : (
          /* Success State */
          <div className="text-center py-8">
            <div 
              className="w-16 h-16 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6"
              style={{ animation: 'successPulse 0.6s ease-out' }}
            >
              <Check className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">Registration Successful!</h3>
            <p className="text-gray-300 text-lg">
              Welcome to Tilda AI! You can now access exclusive project information and connect with teams.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RegistrationModal;