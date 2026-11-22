import React from 'react';

interface TeamMemberProps {
  name: string;
  role: string;
  image?: string;
  skills: string[];
}

const TeamMember: React.FC<TeamMemberProps> = ({ name, role, image, skills }) => {
  const initials = name
    .split(' ')
    .map((word) => word[0])
    .join('');

  return (
    <div className='group glass-dark rounded-3xl overflow-hidden border border-gray-700/50 hover:border-blue-500/50 transition-all duration-700 card-hover'>
      <div className='pt-10 px-10 flex justify-center'>
        <div className='relative'>
          {image ? (
            <img
              src={image}
              alt={name}
              className='w-40 h-40 rounded-full object-cover border-4 border-gray-800 group-hover:scale-110 group-hover:border-blue-500/50 transition-all duration-700'
            />
          ) : (
            <div className='w-40 h-40 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center border-4 border-gray-800 group-hover:scale-110 group-hover:border-blue-500/50 transition-all duration-700 animate-glow'>
              <span className='text-5xl font-bold text-white'>{initials}</span>
            </div>
          )}
          <div className='absolute -inset-1 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 opacity-0 group-hover:opacity-40 blur-md transition-opacity duration-500 -z-10'></div>
        </div>
      </div>
      <div className='px-10 pb-10 pt-8 text-center'>
        <h3 className='text-3xl font-bold mb-3 text-white group-hover:gradient-text-blue transition-all duration-300'>
          {name}
        </h3>
        <p className='text-blue-400 mb-8 font-semibold text-xl'>{role}</p>
        <div className='mb-8'>
          <h4 className='text-lg font-bold text-gray-300 mb-4'>Expertise</h4>
          <div className='flex flex-wrap gap-3'>
            {skills.map((skill) => (
              <span
                key={skill}
                className='bg-gray-800/50 text-gray-300 text-sm px-4 py-2 rounded-full border border-gray-600/50 hover:border-blue-500/50 transition-all duration-300 hover:scale-105'
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamMember;
