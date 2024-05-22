import { type Socket, io } from "socket.io-client";

import type ITelemetryData from "@/objects/telemetry-data.interface";

interface ClientToServerEvents {}

interface ServerToClientEvents {
  packet: (value: ITelemetryData) => void;
}

// TODO:set undefined to ServerURL once deployed.
const URL =
  process.env.NODE_ENV === "production"
    ? "http://35.182.186.247:3001"
    : "http://localhost:3001";

// Defaults to using client fakerJS, change Data to REAL in site settings to connect to server
export const socketIO: Socket<ServerToClientEvents, ClientToServerEvents> = io(
  URL,
  { autoConnect: false },
);
