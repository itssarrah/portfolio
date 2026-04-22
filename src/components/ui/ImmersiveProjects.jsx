import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { aiProjects, devProjects, aiProjectsFR, devProjectsFR } from '../../data/projects';

const seasonMonth = {
  Winter: 1, Spring: 4, Summer: 7, Fall: 10,
  Automne: 10, Été: 7, Printemps: 4, Hiver: 1,
};

function sortKey(status) {
  const parts = status.split(' ');
  if (parts.length === 1) return parseInt(parts[0]) * 100 + 6;
  const year = parseInt(parts[parts.length - 1]);
  return year * 100 + (seasonMonth[parts[0]] || 6);
}

function Butterfly({ className, style, size = 48, variant = 0 }) {
  const fills = [
    ['#FFB7C5', '#E8D5F5', '#FFD1DC', '#E8D5F5'],
    ['#D4B0F0', '#FFB7C5', '#E8D5F5', '#FFD1DC'],
    ['#FFCAD4', '#C9A0DC', '#FFE0E8', '#D4B0F0'],
  ];
  const [tl, tr, bl, br] = fills[variant % fills.length];

  return (
    <div className={`pointer-events-none select-none ${className || ''}`} style={style}>
      <svg
        viewBox="0 0 120 100"
        width={size}
        height={size * 0.83}
        className="butterfly-animate"
        style={{ filter: 'drop-shadow(0 2px 6px rgba(255,183,197,0.3))' }}
      >
        <path
          d="M60 50 C52 30 28 6 22 24 C18 36 48 46 60 50"
          fill={tl}
          className="butterfly-wing-left"
        />
        <path
          d="M60 50 C68 30 92 6 98 24 C102 36 72 46 60 50"
          fill={tr}
          className="butterfly-wing-right"
        />
        <path
          d="M60 50 C52 56 26 72 34 60 C40 52 56 50 60 50"
          fill={bl}
          opacity="0.85"
          className="butterfly-wing-left"
        />
        <path
          d="M60 50 C68 56 94 72 86 60 C80 52 64 50 60 50"
          fill={br}
          opacity="0.85"
          className="butterfly-wing-right"
        />
        <circle cx="38" cy="28" r="5" fill="white" opacity="0.3" />
        <circle cx="82" cy="28" r="5" fill="white" opacity="0.3" />
        <ellipse cx="60" cy="48" rx="3" ry="13" fill="#4A2838" />
        <path d="M58 36 C54 24 48 16 44 12" fill="none" stroke="#4A2838" strokeWidth="1.2" strokeLinecap="round" />
        <path d="M62 36 C66 24 72 16 76 12" fill="none" stroke="#4A2838" strokeWidth="1.2" strokeLinecap="round" />
        <circle cx="44" cy="12" r="2.5" fill={tl} />
        <circle cx="76" cy="12" r="2.5" fill={tr} />
      </svg>
    </div>
  );
}

function ProjectCard({ project, index, isFeatured }) {
  const direction = index % 2 === 0 ? 'left' : 'right';

  return (
    <motion.div
      className={isFeatured ? 'md:col-span-2' : ''}
      initial={{
        opacity: 0,
        x: direction === 'left' ? -40 : 40,
        y: 30,
      }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, delay: (index % 3) * 0.1, ease: 'easeOut' }}
    >
      <div
        className="glass-card rounded-2xl overflow-hidden h-full project-card-hover"
        style={{
          border: '1px solid rgba(255,183,197,0.3)',
          boxShadow:
            '0 8px 32px rgba(74,55,40,0.08), 0 2px 8px rgba(255,183,197,0.15)',
        }}
      >
        {isFeatured ? (
          <div className="flex flex-col md:flex-row">
            {project.image && (
              <div className="relative md:w-1/2">
                <img
                  src={`/${project.image}`}
                  alt={project.title}
                  className="w-full h-56 md:h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/20" />
                <div className="absolute top-3 left-3">
                  <span className="px-3 py-1 bg-sakura-400/90 backdrop-blur-sm text-white rounded-full text-xs font-body font-medium">
                    {project.status}
                  </span>
                </div>
              </div>
            )}
            <div className="p-6 md:p-8 md:w-1/2 flex flex-col justify-center">
              <h3 className="font-heading text-2xl md:text-3xl font-bold text-warm-brown mb-3 leading-tight">
                {project.title}
              </h3>
              <p className="font-body text-sm md:text-base text-warm-light leading-relaxed mb-5">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2 mb-5">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="px-3 py-1 bg-sakura-50 text-sakura-600 rounded-full text-xs font-medium font-body"
                  >
                    {t}
                  </span>
                ))}
              </div>
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sakura-500 hover:text-sakura-600 text-sm transition-colors font-medium font-body self-start"
                >
                  <ExternalLink size={14} />
                  {project.github.includes('github') ? 'View Code' : 'Visit Site'}
                </a>
              )}
            </div>
          </div>
        ) : (
          <>
            {project.image && (
              <div className="relative overflow-hidden">
                <img
                  src={`/${project.image}`}
                  alt={project.title}
                  className="w-full h-48 md:h-56 object-cover project-img-hover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white/40 to-transparent" />
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-0.5 bg-sakura-400/90 backdrop-blur-sm text-white rounded-full text-xs font-body font-medium">
                    {project.status}
                  </span>
                </div>
              </div>
            )}
            <div className="p-5 md:p-6">
              <h3 className="font-heading text-lg md:text-xl font-bold text-warm-brown mb-2 leading-tight">
                {project.title}
              </h3>
              <p className="font-body text-sm text-warm-light leading-relaxed mb-4 line-clamp-2">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-1.5 mb-4">
                {project.tech.slice(0, 4).map((t) => (
                  <span
                    key={t}
                    className="px-2.5 py-0.5 bg-sakura-50 text-sakura-600 rounded-full text-xs font-medium font-body"
                  >
                    {t}
                  </span>
                ))}
              </div>
              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sakura-500 hover:text-sakura-600 text-sm transition-colors font-medium font-body"
                >
                  <ExternalLink size={14} />
                  {project.github.includes('github') ? 'Code' : 'Visit'}
                </a>
              )}
            </div>
          </>
        )}
      </div>
    </motion.div>
  );
}

const FEATURED = new Set([
  'Sensei AI',
  'Portfolio Website', 'Site Portfolio',
  'Dhakirate-Al-Djazair',
  'Ma3ridy ~ Galleria',
]);

const ImmersiveProjects = ({ language }) => {
  const projects = useMemo(() => {
    const all =
      language === 'fr'
        ? [...aiProjectsFR, ...devProjectsFR]
        : [...aiProjects, ...devProjects];
    const sorted = all.sort((a, b) => sortKey(b.status) - sortKey(a.status));
    const big = sorted.filter((p) => FEATURED.has(p.title));
    const small = sorted.filter((p) => !FEATURED.has(p.title));
    const result = [];
    let bi = 0, si = 0;
    while (bi < big.length || si < small.length) {
      if (bi < big.length) result.push(big[bi++]);
      for (let n = 0; n < 2 && si < small.length; n++) result.push(small[si++]);
    }
    return result;
  }, [language]);

  return (
    <section className="relative py-8 md:py-12">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#FFF8FA] via-[#FFEEF5] to-[#FFF5F8] pointer-events-none" />

      {/* Floating butterflies */}
      <Butterfly
        className="absolute hidden md:block"
        style={{ top: '5%', left: '8%', animationDelay: '0s' }}
        size={44}
        variant={0}
      />
      <Butterfly
        className="absolute hidden md:block"
        style={{ top: '25%', right: '5%', animationDelay: '1.5s' }}
        size={36}
        variant={1}
      />
      <Butterfly
        className="absolute hidden md:block"
        style={{ top: '50%', left: '3%', animationDelay: '0.8s' }}
        size={40}
        variant={2}
      />
      <Butterfly
        className="absolute hidden md:block"
        style={{ top: '72%', right: '7%', animationDelay: '2s' }}
        size={32}
        variant={0}
      />
      <Butterfly
        className="absolute hidden lg:block"
        style={{ top: '38%', left: '12%', animationDelay: '3s' }}
        size={28}
        variant={1}
      />
      <Butterfly
        className="absolute hidden lg:block"
        style={{ top: '88%', left: '6%', animationDelay: '1.2s' }}
        size={34}
        variant={2}
      />

      {/* Decorative petals */}
      {[...Array(12)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full float-animation pointer-events-none"
          style={{
            width: 5 + (i % 4) * 2,
            height: 3 + (i % 3) * 2,
            background: ['#FFD1DC', '#E8D5F5', '#FFE0E8', '#FFEEF2'][i % 4],
            opacity: 0.15 + (i % 3) * 0.06,
            left: `${8 + (i * 19) % 84}%`,
            top: `${5 + (i * 13) % 90}%`,
            animationDelay: `${i * 0.6}s`,
            animationDuration: `${5 + (i % 4)}s`,
          }}
        />
      ))}

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section subtitle */}
        <p className="font-handwriting text-base text-sakura-400 text-center mb-10 opacity-70">
          {language === 'en'
            ? 'scroll to discover each project'
            : 'défilez pour découvrir chaque projet'}
        </p>

        {/* Project grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {projects.map((project, i) => (
            <ProjectCard
              key={project.title}
              project={project}
              index={i}
              isFeatured={i % 3 === 0}
            />
          ))}
        </div>

        {/* Bottom butterfly accent */}
        <div className="flex justify-center mt-12">
          <Butterfly size={56} variant={0} />
        </div>
      </div>
    </section>
  );
};

export default ImmersiveProjects;
