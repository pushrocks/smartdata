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
            this.db = new plugins.nedb();
        }
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
    addCollection(dbCollectionArg) {
        this.collections.add(dbCollectionArg);
    }
}
exports.Db = Db;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic21hcnRkYXRhLmNsYXNzZXMuZGIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi90cy9zbWFydGRhdGEuY2xhc3Nlcy5kYi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsK0NBQThDO0FBQzlDLDZCQUErQjtBQWMvQjtJQU9JLFlBQVksUUFBZ0IsRUFBRSxZQUFxQixTQUFTO1FBRjVELGdCQUFXLEdBQUcsSUFBSSxlQUFTLEVBQXFCLENBQUE7UUFHNUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxTQUFTLENBQUE7UUFDdkIsSUFBSSxDQUFDLEtBQUssR0FBRyxRQUFRLENBQUE7SUFDekIsQ0FBQztJQUVELHdFQUF3RTtJQUV4RTs7T0FFRztJQUNILE9BQU87UUFDSCxJQUFJLElBQUksR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFBO1FBQzVCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQztZQUM1QixPQUFPLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDLEdBQUcsRUFBRSxFQUFFO2dCQUNwRCxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO29CQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUE7Z0JBQUMsQ0FBQztnQkFDN0IsT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFBO2dCQUMvQixJQUFJLENBQUMsRUFBRSxHQUFHLEVBQUUsQ0FBQTtnQkFDWixPQUFPLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyw0QkFBNEIsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUE7Z0JBQ25FLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFBO1lBQ3pCLENBQUMsQ0FBQyxDQUFBO1FBQ04sQ0FBQztRQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxLQUFLLE1BQU0sQ0FBQyxDQUFDLENBQUM7WUFDaEMsSUFBSSxDQUFDLEVBQUUsR0FBRyxJQUFJLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQTtRQUNoQyxDQUFDO1FBQ0QsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUE7SUFDdkIsQ0FBQztJQUVEOztPQUVHO0lBQ0gsS0FBSztRQUNELElBQUksSUFBSSxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUE7UUFDNUIsSUFBSSxDQUFDLEVBQUUsQ0FBQyxLQUFLLEVBQUUsQ0FBQTtRQUNmLE9BQU8sQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLCtCQUErQixJQUFJLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQTtRQUNqRSxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUE7UUFDZCxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQTtJQUN2QixDQUFDO0lBRUQsNEVBQTRFO0lBRTVFOztPQUVHO0lBQ0gsbUJBQW1CLENBQUksT0FBZTtRQUNsQyxJQUFJLElBQUksR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBcUIsQ0FBQTtRQUMvQyxJQUFJLGdCQUFnQixHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUMsZUFBZTtZQUN6RCxNQUFNLENBQUMsZUFBZSxDQUFDLElBQUksS0FBSyxPQUFPLENBQUE7UUFDM0MsQ0FBQyxDQUFDLENBQUE7UUFDRixFQUFFLENBQUMsQ0FBQyxnQkFBZ0IsS0FBSyxJQUFJLENBQUMsQ0FBQyxDQUFDO1lBQzVCLElBQUksQ0FBQyxPQUFPLENBQUMsZ0JBQWdCLENBQUMsQ0FBQTtRQUNsQyxDQUFDO1FBQ0QsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUE7SUFDdkIsQ0FBQztJQUFBLENBQUM7SUFFRixhQUFhLENBQUMsZUFBa0M7UUFDNUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDLENBQUE7SUFDekMsQ0FBQztDQUNKO0FBL0RELGdCQStEQyJ9