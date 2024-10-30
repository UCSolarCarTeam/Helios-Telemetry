import { type BackendController } from "@/controllers/BackendController/BackendController";

import {
  type DynamoDBtypes,
  GenericResponse,
} from "@/datasources/DynamoDB/DynamoDB.types";

import { DynamoDBClient, GetItemCommand } from "@aws-sdk/client-dynamodb";
import { PutCommand } from "@aws-sdk/lib-dynamodb";
import type { ILapData, ITelemetryData } from "@shared/helios-types";

export class DynamoDB implements DynamoDBtypes {
  public client: DynamoDBClient;
  backendController: BackendController;

  constructor(backendController: BackendController) {
    try {
      this.backendController = backendController;
      this.client = new DynamoDBClient({ region: "ca-central-1" });
    } catch (error) {
      console.error("Error connecting to dynamo client");
      throw new Error(error);
    }
  }

  // Helper function to get playback table data
  public async getPacketData(date: Date) {
    //  add type to return
    try {
      const command = new GetItemCommand({
        TableName: "packet_data_table", // table name will change
        Key: {
          id: { N: date.getTime().toString() },
        },
      });
      const response = await this.client.send(command);

      console.log(response);
      // return it when other thigns figured out
      // return response;
    } catch (error) {
      console.error("Error getting playback table data");
      throw new Error(error);
    }
  }

  // // Helper function to get lap table data
  public async getLapData(date: Date) {
    try {
      const command = new GetItemCommand({
        TableName: "packet_data_table", // table name will change
        Key: {
          id: { N: date.getTime().toString() },
        },
      });
      const response = await this.client.send(command);
      // return it when actually works
      // return response;
    } catch (error) {
      console.error("Error getting lap table data");
      throw new Error(error);
    }
  }

  // // Helper function to put data into the packet table
  public async insertPacketData(
    packet: ITelemetryData,
  ): Promise<GenericResponse> {
    try {
      const command = new PutCommand({
        TableName:
          "amplify-d2m2fu81qyo9pl-amplifymain-branch-f78c72a9c8-TelemetryBackend00F6569C-1FJVDPO4O08BQ-packetdatatable4FB463D7-5B829FM0LUZ7",
        Item: {
          id: packet.TimeStamp.toString(),
          data: packet,
        },
      });
      const response = await this.client.send(command);
      console.log(response);
      return {
        httpsStatusCode: response.$metadata.httpStatusCode,
        requestId: response.$metadata.requestId,
      };
    } catch (error) {
      console.error("Error inserting playback table data");
      throw new Error(error);
    }
  }

  // // Helper function to put data into the lap table
  public async insertLapData(packet: ILapData): Promise<GenericResponse> {
    try {
      const command = new PutCommand({
        TableName: "lap_data_table", // replace with table name
        Item: {
          id: packet.timeStamp.toString(),
          data: packet,
        },
      });
      const response = await this.client.send(command);

      return {
        httpsStatusCode: response.$metadata.httpStatusCode,
        requestId: response.$metadata.requestId,
      };
    } catch (error) {
      console.error("Error inserting lap table data");
      throw new Error(error);
    }
  }

  // // Helper function getting first and last playback packets
  // public async getFirstAndLastPacketDates(): Promise<
  //   [Date | null, Date | null]
  // > {
  //   try {
  //     const firstPacketCommand = new QueryCommand({
  //       TableName: "packet_data_table",
  //       Limit: 1,
  //       ScanIndexForward: true, // Ascending order for the earliest date
  //       KeyConditionExpression: "#timeAdded BETWEEN :start AND :end",
  //       ExpressionAttributeNames: {
  //         "#timeAdded": "timeAdded",
  //       },
  //       ExpressionAttributeValues: {
  //         ":start": "1970-01-01T00:00:00Z",
  //         ":end": new Date().toISOString(),
  //       },
  //     });
  //     const firstPacketResponse = await this.client.send(firstPacketCommand);
  //     const firstDate =
  //       firstPacketResponse.Items && firstPacketResponse.Items.length > 0
  //         ? new Date(firstPacketResponse.Items[0].timeAdded)
  //         : null;

  //     const lastPacketCommand = new QueryCommand({
  //       TableName: "packet_data_table",
  //       Limit: 1,
  //       ScanIndexForward: false, // Descending order for the latest date
  //       KeyConditionExpression: "#timeAdded BETWEEN :start AND :end",
  //       ExpressionAttributeNames: {
  //         "#timeAdded": "timeAdded",
  //       },
  //       ExpressionAttributeValues: {
  //         ":start": "1970-01-01T00:00:00Z",
  //         ":end": new Date().toISOString(),
  //       },
  //     });
  //     const lastPacketResponse = await this.client.send(lastPacketCommand);
  //     const lastDate =
  //       lastPacketResponse.Items && lastPacketResponse.Items.length > 0
  //         ? new Date(lastPacketResponse.Items[0].timeAdded)
  //         : null;

  //     if (!firstDate) {
  //       throw new Error("First date not found");
  //     }

  //     if (!lastDate) {
  //       throw new Error("Last date not found");
  //     }

  //     return [firstDate, lastDate];
  //   } catch (error) {
  //     throw new Error(error.message);
  //   }
  // }

  //Close the connection to the database
  public close(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.client = null;
      resolve();
    });
  }
}

export default DynamoDB;
