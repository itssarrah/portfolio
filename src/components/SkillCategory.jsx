import React from 'react';

const SkillCategory = ({ title, skills, icon: Icon, color, colors }) => (
  <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 border-l-4" style={{ borderLeftColor: color }}>
    <div className="flex items-center mb-6">
      <div className="p-3 rounded-full mr-4" style={{ backgroundColor: color + '20' }}>
        <Icon size={24} style={{ color: color }} />
      </div>
      <h4 className="text-xl font-bold text-gray-800" style={{ fontFamily: 'Gloock, serif' }}>{title}</h4>
    </div>
    <div className="flex flex-wrap gap-3">
      {skills.map((skill, index) => (
        <span
          key={index}
          className="px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 hover:shadow-md transform hover:scale-105"
          style={{ 
            backgroundColor: colors.secondary,
            color: colors.warm,
            fontFamily: 'Montserrat, sans-serif'
          }}
        >
          {skill}
        </span>
      ))}
    </div>
  </div>
);

export default SkillCategory;