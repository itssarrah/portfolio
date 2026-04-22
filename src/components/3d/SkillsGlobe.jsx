import React, { useRef, useMemo, useState, useCallback, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Billboard, AdaptiveDpr, Html } from '@react-three/drei';
import * as THREE from 'three';

const SKILL_ICONS = [
  { name: 'Python', file: 'python.svg', color: '#3776AB', abbr: 'PY' },
  { name: 'JavaScript', file: 'javascript.svg', color: '#F7DF1E', abbr: 'JS', textColor: '#000' },
  { name: 'C++', file: 'cpp.svg', color: '#00599C', abbr: 'C++' },
  { name: 'Java', file: 'java.svg', color: '#ED8B00', abbr: 'JV' },
  { name: 'Kotlin', file: 'kotlin.svg', color: '#7F52FF', abbr: 'KT' },
  { name: 'Swift', file: 'swift.svg', color: '#FA7343', abbr: 'SW' },
  { name: 'Dart', file: 'dart.svg', color: '#0175C2', abbr: 'DA' },
  { name: 'R', file: 'r.svg', color: '#276DC3', abbr: 'R' },
  { name: 'PHP', file: 'php.svg', color: '#777BB4', abbr: 'PHP' },
  { name: 'React', file: 'react.svg', color: '#61DAFB', abbr: 'RE', textColor: '#000' },
  { name: 'Vue', file: 'vue.svg', color: '#4FC08D', abbr: 'VU' },
  { name: 'Node.js', file: 'nodejs.svg', color: '#339933', abbr: 'ND' },
  { name: 'Flutter', file: 'flutter.svg', color: '#02569B', abbr: 'FL' },
  { name: 'Flask', file: 'flask.svg', color: '#4A4A4A', abbr: 'FK' },
  { name: 'Laravel', file: 'laravel.svg', color: '#FF2D20', abbr: 'LV' },
  { name: 'TensorFlow', file: 'tensorflow.svg', color: '#FF6F00', abbr: 'TF' },
  { name: 'PyTorch', file: 'pytorch.svg', color: '#EE4C2C', abbr: 'PT' },
  { name: 'OpenCV', file: 'opencv.svg', color: '#5C3EE8', abbr: 'CV' },
  { name: 'Scikit', file: 'scikitlearn.svg', color: '#F7931E', abbr: 'SK' },
  { name: 'Docker', file: 'docker.svg', color: '#2496ED', abbr: 'DK' },
  { name: 'Git', file: 'git.svg', color: '#F05032', abbr: 'GIT' },
  { name: 'MySQL', file: 'mysql.svg', color: '#4479A1', abbr: 'SQL' },
  { name: 'MongoDB', file: 'mongodb.svg', color: '#47A248', abbr: 'MG' },
  { name: 'Linux', file: 'linux.svg', color: '#FCC624', abbr: 'LX', textColor: '#000' },
  { name: 'Tailwind', file: 'tailwind.svg', color: '#06B6D4', abbr: 'TW' },
  { name: 'Three.js', file: 'threejs.svg', color: '#333333', abbr: '3JS' },
];

function createFallbackTexture(skill) {
  const size = 256;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');

  ctx.beginPath();
  ctx.arc(size / 2, size / 2, size / 2 - 6, 0, Math.PI * 2);
  ctx.fillStyle = skill.color;
  ctx.fill();

  ctx.strokeStyle = 'rgba(255,255,255,0.4)';
  ctx.lineWidth = 4;
  ctx.stroke();

  ctx.fillStyle = skill.textColor || '#fff';
  ctx.font = `bold ${skill.abbr.length > 2 ? 56 : 72}px Arial, sans-serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(skill.abbr, size / 2, size / 2);

  const texture = new THREE.CanvasTexture(canvas);
  texture.needsUpdate = true;
  return texture;
}

function loadSvgTexture(skill) {
  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const size = 256;
      const canvas = document.createElement('canvas');
      canvas.width = size;
      canvas.height = size;
      const ctx = canvas.getContext('2d');

      const pad = 20;
      const iconSize = size - pad * 2;
      ctx.drawImage(img, pad, pad, iconSize, iconSize);

      const texture = new THREE.CanvasTexture(canvas);
      texture.needsUpdate = true;
      resolve(texture);
    };
    img.onerror = () => resolve(createFallbackTexture(skill));
    img.src = `/skill-icons/${skill.file}`;
  });
}

function SkillIcon({ position, skill, texture }) {
  const [hovered, setHovered] = useState(false);
  const meshRef = useRef();
  const targetScale = useRef(new THREE.Vector3(1, 1, 1));

  useFrame(() => {
    if (meshRef.current) {
      targetScale.current.setScalar(hovered ? 1.35 : 1);
      meshRef.current.scale.lerp(targetScale.current, 0.12);
    }
  });

  return (
    <Billboard position={position}>
      <group ref={meshRef}>
        {/* Icon */}
        <mesh
          onPointerOver={() => setHovered(true)}
          onPointerOut={() => setHovered(false)}
        >
          <planeGeometry args={[1.1, 1.1]} />
          <meshBasicMaterial map={texture} transparent opacity={1} />
        </mesh>

        {/* Name label on hover */}
        {hovered && (
          <Html center position={[0, -0.85, 0]} style={{ pointerEvents: 'none' }}>
            <div
              style={{
                background: 'rgba(255,183,197,0.95)',
                color: '#4A3728',
                padding: '3px 10px',
                borderRadius: '12px',
                fontSize: '12px',
                fontWeight: 600,
                fontFamily: 'Poppins, sans-serif',
                whiteSpace: 'nowrap',
                boxShadow: '0 2px 8px rgba(74,55,40,0.15)',
              }}
            >
              {skill.name}
            </div>
          </Html>
        )}
      </group>
    </Billboard>
  );
}

function WireframeGlobe({ radius }) {
  const ref = useRef();
  useFrame(() => {
    if (ref.current) ref.current.rotation.y += 0.0008;
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[radius, 24, 16]} />
      <meshBasicMaterial
        color="#FFB7C5"
        wireframe
        transparent
        opacity={0.08}
      />
    </mesh>
  );
}

function GlobeSphere({ dragRotation, textures }) {
  const groupRef = useRef();

  const positions = useMemo(() => {
    const N = SKILL_ICONS.length;
    const R = 3.8;
    return SKILL_ICONS.map((_, i) => {
      const phi = Math.acos(1 - (2 * (i + 0.5)) / N);
      const theta = Math.PI * (1 + Math.sqrt(5)) * i;
      return [
        R * Math.sin(phi) * Math.cos(theta),
        R * Math.sin(phi) * Math.sin(theta),
        R * Math.cos(phi),
      ];
    });
  }, []);

  const autoRotationRef = useRef(0);

  useFrame(() => {
    if (groupRef.current) {
      if (!dragRotation.isDragging) {
        autoRotationRef.current += 0.003;
      }
      groupRef.current.rotation.y = autoRotationRef.current + dragRotation.y;
      groupRef.current.rotation.x = dragRotation.x;
    }
  });

  return (
    <>
      <WireframeGlobe radius={4.2} />
      <group ref={groupRef}>
        {SKILL_ICONS.map((skill, i) => (
          <SkillIcon
            key={skill.name}
            position={positions[i]}
            skill={skill}
            texture={textures[i]}
          />
        ))}
      </group>
    </>
  );
}

function FallbackGlobe() {
  return (
    <div className="flex flex-wrap justify-center gap-3 max-w-lg mx-auto py-8">
      {SKILL_ICONS.map((skill) => (
        <div
          key={skill.name}
          className="flex items-center gap-2 px-3 py-2 rounded-full glass-card text-sm font-body text-warm-brown"
        >
          <img src={`/skill-icons/${skill.file}`} alt={skill.name} className="w-5 h-5" />
          {skill.name}
        </div>
      ))}
    </div>
  );
}

function GlobeCanvas({ dragRotation, textures }) {
  return (
    <Canvas camera={{ position: [0, 0, 9.5], fov: 50 }} dpr={[1, 1.5]}>
      <AdaptiveDpr pixelated />
      <ambientLight intensity={1} />
      <pointLight position={[10, 10, 10]} intensity={0.4} />
      <GlobeSphere dragRotation={dragRotation} textures={textures} />
    </Canvas>
  );
}

const SkillsGlobe = ({ mouseX = 0, capability = 'high' }) => {
  const [hasInteracted, setHasInteracted] = useState(false);
  const [textures, setTextures] = useState(null);
  const isDragging = useRef(false);
  const previousPointer = useRef({ x: 0, y: 0 });
  const dragRotation = useRef({ x: 0, y: 0, isDragging: false });
  const resumeTimerRef = useRef(null);

  useEffect(() => {
    Promise.all(SKILL_ICONS.map((skill) => loadSvgTexture(skill))).then(setTextures);
  }, []);

  const handlePointerDown = useCallback((e) => {
    isDragging.current = true;
    dragRotation.current.isDragging = true;
    previousPointer.current = { x: e.clientX, y: e.clientY };
    if (!hasInteracted) setHasInteracted(true);
    if (resumeTimerRef.current) {
      clearTimeout(resumeTimerRef.current);
      resumeTimerRef.current = null;
    }
  }, [hasInteracted]);

  const handlePointerMove = useCallback((e) => {
    if (!isDragging.current) return;
    const deltaX = e.clientX - previousPointer.current.x;
    const deltaY = e.clientY - previousPointer.current.y;
    dragRotation.current.y += deltaX * 0.005;
    dragRotation.current.x += deltaY * 0.005;
    dragRotation.current.x = Math.max(-Math.PI / 3, Math.min(Math.PI / 3, dragRotation.current.x));
    previousPointer.current = { x: e.clientX, y: e.clientY };
  }, []);

  const handlePointerUp = useCallback(() => {
    isDragging.current = false;
    resumeTimerRef.current = setTimeout(() => {
      dragRotation.current.isDragging = false;
    }, 2000);
  }, []);

  if (capability === 'low') return <FallbackGlobe />;

  return (
    <div className="flex flex-col items-center">
      <div
        style={{
          width: '75vw',
          maxWidth: '950px',
          height: '55vh',
          minHeight: '450px',
          cursor: isDragging.current ? 'grabbing' : 'grab',
          touchAction: 'none',
        }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
      >
        {textures ? (
          <GlobeCanvas dragRotation={dragRotation.current} textures={textures} />
        ) : (
          <div className="flex items-center justify-center h-full">
            <div className="w-8 h-8 border-2 border-sakura-300 border-t-transparent rounded-full animate-spin" />
          </div>
        )}
      </div>
      <p
        className="font-handwriting text-warm-light/60 text-sm mt-1 select-none pointer-events-none"
        style={{
          opacity: hasInteracted ? 0 : 0.7,
          transition: 'opacity 1s ease',
        }}
      >
        drag to explore
      </p>
    </div>
  );
};

export default SkillsGlobe;
