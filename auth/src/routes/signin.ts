import express, { Request, Response } from 'express'
import { body } from 'express-validator'
import jwt from 'jsonwebtoken'

import { User } from '../models/user'
import { validateRequest } from '../middlewares/validate-request'
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
  validateRequest,
  async (request: Request, response: Response) => {
    const { email, password } = request.body

    const user = await User.findOne({ email })

    if (!user) {
      throw new AppError('Invalid credentials')
    }

    const passwordMatch = await Password.compare(user.password, password)

    console.log({
      password,
      'user.password': user.password,
      passwordMatch
    })

    if (!passwordMatch) {
      throw new AppError('Invalid credentials')
    }

    const userJWT = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_KEY!
    )

    request.session = { jwt: userJWT }

    return response.status(200).send(user)
  }
)

export { router as signinRouter }
