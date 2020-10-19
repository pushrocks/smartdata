import * as plugins from './smartdata.plugins';
import { SmartdataCollection } from './smartdata.classes.collection';
import { SmartdataDb } from './smartdata.classes.db';

export class CollectionFactory {
  public collections: { [key: string]: SmartdataCollection<any> } = {};

  public getCollection = (
    nameArg: string,
    dbArg: SmartdataDb | (() => SmartdataDb)
  ): SmartdataCollection<any> => {
    if (!this.collections[nameArg]) {
      this.collections[nameArg] = (() => {
        if (dbArg instanceof SmartdataDb) {
          // tslint:disable-next-line: no-string-literal
          return new SmartdataCollection(nameArg, dbArg);
        } else {
          dbArg = dbArg();
          return new SmartdataCollection(nameArg, dbArg);
        }
      })();
    }
    return this.collections[nameArg];
  };
}
