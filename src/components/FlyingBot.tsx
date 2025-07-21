import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Mesh } from 'three'

interface FlyingBotProps {
  position: [number, number, number]
  color: string
}

const FlyingBot = ({ position, color }: FlyingBotProps) => {
  const botRef = useRef<Mesh>(null)
  const trailRef = useRef<Mesh>(null)

  useFrame((state) => {
    if (botRef.current) {
      // Circular flight pattern
      const time = state.clock.elapsedTime * 0.5
      const radius = 3
      
      botRef.current.position.x = position[0] + Math.cos(time) * radius
      botRef.current.position.z = position[2] + Math.sin(time) * radius
      botRef.current.position.y = position[1] + Math.sin(time * 2) * 0.5

      // Rotation
      botRef.current.rotation.y = time
      botRef.current.rotation.x = Math.sin(time * 3) * 0.1
    }

    if (trailRef.current) {
      // Trail follows bot with slight delay
      const time = state.clock.elapsedTime * 0.5 - 0.2
      const radius = 3
      
      trailRef.current.position.x = position[0] + Math.cos(time) * radius
      trailRef.current.position.z = position[2] + Math.sin(time) * radius
      trailRef.current.position.y = position[1] + Math.sin(time * 2) * 0.5
    }
  })

  return (
    <group>
      {/* Trail */}
      <mesh ref={trailRef}>
        <sphereGeometry args={[0.1, 8, 8]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.3}
        />
      </mesh>

      {/* Main Bot Body */}
      <mesh ref={botRef}>
        <sphereGeometry args={[0.2, 16, 16]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.5}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>

      {/* Bot Wings/Propellers */}
      <group ref={botRef}>
        {[0, Math.PI / 2, Math.PI, (3 * Math.PI) / 2].map((rotation, i) => (
          <mesh key={i} rotation={[0, rotation, 0]} position={[0.3, 0, 0]}>
            <boxGeometry args={[0.4, 0.02, 0.1]} />
            <meshStandardMaterial
              color={color}
              emissive={color}
              emissiveIntensity={0.3}
              transparent
              opacity={0.8}
            />
          </mesh>
        ))}
      </group>

      {/* Bot Light */}
      <pointLight
        position={[position[0], position[1], position[2]]}
        color={color}
        intensity={0.5}
        distance={5}
      />
    </group>
  )
}

export default FlyingBot