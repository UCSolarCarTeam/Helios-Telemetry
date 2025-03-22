import axios from "axios";
import React, { useState } from "react";

import { useAppState } from "@/contexts/AppStateContext";
import { DatePicker, TimeInput } from "@mantine/dates";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { Button, Modal } from "@mui/material";
import { ITelemetryData, prodURL } from "@shared/helios-types";

export type IPlaybackDateTime = { date: Date; startTime: Date; endTime: Date };

function PlaybackDatePicker() {
  const { currentAppState, setCurrentAppState } = useAppState();
  const [open, setOpen] = useState(false);
  const [playbackDateTime, setPlaybackDateTime] = useState<IPlaybackDateTime>({
    date: new Date(),
    endTime: new Date(),
    startTime: new Date(),
  });

  const [playbackData, setPlaybackData] = useState<ITelemetryData[]>([]);

  const fetchPlaybackData = async () => {
    // Get the date parts from the selected date
    const year = playbackDateTime.date.getFullYear();
    const month = playbackDateTime.date.getMonth();
    const day = playbackDateTime.date.getDate();

    // Create new Date objects that combine the date with the start/end times
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

    // Convert to UNIX time in seconds
    const startTimeUTC = Math.floor(startDateTime.getTime() / 1000);
    const endTimeUTC = Math.floor(endDateTime.getTime() / 1000);

    axios
      .get(`${prodURL}/packetsBetween`, {
        params: {
          endTime: endTimeUTC,
          startTime: startTimeUTC,
        },
      })
      .then((response) => {
        const sortedData = response.data.data.sort(
          (a, b) => a.timestamp - b.timestamp,
        );
        setPlaybackData(sortedData);
      })
      .catch((error) => {
        throw new Error("Error fetching playback data", error);
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
            <div className="relative flex h-[50vh] w-1/2 rounded-lg border-none bg-white p-6 shadow-lg outline-none sm:max-w-[75%]">
              <div className="flex flex-grow flex-row gap-6">
                {/* Left Column: Date & Time Picker */}
                <div className="flex w-[40%] flex-col items-center gap-4">
                  <DatePicker
                    onChange={(value) => {
                      if (value) {
                        setPlaybackDateTime((prev) => {
                          // Create new date from the selected date value
                          const selectedDate = new Date(value);

                          // Create new startTime while preserving the time component
                          const newStartTime = new Date(prev.startTime);
                          // Update only the date part (year, month, day)
                          newStartTime.setFullYear(selectedDate.getFullYear());
                          newStartTime.setMonth(selectedDate.getMonth());
                          newStartTime.setDate(selectedDate.getDate());

                          return {
                            date: selectedDate,
                            endTime: prev.endTime, // Keep endTime unchanged
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
                        const timeValue = event.target.value; // format: "HH:MM:SS"
                        if (!timeValue) return;

                        const [hours, minutes, seconds = 0] = timeValue
                          .split(":")
                          .map(Number);

                        setPlaybackDateTime((prev) => {
                          // Create a new startTime Date object
                          const newStartTime = new Date(prev.startTime);
                          // Update only the time part
                          newStartTime.setHours(
                            hours ?? 0,
                            minutes ?? 0,
                            seconds ?? 0,
                          );

                          return {
                            ...prev, // Keep date and endTime unchanged
                            startTime: newStartTime,
                          };
                        });
                      }}
                      value={
                        playbackDateTime.startTime.toTimeString().split(" ")[0]
                      }
                    />
                    -
                    <TimeInput
                      onChange={(event) => {
                        const timeValue = event.target.value;
                        if (!timeValue) return;

                        const [hours, minutes, seconds = 0] = timeValue
                          .split(":")
                          .map(Number);

                        setPlaybackDateTime((prev) => {
                          // Create a new endTime Date object
                          const newEndTime = new Date(prev.endTime);
                          // Update only the time part
                          newEndTime.setHours(
                            hours ?? 0,
                            minutes ?? 0,
                            seconds ?? 0,
                          );

                          return {
                            ...prev, // Keep date and startTime unchanged
                            endTime: newEndTime,
                          };
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

                {/* Right Column: Placeholder for Additional Content */}
                <div className="flex flex-grow items-center border-l border-gray-300 pl-6">
                  {playbackData.length > 0 ? (
                    <h5 className="text-text-gray dark:text-text-gray-dark mb-5 text-center text-3xl font-semibold">
                      {`Playback data for ${playbackDateTime.date.toDateString()} at ${playbackDateTime.startTime.toLocaleTimeString()} to ${playbackDateTime.endTime.toLocaleTimeString()} retrieved successfully.`}
                    </h5>
                  ) : (
                    <h5 className="text-text-gray dark:text-text-gray-dark mb-5 text-center text-3xl font-semibold">
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
