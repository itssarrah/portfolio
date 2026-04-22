import React from 'react';
import { motion } from 'framer-motion';

const directions = {
  up: { y: 50 },
  down: { y: -50 },
  left: { x: 50 },
  right: { x: -50 },
};

const ScrollAnimationWrapper = ({
  children,
  direction = 'up',
  delay = 0,
  className = '',
  once = true,
}) => {
  const offset = directions[direction] || directions.up;

  return (
    <motion.div
      initial={{ opacity: 0, ...offset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once, amount: 0.3 }}
      transition={{
        duration: 0.6,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default ScrollAnimationWrapper;
