# smartdata

> Note: Still in Beta

## Availabililty
[![npm](https://push.rocks/assets/repo-button-npm.svg)](https://www.npmjs.com/package/smartdata)
[![git](https://push.rocks/assets/repo-button-git.svg)](https://gitlab.com/pushrocks/smartdata)
[![git](https://push.rocks/assets/repo-button-mirror.svg)](https://github.com/pushrocks/smartdata)
[![docs](https://push.rocks/assets/repo-button-docs.svg)](https://pushrocks.gitlab.io/smartdata/)

## Status for master
[![build status](https://gitlab.com/pushrocks/smartdata/badges/master/build.svg)](https://gitlab.com/pushrocks/smartdata/commits/master)
[![coverage report](https://gitlab.com/pushrocks/smartdata/badges/master/coverage.svg)](https://gitlab.com/pushrocks/smartdata/commits/master)
[![Dependency Status](https://david-dm.org/pushrocks/smartdata.svg)](https://david-dm.org/pushrocks/smartdata)
[![bitHound Dependencies](https://www.bithound.io/github/pushrocks/smartdata/badges/dependencies.svg)](https://www.bithound.io/github/pushrocks/smartdata/master/dependencies/npm)
[![bitHound Code](https://www.bithound.io/github/pushrocks/smartdata/badges/code.svg)](https://www.bithound.io/github/pushrocks/smartdata)
[![TypeScript](https://img.shields.io/badge/TypeScript-2.x-blue.svg)](https://nodejs.org/dist/latest-v6.x/docs/api/)
[![node](https://img.shields.io/badge/node->=%206.x.x-blue.svg)](https://nodejs.org/dist/latest-v6.x/docs/api/)
[![JavaScript Style Guide](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)

smartdata is an ODM that adheres to TypeScript practices and uses classes to organize data.
It uses MongoDB or NeDb as persistent storage.

## Intention
There are many ODMs out there, however when we searched for an ODM that uses TypeScript,
acts smart while still embracing the NoSQL idea we didn't find a matching solution.
This is why we started smartdata.

How MongoDB terms map to smartdata classes

MongoDB term | smartdata class
--- | ---
Database | smartdata.Db
Collection | smartdata.DbCollection
Document | smartdata.DbDoc

### class Db
represents a Database. Naturally it has .connect() etc. methods on it.
Since it is a class you can have multiple DBs defined.
```javascript
import * as smartdata from 'smartdata'

// mongodb
let myDb1 = new smartdata.Db('someConnectionUrl')
let myDb2 = new smartdata.Db('someConnectionUrl')

// nedb
let myDb3 = new smartdata('/some/path/for/persistence', 'nedb') // you may set first argument to null for just in memory db

myDb1.connect()
myDb2.connect()

// continues in next block... 
```

### class DbCollection
represents a collection of objects.
A collection is defined by the object class (that is extending smartdata.dbdoc) it respresents

So to get to get access to a specific collection you document
```javascript
// continues from the block before...

@Collection(myDb1)
class myObject extends smartdata.DbDoc<myObject> { // read the next block about DbDoc
    @smartdata.svDb() property1: string // @smartdata.svDb() marks the property for db save
    property2: number // this one is not marked, so it won't be save upon calling this.save() 
    constructor(optionsArg:{
        property1: string,
        property2: number
    }) {
        super()
    }
}
let myCollection = myDb1.getCollectionByName<myObject>(myObject)

// start to instantiate classes from scratch or database
``` 

> Alert: You NEVER instantiate a collection.
This is done for you!!!

### class DbDoc
represents a individual document in a collection
and thereby is ideally suited to extend the class you want to actually store.

DbDoc extends your class with the following methods:

* `.save()` will save (or update) the object you call it on only. Any referenced non-savable objects will not get stored.
* `.saveDeep()` does the same like `.save()`.
  In addition it will look for properties that reference an object
  that extends DbDoc as well and call .saveDeep() on them as well.
  Loops are prevented

So now we can **store** instances of classes to Db...
How do we **get** a new class instance from a Doc in the DB?

## TypeScript
How does TypeScript play into this?
Since you define your classes in TypeScript and types flow through smartdata in a generic way
you should get all the Intellisense and type checking you love when using smartdata.
smartdata itself also bundles typings.
So you don't need to install any additional types when importing smartdata. 

[![npm](https://push.rocks/assets/repo-header.svg)](https://push.rocks)
