import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows, Float } from '@react-three/drei';
import PCModel from './PCModel';
import Particles from './Particles';

function Loader() {
  return (
    <mesh>
      <sphereGeometry args={[0.3, 16, 16]} />
      <meshStandardMaterial color="#7c3aed" wireframe />
    </mesh>
  );
}

export default function PCCanvas({ selections = {}, minimal = false }) {
  return (
    <Canvas
      shadows
      camera={{ position: [4, 1.8, 4.5], fov: 40 }}
      style={{ background: 'transparent' }}
      dpr={[1, 2]}
      gl={{ 
        antialias: true, 
        alpha: true,
        powerPreference: 'high-performance'
      }}
    >
      <Suspense fallback={null}>
        <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
          <PCModel selections={selections} />
        </Float>

        {!minimal && <Particles count={150} />}
        
        <Environment preset="night" blur={0.8} />
        
        {/* Studio Lighting */}
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2.5} castShadow />
        <pointLight position={[-10, 5, -10]} intensity={1.5} color="#7c3aed" />
        <pointLight position={[0, -5, 5]} intensity={0.8} color="#06b6d4" />
        
        <ContactShadows 
          position={[0, -1.2, 0]} 
          opacity={0.6} 
          scale={10} 
          blur={2.5} 
          far={4} 
        />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.5}
          enableDamping={true}
          dampingFactor={0.05}
          touchAction="none"
          maxPolarAngle={Math.PI / 1.7}
          minPolarAngle={Math.PI / 3}
          makeDefault
        />
      </Suspense>
    </Canvas>
  );
}
