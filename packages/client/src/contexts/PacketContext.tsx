import {
  type ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { CONNECTIONTYPES, useAppState } from "@/contexts/AppStateContext";
import fakeData from "@/contexts/fakePacket.json";
import { generateFakeTelemetryData } from "@/lib/utils";
import type ITelemetryData from "@/objects/telemetry-data.interface";
import { socketIO } from "@/socket";

interface PacketContextProps {
  children: ReactNode | ReactNode[];
}

interface IPackContextReturn {
  currentPacket: ITelemetryData;
  setCurrentPacket: (packet: ITelemetryData) => void;
}

const packetContext = createContext<IPackContextReturn>(
  {} as IPackContextReturn,
);

export function PacketContextProvider({
  children,
}: PacketContextProps): JSX.Element {
  const { currentAppState, setCurrentAppState } = useAppState();
  const isFaking = currentAppState.connectionTypes === CONNECTIONTYPES.DEMO;
  const [currentPacket, setCurrentPacket] = useState<ITelemetryData>(
    fakeData as ITelemetryData,
  );

  // Generate random data for local dev mode
  function onPacket(packet: ITelemetryData) {
    setCurrentPacket(packet);
  }
  useEffect(() => {
    if (isFaking) {
      const interval = setInterval(() => {
        setCurrentPacket(generateFakeTelemetryData());
      }, 2500);
      return () => clearInterval(interval);
    } else {
      socketIO.connect();
      setCurrentAppState((prev) => ({ ...prev, socketConnected: true }));
      socketIO.on("packet", onPacket);
      return () => {
        socketIO.disconnect();
        socketIO.off("packet", onPacket);
      };
    }
  }, [isFaking]);

  return (
    <packetContext.Provider
      value={{
        currentPacket: currentPacket,
        setCurrentPacket: setCurrentPacket,
      }}
    >
      {children}
    </packetContext.Provider>
  );
}

export function usePacket(): IPackContextReturn {
  return useContext(packetContext);
}
