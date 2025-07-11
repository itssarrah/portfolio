import React, { useState, useEffect } from 'react';
import { 
  User, 
  Brain, 
  Code, 
  Trophy, 
  BookOpen, 
  Mail, 
  Phone, 
  MapPin, 
  Linkedin, 
  Github, 
  ExternalLink,
  Camera,
  Calendar,
  Award,
  GraduationCap,
  Briefcase,
  Lightbulb,
  Star,
  ChevronRight,
  Download,
  ChevronLeft,
  Eye,
  Zap,
  Target,
  Database,
  Smartphone,
  Globe
} from 'lucide-react';

const Portfolio = () => {
  const [activeSection, setActiveSection] = useState('hero');
  const [isVisible, setIsVisible] = useState({});
  const [currentPage, setCurrentPage] = useState('portfolio');
  const [hackathonImages, setHackathonImages] = useState({});
  const [currentImageIndex, setCurrentImageIndex] = useState({});

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

  const skills = {
    programming: ['Python', 'JavaScript', 'C++', 'Java', 'Kotlin', 'Swift', 'Dart', 'R', 'PHP'],
    ai: ['Machine Learning', 'Deep Learning', 'Computer Vision', 'NLP', 'Reinforcement Learning', 'Transfer Learning', 'GANs', 'Vision Transformers'],
    frameworks: ['React.js', 'Vue.js', 'Node.js', 'Flutter', 'Flask', 'Laravel'],
    tools: ['Git', 'Docker', 'MySQL', 'Oracle', 'NoSQL']
  };

  const aiProjects = [
    {
      title: "Dhakirate-Al-Djazair",
      description: "Educational platform using LLMs and RAG for interactive multilingual content delivery",
      tech: ["LLMs", "RAG", "React", "NLP"],
      status: "Fall 2025",
      github: "https://github.com/sarra-arab/dhakirate-al-djazair",
      image: "/api/placeholder/400/250"
    },
    {
      title: "Speech Recognition for Darija and Kabyle",
      description: "Fine-tuned OpenAI's Whisper model for transcribing North African languages",
      tech: ["Whisper", "Speech Processing", "Python"],
      status: "Spring 2024",
      github: "https://github.com/sarra-arab/speech-recognition-darija",
      image: "/api/placeholder/400/250"
    },
    {
      title: "AI Startup Proposal Filtering",
      description: "Multilingual system for categorizing and filtering innovative startup proposals",
      tech: ["Embedding Models", "Clustering", "NLP"],
      status: "Winter 2025",
      github: "https://github.com/sarra-arab/ai-startup-filtering",
      image: "/api/placeholder/400/250"
    },
    {
      title: "Power Consumption Prediction",
      description: "Predicted energy consumption across 3 city zones in Tetouane, Morocco",
      tech: ["LSTM", "ANN", "Time Series"],
      status: "Spring 2024",
      github: "https://github.com/sarra-arab/power-consumption-prediction",
      image: "/api/placeholder/400/250"
    },
    {
      title: "Plant Disease Classification",
      description: "Used ResNet with transfer learning to classify plant diseases from leaf images",
      tech: ["ResNet", "Transfer Learning", "Computer Vision"],
      status: "Summer 2024",
      github: "https://github.com/sarra-arab/plant-disease-classification",
      image: "/api/placeholder/400/250"
    }
  ];

  const devProjects = [
    {
      title: "Portfolio Website",
      description: "Modern, responsive portfolio website built with React and Tailwind CSS",
      tech: ["React", "Tailwind CSS", "JavaScript"],
      status: "2025",
      github: "https://github.com/sarra-arab/portfolio",
      image: "/api/placeholder/400/250"
    },
    {
      title: "Task Management App",
      description: "Full-stack task management application with real-time updates",
      tech: ["Node.js", "React", "MongoDB"],
      status: "2024",
      github: "https://github.com/sarra-arab/task-manager",
      image: "/api/placeholder/400/250"
    }
  ];

  const research = [
    {
      title: "Optimizing Smart Grid Energy Efficiency Using Deep Reinforcement Learning",
      description: "Deep Q-Network (DQN)-based framework for energy management in smart grids with BiLSTM forecasting",
      status: "Under Review",
      focus: "Reinforcement Learning"
    },
    {
      title: "Forecasting Energy Production and Demand in the Adrar Region Using LSTM Models",
      description: "LSTM-based models incorporating exogenous variables for energy forecasting",
      status: "Under Review",
      focus: "Time Series Forecasting"
    },
    {
      title: "Mpox Needs Attention: ViT-based Monkeypox Detection Approach",
      description: "Vision Transformers for medical image classification comparing to traditional CNN models",
      status: "Under Review",
      focus: "Computer Vision"
    }
  ];

  const hackathons = [
    {
      title: "AGRI-CHALLENGE",
      location: "Algiers",
      date: "Jun 2024",
      achievement: "2nd Place",
      description: "Built 7 classification models for tree species identification, achieved 79% accuracy with ResNet. Developed a comprehensive solution for agricultural monitoring using computer vision techniques.",
      tech: ["ResNet", "Computer Vision", "Classification"],
      images: ["/api/placeholder/300/200", "/api/placeholder/300/200", "/api/placeholder/300/200"]
    },
    {
      title: "SHESEM",
      location: "Oran",
      date: "Apr 2024",
      achievement: "Best Healthcare Solution",
      description: "Developed ML platform for pregnancy risk detection (89% accuracy) with Flutter mobile app. Created an end-to-end solution for healthcare professionals to assess pregnancy risks.",
      tech: ["SVM", "KNN", "Random Forest", "Flutter"],
      images: ["/api/placeholder/300/200", "/api/placeholder/300/200", "/api/placeholder/300/200"]
    }
  ];

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

  const NavItem = ({ href, icon: Icon, label, isActive, onClick }) => (
    <button
      onClick={onClick}
      className={`flex items-center space-x-2 px-6 py-3 rounded-full transition-all duration-300 ${
        isActive 
          ? 'text-white shadow-lg transform scale-105' 
          : 'text-gray-700 hover:text-white hover:shadow-md'
      }`}
      style={{
        backgroundColor: isActive ? colors.warm : 'transparent',
        '&:hover': { backgroundColor: isActive ? colors.warm : colors.primary }
      }}
    >
      <Icon size={18} />
      <span className="hidden md:block font-medium">{label}</span>
    </button>
  );

  const SkillCategory = ({ title, skills, icon: Icon, color }) => (
    <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 border-l-4" style={{ borderLeftColor: color }}>
      <div className="flex items-center mb-6">
        <div className="p-3 rounded-full mr-4" style={{ backgroundColor: color + '20' }}>
          <Icon size={24} style={{ color: color }} />
        </div>
        <h4 className="text-xl font-bold text-gray-800" style={{ fontFamily: 'Gloock, serif' }}>{title}</h4>
      </div>
      <div className="flex flex-wrap gap-3">
        {skills.map((skill, index) => (
          <span
            key={index}
            className="px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 hover:shadow-md transform hover:scale-105"
            style={{ 
              backgroundColor: colors.secondary,
              color: colors.warm,
              fontFamily: 'Montserrat, sans-serif'
            }}
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );

  const ProjectCard = ({ project, type }) => (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
      <div className="relative">
        <img 
          src={project.image} 
          alt={project.title}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-4 right-4">
          <span 
            className="px-3 py-1 rounded-full text-sm font-medium text-white"
            style={{ backgroundColor: type === 'AI' ? colors.primary : colors.accent }}
          >
            {type}
          </span>
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-3" style={{ fontFamily: 'Gloock, serif' }}>
          {project.title}
        </h3>
        <p className="text-gray-600 mb-4 leading-relaxed" style={{ fontFamily: 'Montserrat, sans-serif' }}>
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tech.map((tech, index) => (
            <span
              key={index}
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
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-500" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            {project.status}
          </span>
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-200 hover:shadow-md"
            style={{ 
              backgroundColor: colors.warm,
              color: 'white',
              fontFamily: 'Montserrat, sans-serif'
            }}
          >
            <Github size={16} />
            <span>View Code</span>
          </a>
        </div>
      </div>
    </div>
  );

  const HackathonCard = ({ hackathon, index }) => (
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

  const ResearchCard = ({ paper }) => (
    <div className="relative bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all duration-300">
      <div className="absolute -top-4 -left-4 w-16 h-16 transform rotate-45" style={{ backgroundColor: colors.primary }}></div>
      <div className="absolute -top-2 -left-2 w-8 h-8 transform rotate-45 bg-white"></div>
      <div className="relative">
        <div className="flex items-start justify-between mb-4">
          <span 
            className="inline-block px-4 py-2 rounded-full text-sm font-medium text-white"
            style={{ backgroundColor: colors.accent }}
          >
            {paper.focus}
          </span>
          <span className="text-sm font-medium" style={{ color: colors.warm }}>
            {paper.status}
          </span>
        </div>
        <h3 className="text-lg font-bold text-gray-800 mb-3" style={{ fontFamily: 'Gloock, serif' }}>
          {paper.title}
        </h3>
        <p className="text-gray-600 leading-relaxed" style={{ fontFamily: 'Montserrat, sans-serif' }}>
          {paper.description}
        </p>
      </div>
    </div>
  );

  const PortfolioContent = () => (
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
                href="#hero" 
                icon={User} 
                label="About" 
                isActive={activeSection === 'hero'} 
                onClick={() => setActiveSection('hero')}
              />
              <NavItem 
                href="#projects" 
                icon={Lightbulb} 
                label="Projects" 
                isActive={activeSection === 'projects'}
                onClick={() => setActiveSection('projects')}
              />
              <NavItem 
                href="#hackathons" 
                icon={Trophy} 
                label="Hackathons" 
                isActive={activeSection === 'hackathons'}
                onClick={() => setActiveSection('hackathons')}
              />
              <NavItem 
                href="#skills" 
                icon={Code} 
                label="Skills" 
                isActive={activeSection === 'skills'}
                onClick={() => setActiveSection('skills')}
              />
              <NavItem 
                href="#research" 
                icon={BookOpen} 
                label="Research" 
                isActive={activeSection === 'research'}
                onClick={() => setActiveSection('research')}
              />
              <NavItem 
                href="#" 
                icon={Camera} 
                label="Gallery" 
                isActive={currentPage === 'gallery'}
                onClick={() => setCurrentPage('gallery')}
              />
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero" className="pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="mb-12">
              {/* Geometric shape with picture */}
              <div className="relative w-40 h-40 mx-auto mb-8">
                <div 
                  className="absolute inset-0 transform rotate-45 rounded-3xl"
                  style={{ backgroundColor: colors.primary }}
                ></div>
                <div 
                  className="absolute inset-2 transform rotate-45 rounded-3xl"
                  style={{ backgroundColor: colors.accent }}
                ></div>
                <div className="absolute inset-4 rounded-full overflow-hidden">
                  <img 
                    src="/api/placeholder/128/128" 
                    alt="Sarra Arab"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              
              <h1 className="text-6xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'Gloock, serif' }}>
                Sarra Arab
              </h1>
              <h2 className="text-2xl text-gray-700 mb-2" style={{ fontFamily: 'Gloock, serif' }}>
                AI Engineer & Master's Student
              </h2>
              <p className="text-lg mb-8" style={{ color: colors.warm, fontFamily: 'Montserrat, sans-serif' }}>
                National Higher School of Artificial Intelligence, Algiers
              </p>
              
              <div className="flex flex-wrap justify-center gap-4 mb-12">
                <a
                  href="mailto:Sarra.arab@ensia.edu.dz"
                  className="flex items-center space-x-2 px-8 py-3 rounded-full text-white transition-all duration-200 hover:shadow-lg transform hover:scale-105"
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
                  className="flex items-center space-x-2 px-8 py-3 rounded-full border-2 transition-all duration-200 hover:shadow-lg transform hover:scale-105"
                  style={{ 
                    borderColor: colors.primary,
                    color: colors.primary,
                    fontFamily: 'Montserrat, sans-serif'
                  }}
                >
                  <Linkedin size={20} />
                  <span>LinkedIn</span>
                </a>
                <button className="flex items-center space-x-2 px-8 py-3 rounded-full text-white transition-all duration-200 hover:shadow-lg transform hover:scale-105"
                  style={{ 
                    backgroundColor: colors.accent,
                    fontFamily: 'Montserrat, sans-serif'
                  }}
                >
                  <Download size={20} />
                  <span>Download CV</span>
                </button>
              </div>
            </div>

            <div className="max-w-4xl mx-auto">
              <p className="text-lg text-gray-700 leading-relaxed mb-12" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                Fourth-year Artificial Intelligence student specializing in Machine Learning, Deep Learning, Computer Vision, and Natural Language Processing. 
                Experienced in developing and deploying AI systems for image classification, object detection, satellite imagery analysis, and speech recognition. 
                Skilled in advanced techniques including Vision Transformers, CNNs, GANs, and RAG systems.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ backgroundColor: colors.primary + '20' }}>
                    <GraduationCap style={{ color: colors.primary }} size={32} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2" style={{ fontFamily: 'Gloock, serif' }}>
                    Education
                  </h3>
                  <p className="text-gray-600" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    Master's in Data Science & AI
                  </p>
                  <p className="text-sm text-gray-500 mt-1" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    Sep 2021 - Jun 2026
                  </p>
                </div>
                
                <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ backgroundColor: colors.accent + '20' }}>
                    <Briefcase style={{ color: colors.accent }} size={32} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2" style={{ fontFamily: 'Gloock, serif' }}>
                    Experience
                  </h3>
                  <p className="text-gray-600" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    Algerian Space Agency
                  </p>
                  <p className="text-sm text-gray-500 mt-1" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    GeoAI & Remote Sensing
                  </p>
                </div>
                
                <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ backgroundColor: colors.warm + '20' }}>
                    <Award style={{ color: colors.warm }} size={32} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2" style={{ fontFamily: 'Gloock, serif' }}>
                    Achievements
                  </h3>
                  <p className="text-gray-600" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    2nd Place AGRI-CHALLENGE
                  </p>
                  <p className="text-sm text-gray-500 mt-1" style={{ fontFamily: 'Montserrat, sans-serif' }}>
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
              {aiProjects.map((project, index) => (
                <ProjectCard key={index} project={project} type="AI" />
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
              {devProjects.map((project, index) => (
                <ProjectCard key={index} project={project} type="Development" />
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
            {hackathons.map((hackathon, index) => (
              <HackathonCard key={index} hackathon={hackathon} index={index} />
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
            />
            <SkillCategory 
              title="AI & Data Science" 
              skills={skills.ai} 
              icon={Brain}
              color={colors.warm}
            />
            <SkillCategory 
              title="Frameworks & Libraries" 
              skills={skills.frameworks} 
              icon={Globe}
              color={colors.accent}
            />
            <SkillCategory 
              title="Tools & Databases" 
              skills={skills.tools} 
              icon={Database}
              color={colors.secondary}
            />
          </div>
        </div>
      </section>

      {/* Research Section */}
      <section id="research" className="py-20" style={{ backgroundColor: colors.primary + '10' }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-6" style={{ fontFamily: 'Gloock, serif' }}>
              Research Publications
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
            {research.map((paper, index) => (
              <ResearchCard key={index} paper={paper} />
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
                  href="#"
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

  const GalleryContent = () => (
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
              />
              <NavItem 
                href="#" 
                icon={Camera} 
                label="Gallery" 
                isActive={currentPage === 'gallery'}
                onClick={() => setCurrentPage('gallery')}
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

  return (
    <div>
      <link href="https://fonts.googleapis.com/css2?family=Gloock:wght@400&family=Montserrat:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      {currentPage === 'portfolio' ? <PortfolioContent /> : <GalleryContent />}
    </div>
  );
};

export default Portfolio;