import { IUserRepository } from "@/modules/users";
import { CommandResult, ICommandResult } from "@/shared/commands";
import { ICommandHandler } from "@/shared/handlers";
import { Notifiable } from "@/shared/notifications";

import { IAuthRepository } from "../../infra";
import { CreateRefreshTokenCommand } from "../commands/CreateRefreshTokenCommand";

export class CreateRefreshTokenHandler
  extends Notifiable
  implements ICommandHandler<CreateRefreshTokenCommand, unknown>
{
  constructor(
    private readonly authRepository: IAuthRepository,
    private readonly userRepository: IUserRepository,
  ) {
    super();
  }
  async handle(
    command: CreateRefreshTokenCommand,
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

    try {
      this.authRepository.verify(command.refreshToken);
      const userExists = await this.userRepository.findById(command.userId);

      if (userExists) {
        const { refreshToken } = this.authRepository.createRefreshToken();
        const { token } = this.authRepository.createToken(
          {},
          userExists.id.toString(),
        );

        result = {
          id: userExists.id.toString(),
          name: userExists.name.fullName,
          email: userExists.email.address,
          token,
          refreshToken,
        };
        return new CommandResult(true, "Sucesso.", result);
      }
    } catch (error) {
      console.log(error);
    }

    return new CommandResult(
      false,
      "Ops, parece que tem algo de errado.",
      command.GetNotifications,
    );
  }
}
