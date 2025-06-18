import React, { useState } from 'react';
import Hero from './components/Hero';
import FeaturedProjects from './components/FeaturedProjects';
import ProjectGallery from './components/ProjectGallery';
import ParticleBackground from './components/ParticleBackground';
import Notification from './components/Notification';
import TryForFreeButton from './components/TryForFreeButton';
import Footer from './components/Footer';
import ProjectDetailsModal from './components/ProjectDetailsModal';
import { Project } from './types/project';

function App() {
  const [currentView, setCurrentView] = useState<'hero' | 'main'>('hero');
  const [notification, setNotification] = useState<string | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const handleViewDetails = (project: Project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  return (
    <div className="min-h-screen bg-pure-black text-clean-white overflow-x-hidden relative flex flex-col">
      {/* Atmospheric Background Glow */}
      <div className="atmospheric-glow"></div>
      
      <ParticleBackground />
      
      {notification && <Notification message={notification} />}
      
      {currentView === 'hero' ? (
        <>
          <div className="flex-1 flex flex-col">
            <Hero onBrowseProjects={handleBrowseProjects} />
          </div>
          <Footer />
        </>
      ) : (
        <>
          <div className="relative z-10 flex-1">
            <div className="container mx-auto px-4 py-8">
              <button
                onClick={handleBackToHero}
                className="mb-8 text-ethereal-blue hover:text-white transition-all duration-500 flex items-center gap-2 liquid-glass px-6 py-3 rounded-full hover:scale-105 hover:liquid-glass-hover"
              >
                ← Back to Home
              </button>
              <FeaturedProjects onVote={showNotification} onViewDetails={handleViewDetails} />
              
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
              
              <ProjectGallery onVote={showNotification} onViewDetails={handleViewDetails} />
            </div>
          </div>
          <Footer />
        </>
      )}

      {/* Project Details Modal */}
      <ProjectDetailsModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onVote={showNotification}
      />
    </div>
  );
}

export default App;