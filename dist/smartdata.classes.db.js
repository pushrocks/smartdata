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
class Db {
    constructor(connectionOptionsArg) {
        this.dbTablesMap = new lik_1.Objectmap();
        this.dbName = connectionOptionsArg.db;
        this.connectionOptions = connectionOptionsArg;
        this.status = 'initial';
    }
    // basic connection stuff ----------------------------------------------
    /**
     * connects to the database that was specified during instance creation
     */
    connect() {
        return __awaiter(this, void 0, void 0, function* () {
            this.dbConnection = yield plugins.rethinkDb.connect(this.connectionOptions);
            this.status = 'connected';
            plugins.beautylog.ok(`Connected to database ${this.dbName}`);
        });
    }
    /**
     * closes the connection to the databse
     */
    close() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.dbConnection.close();
            this.status = 'disconnected';
            plugins.beautylog.ok(`disconnected to database ${this.dbName}`);
        });
    }
    // handle table to class distribution
    /**
     * Gets a table's name and returns smartdata's DbTable class
     * @param nameArg
     * @returns DbTable
     */
    getDbTableByName(nameArg) {
        return __awaiter(this, void 0, void 0, function* () {
            let resultCollection = this.dbTablesMap.find((dbCollectionArg) => {
                return dbCollectionArg.name === nameArg;
            });
            return resultCollection;
        });
    }
    addTable(dbCollectionArg) {
        this.dbTablesMap.add(dbCollectionArg);
    }
}
exports.Db = Db;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic21hcnRkYXRhLmNsYXNzZXMuZGIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi90cy9zbWFydGRhdGEuY2xhc3Nlcy5kYi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsK0NBQThDO0FBQzlDLDZCQUErQjtBQVkvQjtJQU9FLFlBQVksb0JBQXVDO1FBRm5ELGdCQUFXLEdBQUcsSUFBSSxlQUFTLEVBQWdCLENBQUE7UUFHekMsSUFBSSxDQUFDLE1BQU0sR0FBRyxvQkFBb0IsQ0FBQyxFQUFFLENBQUE7UUFDckMsSUFBSSxDQUFDLGlCQUFpQixHQUFHLG9CQUFvQixDQUFBO1FBQzdDLElBQUksQ0FBQyxNQUFNLEdBQUcsU0FBUyxDQUFBO0lBQ3pCLENBQUM7SUFFRCx3RUFBd0U7SUFFeEU7O09BRUc7SUFDRyxPQUFPOztZQUNYLElBQUksQ0FBQyxZQUFZLEdBQUcsTUFBTSxPQUFPLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQTtZQUMzRSxJQUFJLENBQUMsTUFBTSxHQUFHLFdBQVcsQ0FBQTtZQUN6QixPQUFPLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyx5QkFBeUIsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUE7UUFDOUQsQ0FBQztLQUFBO0lBRUQ7O09BRUc7SUFDRyxLQUFLOztZQUNULE1BQU0sSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLEVBQUUsQ0FBQTtZQUMvQixJQUFJLENBQUMsTUFBTSxHQUFHLGNBQWMsQ0FBQTtZQUM1QixPQUFPLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyw0QkFBNEIsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUE7UUFDakUsQ0FBQztLQUFBO0lBRUQscUNBQXFDO0lBRXJDOzs7O09BSUc7SUFDRyxnQkFBZ0IsQ0FBSSxPQUFlOztZQUN2QyxJQUFJLGdCQUFnQixHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUMsZUFBZSxFQUFFLEVBQUU7Z0JBQy9ELE1BQU0sQ0FBQyxlQUFlLENBQUMsSUFBSSxLQUFLLE9BQU8sQ0FBQTtZQUN6QyxDQUFDLENBQUMsQ0FBQTtZQUNGLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQTtRQUN6QixDQUFDO0tBQUE7SUFFRCxRQUFRLENBQUUsZUFBNkI7UUFDckMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDLENBQUE7SUFDdkMsQ0FBQztDQUNGO0FBbERELGdCQWtEQyJ9