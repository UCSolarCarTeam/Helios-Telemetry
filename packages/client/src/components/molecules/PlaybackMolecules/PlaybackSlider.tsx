import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import PauseIcon from "@/components/atoms/PauseIcon";
import PlayIcon from "@/components/atoms/PlayIcon";
import { usePacket } from "@/contexts/PacketContext";
import Tooltip from "@mui/material/Tooltip";

import { fakeData } from "./fakedata";

export default function PlaybackSlider() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [sliderValue, setSliderValue] = useState(0);
  const [hoverValue, setHoverValue] = useState<number | null>(null);
  const animationRef = useRef<number>(null);
  const playStartTime = useRef<number>(null);
  const playStartSlider = useRef<number>(0);
  const [tooltipPosition, setTooltipPosition] = useState({ left: 0, top: 0 });

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
        return (
          <div className="flex flex-col items-center gap-1">
            <p>Packet: {index + 1}</p>
            {`Timestamp: ${new Date(
              sortedData[index].TimeStamp,
            ).toLocaleString()}`}
          </div>
        );
      }
      return "";
    },
    [sortedData, stepSize],
  );

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const hoverPercentage = (x / rect.width) * 100; // calculate the percentage of the hover position relative to slider, set tooltip to this packet
    setHoverValue(hoverPercentage);
    setTooltipPosition({ left: x + rect.left, top: rect.top });
  };

  const handleMouseLeave = () => {
    setHoverValue(null);
  };

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
        <Tooltip
          PopperProps={{
            anchorEl: {
              getBoundingClientRect: () =>
                new DOMRect(tooltipPosition.left, tooltipPosition.top, 0, 0),
            },
          }}
          arrow
          open={!!hoverValue}
          placement="top"
          title={hoverValue ? getTooltipContent(hoverValue) : ""}
        >
          <div onMouseLeave={handleMouseLeave} onMouseMove={handleMouseMove}>
            <Slider
              max={100}
              min={0}
              onChange={(value) => {
                setHoverValue(null);
                handleSliderChange(value);
              }}
              onChangeComplete={() => setHoverValue(null)}
              value={sliderValue}
            />
          </div>
        </Tooltip>
      </div>
    </div>
  );
}
