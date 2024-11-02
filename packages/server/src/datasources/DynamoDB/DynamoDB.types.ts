import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { type ILapData, type ITelemetryData } from "@shared/helios-types";

export interface DynamoDBtypes {
  close(): Promise<void>;
  client: DynamoDBClient;
  // getLapData(date: Date): Promise<ILapData[]>;
  getPacketData(date: Date): void;
  // getFirstAndLastPacketDates(): Promise<[Date | null, Date | null]>;
  // insertLapData(packet: ILapData): Promise<{ id: number }>;
  insertPacketData(packet: ITelemetryData): Promise<GenericResponse>;
}

export interface GenericResponse {
  httpsStatusCode: number;
  requestId: string;
}
