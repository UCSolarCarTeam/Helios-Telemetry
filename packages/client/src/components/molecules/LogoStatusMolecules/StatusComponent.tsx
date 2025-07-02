import { twMerge } from "tailwind-merge";

import AWSIcon from "@/components/atoms/AWSIcon";
import CarIcon from "@/components/atoms/CarIcon";
import LatencyDotsIcon from "@/components/atoms/LatencyDotsIcon";
import UserComputerIcon from "@/components/atoms/UserComputerIcon";
import { CONNECTIONTYPES, useAppState } from "@/contexts/AppStateContext";
import { usePacket } from "@/contexts/PacketContext";
import { Switch } from "@mantine/core";

function PlaybackPickerComponent() {
  const { currentAppState, setCurrentAppState } = useAppState();

  return (
    <div className="flex w-full flex-col items-start gap-2">
      <div className="flex items-center justify-center gap-2">
        <span className="pr-3">Playback: </span>
        <Switch
          checked={currentAppState.playbackSwitch}
          color="#B94A6C"
          onClick={() =>
            setCurrentAppState((prevState) => ({
              ...prevState,
              playbackSwitch: !prevState.playbackSwitch,
            }))
          }
        />
      </div>
    </div>
  );
}

function StatusComponent() {
  const {
    currentAppState: {
      carLatency,
      connectionType,
      darkMode,
      mqttConnected,
      socketConnected,
      userLatency,
    },
  } = useAppState();
  const {
    currentPacket: { TimeStamp },
  } = usePacket();
  const userConnection = socketConnected;
  const carConnection = mqttConnected;
  const colorTheme = darkMode ? "#FFFFFF" : "#000000";
  const packetTime = userConnection
    ? new Date(TimeStamp).toLocaleString()
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
            latency={userLatency}
            width="15px"
          />
          <AWSIcon color={colorTheme} height="25px" width="25px" />
          <LatencyDotsIcon
            color={colorTheme}
            height="20px"
            isConnected={carConnection}
            latency={carLatency}
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
          {connectionType}
        </h5>
        {connectionType === CONNECTIONTYPES.DEMO && (
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
