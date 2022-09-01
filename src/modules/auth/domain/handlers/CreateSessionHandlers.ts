import { IUserRepository } from "@/modules/users";
import { CommandResult, ICommandResult } from "@/shared/commands";
import { ICommandHandler } from "@/shared/handlers";
import { Notifiable } from "@/shared/notifications";

import { IAuthRepository } from "../../infra/repositories/IAuthRepository";
import { CreateSessionCommand } from "../commands/CreateSessionCommand";

export class CreateSessionHandler
  extends Notifiable
  implements ICommandHandler<CreateSessionCommand, unknown>
{
  constructor(
    private readonly _userRepository: IUserRepository,
    private readonly _authRepository: IAuthRepository,
  ) {
    super();
  }
  async handle(
    command: CreateSessionCommand,
  ): Promise<ICommandResult<unknown>> {
    command.validate();
    let result: Record<string, unknown> = {};

    if (command.Invalid) {
      return new CommandResult(
        false,
        "Ops, parece que tem algo de errado.",
        command.GetNotifications,
      );
    }

    const userExists = await this._userRepository.findByEmail(command.email);

    if (userExists) {
      const { token } = this._authRepository.createToken(
        {},
        userExists.id.toString(),
      );
      const { refreshToken } = this._authRepository.createRefreshToken();
      result = {
        id: userExists.id.toString(),
        name: userExists.name.fullName,
        email: userExists.email.address,
        token,
        refreshToken,
      };

      return new CommandResult(true, "Usuário autenticado.", result);
    }

    return new CommandResult(
      false,
      "Combinação incorreta de e-mail/senha.",
      null,
    );
  }
}
