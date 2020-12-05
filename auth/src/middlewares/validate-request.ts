import { Request, Response, NextFunction } from 'express'
import { validationResult } from 'express-validator'

import ValidationError from '../errors/ValidationError'

export const validateRequest = (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const errors = validationResult(request)

  if (!errors.isEmpty()) {
    throw new ValidationError(errors.array())
  }

  return next()
}
