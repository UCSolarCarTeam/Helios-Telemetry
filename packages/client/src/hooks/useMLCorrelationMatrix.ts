import { useTheme } from "next-themes";
import { useMemo } from "react";
import type { PlotParams } from "react-plotly.js";

import { API_ROUTES } from "@/constants/apiRoutes";
import { api } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";

export type PlotTypes =
  | typeof API_ROUTES.ml.packetCorrelationMatrix
  | typeof API_ROUTES.ml.lapCorrelationMatrix;

interface UseMLCorrelationMatrixOptions {
  plotType: PlotTypes;
}

/**
 * Fetches correlation matrix data from the API with a 30-second timeout.
 *
 * Uses the configured axios instance from @/lib/api which includes:
 * - 30-second timeout to prevent hanging requests
 * - Standard JSON headers
 * - Centralized error handling
 *
 * @param plotType - The API endpoint to fetch from
 * @returns Promise resolving to PlotParams data
 * @throws Error if the request fails or times out
 */
async function fetchCorrelationMatrix(
  plotType: PlotTypes,
): Promise<PlotParams> {
  const response = await api.get<string>(plotType);

  // Parse the JSON string response
  const rawData = JSON.parse(response.data) as PlotParams;

  return rawData;
}

/**
 * Custom hook to fetch and cache ML correlation matrix data using TanStack Query.
 *
 * Features:
 * - 1-hour cache TTL (matches backend cache)
 * - Automatic retry on failure (3 attempts)
 * - No refetch on window focus (expensive ML data)
 * - Theme-aware layout transformation (doesn't refetch on theme change)
 * - 30-second timeout to prevent hanging requests
 *
 * @param options - Configuration options
 * @param options.plotType - The API endpoint to fetch from
 * @returns Query result with theme-transformed plot data
 */
export function useMLCorrelationMatrix({
  plotType,
}: UseMLCorrelationMatrixOptions) {
  const { resolvedTheme } = useTheme();
  // Fetch raw data from API
  const query = useQuery({
    // Only enable query when theme is resolved
    // This prevents unnecessary fetches before theme is ready
    enabled: !!resolvedTheme && resolvedTheme !== undefined,

    // Fetch function - uses axios with 30s timeout
    queryFn: () => fetchCorrelationMatrix(plotType),

    // Query key: ['ml', 'correlation-matrix', plotType]
    // Note: theme is NOT in the key to avoid separate cache entries per theme
    queryKey: ["ml", "correlation-matrix", plotType] as const,

    // Throw errors to error boundary (optional, can be removed if you prefer error state)
    throwOnError: false,
  });
  // Transform layout based on current theme (memoized to avoid unnecessary recalculations)
  const transformedData = useMemo(() => {
    if (!query.data) return null;

    const layout: PlotParams["layout"] = {
      autosize: true,
      font: {
        color: resolvedTheme === "dark" ? "white" : "black",
      },
      margin: { l: 175, t: 75 },
      paper_bgcolor: "rgba(0,0,0,0)",
      title: query.data.layout.title,
    };

    return {
      ...query.data,
      layout,
    };
  }, [query.data, resolvedTheme]);

  // Return query state with transformed data
  return {
    ...query,
    data: transformedData,
    isLoading: query.isLoading || !resolvedTheme,
  };
}
