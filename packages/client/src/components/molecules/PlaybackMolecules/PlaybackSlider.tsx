import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { useEffect, useRef, useState } from "react";

import { usePacket } from "@/contexts/PacketContext";

export default function PlaybackSlider() {
  const { currentPacket } = usePacket();

  const [isPlaying, setIsPlaying] = useState(false);
  const [sliderValue, setSliderValue] = useState(1);
  const intervalRef = useRef<NodeJS.Timeout | number | null>(null);

  const parseDate = (date: number) => {
    const d = new Date(date);
    return `${d.getMinutes()}:${d.getSeconds()}:${d.getMilliseconds()}`;
  };

  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        setSliderValue((prevValue) => {
          if (prevValue >= 100) {
            return 1; // Reset to start
          }
          return prevValue + 1; // Increment the slider value
        });
      }, 500); // Adjust the interval timing as needed
    } else {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current); // Cleanup on unmount
      }
    };
  }, [isPlaying]);

  const handleSliderChange = (e: number) => {
    setSliderValue(e);
  };

  return (
    <div className="flex flex-row items-center justify-center gap-2">
      <button
        className="rounded-xl bg-red-500 p-2"
        onClick={() => {
          setIsPlaying((prev) => !prev);
        }}
      >
        {isPlaying ? "Pause" : "Play"}
      </button>
      <Slider
        onChange={(value) => handleSliderChange(value as number)}
        value={sliderValue}
      />
    </div>
  );
}
