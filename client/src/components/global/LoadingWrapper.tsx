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
        setCurrentLoadingStage(LOADINGSTAGES.READY);
      }, 40000);
    }
  }, [currentAppState.loading]);

  // Confirm with App State that loading animation is fulfilled after car drives off screen
  useEffect(() => {
    if (currentLoadingState === LOADINGSTAGES.READY) {
      setTimeout(() => {
        confirmVisualLoadingFulfilledAndReady();
      }, 800);
    }
  }, [currentLoadingState]);

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
