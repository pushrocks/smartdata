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
        this.status = "initial";
    }
    /**
     * supply additional SSl options needed to connect to certain Rethink DB servers (e.g. compose.io)
     */
    setSsl(certificateStringArg, formatArg) {
        let certificateString;
        if ((formatArg = "base64")) {
            certificateString = plugins.smartstring.base64.decode(certificateStringArg);
        }
        else {
            certificateString = certificateStringArg;
        }
        this.connectionOptions["ssl"] = {
            ca: Buffer.from(certificateString)
        };
    }
    // basic connection stuff ----------------------------------------------
    /**
     * connects to the database that was specified during instance creation
     */
    connect() {
        return __awaiter(this, void 0, void 0, function* () {
            this.dbConnection = yield plugins.rethinkDb.connect(this.connectionOptions);
            this.dbConnection.use(this.dbName);
            this.status = "connected";
            plugins.beautylog.ok(`Connected to database ${this.dbName}`);
        });
    }
    /**
     * closes the connection to the databse
     */
    close() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.dbConnection.close();
            this.status = "disconnected";
            plugins.beautylog.ok(`disconnected from database ${this.dbName}`);
        });
    }
    // handle table to class distribution
    addTable(dbTableArg) {
        this.dbTablesMap.add(dbTableArg);
    }
    /**
     * Gets a table's name and returns smartdata's DbTable class
     * @param nameArg
     * @returns DbTable
     */
    getDbTableByName(nameArg) {
        return __awaiter(this, void 0, void 0, function* () {
            let resultCollection = this.dbTablesMap.find(dbTableArg => {
                return dbTableArg.tableName === nameArg;
            });
            return resultCollection;
        });
    }
}
exports.Db = Db;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic21hcnRkYXRhLmNsYXNzZXMuZGIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi90cy9zbWFydGRhdGEuY2xhc3Nlcy5kYi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsK0NBQStDO0FBQy9DLDZCQUFnQztBQW1CaEM7SUFPRSxZQUFZLG9CQUF3QztRQUZwRCxnQkFBVyxHQUFHLElBQUksZUFBUyxFQUFnQixDQUFDO1FBRzFDLElBQUksQ0FBQyxNQUFNLEdBQUcsb0JBQW9CLENBQUMsRUFBRSxDQUFDO1FBQ3RDLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxvQkFBb0IsQ0FBQztRQUM5QyxJQUFJLENBQUMsTUFBTSxHQUFHLFNBQVMsQ0FBQztJQUMxQixDQUFDO0lBRUQ7O09BRUc7SUFDSCxNQUFNLENBQUMsb0JBQTRCLEVBQUUsU0FBaUM7UUFDcEUsSUFBSSxpQkFBeUIsQ0FBQztRQUM5QixFQUFFLENBQUMsQ0FBQyxDQUFDLFNBQVMsR0FBRyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDM0IsaUJBQWlCLEdBQUcsT0FBTyxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUNuRCxvQkFBb0IsQ0FDckIsQ0FBQztRQUNKLENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNOLGlCQUFpQixHQUFHLG9CQUFvQixDQUFDO1FBQzNDLENBQUM7UUFDRCxJQUFJLENBQUMsaUJBQWlCLENBQUMsS0FBSyxDQUFDLEdBQUc7WUFDOUIsRUFBRSxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUM7U0FDbkMsQ0FBQztJQUNKLENBQUM7SUFFRCx3RUFBd0U7SUFFeEU7O09BRUc7SUFDRyxPQUFPOztZQUNYLElBQUksQ0FBQyxZQUFZLEdBQUcsTUFBTSxPQUFPLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQztZQUM1RSxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7WUFDbkMsSUFBSSxDQUFDLE1BQU0sR0FBRyxXQUFXLENBQUM7WUFDMUIsT0FBTyxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMseUJBQXlCLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDO1FBQy9ELENBQUM7S0FBQTtJQUVEOztPQUVHO0lBQ0csS0FBSzs7WUFDVCxNQUFNLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDaEMsSUFBSSxDQUFDLE1BQU0sR0FBRyxjQUFjLENBQUM7WUFDN0IsT0FBTyxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsOEJBQThCLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDO1FBQ3BFLENBQUM7S0FBQTtJQUVELHFDQUFxQztJQUVyQyxRQUFRLENBQUMsVUFBd0I7UUFDL0IsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDbkMsQ0FBQztJQUVEOzs7O09BSUc7SUFDRyxnQkFBZ0IsQ0FBSSxPQUFlOztZQUN2QyxJQUFJLGdCQUFnQixHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxFQUFFO2dCQUN4RCxNQUFNLENBQUMsVUFBVSxDQUFDLFNBQVMsS0FBSyxPQUFPLENBQUM7WUFDMUMsQ0FBQyxDQUFDLENBQUM7WUFDSCxNQUFNLENBQUMsZ0JBQWdCLENBQUM7UUFDMUIsQ0FBQztLQUFBO0NBQ0Y7QUFwRUQsZ0JBb0VDIn0=