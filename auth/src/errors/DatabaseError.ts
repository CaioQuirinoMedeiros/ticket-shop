import { CustomError } from './CustomError'

class DatabaseError extends CustomError {
  public readonly statusCode = 500

  public readonly originalError?: any

  constructor(message = 'Sorry, we are having connection issues', error?: any) {
    super(message)

    this.originalError = error

    Object.setPrototypeOf(this, DatabaseError.prototype)
  }

  get serializedError() {
    return {
      subject: 'Database connection error',
      message: this.message
    }
  }
}

export default DatabaseError
