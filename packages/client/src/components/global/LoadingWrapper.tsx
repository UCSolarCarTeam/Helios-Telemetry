import { type PropsWithChildren, memo, useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";

import Loading from "@/components/global/Loading";
import { useAppState } from "@/contexts/AppStateContext";

export enum LOADINGSTAGES {
  DRIVE_IN = 1,
  PENDING = 2,
  READY = 3,
}

const LoadingWrapper = ({ children }: PropsWithChildren) => {
  const { currentAppState, setCurrentAppState } = useAppState();
  const [currentLoadingState, setCurrentLoadingStage] = useState<LOADINGSTAGES>(
    LOADINGSTAGES.DRIVE_IN,
  );

  useEffect(() => {
    let driveInTimeout: NodeJS.Timeout;
    let pendingTimeout: NodeJS.Timeout;
    // let readyTimeout: NodeJS.Timeout;
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
    if (currentLoadingState === LOADINGSTAGES.DRIVE_IN) {
      driveInTimeout = setTimeout(() => {
        setCurrentLoadingStage(LOADINGSTAGES.PENDING);
      }, 1000);
    }

    // Once site is ready, delay loader for 3 additional seconds and then transition to driving off screen
    if (!currentAppState.loading) {
      pendingTimeout = setTimeout(() => {
        setCurrentLoadingStage(LOADINGSTAGES.READY);
      }, 3000);
    }

    // Confirm with App State that car driving off screen animation is fulfilled before hiding loader
    if (currentLoadingState === LOADINGSTAGES.READY) {
      confirmTimeout = setTimeout(() => {
        setCurrentAppState((prev) => ({
          ...prev,
          displayLoading: false,
        }));
      }, 800);
    }

    return () => {
      clearTimeout(driveInTimeout);
      // clearTimeout(readyTimeout);
      clearTimeout(pendingTimeout);
      clearTimeout(confirmTimeout);
    };
    // TODO: Adding these makes the timeouts clear before they run since the app state is constantly rerendered @brian-ngyn
  }, [currentAppState.loading, currentLoadingState, setCurrentAppState]);

  return (
    <div className={twMerge(currentAppState.darkMode ? "dark" : "")}>
      {currentAppState.displayLoading ? (
        <Loading currentLoadingState={currentLoadingState} />
      ) : (
        <>{children}</>
      )}{" "}
    </div>
  );
};

export default memo(LoadingWrapper);
