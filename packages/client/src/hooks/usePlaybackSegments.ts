import { useEffect } from "react";

import { BACKEND_ROUTES } from "@/constants/apiRoutes";
import { backendApi } from "@/lib/api";
import { notifications } from "@mantine/notifications";
import type { AvailablePlaybackSegmentsResponseDTO } from "@shared/helios-types";
import { useQuery } from "@tanstack/react-query";

const DEFAULT_SEGMENT_MS = 60 * 60 * 1000;

interface UsePlaybackSegmentsOptions {
  dayStartUtc: number;
  enabled?: boolean;
  segmentMs?: number;
}

export interface IPlaybackSegment {
  endUtc: number;
  startUtc: number;
}

const isPlaybackSegment = (value: unknown): value is IPlaybackSegment => {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const segment = value as Record<string, unknown>;
  return (
    typeof segment.endUtc === "number" && typeof segment.startUtc === "number"
  );
};

async function fetchPlaybackSegments(
  dayStartUtc: number,
  segmentMs: number,
): Promise<IPlaybackSegment[]> {
  const response = await backendApi.get<AvailablePlaybackSegmentsResponseDTO>(
    BACKEND_ROUTES.playback.availableSegments,
    {
      params: {
        dayStartUtc,
        segmentMs,
      },
    },
  );

  const payload = response.data;
  if (typeof payload !== "object" || payload === null || !("data" in payload)) {
    throw new Error("Invalid API response format for playback segments");
  }

  const data = payload.data;
  if (!Array.isArray(data) || !data.every(isPlaybackSegment)) {
    throw new Error("Invalid API response format for playback segments");
  }

  return data;
}

export function usePlaybackSegments({
  dayStartUtc,
  enabled = true,
  segmentMs = DEFAULT_SEGMENT_MS,
}: UsePlaybackSegmentsOptions) {
  const query = useQuery({
    enabled: enabled && dayStartUtc > 0,
    queryFn: () => fetchPlaybackSegments(dayStartUtc, segmentMs),
    queryKey: ["playback-segments", dayStartUtc, segmentMs],
    refetchOnWindowFocus: false,
    throwOnError: false,
  });

  useEffect(() => {
    if (query.error) {
      notifications.show({
        color: "red",
        message: "Failed to fetch available playback segments.",
        title: "Error",
      });
    }
  }, [query.error]);

  return query;
}
