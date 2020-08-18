import * as plugins from './smartdata.plugins';
import { ObjectMap } from '@pushrocks/lik';

import { SmartdataCollection } from './smartdata.classes.collection';

import { logger } from './smartdata.logging';

/**
 * interface - indicates the connection status of the db
 */
export type TConnectionStatus = 'initial' | 'disconnected' | 'connected' | 'failed';

export interface ISmartdataOptions {
  /**
   * the URL to connect to
   */
  mongoDbUrl: string;

  /**
   * the db to use for the project
   */
  mongoDbName?: string;

  /**
   * a username to use to connect to the database
   */

  mongoDbUser?: string;

  /**
   * an optional password that will be replace <PASSWORD> in the connection string
   */
  mongoDbPass?: string;
}

export class SmartdataDb {
  smartdataOptions: ISmartdataOptions;
  mongoDbClient: plugins.mongodb.MongoClient;
  mongoDb: plugins.mongodb.Db;
  status: TConnectionStatus;
  smartdataCollectionMap = new ObjectMap<SmartdataCollection<any>>();

  constructor(smartdataOptions: ISmartdataOptions) {
    this.smartdataOptions = smartdataOptions;
    this.status = 'initial';
  }

  // basic connection stuff ----------------------------------------------

  /**
   * connects to the database that was specified during instance creation
   */
  public async init(): Promise<any> {
    const finalConnectionUrl = this.smartdataOptions.mongoDbUrl
      .replace('<USERNAME>', this.smartdataOptions.mongoDbUser)
      .replace('<username>', this.smartdataOptions.mongoDbUser)
      .replace('<PASSWORD>', this.smartdataOptions.mongoDbPass)
      .replace('<password>', this.smartdataOptions.mongoDbPass)
      .replace('<DBNAME>', this.smartdataOptions.mongoDbName)
      .replace('<dbname>', this.smartdataOptions.mongoDbName);

    this.mongoDbClient = await plugins.mongodb.MongoClient.connect(finalConnectionUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    this.mongoDb = this.mongoDbClient.db(this.smartdataOptions.mongoDbName);
    this.status = 'connected';
    console.log(`Connected to database ${this.smartdataOptions.mongoDbName}`);
  }

  /**
   * closes the connection to the databse
   */
  public async close(): Promise<any> {
    await this.mongoDbClient.close();
    this.status = 'disconnected';
    logger.log('info', `disconnected from database ${this.smartdataOptions.mongoDbName}`);
  }

  // handle table to class distribution

  public addTable(SmartdataCollectionArg: SmartdataCollection<any>) {
    this.smartdataCollectionMap.add(SmartdataCollectionArg);
  }

  /**
   * Gets a collection's name and returns a SmartdataCollection instance
   * @param nameArg
   * @returns DbTable
   */
  public async getSmartdataCollectionByName<T>(nameArg: string): Promise<SmartdataCollection<T>> {
    const resultCollection = this.smartdataCollectionMap.find((dbTableArg) => {
      return dbTableArg.collectionName === nameArg;
    });
    return resultCollection;
  }
}
