export class InvalidCredentialsError extends Error {
  statusCode: number;
  constructor() {
    super("Invalid credentials");
    this.name = "InvalidCredentialsError";
    this.statusCode = 401;
  }
}