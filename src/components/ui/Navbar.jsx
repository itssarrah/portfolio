import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Globe } from 'lucide-react';

const Navbar = ({ activeSection, language, setLanguage, onNavigate, visible = true }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'hero', label: language === 'en' ? 'Home' : 'Accueil' },
    { id: 'about', label: language === 'en' ? 'About' : 'À propos' },
    { id: 'projects', label: language === 'en' ? 'Projects' : 'Projets' },
    { id: 'hackathons', label: language === 'en' ? 'Hackathons' : 'Hackathons' },
    { id: 'skills', label: language === 'en' ? 'Skills' : 'Compétences' },
    { id: 'research', label: language === 'en' ? 'Research' : 'Recherche' },
  ];

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (id) => {
    setIsMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    if (onNavigate) onNavigate(id);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 navbar-slide ${visible ? 'navbar-visible' : ''} ${
          isScrolled
            ? 'bg-white/90 backdrop-blur-lg shadow-sm'
            : 'bg-white/60 backdrop-blur-md'
        }`}
        style={{ borderTop: '3px solid #FFB7C5' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <button
              onClick={() => handleNavClick('hero')}
              className="flex items-center gap-2 font-heading text-xl font-bold text-warm-brown hover:text-sakura-500 transition-colors"
            >
              <img
                src="/sarra1.png"
                alt="Sarra"
                className="w-12 h-12 rounded-full object-cover border-2 border-sakura-300 shadow-sm"
              />
              Sarra
            </button>

            {/* Desktop Nav */}
            <div className="hidden md:flex items-center gap-6">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className="relative font-body text-sm text-warm-brown hover:text-sakura-500 transition-colors py-1"
                >
                  {item.label}
                  {activeSection === item.id && (
                    <motion.div
                      layoutId="activeNav"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-sakura-400 rounded-full"
                    />
                  )}
                </button>
              ))}

              {/* Language toggle */}
              <button
                onClick={() => setLanguage(language === 'en' ? 'fr' : 'en')}
                className="flex items-center gap-1 px-3 py-1 rounded-full bg-sakura-50 text-sakura-600 text-xs font-body font-medium hover:bg-sakura-100 transition-colors"
              >
                <Globe size={12} />
                {language === 'en' ? 'FR' : 'EN'}
              </button>
            </div>

            {/* Mobile hamburger */}
            <button
              className="md:hidden p-2 text-warm-brown"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-white/95 backdrop-blur-xl pt-20"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <div className="flex flex-col items-center gap-6 py-8">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`font-heading text-2xl transition-colors ${
                    activeSection === item.id
                      ? 'text-sakura-500'
                      : 'text-warm-brown'
                  }`}
                >
                  {item.label}
                </button>
              ))}
              <button
                onClick={() => setLanguage(language === 'en' ? 'fr' : 'en')}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-sakura-100 text-sakura-600 font-body"
              >
                <Globe size={16} />
                {language === 'en' ? 'Français' : 'English'}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
