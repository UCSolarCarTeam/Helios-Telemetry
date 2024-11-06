import { type BackendController } from "@/controllers/BackendController/BackendController";

import {
  type DynamoDBtypes,
  GenericResponse,
} from "@/datasources/DynamoDB/DynamoDB.types";

import { createLightweightApplicationLogger } from "@/utils/logger";

import {
  DynamoDBClient,
  GetItemCommand,
  QueryCommand,
} from "@aws-sdk/client-dynamodb";
import { PutCommand } from "@aws-sdk/lib-dynamodb";
import type { ILapData, ITelemetryData } from "@shared/helios-types";

if (!process.env.LAP_TABLE_NAME) {
  throw new Error("Lap table name not defined");
}

if (!process.env.PACKET_TABLE_NAME) {
  throw new Error("Lap table name not defined");
}

const packetTableName = process.env.PACKET_TABLE_NAME;
const lapTableName = process.env.LAP_TABLE_NAME;

const logger = createLightweightApplicationLogger("DynamoDB.ts");

export class DynamoDB implements DynamoDBtypes {
  public client: DynamoDBClient;
  backendController: BackendController;
  lapTableName: string;
  packetTableName: string;

  constructor(backendController: BackendController) {
    try {
      this.backendController = backendController;
      this.client = new DynamoDBClient({ region: "ca-central-1" });
      this.lapTableName = lapTableName;
      this.packetTableName = packetTableName;
    } catch (error) {
      logger.error("Error connecting to dynamo client");
      throw new Error(error);
    }
  }

  // Helper function to get playback table data
  public async getPacketData(date: Date) {
    //  add type to return
    try {
      const command = new GetItemCommand({
        TableName: this.packetTableName,
        Key: {
          id: { S: "packet" },
          timestamp: { S: date.toString() },
        },
      });
      const response = await this.client.send(command);
      return response;
    } catch (error) {
      logger.error("Error getting playback table data");
      throw new Error(error);
    }
  }

  // // Helper function to get lap table data
  public async getLapData(date: Date) {
    try {
      const command = new GetItemCommand({
        TableName: this.lapTableName,
        Key: {
          id: { S: "lap" },
          timestamp: { S: date.toString() },
        },
      });
      const response = await this.client.send(command);
      return response;
    } catch (error) {
      logger.error("Error getting lap table data");
      throw new Error(error);
    }
  }

  // // Helper function to put data into the packet table
  public async insertPacketData(
    packet: ITelemetryData,
  ): Promise<GenericResponse> {
    try {
      const command = new PutCommand({
        TableName: this.packetTableName,
        Item: {
          id: "packet",
          timestamp: packet.TimeStamp.toString(),
          data: packet,
        },
      });
      const response = await this.client.send(command);
      return {
        httpsStatusCode: response.$metadata.httpStatusCode,
        requestId: response.$metadata.requestId,
      };
    } catch (error) {
      logger.error("Error inserting playback table data");
      throw new Error(error);
    }
  }

  // // Helper function to put data into the lap table
  public async insertLapData(packet: ILapData): Promise<GenericResponse> {
    try {
      const command = new PutCommand({
        TableName: this.lapTableName,
        Item: {
          id: "lap",
          timestamp: packet.timeStamp.toString(),
          data: packet,
        },
      });
      const response = await this.client.send(command);
      return {
        httpsStatusCode: response.$metadata.httpStatusCode,
        requestId: response.$metadata.requestId,
      };
    } catch (error) {
      logger.error("Error inserting lap table data");
      throw new Error(error);
    }
  }

  // // Helper function getting first and last playback packets
  public async getFirstAndLastPacketDates(): Promise<{
    firstDate: Date | null;
    lastDate: Date | null;
  }> {
    try {
      const firstCommand = new QueryCommand({
        TableName: this.packetTableName,
        Limit: 1,
        ScanIndexForward: true,
        KeyConditionExpression: "id = :id",
        ExpressionAttributeValues: {
          ":id": { S: "packet" },
        },
      });
      const lastCommand = new QueryCommand({
        TableName: this.packetTableName,
        Limit: 1,
        ScanIndexForward: false,
        KeyConditionExpression: "id = :id",
        ExpressionAttributeValues: {
          ":id": { S: "packet" },
        },
      });

      const firstResponse = await this.client.send(firstCommand);
      const lastResponse = await this.client.send(lastCommand);
      const firstDate = new Date(Number(firstResponse.Items[0].timestamp.S));
      const lastDate = new Date(Number(lastResponse.Items[0].timestamp.S));

      return { firstDate, lastDate };
    } catch (error) {
      throw new Error(error.message);
    }
  }

  //Close the connection to the database
  public close(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.client = null;
      resolve();
    });
  }
}

export default DynamoDB;
