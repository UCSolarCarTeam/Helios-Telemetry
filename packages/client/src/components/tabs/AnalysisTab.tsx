import Image from "next/image";
import React, { useState } from "react";
import { twMerge } from "tailwind-merge";

import { tabs } from "@/objects/TabRoutes";
import { ThemeProvider } from "@emotion/react";
import { Tab, Tabs, createTheme } from "@mui/material";

import MLContainer from "../containers/MLContainer";

type TabContentProps = React.PropsWithChildren<{
  index: number;
  value: number;
  className?: string;
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

export function TabContent({
  children,
  className,
  index,
  value,
}: TabContentProps) {
  return (
    <div
      className={twMerge(`${className}`)}
      hidden={value !== index}
      id={`tabpanel-${index}`}
      role="tabpanel"
    >
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
      <div className="flex flex-col flex-wrap justify-between gap-y-6 md:flex-row md:gap-x-4">
        <div className="flex max-w-44 flex-col gap-y-1 md:w-auto">
          {filters.map((filter) => (
            <div className="flex items-center space-x-2" key={filter}>
              <input
                className="h-4 w-4 accent-[#B94A6C]"
                id={filter}
                name={filter}
                type="checkbox"
              />
              <span>{filter}</span>
            </div>
          ))}
        </div>

        <div
          className="flex w-full flex-1 flex-col justify-center gap-y-4 md:flex-row md:flex-wrap md:gap-x-4 lg:w-auto"
          id="main-content"
        >
          <TabContent className="w-full" index={0} value={value}>
            {/* Graphs */}
            <div className="flex size-full max-h-96 flex-1 items-center justify-center gap-x-4">
              <MLContainer />
              {/* Put other graphs here */}
            </div>
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
