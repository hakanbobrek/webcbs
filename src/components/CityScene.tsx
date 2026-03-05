import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Environment, Float, Html, Instances, Instance, PerformanceMonitor } from '@react-three/drei';
import * as THREE from 'three';
import { useTheme } from '../context/ThemeContext';

// --- SHARED RESOURCES (Geometries & Materials) ---
// Define these outside to ensure they are created once and reused.
// Drastically reduces GPU memory overhead and draw calls.

const BOX_GEO = new THREE.BoxGeometry(1, 1, 1);
const CYLINDER_GEO = new THREE.CylinderGeometry(1, 1, 1, 8); // Low poly cylinder
const PLANE_GEO = new THREE.PlaneGeometry(1, 1);
const SPHERE_GEO = new THREE.SphereGeometry(1, 16, 16);

// Shared Materials
const ROAD_MAT = new THREE.MeshStandardMaterial({ color: "#1e293b", roughness: 0.9 });
const ROAD_MARKING_MAT = new THREE.MeshBasicMaterial({ color: "#ffffff", opacity: 0.5, transparent: true });
const POLE_MAT = new THREE.MeshStandardMaterial({ color: "#374151" });
const LIGHT_HEAD_MAT = new THREE.MeshStandardMaterial({ color: "#4b5563" });
const LIGHT_BULB_MAT = new THREE.MeshBasicMaterial({ color: "#fbbf24" }); // Emissive look without actual light cost
const TRASH_BIN_MAT = new THREE.MeshStandardMaterial({ color: "#10b981", metalness: 0.1, roughness: 0.8 });

// --- INSTANCED COMPONENTS ---

const Buildings = ({ data, isDark }: { data: any[], isDark: boolean }) => {
  const material = useMemo(() => new THREE.MeshStandardMaterial({ 
    roughness: 0.2, 
    metalness: 0.8 
  }), []);

  return (
    <Instances range={data.length} geometry={BOX_GEO} material={material}>
      {data.map((b, i) => (
        <BuildingInstance key={i} {...b} isDark={isDark} />
      ))}
    </Instances>
  );
};

const BuildingInstance = ({ x, z, height, color, delay }: any) => {
  const ref = useRef<any>(null);
  
  useFrame((state) => {
    // Throttled animation: Only update if necessary or use a simpler math
    // To save CPU, we can disable this animation on low-end devices if needed
    if (ref.current) {
       const t = state.clock.elapsedTime + delay;
       // Very subtle movement, optimized math
       const scaleY = height * (1 + Math.sin(t) * 0.02);
       ref.current.scale.y = scaleY;
       ref.current.position.y = scaleY / 2;
    }
  });

  return (
    <Instance
      ref={ref}
      position={[x, height / 2, z]}
      scale={[1, height, 1]}
      color={color}
    />
  );
};

const StreetLights = ({ positions }: { positions: [number, number, number][] }) => {
  // We use multiple Instances components for different parts of the street light
  // This is much more performant than rendering full groups for each light
  return (
    <group>
      {/* Poles */}
      <Instances range={positions.length} geometry={CYLINDER_GEO} material={POLE_MAT}>
        {positions.map((pos, i) => (
          <Instance key={`pole-${i}`} position={[pos[0], 1, pos[2]]} scale={[0.03, 2, 0.03]} />
        ))}
      </Instances>
      
      {/* Arms */}
      <Instances range={positions.length} geometry={BOX_GEO} material={POLE_MAT}>
        {positions.map((pos, i) => (
          <Instance 
            key={`arm-${i}`} 
            position={[pos[0] + 0.2, 1.9, pos[2]]} 
            rotation={[0, 0, -Math.PI / 4]} 
            scale={[0.04, 0.6, 0.04]} 
          />
        ))}
      </Instances>

      {/* Heads */}
      <Instances range={positions.length} geometry={BOX_GEO} material={LIGHT_HEAD_MAT}>
        {positions.map((pos, i) => (
          <Instance 
            key={`head-${i}`} 
            position={[pos[0] + 0.4, 2.1, pos[2]]} 
            scale={[0.2, 0.05, 0.1]} 
          />
        ))}
      </Instances>

      {/* Bulbs (Emissive, no real light) */}
      <Instances range={positions.length} geometry={BOX_GEO} material={LIGHT_BULB_MAT}>
        {positions.map((pos, i) => (
          <Instance 
            key={`bulb-${i}`} 
            position={[pos[0] + 0.4, 2.05, pos[2]]} 
            scale={[0.15, 0.02, 0.08]} 
          />
        ))}
      </Instances>
    </group>
  );
};

const Roads = ({ roads }: { roads: { pos: [number, number, number], rot: [number, number, number], len: number }[] }) => {
  return (
    <group>
      {/* Asphalt Surfaces */}
      <Instances range={roads.length} geometry={PLANE_GEO} material={ROAD_MAT}>
        {roads.map((road, i) => (
          <Instance 
            key={`road-${i}`} 
            position={road.pos} 
            rotation={[-Math.PI / 2, 0, road.rot[1]]} 
            scale={[1.2, road.len, 1]} 
          />
        ))}
      </Instances>
    </group>
  );
};

// Car component remains individual as it animates position significantly
// But we optimize its geometry
const Car = ({ position, axis, speed, range, color }: { position: [number, number, number], axis: 'x' | 'z', speed: number, range: number, color: string }) => {
  const mesh = useRef<THREE.Group>(null);
  const offset = useMemo(() => Math.random() * 100, []);

  useFrame((state) => {
    if (mesh.current) {
      const time = state.clock.elapsedTime * speed + offset;
      const pos = (time % (range * 2)) - range;
      
      if (axis === 'x') {
        mesh.current.position.x = pos;
        mesh.current.rotation.y = speed > 0 ? 0 : Math.PI;
      } else {
        mesh.current.position.z = pos;
        mesh.current.rotation.y = speed > 0 ? -Math.PI / 2 : Math.PI / 2;
      }
    }
  });

  return (
    <group ref={mesh} position={[position[0], 0.15, position[2]]}>
      <mesh geometry={BOX_GEO} material={new THREE.MeshStandardMaterial({ color, metalness: 0.6, roughness: 0.4 })} scale={[0.6, 0.2, 0.3]} />
      <mesh position={[0, 0.15, 0]} geometry={BOX_GEO} material={new THREE.MeshStandardMaterial({ color: "#333" })} scale={[0.3, 0.15, 0.25]} />
      {/* Simple headlights using basic material planes */}
      <mesh position={[0.31, 0, 0]} rotation={[0, Math.PI/2, 0]} geometry={PLANE_GEO} material={new THREE.MeshBasicMaterial({ color: "#fff" })} scale={[0.2, 0.05, 1]} />
      <mesh position={[-0.31, 0, 0]} rotation={[0, -Math.PI/2, 0]} geometry={PLANE_GEO} material={new THREE.MeshBasicMaterial({ color: "#f00" })} scale={[0.2, 0.05, 1]} />
    </group>
  );
};

const DataPin = ({ position, label, value, isDark }: { position: [number, number, number], label: string, value: string, isDark: boolean }) => {
  const [hovered, setHovered] = useState(false);
  
  // Only render HTML if visible or close? For now keep as is but optimize geometry
  return (
    <group position={[position[0], position[1], position[2]]}>
      <Float speed={2} rotationIntensity={0} floatIntensity={0.5}>
        <mesh 
          onPointerOver={() => setHovered(true)} 
          onPointerOut={() => setHovered(false)}
          geometry={SPHERE_GEO}
          scale={[0.3, 0.3, 0.3]}
        >
          <meshStandardMaterial 
            color={hovered ? "#ea580c" : "#DF5A14"} 
            emissive={hovered ? "#ea580c" : "#DF5A14"} 
            emissiveIntensity={1.5} 
          />
        </mesh>
        <mesh position={[0, -0.4, 0]} rotation={[Math.PI, 0, 0]} geometry={CYLINDER_GEO} scale={[0.1, 0.6, 0.1]}>
           <meshStandardMaterial color="#DF5A14" />
        </mesh>
      </Float>
      
      <Html distanceFactor={15} position={[0, 1.2, 0]} style={{ pointerEvents: 'none', userSelect: 'none' }}>
        <div className={`
          ${isDark ? 'bg-mosk-dark/90 border-mosk-grey text-white' : 'bg-white/95 border-slate-200 text-slate-800'} 
          backdrop-blur-md border p-2 rounded-lg shadow-xl min-w-[140px] transform -translate-x-1/2 -translate-y-full
          transition-all duration-300 ${hovered ? 'opacity-100 scale-110' : 'opacity-80 scale-100'}
        `}>
          <div className="flex items-center gap-2 mb-1">
            <div className="w-1.5 h-1.5 rounded-full bg-mosk-orange"></div>
            <div className={`text-[9px] font-bold uppercase tracking-wider ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>{label}</div>
          </div>
          <div className="text-sm font-bold font-mono">{value}</div>
        </div>
      </Html>
    </group>
  );
};

const CityMap = ({ isDark }: { isDark: boolean }) => {
  // Pre-calculate all static data once
  const { buildings, roadData, streetLightPositions } = useMemo(() => {
    const b = [];
    const r = [];
    const sl: [number, number, number][] = [];
    
    // Roads
    r.push({ pos: [0, 0.02, 0] as [number, number, number], rot: [0, 0, 0] as [number, number, number], len: 20 });
    r.push({ pos: [7, 0.02, 0] as [number, number, number], rot: [0, 0, 0] as [number, number, number], len: 20 });
    r.push({ pos: [-7, 0.02, 0] as [number, number, number], rot: [0, 0, 0] as [number, number, number], len: 20 });
    r.push({ pos: [14, 0.02, 0] as [number, number, number], rot: [0, 0, 0] as [number, number, number], len: 20 });
    r.push({ pos: [-14, 0.02, 0] as [number, number, number], rot: [0, 0, 0] as [number, number, number], len: 20 });
    r.push({ pos: [0, 0.02, 0] as [number, number, number], rot: [0, Math.PI/2, 0] as [number, number, number], len: 35 });
    r.push({ pos: [0, 0.02, 7] as [number, number, number], rot: [0, Math.PI/2, 0] as [number, number, number], len: 35 });
    r.push({ pos: [0, 0.02, -7] as [number, number, number], rot: [0, Math.PI/2, 0] as [number, number, number], len: 35 });

    // Street Lights Positions (Manual for now to match previous scene, but array based)
    const slX = [1, -1, 6, 8, 13, 15];
    const slZ = [2, 6, -2, -6];
    
    slX.forEach(x => {
        slZ.forEach(z => {
            sl.push([x, 0, z]);
        });
    });

    // Buildings Grid
    for (let x = -10; x <= 10; x += 1.5) {
      for (let z = -6; z <= 6; z += 1.5) {
        const isRoadX = Math.abs(x) < 1 || Math.abs(Math.abs(x) - 7) < 1 || Math.abs(Math.abs(x) - 14) < 1;
        const isRoadZ = Math.abs(z) < 1 || Math.abs(z) > 6;
        
        if (!isRoadX && !isRoadZ) {
          if (Math.random() > 0.3) {
            const height = Math.random() * 3 + 1;
            const color = isDark 
              ? (Math.random() > 0.9 ? "#DF5A14" : "#1e293b") 
              : (Math.random() > 0.9 ? "#DF5A14" : "#e2e8f0");
            
            b.push({ x, z, height, color, delay: Math.random() * Math.PI });
          }
        }
      }
    }
    return { buildings: b, roadData: r, streetLightPositions: sl };
  }, [isDark]);

  const cars = useMemo(() => {
    return [
      { axis: 'z', pos: [0, 0, 0], speed: 2, color: '#ef4444' },
      { axis: 'z', pos: [0, 0, 5], speed: 2.5, color: '#3b82f6' },
      { axis: 'z', pos: [0, 0, -5], speed: 1.8, color: '#eab308' },
      { axis: 'z', pos: [14, 0, 0], speed: 2.2, color: '#10b981' },
      { axis: 'z', pos: [-14, 0, 0], speed: -2.2, color: '#8b5cf6' },
      { axis: 'x', pos: [0, 0, 0], speed: -2.2, color: '#ffffff', range: 20 },
      { axis: 'x', pos: [5, 0, 0], speed: -1.5, color: '#10b981', range: 20 },
      { axis: 'x', pos: [-5, 0, 0], speed: -2.8, color: '#8b5cf6', range: 20 },
      { axis: 'x', pos: [0, 0, 7], speed: 3, color: '#ef4444', range: 20 },
      { axis: 'x', pos: [0, 0, -7], speed: -3, color: '#3b82f6', range: 20 },
      { axis: 'z', pos: [7, 0, 0], speed: -2.5, color: '#eab308', range: 10 },
      { axis: 'z', pos: [-7, 0, 0], speed: 2.5, color: '#10b981', range: 10 },
    ];
  }, []);

  return (
    <group rotation={[0, Math.PI / 4, 0]}>
      {/* Base Plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.01, 0]} receiveShadow>
        <planeGeometry args={[60, 40]} />
        <meshStandardMaterial color={isDark ? "#0f172a" : "#f1f5f9"} roughness={0.8} />
      </mesh>
      
      <Roads roads={roadData} />
      <StreetLights positions={streetLightPositions} />
      <Buildings data={buildings} isDark={isDark} />

      {cars.map((car, i) => (
        <Car 
          key={i} 
          position={car.axis === 'z' ? [car.pos[0], 0, 0] : [0, 0, car.pos[2]]} 
          axis={car.axis as 'x' | 'z'} 
          speed={car.speed} 
          range={10}
          color={car.color}
        />
      ))}

      {/* Data Pins - Specific Stats */}
      <DataPin position={[3, 2.5, 3]} label="Toplam Yol Uzunluğu" value="2401.6 KM" isDark={isDark} />
      <DataPin position={[-3, 2, -3]} label="Kurum Taşınmazları" value="176 Adet" isDark={isDark} />
      <DataPin position={[5, 3, -5]} label="Önemli Noktalar" value="78 Adet" isDark={isDark} />
      <DataPin position={[-6, 1.5, 4]} label="Kaçak Yapı Sayısı" value="93 Adet" isDark={isDark} />
      <DataPin position={[0, 4, 0]} label="Ruhsatlı Yapı Sayısı" value="14652 Adet" isDark={isDark} />
    </group>
  );
};

const CityScene = () => {
  const { isDark } = useTheme();
  const [dpr, setDpr] = useState<[number, number]>([1, 1.5]); // Allow up to 1.5 for better quality
  const [frameloop, setFrameloop] = useState<'always' | 'demand' | 'never'>('always');
  const [isInView, setIsInView] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
        setFrameloop(entry.isIntersecting ? 'always' : 'never');
      },
      { threshold: 0 } // Trigger as soon as even 1 pixel leaves/enters
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, []);

  return (
    <div ref={containerRef} className="w-full h-full transition-colors duration-700 cursor-grab active:cursor-grabbing">
      {/* Only render canvas if somewhat in view or previously loaded to keep state */}
      <Canvas 
        dpr={dpr} 
        camera={{ position: [16, 12, 16], fov: 35 }}
        gl={{ 
          powerPreference: "high-performance", 
          antialias: true, // Re-enabled for better quality on Chrome
          depth: true,
          stencil: false,
          alpha: false // Opaque canvas is faster
        }}
        frameloop={frameloop}
        performance={{ min: 0.5 }}
      >
        <PerformanceMonitor 
          onIncline={() => setDpr([1, 2])} 
          onDecline={() => setDpr([0.5, 1])} 
          flipflops={3}
          onFallback={() => setDpr([0.5, 1])}
        />
        
        {/* Force white background to prevent black artifacts */}
        <color attach="background" args={['#f8fafc']} />
        
        <fog attach="fog" args={['#f8fafc', 10, 45]} />
        
        {/* Simplified Lighting */}
        <ambientLight intensity={0.8} />
        <directionalLight 
          position={[10, 20, 10]} 
          intensity={1.2} 
          castShadow={false} 
        />
        
        {/* Fake City Glow */}
        <pointLight position={[0, 5, 0]} intensity={1.5} color="#DF5A14" distance={20} decay={2} />

        {/* Only animate/render heavy stuff if in view */}
        {isInView && (
          <>
            <Float speed={0.5} rotationIntensity={0.05} floatIntensity={0.1}>
              <CityMap isDark={false} /> {/* Force light mode for map */}
            </Float>

            <Environment preset="city" scene={undefined} background={false} />
            <OrbitControls 
              enableZoom={false} 
              autoRotate 
              autoRotateSpeed={0.5} 
              maxPolarAngle={Math.PI / 2.5}
              minPolarAngle={Math.PI / 4}
              enableDamping={false} 
            />
          </>
        )}
      </Canvas>
    </div>
  );
};

export default CityScene;
