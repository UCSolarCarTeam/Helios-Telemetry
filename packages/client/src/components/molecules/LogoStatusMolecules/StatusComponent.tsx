import { twMerge } from "tailwind-merge";

import AWSIcon from "@/components/atoms/AWSIcon";
import CarIcon from "@/components/atoms/CarIcon";
import LatencyDotsIcon from "@/components/atoms/LatencyDotsIcon";
import UserComputerIcon from "@/components/atoms/UserComputerIcon";
import { CONNECTIONTYPES, useAppState } from "@/contexts/AppStateContext";
import { usePacket } from "@/contexts/PacketContext";

function StatusComponent() {
  const { currentAppState } = useAppState();
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
    <div className="grid">
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
    </div>
  );
}

export default StatusComponent;
