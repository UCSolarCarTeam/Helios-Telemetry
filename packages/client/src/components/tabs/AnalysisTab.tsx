import clsx from "clsx";
import Image from "next/image";
import React, { useState } from "react";
import { twMerge } from "tailwind-merge";

import useWindowDimensions from "@/hooks/PIS/useWindowDimensions";
import { tabs } from "@/objects/TabRoutes";
import { ThemeProvider } from "@emotion/react";
import { Tab, Tabs, createTheme } from "@mui/material";

import MLContainer from "../containers/MLContainer";
import StatsContainer from "../molecules/AnalysisMolecules/StatsContainer";

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
] as const;

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
    <div className={twMerge(className)} hidden={value !== index}>
      {value === index && children}
    </div>
  );
}

function AnalysisTab() {
  const [value, setValue] = useState<number>(0);
  const { width } = useWindowDimensions();

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
      <div className="flex flex-col justify-between gap-4 md:flex-row">
        <div className="flex max-w-44 flex-col gap-1 md:w-auto">
          {filters.map((filter) => (
            <div className="flex items-center" key={filter}>
              <label className="flex cursor-pointer items-center gap-x-2">
                <input
                  className="peer size-4 cursor-pointer accent-helios"
                  id={filter}
                  name={filter}
                  type="checkbox"
                />
                <span className="select-none text-sm peer-hover:font-bold">
                  {filter}
                </span>
              </label>
            </div>
          ))}
        </div>

        <div
          className="flex w-full flex-1 flex-col justify-center gap-4 md:flex-row md:gap-x-4 lg:w-auto lg:flex-nowrap"
          id="main-content"
        >
          <TabContent className="my-auto w-full" index={0} value={value}>
            <div
              className={twMerge(
                clsx(
                  "grid max-h-72 w-full flex-1 grid-flow-row items-center gap-4",
                  {
                    "grid-cols-1 overflow-y-auto": width < 1200,
                    "grid-cols-2": width >= 1200,
                  },
                ),
              )}
            >
              <div className="flex max-h-72 w-full max-w-2xl items-center justify-center gap-4 rounded-lg bg-white p-2 text-3xl font-bold dark:bg-[#BAB8B8] dark:text-black">
                <MLContainer plotType="/api/getLapCorrelationMatrix" />
              </div>
              <div className="flex max-h-72 w-full max-w-2xl items-center justify-center gap-4 rounded-lg bg-white p-2 text-3xl font-bold dark:bg-[#BAB8B8] dark:text-black">
                <MLContainer plotType="/api/getPacketCorrelationMatrix" />
              </div>
            </div>
          </TabContent>
          <TabContent index={1} value={value}>
            <StatsContainer />
          </TabContent>
        </div>
      </div>
    </div>
  );
}

export default AnalysisTab;
