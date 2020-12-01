import { ValidationError as ExpressValidatorError } from 'express-validator'

import { CustomError } from './CustomError'

class ValidationError extends CustomError {
  public readonly statusCode = 400

  public readonly originalError?: ExpressValidatorError[]

  constructor(errors: ExpressValidatorError[]) {
    super(errors[0].msg)

    this.originalError = errors

    Object.setPrototypeOf(this, ValidationError.prototype)
  }

  get serializedError() {
    return {
      subject: 'Validation error',
      message: this.message
    }
  }
}

export default ValidationError
