// import SQLite from "@/controllers/SQLite";
import SocketIO from "@/controllers/SocketIO";
import { SolarMQTTClient } from "@/controllers/SolarMQTTClient";
import { logger } from "@/index";
import { generateFakeTelemetryData } from "@/utils/fakeData";

export default function main() {
  let carLatency = 0;

  const socket = new SocketIO();
  const messageRcv = (msg: Buffer) => {
    socket.sendPacket(JSON.parse(msg.toString()));
  };
  const mqtt = new SolarMQTTClient(messageRcv);

  setInterval(() => {
    carLatency = mqtt.calculatePing();
    socket.broadcastCarLatency(carLatency);
    logger.info("Car Latency: ", carLatency.toString());
  }, 5000);

  //   const sql = new SQLite("./database.sql");

  const intervalID = setInterval(() => {
    const packet = generateFakeTelemetryData();
    logger.info(
      `Battery Average Voltage: ${JSON.stringify(packet.Battery.AverageCellVoltage)}V`,
    );
    socket.sendPacket(packet);
  }, 2500);
}
