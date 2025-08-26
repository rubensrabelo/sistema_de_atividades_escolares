export class InvalidCredentialsError extends Error {
  statusCode: number;
  constructor() {
    super("Invalid credentials");
    this.name = "InvalidCredentialsError";
    this.statusCode = 401;
  }
}

export class UserDeactivatedError extends Error {
  statusCode: number;
  constructor() {
    super("User is deactivated");
    this.name = "UserDeactivatedError";
    this.statusCode = 403;
  }
}
