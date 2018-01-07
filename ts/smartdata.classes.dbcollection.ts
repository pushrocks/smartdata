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
  objectValidation: IDocValidation<T> = null
  name: string
  db: Db

  constructor (collectedClassArg: T & DbDoc<T>, dbArg: Db) {
    // tell the collection where it belongs
    this.name = collectedClassArg.name
    this.db = dbArg

    // connect this instance to a RethinkDB table
    this.table = plugins.rethinkDb.db(this.db.dbName).table(this.name)

    // tell the db class about it (important since Db uses different systems under the hood)
    this.db.addTable(this)
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
  async find (docMatchArg: T | any, optionsArg?: IFindOptions): Promise<T[]> {
    
  }

  /**
   * inserts object into the DbCollection
   */
  async insertOne (docArg: T): Promise<void> {
    await this.checkDoc(docArg)
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
