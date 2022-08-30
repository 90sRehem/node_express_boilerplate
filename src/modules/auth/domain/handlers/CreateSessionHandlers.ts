import { IUserRepository } from "@/modules/users";
import { CommandResult, ICommandResult } from "@/shared/commands";
import { IHandler } from "@/shared/handlers";
import { Notifiable } from "@/shared/notifications";

import { IAuthRepository } from "../../infra/repositories/IAuthRepository";
import { CreateSessionCommand } from "../commands/CreateSessionCommand";

export class CreateSessionHandler
  extends Notifiable
  implements IHandler<CreateSessionCommand>
{
  constructor(
    private readonly _userRepository: IUserRepository,
    private readonly _authRepository: IAuthRepository,
  ) {
    super();
  }
  async handle(command: CreateSessionCommand): Promise<ICommandResult> {
    command.validate();

    if (command.Invalid) {
      return new CommandResult(
        false,
        "Ops, parece que tem algo de errado.",
        command.GetNotifications,
      );
    }

    const userExists = await this._userRepository.findByEmail(command.email);

    if (userExists) {
      const user = {
        id: userExists.id.toString(),
        name: userExists.name.fullName,
        email: userExists.email.address,
      };
      const { token } = this._authRepository.createToken({}, user.id);
      const { refreshToken } = this._authRepository.createRefreshToken();

      return new CommandResult(true, "Usuário autenticado.", {
        ...user,
        token,
        refreshToken,
      });
    }

    return new CommandResult(
      false,
      "Combinação incorreta de e-mail/senha.",
      null,
    );
  }
}
