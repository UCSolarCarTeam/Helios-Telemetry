//import Chart from "chart.js/auto";
import { ArcElement, Chart } from "chart.js";
import Image from "next/image";
import React, { useRef, useState } from "react";

import { tabs } from "@/objects/TabRoutes";
import { ThemeProvider } from "@emotion/react";
import { Tab, Tabs, createTheme } from "@mui/material";

import DonutChart from "./DonutChart";
import DonutChartRect from "./DonutChartRect";

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
//to do: move grey shapes to molecules tab: called analysis molecule, make shapes responsive, make text responsive too: dont use pixels, use this: h-20 w-20
interface ShapeProps {
  infoNumber?: number;
  rectangleHeight?: string;
  rectangleWidth?: string;
  squareWidth?: string;
}

const GreyShapes: React.FC<ShapeProps> = ({
  infoNumber = 78,
  rectangleHeight = "107px",
  rectangleWidth = "285px",
}) => {
  return (
    <div className="flex gap-4">
      {/* First square */}
      <div className="flex flex-col items-center justify-center rounded-2xl bg-[#BFBFBF] px-4 sm:w-[50%] md:w-[40%] lg:w-[30%]">
        <p className="decoration-skip-ink-none text-center text-[16px] font-normal leading-[21.97px] sm:text-[18px] md:text-[20px]">
          Optimal Driving speed at&nbsp;
          <span className="text-center text-[16px] font-normal leading-[39.06px] text-[#9C0534] sm:text-[18px] md:text-[20px]">
            {38}%
          </span>
        </p>
        <p className="m-2 text-center text-[32px] font-normal leading-[39.06px] text-[#9C0534]">
          50 km/h
        </p>

        {/* Container for numbers and line */}
        {/* Horizontal line */}

        <div className="h-[13px] w-full rounded-full bg-[#3A3A3A]">
          <div className="flex h-[13px] w-1/2 rounded-full bg-[#3A3A3A]">
            <div className="ml-auto flex h-[13px] w-1/3 items-stretch bg-[#009F10] md:items-center"></div>
            <div className="h-[18px] w-[4px] bg-[#3A3A3A]"></div>
          </div>
        </div>

        <div
          className="flex w-full items-center justify-between"
          style={{ gap: "0px", opacity: 1 }} // Adjust opacity if needed
        >
          {/* Left number */}
          <span className="text-sm text-[#9C0534] sm:text-base md:text-lg">
            46
          </span>

          {/* Horizontal line */}
          <div className="h-[13px] bg-[#BFBFBF]"></div>

          {/* Right number */}
          <span className="text-sm text-[#9C0534] sm:text-base md:text-lg">
            55
          </span>
        </div>
      </div>

      {/* Second square */}
      <div className="flex flex-col items-center justify-center rounded-2xl bg-[#BFBFBF] px-4 sm:w-[50%] md:w-[40%] lg:w-[30%]">
        <p className="decoration-skip-ink-none text-center text-[16px] font-normal leading-[21.97px] sm:text-[18px] md:text-[20px]">
          Motor Efficiency at&nbsp;
          <span className="text-center text-[16px] font-normal leading-[39.06px] text-[#9C0534] sm:text-[18px] md:text-[20px]">
            {infoNumber}%
          </span>
        </p>

        {/* Container for the doughnut chart */}
        <div
          className="flex w-[245px] items-center justify-center"
          style={{ opacity: 1 }} // Adjust opacity if needed
        >
          {/* update the donut chart based on the number */}
          <div className="h-10px">
            <DonutChart
              chartColour="#65558F"
              chartHeight={100}
              chartWidth={100}
              fontSize="32px"
              percentage={infoNumber}
              thickness="78%"
            />
          </div>

          <div></div>
        </div>
      </div>

      {/* Container to stack rectangles vertically */}
      <div className="flex flex-col items-center gap-4">
        {/* Rectangle 1 */}
        <div
          className="rounded-2xl bg-[#BFBFBF]"
          style={{ height: rectangleHeight, width: rectangleWidth }}
        >
          <p className="mt-2 text-center text-[14px] font-normal leading-[22px] sm:text-[16px] md:text-[18px]">
            Driver Performance Score
          </p>
          {/* Container for the doughnut chart */}
          <div
            className="mt-[-8px] flex w-[300px] items-center justify-center"
            style={{ opacity: 1 }} // Adjust opacity if needed
          >
            {/* update the donut chart based on the number */}
            <div className="h-10px">
              <DonutChartRect
                chartHeight={80}
                chartWidth={80}
                fontSize="18px"
                percentage={83}
                thickness="70%"
              />
            </div>

            <div></div>
          </div>

          <div className="flex justify-center">
            <div
              className="mt-[-4px] flex w-[50px] items-center justify-between"
              style={{ gap: "0px", opacity: 1 }}
            >
              {/* Left number */}
              <span className="text-left text-sm text-[#9C0534]">28</span>

              {/* Horizontal line */}
              <div className="h-[13px] flex-1 bg-[#BFBFBF]"></div>

              {/* Right number */}
              <span className="text-right text-sm text-[#369A34]">97</span>
            </div>
          </div>
        </div>

        {/* Rectangle 2 */}
        <div
          className="flex flex-col items-center rounded-2xl bg-[#BFBFBF] p-4"
          style={{ height: "133px", width: rectangleWidth }}
        >
          {/* Title */}
          <p className="mt-[-8px] text-center text-[14px] font-normal leading-[22px] sm:text-[16px] md:text-[18px]">
            End of Day Predictors
          </p>

          {/* Circles container */}
          <div className="mt-0 flex items-center justify-center gap-8">
            {/* First circle with line below */}
            <div className="ml-4 mt-[-8px] flex w-[100px] items-center justify-center">
              {/* Adjust ml-4 as needed */}
              {/* update the donut chart based on the number */}
              <div>
                <div className="h-10px">
                  <DonutChartRect
                    chartHeight={65}
                    chartWidth={65}
                    fontSize="18px"
                    percentage={48}
                    thickness="70%"
                  />
                </div>
                <div>
                  {/* Horizontal line with numbers */}
                  <div className="flex w-[80px] items-center justify-between">
                    <span className="text-left text-xs text-[#9C0534]">
                      135
                    </span>
                    <div className="mx-1 h-[2px] flex-1 bg-[#BFBFBF]"></div>
                    <span className="text-right text-xs text-[#369A34]">
                      269
                    </span>
                  </div>
                  {/* Text below the circle */}
                  <p className="text-center text-[10px] leading-[12px]">
                    Laps Left on Battery [km] (FSGP)
                  </p>
                </div>
              </div>
            </div>
            {/* Second circle with line below */}
            <div className="mt-[-8px] flex w-[80px] items-center justify-center">
              {/* update the donut chart based on the number */}
              <div>
                <div className="h-10px">
                  <DonutChartRect
                    chartHeight={65}
                    chartWidth={65}
                    fontSize="18px"
                    percentage={89}
                    thickness="70%"
                  />
                </div>
                <div>
                  {/* Horizontal line with numbers */}
                  <div className="flex w-[80px] items-center justify-between">
                    <span className="text-left text-xs text-[#9C0534]">57</span>
                    <div className="mx-1 h-[2px] flex-1 bg-[#BFBFBF]"></div>
                    <span className="text-right text-xs text-[#369A34]">
                      104
                    </span>
                  </div>
                  {/* Text below the circle */}
                  <p className="text-center text-[10px] leading-[12px]">
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
              squareWidth="270px"
            />
          </TabContent>
        </div>
      </div>
    </div>
  );
}

export default AnalysisTab;

/*
// ticket 207 on jira - to find more info about this
//notes: on figma, go to file called Race Tab - Analysis Mockup 2 - Stats
// I have to create the 2 squares and rectangles
// make an analysis tab to view the shapes
//correction: need to use tailwind css
*/

{
  /* Container for circle */
}
{
  /*
        <div
          className="flex w-[245px] items-center justify-center"
          style={{ opacity: 1 }} // Adjust opacity if needed
        >
          {/* Outer circle with semicircle /}
          <div className="relative flex items-center justify-center">
            <div className="absolute -top-1 h-16 w-32 rounded-t-full bg-blue-500"></div>
            <div className="md:h-27 md:w-27 m-2 flex h-20 w-20 items-center justify-center rounded-full bg-[#65558F] sm:h-24 sm:w-24"></div>

            {/* Inner circle /}
            <div className="md:h-23 md:w-23 absolute flex h-16 w-16 items-center justify-center rounded-full bg-[#BFBFBF] sm:h-20 sm:w-20">
              <span className="text-center text-[22px] font-normal leading-[39.06px] text-[#4D6BDB] sm:text-[27px] md:text-[37px]">
                78
              </span>
            </div>
          </div>
        </div> */
}
