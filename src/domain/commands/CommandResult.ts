import { ICommandResult } from "./interfaces";

export class CommandResult<T> implements ICommandResult {
  constructor(
    public readonly success: boolean,
    public readonly message: string,
    public readonly data: T,
  ) {
    this.data = data;
    this.message = message;
    this.success = success;
  }
}
