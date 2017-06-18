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
    constructor(collectedClassArg, dbArg) {
        this.objectValidation = null;
        // tell the collection where it belongs
        this.collectedClass = collectedClassArg;
        this.name = collectedClassArg.name;
        this.db = dbArg;
        // make sure it actually exists
        this.collection = dbArg.db.collection(this.name);
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
        let done = plugins.smartq.defer();
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
        return done.promise;
    }
    /**
     * inserts object into the DbCollection
     */
    insertOne(docArg) {
        let done = plugins.smartq.defer();
        this.checkDoc(docArg).then(() => {
            this.collection.insertOne(docArg)
                .then(() => { done.resolve(); });
        }, () => {
            done.reject(new Error('one the docs did not pass validation'));
        });
        return done.promise;
    }
    /**
     * inserts many objects at once into the DbCollection
     */
    insertMany(docArrayArg) {
        let done = plugins.smartq.defer();
        let checkDocPromiseArray = [];
        for (let docArg of docArrayArg) {
            checkDocPromiseArray.push(this.checkDoc(docArg));
        }
        Promise.all(checkDocPromiseArray).then(() => {
            this.collection.insertMany(docArrayArg)
                .then(() => { done.resolve(); });
        });
        return done.promise;
    }
    /**
     * checks a Doc for constraints
     */
    checkDoc(docArg) {
        let done = plugins.smartq.defer();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic21hcnRkYXRhLmNsYXNzZXMuZGJjb2xsZWN0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vdHMvc21hcnRkYXRhLmNsYXNzZXMuZGJjb2xsZWN0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsK0NBQThDO0FBWTlDLG9CQUE0QixFQUFNO0lBQ2hDLE1BQU0sQ0FBQyxVQUFVLFdBQVc7UUFDMUIsV0FBVyxDQUFFLGNBQWMsQ0FBRSxHQUFHLElBQUksWUFBWSxDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUE7SUFDeEUsQ0FBQyxDQUFBO0FBQ0gsQ0FBQztBQUpELGdDQUlDO0FBRUQ7SUFXRSxZQUFhLGlCQUErQixFQUFFLEtBQVM7UUFKdkQscUJBQWdCLEdBQXNCLElBQUksQ0FBQTtRQUt4Qyx1Q0FBdUM7UUFDdkMsSUFBSSxDQUFDLGNBQWMsR0FBRyxpQkFBaUIsQ0FBQTtRQUN2QyxJQUFJLENBQUMsSUFBSSxHQUFHLGlCQUFpQixDQUFDLElBQUksQ0FBQTtRQUNsQyxJQUFJLENBQUMsRUFBRSxHQUFHLEtBQUssQ0FBQTtRQUVmLCtCQUErQjtRQUMvQixJQUFJLENBQUMsVUFBVSxHQUFHLEtBQUssQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQTtRQUVoRCx3RkFBd0Y7UUFDeEYsSUFBSSxDQUFDLEVBQUUsQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUE7SUFDN0IsQ0FBQztJQUVEOztPQUVHO0lBQ0gsZ0JBQWdCLENBQUUsT0FBMEI7UUFDMUMsSUFBSSxDQUFDLGdCQUFnQixHQUFHLE9BQU8sQ0FBQTtJQUNqQyxDQUFDO0lBRUQ7O09BRUc7SUFDSCxJQUFJLENBQUUsV0FBb0IsRUFBRSxVQUF5QjtRQUNuRCxJQUFJLElBQUksR0FBRyxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBTyxDQUFBO1FBQ3RDLElBQUksVUFBVSxHQUFHLElBQUksQ0FB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