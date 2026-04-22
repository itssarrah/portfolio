import { useState, useEffect, useRef, useCallback } from 'react';

export const useMousePosition = () => {
  const [position, setPosition] = useState({ x: 0, y: 0, rawX: 0, rawY: 0 });
  const rafRef = useRef(null);
  const latestRef = useRef({ x: 0, y: 0 });

  const handleMouseMove = useCallback((e) => {
    latestRef.current = { x: e.clientX, y: e.clientY };

    if (!rafRef.current) {
      rafRef.current = requestAnimationFrame(() => {
        const { x, y } = latestRef.current;
        const normalizedX = (x / window.innerWidth) * 2 - 1;
        const normalizedY = -(y / window.innerHeight) * 2 + 1;
        setPosition({ x: normalizedX, y: normalizedY, rawX: x, rawY: y });
        rafRef.current = null;
      });
    }
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [handleMouseMove]);

  return position;
};
