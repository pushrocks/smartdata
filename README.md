# smartdata

smartdata is a ODM that adheres to TypeScript practices and uses classes to organize data.
It uses MongoDB as persistent storage.

## Intention
There are many ODMs out there, however when we searched for a ODM that uses TypeScript,
acts smart while still embracing an easy the NoSQL idea we didn't find a matching solution.
This is why we started smartdata

How MongoDB terms map to smartdata classes

MongoDB term | smartdata class
--- | ---
Database | smartdata.Db
Collection | smartdata.DbCollection
Document | smartdata.DbDoc

### class Db
represents a Database. Naturally it has .connect() etc. methods on it.
Since it is a class you can have multiple DBs defined.
```typescript
import * as smartdata from 'smartdata'

let myDb1 = new smartdata.Db('someConnectionUrl')
let myDb2 = new smartdata.Db('someConnectionUrl')

myDb1.connect()
myDb2.connect()

// continues in next block... 
```

### class Collection
represents a collection of objects.
A collection is defined by the object class (that is extending smartdata.dbdoc) it respresents

So to get to get access to a specific collection you document
```typescript
// continues from the block before...

class myObject extends smartdata.DbDoc {
    property1:string
    property2:number
    constructor(optionsArg:{
        queryArg?:any,
        dataArg?:{
            property1:string,
            property2:number
        }
    }) {
        super(this,optionsArg)
    }
} 
let myCollection = myDb1.getCollection(myObject)
``` 

> Alert: You NEVER instantiate a collection.
This is done for you!!!

### class DbDoc
represents a individual document in a collection.




[![npm](https://push.rocks/assets/repo-header.svg)](https://push.rocks)
