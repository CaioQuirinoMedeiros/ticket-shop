class AppError extends Error {
  public readonly statusCode: number

  public readonly originalError?: any

  constructor(message: string, statusCode = 400, error?: any) {
    super(message)

    this.statusCode = statusCode
    this.originalError = error

    Object.setPrototypeOf(this, AppError.prototype)
  }
}

export default AppError
