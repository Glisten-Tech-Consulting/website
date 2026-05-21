import React from 'react';
import { Github, ExternalLink } from 'lucide-react';

interface TeamMemberProps {
  name: string;
  role: string;
  image: string;
  skills: string[];
  github: string;
}

const TeamMember: React.FC<TeamMemberProps> = ({ name, role, image, skills, github }) => {
  return (
    <div className="group glass-dark rounded-3xl overflow-hidden border border-gray-700/50 hover:border-blue-500/50 transition-all duration-700 card-hover">
      <div className="aspect-square overflow-hidden relative">
        <img 
          src={image} 
          alt={name} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      </div>
      <div className="p-10">
        <h3 className="text-3xl font-bold mb-3 text-white group-hover:gradient-text-blue transition-all duration-300">{name}</h3>
        <p className="text-blue-400 mb-8 font-semibold text-xl">{role}</p>
        <div className="mb-8">
          <h4 className="text-lg font-bold text-gray-300 mb-4">Expertise</h4>
          <div className="flex flex-wrap gap-3">
            {skills.map((skill) => (
              <span
                key={skill}
                className="bg-gray-800/50 text-gray-300 text-sm px-4 py-2 rounded-full border border-gray-600/50 hover:border-blue-500/50 transition-all duration-300 hover:scale-105"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
        <a
          href={github}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center text-gray-300 hover:text-blue-400 transition-all duration-300 group/link text-lg font-semibold"
        >
          <Github className="w-6 h-6 mr-3" />
          <span className="mr-2">GitHub Profile</span>
          <ExternalLink className="w-5 h-5 group-hover/link:translate-x-1 transition-transform duration-300" />
        </a>
      </div>
    </div>
  );
};

export default TeamMember;