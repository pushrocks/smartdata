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
    addObjectValidation(funcArg) { }

    /**
     * finds an object in the DbCollection
     */
    find(docMatchArg: T): plugins.q.Promise<T[]> {
        let done = plugins.q.defer<T[]>()
        this.collection.find(docMatchArg).toArray((err, docs) => {
            if (err) { throw err }
            done.resolve(docs)
        })
        return done.promise
    }

    /**
     * inserts  object into the DbCollection
     */
    insertOne(docArg: T): plugins.q.Promise<void> {
        let done = plugins.q.defer<void>()
        this.checkDoc(docArg).then(() => {
            this.collection.insertOne(docArg)
                .then(() => { done.resolve() })
        })
        return done.promise
    }

    /**
     * inserts many objects at once into the DbCollection
     */
    insertMany(docArrayArg: T[]): plugins.q.Promise<void> {
        let done = plugins.q.defer<void>()
        let checkDocPromiseArray: plugins.q.Promise<void>[] = []
        for (let docArg of docArrayArg){
            checkDocPromiseArray.push(this.checkDoc(docArg))
        }
        plugins.q.all(checkDocPromiseArray).then(() => {
            this.collection.insertMany(docArrayArg)
                .then(() => { done.resolve() })
        })
        return done.promise
    }

    private checkDoc(doc: T): plugins.q.Promise<void> {
        let done = plugins.q.defer<void>()
        done.resolve()
        return done.promise
    }
}
