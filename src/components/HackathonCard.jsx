import React, { useState, useEffect } from 'react';
import { MapPin, ChevronLeft, ChevronRight, Trophy, Calendar, Users, Award } from 'lucide-react';

export const HackathonCard = ({ 
  hackathon, 
  index, 
  colors
}) => {
  // Each card manages its own image state
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  // Handle image navigation
  const nextImage = () => {
    if (hackathon.images && hackathon.images.length > 1 && !isTransitioning) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentImageIndex((prev) => (prev + 1) % hackathon.images.length);
        setIsTransitioning(false);
      }, 150);
    }
  };
  
  const prevImage = () => {
    if (hackathon.images && hackathon.images.length > 1 && !isTransitioning) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentImageIndex((prev) => (prev - 1 + hackathon.images.length) % hackathon.images.length);
        setIsTransitioning(false);
      }, 150);
    }
  };
  
  const goToImage = (imageIndex) => {
    if (imageIndex !== currentImageIndex && !isTransitioning) {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentImageIndex(imageIndex);
        setIsTransitioning(false);
      }, 150);
    }
  };

  // Auto-play functionality (optional)
  useEffect(() => {
    if (hackathon.images && hackathon.images.length > 1) {
      const interval = setInterval(() => {
        nextImage();
      }, 5000); // Change image every 5 seconds
      
      return () => clearInterval(interval);
    }
  }, [currentImageIndex, hackathon.images]);

  return (
    <div className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300">
      {/* Image Carousel Container */}
      <div className="relative h-64 overflow-hidden">
        {/* Image Slider */}
        <div 
          className="flex transition-transform duration-500 ease-in-out h-full"
          style={{ 
            transform: `translateX(-${currentImageIndex * 100}%)`,
            filter: isTransitioning ? 'blur(1px)' : 'blur(0px)'
          }}
        >
          {hackathon.images && hackathon.images.map((image, imgIndex) => (
            <div key={imgIndex} className="min-w-full h-full relative">
              <img 
                src={image} 
                alt={`${hackathon.title} - Image ${imgIndex + 1}`}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
              {/* Fallback placeholder */}
              <div 
                className="absolute inset-0 bg-gradient-to-br from-blue-100 to-purple-100 items-center justify-center hidden"
                style={{ background: `linear-gradient(135deg, ${colors.primary}20, ${colors.accent}20)` }}
              >
                <Trophy size={48} style={{ color: colors.primary }} />
              </div>
            </div>
          ))}
        </div>
        
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Navigation Arrows */}
        {hackathon.images && hackathon.images.length > 1 && (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation();
                prevImage();
              }}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg transition-all duration-300 opacity-0 group-hover:opacity-100 hover:scale-110 backdrop-blur-sm"
              disabled={isTransitioning}
            >
              <ChevronLeft size={18} />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                nextImage();
              }}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 p-2 rounded-full shadow-lg transition-all duration-300 opacity-0 group-hover:opacity-100 hover:scale-110 backdrop-blur-sm"
              disabled={isTransitioning}
            >
              <ChevronRight size={18} />
            </button>
          </>
        )}
        
        {/* Dots Indicator */}
        {hackathon.images && hackathon.images.length > 1 && (
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {hackathon.images.map((_, imgIndex) => (
              <button
                key={imgIndex}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  imgIndex === currentImageIndex
                    ? 'bg-white shadow-lg scale-125'
                    : 'bg-white/60 hover:bg-white/80 hover:scale-110'
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  goToImage(imgIndex);
                }}
                disabled={isTransitioning}
              />
            ))}
          </div>
        )}
      </div>
      
      {/* Content */}
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-gray-900 transition-colors duration-300" style={{ fontFamily: 'Gloock, serif' }}>
              {hackathon.title}
            </h3>
            <p className="text-gray-600 flex items-center mb-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              <MapPin size={16} className="mr-1 flex-shrink-0" />
              <span className="truncate">{hackathon.location}</span>
            </p>
          </div>
          <div className="text-right ml-4">
            <span 
              className="inline-block px-3 py-1 rounded-full text-sm font-medium text-white mb-2 shadow-sm"
              style={{ backgroundColor: colors.accent }}
            >
              {hackathon.achievement}
            </span>
            <p className="text-sm text-gray-500 whitespace-nowrap" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              {hackathon.date}
            </p>
          </div>
        </div>
        
        <p className="text-gray-600 mb-4 leading-relaxed" style={{ fontFamily: 'Montserrat, sans-serif' }}>
          {hackathon.description}
        </p>
        
        {/* Additional Info */}
        {(hackathon.duration || hackathon.teamSize) && (
          <div className="flex items-center space-x-4 mb-4 text-sm text-gray-500">
            {hackathon.duration && (
              <div className="flex items-center space-x-1">
                <Calendar size={14} />
                <span style={{ fontFamily: 'Montserrat, sans-serif' }}>{hackathon.duration}</span>
              </div>
            )}
            {hackathon.teamSize && (
              <div className="flex items-center space-x-1">
                <Users size={14} />
                <span style={{ fontFamily: 'Montserrat, sans-serif' }}>{hackathon.teamSize}</span>
              </div>
            )}
          </div>
        )}
        
        {/* Technologies */}
        <div className="flex flex-wrap gap-2 mb-4">
          {hackathon.tech && hackathon.tech.map((tech, techIndex) => (
            <span
              key={techIndex}
              className="px-3 py-1 rounded-full text-xs font-medium transition-all duration-200 hover:scale-105"
              style={{ 
                backgroundColor: colors.accent,
                color: colors.warm,
                fontFamily: 'Montserrat, sans-serif'
              }}
            >
              {tech}
            </span>
          ))}
        </div>
        
        {/* Achievements */}
        {hackathon.achievements && hackathon.achievements.length > 0 && (
          <div className="space-y-2">
            {hackathon.achievements.map((achievement, achievementIndex) => (
              <div key={achievementIndex} className="flex items-center space-x-2">
                <Award size={14} style={{ color: colors.accent }} className="flex-shrink-0" />
                <span className="text-sm text-gray-600" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  {achievement}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};