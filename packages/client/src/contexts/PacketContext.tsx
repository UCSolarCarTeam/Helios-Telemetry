import {
  type JSX,
  type PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { CONNECTIONTYPES, useAppState } from "@/contexts/AppStateContext";
import { socketIO } from "@/contexts/SocketContext";
import {
  generateFakeTelemetryData,
  generateRealisticTelemetryData,
} from "@shared/helios-types";
import type { ITelemetryData } from "@shared/helios-types";

interface IPackContextReturn {
  currentPacket: ITelemetryData;
  setCurrentPacket: (packet: ITelemetryData) => void;
}

const packetContext = createContext<IPackContextReturn>(
  {} as IPackContextReturn,
);

export function PacketContextProvider({
  children,
}: PropsWithChildren): JSX.Element {
  const { currentAppState } = useAppState();

  const [currentPacket, setCurrentPacket] = useState<ITelemetryData>(
    generateFakeTelemetryData() as ITelemetryData,
  );

  // Generate random data for local dev mode
  function onPacket(packet: ITelemetryData) {
    setCurrentPacket(packet);
  }
  useEffect(() => {
    if (currentAppState.playbackSwitch) {
      setCurrentPacket(generateFakeTelemetryData());
      return;
    }

    if (currentAppState.connectionType === CONNECTIONTYPES.NETWORK) {
      socketIO.on("packet", onPacket);
      return () => {
        socketIO.off("packet", onPacket);
      };
    } else if (currentAppState.connectionType === CONNECTIONTYPES.DEMO) {
      const interval = setInterval(() => {
        setCurrentPacket(generateRealisticTelemetryData());
      }, 500);
      return () => clearInterval(interval);
    } else if (currentAppState.connectionType === CONNECTIONTYPES.RADIO) {
      // Radio connection
    }
  }, [currentAppState.connectionType, currentAppState.playbackSwitch]);

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
