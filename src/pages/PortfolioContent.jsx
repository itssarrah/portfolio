import React, { lazy, Suspense } from 'react';
import Section from '../components/layout/Section';
import Navbar from '../components/ui/Navbar';
import HeroSection from '../components/ui/HeroSection';
import ScrapbookAbout from '../components/ui/ScrapbookAbout';
import SectionDivider from '../components/ui/SectionDivider';
import ScrollAnimationWrapper from '../components/ui/ScrollAnimationWrapper';
import ResearchCard from '../components/ui/ResearchCard';
import Footer from '../components/ui/Footer';
import Twemoji from '../components/ui/Twemoji';
import { hackathons, hackathonsFR } from '../data/hackathons';
import { research } from '../data/research';

const ImmersiveProjects = lazy(() => import('../components/ui/ImmersiveProjects'));
const DraggableArea = lazy(() => import('../components/ui/DraggableArea'));
const SkillsGlobe = lazy(() => import('../components/3d/SkillsGlobe'));

const LoadingFallback = () => (
  <div className="flex items-center justify-center py-20">
    <div className="w-8 h-8 border-2 border-sakura-300 border-t-transparent rounded-full animate-spin" />
  </div>
);

const PortfolioContent = ({
  activeSection,
  setActiveSection,
  language,
  setLanguage,
  mouseX,
  capability,
}) => {
  const currentHackathons = language === 'fr' ? hackathonsFR : hackathons;
  const [heroReady, setHeroReady] = React.useState(false);

  return (
    <div className="min-h-screen bg-blossom-cream">
      <Navbar
        activeSection={activeSection}
        language={language}
        setLanguage={setLanguage}
        visible={heroReady}
      />

      {/* Hero */}
      <HeroSection language={language} onReady={() => setHeroReady(true)} />

      <SectionDivider />

      {/* About */}
      <Section id="about">
        <div className="relative">
          {/* Decorative branch — top left of about section */}
          <div className="hidden md:block absolute -top-8 -left-4 w-32 opacity-30 pointer-events-none decor-sway-branch">
            <img src="/branch-transparent.png" alt="" className="w-full h-auto" draggable={false} />
          </div>
          <ScrollAnimationWrapper>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-warm-brown text-center mb-2">
              {language === 'en' ? 'About Me' : 'À propos'}
            </h2>
            <p className="font-handwriting text-xl text-sakura-400 text-center mb-10">
              {language === 'en' ? 'get to know me ' : 'apprenez à me connaître '}<Twemoji emoji="🌸" size={20} />
            </p>
          </ScrollAnimationWrapper>
          <ScrapbookAbout language={language} />
        </div>
      </Section>

      <SectionDivider />

      {/* Projects */}
      <div id="projects">
        <div className="py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <ScrollAnimationWrapper>
              <h2 className="font-heading text-3xl md:text-4xl font-bold text-warm-brown text-center mb-2">
                {language === 'en' ? 'Projects' : 'Projets'}
                <Twemoji emoji="💖" size={28} className="ml-2" />
              </h2>
            </ScrollAnimationWrapper>
          </div>
        </div>
        <Suspense fallback={<LoadingFallback />}>
          <ImmersiveProjects language={language} />
        </Suspense>
      </div>

      <SectionDivider />

      {/* Hackathons */}
      <Section id="hackathons">
        <ScrollAnimationWrapper>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-warm-brown text-center mb-2">
            {language === 'en' ? 'Hackathons & Events' : 'Hackathons & Événements'}
          </h2>
          <p className="font-handwriting text-lg text-warm-light text-center mb-10">
            {language === 'en'
              ? 'memories & achievements '
              : 'souvenirs & réalisations '}<Twemoji emoji="✨" size={18} />
          </p>
        </ScrollAnimationWrapper>
        <Suspense fallback={<LoadingFallback />}>
          <DraggableArea hackathons={currentHackathons} language={language} />
        </Suspense>
      </Section>

      <SectionDivider />

      {/* Skills */}
      <Section id="skills">
        <div className="relative">
          {/* Decorative Fuji with sun — behind skills */}
          <div className="hidden md:block absolute -bottom-8 left-0 w-44 opacity-20 pointer-events-none decor-sway-tree">
            <img src="/montfuji2.svg" alt="" className="w-full h-auto" draggable={false} />
          </div>
          <ScrollAnimationWrapper>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-sakura-500 text-center mb-10">
              {language === 'en' ? 'Skills' : 'Compétences'}
            </h2>
          </ScrollAnimationWrapper>
          <Suspense fallback={<LoadingFallback />}>
            <SkillsGlobe mouseX={mouseX} capability={capability} />
          </Suspense>
        </div>
      </Section>

      <SectionDivider />

      {/* Research */}
      <Section id="research">
        <div className="relative">
          {/* Decorative tree — right side */}
          <div className="hidden lg:block absolute -right-8 top-0 w-28 opacity-25 pointer-events-none decor-sway-tree">
            <img src="/nice_tree.svg" alt="" className="w-full h-auto" draggable={false} />
          </div>
          <ScrollAnimationWrapper>
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-warm-brown text-center mb-2">
              {language === 'en' ? 'Research & Publications' : 'Recherche & Publications'}
            </h2>
            <p className="font-handwriting text-lg text-warm-light text-center mb-10">
              {language === 'en'
                ? 'my academic contributions'
                : 'mes contributions académiques'}
            </p>
          </ScrollAnimationWrapper>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {research.map((paper, i) => (
              <ScrollAnimationWrapper key={paper.title} delay={i * 0.1}>
                <ResearchCard paper={paper} language={language} />
              </ScrollAnimationWrapper>
            ))}
          </div>
        </div>
      </Section>

      {/* Footer */}
      <Footer language={language} />
    </div>
  );
};

export default PortfolioContent;
