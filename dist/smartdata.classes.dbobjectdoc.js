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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic21hcnRkYXRhLmNsYXNzZXMuZGJvYmplY3Rkb2MuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi90cy9zbWFydGRhdGEuY2xhc3Nlcy5kYm9iamVjdGRvYy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUdBLHVFQUFpRDtBQUNqRCxxRkFBK0Q7QUFFcEQsUUFBQSxZQUFZLEdBQUcsQ0FBQyxPQUFPLEVBQUMsS0FBUztJQUMxQyxJQUFJLFNBQVMsR0FBRyxJQUFJLCtCQUFLLEVBQUUsQ0FBQTtJQUMzQixTQUFTLENBQUMsSUFBSSxHQUFHLE9BQU8sQ0FBQTtJQUN4QixTQUFTLENBQUMsVUFBVSxHQUFHLElBQUksNkNBQVksQ0FBQyxTQUFTLEVBQUUsS0FBSyxDQUFDLENBQUE7SUFDekQsTUFBTSxDQUFDLFNBQVMsQ0FBQTtBQUNsQixDQUFDLENBQUEifQ==