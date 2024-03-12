import { useEffect, useState } from "react";

import { useAppState } from "@/contexts/AppStateContext";
import { usePacket } from "@/contexts/PacketContext";

function SpeedAtom() {
  const { currentPacket } = usePacket();
  const {} = useAppState;

  return (
    <>
      <div className="col-span-2 grid h-10 w-full content-center justify-items-center">
        <div className="grid grid-cols-2">
          <div className="col-span-1 grid">
            <h1 className="text-4xl">
              {currentPacket.KeyMotor[0].VehicleVelocity}
            </h1>
          </div>
          <div className="col-span-1 grid">
            <h1 className="text-sm">km/h</h1>
          </div>
        </div>
      </div>
    </>
  );
}

export default SpeedAtom;
