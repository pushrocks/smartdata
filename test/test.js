"use strict";
require('typings-test');
const shelljs = require('shelljs');
const smartstring = require('smartstring');
// the tested module
const smartdata = require('../dist/index');
let mongoChildProcess;
let testDbConnection;
let testDbCollection;
describe('mongodb', function () {
    it('should start mongodb', function (done) {
        this.timeout(10000);
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
    it('should insert something into the collection', function () {
        testDbCollection.insertOne({ hello: 'test' });
    });
    it('should close the db Connection', function () {
        testDbConnection.close();
    });
});
describe('mongodb', function () {
    it('should kill mongodb', function () {
        this.timeout(10000);
        shelljs.exec('mongod --dbpath=./test/data --shutdown');
        mongoChildProcess.kill('SIGTERM');
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInRlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLFFBQU8sY0FFUCxDQUFDLENBRm9CO0FBRXJCLE1BQVksT0FBTyxXQUFNLFNBQ3pCLENBQUMsQ0FEaUM7QUFFbEMsTUFBWSxXQUFXLFdBQU0sYUFHN0IsQ0FBQyxDQUh5QztBQUUxQyxvQkFBb0I7QUFDcEIsTUFBWSxTQUFTLFdBQU0sZUFFM0IsQ0FBQyxDQUZ5QztBQUUxQyxJQUFJLGlCQUFpQixDQUFBO0FBQ3JCLElBQUksZ0JBQXdDLENBQUE7QUFDNUMsSUFBSSxnQkFBNkMsQ0FBQTtBQUVqRCxRQUFRLENBQUMsU0FBUyxFQUFFO0lBQ2hCLEVBQUUsQ0FBQyxzQkFBc0IsRUFBRSxVQUFVLElBQUk7UUFDckMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQTtRQUNuQixpQkFBaUIsR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLDBDQUEwQyxFQUFFLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQTtRQUMzRyxJQUFJLFVBQVUsR0FBRyxLQUFLLENBQUE7UUFDdEIsaUJBQWlCLENBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxNQUFNLEVBQUUsVUFBUyxJQUFJO1lBQzdDLE9BQU8sQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLEVBQUMsNEJBQTRCLENBQUMsQ0FBQyxDQUFBO1lBQ25GLEVBQUUsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUEsQ0FBQztnQkFDYixFQUFFLENBQUMsQ0FBQyx1Q0FBdUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUNyRCxVQUFVLEdBQUcsSUFBSSxDQUFBO29CQUNqQixJQUFJLEVBQUUsQ0FBQTtnQkFDVixDQUFDO1lBQ0wsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFBO0lBQ04sQ0FBQyxDQUFDLENBQUE7QUFDTixDQUFDLENBQUMsQ0FBQTtBQUNGLFFBQVEsQ0FBQyxXQUFXLEVBQUU7SUFDbEIsRUFBRSxDQUFDLDBDQUEwQyxFQUFFLFVBQVUsSUFBSTtRQUN6RCxnQkFBZ0IsR0FBRyxJQUFJLFNBQVMsQ0FBQyxZQUFZLENBQUMscUNBQXFDLENBQUMsQ0FBQTtRQUNwRixnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxJQUFJLENBQUMsUUFBUSxJQUFJLEVBQUUsQ0FBQSxDQUFDLENBQUMsQ0FBQyxDQUFBO0lBQ3JELENBQUMsQ0FBQyxDQUFBO0lBQ0YsRUFBRSxDQUFDLDRCQUE0QixFQUFFO1FBQzdCLGdCQUFnQixHQUFHLElBQUksU0FBUyxDQUFDLFlBQVksQ0FBQyxXQUFXLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQTtJQUNoRixDQUFDLENBQUMsQ0FBQTtJQUNGLEVBQUUsQ0FBQyw2Q0FBNkMsRUFBQztRQUM3QyxnQkFBZ0IsQ0FBQyxTQUFTLENBQUMsRUFBQyxLQUFLLEVBQUUsTUFBTSxFQUFDLENBQUMsQ0FBQTtJQUMvQyxDQUFDLENBQUMsQ0FBQTtJQUNGLEVBQUUsQ0FBQyxnQ0FBZ0MsRUFBRTtRQUNqQyxnQkFBZ0IsQ0FBQyxLQUFLLEVBQUUsQ0FBQTtJQUM1QixDQUFDLENBQUMsQ0FBQTtBQUNOLENBQUMsQ0FBQyxDQUFBO0FBRUYsUUFBUSxDQUFDLFNBQVMsRUFBRTtJQUNoQixFQUFFLENBQUMscUJBQXFCLEVBQUU7UUFDdEIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQTtRQUNuQixPQUFPLENBQUMsSUFBSSxDQUFDLHdDQUF3QyxDQUFDLENBQUE7UUFDdEQsaUJBQWlCLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFBO0lBQ3JDLENBQUMsQ0FBQyxDQUFBO0FBQ04sQ0FBQyxDQUFDLENBQUEifQ==