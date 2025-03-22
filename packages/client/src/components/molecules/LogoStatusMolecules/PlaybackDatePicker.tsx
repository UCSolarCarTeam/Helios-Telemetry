import axios from "axios";
import React, { useState } from "react";

import { useAppState } from "@/contexts/AppStateContext";
import { DatePicker, TimeInput } from "@mantine/dates";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { Button, Modal } from "@mui/material";
import { ITelemetryData, prodURL } from "@shared/helios-types";

export type IPlaybackDateTime = { date: Date; startTime: Date; endTime: Date };

interface IPlaybackDynamoResponse {
  data: ITelemetryData[];
  id: string;
  timestamp: number;
}

function PlaybackDatePicker() {
  const { currentAppState } = useAppState();
  const [open, setOpen] = useState(false);
  const [playbackDateTime, setPlaybackDateTime] = useState<IPlaybackDateTime>({
    date: new Date(),
    endTime: new Date(),
    startTime: new Date(),
  });

  const [playbackData, setPlaybackData] = useState<ITelemetryData[]>([]);

  const fetchPlaybackData = async () => {
    const year = playbackDateTime.date.getFullYear();
    const month = playbackDateTime.date.getMonth();
    const day = playbackDateTime.date.getDate();

    const startDateTime = new Date(
      year,
      month,
      day,
      playbackDateTime.startTime.getHours(),
      playbackDateTime.startTime.getMinutes(),
      playbackDateTime.startTime.getSeconds(),
    );

    const endDateTime = new Date(
      year,
      month,
      day,
      playbackDateTime.endTime.getHours(),
      playbackDateTime.endTime.getMinutes(),
      playbackDateTime.endTime.getSeconds(),
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
      });
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
                <div className="m-4 flex flex-col items-center gap-4 sm:w-[50%]">
                  <DatePicker
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
                    <TimeInput
                      onChange={(event) => {
                        const timeValue = event.target.value;
                        if (!timeValue) return;

                        const [hours, minutes, seconds = 0] = timeValue
                          .split(":")
                          .map(Number);

                        setPlaybackDateTime((prev) => {
                          const newStartTime = new Date(prev.startTime);
                          newStartTime.setHours(
                            hours ?? 0,
                            minutes ?? 0,
                            seconds ?? 0,
                          );

                          return { ...prev, startTime: newStartTime };
                        });
                      }}
                      value={
                        playbackDateTime.startTime.toTimeString().split(" ")[0]
                      }
                    />
                    <span>-</span>
                    <TimeInput
                      onChange={(event) => {
                        const timeValue = event.target.value;
                        if (!timeValue) return;

                        const [hours, minutes, seconds = 0] = timeValue
                          .split(":")
                          .map(Number);

                        setPlaybackDateTime((prev) => {
                          const newEndTime = new Date(prev.endTime);
                          newEndTime.setHours(
                            hours ?? 0,
                            minutes ?? 0,
                            seconds ?? 0,
                          );

                          return { ...prev, endTime: newEndTime };
                        });
                      }}
                      value={
                        playbackDateTime.endTime.toTimeString().split(" ")[0]
                      }
                    />
                  </div>
                  <Button className="mb-1" onClick={fetchPlaybackData}>
                    Confirm
                  </Button>
                </div>

                {/* Right Column: Playback Data Message */}
                <div className="flex flex-grow items-center border-t border-gray-300 pt-4 sm:border-l sm:border-t-0 sm:pl-6 sm:pt-0">
                  {playbackData.length > 0 ? (
                    <h5 className="text-text-gray dark:text-text-gray-dark text-center text-lg font-semibold sm:text-2xl">
                      {`Playback data for ${playbackDateTime.date.toDateString()} at ${playbackDateTime.startTime.toLocaleTimeString()} to ${playbackDateTime.endTime.toLocaleTimeString()} retrieved successfully.`}
                    </h5>
                  ) : (
                    <h5 className="text-text-gray dark:text-text-gray-dark text-center text-lg font-semibold sm:text-2xl">
                      There is no data for this date.
                    </h5>
                  )}
                </div>
              </div>
            </div>
          </Modal>
        </div>
      )}
    </>
  );
}

export default PlaybackDatePicker;
