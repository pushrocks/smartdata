"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const lik_1 = require("lik");
/**
 * saveable - saveable decorator to be used on class properties
 */
function svDb() {
    return (target, key) => {
        console.log("called sva");
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
        /**
         * how the Doc in memory was created, may prove useful later.
         */
        this.creationStatus = "new";
        this.name = this.constructor["name"];
        this.collection = this.constructor["dbTable"];
    }
    static getInstances(filterArg) {
        return __awaiter(this, void 0, void 0, function* () {
            let self = this; // fool typesystem
            let referenceTable = self.dbTable;
            const foundDocs = yield referenceTable.find(filterArg);
            const returnArray = [];
            for (let item of foundDocs) {
                let newInstance = new this();
                for (let key in item) {
                    if (key !== 'id') {
                        newInstance[key] = item[key];
                    }
                }
                returnArray.push(newInstance);
            }
            return returnArray;
        });
    }
    /**
     * saves this instance but not any connected items
     * may lead to data inconsistencies, but is faster
     */
    save() {
        return __awaiter(this, void 0, void 0, function* () {
            let self = this;
            switch (this.creationStatus) {
                case "db":
                    yield this.collection.update(self);
                    break;
                case "new":
                    let writeResult = yield this.collection.insert(self);
                    this.creationStatus = "db";
                    break;
                default:
                    console.error("neither new nor in db?");
            }
        });
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
    createSavableObject() {
        let saveableObject = {}; // is not exposed to outside, so any is ok here
        for (let propertyNameString of this.saveableProperties) {
            saveableObject[propertyNameString] = this[propertyNameString];
        }
        return saveableObject;
    }
}
exports.DbDoc = DbDoc;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic21hcnRkYXRhLmNsYXNzZXMuZGJkb2MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi90cy9zbWFydGRhdGEuY2xhc3Nlcy5kYmRvYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBRUEsNkJBQWdDO0FBT2hDOztHQUVHO0FBQ0g7SUFDRSxNQUFNLENBQUMsQ0FBQyxNQUFrQixFQUFFLEdBQVcsRUFBRSxFQUFFO1FBQ3pDLE9BQU8sQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDMUIsRUFBRSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxDQUFDO1lBQy9CLE1BQU0sQ0FBQyxrQkFBa0IsR0FBRyxFQUFFLENBQUM7UUFDakMsQ0FBQztRQUNELE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDdEMsQ0FBQyxDQUFDO0FBQ0osQ0FBQztBQVJELG9CQVFDO0FBRUQ7SUEwQkU7O09BRUc7SUFDSDtRQXZCQTs7V0FFRztRQUNILG1CQUFjLEdBQWlCLEtBQUssQ0FBQztRQXFCbkMsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3JDLElBQUksQ0FBQyxVQUFVLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUNoRCxDQUFDO0lBRUQsTUFBTSxDQUFPLFlBQVksQ0FBSSxTQUFTOztZQUNwQyxJQUFJLElBQUksR0FBUSxJQUFJLENBQUMsQ0FBQyxrQkFBa0I7WUFDeEMsSUFBSSxjQUFjLEdBQWUsSUFBSSxDQUFDLE9BQU8sQ0FBQztZQUM5QyxNQUFNLFNBQVMsR0FBRyxNQUFNLGNBQWMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDdkQsTUFBTSxXQUFXLEdBQUcsRUFBRSxDQUFDO1lBQ3ZCLEdBQUcsQ0FBQyxDQUFDLElBQUksSUFBSSxJQUFJLFNBQVMsQ0FBQyxDQUFDLENBQUM7Z0JBQzNCLElBQUksV0FBVyxHQUFHLElBQUksSUFBSSxFQUFFLENBQUM7Z0JBQzdCLEdBQUcsQ0FBQyxDQUFDLElBQUksR0FBRyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUM7b0JBQ3JCLEVBQUUsQ0FBQSxDQUFDLEdBQUcsS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDO3dCQUNoQixXQUFXLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO29CQUMvQixDQUFDO2dCQUNILENBQUM7Z0JBQ0QsV0FBVyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUNoQyxDQUFDO1lBQ0QsTUFBTSxDQUFDLFdBQVcsQ0FBQztRQUNyQixDQUFDO0tBQUE7SUFFRDs7O09BR0c7SUFDRyxJQUFJOztZQUNSLElBQUksSUFBSSxHQUFRLElBQUksQ0FBQztZQUNyQixNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQztnQkFDNUIsS0FBSyxJQUFJO29CQUNQLE1BQU0sSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7b0JBQ25DLEtBQUssQ0FBQztnQkFDUixLQUFLLEtBQUs7b0JBQ1IsSUFBSSxXQUFXLEdBQUcsTUFBTSxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztvQkFDckQsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUM7b0JBQzNCLEtBQUssQ0FBQztnQkFDUjtvQkFDRSxPQUFPLENBQUMsS0FBSyxDQUFDLHdCQUF3QixDQUFDLENBQUM7WUFDNUMsQ0FBQztRQUNILENBQUM7S0FBQTtJQUVEOzs7T0FHRztJQUNILFFBQVEsQ0FBQyxjQUFxQyxJQUFJO1FBQ2hELEVBQUUsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztZQUNqQixXQUFXLEdBQUcsSUFBSSxlQUFTLEVBQWMsQ0FBQztRQUM1QyxDQUFDO1FBQ0QsV0FBVyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN0QixJQUFJLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDWixHQUFHLENBQUMsQ0FBQyxJQUFJLFdBQVcsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQzdCLElBQUksUUFBUSxHQUFRLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUN0QyxFQUFFLENBQUMsQ0FBQyxRQUFRLFlBQVksS0FBSyxJQUFJLENBQUMsV0FBVyxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3ZFLFFBQVEsQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLENBQUM7WUFDakMsQ0FBQztRQUNILENBQUM7SUFDSCxDQUFDO0lBRUQsbUJBQW1CO1FBQ2pCLElBQUksY0FBYyxHQUFRLEVBQUUsQ0FBQyxDQUFDLCtDQUErQztRQUM3RSxHQUFHLENBQUMsQ0FBQyxJQUFJLGtCQUFrQixJQUFJLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLENBQUM7WUFDdkQsY0FBYyxDQUFDLGtCQUFrQixDQUFDLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUM7UUFDaEUsQ0FBQztRQUNELE1BQU0sQ0FBQyxjQUFjLENBQUM7SUFDeEIsQ0FBQztDQUNGO0FBL0ZELHNCQStGQyJ9