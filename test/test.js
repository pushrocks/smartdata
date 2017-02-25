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
Object.defineProperty(exports, "__esModule", { value: true });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInRlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBQSx3QkFBcUI7QUFFckIsbUNBQWtDO0FBQ2xDLGlDQUFnQztBQUNoQywyQ0FBMEM7QUFFMUMsb0JBQW9CO0FBQ3BCLDJDQUEwQztBQUUxQyxJQUFJLGlCQUFpQixDQUFBO0FBQ3JCLElBQUksTUFBb0IsQ0FBQTtBQVF4QixJQUFJLGdCQUFzRCxDQUFBO0FBRTFELFFBQVEsQ0FBQyxTQUFTLEVBQUU7SUFDbEIsRUFBRSxDQUFDLHNCQUFzQixFQUFFLFVBQVUsSUFBSTtRQUN2QyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFBO1FBQ25CLGlCQUFpQixHQUFHLE9BQU8sQ0FBQyxJQUFJLENBQUMsMENBQTBDLEVBQUUsRUFBRSxLQUFLLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsQ0FBQyxDQUFBO1FBQzNHLElBQUksVUFBVSxHQUFHLEtBQUssQ0FBQTtRQUN0QixpQkFBaUIsQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLE1BQU0sRUFBRSxVQUFVLElBQUk7WUFDaEQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxXQUFXLENBQUMsTUFBTSxDQUFDLGdCQUFnQixDQUFDLElBQUksRUFBRSw0QkFBNEIsQ0FBQyxDQUFDLENBQUE7WUFDcEYsRUFBRSxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDO2dCQUNoQixFQUFFLENBQUMsQ0FBQyx1Q0FBdUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUN2RCxVQUFVLEdBQUcsSUFBSSxDQUFBO29CQUNqQixJQUFJLEVBQUUsQ0FBQTtnQkFDUixDQUFDO1lBQ0gsQ0FBQztRQUNILENBQUMsQ0FBQyxDQUFBO0lBQ0osQ0FBQyxDQUFDLENBQUE7QUFDSixDQUFDLENBQUMsQ0FBQTtBQUVGLFFBQVEsQ0FBQyxXQUFX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