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
    constructor(nameArg) {
        this.collection = this.constructor['dbCollection'];
        this.name = nameArg;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic21hcnRkYXRhLmNsYXNzZXMuZGJEb2MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi90cy9zbWFydGRhdGEuY2xhc3Nlcy5kYkRvYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUVBLDZCQUErQjtBQU8vQjs7R0FFRztBQUNIO0lBQ0UsTUFBTSxDQUFDLENBQUMsTUFBa0IsRUFBRSxHQUFXO1FBQ3JDLE9BQU8sQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLENBQUE7UUFDekIsRUFBRSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxDQUFDO1lBQUMsTUFBTSxDQUFDLGtCQUFrQixHQUFHLEVBQUUsQ0FBQTtRQUFDLENBQUM7UUFDbEUsTUFBTSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQTtJQUNyQyxDQUFDLENBQUE7QUFDSCxDQUFDO0FBTkQsb0JBTUM7QUFFRDtJQXNCRTs7T0FFRztJQUNILFlBQVksT0FBZTtRQUN6QixJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUUsY0FBYyxDQUFFLENBQUE7UUFDcEQsSUFBSSxDQUFDLElBQUksR0FBRyxPQUFPLENBQUE7SUFDckIsQ0FBQztJQUVEOzs7T0FHRztJQUNILElBQUk7UUFDRixJQUFJLGNBQWMsR0FBUSxFQUFFLENBQUEsQ0FBQywrQ0FBK0M7UUFDNUUsR0FBRyxDQUFDLENBQUMsSUFBSSxrQkFBa0IsSUFBSSxJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxDQUFDO1lBQ3ZELGNBQWMsQ0FBRSxrQkFBa0IsQ0FBRSxHQUFHLElBQUksQ0FBRSxrQkFBa0IsQ0FBRSxDQUFBO1FBQ25FLENBQUM7UUFDRCxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQztZQUMxQixLQUFLLElBQUk7Z0JBQ1AsSUFBSSxDQUFDLFVBQVUsQ0FBQSxDQUFDLHFDQUFxQztnQkFDckQsS0FBSyxDQUFBO1lBQ1AsS0FBSyxLQUFLO2dCQUNSLElBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLGNBQWMsQ0FBQyxDQUFBO1FBQzdDLENBQUM7SUFDSCxDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsUUFBUSxDQUFDLGNBQXFDLElBQUk7UUFDaEQsRUFBRSxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDO1lBQ2pCLFdBQVcsR0FBRyxJQUFJLGVBQVMsRUFBYyxDQUFBO1FBQzNDLENBQUM7UUFDRCxXQUFXLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFBO1FBQ3JCLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQTtRQUNYLEdBQUcsQ0FBQyxDQUFDLElBQUksV0FBVyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDN0IsSUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFFLFdBQVcsQ0FBRSxDQUFBO1lBQ2xDLEVBQUUsQ0FBQyxDQUFDLFFBQVEsWUFBWSxLQUFLLElBQUksQ0FBQyxXQUFXLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDdkUsUUFBUSxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsQ0FBQTtZQUNoQyxDQUFDO1FBQ0gsQ0FBQztJQUNILENBQUM7Q0FDRjtBQWpFRCxzQkFpRUMifQ==