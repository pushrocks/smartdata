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
const plugins = require("./smartdata.plugins");
const lik_1 = require("lik");
const smartdata_classes_dbobjectdoc_1 = require("./smartdata.classes.dbobjectdoc");
class Db {
    constructor(dbUrlArg) {
        this.classCollections = new lik_1.Objectmap();
        this.objectCollections = new lik_1.Objectmap();
        this.dbUrl = dbUrlArg;
    }
    // basic connection stuff ----------------------------------------------
    /**
     * connects to the database that was specified during instance creation
     */
    connect() {
        return __awaiter(this, void 0, void 0, function* () {
            this.dbConnection = yield plugins.rethinkDb.connect('test');
        });
    }
    /**
     * closes the connection to the databse
     */
    close() {
        let done = plugins.smartq.defer();
        this.dbConnection.close();
        plugins.beautylog.ok(`disconnected to database at ${this.dbUrl}`);
        done.resolve();
        return done.promise;
    }
    // advanced communication with the database --------------------------------
    /**
     * gets a class based collection by name: string
     */
    getClassCollectionByName(nameArg) {
        return __awaiter(this, void 0, void 0, function* () {
            let resultCollection = this.classCollections.find((dbCollectionArg) => {
                return dbCollectionArg.name === nameArg;
            });
            return resultCollection;
        });
    }
    /**
     * gets an object collection by name
     */
    getObjectCollectionByName(nameArg, dbArg, makeNewArg = false) {
        return __awaiter(this, void 0, void 0, function* () {
            let resultCollection = this.objectCollections.find((dbCollectionArg) => {
                return dbCollectionArg.name === nameArg;
            });
            if (!resultCollection && makeNewArg) {
                resultCollection = smartdata_classes_dbobjectdoc_1.getObjectDoc(nameArg, this).collection;
                return resultCollection;
            }
            else {
                return resultCollection;
            }
        });
    }
    addCollection(dbCollectionArg) {
        this.classCollections.add(dbCollectionArg);
    }
}
exports.Db = Db;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic21hcnRkYXRhLmNsYXNzZXMuZGIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi90cy9zbWFydGRhdGEuY2xhc3Nlcy5kYi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsK0NBQThDO0FBQzlDLDZCQUErQjtBQUcvQixtRkFBOEQ7QUFTOUQ7SUFPRSxZQUFhLFFBQWdCO1FBSDdCLHFCQUFnQixHQUFHLElBQUksZUFBUyxFQUFxQixDQUFBO1FBQ3JELHNCQUFpQixHQUFHLElBQUksZUFBUyxFQUFxQixDQUFBO1FBR3BELElBQUksQ0FBQyxLQUFLLEdBQUcsUUFBUSxDQUFBO0lBQ3ZCLENBQUM7SUFFRCx3RUFBd0U7SUFFeEU7O09BRUc7SUFDRyxPQUFPOztZQUNYLElBQUksQ0FBQyxZQUFZLEdBQUcsTUFBTSxPQUFPLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQTtRQUM3RCxDQUFDO0tBQUE7SUFFRDs7T0FFRztJQUNILEtBQUs7UUFDSCxJQUFJLElBQUksR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFBO1FBQ2pDLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxFQUFFLENBQUE7UUFDekIsT0FBTyxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsK0JBQStCLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFBO1FBQ2pFLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQTtRQUNkLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFBO0lBQ3JCLENBQUM7SUFFRCw0RUFBNEU7SUFFNUU7O09BRUc7SUFDRyx3QkFBd0IsQ0FBSyxPQUFlOztZQUNoRCxJQUFJLGdCQUFnQixHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsQ0FBQyxlQUFlLEVBQUUsRUFBRTtnQkFDcEUsTUFBTSxDQUFDLGVBQWUsQ0FBQyxJQUFJLEtBQUssT0FBTyxDQUFBO1lBQ3pDLENBQUMsQ0FBQyxDQUFBO1lBQ0YsTUFBTSxDQUFDLGdCQUFnQixDQUFBO1FBQ3pCLENBQUM7S0FBQTtJQUVEOztPQUVHO0lBQ0cseUJBQXlCLENBQUssT0FBZSxFQUFFLEtBQVMsRUFBRyxhQUFzQixLQUFLOztZQUMxRixJQUFJLGdCQUFnQixHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsQ0FBQyxlQUFlLEVBQUUsRUFBRTtnQkFDckUsTUFBTSxDQUFDLGVBQWUsQ0FBQyxJQUFJLEtBQUssT0FBTyxDQUFBO1lBQ3pDLENBQUMsQ0FBQyxDQUFBO1lBQ0YsRUFBRSxDQUFDLENBQUMsQ0FBQyxnQkFBZ0IsSUFBSSxVQUFVLENBQUMsQ0FBQyxDQUFDO2dCQUNwQyxnQkFBZ0IsR0FBRyw0Q0FBWSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQyxVQUFVLENBQUE7Z0JBQ3pELE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQTtZQUN6QixDQUFDO1lBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ04sTUFBTSxDQUFDLGdCQUFnQixDQUFBO1lBQ3pCLENBQUM7UUFDSCxDQUFDO0tBQUE7SUFFRCxhQUFhLENBQUUsZUFBa0M7UUFDL0MsSUFBSSxDQUFDLGdCQUFnQixDQUFDLEdBQUcsQ0FBQyxlQUFlLENBQUMsQ0FBQTtJQUM1QyxDQUFDO0NBRUY7QUE5REQsZ0JBOERDIn0=