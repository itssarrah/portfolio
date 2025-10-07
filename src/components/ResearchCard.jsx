import React from 'react';

const ResearchCard = ({ paper, colors,language }) => (
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
      <p className="text-gray-600 leading-relaxed" style={{ fontFamily: 'Montserrat, sans-serif' }}>
        {language === 'fr' ? paper.description.fr : paper.description.en}
      </p>
    </div>
  </div>
);

export default ResearchCard;