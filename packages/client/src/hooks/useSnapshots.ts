import { useEffect } from "react";

import { BACKEND_ROUTES } from "@/constants/apiRoutes";
import { backendApi } from "@/lib/api";
import { notifications } from "@mantine/notifications";
import type {
  CreateSnapshotRequestDTO,
  CreateSnapshotResponseDTO,
  IGrafanaSnapshot,
  SnapshotListResponseDTO,
} from "@shared/helios-types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export const SNAPSHOTS_QUERY_KEY = "grafana-snapshots";

async function fetchSnapshots(): Promise<IGrafanaSnapshot[]> {
  const response = await backendApi.get<SnapshotListResponseDTO>(
    BACKEND_ROUTES.snapshots.base,
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

export function useSnapshots() {
  const query = useQuery({
    gcTime: 1000 * 60 * 5,
    placeholderData: [],
    queryFn: fetchSnapshots,
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
