import React from 'react';
import ScrollAnimationWrapper from './ScrollAnimationWrapper';
import { MapPin, GraduationCap, Briefcase } from 'lucide-react';
import Twemoji from './Twemoji';

const Sticker = ({ children, className = '', style = {} }) => (
  <div
    className={`absolute select-none pointer-events-none float-animation ${className}`}
    style={style}
  >
    {children}
  </div>
);

const ScrapbookAbout = ({ language }) => {
  const t = {
    hi: language === 'en' ? 'hi!' : 'salut!',
    bio: language === 'en'
      ? "I'm an AI Engineer and Master's student at ENSIA (National Higher School of Artificial Intelligence) in Algiers. Passionate about building intelligent systems that make a real impact — from computer vision and NLP to reinforcement learning and energy forecasting."
      : "Je suis ingénieure IA et étudiante en Master à l'ENSIA (École Nationale Supérieure d'Intelligence Artificielle) à Alger. Passionnée par la conception de systèmes intelligents ayant un vrai impact — de la vision par ordinateur et le NLP à l'apprentissage par renforcement et la prévision énergétique.",
    hobbies: language === 'en'
      ? "When I'm not coding, you'll find me at hackathons, playing volleyball, or exploring new research ideas :)"
      : "Quand je ne code pas, vous me trouverez aux hackathons, en train de jouer au volleyball, ou d'explorer de nouvelles idées de recherche :)",
    education: language === 'en' ? 'Education' : 'Formation',
    experience: language === 'en' ? 'Experience' : 'Expérience',
  };

  return (
    <ScrollAnimationWrapper>
      <div className="relative max-w-6xl mx-auto">
        {/* Decorative cherry tree — left of notebook */}
        <div className="hidden lg:block absolute -left-28 bottom-0 w-44 opacity-35 pointer-events-none decor-sway-tree">
          <img src="/nice_tree.svg" alt="" className="w-full h-auto" draggable={false} />
        </div>
        {/* Decorative cherry tree — right of notebook */}
        <div className="hidden lg:block absolute -right-28 bottom-0 w-44 opacity-35 pointer-events-none decor-sway-tree-alt" style={{ transform: 'scaleX(-1)' }}>
          <img src="/nice_tree.svg" alt="" className="w-full h-auto" draggable={false} />
        </div>

        {/* Notebook container */}
        <div className="notebook relative flex flex-col md:flex-row rounded-lg overflow-visible p-4 md:p-0 min-h-[480px] md:min-h-[580px]">
          {/* Spiral binding */}
          <div className="hidden md:flex spiral-binding">
            {Array.from({ length: 18 }).map((_, i) => (
              <div key={i} className="spiral-ring" />
            ))}
          </div>

          {/* Left page - Photo */}
          <div className="notebook-page flex-1 flex items-center justify-center p-10 md:p-16 relative">
            <div className="polaroid relative">
              <div className="washi-tape" style={{ top: '-10px', left: '20px' }} />
              <img
                src="/sarra1-opt.jpg"
                alt="Sarra Arab"
                className="w-64 h-80 md:w-80 md:h-[26rem] object-cover"
              />
            </div>
          </div>

          {/* Right page - Bio */}
          <div className="notebook-page flex-1 p-10 md:p-16 relative">
            <div className="washi-tape-2" style={{ top: '-8px', right: '30px' }} />
            <h3 className="font-handwriting text-5xl md:text-6xl text-sakura-500 mb-5">{t.hi}</h3>
            <p className="font-handwriting text-xl md:text-2xl text-warm-brown leading-relaxed mb-5">
              {t.bio}
            </p>
            <p className="font-handwriting text-lg md:text-xl text-warm-light leading-relaxed">
              {t.hobbies}
            </p>
          </div>

          {/* Stickers scattered around */}
          <Sticker style={{ top: '-20px', left: '-10px', animationDelay: '0s', '--rotate': '-10deg' }}>
            <Twemoji emoji="🌸" size={36} />
          </Sticker>
          <Sticker style={{ top: '20px', right: '-15px', animationDelay: '1s', '--rotate': '5deg' }}>
            <Twemoji emoji="🦋" size={32} />
          </Sticker>
          <Sticker style={{ bottom: '-15px', left: '15%', animationDelay: '2s', '--rotate': '-5deg' }}>
            <Twemoji emoji="🎐" size={28} />
          </Sticker>
          <Sticker style={{ bottom: '10px', right: '10%', animationDelay: '0.5s', '--rotate': '8deg' }}>
            <Twemoji emoji="🍡" size={30} />
          </Sticker>
          <Sticker style={{ top: '40%', left: '-25px', animationDelay: '1.5s', '--rotate': '-15deg' }}>
            <Twemoji emoji="⭐" size={26} />
          </Sticker>
          <Sticker style={{ top: '10px', left: '40%', animationDelay: '3s', '--rotate': '12deg' }}>
            <Twemoji emoji="🎋" size={24} />
          </Sticker>
        </div>

        {/* Info cards below notebook */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
          <ScrollAnimationWrapper delay={0.2}>
            <div className="glass-card p-8">
              <div className="flex items-center gap-3 mb-5">
                <GraduationCap size={24} className="text-sakura-500" />
                <h4 className="font-heading text-xl font-semibold text-warm-brown">{t.education}</h4>
              </div>
              <div className="flex items-start gap-4">
                <img src="/ensia.png" alt="ENSIA" className="w-14 h-14 rounded-xl object-contain bg-white border border-sakura-100 p-1 flex-shrink-0" />
                <div>
                  <p className="font-body text-base text-warm-brown font-medium">
                    Master's in Data Science & AI
                  </p>
                  <p className="font-body text-sm text-warm-light mt-0.5">
                    ENSIA — National Higher School of AI, Algiers
                  </p>
                  <p className="font-body text-sm text-warm-light mt-1">Sep 2021 — Jun 2026</p>
                </div>
              </div>
            </div>
          </ScrollAnimationWrapper>

          <ScrollAnimationWrapper delay={0.4}>
            <div className="glass-card p-8">
              <div className="flex items-center gap-3 mb-5">
                <Briefcase size={24} className="text-sakura-500" />
                <h4 className="font-heading text-xl font-semibold text-warm-brown">{t.experience}</h4>
              </div>

              <div className="flex items-start gap-4 mb-5">
                <img src="/udst.png" alt="UDST" className="w-14 h-14 rounded-xl object-contain bg-white border border-sakura-100 p-1 flex-shrink-0" />
                <div>
                  <p className="font-body text-base text-warm-brown font-medium">
                    {language === 'en' ? 'University of Doha for Science & Technology' : 'Université de Doha pour la Science et la Technologie'}
                  </p>
                  <p className="font-body text-sm text-sakura-500 font-medium mt-0.5">
                    {language === 'en' ? 'Research Intern — Sensei AI' : 'Stagiaire de Recherche — Sensei AI'}
                  </p>
                  <div className="flex items-center gap-1.5 mt-1">
                    <MapPin size={12} className="text-sakura-400" />
                    <p className="font-body text-sm text-warm-light">Doha, Qatar — Feb–Jun 2026</p>
                  </div>
                </div>
              </div>

              <div className="border-t border-sakura-100 pt-5">
                <div className="flex items-start gap-4">
                  <img src="/asal.jpg" alt="ASAL" className="w-14 h-14 rounded-xl object-contain bg-white border border-sakura-100 p-1 flex-shrink-0" />
                  <div>
                    <p className="font-body text-base text-warm-brown font-medium">
                      {language === 'en' ? 'Algerian Space Agency (ASAL)' : 'Agence Spatiale Algérienne (ASAL)'}
                    </p>
                    <p className="font-body text-sm text-sakura-500 font-medium mt-0.5">
                      GeoAI & Remote Sensing
                    </p>
                    <div className="flex items-center gap-1.5 mt-1">
                      <MapPin size={12} className="text-sakura-400" />
                      <p className="font-body text-sm text-warm-light">Algiers — Sep–Oct 2024</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ScrollAnimationWrapper>
        </div>
      </div>
    </ScrollAnimationWrapper>
  );
};

export default ScrapbookAbout;
