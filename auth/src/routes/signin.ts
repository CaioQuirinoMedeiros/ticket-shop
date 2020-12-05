import express, { Request, Response } from 'express'
import { body, validationResult } from 'express-validator'
import jwt from 'jsonwebtoken'

import ValidationError from '../errors/ValidationError'
import DatabaseError from '../errors/DatabaseError'
import { User } from '../models/user'
import AppError from '../errors/AppError'
import NotFoundError from '../errors/NotFoundError'
import { Password } from '../services/password'

const router = express.Router()

router.post(
  '/api/users/signin',
  [
    body('email', 'E-mail must be valid').isEmail(),
    body('password', 'Provide your password').trim().notEmpty()
  ],
  async (request: Request, response: Response) => {
    const errors = validationResult(request)

    if (!errors.isEmpty()) {
      throw new ValidationError(errors.array())
    }

    const { email, password } = request.body

    const user = await User.findOne({ email })

    if (!user) {
      throw new NotFoundError('User not found')
    }

    const passwordMatch = await Password.compare(user.password, password)

    if (!passwordMatch) {
      throw new AppError('Invalid credentials', 403)
    }

    const userJWT = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_KEY!
    )

    request.session = { jwt: userJWT }

    return response.status(200).send({ user })
  }
)

export { router as signinRouter }
