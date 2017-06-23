import * as plugins from './smartdata.plugins'
import { Objectmap } from 'lik'

import { DbCollection } from './smartdata.classes.dbcollection'
import { getObjectDoc } from './smartdata.classes.dbobjectdoc'

/**
 * interface - indicates the connection status of the db
 */
export type TConnectionStatus = 'disconnected' | 'connected' | 'failed'

export class Db {
  dbUrl: string
  db: plugins.mongodb.Db
  status: TConnectionStatus
  classCollections = new Objectmap<DbCollection<any>>()
  objectCollections = new Objectmap<DbCollection<any>>()

  constructor (dbUrlArg: string) {
    this.dbUrl = dbUrlArg
  }

  // basic connection stuff ----------------------------------------------

  /**
   * connects to the database that was specified during instance creation
   */
  connect (): Promise<any> {
    let done = plugins.smartq.defer()
    plugins.mongodb.MongoClient.connect(this.dbUrl, (err, db) => {
      if (err) { console.log(err) }
      plugins.assert.equal(null, err)
      this.db = db
      plugins.beautylog.success(`connected to database at ${this.dbUrl}`)
      done.resolve(this.db)
    })
    return done.promise
  }

  /**
   * closes the connection to the databse
   */
  close (): Promise<any> {
    let done = plugins.smartq.defer()
    this.db.close()
    plugins.beautylog.ok(`disconnected to database at ${this.dbUrl}`)
    done.resolve()
    return done.promise
  }

  // advanced communication with the database --------------------------------

  /**
   * gets a class based collection by name: string
   */
  async getClassCollectionByName<T> (nameArg: string): Promise<DbCollection<T>> {
    let resultCollection = this.classCollections.find((dbCollectionArg) => {
      return dbCollectionArg.name === nameArg
    })
    return resultCollection
  }

  /**
   * gets an object collection by name
   */
  async getObjectCollectionByName<T> (nameArg: string, dbArg: Db , makeNewArg: boolean = false): Promise<DbCollection<T>> {
    let resultCollection = this.objectCollections.find((dbCollectionArg) => {
      return dbCollectionArg.name === nameArg
    })
    if (!resultCollection && makeNewArg) {
      resultCollection = getObjectDoc(nameArg, this).collection
      return resultCollection
    } else {
      return resultCollection
    }
  }

  addCollection (dbCollectionArg: DbCollection<any>) {
    this.classCollections.add(dbCollectionArg)
  }

}
