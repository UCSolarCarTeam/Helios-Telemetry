import { create } from "zustand";

import type { IPlaybackDateTime } from "@/components/molecules/LogoStatusMolecules/PlaybackDatePicker";
import { type Coords, FINISH_LINE_LOCATION } from "@shared/helios-types";

export enum CONNECTIONTYPES {
  DEMO = "DEMO",
  NETWORK = "NETWORK",
  RADIO = "RADIO",
}

export enum APPUNITS {
  METRIC = "metric",
  IMPERIAL = "imperial",
}

interface IAppState {
  displayLoading: boolean;
  loading: boolean;
  error: boolean;
  appUnits: APPUNITS;
  favourites: string[];
  connectionType: CONNECTIONTYPES;
  socketConnected: boolean;
  mqttConnected: boolean;
  radioConnected: boolean;
  userLatency: number;
  carLatency: number;
  lapCoords: Coords;
  playbackSwitch: boolean;
  playbackDateTime: IPlaybackDateTime;
}

interface AppStateStore {
  currentAppState: IAppState;
  setCurrentAppState: (updater: (prev: IAppState) => IAppState) => void;
}

export const useAppState = create<AppStateStore>((set) => ({
  currentAppState: {
    appUnits: APPUNITS.METRIC,
    carLatency: 0,
    connectionType: CONNECTIONTYPES.DEMO,
    displayLoading: true,
    error: false,
    favourites: [],
    lapCoords: FINISH_LINE_LOCATION,
    loading: true,
    mqttConnected: false,
    playbackDateTime: {
      date: null,
      endTime: null,
      startTime: null,
    },
    playbackSwitch: false,
    radioConnected: false,
    socketConnected: false,
    userLatency: 0,
  },

  setCurrentAppState: (updater) =>
    set((state) => ({
      currentAppState: updater(state.currentAppState),
    })),
}));
