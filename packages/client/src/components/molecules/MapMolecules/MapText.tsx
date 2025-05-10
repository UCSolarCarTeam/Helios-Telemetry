import { useCallback, useEffect, useState } from "react";

import { useAppState } from "@/contexts/AppStateContext";
import { socketIO } from "@/contexts/SocketContext";
import useUnitsHandler from "@/hooks/PIS/useUnitsHandler";
import { UnitType } from "@/objects/PIS/PIS.interface";
import { Button, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { type IRaceInfo } from "@shared/helios-types";

function MapText() {
  const [opened, { close, open }] = useDisclosure(false);
  const [raceInfo, setRaceInfo] = useState({} as IRaceInfo);
  const {
    currentAppState: { darkMode },
  } = useAppState();

  const distanceText = useUnitsHandler(UnitType.DISTANCE, raceInfo.distance);
  const totalDistanceText = useUnitsHandler(
    UnitType.DISTANCE,
    raceInfo.totalDistance,
  );

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
  const hour = Math.floor(raceInfo.timeLeft ?? 0 / (1000 * 3600));
  const minutes = Math.floor(
    (raceInfo.timeLeft ?? 0 % (1000 * 3600)) / (1000 * 60),
  );
  const seconds = Math.floor((raceInfo.timeLeft ?? 0 % (1000 * 60)) / 1000);

  return (
    <>
      <Modal
        onClose={close}
        opened={opened}
        styles={{
          content: {
            backgroundColor: darkMode ? "#3A3A3A" : "",
            color: darkMode ? "white" : "",
          },

          header: {
            backgroundColor: darkMode ? "#3A3A3A" : "",
            color: darkMode ? "white" : "",
          },
        }}
        title="Race Info"
      >
        <div className="grid gap-4">
          <div>
            <p>Laps Completed: {raceInfo.lapNumber ?? 0}</p>
            <p>Race Day: {raceInfo.raceDay ?? 0}</p>
            <p>
              Time Left: {String(hour).padStart(2, "0")}:
              {String(minutes).padStart(2, "0")}:
              {String(seconds).padStart(2, "0")}
            </p>
            <p>
              Distance: {Number(distanceText.val ?? 0).toFixed(3)}{" "}
              {distanceText.units}
            </p>
            <p>
              Total Distance: {Number(totalDistanceText.val ?? 0).toFixed(3)}{" "}
              {totalDistanceText.units}
            </p>
          </div>

          <div>
            Race Dates:
            <div>
              {Array.isArray(raceInfo.raceDates) &&
                raceInfo.raceDates.map((raceDate, i) => {
                  const startRaceDate = new Date(raceDate);
                  const endRaceDate = new Date(
                    startRaceDate.getTime() + 8 * 1000 * 3600,
                  );
                  return (
                    <div key={i}>
                      {startRaceDate.toLocaleString()} -{" "}
                      {endRaceDate.toLocaleTimeString()}
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </Modal>

      <div className="grid place-content-center py-2">
        <Button
          color={darkMode ? "dark" : undefined}
          onClick={open}
          variant={darkMode ? "filled" : "default"}
        >
          <div className={darkMode ? "text-helios" : ""}>Get Race Info</div>
        </Button>
      </div>
    </>
  );
}

export default MapText;
