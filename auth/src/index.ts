import express from 'express'
import 'express-async-errors'
import { json } from 'body-parser'
import mongoose from 'mongoose'

import {
  currentUserRouter,
  signinRouter,
  signoutRouter,
  signupRouter
} from './routes'
import { errorHandler } from './middlewares/error-handler'
import NotFoundError from './errors/NotFoundError'
import DatabaseError from './errors/DatabaseError'

const app = express()

app.use(json())

app.use(currentUserRouter)
app.use(signinRouter)
app.use(signoutRouter)
app.use(signupRouter)

app.get('*', () => {
  throw new NotFoundError("There's nothing here, check the url")
})

app.use(errorHandler)

const start = async () => {
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
