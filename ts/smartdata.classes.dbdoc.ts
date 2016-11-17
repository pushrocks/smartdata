import * as plugins from './smartdata.plugins'

import { Db } from './smartdata.classes.db'
import { DbCollection } from './smartdata.classes.dbcollection'

export type TDocCreation = 'db' | 'data' | 'mixed'

/**
 * sva - saveable decorator to be used on class properties
 */
export function saveable(target: DbDoc<any>, key: string) {
    console.log('called sva')
    if (!target.saveableProperties) { target.saveableProperties = [] }
    target.saveableProperties.push(key)
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
        this.collection = this.constructor['dbCollection']
    }

    /**
     * saves this instance but not any connected items
     * may lead to data inconsistencies, but is faster
     */
    save() {
        let saveableObject = {}
        for (let propertyNameString of this.saveableProperties) {
            saveableObject[propertyNameString] = this[propertyNameString]
        }
    }

    /**
     * also store any referenced objects to DB
     * better for data consistency
     */
    saveDeep() {
        this.save()
    }
}
