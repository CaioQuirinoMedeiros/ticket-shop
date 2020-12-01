import { Request, Response, NextFunction } from 'express'

import { CustomError } from '../errors/CustomError'

export const errorHandler = (
  error: Error,
  request: Request,
  response: Response,
  next: NextFunction
) => {
  if (error instanceof CustomError) {
    console.log(error.serializedError?.subject, { error })
    return response.status(error.statusCode).send(error.serializedError)
  }

  return response.status(500).send({
    subject: 'Unkown error',
    message: 'Sorry, something went wrong'
  })
}
