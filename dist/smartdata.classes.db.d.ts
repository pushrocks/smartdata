import * as plugins from './smartdata.plugins';
import { Objectmap } from 'lik';
import { DbTable } from './smartdata.classes.dbcollection';
import { ConnectionOptions } from 'rethinkdb';
/**
 * interface - indicates the connection status of the db
 */
export declare type TConnectionStatus = 'initial' | 'disconnected' | 'connected' | 'failed';
export declare class Db {
    dbName: string;
    connectionOptions: plugins.rethinkDb.ConnectionOptions;
    dbConnection: plugins.rethinkDb.Connection;
    status: TConnectionStatus;
    dbTablesMap: Objectmap<DbTable<any>>;
    constructor(connectionOptionsArg: ConnectionOptions);
    /**
     * supply additional SSl options
     */
    setSsl(certificateStringArg: string, formatArg: 'base64' | 'clearText'): void;
    /**
     * connects to the database that was specified during instance creation
     */
    connect(): Promise<any>;
    /**
     * closes the connection to the databse
     */
    close(): Promise<any>;
    /**
     * Gets a table's name and returns smartdata's DbTable class
     * @param nameArg
     * @returns DbTable
     */
    getDbTableByName<T>(nameArg: string): Promise<DbTable<T>>;
    addTable(dbCollectionArg: DbTable<any>): void;
}
