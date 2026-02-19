import React, { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, Float, Html } from '@react-three/drei';
import * as THREE from 'three';
import { useTheme } from '../context/ThemeContext';

const Building = ({ position, height, color, delay, isDark }: { position: [number, number, number], height: number, color: string, delay: number, isDark: boolean }) => {
  const mesh = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (mesh.current) {
      // Reduce animation frequency or complexity
      mesh.current.scale.y = 1 + Math.sin(state.clock.elapsedTime + delay) * 0.05;
    }
  });

  return (
    <mesh ref={mesh} position={[position[0], height / 2, position[2]]} castShadow receiveShadow>
      <boxGeometry args={[1, height, 1]} />
      <meshStandardMaterial 
        color={color} 
        roughness={isDark ? 0.2 : 0.5} 
        metalness={isDark ? 0.8 : 0.1}
        transparent
        opacity={isDark ? 0.9 : 1}
      />
      <lineSegments>
        <edgesGeometry args={[new THREE.BoxGeometry(1, height, 1)]} />
        <lineBasicMaterial color={isDark ? "#ffffff" : "#94a3b8"} opacity={isDark ? 0.3 : 0.5} transparent />
      </lineSegments>
    </mesh>
  );
};

const DataPin = ({ position, label, value, isDark }: { position: [number, number, number], label: string, value: string, isDark: boolean }) => {
  const [hovered, setHovered] = useState(false);
  
  return (
    <group position={[position[0], position[1], position[2]]}>
      <Float speed={2} rotationIntensity={0} floatIntensity={0.5}>
        <mesh 
          onPointerOver={() => setHovered(true)} 
          onPointerOut={() => setHovered(false)}
        >
          <coneGeometry args={[0.3, 0.8, 4]} />
          <meshStandardMaterial 
            color={hovered ? "#DF5A14" : (isDark ? "#DF5A14" : "#DF5A14")} 
            emissive={hovered ? "#DF5A14" : (isDark ? "#DF5A14" : "#DF5A14")} 
            emissiveIntensity={isDark ? 2 : 1} 
          />
        </mesh>
      </Float>
      
      <Html distanceFactor={10} position={[0, 1.5, 0]} style={{ pointerEvents: 'none' }}>
        <div className={`
          ${isDark ? 'bg-mosk-dark/90 border-mosk-grey' : 'bg-white/90 border-slate-200'} 
          backdrop-blur-md border p-3 rounded-xl shadow-xl min-w-[140px] 
          transition-all duration-300 ${hovered ? 'opacity-100 scale-110' : 'opacity-80 scale-100'}
        `}>
          <div className={`text-[10px] font-bold uppercase tracking-wider mb-1 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{label}</div>
          <div className={`text-sm font-bold font-mono ${isDark ? 'text-white' : 'text-slate-800'}`}>{value}</div>
        </div>
      </Html>
      
      {/* Pin Line */}
      <mesh position={[0, -2, 0]}>
        <cylinderGeometry args={[0.02, 0.02, 4]} />
        <meshBasicMaterial color={isDark ? "#ffffff" : "#000000"} opacity={0.2} transparent />
      </mesh>
    </group>
  );
};

const DataStream = ({ isDark }: { isDark: boolean }) => {
  const points = useMemo(() => {
    const p = [];
    for (let i = 0; i < 30; i++) {
      const x = (Math.random() - 0.5) * 30;
      const y = Math.random() * 15;
      const z = (Math.random() - 0.5) * 30;
      p.push(new THREE.Vector3(x, y, z));
    }
    return p;
  }, []);

  const ref = useRef<THREE.Points>(null);

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.elapsedTime * 0.05;
    }
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={points.length}
          array={new Float32Array(points.flatMap(v => [v.x, v.y, v.z]))}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial 
        size={isDark ? 0.15 : 0.2} 
        color={isDark ? "#DF5A14" : "#DF5A14"} 
        transparent 
        opacity={isDark ? 0.6 : 0.8} 
        sizeAttenuation 
      />
    </points>
  );
};

const CityMap = ({ isDark }: { isDark: boolean }) => {
  const buildings = useMemo(() => {
    const items = [];
    const gridSize = 5; // Reduced from 8 to 5 for performance
    for (let x = -gridSize; x <= gridSize; x++) {
      for (let z = -gridSize; z <= gridSize; z++) {
        if (Math.random() > 0.65) {
          const height = Math.random() * 4 + 0.5;
          const isSpecial = Math.random() > 0.92;
          // Colors: Dark mode (Orange/Dark) vs Light mode (White/Grey)
          const color = isDark 
            ? (isSpecial ? "#DF5A14" : "#1A1A1A") 
            : (isSpecial ? "#DF5A14" : "#ffffff");
          
          items.push({ x: x * 1.5, z: z * 1.5, height, color, delay: Math.random() * Math.PI });
        }
      }
    }
    return items;
  }, [isDark]);

  return (
    <group rotation={[0, Math.PI / 4, 0]}>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.1, 0]} receiveShadow>
        <planeGeometry args={[60, 60]} />
        <meshStandardMaterial color={isDark ? "#0A0A0A" : "#f8fafc"} roughness={0.5} metalness={0.2} />
      </mesh>
      
      {/* Grid Helper - Subtler in Light Mode */}
      <gridHelper args={[60, 60, isDark ? 0x7F7F7F : 0xcbd5e1, isDark ? 0x333333 : 0xe2e8f0]} rotation={[-Math.PI/2, 0, 0]} position={[0, 0.01, 0]} />

      {buildings.map((b, i) => (
        <Building 
          key={i} 
          position={[b.x, 0, b.z]} 
          height={b.height} 
          color={b.color}
          delay={b.delay}
          isDark={isDark}
        />
      ))}
      
      <DataPin position={[5, 4, 2]} label="Enerji" value="450 kWh" isDark={isDark} />
      <DataPin position={[-4, 3, -4]} label="Trafik" value="Yüksek" isDark={isDark} />
      <DataPin position={[2, 5, -6]} label="Hava" value="AQI 42" isDark={isDark} />
      
      <DataStream isDark={isDark} />
    </group>
  );
};

export const CityScene = () => {
  const { isDark } = useTheme();

  // Performance: Only render when visible/needed or reduce complexity
  // We can use frameloop="demand" in Canvas if we wanted, but that stops animations.
  // Instead, let's optimize the geometry and materials.
  
  return (
    <div className="w-full h-full transition-colors duration-700 cursor-grab active:cursor-grabbing">
      <Canvas 
        shadows={false} // Performance: Disable shadows for better performance
        dpr={[1, 1.5]} // Performance: Cap pixel ratio
        camera={{ position: [15, 12, 15], fov: 35 }}
      >
        <fog attach="fog" args={[isDark ? '#1A1A1A' : '#f8fafc', 15, 60]} />
        
        <ambientLight intensity={isDark ? 0.5 : 0.8} />
        <pointLight position={[10, 10, 10]} intensity={1} castShadow />
        
        <spotLight 
          position={[-20, 20, -10]} 
          angle={0.4} 
          penumbra={1} 
          intensity={isDark ? 2 : 1} 
          color={isDark ? "#DF5A14" : "#DF5A14"} 
        />
        
        <Float speed={1} rotationIntensity={0.1} floatIntensity={0.2}>
          <CityMap isDark={isDark} />
        </Float>

        <Environment preset={isDark ? "night" : "city"} />
        <OrbitControls 
          enableZoom={false} 
          autoRotate 
          autoRotateSpeed={0.5} 
          maxPolarAngle={Math.PI / 2.2}
        />
      </Canvas>
    </div>
  );
};
