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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic21hcnRkYXRhLmNsYXNzZXMuZGIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi90cy9zbWFydGRhdGEuY2xhc3Nlcy5kYi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsK0NBQStDO0FBQy9DLDZCQUFnQztBQWVoQztJQU9FLFlBQVksb0JBQXVDO1FBRm5ELGdCQUFXLEdBQUcsSUFBSSxlQUFTLEVBQWdCLENBQUM7UUFHMUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxvQkFBb0IsQ0FBQyxFQUFFLENBQUM7UUFDdEMsSUFBSSxDQUFDLGlCQUFpQixHQUFHLG9CQUFvQixDQUFDO1FBQzlDLElBQUksQ0FBQyxNQUFNLEdBQUcsU0FBUyxDQUFDO0lBQzFCLENBQUM7SUFFRDs7T0FFRztJQUNILE1BQU0sQ0FBQyxvQkFBNEIsRUFBRSxTQUFpQztRQUNwRSxJQUFJLGlCQUF5QixDQUFDO1FBQzlCLEVBQUUsQ0FBQyxDQUFDLENBQUMsU0FBUyxHQUFHLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUMzQixpQkFBaUIsR0FBRyxPQUFPLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQ25ELG9CQUFvQixDQUNyQixDQUFDO1FBQ0osQ0FBQztRQUFDLElBQUksQ0FBQyxDQUFDO1lBQ04saUJBQWlCLEdBQUcsb0JBQW9CLENBQUM7UUFDM0MsQ0FBQztRQUNELElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxLQUFLLENBQUMsR0FBRztZQUM5QixFQUFFLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQztTQUNuQyxDQUFDO0lBQ0osQ0FBQztJQUVELHdFQUF3RTtJQUV4RTs7T0FFRztJQUNHLE9BQU87O1lBQ1gsSUFBSSxDQUFDLFlBQVksR0FBRyxNQUFNLE9BQU8sQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO1lBQzVFLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUNuQyxJQUFJLENBQUMsTUFBTSxHQUFHLFdBQVcsQ0FBQztZQUMxQixPQUFPLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyx5QkFBeUIsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUM7UUFDL0QsQ0FBQztLQUFBO0lBRUQ7O09BRUc7SUFDRyxLQUFLOztZQUNULE1BQU0sSUFBSSxDQUFDLFlBQVksQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUNoQyxJQUFJLENBQUMsTUFBTSxHQUFHLGNBQWMsQ0FBQztZQUM3QixPQUFPLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyw4QkFBOEIsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLENBQUM7UUFDcEUsQ0FBQztLQUFBO0lBRUQscUNBQXFDO0lBRXJDLFFBQVEsQ0FBQyxVQUF3QjtRQUMvQixJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUNuQyxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNHLGdCQUFnQixDQUFJLE9BQWU7O1lBQ3ZDLElBQUksZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEVBQUU7Z0JBQ3hELE1BQU0sQ0FBQyxVQUFVLENBQUMsU0FBUyxLQUFLLE9BQU8sQ0FBQztZQUMxQyxDQUFDLENBQUMsQ0FBQztZQUNILE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQztRQUMxQixDQUFDO0tBQUE7Q0FDRjtBQXBFRCxnQkFvRUMifQ==