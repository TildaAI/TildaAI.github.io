import React from 'react';
import { X, Lightbulb, Users, Brain, Coins } from 'lucide-react';

interface HowItWorksPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

const HowItWorksPanel: React.FC<HowItWorksPanelProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      style={{ animation: 'fadeIn 0.3s ease-out' }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div 
        className="liquid-glass rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-y-auto relative"
        style={{ animation: 'slideInScale 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)' }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-3 rounded-full liquid-glass hover:liquid-glass-hover transition-all duration-300 hover:scale-110 z-10"
        >
          <X className="w-6 h-6 text-gray-300" />
        </button>

        {/* Header */}
        <div className="p-8 border-b border-white/10">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4 hero-text">
            Revolutionizing Innovation: How Our Platform Empowers Your Ideas
          </h1>
          <p className="text-xl text-gray-300 leading-relaxed hero-text">
            At the heart of our mission is a commitment to democratizing innovation and empowering creators worldwide. Our platform, soon to be accessible to everyone via our dedicated website, offers a seamless and intuitive environment for bringing groundbreaking ideas to life.
          </p>
        </div>

        {/* Content Sections */}
        <div className="p-8 space-y-8">
          {/* Section 1: Create and Collaborate */}
          <section className="liquid-glass rounded-2xl p-6">
            <div className="flex items-start gap-4 mb-4">
              <div className="p-3 bg-gradient-to-r from-ethereal-blue/20 to-blue-400/20 rounded-xl">
                <Lightbulb className="w-6 h-6 text-ethereal-blue" />
              </div>
              <h2 className="text-2xl font-bold text-white hero-text">
                The Genesis of Innovation: Create and Collaborate
              </h2>
            </div>
            <p className="text-gray-200 leading-relaxed hero-text">
              Upon launch, you'll be able to create and submit your own startup projects, transforming your vision into a tangible proposal for the world to see. But the power doesn't stop there. Our platform fosters a vibrant community where you can actively engage by voting on other users' projects. This collective intelligence is crucial, as it provides invaluable feedback and helps identify projects that resonate most with the community.
            </p>
          </section>

          {/* Section 2: AI Advantage */}
          <section className="liquid-glass rounded-2xl p-6">
            <div className="flex items-start gap-4 mb-4">
              <div className="p-3 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl">
                <Brain className="w-6 h-6 text-purple-400" />
              </div>
              <h2 className="text-2xl font-bold text-white hero-text">
                The AI Advantage: Identifying Potential
              </h2>
            </div>
            <p className="text-gray-200 leading-relaxed hero-text mb-4">
              The true differentiator of our platform lies in the sophisticated integration of artificial intelligence. Our advanced AI system meticulously analyzes submitted projects, taking into account both community sentiment (votes) and the inherent potential and legitimacy of each proposal. This dual-layered evaluation ensures that projects are not only popular but also possess the foundational elements for real-world success.
            </p>
            <p className="text-gray-200 leading-relaxed hero-text">
              From the multitude of brilliant ideas, our AI is specifically designed to pinpoint the top three most promising and highly-regarded projects.
            </p>
          </section>

          {/* Section 3: Investment Model */}
          <section className="liquid-glass rounded-2xl p-6">
            <div className="flex items-start gap-4 mb-4">
              <div className="p-3 bg-gradient-to-r from-green-500/20 to-emerald-500/20 rounded-xl">
                <Coins className="w-6 h-6 text-green-400" />
              </div>
              <h2 className="text-2xl font-bold text-white hero-text">
                From Vision to Reality: Comprehensive Investment
              </h2>
            </div>
            <p className="text-gray-200 leading-relaxed hero-text mb-4">
              Once our AI has identified these exceptional projects, our commitment shifts to comprehensive investment. We understand that securing funding is often the biggest hurdle for aspiring entrepreneurs. Therefore, we will completely finance these chosen projects using Solana cryptocurrency, providing the necessary capital to transform these promising ventures into fully realized businesses.
            </p>
            <p className="text-gray-200 leading-relaxed hero-text">
              Our investment model is designed to be highly beneficial for both creators and our community. While we provide full financial backing, we only retain a modest 10% of the project's future revenue. This portion is then strategically distributed among other investors, creating a mutually beneficial ecosystem where community participation is directly rewarded. This innovative approach ensures that those who believe in and support emerging projects are an integral part of their success, fostering a truly collaborative and rewarding environment for all participants.
            </p>
          </section>

          {/* Community Benefits */}
          <section className="liquid-glass rounded-2xl p-6">
            <div className="flex items-start gap-4 mb-4">
              <div className="p-3 bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-xl">
                <Users className="w-6 h-6 text-orange-400" />
              </div>
              <h2 className="text-2xl font-bold text-white hero-text">
                Join the Revolution
              </h2>
            </div>
            <p className="text-gray-200 leading-relaxed hero-text">
              We are on the cusp of unveiling a platform that will redefine how innovative ideas are discovered, funded, and brought to fruition. Join us as we embark on this exciting journey to empower the next generation of entrepreneurs.
            </p>
          </section>

          {/* Key Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="text-center liquid-glass rounded-2xl p-6">
              <div className="text-3xl font-bold text-ethereal-blue mb-2">10%</div>
              <div className="text-sm text-gray-300">Revenue Share</div>
            </div>
            <div className="text-center liquid-glass rounded-2xl p-6">
              <div className="text-3xl font-bold text-green-400 mb-2">100%</div>
              <div className="text-sm text-gray-300">Project Funding</div>
            </div>
            <div className="text-center liquid-glass rounded-2xl p-6">
              <div className="text-3xl font-bold text-purple-400 mb-2">AI</div>
              <div className="text-sm text-gray-300">Powered Selection</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorksPanel;