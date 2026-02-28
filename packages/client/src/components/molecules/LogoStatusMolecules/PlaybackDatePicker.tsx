import React, { useEffect, useState } from "react";

import { usePlaybackData } from "@/hooks/usePlaybackData";
import { downloadCSV } from "@/lib/utils";
import { useAppState } from "@/stores/useAppState";
import { usePlaybackStore } from "@/stores/usePlayback";
import { notifications } from "@mantine/notifications";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import { Modal } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import { ITelemetryData, convertToCSV } from "@shared/helios-types";

import DatePickerColumn from "./DataPickerMolecules/DatePickerColumn";
import DatePickerResultColumn from "./DataPickerMolecules/DatePickerResultColumn";

/*
 * This component defines a modal that conatins the DatePicker and Results columns for the playback feature.
 * The modal is opened when the user clicks on the calendar icon, which appears when the playback switch is on.
 *
 * createDateTime: This function creates a Date object from the selected date and time (Selected via the DatePickerColumn).
 *
 * fetchPlaybackData: This function fetches the lap data from the server (DyanmoDB) based on the selected date and time range.
 * It then updates the playback data in the PlaybackContext to be used in the PlaybackSlider component.
 *
 * This component is also responsbile for automatically loading playback data when the playback switch is on and a date is stored
 * in local storage (Date and time was previosuly "cached"). The date and time are only stored in local storage once the user selects
 * a date and time range and clicks the confirm button in the DatePickerColumn for the first time.
 */

export type IPlaybackDateTime = {
  date: Date | null;
  startTime: Date | null;
  endTime: Date | null;
};
export type IPlaybackDataResponse = {
  data: ITelemetryData;
  timestamp: number;
  id: string;
};

/*
 * This component is used to contain the PlaybackResultColumn and DatePickerColumn in a modal. It contains the actual logic for 
 * fetching the playback data from the database based on the selected date and time.

 * It also contains the logic for exporting the playback data to a CSV file. It does so by flattening the nested JSON TelemetryData
 * objects into a flat structure that can be easily converted to CSV format and then using the browser's Blob API to create a 
 * downloadable file.
 */

const createDateTime = (time: Date, day: Date) =>
  new Date(
    day.getFullYear(),
    day.getMonth(),
    day.getDate(),
    time.getHours(),
    time.getMinutes(),
    time.getSeconds(),
  );

function PlaybackDatePicker() {
  const { currentAppState } = useAppState();
  const [open, setOpen] = useState(false);
  const [playbackDateTime, setPlaybackDateTime] = useState<IPlaybackDateTime>(
    () => {
      return currentAppState.playbackDateTime?.date
        ? currentAppState.playbackDateTime
        : {
            date: new Date(),
            endTime: new Date(),
            startTime: new Date(),
          };
    },
  );

  const [confirmedPlaybackDateTime, setConfirmedPlaybackDateTime] =
    useState<IPlaybackDateTime>(playbackDateTime);

  const { playbackData, setPlaybackData } = usePlaybackStore((state) => ({
    playbackData: state.playbackData,
    setPlaybackData: state.setPlaybackData,
  }));

  // Calculate time range for TanStack Query
  const startTimeUTC =
    confirmedPlaybackDateTime.date && confirmedPlaybackDateTime.startTime
      ? createDateTime(
          confirmedPlaybackDateTime.startTime,
          confirmedPlaybackDateTime.date,
        ).getTime()
      : 0;

  const endTimeUTC =
    confirmedPlaybackDateTime.date && confirmedPlaybackDateTime.endTime
      ? createDateTime(
          confirmedPlaybackDateTime.endTime,
          confirmedPlaybackDateTime.date,
        ).getTime()
      : 0;

  // Use TanStack Query hook for data fetching
  const { data: fetchedPlaybackData, isLoading } = usePlaybackData({
    enabled: startTimeUTC > 0 && endTimeUTC > startTimeUTC,
    endTime: endTimeUTC,
    startTime: startTimeUTC,
  });

  // Sync fetched playback data to Zustand store
  useEffect(() => {
    if (fetchedPlaybackData) {
      setPlaybackData(fetchedPlaybackData);
    }
  }, [fetchedPlaybackData, setPlaybackData]);

  // When the playback switch is on, auto-load the date if stored in local storage
  useEffect(() => {
    if (
      currentAppState.playbackSwitch &&
      currentAppState.playbackDateTime?.date
    ) {
      setPlaybackDateTime(currentAppState.playbackDateTime);
      setConfirmedPlaybackDateTime(currentAppState.playbackDateTime);
    }
  }, [currentAppState.playbackSwitch, currentAppState.playbackDateTime]);

  /**
   * Validates the time range before confirming the playback date/time.
   * Shows an error notification if the range is too large (max 60 minutes).
   * This is called by the DatePickerColumn when the user clicks the confirm button.
   */
  const validateAndConfirmDateTime = () => {
    if (
      !playbackDateTime.date ||
      !playbackDateTime.startTime ||
      !playbackDateTime.endTime
    ) {
      return;
    }

    const startDateTime = createDateTime(
      playbackDateTime.startTime,
      playbackDateTime.date,
    );
    const endDateTime = createDateTime(
      playbackDateTime.endTime,
      playbackDateTime.date,
    );

    const startTimeUTC = startDateTime.getTime();
    const endTimeUTC = endDateTime.getTime();
    const minutes = 60;
    const maxInterval = minutes * 60 * 1000; // 60 minutes in ms
    if (endTimeUTC - startTimeUTC > maxInterval) {
      notifications.show({
        color: "red",
        message: `Please select a range of maximum ${minutes} minutes.`,
        title: "Error",
      });
      return;
    }

    // Validation passed - the DatePickerColumn will call setConfirmedPlaybackDateTime
    // which will trigger the usePlaybackData hook to fetch data automatically
  };

  const updatePlaybackTime: React.Dispatch<
    React.SetStateAction<IPlaybackDateTime>
  > = (time) => {
    setPlaybackDateTime(time);
  };
  const handleDownloadCSV = () => {
    // Generate filename with date and time range
    const now = new Date();
    const dateStr = now.toLocaleDateString().replace(/\//g, "-");
    const start = confirmedPlaybackDateTime.startTime ?? new Date();
    const end = confirmedPlaybackDateTime.endTime ?? new Date();
    const formatTime = (date: Date) =>
      date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      });
    const timeStr = `${formatTime(start)}_to_${formatTime(end)}`;
    const filename = `Helios Packet Data - ${dateStr} ${timeStr}.csv`;
    const data = convertToCSV(playbackData);
    downloadCSV(data, filename);
  };

  return (
    <>
      {currentAppState.playbackSwitch && (
        <div>
          <h2 className="text-text-gray dark:text-text-gray-dark w-fit cursor-pointer text-sm font-black">
            <CalendarMonthIcon onClick={() => setOpen(true)} />
          </h2>
          <Modal
            aria-describedby="modal-modal-description"
            aria-labelledby="modal-modal-title"
            className="flex items-center justify-center"
            onClose={() => setOpen(false)}
            open={open}
          >
            <div className="relative flex h-auto w-full max-w-lg rounded-lg border-none bg-white p-6 shadow-lg outline-none sm:max-w-xl md:max-w-2xl">
              <div className="flex w-full flex-col gap-6 sm:flex-row">
                <DatePickerColumn
                  fetchPlaybackData={validateAndConfirmDateTime}
                  playbackDateTime={playbackDateTime}
                  setConfirmedPlaybackDateTime={setConfirmedPlaybackDateTime}
                  setPlaybackDateTime={updatePlaybackTime}
                />
                <DatePickerResultColumn
                  confirmedPlaybackDateTime={confirmedPlaybackDateTime}
                  loading={isLoading}
                  playbackData={playbackData}
                />
              </div>
              {(playbackData?.length ?? 0) > 0 && (
                <Tooltip arrow title="Download to CSV">
                  <button
                    className="absolute right-7 top-5"
                    onClick={handleDownloadCSV}
                  >
                    <FileDownloadOutlinedIcon />
                  </button>
                </Tooltip>
              )}
            </div>
          </Modal>
        </div>
      )}
    </>
  );
}

export default PlaybackDatePicker;
