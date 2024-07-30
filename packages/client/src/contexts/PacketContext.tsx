import {
  type ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { CONNECTIONTYPES, useAppState } from "@/contexts/AppStateContext";
import { socketIO } from "@/contexts/SocketContext";
import fakeData from "@/contexts/fakePacket.json";
import { generateFakeTelemetryData } from "@/lib/utils";
import type ITelemetryData from "@/objects/telemetry-data.interface";

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
  const { currentAppState } = useAppState();

  const [currentPacket, setCurrentPacket] = useState<ITelemetryData>(
    fakeData as ITelemetryData,
  );

  // Generate random data for local dev mode
  function onPacket(packet: ITelemetryData) {
    setCurrentPacket(packet);
  }
  useEffect(() => {
    if (currentAppState.connectionType === CONNECTIONTYPES.NETWORK) {
      socketIO.on("packet", onPacket);
      return () => {
        socketIO.off("packet", onPacket);
      };
    } else if (currentAppState.connectionType === CONNECTIONTYPES.DEMO) {
      const interval = setInterval(() => {
        setCurrentPacket(generateFakeTelemetryData());
      }, 1000);
      return () => clearInterval(interval);
    } else if (currentAppState.connectionType === CONNECTIONTYPES.RADIO) {
      // Radio connection
    }
  }, [currentAppState.connectionType]);

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
