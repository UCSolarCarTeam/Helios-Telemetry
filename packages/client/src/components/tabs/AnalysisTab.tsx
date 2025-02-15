import Image from "next/image";
import React, { useState } from "react";

import { tabs } from "@/objects/TabRoutes";
import { ThemeProvider } from "@emotion/react";
import { Tab, Tabs, createTheme } from "@mui/material";

import DonutChart from "../molecules/AnalysisMolecules/DonutChart";
import DonutChartRect from "../molecules/AnalysisMolecules/DonutChartRect";

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
interface ShapeProps {
  infoNumber?: number;
  rectangleHeight?: string;
  rectangleWidth?: string;
}

const GreyShapes: React.FC<ShapeProps> = ({
  infoNumber = 78,
  rectangleHeight = "107px",
  rectangleWidth = "285px",
}) => {
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

          <div
            className="flex w-full items-center justify-between"
            style={{ gap: "0px", opacity: 1 }}
          >
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
          <div
            className="flex w-[15rem] items-center justify-center"
            style={{ opacity: 1 }}
          >
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
      <div className="flex flex-col items-center gap-4 sm:flex-row md-[1300px]:flex-row xl:flex-row">
        {/* Rectangle 1 */}
        <div
          className="rounded-2xl bg-[#BFBFBF]"
          style={{ height: rectangleHeight, width: rectangleWidth }}
        >
          <p className="mt-2 text-center text-sm font-normal leading-[1.3rem] sm:text-base md:text-lg">
            Driver Performance Score
          </p>
          {/* Container for the doughnut chart */}
          <div
            className="mt-[-0.5rem] flex w-[18.5rem] items-center justify-center"
            style={{ opacity: 1 }} // Adjust opacity if needed
          >
            {/* update the donut chart based on the number */}
            <div className="h-0.5rem">
              <DonutChartRect
                chartHeight={80}
                chartWidth={80}
                fontSize="1.4rem"
                percentage={83}
                thickness="70%"
              />
            </div>

            <div></div>
          </div>

          <div className="flex justify-center">
            <div
              className="mt-[-0.25rem] flex w-[3.1rem] items-center justify-between"
              style={{ gap: "0px", opacity: 1 }}
            >
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
          className="flex flex-col items-center rounded-2xl bg-[#BFBFBF] p-4"
          style={{ height: "8.7rem", width: rectangleWidth }}
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
                    thickness="70%"
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
                    thickness="70%"
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
              <Tab key={tab.id} label={tab.name.toUpperCase()} value={tab.id} />
            ))}
          </Tabs>
        </ThemeProvider>
      </div>

      {/* MAIN */}
      <div className="flex size-full flex-col justify-between gap-x-2 gap-y-6 md:flex-row">
        <div className="flex max-w-44 flex-col gap-y-1">
          {filters.map((filter) => (
            <div className="flex items-center" key={filter}>
              <label className="flex cursor-pointer items-center gap-x-2">
                <input
                  className="peer·size-4·cursor-pointer·accent-helios"
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
          className="flex flex-col justify-center gap-y-4 md:flex-row md:flex-wrap md:gap-x-4"
          id="main-content"
        >
          <TabContent index={0} value={value}></TabContent>
          <TabContent index={1} value={value}>
            {/* Display GreyShapes component here */}
            <GreyShapes
              infoNumber={78}
              rectangleHeight="120px"
              rectangleWidth="300px"
            />
          </TabContent>
        </div>
      </div>
    </div>
  );
}

export default AnalysisTab;
