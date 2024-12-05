import Image from "next/image";
import HeliosSideView from "public/assets/HeliosSideview.png";

import { tabs } from "@/objects/TabRoutes";
import { ThemeProvider } from "@emotion/react";
import { Tab, Tabs, createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#B94A6C", // selected tab color
    },

    text: {
      primary: "#3A3A3A", // non-selected tab color
    },
  },
});
const vehicleDrivers = [
  "Justin Pham",
  "Brian Nguyen",
  "Kris R",
  "Ideen Banijamali",
  "Burton Jong",
];
export default function DriverSelection({
  setValue,
  value,
}: {
  value: number;
  setValue: (newValue: number) => void;
}) {
  return (
    <div className="flex w-full items-center justify-between border-b border-black">
      <button className="flex items-center justify-center gap-2">
        <Image
          alt="pfp"
          className="rounded-full border-2 border-helios object-cover p-2 shadow"
          height={50}
          src={HeliosSideView}
          width={50}
        />
        <select className="w-40 rounded border-none bg-slate-500/30 p-1 text-sm text-black shadow outline-none">
          {vehicleDrivers.map((driver, index) => (
            <option key={index}>{driver}</option>
          ))}
        </select>
      </button>

      <ThemeProvider theme={theme}>
        <Tabs
          TabIndicatorProps={{
            style: {
              backgroundColor: theme.palette.primary.main,
            },
          }}
          onChange={(e, newValue: number) => setValue(newValue)}
          textColor="primary"
          value={value}
        >
          {tabs.map((tab) => (
            <Tab key={tab.id} label={tab.name.toUpperCase()} value={tab.id} />
          ))}
        </Tabs>
      </ThemeProvider>
    </div>
  );
}
