import { create } from "zustand";

import { generateFakeTelemetryData } from "@shared/helios-types";
import type { ITelemetryData } from "@shared/helios-types";

interface IPacketStore {
  currentPacket: ITelemetryData;
  setCurrentPacket: (packet: ITelemetryData) => void;
}

export const usePacketStore = create<IPacketStore>((set) => ({
  currentPacket: generateFakeTelemetryData(),
  setCurrentPacket: (packet) => set({ currentPacket: packet }),
}));
