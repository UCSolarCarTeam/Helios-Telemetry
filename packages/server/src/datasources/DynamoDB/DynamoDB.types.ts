import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { type ILapData, type ITelemetryData } from "@shared/helios-types";

export interface DynamoDBtypes {
  close(): Promise<void>;
  client: DynamoDBClient;
  getLapData(timestamp: string): void;
  getPacketData(timestamp: string): void;
  scanPacketDataBetweenDates(startUTCDate: number, endUTCDate: number): void;
  insertLapData(packet: ILapData): Promise<GenericResponse>;
  insertPacketData(packet: ITelemetryData): Promise<GenericResponse>;
  getDrivers(): void;
  getDriverNameUsingRfid(Rfid: string): Promise<string | null>;
  getDriverLaps(Rfid: string): void;
}

export interface GenericResponse {
  httpsStatusCode: number;
  requestId: string;
}
