import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function ButterflyMesh({ mouseX, mouseY }) {
  const groupRef = useRef();
  const leftWingTopRef = useRef();
  const leftWingBottomRef = useRef();
  const rightWingTopRef = useRef();
  const rightWingBottomRef = useRef();
  const currentPos = useRef(new THREE.Vector3(0, 0, 0));
  const velocity = useRef(new THREE.Vector2(0, 0));
  const idleTime = useRef(0);
  const lastMouse = useRef({ x: 0, y: 0 });

  const wingShape = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(0, 0);
    shape.bezierCurveTo(0.15, 0.3, 0.5, 0.6, 0.7, 0.9);
    shape.bezierCurveTo(0.8, 1.1, 0.65, 1.3, 0.45, 1.35);
    shape.bezierCurveTo(0.25, 1.3, 0.1, 1.1, 0.05, 0.85);
    shape.bezierCurveTo(0.02, 0.55, -0.02, 0.3, 0, 0);
    return shape;
  }, []);

  const lowerWingShape = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(0, 0);
    shape.bezierCurveTo(0.15, -0.15, 0.4, -0.35, 0.5, -0.55);
    shape.bezierCurveTo(0.55, -0.7, 0.45, -0.8, 0.3, -0.75);
    shape.bezierCurveTo(0.15, -0.65, 0.05, -0.4, 0, 0);
    return shape;
  }, []);

  const wingPatternShape = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(0.15, 0.4);
    shape.bezierCurveTo(0.25, 0.55, 0.4, 0.7, 0.45, 0.85);
    shape.bezierCurveTo(0.35, 0.75, 0.2, 0.6, 0.15, 0.4);
    return shape;
  }, []);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const targetX = mouseX * 5;
    const targetY = mouseY * 3;

    const mouseMoved =
      Math.abs(mouseX - lastMouse.current.x) > 0.001 ||
      Math.abs(mouseY - lastMouse.current.y) > 0.001;

    if (mouseMoved) {
      idleTime.current = 0;
      lastMouse.current = { x: mouseX, y: mouseY };
    } else {
      idleTime.current += 0.016;
    }

    let finalX = targetX;
    let finalY = targetY;

    if (idleTime.current > 2) {
      const idleFactor = Math.min((idleTime.current - 2) * 0.5, 1);
      const r = 1.2;
      finalX = targetX + Math.cos(t * 0.4) * r * idleFactor;
      finalY = targetY + Math.sin(t * 0.3) * r * 0.7 * idleFactor + Math.sin(t * 0.7) * 0.2 * idleFactor;
    }

    const prevX = currentPos.current.x;
    const prevY = currentPos.current.y;
    currentPos.current.x += (finalX - currentPos.current.x) * 0.06;
    currentPos.current.y += (finalY - currentPos.current.y) * 0.06;
    velocity.current.set(currentPos.current.x - prevX, currentPos.current.y - prevY);

    if (groupRef.current) {
      groupRef.current.position.set(currentPos.current.x, currentPos.current.y, 0);
      const tilt = velocity.current.x * 0.4;
      const bank = Math.sin(t * 0.25) * 0.08;
      groupRef.current.rotation.z = THREE.MathUtils.lerp(groupRef.current.rotation.z, tilt, 0.1);
      groupRef.current.rotation.x = bank;
    }

    const isIdle = idleTime.current > 2;
    const flapSpeed = isIdle ? 5 : 8;
    const flapAmount = isIdle ? 0.35 : 0.55;
    const flap = Math.sin(t * flapSpeed) * flapAmount;

    if (leftWingTopRef.current) leftWingTopRef.current.rotation.y = flap;
    if (rightWingTopRef.current) rightWingTopRef.current.rotation.y = -flap;
    if (leftWingBottomRef.current) leftWingBottomRef.current.rotation.y = flap * 0.75;
    if (rightWingBottomRef.current) rightWingBottomRef.current.rotation.y = -flap * 0.75;
  });

  return (
    <group ref={groupRef} scale={0.4}>
      {/* Body */}
      <mesh>
        <cylinderGeometry args={[0.025, 0.018, 0.45, 8]} />
        <meshStandardMaterial color="#4A3040" />
      </mesh>
      {/* Head */}
      <mesh position={[0, 0.28, 0]}>
        <sphereGeometry args={[0.04, 10, 10]} />
        <meshStandardMaterial color="#4A3040" />
      </mesh>
      {/* Antennae */}
      <mesh position={[0.025, 0.35, 0]} rotation={[0.2, 0, 0.35]}>
        <cylinderGeometry args={[0.003, 0.003, 0.22, 4]} />
        <meshStandardMaterial color="#4A3040" />
      </mesh>
      <mesh position={[-0.025, 0.35, 0]} rotation={[0.2, 0, -0.35]}>
        <cylinderGeometry args={[0.003, 0.003, 0.22, 4]} />
        <meshStandardMaterial color="#4A3040" />
      </mesh>
      {/* Antenna tips */}
      <mesh position={[0.065, 0.46, 0.02]}>
        <sphereGeometry args={[0.012, 6, 6]} />
        <meshStandardMaterial color="#FFD1DC" />
      </mesh>
      <mesh position={[-0.065, 0.46, 0.02]}>
        <sphereGeometry args={[0.012, 6, 6]} />
        <meshStandardMaterial color="#FFD1DC" />
      </mesh>

      {/* Upper wings */}
      <group ref={leftWingTopRef} position={[0.015, 0.08, 0]}>
        <mesh>
          <shapeGeometry args={[wingShape]} />
          <meshStandardMaterial color="#FFD1DC" transparent opacity={0.82} side={THREE.DoubleSide} />
        </mesh>
        <mesh position={[0, 0, 0.001]}>
          <shapeGeometry args={[wingPatternShape]} />
          <meshStandardMaterial color="#FFB7C5" transparent opacity={0.5} side={THREE.DoubleSide} />
        </mesh>
      </group>
      <group ref={rightWingTopRef} position={[-0.015, 0.08, 0]} scale={[-1, 1, 1]}>
        <mesh>
          <shapeGeometry args={[wingShape]} />
          <meshStandardMaterial color="#E8D5F5" transparent opacity={0.82} side={THREE.DoubleSide} />
        </mesh>
        <mesh position={[0, 0, 0.001]}>
          <shapeGeometry args={[wingPatternShape]} />
          <meshStandardMaterial color="#C9A0DC" transparent opacity={0.5} side={THREE.DoubleSide} />
        </mesh>
      </group>

      {/* Lower wings */}
      <group ref={leftWingBottomRef} position={[0.015, -0.02, 0]}>
        <mesh>
          <shapeGeometry args={[lowerWingShape]} />
          <meshStandardMaterial color="#FFE0E8" transparent opacity={0.72} side={THREE.DoubleSide} />
        </mesh>
      </group>
      <group ref={rightWingBottomRef} position={[-0.015, -0.02, 0]} scale={[-1, 1, 1]}>
        <mesh>
          <shapeGeometry args={[lowerWingShape]} />
          <meshStandardMaterial color="#D4C0E8" transparent opacity={0.72} side={THREE.DoubleSide} />
        </mesh>
      </group>
    </group>
  );
}

const noEvents = () => ({
  compute: () => {},
  connected: false,
});

const ButterflyFollower = ({ mouseX = 0, mouseY = 0 }) => {
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 40,
        pointerEvents: 'none',
      }}
    >
      <Canvas
        orthographic
        camera={{ zoom: 80, position: [0, 0, 10] }}
        events={noEvents}
        style={{ pointerEvents: 'none' }}
      >
        <ambientLight intensity={1.2} />
        <directionalLight position={[5, 5, 5]} intensity={0.4} />
        <ButterflyMesh mouseX={mouseX} mouseY={mouseY} />
      </Canvas>
    </div>
  );
};

export default ButterflyFollower;
