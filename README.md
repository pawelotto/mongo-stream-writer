# mongo-stream-writer
Write streams directly to mongoDB

## Installation
* npm i mongo-stream-writer

## How to use
To use this module you need to provide a valid *mongoDB string*, *collection* to write your stream to and *batch size* as writer arguments.

Example: 

```import * as fs from 'fs'
import { mwriter } from 'mongo-stream-writer'

const infile = './data/file_with_json_object_arrays.json'

const dbString = 'mongodb://foo:bar@example.com/yourdb?authSource=yourdb'
const collection = 'foobarcollection'
const mongoStreamWriter = mwriter({ dbString: dbString, collection: collection, batchSize: 500 })

fs.createReadStream(infile)
  .pipe(mongoStreamWriter)

```