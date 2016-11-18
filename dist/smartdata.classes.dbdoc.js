"use strict";
/**
 * saveable - saveable decorator to be used on class properties
 */
function saveable(target, key) {
    console.log('called sva');
    if (!target.saveableProperties) {
        target.saveableProperties = [];
    }
    target.saveableProperties.push(key);
}
exports.saveable = saveable;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic21hcnRkYXRhLmNsYXNzZXMuZGJkb2MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi90cy9zbWFydGRhdGEuY2xhc3Nlcy5kYmRvYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBT0E7O0dBRUc7QUFDSCxrQkFBeUIsTUFBa0IsRUFBRSxHQUFXO0lBQ3BELE9BQU8sQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLENBQUE7SUFDekIsRUFBRSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxDQUFDO1FBQUMsTUFBTSxDQUFDLGtCQUFrQixHQUFHLEVBQUUsQ0FBQTtJQUFDLENBQUM7SUFDbEUsTUFBTSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQTtBQUN2QyxDQUFDO0FBSkQsNEJBSUM7QUFFRDtJQWlCSTs7T0FFRztJQUNIO1FBQ0ksSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLGNBQWMsQ0FBQyxDQUFBO0lBQ3RELENBQUM7SUFFRDs7O09BR0c7SUFDSCxJQUFJO1FBQ0EsSUFBSSxjQUFjLEdBQUcsRUFBRSxDQUFBO1FBQ3ZCLEdBQUcsQ0FBQyxDQUFDLElBQUksa0JBQWtCLElBQUksSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUMsQ0FBQztZQUNyRCxjQUFjLENBQUMsa0JBQWtCLENBQUMsR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQTtRQUNqRSxDQUFDO1FBQ0QsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUM7WUFDeEIsS0FBSyxJQUFJO2dCQUNMLElBQUksQ0FBQyxVQUFVLENBQUEsQ0FBQyxxQ0FBcUM7Z0JBQ3JELEtBQUssQ0FBQTtZQUNULEtBQUssS0FBSztnQkFDTixJQUFJLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxjQUFjLENBQUMsQ0FBQTtRQUNqRCxDQUFDO0lBQ0wsQ0FBQztJQUVEOzs7T0FHRztJQUNILFFBQVE7UUFDSixJQUFJLENBQUMsSUFBSSxFQUFFLENBQUE7SUFDZixDQUFDO0NBQ0o7QUFqREQsc0JBaURDIn0=