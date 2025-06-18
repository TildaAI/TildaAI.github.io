import React, { useState } from 'react';
import { Heart, Star, ExternalLink, Users, Calendar, TrendingUp } from 'lucide-react';
import { Project } from '../types/project';
import GeneratedLogo from './GeneratedLogo';

interface ProjectCardProps {
  project: Project;
  featured?: boolean;
  onVote: (message: string) => void;
  onViewDetails: (project: Project) => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, featured = false, onVote, onViewDetails }) => {
  const [isVoted, setIsVoted] = useState(false);
  const [voteCount, setVoteCount] = useState(project.votes);

  const handleVote = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isVoted) {
      setIsVoted(true);
      setVoteCount(prev => prev + 1);
      onVote(`You voted for ${project.name}! 🎉`);
    } else {
      setIsVoted(false);
      setVoteCount(prev => prev - 1);
      onVote(`Vote removed from ${project.name}`);
    }
  };

  const handleViewDetails = () => {
    onViewDetails(project);
  };

  return (
    <div className={`project-card group ${featured ? 'lg:p-8' : ''}`}>
      {/* Header with Generated Logo */}
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center gap-4">
          <div className="relative animate-liquid-float">
            <GeneratedLogo 
              name={project.name} 
              size={featured ? 'lg' : 'md'}
              className="transition-transform duration-300 group-hover:scale-110"
            />
          </div>
          <div>
            <h3 className={`font-bold ${featured ? 'text-xl' : 'text-lg'} group-hover:text-ethereal-blue transition-colors duration-500 hero-text`}>
              {project.name}
            </h3>
            <p className="text-gray-400 text-sm hero-text">{project.category}</p>
          </div>
        </div>
        
        {featured && (
          <div className="p-2 bg-gradient-to-r from-ethereal-blue/20 to-blue-400/20 rounded-xl border border-ethereal-blue/30 animate-pulse-slow">
            <Star className="w-5 h-5 text-ethereal-blue" />
          </div>
        )}
      </div>

      {/* Description */}
      <p className={`text-gray-200 mb-6 ${featured ? 'text-base' : 'text-sm'} line-clamp-3 hero-text leading-relaxed`}>
        {project.description}
      </p>

      {/* Metrics */}
      <div className="space-y-4 mb-6">
        <div className="flex justify-between items-center">
          <span className="text-gray-400 text-sm flex items-center gap-2">
            <Users className="w-4 h-4" />
            Team Size
          </span>
          <span className="font-semibold hero-text">{project.teamSize} members</span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-gray-400 text-sm flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            Stage
          </span>
          <span className="font-semibold text-ethereal-blue text-shadow-glow">{project.stage}</span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-gray-400 text-sm flex items-center gap-2">
            <TrendingUp className="w-4 h-4" />
            Funding Goal
          </span>
          <span className="font-semibold text-green-400">{project.fundingGoal}</span>
        </div>
        
        <div className="flex justify-between items-center">
          <span className="text-gray-400 text-sm flex items-center gap-2">
            <Heart className="w-4 h-4" />
            Community Votes
          </span>
          <div className="flex items-center gap-2">
            <span className="font-semibold hero-text">{voteCount.toLocaleString()}</span>
            <button
              onClick={handleVote}
              className={`vote-button ${isVoted ? 'voted' : ''} animate-vote-pulse`}
            >
              <Heart 
                className={`w-4 h-4 transition-all duration-300 ${
                  isVoted ? 'text-red-400 fill-red-400' : 'text-gray-400 hover:text-red-400'
                }`} 
              />
            </button>
          </div>
        </div>
      </div>

      {/* Action Button */}
      <button 
        onClick={handleViewDetails}
        className="w-full py-3 liquid-glass hover:liquid-glass-hover rounded-2xl transition-all duration-500 flex items-center justify-center gap-2 group-hover:scale-105 hover:shadow-lg hover:shadow-ethereal-blue/20"
      >
        <span className="font-medium hero-text">View Details</span>
        <ExternalLink className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
      </button>
    </div>
  );
};

export default ProjectCard;