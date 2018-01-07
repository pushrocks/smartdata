import * as plugins from './smartdata.plugins'
import { Db } from './smartdata.classes.db'
import { DbDoc } from './smartdata.classes.dbdoc'

export interface IFindOptions {
  limit?: number
}

export interface IDocValidation<T> {
  (doc: T): boolean
}

export function Collection (db: Db) {
  return function (constructor) {
    constructor[ 'dbCollection' ] = new DbTable(constructor, db)
  }
}

export class DbTable<T> {
  /**
   * the collection that is used, defaults to mongodb collection,
   * can be nedb datastore (sub api of mongodb)
   */
  table: plugins.rethinkDb.Table
  collectedClass: T & DbDoc<T>
  objectValidation: IDocValidation<T> = null
  name: string
  db: Db

  constructor (collectedClassArg: T & DbDoc<T>, dbArg: Db) {
    // tell the collection where it belongs
    this.collectedClass = collectedClassArg
    this.name = collectedClassArg.name
    this.db = dbArg

    // make sure it actually exists
    this.table = dbArg.dbConnection.collection(this.name)

    // tell the db class about it (important since Db uses different systems under the hood)
    this.db.addCollection(this)
  }

  /**
   * adds a validation function that all newly inserted and updated objects have to pass
   */
  addDocValidation (funcArg: IDocValidation<T>) {
    this.objectValidation = funcArg
  }

  /**
   * finds an object in the DbCollection
   */
  find (docMatchArg: T | any, optionsArg?: IFindOptions): Promise<T[]> {
    let done = plugins.smartq.defer<T[]>()
    let findCursor = this.table.find(docMatchArg)
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
    return done.promise
  }

  /**
   * inserts object into the DbCollection
   */
  insertOne (docArg: T): Promise<void> {
    let done = plugins.smartq.defer<void>()
    this.checkDoc(docArg).then(
      () => {
        this.table.insertOne(docArg)
          .then(() => { done.resolve() })
      },
      () => {
        done.reject(new Error('one the docs did not pass validation'))
      })
    return done.promise
  }

  /**
   * inserts many objects at once into the DbCollection
   */
  insertMany (docArrayArg: T[]): Promise<void> {
    let done = plugins.smartq.defer<void>()
    let checkDocPromiseArray: Promise<void>[] = []
    for (let docArg of docArrayArg) {
      checkDocPromiseArray.push(this.checkDoc(docArg))
    }
    Promise.all(checkDocPromiseArray).then(() => {
      this.table.insertMany(docArrayArg)
        .then(() => { done.resolve() })
    })
    return done.promise
  }

  /**
   * checks a Doc for constraints
   */
  private checkDoc (docArg: T): Promise<void> {
    let done = plugins.smartq.defer<void>()
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
