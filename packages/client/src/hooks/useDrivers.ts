import { useEffect } from "react";

import { BACKEND_ROUTES } from "@/constants/apiRoutes";
import { backendApi } from "@/lib/api";
import { notifications } from "@mantine/notifications";
import type { DriversResponseDTO, IDriverData } from "@shared/helios-types";
import { useQuery } from "@tanstack/react-query";

/**
 * Fetches all driver data from the backend API.
 *
 * Uses the configured backendApi instance from @/lib/api which includes:
 * - 30-second timeout to prevent hanging requests
 * - Standard JSON headers
 * - Centralized error handling
 *
 * @returns Promise resolving to array of driver data
 * @throws Error if the request fails or times out
 */
async function fetchDrivers(): Promise<IDriverData[]> {
  const response = await backendApi.get<DriversResponseDTO>(
    BACKEND_ROUTES.drivers.base,
  );

  if (!Array.isArray(response.data?.data)) {
    throw new Error("Invalid API response format");
  }

  return response.data.data;
}

export const DRIVERS_QUERY_KEY = "drivers";
/**
 * Custom hook to fetch and cache all driver data using TanStack Query.
 *
 * Features:
 * - 1-hour cache TTL (driver data rarely changes)
 * - Automatic retry on failure (3 attempts)
 * - No refetch on window focus (driver data is stable)
 * - 30-second timeout to prevent hanging requests
 * - Consistent error handling with user-friendly messages
 *
 * @returns Query result with driver data
 */
export function useDrivers() {
  const query = useQuery({
    // Unused data stays in cache for 2 hours
    gcTime: 1000 * 60 * 60 * 2, // 2 hours

    placeholderData: [],

    // Fetch function - uses backendApi with 30s timeout
    queryFn: fetchDrivers,

    // Query key: ['drivers']
    queryKey: [DRIVERS_QUERY_KEY] as const,

    // Don't refetch on window focus (driver data is stable)
    refetchOnWindowFocus: false,

    // Data is considered fresh for 1 hour (driver data rarely changes)
    staleTime: 1000 * 60 * 60, // 1 hour

    // Don't throw errors to error boundary - handle in hook
    throwOnError: false,
  });

  // Handle errors with automatic notification
  useEffect(() => {
    if (query.error) {
      notifications.show({
        color: "red",
        message: "Failed to fetch driver data from the server.",
        title: "Error",
      });
    }
  }, [query.error]);

  return query;
}
