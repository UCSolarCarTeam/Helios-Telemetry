import AnalysisTab from "@/components/tabs/AnalysisTab";
import BatteryTab from "@/components/tabs/BatteryTab";
import MbmsTab from "@/components/tabs/MbmsTab";
import MotorTab from "@/components/tabs/MotorTab";
import MpptTab from "@/components/tabs/MpptTab";
import RaceTab from "@/components/tabs/RaceTab";

export interface SolarCarRoutes {
  path: string;
  id: string;
  element?: React.ReactNode;
  Component?: React.ComponentType;
  value: string;
}

type TabProps = {
  id: number;
  name: string;
};

export const tabs: TabProps[] = [
  {
    id: 0,
    name: "Graphs",
  },

  {
    id: 1,
    name: "Stats",
  },
];

export const routes: SolarCarRoutes[] = [
  { element: <BatteryTab />, id: "Battery", path: "/battery", value: "1" },
  { element: <MbmsTab />, id: "Mbms", path: "/mbms", value: "2" },
  { element: <MotorTab />, id: "Motor", path: "/motor", value: "3" },
  { element: <MpptTab />, id: "MPPT", path: "/mppt", value: "4" },
  { element: <RaceTab />, id: "Race", path: "/race", value: "5" },
  { element: <AnalysisTab />, id: "Analysis", path: "/analysis", value: "6" },
];
