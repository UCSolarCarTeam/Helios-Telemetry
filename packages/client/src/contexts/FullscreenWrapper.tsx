/**
 * This is a wrapper component that adds fullscreen functionality to any child component.
 *
 * Usage:
 * ```tsx
 * <FullscreenWrapper>
 *   <YourComponent />
 * </FullscreenWrapper>
 * ```
 *
 * Some things to note:
 * - We use the fullscreen API to implement the fullscreen functionality. This is not supported in all browsers; in particular,
 *   mobile browsers do not support it. That is why we hide the button on mobile.
 * - We have to manually define theme classes when in fullscreen mode because once a component is in fullscreen mode, it loses context about parent's styling.
 */
import { useTheme } from "next-themes";
import { PropsWithChildren, useEffect, useRef, useState } from "react";

import FullscreenIcon from "@mui/icons-material/Fullscreen";
import FullscreenExitIcon from "@mui/icons-material/FullscreenExit";

const FullscreenWrapper = ({ children }: PropsWithChildren<object>) => {
  const targetElement = useRef<HTMLDivElement>(null);
  const { resolvedTheme } = useTheme();
  const [isFullscreen, setIsFullscreen] = useState(false);

  function toggleFullScreen() {
    const elementReferenced = targetElement.current;
    if (!elementReferenced) {
      return;
    }
    if (!document.fullscreenElement) {
      elementReferenced.requestFullscreen();
    } else {
      document.exitFullscreen?.();
    }
  }

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  // have to manually define theme classes when in fullscreen mode
  const fullscreenClasses = isFullscreen
    ? resolvedTheme === "dark"
      ? "dark dark:bg-dark text-dark"
      : "bg-light text-light"
    : "";

  return (
    <div className={`relative ${fullscreenClasses}`} ref={targetElement}>
      <button
        className="absolute right-0 top-0 z-50 mr-2 mt-2 rounded px-2 py-1 text-xs text-light transition-colors hover:bg-gray-200 dark:text-dark hover:dark:bg-gray-700"
        onClick={() => toggleFullScreen()}
        title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
      >
        {isFullscreen ? <FullscreenExitIcon /> : <FullscreenIcon />}
      </button>
      {children}
    </div>
  );
};

export default FullscreenWrapper;
