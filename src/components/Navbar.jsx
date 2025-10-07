import React, { useState } from 'react';
import { User, Lightbulb, Trophy, Code, BookOpen, Globe } from 'lucide-react';
import NavItem from './NavItem';
import { translations } from '../translations';

const Navbar = ({ activeSection, setActiveSection, colors, language, setLanguage }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const toggleLanguage = () => setLanguage(language === 'en' ? 'fr' : 'en');

  const t = translations[language];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md shadow-lg overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo & Name */}
          <div className="flex items-center space-x-3">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
              style={{ backgroundColor: colors.primary }}
            >
              <img src="Pic.jpg" alt="Sarra Arab" className="object-cover rounded-full w-full h-full" />
            </div>
            <span
              className="text-xl font-bold text-gray-800"
              style={{ fontFamily: 'Gloock, serif' }}
            >
              Sarra Arab
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden sm:flex space-x-2 items-center">
            <NavItem href="#hero" icon={User} label={t.nav.about} isActive={activeSection === 'hero'} onClick={() => setActiveSection('hero')} colors={colors} />
            <NavItem href="#projects" icon={Lightbulb} label={t.nav.projects} isActive={activeSection === 'projects'} onClick={() => setActiveSection('projects')} colors={colors} />
            <NavItem href="#hackathons" icon={Trophy} label={t.nav.hackathons} isActive={activeSection === 'hackathons'} onClick={() => setActiveSection('hackathons')} colors={colors} />
            <NavItem href="#skills" icon={Code} label={t.nav.skills} isActive={activeSection === 'skills'} onClick={() => setActiveSection('skills')} colors={colors} />
            <NavItem href="#research" icon={BookOpen} label={t.nav.research} isActive={activeSection === 'research'} onClick={() => setActiveSection('research')} colors={colors} />
            
            {/* Language Toggle */}
            <button
              onClick={toggleLanguage}
              className="flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-300 text-gray-700 hover:bg-gray-100 border border-gray-300"
              title={language === 'en' ? 'Switch to French' : 'Passer à l\'anglais'}
            >
              <Globe size={18} />
              <span className="font-medium text-sm">{language.toUpperCase()}</span>
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="sm:hidden flex items-center space-x-2">
            {/* Language Toggle for Mobile */}
            <button
              onClick={toggleLanguage}
              className="flex items-center space-x-1 px-2 py-1 rounded-md transition-all duration-300 text-gray-700 hover:bg-gray-100"
              title={language === 'en' ? 'Switch to French' : 'Passer à l\'anglais'}
            >
              <Globe size={16} />
              <span className="font-medium text-xs">{language.toUpperCase()}</span>
            </button>

            <button
              onClick={toggleMenu}
              className="relative text-gray-700 p-2 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-0 transition-all duration-200 ease-in-out"
              style={{ outline: 'none', boxShadow: 'none' }}
            >
              {/* Hamburger to X Animation */}
              <div className="w-6 h-6 relative">
                {/* Top line */}
                <span 
                  className={`absolute left-0 top-1 w-6 h-0.5 bg-current transform transition-all duration-300 ease-in-out ${
                    menuOpen ? 'rotate-45 translate-y-2' : 'rotate-0 translate-y-0'
                  }`}
                />
                {/* Middle line */}
                <span 
                  className={`absolute left-0 top-2.5 w-6 h-0.5 bg-current transition-all duration-300 ease-in-out ${
                    menuOpen ? 'opacity-0' : 'opacity-100'
                  }`}
                />
                {/* Bottom line */}
                <span 
                  className={`absolute left-0 top-4 w-6 h-0.5 bg-current transform transition-all duration-300 ease-in-out ${
                    menuOpen ? '-rotate-45 -translate-y-2' : 'rotate-0 translate-y-0'
                  }`}
                />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        <div 
          className={`sm:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            menuOpen 
              ? 'max-h-96 opacity-100' 
              : 'max-h-0 opacity-0'
          }`}
        >
          <div className="flex flex-col space-y-1 pb-4 px-2">
            <div className="transform transition-all duration-300 ease-in-out delay-75">
              <NavItem 
                href="#hero" 
                icon={User} 
                label={t.nav.about}
                isActive={activeSection === 'hero'} 
                onClick={() => { setActiveSection('hero'); toggleMenu(); }} 
                colors={colors} 
              />
            </div>
            <div className="transform transition-all duration-300 ease-in-out delay-100">
              <NavItem 
                href="#projects" 
                icon={Lightbulb} 
                label={t.nav.projects}
                isActive={activeSection === 'projects'} 
                onClick={() => { setActiveSection('projects'); toggleMenu(); }} 
                colors={colors} 
              />
            </div>
            <div className="transform transition-all duration-300 ease-in-out delay-150">
              <NavItem 
                href="#hackathons" 
                icon={Trophy} 
                label={t.nav.hackathons}
                isActive={activeSection === 'hackathons'} 
                onClick={() => { setActiveSection('hackathons'); toggleMenu(); }} 
                colors={colors} 
              />
            </div>
            <div className="transform transition-all duration-300 ease-in-out delay-200">
              <NavItem 
                href="#skills" 
                icon={Code} 
                label={t.nav.skills}
                isActive={activeSection === 'skills'} 
                onClick={() => { setActiveSection('skills'); toggleMenu(); }} 
                colors={colors} 
              />
            </div>
            <div className="transform transition-all duration-300 ease-in-out delay-250">
              <NavItem 
                href="#research" 
                icon={BookOpen} 
                label={t.nav.research}
                isActive={activeSection === 'research'} 
                onClick={() => { setActiveSection('research'); toggleMenu(); }} 
                colors={colors} 
              />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;