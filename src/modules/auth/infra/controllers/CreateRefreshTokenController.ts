import { BaseController } from "@/shared/infra";

import { CreateRefreshTokenCommand } from "../../domain/commands/CreateRefreshTokenCommand";
import { CreateRefreshTokenHandler } from "../../domain/handlers/CreateRefreshTokenHandler";

export class CreateRefreshTokenController extends BaseController {
  /**
   *
   */
  constructor(private readonly _handler: CreateRefreshTokenHandler) {
    super();
  }
  protected async executeImpl(): Promise<any> {
    const { refreshToken, userId } = this.request.body as {
      refreshToken: string;
      userId: string;
    };
    const command = new CreateRefreshTokenCommand(refreshToken, userId);
    const createRefreshToken = await this._handler.handle(command);

    if (createRefreshToken.success) {
      return this.response(200, createRefreshToken);
    }

    return this.response(401, createRefreshToken);
  }
}
