import axios from "axios";
import React, { useEffect, useState } from "react";

import { useAppState } from "@/contexts/AppStateContext";
import { usePlaybackContext } from "@/contexts/PlayBackContext";
import { notifications } from "@mantine/notifications";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { Modal } from "@mui/material";
import { ITelemetryData, prodURL } from "@shared/helios-types";

import DatePickerColumn from "./DataPickerMolecules/DatePickerColumn";
import DatePickerResultColumn from "./DataPickerMolecules/DatePickerResultColumn";

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
      throw new Error("Error fetching playback data");
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
            </div>
          </Modal>
        </div>
      )}
    </>
  );
}

export default PlaybackDatePicker;
