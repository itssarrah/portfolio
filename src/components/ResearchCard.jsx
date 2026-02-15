import React from 'react';
import { ExternalLink } from 'lucide-react';

const ResearchCard = ({ paper, colors, language }) => {
  return (
    <div className="relative bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all duration-300">
      <div className="absolute -top-4 -left-4 w-16 h-16 transform rotate-45" style={{ backgroundColor: colors.primary }}></div>
      <div className="absolute -top-2 -left-2 w-8 h-8 transform rotate-45 bg-white"></div>
      <div className="relative">
        <div className="flex items-start justify-between mb-4">
          <span 
            className="inline-block px-4 py-2 rounded-full text-sm font-medium text-white"
            style={{ backgroundColor: colors.accent }}
          >
            {language === 'fr' ? paper.focus.fr : paper.focus.en}
          </span>
          <span className="text-sm font-medium" style={{ color: colors.warm }}>
            {language === 'fr' ? paper.status.fr : paper.status.en}
          </span>
        </div>
        <h3 className="text-lg font-bold text-gray-800 mb-3" style={{ fontFamily: 'Gloock, serif' }}>
          {paper.title}
        </h3>
        <p className="text-gray-600 leading-relaxed mb-4" style={{ fontFamily: 'Montserrat, sans-serif' }}>
          {language === 'fr' ? paper.description.fr : paper.description.en}
        </p>
        
        {paper.doi && (
          <a
            href={paper.doi}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-2 px-4 py-2 rounded-lg text-white transition-all duration-200 hover:shadow-md transform hover:scale-105"
            style={{ 
              backgroundColor: colors.primary,
              fontFamily: 'Montserrat, sans-serif'
            }}
          >
            <ExternalLink size={16} />
            <span>{language === 'fr' ? paper.links.fr : paper.links.en}</span>
          </a>
        )}
      </div>
    </div>
  );
};

export default ResearchCard;