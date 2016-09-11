import * as plugins from './smartdata.plugins'
import { DbConnection } from './smartdata.classes.dbconnection'

export class DbCollection<T> {
    collection: plugins.mongodb.Collection
    constructor(nameArg: string, dbConnectionArg: DbConnection) {
        this.collection = dbConnectionArg.db.collection(nameArg)
    }

    /**
     * adds a validation function that all newly inserted and updated objects have to pass
     */
    addObjectValidation(){}

    /**
     * inserts am object into the DbCollection
     */
    insert(objectArg: T) {}

    /**
     * inserts many objects at once into the DbCollection
     */
    insertMany(objectArrayArg: T[]) {}
}
