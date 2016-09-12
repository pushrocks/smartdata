import 'typings-test'

import * as shelljs from 'shelljs'
import * as should from 'should'
import * as smartstring from 'smartstring'

// the tested module
import * as smartdata from '../dist/index'

let mongoChildProcess
let testDbConnection: smartdata.DbConnection
let testDbCollection: smartdata.DbCollection<any>

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
        testDbCollection = new smartdata.DbCollection('something', testDbConnection)
    })
    it('should insert a doc into the collection', function (done) {
        testDbCollection.insertOne({ hello: 'test' }).then(() => { done() })
    })
    it('should find all docs of testDbCollection', function (done) {
        testDbCollection.find({}).then((resultArray) => {
            console.log(resultArray)
            should(resultArray[0].hello).equal('test')
            done()
        })
    })
    it('should insert many docs into the collection', function (done) {
        testDbCollection.insertMany([
            { hello: 'test' },
            { wow: 'what is this', wow2: 3}
        ]).then(() => { done() })
    })
    it('should find a specified doc', function (done) {
        testDbCollection.find({'wow2': {'$exists': true}}).then((resultArray) => {
            console.log(resultArray)
            should(resultArray[0].wow2).equal(3)
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
