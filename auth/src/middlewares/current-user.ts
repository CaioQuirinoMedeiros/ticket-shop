import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'


declare global {
  namespace Express {
    interface Request {
      currentUser?: UserPayload
    }
  }
}

interface UserPayload {
  id: string
  email: string
}

export const currentUser = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  if (!request.session?.jwt) {
    return next()
  }
  try {
    const payload = jwt.verify(
      request.session?.jwt,
      process.env.JWT_KEY!
    ) as UserPayload

    request.currentUser = payload
  } catch {}

  return next()
}
