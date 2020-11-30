import express, { Request, Response } from 'express'
import { body, validationResult } from 'express-validator'

import ValidationError from '../errors/ValidationError'
import DatabaseError from '../errors/DatabaseError'
const router = express.Router()

router.post(
  '/api/users/signup',
  [
    body('email', 'Please, provide a valid e-mail').isEmail().normalizeEmail(),
    body('password', 'Password must be between 6 and 24 characters').isLength({
      min: 6,
      max: 24
    })
  ],
  (request: Request, response: Response) => {
    const errors = validationResult(request)

    if (!errors.isEmpty()) {
      throw new ValidationError(errors.array())
    }

    const { email, password } = request.body
    if (Math.random() > 0.5) {
      throw new DatabaseError()
    }

    console.log('Creating user...')
    return response.send({ email, password })
  }
)

export { router as signupRouter }
