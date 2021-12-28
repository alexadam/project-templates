import { Vector3 } from '@react-three/fiber'
import React, { useRef } from 'react'

interface ICubeProps {
  position: Vector3,
  dimension: number
}

const Cube = (props: ICubeProps) => {

  const mesh = useRef()

  return (
    <mesh
      castShadow
      receiveShadow
      position={props.position}
      ref={mesh}
    >
      <boxGeometry args={[props.dimension, props.dimension, props.dimension]} />
      <meshStandardMaterial color={'#007fff'} />
    </mesh>
  )
}
export default Cube