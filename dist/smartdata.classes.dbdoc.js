"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lik_1 = require("lik");
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
        this.name = this.constructor['name'];
        this.collection = this.constructor['dbCollection'];
    }
    /**
     * saves this instance but not any connected items
     * may lead to data inconsistencies, but is faster
     */
    save() {
        let saveableObject = {}; // is not exposed to outside, so any is ok here
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
    saveDeep(savedMapArg = null) {
        if (!savedMapArg) {
            savedMapArg = new lik_1.Objectmap();
        }
        savedMapArg.add(this);
        this.save();
        for (let propertyKey in this) {
            let property = this[propertyKey];
            if (property instanceof DbDoc && !savedMapArg.checkForObject(property)) {
                property.saveDeep(savedMapArg);
            }
        }
    }
}
exports.DbDoc = DbDoc;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic21hcnRkYXRhLmNsYXNzZXMuZGJkb2MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi90cy9zbWFydGRhdGEuY2xhc3Nlcy5kYmRvYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUVBLDZCQUErQjtBQU8vQjs7R0FFRztBQUNIO0lBQ0UsTUFBTSxDQUFDLENBQUMsTUFBa0IsRUFBRSxHQUFXO1FBQ3JDLE9BQU8sQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLENBQUE7UUFDekIsRUFBRSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxDQUFDO1lBQUMsTUFBTSxDQUFDLGtCQUFrQixHQUFHLEVBQUUsQ0FBQTtRQUFDLENBQUM7UUFDbEUsTUFBTSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQTtJQUNyQyxDQUFDLENBQUE7QUFDSCxDQUFDO0FBTkQsb0JBTUM7QUFFRDtJQXNCRTs7T0FFRztJQUNIO1FBQ0UsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFBO1FBQ3BDLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBRSxjQUFjLENBQUUsQ0FBQTtJQUN0RCxDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsSUFBSTtRQUNGLElBQUksY0FBYyxHQUFRLEVBQUUsQ0FBQSxDQUFDLCtDQUErQztRQUM1RSxHQUFHLENBQUMsQ0FBQyxJQUFJLGtCQUFrQixJQUFJLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLENBQUM7WUFDdkQsY0FBYyxDQUFFLGtCQUFrQixDQUFFLEdBQUcsSUFBSSxDQUFFLGtCQUFrQixDQUFFLENBQUE7UUFDbkUsQ0FBQztRQUNELE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDO1lBQzFCLEtBQUssSUFBSTtnQkFDUCxJQUFJLENBQUMsVUFBVSxDQUFBLENBQUMscUNBQXFDO2dCQUNyRCxLQUFLLENBQUE7WUFDUCxLQUFLLEtBQUs7Z0JBQ1IsSUFBSSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUMsY0FBYyxDQUFDLENBQUE7UUFDN0MsQ0FBQztJQUNILENBQUM7SUFFRDs7O09BR0c7SUFDSCxRQUFRLENBQUMsY0FBcUMsSUFBSTtRQUNoRCxFQUFFLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7WUFDakIsV0FBVyxHQUFHLElBQUksZUFBUyxFQUFjLENBQUE7UUFDM0MsQ0FBQztRQUNELFdBQVcsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUE7UUFDckIsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFBO1FBQ1gsR0FBRyxDQUFDLENBQUMsSUFBSSxXQUFXLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQztZQUM3QixJQUFJLFFBQVEsR0FBRyxJQUFJLENBQUUsV0FBVyxDQUFFLENBQUE7WUFDbEMsRUFBRSxDQUFDLENBQUMsUUFBUSxZQUFZLEtBQUssSUFBSSxDQUFDLFdBQVcsQ0FBQyxjQUFjLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUN2RSxRQUFRLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxDQUFBO1lBQ2hDLENBQUM7UUFDSCxDQUFDO0lBQ0gsQ0FBQztDQUNGO0FBakVELHNCQWlFQyJ9