import { Objectmap } from "lik";
import { DbTable } from "./smartdata.classes.dbtable";
export declare type TDocCreation = "db" | "new" | "mixed";
/**
 * saveable - saveable decorator to be used on class properties
 */
export declare function svDb(): (target: DbDoc<any>, key: string) => void;
export declare class DbDoc<T> {
    /**
     * the collection object an Doc belongs to
     */
    collection: DbTable<T>;
    /**
     * how the Doc in memory was created, may prove useful later.
     */
    creationStatus: TDocCreation;
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
    dbId: string;
    /**
     * class constructor
     */
    constructor();
    static getInstances<T>(filterArg: any): Promise<T[]>;
    /**
     * saves this instance but not any connected items
     * may lead to data inconsistencies, but is faster
     */
    save(): Promise<void>;
    /**
     * also store any referenced objects to DB
     * better for data consistency
     */
    saveDeep(savedMapArg?: Objectmap<DbDoc<any>>): void;
    createSavableObject(): any;
}
