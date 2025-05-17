import React from "react";

import { useAppState } from "@/contexts/AppStateContext";
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
  const { setCurrentAppState } = useAppState();

  const handleDateChange = (value: Date | null) => {
    if (value) {
      setPlaybackDateTime((prev) => {
        const selectedDate = new Date(value);
        // Keep the current time for startTime and endTime as a placeholder
        const newStartTime = new Date(prev.startTime ?? new Date());
        newStartTime.setFullYear(selectedDate.getFullYear());
        newStartTime.setMonth(selectedDate.getMonth());
        newStartTime.setDate(selectedDate.getDate());

        const newEndTime = new Date(prev.endTime ?? new Date());
        newEndTime.setFullYear(selectedDate.getFullYear());
        newEndTime.setMonth(selectedDate.getMonth());
        newEndTime.setDate(selectedDate.getDate());

        return {
          date: selectedDate,
          endTime: newEndTime,
          startTime: newStartTime,
        };
      });
    }
  };

  // Handle TimeInput change to update startTime or endTime
  const handleTimeChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    timeKey: "startTime" | "endTime",
  ) => {
    const timeValue = event.target.value;
    if (!timeValue) return;

    const [hours, minutes, seconds = 0] = timeValue.split(":").map(Number);

    setPlaybackDateTime((prev) => {
      const newTime = new Date(prev[timeKey] ?? new Date());
      newTime.setHours(hours ?? 0, minutes ?? 0, seconds ?? 0);

      return {
        ...prev,
        [timeKey]: newTime,
      };
    });
  };

  return (
    <div className="m-4 flex flex-col items-center gap-4 sm:w-[50%]">
      <DatePicker
        highlightToday={true}
        onChange={handleDateChange}
        value={playbackDateTime.date}
      />

      <div className="flex flex-row items-center gap-1">
        {(["startTime", "endTime"] as Array<keyof IPlaybackDateTime>).map(
          (timeKey) => (
            <React.Fragment key={timeKey}>
              <TimeInput
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  handleTimeChange(event, timeKey as "startTime" | "endTime")
                }
                value={
                  playbackDateTime[timeKey]?.toTimeString().split(" ")[0] ?? ""
                }
              />
              {timeKey === "startTime" && <span>-</span>}
            </React.Fragment>
          ),
        )}
      </div>

      <Button
        className="mb-1"
        onClick={() => {
          setCurrentAppState((prev) => ({
            ...prev,
            playbackDateTime: {
              date: playbackDateTime.date,
              endTime: playbackDateTime.endTime,
              startTime: playbackDateTime.startTime,
            },
          }));
          fetchPlaybackData();
        }}
      >
        Confirm
      </Button>
    </div>
  );
};

export default DataPickerColumn;
