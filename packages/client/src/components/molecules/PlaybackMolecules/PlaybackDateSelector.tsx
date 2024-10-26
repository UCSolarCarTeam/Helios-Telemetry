"use client";

import { useState } from "react";

export default function PlaybackDateSelector() {
  const [dateAndTime, setDateAndTime] = useState<Date | undefined>(undefined);

  const onDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDateAndTime(e.target.value ? new Date(e.target.value) : undefined);
  };

  return (
    <div className="flex flex-col gap-2">
      <input
        className="max-w-32 rounded-md bg-[#BCBCBC] p-1 text-pink shadow-sm transition-all focus:outline-none"
        id="playbackDate"
        onChange={onDateChange}
        required
        step="900"
        type="datetime-local"
      />
    </div>
  );
}
