import { useEffect, useState } from "react";

import { useAppState } from "@/contexts/AppStateContext";
import { usePacket } from "@/contexts/PacketContext";
import { calculateVehicleVelocity } from "@shared/helios-types";

function MapText() {
  const totalTime = 3600 * 1000 * 8; // 1000 ms/sec * 3600 sec/hr * 8 hr

  const { currentAppState, setCurrentAppState } = useAppState();
  const { currentPacket } = usePacket();

  const [timeLeft, setTimeLeft] = useState(totalTime);
  const [intervalCount, setIntervalCount] = useState(0);

  const motorDetails0 = currentPacket?.MotorDetails0?.CurrentRpmValue;
  const motorDetails1 = currentPacket?.MotorDetails1?.CurrentRpmValue;
  const raceMode = currentPacket?.B3?.RaceMode;

  useEffect(() => {
    const vehicleVelocity = calculateVehicleVelocity(
      motorDetails0,
      motorDetails1,
    );

    // if car not moving
    if (vehicleVelocity === 0) return;

    // if not in race mode
    if (!raceMode) return;

    // if more than 3 intervals, reset
    if (intervalCount >= 3) {
      setTimeLeft(0);
      return;
    }

    // if timer is at 0, reset
    if (timeLeft <= 0) {
      setIntervalCount((prev) => prev + 1); // increase interval after timer runs out
      setTimeLeft(totalTime); // reset time if timer runs out
      setCurrentAppState((prev) => ({
        ...prev,
        lapNumber: 0,
      }));
      return;
    }

    // run each second
    const interval = setInterval(() => {
      setTimeLeft((prev: number) => prev - 1000);
    }, 1000);

    // clean-up function
    return () => clearInterval(interval);
  }, [raceMode, timeLeft, motorDetails0, motorDetails1]);

  // format time for display
  const hour = Math.floor(timeLeft / (1000 * 3600));
  const minutes = Math.floor((timeLeft % (1000 * 3600)) / (1000 * 60));
  const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

  return (
    <>
      <div className="mt-1 w-full text-center">
        <div className="grid">
          <div className="flex justify-between">
            <p>Laps Completed: {currentAppState?.lapNumber}</p>
            <p>Interval Count: {intervalCount}</p>
            <p>
              Time Left: {hour}:{minutes}:{seconds}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default MapText;
