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

  const {
    currentAppState,
    confirmVisualLoadingFulfilledAndReady,
    setCurrentAppState,
  } = useAppState();
  const [currentLoadingState, setCurrentLoadingStage] = useState<LOADINGSTAGES>(
    LOADINGSTAGES.DRIVE_IN,
  );

  useEffect(() => {
    console.log("currentAppState.loading", currentAppState);
    let pendingTimeout: NodeJS.Timeout;
    let readyTimeout: NodeJS.Timeout;
    let confirmTimeout: NodeJS.Timeout;

    // If loading is true again after loading previously finished, restart loading by setting to drive in
    if (
      currentAppState.loading &&
      currentLoadingState === LOADINGSTAGES.READY
    ) {
      setCurrentLoadingStage(LOADINGSTAGES.DRIVE_IN);
      setCurrentAppState((prev) => ({
        ...prev,
        displayLoading: true,
      }));
    }

    // Switch to drive off after app state reports loading is complete and minimum animation time is fulfilled
    const driveInTimeout = setTimeout(() => {
      setCurrentLoadingStage(LOADINGSTAGES.PENDING);
    }, 1000);

    // Once site is ready, delay loader for 3 additional seconds and then transition to driving off screen
    if (!currentAppState.loading) {
      pendingTimeout = setTimeout(() => {
        setCurrentLoadingStage(LOADINGSTAGES.READY);
      }, 3000);
    }

    // Confirm with App State that car driving off screen animation is fulfilled before hiding loader
    if (currentLoadingState === LOADINGSTAGES.READY) {
      confirmTimeout = setTimeout(() => {
        confirmVisualLoadingFulfilledAndReady();
      }, 800);
    }

    return () => {
      // TODO: Adding these makes the timeouts clear before they run since the app state is constantly rerendered @brian-ngyn
      // clearTimeout(driveInTimeout);
      // clearTimeout(pendingTimeout);
      // clearTimeout(readyTimeout);
      // clearTimeout(confirmTimeout);
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
