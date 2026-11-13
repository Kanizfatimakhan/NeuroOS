import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';
import useOsStore from '../store/osStore';

const NeuralNetwork = ({ isLight }) => {
  const pointsRef = useRef();
  
  const particlesCount = 300;
  
  const positions = useMemo(() => {
    const pos = new Float32Array(particlesCount * 3);
    for (let i = 0; i < particlesCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10;
    }
    return pos;
  }, []);

  useFrame((state, delta) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.x -= delta / 30;
      pointsRef.current.rotation.y -= delta / 40;
    }
  });

  return (
    <group>
      <Points ref={pointsRef} positions={positions} stride={3} frustumCulled={false}>
        <PointMaterial 
          transparent 
          color={isLight ? "#0284c7" : "#00f3ff"} 
          size={isLight ? 0.08 : 0.05} 
          sizeAttenuation={true} 
          depthWrite={false} 
          blending={isLight ? THREE.NormalBlending : THREE.AdditiveBlending}
        />
      </Points>
    </group>
  );
};

const DesktopBackground = () => {
  const theme = useOsStore(state => state.theme);
  const isLight = theme === 'vision-light';

  return (
    <div className={`absolute inset-0 z-0 pointer-events-none transition-colors duration-500 ${
      isLight ? 'bg-slate-100' : 'bg-bg-dark'
    }`}>
      {isLight ? (
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(14,165,233,0.15),_transparent_50%),radial-gradient(circle_at_bottom_left,_rgba(168,85,247,0.12),_transparent_50%)]"></div>
      ) : (
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-neon-purple/20 via-black to-black opacity-80 mix-blend-screen"></div>
      )}
      <Canvas camera={{ position: [0, 0, 8] }}>
        <NeuralNetwork isLight={isLight} />
      </Canvas>
    </div>
  );
};

export default DesktopBackground;
