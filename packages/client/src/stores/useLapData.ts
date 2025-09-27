import axios from "axios";
import { create } from "zustand";

import { socketIO } from "@/contexts/SocketContext";
import { notifications } from "@mantine/notifications";
import { IFormattedLapData, ILapData, prodURL } from "@shared/helios-types";

export const formatLapData = (lapPacket: ILapData): IFormattedLapData => ({
  Rfid: lapPacket.Rfid,
  data: {
    ampHours: parseFloat(lapPacket.data.ampHours.toFixed(2)),
    averagePackCurrent: parseFloat(
      lapPacket.data.averagePackCurrent.toFixed(2),
    ),
    averageSpeed: parseFloat(lapPacket.data.averageSpeed.toFixed(2)),
    batterySecondsRemaining: parseFloat(
      lapPacket.data.batterySecondsRemaining.toFixed(2),
    ),
    distance: parseFloat(lapPacket.data.distance.toFixed(2)),
    energyConsumed: parseFloat(lapPacket.data.energyConsumed.toFixed(2)),
    lapTime: parseFloat(lapPacket.data.lapTime.toFixed(2)),
    netPowerOut: parseFloat(lapPacket.data.netPowerOut.toFixed(2)),
    timeStamp: new Date(lapPacket.data.timeStamp).toLocaleString("en-US"),
    totalPowerIn: parseFloat(lapPacket.data.totalPowerIn.toFixed(2)),
    totalPowerOut: parseFloat(lapPacket.data.totalPowerOut.toFixed(2)),
  },
  timestamp: lapPacket.timestamp,
});

interface LapDataState {
  attachNetworkListener: () => void;
  detachNetworkListener: () => void;
  lapData: IFormattedLapData[];
  formatLapData: (lapPacket: ILapData) => IFormattedLapData;
  onLapData: (lapPacket: ILapData) => void;
  onLapComplete: () => void;
  fetchLapData: () => Promise<void>;
  clearLapData: () => void;
}

export const useLapDataStore = create<LapDataState>((set, get) => ({
  attachNetworkListener: () => {
    socketIO.on("lapData", get().onLapData);
    socketIO.on("lapComplete", get().onLapComplete);
  },
  clearLapData: () => set({ lapData: [] }),
  detachNetworkListener: () => {
    socketIO.off("lapData", get().onLapData);
    socketIO.off("lapComplete", get().onLapComplete);
  },
  fetchLapData: async () => {
    try {
      const response = await axios.get(`${prodURL}/laps`);

      if (!Array.isArray(response.data?.data)) {
        throw new Error("Invalid API response format");
      }

      set({
        lapData: response.data.data.map(formatLapData),
      });
    } catch (error) {
      notifications.show({
        color: "red",
        message: "Failed to fetch lap data from the server.",
        title: "Error",
      });
    }
  },
  formatLapData,
  lapData: [],
  onLapComplete: () => {
    notifications.show({
      color: "green",
      message: "A lap has been completed!",
      title: "Lap Completion",
    });
  },
  onLapData: (lapPacket: ILapData) => {
    const formattedData = formatLapData(lapPacket);
    set((state) => ({
      lapData: [...state.lapData, formattedData],
    }));
  },
}));
