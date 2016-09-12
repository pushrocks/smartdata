/// <reference types="q" />
import * as plugins from './smartdata.plugins';
import { DbConnection } from './smartdata.classes.dbconnection';
export declare class DbCollection<T> {
    collection: plugins.mongodb.Collection;
    constructor(nameArg: string, dbConnectionArg: DbConnection);
    /**
     * adds a validation function that all newly inserted and updated objects have to pass
     */
    addObjectValidation(funcArg: any): void;
    /**
     * finds an object in the DbCollection
     */
    find(docMatchArg: T): plugins.q.Promise<T[]>;
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
