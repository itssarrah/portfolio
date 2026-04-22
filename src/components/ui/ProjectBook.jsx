import React, { useRef, useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { aiProjects, devProjects, aiProjectsFR, devProjectsFR } from '../../data/projects';

const seasonMonth = { Winter: 1, Spring: 4, Summer: 7, Fall: 10, Automne: 10, Été: 7, Printemps: 4, Hiver: 1 };

function sortKey(status) {
  const parts = status.split(' ');
  if (parts.length === 1) return parseInt(parts[0]) * 100 + 6;
  const year = parseInt(parts[parts.length - 1]);
  const season = parts[0];
  return year * 100 + (seasonMonth[season] || 6);
}

function extractYear(status) {
  const match = status.match(/(\d{4})/);
  return match ? match[1] : '';
}

function ButterflyIcon({ className = '' }) {
  return (
    <svg viewBox="0 0 48 48" width="36" height="36" className={className}>
      <g className="butterfly-wings">
        <path
          d="M24 24 C20 16 12 10 14 19 C15 22 20 23 24 24"
          fill="#FFD1DC"
          opacity="0.85"
          className="butterfly-wing-left"
        />
        <path
          d="M24 24 C28 16 36 10 34 19 C33 22 28 23 24 24"
          fill="#E8D5F5"
          opacity="0.85"
          className="butterfly-wing-right"
        />
        <path
          d="M24 24 C21 27 16 33 19 29 C21 27 23 25 24 24"
          fill="#FFE0E8"
          opacity="0.75"
          className="butterfly-wing-left"
        />
        <path
          d="M24 24 C27 27 32 33 29 29 C27 27 25 25 24 24"
          fill="#D4C0E8"
          opacity="0.75"
          className="butterfly-wing-right"
        />
      </g>
      <ellipse cx="24" cy="23" rx="1.2" ry="4.5" fill="#4A3040" />
      <path d="M23 19 C21 14 19 11 18 9" fill="none" stroke="#4A3040" strokeWidth="0.7" strokeLinecap="round" />
      <path d="M25 19 C27 14 29 11 30 9" fill="none" stroke="#4A3040" strokeWidth="0.7" strokeLinecap="round" />
      <circle cx="18" cy="9" r="1.2" fill="#FFD1DC" />
      <circle cx="30" cy="9" r="1.2" fill="#E8D5F5" />
    </svg>
  );
}

function ProjectCard({ project, side }) {
  return (
    <div
      className="glass-card rounded-2xl overflow-hidden"
      style={{ border: '1px solid rgba(255,183,197,0.2)' }}
    >
      {project.image && (
        <img
          src={`/${project.image}`}
          alt={project.title}
          className="w-full h-36 object-cover"
          loading="lazy"
        />
      )}
      <div className="p-4">
        <div className="flex items-center justify-between mb-1">
          <h3 className="font-heading text-base font-bold text-warm-brown leading-tight">
            {project.title}
          </h3>
        </div>

        <p className="font-body text-xs text-warm-light leading-relaxed mb-3 line-clamp-2">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-1.5 mb-3">
          {project.tech.slice(0, 4).map((t) => (
            <span
              key={t}
              className="px-2 py-0.5 bg-sakura-50 text-sakura-600 rounded-full text-[10px] font-medium"
            >
              {t}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between">
          <span className="text-[10px] text-warm-light opacity-60 font-body">
            {project.status}
          </span>
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-sakura-500 hover:text-sakura-600 text-xs transition-colors"
            >
              <ExternalLink size={11} />
              <span className="font-body text-[11px]">
                {project.github.includes('github') ? 'Code' : 'Visit'}
              </span>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

function YearMarker({ year }) {
  return (
    <div className="flex items-center justify-center my-2">
      <div className="px-4 py-1.5 rounded-full bg-sakura-100 border border-sakura-200">
        <span className="font-handwriting text-lg text-sakura-500">{year}</span>
      </div>
    </div>
  );
}

const ProjectBook = ({ language }) => {
  const allProjects = useMemo(() => {
    const projects = language === 'fr'
      ? [...aiProjectsFR, ...devProjectsFR]
      : [...aiProjects, ...devProjects];
    return [...projects].sort((a, b) => sortKey(a.status) - sortKey(b.status));
  }, [language]);

  const containerRef = useRef(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const viewH = window.innerHeight;
      const p = Math.max(0, Math.min(1, (viewH * 0.4 - rect.top) / (rect.height - viewH * 0.2)));
      setProgress(p);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const yearsShown = useMemo(() => {
    const seen = new Set();
    return allProjects.map((p) => {
      const y = extractYear(p.status);
      if (seen.has(y)) return null;
      seen.add(y);
      return y;
    });
  }, [allProjects]);

  return (
    <div ref={containerRef} className="relative max-w-3xl mx-auto px-4 pb-8">
        {/* Center line */}
        <div
          className="absolute top-0 bottom-0 w-px hidden md:block"
          style={{
            left: '50%',
            background: 'linear-gradient(to bottom, transparent 0%, #FFD1DC 8%, #FFB7C5 50%, #FFD1DC 92%, transparent 100%)',
          }}
        />
        {/* Mobile line */}
        <div
          className="absolute top-0 bottom-0 w-px md:hidden"
          style={{
            left: '20px',
            background: 'linear-gradient(to bottom, transparent 0%, #FFD1DC 8%, #FFB7C5 50%, #FFD1DC 92%, transparent 100%)',
          }}
        />

        {/* Butterfly guide */}
        <motion.div
          className="absolute z-20 pointer-events-none hidden md:block"
          style={{
            left: '50%',
            top: `${progress * 92 + 2}%`,
            transform: 'translate(-50%, -50%)',
          }}
        >
          <div className="butterfly-animate">
            <ButterflyIcon />
          </div>
        </motion.div>
        <motion.div
          className="absolute z-20 pointer-events-none md:hidden"
          style={{
            left: '20px',
            top: `${progress * 92 + 2}%`,
            transform: 'translate(-50%, -50%)',
          }}
        >
          <div className="butterfly-animate">
            <ButterflyIcon className="w-7 h-7" />
          </div>
        </motion.div>

        {/* Timeline items */}
        <div className="relative">
          {allProjects.map((project, i) => {
            const isLeft = i % 2 === 0;

            return (
              <div key={project.title}>
                {yearsShown[i] && <YearMarker year={yearsShown[i]} />}

                {/* Desktop: alternating layout */}
                <div className="hidden md:block relative mb-12">
                  {/* Connector dot */}
                  <div
                    className="absolute top-8 w-3 h-3 rounded-full bg-sakura-300 border-2 border-white z-10"
                    style={{ left: 'calc(50% - 6px)' }}
                  />
                  {/* Connector line */}
                  <div
                    className="absolute top-9 h-px bg-sakura-200"
                    style={
                      isLeft
                        ? { right: '50%', width: '24px', marginRight: '6px' }
                        : { left: '50%', width: '24px', marginLeft: '6px' }
                    }
                  />

                  <div className={`flex ${isLeft ? 'justify-start' : 'justify-end'}`}>
                    <motion.div
                      className="w-[44%]"
                      initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, amount: 0.3 }}
                      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <ProjectCard project={project} side={isLeft ? 'left' : 'right'} />
                    </motion.div>
                  </div>
                </div>

                {/* Mobile: single column */}
                <div className="md:hidden relative mb-8 pl-10">
                  {/* Connector dot */}
                  <div
                    className="absolute top-6 w-2.5 h-2.5 rounded-full bg-sakura-300 border-2 border-white z-10"
                    style={{ left: '15px' }}
                  />

                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.45 }}
                  >
                    <ProjectCard project={project} side="right" />
                  </motion.div>
                </div>
              </div>
            );
          })}

          {/* End flourish */}
          <div className="flex items-center justify-center mt-4">
            <span className="font-handwriting text-sakura-400 text-lg">
              {language === 'en' ? 'more to come ✿' : 'la suite arrive ✿'}
            </span>
          </div>
        </div>
      </div>
  );
};

export default ProjectBook;
