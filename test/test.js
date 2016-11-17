"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
require("typings-test");
const shelljs = require("shelljs");
const should = require("should");
const smartstring = require("smartstring");
// the tested module
const smartdata = require("../dist/index");
let mongoChildProcess;
let testDb;
let testDbCollection;
describe('mongodb', function () {
    it('should start mongodb', function (done) {
        this.timeout(30000);
        mongoChildProcess = shelljs.exec('mongod --dbpath=./test/data --port 27017', { async: true, silent: true });
        let doneCalled = false;
        mongoChildProcess.stdout.on('data', function (data) {
            console.log(smartstring.indent.indentWithPrefix(data, '*** MongoDB Process *** : '));
            if (!doneCalled) {
                if (/waiting for connections on port 27017/.test(data)) {
                    doneCalled = true;
                    done();
                }
            }
        });
    });
});
describe('smartdata', function () {
    it('should establish a connection to mongodb', function (done) {
        testDb = new smartdata.Db('mongodb://localhost:27017/smartdata');
        testDb.connect().then(() => { done(); });
    });
    it('should create a collection', function () {
        testDbCollection = new smartdata.DbCollection('something', testDb);
    });
    it('should insert a doc into the collection', function (done) {
        testDbCollection.insertOne({ value1: 'test' }).then(() => { done(); });
    });
    it('should find all docs of testDbCollection', function (done) {
        testDbCollection.find({}).then((resultArray) => {
            console.log(resultArray);
            should(resultArray[0].value1).equal('test');
            done();
        });
    });
    it('should insert many docs into the collection', function (done) {
        testDbCollection.insertMany([
            { value1: 'test2' },
            { value1: 'test', value2: 3, value3: 'hi' }
        ]).then(() => { done(); });
    });
    it('should find a specified doc', function (done) {
        testDbCollection.find({ 'value3': { '$exists': true } }).then((resultArray) => {
            console.log(resultArray);
            should(resultArray[0].value3).equal('hi');
            done();
        }).catch(console.log);
    });
    it('should close the db Connection', function () {
        testDb.close();
    });
    it('should create an extended class', function () {
        let TestCar = class TestCar extends smartdata.DbDoc {
            constructor(optionsArg) {
                super();
                this.color = optionsArg.color;
            }
        };
        __decorate([
            smartdata.saveable,
            __metadata("design:type", String)
        ], TestCar.prototype, "color", void 0);
        TestCar = __decorate([
            smartdata.Collection(testDb),
            __metadata("design:paramtypes", [Object])
        ], TestCar);
        ;
        let testCarInstance = new TestCar({
            color: 'red',
            property2: 2
        });
        should(testCarInstance.saveableProperties[0]).equal('color');
        console.log(TestCar);
        should(testCarInstance.collection).be.instanceof(smartdata.DbCollection);
        should(testCarInstance).be.instanceof(smartdata.DbDoc);
        testCarInstance.save();
        it('should get a collection for testCar', function () {
        });
    });
});
describe('mongodb', function () {
    it('should kill mongodb', function (done) {
        this.timeout(30000);
        mongoChildProcess.stdout.on('data', function (data) {
            if (/dbexit:  rc: 0/.test(data)) {
                done();
            }
        });
        shelljs.exec('mongod --dbpath=./test/data --shutdown');
        mongoChildProcess.kill('SIGTERM');
    });
});
describe('smartdata with nedb', function () {
    let testDb;
    let testCollection;
    it('should create a DB with nedb', function () {
        testDb = new smartdata.Db('any', 'nedb');
        testDb.connect();
        testCollection = new smartdata.DbCollection('anyName', testDb);
    });
    it('should insert a doc', function (done) {
        testCollection.insertOne({ value1: 'hi' }).then(() => { done(); });
    });
    it('should find the inserted document', function (done) {
        testCollection.find({ value1: 'hi' }).then(x => {
            console.log(x);
            done();
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInRlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFBLHdCQUFxQjtBQUVyQixtQ0FBa0M7QUFDbEMsaUNBQWdDO0FBQ2hDLDJDQUEwQztBQUUxQyxvQkFBb0I7QUFDcEIsMkNBQTBDO0FBRTFDLElBQUksaUJBQWlCLENBQUE7QUFDckIsSUFBSSxNQUFvQixDQUFBO0FBUXhCLElBQUksZ0JBQXNELENBQUE7QUFFMUQsUUFBUSxDQUFDLFNBQVMsRUFBRTtJQUNoQixFQUFFLENBQUMsc0JBQXNCLEVBQUUsVUFBVSxJQUFJO1FBQ3JDLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUE7UUFDbkIsaUJBQWlCLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQywwQ0FBMEMsRUFBRSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUE7UUFDM0csSUFBSSxVQUFVLEdBQUcsS0FBSyxDQUFBO1FBQ3RCLGlCQUFpQixDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsTUFBTSxFQUFFLFVBQVUsSUFBSTtZQUM5QyxPQUFPLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxFQUFFLDRCQUE0QixDQUFDLENBQUMsQ0FBQTtZQUNwRixFQUFFLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7Z0JBQ2QsRUFBRSxDQUFDLENBQUMsdUNBQXVDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDckQsVUFBVSxHQUFHLElBQUksQ0FBQTtvQkFDakIsSUFBSSxFQUFFLENBQUE7Z0JBQ1YsQ0FBQztZQUNMLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQTtJQUNOLENBQUMsQ0FBQyxDQUFBO0FBQ04sQ0FBQyxDQUFDLENBQUE7QUFFRixRQUFRLENBQUMsV0FBVyxF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