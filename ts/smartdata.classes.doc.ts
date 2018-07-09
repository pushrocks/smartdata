import * as plugins from './smartdata.plugins';

import { Objectmap } from 'lik';

import { SmartdataDb } from './smartdata.classes.db';
import { SmartdataCollection } from './smartdata.classes.collection';

export type TDocCreation = 'db' | 'new' | 'mixed';

/**
 * saveable - saveable decorator to be used on class properties
 */
export function svDb() {
  return (target: SmartDataDbDoc<any>, key: string) => {
    console.log('called sva');
    if (!target.saveableProperties) {
      target.saveableProperties = [];
    }
    target.saveableProperties.push(key);
  };
}

export class SmartDataDbDoc<T> {
  /**
   * the collection object an Doc belongs to
   */
  collection: SmartdataCollection<T>;

  /**
   * how the Doc in memory was created, may prove useful later.
   */
  creationStatus: TDocCreation = 'new';

  /**
   * an array of saveable properties of a doc
   */
  saveableProperties: string[];

  /**
   * name
   */
  name: string;

  /**
   * primary id in the database
   */
  dbDocUniqueId: string;

  /**
   * class constructor
   */
  constructor() {
    this.name = this.constructor['name'];
    this.collection = this.constructor['smartdataCollection'];
  }

  static async getInstances<T>(filterArg): Promise<T[]> {
    let self: any = this; // fool typesystem
    let referenceMongoDBCollection: SmartdataCollection<T> = self.smartdataCollection;
    const foundDocs = await referenceMongoDBCollection.find(filterArg);
    const returnArray = [];
    for (let item of foundDocs) {
      let newInstance = new this();
      for (let key in item) {
        if (key !== 'id') {
          newInstance[key] = item[key];
        }
      }
      returnArray.push(newInstance);
    }
    return returnArray;
  }

  static async getInstance<T>(filterArg): Promise<T> {
    let result = await this.getInstances<T>(filterArg);
    if (result && result.length > 0) {
      return result[0];
    }
  }

  /**
   * saves this instance but not any connected items
   * may lead to data inconsistencies, but is faster
   */
  async save() {
    let self: any = this;
    switch (this.creationStatus) {
      case 'db':
        await this.collection.update(self);
        break;
      case 'new':
        let writeResult = await this.collection.insert(self);
        this.creationStatus = 'db';
        break;
      default:
        console.error('neither new nor in db?');
    }
  }

  /**
   * also store any referenced objects to DB
   * better for data consistency
   */
  saveDeep(savedMapArg: Objectmap<SmartDataDbDoc<any>> = null) {
    if (!savedMapArg) {
      savedMapArg = new Objectmap<SmartDataDbDoc<any>>();
    }
    savedMapArg.add(this);
    this.save();
    for (let propertyKey in this) {
      let property: any = this[propertyKey];
      if (property instanceof SmartDataDbDoc && !savedMapArg.checkForObject(property)) {
        property.saveDeep(savedMapArg);
      }
    }
  }

  async createSavableObject() {
    let saveableObject: any = {}; // is not exposed to outside, so any is ok here
    for (let propertyNameString of this.saveableProperties) {
      saveableObject[propertyNameString] = this[propertyNameString];
    }
    return saveableObject;
  }
}
