import AppError from './AppError'

class DatabaseError extends AppError {
  constructor() {
    super('Error connecting to database'), 400

    Object.setPrototypeOf(this, DatabaseError.prototype)
  }
}

export default DatabaseError
