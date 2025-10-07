// import React from "react";
// import Portfolio from "./Portfolio"; // Adjust path if needed

// export default function App() {
//   return (
//     <div className="min-h-screen">
//       <Portfolio />
//     </div>
//   );
// }
import React, { useState, useEffect } from 'react';
import { 
  User, Brain, Code, Trophy, BookOpen, Mail, Phone, MapPin, 
  Linkedin, Github, ExternalLink, Camera, Calendar, Award,
  GraduationCap, Briefcase, Lightbulb, Star, ChevronRight,
  Download, ChevronLeft, Eye, Zap, Target, Database,
  Smartphone, Globe
} from 'lucide-react';
import PortfolioContent from './pages/PortfolioContent';
import GalleryContent from './pages/GalleryContent';
import { hackathons } from './data/hackathons';  // Import hackathons here

const App = () => {
  const [language, setLanguage] = useState('en');
  const [activeSection, setActiveSection] = useState('hero');
  const [isVisible, setIsVisible] = useState({});
  const [currentPage, setCurrentPage] = useState('portfolio');
  const [currentImageIndex, setCurrentImageIndex] = useState({});
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'projects', 'hackathons', 'skills', 'research'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;

          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Custom color palette
  const colors = {
    primary: '#A2D2DF',
    secondary: '#F6EFBD', 
    accent: '#E4C087',
    warm: '#BC7C7C'
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(prev => ({
            ...prev,
            [entry.target.id]: entry.isIntersecting
          }));
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('section[id]').forEach((section) => {
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  const nextImage = (hackathonIndex) => {
    setCurrentImageIndex(prev => ({
      ...prev,
      [hackathonIndex]: ((prev[hackathonIndex] || 0) + 1) % hackathons[hackathonIndex].images.length
    }));
  };

  const prevImage = (hackathonIndex) => {
    setCurrentImageIndex(prev => ({
      ...prev,
      [hackathonIndex]: ((prev[hackathonIndex] || 0) - 1 + hackathons[hackathonIndex].images.length) % hackathons[hackathonIndex].images.length
    }));
  };

  return (
    <div>
      <link href="https://fonts.googleapis.com/css2?family=Gloock:wght@400&family=Montserrat:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      {currentPage === 'portfolio' ? (
        <PortfolioContent 
          activeSection={activeSection}
          setActiveSection={setActiveSection}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          colors={colors}
          currentImageIndex={currentImageIndex}
          nextImage={nextImage}
          prevImage={prevImage}
          setCurrentImageIndex={setCurrentImageIndex}
          language={language}
          setLanguage={setLanguage}
        />
      ) : (
        <GalleryContent 
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          colors={colors}
        />
      )}
    </div>
  );
};

export default App;