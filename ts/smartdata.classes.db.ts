import * as plugins from "./smartdata.plugins";
import { Objectmap } from "lik";

import { DbTable } from "./smartdata.classes.dbtable";

import { Connection as dbConnection, ConnectionOptions } from "rethinkdb";

/**
 * interface - indicates the connection status of the db
 */
export type TConnectionStatus =
  | "initial"
  | "disconnected"
  | "connected"
  | "failed";

export class Db {
  dbName: string;
  connectionOptions: plugins.rethinkDb.ConnectionOptions;
  dbConnection: plugins.rethinkDb.Connection;
  status: TConnectionStatus;
  dbTablesMap = new Objectmap<DbTable<any>>();

  constructor(connectionOptionsArg: ConnectionOptions) {
    this.dbName = connectionOptionsArg.db;
    this.connectionOptions = connectionOptionsArg;
    this.status = "initial";
  }

  /**
   * supply additional SSl options needed to connect to certain Rethink DB servers (e.g. compose.io)
   */
  setSsl(certificateStringArg: string, formatArg: "base64" | "clearText") {
    let certificateString: string;
    if ((formatArg = "base64")) {
      certificateString = plugins.smartstring.base64.decode(
        certificateStringArg
      );
    } else {
      certificateString = certificateStringArg;
    }
    this.connectionOptions["ssl"] = {
      ca: Buffer.from(certificateString)
    };
  }

  // basic connection stuff ----------------------------------------------

  /**
   * connects to the database that was specified during instance creation
   */
  async connect(): Promise<any> {
    this.dbConnection = await plugins.rethinkDb.connect(this.connectionOptions);
    this.dbConnection.use(this.dbName);
    this.status = "connected";
    plugins.beautylog.ok(`Connected to database ${this.dbName}`);
  }

  /**
   * closes the connection to the databse
   */
  async close(): Promise<any> {
    await this.dbConnection.close();
    this.status = "disconnected";
    plugins.beautylog.ok(`disconnected from database ${this.dbName}`);
  }

  // handle table to class distribution

  addTable(dbTableArg: DbTable<any>) {
    this.dbTablesMap.add(dbTableArg);
  }

  /**
   * Gets a table's name and returns smartdata's DbTable class
   * @param nameArg
   * @returns DbTable
   */
  async getDbTableByName<T>(nameArg: string): Promise<DbTable<T>> {
    let resultCollection = this.dbTablesMap.find(dbTableArg => {
      return dbTableArg.tableName === nameArg;
    });
    return resultCollection;
  }
}
