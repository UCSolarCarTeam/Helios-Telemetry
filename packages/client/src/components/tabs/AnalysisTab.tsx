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
  squareWidth = "250px",
}) => {
  return (
    <div className="flex gap-4">
      {/* First square */}
      <div className="flex flex-col items-center justify-center rounded-2xl bg-[#BFBFBF] px-4 sm:w-[50%] md:w-[40%] lg:w-[30%]">
        <p className="decoration-skip-ink-none text-center text-[16px] font-normal leading-[21.97px] sm:text-[18px] md:text-[20px]">
          Optimal Driving speed at&nbsp;
          <span className="text-center text-[16px] font-normal leading-[39.06px] text-[#9C0534] sm:text-[18px] md:text-[20px]">
            {infoNumber}%
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
            78%
          </span>
        </p>

        {/* Container for circle */}
        <div
          className="flex w-[245px] items-center justify-center"
          style={{ opacity: 1 }} // Adjust opacity if needed
        >
          {/* Outer circle */}
          <div className="md:h-27 md:w-27 m-2 flex h-20 w-20 items-center justify-center rounded-full bg-[#65558F] sm:h-24 sm:w-24">
            {/* Inner circle */}
            <div className="md:h-23 md:w-23 flex h-16 w-16 items-center justify-center rounded-full bg-[#BFBFBF] sm:h-20 sm:w-20">
              <span className="text-center text-[22px] font-normal leading-[39.06px] text-[#4D6BDB] sm:text-[27px] md:text-[37px]">
                78
              </span>
            </div>
          </div>
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
          <div className="mt-1 flex justify-center">
            {/* circle Container */}
            <div
              className="flex w-[245px] items-center justify-center"
              style={{ opacity: 1 }} // Adjust opacity if needed
            >
              {/* Outer circle */}
              <div className="md:h-15 md:w-15 flex h-12 w-12 items-center justify-center rounded-full bg-[#CF4242] sm:h-14 sm:w-14 sm:text-[16px] md:text-[18px]">
                {/* Inner circle */}
                <div className="md:h-13 md:w-13 flex h-9 w-9 items-center justify-center rounded-full bg-[#BFBFBF] sm:h-11 sm:w-11">
                  <span className="text-center text-[18px] font-normal leading-[39.06px] text-[#4D6BDB] sm:text-[22px] md:text-[24px]">
                    83
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-center">
            <div
              className="flex w-[50px] items-center justify-between"
              style={{ gap: "0px", opacity: 1 }}
            >
              {/* Left number */}
              <span className="text-left text-sm">28</span>

              {/* Horizontal line */}
              <div className="h-[13px] flex-1 bg-[#BFBFBF]"></div>

              {/* Right number */}
              <span className="text-right text-sm">97</span>
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
          <div className="mt-2 flex items-center justify-center gap-8">
            {/* First circle with line below */}
            <div className="flex flex-col items-center">
              {/* Outer circle */}
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#CF4242]">
                {/*inner circle */}
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#BFBFBF]">
                  <span className="text-center text-[16px] font-normal leading-[25px] text-[#4D6BDB]">
                    148
                  </span>
                </div>
              </div>

              {/* Horizontal line with numbers */}
              <div className="flex w-[80px] items-center justify-between">
                <span className="text-left text-xs text-[#9C0534]">135</span>
                <div className="mx-1 h-[2px] flex-1 bg-[#BFBFBF]"></div>
                <span className="text-right text-xs text-[#369A34]">269</span>
              </div>

              {/* Text below the circle */}
              <p className="text-center text-[10px] leading-[12px]">
                Laps Left on Battery [km] (FSGP)
              </p>
            </div>

            {/* Second circle with line below */}
            <div className="flex flex-col items-center">
              {/* Outer circle */}
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#CF4242]">
                {/*inner circle */}
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#BFBFBF]">
                  <span className="text-center text-[16px] font-normal leading-[25px] text-[#4D6BDB]">
                    89
                  </span>
                </div>
              </div>

              {/* Horizontal line with numbers */}
              <div className="flex w-[80px] items-center justify-between">
                <span className="text-left text-xs text-[#9C0534]">135</span>
                <div className="mx-1 h-[2px] flex-1 bg-[#BFBFBF]"></div>
                <span className="text-right text-xs text-[#369A34]">269</span>
              </div>

              {/* Text below the circle */}
              <p className="text-center text-[10px] leading-[12px]">
                Laps Left on Battery [km] (FSGP)
              </p>
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
              infoNumber={100}
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
