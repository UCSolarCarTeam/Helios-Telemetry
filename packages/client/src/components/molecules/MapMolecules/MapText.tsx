import { useEffect, useState } from "react";

import { usePacket } from "@/contexts/PacketContext";

function MapText() {
  const lapsLeft = 100;
  const totalTime = 3600 * 1000 * 8; // 1000 ms * 3600 sec/hr * 8 hr

  const { currentPacket } = usePacket();
  const [timeLeft, setTimeLeft] = useState<number>(totalTime);
  const [intervalCount, setIntervalCount] = useState(0);
  const raceMode = currentPacket?.B3?.RaceMode;

  useEffect(() => {
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
  }, [raceMode, timeLeft]);

  // format time for display
  const hour = Math.floor(timeLeft / (1000 * 3600));
  const minutes = Math.floor((timeLeft % (1000 * 3600)) / (1000 * 60));
  const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);

  return (
    <>
      <div className="mt-1 w-full text-center">
        <div className="grid grid-cols-2">
          <div className="col-span-1 grid">
            <p>Laps Left: {lapsLeft}</p>
            <p>Interval Count: {intervalCount}</p>
          </div>
          <div className="col-span-1 grid">
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
