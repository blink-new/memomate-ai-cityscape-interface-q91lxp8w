import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

const LoadingScreen = () => {
  const [progress, setProgress] = useState(0)
  const [status, setStatus] = useState('Initializing Neural Network...')

  useEffect(() => {
    const loadingSteps = [
      'Initializing Neural Network...',
      'Connecting to AI Core...',
      'Loading Cityscape Data...',
      'Calibrating 3D Engines...',
      'Establishing Quantum Links...',
      'Activating Holographic Interface...',
      'System Ready!'
    ]
    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + Math.random() * 15
        const stepIndex = Math.floor((newProgress / 100) * loadingSteps.length)
        
        if (stepIndex < loadingSteps.length) {
          setStatus(loadingSteps[stepIndex])
        }
        
        return Math.min(newProgress, 100)
      })
    }, 200)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="h-screen bg-cyber-dark flex items-center justify-center relative overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 opacity-20">
        <div className="grid-pattern" />
      </div>

      {/* Scanning Lines */}
      <div className="absolute inset-0">
        <div className="scan-lines" />
      </div>

      {/* Main Loading Content */}
      <div className="text-center space-y-8 z-10">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-6xl font-orbitron font-bold text-neon-red mb-2">
            MEMOMATE
          </h1>
          <p className="text-lg font-space-mono text-neon-blue">
            AI PRODUCTIVITY NEXUS
          </p>
        </motion.div>

        {/* Neural Network Visualization */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="relative w-32 h-32 mx-auto"
        >
          {/* Central Core */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-8 h-8 bg-neon-red rounded-full pulse-glow" />
          </div>
          
          {/* Orbiting Nodes */}
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <motion.div
              key={i}
              className="absolute w-3 h-3 bg-neon-blue rounded-full"
              style={{
                top: '50%',
                left: '50%',
                transformOrigin: '0 0',
              }}
              animate={{
                rotate: 360,
                x: Math.cos((i * Math.PI * 2) / 6) * 50,
                y: Math.sin((i * Math.PI * 2) / 6) * 50,
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: 'linear',
                delay: i * 0.2,
              }}
            />
          ))}
          
          {/* Connection Lines */}
          <svg className="absolute inset-0 w-full h-full">
            {[0, 1, 2, 3, 4, 5].map((i) => (
              <motion.line
                key={i}
                x1="50%"
                y1="50%"
                x2={`${50 + Math.cos((i * Math.PI * 2) / 6) * 40}%`}
                y2={`${50 + Math.sin((i * Math.PI * 2) / 6) * 40}%`}
                stroke="#ff0033"
                strokeWidth="1"
                opacity="0.6"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: 'reverse',
                  delay: i * 0.1,
                }}
              />
            ))}
          </svg>
        </motion.div>

        {/* Progress Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="w-80 mx-auto space-y-4"
        >
          <div className="relative">
            <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-neon-red to-neon-blue"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-neon-red rounded-full pulse-glow" 
                 style={{ left: `${progress}%` }} />
          </div>
          
          <div className="text-center space-y-2">
            <p className="text-sm font-space-mono text-neon-blue">
              {status}
            </p>
            <p className="text-xs font-mono text-muted-foreground">
              {Math.round(progress)}% COMPLETE
            </p>
          </div>
        </motion.div>

        {/* System Status */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="space-y-2"
        >
          {[
            { label: 'NEURAL CORE', status: progress > 20 ? 'ONLINE' : 'INITIALIZING' },
            { label: 'QUANTUM PROCESSOR', status: progress > 40 ? 'ONLINE' : 'STANDBY' },
            { label: 'HOLOGRAPHIC ENGINE', status: progress > 60 ? 'ONLINE' : 'STANDBY' },
            { label: 'AI INTERFACE', status: progress > 80 ? 'ONLINE' : 'STANDBY' },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.2 + i * 0.1 }}
              className="flex justify-between items-center text-xs font-mono w-80 mx-auto"
            >
              <span className="text-muted-foreground">{item.label}</span>
              <span className={item.status === 'ONLINE' ? 'text-neon-red' : 'text-muted-foreground'}>
                {item.status}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-neon-blue rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 1, 0.3],
            }}
            transition={{
              duration: 3 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>
    </div>
  )
}

export default LoadingScreen