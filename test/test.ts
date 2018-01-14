import { tap, expect } from 'tapbundle'
import * as smartq from 'smartq'
import { Qenv } from 'qenv'

let testQenv = new Qenv(process.cwd(), process.cwd() + '/.nogit/')

// the tested module
import * as smartdata from '../ts/index'
import { smartstring } from '../ts/smartdata.plugins';

// =======================================
// Connecting to the database server
// =======================================

let testDb = new smartdata.Db({
  db: process.env.RDB_DB,
  host: process.env.RDB_HOST,
  user: process.env.RDB_USER,
  password: process.env.RDB_PASS,
  port: parseInt(process.env.RDB_PORT)
})
testDb.setSsl(process.env.RDB_CERT, 'base64')

tap.test('should establish a connection to the rethink Db cluster', async () => {
  
  await testDb.connect()
})

// =======================================
// The actual tests
// =======================================

// ------
// Collections
// ------

@smartdata.Table(testDb)
class Car extends smartdata.DbDoc<Car> {
  
  @smartdata.svDb() color: string
  @smartdata.svDb() brand: string
  constructor (colorArg: string, brandArg: string) {
    super()
    this.color = colorArg
    this.brand = brandArg
  }
}

tap.test('should save the car to the db', async () => {
  const myCar = new Car('red','Volvo')
  await myCar.save()
})

tap.test('expect to get instance of Car', async () => {
  let myCar = await Car.getInstances<Car>({
    brand: 'Volvo'
  })
  expect(myCar[0].color).to.equal('red')
})


// =======================================
// close the database connection
// =======================================
tap.test('should close the database connection', async (tools) => {
  await testDb.close()
})

tap.start()
