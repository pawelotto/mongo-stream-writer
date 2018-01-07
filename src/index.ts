import * as mongo from 'mongodb'
import { Writable } from 'stream'


export interface mongoStreamWriterOptions {
  dbString: string,
  collection: string,
  batchSize: number,
  verbose?: boolean
}

export const mwriter = (opts: mongoStreamWriterOptions) => {
  let connection: mongo.Db
  let batch: Array<object> = []
  let c: number = 0
  const verbose = opts.verbose

  const writable = new Writable({
    objectMode: true,
    write: async (chunk, enc, cb) => {
      try {
        batch.push(JSON.parse(chunk.toString()))
        if(verbose && ++c % 500 === 0) process.stdout.write(c.toString())
        if(batch.length % opts.batchSize === 0){
          if (!connection) connection = await mongo.connect(opts.dbString)
          await connection.collection(opts.collection).insertMany(batch)
          if(verbose) process.stdout.write('.')
          batch.length = 0
        }
        cb()
      } catch (err) {
        console.error(err)
        connection.close()
      }
    }
  })

  writable.on('pipe', () => { console.log('Starting Mongo stream') })
  writable.on('finish', () => { 
    // Insert remaining of the batch
    connection.collection(opts.collection).insertMany(batch)
    console.log('Done');
    connection.close() 
  })
  return writable
}