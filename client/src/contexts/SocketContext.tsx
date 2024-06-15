import {
  type ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { socketIO } from "@/socket";

interface ISocketContextReturn {
  userLatency: number;
  setUserLatency: React.Dispatch<React.SetStateAction<number>>;
  carLatency: number;
  setCarLatency: React.Dispatch<React.SetStateAction<number>>;
}
const socketContext = createContext<ISocketContextReturn>(
  {} as ISocketContextReturn,
);
export function SocketContextProvider({
  children,
}: {
  children: ReactNode | ReactNode[];
}): JSX.Element {
  const [userLatency, setUserLatency] = useState(0);
  const [carLatency, setCarLatency] = useState(0);
  function onCarLatency(latency: number) {
    setCarLatency(latency);
  }
  useEffect(() => {
    const id = setInterval(() => {
      const start = Date.now();

      socketIO.emit("ping", () => {
        const duration = Date.now() - start;
        setUserLatency(duration);
      });
    }, 1000);
    socketIO.on("carLatency", onCarLatency);
    return () => {
      clearInterval(id);
      socketIO.off("carLatency", onCarLatency);
    };
  }, []);

  const value = {
    userLatency,
    setUserLatency,
    carLatency,
    setCarLatency,
  };
  return (
    <socketContext.Provider value={value}>{children}</socketContext.Provider>
  );
}

export function useSocket(): ISocketContextReturn {
  return useContext(socketContext);
}
