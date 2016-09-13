"use strict";
const plugins = require('./smartdata.plugins');
function Collection(db) {
    return function (constructor) {
        constructor['dbCollection'] = new DbCollection(constructor.name, db);
    };
}
exports.Collection = Collection;
class DbCollection {
    constructor(nameArg, dbArg) {
        this.name = nameArg;
        this.collection = dbArg.db.collection(nameArg);
    }
    /**
     * adds a validation function that all newly inserted and updated objects have to pass
     */
    addObjectValidation(funcArg) { }
    /**
     * finds an object in the DbCollection
     */
    find(docMatchArg, optionsArg) {
        let done = plugins.q.defer();
        let findCursor = this.collection.find(docMatchArg);
        if (optionsArg) {
            if (optionsArg.limit) {
                findCursor = findCursor.limit(1);
            }
        }
        findCursor.toArray((err, docs) => {
            if (err) {
                throw err;
            }
            done.resolve(docs);
        });
        return done.promise;
    }
    /**
     * inserts  object into the DbCollection
     */
    insertOne(docArg) {
        let done = plugins.q.defer();
        this.checkDoc(docArg).then(() => {
            this.collection.insertOne(docArg)
                .then(() => { done.resolve(); });
        });
        return done.promise;
    }
    /**
     * inserts many objects at once into the DbCollection
     */
    insertMany(docArrayArg) {
        let done = plugins.q.defer();
        let checkDocPromiseArray = [];
        for (let docArg of docArrayArg) {
            checkDocPromiseArray.push(this.checkDoc(docArg));
        }
        plugins.q.all(checkDocPromiseArray).then(() => {
            this.collection.insertMany(docArrayArg)
                .then(() => { done.resolve(); });
        });
        return done.promise;
    }
    checkDoc(doc) {
        let done = plugins.q.defer();
        done.resolve();
        return done.promise;
    }
}
exports.DbCollection = DbCollection;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic21hcnRkYXRhLmNsYXNzZXMuZGJjb2xsZWN0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vdHMvc21hcnRkYXRhLmNsYXNzZXMuZGJjb2xsZWN0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxNQUFZLE9BQU8sV0FBTSxxQkFDekIsQ0FBQyxDQUQ2QztBQU85QyxvQkFBMkIsRUFBTTtJQUM3QixNQUFNLENBQUMsVUFBUyxXQUFXO1FBQ3ZCLFdBQVcsQ0FBQyxjQUFjLENBQUMsR0FBRyxJQUFJLFlBQVksQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxDQUFBO0lBQ3hFLENBQUMsQ0FBQTtBQUNMLENBQUM7QUFKZSxrQkFBVSxhQUl6QixDQUFBO0FBRUQ7SUFHSSxZQUFZLE9BQWUsRUFBRSxLQUFTO1FBQ2xDLElBQUksQ0FBQyxJQUFJLEdBQUcsT0FBTyxDQUFBO1FBQ25CLElBQUksQ0FBQyxVQUFVLEdBQUcsS0FBSyxDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUE7SUFDbEQsQ0FBQztJQUVEOztPQUVHO0lBQ0gsbUJBQW1CLENBQUMsT0FBTyxJQUFJLENBQUM7SUFFaEM7O09BRUc7SUFDSCxJQUFJLENBQUMsV0FBb0IsRUFBRSxVQUF5QjtRQUNoRCxJQUFJLElBQUksR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBTyxDQUFBO1FBQ2pDLElBQUksVUFBVSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFBO1FBQ2xELEVBQUUsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7WUFDYixFQUFFLENBQUMsQ0FBRSxVQUFVLENBQUMsS0FBTSxDQUFDLENBQUMsQ0FBQztnQkFBQyxVQUFVLEdBQUcsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQTtZQUFDLENBQUM7UUFDaEUsQ0FBQztRQUNELFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxHQUFHLEVBQUUsSUFBSTtZQUN6QixFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO2dCQUFDLE1BQU0sR0FBRyxDQUFBO1lBQUMsQ0FBQztZQUN0QixJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFBO1FBQ3RCLENBQUMsQ0FBQyxDQUFBO1FBQ0YsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUE7SUFDdkIsQ0FBQztJQUVEOztPQUVHO0lBQ0gsU0FBUyxDQUFDLE1BQVM7UUFDZixJQUFJLElBQUksR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBUSxDQUFBO1FBQ2xDLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsSUFBSSxDQUFDO1lBQ3ZCLElBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQztpQkFDNUIsSUFBSSxDQUFDLFFBQVEsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFBLENBQUMsQ0FBQyxDQUFDLENBQUE7UUFDdkMsQ0FBQyxDQUFDLENBQUE7UUFDRixNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQTtJQUN2QixDQUFDO0lBRUQ7O09BRUc7SUFDSCxVQUFVLENBQUMsV0FBZ0I7UUFDdkIsSUFBSSxJQUFJLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQVEsQ0FBQTtRQUNsQyxJQUFJLG9CQUFvQixHQUE4QixFQUFFLENBQUE7UUFDeEQsR0FBRyxDQUFDLENBQUMsSUFBSSxNQUFNLElBQUksV0FBVyxDQUFDLENBQUEsQ0FBQztZQUM1QixvQkFBb0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFBO1FBQ3BELENBQUM7UUFDRCxPQUFPLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLElBQUksQ0FBQztZQUNyQyxJQUFJLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUM7aUJBQ2xDLElBQUksQ0FBQyxRQUFRLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQSxDQUFDLENBQUMsQ0FBQyxDQUFBO1FBQ3ZDLENBQUMsQ0FBQyxDQUFBO1FBQ0YsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUE7SUFDdkIsQ0FBQztJQUVPLFFBQVEsQ0FBQyxHQUFNO1FBQ25CLElBQUksSUFBSSxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFRLENBQUE7UUFDbEMsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFBO1FBQ2QsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUE7SUFDdkIsQ0FBQztBQUNMLENBQUM7QUE5RFksb0JBQVksZUE4RHhCLENBQUEifQ==