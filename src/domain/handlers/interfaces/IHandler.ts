import { ICommand, ICommandResult } from "@/domain/commands";

export interface IHandler<T extends ICommand> {
  handle(command: T): Promise<ICommandResult>;
}
