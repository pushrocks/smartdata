import { tap, expect } from '@pushrocks/tapbundle';
import { Qenv } from '@pushrocks/qenv';

const testQenv = new Qenv(process.cwd(), process.cwd() + '/.nogit/');

// the tested module
import * as smartdata from '../ts/index';

import * as mongoPlugin from 'mongodb-memory-server';
import { smartunique } from '../ts/smartdata.plugins';

// =======================================
// Connecting to the database server
// =======================================

let testDb: smartdata.SmartdataDb;
let smartdataOptions: smartdata.IMongoDescriptor;
let mongod: mongoPlugin.MongoMemoryServer;

tap.skip.test('should create a testinstance as database', async () => {
  mongod = new mongoPlugin.MongoMemoryServer({});
  console.log('created mongod instance');
  await mongod._startUpInstance().catch((err) => {
    console.log(err);
  });
  console.log('mongod started');
  smartdataOptions = {
    mongoDbName: await mongod.getDbName(),
    mongoDbPass: '',
    mongoDbUrl: await mongod.getConnectionString(),
  };
  console.log(smartdataOptions);
  testDb = new smartdata.SmartdataDb(smartdataOptions);
});

tap.test('should connect to atlas', async (tools) => {
  const databaseName = `test-smartdata-${smartunique.shortId()}`;
  testDb = new smartdata.SmartdataDb({
    mongoDbUrl: testQenv.getEnvVarOnDemand('MONGO_URL'),
    mongoDbName: databaseName,
  });
});

tap.test('should establish a connection to mongod', async () => {
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
class Car extends smartdata.SmartDataDbDoc<Car, Car> {
  @smartdata.unI()
  public index: string = smartunique.shortId();

  @smartdata.svDb()
  public color: string;

  @smartdata.svDb()
  public brand: string;

  @smartdata.svDb()
  deepData = {
    sodeep: 'yes'
  };

  constructor(colorArg: string, brandArg: string) {
    super();
    this.color = colorArg;
    this.brand = brandArg;
  }
}

tap.test('should save the car to the db', async () => {
  const myCar = new Car('red', 'Volvo');
  await myCar.save();

  const myCar2 = new Car('red', 'Volvo');
  await myCar2.save();

  

  let counter = 0;
  do {
    const myCar3 = new Car('red', 'Renault');
    await myCar3.save();
    counter++;
  } while (counter < 2000);
});

tap.test('expect to get instance of Car', async () => {
  let counter = 0;
  do {
    const timeStart = Date.now();
    const myCars = await Car.getInstances<Car>({
      brand: 'Volvo',
    });
    console.log(`took ${Date.now() - timeStart}`);
    counter++;
  } while (counter < 2000);
});

tap.test('expect to get instance of Car', async () => {
  let counter = 0;
  do {
    const timeStart = Date.now();
    const myCars2 = await Car.getInstances<Car>({
      'deepData.sodeep': 'yes',
    } as any);
    console.log(`took ${Date.now() - timeStart}`);
    counter++;
  } while (counter < 2000);
});

tap.test('expect to get instance of Car and update it', async () => {
  const myCar = await Car.getInstance<Car>({
    brand: 'Volvo',
  });
  expect(myCar.color).to.equal('red');
  myCar.color = 'blue';
  await myCar.save();
});

tap.test('should be able to delete an instance of car', async () => {
  const myCar = await Car.getInstance<Car>({
    brand: 'Volvo',
  });
  expect(myCar.color).to.equal('blue');
  await myCar.delete();

  const myCar2 = await Car.getInstance<Car>({
    brand: 'Volvo',
  });
  expect(myCar2.color).to.equal('red');
});

// tslint:disable-next-line: max-classes-per-file
@smartdata.Collection(() => {
  return testDb;
})
class Truck extends smartdata.SmartDataDbDoc<Car, Car> {
  @smartdata.unI()
  public id: string = smartunique.shortId();

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

tap.test('should store a new Truck', async () => {
  const truck = new Truck('blue', 'MAN');
  await truck.save();
  const myTruck = await Truck.getInstance<Truck>({ color: 'blue' });
  myTruck.id = 'foo';
  await myTruck.save();
  const myTruck2 = await Truck.getInstance<Truck>({ color: 'blue' });
  console.log(myTruck2);
});

// =======================================
// close the database connection
// =======================================
tap.test('should close the database connection', async (tools) => {
  await testDb.close();
  try {
    await mongod.stop();
  } catch (e) {}
});

tap.start({ throwOnError: true });
