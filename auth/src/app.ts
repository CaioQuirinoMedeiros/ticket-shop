import express from 'express'
import 'express-async-errors'
import { json } from 'body-parser'
import cookieSession from 'cookie-session'

import {
  currentUserRouter,
  signinRouter,
  signoutRouter,
  signupRouter
} from './routes'
import { errorHandler } from './middlewares/error-handler'
import NotFoundError from './errors/NotFoundError'

const app = express()

app.set('trust proxy', true)

app.use(json())
app.use(
  cookieSession({
    signed: false,
    secure: true
  })
)

app.use(currentUserRouter)
app.use(signinRouter)
app.use(signoutRouter)
app.use(signupRouter)

app.get('*', () => {
  throw new NotFoundError("There's nothing here, check the url")
})

app.use(errorHandler)

export default app
