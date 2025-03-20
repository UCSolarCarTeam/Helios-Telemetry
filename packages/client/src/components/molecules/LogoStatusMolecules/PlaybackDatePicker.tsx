import React, { useState } from "react";

import { useAppState } from "@/contexts/AppStateContext";
import { DatePicker, TimeInput } from "@mantine/dates";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { Modal } from "@mui/material";
import { ITelemetryData } from "@shared/helios-types";

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
    // fetch data based on playbackDateTime
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
                <div className="mt-8 flex w-[40%] flex-col items-center gap-4">
                  <DatePicker
                    onChange={(value) => {
                      setPlaybackDateTime((prev) => ({
                        ...prev,
                        startTime:
                          new Date(
                            value +
                              "T" +
                              prev.startTime.toISOString().split("T")[1],
                          ) ?? new Date(),
                      }));
                    }}
                    value={playbackDateTime.startTime}
                  />

                  <div className="flex flex-row items-center gap-1">
                    <TimeInput
                      onChange={(event) => {
                        setPlaybackDateTime((prev: IPlaybackDateTime) => ({
                          ...prev,
                          startTime: new Date(
                            Date.parse(
                              new Date(prev.startTime)
                                .toDateString()
                                .split("T")[0] +
                                "T" +
                                event.target.value,
                            ),
                          ),
                        }));
                      }}
                      value={
                        playbackDateTime.startTime.toTimeString().split(" ")[0]
                      }
                    />
                    -
                    <TimeInput
                      onChange={(event) => {
                        setPlaybackDateTime((prev) => ({
                          ...prev,
                          endTime: new Date(
                            new Date(prev.startTime)
                              .toISOString()
                              .split("T")[0] +
                              "T" +
                              event.target.value,
                          ),
                        }));
                      }}
                      value={
                        playbackDateTime.endTime.toTimeString().split(" ")[0]
                      }
                    />
                  </div>
                </div>

                {/* Right Column: Placeholder for Additional Content */}
                <div className="flex flex-grow items-center border-l border-gray-300 pl-6">
                  {playbackData ? (
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
