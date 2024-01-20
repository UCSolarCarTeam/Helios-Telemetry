import React, { useState } from "react";

import { Button } from "@mui/material";
import { ContactShadows, OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";

import { CarModelComponent } from "./CarMolecules/CarModelComponent";
import { RoadComponent } from "./CarMolecules/RoadComponent";

function CarGraphicComponent(props: any) {
  const [isClear, changeClear] = useState(false);

  return (
    <>
      <Canvas camera={{ position: [-7, 4, 7] }} shadows dpr={[1, 2]}>
        <ambientLight intensity={0.2} />
        <directionalLight
          intensity={0.5}
          shadow-mapSize={[512, 512]}
          castShadow
        />
        <CarModelComponent isClear={isClear} />
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

      {/* This is a temporary button to show transperency functionality*/}
      <button
        className="m-auto self-end rounded border-2 border-helios 
      px-1 font-bold text-helios hover:bg-helios hover:text-white"
        onClick={() => changeClear(!isClear)}
      >
        View Inside
      </button>
    </>
  );
}

export default CarGraphicComponent;
