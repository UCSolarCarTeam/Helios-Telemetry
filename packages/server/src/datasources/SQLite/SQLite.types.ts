import type sqlite3 from "sqlite3";

import { type ILapData, type ITelemetryData } from "@shared/helios-types";

export interface SQLiteType {
  close(): Promise<void>;
  db: sqlite3.Database;
  getAllRows(sql: string): Promise<ITelemetryData[]>;
  getLapData(): Promise<ITelemetryData[]>;
  getPacketData(): Promise<ITelemetryData[]>;
  insertLapData(packet: ILapData): Promise<{ id: number }>;
  insertPacketData(packet: ITelemetryData): Promise<{ id: number }>;
  runQuery(sql: string, params: any[]): Promise<{ id: number }>;
}
