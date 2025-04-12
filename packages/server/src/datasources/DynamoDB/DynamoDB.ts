import { v4 as uuidv4 } from "uuid";

import { type BackendController } from "@/controllers/BackendController/BackendController";

import {
  type DynamoDBtypes,
  GenericResponse,
} from "@/datasources/DynamoDB/DynamoDB.types";

import { createLightweightApplicationLogger } from "@/utils/logger";

import {
  AttributeValue,
  DynamoDBClient,
  QueryCommandInput,
} from "@aws-sdk/client-dynamodb";
import {
  GetCommand,
  PutCommand,
  QueryCommand,
  ScanCommand,
  ScanCommandInput,
  UpdateCommand,
} from "@aws-sdk/lib-dynamodb";
import { unmarshall } from "@aws-sdk/util-dynamodb";
import { marshall } from "@aws-sdk/util-dynamodb";
import type {
  ILapData,
  IPlaybackDynamoResponse,
  ITelemetryData,
} from "@shared/helios-types";

if (!process.env.LAP_TABLE_NAME) {
  throw new Error("Lap table name not defined");
}

if (!process.env.PACKET_TABLE_NAME) {
  throw new Error("Packet table name not defined");
}

if (!process.env.DRIVER_TABLE_NAME) {
  throw new Error("Driver table name not defined");
}

const packetTableName = process.env.PACKET_TABLE_NAME;
const lapTableName = process.env.LAP_TABLE_NAME;
const driverTableName = process.env.DRIVER_TABLE_NAME;

const logger = createLightweightApplicationLogger("DynamoDB.ts");
export class DynamoDB implements DynamoDBtypes {
  public client: DynamoDBClient;
  backendController: BackendController;
  lapTableName: string;
  packetTableName: string;
  driverTableName: string;

  constructor(backendController: BackendController) {
    try {
      this.backendController = backendController;
      this.client = new DynamoDBClient({ region: "ca-central-1" });
      this.lapTableName = lapTableName;
      this.packetTableName = packetTableName;
      this.driverTableName = driverTableName;
    } catch (error) {
      logger.error("Error connecting to dynamo client");
      throw new Error(error);
    }
  }

  // Helper function to get playback table data
  public async getPacketData(timestamp: string) {
    try {
      const command = new GetCommand({
        Key: {
          id: "packet",
          timestamp: Number(timestamp), // Ensure `timestamp` is converted to a number
        },
        TableName: this.packetTableName,
      });

      const response = await this.client.send(command);
      return response.Item;
    } catch (error) {
      logger.error("Error getting playback table data: " + error.message);
      throw new Error(error.message);
    }
  }

  public async scanPacketDataBetweenDates(
    startUTCDate: number,
    endUTCDate: number,
  ) {
    try {
      let items: IPlaybackDynamoResponse[] = [];
      let lastEvaluatedKey: { [key: string]: AttributeValue } | undefined;

      do {
        const params: ScanCommandInput = {
          ExclusiveStartKey: lastEvaluatedKey, // Continue from last position
          ExpressionAttributeNames: {
            "#ts": "timestamp",
          },
          ExpressionAttributeValues: {
            ":end": endUTCDate,
            ":start": startUTCDate,
          },
          FilterExpression: "#ts BETWEEN :start AND :end",
          TableName: this.packetTableName,
        };

        const command = new ScanCommand(params);
        const response = await this.client.send(command);

        if (response.Items) {
          items = items.concat(
            response.Items.map((item) => item as IPlaybackDynamoResponse),
          );
        }

        lastEvaluatedKey = response.LastEvaluatedKey; // Set for next iteration
      } while (lastEvaluatedKey); // Keep scanning if there's more data

      return items;
    } catch (error) {
      logger.error("Error Scanning Packets between Dates", error);
      throw new Error("Error Scanning Packets between Dates");
    }
  }

  public async getDrivers() {
    try {
      const command = new ScanCommand({
        TableName: this.driverTableName,
      });
      const response = await this.client.send(command);
      return response.Items;
    } catch (error) {
      logger.error("Error getting drivers");
      throw new Error(error);
    }
  }

  public async getDriverLaps(Rfid: string) {
    try {
      const lapCommand = new QueryCommand({
        ExpressionAttributeNames: {
          "#ts": "timestamp",
        },
        ExpressionAttributeValues: {
          ":Rfid": Rfid,
          ":minTimestamp": 0,
        },
        KeyConditionExpression: "Rfid = :Rfid AND #ts >= :minTimestamp",
        ScanIndexForward: false,
        TableName: this.lapTableName,
      });

      const lapResponse = await this.client.send(lapCommand);
      return lapResponse.Items || [];
    } catch (error) {
      logger.error("Error getting lap data for driver", error);
      throw new Error(error.message || "Failed to fetch driver laps");
    }
  }

  // // Helper function to get lap table data
  public async getLapData() {
    try {
      const command = new ScanCommand({
        TableName: this.lapTableName,
      });

      const response = await this.client.send(command);
      return response.Items;
    } catch (error) {
      logger.error("Error getting all lap table data");
      throw new Error(error);
    }
  }

  // // Helper function to put data into the packet table
  public async insertPacketData(
    packet: ITelemetryData,
  ): Promise<GenericResponse> {
    try {
      const command = new PutCommand({
        Item: {
          data: packet,
          id: uuidv4(),
          timestamp: packet.TimeStamp,
          type: "packet",
        },
        TableName: this.packetTableName,
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
        Item: {
          Rfid: packet.Rfid,
          data: packet,
          id: uuidv4(),
          timestamp: packet.timestamp,
          type: "lap",
        },
        TableName: this.lapTableName,
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
    firstDateUTC: number | null;
    lastDateUTC: number | null;
  }> {
    try {
      const firstCommand = new QueryCommand({
        ExpressionAttributeValues: {
          ":type": { S: "packet" },
        },
        KeyConditionExpression: "type = :type",
        Limit: 1,
        ScanIndexForward: true, // Ascending order → earliest timestamp
        TableName: this.packetTableName,
      });

      const lastCommand = new QueryCommand({
        ExpressionAttributeValues: {
          ":type": { S: "packet" },
        },
        KeyConditionExpression: "type = :type",
        Limit: 1,
        ScanIndexForward: false, // Descending order → latest timestamp
        TableName: this.packetTableName,
      });

      const firstResponse = await this.client.send(firstCommand);
      const lastResponse = await this.client.send(lastCommand);

      if (!firstResponse.Items?.length || !lastResponse.Items?.length) {
        throw new Error("No packet data found");
      }

      const firstDateUTC = Number(firstResponse.Items[0].timestamp);
      const lastDateUTC = Number(lastResponse.Items[0].timestamp);

      return { firstDateUTC, lastDateUTC };
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

  public async updateDriverInfo(Rfid: string, name: string) {
    try {
      // Ensure Rfid is a string (DynamoDB is type-sensitive)
      if (typeof Rfid !== "string") {
        throw new Error("Rfid must be a string");
      }

      // Check if the Rfid exists in the driver table
      const getCommand = new GetCommand({
        Key: {
          Rfid: Rfid,
        },
        TableName: this.driverTableName,
      });
      const rfidCheckReposonse = await this.client.send(getCommand);

      if (!rfidCheckReposonse.Item) {
        return { message: "Driver Rfid not found in driver table" };
      }

      // Update only the 'driver' field, keeping the existing Rfid
      const updateCommand = new UpdateCommand({
        ExpressionAttributeValues: {
          ":name": name,
        },
        Key: { Rfid: Rfid },
        TableName: this.driverTableName,
        UpdateExpression: "SET driver = :name",
      });

      await this.client.send(updateCommand);
      return {
        message: `Driver name updated from ${rfidCheckReposonse.Item.driver} to ${name}`,
      };
    } catch (error) {
      logger.error("Error updating driver info: " + error.message);
      throw new Error(error.message);
    }
  }
}

export default DynamoDB;
