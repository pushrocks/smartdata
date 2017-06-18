"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const plugins = require("./smartdata.plugins");
const lik_1 = require("lik");
class Db {
    constructor(dbUrlArg) {
        this.collections = new lik_1.Objectmap();
        this.dbUrl = dbUrlArg;
    }
    // basic connection stuff ----------------------------------------------
    /**
     * connects to the database that was specified during instance creation
     */
    connect() {
        let done = plugins.smartq.defer();
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
        let done = plugins.smartq.defer();
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
        let done = plugins.smartq.defer();
        let resultCollection = this.collections.find((dbCollectionArg) => {
            return dbCollectionArg.name === nameArg;
        });
        if (resultCollection !== null) {
            done.resolve(resultCollection);
        }
        return done.promise;
    }
    addCollection(dbCollectionArg) {
        this.collections.add(dbCollectionArg);
    }
}
exports.Db = Db;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic21hcnRkYXRhLmNsYXNzZXMuZGIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi90cy9zbWFydGRhdGEuY2xhc3Nlcy5kYi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLCtDQUE4QztBQUM5Qyw2QkFBK0I7QUFTL0I7SUFNRSxZQUFhLFFBQWdCO1FBRjdCLGdCQUFXLEdBQUcsSUFBSSxlQUFTLEVBQXFCLENBQUE7UUFHOUMsSUFBSSxDQUFDLEtBQUssR0FBRyxRQUFRLENBQUE7SUFDdkIsQ0FBQztJQUVELHdFQUF3RTtJQUV4RTs7T0FFRztJQUNILE9BQU87UUFDTCxJQUFJLElBQUksR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFBO1FBQ2pDLE9BQU8sQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUMsR0FBRyxFQUFFLEVBQUU7WUFDdEQsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztnQkFBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFBO1lBQUMsQ0FBQztZQUM3QixPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUE7WUFDL0IsSUFBSSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUE7WUFDWixPQUFPLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyw0QkFBNEIsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUE7WUFDbkUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUE7UUFDdkIsQ0FBQyxDQUFDLENBQUE7UUFDRixNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQTtJQUNyQixDQUFDO0lBRUQ7O09BRUc7SUFDSCxLQUFLO1FBQ0gsSUFBSSxJQUFJLEdBQUcsT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQTtRQUNqQyxJQUFJLENBQUMsRUFBRSxDQUFDLEtBQUssRUFBRSxDQUFBO1FBQ2YsT0FBTyxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsK0JBQStCLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFBO1FBQ2pFLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQTtRQUNkLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFBO0lBQ3JCLENBQUM7SUFFRCw0RUFBNEU7SUFFNUU7O09BRUc7SUFDSCxtQkFBbUIsQ0FBSSxPQUFlO1FBQ3BDLElBQUksSUFBSSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFxQixDQUFBO1FBQ3BELElBQUksZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxlQUFlO1lBQzNELE1BQU0sQ0FBQyxlQUFlLENBQUMsSUFBSSxLQUFLLE9BQU8sQ0FBQTtRQUN6QyxDQUFDLENBQUMsQ0FBQTtRQUNGLEVBQUUsQ0FBQyxDQUFDLGdCQUFnQixLQUFLLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDOUIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFBO1FBQ2hDLENBQUM7UUFDRCxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQTtJQUNyQixDQUFDO0lBRUQsYUFBYSxDQUFFLGVBQWtDO1FBQy9DLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQyxDQUFBO0lBQ3ZDLENBQUM7Q0FFRjtBQTFERCxnQkEwREMifQ==