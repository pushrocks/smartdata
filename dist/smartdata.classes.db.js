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
    /**
     * supply additional SSl options
     */
    setSsl(certificateStringArg, formatArg) {
        let certificateString;
        if (formatArg = 'base64') {
            certificateString = plugins.smartstring.base64.decode(certificateStringArg);
        }
        else {
            certificateString = certificateStringArg;
        }
        this.connectionOptions['ssl'] = {
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
            plugins.beautylog.ok(`disconnected from database ${this.dbName}`);
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
                return dbCollectionArg.tableName === nameArg;
            });
            return resultCollection;
        });
    }
    addTable(dbCollectionArg) {
        this.dbTablesMap.add(dbCollectionArg);
    }
}
exports.Db = Db;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic21hcnRkYXRhLmNsYXNzZXMuZGIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi90cy9zbWFydGRhdGEuY2xhc3Nlcy5kYi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsK0NBQThDO0FBQzlDLDZCQUErQjtBQVcvQjtJQU9FLFlBQVksb0JBQXVDO1FBRm5ELGdCQUFXLEdBQUcsSUFBSSxlQUFTLEVBQWdCLENBQUE7UUFHekMsSUFBSSxDQUFDLE1BQU0sR0FBRyxvQkFBb0IsQ0FBQyxFQUFFLENBQUE7UUFDckMsSUFBSSxDQUFDLGlCQUFpQixHQUFHLG9CQUFvQixDQUFBO1FBQzdDLElBQUksQ0FBQyxNQUFNLEdBQUcsU0FBUyxDQUFBO0lBQ3pCLENBQUM7SUFFRDs7T0FFRztJQUNILE1BQU0sQ0FBRSxvQkFBNEIsRUFBRSxTQUFpQztRQUNyRSxJQUFJLGlCQUF5QixDQUFBO1FBQzdCLEVBQUUsQ0FBQSxDQUFDLFNBQVMsR0FBRyxRQUFRLENBQUMsQ0FBQyxDQUFDO1lBQ3hCLGlCQUFpQixHQUFHLE9BQU8sQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxvQkFBb0IsQ0FBQyxDQUFBO1FBQzdFLENBQUM7UUFBQyxJQUFJLENBQUMsQ0FBQztZQUNOLGlCQUFpQixHQUFHLG9CQUFvQixDQUFBO1FBQzFDLENBQUM7UUFDRCxJQUFJLENBQUMsaUJBQWlCLENBQUMsS0FBSyxDQUFDLEdBQUc7WUFDOUIsRUFBRSxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUM7U0FDbkMsQ0FBQTtJQUNILENBQUM7SUFFRCx3RUFBd0U7SUFFeEU7O09BRUc7SUFDRyxPQUFPOztZQUNYLElBQUksQ0FBQyxZQUFZLEdBQUcsTUFBTSxPQUFPLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQTtZQUMzRSxJQUFJLENBQUMsWUFBWSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUE7WUFDbEMsSUFBSSxDQUFDLE1BQU0sR0FBRyxXQUFXLENBQUE7WUFDekIsT0FBTyxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMseUJBQXlCLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFBO1FBQzlELENBQUM7S0FBQTtJQUVEOztPQUVHO0lBQ0csS0FBSzs7WUFDVCxNQUFNLElBQUksQ0FBQyxZQUFZLENBQUMsS0FBSyxFQUFFLENBQUE7WUFDL0IsSUFBSSxDQUFDLE1BQU0sR0FBRyxjQUFjLENBQUE7WUFDNUIsT0FBTyxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsOEJBQThCLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFBO1FBQ25FLENBQUM7S0FBQTtJQUVELHFDQUFxQztJQUVyQzs7OztPQUlHO0lBQ0csZ0JBQWdCLENBQUksT0FBZTs7WUFDdkMsSUFBSSxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDLGVBQWUsRUFBRSxFQUFFO2dCQUMvRCxNQUFNLENBQUMsZUFBZSxDQUFDLFNBQVMsS0FBSyxPQUFPLENBQUE7WUFDOUMsQ0FBQyxDQUFDLENBQUE7WUFDRixNQUFNLENBQUMsZ0JBQWdCLENBQUE7UUFDekIsQ0FBQztLQUFBO0lBRUQsUUFBUSxDQUFFLGVBQTZCO1FBQ3JDLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQyxDQUFBO0lBQ3ZDLENBQUM7Q0FDRjtBQWxFRCxnQkFrRUMifQ==