import axios from "axios";
import React, { useState } from "react";

import { useAppState } from "@/contexts/AppStateContext";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import { Modal } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import {
  IPlaybackDynamoResponse,
  ITelemetryData,
  prodURL,
} from "@shared/helios-types";

import DatePickerColumn from "./DataPickerMolecules/DatePickerColumn";
import DatePickerResultColumn from "./DataPickerMolecules/DatePickerResultColumn";

export type IPlaybackDateTime = { date: Date; startTime: Date; endTime: Date };

/*
 * This component is used to contain the PlaybackResultColumn and DatePickerColumn in a modal. It contains the actual logic for 
 * fetching the playback data from the database based on the selected date and time.

 * It also contains the logic for exporting the playback data to a CSV file. It does so by flattening the nested JSON TelemetryData
 * objects into a flat structure that can be easily converted to CSV format and then using the browser's Blob API to create a 
 * downloadable file.
 */

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
  const [playbackDateTime, setPlaybackDateTime] = useState<IPlaybackDateTime>({
    date: new Date(),
    endTime: new Date(),
    startTime: new Date(),
  });

  const [playbackData, setPlaybackData] = useState<ITelemetryData[]>([]);

  const fetchPlaybackData = async () => {
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

    const startTimeUTC = Math.floor(startDateTime.getTime() / 1000);
    const endTimeUTC = Math.floor(endDateTime.getTime() / 1000);

    axios
      .get(`${prodURL}/packetsBetween`, {
        params: { endTime: endTimeUTC, startTime: startTimeUTC },
      })
      .then((response) => {
        const sortedData = response.data.data.sort(
          (a: IPlaybackDynamoResponse, b: IPlaybackDynamoResponse) =>
            a.timestamp - b.timestamp,
        );
        setPlaybackData(sortedData);
      })
      .catch(() => {
        throw new Error("Error fetching playback data");
      })
      .finally(() => setLoading(false));
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
                {/* Left Column: Date & Time Picker */}
                <DatePickerColumn
                  fetchPlaybackData={fetchPlaybackData}
                  playbackDateTime={playbackDateTime}
                  setPlaybackDateTime={setPlaybackDateTime}
                />

                {/* Right Column: Playback Data Message */}
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
