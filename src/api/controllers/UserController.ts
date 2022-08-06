import { inject } from "tsyringe";

import { CreateUserCommand, GenericCommandResult } from "@/domain/commands";
import { ICreateUserDTO } from "@/domain/dtos";
import { User } from "@/domain/entities";
import { CreateUserHandler } from "@/domain/handlers/CreateUserHandler";
import { Email, Name, Password } from "@/domain/valueObjects";
import { ECommands, EHandlers } from "@/shared/enums";

import { BaseController } from "./BaseController";

export class UserController extends BaseController {
  constructor(
    @inject(EHandlers.CreateUserHandler)
    private readonly _handler: CreateUserHandler, // @inject(ECommands.CreateUserCommand) // private readonly _command: CreateUserCommand,
  ) {
    super();
  }
  async executeImpl(): Promise<any> {
    const { email, firstName, lastName, password } = this.request
      .body as ICreateUserDTO;
    const command = new CreateUserCommand(email, firstName, lastName, password);
    const teste = await this._handler.handle(command);
    return this.ok(teste);
  }
}
