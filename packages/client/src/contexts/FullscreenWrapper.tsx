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
import { PropsWithChildren, useRef } from "react";

import useFullscreen from "@/hooks/useFullscreen";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import FullscreenExitIcon from "@mui/icons-material/FullscreenExit";

import style from "./fullscreen.module.css";

const FullscreenWrapper = ({
  children,
  className,
}: PropsWithChildren<{ className?: string }>) => {
  const targetElement = useRef<HTMLDivElement>(null);
  const { resolvedTheme } = useTheme();
  const isFullscreen = useFullscreen();

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

  // have to manually define theme classes when in fullscreen mode
  const fullscreenClasses = isFullscreen
    ? resolvedTheme === "dark"
      ? "dark dark:bg-dark text-dark"
      : "bg-light text-light"
    : "";

  return (
    <div
      className={`relative ${fullscreenClasses} ${className || ""}`}
      ref={targetElement}
    >
      <button
        className={`absolute right-2 top-2 z-50 hidden rounded px-2 py-1 text-xs ${fullscreenClasses} ${style.mdScreenBlock}`}
        onClick={toggleFullScreen}
        title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
      >
        {isFullscreen ? <FullscreenExitIcon /> : <FullscreenIcon />}
      </button>
      <div className="size-full">{children}</div>
    </div>
  );
};

export default FullscreenWrapper;
