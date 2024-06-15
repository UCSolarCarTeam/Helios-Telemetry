import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";

import { Loading } from "@/components/global/Loading";
import { useAppState } from "@/contexts/AppStateContext";

export enum LOADINGSTAGES {
  DRIVE_IN = 1,
  PENDING = 2,
  READY = 3,
}

export function LoadingWrapper(props: { children: React.ReactNode }) {
  const { children } = props;

  const { currentAppState, confirmVisualLoadingFulfilledAndReady } =
    useAppState();
  const [currentLoadingState, setCurrentLoadingStage] = useState<LOADINGSTAGES>(
    LOADINGSTAGES.DRIVE_IN,
  );

  useEffect(() => {
    let pendingTimeout: NodeJS.Timeout;
    let readyTimeout: NodeJS.Timeout;
    let confirmTimeout: NodeJS.Timeout;

    // Switch to drive off after app state reports loading is complete and minimum animation time is fulfilled
    const driveInTimeout = setTimeout(() => {
      setCurrentLoadingStage(LOADINGSTAGES.PENDING);
    }, 1000);

    // Confirm with App State that loading animation is fulfilled after car drives off screen
    if (!currentAppState.loading) {
      pendingTimeout = setTimeout(() => {
        setCurrentLoadingStage(LOADINGSTAGES.READY);
      }, 4000);
    }

    // Confirm with App State that loading animation is fulfilled after car drives off screen
    if (currentLoadingState === LOADINGSTAGES.READY) {
      confirmTimeout = setTimeout(() => {
        confirmVisualLoadingFulfilledAndReady();
      }, 800);
    }

    return () => {
      clearTimeout(driveInTimeout);
      clearTimeout(pendingTimeout);
      clearTimeout(readyTimeout);
      clearTimeout(confirmTimeout);
    };
  }, [
    currentAppState.loading,
    currentLoadingState,
    confirmVisualLoadingFulfilledAndReady,
  ]);

  return (
    <div className={twMerge(currentAppState.darkMode ? "dark" : "")}>
      {currentAppState.displayLoading ? (
        <Loading currentLoadingState={currentLoadingState} />
      ) : (
        <>{children}</>
      )}{" "}
    </div>
  );
}
