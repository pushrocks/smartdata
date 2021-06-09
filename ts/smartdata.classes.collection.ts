import * as plugins from './smartdata.plugins';
import { SmartdataDb } from './smartdata.classes.db';
import { SmartDataDbDoc } from './smartdata.classes.doc';
import { CollectionFactory } from './smartdata.classes.collectionfactory';

export interface IFindOptions {
  limit?: number;
}

/**
 *
 */
export interface IDocValidationFunc<T> {
  (doc: T): boolean;
}

export type TDelayed<TDelayedArg> = () => TDelayedArg;

const collectionFactory = new CollectionFactory();

/**
 * This is a decorator that will tell the decorated class what dbTable to use
 * @param dbArg
 */
export function Collection(dbArg: SmartdataDb | TDelayed<SmartdataDb>) {
  return function classDecorator<T extends { new (...args: any[]): {} }>(constructor: T) {
    return class extends constructor {
      public static get collection() {
        if (!(dbArg instanceof SmartdataDb)) {
          dbArg = dbArg();
        }
        return collectionFactory.getCollection(constructor.name, dbArg);
      }
      public get collection() {
        if (!(dbArg instanceof SmartdataDb)) {
          dbArg = dbArg();
        }
        return collectionFactory.getCollection(constructor.name, dbArg);
      }
    };
  };
}

export interface IManager {
  db: SmartdataDb
}

/**
 * This is a decorator that will tell the decorated class what dbTable to use
 * @param dbArg
 */
 export function Manager<TManager extends IManager>(managerArg?: TManager | TDelayed<TManager>) {
  return function classDecorator<T extends { new (...args: any[]): {} }>(constructor: T) {
    return class extends constructor {
      public static get collection() {
        let dbArg: SmartdataDb;
        if (managerArg['db']) {
          dbArg = (managerArg as TManager).db
        } else {
          dbArg = (managerArg as TDelayed<TManager>)().db;
        }
        return collectionFactory.getCollection(constructor.name, dbArg);
      }
      public get collection() {
        let dbArg: SmartdataDb;
        if (managerArg['db']) {
          dbArg = (managerArg as TManager).db
        } else {
          dbArg = (managerArg as TDelayed<TManager>)().db;
        }
        return collectionFactory.getCollection(constructor.name, dbArg);
      }
      public get manager() {
        let manager: TManager;
        if (managerArg['db']) {
          manager = (managerArg as TManager);
        } else {
          manager = (managerArg as TDelayed<TManager>)();
        }
        return manager;
      }
    };
  };
}

// tslint:disable-next-line: max-classes-per-file
export class SmartdataCollection<T> {
  /**
   * the collection that is used
   */
  public mongoDbCollection: plugins.mongodb.Collection;
  public objectValidation: IDocValidationFunc<T> = null;
  public collectionName: string;
  public smartdataDb: SmartdataDb;
  public uniqueIndexes: string[] = [];

  constructor(classNameArg: string, smartDataDbArg: SmartdataDb) {
    // tell the collection where it belongs
    this.collectionName = classNameArg;
    this.smartdataDb = smartDataDbArg;

    // tell the db class about it (important since Db uses different systems under the hood)
    this.smartdataDb.addCollection(this);
  }

  /**
   * makes sure a collection exists within MongoDb that maps to the SmartdataCollection
   */
  public async init() {
    if (!this.mongoDbCollection) {
      // connect this instance to a MongoDB collection
      const availableMongoDbCollections = await this.smartdataDb.mongoDb.collections();
      const wantedCollection = availableMongoDbCollections.find((collection) => {
        return collection.collectionName === this.collectionName;
      });
      if (!wantedCollection) {
        await this.smartdataDb.mongoDb.createCollection(this.collectionName);
        console.log(`Successfully initiated Collection ${this.collectionName}`);
      }
      this.mongoDbCollection = this.smartdataDb.mongoDb.collection(this.collectionName);
    }
  }

  /**
   * mark unique index
   */
  public markUniqueIndexes(keyArrayArg: string[] = []) {
    for (const key of keyArrayArg) {
      if (!this.uniqueIndexes.includes(key)) {
        this.mongoDbCollection.createIndex(key, {
          unique: true,
        });
        // make sure we only call this once and not for every doc we create
        this.uniqueIndexes.push(key);
      }
    }
  }

  /**
   * adds a validation function that all newly inserted and updated objects have to pass
   */
  public addDocValidation(funcArg: IDocValidationFunc<T>) {
    this.objectValidation = funcArg;
  }

  /**
   * finds an object in the DbCollection
   */
  public async find(filterObject: any): Promise<any> {
    await this.init();
    const result = await this.mongoDbCollection.find(filterObject).toArray();
    return result;
  }

  /**
   * create an object in the database
   */
  public async insert(dbDocArg: T & SmartDataDbDoc<T, unknown>): Promise<any> {
    await this.init();
    await this.checkDoc(dbDocArg);
    this.markUniqueIndexes(dbDocArg.uniqueIndexes);
    const saveableObject = await dbDocArg.createSavableObject();
    const result = await this.mongoDbCollection.insertOne(saveableObject);
    return result;
  }

  /**
   * inserts object into the DbCollection
   */
  public async update(dbDocArg: T & SmartDataDbDoc<T, unknown>): Promise<any> {
    await this.init();
    await this.checkDoc(dbDocArg);
    const identifiableObject = await dbDocArg.createIdentifiableObject();
    const saveableObject = await dbDocArg.createSavableObject();
    const updateableObject: any = {};
    for (const key of Object.keys(saveableObject)) {
      if (identifiableObject[key]) {
        continue;
      }
      updateableObject[key] = saveableObject[key];
    }
    const result = await this.mongoDbCollection.updateOne(
      identifiableObject,
      { $set: updateableObject },
      { upsert: true }
    );
    return result;
  }

  public async delete(dbDocArg: T & SmartDataDbDoc<T, unknown>): Promise<any> {
    await this.init();
    await this.checkDoc(dbDocArg);
    const identifiableObject = await dbDocArg.createIdentifiableObject();
    await this.mongoDbCollection.deleteOne(identifiableObject, {
      w: 1,
    });
  }

  /**
   * checks a Doc for constraints
   * if this.objectValidation is not set it passes.
   */
  private checkDoc(docArg: T): Promise<void> {
    const done = plugins.smartq.defer<void>();
    let validationResult = true;
    if (this.objectValidation) {
      validationResult = this.objectValidation(docArg);
    }
    if (validationResult) {
      done.resolve();
    } else {
      done.reject('validation of object did not pass');
    }
    return done.promise;
  }
}
