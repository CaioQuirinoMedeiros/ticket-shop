import { CustomError } from './CustomError'

class AppError extends CustomError {
  public readonly statusCode: number

  public readonly originalError?: any

  constructor(message: string, statusCode = 400, error?: any) {
    super(message)

    this.statusCode = statusCode
    this.originalError = error

    Object.setPrototypeOf(this, AppError.prototype)
  }

  get serializedError() {
    return {
      subject: 'Application internal error',
      message: this.message
    }
  }
}

export default AppError
