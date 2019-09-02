import { tap, expect } from '@pushrocks/tapbundle';
import { Qenv } from '@pushrocks/qenv';

const testQenv = new Qenv(process.cwd(), process.cwd() + '/.nogit/');

// the tested module
import * as smartdata from '../ts/index';
import { smartstring } from '../ts/smartdata.plugins';
import * as smartunique from '@pushrocks/smartunique';

import * as mongoPlugin from 'mongodb-memory-server';

// =======================================
// Connecting to the database server
// =======================================

let testDb: smartdata.SmartdataDb;
let smartdataOptions: smartdata.ISmartdataOptions;
let mongod: mongoPlugin.MongoMemoryServer;

tap.test('should create a testinstance as database', async () => {
  mongod = new mongoPlugin.MongoMemoryServer();
  smartdataOptions = {
    mongoDbName: await mongod.getDbName(),
    mongoDbPass: '',
    mongoDbUrl: await mongod.getConnectionString()
  };
  console.log(smartdataOptions);
});

tap.test('should create a smartdb', async () => {
  testDb = new smartdata.SmartdataDb({
    mongoDbName: testQenv.getEnvVarOnDemand('MONGO_DBNAME'),
    mongoDbUrl: testQenv.getEnvVarOnDemand('MONGO_URL'),
    mongoDbPass: testQenv.getEnvVarOnDemand('MONGO_PASS')
  });
});

tap.test('should establish a connection to the rethink Db cluster', async () => {
  await testDb.init();
});

// =======================================
// The actual tests
// =======================================

// ------
// Collections
// ------

@smartdata.Collection(() => {
  return testDb;
})
class Car extends smartdata.SmartDataDbDoc<Car> {
  @smartdata.unI()
  public index: string = smartunique.shortId();
  
  @smartdata.svDb()
  public color: string;
  
  @smartdata.svDb()
  public brand: string;

  constructor(colorArg: string, brandArg: string) {
    super();
    this.color = colorArg;
    this.brand = brandArg;
  }
}

tap.test('should save the car to the db', async () => {
  const myCar = new Car('red', 'Volvo');
  await myCar.save();

  const myCar2 = new Car('red', 'Renault');
  await myCar2.save();
});

tap.test('expect to get instance of Car', async () => {
  const myCars = await Car.getInstances<Car>({
    brand: 'Volvo'
  });
  expect(myCars[0].color).to.equal('red');
});

tap.test('expect to get instance of Car and update it', async () => {
  const myCar = await Car.getInstance<Car>({
    brand: 'Volvo'
  });
  expect(myCar.color).to.equal('red');
  myCar.color = 'blue';
  await myCar.save();

});

tap.test('should be able to update an instance of car', async () => {});

tap.test('should be able to delete an instance of car', async () => {});

// =======================================
// close the database connection
// =======================================
tap.test('should close the database connection', async tools => {
  await testDb.close();
  await mongod.stop();
});

tap.start({ throwOnError: true });
