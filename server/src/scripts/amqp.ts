import amqp from 'amqplib';
import DatabaseService from './database';
import RaceService from './race';
import WebSocketService from './websocket';
import { RabbitMQ }  from "../config";
import TelemetryPacket, { LapData } from "../_objects/telemetry-data.interface"

export default class RabbitMQService {
    constructor() {
        this.rs = new RaceService();
        this.isLap = false;
        this.lastLapTimestamp = -1;
    }

    rs: RaceService;
    isLap: boolean;
    lastLapTimestamp: number;

    /**
     * Binds with rabbit mq server and sends data to websocket
     * @param db 
     * @param wss 
     */
    startQueue(db: DatabaseService, wss: WebSocketService) {
        db.lastLap()
        .then((lastLap) => {
            if(lastLap[0] != null) {
                this.lastLapTimestamp = lastLap[0].timestamp;
            }
        }).catch(() => {
            this.lastLapTimestamp = -1;
        });

        let rabbitmq = new RabbitMQ();
        amqp.connect(rabbitmq.host)
        // connect with amqp server
        .then((conn) => {
            return conn.createChannel();
        })
        // check if exchange exists and is valid
        .then((ch) => {
            const ex = rabbitmq.exchange_name;
            ch.assertExchange(ex, 'fanout', {durable: false});

            ch.assertQueue(rabbitmq.queue_name, {durable: false})
            .then( async (q) => {
                // bind internal queue with external exchange and enter ready state
                const ok = await ch.bindQueue(q.queue, ex, '');
                console.log(`Express: waiting for messages in ${q}`);
                return await ch.consume(q.queue, (msg) => {
                    const packet: TelemetryPacket = JSON.parse(
                        JSON.stringify(msg?.content)
                    ); // might work?

                    // save the data into database
                    // Process Packet Data
                    if (packet.Ccs.CcsAlive === true) {
                        try {
                            db.addPacket(packet)
                            .then(() => {
                                wss.broadcast(packet);
                            });
                        }
                        catch {
                            console.error('Could not insert packet into database');
                            wss.broadcast(packet);
                        }
                    }
                    else {
                        wss.broadcast(packet);
                    }

                    this.processLapData(packet, db, wss);
                    
                }, { noAck: true });
            });
        })
    }

    /**
     * calculates race data and pushes it out as a LapData
     * @param packet 
     * @param db 
     * @param wss 
     */
    private processLapData(packet: TelemetryPacket, db: DatabaseService, wss: WebSocketService) {
        // Process Lap data
        // Want to capture when button is released
        if (!packet.DriverControls.Lap && this.isLap) {
            const currentTimeStampEpoch = packet.TimeStamp;
            db.betweenLap(this.lastLapTimestamp, currentTimeStampEpoch)
            .then((allPackets) => {
                let timestamp = currentTimeStampEpoch;
                let averagePowerIn = this.rs.getAveragePowerIn(allPackets);
                let averagePowerOut = this.rs.getAveragePowerOut(allPackets);
                let averagePackCurrent = this.rs.getAveragePackCurrent(allPackets);
                let amphours = packet.Battery.PackAmphours;

                // Create Lap JSON Object
                let lap = new LapData(
                    timestamp,
                    timestamp - (this.lastLapTimestamp != -1 ? this.lastLapTimestamp : timestamp),
                    averagePowerIn,
                    averagePowerOut,
                    averagePowerOut - averagePowerIn,
                    this.rs.getDistanceTraveled(allPackets),
                    amphours,
                    averagePackCurrent,
                    this.rs.getSecondsRemainingUntilChargedOrDepleted(averagePackCurrent, amphours),
                    this.rs.getAverageSpeed(allPackets)
                );
                db.addLap(lap)
                    .then(() => {
                        wss.broadcast(lap);
                    });
                this.lastLapTimestamp = currentTimeStampEpoch;
            });
        }

        this.isLap = packet.DriverControls.Lap;
    }
}