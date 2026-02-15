import React, { useState, useEffect } from 'react';
import PortfolioContent from './pages/PortfolioContent';
import GalleryContent from './pages/GalleryContent';

const App = () => {
  const [language, setLanguage] = useState('en');
  const [activeSection, setActiveSection] = useState('hero');
  const [currentPage, setCurrentPage] = useState('portfolio');

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

  return (
    <div>
      <link href="https://fonts.googleapis.com/css2?family=Gloock:wght@400&family=Montserrat:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      {currentPage === 'portfolio' ? (
        <PortfolioContent 
          activeSection={activeSection}
          setActiveSection={setActiveSection}
          colors={colors}
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