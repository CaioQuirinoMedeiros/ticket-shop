import AppError from './AppError'

class DatabaseError extends Error {
  public readonly originalError?: Error

  constructor(message: string, error?: Error) {
    super(message)

    this.originalError = error

    Object.setPrototypeOf(this, DatabaseError.prototype)
  }
}

export default DatabaseError
