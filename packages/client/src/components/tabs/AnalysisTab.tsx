import { useTheme } from "next-themes";
import Image from "next/image";
import React, { useMemo, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";

import { useCreateSnapshot, useSnapshots } from "@/hooks/useSnapshots";
import { tabs } from "@/objects/TabRoutes";
import { useAppState } from "@/stores/useAppState";
import { usePacketStore } from "@/stores/usePacket";
import { helios, lightGray, mediumGray } from "@/styles/colors";
import { ThemeProvider } from "@emotion/react";
import { OpenInNew } from "@mui/icons-material";
import { CircularProgress, Tab, Tabs, createTheme } from "@mui/material";

import MLContainer from "../containers/MLContainer";
import StatsContainer from "../molecules/AnalysisMolecules/StatsContainer";

type TabContentProps = React.PropsWithChildren<{
  index: number;
  value: number;
  className?: string;
}>;

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

function AddSnapshotForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const { isPending, mutate } = useCreateSnapshot({
    onSuccess: () => formRef.current?.reset(),
  });

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    mutate({
      label: fd.get("label") as string,
      password: fd.get("password") as string,
      url: fd.get("url") as string,
    });
  }

  return (
    <form
      className="mt-2 flex flex-col gap-2 rounded border border-black/10 bg-black/5 p-3 dark:border-white/10 dark:bg-white/5"
      onSubmit={handleSubmit}
      ref={formRef}
    >
      <p className="text-gray-600 dark:text-gray-400 text-xs font-semibold">
        Add Snapshot
      </p>
      <input
        className="rounded border border-black/20 bg-white px-2 py-1 text-xs dark:border-white/20 dark:bg-gray-800"
        name="url"
        placeholder="Grafana snapshot URL"
        required
        type="url"
      />
      <div className="flex gap-1.5">
        <input
          className="min-w-0 flex-1 rounded border border-black/20 bg-white px-2 py-1 text-xs dark:border-white/20 dark:bg-gray-800"
          name="label"
          placeholder="Label (e.g. Race Day 2025)"
          required
          type="text"
        />
        <input
          className="w-32 rounded border border-black/20 bg-white px-2 py-1 text-xs dark:border-white/20 dark:bg-gray-800"
          name="password"
          placeholder="Password"
          required
          type="password"
        />
        <button
          className="rounded bg-[#F05A28] px-3 py-1 text-xs font-medium text-white disabled:opacity-50"
          disabled={isPending}
          type="submit"
        >
          {isPending ? "Saving…" : "Save"}
        </button>
      </div>
    </form>
  );
}

function GrafanaHistoryTabContent() {
  const playbackSwitch = useAppState((s) => s.currentAppState.playbackSwitch);
  const timestamp = usePacketStore((s) => s.currentPacket.TimeStamp);
  const { resolvedTheme } = useTheme();
  const { data: snapshots = [], isLoading: snapshotsLoading } = useSnapshots();

  // Most recent snapshot is first (ordered by created_at desc from server).
  const latestSnapshot = snapshots[0] ?? null;
  const baseUrl = latestSnapshot?.url ?? null;

  // The server only stores embeddable snapshots.raintank.io URLs, so we can
  // build the iframe src directly and just append the theme query param.
  const iframeUrl = useMemo(() => {
    if (!baseUrl) return null;
    try {
      const url = new URL(baseUrl);
      url.searchParams.set(
        "theme",
        resolvedTheme === "dark" ? "dark" : "light",
      );
      return url.toString();
    } catch {
      return null;
    }
  }, [baseUrl, resolvedTheme]);

  if (snapshotsLoading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <CircularProgress size={24} sx={{ color: helios }} />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      {iframeUrl ? (
        <>
          <div className="flex items-center justify-between">
            <p className="text-gray-500 text-xs">
              Showing snapshot:{" "}
              <span className="font-medium text-[#F05A28]">
                {latestSnapshot?.label}
              </span>{" "}
              ·{" "}
              {latestSnapshot &&
                new Date(latestSnapshot.created_at).toLocaleDateString()}
            </p>
          </div>
          {playbackSwitch && (
            <div className="flex items-center gap-2 rounded bg-black/5 px-3 py-1.5 text-xs dark:bg-white/5">
              <span className="font-semibold text-[#F05A28]">
                Playback position:
              </span>
              <span className="text-gray-700 dark:text-gray-300 font-mono">
                {new Date(timestamp * 1000).toLocaleString()}
              </span>
              <span className="text-gray-400">
                ← locate this timestamp on the chart
              </span>
            </div>
          )}
          {/*
            allow-same-origin keeps the framed snapshots.raintank.io document
            in its real origin so Grafana's SPA can read localStorage during
            bootstrap. Verified: without it the iframe gets a unique opaque
            origin, localStorage access throws ("Error bootstrapping Grafana
            SecurityError ... lacks 'allow-same-origin'"), and Grafana renders
            its "failed to load application files" error instead of the
            dashboard. Safe to pair with allow-scripts here because the snapshot
            is cross-origin to this app and cannot reach out to alter the parent.
          */}
          <iframe
            allow="fullscreen"
            className="h-[60vh] w-full rounded border border-black/10 dark:border-white/10"
            sandbox="allow-scripts allow-same-origin allow-popups"
            src={iframeUrl}
            title="Grafana History"
          />
        </>
      ) : (
        <div className="text-gray-400 flex h-[40vh] flex-col items-center justify-center gap-2 text-sm">
          <p>No snapshot available yet.</p>
          <p>
            In Grafana: <strong>Share → Snapshot → Publish</strong>, then add
            the URL below.
          </p>
        </div>
      )}
      <AddSnapshotForm />
    </div>
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
          <TabContent index={2} value={value}>
            <GrafanaHistoryTabContent />
          </TabContent>
        </div>
      </div>
    </div>
  );
}

export default AnalysisTab;
