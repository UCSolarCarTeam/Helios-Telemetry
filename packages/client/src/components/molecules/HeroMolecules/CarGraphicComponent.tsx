/* eslint-disable react/no-unknown-property */
// TO DO Remove that ^^
import { useState } from "react";
import * as THREE from "three";

import { CarModelComponent } from "@/components/molecules/HeroMolecules/CarMolecules/CarModelComponent";
import { RoadComponent } from "@/components/molecules/HeroMolecules/CarMolecules/RoadComponent";
import type { IndicationLocations } from "@/components/molecules/HeroMolecules/HeroTypes";
import {
  FaultLocations,
  ISeverity,
} from "@/components/molecules/HeroMolecules/HeroTypes";
import { useFaults } from "@/contexts/FaultsContext";
import { usePacket } from "@/contexts/PacketContext";
import { ContactShadows, OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import * as TWEEN from "@tweenjs/tween.js";

type IndicationTriggerList = {
  // TODO: Add indication triggers
};

// If there are faults pass a variable like isClear
// If there are no faults, pass a variable like !isClear

// Mapping values to the components of the car
// find the first instance of the fault location
// if is there just return true for that location, and then make it glow

function CarGraphicComponent() {
  const velocity = usePacket().currentPacket?.KeyMotor[0]
    ?.VehicleVelocity as number;
  const faults = useFaults();
  const [indications, setIndications] = useState<IndicationLocations>({
    leftMotor: ISeverity.CLEAR,
    rightMotor: ISeverity.CLEAR,
    battery: ISeverity.CLEAR,
    solarPanel: ISeverity.CLEAR,
  });

  // const glowingFaults = {
  //   leftMotor: {
  //     error: ISeverity.CLEAR,

  //   },
  //   rightMotor: {
  //     error: ISeverity.CLEAR,
  //     warning: false,
  //   },
  //   battery: {
  //     error: ISeverity.CLEAR,
  //     warning: false,
  //   },
  //   solarPanel: {
  //     error: ISeverity.CLEAR,
  //     warning: false,
  //   },
  // };

  // faults.currentFaults.forEach((fault) => {
  //   if (fault.indicationLocation === FaultLocations.LEFTMOTOR) {
  //     if (fault.severity === ISeverity.ERROR) {
  //       glowingFaults.leftMotor.error = true;
  //       glowingFaults.leftMotor.warning = ISeverity.ERROR;
  //     }
  //     glowingFaults.leftMotor = true;
  //   } else if (fault.indicationLocation === FaultLocations.RIGHTMOTOR) {
  //     glowingFaults.rightMotor = true;
  //   } else if (fault.indicationLocation === FaultLocations.BATTERY) {
  //     glowingFaults.battery = true;
  //   } else if (fault.indicationLocation === FaultLocations.SOLARPANEL) {
  //     glowingFaults.solarPanel = true;
  //   }
  // });

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
          errorMaterial={errorMaterial}
          warningMaterial={warningMaterial}
          indications={indications}
        />
        <RoadComponent speed={velocity * 0.5} size={15} />
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
    </>
  );
}

export default CarGraphicComponent;
