import sqlite3 from "sqlite3";

import type ITelemetryData from "@/client/objects/telemetry-data.interface";
import type ILapData from "@/client/objects/telemetry-data.interface";

export class SQLite {
  private db: sqlite3.Database;
  constructor(dbPath: string) {
    this.db = new sqlite3.Database(dbPath, (err: Error | null) => {
      if (err) {
        console.error("Error opening database:", err.message);
      } else {
        console.log("Connected to the SQLite database.");
      }
    });

    this.db
      .prepare(
        "CREATE TABLE IF NOT EXISTS packetData (id INTEGER PRIMARY KEY, date TEXT, data TEXT)",
      )
      .run()
      .finalize();
    this.db
      .prepare(
        "CREATE TABLE IF NOT EXISTS lapData (id INTEGER PRIMARY KEY, date TEXT, data TEXT)",
      )
      .run()
      .finalize();
  }

  //Helper function to run a query
  private runQuery(sql: string, params: any[]): Promise<{ id: number }> {
    return new Promise((resolve, reject) => {
      this.db.run(
        sql,
        params,
        function (this: sqlite3.RunResult, err: Error | null) {
          if (err) {
            reject(new Error(`Error running SQL: ${err.message}`));
          } else {
            resolve({ id: this.lastID });
          }
        },
      );
    });
  }

  //Helper function to get all rows
  private getAllRows(sql: string): Promise<ITelemetryData[]> {
    return new Promise<ITelemetryData[]>((resolve, reject) => {
      this.db.all(sql, (err: Error | null, rows: any[]) => {
        if (err) {
          reject(new Error(`Error retrieving data: ${err.message}`));
        } else {
          // Deserialize JSON strings to ITelemetryData objects
          const telemetryData = rows.map((row) => JSON.parse(row.data));
          resolve(telemetryData);
        }
      });
    });
  }

  //Four basic insert and select functions
  public insertPacketData(packet: ITelemetryData): Promise<{ id: number }> {
    const sql = "INSERT INTO packetData (date, data) VALUES (?, ?)";
    const data = JSON.stringify(packet); // Serialize ITelemetryData to JSON
    return this.runQuery(sql, [packet.TimeStamp, data]);
  }
  public insertLapData(packet: ILapData): Promise<{ id: number }> {
    const sql = "INSERT INTO lapData (date, data) VALUES (?, ?)";
    const data = JSON.stringify(packet); // Serialize ITelemetryData to JSON
    return this.runQuery(sql, [packet.TimeStamp, data]);
  }

  public getPacketData(): Promise<ITelemetryData[]> {
    const sql = "SELECT * FROM packetData";
    return this.getAllRows(sql);
  }
  public getLapData(): Promise<ITelemetryData[]> {
    const sql = "SELECT * FROM lapData";
    return this.getAllRows(sql);
  }

  //Close the connection to the database
  public close(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.db.close((err) => {
        if (err) {
          reject(new Error(`Error closing the database: ${err.message}`));
        } else {
          resolve();
        }
      });
    });
  }
}

export default SQLite;
