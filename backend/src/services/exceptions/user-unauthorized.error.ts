export class UserUnauthorizedError extends Error {
  statusCode: number;
  constructor(message: string = "Unauthorized") {
    super(message);
    this.name = "UserUnauthorizedError";
    this.statusCode = 401;
  }
}