import { useEffect } from "react";

import { useAppState } from "@/contexts/AppStateContext";
import { CONNECTIONTYPES } from "@/contexts/AppStateContext";
import { usePacketStore } from "@/stores/usePacket";

export function PacketListenerManager(): React.ReactElement | null {
  const { currentAppState } = useAppState();
  const {
    attachNetworkListener,
    detachNetworkListener,
    startDemoMode,
    stopDemoMode,
  } = usePacketStore();

  useEffect(() => {
    if (currentAppState.playbackSwitch) {
      // Nothing to attach
      stopDemoMode();
      detachNetworkListener();
      return;
    }

    if (currentAppState.connectionType === CONNECTIONTYPES.NETWORK) {
      attachNetworkListener();
      return () => detachNetworkListener();
    } else if (currentAppState.connectionType === CONNECTIONTYPES.DEMO) {
      startDemoMode();
      return () => stopDemoMode();
    } else if (currentAppState.connectionType === CONNECTIONTYPES.RADIO) {
      // TODO: handle radio
    }

    // Clean up on unmount
    return () => {
      stopDemoMode();
      detachNetworkListener();
    };
  }, [currentAppState.connectionType, currentAppState.playbackSwitch]);

  return null;
}
