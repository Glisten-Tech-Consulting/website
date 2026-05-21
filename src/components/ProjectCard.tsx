import React from 'react';
import { ExternalLink } from 'lucide-react';

interface ProjectCardProps {
  title: string;
  description: string;
  image: string;
  tags: string[];
  featured?: boolean;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ title, description, image, tags, featured = false }) => {
  return (
    <div className="group glass-dark rounded-3xl overflow-hidden border border-gray-700/50 hover:border-blue-500/50 transition-all duration-700 card-hover">
      <div className="aspect-video overflow-hidden relative">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
        />
        {featured && (
          <div className="absolute top-4 left-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xs px-3 py-1 rounded-full font-semibold animate-pulse">
            Featured
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="absolute bottom-4 right-4">
            <div className="bg-white/20 backdrop-blur-sm p-3 rounded-full">
              <ExternalLink className="w-6 h-6 text-white" />
            </div>
          </div>
        </div>
      </div>
      <div className="p-8">
        <h3 className="text-2xl font-bold mb-4 text-white group-hover:gradient-text-blue transition-all duration-300">{title}</h3>
        <p className="text-gray-400 mb-6 text-lg leading-relaxed">{description}</p>
        <div className="flex flex-wrap gap-3">
          {tags.map((tag) => (
            <span
              key={tag}
              className="bg-gray-800/50 text-gray-300 text-sm px-3 py-2 rounded-full border border-gray-600/50 hover:border-blue-500/50 transition-colors duration-300"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;