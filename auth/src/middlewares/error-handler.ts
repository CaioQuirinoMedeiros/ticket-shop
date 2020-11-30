import { Request, Response, NextFunction } from 'express'

import AppError from '../errors/AppError'
import DatabaseError from '../errors/DatabaseError'
import ValidationError from '../errors/ValidationError'

export const errorHandler = (
  error: Error,
  request: Request,
  response: Response,
  next: NextFunction
) => {
  
  if (error instanceof AppError) {
    console.log('Application internal error', { error })
    return response
    .status(error.statusCode)
    .send({ subject: 'Application internal error', message: error.message })
  }
  if (error instanceof ValidationError) {
    console.log('ValidationError', { error })
    return response
    .status(400)
    .send({ subject: 'Validation error', message: error.message })
  }
  if (error instanceof DatabaseError) {
    console.log('Database error', { error })
    return response
      .status(500)
      .send({ subject: 'Database connection error', message: error.message })
  }

  return response.status(500).send({
    subject: 'Unkown error',
    message: 'Sorry, something went wrong'
  })
}
