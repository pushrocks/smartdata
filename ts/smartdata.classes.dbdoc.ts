import * as plugins from './smartdata.plugins'

import { Objectmap } from 'lik'

import { Db } from './smartdata.classes.db'
import { DbCollection } from './smartdata.classes.dbcollection'

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
  collection: DbCollection<T>

  /**
   * how the Doc in memory was created, may prove useful later.
   */
  creationType: TDocCreation

  /**
   * an array of saveable properties of a doc
   */
  saveableProperties: string[]

  /**
   * class constructor
   */
  constructor() {
    this.collection = this.constructor[ 'dbCollection' ]
  }

  /**
   * saves this instance but not any connected items
   * may lead to data inconsistencies, but is faster
   */
  save() {
    let saveableObject: any = {} // isn not exposed to outside, so any is ok here
    for (let propertyNameString of this.saveableProperties) {
      saveableObject[ propertyNameString ] = this[ propertyNameString ]
    }
    switch (this.creationType) {
      case 'db':
        this.collection // TODO implement collection.update()
        break
      case 'new':
        this.collection.insertOne(saveableObject)
    }
  }

  /**
   * also store any referenced objects to DB
   * better for data consistency
   */
  saveDeep(savedMapArg: Objectmap<DbDoc<any>> = null) {
    if (!savedMapArg) {
      savedMapArg = new Objectmap<DbDoc<any>>()
    }
    savedMapArg.add(this)
    this.save()
    for (let propertyKey in this) {
      let property = this[ propertyKey ]
      if (property instanceof DbDoc && !savedMapArg.checkForObject(property)) {
        property.saveDeep(savedMapArg)
      }
    }
  }
}
