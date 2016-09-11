"use strict";
require('typings-test');
const shelljs = require('shelljs');
const smartdata = require('../dist/index');
let mongoChildProcess;
let testDbConnection;
describe('mongodb', function () {
    it('should start mongodb', function (done) {
        this.timeout(10000);
        mongoChildProcess = shelljs.exec('mongod --dbpath=./test/data --port 27017', { async: true });
        setTimeout(() => { done(); }, 5000); // give mongodb it some time to complete startup
    });
});
describe('smartdata', function () {
    it('should establish a connection to mongodb', function (done) {
        testDbConnection = new smartdata.DbConnection('mongodb://localhost:27017/smartdata');
        testDbConnection.connect().then(() => { done(); });
    });
    it('should create a collection', function () {
    });
    it('should close the db Connection', function () {
        testDbConnection.close();
    });
});
describe('mongodb', function () {
    it('should kill mongodb', function () {
        shelljs.exec('mongod --dbpath=./test/data --shutdown');
        mongoChildProcess.kill('SIGTERM');
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInRlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLFFBQU8sY0FDUCxDQUFDLENBRG9CO0FBQ3JCLE1BQVksT0FBTyxXQUFNLFNBQ3pCLENBQUMsQ0FEaUM7QUFFbEMsTUFBWSxTQUFTLFdBQU0sZUFHM0IsQ0FBQyxDQUh5QztBQUcxQyxJQUFJLGlCQUFpQixDQUFBO0FBQ3JCLElBQUksZ0JBQXdDLENBQUE7QUFHNUMsUUFBUSxDQUFDLFNBQVMsRUFBQztJQUNmLEVBQUUsQ0FBQyxzQkFBc0IsRUFBQyxVQUFTLElBQUk7UUFDbkMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQTtRQUNuQixpQkFBaUIsR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLDBDQUEwQyxFQUFDLEVBQUMsS0FBSyxFQUFFLElBQUksRUFBQyxDQUFDLENBQUE7UUFDMUYsVUFBVSxDQUFDLFFBQVEsSUFBSSxFQUFFLENBQUEsQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUEsQ0FBQyxnREFBZ0Q7SUFDdkYsQ0FBQyxDQUFDLENBQUE7QUFDTixDQUFDLENBQUMsQ0FBQTtBQUNGLFFBQVEsQ0FBQyxXQUFXLEVBQUM7SUFDakIsRUFBRSxDQUFDLDBDQUEwQyxFQUFDLFVBQVMsSUFBSTtRQUN2RCxnQkFBZ0IsR0FBRyxJQUFJLFNBQVMsQ0FBQyxZQUFZLENBQUMscUNBQXFDLENBQUMsQ0FBQTtRQUNwRixnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxJQUFJLENBQUMsUUFBUSxJQUFJLEVBQUUsQ0FBQSxDQUFDLENBQUMsQ0FBQyxDQUFBO0lBQ3JELENBQUMsQ0FBQyxDQUFBO0lBQ0YsRUFBRSxDQUFDLDRCQUE0QixFQUFDO0lBRWhDLENBQUMsQ0FBQyxDQUFBO0lBQ0YsRUFBRSxDQUFDLGdDQUFnQyxFQUFDO1FBQ2hDLGdCQUFnQixDQUFDLEtBQUssRUFBRSxDQUFBO0lBQzVCLENBQUMsQ0FBQyxDQUFBO0FBQ04sQ0FBQyxDQUFDLENBQUE7QUFFRixRQUFRLENBQUMsU0FBUyxFQUFDO0lBQ2YsRUFBRSxDQUFDLHFCQUFxQixFQUFDO1FBQ3JCLE9BQU8sQ0FBQyxJQUFJLENBQUMsd0NBQXdDLENBQUMsQ0FBQTtRQUN0RCxpQkFBaUIsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUE7SUFDckMsQ0FBQyxDQUFDLENBQUE7QUFDTixDQUFDLENBQUMsQ0FBQSJ9