import React from 'react';
import { X, Heart, Users, Calendar, TrendingUp, ExternalLink, Star, Award, Clock, Target } from 'lucide-react';
import { Project } from '../types/project';
import GeneratedLogo from './GeneratedLogo';

interface ProjectDetailsModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
  onVote: (message: string) => void;
}

const ProjectDetailsModal: React.FC<ProjectDetailsModalProps> = ({ 
  project, 
  isOpen, 
  onClose, 
  onVote 
}) => {
  const [isVoted, setIsVoted] = React.useState(false);
  const [voteCount, setVoteCount] = React.useState(project?.votes || 0);

  React.useEffect(() => {
    if (project) {
      setVoteCount(project.votes);
      setIsVoted(false);
    }
  }, [project]);

  const handleVote = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!project) return;
    
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

  const handleExternalLink = () => {
    if (project) {
      onVote(`Opening ${project.name} external resources...`);
    }
  };

  if (!isOpen || !project) return null;

  // Generate diverse location and founding data based on project ID
  const generateProjectDetails = (projectId: string, projectName: string) => {
    const locations = [
      'San Francisco, CA', 'New York, NY', 'Boston, MA', 'Seattle, WA', 'Austin, TX',
      'London, UK', 'Berlin, Germany', 'Toronto, Canada', 'Tel Aviv, Israel', 'Singapore',
      'Tokyo, Japan', 'Sydney, Australia', 'Amsterdam, Netherlands', 'Stockholm, Sweden',
      'Zurich, Switzerland', 'Paris, France', 'Barcelona, Spain', 'Copenhagen, Denmark',
      'Helsinki, Finland', 'Dublin, Ireland', 'Vancouver, Canada', 'Montreal, Canada',
      'Los Angeles, CA', 'Chicago, IL', 'Miami, FL', 'Denver, CO', 'Portland, OR',
      'Edinburgh, UK', 'Munich, Germany', 'Vienna, Austria', 'Oslo, Norway', 'Bangalore, India'
    ];

    const foundingYears = ['2020', '2021', '2022', '2023', '2024'];

    // Use project ID to generate consistent but varied data
    const locationIndex = parseInt(projectId) % locations.length;
    const yearIndex = parseInt(projectId) % foundingYears.length;

    return {
      founded: foundingYears[yearIndex],
      location: locations[locationIndex],
      industry: project.category,
      socialLinks: {
        twitter: `https://twitter.com/${projectName.toLowerCase().replace(/\s+/g, '')}`,
        linkedin: `https://linkedin.com/company/${projectName.toLowerCase().replace(/\s+/g, '')}`
      },
      keyFeatures: [
        'Advanced AI algorithms',
        'Real-time processing',
        'Scalable architecture',
        'User-friendly interface'
      ],
      techStack: ['Python', 'TensorFlow', 'React', 'Node.js', 'PostgreSQL'],
      milestones: [
        { date: 'Q1 2024', title: 'Project Inception', completed: true },
        { date: 'Q2 2024', title: 'MVP Development', completed: true },
        { date: 'Q3 2024', title: 'Beta Testing', completed: project.stage === 'Beta' || project.stage === 'Production' },
        { date: 'Q4 2024', title: 'Production Launch', completed: project.stage === 'Production' }
      ],
      metrics: {
        accuracy: '98.5%',
        uptime: '99.9%',
        users: '10K+',
        dataProcessed: '1M+ records'
      }
    };
  };

  const mockDetails = generateProjectDetails(project.id, project.name);

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

        {/* Header Section */}
        <div className="p-8 border-b border-white/10">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex items-start gap-6">
              <GeneratedLogo 
                name={project.name} 
                size="lg"
                className="flex-shrink-0"
              />
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h1 className="text-3xl font-bold text-white hero-text">{project.name}</h1>
                  <div className="px-3 py-1 bg-gradient-to-r from-ethereal-blue/20 to-blue-400/20 rounded-full border border-ethereal-blue/30">
                    <span className="text-ethereal-blue text-sm font-medium">{project.stage}</span>
                  </div>
                </div>
                <p className="text-gray-300 text-lg mb-4 hero-text">{project.category}</p>
                <p className="text-gray-200 leading-relaxed hero-text">{project.description}</p>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            <div className="text-center liquid-glass rounded-2xl p-4">
              <Users className="w-6 h-6 text-ethereal-blue mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">{project.teamSize}</div>
              <div className="text-sm text-gray-300">Team Members</div>
            </div>
            <div className="text-center liquid-glass rounded-2xl p-4">
              <Heart className="w-6 h-6 text-red-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">{voteCount.toLocaleString()}</div>
              <div className="text-sm text-gray-300">Community Votes</div>
            </div>
            <div className="text-center liquid-glass rounded-2xl p-4">
              <TrendingUp className="w-6 h-6 text-green-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">{project.fundingGoal}</div>
              <div className="text-sm text-gray-300">Funding Goal</div>
            </div>
            <div className="text-center liquid-glass rounded-2xl p-4">
              <Calendar className="w-6 h-6 text-blue-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-white">{mockDetails.founded}</div>
              <div className="text-sm text-gray-300">Founded</div>
            </div>
          </div>
        </div>

        {/* Content Sections */}
        <div className="p-8 space-y-8">
          {/* Key Features */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <Star className="w-6 h-6 text-ethereal-blue" />
              Key Features
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {mockDetails.keyFeatures.map((feature, index) => (
                <div key={index} className="flex items-center gap-3 liquid-glass rounded-xl p-4">
                  <div className="w-2 h-2 bg-ethereal-blue rounded-full"></div>
                  <span className="text-gray-200 hero-text">{feature}</span>
                </div>
              ))}
            </div>
          </section>

          {/* Performance Metrics */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <Award className="w-6 h-6 text-ethereal-blue" />
              Performance Metrics
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {Object.entries(mockDetails.metrics).map(([key, value]) => (
                <div key={key} className="liquid-glass rounded-xl p-4 text-center">
                  <div className="text-xl font-bold text-ethereal-blue">{value}</div>
                  <div className="text-sm text-gray-300 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</div>
                </div>
              ))}
            </div>
          </section>

          {/* Tech Stack */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <Target className="w-6 h-6 text-ethereal-blue" />
              Technology Stack
            </h2>
            <div className="flex flex-wrap gap-3">
              {mockDetails.techStack.map((tech, index) => (
                <span 
                  key={index}
                  className="px-4 py-2 liquid-glass rounded-full text-sm text-gray-200 hover:liquid-glass-hover transition-all duration-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          </section>

          {/* Project Timeline */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <Clock className="w-6 h-6 text-ethereal-blue" />
              Project Timeline
            </h2>
            <div className="space-y-4">
              {mockDetails.milestones.map((milestone, index) => (
                <div key={index} className="flex items-center gap-4">
                  <div className={`w-4 h-4 rounded-full ${milestone.completed ? 'bg-green-400' : 'bg-gray-500'}`}></div>
                  <div className="flex-1 liquid-glass rounded-xl p-4">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-white">{milestone.title}</span>
                      <span className="text-sm text-gray-300">{milestone.date}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Company Info */}
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Company Information</h2>
            <div className="liquid-glass rounded-2xl p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-ethereal-blue mb-2">Location</h3>
                  <p className="text-gray-200 hero-text">{mockDetails.location}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-ethereal-blue mb-2">Industry</h3>
                  <p className="text-gray-200 hero-text">{mockDetails.industry}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-ethereal-blue mb-2">Founded</h3>
                  <p className="text-gray-200 hero-text">{mockDetails.founded}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-ethereal-blue mb-2">Team Size</h3>
                  <p className="text-gray-200 hero-text">{project.teamSize} members</p>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Action Footer */}
        <div className="p-8 border-t border-white/10 flex flex-col sm:flex-row gap-4 justify-between items-center">
          <div className="flex items-center gap-4">
            <button
              onClick={handleVote}
              className={`vote-button flex items-center gap-2 px-6 py-3 ${isVoted ? 'voted' : ''}`}
            >
              <Heart 
                className={`w-5 h-5 transition-all duration-300 ${
                  isVoted ? 'text-red-400 fill-red-400' : 'text-gray-400 hover:text-red-400'
                }`} 
              />
              <span className="font-medium text-white">
                {isVoted ? 'Voted' : 'Vote'} ({voteCount.toLocaleString()})
              </span>
            </button>
          </div>

          <div className="flex gap-3">
            <button 
              onClick={handleExternalLink}
              className="liquid-glass hover:liquid-glass-hover rounded-2xl px-6 py-3 transition-all duration-500 flex items-center gap-2 hover:scale-105"
            >
              <ExternalLink className="w-5 h-5" />
              <span className="font-medium hero-text">Learn More</span>
            </button>
            <button 
              onClick={() => onVote(`Contacted ${project.name} team!`)}
              className="btn-primary px-6 py-3"
            >
              Contact Team
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailsModal;