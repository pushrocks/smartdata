import * as plugins from './smartdata.plugins'
import { Db } from './smartdata.classes.db'

export interface IFindOptions {
    limit?: number
}

export interface IDocValidation<T> {
    (doc: T): boolean
}

export function Collection(db: Db) {
    return function (constructor) {
        constructor['dbCollection'] = new DbCollection(constructor.name, db)
    }
}

export class DbCollection<T> {
    /**
     * the collection that is used, defaults to mongodb collection,
     * can be nedb datastore (sub api of mongodb)
     */
    collection: plugins.mongodb.Collection
    name: string
    db: Db
    objectValidation: IDocValidation<T> = null


    constructor(nameArg: string, dbArg: Db) {
        this.name = nameArg
        this.db = dbArg
        if (this.db.dbType === 'mongodb') {
            this.collection = dbArg.db.collection(nameArg)
        } else {
            this.collection = new plugins.nedb()
        }
    }

    /**
     * adds a validation function that all newly inserted and updated objects have to pass
     */
    addDocValidation(funcArg: IDocValidation<T>) {
        this.objectValidation = funcArg
    }

    /**
     * finds an object in the DbCollection
     */
    find(docMatchArg: T | any, optionsArg?: IFindOptions): plugins.q.Promise<T[]> {
        let done = plugins.q.defer<T[]>()
        if (this.db.dbType === 'mongodb') {
            let findCursor = this.collection.find(docMatchArg)
            if (optionsArg) {
                if (optionsArg.limit) { findCursor = findCursor.limit(1) }
            }
            findCursor.toArray((err, docs) => {
                if (err) {
                    done.reject(err)
                    throw err
                }
                done.resolve(docs)
            })
        } else if (this.db.dbType === 'nedb') {
            this.collection.find(docMatchArg, (err, docs) => {
                if (err) {
                    done.reject(err)
                    throw err
                }
                done.resolve(docs)
            })
        }
        return done.promise
    }

    /**
     * inserts object into the DbCollection
     */
    insertOne(docArg: T): plugins.q.Promise<void> {
        let done = plugins.q.defer<void>()
        this.checkDoc(docArg).then(
            () => {
                if (this.db.dbType === 'mongodb') {
                    this.collection.insertOne(docArg)
                        .then(() => { done.resolve() })
                } else if (this.db.dbType === 'nedb') {
                    this.collection.insert(docArg, (err, newDoc) => {
                        if (err) {
                            done.reject(err)
                            throw err
                        }
                        done.resolve()
                    })
                }
            },
            () => {
                done.reject(new Error('one the docs did not pass validation'))
            })
        return done.promise
    }

    /**
     * inserts many objects at once into the DbCollection
     */
    insertMany(docArrayArg: T[]): plugins.q.Promise<void> {
        let done = plugins.q.defer<void>()
        let checkDocPromiseArray: plugins.q.Promise<void>[] = []
        for (let docArg of docArrayArg) {
            checkDocPromiseArray.push(this.checkDoc(docArg))
        }
        plugins.q.all(checkDocPromiseArray).then(() => {
            if (this.db.dbType === 'mongodb') {
                this.collection.insertMany(docArrayArg)
                    .then(() => { done.resolve() })
            } else if (this.db.dbType === 'nedb') {
                let paramArray = plugins.lodash.concat<any>(docArrayArg, (err, newDoc) => {
                    if (err) {
                        done.reject(err)
                        throw err
                    }
                    done.resolve()
                })
                this.collection.insert.apply(null, paramArray)
            }
        })
        return done.promise
    }

    /**
     * checks a Doc for constraints
     */
    private checkDoc(docArg: T): plugins.q.Promise<void> {
        let done = plugins.q.defer<void>()
        let validationResult = true
        if (this.objectValidation) {
            validationResult = this.objectValidation(docArg)
        }
        if (validationResult) {
            done.resolve()
        } else {
            done.reject('validation of object did not pass')
        }
        return done.promise
    }
}
