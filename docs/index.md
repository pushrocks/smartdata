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
Database | smartdata.DbConnection
Collection | smartdata.DbCollection
Document | smartdata.DbDoc

[![npm](https://push.rocks/assets/repo-header.svg)](https://push.rocks)
