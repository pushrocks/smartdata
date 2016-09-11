/// <reference types="q" />
import * as plugins from './smartdata.plugins';
export declare class DbCollection<T> {
    constructor(nameArg: string, db: plugins.mongodb.Db);
}
export declare type TDbConnectionStatus = 'disconnected' | 'connected' | 'failed';
export declare class DbConnection {
    dbUrl: string;
    db: plugins.mongodb.Db;
    status: TDbConnectionStatus;
    constructor(dbUrl: string);
    connect(): plugins.q.Promise<any>;
    close(): plugins.q.Promise<any>;
}
