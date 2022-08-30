import { BaseController } from "@/shared/infra";

import { CreateSessionCommand } from "../../domain/commands/CreateSessionCommand";
import { CreateSessionHandler } from "../../domain/handlers/CreateSessionHandlers";

export class CreateSessionController extends BaseController {
  constructor(private readonly _handler: CreateSessionHandler) {
    super();
  }
  async executeImpl(): Promise<any> {
    const { email, password } = this.request.body as {
      email: string;
      password: string;
    };
    const command = new CreateSessionCommand(email, password);
    const session = await this._handler.handle(command);

    if (session.success) {
      return this.response(200, session);
    }

    return this.response(400, session);
  }
}
