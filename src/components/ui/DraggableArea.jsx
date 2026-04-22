import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import ScrollAnimationWrapper from './ScrollAnimationWrapper';

function toOptimized(path) {
  if (!path.includes('EVENTS/')) return path;
  return path.replace(/\.(png|jpg|jpeg)$/i, '-opt.jpg');
}

function FairyLightBulb({ delay = 0 }) {
  return (
    <motion.div
      className="w-2.5 h-2.5 rounded-full relative"
      style={{
        background: 'radial-gradient(circle, #FFF5E6 30%, #FFE4B5 70%)',
        boxShadow: '0 0 6px 2px rgba(255,228,181,0.5)',
      }}
      animate={{
        opacity: [0.4, 1, 0.4],
        boxShadow: [
          '0 0 4px 1px rgba(255,228,181,0.3)',
          '0 0 10px 4px rgba(255,228,181,0.7)',
          '0 0 4px 1px rgba(255,228,181,0.3)',
        ],
      }}
      transition={{
        duration: 2.5,
        repeat: Infinity,
        ease: 'easeInOut',
        delay,
      }}
    />
  );
}

function FairyLightString({ width }) {
  const bulbCount = Math.max(6, Math.floor(width / 60));
  return (
    <div className="relative w-full" style={{ height: '28px' }}>
      <svg
        className="absolute inset-0 w-full"
        style={{ height: '28px' }}
        viewBox={`0 0 ${width} 28`}
        preserveAspectRatio="none"
      >
        <path
          d={`M 0 4 Q ${width * 0.25} 22, ${width * 0.5} 14 Q ${width * 0.75} 6, ${width} 10`}
          fill="none"
          stroke="#4A3728"
          strokeWidth="1.2"
          opacity="0.25"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-between px-4">
        {Array.from({ length: bulbCount }).map((_, i) => (
          <FairyLightBulb key={i} delay={i * 0.3} />
        ))}
      </div>
    </div>
  );
}

function HackathonCard({ hackathon, index }) {
  const [mainImageIndex, setMainImageIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isHovered, setIsHovered] = useState(false);
  const autoPlayRef = useRef(null);
  const touchStartX = useRef(null);
  const images = useMemo(() => hackathon.images.map(toOptimized), [hackathon.images]);

  const goTo = useCallback((newIndex) => {
    setDirection(newIndex > mainImageIndex ? 1 : -1);
    setMainImageIndex(newIndex);
  }, [mainImageIndex]);

  const goNext = useCallback(() => {
    const next = (mainImageIndex + 1) % images.length;
    setDirection(1);
    setMainImageIndex(next);
  }, [mainImageIndex, images.length]);

  const goPrev = useCallback(() => {
    const prev = (mainImageIndex - 1 + images.length) % images.length;
    setDirection(-1);
    setMainImageIndex(prev);
  }, [mainImageIndex, images.length]);

  useEffect(() => {
    if (isHovered) {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
      return;
    }
    autoPlayRef.current = setInterval(goNext, 4500);
    return () => { if (autoPlayRef.current) clearInterval(autoPlayRef.current); };
  }, [isHovered, goNext]);

  const rotations = [-1.5, 1, -0.8, 1.2, -1, 0.8];
  const hoverRotation = rotations[index % rotations.length];

  const slideVariants = {
    enter: (dir) => ({ x: dir > 0 ? 80 : -80, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (dir) => ({ x: dir > 0 ? -80 : 80, opacity: 0 }),
  };

  const visibleThumbs = images.length > 5 ? images.slice(0, 5) : images;

  return (
    <motion.div
      className="relative hackathon-card-hover"
      style={{ '--hover-rotate': `${hoverRotation}deg` }}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{
        duration: 0.6,
        delay: index * 0.12,
        ease: [0.22, 1, 0.36, 1],
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className="bg-white rounded-sm p-3 sm:p-4"
        style={{
          boxShadow:
            '0 4px 20px rgba(74,55,40,0.10), 0 2px 6px rgba(74,55,40,0.07)',
        }}
      >
        {/* Main photo with slide transitions */}
        <div
          className="overflow-hidden rounded-sm relative group"
          style={{ height: '240px', touchAction: 'pan-y' }}
          onTouchStart={(e) => { touchStartX.current = e.touches[0].clientX; }}
          onTouchEnd={(e) => {
            if (touchStartX.current === null) return;
            const diff = e.changedTouches[0].clientX - touchStartX.current;
            if (Math.abs(diff) > 40) { diff < 0 ? goNext() : goPrev(); }
            touchStartX.current = null;
          }}
        >
          <AnimatePresence initial={false} custom={direction} mode="popLayout">
            <motion.img
              key={images[mainImageIndex]}
              src={`/${images[mainImageIndex]}`}
              alt={hackathon.title}
              className="w-full h-full object-cover rounded-sm absolute inset-0"
              loading="lazy"
              decoding="async"
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
            />
          </AnimatePresence>

          {/* Nav arrows — desktop only, visible on hover */}
          <motion.button
            onClick={(e) => { e.stopPropagation(); goPrev(); }}
            className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm hidden md:flex items-center justify-center text-warm-brown shadow-md z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.2 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronLeft size={16} />
          </motion.button>
          <motion.button
            onClick={(e) => { e.stopPropagation(); goNext(); }}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/80 backdrop-blur-sm hidden md:flex items-center justify-center text-warm-brown shadow-md z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.2 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ChevronRight size={16} />
          </motion.button>

          {/* Photo counter */}
          <div className="absolute bottom-2 right-2 px-2 py-0.5 bg-black/40 backdrop-blur-sm text-white text-xs rounded-full z-10 font-body">
            {mainImageIndex + 1} / {images.length}
          </div>

          {/* Progress dots */}
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={(e) => { e.stopPropagation(); goTo(i); }}
                className="p-0 border-0 outline-none focus:outline-none"
              >
                <motion.div
                  className="rounded-full"
                  style={{
                    width: i === mainImageIndex ? 16 : 6,
                    height: 6,
                    background: i === mainImageIndex ? '#FFB7C5' : 'rgba(255,255,255,0.6)',
                    borderRadius: 3,
                  }}
                  layout
                  transition={{ duration: 0.25 }}
                />
              </button>
            ))}
          </div>
        </div>

        {/* Thumbnail strip */}
        {visibleThumbs.length > 1 && (
          <div className="flex gap-1.5 mt-2.5 overflow-x-auto pb-1 scrollbar-hide">
            {visibleThumbs.map((img, thumbIdx) => {
              const imgIndex = images.indexOf(img);
              const isActive = imgIndex === mainImageIndex;
              return (
                <motion.button
                  key={img}
                  onClick={() => goTo(imgIndex)}
                  className="flex-shrink-0 rounded overflow-hidden focus:outline-none relative"
                  style={{
                    border: isActive ? '2px solid #FFB7C5' : '2px solid transparent',
                  }}
                  whileHover={{ scale: 1.08, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: thumbIdx * 0.05 }}
                >
                  <img
                    src={`/${img}`}
                    alt={`${hackathon.title} ${imgIndex + 1}`}
                    className="w-14 h-14 object-cover rounded"
                    loading="lazy"
                    decoding="async"
                    style={{
                      filter: isActive ? 'none' : 'brightness(0.8)',
                      transition: 'filter 0.2s ease',
                    }}
                  />
                  {isActive && (
                    <motion.div
                      className="absolute inset-0 rounded"
                      style={{ boxShadow: '0 0 0 1px rgba(255,183,197,0.5), 0 0 8px rgba(255,183,197,0.3)' }}
                      layoutId={`thumb-glow-${hackathon.title}`}
                    />
                  )}
                </motion.button>
              );
            })}
            {images.length > 5 && (
              <div className="flex-shrink-0 w-14 h-14 rounded bg-sakura-50 flex items-center justify-center text-sakura-500 text-xs font-medium font-body">
                +{images.length - 5}
              </div>
            )}
          </div>
        )}

        {/* Card info */}
        <div className="pt-3 px-0.5 space-y-1.5">
          <div className="flex items-start justify-between gap-2">
            <h3 className="font-handwriting text-base sm:text-lg text-warm-brown font-bold leading-tight">
              {hackathon.title}
            </h3>
            {hackathon.duration && (
              <span className="text-xs text-warm-light font-body whitespace-nowrap mt-0.5">
                {hackathon.duration}
              </span>
            )}
          </div>

          <span className="inline-block px-2.5 py-0.5 text-xs font-medium rounded-full bg-sakura-100 text-sakura-600 border border-sakura-200">
            {hackathon.achievement}
          </span>

          <p className="font-handwriting text-xs text-warm-light">
            {hackathon.date} &middot; {hackathon.location}
          </p>

          <p className="text-sm text-warm-brown/80 leading-relaxed line-clamp-2">
            {hackathon.description}
          </p>

          {/* Tech tags */}
          <div className="flex flex-wrap gap-1 pt-1">
            {hackathon.tech.slice(0, 3).map((t) => (
              <span
                key={t}
                className="px-2 py-0.5 bg-sakura-50 text-sakura-600 rounded-full font-body"
                style={{ fontSize: '0.65rem' }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

const DraggableArea = ({ hackathons, language }) => {
  const containerRef = useRef(null);
  const [containerWidth, setContainerWidth] = useState(800);

  useEffect(() => {
    const measure = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  return (
    <ScrollAnimationWrapper>
      <div ref={containerRef} className="relative w-full max-w-5xl mx-auto">
        <FairyLightString width={containerWidth} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 px-2 sm:px-4 mt-2">
          {hackathons.map((h, i) => (
            <HackathonCard key={h.title} hackathon={h} index={i} />
          ))}
        </div>
      </div>
    </ScrollAnimationWrapper>
  );
};

export default DraggableArea;
