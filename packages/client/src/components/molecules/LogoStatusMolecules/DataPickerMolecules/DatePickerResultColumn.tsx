import React from "react";

import { CircularProgress } from "@mui/material";
import { ITelemetryData } from "@shared/helios-types";

interface DatePickerResultColumnProps {
  confirmedPlaybackDateTime: {
    date: Date | null;
    startTime: Date | null;
    endTime: Date | null;
  };
  playbackData: ITelemetryData[];
  loading: boolean;
}

const DatePickerResultColumn: React.FC<DatePickerResultColumnProps> = ({
  confirmedPlaybackDateTime,
  loading,
  playbackData,
}) => {
  const displayStartTime = `${confirmedPlaybackDateTime.date?.toDateString()} at ${confirmedPlaybackDateTime.startTime?.toLocaleTimeString()}`;
  const displayEndTime = `${confirmedPlaybackDateTime.date?.toDateString()} at ${confirmedPlaybackDateTime.endTime?.toLocaleTimeString()}`;

  return (
    <div className="flex flex-grow items-center border-t border-gray-300 pt-4 sm:border-l sm:border-t-0 sm:pl-6 sm:pt-0">
      <div className="flex w-full flex-col items-center justify-center">
        {loading ? (
          <CircularProgress />
        ) : playbackData.length > 0 ? (
          <h5 className="text-text-gray dark:text-text-gray-dark text-center text-lg font-semibold sm:text-2xl">
            {`Playback data for ${displayStartTime} to ${displayEndTime} retrieved successfully.`}
          </h5>
        ) : (
          <h5 className="text-text-gray dark:text-text-gray-dark text-center text-lg font-semibold sm:text-2xl">
            There is no data for this date.
          </h5>
        )}
      </div>
    </div>
  );
};

export default DatePickerResultColumn;
