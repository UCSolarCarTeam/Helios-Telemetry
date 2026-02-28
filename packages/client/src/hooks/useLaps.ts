import { useEffect } from "react";

import { BACKEND_ROUTES } from "@/constants/apiRoutes";
import { backendApi } from "@/lib/api";
import { notifications } from "@mantine/notifications";
import type { ILapData } from "@shared/helios-types";
import { useQuery } from "@tanstack/react-query";

/**
 * Response structure from the /laps endpoint
 */
interface LapsResponse {
  data: ILapData[];
  message: string;
  uptime: string;
}

/**
 * Fetches all lap data from the backend API.
 *
 * Uses the configured backendApi instance from @/lib/api which includes:
 * - 30-second timeout to prevent hanging requests
 * - Standard JSON headers
 * - Centralized error handling
 *
 * @returns Promise resolving to array of lap data
 * @throws Error if the request fails or times out
 */
async function fetchLaps(): Promise<ILapData[]> {
  const response = await backendApi.get<LapsResponse>(BACKEND_ROUTES.laps.base);

  if (!Array.isArray(response.data?.data)) {
    throw new Error("Invalid API response format");
  }

  return response.data.data;
}

/**
 * Custom hook to fetch and cache all lap data using TanStack Query.
 *
 * Features:
 * - 5-minute cache TTL (lap data changes frequently)
 * - Automatic retry on failure (3 attempts)
 * - Refetch on window focus (to get latest lap data)
 * - 30-second timeout to prevent hanging requests
 * - Consistent error handling with user-friendly messages
 *
 * @returns Query result with lap data
 *
 * @example
 * ```tsx
 * function LapDataComponent() {
 *   const { data: laps, isLoading, error, refetch } = useLaps();
 *
 *   if (isLoading) return <div>Loading...</div>;
 *   if (error) return <div>Error: {error.message}</div>;
 *
 *   return (
 *     <div>
 *       {laps?.map(lap => <LapRow key={lap.TimeStamp} lap={lap} />)}
 *     </div>
 *   );
 * }
 * ```
 */
export function useLaps() {
  const query = useQuery({
    // Unused data stays in cache for 10 minutes
    gcTime: 1000 * 60 * 10, // 10 minutes

    // Fetch function - uses backendApi with 30s timeout
    queryFn: fetchLaps,

    // Query key: ['laps']
    queryKey: ["laps"] as const,

    // Refetch on window focus to get latest lap data
    refetchOnWindowFocus: true,

    // Data is considered fresh for 5 minutes (lap data changes frequently)
    staleTime: 1000 * 60 * 5, // 5 minutes

    // Don't throw errors to error boundary - handle in hook
    throwOnError: false,
  });

  // Handle errors with automatic notification
  useEffect(() => {
    if (query.error) {
      notifications.show({
        color: "red",
        message: "Failed to fetch lap data from the server.",
        title: "Error",
      });
    }
  }, [query.error]);

  return query;
}
