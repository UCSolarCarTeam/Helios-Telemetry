import { useEffect, useRef } from "react";

import { socketIO } from "@/components/global/SocketManager";
import { CONNECTIONTYPES, useAppState } from "@/stores/useAppState";
import { usePacketStore } from "@/stores/usePacket";
import { generateFakeTelemetryData } from "@shared/helios-types";
import type { ITelemetryData } from "@shared/helios-types";

export function PacketListenerManager(): React.ReactElement | null {
  const { currentAppState } = useAppState();
  const { setCurrentPacket } = usePacketStore();
  const demoIntervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    // Clean up any existing listeners/intervals
    const cleanup = () => {
      if (demoIntervalRef.current) {
        clearInterval(demoIntervalRef.current);
        demoIntervalRef.current = null;
      }
    };

    // If playback mode is on, don't attach anything
    if (currentAppState.playbackSwitch) {
      cleanup();
      return;
    }

    // Handle different connection types
    if (currentAppState.connectionType === CONNECTIONTYPES.NETWORK) {
      // Attach network listener
      const handlePacket = (packet: ITelemetryData) => {
        setCurrentPacket(packet);
      };

      socketIO.on("packet", handlePacket);

      return () => {
        socketIO.off("packet", handlePacket);
      };
    } else if (currentAppState.connectionType === CONNECTIONTYPES.DEMO) {
      // Start demo mode
      demoIntervalRef.current = setInterval(() => {
        setCurrentPacket(generateFakeTelemetryData());
      }, 500);

      return () => {
        if (demoIntervalRef.current) {
          clearInterval(demoIntervalRef.current);
          demoIntervalRef.current = null;
        }
      };
    } else if (currentAppState.connectionType === CONNECTIONTYPES.RADIO) {
      // TODO: handle radio
    }

    // Cleanup on unmount or mode change
    return cleanup;
  }, [
    currentAppState.connectionType,
    currentAppState.playbackSwitch,
    setCurrentPacket,
  ]);

  return null;
}
