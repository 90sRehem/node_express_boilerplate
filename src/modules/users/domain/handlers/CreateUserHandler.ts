import { ICommandResult, CommandResult } from "@/shared/commands";
import { ICommandHandler } from "@/shared/handlers/ICommandHandler";
import { Notifiable } from "@/shared/notifications";

import { IUserRepository } from "../../infra";
import { CreateUserCommand } from "../commands";
import { User } from "../entities";
import { Email, Name, Password } from "../valueObjects";

export class CreateUserHandler
  extends Notifiable
  implements ICommandHandler<CreateUserCommand, unknown>
{
  constructor(private readonly _repository: IUserRepository) {
    super();
  }
  async handle(command: CreateUserCommand): Promise<ICommandResult<unknown>> {
    command.validate();

    if (command.Invalid) {
      return new CommandResult(
        false,
        "Ops, parece que tem algo de errado.",
        command.GetNotifications,
      );
    }

    const userAlreadyExists = await this._repository.findByEmail(command.email);

    if (userAlreadyExists) {
      return new CommandResult(
        false,
        "Este e-mail já está associado à um usuário!",
        userAlreadyExists.email.address,
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
      user.id.toString(),
    );
  }
}
