"use strict";
const plugins = require("./smartdata.plugins");
const lik_1 = require("lik");
class Db {
    constructor(dbUrlArg, dbTypeArg = 'mongodb') {
        this.collections = new lik_1.Objectmap();
        this.dbType = dbTypeArg;
        this.dbUrl = dbUrlArg;
    }
    // basic connection stuff ----------------------------------------------
    /**
     * connects to the database that was specified during instance creation
     */
    connect() {
        let done = plugins.q.defer();
        if (this.dbType === 'mongodb') {
            plugins.mongodb.MongoClient.connect(this.dbUrl, (err, db) => {
                if (err) {
                    console.log(err);
                }
                plugins.assert.equal(null, err);
                this.db = db;
                plugins.beautylog.success(`connected to database at ${this.dbUrl}`);
                done.resolve(this.db);
            });
        }
        else if (this.dbType === 'nedb') {
            this.db = null;
        }
        return done.promise;
    }
    /**
     * closes the connection to the databse
     */
    close() {
        let done = plugins.q.defer();
        if (this.dbType === 'mongodb') {
            this.db.close();
        }
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
    addCollection(dbCollectionArg) {
        this.collections.add(dbCollectionArg);
    }
}
exports.Db = Db;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic21hcnRkYXRhLmNsYXNzZXMuZGIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi90cy9zbWFydGRhdGEuY2xhc3Nlcy5kYi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsK0NBQThDO0FBQzlDLDZCQUErQjtBQWMvQjtJQU9JLFlBQVksUUFBZ0IsRUFBRSxZQUFxQixTQUFTO1FBRjVELGdCQUFXLEdBQUcsSUFBSSxlQUFTLEVBQXFCLENBQUE7UUFHNUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxTQUFTLENBQUE7UUFDdkIsSUFBSSxDQUFDLEtBQUssR0FBRyxRQUFRLENBQUE7SUFDekIsQ0FBQztJQUVELHdFQUF3RTtJQUV4RTs7T0FFRztJQUNILE9BQU87UUFDSCxJQUFJLElBQUksR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFBO1FBQzVCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQztZQUM1QixPQUFPLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDLEdBQUcsRUFBRSxFQUFFO2dCQUNwRCxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO29CQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUE7Z0JBQUMsQ0FBQztnQkFDN0IsT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFBO2dCQUMvQixJQUFJLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQTtnQkFDWixPQUFPLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyw0QkFBNEIsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUE7Z0JBQ25FLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFBO1lBQ3pCLENBQUMsQ0FBQyxDQUFBO1FBQ04sQ0FBQztRQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxLQUFLLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDaEMsSUFBSSxDQUFDLEVBQUUsR0FBRyxJQUFJLENBQUE7UUFDbEIsQ0FBQztRQUNELE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFBO0lBQ3ZCLENBQUM7SUFFRDs7T0FFRztJQUNILEtBQUs7UUFDRCxJQUFJLElBQUksR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFBO1FBQzVCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQztZQUM1QixJQUFJLENBQUMsRUFBRSxDQUFDLEtBQUssRUFBRSxDQUFBO1FBQ25CLENBQUM7UUFDRCxPQUFPLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQywrQkFBK0IsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUE7UUFDakUsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFBO1FBQ2QsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUE7SUFDdkIsQ0FBQztJQUVELDRFQUE0RTtJQUU1RTs7T0FFRztJQUNILG1CQUFtQixDQUFJLE9BQWU7UUFDbEMsSUFBSSxJQUFJLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQXFCLENBQUE7UUFDL0MsSUFBSSxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDLGVBQWU7WUFDekQsTUFBTSxDQUFDLGVBQWUsQ0FBQyxJQUFJLEtBQUssT0FBTyxDQUFBO1FBQzNDLENBQUMsQ0FBQyxDQUFBO1FBQ0YsRUFBRSxDQUFDLENBQUMsZ0JBQWdCLEtBQUssSUFBSSxDQUFDLENBQUMsQ0FBQztZQUM1QixJQUFJLENBQUMsT0FBTyxDQUFDLGdCQUFnQixDQUFDLENBQUE7UUFDbEMsQ0FBQztRQUNELE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFBO0lBQ3ZCLENBQUM7SUFBQSxDQUFDO0lBRUYsYUFBYSxDQUFDLGVBQWtDO1FBQzVDLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQyxDQUFBO0lBQ3pDLENBQUM7Q0FFSjtBQWxFRCxnQkFrRUMifQ==