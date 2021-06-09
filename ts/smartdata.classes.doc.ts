import * as plugins from './smartdata.plugins';

import { ObjectMap } from '@pushrocks/lik';

import { SmartdataDb } from './smartdata.classes.db';
import { IManager, SmartdataCollection } from './smartdata.classes.collection';

export type TDocCreation = 'db' | 'new' | 'mixed';

/**
 * saveable - saveable decorator to be used on class properties
 */
export function svDb() {
  return (target: SmartDataDbDoc<unknown, unknown>, key: string) => {
    console.log(`called svDb() on >${target.constructor.name}.${key}<`);
    if (!target.saveableProperties) {
      target.saveableProperties = [];
    }
    target.saveableProperties.push(key);
  };
}

/**
 * unique index - decorator to mark a unique index
 */
export function unI() {
  return (target: SmartDataDbDoc<unknown, unknown>, key: string) => {
    console.log(`called unI on >>${target.constructor.name}.${key}<<`);

    // mark the index as unique
    if (!target.uniqueIndexes) {
      target.uniqueIndexes = [];
    }
    target.uniqueIndexes.push(key);

    // and also save it
    if (!target.saveableProperties) {
      target.saveableProperties = [];
    }
    target.saveableProperties.push(key);
  };
}

export class SmartDataDbDoc<T extends TImplements, TImplements, TManager extends IManager = any> {
  /**
   * the collection object an Doc belongs to
   */
  public static collection: SmartdataCollection<any>;
  public collection: SmartdataCollection<any>;
  public static manager: TManager;
  public manager: TManager;

  /**
   * how the Doc in memory was created, may prove useful later.
   */
  public creationStatus: TDocCreation = 'new';

  /**
   * unique indexes
   */
  public uniqueIndexes: string[];

  /**
   * an array of saveable properties of a doc
   */
  public saveableProperties: string[];

  /**
   * name
   */
  public name: string;

  /**
   * primary id in the database
   */
  public dbDocUniqueId: string;

  /**
   * class constructor
   */
  constructor() {}

  public static async getInstances<T>(
    this: plugins.tsclass.typeFest.Class<T>,
    filterArg: plugins.tsclass.typeFest.PartialDeep<T>
  ): Promise<T[]> {
    const convertedFilter: any = {};
    const convertFilterArgument = (keyPathArg: string, filterArg2: any) => {
      if (typeof filterArg2 === 'object') {
        for (const key of Object.keys(filterArg2)) {
          if (key.startsWith('$')) {
            convertedFilter[keyPathArg] = filterArg2;
            return;
          } else if (key.includes('.')) {
            throw new Error('keys cannot contain dots');
          }
        }
        for (const key of Object.keys(filterArg2)) {
          convertFilterArgument(`${keyPathArg}.${key}`, filterArg2[key]);
        } 
      } else {
        convertedFilter[keyPathArg] = filterArg2
      }
    }
    for (const key of Object.keys(filterArg)) {
      convertFilterArgument(key, filterArg[key]);
    }
    const foundDocs = await (this as any).collection.find(convertedFilter);
    const returnArray = [];
    for (const item of foundDocs) {
      const newInstance = new this();
      (newInstance as any).creationStatus = 'db';
      for (const key of Object.keys(item)) {
        newInstance[key] = item[key];
      }
      returnArray.push(newInstance);
    }
    return returnArray;
  }

  public static async getInstance<T>(
    this: plugins.tsclass.typeFest.Class<T>,
    filterArg: plugins.tsclass.typeFest.PartialDeep<T>
  ): Promise<T> {
    const result = await (this as any).getInstances(filterArg);
    if (result && result.length > 0) {
      return result[0];
    }
  }

  /**
   * saves this instance but not any connected items
   * may lead to data inconsistencies, but is faster
   */
  public async save() {
    // tslint:disable-next-line: no-this-assignment
    const self: any = this;
    let dbResult: any;
    switch (this.creationStatus) {
      case 'db':
        dbResult = await this.collection.update(self);
        break;
      case 'new':
        dbResult = await this.collection.insert(self);
        this.creationStatus = 'db';
        break;
      default:
        console.error('neither new nor in db?');
    }
    return dbResult;
  }

  /**
   * deletes a document from the database
   */
  public async delete() {
    await this.collection.delete(this);
  }

  /**
   * also store any referenced objects to DB
   * better for data consistency
   */
  public saveDeep(savedMapArg: ObjectMap<SmartDataDbDoc<any, any>> = null) {
    if (!savedMapArg) {
      savedMapArg = new ObjectMap<SmartDataDbDoc<any, any>>();
    }
    savedMapArg.add(this);
    this.save();
    for (const propertyKey of Object.keys(this)) {
      const property: any = this[propertyKey];
      if (property instanceof SmartDataDbDoc && !savedMapArg.checkForObject(property)) {
        property.saveDeep(savedMapArg);
      }
    }
  }

  /**
   * creates a saveable object so the instance can be persisted as json in the database
   */
  public async createSavableObject(): Promise<TImplements> {
    const saveableObject: unknown = {}; // is not exposed to outside, so any is ok here
    for (const propertyNameString of this.saveableProperties) {
      saveableObject[propertyNameString] = this[propertyNameString];
    }
    return saveableObject as TImplements;
  }

  /**
   * creates an identifiable object for operations that require filtering
   */
  public async createIdentifiableObject() {
    const identifiableObject: any = {}; // is not exposed to outside, so any is ok here
    for (const propertyNameString of this.uniqueIndexes) {
      identifiableObject[propertyNameString] = this[propertyNameString];
    }
    return identifiableObject;
  }
}
