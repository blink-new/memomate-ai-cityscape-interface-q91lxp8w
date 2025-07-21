import { Suspense, useState, useEffect } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment, Stars } from '@react-three/drei'
import { motion, AnimatePresence } from 'framer-motion'
import Building from './Building'
import FlyingBot from './FlyingBot'
import FeatureModal from './FeatureModal'
import { Feature } from '../types'

interface CityScapeProps {
  features: Feature[]
  isMobile: boolean
}

const CityScape = ({ features, isMobile }: CityScapeProps) => {
  const [selectedFeature, setSelectedFeature] = useState<Feature | null>(null)
  const [timeOfDay, setTimeOfDay] = useState<'day' | 'night'>('night')

  // Day/night cycle
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeOfDay(prev => prev === 'day' ? 'night' : 'day')
    }, 30000) // Change every 30 seconds

    return () => clearInterval(interval)
  }, [])

  if (isMobile) {
    return (
      <div className="h-full bg-cyber-dark overflow-hidden">
        {/* Mobile Header */}
        <div className="p-4 border-b border-neon-red/20">
          <h1 className="text-2xl font-orbitron font-bold text-neon-red">
            MEMOMATE
          </h1>
          <p className="text-sm text-muted-foreground font-space-mono">
            AI PRODUCTIVITY NEXUS
          </p>
        </div>

        {/* Mobile Feature Grid */}
        <div className="p-4 space-y-4">
          {features.map((feature) => (
            <motion.div
              key={feature.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="building-glow p-4 rounded-lg bg-card border cursor-pointer"
              style={{ borderColor: feature.color + '40' }}
              onClick={() => setSelectedFeature(feature)}
            >
              <div className="flex items-center space-x-4">
                <div 
                  className="w-12 h-12 rounded-lg flex items-center justify-center text-2xl"
                  style={{ backgroundColor: feature.color + '20' }}
                >
                  {feature.icon}
                </div>
                <div className="flex-1">
                  <h3 className="font-orbitron font-bold" style={{ color: feature.color }}>
                    {feature.buildingName}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
                <div className="text-neon-red">→</div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mobile Status Bar */}
        <div className="absolute bottom-0 left-0 right-0 p-4 bg-card/80 backdrop-blur border-t border-neon-red/20">
          <div className="flex justify-between items-center text-xs font-mono">
            <span className="text-neon-red">SYSTEM: ONLINE</span>
            <span className="text-muted-foreground">
              {timeOfDay === 'day' ? '☀️ DAY MODE' : '🌙 NIGHT MODE'}
            </span>
          </div>
        </div>

        {/* Feature Modal */}
        <AnimatePresence>
          {selectedFeature && (
            <FeatureModal
              feature={selectedFeature}
              onClose={() => setSelectedFeature(null)}
            />
          )}
        </AnimatePresence>
      </div>
    )
  }

  return (
    <div className="h-full bg-cyber-dark relative overflow-hidden">
      {/* Desktop 3D City */}
      <Canvas
        camera={{ position: [0, 15, 20], fov: 60 }}
        className="w-full h-full"
      >
        <Suspense fallback={null}>
          {/* Lighting */}
          <ambientLight intensity={timeOfDay === 'day' ? 0.6 : 0.2} />
          <directionalLight
            position={[10, 10, 5]}
            intensity={timeOfDay === 'day' ? 1 : 0.3}
            color={timeOfDay === 'day' ? '#ffffff' : '#ff0033'}
          />
          
          {/* Environment */}
          <Environment preset={timeOfDay === 'day' ? 'city' : 'night'} />
          {timeOfDay === 'night' && <Stars radius={100} depth={50} count={5000} factor={4} />}

          {/* Ground Grid */}
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]}>
            <planeGeometry args={[100, 100]} />
            <meshBasicMaterial
              color="#0a0a0a"
              transparent
              opacity={0.8}
              wireframe
            />
          </mesh>

          {/* Buildings */}
          {features.map((feature) => (
            <Building
              key={feature.id}
              feature={feature}
              onClick={() => setSelectedFeature(feature)}
              timeOfDay={timeOfDay}
            />
          ))}

          {/* Flying Bots */}
          <FlyingBot position={[5, 8, 5]} color="#ff0033" />
          <FlyingBot position={[-8, 6, -3]} color="#0099ff" />
          <FlyingBot position={[0, 10, -8]} color="#9933ff" />

          {/* Camera Controls */}
          <OrbitControls
            enablePan={true}
            enableZoom={true}
            enableRotate={true}
            minDistance={10}
            maxDistance={50}
            maxPolarAngle={Math.PI / 2.2}
          />
        </Suspense>
      </Canvas>

      {/* Desktop UI Overlay */}
      <div className="absolute top-4 left-4 z-10">
        <div className="building-glow p-4 rounded-lg bg-card/80 backdrop-blur">
          <h1 className="text-xl font-orbitron font-bold text-neon-red">
            MEMOMATE
          </h1>
          <p className="text-xs text-muted-foreground font-space-mono">
            AI PRODUCTIVITY NEXUS
          </p>
        </div>
      </div>

      {/* Desktop Status Panel */}
      <div className="absolute bottom-4 left-4 z-10">
        <div className="building-glow p-3 rounded-lg bg-card/80 backdrop-blur">
          <div className="space-y-2 text-xs font-mono">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-neon-red rounded-full pulse-glow" />
              <span className="text-neon-red">SYSTEM ONLINE</span>
            </div>
            <div className="text-muted-foreground">
              MODE: {timeOfDay === 'day' ? 'DAY CYCLE' : 'NIGHT CYCLE'}
            </div>
            <div className="text-muted-foreground">
              BUILDINGS: {features.length} ACTIVE
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Instructions */}
      <div className="absolute top-4 right-4 z-10">
        <div className="building-glow p-3 rounded-lg bg-card/80 backdrop-blur">
          <div className="text-xs font-mono text-muted-foreground space-y-1">
            <div>🖱️ CLICK: Enter Building</div>
            <div>🔄 DRAG: Rotate View</div>
            <div>🔍 SCROLL: Zoom</div>
          </div>
        </div>
      </div>

      {/* Feature Modal */}
      <AnimatePresence>
        {selectedFeature && (
          <FeatureModal
            feature={selectedFeature}
            onClose={() => setSelectedFeature(null)}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

export default CityScape