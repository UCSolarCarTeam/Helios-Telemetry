import axios from "axios";
import React, { useState } from "react";

import { useAppState } from "@/contexts/AppStateContext";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { Modal } from "@mui/material";
import { ITelemetryData, prodURL } from "@shared/helios-types";

import DatePickerColumn from "./DataPickerMolecules/DatePickerColumn";
import DatePickerResultColumn from "./DataPickerMolecules/DatePickerResultColumn";

export type IPlaybackDateTime = { date: Date; startTime: Date; endTime: Date };

export interface IPlaybackDynamoResponse {
  data: ITelemetryData[];
  id: string;
  timestamp: number;
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

    const createDateTime = (time: Date) =>
      new Date(
        year,
        month,
        day,
        time.getHours(),
        time.getMinutes(),
        time.getSeconds(),
      );

    const startDateTime = createDateTime(playbackDateTime.startTime);
    const endDateTime = createDateTime(playbackDateTime.endTime);

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
            </div>
          </Modal>
        </div>
      )}
    </>
  );
}

export default PlaybackDatePicker;
