import { useEffect } from "react";

import { BACKEND_ROUTES } from "@/constants/apiRoutes";
import { backendApi } from "@/lib/api";
import { notifications } from "@mantine/notifications";
import type { IDriverData } from "@shared/helios-types/src/types";
import { useQuery } from "@tanstack/react-query";

/**
 * Response structure from the /drivers endpoint
 */
interface DriversResponse {
  data: IDriverData[];
}

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
  const response = await backendApi.get<DriversResponse>(
    BACKEND_ROUTES.drivers.base,
  );

  if (!Array.isArray(response.data?.data)) {
    throw new Error("Invalid API response format");
  }

  return response.data.data;
}

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
 *
 * @example
 * ```tsx
 * function DriverSelector() {
 *   const { data: drivers, isLoading, error } = useDrivers();
 *
 *   if (isLoading) return <div>Loading drivers...</div>;
 *   if (error) return <div>Error: {error.message}</div>;
 *
 *   return (
 *     <select>
 *       {drivers?.map(driver => (
 *         <option key={driver.Rfid} value={driver.Rfid}>
 *           {driver.driver}
 *         </option>
 *       ))}
 *     </select>
 *   );
 * }
 * ```
 */
export function useDrivers() {
  const query = useQuery({
    // Unused data stays in cache for 2 hours
    gcTime: 1000 * 60 * 60 * 2, // 2 hours

    // Fetch function - uses backendApi with 30s timeout
    queryFn: fetchDrivers,

    // Query key: ['drivers']
    queryKey: ["drivers"] as const,

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
