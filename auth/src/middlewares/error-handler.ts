import { Request, Response, NextFunction } from 'express'

import AppError from '../errors/AppError'

export const errorHandler = (
  error: Error,
  request: Request,
  response: Response,
  next: NextFunction
) => {
  console.log('Something went wrong', {
    error,
    errorMessage: error.message,
    errorName: error.name
  })
  if (error instanceof AppError) {
    return response
      .status(error.statusCode)
      .send({ status: 'error', message: error.message })
  }

  return response.status(500).send({
    status: 'error',
    message: 'Internal server error'
  })
}
