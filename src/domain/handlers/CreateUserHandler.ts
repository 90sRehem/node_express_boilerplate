import { inject, injectable } from "tsyringe";

import { ERepositories } from "@/shared/enums";
import { Notifiable } from "@/shared/notifications";

import { GenericCommandResult, ICommandResult } from "../commands";
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
  constructor(private readonly _repository: IUserRepository) {
    super();
  }
  async handle(command: CreateUserCommand): Promise<ICommandResult> {
    command.validate();

    if (command.Invalid) {
      return new GenericCommandResult(
        false,
        "Ops, parece que tem algo de errado.",
        null,
        command.Messages,
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

    return new GenericCommandResult(
      true,
      "Operação realizada com sucesso.",
      user.toObj,
    );
  }
}
