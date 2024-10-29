import BatteryTab from "@/components/tabs/BatteryTab";
import FaultsTab from "@/components/tabs/FaultsTab";
import MotorTab from "@/components/tabs/MotorTab";
import MpptTab from "@/components/tabs/MpptTab";
import PlaybackTab from "@/components/tabs/PlaybackTab";
import RaceTab from "@/components/tabs/RaceTab";

export interface SolarCarRoutes {
  path: string;
  id: string;
  element?: React.ReactNode;
  Component?: React.ComponentType;
  value: string;
}

export const routes: SolarCarRoutes[] = [
  { element: <BatteryTab />, id: "Battery", path: "/battery", value: "1" },
  { element: <FaultsTab />, id: "Faults", path: "/faults", value: "2" },
  { element: <MotorTab />, id: "Motor", path: "/motor", value: "3" },
  { element: <MpptTab />, id: "MPPT", path: "/mppt", value: "4" },
  { element: <PlaybackTab />, id: "Playback", path: "/playback", value: "5" },
  { element: <RaceTab />, id: "Race", path: "/race", value: "6" },
];
