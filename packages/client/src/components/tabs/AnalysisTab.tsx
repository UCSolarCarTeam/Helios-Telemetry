import Image from "next/image";
import React, { useState } from "react";

import { tabs } from "@/objects/TabRoutes";
import { ThemeProvider } from "@emotion/react";
import { Tab, Tabs, createTheme } from "@mui/material";

type TabContentProps = React.PropsWithChildren<{
  index: number;
  value: number;
}>;

const filters: string[] = [
  "Motor Temperature",
  "Battery Consumption",
  "Average Speed",
  "Brake Time",
  "Power Out",
  "Battery Voltage",
  "Battery Current",
];

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

export function TabContent({ children, index, value }: TabContentProps) {
  return (
    <div hidden={value !== index} id={`tabpanel-${index}`} role="tabpanel">
      {value === index && children}
    </div>
  );
}

function AnalysisTab() {
  const [value, setValue] = useState<number>(0);

  return (
    <div className="flex flex-col gap-y-4 px-4">
      {/* NAVBAR */}
      <div
        className="flex w-full items-center justify-between gap-y-2 border-b-[1px] border-black"
        id="navbar"
      >
        <div className="flex items-center justify-center gap-x-2">
          <Image
            alt="pfp"
            className="rounded-full border-2 border-helios object-cover p-2"
            height={50}
            src="/assets/HeliosSideview.png"
            width={50}
          />
          <span className="text-sm">Insert Name</span>
        </div>

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
              <Tab
                key={tab.id}
                label={tab.name.toUpperCase()}
                value={tab.id}
              ></Tab>
            ))}
          </Tabs>
        </ThemeProvider>
      </div>

      {/* MAIN */}
      <div className="flex size-full flex-col justify-between gap-x-2 gap-y-6 md:flex-row">
        <div className="flex max-w-44 flex-col gap-y-1">
          {filters.map((filter) => (
            <div className="flex items-center gap-x-2" key={filter}>
              <label className="flex cursor-pointer items-center gap-x-2">
                <input
                  className="size-4 cursor-pointer accent-helios"
                  id={filter}
                  name={filter}
                  type="checkbox"
                />
                <span>{filter}</span>
              </label>
            </div>
          ))}
        </div>

        <div
          className="flex flex-col justify-center gap-y-4 md:flex-row md:flex-wrap md:gap-x-4"
          id="main-content"
        >
          <TabContent index={0} value={value}>
            Graphs
          </TabContent>
          <TabContent index={1} value={value}>
            Stats
          </TabContent>
        </div>
      </div>
    </div>
  );
}

export default AnalysisTab;
