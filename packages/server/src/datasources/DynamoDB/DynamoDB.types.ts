import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { type ILapData, type ITelemetryData } from "@shared/helios-types";

export interface DynamoDBtypes {
  close(): Promise<void>;
  client: DynamoDBDocumentClient;
  getLapData(date: Date): Promise<ILapData[]>;
  getPacketData(date: Date): Promise<ITelemetryData[]>;
  getFirstAndLastPacketDates(): Promise<[Date | null, Date | null]>;
  insertLapData(packet: ILapData): Promise<{ id: number }>;
  insertPacketData(packet: ITelemetryData): Promise<{ id: number }>;
}
