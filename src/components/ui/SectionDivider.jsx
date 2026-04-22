import React from 'react';
import { motion } from 'framer-motion';

const SectionDivider = () => (
  <motion.div
    className="flex items-center justify-center py-8 overflow-hidden"
    initial={{ opacity: 0 }}
    whileInView={{ opacity: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 1 }}
  >
    <svg
      viewBox="0 0 600 60"
      className="w-full max-w-xl h-auto"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Flowing vine */}
      <motion.path
        d="M0 30 Q75 10 150 30 T300 30 T450 30 T600 30"
        stroke="#FFB7C5"
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 2, ease: 'easeOut' }}
      />
      {/* Cherry blossom flowers */}
      {[100, 200, 300, 400, 500].map((x, i) => (
        <motion.g
          key={i}
          initial={{ scale: 0, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 + i * 0.2, duration: 0.5 }}
        >
          {[0, 72, 144, 216, 288].map((angle, j) => (
            <ellipse
              key={j}
              cx={x}
              cy={30}
              rx="6"
              ry="3"
              fill={i % 2 === 0 ? '#FFB7C5' : '#E8D5F5'}
              opacity="0.7"
              transform={`rotate(${angle} ${x} 30)`}
            />
          ))}
          <circle cx={x} cy={30} r="2.5" fill="#FF9AAF" />
        </motion.g>
      ))}
      {/* Hearts */}
      {[150, 350].map((x, i) => (
        <motion.g
          key={`heart-${i}`}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.6 }}
          viewport={{ once: true }}
          transition={{ delay: 1 + i * 0.3 }}
        >
          <image
            href="https://cdn.jsdelivr.net/npm/emoji-datasource-apple@16.0.0/img/apple/64/1f496.png"
            x={x - 6}
            y={i === 0 ? 10 : 37}
            width="14"
            height="14"
          />
        </motion.g>
      ))}
      {/* Stars */}
      {[50, 250, 550].map((x, i) => (
        <motion.g
          key={`star-${i}`}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.5 }}
          viewport={{ once: true }}
          transition={{ delay: 1.2 + i * 0.2 }}
        >
          <image
            href="https://cdn.jsdelivr.net/npm/emoji-datasource-apple@16.0.0/img/apple/64/2728.png"
            x={x - 5}
            y={i === 1 ? 9 : 40}
            width="12"
            height="12"
          />
        </motion.g>
      ))}
    </svg>
  </motion.div>
);

export default SectionDivider;
