import { motion } from 'framer-motion'
import { X, Zap, Users, BarChart3, Clock, Bell, MessageSquare, Settings } from 'lucide-react'
import { Feature } from '../App'

interface FeatureModalProps {
  feature: Feature
  onClose: () => void
}

const getFeatureContent = (feature: Feature) => {
  switch (feature.id) {
    case 'dashboard':
      return {
        icon: <BarChart3 className="w-8 h-8" />,
        content: (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="building-glow p-4 rounded-lg bg-card">
                <div className="text-2xl font-bold text-neon-red">24</div>
                <div className="text-sm text-muted-foreground">Active Tasks</div>
              </div>
              <div className="building-glow p-4 rounded-lg bg-card">
                <div className="text-2xl font-bold text-neon-blue">87%</div>
                <div className="text-sm text-muted-foreground">Efficiency</div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Neural Processing</span>
                <span className="text-neon-red">98%</span>
              </div>
              <div className="w-full bg-secondary rounded-full h-2">
                <div className="bg-neon-red h-2 rounded-full" style={{ width: '98%' }} />
              </div>
            </div>
          </div>
        )
      }
    case 'ai-chat':
      return {
        icon: <MessageSquare className="w-8 h-8" />,
        content: (
          <div className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 rounded-full bg-neon-blue flex items-center justify-center text-xs">AI</div>
                <div className="flex-1 bg-card p-3 rounded-lg">
                  <p className="text-sm">Hello! I'm your AI assistant. How can I help you optimize your productivity today?</p>
                </div>
              </div>
              <div className="flex items-start space-x-3 justify-end">
                <div className="flex-1 bg-neon-red/20 p-3 rounded-lg max-w-xs">
                  <p className="text-sm">Show me my task analytics</p>
                </div>
                <div className="w-8 h-8 rounded-full bg-neon-red flex items-center justify-center text-xs">U</div>
              </div>
            </div>
            <div className="border-t border-border pt-4">
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  placeholder="Type your message..."
                  className="flex-1 bg-secondary rounded-lg px-3 py-2 text-sm"
                />
                <button className="bg-neon-red text-white px-4 py-2 rounded-lg text-sm">Send</button>
              </div>
            </div>
          </div>
        )
      }
    case 'timeline':
      return {
        icon: <Clock className="w-8 h-8" />,
        content: (
          <div className="space-y-4">
            <div className="space-y-3">
              {[
                { time: '09:00', task: 'Team standup meeting', status: 'completed' },
                { time: '10:30', task: 'Review project proposals', status: 'completed' },
                { time: '14:00', task: 'Client presentation', status: 'active' },
                { time: '16:00', task: 'Code review session', status: 'pending' },
              ].map((item, i) => (
                <div key={i} className="flex items-center space-x-4">
                  <div className="text-sm font-mono text-muted-foreground w-12">{item.time}</div>
                  <div className={`w-3 h-3 rounded-full ${
                    item.status === 'completed' ? 'bg-green-500' :
                    item.status === 'active' ? 'bg-neon-red pulse-glow' :
                    'bg-muted'
                  }`} />
                  <div className="flex-1 text-sm">{item.task}</div>
                </div>
              ))}
            </div>
          </div>
        )
      }
    case 'reminders':
      return {
        icon: <Bell className="w-8 h-8" />,
        content: (
          <div className="space-y-4">
            <div className="space-y-3">
              {[
                { title: 'Project deadline approaching', time: '2 hours', priority: 'high' },
                { title: 'Weekly team sync', time: 'Tomorrow 9:00 AM', priority: 'medium' },
                { title: 'Update portfolio', time: 'This weekend', priority: 'low' },
              ].map((reminder, i) => (
                <div key={i} className={`building-glow p-3 rounded-lg bg-card border-l-4 ${
                  reminder.priority === 'high' ? 'border-neon-red' :
                  reminder.priority === 'medium' ? 'border-neon-blue' :
                  'border-muted'
                }`}>
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="text-sm font-medium">{reminder.title}</div>
                      <div className="text-xs text-muted-foreground">{reminder.time}</div>
                    </div>
                    <div className={`text-xs px-2 py-1 rounded ${
                      reminder.priority === 'high' ? 'bg-neon-red/20 text-neon-red' :
                      reminder.priority === 'medium' ? 'bg-neon-blue/20 text-neon-blue' :
                      'bg-muted/20 text-muted-foreground'
                    }`}>
                      {reminder.priority}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )
      }
    case 'analytics':
      return {
        icon: <BarChart3 className="w-8 h-8" />,
        content: (
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-neon-red">156</div>
                <div className="text-xs text-muted-foreground">Tasks Completed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-neon-blue">89%</div>
                <div className="text-xs text-muted-foreground">Success Rate</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-neon-purple">7.2h</div>
                <div className="text-xs text-muted-foreground">Avg Daily Focus</div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="text-sm font-medium">Weekly Performance</div>
              <div className="flex items-end space-x-1 h-20">
                {[65, 78, 82, 90, 85, 92, 88].map((height, i) => (
                  <div
                    key={i}
                    className="flex-1 bg-neon-red rounded-t"
                    style={{ height: `${height}%` }}
                  />
                ))}
              </div>
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Mon</span>
                <span>Tue</span>
                <span>Wed</span>
                <span>Thu</span>
                <span>Fri</span>
                <span>Sat</span>
                <span>Sun</span>
              </div>
            </div>
          </div>
        )
      }
    case 'collaboration':
      return {
        icon: <Users className="w-8 h-8" />,
        content: (
          <div className="space-y-4">
            <div className="space-y-3">
              {[
                { name: 'Alex Chen', task: 'UI Design Review', status: 'online', avatar: '👨‍💻' },
                { name: 'Sarah Kim', task: 'Backend Integration', status: 'busy', avatar: '👩‍💻' },
                { name: 'Mike Johnson', task: 'Testing Phase', status: 'away', avatar: '👨‍🔬' },
              ].map((member, i) => (
                <div key={i} className="flex items-center space-x-3 p-3 building-glow rounded-lg bg-card">
                  <div className="text-2xl">{member.avatar}</div>
                  <div className="flex-1">
                    <div className="text-sm font-medium">{member.name}</div>
                    <div className="text-xs text-muted-foreground">{member.task}</div>
                  </div>
                  <div className={`w-3 h-3 rounded-full ${
                    member.status === 'online' ? 'bg-green-500' :
                    member.status === 'busy' ? 'bg-neon-red' :
                    'bg-muted'
                  }`} />
                </div>
              ))}
            </div>
            <button className="w-full bg-neon-blue text-white py-2 rounded-lg text-sm">
              Start Team Session
            </button>
          </div>
        )
      }
    case 'settings':
      return {
        icon: <Settings className="w-8 h-8" />,
        content: (
          <div className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Dark Mode</span>
                <div className="w-10 h-6 bg-neon-red rounded-full flex items-center px-1">
                  <div className="w-4 h-4 bg-white rounded-full ml-auto" />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Notifications</span>
                <div className="w-10 h-6 bg-neon-red rounded-full flex items-center px-1">
                  <div className="w-4 h-4 bg-white rounded-full ml-auto" />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Auto-save</span>
                <div className="w-10 h-6 bg-muted rounded-full flex items-center px-1">
                  <div className="w-4 h-4 bg-white rounded-full" />
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="text-sm font-medium">AI Assistant Voice</div>
              <select className="w-full bg-secondary rounded-lg px-3 py-2 text-sm">
                <option>Neural Voice Alpha</option>
                <option>Quantum Voice Beta</option>
                <option>Cyber Voice Gamma</option>
              </select>
            </div>
          </div>
        )
      }
    default:
      return {
        icon: <Zap className="w-8 h-8" />,
        content: <div className="text-center text-muted-foreground">Feature coming soon...</div>
      }
  }
}

const FeatureModal = ({ feature, onClose }: FeatureModalProps) => {
  const { icon, content } = getFeatureContent(feature)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0, y: 50 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.8, opacity: 0, y: 50 }}
        transition={{ type: "spring", damping: 20, stiffness: 300 }}
        className="bg-card border border-border rounded-lg p-6 max-w-md w-full building-glow"
        style={{ borderColor: feature.color + '40' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            <div 
              className="p-2 rounded-lg"
              style={{ backgroundColor: feature.color + '20', color: feature.color }}
            >
              {icon}
            </div>
            <div>
              <h2 className="text-lg font-orbitron font-bold" style={{ color: feature.color }}>
                {feature.buildingName}
              </h2>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-secondary rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="space-y-4">
          {content}
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center mt-6 pt-4 border-t border-border">
          <div className="text-xs font-mono text-muted-foreground">
            STATUS: ONLINE
          </div>
          <button
            className="px-4 py-2 rounded-lg text-sm font-medium transition-colors"
            style={{ 
              backgroundColor: feature.color + '20', 
              color: feature.color,
              border: `1px solid ${feature.color}40`
            }}
          >
            ENTER {feature.buildingName.toUpperCase()}
          </button>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default FeatureModal