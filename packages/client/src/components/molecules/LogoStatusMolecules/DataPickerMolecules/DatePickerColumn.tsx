import React from "react";

import { getLocalDateKey, useAvailableDates } from "@/hooks/useAvailableDates";
import { DatePicker } from "@mantine/dates";
import { Button } from "@mui/material";

import { IPlaybackDateTime } from "../PlaybackDatePicker";

/*
 * This component is used to select a date for retrieving playback data.
 * It allows the user to select a date (day of the month), then load available segments.
 * The selected date is then used to fetch playback data from the database.
 * This component is one of two columns in the PlaybackDatePicker component.
 *
 * handleDateChange: This function is called when the user selects the day of the month in the date picker.
 */

const DataPickerColumn = ({
  fetchPlaybackData,
  onSegmentChange,
  playbackDateTime,
  segmentOptions,
  segmentsLoaded,
  segmentsLoading,
  selectedSegmentStartUtc,
  setPlaybackDateTime,
}: {
  fetchPlaybackData: () => void;
  onSegmentChange: (startUtc: number) => void;
  playbackDateTime: IPlaybackDateTime;
  segmentOptions: { label: string; startUtc: number }[];
  segmentsLoaded: boolean;
  segmentsLoading: boolean;
  selectedSegmentStartUtc: number | null;
  setPlaybackDateTime: React.Dispatch<React.SetStateAction<IPlaybackDateTime>>;
}) => {
  const { availableDateSet } = useAvailableDates();

  const excludeUnavailableDate = (date: Date): boolean => {
    const dateString = getLocalDateKey(date);
    return !availableDateSet.has(dateString);
  };

  const handleDateChange = (value: Date | null) => {
    if (value) {
      setPlaybackDateTime((prev) => {
        const selectedDate = new Date(value);

        return {
          ...prev,
          date: selectedDate,
        };
      });
    }
  };

  const handleConfirm = () => {
    void fetchPlaybackData();
  };

  return (
    <div className="m-4 flex flex-col items-center gap-4 sm:w-[50%]">
      <DatePicker
        excludeDate={excludeUnavailableDate}
        highlightToday={true}
        onChange={handleDateChange}
        value={playbackDateTime.date}
      />

      <Button className="mb-1" onClick={handleConfirm}>
        Load Available Segments
      </Button>

      {segmentOptions.length > 0 && (
        <select
          className="w-full rounded border border-gray-300 px-2 py-1 text-sm"
          disabled={segmentsLoading}
          onChange={(event) => onSegmentChange(Number(event.target.value))}
          value={selectedSegmentStartUtc ?? ""}
        >
          {segmentOptions.map((segment) => (
            <option key={segment.startUtc} value={segment.startUtc}>
              {segment.label}
            </option>
          ))}
        </select>
      )}

      {segmentsLoading && (
        <p className="text-gray-500 text-center text-sm">
          Loading available 1-hour segments...
        </p>
      )}

      {segmentsLoaded && !segmentsLoading && segmentOptions.length === 0 && (
        <p className="text-gray-500 text-center text-sm">
          No 1-hour data segments found for this day.
        </p>
      )}
    </div>
  );
};

export default DataPickerColumn;
