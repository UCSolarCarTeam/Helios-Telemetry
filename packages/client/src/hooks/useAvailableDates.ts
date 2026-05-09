import { BACKEND_ROUTES } from "@/constants/apiRoutes";
import { backendApi } from "@/lib/api";
import { notifications } from "@mantine/notifications";
import type { AvailablePlaybackDatesResponseDTO } from "@shared/helios-types";
import { useQuery } from "@tanstack/react-query";

export const getLocalDateKey = (date: Date | string): string => {
  if (typeof date === "string") {
    return date.slice(0, 10);
  }

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

/**
 * Fetches all available race dates that have telemetry data
 * Used to disable unavailable dates in the playback date picker
 */
export async function fetchAvailableDates(): Promise<string[]> {
  try {
    const response = await backendApi.get<AvailablePlaybackDatesResponseDTO>(
      BACKEND_ROUTES.playback.availableDates,
    );
    return response.data.data.map((item) => getLocalDateKey(item.date));
  } catch (error) {
    notifications.show({
      color: "red",
      message: "Failed to load available playback dates",
      title: "Error",
    });
    throw error;
  }
}

/**
 * Hook to fetch available playback dates
 * Returns a set of dates for efficient O(1) lookup when excluding dates
 *
 * @returns Object containing availableDates array, isLoading state, and error state
 */
export function useAvailableDates() {
  const {
    data = [],
    error,
    isLoading,
  } = useQuery({
    queryFn: fetchAvailableDates,
    queryKey: ["available-dates"],
  });

  // Create a Set of date strings (YYYY-MM-DD) for efficient lookup
  const availableDateSet = new Set(data);

  return {
    availableDateSet,
    availableDates: data,
    error,
    isLoading,
  };
}
