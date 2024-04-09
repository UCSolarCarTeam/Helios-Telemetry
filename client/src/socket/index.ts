import { type Socket, io } from "socket.io-client";

interface ClientToServerEvents {
  test: () => void;
}

interface ServerToClientEvents {
  noArg: () => void;
  basicEmit: (a: number, b: string, c: Buffer) => void;
  withAck: (d: string, callback: (e: number) => void) => void;
}

export const socketIO: Socket<ServerToClientEvents, ClientToServerEvents> = io(
  "http://localhost:3001",
);
