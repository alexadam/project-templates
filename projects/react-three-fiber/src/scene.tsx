import React from 'react'
import { Canvas } from '@react-three/fiber'
import Cube from './cube'
import { ContactShadows, MeshReflectorMaterial, OrbitControls } from '@react-three/drei'

const Scene3d = () => {

  // inspi https://codesandbox.io/embed/r3f-train-l900i

  return (
    <Canvas style={{ width: '100%', height: '100%' }}
      dpr={[1, 1.5]}
      shadows
      camera={{ position: [-15, 15, 18], fov: 35, near: 1, far: 1000 }}
      gl={{ antialias: true, alpha: false }}>

      <fog attach="fog" args={['#17171b', 30, 40]} />
      <color attach="background" args={['#17171b']} />

      <ambientLight intensity={0.25} />
      <directionalLight castShadow position={[10, 6, 6]} intensity={1} shadow-mapSize={[1024, 1024]} />
      <pointLight position={[10, 10, 10]} />
      <pointLight position={[-20, -20, -20]} intensity={0.65} />

      <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />

      <mesh position={[0, -0.75, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[150, 150]} />
        <MeshReflectorMaterial
          blur={[400, 100]}
          resolution={1024}
          mixBlur={1}
          mixStrength={3.5}
          depthScale={1}
          minDepthThreshold={0.85}
          color="#505050"
          metalness={0.6}
          roughness={1}
          mirror={0.17}
        />
      </mesh>

      <ContactShadows rotation={[Math.PI / 2, 0, 0]} position={[0, -7, 0]} opacity={0.75} width={40} height={40} blur={1} far={9} />

      <Cube position={[-1.2, 0, 0]} dimension={1} />
      <Cube position={[0.5, 0, 1]} dimension={1} />

    </Canvas>
  )
}
export default Scene3d