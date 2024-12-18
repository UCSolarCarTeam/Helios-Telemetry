import dynamic from "next/dynamic";
import { memo } from "react";

import BatteryThrottleComponent from "@/components/molecules/HeroMolecules/BatteryThrottleComponent";
import FaultsComponent from "@/components/molecules/HeroMolecules/FaultsComponent";
import GearParkBrakeComponent from "@/components/molecules/HeroMolecules/GearParkBrakeComponent";
import { FaultsContextProvider } from "@/contexts/FaultsContext";

const CarGraphicComponent = dynamic(
  () =>
    import("@/components/molecules/HeroMolecules/CarGraphicComponent").then(
      (mod) => mod.default,
    ),
  {
    ssr: false,
  },
);

const HeroContainer = () => {
  return (
    <>
      <FaultsContextProvider>
        <div className="grid size-full grid-cols-1 gap-4 md:grid-cols-6">
          <div className="col-span-1 md:col-span-4 md:h-full">
            <div className="grid h-1/6 pl-1">
              <BatteryThrottleComponent />
            </div>
            <div className="grid h-5/6 grid-cols-10">
              <div className="bg-green-500 col-span-1 grid h-full pl-1">
                <GearParkBrakeComponent />
              </div>
              <div className="col-span-9 grid h-full max-h-[42vh] pl-1">
                <CarGraphicComponent />
              </div>
            </div>
          </div>
          <div className="col-span-1 grid h-96 border border-dashed border-black pl-1 md:col-span-2">
            <FaultsComponent />
          </div>
        </div>
      </FaultsContextProvider>
    </>
  );
};

export default memo(HeroContainer);
