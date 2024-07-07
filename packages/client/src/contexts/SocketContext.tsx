import { type ReactNode, createContext, useContext, useEffect } from "react";
import { type Socket, io } from "socket.io-client";

import { useAppState } from "@/contexts/AppStateContext";
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

  const onCarLatency = (latency: number) => {
    setCurrentAppState((prev) => ({ ...prev, carLatency: latency }));
  };
  useEffect(() => {
    // Connect to the socket
    socketIO.connect();

    // Ping the server every second to measure user latency
    const id = setInterval(() => {
      const start = Date.now();

      socketIO.emit("ping", () => {
        const duration = Date.now() - start;
        setCurrentAppState((prev) => ({ ...prev, userLatency: duration }));
      });
    }, 1000);

    // Register event listeners
    socketIO.on("carLatency", onCarLatency);
    return () => {
      socketIO.disconnect();
      clearInterval(id);
      socketIO.off("carLatency", onCarLatency);
      socketIO.off("packet", onPacket);
    };
  }, []);

  // Socket connection status listeners
  socketIO.on("connect", () => {
    setCurrentAppState((prev) => ({
      ...prev,
      socketConnected: true,
      loading: false,
    }));
  });

  socketIO.on("disconnect", () => {
    setCurrentAppState((prev) => ({
      ...prev,
      socketConnected: false,
      loading: true,
    }));
  });

  return <socketContext.Provider value={{}}>{children}</socketContext.Provider>;
}

export function useSocket(): ISocketContextReturn {
  return useContext(socketContext);
}
