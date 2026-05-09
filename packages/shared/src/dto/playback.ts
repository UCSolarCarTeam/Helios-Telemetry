
import type { ITelemetryData } from "../types";

/**
 * DTO for playback packet response (single packet)
 */
export interface PlaybackPacketResponseDTO {
  data: ITelemetryData | null;
  message: string;
}

/**
 * DTO for playback data response (multiple packets between dates)
 */
export interface PlaybackDataResponseDTO {
  data: ITelemetryData[];
  message: string;
}

/**
 * DTO for first and last packet dates response
 */
export interface PlaybackDateRangeResponseDTO {
  firstDate: number;
  lastDate: number;
  message: string;
}

/**
 * DTO for playback health check response
 */
export interface PlaybackHealthResponseDTO {
  date: Date;
  message: string;
  uptime: string;
}

/**
 * DTO for available playback race dates.
 */
export interface AvailablePlaybackDatesResponseDTO {
  data: { date: Date }[];
  message: string;
}

/**
 * DTO for available playback time segments in a day.
 */
export interface AvailablePlaybackSegmentsResponseDTO {
  data: {
    endUtc: number;
    startUtc: number;
  }[];
  message: string;
}