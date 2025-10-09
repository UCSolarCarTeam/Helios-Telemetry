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
import React from "react";

import useFullscreen from "@/hooks/useFullscreen";
import FullscreenIcon from "@mui/icons-material/Fullscreen";
import FullscreenExitIcon from "@mui/icons-material/FullscreenExit";

import style from "./fullscreen.module.css";

const FullscreenWrapper = ({
  children,
  className = "",
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

  // function to get child component name
  const getComponentName = () => {
    const childArray = React.Children.toArray(children);
    if (childArray.length > 0) {
      const firstChild = childArray[0];
      if (React.isValidElement(firstChild)) {
        // if child is a function component
        if (typeof firstChild.type === "function") {
          return firstChild.type.name || "Component";
        }
        // if child is a string (ie. 'div', 'span', etc.)
        if (typeof firstChild.type === "string") {
          return firstChild.type;
        }
      }
    }
    return "Unknown Component";
  };

  // have to manually define theme classes when in fullscreen mode
  const fullscreenClasses = isFullscreen
    ? resolvedTheme === "dark"
      ? "dark dark:bg-dark text-dark"
      : "bg-light text-light"
    : "";

  return (
    <div
      className={`relative ${fullscreenClasses} ${className}`}
      ref={targetElement}
    >
      <div
        className={`flex items-center gap-2 px-2 text-xs ${isFullscreen ? "pt-4" : ""}`}
      >
        <button
          className={`hidden rounded ${style.mdScreenBlock} ${fullscreenClasses}`}
          onClick={toggleFullScreen}
          title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
        >
          {isFullscreen ? <FullscreenExitIcon /> : <FullscreenIcon />}
        </button>
        <div className="font-bold">{getComponentName()}</div>
      </div>
      <div className="size-full">{children}</div>
    </div>
  );
};

export default FullscreenWrapper;
