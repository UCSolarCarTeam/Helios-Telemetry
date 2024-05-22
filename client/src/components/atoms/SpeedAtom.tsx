import { useAppState } from "@/contexts/AppStateContext";
import { APPUNITS } from "@/contexts/AppStateContext";
import { usePacket } from "@/contexts/PacketContext";

function SpeedAtom() {
  const { currentPacket } = usePacket();
  const { currentAppState } = useAppState();

  let speedValue = 0;
  let speedUnit = "km/h";
  if (currentAppState.appUnits === APPUNITS.IMPERIAL) {
    speedValue = currentPacket.KeyMotor[0].VehicleVelocity * 0.621371;
    speedUnit = "mph";
  } else {
    speedValue = currentPacket.KeyMotor[0].VehicleVelocity;
  }

  return (
    <>
      <div className="col-span-2 grid h-10 w-full content-center justify-items-center">
        <div className="grid grid-cols-2">
          <div className="col-span-1 grid">
            <h1 className="text-4xl">{speedValue.toFixed(0)}</h1>
          </div>
          <div className="col-span-1 grid">
            <h1 className="text-sm">{speedUnit}</h1>
          </div>
        </div>
      </div>
    </>
  );
}

export default SpeedAtom;
