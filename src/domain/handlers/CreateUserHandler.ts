import { inject, injectable } from "tsyringe";

import { ERepositories } from "@/shared/enums";
import { Notifiable } from "@/shared/notifications";

import { CommandResult, ICommandResult } from "../commands";
import { CreateUserCommand } from "../commands/CreateUserCommand";
import { User } from "../entities";
import { IUserRepository } from "../repositories/IUserRepository";
import { Email, Name, Password } from "../valueObjects";
import { IHandler } from "./interfaces/IHandler";

@injectable()
export class CreateUserHandler
  extends Notifiable
  implements IHandler<CreateUserCommand>
{
  constructor(
    @inject(ERepositories.UserRepository)
    private readonly _repository: IUserRepository,
  ) {
    super();
  }
  async handle(command: CreateUserCommand): Promise<ICommandResult> {
    command.validate();

    if (command.Invalid) {
      return new CommandResult(
        false,
        "Ops, parece que tem algo de errado.",
        command.GetNotifications,
      );
    }

    const user = new User({
      email: new Email({ address: command.email }),
      name: new Name({
        firstName: command.firstName,
        lastName: command.lastName,
      }),
      password: new Password({ value: command.password }),
    });

    await this._repository.save(user);

    return new CommandResult(
      true,
      "Operação realizada com sucesso.",
      user.parse(),
    );
  }
}
