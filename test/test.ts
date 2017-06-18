import { tap, expect } from 'tapbundle'
import * as smartq from 'smartq'

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

tap.test('should establish a connection to mongodb', async () => {
  testDb = new smartdata.Db('mongodb://localhost:27017/smartdata')
  await testDb.connect()
})

tap.test('should insert a doc into the collection', async () => {
  await testDbCollection.insertOne({ value1: 'test' })
})

tap.test('should find all docs of testDbCollection', async () => {
  await testDbCollection.find({}).then(async (resultArray) => {
    console.log(resultArray)
    expect(resultArray[ 0 ].value1).equal('test')
  })
})

tap.test('should insert many docs into the collection', async () => {
  await testDbCollection.insertMany([
    { value1: 'test2' },
    { value1: 'test', value2: 3, value3: 'hi' }
  ])
})

tap.test('should find a specified doc', async () => {
  await testDbCollection.find({ 'value3': { '$exists': true } }).then((resultArray) => {
    console.log(resultArray)
    expect(resultArray[ 0 ].value3).equal('hi')
  })
})

tap.test('should close the db Connection', async () => {
  testDb.close()
})

tap.test('should create an extended class', async () => {
  @smartdata.Collection(testDb)
  class TestCar extends smartdata.DbDoc<TestCar> {
    @smartdata.svDb()
    color: string
    constructor (optionsArg: {
      color: string,
      property2: number
    }) {
      super('TestCar')
      this.color = optionsArg.color
    }
  }
  let testCarInstance = new TestCar({
    color: 'red',
    property2: 2
  })

  expect(testCarInstance.saveableProperties[ 0 ]).equal('color')
  console.log(TestCar)
  expect(testCarInstance.collection).be.instanceof(smartdata.DbCollection)
  expect(testCarInstance).be.instanceof(smartdata.DbDoc)
  testCarInstance.save()
})

tap.test('should get a collection for testCar', async () => {
 //
})

tap.start()
