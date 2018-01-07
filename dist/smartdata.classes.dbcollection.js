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
function Collection(db) {
    return function (constructor) {
        constructor['dbCollection'] = new DbTable(constructor, db);
    };
}
exports.Collection = Collection;
class DbTable {
    constructor(collectedClassArg, dbArg) {
        this.objectValidation = null;
        // tell the collection where it belongs
        this.name = collectedClassArg.name;
        this.db = dbArg;
        // connect this instance to a RethinkDB table
        this.table = plugins.rethinkDb.db(this.db.dbName).table(this.name);
        // tell the db class about it (important since Db uses different systems under the hood)
        this.db.addTable(this);
    }
    /**
     * adds a validation function that all newly inserted and updated objects have to pass
     */
    addDocValidation(funcArg) {
        this.objectValidation = funcArg;
    }
    /**
     * finds an object in the DbCollection
     */
    find(docMatchArg, optionsArg) {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
    /**
     * inserts object into the DbCollection
     */
    insertOne(docArg) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.checkDoc(docArg);
        });
    }
    /**
     * inserts many objects at once into the DbCollection
     */
    insertMany(docArrayArg) {
        let done = plugins.smartq.defer();
        let checkDocPromiseArray = [];
        for (let docArg of docArrayArg) {
            checkDocPromiseArray.push(this.checkDoc(docArg));
        }
        Promise.all(checkDocPromiseArray).then(() => {
            this.table.insertMany(docArrayArg)
                .then(() => { done.resolve(); });
        });
        return done.promise;
    }
    /**
     * checks a Doc for constraints
     */
    checkDoc(docArg) {
        let done = plugins.smartq.defer();
        let validationResult = true;
        if (this.objectValidation) {
            validationResult = this.objectValidation(docArg);
        }
        if (validationResult) {
            done.resolve();
        }
        else {
            done.reject('validation of object did not pass');
        }
        return done.promise;
    }
}
exports.DbTable = DbTable;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic21hcnRkYXRhLmNsYXNzZXMuZGJjb2xsZWN0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vdHMvc21hcnRkYXRhLmNsYXNzZXMuZGJjb2xsZWN0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSwrQ0FBOEM7QUFZOUMsb0JBQTRCLEVBQU07SUFDaEMsTUFBTSxDQUFDLFVBQVUsV0FBVztRQUMxQixXQUFXLENBQUUsY0FBYyxDQUFFLEdBQUcsSUFBSSxPQUFPLENBQUMsV0FBVyxFQUFFLEVBQUUsQ0FBQyxDQUFBO0lBQzlELENBQUMsQ0FBQTtBQUNILENBQUM7QUFKRCxnQ0FJQztBQUVEO0lBVUUsWUFBYSxpQkFBK0IsRUFBRSxLQUFTO1FBSnZELHFCQUFnQixHQUFzQixJQUFJLENBQUE7UUFLeEMsdUNBQXVDO1FBQ3ZDLElBQUksQ0FBQyxJQUFJLEdBQUcsaUJBQWlCLENBQUMsSUFBSSxDQUFBO1FBQ2xDLElBQUksQ0FBQyxFQUFFLEdBQUcsS0FBSyxDQUFBO1FBRWYsNkNBQTZDO1FBQzdDLElBQUksQ0FBQyxLQUFLLEdBQUcsT0FBTyxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFBO1FBRWxFLHdGQUF3RjtRQUN4RixJQUFJLENBQUMsRUFBRSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQTtJQUN4QixDQUFDO0lBRUQ7O09BRUc7SUFDSCxnQkFBZ0IsQ0FBRSxPQUEwQjtRQUMxQyxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsT0FBTyxDQUFBO0lBQ2pDLENBQUM7SUFFRDs7T0FFRztJQUNHLElBQUksQ0FBRSxXQUFvQixFQUFFLFVBQXlCOztRQUUzRCxDQUFDO0tBQUE7SUFFRDs7T0FFRztJQUNHLFNBQVMsQ0FBRSxNQUFTOztZQUN4QixNQUFNLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUE7UUFDN0IsQ0FBQztLQUFBO0lBRUQ7O09BRUc7SUFDSCxVQUFVLENBQUUsV0FBZ0I7UUFDMUIsSUFBSSxJQUFJLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQVEsQ0FBQTtRQUN2QyxJQUFJLG9CQUFvQixHQUFvQixFQUFFLENBQUE7UUFDOUMsR0FBRyxDQUFDLENBQUMsSUFBSSxNQUFNLElBQUksV0FBVyxDQUFDLENBQUMsQ0FBQztZQUMvQixvQkFBb0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFBO1FBQ2xELENBQUM7UUFDRCxPQUFPLENBQUMsR0FBRyxDQUFDLG9CQUFvQixDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRTtZQUMxQyxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUM7aUJBQy9CLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUEsQ0FBQyxDQUFDLENBQUMsQ0FBQTtRQUNuQyxDQUFDLENBQUMsQ0FBQTtRQUNGLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFBO0lBQ3JCLENBQUM7SUFFRDs7T0FFRztJQUNLLFFBQVEsQ0FBRSxNQUFTO1FBQ3pCLElBQUksSUFBSSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFRLENBQUE7UUFDdkMsSUFBSSxnQkFBZ0IsR0FBRyxJQUFJLENBQUE7UUFDM0IsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQztZQUMxQixnQkFBZ0IsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsTUFBTSxDQUFDLENBQUE7UUFDbEQsQ0FBQztRQUNELEVBQUUsQ0FBQyxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQztZQUNyQixJQUFJLENBQUMsT0FBTyxFQUFFLENBQUE7UUFDaEIsQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ04sSUFBSSxDQUFDLE1BQU0sQ0FBQyxtQ0FBbUMsQ0FBQyxDQUFBO1FBQ2xELENBQUM7UUFDRCxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQTtJQUNyQixDQUFDO0NBQ0Y7QUEzRUQsMEJBMkVDIn0=