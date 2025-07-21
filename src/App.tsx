import { useState, useEffect } from 'react'
import LoadingScreen from './components/LoadingScreen'
import CityScape from './components/CityScape'
import { Feature } from './types'

const features: Feature[] = [
  {
    id: 'dashboard',
    name: 'Dashboard',
    buildingName: 'Central Command',
    description: 'Mission control center with system overview',
    icon: '🏢',
    color: '#ff0033',
    position: { x: 0, y: 0, z: 0 },
    width: 4,
    height: 12,
    depth: 4
  },
  {
    id: 'ai-chat',
    name: 'AI Chat',
    buildingName: 'AI Core',
    description: 'Intelligent conversation and assistance',
    icon: '🤖',
    color: '#0099ff',
    position: { x: -8, y: 0, z: -3 },
    width: 3,
    height: 15,
    depth: 3
  },
  {
    id: 'timeline',
    name: 'Timeline',
    buildingName: 'Chrono Tower',
    description: 'Time management and scheduling',
    icon: '⏰',
    color: '#9933ff',
    position: { x: 6, y: 0, z: -5 },
    width: 3.5,
    height: 10,
    depth: 3.5
  },
  {
    id: 'reminders',
    name: 'Reminders',
    buildingName: 'Reminder Dome',
    description: 'Smart notifications and alerts',
    icon: '🔔',
    color: '#ff6600',
    position: { x: -5, y: 0, z: 4 },
    width: 4,
    height: 6,
    depth: 4
  },
  {
    id: 'analytics',
    name: 'Analytics',
    buildingName: 'Data Vault',
    description: 'Performance metrics and insights',
    icon: '📊',
    color: '#00ff88',
    position: { x: 8, y: 0, z: 3 },
    width: 3,
    height: 8,
    depth: 5
  },
  {
    id: 'collaboration',
    name: 'Collaboration',
    buildingName: 'Collab Hub',
    description: 'Team coordination and sharing',
    icon: '👥',
    color: '#ff3399',
    position: { x: -2, y: 0, z: -8 },
    width: 5,
    height: 9,
    depth: 3
  },
  {
    id: 'settings',
    name: 'Settings',
    buildingName: 'Control Nexus',
    description: 'System configuration and preferences',
    icon: '⚙️',
    color: '#ffaa00',
    position: { x: 3, y: 0, z: 7 },
    width: 2.5,
    height: 7,
    depth: 2.5
  }
]

function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [isMobile, setIsMobile] = useState(false)

  // Mobile detection
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Loading simulation
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 4000) // 4 seconds loading

    return () => clearTimeout(timer)
  }, [])

  if (isLoading) {
    return <LoadingScreen />
  }

  return (
    <div className="h-screen w-screen overflow-hidden">
      <CityScape features={features} isMobile={isMobile} />
    </div>
  )
}

export default App