import { useEffect } from "react";

import { BACKEND_ROUTES } from "@/constants/apiRoutes";
import { backendApi } from "@/lib/api";
import { notifications } from "@mantine/notifications";
import type { ITelemetryData } from "@shared/helios-types";
import { useQuery } from "@tanstack/react-query";

/**
 * Response structure from the /packetsBetween endpoint
 */
interface PlaybackDataResponse {
  data: Array<{
    data: ITelemetryData;
    timestamp: number;
    id: string;
  }>;
}

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
  const response = await backendApi.get<PlaybackDataResponse>(
    BACKEND_ROUTES.playback.packetsBetween,
    {
      params: { endTime, startTime },
    },
  );

  if (!Array.isArray(response.data?.data)) {
    throw new Error("Invalid API response format");
  }

  // Extract telemetry data from response
  return response.data.data.map((item) => item.data);
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
 *
 * @example
 * ```tsx
 * function PlaybackViewer() {
 *   const startTime = new Date('2024-01-01T10:00:00Z').getTime();
 *   const endTime = new Date('2024-01-01T11:00:00Z').getTime();
 *
 *   const { data: packets, isLoading, error } = usePlaybackData({
 *     startTime,
 *     endTime,
 *   });
 *
 *   if (isLoading) return <div>Loading playback data...</div>;
 *   if (error) return <div>Error: {error.message}</div>;
 *
 *   return <div>{packets?.length ?? 0} packets loaded</div>;
 * }
 * ```
 *
 * @example
 * ```tsx
 * // Conditionally fetch based on time selection
 * function PlaybackSelector() {
 *   const [timeRange, setTimeRange] = useState<{start: number, end: number} | null>(null);
 *
 *   const { data: packets } = usePlaybackData({
 *     startTime: timeRange?.start ?? 0,
 *     endTime: timeRange?.end ?? 0,
 *     enabled: timeRange !== null,
 *   });
 *
 *   return <div>{packets?.length ?? 0} packets</div>;
 * }
 * ```
 */
export function usePlaybackData({
  enabled = true,
  endTime,
  startTime,
}: UsePlaybackDataOptions) {
  const query = useQuery({
    // Only enable query when time range is valid and enabled is true
    enabled: enabled && startTime > 0 && endTime > startTime,

    // Unused data stays in cache for 1 hour
    gcTime: 1000 * 60 * 60, // 1 hour

    // Fetch function - uses backendApi with 30s timeout
    queryFn: () => fetchPlaybackData(startTime, endTime),

    // Query key: ['playback-data', startTime, endTime]
    // This ensures separate cache entries per time range
    queryKey: ["playback-data", startTime, endTime] as const,

    // Don't refetch on window focus (historical data is immutable)
    refetchOnWindowFocus: false,

    // Data is considered fresh for 30 minutes (historical data doesn't change)
    staleTime: 1000 * 60 * 30, // 30 minutes

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
