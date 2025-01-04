import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { type ILapData, type ITelemetryData } from "@shared/helios-types";

export interface DynamoDBtypes {
  close(): Promise<void>;
  client: DynamoDBClient;
  getLapData(timestamp: number): void;
  getPacketData(timestamp: number): void;
  scanPacketDataBetweenDates(startUTCDate: number, endUTCDate: number): void;
  insertLapData(packet: ILapData): Promise<GenericResponse>;
  insertPacketData(packet: ITelemetryData): Promise<GenericResponse>;
}

export interface GenericResponse {
  httpsStatusCode: number;
  requestId: string;
}
