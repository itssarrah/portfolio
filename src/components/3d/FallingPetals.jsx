import React, { useRef, useEffect, useCallback } from 'react';

class Petal {
  constructor(canvas) {
    this.canvas = canvas;
    this.reset(true);
  }

  reset(initial = false) {
    this.x = Math.random() * this.canvas.width;
    this.y = initial ? Math.random() * this.canvas.height : -20;
    this.size = 3 + Math.random() * 6;
    this.rotation = Math.random() * Math.PI * 2;
    this.rotationSpeed = (Math.random() - 0.5) * 0.02;
    this.fallSpeed = 0.3 + Math.random() * 0.8;
    this.swayAmplitude = 30 + Math.random() * 40;
    this.swaySpeed = 0.005 + Math.random() * 0.01;
    this.swayOffset = Math.random() * Math.PI * 2;
    this.opacity = 0.2 + Math.random() * 0.5;
    this.time = initial ? Math.random() * 1000 : 0;
  }

  update(mouseX, mouseY, isMobile) {
    this.time += 1;
    this.y += this.fallSpeed;
    this.x += Math.sin(this.time * this.swaySpeed + this.swayOffset) * 0.5;
    this.rotation += this.rotationSpeed;

    if (!isMobile && mouseX !== null && mouseY !== null) {
      const dx = this.x - mouseX;
      const dy = this.y - mouseY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 120) {
        const force = (120 - dist) / 120 * 0.8;
        this.x += (dx / dist) * force;
        this.y += (dy / dist) * force * 0.3;
      }
    }

    if (this.y > this.canvas.height + 20) {
      this.reset();
    }
  }

  draw(ctx) {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.rotation);
    ctx.globalAlpha = this.opacity;

    ctx.beginPath();
    ctx.ellipse(0, 0, this.size, this.size * 0.6, 0, 0, Math.PI * 2);
    const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, this.size);
    gradient.addColorStop(0, '#FFD4DE');
    gradient.addColorStop(1, '#FFB7C5');
    ctx.fillStyle = gradient;
    ctx.fill();

    ctx.restore();
  }
}

const FallingPetals = () => {
  const canvasRef = useRef(null);
  const petalsRef = useRef([]);
  const mouseRef = useRef({ x: null, y: null });
  const animRef = useRef(null);
  const isMobile = typeof window !== 'undefined' && (window.innerWidth < 768 || 'ontouchstart' in window);
  const petalCount = isMobile ? 12 : 25;

  const handleMouseMove = useCallback((e) => {
    mouseRef.current = { x: e.clientX, y: e.clientY };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    petalsRef.current = Array.from({ length: petalCount }, () => new Petal(canvas));

    if (!isMobile) {
      window.addEventListener('mousemove', handleMouseMove);
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const { x, y } = mouseRef.current;

      petalsRef.current.forEach((petal) => {
        petal.canvas = canvas;
        petal.update(x, y, isMobile);
        petal.draw(ctx);
      });

      animRef.current = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [petalCount, isMobile, handleMouseMove]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 30,
        pointerEvents: 'none',
      }}
    />
  );
};

export default FallingPetals;
