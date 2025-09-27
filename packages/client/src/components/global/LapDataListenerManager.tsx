import { useEffect } from "react";

import { CONNECTIONTYPES, useAppState } from "@/contexts/AppStateContext";
import { useLapDataStore } from "@/stores/useLapData";

export function LapListenerManager(): React.ReactElement | null {
  const { currentAppState } = useAppState();
  const {
    attachNetworkListener,
    clearLapData,
    detachNetworkListener,
    fetchLapData,
  } = useLapDataStore();

  useEffect(() => {
    // Always fetch initial lap data when manager mounts
    fetchLapData();

    if (currentAppState.playbackSwitch) {
      // playback mode: no listeners, just clear data if needed
      clearLapData();
      detachNetworkListener();
      return;
    }

    if (currentAppState.connectionType === CONNECTIONTYPES.NETWORK) {
      attachNetworkListener();
      return () => {
        detachNetworkListener();
      };
    } else if (currentAppState.connectionType === CONNECTIONTYPES.DEMO) {
      clearLapData();
    } else if (currentAppState.connectionType === CONNECTIONTYPES.RADIO) {
    }

    return () => {
      detachNetworkListener();
    };
  }, [currentAppState.connectionType, currentAppState.playbackSwitch]);

  return null;
}
