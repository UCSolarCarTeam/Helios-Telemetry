import sqlite3 from "sqlite3";

import type ITelemetryData from "@/client/objects/telemetry-data.interface";

class SQLite {
  private db: sqlite3.Database;

  constructor(dbPath: string) {
    this.db = new sqlite3.Database(dbPath, (err: Error | null) => {
      if (err) {
        console.error("Error opening database:", err.message);
      } else {
        console.log("Connected to the SQLite database.");
      }
    }) as sqlite3.Database;

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
          const telemetryData: ITelemetryData[] = rows.map((row: any) => ({
            ...row,
            data: JSON.parse(row.data),
          }));
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

  //TODO: change to lap data type.
  public insertLapData(packet: any): Promise<{ id: number }> {
    const sql = "INSERT INTO lapData (date, data) VALUES (?, ?)";
    const data = JSON.stringify(packet); // Serialize ITelemetryData to JSON
    return this.runQuery(sql, [packet.TimeStamp, data]);
  }

  public getPacketData(): Promise<ITelemetryData[]> {
    const sql = "SELECT * FROM packetData";
    return this.getAllRows(sql);
  }

  //TODO: change to lap data type.
  public getLapData(): Promise<any[]> {
    const sql = "SELECT * FROM lapData";
    return this.getAllRows(sql);
  }

  //Close the connection to the database
  public close(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.db.close((err) => {
        if (err) {
          reject(new Error(`Error closing the database: ${err}`));
        } else {
          resolve();
        }
      });
    });
  }
}

export default SQLite;
