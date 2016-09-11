import * as plugins from './smartdata.plugins';
import { DbConnection } from './smartdata.classes.dbconnection';
export declare class DbCollection<T> {
    collection: plugins.mongodb.Collection;
    constructor(nameArg: string, dbConnectionArg: DbConnection);
    /**
     * adds a validation function that all newly inserted and updated objects have to pass
     */
    addObjectValidation(): void;
    /**
     * inserts am object into the DbCollection
     */
    insert(objectArg: T): void;
    /**
     * inserts many objects at once into the DbCollection
     */
    insertMany(objectArrayArg: T[]): void;
}
