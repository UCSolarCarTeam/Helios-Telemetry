import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { useEffect, useRef, useState } from "react";

import PauseIcon from "@/components/atoms/PauseIcon";
import PlayIcon from "@/components/atoms/PlayIcon";
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
    <div className="flex flex-row items-center justify-center gap-2 py-1">
      <button
        className="focus:none rounded-md bg-helios p-1"
        onClick={() => {
          setIsPlaying((prev) => !prev);
        }}
      >
        {isPlaying ? (
          <PauseIcon color="white" height="25" width="25" />
        ) : (
          <PlayIcon color="white" height="25" width="25" />
        )}
      </button>
      <div className="w-full rounded-md bg-helios p-2">
        <Slider
          handleStyle={{
            backgroundColor: "red",
            borderColor: "white",
          }}
          onChange={(value) => handleSliderChange(value as number)}
          trackStyle={{ backgroundColor: "#fff" }}
          value={sliderValue}
        />
      </div>
    </div>
  );
}
