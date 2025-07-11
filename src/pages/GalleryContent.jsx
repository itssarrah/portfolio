import React from 'react';
import { User, Camera, Brain } from 'lucide-react';
import NavItem from '../components/NavItem';

const GalleryContent = ({ currentPage, setCurrentPage, colors }) => {
  return (
    <div className="min-h-screen" style={{ background: `linear-gradient(135deg, ${colors.primary}20 0%, white 50%, ${colors.secondary}20 100%)` }}>
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: colors.primary }}>
                <Brain className="text-white" size={20} />
              </div>
              <span className="text-xl font-bold text-gray-800" style={{ fontFamily: 'Gloock, serif' }}>
                Sarra Arab
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <NavItem 
                href="#" 
                icon={User} 
                label="About" 
                isActive={currentPage === 'portfolio'}
                onClick={() => setCurrentPage('portfolio')}
                colors={colors}
              />
              <NavItem 
                href="#" 
                icon={Camera} 
                label="Gallery" 
                isActive={currentPage === 'gallery'}
                onClick={() => setCurrentPage('gallery')}
                colors={colors}
              />
            </div>
          </div>
        </div>
      </nav>

      {/* Gallery Content */}
      <div className="pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'Gloock, serif' }}>
              Event Gallery
            </h1>
            <p className="text-xl text-gray-600" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              Moments from hackathons, conferences, and achievements
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              { title: "AGRI-CHALLENGE Winner", category: "Hackathon", date: "Jun 2024" },
              { title: "SHESEM Healthcare Solution", category: "Competition", date: "Apr 2024" },
              { title: "AI Conference Presentation", category: "Conference", date: "Mar 2024" },
              { title: "Team Collaboration", category: "Workshop", date: "Feb 2024" },
              { title: "Research Showcase", category: "Academic", date: "Jan 2024" },
              { title: "Networking Event", category: "Professional", date: "Dec 2023" }
            ].map((item, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                <div className="relative">
                  <div className="aspect-square bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                    <img 
                      src={`/api/placeholder/400/400`} 
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute top-4 right-4">
                    <span 
                      className="px-3 py-1 rounded-full text-xs font-medium text-white"
                      style={{ backgroundColor: colors.warm }}
                    >
                      {item.category}
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-800 mb-2" style={{ fontFamily: 'Gloock, serif' }}>
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-500" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    {item.date}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GalleryContent;