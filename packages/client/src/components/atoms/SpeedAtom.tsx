import React from "react";

import useUnitsHandler from "@/hooks/PIS/useUnitsHandler";
import { UnitType } from "@/objects/PIS/PIS.interface";
import { usePacketStore } from "@/stores/usePacket";
import { calculateVehicleVelocity } from "@shared/helios-types";

function SpeedAtom() {
  const { currentPacket } = usePacketStore();

  const speedValue = React.useMemo(
    () =>
      calculateVehicleVelocity(
        currentPacket.MotorDetails0?.MotorVelocity,
        currentPacket.MotorDetails1?.MotorVelocity,
      ),
    [
      currentPacket.MotorDetails0?.MotorVelocity,
      currentPacket.MotorDetails1?.MotorVelocity,
    ],
  );

  const speed = useUnitsHandler(UnitType.SPEED, speedValue);

  return (
    <>
      <div className="col-span-2 grid h-10 w-full content-center justify-items-center">
        <div className="flex flex-row">
          <div className="items-center">
            <h1 className="text-4xl">{Number(speed.val).toFixed(0)}</h1>
          </div>
          <div className="items-center">
            <h1 className="text-sm">{speed.units}</h1>
          </div>
        </div>
      </div>
    </>
  );
}

export default SpeedAtom;
