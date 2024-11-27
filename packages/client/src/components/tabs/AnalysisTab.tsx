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
      <div
        className="flex flex-col items-center justify-center rounded-2xl bg-[#BFBFBF]"
        style={{ height: squareWidth, width: squareWidth }}
      >
        <p className="decoration-skip-ink-none text-center text-[18px] font-normal leading-[21.97px] text-white">
          Optimal Driving speed at&nbsp;
          <span className="text-center text-[18px] font-normal leading-[39.06px] text-[#9C0534]">
            {infoNumber}%
          </span>
        </p>
        <p className="m-2 text-center text-[32px] font-normal leading-[39.06px] text-[#9C0534]">
          50 km/h
        </p>

        {/* Container for numbers and line */}
        {/* Horizontal line */}
        <div className="h-[13px] w-[150px] rounded-full bg-black"></div>

        <div
          className="flex w-[145px] items-center justify-between"
          style={{ gap: "0px", opacity: 1 }} // Adjust opacity if needed
        >
          {/* Left number */}
          <span className="text-sm">46</span>

          {/* Horizontal line */}
          <div className="h-[13px] flex-grow bg-[#BFBFBF]"></div>

          {/* Right number */}
          <span className="text-sm">55</span>
        </div>
      </div>

      {/* Second square */}
      <div
        className="flex flex-col items-center justify-center rounded-2xl bg-[#BFBFBF]"
        style={{ height: squareWidth, width: squareWidth }}
      >
        <p className="decoration-skip-ink-none text-center text-[18px] font-normal leading-[21.97px] text-white">
          Motor Efficiency at&nbsp;
          <span className="text-center text-[18px] font-normal leading-[39.06px] text-[#9C0534]">
            78%
          </span>
        </p>

        {/* Container for circle */}
        <div
          className="flex w-[245px] items-center justify-center"
          style={{ opacity: 1 }} // Adjust opacity if needed
        >
          {/* Outer circle */}
          <div className="m-2 flex h-24 w-24 items-center justify-center rounded-full bg-[#65558F]">
            {/* Inner circle */}
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#BFBFBF]">
              <span className="text-center text-[35px] font-normal leading-[39.06px] text-[#4D6BDB]">
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
          <p className="mt-2 text-center text-lg font-normal leading-[22px] text-white">
            Driver Performance Score
          </p>
          <div className="mt-2 flex justify-center">
            {/* Container circle */}
            <div
              className="flex w-[245px] items-center justify-center"
              style={{ opacity: 1 }} // Adjust opacity if needed
            >
              {/* Outer circle */}
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#CF4242]">
                {/* Inner circle */}
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#BFBFBF]">
                  <span className="text-center text-[22px] font-normal leading-[39.06px] text-[#4D6BDB]">
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
          className="rounded-2xl bg-[#BFBFBF]"
          style={{ height: rectangleHeight, width: rectangleWidth }}
        >
          <div
            className="rounded-2xl bg-[#BFBFBF]"
            style={{ height: rectangleHeight, width: rectangleWidth }}
          >
            <p className="mt-2 text-center text-lg font-normal leading-[22px] text-white">
              Driver Performance Score
            </p>

            {/* Container for first circle and line */}
            <div className="mt-2 flex justify-center space-x-4">
              {/* First circle with line below */}
              <div className="flex flex-col items-center justify-center">
                {/* Outer circle */}
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#CF4242]">
                  {/* Inner circle */}
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#BFBFBF]">
                    <span className="text-center text-[20px] font-normal leading-[39.06px] text-[#4D6BDB]">
                      148
                    </span>
                  </div>
                </div>

                {/* Horizontal line with numbers under the first circle */}
                <div
                  className="flex w-[50px] items-center justify-between"
                  style={{ gap: "0px", opacity: 1 }}
                >
                  <span className="text-left text-sm text-[#9C0534]">135</span>
                  <div className="h-[13px] flex-1 bg-[#BFBFBF]"></div>
                  <span className="text-right text-sm text-[#369A34]">269</span>
                </div>
              </div>

              {/* Second circle with line below */}
              <div className="flex flex-col items-center justify-center">
                {/* Outer circle */}
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#CF4242]">
                  {/* Inner circle */}
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#BFBFBF]">
                    <span className="text-center text-[22px] font-normal leading-[39.06px] text-[#4D6BDB]">
                      89
                    </span>
                  </div>
                </div>

                {/* Horizontal line with numbers under the second circle */}
                <div
                  className="flex w-[50px] items-center justify-between"
                  style={{ gap: "0px", opacity: 1 }}
                >
                  <span className="text-left text-sm text-[#9C0534]">57</span>
                  <div className="h-[13px] flex-1 bg-[#BFBFBF]"></div>
                  <span className="text-right text-sm text-[#369A34]">104</span>
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
