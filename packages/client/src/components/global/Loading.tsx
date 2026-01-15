import Image from "next/image";
import { memo, useMemo } from "react";
import { twMerge } from "tailwind-merge";

import { LOADINGSTAGES } from "@/components/global/LoadingWrapper";
import { useAppState } from "@/stores/useAppState";

const Loading = (props: { currentLoadingState: LOADINGSTAGES }) => {
  const { currentAppState } = useAppState();

  const { currentLoadingState } = props;
  const LoadingMessage = {
    [LOADINGSTAGES.DRIVE_IN]: `Connecting to Helios...`,
    [LOADINGSTAGES.PENDING]: "Connecting to Helios...",
    [LOADINGSTAGES.READY]:
      currentAppState.socketConnected || currentAppState.radioConnected
        ? "Connected to Helios!"
        : "Can't connect to Helios, showing demo.",
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
            alt="Loading..."
            className={twMerge("z-40", carAnimationClass)}
            height={300}
            quality={50}
            src="/assets/HeliosSideview.png"
            width={300}
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
            alt="Loading..."
            className="z"
            height={65}
            src="/assets/Sun.png"
            width={65}
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
};

export default memo(Loading);
