import { useEffect, useState } from "react";

/**
 * Custom hook to detect if the current element is in fullscreen mode
 * @returns boolean indicating if any element is currently in fullscreen mode
 */
export const useFullscreen = (): boolean => {
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    setIsFullscreen(!!document.fullscreenElement);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  return isFullscreen;
};

export default useFullscreen;
