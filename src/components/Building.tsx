import { useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { Text } from '@react-three/drei'
import { Mesh, BoxGeometry, EdgesGeometry } from 'three'
import { Feature } from '../App'

interface BuildingProps {
  feature: Feature
  onClick: () => void
  timeOfDay: 'day' | 'night'
}

const Building = ({ feature, onClick, timeOfDay }: BuildingProps) => {
  const meshRef = useRef<Mesh>(null)
  const [hovered, setHovered] = useState(false)

  useFrame((state) => {
    if (meshRef.current) {
      // Gentle floating animation
      meshRef.current.position.y = feature.position.y + Math.sin(state.clock.elapsedTime + feature.position.x) * 0.1

      // Glow effect when hovered
      if (hovered) {
        meshRef.current.scale.setScalar(1.05 + Math.sin(state.clock.elapsedTime * 3) * 0.02)
      } else {
        meshRef.current.scale.setScalar(1)
      }
    }
  })

  const buildingColor = hovered ? feature.color : (timeOfDay === 'day' ? '#666666' : '#333333')
  const emissiveColor = hovered ? feature.color : (timeOfDay === 'night' ? feature.color : '#000000')
  const emissiveIntensity = hovered ? 0.5 : (timeOfDay === 'night' ? 0.2 : 0)

  return (
    <group position={[feature.position.x, feature.position.y, feature.position.z]}>
      {/* Main Building */}
      <mesh
        ref={meshRef}
        onClick={onClick}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        position={[0, feature.height / 2, 0]}
      >
        <boxGeometry args={[feature.width, feature.height, feature.depth]} />
        <meshStandardMaterial
          color={buildingColor}
          emissive={emissiveColor}
          emissiveIntensity={emissiveIntensity}
          transparent
          opacity={0.9}
        />
      </mesh>

      {/* Building Edges */}
      <lineSegments position={[0, feature.height / 2, 0]}>
        <edgesGeometry args={[new BoxGeometry(feature.width, feature.height, feature.depth)]} />
        <lineBasicMaterial
          color={feature.color}
          transparent
          opacity={hovered ? 1 : 0.6}
        />
      </lineSegments>

      {/* Antenna/Spire for taller buildings */}
      {feature.height > 8 && (
        <mesh position={[0, feature.height + 0.5, 0]}>
          <cylinderGeometry args={[0.05, 0.05, 1]} />
          <meshStandardMaterial
            color={feature.color}
            emissive={feature.color}
            emissiveIntensity={0.8}
          />
        </mesh>
      )}

      {/* Floating Icon */}
      <Text
        position={[0, feature.height + 1.5, 0]}
        fontSize={1}
        color={feature.color}
        anchorX="center"
        anchorY="middle"
      >
        {feature.icon}
      </Text>

      {/* Building Name */}
      <Text
        position={[0, feature.height + 2.5, 0]}
        fontSize={0.3}
        color={hovered ? '#ffffff' : feature.color}
        anchorX="center"
        anchorY="middle"
      >
        {feature.buildingName.toUpperCase()}
      </Text>

      {/* Base Platform */}
      <mesh position={[0, -0.05, 0]}>
        <cylinderGeometry args={[feature.width * 0.8, feature.width * 0.8, 0.1]} />
        <meshStandardMaterial
          color={feature.color}
          emissive={feature.color}
          emissiveIntensity={hovered ? 0.3 : 0.1}
          transparent
          opacity={0.7}
        />
      </mesh>

      {/* Holographic Ring */}
      {hovered && (
        <mesh position={[0, 0.5, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[feature.width * 0.6, feature.width * 0.8, 32]} />
          <meshBasicMaterial
            color={feature.color}
            transparent
            opacity={0.5}
            side={2}
          />
        </mesh>
      )}

      {/* Windows/Details */}
      {Array.from({ length: Math.floor(feature.height / 2) }).map((_, i) => (
        <group key={i}>
          {/* Front windows */}
          <mesh position={[0, i * 2 + 1, feature.depth / 2 + 0.01]}>
            <planeGeometry args={[feature.width * 0.8, 0.3]} />
            <meshBasicMaterial
              color={timeOfDay === 'night' ? feature.color : '#87CEEB'}
              transparent
              opacity={timeOfDay === 'night' ? 0.8 : 0.3}
            />
          </mesh>
          
          {/* Side windows */}
          <mesh position={[feature.width / 2 + 0.01, i * 2 + 1, 0]} rotation={[0, Math.PI / 2, 0]}>
            <planeGeometry args={[feature.depth * 0.8, 0.3]} />
            <meshBasicMaterial
              color={timeOfDay === 'night' ? feature.color : '#87CEEB'}
              transparent
              opacity={timeOfDay === 'night' ? 0.6 : 0.2}
            />
          </mesh>
        </group>
      ))}
    </group>
  )
}

export default Building