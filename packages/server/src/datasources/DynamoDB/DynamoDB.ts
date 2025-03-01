import { v4 as uuidv4 } from "uuid";

import { type BackendController } from "@/controllers/BackendController/BackendController";

import {
  type DynamoDBtypes,
  GenericResponse,
} from "@/datasources/DynamoDB/DynamoDB.types";

import { createLightweightApplicationLogger } from "@/utils/logger";

import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import {
  GetCommand,
  PutCommand,
  QueryCommand,
  ScanCommand,
  ScanCommandInput,
  UpdateCommand,
} from "@aws-sdk/lib-dynamodb";
import { unmarshall } from "@aws-sdk/util-dynamodb";
import type { ILapData, ITelemetryData } from "@shared/helios-types";

if (!process.env.LAP_TABLE_NAME) {
  throw new Error("Lap table name not defined");
}

if (!process.env.PACKET_TABLE_NAME) {
  throw new Error("Packet table name not defined");
}

// if (!process.env.DRIVER_TABLE_NAME) {
//   throw new Error("Driver table name not defined");
// }

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
      logger.error("Error getting playback table data: " + error.message);
      throw new Error(error.message);
    }
  }

  public async scanPacketDataBetweenDates(
    startUTCDate: number,
    endUTCDate: number,
  ) {
    try {
      const params: ScanCommandInput = {
        ScanFilter: {
          timestamp: {
            AttributeValueList: [{ N: startUTCDate }, { N: endUTCDate }],
            ComparisonOperator: "BETWEEN",
          },
        },
        TableName: this.packetTableName,
      };

      let lastEvaluatedKey;
      do {
        const command = new ScanCommand(params);
        const response = await this.client.send(command);
        const items = response.Items
          ? response.Items.map((item) => unmarshall(item))
          : [];

        lastEvaluatedKey = response.LastEvaluatedKey;
        if (lastEvaluatedKey) {
          params.ExclusiveStartKey = lastEvaluatedKey;
        }
      } while (lastEvaluatedKey);
    } catch (error) {
      logger.error(" Error Scanning Packets between Dates");
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
      logger.error("Error getting lap data for driver");
      throw new Error(error);
    }
  }

  public async getDriverLaps(rfid) {
    try {
      const command = new QueryCommand({
        ExpressionAttributeValues: {
          ":rfid": rfid,
        },
        KeyConditionExpression: "rfid = :rfid",
        TableName: this.driverTableName,
      });

      const response = await this.client.send(command);
      return response.Items;
    } catch (error) {
      logger.error("Error getting lap data for driver");
      throw new Error(error);
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
          data: packet,
          rfid: uuidv4(),
          timestamp: packet.data.timeStamp,
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
          ":id": "packet",
        },
        KeyConditionExpression: "id = :id",
        Limit: 1,
        ScanIndexForward: true, // Ascending order → earliest timestamp
        TableName: this.packetTableName,
      });

      const lastCommand = new QueryCommand({
        ExpressionAttributeValues: {
          ":id": "packet",
        },
        KeyConditionExpression: "id = :id",
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

  public async updateDriverInfo(rfid: string, name: string) {
    try {
      // Ensure rfid is a string (DynamoDB is type-sensitive)
      if (typeof rfid !== "string") {
        throw new Error("RFID must be a string");
      }

      // Check if the RFID exists in the driver table
      const getCommand = new GetCommand({
        Key: {
          rfid: rfid,
        },
        TableName: this.driverTableName,
      });
      const rfidCheckReposonse = await this.client.send(getCommand);

      if (!rfidCheckReposonse.Item) {
        return { message: "Driver RFID not found in driver table" };
      }

      // Update only the 'driver' field, keeping the existing RFID
      const updateCommand = new UpdateCommand({
        ExpressionAttributeValues: {
          ":name": name,
        },
        Key: { rfid: rfid },
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
