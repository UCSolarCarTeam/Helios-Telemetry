import type { ILapData } from "../types";

export interface LapDataResponseDTO {
  data: ILapData[];
  message: string;
  uptime: string;
}

export interface LapHealthResponseDTO {
  date: Date;
  message: string;
  uptime: string;
}