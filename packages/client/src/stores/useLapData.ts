import { create } from "zustand";

import { IFormattedLapData, ILapData } from "@shared/helios-types";

export const formatLapData = (lapPacket: ILapData): IFormattedLapData => ({
  AmpHours: parseFloat(lapPacket.AmpHours.toFixed(2)),
  AveragePackCurrent: parseFloat(lapPacket.AveragePackCurrent.toFixed(2)),
  AverageSpeed: parseFloat(lapPacket.AverageSpeed.toFixed(2)),
  BatterySecondsRemaining: parseFloat(
    lapPacket.BatterySecondsRemaining.toFixed(2),
  ),
  Distance: parseFloat(lapPacket.Distance.toFixed(2)),
  EnergyConsumed: parseFloat(lapPacket.EnergyConsumed.toFixed(2)),
  LapTime: parseFloat(lapPacket.LapTime.toFixed(2)),
  NetPowerOut: parseFloat(lapPacket.NetPowerOut.toFixed(2)),
  Rfid: lapPacket.Rfid,
  TimeStamp: new Date(lapPacket.TimeStamp).toLocaleString("en-US"),
  TotalPowerIn: parseFloat(lapPacket.TotalPowerIn.toFixed(2)),
  TotalPowerOut: parseFloat(lapPacket.TotalPowerOut.toFixed(2)),
});

interface LapDataState {
  formatLapData: (lapPacket: ILapData) => IFormattedLapData;
  lapData: IFormattedLapData[];
  addLapData: (data: IFormattedLapData) => void;
  clearLapData: () => void;
  setLapData: (data: IFormattedLapData[]) => void;
}

export const useLapDataStore = create<LapDataState>((set) => ({
  addLapData: (data) =>
    set((state) => ({
      lapData: [...state.lapData, data],
    })),

  clearLapData: () => set({ lapData: [] }),
  formatLapData: formatLapData,

  lapData: [],

  // Simple setter instead of async fetch - use useLaps() hook for fetching
  setLapData: (data) => set({ lapData: data }),
}));
