import { inject, injectable } from "tsyringe";

import { CreateUserCommand } from "@/domain/commands";
import { ICreateUserDTO } from "@/domain/dtos";
import { CreateUserHandler } from "@/domain/handlers/CreateUserHandler";
import { ECommands, EHandlers } from "@/shared/enums";

import { BaseController } from "./BaseController";

@injectable()
export class UserController extends BaseController {
  constructor(
    @inject(EHandlers.CreateUserHandler)
    private readonly handler: CreateUserHandler,
    @inject(ECommands.CreateUserCommand)
    private readonly command: CreateUserCommand,
  ) {
    super();
  }

  async executeImpl(): Promise<any> {
    const dto = this.request.body as ICreateUserDTO;
    const command = this.command.resolve(dto);
    const createdUser = await this.handler.handle(command);

    if (createdUser.success) {
      return this.response(201, createdUser);
    }

    return this.response(400, createdUser);
  }
}
