import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, ContactShadows } from "@react-three/drei";
import { CarModelComponent } from "./CarMolecules/CarModelComponent";
import { RoadComponent } from "./CarMolecules/RoadComponent";

function CarGraphicComponent(props: any) {
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
