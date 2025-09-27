/* eslint-disable react/no-unknown-property */
// TO DO Remove that ^^
import { memo, useCallback, useMemo, useState } from "react";
import * as THREE from "three";

import CarModelComponent from "@/components/molecules/HeroMolecules/CarMolecules/CarModelComponent";
import RoadComponent from "@/components/molecules/HeroMolecules/CarMolecules/RoadComponent";
import type {
  FaultLocations,
  IndicationLocations,
} from "@/components/molecules/HeroMolecules/HeroTypes";
import { ISeverity } from "@/components/molecules/HeroMolecules/HeroTypes";
import { useAppState } from "@/contexts/AppStateContext";
import { usePacketStore } from "@/stores/usePacket";
import { ContactShadows, OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { calculateVehicleVelocity } from "@shared/helios-types";
import * as TWEEN from "@tweenjs/tween.js";

// type IndicationTriggerList = {
//   // TODO: Add indication triggers
// };

const initialIntensity = 0.1;
const targetIntensity = 0.8;
const duration = 500;

const CarGraphicComponent = () => {
  const { currentPacket } = usePacketStore();
  const { currentAppState } = useAppState();
  const [isClear, changeClear] = useState(false);
  const [indications, setIndications] = useState<IndicationLocations>({
    battery: ISeverity.CLEAR,
    leftMotor: ISeverity.CLEAR,
    rightMotor: ISeverity.CLEAR,
    solarPanel: ISeverity.CLEAR,
  });

  const errorMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: 0xff0000,
        opacity: 0.8,
        transparent: true,
      }),
    [],
  );

  const warningMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: 0xffa500,
        opacity: 0.8,
        transparent: true,
      }),
    [],
  );

  const tween = useMemo(
    () =>
      new TWEEN.Tween({ intensity: initialIntensity })
        .to({ intensity: targetIntensity }, duration)
        .easing(TWEEN.Easing.Quadratic.InOut)

        .onUpdate(({ intensity }) => {
          errorMaterial.opacity = intensity;
          warningMaterial.opacity = intensity;
        })
        .yoyo(true)
        .start()
        .repeat(Infinity),
    [errorMaterial, warningMaterial],
  );

  // Setup the animation loop.
  const animate = useCallback(
    (time: number) => {
      tween.update(time);
      requestAnimationFrame(animate);
    },
    [tween],
  );
  animate(1);

  return (
    <>
      <Canvas camera={{ position: [-7, 4, 7] }} dpr={[1, 2]} shadows>
        <ambientLight intensity={0.2} />
        <directionalLight
          castShadow
          intensity={0.5}
          shadow-mapSize={[512, 512]}
        />
        <CarModelComponent
          errorMaterial={errorMaterial}
          indications={indications}
          isClear={isClear}
          warningMaterial={warningMaterial}
        />
        <RoadComponent
          direction={currentPacket?.B3.ReverseDigital}
          size={20}
          speed={
            calculateVehicleVelocity(
              currentPacket.MotorDetails0?.MotorVelocity,
              currentPacket.MotorDetails1?.MotorVelocity,
            ) * 0.5
          }
        />
        <ContactShadows
          blur={2.5}
          far={4}
          opacity={0.75}
          position={[0, 0, 0]}
          scale={20}
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
};

export default memo(CarGraphicComponent);
