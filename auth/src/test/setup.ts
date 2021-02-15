import { MongoMemoryServer } from 'mongodb-memory-server'
import mongoose, { Mongoose } from 'mongoose'

import app from '../app'

let mongo: MongoMemoryServer

beforeAll(async () => {
  process.env.JWT_KEY = 'WHATEVER'

  mongo = new MongoMemoryServer()
  const mongoUri = await mongo.getUri()
  await mongoose.connect(mongoUri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
})

beforeEach(async () => {
  const collections = mongoose.connection.collections

  try {
    await Promise.all(
      Object.keys(collections).map((collection) => {
        return mongoose.connection.dropCollection(collection)
      })
    )
  } catch {}
})

afterAll(async () => {
  await mongo.stop()
  await mongoose.connection.close()
})
