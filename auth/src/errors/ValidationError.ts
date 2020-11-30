import { ValidationError as ExpressValidatorError } from 'express-validator'

import AppError from './AppError'

class ValidationError extends AppError {
  constructor(errors: ExpressValidatorError[]) {
    super(errors[0].msg, 400, errors)

    Object.setPrototypeOf(this, ValidationError.prototype)
  }
}

export default ValidationError
