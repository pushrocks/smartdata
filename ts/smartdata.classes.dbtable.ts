import * as plugins from './smartdata.plugins';
import { SmartdataDb } from './smartdata.classes.db';
import { smartDataDbDoc } from './smartdata.classes.dbdoc';

export interface IFindOptions {
  limit?: number;
}

/**
 *
 */
export interface IDocValidationFunc<T> {
  (doc: T): boolean;
}

/**
 * This is a decorator that will tell the decorated class what dbTable to use
 * @param db
 */
export function Table(db: SmartdataDb) {
  return function(constructor) {
    constructor['mongoDbCollection'] = new SmartdataCollection(constructor, db);
  };
}

export class SmartdataCollection<T> {
  /**
   * the collection that is used
   */
  mongoDbCollection: plugins.mongodb.Collection;
  objectValidation: IDocValidationFunc<T> = null;
  collectionName: string;
  smartdataDb: SmartdataDb;

  constructor(collectedClassArg: T & smartDataDbDoc<T>, smartDataDbArg: SmartdataDb) {
    // tell the collection where it belongs
    this.collectionName = collectedClassArg.name;
    this.smartdataDb = smartDataDbArg;

    // tell the db class about it (important since Db uses different systems under the hood)
    this.smartdataDb.addTable(this);
  }

  /**
   * makes sure a collection exists within MongoDb that maps to the SmartdataCollection
   */
  async init() {
    if (!this.mongoDbCollection) {
      // connect this instance to a MongoDB collection
      const availableMongoDbCollections = await this.smartdataDb.mongoDb.collections();
      const wantedCollection = availableMongoDbCollections.find(collection => {
        return collection.collectionName === this.collectionName;
      });
      if (!wantedCollection) {
        await this.smartdataDb.mongoDb.createCollection(this.collectionName);
      }
      this.mongoDbCollection = await this.smartdataDb.mongoDb.collection(this.collectionName);
    }
  }

  /**
   * adds a validation function that all newly inserted and updated objects have to pass
   */
  addDocValidation(funcArg: IDocValidationFunc<T>) {
    this.objectValidation = funcArg;
  }

  /**
   * finds an object in the DbCollection
   */
  async find(filterObject: any): Promise<any> {
    await this.init();
  }

  /**
   * create an object in the database
   */
  async insert(dbDocArg: T & smartDataDbDoc<T>): Promise<any> {
    await this.init();
    await this.checkDoc(dbDocArg);
    const saveableObject = await dbDocArg.createSavableObject();
    const result = await this.mongoDbCollection.insertOne(saveableObject);
    return result;
  }

  /**
   * inserts object into the DbCollection
   */
  async update(dbDocArg: T & smartDataDbDoc<T>): Promise<any> {
    await this.init();
    await this.checkDoc(dbDocArg);
    const saveableObject = await dbDocArg.createSavableObject();
    this.mongoDbCollection.updateOne(saveableObject.dbDocUniqueId, saveableObject);
  }

  /**
   * checks a Doc for constraints
   * if this.objectValidation is not set it passes.
   */
  private checkDoc(docArg: T): Promise<void> {
    let done = plugins.smartq.defer<void>();
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
