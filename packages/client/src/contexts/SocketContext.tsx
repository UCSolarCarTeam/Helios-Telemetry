import { type ReactNode, createContext, useContext, useEffect } from "react";

import { useAppState } from "@/contexts/AppStateContext";
import type ITelemetryData from "@/objects/telemetry-data.interface";
import { socketIO } from "@/socket";

interface ISocketContextReturn {}
const socketContext = createContext<ISocketContextReturn>(
  {} as ISocketContextReturn,
);
export function SocketContextProvider({
  children,
}: {
  children: ReactNode | ReactNode[];
}): JSX.Element {
  const { setCurrentAppState } = useAppState();
  function onCarLatency(latency: number) {
    setCurrentAppState((prev) => ({ ...prev, carLatency: latency }));
  }
  function onPacket(packet: ITelemetryData) {
    console.log(packet);
  }
  useEffect(() => {
    const id = setInterval(() => {
      const start = Date.now();

      socketIO.emit("ping", () => {
        const duration = Date.now() - start;
        setCurrentAppState((prev) => ({ ...prev, userLatency: duration }));
      });
    }, 1000);
    socketIO.on("carLatency", onCarLatency);
    socketIO.on("packet", onPacket);
    return () => {
      clearInterval(id);
      socketIO.off("carLatency", onCarLatency);
      socketIO.off("packet", onPacket);
    };
  }, []);

  return <socketContext.Provider value={{}}>{children}</socketContext.Provider>;
}

export function useSocket(): ISocketContextReturn {
  return useContext(socketContext);
}
