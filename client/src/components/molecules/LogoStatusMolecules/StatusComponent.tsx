import { useEffect, useState } from "react";

import AWSIcon from "@/components/atoms/AWSIcon";
import CarIcon from "@/components/atoms/CarIcon";
import LatencyDotsIcon from "@/components/atoms/LatencyDotsIcon";
import UserComputerIcon from "@/components/atoms/UserComputerIcon";
import { useAppState } from "@/contexts/AppStateContext";
import { usePacket } from "@/contexts/PacketContext";
import { socketIO } from "@/socket";

function StatusComponent() {
  const [userLatency, setUserLatency] = useState(0);
  useEffect(() => {
    const id = setInterval(() => {
      const start = Date.now();

      socketIO.emit("ping", () => {
        const duration = Date.now() - start;
        setUserLatency(duration);
      });
    }, 1000);
    return () => clearInterval(id);
  }, []);
  const carLatency = 23;
  const userConnection = socketIO.connected;
  const carConnection = false;
  const { currentPacket } = usePacket();
  const { currentAppState } = useAppState();
  const colorTheme = currentAppState.darkMode ? "#FFFFFF" : "#000000";
  // Maybe server should have a reference to the last packet received from the vehicle.
  const packetTime = socketIO.connected
    ? new Date(currentPacket.TimeStamp).toLocaleString()
    : "DISCONNECTED";
  return (
    <div className="grid">
      <div>
        <div className="flex flex-row items-end justify-start pb-1 pt-2">
          {" "}
          <UserComputerIcon color={colorTheme} width="25px" height="25px" />
          <LatencyDotsIcon
            color={colorTheme}
            width="15px"
            height="20px"
            latency={userLatency}
            isConnected={userConnection}
          />
          <AWSIcon color={colorTheme} width="25px" height="25px" />
          <LatencyDotsIcon
            color={colorTheme}
            width="15px"
            height="20px"
            latency={carLatency}
            isConnected={carConnection}
          />
          <CarIcon color={colorTheme} width="25px" height="25px" />
        </div>
        <h5 className="text-text-gray dark:text-text-gray-dark pb-1 text-sm ">
          PACKET TIMESTAMP
        </h5>
        <h5 className="text-text-gray dark:text-text-gray-dark decoration-primary pb-2 text-xs underline decoration-1 underline-offset-4">
          {packetTime}
        </h5>
      </div>
    </div>
  );
}

export default StatusComponent;
