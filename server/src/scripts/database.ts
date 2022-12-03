import mongoDB from "mongodb";
const { MongoClient } = require('mongodb');
import { Config } from "../config"

export class database {
    constructor() {
        this.uri = Config.mongoUri;
        this.client = new MongoClient(this.uri);
        this.db = this.client.db('Elysia');
    }
    uri: string;
    client: mongoDB.MongoClient;
    db: mongoDB.Db;
    // collection = this.db.collection('Packets');
    // lapCollection = this.db.collection('Laps');
    
    connectToDatabase() {
        return this.client.connect();
    }
}

