import { useState, useEffect } from 'react';

export const useDeviceCapability = () => {
  const [capability, setCapability] = useState('high');

  useEffect(() => {
    const checkCapability = () => {
      const isMobile = window.innerWidth < 768 || 'ontouchstart' in window;
      const isTablet = window.innerWidth >= 768 && window.innerWidth < 1024;

      let hasWebGL = false;
      try {
        const canvas = document.createElement('canvas');
        hasWebGL = !!(canvas.getContext('webgl2') || canvas.getContext('webgl'));
      } catch (e) {
        hasWebGL = false;
      }

      if (!hasWebGL || isMobile) setCapability('low');
      else if (isTablet) setCapability('medium');
      else setCapability('high');
    };

    checkCapability();
    window.addEventListener('resize', checkCapability);
    return () => window.removeEventListener('resize', checkCapability);
  }, []);

  return capability;
};
