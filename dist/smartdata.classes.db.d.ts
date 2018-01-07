import * as plugins from './smartdata.plugins';
import { Objectmap } from 'lik';
import { DbCollection } from './smartdata.classes.dbcollection';
/**
 * interface - indicates the connection status of the db
 */
export declare type TConnectionStatus = 'disconnected' | 'connected' | 'failed';
export declare class Db {
    dbUrl: string;
    dbConnection: plugins.rethinkDb.Connection;
    status: TConnectionStatus;
    classCollections: Objectmap<DbCollection<any>>;
    objectCollections: Objectmap<DbCollection<any>>;
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
     * gets a class based collection by name: string
     */
    getClassCollectionByName<T>(nameArg: string): Promise<DbCollection<T>>;
    /**
     * gets an object collection by name
     */
    getObjectCollectionByName<T>(nameArg: string, dbArg: Db, makeNewArg?: boolean): Promise<DbCollection<T>>;
    addCollection(dbCollectionArg: DbCollection<any>): void;
}
