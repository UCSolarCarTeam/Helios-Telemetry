import { useEffect, useState } from "react";
import * as THREE from "three";

import { CarModelComponent } from "@/components/molecules/HeroMolecules/CarMolecules/CarModelComponent";
import { RoadComponent } from "@/components/molecules/HeroMolecules/CarMolecules/RoadComponent";
import { ContactShadows, OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import * as TWEEN from "@tweenjs/tween.js";

enum IndicationStates {
  RED,
  ORANGE,
  CLEAR,
}

type IndicationLocations = {
  leftMotor: IndicationStates;
  rightMotor: IndicationStates;
  battery: IndicationStates;
  solarPanel: IndicationStates;
};

type IndicationTriggerList = {
  // TODO: Add indication triggers
};

function CarGraphicComponent(props: any) {
  const [isClear, changeClear] = useState(false);
  const [indications, setIndications] = useState<IndicationLocations>({
    leftMotor: IndicationStates.CLEAR,
    rightMotor: IndicationStates.CLEAR,
    battery: IndicationStates.CLEAR,
    solarPanel: IndicationStates.CLEAR,
  });

  const [errorMaterial, setErrorMaterial] = useState(
    new THREE.MeshStandardMaterial({ color: 0xff0000 }),
  );
  const [warningMaterial, setWarningMaterial] = useState(
    new THREE.MeshStandardMaterial({ color: 0xffa500 }),
  );

  useEffect(() => {
    animateEmissive();
  }, []);

  // new TWEEN.Tween(errorMaterial)
  //   .to({ r: 1, g: 0, b: 0 }, 1000)
  //   .easing(TWEEN.Easing.Quartic.In)
  //   .onUpdate(function () {
  //     setErrorMaterial(new THREE.MeshStandardMaterial({ color: 0xff0000 }));
  //   })
  //   .start();

  const animateEmissive = () => {
    const initialIntensity = 0.5;
    const targetIntensity = 2.0;
    const duration = 1000;

    new TWEEN.Tween({ intensity: initialIntensity })
      .to({ intensity: targetIntensity }, duration)
      .easing(TWEEN.Easing.Quadratic.InOut)
      .start()
      .onUpdate(({ intensity }) => {
        console.log("Intensity:", intensity);
        // setErrorMaterial((prevMaterial) => {
        //   const newMaterial = prevMaterial.clone();
        //   newMaterial.emissiveIntensity = intensity;
        //   return newMaterial;
        // });
      })
      .yoyo(true)
      .repeat(-1);
  };

  return (
    <>
      <Canvas camera={{ position: [-7, 4, 7] }} shadows dpr={[1, 2]}>
        <ambientLight intensity={0.2} />
        <directionalLight
          intensity={0.5}
          shadow-mapSize={[512, 512]}
          castShadow
        />
        <CarModelComponent isClear={isClear} testMaterial={errorMaterial} />
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
