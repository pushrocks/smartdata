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
        let done = plugins.smartq.defer();
        plugins.mongodb.MongoClient.connect(this.dbUrl, (err, db) => {
            if (err) {
                console.log(err);
            }
            plugins.assert.equal(null, err);
            this.db = db;
            plugins.beautylog.success(`connected to database at ${this.dbUrl}`);
            done.resolve(this.db);
        });
        return done.promise;
    }
    /**
     * closes the connection to the databse
     */
    close() {
        let done = plugins.smartq.defer();
        this.db.close();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic21hcnRkYXRhLmNsYXNzZXMuZGIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi90cy9zbWFydGRhdGEuY2xhc3Nlcy5kYi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsK0NBQThDO0FBQzlDLDZCQUErQjtBQUcvQixtRkFBOEQ7QUFPOUQ7SUFPRSxZQUFhLFFBQWdCO1FBSDdCLHFCQUFnQixHQUFHLElBQUksZUFBUyxFQUFxQixDQUFBO1FBQ3JELHNCQUFpQixHQUFHLElBQUksZUFBUyxFQUFxQixDQUFBO1FBR3BELElBQUksQ0FBQyxLQUFLLEdBQUcsUUFBUSxDQUFBO0lBQ3ZCLENBQUM7SUFFRCx3RUFBd0U7SUFFeEU7O09BRUc7SUFDSCxPQUFPO1FBQ0wsSUFBSSxJQUFJLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQTtRQUNqQyxPQUFPLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDLEdBQUcsRUFBRSxFQUFFO1lBQ3RELEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7Z0JBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQTtZQUFDLENBQUM7WUFDN0IsT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFBO1lBQy9CLElBQUksQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFBO1lBQ1osT0FBTyxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsNEJBQTRCLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFBO1lBQ25FLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFBO1FBQ3ZCLENBQUMsQ0FBQyxDQUFBO1FBQ0YsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUE7SUFDckIsQ0FBQztJQUVEOztPQUVHO0lBQ0gsS0FBSztRQUNILElBQUksSUFBSSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUE7UUFDakMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxLQUFLLEVBQUUsQ0FBQTtRQUNmLE9BQU8sQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLCtCQUErQixJQUFJLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQTtRQUNqRSxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUE7UUFDZCxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQTtJQUNyQixDQUFDO0lBRUQsNEVBQTRFO0lBRTVFOztPQUVHO0lBQ0csd0JBQXdCLENBQUssT0FBZTs7WUFDaEQsSUFBSSxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLENBQUMsZUFBZTtnQkFDaEUsTUFBTSxDQUFDLGVBQWUsQ0FBQyxJQUFJLEtBQUssT0FBTyxDQUFBO1lBQ3pDLENBQUMsQ0FBQyxDQUFBO1lBQ0YsTUFBTSxDQUFDLGdCQUFnQixDQUFBO1FBQ3pCLENBQUM7S0FBQTtJQUVEOztPQUVHO0lBQ0cseUJBQXlCLENBQUssT0FBZSxFQUFFLEtBQVMsRUFBRyxhQUFzQixLQUFLOztZQUMxRixJQUFJLGdCQUFnQixHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsQ0FBQyxlQUFlO2dCQUNqRSxNQUFNLENBQUMsZUFBZSxDQUFDLElBQUksS0FBSyxPQUFPLENBQUE7WUFDekMsQ0FBQyxDQUFDLENBQUE7WUFDRixFQUFFLENBQUMsQ0FBQyxDQUFDLGdCQUFnQixJQUFJLFVBQVUsQ0FBQyxDQUFDLENBQUM7Z0JBQ3BDLGdCQUFnQixHQUFHLDRDQUFZLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDLFVBQVUsQ0FBQTtnQkFDekQsTUFBTSxDQUFDLGdCQUFnQixDQUFBO1lBQ3pCLENBQUM7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDTixNQUFNLENBQUMsZ0JBQWdCLENBQUE7WUFDekIsQ0FBQztRQUNILENBQUM7S0FBQTtJQUVELGFBQWEsQ0FBRSxlQUFrQztRQUMvQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQyxDQUFBO0lBQzVDLENBQUM7Q0FFRjtBQXRFRCxnQkFzRUMifQ==