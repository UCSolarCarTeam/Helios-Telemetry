import { useEffect } from "react";

import { useAppState } from "@/contexts/AppStateContext";

import { Loading } from "./Loading";

export function LoadingWrapper(props: { children: React.ReactNode }) {
  const { children } = props;
  const { currentAppState } = useAppState();
  useEffect(() => {
    console.log(
      "LoadingWrapper.tsx: displayLoading",
      currentAppState.displayLoading,
    );
  }, [currentAppState.displayLoading]);

  return currentAppState.displayLoading ? <Loading /> : <>{children}</>;
}
