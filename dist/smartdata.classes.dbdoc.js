"use strict";
/**
 * saveable - saveable decorator to be used on class properties
 */
function svDb() {
    return (target, key) => {
        console.log('called sva');
        if (!target.saveableProperties) {
            target.saveableProperties = [];
        }
        target.saveableProperties.push(key);
    };
}
exports.svDb = svDb;
class DbDoc {
    /**
     * class constructor
     */
    constructor() {
        this.collection = this.constructor['dbCollection'];
    }
    /**
     * saves this instance but not any connected items
     * may lead to data inconsistencies, but is faster
     */
    save() {
        let saveableObject = {};
        for (let propertyNameString of this.saveableProperties) {
            saveableObject[propertyNameString] = this[propertyNameString];
        }
        switch (this.creationType) {
            case 'db':
                this.collection; // TODO implement collection.update()
                break;
            case 'new':
                this.collection.insertOne(saveableObject);
        }
    }
    /**
     * also store any referenced objects to DB
     * better for data consistency
     */
    saveDeep() {
        this.save();
    }
}
exports.DbDoc = DbDoc;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic21hcnRkYXRhLmNsYXNzZXMuZGJkb2MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi90cy9zbWFydGRhdGEuY2xhc3Nlcy5kYmRvYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBT0E7O0dBRUc7QUFDSDtJQUNJLE1BQU0sQ0FBQyxDQUFDLE1BQWtCLEVBQUUsR0FBVztRQUNuQyxPQUFPLENBQUMsR0FBRyxDQUFDLFlBQVksQ0FBQyxDQUFBO1FBQ3pCLEVBQUUsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLGtCQUFrQixDQUFDLENBQUMsQ0FBQztZQUFDLE1BQU0sQ0FBQyxrQkFBa0IsR0FBRyxFQUFFLENBQUE7UUFBQyxDQUFDO1FBQ2xFLE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUE7SUFDdkMsQ0FBQyxDQUFBO0FBQ0wsQ0FBQztBQU5ELG9CQU1DO0FBRUQ7SUFpQkk7O09BRUc7SUFDSDtRQUNJLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxjQUFjLENBQUMsQ0FBQTtJQUN0RCxDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsSUFBSTtRQUNBLElBQUksY0FBYyxHQUFHLEVBQUUsQ0FBQTtRQUN2QixHQUFHLENBQUMsQ0FBQyxJQUFJLGtCQUFrQixJQUFJLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLENBQUM7WUFDckQsY0FBYyxDQUFDLGtCQUFrQixDQUFDLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUE7UUFDakUsQ0FBQztRQUNELE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDO1lBQ3hCLEtBQUssSUFBSTtnQkFDTCxJQUFJLENBQUMsVUFBVSxDQUFBLENBQUMscUNBQXFDO2dCQUNyRCxLQUFLLENBQUE7WUFDVCxLQUFLLEtBQUs7Z0JBQ04sSUFBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsY0FBYyxDQUFDLENBQUE7UUFDakQsQ0FBQztJQUNMLENBQUM7SUFFRDs7O09BR0c7SUFDSCxRQUFRO1FBQ0osSUFBSSxDQUFDLElBQUksRUFBRSxDQUFBO0lBQ2YsQ0FBQztDQUNKO0FBakRELHNCQWlEQyJ9