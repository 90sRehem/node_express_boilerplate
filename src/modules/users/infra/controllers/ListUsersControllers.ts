import { BaseController } from "@/shared/infra";

import { UserQueries } from "../../domain";

export class ListUsersController extends BaseController {
  /**
   *
   */
  constructor(private readonly userQueries: UserQueries) {
    super();
  }
  protected async executeImpl(): Promise<any> {
    const users = await this.userQueries.list();

    if (users.length) return this.response(200, users);

    return this.notFound("Nenhum usuário encontrado.");
  }
}
