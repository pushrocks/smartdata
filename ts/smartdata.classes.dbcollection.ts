import * as plugins from './smartdata.plugins'
import { Db } from './smartdata.classes.db'
import { DbDoc } from './smartdata.classes.dbdoc'

// RethinkDb Interfaces
import { WriteResult, Cursor } from 'rethinkdb'

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
  tableName: string
  db: Db

  constructor (collectedClassArg: T & DbDoc<T>, dbArg: Db) {
    // tell the collection where it belongs
    this.tableName = collectedClassArg.name
    this.db = dbArg

    // tell the db class about it (important since Db uses different systems under the hood)
    this.db.addTable(this)
  }

  async init() {
    if(!this.table) {
      // connect this instance to a RethinkDB table
      const availableTables = await plugins.rethinkDb
        .db(this.db.dbName)
        .tableList()
        .run(this.db.dbConnection)
      if(availableTables.indexOf(this.tableName)) {
        await plugins.rethinkDb
        .db(this.db.dbName)
        .tableCreate(this.tableName)
        .run(this.db.dbConnection)
      }
    }
    this.table = plugins.rethinkDb.table(this.tableName)
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
  async find (): Promise<Cursor> {
    await this.init()
    return await plugins.rethinkDb.table(this.tableName).filter({
      /* TODO: */
    }).run(this.db.dbConnection)
  }

  /**
   * create an object in the database
   */
  async insert (dbDocArg: T & DbDoc<T>): Promise<WriteResult> {
    await this.init()
    await this.checkDoc(dbDocArg)
    return await plugins.rethinkDb.table(this.tableName).insert(
      dbDocArg.createSavableObject()
    ).run(this.db.dbConnection)
  }

  /**
   * inserts object into the DbCollection
   */
  async update (dbDocArg: T & DbDoc<T>): Promise<WriteResult> {
    await this.init()
    await this.checkDoc(dbDocArg)
    console.log(this.tableName, dbDocArg.createSavableObject())
    return await plugins.rethinkDb.table(this.tableName).update(
      dbDocArg.createSavableObject()
    ).run(this.db.dbConnection)
  }

  /**
   * checks a Doc for constraints
   * if this.objectValidation is not set it passes.
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

  extractKey (writeResult: WriteResult) {

  }
}
