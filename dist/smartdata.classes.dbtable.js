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
/**
 * This is a decorator that will tell the decorated class what dbTable to use
 * @param db
 */
function Table(db) {
    return function (constructor) {
        constructor["dbTable"] = new DbTable(constructor, db);
    };
}
exports.Table = Table;
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
    find(filterObject) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.init();
            let cursor = yield plugins.rethinkDb
                .table(this.tableName)
                .filter(filterObject)
                .run(this.db.dbConnection);
            return yield cursor.toArray();
        });
    }
    /**
     * create an object in the database
     */
    insert(dbDocArg) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.init();
            yield this.checkDoc(dbDocArg);
            return yield plugins.rethinkDb
                .table(this.tableName)
                .insert(dbDocArg.createSavableObject())
                .run(this.db.dbConnection);
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
            return yield plugins.rethinkDb
                .table(this.tableName)
                .update(dbDocArg.createSavableObject())
                .run(this.db.dbConnection);
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
            done.reject("validation of object did not pass");
        }
        return done.promise;
    }
    extractKey(writeResult) { }
}
exports.DbTable = DbTable;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic21hcnRkYXRhLmNsYXNzZXMuZGJ0YWJsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL3RzL3NtYXJ0ZGF0YS5jbGFzc2VzLmRidGFibGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLCtDQUErQztBQWtCL0M7OztHQUdHO0FBQ0gsZUFBc0IsRUFBTTtJQUMxQixNQUFNLENBQUMsVUFBUyxXQUFXO1FBQ3pCLFdBQVcsQ0FBQyxTQUFTLENBQUMsR0FBRyxJQUFJLE9BQU8sQ0FBQyxXQUFXLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFDeEQsQ0FBQyxDQUFDO0FBQ0osQ0FBQztBQUpELHNCQUlDO0FBRUQ7SUFTRSxZQUFZLGlCQUErQixFQUFFLEtBQVM7UUFKdEQscUJBQWdCLEdBQTBCLElBQUksQ0FBQztRQUs3Qyx1Q0FBdUM7UUFDdkMsSUFBSSxDQUFDLFNBQVMsR0FBRyxpQkFBaUIsQ0FBQyxJQUFJLENBQUM7UUFDeEMsSUFBSSxDQUFDLEVBQUUsR0FBRyxLQUFLLENBQUM7UUFFaEIsd0ZBQXdGO1FBQ3hGLElBQUksQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3pCLENBQUM7SUFFSyxJQUFJOztZQUNSLEVBQUUsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7Z0JBQ2hCLDZDQUE2QztnQkFDN0MsTUFBTSxlQUFlLEdBQUcsTUFBTSxPQUFPLENBQUMsU0FBUztxQkFDNUMsRUFBRSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsTUFBTSxDQUFDO3FCQUNsQixTQUFTLEVBQUU7cUJBQ1gsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsWUFBWSxDQUFDLENBQUM7Z0JBQzdCLEVBQUUsQ0FBQyxDQUFDLGVBQWUsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDNUMsTUFBTSxPQUFPLENBQUMsU0FBUzt5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