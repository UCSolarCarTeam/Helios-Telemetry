"use client";

import { useEffect, useState } from "react";

import { useAppState } from "@/contexts/AppStateContext";

export default function PlaybackDateSelector() {
  const [dateAndTime, setDateAndTime] = useState<Date | undefined>(undefined);
  const { currentAppState, setCurrentAppState } = useAppState();

  const onDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDateAndTime(e.target.value ? new Date(e.target.value) : undefined);
    setCurrentAppState((prev) => ({ ...prev, playbackDate: dateAndTime }));
  };

  //from appstate, use the newest and the oldest packet to set the min and max date for the date selector
  let minDate = currentAppState.firstPlaybackDate;
  let maxDate = currentAppState.lastPlaybackDate;
  useEffect(() => {
    minDate = currentAppState.firstPlaybackDate;
    maxDate = currentAppState.lastPlaybackDate;
  }, []);

  return (
    <div className="flex flex-col gap-2">
      <input
        className="max-w-32 rounded-md bg-[#BCBCBC] p-1 text-pink shadow-sm transition-all focus:outline-none"
        id="playbackDate"
        max={maxDate}
        min={minDate}
        onChange={onDateChange}
        required
        step="900"
        type="datetime-local"
      />
    </div>
  );
}
