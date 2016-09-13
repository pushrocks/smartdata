"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
require('typings-test');
const shelljs = require('shelljs');
const should = require('should');
const smartstring = require('smartstring');
// the tested module
const smartdata = require('../dist/index');
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
        TestCar = __decorate([
            smartdata.Collection(testDb)
        ], TestCar);
        ;
        let testCarInstance = new TestCar({
            color: 'red',
            property2: 2
        });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInRlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBLFFBQU8sY0FFUCxDQUFDLENBRm9CO0FBRXJCLE1BQVksT0FBTyxXQUFNLFNBQ3pCLENBQUMsQ0FEaUM7QUFDbEMsTUFBWSxNQUFNLFdBQU0sUUFDeEIsQ0FBQyxDQUQrQjtBQUNoQyxNQUFZLFdBQVcsV0FBTSxhQUc3QixDQUFDLENBSHlDO0FBRTFDLG9CQUFvQjtBQUNwQixNQUFZLFNBQVMsV0FBTSxlQUUzQixDQUFDLENBRnlDO0FBRTFDLElBQUksaUJBQWlCLENBQUE7QUFDckIsSUFBSSxNQUFvQixDQUFBO0FBUXhCLElBQUksZ0JBQXNELENBQUE7QUFFMUQsUUFBUSxDQUFDLFNBQVMsRUFBRTtJQUNoQixFQUFFLENBQUMsc0JBQXNCLEVBQUUsVUFBVSxJQUFJO1FBQ3JDLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUE7UUFDbkIsaUJBQWlCLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQywwQ0FBMEMsRUFBRSxFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUE7UUFDM0csSUFBSSxVQUFVLEdBQUcsS0FBSyxDQUFBO1FBQ3RCLGlCQUFpQixDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsTUFBTSxFQUFFLFVBQVUsSUFBSTtZQUM5QyxPQUFPLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxFQUFFLDRCQUE0QixDQUFDLENBQUMsQ0FBQTtZQUNwRixFQUFFLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUM7Z0JBQ2QsRUFBRSxDQUFDLENBQUMsdUNBQXVDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDckQsVUFBVSxHQUFHLElBQUksQ0FBQTtvQkFDakIsSUFBSSxF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