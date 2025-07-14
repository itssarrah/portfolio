import React, { useState } from 'react';
import { User, Lightbulb, Trophy, Code, BookOpen, Menu, X } from 'lucide-react';
import NavItem from './NavItem'; // Update the import path as needed

const Navbar = ({ activeSection, setActiveSection, colors }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

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
            <NavItem href="#hero" icon={User} label="About" isActive={activeSection === 'hero'} onClick={() => setActiveSection('hero')} colors={colors} />
            <NavItem href="#projects" icon={Lightbulb} label="Projects" isActive={activeSection === 'projects'} onClick={() => setActiveSection('projects')} colors={colors} />
            <NavItem href="#hackathons" icon={Trophy} label="Hackathons" isActive={activeSection === 'hackathons'} onClick={() => setActiveSection('hackathons')} colors={colors} />
            <NavItem href="#skills" icon={Code} label="Skills" isActive={activeSection === 'skills'} onClick={() => setActiveSection('skills')} colors={colors} />
            <NavItem href="#research" icon={BookOpen} label="Research" isActive={activeSection === 'research'} onClick={() => setActiveSection('research')} colors={colors} />
          </div>

          {/* Mobile Menu Toggle */}
          <div className="sm:hidden">
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
                label="About" 
                isActive={activeSection === 'hero'} 
                onClick={() => { setActiveSection('hero'); toggleMenu(); }} 
                colors={colors} 
              />
            </div>
            <div className="transform transition-all duration-300 ease-in-out delay-100">
              <NavItem 
                href="#projects" 
                icon={Lightbulb} 
                label="Projects" 
                isActive={activeSection === 'projects'} 
                onClick={() => { setActiveSection('projects'); toggleMenu(); }} 
                colors={colors} 
              />
            </div>
            <div className="transform transition-all duration-300 ease-in-out delay-150">
              <NavItem 
                href="#hackathons" 
                icon={Trophy} 
                label="Hackathons" 
                isActive={activeSection === 'hackathons'} 
                onClick={() => { setActiveSection('hackathons'); toggleMenu(); }} 
                colors={colors} 
              />
            </div>
            <div className="transform transition-all duration-300 ease-in-out delay-200">
              <NavItem 
                href="#skills" 
                icon={Code} 
                label="Skills" 
                isActive={activeSection === 'skills'} 
                onClick={() => { setActiveSection('skills'); toggleMenu(); }} 
                colors={colors} 
              />
            </div>
            <div className="transform transition-all duration-300 ease-in-out delay-250">
              <NavItem 
                href="#research" 
                icon={BookOpen} 
                label="Research" 
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