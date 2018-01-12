import * as plugins from './smartdata.plugins';
import { Db } from './smartdata.classes.db';
import { DbDoc } from './smartdata.classes.dbdoc';
import { WriteResult, Cursor } from 'rethinkdb';
export interface IFindOptions {
    limit?: number;
}
export interface IDocValidation<T> {
    (doc: T): boolean;
}
export declare function Collection(db: Db): (constructor: any) => void;
export declare class DbTable<T> {
    /**
     * the collection that is used, defaults to mongodb collection,
     * can be nedb datastore (sub api of mongodb)
     */
    table: plugins.rethinkDb.Table;
    objectValidation: IDocValidation<T>;
    tableName: string;
    db: Db;
    constructor(collectedClassArg: T & DbDoc<T>, dbArg: Db);
    init(): Promise<void>;
    /**
     * adds a validation function that all newly inserted and updated objects have to pass
     */
    addDocValidation(funcArg: IDocValidation<T>): void;
    /**
     * finds an object in the DbCollection
     */
    find(): Promise<Cursor>;
    /**
     * create an object in the database
     */
    insert(dbDocArg: T & DbDoc<T>): Promise<WriteResult>;
    /**
     * inserts object into the DbCollection
     */
    update(dbDocArg: T & DbDoc<T>): Promise<WriteResult>;
    /**
     * checks a Doc for constraints
     * if this.objectValidation is not set it passes.
     */
    private checkDoc(docArg);
    extractKey(writeResult: WriteResult): void;
}
