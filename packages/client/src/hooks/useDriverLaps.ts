import { useEffect } from "react";

import { BACKEND_ROUTES } from "@/constants/apiRoutes";
import { backendApi } from "@/lib/api";
import { notifications } from "@mantine/notifications";
import type { ILapData } from "@shared/helios-types";
import { useQuery } from "@tanstack/react-query";

/**
 * Response structure from the /driver/:rfid endpoint
 */
interface DriverLapsResponse {
  data: ILapData[];
}

/**
 * Options for the useDriverLaps hook
 */
interface UseDriverLapsOptions {
  /** Driver RFID to fetch laps for */
  rfid: string;
  /** Whether to enable the query (default: true) */
  enabled?: boolean;
}

/**
 * Fetches lap data for a specific driver by RFID.
 *
 * Uses the configured backendApi instance from @/lib/api which includes:
 * - 30-second timeout to prevent hanging requests
 * - Standard JSON headers
 * - Centralized error handling
 *
 * @param rfid - Driver RFID to fetch laps for
 * @returns Promise resolving to array of lap data for the driver
 * @throws Error if the request fails or times out
 */
async function fetchDriverLaps(rfid: string): Promise<ILapData[]> {
  const response = await backendApi.get<DriverLapsResponse>(
    BACKEND_ROUTES.drivers.byRfid(rfid),
  );

  if (!Array.isArray(response.data?.data)) {
    throw new Error("Invalid API response format");
  }

  return response.data.data;
}

/**
 * Custom hook to fetch and cache lap data for a specific driver using TanStack Query.
 *
 * Features:
 * - 5-minute cache TTL (lap data changes frequently)
 * - Automatic retry on failure (3 attempts)
 * - Refetch on window focus (to get latest lap data)
 * - 30-second timeout to prevent hanging requests
 * - Consistent error handling with user-friendly messages
 * - Can be disabled via `enabled` option
 *
 * @param options - Configuration options
 * @param options.rfid - Driver RFID to fetch laps for
 * @param options.enabled - Whether to enable the query (default: true)
 * @returns Query result with driver's lap data
 *
 * @example
 * ```tsx
 * function DriverLapsTable({ rfid }: { rfid: number }) {
 *   const { data: laps, isLoading, error } = useDriverLaps({ rfid });
 *
 *   if (isLoading) return <div>Loading laps...</div>;
 *   if (error) return <div>Error: {error.message}</div>;
 *
 *   return (
 *     <table>
 *       {laps?.map(lap => <LapRow key={lap.TimeStamp} lap={lap} />)}
 *     </table>
 *   );
 * }
 * ```
 *
 * @example
 * ```tsx
 * // Conditionally fetch based on RFID selection
 * function DriverLapsFilter() {
 *   const [selectedRfid, setSelectedRfid] = useState<string | null>(null);
 *   const { data: laps } = useDriverLaps({
 *     rfid: selectedRfid ?? "",
 *     enabled: selectedRfid !== null,
 *   });
 *
 *   return <div>{laps?.length ?? 0} laps found</div>;
 * }
 * ```
 */
export function useDriverLaps({ enabled = true, rfid }: UseDriverLapsOptions) {
  const query = useQuery({
    // Only enable query when rfid is provided and enabled is true
    enabled: enabled && rfid.length > 0,

    // Unused data stays in cache for 10 minutes
    gcTime: 1000 * 60 * 10, // 10 minutes

    // Fetch function - uses backendApi with 30s timeout
    queryFn: () => fetchDriverLaps(rfid),

    // Query key: ['driver-laps', rfid]
    // This ensures separate cache entries per driver
    queryKey: ["driver-laps", rfid] as const,

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
        message: "Failed to fetch driver laps from the server.",
        title: "Error",
      });
    }
  }, [query.error]);

  return query;
}
