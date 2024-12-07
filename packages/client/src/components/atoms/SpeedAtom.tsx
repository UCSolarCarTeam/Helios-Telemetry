import { useAppState } from "@/contexts/AppStateContext";
import { APPUNITS } from "@/contexts/AppStateContext";

function SpeedAtom() {
  const { currentAppState } = useAppState();

  let speedValue = 0;
  let speedUnit = "km/h";
  if (currentAppState.appUnits === APPUNITS.IMPERIAL) {
    speedValue = currentAppState.vehicleVelocity * 0.621371;
    speedUnit = "mph";
  } else {
    speedValue = currentAppState.vehicleVelocity;
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
