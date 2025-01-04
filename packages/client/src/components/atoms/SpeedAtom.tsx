import { APPUNITS } from "@/contexts/AppStateContext";
import { useAppState } from "@/contexts/AppStateContext";
import { usePacket } from "@/contexts/PacketContext";
import { calculateVehicleVelocity } from "@/shared/vehicleVelocity";

function SpeedAtom() {
  const { currentAppState } = useAppState();
  const { currentPacket } = usePacket();

  let speedValue = calculateVehicleVelocity(
    currentPacket.MotorDetails0?.CurrentRpmValue,
    currentPacket.MotorDetails1?.CurrentRpmValue,
  );

  let speedUnit = "km/h";

  if (currentAppState.appUnits === APPUNITS.IMPERIAL) {
    speedValue = speedValue * 0.621371;
    speedUnit = "mph";
  }

  return (
    <>
      <div className="col-span-2 grid h-10 w-full content-center justify-items-center">
        <div className="flex flex-row">
          <div className="items-center">
            <h1 className="text-4xl">{speedValue.toFixed(0)}</h1>
          </div>
          <div className="items-center">
            <h1 className="text-sm">{speedUnit}</h1>
          </div>
        </div>
      </div>
    </>
  );
}

export default SpeedAtom;
