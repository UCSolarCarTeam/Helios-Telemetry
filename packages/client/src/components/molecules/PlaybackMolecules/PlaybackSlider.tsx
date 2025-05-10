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
  const isPlayingRef = useRef(isPlaying);

  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    isPlayingRef.current = isPlaying;
  }, [isPlaying]);

  const { hasData, sortedPlaybackData } = useMemo(() => {
    const sortedData =
      playbackData && playbackData.length > 0
        ? [...playbackData].sort((a, b) => a.TimeStamp - b.TimeStamp)
        : [];
    return {
      hasData: sortedData.length > 0,
      sortedPlaybackData: sortedData,
    };
  }, [playbackData]);

  const MAX_PLAYBACK_DURATION = 240000;

  const PLAYBACK_DURATION = useMemo(() => {
    if (!hasData) return 0;
    return Math.min(sortedPlaybackData.length * 1000, MAX_PLAYBACK_DURATION);
  }, [sortedPlaybackData.length, hasData]);

  const stepSize = useMemo(
    () =>
      hasData && sortedPlaybackData.length > 1
        ? 100 / (sortedPlaybackData.length - 1)
        : 0,
    [sortedPlaybackData.length, hasData],
  );

  const currentIndex = useMemo(
    () => (stepSize > 0 ? Math.round(sliderValue / stepSize) : 0),
    [sliderValue, stepSize],
  );

  const prevIndexRef = useRef(currentIndex);

  useEffect(() => {
    if (
      hasData &&
      sortedPlaybackData[currentIndex] &&
      currentIndex !== prevIndexRef.current
    ) {
      setCurrentPacket(sortedPlaybackData[currentIndex]);
      prevIndexRef.current = currentIndex;
    }
  }, [currentIndex, setCurrentPacket, sortedPlaybackData, hasData]);

  const handlePlayPause = () => {
    setIsPlaying((prev) => {
      if (prev) {
        if (animationRef.current) {
          cancelAnimationFrame(animationRef.current);
          animationRef.current = null;
        }
        return false;
      } else {
        playStartTime.current = Date.now();
        playStartSlider.current = sliderValue;
        animationRef.current = requestAnimationFrame(animate);
        return true;
      }
    });
  };

  const animate = () => {
    if (!playStartTime.current || !hasData || !isPlayingRef.current) return;

    const elapsed = Date.now() - playStartTime.current;
    const totalSteps = sortedPlaybackData.length - 1;

    const progressIndex =
      playStartSlider.current + (elapsed / PLAYBACK_DURATION) * totalSteps;

    const clampedProgress = Math.min(progressIndex, totalSteps);
    setSliderValue(clampedProgress);

    const flooredIndex = Math.floor(clampedProgress);
    if (flooredIndex > prevIndexRef.current) {
      prevIndexRef.current = flooredIndex;
      if (sortedPlaybackData[flooredIndex]) {
        setCurrentPacket(sortedPlaybackData[flooredIndex]);
      }
    }

    if (progressIndex < totalSteps) {
      animationRef.current = requestAnimationFrame(animate);
    } else {
      setIsPlaying(false);
      setSliderValue(totalSteps);
      if (sortedPlaybackData[totalSteps]) {
        setCurrentPacket(sortedPlaybackData[totalSteps]);
      }
    }
  };

  useEffect(() => {
    if (isPlaying) {
      animationRef.current = requestAnimationFrame(animate);
    } else {
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
        const clamped = Math.max(
          0,
          Math.min(value, sortedPlaybackData.length - 1),
        );
        setSliderValue(clamped);

        // Debounce the packet update
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }

        timeoutRef.current = setTimeout(() => {
          if (sortedPlaybackData[clamped]) {
            setCurrentPacket(sortedPlaybackData[clamped]);
          }
          prevIndexRef.current = clamped;
        }, 100); // 100ms delay to avoid excessive updates
      }
    },
    [sortedPlaybackData.length, setCurrentPacket],
  );

  const getTooltipContent = useCallback(
    (value: number) => {
      const index = Math.round(value / stepSize);
      if (hasData && sortedPlaybackData[index]) {
        return (
          <div className="flex flex-col items-center gap-1">
            <p>Packet: {index + 1}</p>
            <p>{`Timestamp: ${new Date(
              sortedPlaybackData[index].TimeStamp * 1000,
            ).toLocaleString()}`}</p>
          </div>
        );
      }
      return "";
    },
    [sortedPlaybackData, stepSize, hasData],
  );

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const hoverPercentage = (x / rect.width) * 100;
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
              max={sortedPlaybackData.length - 1}
              min={0}
              onChange={(value) => {
                setHoverValue(null);
                handleSliderChange(value);
              }}
              onChangeComplete={() => setHoverValue(null)}
              value={sliderValue} // Bind the slider value directly
            />
          </div>
        </Tooltip>
      </div>
    </div>
  );
}
