import mongoDB, { Collection, Filter} from "mongodb";
const { MongoClient } = require('mongodb');
import Config  from "../config"
import TelemetryPacket, { LapData } from "../_objects/telemetry-data.interface"

export default class Database {
    constructor() {
        let uri = Config.mongoUri;
        this.client = new MongoClient(uri);

        let db = this.client.db('Elysia');
        this.collection = db.collection("Packets");
        this.lapCollection = db.collection("Laps");
    }

    client: mongoDB.MongoClient;
    collection: Collection<TelemetryPacket>;
    lapCollection: Collection<LapData>;
    
    /**
     * Connects to the mongo database
     * @returns {Promise}
     */
    connectToDatabase() {
        return this.client.connect();
    }

    /**
     * Adds a telemetry packet into Packets collection
     * @param packet 
     * @returns {Promise}
     */
    addPacket(packet: TelemetryPacket) {
        return this.collection.insertOne(packet);
    }

    /**
     * Gets the most recent packet from Packets collection
     * @returns {Promise}
     */
    lastPacket() {
        return this.collection.find().sort({TimeStamp: -1}).limit(1).toArray();
    }

    /**
     * Gets the packets between the two timestamps at the specified page size
     * @param lowestTime lower time bound in time unix milliseconds
     * @param highestTime higher time bound in time unix milliseconds
     * @param page page number for pagination
     * @param pageSize size of each page
     * @returns {Promise}
     */
    between(lowestTime: number, highestTime: number, page: number = 1, pageSize: number = 10) { 
        if(pageSize > 120) {
            pageSize = 120;
        }

        const filter: Filter<TelemetryPacket> = {
            TimeStamp: {$gte: lowestTime, $lte: highestTime}
        };

        return this.collection.find(filter).skip((page - 1) * pageSize).limit(pageSize).toArray();
    };

    //
    /**
     * Gets all the packets between two timestamps of a lap
     * @param startTime start of lap in time unix milliseconds
     * @param endTime end of lap in time unix milliseconds
     * @returns {Promise}
     */
    betweenLap(startTime: number, endTime: number) {
        const filter: Filter<TelemetryPacket> = {
            TimeStamp: {$gte: startTime, $lte: endTime}
        };
        
        return this.collection.find(filter).sort({TimeStamp : -1}).limit(1200).toArray();
    }

    /**
     * Gets the 80 most recent laps (Not eveery lap to improve load times)
     * @returns {Promise}
     */
    getLaps() {
        return this.lapCollection.find().sort({timestamp : -1}).limit(80).toArray();
    };

    /**
     * Get the most recent lap
     * @returns {Promise}
     */
    lastLap() {
        return this.lapCollection.find().sort({timestamp : -1}).limit(1).toArray();
    };

    /**
     * Adds a lap to the Laps collection
     * @param lap the lap to be added
     * @returns {Promise}
     */
    addLap(lap: LapData) {
        return this.lapCollection.insertOne(lap);
    };
}

