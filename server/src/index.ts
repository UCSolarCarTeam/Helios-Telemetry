// @ts-check
import * as http from "http";
import { debug } from "console";
import express from "express";
import Database from "./scripts/database";
import Config from "./config";
import WebSocketService from "./scripts/websocket";
import RabbitMQService from "./scripts/amqp";
import ExpressRouter from "./app";
const app = express();

/**
 * Create HTTP server and setup websocket
 */
export const server = http.createServer(app);

server.listen(Config.port);

server.on("error", function (error) {
  console.error(error.message);
  process.exit(1);
});

/**
 * Event listener for HTTP server "listening" event.
 */
server.on("listening", function () {
  const addr = server.address();
  const bind = typeof addr === "string" ? "pipe " + addr : "port " + addr?.port;
  const mode = app.get("env");
  debug("Listening on " + bind + " in " + mode + " mode");
});

module.exports.server = server;

const db = new Database();
const ws = new WebSocketService(server);
const mq = new RabbitMQService();
const er = new ExpressRouter();

db.connectToDatabase().then(() => {
  console.log("connected to database");
  ws.startWebSocket(db);
  er.setRoutes(db);
  if (Config.isProd) {
    mq.startQueue(db, ws);
  }
});
