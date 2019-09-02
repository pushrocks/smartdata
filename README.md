# @pushrocks/smartdata
do more with data

## Availabililty and Links
* [npmjs.org (npm package)](https://www.npmjs.com/package/@pushrocks/smartdata)
* [gitlab.com (source)](https://gitlab.com/pushrocks/smartdata)
* [github.com (source mirror)](https://github.com/pushrocks/smartdata)
* [docs (typedoc)](https://pushrocks.gitlab.io/smartdata/)

## Status for master
[![build status](https://gitlab.com/pushrocks/smartdata/badges/master/build.svg)](https://gitlab.com/pushrocks/smartdata/commits/master)
[![coverage report](https://gitlab.com/pushrocks/smartdata/badges/master/coverage.svg)](https://gitlab.com/pushrocks/smartdata/commits/master)
[![npm downloads per month](https://img.shields.io/npm/dm/@pushrocks/smartdata.svg)](https://www.npmjs.com/package/@pushrocks/smartdata)
[![Known Vulnerabilities](https://snyk.io/test/npm/@pushrocks/smartdata/badge.svg)](https://snyk.io/test/npm/@pushrocks/smartdata)
[![TypeScript](https://img.shields.io/badge/TypeScript->=%203.x-blue.svg)](https://nodejs.org/dist/latest-v10.x/docs/api/)
[![node](https://img.shields.io/badge/node->=%2010.x.x-blue.svg)](https://nodejs.org/dist/latest-v10.x/docs/api/)
[![JavaScript Style Guide](https://img.shields.io/badge/code%20style-prettier-ff69b4.svg)](https://prettier.io/)

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
  mongoDbPass: 'mypassword'
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
  @smartdata.svDb() property1: string; // @smartdata.svDb() marks the property for db save
  property2: number; // this one is not marked, so it won't be save upon calling this.save()
  constructor(optionsArg: { property1: string; property2: number }) {
    super();
  }
}

// start to instantiate instances of classes from scratch or database

let localObject = new MyObject({
  property1: 'hi',
  property2: 2
});
localObject.save(); // saves the object to the database

// start retrieving instances

MyObject.getInstance<MyObject>({
  property: 'hi'
}); // outputs a new instance of MyObject with the values from db assigned
```

### class DbDoc

represents a individual document in a collection
and thereby is ideally suited to extend the class you want to actually store.

**sStore** instances of classes to Db:
DbDoc extends your class with the following methods:

- `.save()` will save (or update) the object you call it on only. Any referenced non-savable objects will not get stored.
- `.saveDeep()` does the same like `.save()`.
  In addition it will look for properties that reference an object
  that extends DbDoc as well and call .saveDeep() on them as well.
  Loops are prevented

**Get** a new class instance from a Doc in the DB:
DbDoc exposes a static method that allows you specify a filter to retrieve a cloned class of the one you used to that doc at some point later in time. Yes, let that sink in a minute :)

So you can just call `.getInstance({ /* filter props here */ })`.

## TypeScript

How does TypeScript play into this?
Since you define your classes in TypeScript and types flow through smartdata in a generic way
you should get all the Intellisense and type checking you love when using smartdata.
smartdata itself also bundles typings.
So you don't need to install any additional types when importing smartdata.

For further information read the linked docs at the top of this readme.

> MIT licensed | **&copy;** [Lossless GmbH](https://lossless.gmbh)
| By using this npm module you agree to our [privacy policy](https://lossless.gmbH/privacy)

[![repo-footer](https://lossless.gitlab.io/publicrelations/repofooter.svg)](https://maintainedby.lossless.com)
