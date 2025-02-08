import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import PauseIcon from "@/components/atoms/PauseIcon";
import PlayIcon from "@/components/atoms/PlayIcon";
import { usePacket } from "@/contexts/PacketContext";

import { fakeData } from "./fakedata";

export default function PlaybackSlider() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [sliderValue, setSliderValue] = useState(0);
  const animationRef = useRef<number>(null);
  const playStartTime = useRef<number>(null);
  const playStartSlider = useRef<number>(0);

  const { setCurrentPacket } = usePacket();

  const { sortedData } = useMemo(() => {
    const sorted = [...fakeData].sort((a, b) => a.TimeStamp - b.TimeStamp);
    return {
      sortedData: sorted,
    };
  }, []);

  // dynamic playback duration based on the length of how many packets were fetched
  const PLAYBACK_DURATION = sortedData.length * 1000;

  const stepSize = useMemo(
    () => (sortedData.length > 0 ? 100 / (sortedData.length - 1) : 0),
    [sortedData.length],
  );

  const currentIndex = useMemo(
    () => Math.round(sliderValue / stepSize),
    [sliderValue, stepSize],
  );

  useEffect(() => {
    if (sortedData[currentIndex]) {
      setCurrentPacket(sortedData[currentIndex]);
    }
  }, [currentIndex, setCurrentPacket, sortedData]);

  const handlePlayPause = () => {
    setIsPlaying((prev) => {
      if (!prev) {
        playStartTime.current = Date.now();
        playStartSlider.current = sliderValue;
      } else {
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current);
        }
      }
      return !prev;
    });
  };

  useEffect(() => {
    const animate = () => {
      if (!playStartTime.current || !sortedData.length) return;

      const elapsed = Date.now() - playStartTime.current;
      const progressPercentage = (elapsed / PLAYBACK_DURATION) * 100;
      const newValue = Math.min(
        playStartSlider.current + progressPercentage,
        100,
      );

      setSliderValue(newValue);

      if (newValue < 100) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        setIsPlaying(false);
        setSliderValue(0);
      }
    };

    if (isPlaying) {
      animationRef.current = requestAnimationFrame(animate);
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [PLAYBACK_DURATION, isPlaying, sortedData.length]);

  const handleSliderChange = useCallback((value: number | number[]) => {
    if (typeof value === "number") {
      setSliderValue(value);
    }
  }, []);

  return (
    <div className="flex flex-row items-center justify-center gap-2 py-1">
      <button
        className="focus:none rounded-md bg-helios p-1"
        onClick={handlePlayPause}
      >
        {isPlaying ? (
          <PauseIcon color="white" height="25" width="25" />
        ) : (
          <PlayIcon color="white" height="25" width="25" />
        )}
      </button>
      <div className="w-full rounded-md bg-helios p-2">
        <Slider
          max={100}
          min={0}
          onChange={handleSliderChange}
          value={sliderValue}
        />
      </div>
    </div>
  );
}
