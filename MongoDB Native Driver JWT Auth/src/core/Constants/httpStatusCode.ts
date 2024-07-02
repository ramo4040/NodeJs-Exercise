export enum HttpCode {
  OK = 200,
  CREATED = 201,
  NO_CONTENT = 204,

  // Client Errors
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,

  // Specific Input Errors
  INVALID_INPUT = 422, // Unprocessable Entity, often used for validation errors
  MISSING_FIELD = 400, // More specific error for missing fields
  CONFLICT = 409,

  // Server Errors
  INTERNAL_SERVER_ERROR = 500,
}
