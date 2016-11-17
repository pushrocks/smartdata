import { DbCollection } from './smartdata.classes.dbcollection';
export declare type TDocCreation = 'db' | 'data' | 'mixed';
/**
 * sva - saveable decorator to be used on class properties
 */
export declare function saveable(target: DbDoc<any>, key: string): void;
export declare class DbDoc<T> {
    /**
     * the collection object an Doc belongs to
     */
    collection: DbCollection<T>;
    /**
     * how the Doc in memory was created, may prove useful later.
     */
    creationType: TDocCreation;
    /**
     * an array of saveable properties of a doc
     */
    saveableProperties: string[];
    /**
     * class constructor
     */
    constructor();
    /**
     * saves this instance but not any connected items
     * may lead to data inconsistencies, but is faster
     */
    save(): void;
    /**
     * also store any referenced objects to DB
     * better for data consistency
     */
    saveDeep(): void;
}
