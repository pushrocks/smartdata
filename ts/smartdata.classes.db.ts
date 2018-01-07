import * as plugins from './smartdata.plugins'
import { Objectmap } from 'lik'

import { DbTable } from './smartdata.classes.dbcollection'
import { getObjectDoc } from './smartdata.classes.dbobjectdoc'

import { Connection as dbConnection, ConnectionOptions } from 'rethinkdb'

/**
 * interface - indicates the connection status of the db
 */
export type TConnectionStatus = 'disconnected' | 'connected' | 'failed'

export class Db {
  dbName: string
  connectionOptions: plugins.rethinkDb.ConnectionOptions
  dbConnection: plugins.rethinkDb.Connection
  status: TConnectionStatus

  constructor (connectionOptionsArg: ConnectionOptions) {
    this.dbName = connectionOptionsArg.db
    this.connectionOptions = connectionOptionsArg
  }

  // basic connection stuff ----------------------------------------------

  /**
   * connects to the database that was specified during instance creation
   */
  async connect (): Promise<any> {
    this.dbConnection = await plugins.rethinkDb.connect(this.connectionOptions)
    plugins.beautylog.ok(`Connected to database ${this.dbName}`)
  }

  /**
   * closes the connection to the databse
   */
  close (): Promise<any> {
    let done = plugins.smartq.defer()
    this.dbConnection.close()
    plugins.beautylog.ok(`disconnected to database ${this.dbName}`)
    done.resolve()
    return done.promise
  }

}
