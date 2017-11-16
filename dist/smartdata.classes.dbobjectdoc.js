"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const smartdata_classes_dbdoc_1 = require("./smartdata.classes.dbdoc");
const smartdata_classes_dbcollection_1 = require("./smartdata.classes.dbcollection");
exports.getObjectDoc = (nameArg, dbArg) => {
    let objectDoc = new smartdata_classes_dbdoc_1.DbDoc();
    objectDoc.name = nameArg;
    objectDoc.collection = new smartdata_classes_dbcollection_1.DbCollection(objectDoc, dbArg);
    return objectDoc;
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic21hcnRkYXRhLmNsYXNzZXMuZGJvYmplY3Rkb2MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi90cy9zbWFydGRhdGEuY2xhc3Nlcy5kYm9iamVjdGRvYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUdBLHVFQUFpRDtBQUNqRCxxRkFBK0Q7QUFFcEQsUUFBQSxZQUFZLEdBQUcsQ0FBQyxPQUFPLEVBQUMsS0FBUyxFQUFFLEVBQUU7SUFDOUMsSUFBSSxTQUFTLEdBQUcsSUFBSSwrQkFBSyxFQUFFLENBQUE7SUFDM0IsU0FBUyxDQUFDLElBQUksR0FBRyxPQUFPLENBQUE7SUFDeEIsU0FBUyxDQUFDLFVBQVUsR0FBRyxJQUFJLDZDQUFZLENBQUMsU0FBUyxFQUFFLEtBQUssQ0FBQyxDQUFBO0lBQ3pELE1BQU0sQ0FBQyxTQUFTLENBQUE7QUFDbEIsQ0FBQyxDQUFBIn0=