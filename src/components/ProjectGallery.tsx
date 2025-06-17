import React, { useState, useMemo } from 'react';
import { Filter } from 'lucide-react';
import ProjectCard from './ProjectCard';
import { mockProjects, shuffleArray } from '../data/mockData';

interface ProjectGalleryProps {
  onVote: (message: string) => void;
}

const ProjectGallery: React.FC<ProjectGalleryProps> = ({ onVote }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const categories = ['all', 'Machine Learning', 'Computer Vision', 'NLP', 'Robotics', 'Data Science', 'Healthcare AI', 'Fintech AI', 'Gaming AI'];

  // Randomize non-featured projects (excluding first 3)
  const randomizedProjects = useMemo(() => {
    const nonFeaturedProjects = mockProjects.slice(3);
    return shuffleArray(nonFeaturedProjects);
  }, []);

  const filteredProjects = selectedCategory === 'all' 
    ? randomizedProjects
    : randomizedProjects.filter(project => project.category === selectedCategory);

  return (
    <section>
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
        <div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-white to-ethereal-blue bg-clip-text text-transparent hero-text">
            All Projects
          </h2>
          <p className="text-gray-300 text-lg hero-text">
            Explore our complete portfolio of AI innovations ({filteredProjects.length} projects)
          </p>
        </div>

        {/* Filter */}
        <div className="relative mt-6 md:mt-0">
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="flex items-center gap-2 liquid-glass px-6 py-3 rounded-full hover:liquid-glass-hover transition-all duration-500 hover:scale-105"
          >
            <Filter className="w-5 h-5" />
            <span className="hero-text">Filter</span>
          </button>

          {isFilterOpen && (
            <div className="absolute right-0 mt-2 liquid-glass rounded-2xl p-4 min-w-[220px] z-20 animate-slide-up">
              <div className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => {
                      setSelectedCategory(category);
                      setIsFilterOpen(false);
                      onVote(`Filter applied: ${category === 'all' ? 'All Categories' : category}`);
                    }}
                    className={`block w-full text-left px-4 py-3 rounded-xl transition-all duration-300 hero-text ${
                      selectedCategory === category
                        ? 'filter-active'
                        : 'hover:bg-white/10 hover:scale-105'
                    }`}
                  >
                    {category === 'all' ? 'All Categories' : category}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.map((project, index) => (
          <div
            key={project.id}
            className="animate-slide-up"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <ProjectCard project={project} onVote={onVote} />
          </div>
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <div className="text-center py-20">
          <div className="liquid-glass rounded-3xl p-12 max-w-md mx-auto animate-morph">
            <p className="text-gray-300 text-xl hero-text">
              No projects found in this category.
            </p>
          </div>
        </div>
      )}
    </section>
  );
};

export default ProjectGallery;