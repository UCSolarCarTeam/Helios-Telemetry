import React, { useMemo, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { Color, Mesh } from 'three'
import { useLoader } from '@react-three/fiber'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'

function Model(props: any) {
  const mesh = useRef<THREE.Mesh>()
  let path = process.env.PUBLIC_URL + '/models/Duck.gltf';
  const obj = useLoader(GLTFLoader, path).scene;

  // convert Group into Geometry
  const objGeom = useMemo(() => {
    let g;
    obj.traverse((c) => {
      if (c.type === "Mesh") {
        const _c = c as Mesh;
        g = _c.geometry;
      }
    });
    return g;
  }, [obj]);
  
  return (
    <mesh {...props} ref={mesh} 
    position={[3, -2, 2]}
    scale={0.03}
    geometry={objGeom}>
      <meshStandardMaterial color={new Color(1, 1, 0)} />
    </mesh>
  );
}


function CarGraphicComponent (props: any) {
  function Box (props: any) {
    // This reference will give us direct access to the mesh
    const mesh = useRef<THREE.Mesh>()
    // Set up state for the hovered and active state
    const [hovered, setHover] = useState(false)
    const [active, setActive] = useState(false)
    // Subscribe this component to the render-loop, rotate the mesh every frame
    useFrame((_, delta) => (mesh.current!.rotation.x += delta))
    // Return view, these are regular three.js elements expressed in JSX

    return (
      <mesh
        {...props}
        ref={mesh}
        scale={active ? 1.5 : 1}
        onClick={(_) => { setActive(!active) }}
        onPointerOver={(_) => { setHover(true) }}
        onPointerOut={(_) => { setHover(false) }}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
      </mesh>
    )
  }

  function Floor(props: any) {
    const mesh = useRef<THREE.Mesh>()
    return (
      <mesh {...props} ref={mesh}>
        <boxGeometry args={[15, 0.5, 15]} />
        <meshStandardMaterial color={new Color(0.3, 0.2, 0.3)} />
      </mesh>
    )
  }
  return (
    <>
        <Canvas>
          <ambientLight intensity={0.5} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
          <pointLight position={[-10, -10, -10]} />
          <Box position={[1, -1, 0]} />
          <Box position={[-1, 1, 0]} />
          <Floor position={[0, -2, 0]} />
          <Model/>
          <OrbitControls />
        </Canvas>
    </>
        
  )
}

export default CarGraphicComponent
