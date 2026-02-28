import { useEffect } from "react";

import { socketIO } from "@/components/global/SocketManager";
import { useLaps } from "@/hooks/useLaps";
import { CONNECTIONTYPES, useAppState } from "@/stores/useAppState";
import { formatLapData, useLapDataStore } from "@/stores/useLapData";
import { notifications } from "@mantine/notifications";
import type { ILapData } from "@shared/helios-types";

export function LapListenerManager(): React.ReactElement | null {
  const { currentAppState } = useAppState();
  const { addLapData, clearLapData, setLapData } = useLapDataStore();

  // Use TanStack Query hook to fetch lap data
  const { data: laps } = useLaps();

  // Sync TanStack Query data to Zustand store
  useEffect(() => {
    if (laps) {
      const formattedLaps = laps.map(formatLapData);
      setLapData(formattedLaps);
    }
  }, [laps, setLapData]);

  // Handle connection type changes
  useEffect(() => {
    // Playback mode: no listeners, clear data
    if (currentAppState.playbackSwitch) {
      clearLapData();
      return;
    }

    // Network mode: attach socket listeners
    if (currentAppState.connectionType === CONNECTIONTYPES.NETWORK) {
      const handleLapData = (lapPacket: ILapData) => {
        const formattedData = formatLapData(lapPacket);
        addLapData(formattedData);
      };

      const handleLapComplete = () => {
        notifications.show({
          color: "green",
          message: "A lap has been completed!",
          title: "Lap Completion",
        });
      };

      socketIO.on("lapData", handleLapData);
      socketIO.on("lapComplete", handleLapComplete);

      return () => {
        socketIO.off("lapData", handleLapData);
        socketIO.off("lapComplete", handleLapComplete);
      };
    }

    // Demo mode: clear existing lap data
    else if (currentAppState.connectionType === CONNECTIONTYPES.DEMO) {
      clearLapData();
    }

    // Radio mode: TODO
    else if (currentAppState.connectionType === CONNECTIONTYPES.RADIO) {
      // TODO: handle radio
    }
  }, [
    currentAppState.connectionType,
    currentAppState.playbackSwitch,
    addLapData,
    clearLapData,
  ]);

  return null;
}
