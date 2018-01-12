import * as plugins from './smartdata.plugins'

import { Objectmap } from 'lik'

import { Db } from './smartdata.classes.db'
import { DbTable } from './smartdata.classes.dbcollection'

export type TDocCreation = 'db' | 'new' | 'mixed'

/**
 * saveable - saveable decorator to be used on class properties
 */
export function svDb() {
  return (target: DbDoc<any>, key: string) => {
    console.log('called sva')
    if (!target.saveableProperties) { target.saveableProperties = [] }
    target.saveableProperties.push(key)
  }
}

export class DbDoc<T> {

  /**
   * the collection object an Doc belongs to
   */
  collection: DbTable<T>

  /**
   * how the Doc in memory was created, may prove useful later.
   */
  creationStatus: TDocCreation = 'new'

  /**
   * an array of saveable properties of a doc
   */
  saveableProperties: string[]

  /**
   * name
   */
  name: string

  /**
   * primary id in the database
   */
  dbId: string 

  /**
   * class constructor
   */
  constructor () {
    this.name = this.constructor['name']
    this.collection = this.constructor[ 'dbCollection' ]
  }

  /**
   * saves this instance but not any connected items
   * may lead to data inconsistencies, but is faster
   */
  async save () {
    let self: any = this
    switch (this.creationStatus) {
      case 'db':
        await this.collection.update(self)
        break
      case 'new':
        let writeResult = await this.collection.insert(self)
        this.creationStatus = 'db'
        break;
      default:
        console.error('neither new nor in db?')
    }
  }

  /**
   * also store any referenced objects to DB
   * better for data consistency
   */
  saveDeep (savedMapArg: Objectmap<DbDoc<any>> = null) {
    if (!savedMapArg) {
      savedMapArg = new Objectmap<DbDoc<any>>()
    }
    savedMapArg.add(this)
    this.save()
    for (let propertyKey in this) {
      let property: any = this[ propertyKey ]
      if (property instanceof DbDoc && !savedMapArg.checkForObject(property)) {
        property.saveDeep(savedMapArg)
      }
    }
  }

  createSavableObject () {
    let saveableObject: any = {} // is not exposed to outside, so any is ok here
    for (let propertyNameString of this.saveableProperties) {
      saveableObject[ propertyNameString ] = this[ propertyNameString ]
    }
    return saveableObject
  }
}
