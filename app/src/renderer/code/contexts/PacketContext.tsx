import { type ReactNode, createContext, useContext, useState } from "react";

import type ITelemetryData from "../objects/telemetry-data.interface";

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
  const [currentPacket, setCurrentPacket] = useState<ITelemetryData>(
    fakeData as ITelemetryData,
  );

  return (
    <packetContext.Provider value={{ currentPacket, setCurrentPacket }}>
      {children}
    </packetContext.Provider>
  );
}

export function usePacket(): IPackContextReturn {
  return useContext(packetContext);
}
