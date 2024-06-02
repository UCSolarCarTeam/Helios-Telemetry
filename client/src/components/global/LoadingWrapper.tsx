import { useEffect } from "react";

import { Loading } from "@/components/global/Loading";
import { useAppState } from "@/contexts/AppStateContext";

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
