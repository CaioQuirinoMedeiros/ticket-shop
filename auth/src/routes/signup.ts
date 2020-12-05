import express, { Request, Response } from 'express'
import { body } from 'express-validator'
import jwt from 'jsonwebtoken'

import { validateRequest } from '../middlewares/validate-request'
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
  validateRequest,
  async (request: Request, response: Response) => {
    const { email, password } = request.body

    const existingUser = await User.findOne({ email })

    if (existingUser) {
      console.log({ existingUser })
      throw new AppError('Email already in use', 403)
    }

    const user = new User({ email, password })

    await user.save()

    const userJWT = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_KEY!
    )

    request.session = { jwt: userJWT }

    return response.status(201).send(user)
  }
)

export { router as signupRouter }
