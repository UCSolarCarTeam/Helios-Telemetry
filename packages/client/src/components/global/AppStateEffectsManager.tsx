"use client";

import { useCallback, useEffect } from "react";

import { CONNECTIONTYPES, useAppState } from "@/stores/useAppState";

export default function AppStateEffects() {
  const { currentAppState, setCurrentAppState } = useAppState();

  useEffect(() => {
    if (currentAppState.connectionType === CONNECTIONTYPES.DEMO) {
      if (currentAppState.socketConnected) {
        setCurrentAppState((prev) => ({
          ...prev,
          connectionType: CONNECTIONTYPES.NETWORK,
          loading: false,
        }));
      }
      if (currentAppState.radioConnected) {
        setCurrentAppState((prev) => ({
          ...prev,
          connectionType: CONNECTIONTYPES.RADIO,
          loading: false,
        }));
      }
    }
    if (currentAppState.connectionType === CONNECTIONTYPES.NETWORK) {
      setCurrentAppState((prev) => ({
        ...prev,
        loading: !currentAppState.socketConnected,
      }));
    }
    if (currentAppState.connectionType === CONNECTIONTYPES.RADIO) {
      setCurrentAppState((prev) => ({
        ...prev,
        loading: !currentAppState.radioConnected,
      }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
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

    if (savedSettings) {
      const parsedSettings = JSON.parse(savedSettings);

      const parsedFavourites = favourites
        ? (JSON.parse(favourites) as string[])
        : [
            "Motor Temp",
            "Battery Cell Voltage",
            "Vehicle Velocity",
            "Pack Voltage",
            "Pack Current",
            "Battery Average Voltage",
          ];

      const hasPlaybackDateTime = !!parsedSettings.playbackDateTime;

      const parsedPlaybackDateTime = hasPlaybackDateTime
        ? {
            date: parsedSettings.playbackDateTime!.date
              ? new Date(parsedSettings.playbackDateTime!.date)
              : null,
            endTime: parsedSettings.playbackDateTime!.endTime
              ? new Date(parsedSettings.playbackDateTime!.endTime)
              : null,
            startTime: parsedSettings.playbackDateTime!.startTime
              ? new Date(parsedSettings.playbackDateTime!.startTime)
              : null,
          }
        : {
            date: null,
            endTime: null,
            startTime: null,
          };

      setCurrentAppState((prev) => ({
        ...prev,
        appUnits: parsedSettings.appUnits ?? prev.appUnits,
        connectionType: parsedSettings.connectionType ?? prev.connectionType,
        darkMode: parsedSettings.darkMode ?? prev.darkMode,
        favourites: parsedFavourites,
        lapCoords: parsedSettings.lapCoords ?? prev.lapCoords,
        playbackDateTime: parsedPlaybackDateTime,
      }));
    }
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
