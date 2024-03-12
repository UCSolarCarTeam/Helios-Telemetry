import Image from "next/image";

import { usePacket } from "@/contexts/PacketContext";

// eslint-disable-next-line no-restricted-imports
import WarningIcon from "../../../../public/assets/warning.svg";

function GearParkBrakeComponent() {
  const { currentPacket } = usePacket();
  const selectedCSS = "font-bold text-helios";
  const reverse = currentPacket.DriverControls.Reverse;
  const forward = currentPacket.DriverControls.Forward;
  const brake = currentPacket.DriverControls.Brakes;
  return (
    <>
      <div className="flex flex-col items-center">
        <div className="flex flex-col items-center justify-center space-y-1 pt-8 text-xl">
          <h1 className={reverse ? selectedCSS : ""}>R</h1>
          <h1 className={!reverse && !forward ? selectedCSS : ""}>N</h1>
          <h1 className={forward ? selectedCSS : ""}>D</h1>
        </div>

        <div className="grid grid-rows-1 gap-4">
          <div className="row-start-4 row-end-4">
            <WarningIcon
              className={brake ? "fill-[#B94A6C] stroke-[2px]" : ""}
              width="30"
              height="30"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default GearParkBrakeComponent;
