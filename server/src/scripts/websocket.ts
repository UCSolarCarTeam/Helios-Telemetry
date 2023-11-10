import { type Server, WebSocket } from "ws";
import type * as http from "http";
import { type LapData } from "../_objects/telemetry-data.interface";
import type TelemetryPacket from "../_objects/telemetry-data.interface";
import type DatabaseService from "./database";

export default class WebSocketService {
  constructor(server: http.Server) {
    this.wss = new WebSocket.Server({ server });
  }

  wss: Server<WebSocket>;

  /**
   * Starts up the web socket
   * @param db database class instance
   */
  startWebSocket(db: DatabaseService) {
    this.wss.on("connection", function (ws, req) {
      // when client connects, fetch last row in db
      console.log("New client connected!");
      db.lastPacket()
        // send to client
        .then((lastRow: TelemetryPacket[]) => {
          // lastRow['msgType'] = 'packet';
          const packet = lastRow[0];
          ws.send(JSON.stringify(packet));
        })
        // send error if cannot fetch last row
        .catch((err) => {
          ws.send(err);
        });
      db.getLaps().then((laps: LapData[]) => {
        laps.sort((a: LapData, b: LapData) =>
          a.timestamp > b.timestamp ? 1 : -1,
        );
        laps.forEach((lap) => {
          ws.send(JSON.stringify(lap));
        });
      });
    });
  }

  /**
   * Sends the packets to all connected clients
   * @param data The new telemetry packet to be broadcasted
   */
  broadcast(data: any) {
    this.wss.clients.forEach(function each(client) {
      try {
        client.send(JSON.stringify(data));
      } catch {
        console.log("Cannot send packet. Client no longer exits..");
      }
    });
  }
}
