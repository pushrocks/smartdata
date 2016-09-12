"use strict";
const plugins = require('./smartdata.plugins');
class DbCollection {
    constructor(nameArg, dbConnectionArg) {
        this.collection = dbConnectionArg.db.collection(nameArg);
    }
    /**
     * adds a validation function that all newly inserted and updated objects have to pass
     */
    addObjectValidation(funcArg) { }
    /**
     * finds an object in the DbCollection
     */
    find(docMatchArg) {
        let done = plugins.q.defer();
        this.collection.find(docMatchArg).toArray((err, docs) => {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic21hcnRkYXRhLmNsYXNzZXMuZGJjb2xsZWN0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vdHMvc21hcnRkYXRhLmNsYXNzZXMuZGJjb2xsZWN0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxNQUFZLE9BQU8sV0FBTSxxQkFDekIsQ0FBQyxDQUQ2QztBQUc5QztJQUVJLFlBQVksT0FBZSxFQUFFLGVBQTZCO1FBQ3RELElBQUksQ0FBQyxVQUFVLEdBQUcsZUFBZSxDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUE7SUFDNUQsQ0FBQztJQUVEOztPQUVHO0lBQ0gsbUJBQW1CLENBQUMsT0FBTyxJQUFJLENBQUM7SUFFaEM7O09BRUc7SUFDSCxJQUFJLENBQUMsV0FBYztRQUNmLElBQUksSUFBSSxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFPLENBQUE7UUFDakMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsR0FBRyxFQUFFLElBQUk7WUFDaEQsRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztnQkFBQyxNQUFNLEdBQUcsQ0FBQTtZQUFDLENBQUM7WUFDdEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQTtRQUN0QixDQUFDLENBQUMsQ0FBQTtRQUNGLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFBO0lBQ3ZCLENBQUM7SUFFRDs7T0FFRztJQUNILFNBQVMsQ0FBQyxNQUFTO1FBQ2YsSUFBSSxJQUFJLEdBQUcsT0FBTyxDQUFDLENBQUMsQ0FBQyxLQUFLLEVBQVEsQ0FBQTtRQUNsQyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQztZQUN2QixJQUFJLENBQUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUM7aUJBQzVCLElBQUksQ0FBQyxRQUFRLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQSxDQUFDLENBQUMsQ0FBQyxDQUFBO1FBQ3ZDLENBQUMsQ0FBQyxDQUFBO1FBQ0YsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUE7SUFDdkIsQ0FBQztJQUVEOztPQUVHO0lBQ0gsVUFBVSxDQUFDLFdBQWdCO1FBQ3ZCLElBQUksSUFBSSxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFRLENBQUE7UUFDbEMsSUFBSSxvQkFBb0IsR0FBOEIsRUFBRSxDQUFBO1FBQ3hELEdBQUcsQ0FBQyxDQUFDLElBQUksTUFBTSxJQUFJLFdBQVcsQ0FBQyxDQUFBLENBQUM7WUFDNUIsb0JBQW9CLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQTtRQUNwRCxDQUFDO1FBQ0QsT0FBTyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsb0JBQW9CLENBQUMsQ0FBQyxJQUFJLENBQUM7WUFDckMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDO2lCQUNsQyxJQUFJLENBQUMsUUFBUSxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUEsQ0FBQyxDQUFDLENBQUMsQ0FBQTtRQUN2QyxDQUFDLENBQUMsQ0FBQTtRQUNGLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFBO0lBQ3ZCLENBQUM7SUFFTyxRQUFRLENBQUMsR0FBTTtRQUNuQixJQUFJLElBQUksR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLEtBQUssRUFBUSxDQUFBO1FBQ2xDLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQTtRQUNkLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFBO0lBQ3ZCLENBQUM7QUFDTCxDQUFDO0FBeERZLG9CQUFZLGVBd0R4QixDQUFBIn0=