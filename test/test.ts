import 'typings-test'

import * as shelljs from 'shelljs'
import * as should from 'should'

// the tested module
import * as smartdata from '../dist/index'

let mongoChildProcess
let testDbConnection: smartdata.DbConnection
let testDbCollection: smartdata.DbCollection<any>

describe('mongodb', function () {
    it('should start mongodb', function (done) {
        this.timeout(10000)
        mongoChildProcess = shelljs.exec('mongod --dbpath=./test/data --port 27017', { async: true, silent: true })
        let doneCalled = false
        mongoChildProcess.stdout.on('data', function(data) {
            console.log(data)
            if (!doneCalled){
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
    it('should close the db Connection', function () {
        testDbConnection.close()
    })
})

describe('mongodb', function () {
    it('should kill mongodb', function () {
        this.timeout(10000)
        shelljs.exec('mongod --dbpath=./test/data --shutdown')
        mongoChildProcess.kill('SIGTERM')
    })
})
