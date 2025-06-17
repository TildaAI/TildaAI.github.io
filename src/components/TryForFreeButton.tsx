import React, { useState } from 'react';
import { Plus, X, Send, Check } from 'lucide-react';

interface TryForFreeButtonProps {
  className?: string;
}

const TryForFreeButton: React.FC<TryForFreeButtonProps> = ({ className = '' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    scope: '',
    description: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.scope.trim() || !formData.description.trim()) {
      return;
    }

    setIsSubmitted(true);
    
    // Close panel after 3 seconds
    setTimeout(() => {
      setIsOpen(false);
      setIsSubmitted(false);
      setFormData({ name: '', scope: '', description: '' });
    }, 3000);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleClose = () => {
    setIsOpen(false);
    setIsSubmitted(false);
  };

  return (
    <>
      {/* Try For Free Button */}
      <button
        onClick={() => setIsOpen(true)}
        className={`btn-primary flex items-center gap-2 ${className}`}
      >
        <Plus className="w-5 h-5" />
        Try For Free
      </button>

      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          style={{ animation: 'fadeIn 0.3s ease-out' }}
          onClick={(e) => e.target === e.currentTarget && handleClose()}
        >
          {/* Panel */}
          <div 
            className="liquid-glass rounded-3xl p-8 w-full max-w-md relative"
            style={{ 
              animation: isSubmitted ? 'none' : 'slideInScale 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
              transform: isSubmitted ? 'scale(1.05)' : 'scale(1)',
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

            {!isSubmitted ? (
              <>
                {/* Header */}
                <div className="text-center mb-8">
                  <h2 className="text-2xl font-bold text-white mb-2">Submit Your AI Project Idea</h2>
                  <p className="text-gray-300">Tell us about your vision and we'll help bring it to life</p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-200 mb-2">
                      Project Name *
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="w-full px-4 py-3 liquid-glass rounded-xl border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:border-ethereal-blue/50 focus:liquid-glass-hover transition-all duration-300"
                      placeholder="Enter your project name"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-200 mb-2">
                      Project Scope *
                    </label>
                    <input
                      type="text"
                      value={formData.scope}
                      onChange={(e) => handleInputChange('scope', e.target.value)}
                      className="w-full px-4 py-3 liquid-glass rounded-xl border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:border-ethereal-blue/50 focus:liquid-glass-hover transition-all duration-300"
                      placeholder="e.g., Machine Learning, Computer Vision, NLP"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-200 mb-2">
                      Brief Description *
                    </label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => handleInputChange('description', e.target.value)}
                      rows={4}
                      className="w-full px-4 py-3 liquid-glass rounded-xl border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:border-ethereal-blue/50 focus:liquid-glass-hover transition-all duration-300 resize-none"
                      placeholder="Describe your AI project idea, its goals, and potential impact..."
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={!formData.name.trim() || !formData.scope.trim() || !formData.description.trim()}
                    className="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                  >
                    <Send className="w-5 h-5" />
                    Send to Developers
                  </button>
                </form>
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
                <h3 className="text-2xl font-bold text-white mb-3">Idea Successfully Sent!</h3>
                <p className="text-gray-300 text-lg">
                  Your project idea has been sent to our developers' email. 
                  We'll review it and get back to you soon!
                </p>
                <div className="mt-6 flex justify-center">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-ethereal-blue rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
                    <div className="w-2 h-2 bg-ethereal-blue rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-ethereal-blue rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default TryForFreeButton;