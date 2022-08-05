import { ICommand, ICommandResult } from "@/domain/commands";

export interface IHandler<T = ICommand> {
  handle(command: T): ICommandResult;
}
