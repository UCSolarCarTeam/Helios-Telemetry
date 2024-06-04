import Image from "next/image";

import ParkingBrakeIcon from "@/components/atoms/ParkingBreakIcon";
import { usePacket } from "@/contexts/PacketContext";

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
            <ParkingBrakeIcon
              color={brake ? "#B94A6C" : "#000000"}
              width="30px"
              height="30px"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default GearParkBrakeComponent;
