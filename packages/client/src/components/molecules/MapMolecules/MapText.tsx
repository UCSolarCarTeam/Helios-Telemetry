import { useTheme } from "next-themes";
import { useCallback, useEffect, useState } from "react";

import { socketIO } from "@/contexts/SocketContext";
import useUnitsHandler from "@/hooks/PIS/useUnitsHandler";
import { UnitType } from "@/objects/PIS/PIS.interface";
import { mediumGray } from "@/styles/colors";
import { Button, Popover } from "@mantine/core";
import { type IRaceInfo } from "@shared/helios-types";

function MapText() {
  const [raceInfo, setRaceInfo] = useState({} as IRaceInfo);
  const { resolvedTheme } = useTheme();

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
  const hour = Math.floor((raceInfo.timeLeft ?? 0) / (1000 * 3600));
  const minutes = Math.floor(
    ((raceInfo.timeLeft ?? 0) % (1000 * 3600)) / (1000 * 60),
  );
  const seconds = Math.floor(((raceInfo.timeLeft ?? 0) % (1000 * 60)) / 1000);

  return (
    <>
      <Popover position="top" shadow="md" width={300}>
        <Popover.Dropdown
          styles={{
            arrow: {
              backgroundColor: resolvedTheme === "dark" ? mediumGray : "",
              color: resolvedTheme === "dark" ? "white" : "",
            },

            dropdown: {
              backgroundColor: resolvedTheme === "dark" ? mediumGray : "",
              color: resolvedTheme === "dark" ? "white" : "",
            },
          }}
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
                        {startRaceDate.toLocaleDateString("en-US", {
                          day: "2-digit",
                          month: "short",
                          weekday: "short",
                        })}
                        {", "}
                        {startRaceDate.toLocaleTimeString("en-US", {
                          hour: "2-digit",
                          hour12: true,
                          minute: "2-digit",
                        })}
                        {" - "}
                        {endRaceDate.toLocaleTimeString("en-US", {
                          hour: "2-digit",
                          hour12: true,
                          minute: "2-digit",
                        })}
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </Popover.Dropdown>

        <Popover.Target>
          <div className="grid place-content-center py-2">
            <Button
              color={resolvedTheme === "dark" ? "dark" : undefined}
              variant={resolvedTheme === "dark" ? "filled" : "default"}
            >
              <div className={resolvedTheme === "dark" ? "text-helios" : ""}>
                Get Race Info
              </div>
            </Button>
          </div>
        </Popover.Target>
      </Popover>
    </>
  );
}

export default MapText;
