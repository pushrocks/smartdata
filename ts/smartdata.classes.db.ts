import * as plugins from './smartdata.plugins'
import { Objectmap } from 'lik'

import { DbCollection } from './smartdata.classes.dbcollection'

/**
 * interface - indicates the connection status of the db
 */
export type TConnectionStatus = 'disconnected' | 'connected' | 'failed'

export class Db {
  dbUrl: string
  db: plugins.mongodb.Db
  status: TConnectionStatus
  collections = new Objectmap<DbCollection<any>>()

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
   * gets a collection by name: string
   */
  getCollectionByName<T>(nameArg: string): Promise<DbCollection<T>> {
    let done = plugins.smartq.defer<DbCollection<any>>()
    let resultCollection = this.collections.find((dbCollectionArg) => {
      return dbCollectionArg.name === nameArg
    })
    if (resultCollection !== null) {
      done.resolve(resultCollection)
    }
    return done.promise
  }

  addCollection (dbCollectionArg: DbCollection<any>) {
    this.collections.add(dbCollectionArg)
  }

}
