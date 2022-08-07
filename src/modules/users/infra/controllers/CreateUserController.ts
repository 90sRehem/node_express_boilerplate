import {
  CreateUserHandler,
  CreateUserCommand,
  ICreateUserDTO,
} from "@/modules/users";
import { BaseController } from "@/shared/infra";

export class CreateUserController extends BaseController {
  constructor(
    private readonly handler: CreateUserHandler,
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
