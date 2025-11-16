'use client'

import { useRef, useMemo } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Sphere, MeshDistortMaterial } from '@react-three/drei'
import * as THREE from 'three'

function Particles({ count = 800 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null)

  const particleGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry()
    const positions = new Float32Array(count * 3)

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 100
      positions[i * 3 + 1] = (Math.random() - 0.5) * 100
      positions[i * 3 + 2] = (Math.random() - 0.5) * 100
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    return geometry
  }, [count])

  useFrame(({ clock }) => {
    if (!pointsRef.current) return
    const time = clock.getElapsedTime()
    pointsRef.current.rotation.y = time * 0.05
    pointsRef.current.rotation.x = time * 0.03
  })

  return (
    <points ref={pointsRef} geometry={particleGeometry}>
      <pointsMaterial
        size={0.5}
        color="#4a90e2"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  )
}

function FloatingOrb() {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame(({ clock }) => {
    if (!meshRef.current) return
    meshRef.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.3) * 0.2
    meshRef.current.rotation.y = Math.cos(clock.getElapsedTime() * 0.2) * 0.2
    meshRef.current.position.y = Math.sin(clock.getElapsedTime() * 0.5) * 0.3
  })

  return (
    <Sphere ref={meshRef} args={[2, 100, 100]} scale={1.5}>
      <MeshDistortMaterial
        color="#667eea"
        attach="material"
        distort={0.4}
        speed={2}
        roughness={0.2}
        metalness={0.8}
        transparent
        opacity={0.3}
      />
    </Sphere>
  )
}

function SecondaryOrb() {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame(({ clock }) => {
    if (!meshRef.current) return
    meshRef.current.rotation.x = Math.cos(clock.getElapsedTime() * 0.4) * 0.3
    meshRef.current.rotation.y = Math.sin(clock.getElapsedTime() * 0.3) * 0.3
    meshRef.current.position.x = Math.cos(clock.getElapsedTime() * 0.3) * 2
    meshRef.current.position.z = Math.sin(clock.getElapsedTime() * 0.3) * 2
  })

  return (
    <Sphere ref={meshRef} args={[1.5, 100, 100]} position={[3, 0, 0]}>
      <MeshDistortMaterial
        color="#26c6da"
        attach="material"
        distort={0.3}
        speed={1.5}
        roughness={0.3}
        metalness={0.6}
        transparent
        opacity={0.2}
      />
    </Sphere>
  )
}

export default function MedicalEnvironment() {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 0, 10], fov: 75 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <pointLight position={[-10, -10, -5]} intensity={0.5} color="#4a90e2" />
        <pointLight position={[10, 10, 5]} intensity={0.5} color="#26c6da" />

        <FloatingOrb />
        <SecondaryOrb />
        <Particles count={800} />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.3}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
      </Canvas>
    </div>
  )
}
