import * as plugins from './smartdata.plugins';
import { ObjectMap } from '@pushrocks/lik';

import { SmartdataCollection } from './smartdata.classes.collection';

import { logger } from './smartdata.logging';
import { IMongoDescriptor } from './interfaces';

/**
 * interface - indicates the connection status of the db
 */
export type TConnectionStatus = 'initial' | 'disconnected' | 'connected' | 'failed';

export class SmartdataDb {
  smartdataOptions: IMongoDescriptor;
  mongoDbClient: plugins.mongodb.MongoClient;
  mongoDb: plugins.mongodb.Db;
  status: TConnectionStatus;
  smartdataCollectionMap = new ObjectMap<SmartdataCollection<any>>();

  constructor(smartdataOptions: IMongoDescriptor) {
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
      .replace('<USER>', this.smartdataOptions.mongoDbUser)
      .replace('<user>', this.smartdataOptions.mongoDbUser)
      .replace('<PASSWORD>', this.smartdataOptions.mongoDbPass)
      .replace('<password>', this.smartdataOptions.mongoDbPass)
      .replace('<DBNAME>', this.smartdataOptions.mongoDbName)
      .replace('<dbname>', this.smartdataOptions.mongoDbName);

    this.mongoDbClient = await plugins.mongodb.MongoClient.connect(finalConnectionUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      maxPoolSize: 100,
      maxIdleTimeMS: 10,
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

  public addCollection(SmartdataCollectionArg: SmartdataCollection<any>) {
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
