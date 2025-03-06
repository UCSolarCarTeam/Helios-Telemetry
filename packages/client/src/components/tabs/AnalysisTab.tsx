import clsx from "clsx";
import Image from "next/image";
import React, { useState } from "react";
import { twMerge } from "tailwind-merge";

import useWindowDimensions from "@/hooks/PIS/useWindowDimensions";
import { tabs } from "@/objects/TabRoutes";
import { ThemeProvider } from "@emotion/react";
import { Tab, Tabs, createTheme } from "@mui/material";

import MLContainer from "../containers/MLContainer";
import DonutChart from "../molecules/AnalysisMolecules/DonutChart";
import DonutChartRect from "../molecules/AnalysisMolecules/DonutChartRect";

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
interface ShapeProps {
  infoNumber?: number;
}

const StatsContainer: React.FC<ShapeProps> = ({ infoNumber = 78 }) => {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4">
      {/* Container to wrap the squares */}
      <div className="flex flex-col items-center gap-4 sm:flex-row">
        {/* First square */}
        <div className="flex h-[17rem] w-[18.7rem] flex-col items-center justify-center rounded-2xl bg-[#BFBFBF] px-4">
          <p className="text-center text-base font-normal sm:text-lg lg:text-xl">
            Optimal Driving Speed At&nbsp;
            <span className="text-center text-base font-normal text-[#9C0534] sm:text-lg lg:text-xl">
              {38}%
            </span>
          </p>
          <p className="m-2 text-center text-4xl font-normal text-[#9C0534] md:text-[2.5rem] lg:text-4xl">
            50 km/h
          </p>

          {/* Container for numbers and line */}
          {/* horizontal line */}
          <div className="h-3.5 w-full rounded-full bg-[#3A3A3A]">
            <div className="flex h-3.5 w-1/2 rounded-full bg-[#3A3A3A]">
              <div className="ml-auto flex h-3.5 w-1/3 items-stretch bg-[#009F10] md:items-center"></div>
              <div className="h-5 w-1 bg-[#3A3A3A]"></div>
            </div>
          </div>

          <div className="opacity-1 flex w-full items-center justify-between gap-0">
            {/* Left number */}
            <span className="text-sm text-[#9C0534] sm:text-base md:text-lg">
              46
            </span>

            {/* Horizontal line */}
            <div className="h-3 bg-[#BFBFBF]"></div>

            {/* Right number */}
            <span className="text-sm text-[#9C0534] sm:text-base md:text-lg">
              55
            </span>
          </div>
        </div>

        {/* Second square */}
        <div className="flex h-[17rem] w-[18.7rem] flex-col items-center justify-center rounded-2xl bg-[#BFBFBF] px-4">
          <p className="decoration-skip-ink-none text-center text-lg font-normal sm:text-lg md:text-xl">
            Motor Efficiency at&nbsp;
            <span className="text-center text-lg font-normal leading-[2.4rem] text-[#9C0534] sm:text-lg md:text-xl">
              {infoNumber}%
            </span>
          </p>

          {/* Container for the doughnut chart */}
          <div className="opacity-1 flex w-[15rem] items-center justify-center">
            {/* update the donut chart based on the number */}
            <div className="h-0.6rem">
              <DonutChart
                chartColour="#65558F"
                fontSize="2rem"
                percentage={infoNumber}
                thickness="78%"
              />
            </div>

            <div></div>
          </div>
        </div>
      </div>

      {/* Container to stack rectangles vertically */}
      {/* eslint-disable-next-line prettier/prettier */}
      <div className="flex flex-col items-center gap-4 custom-sm:flex-row custom-lg:flex-col">
        {/* added custom pixel widths to solve the rectangle alignment error*/}
        {/* Rectangle 1 */}
        <div className="h-[6.68 rem] w-[17.81rem] rounded-2xl bg-[#BFBFBF]">
          <p className="mt-2 text-center text-sm font-normal leading-[1.3rem] sm:text-base md:text-lg">
            Driver Performance Score
          </p>
          {/* Container for the doughnut chart */}
          <div className="ml-[-0.5rem] mt-[-0.75rem] flex w-[18.5rem] items-center justify-center opacity-100">
            {/* update the donut chart based on the number */}

            <DonutChartRect
              chartHeight={80}
              chartWidth={80}
              fontSize="1.4rem"
              percentage={83}
              thickness="78%"
            />

            <div></div>
          </div>

          <div className="flex justify-center">
            <div className="opacity-1 mt-[-0.25rem] flex w-[4.1rem] items-center justify-between gap-0">
              {/* Left number */}
              <span className="text-left text-sm text-[#9C0534]">28</span>

              {/* Horizontal line */}
              <div className="h-[0.8rem] flex-1 bg-[#BFBFBF]"></div>

              {/* Right number */}
              <span className="text-right text-sm text-[#369A34]">97</span>
            </div>
          </div>
        </div>

        {/* Rectangle 2 */}
        <div
          className={`flex h-[8.7rem] w-[17.8rem] flex-col items-center rounded-2xl bg-[#BFBFBF] p-4`}
        >
          {/* Title */}
          <p className="mt-[-0.5rem] text-center text-[0.875rem] font-normal leading-[1.35rem] sm:text-base md:text-lg">
            End of Day Predictors
          </p>

          {/* Circles container */}
          <div className="mt-0 flex items-center justify-center gap-8">
            {/* First circle with line below */}
            <div className="mt-[-0.5rem] flex w-[6.5rem] items-center justify-center">
              {/* update the donut chart based on the number */}
              <div>
                <div className="h-0.6 ml-2">
                  <DonutChartRect
                    chartHeight={65}
                    chartWidth={65}
                    fontSize="1.2rem"
                    percentage={48}
                    thickness="78%"
                  />
                </div>
                <div>
                  {/* Horizontal line with numbers */}
                  <div className="flex w-[5rem] items-center justify-between">
                    <span className="text-left text-xs text-[#9C0534]">
                      135
                    </span>
                    <div className="mx-1 h-[0.1rem] flex-1 bg-[#BFBFBF]"></div>
                    <span className="text-right text-xs text-[#369A34]">
                      269
                    </span>
                  </div>
                  {/* Text below the circle */}
                  <p className="text-center text-[0.6rem] leading-[0.7rem]">
                    Laps Left on Battery [km] (FSGP)
                  </p>
                </div>
              </div>
            </div>
            {/* Second circle with line below */}
            <div className="mt-[-0.5rem] flex w-[3.1rem] items-center justify-center">
              {/* update the donut chart based on the number */}
              <div>
                <div className="h-0.6rem ml-2">
                  <DonutChartRect
                    chartHeight={65}
                    chartWidth={65}
                    fontSize="1.1rem"
                    percentage={89}
                    thickness="78%"
                  />
                </div>
                <div>
                  {/* Horizontal line with numbers */}
                  <div className="flex w-[5rem] items-center justify-between">
                    <span className="text-left text-xs text-[#9C0534]">57</span>
                    <div className="mx-1 h-[0.1rem] flex-1 bg-[#BFBFBF]"></div>
                    <span className="text-right text-xs text-[#369A34]">
                      104
                    </span>
                  </div>
                  {/* Text below the circle */}
                  <p className="text-center text-[0.6rem] leading-[0.7rem]">
                    Battery Time Remaining [min]
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

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
