export enum HttpStatusCode {
  OK = 200,
  BAD_REQUEST = 400,
  NOT_FOUND = 404,
  INTERNAL_SERVER = 500,
}

class AppError extends Error {
  public readonly statusCode: HttpStatusCode
  public readonly message: string
  public readonly type: string

  constructor(message: string, statusCode: HttpStatusCode, description: string = '') {
    super(description)

    this.message = message
    this.statusCode = statusCode
    this.type = description

    Error.captureStackTrace(this)
  }
}

export default AppError