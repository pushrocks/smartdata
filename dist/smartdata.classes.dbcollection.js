"use strict";
class DbCollection {
    constructor(nameArg, dbConnectionArg) {
        this.collection = dbConnectionArg.db.collection(nameArg);
    }
    /**
     * adds a validation function that all newly inserted and updated objects have to pass
     */
    addObjectValidation() { }
    /**
     * inserts am object into the DbCollection
     */
    insert(objectArg) { }
    /**
     * inserts many objects at once into the DbCollection
     */
    insertMany(objectArrayArg) { }
}
exports.DbCollection = DbCollection;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic21hcnRkYXRhLmNsYXNzZXMuZGJjb2xsZWN0aW9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vdHMvc21hcnRkYXRhLmNsYXNzZXMuZGJjb2xsZWN0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFHQTtJQUVJLFlBQVksT0FBZSxFQUFFLGVBQTZCO1FBQ3RELElBQUksQ0FBQyxVQUFVLEdBQUcsZUFBZSxDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUE7SUFDNUQsQ0FBQztJQUVEOztPQUVHO0lBQ0gsbUJBQW1CLEtBQUcsQ0FBQztJQUV2Qjs7T0FFRztJQUNILE1BQU0sQ0FBQyxTQUFZLElBQUcsQ0FBQztJQUV2Qjs7T0FFRztJQUNILFVBQVUsQ0FBQyxjQUFtQixJQUFHLENBQUM7QUFDdEMsQ0FBQztBQXBCWSxvQkFBWSxlQW9CeEIsQ0FBQSJ9