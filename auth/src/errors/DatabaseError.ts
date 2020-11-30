import AppError from './AppError'

class DatabaseError extends AppError {
  constructor(error?: Error) {
    super('Error connecting to database', 500, error)

    Object.setPrototypeOf(this, DatabaseError.prototype)
  }
}

export default DatabaseError
