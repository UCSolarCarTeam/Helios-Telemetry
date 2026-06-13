import { useTheme } from "next-themes";
import Image from "next/image";
import React, { useState } from "react";
import { twMerge } from "tailwind-merge";

import { useCreateSnapshot, useRecentSnapshot } from "@/hooks/useSnapshots";
import { tabs } from "@/objects/TabRoutes";
import { useAppState } from "@/stores/useAppState";
import { usePacketStore } from "@/stores/usePacket";
import {
  helios,
  heliosCompliment,
  lightGray,
  mediumGray,
} from "@/styles/colors";
import { ThemeProvider } from "@emotion/react";
import { notifications } from "@mantine/notifications";
import { ExpandMore, OpenInNew } from "@mui/icons-material";
import {
  Button,
  CircularProgress,
  Collapse,
  Tab,
  Tabs,
  TextField,
  createTheme,
} from "@mui/material";

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
]
  // Normalize once: trim here so the stored url (used as href) is clean.
  .map((link) => ({ ...link, url: link.url?.trim() }))
  .filter((link): link is { url: string; label: string } => Boolean(link.url));

function GrafanaLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      className="flex items-center gap-1 text-xs font-medium text-grafana hover:underline"
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

function parseSnapshotTimeRange(
  rawUrl: string,
): { from: string; to: string } | null {
  try {
    const parsed = new URL(rawUrl.trim());
    const from = parsed.searchParams.get("from");
    const to = parsed.searchParams.get("to");
    if (!from || !to) return null;
    if (isNaN(new Date(from).getTime()) || isNaN(new Date(to).getTime()))
      return null;
    return { from, to };
  } catch {
    return null;
  }
}

function AddSnapshotForm({
  expanded,
  onToggle,
}: {
  expanded: boolean;
  onToggle: () => void;
}) {
  const [urlValue, setUrlValue] = useState("");
  const [labelValue, setLabelValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const { resolvedTheme } = useTheme();
  const { isPending, mutate } = useCreateSnapshot({
    onSuccess: () => {
      setUrlValue("");
      setLabelValue("");
      setPasswordValue("");
    },
  });

  const timeRange = parseSnapshotTimeRange(urlValue);
  const urlHasValue = urlValue.trim().length > 0;
  const urlError = urlHasValue && timeRange === null;

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const url = urlValue.trim();
    const label = labelValue.trim();
    const password = passwordValue.trim();

    if (!url || !label || !password) {
      notifications.show({
        color: "red",
        message: "Please fill in all fields before saving.",
        title: "Missing fields",
      });
      return;
    }

    const range = parseSnapshotTimeRange(url);
    if (!range) {
      notifications.show({
        color: "red",
        message:
          "The URL must contain valid `from` and `to` query parameters (e.g. ?from=2026-01-01T00:00:00Z&to=2026-12-31T23:59:59Z).",
        title: "Cannot parse time range",
      });
      return;
    }

    mutate({
      label,
      password,
      snapshot_from: range.from,
      snapshot_to: range.to,
      url,
    });
  }

  // Outlined-field styling matched to the Lap Data filters (ColumnFilters /
  // DriverFilter): helios borders, heliosCompliment floating label.
  const fieldSx = {
    "& .MuiInputLabel-root": {
      "&.Mui-focused": { color: heliosCompliment },
      "&.MuiInputLabel-shrink": { color: heliosCompliment },
      color: heliosCompliment,
    },
    "& .MuiOutlinedInput-input": {
      color: resolvedTheme === "dark" ? lightGray : "black",
    },
    "& .MuiOutlinedInput-notchedOutline": { borderColor: helios },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: heliosCompliment,
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: resolvedTheme === "dark" ? "white" : helios,
    },
  };

  return (
    <div className="mt-2 flex flex-col">
      <button
        aria-controls="add-snapshot-form"
        aria-expanded={expanded}
        className="flex items-center justify-between border-b border-black pb-1 text-sm font-medium uppercase tracking-[0.02857em] text-[#00000099] dark:text-dark"
        onClick={onToggle}
        type="button"
      >
        Add Snapshot
        <ExpandMore
          sx={{
            fontSize: 20,
            transform: expanded ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.2s",
          }}
        />
      </button>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <form
          className="flex flex-col gap-3 pb-3 pt-3"
          id="add-snapshot-form"
          onSubmit={handleSubmit}
        >
          <TextField
            FormHelperTextProps={{
              sx: timeRange ? { color: "success.main" } : undefined,
            }}
            error={urlError}
            helperText={
              urlError
                ? "URL must include ?from=…&to=… query params with valid dates."
                : timeRange
                  ? `${new Date(timeRange.from).toLocaleDateString()} – ${new Date(timeRange.to).toLocaleDateString()} time range detected`
                  : undefined
            }
            label="Grafana snapshot URL"
            name="url"
            onChange={(e) => setUrlValue(e.target.value)}
            size="small"
            sx={fieldSx}
            value={urlValue}
          />
          <div className="flex w-full min-w-0 flex-wrap items-start gap-2">
            <TextField
              className="min-w-0 flex-1 basis-full sm:basis-0"
              label="Label"
              name="label"
              onChange={(e) => setLabelValue(e.target.value)}
              size="small"
              sx={fieldSx}
              value={labelValue}
            />
            <TextField
              className="min-w-0 flex-1"
              label="Password"
              name="password"
              onChange={(e) => setPasswordValue(e.target.value)}
              size="small"
              sx={{ ...fieldSx, maxWidth: 140 }}
              type="password"
              value={passwordValue}
            />
            <Button
              disabled={isPending || !urlHasValue || urlError}
              sx={{
                "&:hover": { backgroundColor: heliosCompliment },
                backgroundColor: helios,
                color: "white",
                flexShrink: 0,
                height: 40,
                textTransform: "none",
              }}
              type="submit"
              variant="contained"
            >
              {isPending ? "Saving…" : "Save"}
            </Button>
          </div>
        </form>
      </Collapse>
    </div>
  );
}

function GrafanaHistoryTabContent() {
  const playbackSwitch = useAppState((s) => s.currentAppState.playbackSwitch);
  const timestamp = usePacketStore((s) => s.currentPacket.TimeStamp);
  const { resolvedTheme } = useTheme();
  const { data: latestSnapshot = null, isLoading: snapshotsLoading } =
    useRecentSnapshot();

  // Collapsed: give the iframe the full height. Expanded: shrink it so the
  // Add Snapshot form has room without spilling past the tab into the rows
  // below. CSS-only height change — the iframe resizes (Grafana reflows its
  // panels) and is never re-fetched.
  const [snapshotFormExpanded, setSnapshotFormExpanded] = useState(false);
  const baseUrl = latestSnapshot?.url ?? null;

  // The server only stores embeddable snapshots.raintank.io URLs, so we can
  // build the iframe src directly and just append the theme query param.
  let iframeUrl: string | null = null;
  if (baseUrl) {
    try {
      const url = new URL(baseUrl);
      url.searchParams.set(
        "theme",
        resolvedTheme === "dark" ? "dark" : "light",
      );
      iframeUrl = url.toString();
    } catch {
      iframeUrl = null;
    }
  }

  // next-themes returns resolvedTheme === undefined on the server and the first
  // client render; gating on it avoids loading the iframe with the wrong theme
  // and flickering once the real theme resolves.
  if (snapshotsLoading || !resolvedTheme) {
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
              <span className="font-medium text-grafana">
                {latestSnapshot?.label}
              </span>
              {" · "}
              {latestSnapshot &&
                new Date(latestSnapshot.created_at).toLocaleDateString()}
            </p>
          </div>
          {playbackSwitch && (
            <div className="flex items-center gap-2 rounded bg-black/5 px-3 py-1.5 text-xs dark:bg-white/5">
              <span className="font-semibold text-grafana">
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
          <iframe
            allow="fullscreen"
            className={twMerge(
              "w-full rounded border border-black/10 transition-[height] duration-300 ease-in-out dark:border-white/10",
              snapshotFormExpanded ? "h-[50vh]" : "h-[60vh]",
            )}
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
      <AddSnapshotForm
        expanded={snapshotFormExpanded}
        onToggle={() => setSnapshotFormExpanded((prev) => !prev)}
      />
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
