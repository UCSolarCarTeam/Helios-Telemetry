import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";

import AWSIcon from "@/components/atoms/AWSIcon";
import CarIcon from "@/components/atoms/CarIcon";
import LatencyDotsIcon from "@/components/atoms/LatencyDotsIcon";
import UserComputerIcon from "@/components/atoms/UserComputerIcon";
import { CONNECTIONTYPES, useAppState } from "@/contexts/AppStateContext";
import { usePacket } from "@/contexts/PacketContext";
import { socketIO } from "@/contexts/SocketIOConnection";

function StatusComponent() {
  const { currentAppState } = useAppState();
  const { currentPacket } = usePacket();

  const [latencies, setLatencies] = useState({
    userLatency: null || 0,
    carLatency: null || 0,
    socketConnected: false, // TODO: differentiate between user and car connection
  });
  const colorTheme = currentAppState.darkMode ? "#FFFFFF" : "#000000";
  // Maybe server should have a reference to the last packet received from the vehicle.
  const packetTime = latencies.socketConnected
    ? new Date(currentPacket.TimeStamp).toLocaleString()
    : "DISCONNECTED";

  const onCarLatency = (latency: number) => {
    setLatencies((prev) => ({ ...prev, carLatency: latency }));
  };

  useEffect(() => {
    // Connect to the socket
    socketIO.connect();

    socketIO.on("connect", () => {
      setLatencies((prev) => ({
        ...prev,
        socketConnected: true,
      }));
    });

    socketIO.on("disconnect", () => {
      setLatencies((prev) => ({
        ...prev,
        socketConnected: false,
      }));
    });

    // Ping the server every second to measure user latency
    const id = setInterval(() => {
      const start = Date.now();

      socketIO.emit("ping", () => {
        const duration = Date.now() - start;
        setLatencies((prev) => ({ ...prev, userLatency: duration }));
      });
    }, 1000);
    socketIO.on("carLatency", onCarLatency);
    return () => {
      clearInterval(id);
      socketIO.off("connect");
      socketIO.off("disconnect");
      socketIO.off("carLatency", onCarLatency);
      socketIO.disconnect();
    };
    // Register event listeners
  }, [setLatencies]);

  return (
    <div className="grid">
      <div>
        <div className="flex flex-row items-end justify-start pb-1 pt-2">
          <UserComputerIcon color={colorTheme} width="25px" height="25px" />
          <LatencyDotsIcon
            color={colorTheme}
            width="15px"
            height="20px"
            latency={latencies.userLatency}
            isConnected={latencies.socketConnected}
          />
          <AWSIcon color={colorTheme} width="25px" height="25px" />
          <LatencyDotsIcon
            color={colorTheme}
            width="15px"
            height="20px"
            latency={latencies.carLatency}
            isConnected={latencies.socketConnected}
          />
          <CarIcon color={colorTheme} width="25px" height="25px" />
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
