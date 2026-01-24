import axios from "axios";
import { create } from "zustand";

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
  formatLapData: (lapPacket: ILapData) => IFormattedLapData;
  lapData: IFormattedLapData[];
  setLapData: (data: IFormattedLapData[]) => void;
  addLapData: (data: IFormattedLapData) => void;
  clearLapData: () => void;
  fetchLapData: () => Promise<void>;
}

export const useLapDataStore = create<LapDataState>((set) => ({
  addLapData: (data) =>
    set((state) => ({
      lapData: [...state.lapData, data],
    })),

  clearLapData: () => set({ lapData: [] }),

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
  formatLapData: formatLapData,
  lapData: [],
  setLapData: (data) => set({ lapData: data }),
}));
