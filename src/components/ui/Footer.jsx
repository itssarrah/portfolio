import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Mail, MapPin, ArrowUp, FileText } from 'lucide-react';
import Twemoji from './Twemoji';

const socials = [
  { href: 'https://github.com/itssarrah', icon: Github, label: 'GitHub' },
  { href: 'https://www.linkedin.com/in/sarra-arab-b71177245/', icon: Linkedin, label: 'LinkedIn' },
  { href: 'mailto:sarraarabpro@gmail.com', icon: Mail, label: 'Email' },
  { href: 'https://www.researchgate.net/profile/Sarra-Arab?ev=hdr_xprf', icon: FileText, label: 'ResearchGate' },
];

function FooterPetals() {
  const petals = useMemo(
    () =>
      Array.from({ length: 14 }, (_, i) => ({
        left: 5 + ((i * 29) % 90),
        delay: i * 1.2,
        dur: 6 + (i % 4) * 2,
        size: 6 + (i % 3) * 3,
        drift: ((i % 2 === 0 ? 1 : -1) * (15 + (i % 5) * 8)),
        color: ['#FFD1DC', '#FFE0E8', '#E8D5F5', '#FFEEF2'][i % 4],
      })),
    []
  );

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
      {petals.map((p, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: p.size,
            height: p.size * 0.7,
            background: p.color,
            left: `${p.left}%`,
            top: -10,
          }}
          animate={{
            y: [0, 400],
            x: [0, p.drift, 0],
            rotate: [0, 360],
            opacity: [0, 0.5, 0.4, 0],
          }}
          transition={{
            duration: p.dur,
            delay: p.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      ))}
    </div>
  );
}

const Footer = ({ language }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      id="footer"
      className="relative py-20 px-4 overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #FFF8F0 0%, #FFE8ED 50%, #FFF0F5 100%)',
      }}
    >
      {/* Falling petals */}
      <FooterPetals />

      {/* Animated branch — top right */}
      <motion.div
        className="absolute -top-2 right-0 w-40 md:w-56 pointer-events-none"
        style={{ opacity: 0.22, transformOrigin: 'top right' }}
        animate={{ rotate: [0, 1.2, 0, -0.8, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
      >
        <img src="/branch-transparent.png" alt="" className="w-full h-auto" style={{ transform: 'scaleX(-1)' }} draggable={false} />
      </motion.div>

      {/* Animated branch — top left */}
      <motion.div
        className="absolute -top-2 left-0 w-36 md:w-48 pointer-events-none"
        style={{ opacity: 0.22, transformOrigin: 'top left' }}
        animate={{ rotate: [0, -1, 0, 0.6, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      >
        <img src="/branch-transparent.png" alt="" className="w-full h-auto" draggable={false} />
      </motion.div>

      {/* Animated tree — bottom left */}
      <motion.div
        className="absolute bottom-0 left-0 w-28 md:w-40 pointer-events-none"
        style={{ opacity: 0.22, transformOrigin: 'bottom center' }}
        animate={{
          rotate: [0, 0.8, 0, -0.6, 0],
          x: [0, 2, 0, -1.5, 0],
        }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      >
        <img src="/133741897_10265182.png" alt="" className="w-full h-auto" draggable={false} />
      </motion.div>

      {/* Animated tree — bottom right */}
      <motion.div
        className="absolute bottom-0 right-0 w-28 md:w-40 pointer-events-none"
        style={{ opacity: 0.22, transformOrigin: 'bottom center', transform: 'scaleX(-1)' }}
        animate={{
          rotate: [0, -0.7, 0, 0.9, 0],
          x: [0, -2, 0, 1.5, 0],
        }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
      >
        <img src="/133741897_10265182.png" alt="" className="w-full h-auto" draggable={false} />
      </motion.div>

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Heading */}
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-warm-brown mb-2">
            {language === 'en' ? "Let's Connect" : 'Restons en Contact'}
          </h2>
          <p className="font-handwriting text-xl text-sakura-500">
            {language === 'en'
              ? "I'd love to hear from you!"
              : "J'aimerais avoir de vos nouvelles !"}
          </p>
        </motion.div>

        {/* Photo with animated gradient ring */}
        <motion.div
          className="flex justify-center mb-8"
          initial={{ opacity: 0, scale: 0.7 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="relative">
            {/* Spinning gradient border */}
            <div
              className="absolute -inset-1.5 rounded-full"
              style={{
                background: 'conic-gradient(from 0deg, #FFB7C5, #E8D5F5, #FFD1DC, #B898D0, #FFB7C5)',
                animation: 'spin 8s linear infinite',
              }}
            />
            {/* Pulsing glow */}
            <div
              className="absolute -inset-3 rounded-full"
              style={{
                background: 'radial-gradient(circle, rgba(255,183,197,0.3) 0%, transparent 70%)',
                animation: 'pulse 3s ease-in-out infinite',
              }}
            />
            <img
              src="/sarra2.png"
              alt="Sarra Arab"
              className="relative w-44 h-44 md:w-52 md:h-52 rounded-full object-cover border-4 border-white shadow-xl"
              style={{ zIndex: 1 }}
            />
          </div>
        </motion.div>

        {/* Contact info */}
        <motion.div
          className="flex flex-col md:flex-row items-center justify-center gap-6 mb-10"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.25 }}
        >
          <a
            href="mailto:sarraarabpro@gmail.com"
            className="flex items-center gap-2 text-warm-brown hover:text-sakura-500 transition-colors font-body text-sm"
          >
            <Mail size={16} className="text-sakura-400" />
            sarraarabpro@gmail.com
          </a>
          <span className="hidden md:block text-sakura-300">|</span>
          <div className="flex items-center gap-2 text-warm-brown font-body text-sm">
            <MapPin size={16} className="text-sakura-400" />
            Algiers, Algeria
          </div>
        </motion.div>

        {/* Social links — staggered */}
        <div className="flex items-center justify-center gap-4 mb-10">
          {socials.map(({ href, icon: Icon, label }, i) => (
            <motion.a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="w-13 h-13 md:w-14 md:h-14 rounded-full bg-white/80 backdrop-blur-sm border border-sakura-200 flex items-center justify-center text-warm-brown hover:bg-sakura-100 hover:text-sakura-600 hover:border-sakura-400 transition-all"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.3 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{
                y: -5,
                boxShadow: '0 8px 25px rgba(255,183,197,0.35)',
                scale: 1.08,
              }}
              title={label}
              style={{ width: 52, height: 52 }}
            >
              <Icon size={22} />
            </motion.a>
          ))}
        </div>

        {/* CV download */}
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.5 }}
        >
          <motion.a
            href="/ARAB_SARRA_2_PAGE_CV_FR_EN_MERGED.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-7 py-3 bg-sakura-400 text-white rounded-full font-body text-sm font-medium hover:bg-sakura-500 transition-colors shadow-lg"
            whileHover={{ scale: 1.04, boxShadow: '0 10px 30px rgba(255,183,197,0.4)' }}
            whileTap={{ scale: 0.97 }}
          >
            <FileText size={16} />
            {language === 'en' ? 'Download CV' : 'Télécharger CV'}
          </motion.a>
        </motion.div>

        {/* Back to top */}
        <div className="text-center">
          <motion.button
            onClick={scrollToTop}
            className="inline-flex items-center gap-1 text-sakura-400 font-body text-sm hover:text-sakura-600 transition-colors"
            whileHover={{ y: -3 }}
          >
            <ArrowUp size={16} />
            {language === 'en' ? 'back to top' : 'retour en haut'}
          </motion.button>
        </div>

        {/* Copyright */}
        <div className="text-center mt-8 font-body text-xs text-warm-light/60">
          <p>
            © 2025 Sarra Arab. {language === 'en' ? 'Made with' : 'Fait avec'}{' '}
            <Twemoji emoji="🌸" size={14} />
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
