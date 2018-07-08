import { tap, expect } from 'tapbundle';
import * as smartpromise from '@pushrocks/smartpromise';
import { Qenv } from 'qenv';

let testQenv = new Qenv(process.cwd(), process.cwd() + '/.nogit/');

// the tested module
import * as smartdata from '../ts/index';
import { smartstring } from '../ts/smartdata.plugins';

// =======================================
// Connecting to the database server
// =======================================

let testDb = new smartdata.SmartdataDb({
  mongoDbName: process.env.MONGO_DBNAME,
  mongoDbUrl: process.env.MONGO_URL,
  mongoPass: process.env.MONGO_PASS
});

tap.test('should establish a connection to the rethink Db cluster', async () => {
  await testDb.connect();
});

// =======================================
// The actual tests
// =======================================

// ------
// Collections
// ------

@smartdata.Table(testDb)
class Car extends smartdata.smartDataDbDoc<Car> {
  @smartdata.svDb() color: string;
  @smartdata.svDb() brand: string;
  constructor(colorArg: string, brandArg: string) {
    super();
    this.color = colorArg;
    this.brand = brandArg;
  }
}

tap.test('should save the car to the db', async () => {
  const myCar = new Car('red', 'Volvo');
  await myCar.save();
});

tap.test('expect to get instance of Car', async () => {
  let myCar = await Car.getInstances<Car>({
    brand: 'Volvo'
  });
  expect(myCar[0].color).to.equal('red');
});

// =======================================
// close the database connection
// =======================================
tap.test('should close the database connection', async tools => {
  await testDb.close();
});

tap.start();
