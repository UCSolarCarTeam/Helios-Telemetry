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
import { IFormattedLapData, ILapData } from "@shared/helios-types";

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

  const onLapData = useCallback((lapData: ILapData) => {
    const formattedData: IFormattedLapData = {
      data: {
        ampHours: parseFloat(lapData.data.ampHours.toFixed(2)),
        averagePackCurrent: parseFloat(
          lapData.data.averagePackCurrent.toFixed(2),
        ),
        averageSpeed: parseFloat(lapData.data.averageSpeed.toFixed(2)),
        batterySecondsRemaining: parseFloat(
          lapData.data.batterySecondsRemaining.toFixed(2),
        ),
        distance: parseFloat(lapData.data.distance.toFixed(2)),
        lapTime: parseFloat(lapData.data.lapTime.toFixed(2)),
        netPowerOut: parseFloat(lapData.data.netPowerOut.toFixed(2)),
        timeStamp: Number(
          new Date(lapData.data.timeStamp).toLocaleDateString("en-US"),
        ),
        totalPowerIn: parseFloat(lapData.data.totalPowerIn.toFixed(2)),
        totalPowerOut: parseFloat(lapData.data.totalPowerOut.toFixed(2)),
      },
      rfid: lapData.rfid,
    };

    setLapData((prev) => [...prev, formattedData]);
  }, []);

  const fetchLapData = useCallback(async () => {
    try {
      const response = await axios.get(
        `https://aedes.calgarysolarcar.ca:3001/laps`,
      );
      return response.data; // Assuming the API returns an array of lap data
    } catch (error) {
      return { error: "Error fetching lap data" };
    }
  }, []);

  useEffect(() => {
    fetchLapData()
      .then((response) => {
        const formattedData = response.data.map(
          (lapPacket: { lapData: ILapData }) => ({
            data: {
              ampHours: parseFloat(lapPacket.lapData.data.ampHours.toFixed(2)),
              averagePackCurrent: parseFloat(
                lapPacket.lapData.data.averagePackCurrent.toFixed(2),
              ),
              averageSpeed: parseFloat(
                lapPacket.lapData.data.averageSpeed.toFixed(2),
              ),
              batterySecondsRemaining: parseFloat(
                lapPacket.lapData.data.batterySecondsRemaining.toFixed(2),
              ),
              distance: parseFloat(lapPacket.lapData.data.distance.toFixed(2)),
              lapTime: parseFloat(lapPacket.lapData.data.lapTime.toFixed(2)),
              netPowerOut: parseFloat(
                lapPacket.lapData.data.netPowerOut.toFixed(2),
              ),
              timeStamp: new Date(
                lapPacket.lapData.data.timeStamp,
              ).toLocaleDateString("en-US"),
              totalPowerIn: parseFloat(
                lapPacket.lapData.data.totalPowerIn.toFixed(2),
              ),
              totalPowerOut: parseFloat(
                lapPacket.lapData.data.totalPowerOut.toFixed(2),
              ),
            },
            rfid: lapPacket.lapData.rfid,
          }),
        );

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
