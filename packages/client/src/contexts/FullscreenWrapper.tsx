import { PropsWithChildren, useRef } from "react";

const FullscreenWrapper = ({ children }: PropsWithChildren<object>) => {
  const targetElement = useRef<HTMLDivElement>(null);

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

  return (
    <div ref={targetElement}>
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
