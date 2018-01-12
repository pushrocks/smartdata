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
        /**
         * how the Doc in memory was created, may prove useful later.
         */
        this.creationStatus = 'new';
        this.name = this.constructor['name'];
        this.collection = this.constructor['dbCollection'];
    }
    /**
     * saves this instance but not any connected items
     * may lead to data inconsistencies, but is faster
     */
    save() {
        return __awaiter(this, void 0, void 0, function* () {
            let self = this;
            switch (this.creationStatus) {
                case 'db':
                    yield this.collection.update(self);
                    break;
                case 'new':
                    let writeResult = yield this.collection.insert(self);
                    this.creationStatus = 'db';
                    break;
                default:
                    console.error('neither new nor in db?');
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic21hcnRkYXRhLmNsYXNzZXMuZGJkb2MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi90cy9zbWFydGRhdGEuY2xhc3Nlcy5kYmRvYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBRUEsNkJBQStCO0FBTy9COztHQUVHO0FBQ0g7SUFDRSxNQUFNLENBQUMsQ0FBQyxNQUFrQixFQUFFLEdBQVcsRUFBRSxFQUFFO1FBQ3pDLE9BQU8sQ0FBQyxHQUFHLENBQUMsWUFBWSxDQUFDLENBQUE7UUFDekIsRUFBRSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxDQUFDO1lBQUMsTUFBTSxDQUFDLGtCQUFrQixHQUFHLEVBQUUsQ0FBQTtRQUFDLENBQUM7UUFDbEUsTUFBTSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQTtJQUNyQyxDQUFDLENBQUE7QUFDSCxDQUFDO0FBTkQsb0JBTUM7QUFFRDtJQTJCRTs7T0FFRztJQUNIO1FBdkJBOztXQUVHO1FBQ0gsbUJBQWMsR0FBaUIsS0FBSyxDQUFBO1FBcUJsQyxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLENBQUE7UUFDcEMsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFFLGNBQWMsQ0FBRSxDQUFBO0lBQ3RELENBQUM7SUFFRDs7O09BR0c7SUFDRyxJQUFJOztZQUNSLElBQUksSUFBSSxHQUFRLElBQUksQ0FBQTtZQUNwQixNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQztnQkFDNUIsS0FBSyxJQUFJO29CQUNQLE1BQU0sSUFBSSxDQUFDLFVBQVUsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUE7b0JBQ2xDLEtBQUssQ0FBQTtnQkFDUCxLQUFLLEtBQUs7b0JBQ1IsSUFBSSxXQUFXLEdBQUcsTUFBTSxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQTtvQkFDcEQsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUE7b0JBQzFCLEtBQUssQ0FBQztnQkFDUjtvQkFDRSxPQUFPLENBQUMsS0FBSyxDQUFDLHdCQUF3QixDQUFDLENBQUE7WUFDM0MsQ0FBQztRQUNILENBQUM7S0FBQTtJQUVEOzs7T0FHRztJQUNILFFBQVEsQ0FBRSxjQUFxQyxJQUFJO1FBQ2pELEVBQUUsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztZQUNqQixXQUFXLEdBQUcsSUFBSSxlQUFTLEVBQWMsQ0FBQTtRQUMzQyxDQUFDO1FBQ0QsV0FBVyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQTtRQUNyQixJQUFJLENBQUMsSUFBSSxFQUFFLENBQUE7UUFDWCxHQUFHLENBQUMsQ0FBQyxJQUFJLFdBQVcsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQzdCLElBQUksUUFBUSxHQUFRLElBQUksQ0FBRSxXQUFXLENBQUUsQ0FBQTtZQUN2QyxFQUFFLENBQUMsQ0FBQyxRQUFRLFlBQVksS0FBSyxJQUFJLENBQUMsV0FBVyxDQUFDLGNBQWMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3ZFLFFBQVEsQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLENBQUE7WUFDaEMsQ0FBQztRQUNILENBQUM7SUFDSCxDQUFDO0lBRUQsbUJBQW1CO1FBQ2pCLElBQUksY0FBYyxHQUFRLEVBQUUsQ0FBQSxDQUFDLCtDQUErQztRQUM1RSxHQUFHLENBQUMsQ0FBQyxJQUFJLGtCQUFrQixJQUFJLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDLENBQUM7WUFDdkQsY0FBYyxDQUFFLGtCQUFrQixDQUFFLEdBQUcsSUFBSSxDQUFFLGtCQUFrQixDQUFFLENBQUE7UUFDbkUsQ0FBQztRQUNELE1BQU0sQ0FBQyxjQUFjLENBQUE7SUFDdkIsQ0FBQztDQUNGO0FBL0VELHNCQStFQyJ9