/// <reference types="q" />
import * as plugins from './smartdata.plugins';
export declare type TConnectionStatus = 'disconnected' | 'connected' | 'failed';
export declare class Db {
    dbUrl: string;
    db: plugins.mongodb.Db;
    status: TConnectionStatus;
    constructor(dbUrl: string);
    connect(): plugins.q.Promise<any>;
    close(): plugins.q.Promise<any>;
}
