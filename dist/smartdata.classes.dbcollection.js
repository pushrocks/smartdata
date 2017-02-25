"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const plugins = require("./smartdata.plugins");
function Collection(db) {
    return function (constructor) {
        constructor['dbCollection'] = new DbCollection(constructor.name, db);
    };
}
exports.Collection = Collection;
class DbCollection {
    constructor(nameArg, dbArg) {
        this.objectValidation = null;
        // tell the collection where it belongs
        this.name = nameArg;
        this.db = dbArg;
        // make sure it actually exists
        if (this.db.dbType === 'mongodb') {
            this.collection = dbArg.db.collection(nameArg);
        }
        else {
            this.collection = new plugins.nedb();
        }
        // tell the db class about it (important since Db uses different systems under the hood)
        this.db.addCollection(this);
    }
    /**
     * adds a validation function that all newly inserted and updated objects have to pass
     */
    addDocValidation(funcArg) {
        this.objectValidation = funcArg;
    }
    /**
     * finds an object in the DbCollection
     */
    find(docMatchArg, optionsArg) {
        let done = plugins.q.defer();
        if (this.db.dbType === 'mongodb') {
            let findCursor = this.collection.find(docMatchArg);
            if (optionsArg) {
                if (optionsArg.limit) {
                    findCursor = findCursor.limit(1);
                }
            }
            findCursor.toArray((err, docs) => {
                if (err) {
                    done.reject(err);
                    throw err;
                }
                done.resolve(docs);
            });
        }
        else if (this.db.dbType === 'nedb') {
            this.collection.find(docMatchArg, (err, docs) => {
                if (err) {
                    done.reject(err);
                    throw err;
                }
                done.resolve(docs);
            });
        }
        return done.promise;
    }
    /**
     * inserts object into the DbCollection
     */
    insertOne(docArg) {
        let done = plugins.q.defer();
        this.checkDoc(docArg).then(() => {
            if (this.db.dbType === 'mongodb') {
                this.collection.insertOne(docArg)
                    .then(() => { done.resolve(); });
            }
            else if (this.db.dbType === 'nedb') {
                this.collection.insert(docArg, (err, newDoc) => {
                    if (err) {
                        done.reject(err);
                        throw err;
                    }
                    done.resolve();
                });
            }
        }, () => {
            done.reject(new Error('one the docs did not pass validation'));
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
            if (this.db.dbType === 'mongodb') {
                this.collection.insertMany(docArrayArg)
                    .then(() => { done.resolve(); });
            }
            else if (this.db.dbType === 'nedb') {
                let paramArray = plugins.lodash.concat(docArrayArg, (err, newDoc) => {
                    if (err) {
                        done.reject(err);
                        throw err;
                    }
                    done.resolve();
                });
                this.collection.insert.apply(null, paramArray);
            }
        });
        return done.promise;
    }
    /**
     * checks a Doc for constraints
     */
    checkDoc(docArg) {
        let done = plugins.q.defer();
        let validationResult = true;
        if (this.objectValidation) {
            validationResult = this.objectValidation(docArg);
        }
        if (validationResult) {
            done.resolve();
        }
        else {
            done.reject('validation of object did not pass');
        }
        return done.promise;
    }
}
exports.DbCollection = DbCollection;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic21hcnRkYXRhLmNsYXNzZXMuZGJjb2xsZWN0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vdHMvc21hcnRkYXRhLmNsYXNzZXMuZGJjb2xsZWN0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsK0NBQThDO0FBVzlDLG9CQUEyQixFQUFNO0lBQzdCLE1BQU0sQ0FBQyxVQUFVLFdBQVc7UUFDeEIsV0FBVyxDQUFDLGNBQWMsQ0FBQyxHQUFHLElBQUksWUFBWSxDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUE7SUFDeEUsQ0FBQyxDQUFBO0FBQ0wsQ0FBQztBQUpELGdDQUlDO0FBRUQ7SUFXSSxZQUFZLE9BQWUsRUFBRSxLQUFTO1FBSHRDLHFCQUFnQixHQUFzQixJQUFJLENBQUE7UUFJdEMsdUNBQXVDO1FBQ3ZDLElBQUksQ0FBQyxJQUFJLEdBQUcsT0FBTyxDQUFBO1FBQ25CLElBQUksQ0FBQyxFQUFFLEdBQUcsS0FBSyxDQUFBO1FBRWYsK0JBQStCO1FBQy9CLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsTUFBTSxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUM7WUFDL0IsSUFBSSxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQTtRQUNsRCxDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDSixJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksT0FBTyxDQUFDLElBQUksRUFBRSxDQUFBO1FBQ3hDLENBQUM7UUFFRCx3RkFBd0Y7UUFDeEYsSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUE7SUFDL0IsQ0FBQztJQUVEOztPQUVHO0lBQ0gsZ0JBQWdCLENBQUMsT0FBMEI7UUFDdkMsSUFBSSxDQUFDLGdCQUFnQixHQUFHLE9BQU8sQ0FBQTtJQUNuQyxDQUFDO0lBRUQ7O09BRUc7SUFDSCxJQUFJLENB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