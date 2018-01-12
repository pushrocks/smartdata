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
        this.tableName = collectedClassArg.name;
        this.db = dbArg;
        // tell the db class about it (important since Db uses different systems under the hood)
        this.db.addTable(this);
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.table) {
                // connect this instance to a RethinkDB table
                const availableTables = yield plugins.rethinkDb
                    .db(this.db.dbName)
                    .tableList()
                    .run(this.db.dbConnection);
                if (availableTables.indexOf(this.tableName)) {
                    yield plugins.rethinkDb
                        .db(this.db.dbName)
                        .tableCreate(this.tableName)
                        .run(this.db.dbConnection);
                }
            }
            this.table = plugins.rethinkDb.table(this.tableName);
        });
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
    find() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.init();
            return yield plugins.rethinkDb.table(this.tableName).filter({}).run(this.db.dbConnection);
        });
    }
    /**
     * create an object in the database
     */
    insert(dbDocArg) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.init();
            yield this.checkDoc(dbDocArg);
            return yield plugins.rethinkDb.table(this.tableName).insert(dbDocArg.createSavableObject()).run(this.db.dbConnection);
        });
    }
    /**
     * inserts object into the DbCollection
     */
    update(dbDocArg) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.init();
            yield this.checkDoc(dbDocArg);
            console.log(this.tableName, dbDocArg.createSavableObject());
            return yield plugins.rethinkDb.table(this.tableName).update(dbDocArg.createSavableObject()).run(this.db.dbConnection);
        });
    }
    /**
     * checks a Doc for constraints
     * if this.objectValidation is not set it passes.
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
    extractKey(writeResult) {
    }
}
exports.DbTable = DbTable;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic21hcnRkYXRhLmNsYXNzZXMuZGJjb2xsZWN0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vdHMvc21hcnRkYXRhLmNsYXNzZXMuZGJjb2xsZWN0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQSwrQ0FBOEM7QUFlOUMsb0JBQTRCLEVBQU07SUFDaEMsTUFBTSxDQUFDLFVBQVUsV0FBVztRQUMxQixXQUFXLENBQUUsY0FBYyxDQUFFLEdBQUcsSUFBSSxPQUFPLENBQUMsV0FBVyxFQUFFLEVBQUUsQ0FBQyxDQUFBO0lBQzlELENBQUMsQ0FBQTtBQUNILENBQUM7QUFKRCxnQ0FJQztBQUVEO0lBVUUsWUFBYSxpQkFBK0IsRUFBRSxLQUFTO1FBSnZELHFCQUFnQixHQUFzQixJQUFJLENBQUE7UUFLeEMsdUNBQXVDO1FBQ3ZDLElBQUksQ0FBQyxTQUFTLEdBQUcsaUJBQWlCLENBQUMsSUFBSSxDQUFBO1FBQ3ZDLElBQUksQ0FBQyxFQUFFLEdBQUcsS0FBSyxDQUFBO1FBRWYsd0ZBQXdGO1FBQ3hGLElBQUksQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFBO0lBQ3hCLENBQUM7SUFFSyxJQUFJOztZQUNSLEVBQUUsQ0FBQSxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7Z0JBQ2YsNkNBQTZDO2dCQUM3QyxNQUFNLGVBQWUsR0FBRyxNQUFNLE9BQU8sQ0FBQyxTQUFTO3FCQUM1QyxFQUFFLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUM7cUJBQ2xCLFNBQVMsRUFBRTtxQkFDWCxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxZQUFZLENBQUMsQ0FBQTtnQkFDNUIsRUFBRSxDQUFBLENBQUMsZUFBZSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUMzQyxNQUFNLE9BQU8sQ0FBQyxTQUFTO3lCQUN0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