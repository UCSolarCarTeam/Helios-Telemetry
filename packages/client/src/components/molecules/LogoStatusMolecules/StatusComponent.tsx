import { useState } from "react";
import { twMerge } from "tailwind-merge";

import AWSIcon from "@/components/atoms/AWSIcon";
import CarIcon from "@/components/atoms/CarIcon";
import LatencyDotsIcon from "@/components/atoms/LatencyDotsIcon";
import UserComputerIcon from "@/components/atoms/UserComputerIcon";
import { CONNECTIONTYPES, useAppState } from "@/contexts/AppStateContext";
import { usePacket } from "@/contexts/PacketContext";
import { Switch } from "@mantine/core";
import { DateInput, DatePickerInput, TimeInput } from "@mantine/dates";

export type IPlaybackDateTime = { date: Date; startTime: Date; endTime: Date };

function PlaybackPickerComponent() {
  const { currentAppState, setCurrentAppState } = useAppState();
  const [playbackDateTime, setPlaybackDateTime] = useState<IPlaybackDateTime>({
    date: new Date(),
    endTime: new Date(),
    startTime: new Date(),
  });
  return (
    <div className="flex w-full flex-col items-start gap-2">
      <div className="flex items-center justify-center gap-2">
        <span className="pr-3">Playback: </span>
        <Switch
          checked={currentAppState.playbackSwitch}
          color="red"
          onClick={() =>
            setCurrentAppState((prevState) => ({
              ...prevState,
              playbackSwitch: !prevState.playbackSwitch,
            }))
          }
        />
      </div>

      {currentAppState.playbackSwitch && (
        <>
          <div className="flex flex-col gap-2 py-1">
            {/* <input
                className="max-w-32 rounded-md bg-[#BCBCBC] p-1 text-pink shadow-sm transition-all focus:outline-none"
                id="playbackDate"
                onChange={onDateChange}
                type="date"
                value={date}
              /> */}
            <div className="flex flex-col gap-2">
              <DatePickerInput
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
                placeholder="Pick date"
                value={playbackDateTime.startTime}
                valueFormat="MMM DD, YYYY"
              />

              <div className="flex flex-row items-center gap-2">
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
                  } // Only time part (HH:mm:ss)
                />
                -
                <TimeInput
                  onChange={(event) => {
                    setPlaybackDateTime((prev) => ({
                      ...prev,
                      endTime: new Date(
                        new Date(prev.startTime).toISOString().split("T")[0] +
                          "T" +
                          event.target.value,
                      ),
                    }));
                  }}
                  value={playbackDateTime.endTime.toTimeString().split(" ")[0]} // Only time part (HH:mm:ss)
                />
              </div>

              {playbackDateTime.endTime.toISOString()}
            </div>
          </div>
          {/* <Modal
              aria-describedby="modal-modal-description"
              aria-labelledby="modal-modal-title"
              className="flex flex-grow items-center justify-center"
              onClose={() => setShowModal(false)}
              open={showModal}
            >
              <div className="w-full rounded-lg border-none bg-white p-4 shadow-lg outline-none sm:max-w-[75%]">
                <h5 className="text-text-gray dark:text-text-gray-dark mb-5 text-center text-3xl font-semibold">
                  There is no data for this date
                </h5>{" "}
              </div>
            </Modal> */}
        </>
      )}
    </div>
  );
}
function StatusComponent() {
  const { currentAppState, setCurrentAppState } = useAppState();
  const { currentPacket } = usePacket();

  const userConnection = currentAppState.socketConnected;
  // TODO: change carConnection from socketIO.connected to carConnection.connected
  const carConnection = currentAppState.socketConnected;
  const colorTheme = currentAppState.darkMode ? "#FFFFFF" : "#000000";
  // Maybe server should have a reference to the last packet received from the vehicle.
  const packetTime = currentAppState.socketConnected
    ? new Date(currentPacket.TimeStamp).toLocaleString()
    : "DISCONNECTED";

  return (
    <div className="grid gap-y-2">
      <div>
        <div className="flex flex-row items-end justify-start pb-1 pt-2">
          <UserComputerIcon color={colorTheme} height="25px" width="25px" />
          <LatencyDotsIcon
            color={colorTheme}
            height="20px"
            isConnected={userConnection}
            latency={currentAppState.userLatency}
            width="15px"
          />
          <AWSIcon color={colorTheme} height="25px" width="25px" />
          <LatencyDotsIcon
            color={colorTheme}
            height="20px"
            isConnected={carConnection}
            latency={currentAppState.carLatency}
            width="15px"
          />
          <CarIcon color={colorTheme} height="25px" width="25px" />
        </div>
        <h5 className="text-text-gray dark:text-text-gray-dark pb-1 text-xs">
          Timestamp:
        </h5>
        <h5 className="text-text-gray dark:text-text-gray-dark text-nowrap pb-2 text-xs underline decoration-primary decoration-1 underline-offset-4">
          {packetTime}
        </h5>
        <h5 className="text-text-gray dark:text-text-gray-dark pb-1 text-xs">
          Connection:
        </h5>
        <h5 className="text-text-gray dark:text-text-gray-dark text-nowrap pb-2 text-xs underline decoration-primary decoration-1 underline-offset-4">
          {currentAppState.connectionType}
        </h5>
        {currentAppState.connectionType === CONNECTIONTYPES.DEMO && (
          <h5
            className={twMerge(
              "dark:text-text-gray-dark align-center items-center pb-1 text-lg font-bold text-helios",
              new Date().getSeconds() % 2 === 0
                ? "bg-black text-helios"
                : "bg-helios text-black",
            )}
          >
            SIMULATION
          </h5>
        )}
      </div>
      <PlaybackPickerComponent />
    </div>
  );
}

export default StatusComponent;
