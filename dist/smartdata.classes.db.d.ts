/// <reference types="q" />
import * as plugins from './smartdata.plugins';
import { Objectmap } from 'lik';
import { DbCollection } from './smartdata.classes.dbcollection';
export declare type TConnectionStatus = 'disconnected' | 'connected' | 'failed';
export declare class Db {
    dbUrl: string;
    db: plugins.mongodb.Db;
    status: TConnectionStatus;
    collections: Objectmap<DbCollection<any>>;
    constructor(dbUrl: string);
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
}
