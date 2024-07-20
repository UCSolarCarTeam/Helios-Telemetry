/* eslint-disable react/no-unknown-property */
// TO DO Remove that ^^
import { useState } from "react";
import * as THREE from "three";

import { CarModelComponent } from "@/components/molecules/HeroMolecules/CarMolecules/CarModelComponent";
import { RoadComponent } from "@/components/molecules/HeroMolecules/CarMolecules/RoadComponent";
import type {
  FaultLocations,
  IndicationLocations,
} from "@/components/molecules/HeroMolecules/HeroTypes";
import { ISeverity } from "@/components/molecules/HeroMolecules/HeroTypes";
import { usePacket } from "@/contexts/PacketContext";
import { ContactShadows, OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import * as TWEEN from "@tweenjs/tween.js";

type IndicationTriggerList = {
  // TODO: Add indication triggers
};

function CarGraphicComponent() {
  const { currentPacket } = usePacket();
  const [isClear, changeClear] = useState(false);
  const [indications, setIndications] = useState<IndicationLocations>({
    leftMotor: ISeverity.CLEAR,
    rightMotor: ISeverity.CLEAR,
    battery: ISeverity.CLEAR,
    solarPanel: ISeverity.CLEAR,
  });

  const errorMaterial = new THREE.MeshStandardMaterial({
    color: 0xff0000,
    transparent: true,
    opacity: 0.8,
  });

  const warningMaterial = new THREE.MeshStandardMaterial({
    color: 0xffa500,
    transparent: true,
    opacity: 0.8,
  });

  const initialIntensity = 0.1;
  const targetIntensity = 0.8;
  const duration = 500;

  const tween = new TWEEN.Tween({ intensity: initialIntensity })
    .to({ intensity: targetIntensity }, duration)
    .easing(TWEEN.Easing.Quadratic.InOut)

    .onUpdate(({ intensity }) => {
      errorMaterial.opacity = intensity;
      warningMaterial.opacity = intensity;
    })
    .yoyo(true)
    .start()
    .repeat(Infinity);

  // Setup the animation loop.
  function animate(time: number) {
    tween.update(time);
    requestAnimationFrame(animate);
  }
  animate(1);

  return (
    <>
      <Canvas camera={{ position: [-5, 3, 5], zoom: 1.7 }} shadows dpr={[1, 2]}>
        <ambientLight intensity={0.2} />
        <directionalLight
          intensity={0.5}
          shadow-mapSize={[512, 512]}
          castShadow
        />
        <CarModelComponent
          isClear={isClear}
          errorMaterial={errorMaterial}
          warningMaterial={warningMaterial}
          indications={indications}
        />
        <RoadComponent
          speed={(currentPacket?.KeyMotor[0]?.VehicleVelocity as number) * 0.5}
          size={15}
        />
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
        className="m-auto self-end rounded border-2 border-helios px-1 font-bold text-helios hover:bg-helios hover:text-white"
        onClick={() => changeClear(!isClear)}
      >
        View Inside
      </button>
    </>
  );
}

export default CarGraphicComponent;
