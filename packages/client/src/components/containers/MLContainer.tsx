"use client";

import { API_ROUTES } from "@/constants/apiRoutes";
import useWindowDimensions from "@/hooks/PIS/useWindowDimensions";
import {
  type PlotTypes,
  useMLCorrelationMatrix,
} from "@/hooks/useMLCorrelationMatrix";

import Plotly from "./Plotly";

const SMALL_SCREEN = 380;

export default function MLContainer({
  plotType = API_ROUTES.ml.packetCorrelationMatrix,
}: {
  plotType?: PlotTypes;
}) {
  const { width } = useWindowDimensions();

  // Fetch and transform correlation matrix data using TanStack Query
  // The hook handles both fetching and theme-aware layout transformation
  const {
    data: plotData,
    error,
    isFetching,
    isLoading,
    refetch,
  } = useMLCorrelationMatrix({
    plotType,
  });

  // Loading state
  if (isLoading) {
    return (
      <div className="flex h-72 items-center justify-center rounded-lg bg-white p-2 text-3xl font-bold dark:bg-arsenic dark:text-white">
        {isFetching ? "Fetching data..." : "Loading..."}
      </div>
    );
  }

  // Error state with retry button
  if (error) {
    return (
      <div className="flex h-72 flex-col items-center justify-center gap-4 rounded-lg bg-white p-2 dark:bg-arsenic dark:text-white">
        <div className="text-xl font-bold text-red-600 dark:text-red-400">
          Error loading data
        </div>
        <div className="text-gray-600 dark:text-gray-400 text-sm">
          {error instanceof Error ? error.message : "Unknown error occurred"}
        </div>
        <button
          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
          onClick={() => refetch()}
        >
          Retry
        </button>
      </div>
    );
  }

  // No data state (shouldn't happen if query is enabled correctly)
  if (!plotData) {
    return (
      <div className="flex h-72 items-center justify-center rounded-lg bg-white p-2 text-3xl font-bold dark:bg-arsenic dark:text-white">
        No data available
      </div>
    );
  }

  // Success state - render the plot
  return (
    <div className="relative flex h-72 items-center gap-4 overflow-x-auto overflow-y-hidden rounded-lg bg-white p-2 text-3xl font-bold dark:bg-arsenic dark:text-white sm:justify-center">
      {/* Refresh button - positioned in top-right corner */}
      <button
        className="text-gray-700 dark:text-gray-200 absolute right-2 top-2 z-10 rounded-md bg-gray-200 px-3 py-1 text-xs font-semibold transition-colors hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600"
        disabled={isFetching}
        onClick={() => refetch()}
        title="Refresh data"
      >
        {isFetching ? "Refreshing..." : "Refresh"}
      </button>

      <Plotly
        className="h-72 w-max bg-inherit"
        config={{
          displayModeBar: width < SMALL_SCREEN,
          displaylogo: false,
          modeBarButtonsToRemove: [
            "toImage",
            "zoomOut2d",
            "zoom2d",
            "resetScale2d",
          ],
          scrollZoom: true,
          staticPlot: width < SMALL_SCREEN,
        }}
        data={plotData.data}
        layout={plotData.layout}
      />
    </div>
  );
}
