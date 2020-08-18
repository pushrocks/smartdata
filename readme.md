# @pushrocks/smartdata
do more with data

## Availabililty and Links
* [npmjs.org (npm package)](https://www.npmjs.com/package/@pushrocks/smartdata)
* [gitlab.com (source)](https://gitlab.com/pushrocks/smartdata)
* [github.com (source mirror)](https://github.com/pushrocks/smartdata)
* [docs (typedoc)](https://pushrocks.gitlab.io/smartdata/)

## Status for master

Status Category | Status Badge
-- | --
GitLab Pipelines | [![pipeline status](https://gitlab.com/pushrocks/smartdata/badges/master/pipeline.svg)](https://lossless.cloud)
GitLab Pipline Test Coverage | [![coverage report](https://gitlab.com/pushrocks/smartdata/badges/master/coverage.svg)](https://lossless.cloud)
npm | [![npm downloads per month](https://badgen.net/npm/dy/@pushrocks/smartdata)](https://lossless.cloud)
Snyk | [![Known Vulnerabilities](https://badgen.net/snyk/pushrocks/smartdata)](https://lossless.cloud)
TypeScript Support | [![TypeScript](https://badgen.net/badge/TypeScript/>=%203.x/blue?icon=typescript)](https://lossless.cloud)
node Support | [![node](https://img.shields.io/badge/node->=%2010.x.x-blue.svg)](https://nodejs.org/dist/latest-v10.x/docs/api/)
Code Style | [![Code Style](https://badgen.net/badge/style/prettier/purple)](https://lossless.cloud)
PackagePhobia (total standalone install weight) | [![PackagePhobia](https://badgen.net/packagephobia/install/@pushrocks/smartdata)](https://lossless.cloud)
PackagePhobia (package size on registry) | [![PackagePhobia](https://badgen.net/packagephobia/publish/@pushrocks/smartdata)](https://lossless.cloud)
BundlePhobia (total size when bundled) | [![BundlePhobia](https://badgen.net/bundlephobia/minzip/@pushrocks/smartdata)](https://lossless.cloud)
Platform support | [![Supports Windows 10](https://badgen.net/badge/supports%20Windows%2010/yes/green?icon=windows)](https://lossless.cloud) [![Supports Mac OS X](https://badgen.net/badge/supports%20Mac%20OS%20X/yes/green?icon=apple)](https://lossless.cloud)

## Usage

Use TypeScript for best in class instellisense.

smartdata is an ODM that adheres to TypeScript practices and uses classes to organize data.
It uses RethinkDB as persistent storage.

## Intention

There are many ODMs out there, however when we searched for an ODM that uses TypeScript,
acts smart while still embracing the NoSQL idea we didn't find a matching solution.
This is why we started smartdata.

How RethinkDB's terms map to the ones of smartdata:

| MongoDb term | smartdata class               |
| ------------ | ----------------------------- |
| Database     | smartdata.SmartdataDb         |
| Collection   | smartdata.SmartdataCollection |
| Document     | smartdata.SmartadataDoc       |

### class Db

represents a Database. Naturally it has .connect() etc. methods on it.

```typescript
import * as smartdata from 'smartdata';

const smartdataDb = new smartdata.SmartdataDb({
  mongoDbUrl: '//someurl',
  mongoDbName: 'myDatabase',
  mongoDbPass: 'mypassword',
});

smartdataDb.connect();
```

### class DbCollection

represents a collection of objects.
A collection is defined by the object class (that is extending smartdata.dbdoc) it respresents

So to get to get access to a specific collection you document

```typescript
// continues from the block before...

@smartdata.Collection(smartdataDb)
class MyObject extends smartdata.DbDoc<MyObject> {
  // read the next block about DbDoc
  @smartdata.svDb()
  property1: string; // @smartdata.svDb() marks the property for db save

  property2: number; // this one is not marked, so it won't be save upon calling this.save()

  constructor() {
    super(); // the super call is important ;) But you probably know that.
  }
}

// start to instantiate instances of classes from scratch or database

const localObject = new MyObject({
  property1: 'hi',
  property2: 2,
});
localObject.save(); // saves the object to the database

// start retrieving instances

MyObject.getInstance<MyObject>({
  property: 'hi',
}); // outputs a new instance of MyObject with the values from db assigned
```

### class DbDoc

represents a individual document in a collection
and thereby is ideally suited to extend the class you want to actually store.

### CRUD operations

smartdata supports full CRUD operations

**Store** or **Update** instances of classes to MongoDB:
DbDoc extends your class with the following methods:

- async `.save()` will save (or update) the object you call it on only. Any referenced non-savable objects will not get stored.
- async `.saveDeep()` does the same like `.save()`.
  In addition it will look for properties that reference an object
  that extends DbDoc as well and call .saveDeep() on them as well.
  Loops are prevented

**Get** a new class instance from MongoDB:
DbDoc exposes a static method that allows you specify a filter to retrieve a cloned class of the one you used to that doc at some point later in time:

- static async `.getInstance({ /* filter props here */ })` gets you an instance that has the data of the first matched document as properties.
- static async `getInstances({ /* filter props here */ })` get you an array instances (one instance for every matched document).

**Delete** instances from MongoDb:
smartdata extends your class with a method to easily delete the doucment from DB:

- async `.delete()`will delete the document from DB.

## TypeScript

How does TypeScript play into this?
Since you define your classes in TypeScript and types flow through smartdata in a generic way
you should get all the Intellisense and type checking you love when using smartdata.
smartdata itself also bundles typings. You don't need to install any additional types for smartdata.

## Contribution

We are always happy for code contributions. If you are not the code contributing type that is ok. Still, maintaining Open Source repositories takes considerable time and thought. If you like the quality of what we do and our modules are useful to you we would appreciate a little monthly contribution: You can [contribute one time](https://lossless.link/contribute-onetime) or [contribute monthly](https://lossless.link/contribute). :)

For further information read the linked docs at the top of this readme.

> MIT licensed | **&copy;** [Lossless GmbH](https://lossless.gmbh)
| By using this npm module you agree to our [privacy policy](https://lossless.gmbH/privacy)

[![repo-footer](https://lossless.gitlab.io/publicrelations/repofooter.svg)](https://maintainedby.lossless.com)
