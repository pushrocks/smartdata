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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic21hcnRkYXRhLmNsYXNzZXMuZGIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi90cy9zbWFydGRhdGEuY2xhc3Nlcy5kYi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsK0NBQThDO0FBQzlDLDZCQUErQjtBQUcvQixtRkFBOEQ7QUFPOUQ7SUFPRSxZQUFhLFFBQWdCO1FBSDdCLHFCQUFnQixHQUFHLElBQUksZUFBUyxFQUFxQixDQUFBO1FBQ3JELHNCQUFpQixHQUFHLElBQUksZUFBUyxFQUFxQixDQUFBO1FBR3BELElBQUksQ0FBQyxLQUFLLEdBQUcsUUFBUSxDQUFBO0lBQ3ZCLENBQUM7SUFFRCx3RUFBd0U7SUFFeEU7O09BRUc7SUFDSCxPQUFPO1FBQ0wsSUFBSSxJQUFJLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQTtRQUNqQyxPQUFPLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDLEdBQUcsRUFBRSxFQUFFLEVBQUUsRUFBRTtZQUMxRCxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO2dCQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUE7WUFBQyxDQUFDO1lBQzdCLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQTtZQUMvQixJQUFJLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQTtZQUNaLE9BQU8sQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLDRCQUE0QixJQUFJLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQTtZQUNuRSxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQTtRQUN2QixDQUFDLENBQUMsQ0FBQTtRQUNGLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFBO0lBQ3JCLENBQUM7SUFFRDs7T0FFRztJQUNILEtBQUs7UUFDSCxJQUFJLElBQUksR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFBO1FBQ2pDLElBQUksQ0FBQyxFQUFFLENBQUMsS0FBSyxFQUFFLENBQUE7UUFDZixPQUFPLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQywrQkFBK0IsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUE7UUFDakUsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFBO1FBQ2QsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUE7SUFDckIsQ0FBQztJQUVELDRFQUE0RTtJQUU1RTs7T0FFRztJQUNHLHdCQUF3QixDQUFLLE9BQWU7O1lBQ2hELElBQUksZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxDQUFDLGVBQWUsRUFBRSxFQUFFO2dCQUNwRSxNQUFNLENBQUMsZUFBZSxDQUFDLElBQUksS0FBSyxPQUFPLENBQUE7WUFDekMsQ0FBQyxDQUFDLENBQUE7WUFDRixNQUFNLENBQUMsZ0JBQWdCLENBQUE7UUFDekIsQ0FBQztLQUFBO0lBRUQ7O09BRUc7SUFDRyx5QkFBeUIsQ0FBSyxPQUFlLEVBQUUsS0FBUyxFQUFHLGFBQXNCLEtBQUs7O1lBQzFGLElBQUksZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLElBQUksQ0FBQyxDQUFDLGVBQWUsRUFBRSxFQUFFO2dCQUNyRSxNQUFNLENBQUMsZUFBZSxDQUFDLElBQUksS0FBSyxPQUFPLENBQUE7WUFDekMsQ0FBQyxDQUFDLENBQUE7WUFDRixFQUFFLENBQUMsQ0FBQyxDQUFDLGdCQUFnQixJQUFJLFVBQVUsQ0FBQyxDQUFDLENBQUM7Z0JBQ3BDLGdCQUFnQixHQUFHLDRDQUFZLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDLFVBQVUsQ0FBQTtnQkFDekQsTUFBTSxDQUFDLGdCQUFnQixDQUFBO1lBQ3pCLENBQUM7WUFBQyxJQUFJLENBQUMsQ0FBQztnQkFDTixNQUFNLENBQUMsZ0JBQWdCLENBQUE7WUFDekIsQ0FBQztRQUNILENBQUM7S0FBQTtJQUVELGFBQWEsQ0FBRSxlQUFrQztRQUMvQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQyxDQUFBO0lBQzVDLENBQUM7Q0FFRjtBQXRFRCxnQkFzRUMifQ==