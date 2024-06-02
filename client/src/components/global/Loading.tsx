import Image from "next/image";
import { use, useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";

import { useAppState } from "@/contexts/AppStateContext";

enum LOADINGSTAGES {
  DRIVE_IN = 1,
  PENDING = 2,
  DRIVE_OFF = 3,
  READY = 4,
}

export function Loading() {
  const { currentAppState, confirmVisualLoadingFulfilledAndReady } =
    useAppState();
  const [currentLoadingState, setCurrentLoadingStage] = useState<LOADINGSTAGES>(
    LOADINGSTAGES.DRIVE_IN,
  );

  // Switch to pending After 1 second
  useEffect(() => {
    setTimeout(() => {
      setCurrentLoadingStage(LOADINGSTAGES.PENDING);
    }, 1000);
  }, []);

  // Switch to drive off after app state reports loading is complete and minimum animation time is fulfilled
  useEffect(() => {
    if (!currentAppState.loading) {
      setTimeout(() => {
        setCurrentLoadingStage(LOADINGSTAGES.DRIVE_OFF);
      }, 4000);
    }
  }, [currentAppState.loading]);

  // Confirm with App State that loading animation is fulfilled
  useEffect(() => {
    if (currentLoadingState === LOADINGSTAGES.DRIVE_OFF) {
      setTimeout(() => {
        confirmVisualLoadingFulfilledAndReady();
        setCurrentLoadingStage(LOADINGSTAGES.READY);
      }, 1000);
    }
  }, [currentLoadingState]);

  return (
    <div
      className={`fixed z-50 flex h-screen w-screen items-center justify-center `}
    >
      <div className="left-1/2 top-1/2 flex flex-col items-center justify-center">
        <div className="flex h-96 w-96 items-center justify-center ">
          <Image
            className={twMerge(
              currentLoadingState === LOADINGSTAGES.PENDING &&
                "animate-bounce ease-linear",
              currentLoadingState === LOADINGSTAGES.DRIVE_OFF &&
                "animate-driveOffScreen",
              currentLoadingState === LOADINGSTAGES.DRIVE_IN &&
                "animate-driveInScreen",
            )}
            src="/assets/HeliosSideView.png"
            alt="Loading..."
            width={300}
            height={300}
            style={{}}
          />
        </div>
        <div
          className={twMerge(
            "animate-circle absolute flex h-96 w-96 items-center justify-center",
            currentLoadingState === LOADINGSTAGES.PENDING
              ? "visible"
              : "invisible",
          )}
        >
          <Image
            className=""
            src="/assets/HeliosBirdseye.png"
            alt="Loading..."
            width={35}
            height={35}
          />
        </div>
        <h2 className="text-helios text-2xl">Connecting to Helios...</h2>
      </div>
    </div>
  );
}
