"use strict";
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
        this.name = nameArg;
        this.db = dbArg;
        if (this.db.dbType === 'mongodb') {
            this.collection = dbArg.db.collection(nameArg);
        }
        else {
            this.collection = new plugins.nedb();
        }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic21hcnRkYXRhLmNsYXNzZXMuZGJjb2xsZWN0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vdHMvc21hcnRkYXRhLmNsYXNzZXMuZGJjb2xsZWN0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSwrQ0FBOEM7QUFXOUMsb0JBQTJCLEVBQU07SUFDN0IsTUFBTSxDQUFDLFVBQVUsV0FBVztRQUN4QixXQUFXLENBQUMsY0FBYyxDQUFDLEdBQUcsSUFBSSxZQUFZLENBQUMsV0FBVyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsQ0FBQTtJQUN4RSxDQUFDLENBQUE7QUFDTCxDQUFDO0FBSkQsZ0NBSUM7QUFFRDtJQVdJLFlBQVksT0FBZSxFQUFFLEtBQVM7UUFIdEMscUJBQWdCLEdBQXNCLElBQUksQ0FBQTtRQUl0QyxJQUFJLENBQUMsSUFBSSxHQUFHLE9BQU8sQ0FBQTtRQUNuQixJQUFJLENBQUMsRUFBRSxHQUFHLEtBQUssQ0FBQTtRQUNmLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsTUFBTSxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUM7WUFDL0IsSUFBSSxDQUFDLFVBQVUsR0FBRyxLQUFLLENBQUMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQTtRQUNsRCxDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDSixJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksT0FBTyxDQUFDLElBQUksRUFBRSxDQUFBO1FBQ3hDLENBQUM7SUFDTCxDQUFDO0lBRUQ7O09BRUc7SUFDSCxnQkFBZ0IsQ0FBQyxPQUEwQjtRQUN2QyxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsT0FBTyxDQUFBO0lBQ25DLENBQUM7SUFFRDs7T0FFRztJQUNILElBQUksQ0FBQyxXQUFvQixFQUFFLFVBQXlCO1FBQ2hELElBQUksSUFBSSxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFPLENBQUE7UUFDakMsRUFBRSxDQUFD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