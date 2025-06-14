import axios from "axios";
import React, { useEffect, useState } from "react";

import { useAppState } from "@/contexts/AppStateContext";
import { usePlaybackContext } from "@/contexts/PlayBackContext";
import { notifications } from "@mantine/notifications";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import { Modal } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import { ITelemetryData, prodURL } from "@shared/helios-types";

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

const createDateTime = (time: Date, year: number, month: number, day: number) =>
  new Date(
    year,
    month,
    day,
    time.getHours(),
    time.getMinutes(),
    time.getSeconds(),
  );

function flattenObject(
  obj: ITelemetryData,
  prefix = "",
): Record<string, string | number | boolean | null> {
  return Object.entries(obj).reduce(
    (acc, [key, value]) => {
      const newKey = prefix ? `${prefix}.${key}` : key;
      if (
        typeof value === "object" &&
        value !== null &&
        !Array.isArray(value)
      ) {
        Object.assign(
          acc,
          flattenObject(value as unknown as ITelemetryData, newKey),
        );
      } else {
        acc[newKey] =
          typeof value === "object" && value !== null
            ? JSON.stringify(value)
            : value;
      }
      return acc;
    },
    {} as Record<string, string | number | boolean | null>,
  );
}

function convertToCSV(jsonArray: ITelemetryData[]): string {
  // Flatten all objects (CSV uses a flat structure)
  const flatObjects = jsonArray.map((obj) => flattenObject(obj));

  // Get all the field names (headers)
  const headers = Array.from(
    new Set(flatObjects.flatMap((obj) => Object.keys(obj))),
  );

  // Create the CSV rows
  const csvRows = [
    headers.join(","), // header row
    ...flatObjects.map((obj) =>
      headers
        .map((key) => {
          const value = obj[key];
          if (typeof value === "string") {
            return `"${value.replace(/"/g, '""')}"`; // escape quotes
          }
          return value ?? "";
        })
        .join(","),
    ),
  ];

  return csvRows.join("\n");
}

function handleDownloadCSV(csv: string) {
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.setAttribute("download", "playback_data.csv");
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function PlaybackDatePicker() {
  const { currentAppState } = useAppState();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
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

  const { playbackData, setPlaybackData } = usePlaybackContext();

  const fetchPlaybackData = async () => {
    if (
      !playbackDateTime.date ||
      !playbackDateTime.startTime ||
      !playbackDateTime.endTime
    ) {
      return;
    }

    setLoading(true);
    const year = playbackDateTime.date.getFullYear();
    const month = playbackDateTime.date.getMonth();
    const day = playbackDateTime.date.getDate();

    const startDateTime = createDateTime(
      playbackDateTime.startTime,
      year,
      month,
      day,
    );
    const endDateTime = createDateTime(
      playbackDateTime.endTime,
      year,
      month,
      day,
    );

    const startTimeUTC = Math.floor(startDateTime.getTime());
    const endTimeUTC = Math.floor(endDateTime.getTime());

    const maxInterval = 10 * 60 * 1000; // 10 minutes in ms
    if (endTimeUTC - startTimeUTC > maxInterval) {
      notifications.show({
        color: "red",
        message: "Please select a range of maximum 10 minutes.",
        title: "Error",
      });
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get(`${prodURL}/packetsBetween`, {
        params: { endTime: endTimeUTC, startTime: startTimeUTC },
      });

      const extractedData: ITelemetryData[] = response.data.data.map(
        (item: IPlaybackDataResponse) => item.data,
      );

      setPlaybackData(extractedData);
    } catch (error) {
      throw new Error(`Error fetching playback data: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  // When the playback switch is on, auto-fetch the data if a date was stored in local storage
  useEffect(() => {
    if (
      currentAppState.playbackSwitch &&
      currentAppState.playbackDateTime?.date
    ) {
      setPlaybackDateTime(currentAppState.playbackDateTime);
      fetchPlaybackData();
    }
  }, [currentAppState.playbackSwitch]);

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
                  fetchPlaybackData={fetchPlaybackData}
                  playbackDateTime={playbackDateTime}
                  setPlaybackDateTime={setPlaybackDateTime}
                />
                <DatePickerResultColumn
                  loading={loading}
                  playbackData={playbackData}
                  playbackDateTime={playbackDateTime}
                />
              </div>
              {playbackData.length > 0 && (
                <Tooltip arrow title="Download to CSV">
                  <button
                    className="absolute right-7 top-5"
                    onClick={() =>
                      handleDownloadCSV(convertToCSV(playbackData))
                    }
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
