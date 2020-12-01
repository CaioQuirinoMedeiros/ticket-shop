import { CustomError } from './CustomError'

class NotFoundError extends CustomError {
  public readonly statusCode = 404

  public readonly originalError?: any

  constructor(message = "This resource doesn't exist") {
    super(message)

    Object.setPrototypeOf(this, NotFoundError.prototype)
  }

  get serializedError() {
    return {
      subject: 'Not found',
      message: this.message
    }
  }
}

export default NotFoundError
