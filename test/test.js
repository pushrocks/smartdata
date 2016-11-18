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
            smartdata.svDb(),
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