"use client";

import { useCallback, useEffect } from "react";

import { APPUNITS, CONNECTIONTYPES, useAppState } from "@/stores/useAppState";

type AppStateStore = ReturnType<typeof useAppState>;
type AppState = AppStateStore extends { currentAppState: infer T } ? T : never;

type SerializedPlaybackDateTime = {
  date: string | null;
  endTime: string | null;
  startTime: string | null;
};

type PersistedSettings = Partial<
  Pick<AppState, "appUnits" | "connectionType" | "lapCoords"> & {
    playbackDateTime: SerializedPlaybackDateTime | null;
  }
>;

const DEFAULT_FAVOURITES = [
  "Motor Temp",
  "Battery Cell Voltage",
  "Vehicle Velocity",
  "Pack Voltage",
  "Pack Current",
  "Battery Average Voltage",
];

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null;

const parseJson = <T,>(value: string): T | null => {
  try {
    return JSON.parse(value) as T;
  } catch {
    return null;
  }
};

const parseFavourites = (value: string | null): string[] | null => {
  if (!value) {
    return null;
  }

  const parsed = parseJson<unknown>(value);

  if (
    Array.isArray(parsed) &&
    parsed.every((item) => typeof item === "string")
  ) {
    return parsed;
  }

  return null;
};

const parseAppUnits = (value: unknown): AppState["appUnits"] | null =>
  Object.values(APPUNITS).includes(value as APPUNITS)
    ? (value as AppState["appUnits"])
    : null;

const parseConnectionType = (
  value: unknown,
): AppState["connectionType"] | null =>
  Object.values(CONNECTIONTYPES).includes(value as CONNECTIONTYPES)
    ? (value as AppState["connectionType"])
    : null;

const parseCoords = (value: unknown): AppState["lapCoords"] | null => {
  if (!isRecord(value)) {
    return null;
  }

  const { lat, long } = value;

  if (typeof lat !== "number" || typeof long !== "number") {
    return null;
  }

  return { lat, long } as AppState["lapCoords"];
};

const parseDateValue = (value: unknown): Date | null => {
  if (typeof value !== "string") {
    return null;
  }

  const timestamp = Date.parse(value);

  return Number.isNaN(timestamp) ? null : new Date(timestamp);
};

const parsePlaybackDateTime = (
  value: unknown,
): AppState["playbackDateTime"] => {
  if (!isRecord(value)) {
    return {
      date: null,
      endTime: null,
      startTime: null,
    } as AppState["playbackDateTime"];
  }

  return {
    date: parseDateValue(value.date),
    endTime: parseDateValue(value.endTime),
    startTime: parseDateValue(value.startTime),
  } as AppState["playbackDateTime"];
};

export default function AppStateEffects() {
  const { currentAppState, setCurrentAppState } = useAppState();

  useEffect(() => {
    setCurrentAppState((prev) => {
      if (
        prev.connectionType === CONNECTIONTYPES.NETWORK &&
        (!prev.mqttConnected || !prev.socketConnected)
      ) {
        return {
          ...prev,
          connectionType: CONNECTIONTYPES.DEMO,
          loading: false,
        };
      }

      if (
        prev.connectionType === CONNECTIONTYPES.RADIO &&
        !prev.radioConnected
      ) {
        return {
          ...prev,
          connectionType: CONNECTIONTYPES.DEMO,
          loading: false,
        };
      }

      if (prev.connectionType === CONNECTIONTYPES.DEMO) {
        if (prev.mqttConnected && prev.socketConnected) {
          return {
            ...prev,
            connectionType: CONNECTIONTYPES.NETWORK,
            loading: false,
          };
        }

        if (prev.radioConnected) {
          return {
            ...prev,
            connectionType: CONNECTIONTYPES.RADIO,
            loading: false,
          };
        }

        if (prev.loading) {
          return {
            ...prev,
            loading: false,
          };
        }
      }

      if (prev.connectionType === CONNECTIONTYPES.NETWORK) {
        const nextLoading = !prev.socketConnected;
        if (prev.loading !== nextLoading) {
          return {
            ...prev,
            loading: nextLoading,
          };
        }
      }

      if (prev.connectionType === CONNECTIONTYPES.RADIO) {
        const nextLoading = !prev.radioConnected;
        if (prev.loading !== nextLoading) {
          return {
            ...prev,
            loading: nextLoading,
          };
        }
      }

      return prev;
    });
  }, [
    currentAppState.mqttConnected,
    currentAppState.socketConnected,
    currentAppState.radioConnected,
    setCurrentAppState,
  ]);

  useEffect(() => {
    setTimeout(() => {
      setCurrentAppState((prev) => ({
        ...prev,
        loading: false,
      }));
    }, 5000);
  }, [setCurrentAppState]);

  const fetchSettingsFromLocalStorage = useCallback(() => {
    const savedSettings = localStorage.getItem("settings");
    const favourites = localStorage.getItem("favourites");

    if (!savedSettings) {
      return;
    }

    const parsedSettings = parseJson<PersistedSettings>(savedSettings);

    if (!parsedSettings) {
      return;
    }

    const parsedFavourites = parseFavourites(favourites) ?? DEFAULT_FAVOURITES;
    const parsedPlaybackDateTime = parsePlaybackDateTime(
      parsedSettings.playbackDateTime,
    );
    const parsedAppUnits = parseAppUnits(parsedSettings.appUnits);
    const parsedConnectionType = parseConnectionType(
      parsedSettings.connectionType,
    );
    const parsedLapCoords = parseCoords(parsedSettings.lapCoords);

    setCurrentAppState((prev) => ({
      ...prev,
      appUnits: parsedAppUnits ?? prev.appUnits,
      connectionType: parsedConnectionType ?? prev.connectionType,
      favourites: parsedFavourites,
      lapCoords: parsedLapCoords ?? prev.lapCoords,
      playbackDateTime: parsedPlaybackDateTime,
    }));
  }, [setCurrentAppState]);

  const saveSettingsToLocalStorage = useCallback(() => {
    localStorage.setItem("settings", JSON.stringify(currentAppState));
  }, [currentAppState]);

  useEffect(() => {
    fetchSettingsFromLocalStorage();
  }, [fetchSettingsFromLocalStorage]);

  useEffect(() => {
    if (!currentAppState.loading) {
      saveSettingsToLocalStorage();
    }
  }, [currentAppState.loading, saveSettingsToLocalStorage]);

  return null; // This component only handles side effects
}
