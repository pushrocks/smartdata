"use strict";
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
        return this.collection.find().toArray();
    }
    /**
     * inserts  object into the DbCollection
     */
    insertOne(docArg) {
        return this.collection.insertOne(docArg);
    }
    /**
     * inserts many objects at once into the DbCollection
     */
    insertMany(docArrayArg) {
    }
}
exports.DbCollection = DbCollection;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic21hcnRkYXRhLmNsYXNzZXMuZGJjb2xsZWN0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vdHMvc21hcnRkYXRhLmNsYXNzZXMuZGJjb2xsZWN0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFHQTtJQUVJLFlBQVksT0FBZSxFQUFFLGVBQTZCO1FBQ3RELElBQUksQ0FBQyxVQUFVLEdBQUcsZUFBZSxDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUE7SUFDNUQsQ0FBQztJQUVEOztPQUVHO0lBQ0gsbUJBQW1CLENBQUMsT0FBTyxJQUFFLENBQUM7SUFFOUI7O09BRUc7SUFDSCxJQUFJLENBQUMsV0FBYztRQUNmLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksRUFBRSxDQUFDLE9BQU8sRUFBRSxDQUFBO0lBQzNDLENBQUM7SUFFRDs7T0FFRztJQUNILFNBQVMsQ0FBQyxNQUFTO1FBQ2YsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFBO0lBQzVDLENBQUM7SUFFRDs7T0FFRztJQUNILFVBQVUsQ0FBQyxXQUFnQjtJQUUzQixDQUFDO0FBQ0wsQ0FBQztBQS9CWSxvQkFBWSxlQStCeEIsQ0FBQSJ9