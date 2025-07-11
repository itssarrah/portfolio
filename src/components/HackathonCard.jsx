import React from 'react';
import { MapPin, ChevronLeft, ChevronRight } from 'lucide-react';

const HackathonCard = ({ 
  hackathon, 
  index, 
  currentImageIndex, 
  prevImage, 
  nextImage, 
  colors,
  setCurrentImageIndex
}) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300">
      <div className="relative">
        <img 
          src={hackathon.images[currentImageIndex[index] || 0]} 
          alt={hackathon.title}
          className="w-full h-64 object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-between px-4">
          <button
            onClick={() => prevImage(index)}
            className="bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 transition-all duration-200"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={() => nextImage(index)}
            className="bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 transition-all duration-200"
          >
            <ChevronRight size={20} />
          </button>
        </div>
        <div className="absolute bottom-4 left-4 right-4 flex justify-center space-x-2">
          {hackathon.images.map((_, imgIndex) => (
            <button
              key={imgIndex}
              className={`w-2 h-2 rounded-full transition-all duration-200 ${
                imgIndex === (currentImageIndex[index] || 0) ? 'bg-white' : 'bg-white bg-opacity-50'
              }`}
              onClick={() => setCurrentImageIndex(prev => ({ ...prev, [index]: imgIndex }))}
            />
          ))}
        </div>
      </div>
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-xl font-bold text-gray-800 mb-2" style={{ fontFamily: 'Gloock, serif' }}>
              {hackathon.title}
            </h3>
            <p className="text-gray-600 flex items-center" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              <MapPin size={16} className="mr-1" />
              {hackathon.location}
            </p>
          </div>
          <div className="text-right">
            <span 
              className="inline-block px-3 py-1 rounded-full text-sm font-medium text-white mb-2"
              style={{ backgroundColor: colors.accent }}
            >
              {hackathon.achievement}
            </span>
            <p className="text-sm text-gray-500" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              {hackathon.date}
            </p>
          </div>
        </div>
        <p className="text-gray-600 mb-4 leading-relaxed" style={{ fontFamily: 'Montserrat, sans-serif' }}>
          {hackathon.description}
        </p>
        <div className="flex flex-wrap gap-2">
          {hackathon.tech.map((tech, techIndex) => (
            <span
              key={techIndex}
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
      </div>
    </div>
  );
};

export default HackathonCard;