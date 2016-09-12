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
    addObjectValidation(funcArg){}

    /**
     * finds an object in the DbCollection
     */
    find(docMatchArg: T): T[] {
        return this.collection.find().toArray()
    }

    /**
     * inserts  object into the DbCollection
     */
    insertOne(docArg: T): PromiseLike<void> {
        return this.collection.insertOne(docArg)
    }

    /**
     * inserts many objects at once into the DbCollection
     */
    insertMany(docArrayArg: T[]): void {

    }
}
