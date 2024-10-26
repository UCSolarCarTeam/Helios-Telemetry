import { type BackendController } from "@/controllers/BackendController/BackendController";

import { type DynamoDBtypes } from "@/datasources/DynamoDB/DynamoDB.types";

import { logger } from "@/index";
import {
  DynamoDBDocumentClient,
  GetCommand,
  PutCommand,
  QueryCommand,
} from "@aws-sdk/lib-dynamodb";
import { type ServiceOutputTypes } from "@aws-sdk/lib-dynamodb";
import type { ILapData, ITelemetryData } from "@shared/helios-types";

export class DynamoDB implements DynamoDBtypes {
  public client: DynamoDBDocumentClient;
  backendController: BackendController;

  constructor(backendController: BackendController) {
    try {
      this.backendController = backendController;
      this.client = DynamoDBDocumentClient.from({ region: "us-west-2" });
    } catch (error) {
      console.error("Error connecting to dynamo client");
      throw new Error(error);
    }
  }

  // Helper function to get playback table data
  public async getPacketData(date: Date): Promise<ITelemetryData[]> {
    try {
      const command = new GetCommand({
        TableName: "packet_data_table",
        Key: {
          timeAdded: date.toISOString(),
        },
      });
      const response = await this.client.send(command);

      return response;
    } catch (error) {
      console.error("Error getting playback table data");
      throw new Error(error);
    }
  }

  // Helper function to get lap table data
  public async getLapData(date: Date): Promise<ILapData[]> {
    try {
      const command = new GetCommand({
        TableName: "lap_data_table",
        Key: {
          timeAdded: date.toISOString(),
        },
      });
      const response = await this.client.send(command);

      return response;
    } catch (error) {
      console.error("Error getting lap table data");
      throw new Error(error);
    }
  }

  // Helper function to put data into the packet table
  public async insertPacketData(
    packet: ITelemetryData,
  ): Promise<ServiceOutputTypes> {
    try {
      const command = new PutCommand({
        TableName: "packet_data_table",
        Item: {
          timeAdded: packet.TimeStamp,
          data: packet,
        },
      });
      const response = await this.client.send(command);

      return response;
    } catch (error) {
      console.error("Error inserting playback table data");
      throw new Error(error);
    }
  }

  // Helper function to put data into the lap table
  public async insertLapData(packet: ILapData): Promise<ServiceOutputTypes> {
    try {
      const command = new PutCommand({
        TableName: "lap_data_table",
        Item: {
          timeAdded: packet.timeStamp,
          data: packet,
        },
      });
      const response = await this.client.send(command);

      return response;
    } catch (error) {
      console.error("Error inserting lap table data");
      throw new Error(error);
    }
  }

  // Helper function getting first and last playback packets
  public async getFirstAndLastPacketDates(): Promise<
    [Date | null, Date | null]
  > {
    try {
      const firstPacketCommand = new QueryCommand({
        TableName: "packet_data_table",
        Limit: 1,
        ScanIndexForward: true, // Ascending order for the earliest date
        KeyConditionExpression: "#timeAdded BETWEEN :start AND :end",
        ExpressionAttributeNames: {
          "#timeAdded": "timeAdded",
        },
        ExpressionAttributeValues: {
          ":start": "1970-01-01T00:00:00Z",
          ":end": new Date().toISOString(),
        },
      });
      const firstPacketResponse = await this.client.send(firstPacketCommand);
      const firstDate =
        firstPacketResponse.Items && firstPacketResponse.Items.length > 0
          ? new Date(firstPacketResponse.Items[0].timeAdded)
          : null;

      const lastPacketCommand = new QueryCommand({
        TableName: "packet_data_table",
        Limit: 1,
        ScanIndexForward: false, // Descending order for the latest date
        KeyConditionExpression: "#timeAdded BETWEEN :start AND :end",
        ExpressionAttributeNames: {
          "#timeAdded": "timeAdded",
        },
        ExpressionAttributeValues: {
          ":start": "1970-01-01T00:00:00Z",
          ":end": new Date().toISOString(),
        },
      });
      const lastPacketResponse = await this.client.send(lastPacketCommand);
      const lastDate =
        lastPacketResponse.Items && lastPacketResponse.Items.length > 0
          ? new Date(lastPacketResponse.Items[0].timeAdded)
          : null;

      if (!firstDate) {
        throw new Error("First date not found");
      }

      if (!lastDate) {
        throw new Error("Last date not found");
      }

      return [firstDate, lastDate];
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
