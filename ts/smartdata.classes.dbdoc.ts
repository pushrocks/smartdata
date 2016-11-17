import * as plugins from './smartdata.plugins'

import { Db } from './smartdata.classes.db'
import { DbCollection } from './smartdata.classes.dbcollection'

export type TDocCreation = 'db' | 'data' | 'mixed'


export class DbDoc<T> {
    collection: DbCollection<T>
    creationType: TDocCreation
    constructor() {
        this.collection = this.constructor['dbCollection']
    }
    save() {
        
    }
    saveDeep() {

    }
}
