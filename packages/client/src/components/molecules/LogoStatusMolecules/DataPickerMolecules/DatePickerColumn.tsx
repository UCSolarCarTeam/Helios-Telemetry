import React from "react";

import { DatePicker, TimeInput } from "@mantine/dates";
import { Button } from "@mui/material";

import { IPlaybackDateTime } from "../PlaybackDatePicker";

const DataPickerColumn = ({
  fetchPlaybackData,
  playbackDateTime,
  setPlaybackDateTime,
}: {
  setPlaybackDateTime: React.Dispatch<React.SetStateAction<IPlaybackDateTime>>;
  playbackDateTime: IPlaybackDateTime;
  fetchPlaybackData: () => void;
}) => {
  return (
    <div className="m-4 flex flex-col items-center gap-4 sm:w-[50%]">
      <DatePicker
        highlightToday={true}
        onChange={(value) => {
          if (value) {
            setPlaybackDateTime((prev) => {
              const selectedDate = new Date(value);
              const newStartTime = new Date(prev.startTime);
              newStartTime.setFullYear(selectedDate.getFullYear());
              newStartTime.setMonth(selectedDate.getMonth());
              newStartTime.setDate(selectedDate.getDate());

              return {
                date: selectedDate,
                endTime: prev.endTime,
                startTime: newStartTime,
              };
            });
          }
        }}
        value={playbackDateTime.date}
      />

      <div className="flex flex-row items-center gap-1">
        {(["startTime", "endTime"] as Array<keyof IPlaybackDateTime>).map(
          (timeKey) => (
            <React.Fragment key={timeKey}>
              <TimeInput
                onChange={(event) => {
                  const timeValue = event.target.value;
                  if (!timeValue) return;

                  const [hours, minutes, seconds = 0] = timeValue
                    .split(":")
                    .map(Number);

                  setPlaybackDateTime((prev) => {
                    const newTime = new Date(prev[timeKey]);
                    newTime.setHours(hours ?? 0, minutes ?? 0, seconds ?? 0);

                    return { ...prev, [timeKey]: newTime };
                  });
                }}
                value={playbackDateTime[timeKey].toTimeString().split(" ")[0]}
              />
              {timeKey === "startTime" && <span>-</span>}
            </React.Fragment>
          ),
        )}
      </div>
      <Button className="mb-1" onClick={fetchPlaybackData}>
        Confirm
      </Button>
    </div>
  );
};

export default DataPickerColumn;
