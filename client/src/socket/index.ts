import { type Socket, io } from "socket.io-client";

interface ClientToServerEvents {
  test: () => void;
  "create-something": (value: string, callback: () => void) => void;
}

interface ServerToClientEvents {
  noArg: () => void;
  basicEmit: (a: number, b: string, c: Buffer) => void;
  withAck: (d: string, callback: (e: number) => void) => void;
  foo: (value: string) => void;
  time: (value: string) => void;
}

export const socketIO: Socket<ServerToClientEvents, ClientToServerEvents> = io(
  "http://localhost:3001",
);
