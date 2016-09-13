/// <reference types="q" />
import * as plugins from './smartdata.plugins';
import { Db } from './smartdata.classes.db';
export interface IFindOptions {
    limit?: number;
}
export declare function Collection(db: Db): (constructor: any) => void;
export declare class DbCollection<T> {
    collection: plugins.mongodb.Collection;
    name: string;
    constructor(nameArg: string, dbArg: Db);
    /**
     * adds a validation function that all newly inserted and updated objects have to pass
     */
    addObjectValidation(funcArg: any): void;
    /**
     * finds an object in the DbCollection
     */
    find(docMatchArg: T | any, optionsArg?: IFindOptions): plugins.q.Promise<T[]>;
    /**
     * inserts  object into the DbCollection
     */
    insertOne(docArg: T): plugins.q.Promise<void>;
    /**
     * inserts many objects at once into the DbCollection
     */
    insertMany(docArrayArg: T[]): plugins.q.Promise<void>;
    private checkDoc(doc);
}
