import { tap, expect } from 'tapbundle'
import * as smartq from 'smartq'
import { Qenv } from 'qenv'

let testQenv = new Qenv(process.cwd(), process.cwd() + '/.nogit/')

// the tested module
import * as smartdata from '../ts/index'

let mongoChildProcess
let testDb: smartdata.Db

interface ITestObject1 {
  value1: string
  value2?: number
  value3?: string
}

tap.test('should establish a connection to mongodb', async () => {
  // testDb = new smartdata.Db(`mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@sandbox-shard-00-00-uyw7y.mongodb.net:27017,sandbox-shard-00-01-uyw7y.mongodb.net:27017,sandbox-shard-00-02-uyw7y.mongodb.net:27017/${process.env.MONGO_DATABASE}?ssl=true&replicaSet=sandbox-shard-0&authSource=admin`)
  testDb = new smartdata.Db({
    db: 'test',
    host: ''
  })
  await testDb.connect()
})

// =======================================
// The actual tests
// =======================================

// ------
// Collections
// ------
let testDbTable: smartdata.DbTable<ITestObject1>

tap.test('should give me a collection', async () => {
  testDbTable = await testDb.getTableByName<ITestObject1>('testTable')
})

tap.test('should insert a doc into the collection', async () => {
  await testDbTable.insertOne({ value1: 'test' })
})

tap.test('should find all docs of testDbCollection', async () => {
  await testDbTable.find({}).then(async (resultArray) => {
    console.log(resultArray)
    expect(resultArray[ 0 ].value1).equal('test')
  })
})

tap.test('should insert many docs into the collection', async () => {
  await testDbTable.insertMany([
    { value1: 'test2' },
    { value1: 'test', value2: 3, value3: 'hi' }
  ])
})

tap.test('should find a specified doc', async () => {
  await testDbTable.find({ 'value3': { '$exists': true } }).then((resultArray) => {
    console.log(resultArray)
    expect(resultArray[ 0 ].value3).equal('hi')
  })
})



tap.test('should close the db Connection', async () => {
  await testDb.close()
})

tap.start()
