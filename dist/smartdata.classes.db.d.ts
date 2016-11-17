/// <reference types="q" />
import * as plugins from './smartdata.plugins';
import { Objectmap } from 'lik';
import { DbCollection } from './smartdata.classes.dbcollection';
/**
 * interface - indicates the database type
 */
export declare type TDbType = 'mongodb' | 'nedb';
/**
 * interface - indicates the connection status of the db
 */
export declare type TConnectionStatus = 'disconnected' | 'connected' | 'failed';
export declare class Db {
    dbType: TDbType;
    dbUrl: string;
    db: plugins.mongodb.Db;
    status: TConnectionStatus;
    collections: Objectmap<DbCollection<any>>;
    constructor(dbUrlArg: string, dbTypeArg?: TDbType);
    /**
     * connects to the database that was specified during instance creation
     */
    connect(): plugins.q.Promise<any>;
    /**
     * closes the connection to the databse
     */
    close(): plugins.q.Promise<any>;
    /**
     * gets a collection by name: string
     */
    getCollectionByName<T>(nameArg: string): plugins.q.Promise<DbCollection<T>>;
    addCollection(dbCollectionArg: DbCollection<any>): void;
}
