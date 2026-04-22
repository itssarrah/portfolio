import React, { useState, useEffect } from 'react';
import PortfolioContent from './pages/PortfolioContent';
import FallingPetals from './components/3d/FallingPetals';
import { useMousePosition } from './hooks/useMousePosition';
import { useDeviceCapability } from './hooks/useDeviceCapability';

const App = () => {
  const [language, setLanguage] = useState('en');
  const [activeSection, setActiveSection] = useState('hero');
  const { x: mouseX } = useMousePosition();
  const capability = useDeviceCapability();

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'about', 'projects', 'hackathons', 'skills', 'research'];
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

  return (
    <div className="relative">
      <FallingPetals />

      <PortfolioContent
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        language={language}
        setLanguage={setLanguage}
        mouseX={mouseX}
        capability={capability}
      />
    </div>
  );
};

export default App;
