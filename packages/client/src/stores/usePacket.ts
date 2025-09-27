import { create } from "zustand";

import { socketIO } from "@/contexts/SocketContext";
import { generateFakeTelemetryData } from "@shared/helios-types";
import type { ITelemetryData } from "@shared/helios-types";

interface IPacketStore {
  currentPacket: ITelemetryData;
  setCurrentPacket: (packet: ITelemetryData) => void;
  startDemoMode: () => void;
  stopDemoMode: () => void;
  attachNetworkListener: () => void;
  detachNetworkListener: () => void;
}

let demoInterval: NodeJS.Timeout | null = null;

const onPacket = (packet: ITelemetryData) => {
  usePacketStore.getState().setCurrentPacket(packet);
};

export const usePacketStore = create<IPacketStore>((set) => ({
  attachNetworkListener: () => {
    socketIO.on("packet", onPacket);
  },
  currentPacket: generateFakeTelemetryData(),
  detachNetworkListener: () => {
    socketIO.off("packet", onPacket);
  },
  setCurrentPacket: (packet) => set({ currentPacket: packet }),
  startDemoMode: () => {
    demoInterval = setInterval(() => {
      set({ currentPacket: generateFakeTelemetryData() });
    }, 500);
  },
  stopDemoMode: () => {
    if (demoInterval) {
      clearInterval(demoInterval);
      demoInterval = null;
    }
  },
}));
