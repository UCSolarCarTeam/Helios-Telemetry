import SQLite from "@/controllers/SQLite";
import SocketIO from "@/controllers/SocketIO";

const socket = new SocketIO();

const sql = new SQLite("./database.sql");
