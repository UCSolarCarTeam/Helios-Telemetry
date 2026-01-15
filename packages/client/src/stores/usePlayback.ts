import { create } from "zustand";

import { ITelemetryData } from "@shared/helios-types";

interface IPlaybackStore {
  playbackData: ITelemetryData[];
  setPlaybackData: (data: ITelemetryData[]) => void;
}

export const usePlaybackStore = create<IPlaybackStore>((set) => ({
  playbackData: [],
  setPlaybackData: (data) => set({ playbackData: data }),
}));
