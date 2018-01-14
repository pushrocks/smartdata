import * as plugins from "./smartdata.plugins";
import { Db } from "./smartdata.classes.db";
import { DbDoc } from "./smartdata.classes.dbdoc";
import { WriteResult } from "rethinkdb";
export interface IFindOptions {
    limit?: number;
}
/**
 *
 */
export interface IDocValidationFunc<T> {
    (doc: T): boolean;
}
/**
 * This is a decorator that will tell the decorated class what dbTable to use
 * @param db
 */
export declare function Table(db: Db): (constructor: any) => void;
export declare class DbTable<T> {
    /**
     * the collection that is used
     */
    table: plugins.rethinkDb.Table;
    objectValidation: IDocValidationFunc<T>;
    tableName: string;
    db: Db;
    constructor(collectedClassArg: T & DbDoc<T>, dbArg: Db);
    init(): Promise<void>;
    /**
     * adds a validation function that all newly inserted and updated objects have to pass
     */
    addDocValidation(funcArg: IDocValidationFunc<T>): void;
    /**
     * finds an object in the DbCollection
     */
    find(filterObject: any): Promise<any>;
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
