import {
  CreateUserHandler,
  CreateUserCommand,
  ICreateUserDTO,
} from "@/modules/users";
import { BaseController } from "@/shared/infra";

export class CreateUserController extends BaseController {
  constructor(private readonly handler: CreateUserHandler) {
    super();
  }

  async executeImpl(): Promise<any> {
    const dto = this.request.body as ICreateUserDTO;
    const command = new CreateUserCommand(dto);
    const createdUser = await this.handler.handle(command);

    if (createdUser.success) {
      return this.response(201, createdUser);
    }

    return this.response(400, createdUser);
  }
}
