import * as plugins from './smartdata.plugins'

import { Db } from './smartdata.classes.db'
import { DbDoc } from './smartdata.classes.dbdoc'
import { DbTable } from './smartdata.classes.dbcollection'

export let getObjectDoc = (nameArg,dbArg: Db) => {
  let objectDoc = new DbDoc()
  objectDoc.name = nameArg
  objectDoc.collection = new DbTable(objectDoc, dbArg)
  return objectDoc
}
