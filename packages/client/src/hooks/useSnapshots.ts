import { useEffect } from "react";

import { BACKEND_ROUTES } from "@/constants/apiRoutes";
import { backendApi } from "@/lib/api";
import { notifications } from "@mantine/notifications";
import type {
  CreateSnapshotRequestDTO,
  CreateSnapshotResponseDTO,
  IGrafanaSnapshot,
  RecentSnapshotResponseDTO,
} from "@shared/helios-types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export const SNAPSHOTS_QUERY_KEY = "grafana-snapshots";

async function fetchRecentSnapshot(): Promise<IGrafanaSnapshot | null> {
  const response = await backendApi.get<RecentSnapshotResponseDTO>(
    BACKEND_ROUTES.snapshots.recent,
  );
  return response.data.data;
}

async function postSnapshot(
  data: CreateSnapshotRequestDTO,
): Promise<CreateSnapshotResponseDTO> {
  const response = await backendApi.post<CreateSnapshotResponseDTO>(
    BACKEND_ROUTES.snapshots.base,
    data,
  );
  return response.data;
}

export function useRecentSnapshot() {
  const query = useQuery({
    gcTime: 1000 * 60 * 5,
    placeholderData: null,
    queryFn: fetchRecentSnapshot,
    queryKey: [SNAPSHOTS_QUERY_KEY] as const,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60 * 2,
    throwOnError: false,
  });

  useEffect(() => {
    if (query.error) {
      notifications.show({
        color: "red",
        message: "Failed to load Grafana snapshots.",
        title: "Error",
      });
    }
  }, [query.error]);

  return query;
}

interface UseCreateSnapshotOptions {
  onSuccess?: () => void;
}

export function useCreateSnapshot(options?: UseCreateSnapshotOptions) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: postSnapshot,
    onError: (error) => {
      const serverMessage =
        axios.isAxiosError(error) &&
        (error.response?.data as { error?: string } | undefined)?.error;
      notifications.show({
        color: "red",
        message:
          serverMessage ||
          "Failed to save snapshot. Check the URL and try again.",
        title: "Error",
      });
    },
    onSuccess: (data) => {
      notifications.show({
        color: "green",
        message: data.message,
        title: "Snapshot saved",
      });
      void queryClient.invalidateQueries({ queryKey: [SNAPSHOTS_QUERY_KEY] });
      options?.onSuccess?.();
    },
  });
}
