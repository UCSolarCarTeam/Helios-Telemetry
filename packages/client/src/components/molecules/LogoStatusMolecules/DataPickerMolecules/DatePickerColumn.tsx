import React from "react";

import { useAppState } from "@/contexts/AppStateContext";
import { DatePicker, TimeInput } from "@mantine/dates";
import { Button } from "@mui/material";

import { IPlaybackDateTime } from "../PlaybackDatePicker";

/*
 * This component is used to select a date and time for retrieving playback data.
 * It allows the user to select a date (day of the month) and time range (start and end time).
 * The selected date and time are then used to fetch playback data from DynamoDB.
 * This component is one of two columns in the PlaybackDatePicker component.
 *
 * handleDateChange: This function is called when the user selects the day of the month in the date picker.
 * It uses the current startTime and endTime as place holders.
 *
 * handleTimeChange: This function is called when the user selects the start or end time in the time input.
 */

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
        const newStartDate = new Date(prev.startTime ?? new Date());
        newStartDate.setFullYear(selectedDate.getFullYear());
        newStartDate.setMonth(selectedDate.getMonth());
        newStartDate.setDate(selectedDate.getDate());

        const newEndDate = new Date(prev.endTime ?? new Date());
        newEndDate.setFullYear(selectedDate.getFullYear());
        newEndDate.setMonth(selectedDate.getMonth());
        newEndDate.setDate(selectedDate.getDate());

        return {
          date: selectedDate,
          endTime: newEndDate,
          startTime: newStartDate,
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
