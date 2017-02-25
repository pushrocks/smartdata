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
        this.collection = this.constructor['dbCollection'];
    }
    /**
     * saves this instance but not any connected items
     * may lead to data inconsistencies, but is faster
     */
    save() {
        let saveableObject = {}; // isn not exposed to outside, so any is ok here
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic21hcnRkYXRhLmNsYXNzZXMuZGJkb2MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi90cy9zbWFydGRhdGEuY2xhc3Nlcy5kYmRvYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUVBLDZCQUErQjtBQU8vQjs7R0FFRztBQUNIO0lBQ0UsTUFBTSxDQUFDLENBQUMsTUFBa0IsRUFBRSxHQUFXO1FBQ3JDLE9BQU8sQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLENBQUE7UUFDekIsRUFBRSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxDQUFDO1lBQUMsTUFBTSxDQUFDLGtCQUFrQixHQUFHLEVBQUUsQ0FBQTtRQUFDLENBQUM7UUFDbEUsTUFBTSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQTtJQUNyQyxDQUFDLENBQUE7QUFDSCxDQUFDO0FBTkQsb0JBTUM7QUFFRDtJQWlCRTs7T0FFRztJQUNIO1FBQ0UsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFFLGNBQWMsQ0FBRSxDQUFBO0lBQ3RELENBQUM7SUFFRDs7O09BR0c7SUFDSCxJQUFJO1FBQ0YsSUFBSSxjQUFjLEdBQVEsRUFBRSxDQUFBLENBQUMsZ0RBQWdEO1FBQzdFLEdBQUcsQ0FBQyxDQUFDLElBQUksa0JBQWtCLElBQUksSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUMsQ0FBQztZQUN2RCxjQUFjLENBQUUsa0JBQWtCLENBQUUsR0FBRyxJQUFJLENBQUUsa0JBQWtCLENBQUUsQ0FBQTtRQUNuRSxDQUFDO1FBQ0QsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUM7WUFDMUIsS0FBSyxJQUFJO2dCQUNQLElBQUksQ0FBQyxVQUFVLENBQUEsQ0FBQyxxQ0FBcUM7Z0JBQ3JELEtBQUssQ0FBQTtZQUNQLEtBQUssS0FBSztnQkFDUixJQUFJLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxjQUFjLENBQUMsQ0FBQTtRQUM3QyxDQUFDO0lBQ0gsQ0FBQztJQUVEOzs7T0FHRztJQUNILFFBQVEsQ0FBQyxjQUFxQyxJQUFJO1FBQ2hELEVBQUUsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztZQUNqQixXQUFXLEdBQUcsSUFBSSxlQUFTLEVBQWMsQ0FBQTtRQUMzQyxDQUFDO1FBQ0QsV0FBVyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQTtRQUNyQixJQUFJLENBQUMsSUFBSSxFQUFFLENBQUE7UUFDWCxHQUFHLENBQUMsQ0FBQyxJQUFJLFdBQVcsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQzdCLElBQUksUUFBUSxHQUFHLElBQUksQ0FBRSxXQUFXLENBQUUsQ0FBQTtZQUNsQyxFQUFFLENBQUMsQ0FBQyxRQUFRLFlBQVksS0FBSyxJQUFJLENBQUMsV0FBVyxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3ZFLFFBQVEsQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLENBQUE7WUFDaEMsQ0FBQztRQUNILENBQUM7SUFDSCxDQUFDO0NBQ0Y7QUEzREQsc0JBMkRDIn0=