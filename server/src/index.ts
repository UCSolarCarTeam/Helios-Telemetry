// @ts-check
import * as http from 'http';
import { debug } from 'console';
import express from 'express';
import Database from "./scripts/database";
import Config from "./config"
import WebSocketService from './scripts/websocket';
import RabbitMQService from './scripts/amqp';
//const express = require('express');
const app = express();

/**
 * Create HTTP server and setup websocket
 */
 export const server = http.createServer(app);

 server.listen(Config.port);

 server.on('error', function(error) {
    console.error(error.message);
    process.exit(1);
  });

 /**
 * Event listener for HTTP server "listening" event.
 */
server.on('listening', function() {
    const addr = server.address();
    const bind = typeof addr === 'string'
      ? 'pipe ' + addr
      : 'port ' + addr?.port;
    const mode = app.get('env');
    debug('Listening on ' + bind + ' in ' + mode + ' mode');
  });

  module.exports.server = server;

 let db = new Database();
 let ws = new WebSocketService(server);
 let mq = new RabbitMQService();
 db.connectToDatabase().then(() => {
    console.log('connected to database');
    ws.startWebSocket(db);
    if(Config.isProd) {
      mq.startQueue(db, ws);
    }
 });