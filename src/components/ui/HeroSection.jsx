import React, { useState, useEffect, useRef, useCallback, Suspense, lazy } from 'react';
import { ChevronDown } from 'lucide-react';

const CherryBlossomScene = lazy(() => import('../3d/CherryBlossomScene'));

function TypewriterText({ text, speed = 60, scrambleDuration = 400, startDelay = 500, onComplete, Tag = 'span', className = '' }) {
  const ref = useRef(null);
  const cursorRef = useRef(null);

  useEffect(() => {
    const el = ref.current;
    const cursor = cursorRef.current;
    if (!el) return;

    let currentIndex = 0;
    let active = true;
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';

    const typeNext = () => {
      if (!active) return;
      if (currentIndex >= text.length) {
        el.textContent = text;
        if (cursor) cursor.style.display = 'none';
        if (onComplete) onComplete();
        return;
      }

      const targetChar = text[currentIndex];
      let scrambleCount = 0;
      const scrambleMax = Math.floor(scrambleDuration / 40);

      const scrambleInterval = setInterval(() => {
        if (!active) { clearInterval(scrambleInterval); return; }
        scrambleCount++;
        if (scrambleCount >= scrambleMax) {
          clearInterval(scrambleInterval);
          el.textContent = text.slice(0, currentIndex + 1);
          currentIndex++;
          setTimeout(typeNext, speed);
        } else {
          const randomChar = targetChar === ' ' ? ' ' : chars[Math.floor(Math.random() * chars.length)];
          el.textContent = text.slice(0, currentIndex) + randomChar;
        }
      }, 40);
    };

    const startTimeout = setTimeout(typeNext, startDelay);
    return () => { active = false; clearTimeout(startTimeout); };
  }, [text, speed, scrambleDuration, startDelay, onComplete]);

  return (
    <Tag className={className}>
      <span ref={ref} />
      <span ref={cursorRef} className="typewriter-cursor" />
    </Tag>
  );
}

const HeroSection = ({ language, onReady }) => {
  const [sceneLoaded, setSceneLoaded] = useState(false);
  const [nameComplete, setNameComplete] = useState(false);
  const [roleComplete, setRoleComplete] = useState(false);
  const overlayRef = useRef(null);

  const onNameDone = useCallback(() => setNameComplete(true), []);
  const onRoleDone = useCallback(() => setRoleComplete(true), []);

  useEffect(() => {
    if (nameComplete && onReady) onReady();
  }, [nameComplete, onReady]);

  useEffect(() => {
    if (!sceneLoaded || !overlayRef.current) return;
    const el = overlayRef.current;
    requestAnimationFrame(() => {
      el.style.backdropFilter = 'blur(16px)';
      el.style.webkitBackdropFilter = 'blur(16px)';
    });
  }, [sceneLoaded]);

  const handleSceneLoaded = () => setSceneLoaded(true);

  const scrollToAbout = () => {
    const el = document.getElementById('about');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const roleText = language === 'en' ? 'AI Engineer & Researcher' : 'Ingénieure IA & Chercheuse';

  return (
    <section id="hero" className="relative h-screen w-full overflow-hidden">
      <Suspense
        fallback={
          <div className="absolute inset-0 bg-gradient-to-b from-sakura-100 via-sakura-50 to-blossom-cream" />
        }
      >
        <CherryBlossomScene onLoaded={handleSceneLoaded} />
      </Suspense>

      {sceneLoaded && (
        <div className="absolute inset-0 flex flex-col items-center justify-center z-10 px-4 hero-overlay-wrap" style={{ willChange: 'transform, opacity' }}>
          <div
            ref={overlayRef}
            className="text-center px-8 py-10 rounded-3xl hero-overlay-enter"
            style={{
              background: 'rgba(255, 248, 240, 0.55)',
              backdropFilter: 'none',
              WebkitBackdropFilter: 'none',
              border: '1px solid rgba(255, 183, 197, 0.25)',
              transition: 'backdrop-filter 0.6s ease 0.8s, -webkit-backdrop-filter 0.6s ease 0.8s',
            }}
          >
            <img
              src="/sarra.png"
              alt="Sarra Arab"
              className="w-40 h-40 md:w-52 md:h-52 rounded-full object-cover border-4 border-sakura-300 shadow-lg mx-auto mb-4 hero-photo-enter"
            />

            <TypewriterText
              text="Hi, I'm Sarra"
              speed={35}
              scrambleDuration={120}
              startDelay={300}
              onComplete={onNameDone}
              Tag="h1"
              className="font-heading text-5xl md:text-7xl lg:text-8xl font-bold text-warm-brown mb-4"
            />

            {nameComplete && (
              <TypewriterText
                text={roleText}
                speed={20}
                scrambleDuration={80}
                startDelay={100}
                onComplete={onRoleDone}
                Tag="p"
                className="font-body text-lg md:text-xl text-warm-light mb-8"
              />
            )}

            {nameComplete && (
              <div className="flex gap-4 justify-center hero-buttons-enter">
                <a
                  href="/ARAB_SARRA_2_PAGE_CV_FR_EN_MERGED.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-2.5 border-2 border-sakura-400 text-sakura-600 rounded-full font-body text-sm font-medium hover:bg-sakura-400 hover:text-white transition-all"
                >
                  {language === 'en' ? 'Resume' : 'CV'} →
                </a>
                <button
                  onClick={() => {
                    const el = document.getElementById('footer');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-6 py-2.5 border-2 border-warm-brown/30 text-warm-brown rounded-full font-body text-sm font-medium hover:bg-warm-brown hover:text-white transition-all"
                >
                  Contact →
                </button>
              </div>
            )}
          </div>

          <button
            onClick={scrollToAbout}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 text-sakura-400 hero-chevron-enter"
          >
            <div className="hero-chevron-bounce">
              <ChevronDown size={32} />
            </div>
          </button>
        </div>
      )}
    </section>
  );
};

export default HeroSection;
