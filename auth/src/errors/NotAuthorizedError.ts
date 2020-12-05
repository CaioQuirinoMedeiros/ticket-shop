import { CustomError } from './CustomError'

class NotAuthorizedError extends CustomError {
  public readonly statusCode = 401

  public readonly originalError?: any

  constructor(message = 'You are not logged in') {
    super(message)

    Object.setPrototypeOf(this, NotAuthorizedError.prototype)
  }

  get serializedError() {
    return {
      subject: 'Not authorized',
      message: this.message
    }
  }
}

export default NotAuthorizedError
