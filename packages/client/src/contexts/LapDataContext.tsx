import axios from "axios";
import {
  JSX,
  type PropsWithChildren,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

import { CONNECTIONTYPES, useAppState } from "@/contexts/AppStateContext";
import { socketIO } from "@/contexts/SocketContext";
import { IFormattedLapData, ILapData, prodURL } from "@shared/helios-types";

const formatLapData = (lapPacket: ILapData): IFormattedLapData => ({
  Rfid: lapPacket.Rfid,
  data: {
    ampHours: parseFloat(lapPacket.data.ampHours.toFixed(2)),
    averagePackCurrent: parseFloat(
      lapPacket.data.averagePackCurrent.toFixed(2),
    ),
    averageSpeed: parseFloat(lapPacket.data.averageSpeed.toFixed(2)),
    batterySecondsRemaining: parseFloat(
      lapPacket.data.batterySecondsRemaining.toFixed(2),
    ),
    distance: parseFloat(lapPacket.data.distance.toFixed(2)),
    energyConsumed: parseFloat(lapPacket.data.energyConsumed.toFixed(2)),
    lapTime: parseFloat(lapPacket.data.lapTime.toFixed(2)),
    netPowerOut: parseFloat(lapPacket.data.netPowerOut.toFixed(2)),
    timeStamp: new Date(lapPacket.data.timeStamp).toLocaleString("en-US"),
    totalPowerIn: parseFloat(lapPacket.data.totalPowerIn.toFixed(2)),
    totalPowerOut: parseFloat(lapPacket.data.totalPowerOut.toFixed(2)),
  },
  timestamp: lapPacket.timestamp,
});

interface ILapDataContextReturn {
  lapData: IFormattedLapData[];
}

const lapDataContext = createContext<ILapDataContextReturn>({
  lapData: [],
});

export function LapDataContextProvider({
  children,
}: PropsWithChildren): JSX.Element {
  const { currentAppState } = useAppState();
  const [lapData, setLapData] = useState<IFormattedLapData[]>([]);

  const onLapData = useCallback((lapPacket: ILapData) => {
    const formattedData = formatLapData(lapPacket);
    setLapData((prev) => [...prev, formattedData]);
  }, []);

  const fetchLapData = useCallback(async () => {
    try {
      const response = await axios.get(`${prodURL}/laps`);
      return response.data.data; // Assuming the API returns an array of lap data
    } catch (error) {
      return { error: "Error fetching lap data" };
    }
  }, []);

  useEffect(() => {
    fetchLapData()
      .then((response) => {
        if (!Array.isArray(response)) {
          throw new Error("Invalid API response format");
        }
        const formattedData = response.map(formatLapData);
        setLapData(formattedData);
      })
      .catch((error) => {
        throw new Error(error);
      });
  }, []);

  useEffect(() => {
    if (
      currentAppState.connectionType === CONNECTIONTYPES.NETWORK &&
      !currentAppState.playbackSwitch
    ) {
      socketIO.on("lapData", onLapData);
      return () => {
        socketIO.off("lapData", onLapData);
      };
    }
  }, [currentAppState.connectionType, currentAppState.playbackSwitch]);

  return (
    <lapDataContext.Provider value={{ lapData }}>
      {children}
    </lapDataContext.Provider>
  );
}

export function useLapData(): ILapDataContextReturn {
  return useContext(lapDataContext);
}
