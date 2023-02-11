import React, { useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { CarModelComponent } from "./CarMolecules/CarModelComponent";

function CarGraphicComponent(props: any) {
  /**
   * This is here to show how to make simple objects and animate them
   */
  function Box(props: any) {
    // This reference will give us direct access to the mesh
    const mesh = useRef<THREE.Mesh>();
    // Set up state for the hovered and active state
    const [hovered, setHover] = useState(false);
    const [active, setActive] = useState(false);
    // Subscribe this component to the render-loop, rotate the mesh every frame
    useFrame((_, delta) => (mesh.current!.rotation.x += delta));
    // Return view, these are regular three.js elements expressed in JSX
    return (
      <mesh
        {...props}
        ref={mesh}
        scale={active ? 1.5 : 1}
        onClick={(_) => {
          setActive(!active);
        }}
        onPointerOver={(_) => {
          setHover(true);
        }}
        onPointerOut={(_) => {
          setHover(false);
        }}
      >
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color={hovered ? "yellow" : "orange"} />
      </mesh>
    );
  }

  return (
    <>
      <Canvas camera={{ position: [-6, 4, 6] }}>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.2} penumbra={1} />
        <pointLight position={[-10, -10, -10]} />
        <Box position={[1, 5, -2]} />
        <CarModelComponent />
        <OrbitControls />
      </Canvas>
    </>
  );
}

export default CarGraphicComponent;
