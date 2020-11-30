import { ValidationError as ExpressValidatorError } from 'express-validator'

class ValidationError extends Error {
  public readonly errors: ExpressValidatorError[]

  constructor(errors: ExpressValidatorError[]) {
    super(errors[0].msg)

    this.errors = errors

    Object.setPrototypeOf(this, ValidationError.prototype)
  }
}

export default ValidationError
