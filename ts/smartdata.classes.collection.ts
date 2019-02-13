import * as plugins from './smartdata.plugins';
import { SmartdataDb } from './smartdata.classes.db';
import { SmartDataDbDoc } from './smartdata.classes.doc';

export interface IFindOptions {
  limit?: number;
}

/**
 *
 */
export interface IDocValidationFunc<T> {
  (doc: T): boolean;
}

export type TDelayedDbCreation = () => SmartdataDb;

/**
 * This is a decorator that will tell the decorated class what dbTable to use
 * @param dbArg
 */
export function Collection(dbArg: SmartdataDb | TDelayedDbCreation) {
  return function(constructor) {
    if (dbArg instanceof SmartdataDb) {
      // tslint:disable-next-line: no-string-literal
      constructor['smartdataCollection'] = new SmartdataCollection(constructor, dbArg);
    } else {
      constructor['smartdataDelayedCollection'] = () => {
        return new SmartdataCollection(constructor, dbArg());
      };
    }
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
  uniqueIndexes: string[] = [];

  constructor(collectedClassArg: T & SmartDataDbDoc<T>, smartDataDbArg: SmartdataDb) {
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
      console.log(`Successfully initiated Collection ${this.collectionName}`);
    }
  }

  /**
   * mark unique index
   */
  markUniqueIndexes(keyArrayArg: string[] = []) {
    for (let key of keyArrayArg) {
      if (!this.uniqueIndexes.includes(key)) {
        this.mongoDbCollection.createIndex(key, {
          unique: true
        });
        // make sure we only call this once and not for every doc we create
        this.uniqueIndexes.push(key);
      }
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
    const result = await this.mongoDbCollection.find(filterObject).toArray();
    return result;
  }

  /**
   * create an object in the database
   */
  async insert(dbDocArg: T & SmartDataDbDoc<T>): Promise<any> {
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
  public async update(dbDocArg: T & SmartDataDbDoc<T>): Promise<any> {
    await this.init();
    await this.checkDoc(dbDocArg);
    const identifiableObject = await dbDocArg.createIdentifiableObject();
    const saveableObject = await dbDocArg.createSavableObject();
    this.mongoDbCollection.updateOne(identifiableObject, saveableObject);
  }

  public async delete(dbDocArg: T & SmartDataDbDoc<T>): Promise<any> {
    await this.init();
    await this.checkDoc(dbDocArg);
    const identifiableObject = await dbDocArg.createIdentifiableObject();
    this.mongoDbCollection.deleteOne(identifiableObject);
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
