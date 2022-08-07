import { ICommand, ICommandResult } from "../commands";

export interface IHandler<T extends ICommand<T>> {
  handle(command: T): Promise<ICommandResult>;
}
