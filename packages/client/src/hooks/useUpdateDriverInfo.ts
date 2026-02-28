import { BACKEND_ROUTES } from "@/constants/apiRoutes";
import { backendApi } from "@/lib/api";
import { notifications } from "@mantine/notifications";
import { useMutation, useQueryClient } from "@tanstack/react-query";

/**
 * Request payload for updating driver information
 */
interface UpdateDriverInfoRequest {
  Rfid: string;
  name: string;
  password: string;
}

/**
 * Response structure from the /updatedriverinfo endpoint
 */
interface UpdateDriverInfoResponse {
  message: string;
  uptime?: string;
}

/**
 * Updates driver information in the database.
 *
 * Uses the configured backendApi instance from @/lib/api which includes:
 * - 30-second timeout to prevent hanging requests
 * - Standard JSON headers
 * - Centralized error handling
 *
 * @param data - Driver information to update
 * @param data.Rfid - Driver RFID
 * @param data.name - Driver name
 * @param data.password - MQTT password for authentication
 * @returns Promise resolving to update result
 * @throws Error if the request fails, password is invalid, or times out
 */
async function updateDriverInfo(
  data: UpdateDriverInfoRequest,
): Promise<UpdateDriverInfoResponse> {
  const response = await backendApi.post<UpdateDriverInfoResponse>(
    BACKEND_ROUTES.drivers.updateInfo,
    data,
  );

  return response.data;
}

/**
 * Options for the useUpdateDriverInfo mutation hook
 */
interface UseUpdateDriverInfoOptions {
  /**
   * Callback fired when the mutation succeeds (after the success notification is shown)
   * Use this for component-specific logic like resetting form state
   */
  onSuccess?: () => void;
}

/**
 * Custom mutation hook to update driver information using TanStack Query.
 *
 * Features:
 * - Automatic retry on failure (3 attempts)
 * - 30-second timeout to prevent hanging requests
 * - Automatic success notifications (handled inside the hook)
 * - Automatic error notifications (handled inside the hook)
 * - Automatic cache invalidation for drivers and driver laps
 * - Optional success callback for component-specific logic (e.g., form reset)
 *
 * @param options - Optional configuration
 * @param options.onSuccess - Callback fired after the mutation succeeds and notification is shown
 * @returns Mutation result with driver update functionality
 */
export function useUpdateDriverInfo(options?: UseUpdateDriverInfoOptions) {
  const queryClient = useQueryClient();

  return useMutation({
    // Mutation function - uses backendApi with 30s timeout
    mutationFn: updateDriverInfo,

    // Handle errors with automatic notification using server error messages

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    onError: (error: any) => {
      // Extract error message from server response, or use default
      const message =
        error.response?.data?.error || "Failed to update driver information.";

      notifications.show({
        color: "red",
        message,
        title: "Error",
      });
    },

    // Show success notification, invalidate queries, and call component's success callback
    onSuccess: (data) => {
      // Show success notification
      notifications.show({
        color: "green",
        message: data.message,
        title: "Success",
      });

      // Invalidate drivers list to refetch updated data
      queryClient.invalidateQueries({ queryKey: ["drivers"] });
      // Invalidate all driver laps queries
      queryClient.invalidateQueries({ queryKey: ["driver-laps"] });

      // Call component's success callback if provided (for form reset, etc.)
      options?.onSuccess?.();
    },
  });
}
