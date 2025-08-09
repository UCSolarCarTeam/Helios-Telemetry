import { useTheme } from "next-themes";
import { PropsWithChildren, useEffect, useRef, useState } from "react";

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
    <div
      className={`${fullscreenClasses} ${isFullscreen ? "p-4" : ""}`}
      ref={targetElement}
    >
      <button
        className="right-2 top-2 z-50 rounded bg-helios px-2 py-1 text-xs text-white"
        onClick={() => toggleFullScreen()}
      >
        Toggle Fullscreen
      </button>
      <div>{children}</div>
    </div>
  );
};

export default FullscreenWrapper;
