import 'express-async-errors'
import mongoose from 'mongoose'

import app from './app'
import DatabaseError from './errors/DatabaseError'

const start = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error('JWT_KEY must be defined')
  }

  try {
    await mongoose.connect('mongodb://auth-mongo-srv:27017/auth', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    console.log('Successfully connected with MongoDB')
  } catch (err) {
    throw new DatabaseError('Failed to connect with MongoDB')
  }

  app.listen(3000, () => {
    console.log(`Auth Service listening on PORT 3000!!`)
  })
}

start()
