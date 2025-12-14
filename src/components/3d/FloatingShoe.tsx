import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Float, Text3D, Center } from '@react-three/drei';
import * as THREE from 'three';

function ShoeModel() {
  const meshRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });

  return (
    <Float
      speed={2}
      rotationIntensity={0.5}
      floatIntensity={1}
    >
      <group ref={meshRef}>
        {/* Shoe sole */}
        <mesh position={[0, -0.3, 0]}>
          <boxGeometry args={[2.5, 0.3, 1]} />
          <meshStandardMaterial color="#1a1a1a" />
        </mesh>
        
        {/* Shoe upper back */}
        <mesh position={[0.5, 0.1, 0]}>
          <boxGeometry args={[1.5, 0.6, 0.9]} />
          <meshStandardMaterial color="#f5f5f5" />
        </mesh>
        
        {/* Shoe upper front */}
        <mesh position={[-0.7, 0, 0]}>
          <boxGeometry args={[1, 0.4, 0.85]} />
          <meshStandardMaterial color="#f5f5f5" />
        </mesh>
        
        {/* Toe cap */}
        <mesh position={[-1.1, -0.1, 0]} rotation={[0, 0, -0.2]}>
          <boxGeometry args={[0.5, 0.35, 0.8]} />
          <meshStandardMaterial color="#e0e0e0" />
        </mesh>
        
        {/* Accent stripe */}
        <mesh position={[0, 0.15, 0.46]}>
          <boxGeometry args={[2.2, 0.15, 0.02]} />
          <meshStandardMaterial color="#ff4500" />
        </mesh>
        <mesh position={[0, 0.15, -0.46]}>
          <boxGeometry args={[2.2, 0.15, 0.02]} />
          <meshStandardMaterial color="#ff4500" />
        </mesh>
        
        {/* Heel tab */}
        <mesh position={[1.15, 0.35, 0]}>
          <boxGeometry args={[0.2, 0.4, 0.5]} />
          <meshStandardMaterial color="#ff4500" />
        </mesh>
      </group>
    </Float>
  );
}

export function FloatingShoe({ className }: { className?: string }) {
  return (
    <div className={className}>
      <Canvas
        camera={{ position: [4, 2, 4], fov: 45 }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <directionalLight position={[-10, -10, -5]} intensity={0.3} />
        <pointLight position={[0, 5, 0]} intensity={0.5} color="#ff4500" />
        
        <ShoeModel />
        
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={1}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 3}
        />
      </Canvas>
    </div>
  );
}
