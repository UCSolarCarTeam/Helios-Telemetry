import { BACKEND_ROUTES } from "@/constants/apiRoutes";
import { DRIVERS_QUERY_KEY } from "@/hooks/useDrivers";
import { backendApi } from "@/lib/api";
import { notifications } from "@mantine/notifications";
import type {
  UpdateDriverInfoRequestDTO,
  UpdateDriverInfoResponseDTO,
} from "@shared/helios-types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

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
  data: UpdateDriverInfoRequestDTO,
): Promise<UpdateDriverInfoResponseDTO> {
  const response = await backendApi.post<UpdateDriverInfoResponseDTO>(
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

interface ErrorResponseDTO {
  error?: string;
}

interface ErrorWithResponse {
  response?: {
    data?: ErrorResponseDTO;
  };
}

/**
 * Custom mutation hook to update driver information using TanStack Query.
 *
 * Features:
 * - Automatic retry on failure (3 attempts)
 * - 30-second timeout to prevent hanging requests
 * - Automatic success notifications (handled inside the hook)
 * - Automatic error notifications (handled inside the hook)
 * - Automatic cache invalidation for drivers
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

    onError: (error: unknown) => {
      // Extract error message from server response, or use default
      const responseError = (error as ErrorWithResponse).response?.data?.error;
      const message =
        typeof responseError === "string"
          ? responseError
          : "Failed to update driver information.";

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
      void queryClient.invalidateQueries({ queryKey: [DRIVERS_QUERY_KEY] });

      // Call component's success callback if provided (for form reset, etc.)
      options?.onSuccess?.();
    },
  });
}
