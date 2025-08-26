export class EmailAlreadyExistsError extends Error {
  statusCode: number;

  constructor() {
    super("Email already exists");
    this.name = "EmailAlreadyExistsError";
    this.statusCode = 409;
  }
}
