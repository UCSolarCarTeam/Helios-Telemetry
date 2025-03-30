import { useCallback, useEffect, useState } from "react";

import { socketIO } from "@/contexts/SocketContext";
import useUnitsHandler from "@/hooks/PIS/useUnitsHandler";
import { UnitType } from "@/objects/PIS/PIS.interface";
import { type IRaceInfo } from "@shared/helios-types";

function MapText() {
  const [raceInfo, setRaceInfo] = useState({} as IRaceInfo);

  const distanceText = useUnitsHandler(UnitType.DISTANCE, raceInfo.distance);

  const onRaceInfo = useCallback((raceInfo: IRaceInfo) => {
    setRaceInfo(raceInfo);
  }, []);

  useEffect(() => {
    socketIO.on("raceInfo", onRaceInfo);

    return () => {
      socketIO.off("raceInfo", onRaceInfo);
    };
  }, [onRaceInfo]);

  // format time for display
  const hour = Math.floor(raceInfo.timeLeft / (1000 * 3600));
  const minutes = Math.floor((raceInfo.timeLeft % (1000 * 3600)) / (1000 * 60));
  const seconds = Math.floor((raceInfo.timeLeft % (1000 * 60)) / 1000);

  return (
    <div className="flex flex-wrap justify-between gap-2">
      <p>Laps Completed: {raceInfo.lapNumber}</p>
      <p>Race Day: {raceInfo.raceDay}</p>
      <p>
        Time Left: {String(hour).padStart(2, "0")}:
        {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
      </p>
      <p>
        Distance: {Number(distanceText.val).toFixed(3)} {distanceText.units}
      </p>
    </div>
  );
}

export default MapText;
