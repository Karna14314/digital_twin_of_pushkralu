import { ContactShadows, OrbitControls } from '@react-three/drei'
import { Canvas, useFrame, type ThreeEvent } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import type { Group, Mesh } from 'three'
import type { Ghat, Incident } from '../types'
import { densityColor } from '../lib/simulation'

interface ThreeTwinProps {
  ghats: Ghat[]
  incidents: Incident[]
  selectedId?: string
  onSelect: (ghat: Ghat) => void
  showResources?: boolean
}

const buildings = Array.from({ length: 64 }, (_, index) => {
  const east = index > 31
  const lane = index % 8
  const row = Math.floor(index / 8) % 8
  const x = (east ? 7.2 + lane * 1.25 : -18 + lane * 1.25) + ((row * 0.17) % 0.5)
  const z = -8.8 + row * 2.5 + (index % 3) * 0.35
  return { x, z, height: 0.55 + ((index * 7) % 9) * 0.24, width: 0.65 + (index % 3) * 0.13 }
})

function CityBlocks() {
  return <group>{buildings.map((building, index) => <mesh key={index} position={[building.x, building.height / 2, building.z]} castShadow receiveShadow><boxGeometry args={[building.width, building.height, 0.72]} /><meshStandardMaterial color={index % 4 === 0 ? '#d5c6a3' : '#c8c0ad'} roughness={0.92} /></mesh>)}</group>
}

function Roads() {
  return <group>{[-15, -10.5, -6, -1.5, 3, 7.5, 12, 16.5].map(z => <mesh key={z} position={[0, 0.035, z]} rotation={[-Math.PI / 2, 0, 0]}><planeGeometry args={[42, 0.22]} /><meshStandardMaterial color="#eee9dc" /></mesh>)}</group>
}

function Bridge() {
  return <group><mesh position={[0, 0.75, 0.3]} rotation={[0, 0, 0]}><boxGeometry args={[2.4, 0.18, 9.4]} /><meshStandardMaterial color="#e7e1d3" /></mesh>{[-4, -2, 0, 2, 4].map(z => <mesh key={z} position={[0, 0.85, z]}><boxGeometry args={[2.3, 0.12, 0.18]} /><meshStandardMaterial color="#948978" /></mesh>)}</group>
}

function GhatPillar({ ghat, active, onSelect }: { ghat: Ghat; active: boolean; onSelect: (event: ThreeEvent<MouseEvent>) => void }) {
  const ringRef = useRef<Mesh>(null)
  const pressure = ghat.occupancy / ghat.capacity
  const height = 0.7 + pressure * 3.8
  const x = (ghat.x - 50) * 0.62
  const z = (ghat.y - 42) * 0.47
  useFrame(state => {
    if (ringRef.current && (active || ghat.density >= 3.2)) {
      const pulse = 1 + Math.sin(state.clock.elapsedTime * 3) * 0.12
      ringRef.current.scale.setScalar(pulse)
    }
  })
  return (
    <group position={[x, 0, z]} onClick={onSelect}>
      <mesh position={[0, height / 2 + 0.2, 0]} castShadow>
        <cylinderGeometry args={[active ? 0.38 : 0.28, 0.44, height, 10]} />
        <meshStandardMaterial color={densityColor(ghat.density)} emissive={densityColor(ghat.density)} emissiveIntensity={active ? 0.55 : 0.18} roughness={0.4} />
      </mesh>
      <mesh ref={ringRef} position={[0, 0.2, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.5, 0.68, 24]} />
        <meshBasicMaterial color={densityColor(ghat.density)} transparent opacity={active ? 0.9 : 0.5} />
      </mesh>
      <mesh position={[0, height + 0.3, 0]}>
        <sphereGeometry args={[0.13, 10, 10]} />
        <meshBasicMaterial color="#ffffff" />
      </mesh>
    </group>
  )
}

function FlowBoats() {
  const group = useRef<Group>(null)
  const boats = useMemo(() => Array.from({ length: 9 }, (_, index) => ({ z: -2.3 + index * 0.56, speed: 0.22 + (index % 3) * 0.045, offset: index * 4.2 })), [])
  useFrame((state) => {
    if (!group.current) return
    group.current.children.forEach((boat, index) => {
      const item = boats[index]
      boat.position.x = ((state.clock.elapsedTime * item.speed + item.offset) % 38) - 19
      boat.position.y = 0.12 + Math.sin(state.clock.elapsedTime * 2 + index) * 0.04
    })
  })
  return <group ref={group}>{boats.map((boat, index) => <group key={index} position={[-19, 0.1, boat.z]}><mesh rotation={[0, 0, Math.PI / 2]}><coneGeometry args={[0.16, 0.65, 5]} /><meshStandardMaterial color={index % 2 ? '#f3d083' : '#e4a04b'} /></mesh><mesh position={[0, 0.13, 0]}><boxGeometry args={[0.26, 0.13, 0.2]} /><meshStandardMaterial color="#ffffff" /></mesh></group>)}</group>
}

function Scene({ ghats, incidents, selectedId, onSelect, showResources }: ThreeTwinProps) {
  return (
    <>
      <color attach="background" args={['#e9e5d9']} />
      <fog attach="fog" args={['#e9e5d9', 24, 46]} />
      <ambientLight intensity={1.25} />
      <directionalLight position={[8, 18, 10]} intensity={2.2} color="#fff5dc" castShadow shadow-mapSize={[2048, 2048]} />
      <directionalLight position={[-12, 8, -8]} intensity={0.65} color="#9ac9c4" />
      <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow><planeGeometry args={[55, 40]} /><meshStandardMaterial color="#d9d4c7" /></mesh>
      <mesh position={[0, 0.04, 0]}><boxGeometry args={[43, 0.08, 7.2]} /><meshStandardMaterial color="#69a9a5" roughness={0.25} metalness={0.08} /></mesh>
      <mesh position={[0, 0.09, 0]} rotation={[-Math.PI / 2, 0, 0]}><planeGeometry args={[43, 0.2]} /><meshBasicMaterial color="#d8f1ed" transparent opacity={0.65} /></mesh>
      <CityBlocks />
      <Roads />
      <Bridge />
      <FlowBoats />
      {ghats.map(ghat => <GhatPillar key={ghat.id} ghat={ghat} active={ghat.id === selectedId} onSelect={event => { event.stopPropagation(); onSelect(ghat) }} />)}
      {incidents.filter(incident => incident.severity === 'critical' || incident.severity === 'high').map(incident => {
        const x = (incident.x - 50) * 0.62
        const z = (incident.y - 42) * 0.47
        return <mesh key={incident.id} position={[x, 4.8, z]}><octahedronGeometry args={[0.3, 0]} /><meshBasicMaterial color="#d94f45" /></mesh>
      })}
      {showResources && <group position={[5, 0.35, 6.4]}>{Array.from({ length: 5 }, (_, index) => <mesh key={index} position={[index * 0.9, 0, index % 2 * 0.35]}><boxGeometry args={[0.55, 0.35, 0.25]} /><meshStandardMaterial color={index === 4 ? '#d94f45' : '#f1c75b'} /></mesh>)}</group>}
      <ContactShadows position={[0, 0.11, 0]} opacity={0.28} scale={42} blur={2.3} far={18} />
      <OrbitControls makeDefault enablePan minDistance={14} maxDistance={40} minPolarAngle={0.35} maxPolarAngle={1.35} target={[0, 0, 0]} />
    </>
  )
}

export default function ThreeTwin(props: ThreeTwinProps) {
  return <Canvas camera={{ position: [22, 20, 24], fov: 42 }} dpr={[1, 1.5]} shadows gl={{ antialias: true, powerPreference: 'high-performance' }}><Scene {...props} /></Canvas>
}
