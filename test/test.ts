import 'typings-test'

import * as shelljs from 'shelljs'
import * as should from 'should'
import * as smartstring from 'smartstring'

// the tested module
import * as smartdata from '../dist/index'

let mongoChildProcess
let testDbConnection: smartdata.DbConnection

interface ITestObject1 {
    value1: string
    value2?: number
    value3?: string
}

let testDbCollection: smartdata.DbCollection<ITestObject1>

class testCar {
    color: string
    constructor(colorArg:string) {
        this.color = colorArg
    }
}


describe('mongodb', function () {
    it('should start mongodb', function (done) {
        this.timeout(30000)
        mongoChildProcess = shelljs.exec('mongod --dbpath=./test/data --port 27017', { async: true, silent: true })
        let doneCalled = false
        mongoChildProcess.stdout.on('data', function (data) {
            console.log(smartstring.indent.indentWithPrefix(data, "*** MongoDB Process *** : "))
            if (!doneCalled) {
                if (/waiting for connections on port 27017/.test(data)) {
                    doneCalled = true
                    done()
                }
            }
        })
    })
})

describe('smartdata', function () {
    it('should establish a connection to mongodb', function (done) {
        testDbConnection = new smartdata.DbConnection('mongodb://localhost:27017/smartdata')
        testDbConnection.connect().then(() => { done() })
    })
    it('should create a collection', function () {
        testDbCollection = new smartdata.DbCollection<ITestObject1>('something', testDbConnection)
    })
    it('should insert a doc into the collection', function (done) {
        testDbCollection.insertOne({ value1: 'test' }).then(() => { done() })
    })
    it('should find all docs of testDbCollection', function (done) {
        testDbCollection.find({}).then((resultArray) => {
            console.log(resultArray)
            should(resultArray[0].value1).equal('test')
            done()
        })
    })
    it('should insert many docs into the collection', function (done) {
        testDbCollection.insertMany([
            { value1: 'test2' },
            { value1: 'test', value2: 3, value3: 'hi' }
        ]).then(() => { done() })
    })
    it('should find a specified doc', function (done) {
        testDbCollection.find({'value3': {'$exists': true}}).then((resultArray) => {
            console.log(resultArray)
            should(resultArray[0].value3).equal('hi')
            done()
        }).catch(console.log)
    })
    it('should close the db Connection', function () {
        testDbConnection.close()
    })
})

describe('mongodb', function () {
    it('should kill mongodb', function (done) {
        this.timeout(30000)
        mongoChildProcess.stdout.on('data', function (data) {
            if (/dbexit:  rc: 0/.test(data)) {
                done()
            }
        })
        shelljs.exec('mongod --dbpath=./test/data --shutdown')
        mongoChildProcess.kill('SIGTERM')
    })
})
