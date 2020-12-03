import express, { Request, Response } from 'express'
import { body, validationResult } from 'express-validator'

import ValidationError from '../errors/ValidationError'
import DatabaseError from '../errors/DatabaseError'
import { User } from '../models/user'
import AppError from '../errors/AppError'

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
  async (request: Request, response: Response) => {
    const errors = validationResult(request)

    if (!errors.isEmpty()) {
      throw new ValidationError(errors.array())
    }

    const { email, password } = request.body

    const existingUser = await User.findOne({ email })

    if (existingUser) {
      console.log({ existingUser })
      throw new AppError('Email already in use', 403)
    }

    const user = new User({ email, password })

    await user.save()

    return response.status(201).send({ user })
  }
)

export { router as signupRouter }
