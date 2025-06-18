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
    stage: '',
    description: '',
    detailedDescription: '',
    teamSize: '',
    fundingGoal: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.scope.trim() || !formData.stage.trim() || !formData.description.trim() || !formData.detailedDescription.trim() || !formData.teamSize.trim() || !formData.fundingGoal.trim()) {
      return;
    }

    setIsSubmitted(true);
    
    // Close panel after 3 seconds
    setTimeout(() => {
      setIsOpen(false);
      setIsSubmitted(false);
      setFormData({ name: '', scope: '', stage: '', description: '', detailedDescription: '', teamSize: '', fundingGoal: '' });
    }, 3000);
  };

  const handleInputChange = (field: string, value: string) => {
    // Handle name field with character limit (increased to 25)
    if (field === 'name') {
      if (value.length <= 25) {
        setFormData(prev => ({ ...prev, [field]: value }));
      }
      return;
    }

    // Handle stage field with 10 character limit
    if (field === 'stage') {
      if (value.length <= 10) {
        setFormData(prev => ({ ...prev, [field]: value }));
      }
      return;
    }

    // Handle team size - only allow numbers
    if (field === 'teamSize') {
      const numericValue = value.replace(/[^0-9]/g, '');
      if (numericValue === '' || (parseInt(numericValue) >= 1 && parseInt(numericValue) <= 100)) {
        setFormData(prev => ({ ...prev, [field]: numericValue }));
      }
      return;
    }

    // Handle funding goal - limit to 5,000 SOL
    if (field === 'fundingGoal') {
      // Remove any non-numeric characters except for existing "SOL"
      let cleanValue = value.replace(/[^0-9SOL\s]/g, '');
      
      // If user is typing numbers, auto-format with SOL
      const numericPart = cleanValue.replace(/[^0-9]/g, '');
      if (numericPart && !cleanValue.includes('SOL')) {
        const numValue = parseInt(numericPart);
        if (numValue <= 5000) {
          cleanValue = `${numericPart} SOL`;
        } else {
          cleanValue = '5000 SOL';
        }
      } else if (numericPart) {
        const numValue = parseInt(numericPart);
        if (numValue <= 5000) {
          cleanValue = `${numericPart} SOL`;
        } else {
          cleanValue = '5000 SOL';
        }
      } else {
        cleanValue = '';
      }
      
      setFormData(prev => ({ ...prev, [field]: cleanValue }));
      return;
    }

    // Default case for other fields
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleClose = () => {
    setIsOpen(false);
    setIsSubmitted(false);
  };

  // Generate icon with first letter and random color
  const generateProjectIcon = (name: string) => {
    if (!name.trim()) return null;
    
    const firstLetter = name.charAt(0).toUpperCase();
    
    // Generate consistent color based on name
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
      hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    
    const hue = Math.abs(hash) % 360;
    const backgroundColor = `hsl(${hue}, 70%, 60%)`;
    const textColor = hue > 60 && hue < 200 ? '#000000' : '#FFFFFF';
    
    return (
      <div 
        className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-bold shadow-lg"
        style={{ 
          backgroundColor,
          color: textColor,
          boxShadow: `0 8px 25px ${backgroundColor}40`
        }}
      >
        {firstLetter}
      </div>
    );
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
            className="liquid-glass rounded-3xl p-8 w-full max-w-lg relative max-h-[90vh] overflow-y-auto"
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

                {/* Project Preview */}
                {formData.name && (
                  <div className="mb-8 p-6 liquid-glass rounded-2xl">
                    <h3 className="text-lg font-semibold text-white mb-4">Project Preview</h3>
                    <div className="flex items-center gap-4">
                      {generateProjectIcon(formData.name)}
                      <div className="flex-1">
                        <h4 className="text-xl font-bold text-white">{formData.name}</h4>
                        <p className="text-gray-300">{formData.scope}</p>
                        {formData.stage && (
                          <p className="text-sm text-ethereal-blue mt-1">Stage: {formData.stage}</p>
                        )}
                        {formData.teamSize && (
                          <p className="text-sm text-gray-400 mt-1">Team: {formData.teamSize} members</p>
                        )}
                        {formData.fundingGoal && (
                          <p className="text-sm text-ethereal-blue mt-1">Goal: {formData.fundingGoal}</p>
                        )}
                      </div>
                    </div>
                  </div>
                )}

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-200 mb-2">
                      Project Name * <span className="text-xs text-gray-400">({formData.name.length}/25)</span>
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="w-full px-4 py-3 liquid-glass rounded-xl border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:border-ethereal-blue/50 focus:liquid-glass-hover transition-all duration-300"
                      placeholder="Enter your project name"
                      maxLength={25}
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-200 mb-2">
                      Project Category *
                    </label>
                    <select
                      value={formData.scope}
                      onChange={(e) => handleInputChange('scope', e.target.value)}
                      className="w-full px-4 py-3 liquid-glass rounded-xl border border-white/10 text-white bg-transparent focus:outline-none focus:border-ethereal-blue/50 focus:liquid-glass-hover transition-all duration-300"
                      required
                    >
                      <option value="" className="bg-gray-800">Select a category</option>
                      <option value="Machine Learning" className="bg-gray-800">Machine Learning</option>
                      <option value="Computer Vision" className="bg-gray-800">Computer Vision</option>
                      <option value="NLP" className="bg-gray-800">Natural Language Processing</option>
                      <option value="Robotics" className="bg-gray-800">Robotics</option>
                      <option value="Data Science" className="bg-gray-800">Data Science</option>
                      <option value="Healthcare AI" className="bg-gray-800">Healthcare AI</option>
                      <option value="Fintech AI" className="bg-gray-800">Fintech AI</option>
                      <option value="Gaming AI" className="bg-gray-800">Gaming AI</option>
                      <option value="Other" className="bg-gray-800">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-200 mb-2">
                      Project Stage * <span className="text-xs text-gray-400">({formData.stage.length}/10)</span>
                    </label>
                    <input
                      type="text"
                      value={formData.stage}
                      onChange={(e) => handleInputChange('stage', e.target.value)}
                      className="w-full px-4 py-3 liquid-glass rounded-xl border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:border-ethereal-blue/50 focus:liquid-glass-hover transition-all duration-300"
                      placeholder="e.g., Prototype, Alpha, Beta"
                      maxLength={10}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-200 mb-2">
                        Team Size * <span className="text-xs text-gray-400">(1-100)</span>
                      </label>
                      <input
                        type="text"
                        inputMode="numeric"
                        pattern="[0-9]*"
                        value={formData.teamSize}
                        onChange={(e) => handleInputChange('teamSize', e.target.value)}
                        className="w-full px-4 py-3 liquid-glass rounded-xl border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:border-ethereal-blue/50 focus:liquid-glass-hover transition-all duration-300"
                        placeholder="e.g., 5"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-200 mb-2">
                        Funding Goal * <span className="text-xs text-gray-400">(max 5,000 SOL)</span>
                      </label>
                      <input
                        type="text"
                        inputMode="numeric"
                        value={formData.fundingGoal}
                        onChange={(e) => handleInputChange('fundingGoal', e.target.value)}
                        className="w-full px-4 py-3 liquid-glass rounded-xl border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:border-ethereal-blue/50 focus:liquid-glass-hover transition-all duration-300"
                        placeholder="e.g., 50 SOL"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-200 mb-2">
                      Brief Description *
                    </label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => handleInputChange('description', e.target.value)}
                      rows={3}
                      className="w-full px-4 py-3 liquid-glass rounded-xl border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:border-ethereal-blue/50 focus:liquid-glass-hover transition-all duration-300 resize-none"
                      placeholder="Brief overview of your project idea..."
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-200 mb-2">
                      Detailed Description *
                    </label>
                    <textarea
                      value={formData.detailedDescription}
                      onChange={(e) => handleInputChange('detailedDescription', e.target.value)}
                      rows={5}
                      className="w-full px-4 py-3 liquid-glass rounded-xl border border-white/10 text-white placeholder-gray-400 focus:outline-none focus:border-ethereal-blue/50 focus:liquid-glass-hover transition-all duration-300 resize-none"
                      placeholder="Provide detailed information about your project including goals, technical approach, target market, potential impact, and any unique features or innovations..."
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={!formData.name.trim() || !formData.scope.trim() || !formData.stage.trim() || !formData.description.trim() || !formData.detailedDescription.trim() || !formData.teamSize.trim() || !formData.fundingGoal.trim()}
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
                  Your great project idea has been sent to our Moderator's email.
                  We'll quickly review it and list it here soon!
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default TryForFreeButton;