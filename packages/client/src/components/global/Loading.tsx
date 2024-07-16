import Image from "next/image";
import { useMemo } from "react";
import { twMerge } from "tailwind-merge";

import { LOADINGSTAGES } from "@/components/global/LoadingWrapper";

export function Loading(props: { currentLoadingState: LOADINGSTAGES }) {
  const { currentLoadingState } = props;
  const LoadingMessage = {
    [LOADINGSTAGES.DRIVE_IN]: "Connecting to Helios...",
    [LOADINGSTAGES.PENDING]: "Connecting to Helios...",
    [LOADINGSTAGES.READY]: "Connected to Helios!",
  };

  const carAnimationClass = useMemo(() => {
    switch (currentLoadingState) {
      case LOADINGSTAGES.PENDING:
        return "animate-bump";
      case LOADINGSTAGES.READY:
        return "animate-driveOffScreen";
      case LOADINGSTAGES.DRIVE_IN:
        return "animate-driveInScreen";
      default:
        return "";
    }
  }, [currentLoadingState]);

  return (
    <div
      className={`fixed z-50 flex h-screen w-screen items-center justify-center bg-white dark:bg-dark`}
    >
      <div className="left-1/2 top-1/2 flex flex-col items-center justify-center">
        <div className="flex size-96 items-center justify-center">
          <Image
            priority
            quality={50}
            className={twMerge("z-40", carAnimationClass)}
            src="/assets/HeliosSideview.png"
            alt="Loading..."
            width={300}
            height={300}
          />
        </div>
        <div
          className={twMerge(
            "absolute flex h-64 w-64 animate-circle items-center justify-end",
            currentLoadingState === LOADINGSTAGES.PENDING
              ? "visible"
              : "invisible",
          )}
        >
          <Image
            className="z"
            src="/assets/Sun.png"
            alt="Loading..."
            width={65}
            height={65}
          />
        </div>
        <div className="absolute bottom-0 z-30 h-1/2 w-full bg-white dark:bg-dark" />
        <h2
          className={twMerge(
            "z-50 text-2xl",
            currentLoadingState !== LOADINGSTAGES.READY && "text-helios",
            currentLoadingState === LOADINGSTAGES.READY && "text-green",
          )}
        >
          {LoadingMessage[currentLoadingState]}
        </h2>
      </div>
    </div>
  );
}
