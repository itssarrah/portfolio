import React from 'react';
import { 
  Brain, Code, Mail, Phone, MapPin, 
  Linkedin, Github, Download,
  GraduationCap, Briefcase, Award, Globe, Database,
} from 'lucide-react';
import SkillCategory from '../components/SkillCategory';
import ProjectCard from '../components/ProjectCard';
import { HackathonCard }  from '../components/HackathonCard';
import ResearchCard from '../components/ResearchCard';
import { skills } from '../data/skills';
import { aiProjects, devProjects, devProjectsFR, aiProjectsFR } from '../data/projects';
import { research } from '../data/research';
import Navbar from '../components/Navbar';
import { translations } from '../translations';
import { hackathons, hackathonsFR } from '../data/hackathons';

const PortfolioContent = ({ 
  activeSection, 
  setActiveSection, 
  colors,
  language,
  setLanguage
}) => {
  const t = translations[language];
  const ai = language === 'fr' ? aiProjectsFR : aiProjects;
  const dev = language === 'fr' ? devProjectsFR : devProjects;

  return (
    <div className="min-h-screen" style={{ background: `linear-gradient(135deg, ${colors.primary}20 0%, white 50%, ${colors.secondary}20 100%)` }}>
      {/* Navigation */}
      <Navbar 
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        colors={colors}
        language={language}
        setLanguage={setLanguage}
      />

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
                {t.hero.title}
              </h2>
              <p className="text-base sm:text-lg mb-6 sm:mb-8 px-4" style={{ color: colors.warm, fontFamily: 'Montserrat, sans-serif' }}>
                {t.hero.school}
              </p>
              
              <div className="flex flex-col sm:flex-row sm:flex-wrap justify-center gap-3 sm:gap-4 mb-8 sm:mb-12 px-4">
                <a
                  href="mailto:sarraarabpro@gmail.com"
                  className="flex items-center justify-center space-x-2 px-6 sm:px-8 py-3 rounded-full text-white transition-all duration-200 hover:shadow-lg transform hover:scale-105 w-full sm:w-auto"
                  style={{ 
                    backgroundColor: colors.warm,
                    fontFamily: 'Montserrat, sans-serif'
                  }}
                >
                  <Mail size={20} />
                  <span>{t.hero.cta.contactMeHero}</span>
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
                  href="/ARAB_SARRA_2_PAGE_CV_FR_EN_MERGED.pdf" 
                  download="ARAB_SARRA_2_PAGE_CV_FR_EN_MERGED.pdf"
                  className="flex items-center justify-center space-x-2 px-6 sm:px-8 py-3 rounded-full text-white transition-all duration-200 hover:shadow-lg transform hover:scale-105 w-full sm:w-auto"
                  style={{ 
                    backgroundColor: colors.accent,
                    fontFamily: 'Montserrat, sans-serif'
                  }}
                >
                  <Download size={20} />
                  <span>{t.hero.cta.downloadCV}</span>
                </a>
              </div>
            </div>

            <div className="max-w-4xl mx-auto px-4">
              <p className="text-base sm:text-lg text-gray-900 leading-relaxed mb-8 sm:mb-12" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                {t.hero.description}
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 px-2">
                <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ backgroundColor: colors.primary + '20' }}>
                    <GraduationCap style={{ color: colors.primary }} size={24} className="sm:w-8 sm:h-8" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2" style={{ fontFamily: 'Gloock, serif' }}>
                    {t.hero.stats.EducationTitle}
                  </h3>
                  <a
                    href="https://www.ensia.edu.dz/program/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-sm sm:text-base text-gray-600 hover:text-blue-500 transition-colors duration-200"
                    style={{ fontFamily: 'Montserrat, sans-serif' }}
                  >
                    {t.hero.stats.EducationDesc}
                  </a>

                  <p className="text-xs sm:text-sm text-gray-500 mt-1" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    {t.hero.stats.EducationDesc2}
                  </p>
                </div>
                
                <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ backgroundColor: colors.accent + '20' }}>
                    <Briefcase style={{ color: colors.accent }} size={24} className="sm:w-8 sm:h-8" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2" style={{ fontFamily: 'Gloock, serif' }}>
                    {t.hero.stats.ExperienceTitle}
                  </h3>
                  <a
                    href="https://asal.dz/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block text-sm sm:text-base text-gray-600 hover:text-blue-500 transition-colors duration-200"
                    style={{ fontFamily: 'Montserrat, sans-serif' }}
                  >
                    {t.hero.stats.ExperienceDesc2}
                  </a>

                  <p className="text-xs sm:text-sm text-gray-500 mt-1" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    {t.hero.stats.ExperienceDesc2}
                  </p>
                </div>
                
                <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ backgroundColor: colors.warm + '20' }}>
                    <Award style={{ color: colors.warm }} size={24} className="sm:w-8 sm:h-8" />
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-800 mb-2" style={{ fontFamily: 'Gloock, serif' }}>
                    {t.hero.stats.achievementTitle}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-600" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    {t.hero.stats.achievementDesc}
                  </p>
                  <p className="text-xs sm:text-sm text-gray-500 mt-1" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    {t.hero.stats.achievementDesc2}
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
              {t.projects.title}
            </h2>
            <p className="text-xl text-gray-600" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              {t.projects.subtitle}
            </p>
          </div>

          {/* Internship Section */}
          <div className="mb-20">
            <h3
              className="text-2xl font-bold text-gray-800 mb-8 flex items-center"
              style={{ fontFamily: 'Gloock, serif' }}
            >
              <div
                className="w-8 h-8 rounded-full mr-3 flex items-center justify-center"
                style={{ backgroundColor: colors.secondary }}
              >
                <Briefcase size={20} className="text-white" />
              </div>
              {language === 'fr' ? "Stages" : "Internships"}
            </h3>

            <div className="relative bg-gray-50 rounded-2xl shadow-lg p-8 hover:shadow-xl transition-all duration-300">
              {/* Photo at top-right */}
              <div className="absolute top-6 right-6">
                <img
                  src="/asal.jpg" 
                  alt="Algerian Space Agency"
                  className="w-16 h-16 rounded-full object-cover border-2 border-white shadow-md"
                />
              </div>

              <div className="flex flex-col md:flex-row justify-between md:items-center mb-6">
                <div>
                  <h4
                    className="text-xl font-semibold text-gray-800"
                    style={{ fontFamily: 'Gloock, serif' }}
                  >
                    {language === 'fr'
                      ? "Agence Spatiale Algérienne | Stage"
                      : "Algerian Space Agency | Internship"}
                  </h4>
                  <p
                    className="text-gray-500"
                    style={{ fontFamily: 'Montserrat, sans-serif' }}
                  >
                    {language === 'fr'
                      ? "Alger — Sept 2024 – Oct 2024"
                      : "Algiers — Sep 2024 – Oct 2024"}
                  </p>
                </div>
              </div>

              <ul
                className="list-disc list-inside text-gray-700 space-y-3"
                style={{ fontFamily: 'Montserrat, sans-serif' }}
              >
                {language === 'fr' ? (
                  <>
                    <li>
                      Application de techniques avancées de <strong>GeoAI</strong> et de{" "}
                      <strong>Télédétection</strong> (Vision Transformers, CNNs, GANs, apprentissage auto-supervisé)
                      pour l'analyse d'images satellites : cartographie forestière, classification des couverts
                      terrestres et surveillance de la santé des cultures.
                    </li>
                    <li>
                      Développement de pipelines de prétraitement robustes intégrant des corrections
                      radiométriques, géométriques et topographiques, améliorant la qualité des images.
                    </li>
                    <li>
                      Amélioration de la généralisation des modèles grâce à des techniques innovantes
                      d'augmentation de données (basées sur <strong>GAN</strong>, <strong>CutMix</strong>, <strong>TTL</strong>).
                    </li>
                    <li>
                      Participation à des hackathons centrés sur des solutions d'IA pour la classification
                      forestière et la cartographie des champs de blé, via le transfert d'apprentissage et
                      l'adaptation de domaine.
                    </li>
                  </>
                ) : (
                  <>
                    <li>
                      Applied advanced <strong>GeoAI</strong> and <strong>Remote Sensing</strong> techniques
                      (Vision Transformers, CNNs, GANs, Self-Supervised Learning) to process and analyze
                      satellite imagery for forest mapping, land cover classification, and crop health monitoring.
                    </li>
                    <li>
                      Developed robust preprocessing pipelines integrating radiometric, geometric, and
                      topographic corrections, improving image quality.
                    </li>
                    <li>
                      Enhanced model generalization with innovative data augmentation techniques
                      (<strong>GAN-based</strong>, <strong>CutMix</strong>, <strong>TTL</strong>).
                    </li>
                    <li>
                      Collaborated in hackathons focusing on AI-driven solutions for forest classification
                      and wheat field mapping using transfer learning and domain adaptation.
                    </li>
                  </>
                )}
              </ul>
            </div>
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
              {ai &&
              ai.map((project, index) => (
                <ProjectCard key={index} project={project} type="AI" colors={colors} language={language} />
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
              {dev &&
              dev.map((project, index) => (
                <ProjectCard key={index} project={project} type="Development" colors={colors} language={language} />
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
              {language === 'fr' ? 'Hackathons & Compétitions' : 'Hackathons & Competitions'}
            </h2>
            <p className="text-xl text-gray-600" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              {language === 'fr'
                ? "Expérience confirmée en compétitions d'IA et de programmation"
                : 'Proven track record in competitive programming and AI challenges'}
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {(language === 'fr' ? hackathonsFR : hackathons).map((hackathon, index) => (
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
            <h2 
              className="text-4xl font-bold text-gray-900 mb-4" 
              style={{ fontFamily: 'Gloock, serif' }}
            >
              {language === 'fr' ? 'Compétences Techniques' : 'Technical Expertise'}
            </h2>
            <p 
              className="text-xl text-gray-600" 
              style={{ fontFamily: 'Montserrat, sans-serif' }}
            >
              {language === 'fr'
                ? 'Compétences approfondies en IA, développement et science des données'
                : 'Comprehensive skills across AI, development, and data science'}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <SkillCategory 
              title={language === 'fr' ? 'Langages de Programmation' : 'Programming Languages'} 
              skills={skills.programming} 
              icon={Code}
              color={colors.primary}
              colors={colors}
            />
            <SkillCategory 
              title={language === 'fr' ? 'IA & Science des Données' : 'AI & Data Science'} 
              skills={skills.ai} 
              icon={Brain}
              color={colors.warm}
              colors={colors}
            />
            <SkillCategory 
              title={language === 'fr' ? 'Frameworks & Librairies' : 'Frameworks & Libraries'} 
              skills={skills.frameworks} 
              icon={Globe}
              color={colors.accent}
              colors={colors}
            />
            <SkillCategory 
              title={language === 'fr' ? 'Outils & Bases de Données' : 'Tools & Databases'} 
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
            <h2 
              className="text-4xl font-bold text-gray-900 mb-6" 
              style={{ fontFamily: 'Gloock, serif' }}
            >
              {language === 'fr' ? 'Contributions à la Recherche' : 'Research Contributions'}
            </h2>
            <div className="max-w-3xl mx-auto">
              <p 
                className="text-lg text-gray-700 leading-relaxed mb-8" 
                style={{ fontFamily: 'Montserrat, sans-serif' }}
              >
                {language === 'fr'
                  ? `En tant que nouvelle chercheuse dans le domaine, je suis passionnée par la contribution à l'avancement de l'intelligence artificielle 
                  et de l'apprentissage automatique. Mes recherches portent sur les applications pratiques de l'IA dans les systèmes énergétiques, 
                  la santé et la vision par ordinateur. Chaque publication représente une étape supplémentaire dans mon parcours pour rapprocher 
                  la recherche théorique des solutions concrètes.`
                  : `As a newcomer to the research field, I'm passionate about contributing to the advancement of artificial intelligence 
                  and machine learning. My research focuses on practical applications of AI in energy systems, healthcare, and computer vision. 
                  Each publication represents a step forward in my journey to bridge the gap between theoretical research and real-world solutions.`}
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {research && research.map((paper, index) => (
              <ResearchCard key={index} paper={paper} colors={colors} language={language} />
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
                  <img src='/Pic.jpg' className="text-white rounded-[100%] w-full h-full object-cover" alt="Sarra Arab" />
                </div>
                <span className="text-xl font-bold" style={{ fontFamily: 'Gloock, serif' }}>
                  Sarra Arab
                </span>
              </div>
              <p className="text-gray-400" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                {language === 'fr'
                  ? "Ingénieure en IA passionnée par le développement de solutions innovantes pour relever les défis du monde réel."
                  : "AI Engineer passionate about developing innovative solutions for real-world challenges."}
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4" style={{ fontFamily: 'Gloock, serif' }}>
                {language === 'fr' ? "Informations de contact" : "Contact Information"}
              </h4>
              <div className="space-y-2 text-gray-400">
                <p className="flex items-center space-x-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  <Mail size={16} />
                  <span>Sarraarabpro@gmail.com</span>
                </p>
                <p className="flex items-center space-x-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  <Phone size={16} />
                  <span>+213 784783701</span>
                </p>
                <p className="flex items-center space-x-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  <MapPin size={16} />
                  <span>Sidi Abdellah, Algiers</span>
                </p>
              </div>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4" style={{ fontFamily: 'Gloock, serif' }}>
                {language === 'fr' ? "Suivez-moi" : "Follow Me"}
              </h4>
              <div className="flex space-x-4">
                <a
                  href="https://www.linkedin.com/in/sarra-arab-b71177245/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-blue-400 transition-colors duration-200"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={24} />
                </a>
                <a
                  href="https://github.com/itssarrah"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-blue-400 transition-colors duration-200"
                  aria-label="GitHub"
                >
                  <Github size={24} />
                </a>
                <a
                  href="https://www.researchgate.net/profile/Sarra-Arab?ev=hdr_xprf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-blue-400 transition-colors duration-200"
                  aria-label="ResearchGate"
                >
                  <img 
                    src="/researchgate.png"
                    alt="ResearchGate"
                    width="24"
                    height="24"
                    className="w-6 h-6"
                  />
                </a>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p style={{ fontFamily: 'Montserrat, sans-serif' }}>
              {language === 'fr'
                ? "© 2025 Sarra Arab. Tous droits réservés."
                : "© 2025 Sarra Arab. All rights reserved."}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PortfolioContent;