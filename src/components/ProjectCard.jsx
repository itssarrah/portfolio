import React from 'react';
import { Github } from 'lucide-react';

import { translations } from '../translations';

const ProjectCard = ({ language, project, type, colors }) => {
  // ✅ Get the correct translations inside the component
  const t = translations[language] || translations.en;

  return (
  <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
    <div className="relative">
      <img 
        src={project.image} 
        alt={project.title}
        className="w-full h-48 object-cover"
      />
      <div className="absolute top-4 right-4">
        <span 
          className="px-3 py-1 rounded-full text-sm font-medium text-white"
          style={{ backgroundColor: type === 'AI' ? colors.primary : colors.accent }}
        >
          {type}
        </span>
      </div>
    </div>
    <div className="p-6">
      <h3 className="text-xl font-bold text-gray-800 mb-3" style={{ fontFamily: 'Gloock, serif' }}>
        {project.title}
      </h3>
      <p className="text-gray-600 mb-4 leading-relaxed" style={{ fontFamily: 'Montserrat, sans-serif' }}>
        {project.description}
      </p>
      <div className="flex flex-wrap gap-2 mb-4">
        {project.tech.map((tech, index) => (
          <span
            key={index}
            className="px-3 py-1 rounded-full text-xs font-medium"
            style={{ 
              backgroundColor: colors.secondary,
              color: colors.warm,
              fontFamily: 'Montserrat, sans-serif'
            }}
          >
            {tech}
          </span>
        ))}
      </div>
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-500" style={{ fontFamily: 'Montserrat, sans-serif' }}>
          {project.status}
        </span>
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-200 hover:shadow-md"
          style={{ 
            backgroundColor: colors.warm,
            color: 'white',
            fontFamily: 'Montserrat, sans-serif'
          }}
        >
          <Github size={16} />
          <span>{t.projects.viewCode}</span>
        </a>
      </div>
    </div>
  </div>

)};

export default ProjectCard;