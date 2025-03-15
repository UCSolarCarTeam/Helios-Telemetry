import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import { APPUNITS, useAppState } from "@/contexts/AppStateContext";
import { usePacket } from "@/contexts/PacketContext";
import { socketIO } from "@/contexts/SocketContext";
import { calculateVehicleVelocity } from "@shared/helios-types";

function MapText() {
  const totalTime = 3600 * 1000 * 8; // 1000 ms/sec * 3600 sec/hr * 8 hr

  const { currentAppState, setCurrentAppState } = useAppState();
  const { currentPacket } = usePacket();

  const [timeLeft, setTimeLeft] = useState(totalTime);
  const [prevTime, setPrevTime] = useState(0);
  const [raceDay, setRaceDay] = useState(0);
  const [distance, setDistance] = useState(0);
  const [lapNumber, setLapNumber] = useState(0);

  const distanceUnit = useRef("km");
  const totalDistance = useRef(0);
  const totalLaps = useRef(0);

  const motorDetails0 = currentPacket?.MotorDetails0?.CurrentRpmValue;
  const motorDetails1 = currentPacket?.MotorDetails1?.CurrentRpmValue;
  const raceMode = currentPacket?.B3?.RaceMode;

  const distanceWithUnitsValue = useMemo(() => {
    if (currentAppState.appUnits === APPUNITS.IMPERIAL) {
      distanceUnit.current = "miles";
      return distance * 0.621371;
    }
    distanceUnit.current = "km";
    return distance;
  }, [currentAppState.appUnits, distance]);

  const onLapNumber = useCallback((lap: number) => setLapNumber(lap), []);

  useEffect(() => {
    socketIO.on("lapNumber", onLapNumber);

    return () => {
      socketIO.off("lapNumber", onLapNumber);
    };
  }, [onLapNumber]);

  useEffect(() => {
    const vehicleVelocity = calculateVehicleVelocity(
      motorDetails0,
      motorDetails1,
    );

    if (vehicleVelocity === 0 || !raceMode) return;

    // if more than 3 intervals, reset
    if (raceDay >= 3) {
      setTimeLeft(0);
      return;
    }

    // if timer is at 0, reset
    if (timeLeft <= 0) {
      setRaceDay((prev) => prev + 1); // increase interval after timer runs out
      totalLaps.current += lapNumber;
      totalDistance.current += distance;

      // reset
      setTimeLeft(totalTime); // reset time if timer runs out
      setLapNumber(0);
      setDistance(0);
      return;
    }

    // calculate distance
    const currTime = Date.now();
    if (prevTime !== 0) {
      const dTime = (currTime - prevTime) / (3600 * 1000); // convert ms to hr
      setDistance((prev) => prev + vehicleVelocity * dTime);
    }
    setPrevTime(currTime);

    // run each second
    const timerInterval = setInterval(() => {
      setTimeLeft((prev: number) => prev - 1000);
    }, 1000);

    // clean-up function
    return () => clearInterval(timerInterval);
  }, [raceMode, timeLeft, motorDetails0, motorDetails1]);

  // format time for display
  const hour = Math.floor(timeLeft / (1000 * 3600));
  const minutes = Math.floor((timeLeft % (1000 * 3600)) / (1000 * 60));
  const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

  return (
    <>
      <div className="grid w-full gap-2 text-center">
        <div className="flex flex-wrap justify-between gap-2">
          <p>Laps Completed: {lapNumber}</p>
          <p>Race Day: {raceDay}</p>
          <p>
            Time Left: {String(hour).padStart(2, "0")}:
            {String(minutes).padStart(2, "0")}:
            {String(seconds).padStart(2, "0")}
          </p>
          <p>
            Distance: {distanceWithUnitsValue.toFixed(2)}{" "}
            {distanceUnit.current.toString()}
          </p>
        </div>
      </div>
    </>
  );
}

export default MapText;
