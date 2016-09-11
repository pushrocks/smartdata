"use strict";
const plugins = require('./smartdata.plugins');
class DbCollection {
    constructor(nameArg, db) {
        let collection = db.collection(nameArg);
    }
}
exports.DbCollection = DbCollection;
class DbConnection {
    constructor(dbUrl) {
        this.dbUrl = dbUrl;
    }
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
    close() {
        let done = plugins.q.defer();
        this.db.close();
        plugins.beautylog.ok(`disconnected to database at ${this.dbUrl}`);
        done.resolve();
        return done.promise;
    }
}
exports.DbConnection = DbConnection;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi90cy9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsTUFBWSxPQUFPLFdBQU0scUJBRXpCLENBQUMsQ0FGNkM7QUFFOUM7SUFDSSxZQUFZLE9BQWUsRUFBRSxFQUFzQjtRQUMvQyxJQUFJLFVBQVUsR0FBRyxFQUFFLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFBO0lBQzNDLENBQUM7QUFDTCxDQUFDO0FBSlksb0JBQVksZUFJeEIsQ0FBQTtBQUlEO0lBS0ksWUFBWSxLQUFhO1FBQ3JCLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFBO0lBQ3RCLENBQUM7SUFFRCxPQUFPO1FBQ0gsSUFBSSxJQUFJLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQTtRQUM1QixPQUFPLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDLEdBQUcsRUFBRSxFQUFFO1lBQ3BELEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7Z0JBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQTtZQUFDLENBQUM7WUFDN0IsT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFBO1lBQy9CLElBQUksQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFBO1lBQ1osT0FBTyxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsNEJBQTRCLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFBO1lBQ25FLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFBO1FBQ3pCLENBQUMsQ0FBQyxDQUFBO1FBQ0YsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUE7SUFDdkIsQ0FBQztJQUVELEtBQUs7UUFDRCxJQUFJLElBQUksR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFBO1FBQzVCLElBQUksQ0FBQyxFQUFFLENBQUMsS0FBSyxFQUFFLENBQUE7UUFDZixPQUFPLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQywrQkFBK0IsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUE7UUFDakUsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFBO1FBQ2QsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUE7SUFDdkIsQ0FBQztBQUNMLENBQUM7QUE1Qlksb0JBQVksZUE0QnhCLENBQUEifQ==