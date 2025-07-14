import React from 'react';
import { 
  User, Brain, Code, Trophy, BookOpen, Mail, Phone, MapPin, 
  Linkedin, Github, ChevronRight, ChevronLeft, Download,
  GraduationCap, Briefcase, Award, Lightbulb, Globe, Database,Camera,
} from 'lucide-react';
import NavItem from '../components/NavItem';
import SkillCategory from '../components/SkillCategory';
import ProjectCard from '../components/ProjectCard';
import { HackathonCard }  from '../components/HackathonCard';
import ResearchCard from '../components/ResearchCard';
import { skills } from '../data/skills';
import { aiProjects, devProjects } from '../data/projects';
import { research } from '../data/research';
import Navbar from '../components/Navbar';

import { hackathons } from '../data/hackathons';
const PortfolioContent = ({ 
  activeSection, 
  setActiveSection, 
  currentPage, 
  setCurrentPage, 
  colors,
  currentImageIndex,
  nextImage,
  prevImage,
  setCurrentImageIndex
}) => {
    const handleSectionChange = (section) => {
    setActiveSection(section);
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };
  return (
    <div className="min-h-screen" style={{ background: `linear-gradient(135deg, ${colors.primary}20 0%, white 50%, ${colors.secondary}20 100%)` }}>
      {/* Navigation */}
      <Navbar 
      activeSection={activeSection}
      setActiveSection = {setActiveSection}
      colors ={colors}
      />
      {/* <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: colors.primary }}>
                <img 
                    src="Pic.jpg" 
                    alt="Sarra Arab"
                    className="object-cover rounded-full"
                  />
              </div>
              <span className="text-xl font-bold text-gray-800" style={{ fontFamily: 'Gloock, serif' }}>
                Sarra Arab
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <NavItem 
                href="#hero" 
                icon={User} 
                label="About" 
                isActive={activeSection === 'hero'} 
                onClick={() => setActiveSection('hero')}
                colors={colors}
              />
              <NavItem 
                href="#projects" 
                icon={Lightbulb} 
                label="Projects" 
                isActive={activeSection === 'projects'}
                onClick={() => setActiveSection('projects')}
                colors={colors}
              />
              <NavItem 
                href="#hackathons" 
                icon={Trophy} 
                label="Hackathons" 
                isActive={activeSection === 'hackathons'}
                onClick={() => setActiveSection('hackathons')}
                colors={colors}
              />
              <NavItem 
                href="#skills" 
                icon={Code} 
                label="Skills" 
                isActive={activeSection === 'skills'}
                onClick={() => setActiveSection('skills')}
                colors={colors}
              />
              <NavItem 
                href="#research" 
                icon={BookOpen} 
                label="Research" 
                isActive={activeSection === 'research'}
                onClick={() => setActiveSection('research')}
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
      </nav> */}

   {/* Hero Section */}
<section id="hero" className="pt-[10rem] xl:pt-32 pb-12 sm:pb-20">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
    <div className="text-center">
      <div className="mb-8 sm:mb-12">
        {/* Geometric shape with larger picture - Animated */}
        <div className="relative w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 mx-auto mb-8 sm:mb-16 group animate-float">
          {/* Outer rotated background layer */}
          <div 
            className="absolute inset-0 transform rotate-45 rounded-2xl sm:rounded-3xl md:rounded-[3rem] shadow-lg sm:shadow-2xl transition-all duration-500 group-hover:rotate-[50deg] group-hover:scale-105"
            style={{ background: `linear-gradient(135deg, ${colors.primary}, ${colors.accent})` }}
          ></div>

          {/* Mid translucent glow layer */}
          <div 
            className="absolute inset-2 sm:inset-4 transform rotate-45 rounded-2xl sm:rounded-3xl md:rounded-[3rem] bg-white shadow-inner opacity-40"
          ></div>

          {/* Profile picture layer */}
          <div className="absolute inset-4 sm:inset-6 md:inset-8 rounded-full overflow-hidden border-2 sm:border-4 border-white shadow-lg sm:shadow-xl transition-transform duration-500 group-hover:scale-110">
            <img 
              src="Pic.jpg" 
              alt="Sarra Arab"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        <style>
          {`
            @keyframes float {
              0%, 100% { transform: translateY(0px); }
              50% { transform: translateY(-10px); }
            }

            .animate-float {
              animation: float 4s ease-in-out infinite;
            }
          `}
        </style>

        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-3 sm:mb-4 px-2" style={{ fontFamily: 'Gloock, serif' }}>
          Sarra Arab
        </h1>
        <h2 className="text-lg sm:text-xl md:text-2xl text-gray-800 mb-2 px-2" style={{ fontFamily: 'Gloock, serif' }}>
          AI Engineer & Master's Student
        </h2>
        <p className="text-base sm:text-lg mb-6 sm:mb-8 px-4" style={{ color: colors.warm, fontFamily: 'Montserrat, sans-serif' }}>
          National Higher School of Artificial Intelligence, Algiers
        </p>
        
        <div className="flex flex-col sm:flex-row sm:flex-wrap justify-center gap-3 sm:gap-4 mb-8 sm:mb-12 px-4">
          <a
            href="mailto:Sarra.arab@ensia.edu.dz"
            className="flex items-center justify-center space-x-2 px-6 sm:px-8 py-3 rounded-full text-white transition-all duration-200 hover:shadow-lg transform hover:scale-105 w-full sm:w-auto"
            style={{ 
              backgroundColor: colors.warm,
              fontFamily: 'Montserrat, sans-serif'
            }}
          >
            <Mail size={20} />
            <span>Contact Me</span>
          </a>
          <a
            href="https://www.linkedin.com/in/sarra-arab-b71177245/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center space-x-2 px-6 sm:px-8 py-3 rounded-full border-2 transition-all duration-200 hover:shadow-lg transform hover:scale-105 w-full sm:w-auto"
            style={{ 
              borderColor: colors.primary,
              color: colors.primary,
              fontFamily: 'Montserrat, sans-serif'
            }}
          >
            <Linkedin size={20} />
            <span>LinkedIn</span>
          </a>
          <a 
            href="/cv.pdf" 
            download="SarraArab_CV.pdf"
            className="flex items-center justify-center space-x-2 px-6 sm:px-8 py-3 rounded-full text-white transition-all duration-200 hover:shadow-lg transform hover:scale-105 w-full sm:w-auto"
            style={{ 
              backgroundColor: colors.accent,
              fontFamily: 'Montserrat, sans-serif'
            }}
          >
            <Download size={20} />
            <span>Download CV</span>
          </a>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4">
        <p className="text-base sm:text-lg text-gray-900 leading-relaxed mb-8 sm:mb-12" style={{ fontFamily: 'Montserrat, sans-serif' }}>
          I'm a final-year Artificial Intelligence student with a strong focus on computer vision. I enjoy building systems that can understand and interpret visual data, and I'm especially interested in applying AI to solve meaningful, real-world challenges. While computer vision is my main area, I've also explored other domains like natural language processing and speech, which have shaped the way I approach problems with a wider perspective.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 px-2">
          <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 hover:shadow-xl transition-all duration-300 transform hover:scale-105">
            <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ backgroundColor: colors.primary + '20' }}>
              <GraduationCap style={{ color: colors.primary }} size={24} className="sm:w-8 sm:h-8" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2" style={{ fontFamily: 'Gloock, serif' }}>
              Education
            </h3>
            <p className="text-sm sm:text-base text-gray-600" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              Master's in Data Science & AI
            </p>
            <p className="text-xs sm:text-sm text-gray-500 mt-1" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              Sep 2021 - Jun 2026
            </p>
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 hover:shadow-xl transition-all duration-300 transform hover:scale-105">
            <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ backgroundColor: colors.accent + '20' }}>
              <Briefcase style={{ color: colors.accent }} size={24} className="sm:w-8 sm:h-8" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2" style={{ fontFamily: 'Gloock, serif' }}>
              Experience
            </h3>
            <p className="text-sm sm:text-base text-gray-600" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              Algerian Space Agency
            </p>
            <p className="text-xs sm:text-sm text-gray-500 mt-1" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              GeoAI & Remote Sensing
            </p>
          </div>
          
          <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 hover:shadow-xl transition-all duration-300 transform hover:scale-105">
            <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ backgroundColor: colors.warm + '20' }}>
              <Award style={{ color: colors.warm }} size={24} className="sm:w-8 sm:h-8" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2" style={{ fontFamily: 'Gloock, serif' }}>
              Achievements
            </h3>
            <p className="text-sm sm:text-base text-gray-600" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              Course Certificates & Hackathons
            </p>
            <p className="text-xs sm:text-sm text-gray-500 mt-1" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              Multiple Hackathon Awards
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
      {/* Projects Section */}
      <section id="projects" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'Gloock, serif' }}>
              Featured Projects
            </h2>
            <p className="text-xl text-gray-600" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              Innovative AI solutions and software development projects
            </p>
          </div>
          
          {/* AI Projects */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-gray-800 mb-8 flex items-center" style={{ fontFamily: 'Gloock, serif' }}>
              <div className="w-8 h-8 rounded-full mr-3 flex items-center justify-center" style={{ backgroundColor: colors.primary }}>
                <Brain size={20} className="text-white" />
              </div>
              Artificial Intelligence Projects
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {aiProjects && aiProjects.map((project, index) => (
                <ProjectCard key={index} project={project} type="AI" colors={colors} />
              ))}
            </div>
          </div>

          {/* Development Projects */}
          <div>
            <h3 className="text-2xl font-bold text-gray-800 mb-8 flex items-center" style={{ fontFamily: 'Gloock, serif' }}>
              <div className="w-8 h-8 rounded-full mr-3 flex items-center justify-center" style={{ backgroundColor: colors.accent }}>
                <Code size={20} className="text-white" />
              </div>
              Software Development Projects
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {devProjects && devProjects.map((project, index) => (
                <ProjectCard key={index} project={project} type="Development" colors={colors} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Hackathons Section */}
<section id="hackathons" className="py-20" style={{ backgroundColor: colors.secondary + '10' }}>
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="text-center mb-16">
      <h2 className="text-4xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'Gloock, serif' }}>
        Hackathons & Competitions
      </h2>
      <p className="text-xl text-gray-600" style={{ fontFamily: 'Montserrat, sans-serif' }}>
        Proven track record in competitive programming and AI challenges
      </p>
    </div>
    
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {hackathons && hackathons.map((hackathon, index) => (
        <HackathonCard 
          key={index} 
          hackathon={hackathon} 
          index={index} 
          colors={colors}
        />
      ))}
    </div>
  </div>
</section>

      {/* Technical Expertise Section */}
      <section id="skills" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'Gloock, serif' }}>
              Technical Expertise
            </h2>
            <p className="text-xl text-gray-600" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              Comprehensive skills across AI, development, and data science
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <SkillCategory 
              title="Programming Languages" 
              skills={skills.programming} 
              icon={Code}
              color={colors.primary}
              colors={colors}
            />
            <SkillCategory 
              title="AI & Data Science" 
              skills={skills.ai} 
              icon={Brain}
              color={colors.warm}
              colors={colors}
            />
            <SkillCategory 
              title="Frameworks & Libraries" 
              skills={skills.frameworks} 
              icon={Globe}
              color={colors.accent}
              colors={colors}
            />
            <SkillCategory 
              title="Tools & Databases" 
              skills={skills.tools} 
              icon={Database}
              color={colors.secondary}
              colors={colors}
            />
          </div>
        </div>
      </section>

      {/* Research Section */}
      <section id="research" className="py-20" style={{ backgroundColor: colors.primary + '10' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6" style={{ fontFamily: 'Gloock, serif' }}>
              Research Contributions
            </h2>
            <div className="max-w-3xl mx-auto">
              <p className="text-lg text-gray-700 leading-relaxed mb-8" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                As a newcomer to the research field, I'm passionate about contributing to the advancement of artificial intelligence 
                and machine learning. My research focuses on practical applications of AI in energy systems, healthcare, and computer vision. 
                Each publication represents a step forward in my journey to bridge the gap between theoretical research and real-world solutions.
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {research && research.map((paper, index) => (
              <ResearchCard key={index} paper={paper} colors={colors} />
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ backgroundColor: colors.primary }}>
                  <Brain className="text-white" size={16} />
                </div>
                <span className="text-xl font-bold" style={{ fontFamily: 'Gloock, serif' }}>
                  Sarra Arab
                </span>
              </div>
              <p className="text-gray-400" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                AI Engineer passionate about developing innovative solutions for real-world challenges.
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4" style={{ fontFamily: 'Gloock, serif' }}>
                Contact Information
              </h4>
              <div className="space-y-2 text-gray-400">
                <p className="flex items-center space-x-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  <Mail size={16} />
                  <span>Sarra.arab@ensia.edu.dz</span>
                </p>
                <p className="flex items-center space-x-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  <Phone size={16} />
                  <span>+213 540221667</span>
                </p>
                <p className="flex items-center space-x-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  <MapPin size={16} />
                  <span>Sidi Abdellah, Algiers</span>
                </p>
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4" style={{ fontFamily: 'Gloock, serif' }}>
                Follow Me
              </h4>
              <div className="flex space-x-4">
                <a
                  href="https://www.linkedin.com/in/sarra-arab-b71177245/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-blue-400 transition-colors duration-200"
                >
                  <Linkedin size={24} />
                </a>
                <a
                  href="https://github.com/itssarrah"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-blue-400 transition-colors duration-200"
                >
                  <Github size={24} />
                </a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p style={{ fontFamily: 'Montserrat, sans-serif' }}>
              &copy; 2025 Sarra Arab. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PortfolioContent;