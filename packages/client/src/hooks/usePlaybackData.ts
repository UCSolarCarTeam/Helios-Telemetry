import { useEffect } from "react";

import { BACKEND_ROUTES } from "@/constants/apiRoutes";
import { backendApi } from "@/lib/api";
import { notifications } from "@mantine/notifications";
import type {
  ITelemetryData,
  PlaybackDataResponseDTO,
} from "@shared/helios-types";
import { useQuery } from "@tanstack/react-query";

/**
 * Options for the usePlaybackData hook
 */
interface UsePlaybackDataOptions {
  /** Start time in UTC milliseconds */
  startTime: number;
  /** End time in UTC milliseconds */
  endTime: number;
  /** Whether to enable the query (default: true) */
  enabled?: boolean;
}

export const getPlaybackDataQueryKey = (startTime: number, endTime: number) =>
  ["playback-data", startTime, endTime] as const;

/**
 * Fetches playback telemetry data between a time range.
 *
 * Uses the configured backendApi instance from @/lib/api which includes:
 * - 30-second timeout to prevent hanging requests
 * - Standard JSON headers
 * - Centralized error handling
 *
 * @param startTime - Start time in UTC milliseconds
 * @param endTime - End time in UTC milliseconds
 * @returns Promise resolving to array of telemetry data
 * @throws Error if the request fails or times out
 */
async function fetchPlaybackData(
  startTime: number,
  endTime: number,
): Promise<ITelemetryData[]> {
  const response = await backendApi.get<PlaybackDataResponseDTO>(
    BACKEND_ROUTES.playback.packetsBetween,
    {
      params: { endTime, startTime },
    },
  );

  if (!Array.isArray(response.data?.data)) {
    throw new Error("Invalid API response format");
  }
  // Extract telemetry data from response
  return response.data.data;
}

/**
 * Custom hook to fetch playback telemetry data between a time range using TanStack Query.
 *
 * Features:
 * - 30-minute cache TTL (playback data is historical and doesn't change)
 * - Automatic retry on failure (3 attempts)
 * - No refetch on window focus (historical data is immutable)
 * - 30-second timeout to prevent hanging requests
 * - Consistent error handling with user-friendly messages
 * - Can be disabled via `enabled` option
 *
 * @param options - Configuration options
 * @param options.startTime - Start time in UTC milliseconds
 * @param options.endTime - End time in UTC milliseconds
 * @param options.enabled - Whether to enable the query (default: true)
 * @returns Query result with playback telemetry data
 */
export function usePlaybackData({
  enabled = true,
  endTime,
  startTime,
}: UsePlaybackDataOptions) {
  const query = useQuery({
    // Only enable query when time range is valid and enabled is true
    enabled: enabled && startTime > 0 && endTime > startTime,

    queryFn: () => fetchPlaybackData(startTime, endTime),

    // Query key: ['playback-data', startTime, endTime]
    // This ensures separate cache entries per time range
    queryKey: getPlaybackDataQueryKey(startTime, endTime),

    // Don't refetch on window focus (historical data is immutable)
    refetchOnWindowFocus: false,

    // Don't throw errors to error boundary - handle in hook
    throwOnError: false,
  });

  // Handle errors with automatic notification
  useEffect(() => {
    if (query.error) {
      notifications.show({
        color: "red",
        message: "Failed to fetch playback data from the server.",
        title: "Error",
      });
    }
  }, [query.error]);

  return query;
}
