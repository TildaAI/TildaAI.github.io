import React, { useState } from 'react';
import Hero from './components/Hero';
import FeaturedProjects from './components/FeaturedProjects';
import ProjectGallery from './components/ProjectGallery';
import ParticleBackground from './components/ParticleBackground';
import Notification from './components/Notification';
import TryForFreeButton from './components/TryForFreeButton';
import Footer from './components/Footer';

function App() {
  const [currentView, setCurrentView] = useState<'hero' | 'main'>('hero');
  const [notification, setNotification] = useState<string | null>(null);

  const handleBrowseProjects = () => {
    setCurrentView('main');
  };

  const handleBackToHero = () => {
    setCurrentView('hero');
  };

  const showNotification = (message: string) => {
    setNotification(message);
    setTimeout(() => setNotification(null), 3000);
  };

  return (
    <div className="min-h-screen bg-pure-black text-clean-white overflow-x-hidden relative">
      {/* Atmospheric Background Glow */}
      <div className="atmospheric-glow"></div>
      
      <ParticleBackground />
      
      {notification && <Notification message={notification} />}
      
      {currentView === 'hero' ? (
        <>
          <Hero onBrowseProjects={handleBrowseProjects} />
          <Footer />
        </>
      ) : (
        <div className="relative z-10">
          <div className="container mx-auto px-4 py-8">
            <button
              onClick={handleBackToHero}
              className="mb-8 text-ethereal-blue hover:text-white transition-all duration-500 flex items-center gap-2 liquid-glass px-6 py-3 rounded-full hover:scale-105 hover:liquid-glass-hover"
            >
              ← Back to Home
            </button>
            <FeaturedProjects onVote={showNotification} />
            
            {/* Try For Free Button Section */}
            <div className="text-center my-16">
              <div className="mb-6">
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                  Have a Project Idea?
                </h3>
                <p className="text-gray-300 text-lg max-w-2xl mx-auto hero-text">
                  Submit your innovative AI concept and let our expert developers bring it to life
                </p>
              </div>
              <div className="flex justify-center">
                <TryForFreeButton className="animate-liquid-float" />
              </div>
            </div>
            
            <ProjectGallery onVote={showNotification} />
          </div>
          <Footer />
        </div>
      )}
    </div>
  );
}

export default App;