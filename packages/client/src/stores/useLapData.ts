import { create } from "zustand";

import { BACKEND_ROUTES } from "@/constants/apiRoutes";
import { backendApi } from "@/lib/api";
import { notifications } from "@mantine/notifications";
import {
  IFormattedLapData,
  ILapData,
  LapDataResponseDTO,
} from "@shared/helios-types";

export const formatLapData = (lapPacket: ILapData): IFormattedLapData => ({
  AmpHours: parseFloat(lapPacket.AmpHours.toFixed(2)),
  AverageMotorWattage: parseFloat(lapPacket.AverageMotorWattage.toFixed(2)),
  AveragePackCurrent: parseFloat(lapPacket.AveragePackCurrent.toFixed(2)),
  AverageSpeed: parseFloat(lapPacket.AverageSpeed.toFixed(2)),
  BatterySecondsRemaining: parseFloat(
    lapPacket.BatterySecondsRemaining.toFixed(2),
  ),
  Distance: parseFloat(lapPacket.Distance.toFixed(2)),
  EnergyConsumed: parseFloat(lapPacket.EnergyConsumed.toFixed(2)),
  LapTime: parseFloat(lapPacket.LapTime.toFixed(2)),
  NetPowerOut: parseFloat(lapPacket.NetPowerOut.toFixed(2)),
  Rfid: lapPacket.rfid,
  TimeStamp: new Date(lapPacket.timestamp).toLocaleString("en-US"),
  TotalPowerIn: parseFloat(lapPacket.TotalPowerIn.toFixed(2)),
  TotalPowerOut: parseFloat(lapPacket.TotalPowerOut.toFixed(2)),
});

interface LapDataState {
  formatLapData: (lapPacket: ILapData) => IFormattedLapData;
  lapData: IFormattedLapData[];
  addLapData: (data: IFormattedLapData) => void;
  clearLapData: () => void;
  fetchLapData: () => Promise<void>;
}

/**
 * Fetches all lap data from the backend API.
 *
 * @returns Promise resolving to array of lap data
 * @throws Error if the response shape is invalid
 */
async function fetchLaps(): Promise<ILapData[]> {
  const response = await backendApi.get<LapDataResponseDTO>(
    BACKEND_ROUTES.laps.base,
  );

  if (!Array.isArray(response.data?.data)) {
    throw new Error("Invalid API response format");
  }

  return response.data.data;
}

export const useLapDataStore = create<LapDataState>((set) => ({
  addLapData: (data) =>
    set((state) => ({
      lapData: [...state.lapData, data],
    })),

  clearLapData: () => set({ lapData: [] }),

  fetchLapData: async () => {
    try {
      const laps = await fetchLaps();
      set({ lapData: laps.map(formatLapData) });
    } catch (error) {
      notifications.show({
        color: "red",
        message: `Failed to fetch lap data from the server: ${error instanceof Error ? error.message : String(error)}`,
        title: "Error",
      });
    }
  },

  formatLapData: formatLapData,
  lapData: [],
}));
