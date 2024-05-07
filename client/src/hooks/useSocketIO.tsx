import { useState } from "react";
import { type Socket, io } from "socket.io-client";

import type ITelemetryData from "@/objects/telemetry-data.interface";

interface ClientToServerEvents {
  test: () => void;
  "create-something": (value: string, callback: () => void) => void;
}

interface ServerToClientEvents {
  packet: (data: ITelemetryData) => void;
}
const SOCKET_IO_URL = "http://localhost:3001";
export const socketIO: Socket<ServerToClientEvents, ClientToServerEvents> =
  io(SOCKET_IO_URL);

export default function useSocketIO(eventName: keyof ServerToClientEvents) {
  const [socketReturn, setSocketReturn] = useState({
    connected: false,
    data: {} as ITelemetryData,
  });

  void socketIO.connect();

  socketIO.on(eventName, (data) =>
    setSocketReturn({ ...socketReturn, data: data }),
  );

  return { ...socketReturn };
}
