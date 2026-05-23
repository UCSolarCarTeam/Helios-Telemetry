import { OpenInNew } from "@mui/icons-material";
import { useTheme } from "next-themes";
import Image from "next/image";
import React, { useState } from "react";
import { twMerge } from "tailwind-merge";

import { tabs } from "@/objects/TabRoutes";
import { helios, lightGray, mediumGray } from "@/styles/colors";
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

const color = createTheme({
  palette: {
    primary: {
      main: helios, // selected tab color
    },

    text: {
      primary: mediumGray, // non-selected tab color
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

const grafanaLinks = [
  {
    label: "Grafana Live",
    url: process.env.NEXT_PUBLIC_GRAFANA_LIVE_OPEN_URL,
  },
  {
    label: "Grafana History",
    url: process.env.NEXT_PUBLIC_GRAFANA_HISTORY_OPEN_URL,
  },
].filter((link): link is { url: string; label: string } =>
  Boolean(link.url?.trim()),
);

function GrafanaLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      className="flex items-center gap-1 text-xs font-medium text-[#F05A28] hover:underline"
      href={href}
      rel="noopener noreferrer"
      target="_blank"
    >
      <Image
        alt="Grafana"
        height={14}
        src="/assets/grafana_icon.svg"
        unoptimized
        width={14}
      />
      {label}
      <OpenInNew sx={{ fontSize: 12 }} />
    </a>
  );
}

function AnalysisTab() {
  const [value, setValue] = useState<number>(0);
  const { resolvedTheme } = useTheme();

  return (
    <div className="flex flex-col gap-y-4 px-4">
      {/* NAVBAR */}
      <div
        className="flex w-full flex-col border-b-[1px] border-black sm:flex-row sm:items-center sm:justify-between"
        id="navbar"
      >
        {/* <div className="flex items-center justify-center gap-x-2">
          <Image
            alt="pfp"
            className="rounded-full border-2 border-helios object-cover p-2"
            height={50}
            src="/assets/HeliosSideview.png"
            width={50}
          />
          <span className="text-sm">Insert Name</span>
        </div> */}

        <ThemeProvider theme={color}>
          <Tabs
            TabIndicatorProps={{
              style: {
                backgroundColor: color.palette.primary.main,
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
                sx={resolvedTheme === "dark" ? { color: lightGray } : {}}
                value={tab.id}
              ></Tab>
            ))}
          </Tabs>
        </ThemeProvider>

        {grafanaLinks.length > 0 && (
          <div className="flex flex-shrink-0 items-center gap-3 pb-2 sm:pb-1">
            {grafanaLinks.map(({ label, url }) => (
              <GrafanaLink href={url} key={label} label={label} />
            ))}
          </div>
        )}
      </div>

      {/* MAIN */}
      <div className="flex flex-col justify-between gap-4 md:flex-row">
        {/* <div className="flex max-w-44 flex-col gap-1 md:w-auto">
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
        </div> */}

        <div className="w-full flex-1 justify-center gap-4" id="main-content">
          <TabContent
            className="grid max-h-72 w-full flex-1 gap-4 overflow-y-auto overflow-x-hidden xl:grid-cols-2"
            index={0}
            value={value}
          >
            <MLContainer plotType="/api/getLapCorrelationMatrix" />
            <MLContainer plotType="/api/getPacketCorrelationMatrix" />
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
