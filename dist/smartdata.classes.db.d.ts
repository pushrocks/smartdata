import * as plugins from './smartdata.plugins';
import { Objectmap } from 'lik';
import { DbCollection } from './smartdata.classes.dbcollection';
/**
 * interface - indicates the connection status of the db
 */
export declare type TConnectionStatus = 'disconnected' | 'connected' | 'failed';
export declare class Db {
    dbUrl: string;
    db: plugins.mongodb.Db;
    status: TConnectionStatus;
    collections: Objectmap<DbCollection<any>>;
    constructor(dbUrlArg: string);
    /**
     * connects to the database that was specified during instance creation
     */
    connect(): Promise<any>;
    /**
     * closes the connection to the databse
     */
    close(): Promise<any>;
    /**
     * gets a collection by name: string
     */
    getCollectionByName<T>(nameArg: string): Promise<DbCollection<T>>;
    addCollection(dbCollectionArg: DbCollection<any>): void;
}
