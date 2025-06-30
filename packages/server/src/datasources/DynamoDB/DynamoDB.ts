import { v4 as uuidv4 } from "uuid";

import { type BackendController } from "@/controllers/BackendController/BackendController";

import {
  type DynamoDBtypes,
  GenericResponse,
} from "@/datasources/DynamoDB/DynamoDB.types";

import { createLightweightApplicationLogger } from "@/utils/logger";

import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import type { QueryCommandInput } from "@aws-sdk/lib-dynamodb";
import {
  DynamoDBDocumentClient,
  GetCommand,
  PutCommand,
  QueryCommand,
  ScanCommand,
  UpdateCommand,
} from "@aws-sdk/lib-dynamodb";
import type { ILapData, ITelemetryData } from "@shared/helios-types";

if (!process.env.LAP_TABLE_NAME) {
  throw new Error("Lap table name not defined");
}

if (!process.env.PACKET_TABLE_NAME) {
  throw new Error("Packet table name not defined");
}

if (!process.env.DRIVER_TABLE_NAME) {
  throw new Error("Driver table name not defined");
}

if (!process.env.GPS_CALCULATED_LAP_DATA_TABLE) {
  throw new Error("GPS lap table name not defined");
}

const packetTableName = process.env.PACKET_TABLE_NAME;
const lapTableName = process.env.LAP_TABLE_NAME;
const gpsTableName = process.env.GPS_CALCULATED_LAP_DATA_TABLE;
const driverTableName = process.env.DRIVER_TABLE_NAME;

const logger = createLightweightApplicationLogger("DynamoDB.ts");
export class DynamoDB implements DynamoDBtypes {
  public client: DynamoDBClient;
  backendController: BackendController;
  lapTableName: string;
  packetTableName: string;
  gpsTableName: string;
  driverTableName: string;
  packetTableIndexName: string = "type-timestamp-index";

  constructor(backendController: BackendController) {
    try {
      this.backendController = backendController;
      const rawClient = new DynamoDBClient({ region: "ca-central-1" });
      this.client = DynamoDBDocumentClient.from(rawClient);
      this.lapTableName = lapTableName;
      this.packetTableName = packetTableName;
      this.gpsTableName = gpsTableName;
      this.driverTableName = driverTableName;
    } catch (error) {
      logger.error("Error connecting to dynamo client");
      throw new Error(error);
    }
  }

  // Helper function to get playback table data
  public async getPacketData(timestamp: string) {
    const params: QueryCommandInput = {
      ExpressionAttributeNames: { "#ts": "timestamp" },
      ExpressionAttributeValues: { ":tsVal": Number(timestamp) },
      IndexName: this.packetTableIndexName,
      KeyConditionExpression: "#ts = :tsVal",
      TableName: this.packetTableName,
    };

    try {
      const { Items } = await this.client.send(new QueryCommand(params));
      return Items[0];
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
      const queryParams: QueryCommandInput = {
        ExpressionAttributeNames: {
          "#pk": "type",
          "#ts": "timestamp",
        },
        ExpressionAttributeValues: {
          ":end": endUTCDate,
          ":start": startUTCDate,
          ":type": "packet",
        },
        IndexName: this.packetTableIndexName,
        KeyConditionExpression: "#pk = :type AND #ts BETWEEN :start AND :end",
        TableName: this.packetTableName,
      };

      const data = await this.client.send(new QueryCommand(queryParams));
      return data.Items ?? [];
    } catch (error) {
      logger.error("Error Scanning Packets between Dates", error);
      throw new Error("Error Scanning Packets between Dates");
    }
  }

  public async getDrivers() {
    try {
      const command = new ScanCommand({ TableName: this.driverTableName });
      const response = await this.client.send(command);
      return response.Items;
    } catch (error) {
      logger.error("Error getting drivers");
      throw new Error(error);
    }
  }

  public async getDriverNameUsingRfid(Rfid: string) {
    try {
      const command = new GetCommand({
        Key: { Rfid: Rfid },
        TableName: this.driverTableName,
      });
      const response = await this.client.send(command);

      if (!response.Item) {
        logger.warn(`No item found for Rfid: ${Rfid}`);
        return "Driver not found";
      }

      return response.Item.driver;
    } catch (error) {
      logger.error("Error getting driver name using the given Rfid");
      throw new Error(error.message);
    }
  }

  public async getDriverLaps(Rfid: string) {
    try {
      const lapCommand = new QueryCommand({
        ExpressionAttributeNames: { "#ts": "timestamp" },
        ExpressionAttributeValues: { ":Rfid": Rfid, ":minTimestamp": 0 },
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

  // Helper function to get lap table data
  public async getLapData() {
    try {
      const command = new ScanCommand({ TableName: this.lapTableName });

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

  // function for inserting lap timestamp via geofence into its table
  public async insertIntoGpsLapCountTable(
    rfid: string,
    timestamp: number,
  ): Promise<GenericResponse> {
    try {
      const command = new PutCommand({
        Item: {
          Rfid: rfid ?? "unknown driver",
          timestamp: timestamp,
          type: "gps-lap",
        },
        TableName: this.gpsTableName,
      });
      const response = await this.client.send(command);
      return {
        httpsStatusCode: response.$metadata.httpStatusCode,
        requestId: response.$metadata.requestId,
      };
    } catch (error) {
      logger.error("Error inserting gps table data");
      throw new Error(error);
    }
  }

  // // Helper function to put data into the lap table
  public async insertLapData(packet: ILapData): Promise<GenericResponse> {
    try {
      const command = new PutCommand({
        Item: {
          Rfid: packet.Rfid ?? "unknown driver",
          data: packet.data,
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
        ExpressionAttributeNames: {
          "#pk": "type",
        },
        ExpressionAttributeValues: {
          ":pkValue": "packet",
        },
        IndexName: this.packetTableIndexName,
        KeyConditionExpression: "#pk = :pkValue",
        Limit: 1,
        ScanIndexForward: true,
        TableName: this.packetTableName,
      });

      const lastCommand = new QueryCommand({
        ExpressionAttributeNames: {
          "#pk": "type",
        },
        ExpressionAttributeValues: {
          ":pkValue": "packet",
        },
        IndexName: this.packetTableIndexName,
        KeyConditionExpression: "#pk = :pkValue",
        Limit: 1,
        ScanIndexForward: false,
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
        Key: { Rfid: Rfid },
        TableName: this.driverTableName,
      });
      const rfidCheckReposonse = await this.client.send(getCommand);

      if (!rfidCheckReposonse.Item) {
        return { message: "Driver Rfid not found in driver table" };
      }

      // Update only the 'driver' field, keeping the existing Rfid
      const updateCommand = new UpdateCommand({
        ExpressionAttributeValues: { ":name": name },
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
