import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { RoundedBox, Text } from '@react-three/drei';
import * as THREE from 'three';

// ── Constants ──
const ACCENT_PURPLE = '#7c3aed';
const LIQUID_CYAN = '#06b6d4';
const CASE_BLACK = '#050505';
const METAL_DARK = '#111111';

// ── Components ──

function Fan({ position, rotation = [0, 0, 0], color = LIQUID_CYAN, size = 0.22 }) {
  const ref = useRef();
  useFrame((state) => {
    if (ref.current) ref.current.rotation.z = state.clock.getElapsedTime() * 12;
  });

  return (
    <group position={position} rotation={rotation}>
      {/* Frame */}
      <mesh>
        <torusGeometry args={[size, 0.015, 16, 32]} />
        <meshStandardMaterial color="#222" metalness={1} roughness={0.1} />
      </mesh>
      {/* Blades */}
      <group ref={ref}>
        {[0, 1, 2, 3, 4, 5, 6].map((i) => (
          <mesh key={i} rotation={[0, 0, (i * Math.PI * 2) / 7 ]}>
            <boxGeometry args={[size * 0.95, 0.05, 0.005]} />
            <meshStandardMaterial 
              color={color} 
              emissive={color} 
              emissiveIntensity={2} 
              transparent 
              opacity={0.6}
            />
          </mesh>
        ))}
      </group>
      {/* Hub */}
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.045, 0.045, 0.04, 16]} />
        <meshStandardMaterial color="#333" metalness={0.9} />
      </mesh>
    </group>
  );
}

function CoolingTube({ points, color = ACCENT_PURPLE }) {
  const curve = useMemo(() => new THREE.CatmullRomCurve3(points.map(p => new THREE.Vector3(...p))), [points]);
  const tubeRef = useRef();

  useFrame((state) => {
    if (tubeRef.current) {
      // Flowing glow effect
      const t = state.clock.getElapsedTime();
      tubeRef.current.material.emissiveIntensity = 1.2 + Math.sin(t * 3) * 0.5;
    }
  });

  return (
    <mesh ref={tubeRef}>
      <tubeGeometry args={[curve, 100, 0.022, 12, false]} />
      <meshStandardMaterial 
        color={color} 
        emissive={color} 
        emissiveIntensity={1} 
        transparent 
        opacity={0.65} 
        metalness={0.8} 
        roughness={0} 
      />
    </mesh>
  );
}

function Reservoir({ position, color = LIQUID_CYAN }) {
  const liquidRef = useRef();
  useFrame((state) => {
    if (liquidRef.current) {
      liquidRef.current.position.y = -0.05 + Math.sin(state.clock.getElapsedTime() * 1.5) * 0.01;
    }
  });

  return (
    <group position={position}>
      {/* Cylinder Glass */}
      <mesh>
        <cylinderGeometry args={[0.12, 0.12, 0.85, 32]} />
        <meshStandardMaterial 
          color="#ffffff" 
          transparent 
          opacity={0.15} 
          metalness={1} 
          roughness={0} 
        />
      </mesh>
      {/* Liquid */}
      <mesh ref={liquidRef} position={[0, -0.05, 0]}>
        <cylinderGeometry args={[0.11, 0.11, 0.68, 32]} />
        <meshStandardMaterial 
          color={color} 
          emissive={color} 
          emissiveIntensity={2.5} 
          transparent 
          opacity={0.85} 
        />
      </mesh>
      {/* Caps */}
      <mesh position={[0, 0.43, 0]}>
        <cylinderGeometry args={[0.13, 0.13, 0.08, 32]} />
        <meshStandardMaterial color="#000" metalness={0.9} />
      </mesh>
      <mesh position={[0, -0.43, 0]}>
        <cylinderGeometry args={[0.13, 0.13, 0.08, 32]} />
        <meshStandardMaterial color="#000" metalness={0.9} />
      </mesh>
    </group>
  );
}

export default function PCModel({ selections = {} }) {
  const groupRef = useRef();
  
  const cpuName = selections.cpu?.name || 'VENOM R1';
  const gpuName = selections.gpu?.name || 'RTX READY';

  return (
    <group ref={groupRef}>
      {/* ── MAIN CASE BODY ── */}
      <RoundedBox args={[1.35, 2.35, 1.15]} radius={0.03} smoothness={4}>
        <meshStandardMaterial color={CASE_BLACK} metalness={0.9} roughness={0.1} />
      </RoundedBox>

      {/* Internal volume shadow */}
      <mesh position={[0, 0.05, 0]}>
        <boxGeometry args={[1.25, 2.2, 1.05]} />
        <meshStandardMaterial color="#050505" side={THREE.BackSide} />
      </mesh>

      {/* Side Glass Panel */}
      <mesh position={[0.68, 0.05, 0]}>
        <boxGeometry args={[0.01, 2.05, 0.98]} />
        <meshStandardMaterial 
          color="#111" 
          metalness={0.2} 
          roughness={0} 
          transparent 
          opacity={0.35} 
        />
      </mesh>

      {/* Front Panel Group */}
      <group position={[0, 0, 0.58]}>
        {/* Frame */}
        <mesh>
          <boxGeometry args={[1.2, 2.15, 0.03]} />
          <meshStandardMaterial color="#080808" metalness={1} />
        </mesh>
        
        {/* Front Fans */}
        <Fan position={[0, 0.65, 0.03]} color={LIQUID_CYAN} size={0.25} />
        <Fan position={[0, 0, 0.03]} color={LIQUID_CYAN} size={0.25} />
        <Fan position={[0, -0.65, 0.03]} color={LIQUID_CYAN} size={0.25} />
        
        {/* Vertical RGB Strip */}
        <mesh position={[0.55, 0, 0.03]}>
          <boxGeometry args={[0.02, 1.8, 0.01]} />
          <meshStandardMaterial color={LIQUID_CYAN} emissive={LIQUID_CYAN} emissiveIntensity={2} />
        </mesh>

        {/* Branding LCD */}
        <group position={[0.35, 0.9, 0.035]}>
          <mesh>
            <planeGeometry args={[0.42, 0.18]} />
            <meshStandardMaterial color="#000" emissive={LIQUID_CYAN} emissiveIntensity={0.15} />
          </mesh>
          <Text
            position={[0, 0.03, 0.01]}
            fontSize={0.035}
            color={LIQUID_CYAN}
            letterSpacing={0.1}
          >
            {cpuName.split(' ')[0]}
          </Text>
          <Text
            position={[0, -0.04, 0.01]}
            fontSize={0.025}
            color="#ffffff"
            opacity={0.7}
            transparent
          >
            STABLE / 34°C
          </Text>
        </group>
      </group>

      {/* Top Exhaust */}
      <group position={[0, 1.18, 0]}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <planeGeometry args={[1.15, 0.9]} />
          <meshStandardMaterial color="#080808" />
        </mesh>
        <Fan position={[0.35, 0.02, 0]} rotation={[Math.PI / 2, 0, 0]} color={ACCENT_PURPLE} size={0.2} />
        <Fan position={[0, 0.02, 0]} rotation={[Math.PI / 2, 0, 0]} color={ACCENT_PURPLE} size={0.2} />
        <Fan position={[-0.35, 0.02, 0]} rotation={[Math.PI / 2, 0, 0]} color={ACCENT_PURPLE} size={0.2} />
      </group>

      {/* ── INTERNAL COMPONENTS ── */}
      
      {/* GPU with Water Block */}
      <group position={[0, -0.25, 0.05]}>
        <RoundedBox args={[1.05, 0.18, 0.65]} radius={0.02}>
          <meshStandardMaterial color={METAL_DARK} metalness={1} roughness={0.1} />
        </RoundedBox>
        <Text position={[0, 0.09, 0.33]} fontSize={0.06} color={LIQUID_CYAN}>
          {gpuName.substring(0, 12).toUpperCase()}
        </Text>
      </group>

      {/* CPU Block */}
      <mesh position={[-0.15, 0.55, -0.1]}>
        <boxGeometry args={[0.28, 0.28, 0.1]} />
        <meshStandardMaterial color="#000" emissive={LIQUID_CYAN} emissiveIntensity={1.2} />
      </mesh>

      {/* RAM Slots */}
      {[0.05, 0.1, 0.15, 0.2].map((x, i) => (
        <mesh key={i} position={[x, 0.65, -0.1]}>
          <boxGeometry args={[0.03, 0.48, 0.06]} />
          <meshStandardMaterial color={ACCENT_PURPLE} emissive={ACCENT_PURPLE} emissiveIntensity={1.5} />
        </mesh>
      ))}

      {/* Reservoir */}
      <Reservoir position={[0.42, 0.15, 0.25]} color={LIQUID_CYAN} />

      {/* ── LIQUID LOOPS (CatmullRom) ── */}
      <CoolingTube points={[[-0.15, 0.6, -0.1], [-0.15, 1.05, -0.1], [0.1, 1.15, -0.1]]} color={LIQUID_CYAN} />
      <CoolingTube points={[[0.42, 0.55, 0.25], [0.2, 0.55, 0.25], [-0.05, 0.55, -0.05]]} color={LIQUID_CYAN} />
      <CoolingTube points={[[0.3, -0.2, 0.25], [0.42, -0.2, 0.25], [0.42, -0.3, 0.25]]} color={LIQUID_CYAN} />

      {/* Motherboard Backplate */}
      <mesh position={[-0.52, 0.2, -0.15]}>
        <boxGeometry args={[0.04, 1.7, 0.95]} />
        <meshStandardMaterial color="#050505" metalness={0.5} />
      </mesh>

      {/* PSU Shroud */}
      <mesh position={[0, -0.98, 0]}>
        <boxGeometry args={[1.3, 0.38, 1.1]} />
        <meshStandardMaterial color="#030303" metalness={1} />
      </mesh>
    </group>
  );
}
