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
  const animationRef = useRef<number | null>(null);
  const playStartTime = useRef<number | null>(null);
  const playStartSlider = useRef<number>(0);
  const [tooltipPosition, setTooltipPosition] = useState({ left: 0, top: 0 });

  const { setCurrentPacket } = usePacket();
  const { playbackData } = usePlaybackContext();

  const hasData = useMemo(
    () => playbackData && playbackData.length > 0,
    [playbackData],
  );

  const PLAYBACK_DURATION = useMemo(
    () => (hasData ? playbackData.length * 1000 : 0),
    [playbackData.length, hasData],
  );

  const stepSize = useMemo(
    () =>
      hasData && playbackData.length > 1 ? 100 / (playbackData.length - 1) : 0,
    [playbackData.length, hasData],
  );

  const currentIndex = useMemo(
    () => (stepSize > 0 ? Math.round(sliderValue / stepSize) : 0),
    [sliderValue, stepSize],
  );

  // Using a ref to avoid rerunning the effect too often
  const prevIndexRef = useRef(currentIndex);

  useEffect(() => {
    if (
      hasData &&
      playbackData[currentIndex] &&
      currentIndex !== prevIndexRef.current
    ) {
      setCurrentPacket(playbackData[currentIndex]);
      prevIndexRef.current = currentIndex;
    }
  }, [currentIndex, setCurrentPacket, playbackData, hasData]);

  const handlePlayPause = () => {
    setIsPlaying((prev) => {
      if (prev) {
        // Pause functionality: cancel the animation and stop updating slider value
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current);
          animationRef.current = null;
        }
        return false; // Set playing state to false
      } else {
        // Play functionality: start animation
        playStartTime.current = Date.now();
        playStartSlider.current = sliderValue;
        animationRef.current = requestAnimationFrame(animate);
        return true; // Set playing state to true
      }
    });
  };

  const animate = () => {
    if (!playStartTime.current || !hasData) return;

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
      setSliderValue(100); // Ensure it reaches the end of the slider
    }
  };

  useEffect(() => {
    if (isPlaying) {
      animationRef.current = requestAnimationFrame(animate);
    } else {
      // Cancel animation frame when paused
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
        animationRef.current = null;
      }
    }
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isPlaying]);

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
      if (hasData && playbackData[index]) {
        return (
          <div className="flex flex-col items-center gap-1">
            <p>Packet: {index + 1}</p>
            <p>{`Timestamp: ${new Date(
              playbackData[index].TimeStamp * 1000,
            ).toLocaleString()}`}</p>
          </div>
        );
      }
      return "";
    },
    [playbackData, stepSize, hasData],
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

  if (!hasData) {
    return (
      <p className="text-gray-500 mt-3 text-center font-bold text-helios">
        Please select a valid date and time range before viewing playback data
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
