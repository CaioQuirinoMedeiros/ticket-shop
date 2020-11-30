import { Request, Response, NextFunction } from 'express'

import AppError from '../errors/AppError'

export const errorHandler = (
  error: Error,
  request: Request,
  response: Response,
  next: NextFunction
) => {
  console.log('Something went wrong', { error })
  if (error instanceof AppError) {
    return response
      .status(error.statusCode)
      .send({ status: error.statusCode, message: error.message })
  }

  return response.status(500).send({
    status: 'error',
    message: 'Internal server error'
  })
}
