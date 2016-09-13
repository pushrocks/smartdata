"use strict";
const plugins = require('./smartdata.plugins');
const lik_1 = require('lik');
class Db {
    constructor(dbUrl) {
        this.collections = new lik_1.Objectmap();
        this.dbUrl = dbUrl;
    }
    // basic connection stuff ----------------------------------------------
    /**
     * connects to the database that was specified during instance creation
     */
    connect() {
        let done = plugins.q.defer();
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
        let done = plugins.q.defer();
        this.db.close();
        plugins.beautylog.ok(`disconnected to database at ${this.dbUrl}`);
        done.resolve();
        return done.promise;
    }
    // advanced communication with the database --------------------------------
    /**
     * gets a collection by name: string
     */
    getCollectionByName(nameArg) {
        let done = plugins.q.defer();
        let resultCollection = this.collections.find((dbCollectionArg) => {
            return dbCollectionArg.name === nameArg;
        });
        if (resultCollection !== null) {
            done.resolve(resultCollection);
        }
        return done.promise;
    }
    ;
}
exports.Db = Db;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic21hcnRkYXRhLmNsYXNzZXMuZGIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi90cy9zbWFydGRhdGEuY2xhc3Nlcy5kYi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsTUFBWSxPQUFPLFdBQU0scUJBQ3pCLENBQUMsQ0FENkM7QUFDOUMsc0JBQTBCLEtBRTFCLENBQUMsQ0FGOEI7QUFNL0I7SUFNSSxZQUFZLEtBQWE7UUFGekIsZ0JBQVcsR0FBRyxJQUFJLGVBQVMsRUFBcUIsQ0FBQTtRQUc1QyxJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQTtJQUN0QixDQUFDO0lBRUQsd0VBQXdFO0lBRXhFOztPQUVHO0lBQ0gsT0FBTztRQUNILElBQUksSUFBSSxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUE7UUFDNUIsT0FBTyxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQyxHQUFHLEVBQUUsRUFBRTtZQUNwRCxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO2dCQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUE7WUFBQyxDQUFDO1lBQzdCLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQTtZQUMvQixJQUFJLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQTtZQUNaLE9BQU8sQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLDRCQUE0QixJQUFJLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQTtZQUNuRSxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQTtRQUN6QixDQUFDLENBQUMsQ0FBQTtRQUNGLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFBO0lBQ3ZCLENBQUM7SUFFRDs7T0FFRztJQUNILEtBQUs7UUFDRCxJQUFJLElBQUksR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFBO1FBQzVCLElBQUksQ0FBQyxFQUFFLENBQUMsS0FBSyxFQUFFLENBQUE7UUFDZixPQUFPLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQywrQkFBK0IsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUE7UUFDakUsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFBO1FBQ2QsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUE7SUFDdkIsQ0FBQztJQUVELDRFQUE0RTtJQUU1RTs7T0FFRztJQUNILG1CQUFtQixDQUFJLE9BQWU7UUFDbEMsSUFBSSxJQUFJLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQXFCLENBQUE7UUFDL0MsSUFBSSxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDLGVBQWU7WUFDekQsTUFBTSxDQUFDLGVBQWUsQ0FBQyxJQUFJLEtBQUssT0FBTyxDQUFBO1FBQzNDLENBQUMsQ0FBQyxDQUFBO1FBQ0YsRUFBRSxDQUFDLENBQUMsZ0JBQWdCLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQztZQUM1QixJQUFJLENBQUMsT0FBTyxDQUFDLGdCQUFnQixDQUFDLENBQUE7UUFDbEMsQ0FBQztRQUNELE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFBO0lBQ3ZCLENBQUM7O0FBQ0wsQ0FBQztBQXJEWSxVQUFFLEtBcURkLENBQUEifQ==