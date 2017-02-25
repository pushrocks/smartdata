import 'typings-test'

import * as shelljs from 'shelljs'
import * as should from 'should'
import * as smartstring from 'smartstring'

// the tested module
import * as smartdata from '../dist/index'

let mongoChildProcess
let testDb: smartdata.Db

interface ITestObject1 {
  value1: string
  value2?: number
  value3?: string
}

let testDbCollection: smartdata.DbCollection<ITestObject1>

describe('mongodb', function () {
  it('should start mongodb', function (done) {
    this.timeout(30000)
    mongoChildProcess = shelljs.exec('mongod --dbpath=./test/data --port 27017', { async: true, silent: true })
    let doneCalled = false
    mongoChildProcess.stdout.on('data', function (data) {
      console.log(smartstring.indent.indentWithPrefix(data, '*** MongoDB Process *** : '))
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
    testDb = new smartdata.Db('mongodb://localhost:27017/smartdata')
    testDb.connect().then(() => { done() })
  })
  it('should create a collection', function () {
    testDbCollection = new smartdata.DbCollection<ITestObject1>('something', testDb)
  })
  it('should insert a doc into the collection', function (done) {
    testDbCollection.insertOne({ value1: 'test' }).then(() => { done() })
  })
  it('should find all docs of testDbCollection', function (done) {
    testDbCollection.find({}).then((resultArray) => {
      console.log(resultArray)
      should(resultArray[ 0 ].value1).equal('test')
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
    testDbCollection.find({ 'value3': { '$exists': true } }).then((resultArray) => {
      console.log(resultArray)
      should(resultArray[ 0 ].value3).equal('hi')
      done()
    }).catch(console.log)
  })
  it('should close the db Connection', function () {
    testDb.close()
  })
  it('should create an extended class', function () {
    @smartdata.Collection(testDb)
    class TestCar extends smartdata.DbDoc<TestCar> {
      @smartdata.svDb()
      color: string
      constructor(optionsArg: {
        color: string,
        property2: number
      }) {
        super()
        this.color = optionsArg.color
      }
    };
    let testCarInstance = new TestCar({
      color: 'red',
      property2: 2
    })

    should(testCarInstance.saveableProperties[ 0 ]).equal('color')
    console.log(TestCar)
    should(testCarInstance.collection).be.instanceof(smartdata.DbCollection)
    should(testCarInstance).be.instanceof(smartdata.DbDoc)
    testCarInstance.save()
    it('should get a collection for testCar', function () {

    })
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

describe('smartdata with nedb', function () {
  let testDb: smartdata.Db
  let testCollection: smartdata.DbCollection<ITestObject1>
  it('should create a DB with nedb', function () {
    testDb = new smartdata.Db('any', 'nedb')
    testDb.connect()
    testCollection = new smartdata.DbCollection<ITestObject1>('anyName', testDb)
  })

  it('should insert a doc', function (done) {
    testCollection.insertOne({ value1: 'hi' }).then(() => { done() })
  })

  it('should find the inserted document', function (done) {
    testCollection.find({ value1: 'hi' }).then(x => {
      console.log(x)
      done()
    })
  })
})
