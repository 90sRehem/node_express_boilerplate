export class AppError {
  constructor(
    public readonly message: string,
    public readonly statusCode = 400,
    public readonly code?: string,
  ) {
    this.message = message;
    this.statusCode = statusCode;
    this.code = code;
  }
}
