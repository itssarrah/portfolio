import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, BookOpen } from 'lucide-react';

const ResearchCard = ({ paper, language }) => {
  const lang = language || 'en';

  return (
    <motion.div
      className="glass-card p-6 relative overflow-hidden"
      whileHover={{ y: -4, boxShadow: '0 12px 30px rgba(255,183,197,0.2)' }}
      transition={{ duration: 0.3 }}
    >
      {/* Sakura gradient left border */}
      <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-sakura-300 via-blossom-purple to-sakura-400 rounded-l-lg" />

      <div className="pl-3">
        {/* Focus tag */}
        <span className="inline-block px-3 py-1 bg-blossom-lavender/40 text-blossom-purple rounded-full text-xs font-body font-medium mb-3">
          {paper.focus?.[lang] || paper.focus}
        </span>

        {/* Title */}
        <h3 className="font-heading text-lg font-semibold text-warm-brown mb-2 leading-snug">
          {paper.title}
        </h3>

        {/* Description */}
        <p className="font-body text-sm text-warm-light leading-relaxed mb-3">
          {paper.description?.[lang] || paper.description}
        </p>

        {/* Status */}
        <div className="flex items-center gap-2 mb-3">
          <BookOpen size={14} className="text-sakura-400" />
          <span className="font-body text-xs text-sakura-600 font-medium">
            {paper.status?.[lang] || paper.status}
          </span>
        </div>

        {/* DOI link */}
        {paper.doi && (
          <a
            href={paper.doi}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 px-4 py-1.5 bg-sakura-100 text-sakura-600 rounded-full text-xs font-body font-medium hover:bg-sakura-200 transition-colors"
          >
            <ExternalLink size={12} />
            {paper.links?.[lang] || 'View Paper'}
          </a>
        )}
      </div>
    </motion.div>
  );
};

export default ResearchCard;
