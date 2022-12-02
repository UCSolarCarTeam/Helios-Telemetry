import mongoDB from "mongodb";
const { MongoClient } = require('mongodb');
import * as dotenv from "dotenv";

export class database {
    constructor() {
        dotenv.config();
        this.uri = 'mongodb+srv://JensVarughese:test1234@cluster0.63bmf.mongodb.net/test';
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

