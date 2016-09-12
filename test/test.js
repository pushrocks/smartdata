"use strict";
require('typings-test');
const shelljs = require('shelljs');
const should = require('should');
const smartstring = require('smartstring');
// the tested module
const smartdata = require('../dist/index');
let mongoChildProcess;
let testDb;
let testDbCollection;
class testCar {
    constructor(colorArg) {
        this.color = colorArg;
    }
}
describe('mongodb', function () {
    it('should start mongodb', function (done) {
        this.timeout(30000);
        mongoChildProcess = shelljs.exec('mongod --dbpath=./test/data --port 27017', { async: true, silent: true });
        let doneCalled = false;
        mongoChildProcess.stdout.on('data', function (data) {
            console.log(smartstring.indent.indentWithPrefix(data, "*** MongoDB Process *** : "));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInRlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLFFBQU8sY0FFUCxDQUFDLENBRm9CO0FBRXJCLE1BQVksT0FBTyxXQUFNLFNBQ3pCLENBQUMsQ0FEaUM7QUFDbEMsTUFBWSxNQUFNLFdBQU0sUUFDeEIsQ0FBQyxDQUQrQjtBQUNoQyxNQUFZLFdBQVcsV0FBTSxhQUc3QixDQUFDLENBSHlDO0FBRTFDLG9CQUFvQjtBQUNwQixNQUFZLFNBQVMsV0FBTSxlQUUzQixDQUFDLENBRnlDO0FBRTFDLElBQUksaUJBQWlCLENBQUE7QUFDckIsSUFBSSxNQUFvQixDQUFBO0FBUXhCLElBQUksZ0JBQXNELENBQUE7QUFFMUQ7SUFFSSxZQUFZLFFBQWU7UUFDdkIsSUFBSSxDQUFDLEtBQUssR0FBRyxRQUFRLENBQUE7SUFDekIsQ0FBQztBQUNMLENBQUM7QUFHRCxRQUFRLENBQUMsU0FBUyxFQUFFO0lBQ2hCLEVBQUUsQ0FBQyxzQkFBc0IsRUFBRSxVQUFVLElBQUk7UUFDckMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQTtRQUNuQixpQkFBaUIsR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLDBDQUEwQyxFQUFFLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQTtRQUMzRyxJQUFJLFVBQVUsR0FBRyxLQUFLLENBQUE7UUFDdEIsaUJBQWlCLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxNQUFNLEVBQUUsVUFBVSxJQUFJO1lBQzlDLE9BQU8sQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLEVBQUUsNEJBQTRCLENBQUMsQ0FBQyxDQUFBO1lBQ3BGLEVBQUUsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQztnQkFDZCxFQUFFLENBQUMsQ0FBQyx1Q0FBdUMsQ0FBQyxJQUFJ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