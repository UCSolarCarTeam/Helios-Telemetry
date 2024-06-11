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
  const [carLatency, setCarLatency] = useState(23);
  useEffect(() => {
    const id = setInterval(() => {
      const start = Date.now();

      socketIO.emit("ping", (response: number) => {
        const duration = Date.now() - start;
        setUserLatency(duration);
        console.log(response);
      });
    }, 1000);
    return () => clearInterval(id);
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
