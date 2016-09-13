import { Db } from './smartdata.classes.db';
import { DbCollection } from './smartdata.classes.dbcollection';
export declare type TDocCreation = 'db' | 'data' | 'mixed';
export declare class DbDoc<T> {
    collection: DbCollection<T>;
    creationType: TDocCreation;
    constructor(collectionNameArg: string, dbArg: Db);
    save(): void;
    saveDeep(): void;
}
