export interface Feature {
  id: string
  name: string
  buildingName: string
  description: string
  icon: string
  color: string
  position: {
    x: number
    y: number
    z: number
  }
  width: number
  height: number
  depth: number
}