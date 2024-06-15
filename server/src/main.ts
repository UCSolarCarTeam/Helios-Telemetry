// import SQLite from "@/controllers/SQLite";
import SocketIO from "@/controllers/SocketIO";
import { logger } from "@/index";
import { generateFakeTelemetryData } from "@/utils/fakeData";

export default function main() {
  const socket = new SocketIO();

  //   const sql = new SQLite("./database.sql");
  const LATENCY = () => Math.random() * 100;

  const intervalID = setInterval(() => {
    const packet = generateFakeTelemetryData();
    logger.info(
      `Battery Average Voltage: ${JSON.stringify(packet.Battery.AverageCellVoltage)}V`,
    );
    socket.sendPacket(packet);
    socket.broadcastCarLatency(LATENCY());
  }, 2500);
}
