import { useEffect, useState } from "react";

import { usePacket } from "@/contexts/PacketContext";
import { calculateVehicleVelocity } from "@shared/helios-types";

function MapText() {
  const lapsLeft = 100;
  const totalTime = 3600 * 1000 * 8; // 1000 ms * 3600 sec/hr * 8 hr

  const { currentPacket } = usePacket();
  const [timeLeft, setTimeLeft] = useState(totalTime);
  const [intervalCount, setIntervalCount] = useState(0);
  const raceMode = currentPacket?.B3?.RaceMode;
  const motorDetails0 = currentPacket?.MotorDetails0?.CurrentRpmValue;
  const motorDetails1 = currentPacket?.MotorDetails1?.CurrentRpmValue;

  useEffect(() => {
    const vehicleVelocity = calculateVehicleVelocity(
      motorDetails0,
      motorDetails1,
    );

    if (vehicleVelocity === 0) return;

    if (!raceMode) return;

    if (intervalCount >= 3) {
      setTimeLeft(0);
      return;
    }

    if (timeLeft <= 0) {
      setIntervalCount((prev) => prev + 1); // increase interval after timer runs out
      setTimeLeft(totalTime); // reset time if timer runs out
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
          <div className="flex justify-evenly">
            <p>Laps Left: {lapsLeft}</p>
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
