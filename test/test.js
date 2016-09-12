"use strict";
require('typings-test');
const shelljs = require('shelljs');
const should = require('should');
const smartstring = require('smartstring');
// the tested module
const smartdata = require('../dist/index');
let mongoChildProcess;
let testDbConnection;
let testDbCollection;
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
        testDbConnection = new smartdata.DbConnection('mongodb://localhost:27017/smartdata');
        testDbConnection.connect().then(() => { done(); });
    });
    it('should create a collection', function () {
        testDbCollection = new smartdata.DbCollection('something', testDbConnection);
    });
    it('should insert a doc into the collection', function (done) {
        testDbCollection.insertOne({ hello: 'test' }).then(() => { done(); });
    });
    it('should find all docs of testDbCollection', function (done) {
        testDbCollection.find({}).then((resultArray) => {
            console.log(resultArray);
            should(resultArray[0].hello).equal('test');
            done();
        });
    });
    it('should insert many docs into the collection', function (done) {
        testDbCollection.insertMany([
            { hello: 'test' },
            { wow: 'what is this', wow2: 3 }
        ]).then(() => { done(); });
    });
    it('should find a specified doc', function (done) {
        testDbCollection.find({ 'wow2': { '$exists': true } }).then((resultArray) => {
            console.log(resultArray);
            should(resultArray[0].wow2).equal(3);
            done();
        }).catch(console.log);
    });
    it('should close the db Connection', function () {
        testDbConnection.close();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInRlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLFFBQU8sY0FFUCxDQUFDLENBRm9CO0FBRXJCLE1BQVksT0FBTyxXQUFNLFNBQ3pCLENBQUMsQ0FEaUM7QUFDbEMsTUFBWSxNQUFNLFdBQU0sUUFDeEIsQ0FBQyxDQUQrQjtBQUNoQyxNQUFZLFdBQVcsV0FBTSxhQUc3QixDQUFDLENBSHlDO0FBRTFDLG9CQUFvQjtBQUNwQixNQUFZLFNBQVMsV0FBTSxlQUUzQixDQUFDLENBRnlDO0FBRTFDLElBQUksaUJBQWlCLENBQUE7QUFDckIsSUFBSSxnQkFBd0MsQ0FBQTtBQUM1QyxJQUFJLGdCQUE2QyxDQUFBO0FBRWpELFFBQVEsQ0FBQyxTQUFTLEVBQUU7SUFDaEIsRUFBRSxDQUFDLHNCQUFzQixFQUFFLFVBQVUsSUFBSTtRQUNyQyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFBO1FBQ25CLGlCQUFpQixHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsMENBQTBDLEVBQUUsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFBO1FBQzNHLElBQUksVUFBVSxHQUFHLEtBQUssQ0FBQTtRQUN0QixpQkFBaUIsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLE1BQU0sRUFBRSxVQUFVLElBQUk7WUFDOUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLGdCQUFnQixDQUFDLElBQUksRUFBRSw0QkFBNEIsQ0FBQyxDQUFDLENBQUE7WUFDcEYsRUFBRSxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO2dCQUNkLEVBQUUsQ0FBQyxDQUFDLHVDQUF1QyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ3JELFVBQVUsR0FBRyxJQUFJLENBQUE7b0JBQ2pCLElBQUksRUFBRSxD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