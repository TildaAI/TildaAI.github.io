import React from 'react';
import ProjectCard from './ProjectCard';
import { mockProjects } from '../data/mockData';
import { Project } from '../types/project';

interface FeaturedProjectsProps {
  onVote: (message: string) => void;
  onViewDetails: (project: Project) => void;
}

const FeaturedProjects: React.FC<FeaturedProjectsProps> = ({ onVote, onViewDetails }) => {
  const featuredProjects = mockProjects.slice(0, 3);

  return (
    <section className="mb-20">
      <div className="text-center mb-12">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
          Featured Projects
        </h2>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto hero-text">
          Discover the most promising AI projects in our accelerator program
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {featuredProjects.map((project, index) => (
          <div
            key={project.id}
            className="animate-slide-up"
            style={{ animationDelay: `${index * 0.2}s` }}
          >
            <ProjectCard 
              project={project} 
              featured={true} 
              onVote={onVote} 
              onViewDetails={onViewDetails}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default FeaturedProjects;