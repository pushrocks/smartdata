"use strict";
require('typings-test');
const shelljs = require('shelljs');
const smartdata = require('../dist/index');
let mongoChildProcess;
let testDbConnection;
describe('mongodb', function () {
    it('should start mongodb', function (done) {
        mongoChildProcess = shelljs.exec('mongod --dbpath=./test/data --port 27017', { async: true });
        setTimeout(() => { done(); }, 1500);
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
        shelljs.exec('mongod --shutdown');
        mongoChildProcess.kill('SIGTERM');
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInRlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLFFBQU8sY0FDUCxDQUFDLENBRG9CO0FBQ3JCLE1BQVksT0FBTyxXQUFNLFNBQ3pCLENBQUMsQ0FEaUM7QUFFbEMsTUFBWSxTQUFTLFdBQU0sZUFHM0IsQ0FBQyxDQUh5QztBQUcxQyxJQUFJLGlCQUFpQixDQUFBO0FBQ3JCLElBQUksZ0JBQXdDLENBQUE7QUFHNUMsUUFBUSxDQUFDLFNBQVMsRUFBQztJQUNmLEVBQUUsQ0FBQyxzQkFBc0IsRUFBQyxVQUFTLElBQUk7UUFDbkMsaUJBQWlCLEdBQUcsT0FBTyxDQUFDLElBQUksQ0FBQywwQ0FBMEMsRUFBQyxFQUFDLEtBQUssRUFBRSxJQUFJLEVBQUMsQ0FBQyxDQUFBO1FBQzFGLFVBQVUsQ0FBQyxRQUFRLElBQUksRUFBRSxDQUFBLENBQUMsQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFBO0lBQ3RDLENBQUMsQ0FBQyxDQUFBO0FBQ04sQ0FBQyxDQUFDLENBQUE7QUFDRixRQUFRLENBQUMsV0FBVyxFQUFDO0lBQ2pCLEVBQUUsQ0FBQywwQ0FBMEMsRUFBQyxVQUFTLElBQUk7UUFDdkQsZ0JBQWdCLEdBQUcsSUFBSSxTQUFTLENBQUMsWUFBWSxDQUFDLHFDQUFxQyxDQUFDLENBQUE7UUFDcEYsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLENBQUMsSUFBSSxDQUFDLFFBQVEsSUFBSSxFQUFFLENBQUEsQ0FBQyxDQUFDLENBQUMsQ0FBQTtJQUNyRCxDQUFDLENBQUMsQ0FBQTtJQUNGLEVBQUUsQ0FBQyw0QkFBNEIsRUFBQztJQUVoQyxDQUFDLENBQUMsQ0FBQTtJQUNGLEVBQUUsQ0FBQyxnQ0FBZ0MsRUFBQztRQUNoQyxnQkFBZ0IsQ0FBQyxLQUFLLEVBQUUsQ0FBQTtJQUM1QixDQUFDLENBQUMsQ0FBQTtBQUNOLENBQUMsQ0FBQyxDQUFBO0FBRUYsUUFBUSxDQUFDLFNBQVMsRUFBQztJQUNmLEVBQUUsQ0FBQyxxQkFBcUIsRUFBQztRQUNyQixPQUFPLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLENBQUE7UUFDakMsaUJBQWlCLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFBO0lBQ3JDLENBQUMsQ0FBQyxDQUFBO0FBQ04sQ0FBQyxDQUFDLENBQUEifQ==