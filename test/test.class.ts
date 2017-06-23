import { tap, expect } from 'tapbundle'
import * as smartq from 'smartq'
import { Qenv } from 'qenv'

let testQenv = new Qenv(process.cwd(), process.cwd() + '/.nogit/')

// the tested module
import * as smartdata from '../dist/index'

let mongoChildProcess
let testDb: smartdata.Db

tap.test('should establish a connection to mongodb', async () => {
    testDb = new smartdata.Db(`mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@sandbox-shard-00-00-uyw7y.mongodb.net:27017,sandbox-shard-00-01-uyw7y.mongodb.net:27017,sandbox-shard-00-02-uyw7y.mongodb.net:27017/${process.env.MONGO_DATABASE}?ssl=true&replicaSet=sandbox-shard-0&authSource=admin`)
  await testDb.connect()
})

let testCarInstance

tap.test('should create an extended class', async () => {
  @smartdata.Collection(testDb)
  class TestCar extends smartdata.DbDoc<TestCar> {
    @smartdata.svDb()
    color: string
    constructor (optionsArg: {
      color: string,
      property2: number
    }) {
      super()
      this.color = optionsArg.color
    }
  }
  testCarInstance = new TestCar({
    color: 'red',
    property2: 2
  })
  expect(testCarInstance.name).to.equal('TestCar')
  expect(testCarInstance.saveableProperties[ 0 ]).equal('color')
  expect(testCarInstance.collection).be.instanceof(smartdata.DbCollection)
  expect(testCarInstance).be.instanceof(smartdata.DbDoc)
  if (!process.env.CI) { console.log(TestCar) }
})

tap.test('should save testCar', async () => {
 await testCarInstance.save()
})

tap.test('should close the db Connection', async () => {
  await testDb.close()
})

tap.start()
