import type { IncomingMessage, Server, ServerResponse } from "http";
import { type WebSocket, WebSocketServer } from "ws";

import { type BackendController } from "@/controllers/BackendController/BackendController";

import { type WebSocketType } from "@/datasources/WebSocket/WebSocket.types";

import { createLightweightApplicationLogger } from "@/utils/logger";

import type { ILapData, ITelemetryData } from "@shared/helios-types";

const logger = createLightweightApplicationLogger("WebSocket.ts");

export class NativeWebSocket implements WebSocketType {
  wss: WebSocketServer;
  backendController: BackendController;
  constructor(
    wsPath: string,
    httpsServer: Server<typeof IncomingMessage, typeof ServerResponse>,
    backendController: BackendController,
  ) {
    this.backendController = backendController;
    this.wss = new WebSocketServer({
      path: wsPath,
      server: httpsServer,
    });

    this.wss.on("connection", (ws: WebSocket, req: IncomingMessage) => {
      logger.info(
        `WebSocket client connected from ${req.socket.remoteAddress}`,
      );
      this.initializeWebSocketListeners(ws);
      ws.send(
        JSON.stringify({
          message: "Connected to Helios Telemetry WebSocket",
          type: "connection",
        }),
      );
    });
  }

  public broadcastPacket(packet: ITelemetryData): void {
    if (this.wss.clients.size === 0) {
      logger.debug("No WebSocket clients connected, skipping broadcast");
      return;
    }
    const message = {
      data: packet,
      type: "packet",
    };
    this.wss.clients.forEach((ws) => {
      try {
        ws.send(JSON.stringify(message));
      } catch (error) {
        logger.error("Error broadcasting telemetry packet to WS", error);
      }
    });
  }

  public broadcastLapData(lapData: ILapData): void {
    if (this.wss.clients.size === 0) {
      logger.debug("No WebSocket clients connected, skipping broadcast");
      return;
    }

    const message = {
      data: lapData,
      type: "lapData",
    };
    this.wss.clients.forEach((ws) => {
      try {
        ws.send(JSON.stringify(message));
      } catch (error) {
        logger.error("Error broadcasting lap data to WS", error);
      }
    });
  }

  public initializeWebSocketListeners(ws: WebSocket): void {
    ws.on("close", () => {
      logger.info("WebSocket client disconnected");
    });

    ws.on("error", (error: Error) => {
      logger.error("WebSocket error:", error);
    });
  }
}

export default NativeWebSocket;
