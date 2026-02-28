import React, { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Float } from '@react-three/drei'

function GoldParticles({ count = 80 }) {
  const mesh = useRef()
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 20
      pos[i * 3 + 1] = (Math.random() - 0.5) * 20
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10
    }
    return pos
  }, [count])

  useFrame((state) => {
    if (mesh.current) {
      mesh.current.rotation.y = state.clock.elapsedTime * 0.02
      mesh.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.01) * 0.1
    }
  })

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#FFD700"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  )
}

function FloatingShape({ position, geometry, speed = 1 }) {
  const meshRef = useRef()

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.15 * speed
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.1 * speed
    }
  })

  return (
    <Float speed={1.5 * speed} rotationIntensity={0.3} floatIntensity={0.8}>
      <mesh ref={meshRef} position={position}>
        {geometry}
        <meshBasicMaterial
          color="#FFD700"
          wireframe
          transparent
          opacity={0.12}
        />
      </mesh>
    </Float>
  )
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.2} />
      <GoldParticles count={60} />
      <FloatingShape
        position={[-4, 2, -3]}
        geometry={<icosahedronGeometry args={[1.5, 1]} />}
        speed={0.8}
      />
      <FloatingShape
        position={[4, -1.5, -4]}
        geometry={<torusGeometry args={[1.2, 0.4, 8, 16]} />}
        speed={0.6}
      />
      <FloatingShape
        position={[-2, -3, -2]}
        geometry={<octahedronGeometry args={[1, 0]} />}
        speed={1}
      />
      <FloatingShape
        position={[3, 3, -5]}
        geometry={<dodecahedronGeometry args={[0.9, 0]} />}
        speed={0.7}
      />
      <FloatingShape
        position={[0, 0, -6]}
        geometry={<icosahedronGeometry args={[2, 1]} />}
        speed={0.4}
      />
    </>
  )
}

const AuthBackground = () => {
  return (
    <div className="auth-bg">
      <Canvas
        camera={{ position: [0, 0, 6], fov: 60 }}
        style={{ background: 'transparent' }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
      >
        <Scene />
      </Canvas>
      {/* Gradient overlays for depth */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'radial-gradient(ellipse at center, transparent 0%, rgba(10,10,10,0.6) 70%, rgba(10,10,10,0.95) 100%)',
        pointerEvents: 'none'
      }} />
    </div>
  )
}

export default AuthBackground
