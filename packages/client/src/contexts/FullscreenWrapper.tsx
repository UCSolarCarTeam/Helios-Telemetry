import { PropsWithChildren, useState } from "react";

const FullscreenWrapper = ({ children }: PropsWithChildren<object>) => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  return (
    <div
      className={
        isFullscreen ? "fixed inset-0 z-50 overflow-auto bg-white p-4" : ""
      }
    >
      <button
        className="absolute right-2 top-2 z-50 rounded bg-helios px-2 py-1 text-xs text-white"
        onClick={() => setIsFullscreen((f) => !f)}
      >
        {isFullscreen ? "Close Fullscreen" : "Fullscreen"}
      </button>
      <div>{children}</div>
    </div>
  );
};

export default FullscreenWrapper;
