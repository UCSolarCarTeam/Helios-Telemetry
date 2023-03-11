import React, { ReactNode, Suspense, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  OrbitControls,
  Stats,
  SoftShadows,
  ContactShadows,
} from "@react-three/drei";
import * as THREE from "three";
import { CarModelComponent } from "./CarMolecules/CarModelComponent";
import { RoadComponent } from "./CarMolecules/RoadComponent";
import {
  EffectComposer,
  SSAO,
  DepthOfField,
} from "@react-three/postprocessing";

function Effects() {
  return <EffectComposer></EffectComposer>;
}

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
  const x = {
    enabled: true,
    size: 25,
    focus: 0,
    samples: 10,
  };
  //SoftShadows(x);
  return (
    <>
      <Canvas camera={{ position: [-7, 4, 7] }} shadows dpr={[1, 2]}>
        <ambientLight intensity={0.2} />
        <directionalLight
          intensity={0.5}
          shadow-mapSize={[512, 512]}
          castShadow
        />
        <CarModelComponent />
        <RoadComponent speed={7} size={15} />
        <ContactShadows
          position={[0, 0, 0]}
          opacity={0.75}
          scale={20}
          blur={2.5}
          far={4}
        />
        <OrbitControls maxDistance={20} minDistance={10} />
        {/* <Stats/> */}
      </Canvas>
    </>
  );
}

export default CarGraphicComponent;
function useControls(arg0: {
  enabled: boolean;
  size: { value: number; min: number; max: number };
  focus: { value: number; min: number; max: number };
  samples: { value: number; min: number; max: number; step: number };
}): { [x: string]: any; enabled: any } {
  throw new Error("Function not implemented.");
}
