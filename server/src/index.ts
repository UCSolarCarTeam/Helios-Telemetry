// @ts-check
import * as http from 'http';
import { debug } from 'console';
import express from 'express';
import Database from "./scripts/database";
import Config from "./config"
//const express = require('express');
const app = express();

/**
 * Create HTTP server and setup websocket
 */
 const server = http.createServer(app);

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
 db.connectToDatabase().then(() => {
    console.log('connected to database');
 });