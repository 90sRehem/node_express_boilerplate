import { BaseController } from "@/shared/infra";

import { ListUsersHandler } from "../../domain/handlers/ListUsersHandler";
import { ListUsersQuery } from "../../domain/queries/ListUsersQuery";

export class ListUsersController extends BaseController {
  constructor(private readonly listUsersHandler: ListUsersHandler) {
    super();
  }
  protected async executeImpl(): Promise<any> {
    const query = new ListUsersQuery(this.request.user);
    const users = await this.listUsersHandler.handle(query);

    if (!users.data.length) return this.response(404, users);

    return this.response(200, users);
  }
}
