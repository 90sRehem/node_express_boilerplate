/* > This class is a generic class that can be used to return a result from a command */
export class GenericCommandResult<T> {
  constructor(
    private readonly success: boolean,
    private readonly message: string,
    private readonly data: T,
    private readonly errors?: Array<string>,
  ) {
    this.data = data;
    this.errors = errors ?? [];
    this.message = message;
    this.success = success;
  }
}
