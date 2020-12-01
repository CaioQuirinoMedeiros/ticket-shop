export abstract class CustomError extends Error {
  abstract statusCode: number

  abstract originalError?: any

  abstract serializedError?: {
    subject: string
    message: string
  }

  constructor(message: string, error?: any) {
    super(message)

    Object.setPrototypeOf(this, CustomError.prototype)
  }
}
