import {
  type JSX,
  type PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
} from "react";
import { type Socket, io } from "socket.io-client";

import { useAppState } from "@/contexts/AppStateContext";
import { notifications } from "@mantine/notifications";
import type {
  CoordInfoUpdate,
  CoordUpdateResponse,
  Coords,
  ILapData,
  IRaceInfo,
  ITelemetryData,
} from "@shared/helios-types";
import { socketURL } from "@shared/helios-types";

interface ClientToServerEvents {
  ping: (cb: (val: number) => void) => void;
  setLapCoords: (coords: CoordInfoUpdate) => void;
}

interface ServerToClientEvents {
  packet: (value: ITelemetryData) => void;
  lapCoords: (coords: CoordUpdateResponse) => void;
  carLatency: (value: number) => void;
  lapData: (value: ILapData) => void;
  raceInfo: (value: IRaceInfo) => void;
  lapComplete: () => void;
  carDisconnect: (data: { message: string }) => void;
  carConnect: (data: { message: string }) => void;
}

// Defaults to using client fakerJS, change Data to Network in site settings to connect to server
export const socketIO: Socket<ServerToClientEvents, ClientToServerEvents> = io(
  socketURL,
  { autoConnect: false },
);

const socketContext = createContext({});
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

  const onLapCoords = useCallback(
    (coords: CoordUpdateResponse) => {
      if ("error" in coords) {
        return;
      }
      setCurrentAppState((prev) => ({ ...prev, lapCoords: coords as Coords }));
    },
    [setCurrentAppState],
  );
  const onCarConnect = useCallback(() => {
    setCurrentAppState((prev) => ({
      ...prev,
      mqttConnected: true,
    }));
    notifications.show({
      color: "",
      message: "Car has reconnected!",
      title: "Connection Restored",
    });
  }, [setCurrentAppState]);
  const onCarDisconnect = useCallback(() => {
    setCurrentAppState((prev) => ({
      ...prev,
      mqttConnected: false,
    }));
    notifications.show({
      color: "red",
      message: "Car has disconnected!",
      title: "Connection Lost",
    });
  }, [setCurrentAppState]);

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
    socketIO.on("carDisconnect", onCarDisconnect);
    socketIO.on("carConnect", onCarConnect);
    socketIO.on("carLatency", onCarLatency);
    socketIO.on("lapCoords", onLapCoords);
    return () => {
      socketIO.disconnect();
      clearInterval(id);
      socketIO.off("carDisconnect", onCarDisconnect);
      socketIO.off("carConnect", onCarConnect);
      socketIO.off("carLatency", onCarLatency);
      socketIO.off("lapCoords", onLapCoords);
    };
  }, [
    onCarConnect,
    onCarDisconnect,
    onCarLatency,
    onLapCoords,
    setCurrentAppState,
  ]);

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

export function useSocket() {
  return useContext(socketContext);
}
