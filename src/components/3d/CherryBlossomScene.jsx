import React, { useState, useEffect, useCallback, useRef } from 'react';

const IMAGES = [
  '/fuji-transparent.png',
  '/133741897_10265182.png',
  '/branch-transparent.png',
];

function preloadImages(srcs) {
  return Promise.all(
    srcs.map(
      (src) =>
        new Promise((resolve) => {
          const img = new Image();
          img.onload = resolve;
          img.onerror = resolve;
          img.src = src;
        })
    )
  );
}

const PETAL_COUNT = 18;
const petals = Array.from({ length: PETAL_COUNT }, (_, i) => ({
  id: i,
  left: `${(i * 37 + 13) % 100}%`,
  size: 8 + (i % 5) * 3,
  delay: (i * 0.7) % 6,
  duration: 6 + (i % 4) * 2,
  swayDuration: 3 + (i % 3),
  opacity: 0.4 + (i % 4) * 0.15,
}));

function FallingPetal({ petal }) {
  return (
    <div
      className="hero-petal"
      style={{
        left: petal.left,
        width: petal.size,
        height: petal.size * 0.7,
        animationDelay: `${petal.delay}s`,
        animationDuration: `${petal.duration}s`,
        opacity: petal.opacity,
        '--sway-duration': `${petal.swayDuration}s`,
      }}
    />
  );
}

function Loader({ progress, visible }) {
  return (
    <div
      className={`absolute inset-0 z-30 flex flex-col items-center justify-center hero-loader ${visible ? '' : 'hero-loader-exit'}`}
      style={{
        background: 'linear-gradient(135deg, #FFF5F7 0%, #FFE8ED 50%, #FFF0F3 100%)',
      }}
    >
      <div className="text-4xl mb-6 hero-loader-spinner">🌸</div>
      <div className="w-48 h-1.5 bg-sakura-100 rounded-full overflow-hidden">
        <div
          className="h-full bg-sakura-400 rounded-full"
          style={{ width: `${progress}%`, transition: 'width 0.3s ease' }}
        />
      </div>
      <p className="font-handwriting text-sakura-400 mt-3 text-sm">
        {Math.round(progress)}%
      </p>
    </div>
  );
}

const CherryBlossomScene = ({ onLoaded }) => {
  const [loading, setLoading] = useState(true);
  const [showPetals, setShowPetals] = useState(false);
  const [progress, setProgress] = useState(0);
  const scrollYRef = useRef(0);
  const sceneRef = useRef(null);
  const rafRef = useRef(null);
  const ready = !loading;

  const handleLoaded = useCallback(() => {
    setLoading(false);
    setTimeout(() => setShowPetals(true), 1400);
    // Remove CSS entrance transitions after they complete so scroll parallax is instant
    setTimeout(() => {
      if (sceneRef.current) {
        sceneRef.current.querySelectorAll('[class*="hero-enter"]').forEach((el) => {
          el.style.transition = 'none';
        });
      }
    }, 3500);
    if (onLoaded) {
      setTimeout(() => onLoaded(), 600);
    }
  }, [onLoaded]);

  useEffect(() => {
    let cancelled = false;
    setProgress(30);
    const t1 = setTimeout(() => !cancelled && setProgress(60), 200);
    const t2 = setTimeout(() => !cancelled && setProgress(80), 400);

    preloadImages(IMAGES).then(() => {
      if (!cancelled) {
        setProgress(100);
        setTimeout(() => handleLoaded(), 500);
      }
    });

    return () => {
      cancelled = true;
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [handleLoaded]);

  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene) return;

    const applyParallax = () => {
      const y = scrollYRef.current;
      const sun = scene.querySelector('.hero-sun-wrap');
      const glow = scene.querySelector('.hero-glow-wrap');
      const fuji = scene.querySelector('.hero-fuji-wrap');
      const c1 = scene.querySelector('.hero-cloud-1');
      const c2 = scene.querySelector('.hero-cloud-2');
      const c3 = scene.querySelector('.hero-cloud-3');
      const c4 = scene.querySelector('.hero-cloud-4');
      const treeL = scene.querySelector('.hero-tree-left');
      const treeR = scene.querySelector('.hero-tree-right');
      const brR = scene.querySelector('.hero-branch-topright');
      const brL = scene.querySelector('.hero-branch-topleft');

      if (sun) sun.style.transform = `translateX(-50%) translateY(${y * -0.35}px)`;
      if (glow) glow.style.transform = `translateX(-50%) translateY(${y * -0.3}px)`;
      if (fuji) fuji.style.transform = `translateX(-50%) translateY(${y * 0.1}px)`;
      if (c1) c1.style.transform = `translateY(${y * -0.2}px)`;
      if (c2) c2.style.transform = `translateY(${y * -0.15}px)`;
      if (c3) c3.style.transform = `translateY(${y * -0.25}px)`;
      if (c4) c4.style.transform = `translateY(${y * -0.08}px)`;
      if (treeL) treeL.style.transform = `translateY(${y * 0.06}px)`;
      if (treeR) treeR.style.transform = `scaleX(-1) translateY(${y * 0.06}px)`;
      if (brR) brR.style.transform = `translateY(${y * -0.12}px)`;
      if (brL) brL.style.transform = `translateY(${y * -0.12}px)`;

      // Hero overlay — fade out + shift up as user scrolls
      const overlay = document.querySelector('.hero-overlay-wrap');
      if (overlay) {
        const progress = Math.min(y / (window.innerHeight * 0.6), 1);
        overlay.style.opacity = 1 - progress;
        overlay.style.transform = `translateY(${y * -0.4}px) scale(${1 - progress * 0.08})`;
      }

      rafRef.current = null;
    };

    const handleScroll = () => {
      scrollYRef.current = window.scrollY;
      if (!rafRef.current) {
        rafRef.current = requestAnimationFrame(applyParallax);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <>
      <Loader progress={progress} visible={loading} />

      <div ref={sceneRef} className={`absolute inset-0 overflow-hidden hero-scene ${ready ? 'hero-ready' : ''}`}>
        {/* Sky gradient */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(180deg, #FFE4C9 0%, #FFDDE4 30%, #FFD6E0 50%, #FFE8ED 70%, #FFF5F0 100%)',
          }}
        />

        {/* Sun */}
        <div className="absolute left-1/2 hero-sun-wrap hero-enter-sun">
          <div className="hero-sun"
            style={{
              width: 'min(45vw, 380px)',
              height: 'min(45vw, 380px)',
              borderRadius: '50%',
              background: 'radial-gradient(circle, #FF6B4A 0%, #FF8C6B 40%, #FFAB8A 70%, transparent 100%)',
              filter: 'blur(2px)',
            }}
          />
        </div>

        {/* Sun glow */}
        <div className="absolute left-1/2 pointer-events-none hero-glow-wrap hero-enter-glow">
          <div
            style={{
              width: 'min(65vw, 550px)',
              height: 'min(65vw, 550px)',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(255,180,140,0.4) 0%, rgba(255,200,170,0.15) 50%, transparent 75%)',
            }}
          />
        </div>

        {/* Clouds */}
        <div className="absolute hero-cloud hero-cloud-1" />
        <div className="absolute hero-cloud hero-cloud-2" />
        <div className="absolute hero-cloud hero-cloud-3" />

        {/* Mount Fuji */}
        <div
          className="absolute left-1/2 hero-fuji-wrap hero-enter-fuji"
          style={{ width: 'min(90vw, 900px)', bottom: '-2px' }}
        >
          <img src="/fuji-transparent.png" alt="" className="w-full h-auto" draggable={false} decoding="async" />
        </div>

        {/* Cloud in front of Fuji */}
        <div className="absolute hero-cloud hero-cloud-4" />

        {/* Cherry tree — left */}
        <div className="absolute bottom-0 hero-tree-left hero-enter-tree-left hero-tree-sway">
          <img src="/133741897_10265182.png" alt="" className="h-full w-auto" draggable={false} decoding="async" />
        </div>

        {/* Cherry tree — right */}
        <div className="absolute bottom-0 hero-tree-right hero-enter-tree-right hero-tree-sway-alt" style={{ transform: 'scaleX(-1)' }}>
          <img src="/133741897_10265182.png" alt="" className="h-full w-auto" draggable={false} decoding="async" />
        </div>

        {/* Branch — top right */}
        <div className="absolute hero-branch-topright hero-enter-branch-right hero-branch-sway">
          <img src="/branch-transparent.png" alt="" style={{ transform: 'scaleX(-1)' }} className="w-full h-auto" draggable={false} decoding="async" />
        </div>

        {/* Branch — top left */}
        <div className="absolute hero-branch-topleft hero-enter-branch-left hero-branch-sway-alt">
          <img src="/branch-transparent.png" alt="" className="w-full h-auto" draggable={false} decoding="async" />
        </div>

        {/* Falling petals */}
        {showPetals && petals.map((p) => <FallingPetal key={p.id} petal={p} />)}

        {/* Bottom fade */}
        <div
          className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
          style={{ background: 'linear-gradient(to bottom, transparent, #FFF8F0)' }}
        />
      </div>
    </>
  );
};

export default CherryBlossomScene;
