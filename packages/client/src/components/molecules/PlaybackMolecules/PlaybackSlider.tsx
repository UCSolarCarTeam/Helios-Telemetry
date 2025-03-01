import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import Tooltip from "rc-tooltip";
import "rc-tooltip/assets/bootstrap.css";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import PauseIcon from "@/components/atoms/PauseIcon";
import PlayIcon from "@/components/atoms/PlayIcon";
import { usePacket } from "@/contexts/PacketContext";

import { fakeData } from "./fakedata";

export default function PlaybackSlider() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [sliderValue, setSliderValue] = useState(0);
  const [hoverValue, setHoverValue] = useState<number | null>(null);
  const animationRef = useRef<number>(null);
  const playStartTime = useRef<number>(null);
  const playStartSlider = useRef<number>(0);

  const { setCurrentPacket } = usePacket();

  const sortedData = useMemo(
    () => [...fakeData].sort((a, b) => a.TimeStamp - b.TimeStamp),
    [],
  );

  // dynamic playback duration based on the length of how many packets were fetched
  const PLAYBACK_DURATION = useMemo(
    () => sortedData.length * 1000,
    [sortedData.length],
  );

  const stepSize = useMemo(
    () => (sortedData.length > 0 ? 100 / (sortedData.length - 1) : 0),
    [sortedData.length],
  );

  const currentIndex = useMemo(
    () => (stepSize > 0 ? Math.round(sliderValue / stepSize) : 0),
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

  const handleSliderChange = useCallback(
    (value: number | number[]) => {
      if (typeof value === "number") {
        setSliderValue(value);
        setHoverValue(value);

        if (isPlaying) {
          playStartTime.current = Date.now();
          playStartSlider.current = value;
        }
      }
    },
    [isPlaying],
  );

  const getTooltipContent = useCallback(
    (value: number) => {
      const index = Math.round(value / stepSize);
      if (sortedData[index]) {
        return `Packet: ${index + 1}, Timestamp: ${new Date(
          sortedData[index].TimeStamp,
        ).toLocaleString()}`;
      }
      return "";
    },
    [sortedData, stepSize],
  );

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
          handleRender={(node, props) => (
            <Tooltip
              classNames={{ root: "width: max-content" }}
              overlay={getTooltipContent(props.value)}
              placement="top"
              visible={hoverValue !== null}
            >
              {node}
            </Tooltip>
          )}
          max={100}
          min={0}
          onChange={handleSliderChange}
          value={sliderValue}
        />
      </div>
    </div>
  );
}
