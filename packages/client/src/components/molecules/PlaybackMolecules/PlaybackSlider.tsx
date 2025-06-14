import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import PauseIcon from "@/components/atoms/PauseIcon";
import PlayIcon from "@/components/atoms/PlayIcon";
import { usePacket } from "@/contexts/PacketContext";
import { usePlaybackContext } from "@/contexts/PlayBackContext";
import Tooltip from "@mui/material/Tooltip";

export default function PlaybackSlider() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [sliderValue, setSliderValue] = useState(0);
  const [hoverValue, setHoverValue] = useState<number | null>(null);
  const animationRef = useRef<number>(null);
  const playStartTime = useRef<number>(null);
  const playStartSlider = useRef<number>(0);
  const [tooltipPosition, setTooltipPosition] = useState({ left: 0, top: 0 });
  const hoverAnchorRef = useRef<HTMLDivElement>(null);

  const { setCurrentPacket } = usePacket();
  const { playbackData } = usePlaybackContext();

  const { hasData, sortedData } = useMemo(() => {
    const sortedData =
      playbackData && playbackData.length > 0
        ? [...playbackData].sort((a, b) => a.TimeStamp - b.TimeStamp)
        : [];
    return {
      hasData: sortedData.length > 0,
      sortedData,
    };
  }, [playbackData]);

  const PLAYBACK_DURATION = useMemo(
    () => sortedData.length * 1000,
    [sortedData.length],
  );

  const stepSize = useMemo(
    () => (sortedData.length > 0 ? 100 / (sortedData.length - 1) : 0),
    [sortedData.length],
  );

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

  const lastPacketIndexRef = useRef<number>(-1);

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

      const index = Math.round(newValue / stepSize);

      if (index !== lastPacketIndexRef.current && sortedData[index]) {
        setCurrentPacket(sortedData[index]);
        lastPacketIndexRef.current = index;
      }

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

  const handleSliderRelease = useCallback(() => {
    const index = Math.round(sliderValue / stepSize);
    if (sortedData[index]) {
      setCurrentPacket(sortedData[index]);
    }
  }, [sliderValue, stepSize, sortedData, setCurrentPacket]);

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
    const hoverPercentage = (x / rect.width) * 100;
    setHoverValue(hoverPercentage);
    setTooltipPosition({ left: x, top: 0 });
  };

  const handleMouseLeave = () => {
    setHoverValue(null);
  };

  if (!hasData) {
    return (
      <p className="text-gray-500 mt-3 text-center font-bold text-helios">
        Please select a valid date and time range before viewing playback data
        (Note: Max interval is 10 minutes).
      </p>
    );
  }

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
      <div className="relative w-full rounded-md bg-helios p-2">
        <div
          className="absolute h-0 w-0"
          ref={hoverAnchorRef}
          style={{
            left: tooltipPosition.left,
            top: tooltipPosition.top,
          }}
        />
        <Tooltip
          PopperProps={{
            anchorEl: hoverAnchorRef.current,
          }}
          arrow
          open={!!hoverValue}
          placement="top"
          title={hoverValue ? getTooltipContent(hoverValue) : ""}
        >
          <div
            className={
              isPlaying ? "pointer-events-none" : "pointer-events-auto"
            }
            onMouseLeave={handleMouseLeave}
            onMouseMove={handleMouseMove}
          >
            <Slider
              max={100}
              min={0}
              onChange={(value) => {
                setHoverValue(null);
                handleSliderChange(value);
              }}
              onChangeComplete={handleSliderRelease}
              value={sliderValue}
            />
          </div>
        </Tooltip>
      </div>
    </div>
  );
}
