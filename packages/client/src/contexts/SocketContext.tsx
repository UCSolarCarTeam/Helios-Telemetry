import {
  type PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
} from "react";
import { type Socket, io } from "socket.io-client";

import { useAppState } from "@/contexts/AppStateContext";
import type { ITelemetryData } from "@shared/helios-types";

interface ClientToServerEvents {
  ping: (cb: (val: number) => void) => void;
}

interface ServerToClientEvents {
  packet: (value: ITelemetryData) => void;
  carLatency: (value: number) => void;
}

// TODO:set undefined to ServerURL once deployed.
const URL =
  process.env.NODE_ENV === "production"
    ? "aedes.calgarysolarcar.ca:3001"
    : "http://localhost:3001";

// Defaults to using client fakerJS, change Data to Network in site settings to connect to server
export const socketIO: Socket<ServerToClientEvents, ClientToServerEvents> = io(
  URL,
  { autoConnect: false },
);

interface ISocketContextReturn {}
const socketContext = createContext<ISocketContextReturn>(
  {} as ISocketContextReturn,
);
export function SocketContextProvider({
  children,
}: PropsWithChildren): JSX.Element {
  const { setCurrentAppState } = useAppState();
  const start = useRef<number | null>(null);

  const onCarLatency = useCallback(
    (latency: number) => {
      setCurrentAppState((prev) => ({ ...prev, carLatency: latency }));
    },
    [setCurrentAppState],
  );

  useEffect(() => {
    // Connect to the socket
    socketIO.connect();

    // Ping the server every second to measure user latency
    const id = setInterval(() => {
      start.current = Date.now();

      socketIO.emit("ping", () => {
        const duration = Date.now() - (start.current as number);
        setCurrentAppState((prev) => ({ ...prev, userLatency: duration }));
      });
    }, 10000);

    // Register event listeners
    socketIO.on("carLatency", onCarLatency);
    return () => {
      socketIO.disconnect();
      clearInterval(id);
      socketIO.off("carLatency", onCarLatency);
    };
  }, [onCarLatency, setCurrentAppState]);

  // Socket connection status listeners
  socketIO.on("connect", () => {
    setCurrentAppState((prev) => ({
      ...prev,
      socketConnected: true,
    }));
  });

  socketIO.on("disconnect", () => {
    setCurrentAppState((prev) => ({
      ...prev,
      socketConnected: false,
    }));
  });

  return <socketContext.Provider value={{}}>{children}</socketContext.Provider>;
}

export function useSocket(): ISocketContextReturn {
  return useContext(socketContext);
}
