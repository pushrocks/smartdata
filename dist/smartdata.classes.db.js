"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic21hcnRkYXRhLmNsYXNzZXMuZGIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi90cy9zbWFydGRhdGEuY2xhc3Nlcy5kYi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBLCtDQUE4QztBQUM5Qyw2QkFBK0I7QUFjL0I7SUFPRSxZQUFZLFFBQWdCLEVBQUUsWUFBcUIsU0FBUztRQUY1RCxnQkFBVyxHQUFHLElBQUksZUFBUyxFQUFxQixDQUFBO1FBRzlDLElBQUksQ0FBQyxNQUFNLEdBQUcsU0FBUyxDQUFBO1FBQ3ZCLElBQUksQ0FBQyxLQUFLLEdBQUcsUUFBUSxDQUFBO0lBQ3ZCLENBQUM7SUFFRCx3RUFBd0U7SUFFeEU7O09BRUc7SUFDSCxPQUFPO1FBQ0wsSUFBSSxJQUFJLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQTtRQUM1QixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUM7WUFDOUIsT0FBTyxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQyxHQUFHLEVBQUUsRUFBRTtnQkFDdEQsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztvQkFBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFBO2dCQUFDLENBQUM7Z0JBQzdCLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQTtnQkFDL0IsSUFBSSxDQUFDLEVBQUUsR0FBRyxFQUFFLENBQUE7Z0JBQ1osT0FBTyxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsNEJBQTRCLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFBO2dCQUNuRSxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQTtZQUN2QixDQUFDLENBQUMsQ0FBQTtRQUNKLENBQUM7UUFBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLE1BQU0sS0FBSyxNQUFNLENBQUMsQ0FBQyxDQUFDO1lBQ2xDLElBQUksQ0FBQyxFQUFFLEdBQUcsSUFBSSxDQUFBO1FBQ2hCLENBQUM7UUFDRCxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQTtJQUNyQixDQUFDO0lBRUQ7O09BRUc7SUFDSCxLQUFLO1FBQ0gsSUFBSSxJQUFJLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQTtRQUM1QixFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsTUFBTSxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUM7WUFDOUIsSUFBSSxDQUFDLEVBQUUsQ0FBQyxLQUFLLEVBQUUsQ0FBQTtRQUNqQixDQUFDO1FBQ0QsT0FBTyxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsK0JBQStCLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFBO1FBQ2pFLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQTtRQUNkLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFBO0lBQ3JCLENBQUM7SUFFRCw0RUFBNEU7SUFFNUU7O09BRUc7SUFDSCxtQkFBbUIsQ0FBSSxPQUFlO1FBQ3BDLElBQUksSUFBSSxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFxQixDQUFBO1FBQy9DLElBQUksZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxlQUFlO1lBQzNELE1BQU0sQ0FBQyxlQUFlLENBQUMsSUFBSSxLQUFLLE9BQU8sQ0FBQTtRQUN6QyxDQUFDLENBQUMsQ0FBQTtRQUNGLEVBQUUsQ0FBQyxDQUFDLGdCQUFnQixLQUFLLElBQUksQ0FBQyxDQUFDLENBQUM7WUFDOUIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFBO1FBQ2hDLENBQUM7UUFDRCxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQTtJQUNyQixDQUFDO0lBQUEsQ0FBQztJQUVGLGFBQWEsQ0FBQyxlQUFrQztRQUM5QyxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxlQUFlLENBQUMsQ0FBQTtJQUN2QyxDQUFDO0NBRUY7QUFsRUQsZ0JBa0VDIn0=