import React from "react";
import BatteryThrottleComponent from "../molecules/HeroMolecules/BatteryThrottleComponent";
import CarGraphicComponent from "../molecules/HeroMolecules/CarGraphicComponent";
import FaultsComponent from "../molecules/HeroMolecules/FaultsComponent";
import GearParkBrakeComponent from "../molecules/HeroMolecules/GearParkBrakeComponent";

function HeroContainer(props: any) {
  return (
    <>
      <div className="grid w-full h-full grid-cols-6">
        <div className=" h-full col-span-4">
          <div className=" grid h-1/6 pl-1 ">
            <BatteryThrottleComponent />
          </div>
          <div className="grid h-5/6 grid-cols-4">
            <div className="grid h-full col-span-1 bg-green-500 pl-1">
              <GearParkBrakeComponent />
            </div>
            <div className="grid h-full col-span-3 bg-pink-500 pl-1">
              <CarGraphicComponent />
            </div>
          </div>
        </div>
        <div className="grid col-span-2 bg-red-500 pl-1">
          <FaultsComponent />
        </div>
      </div>
    </>
  );
}

export default HeroContainer;
