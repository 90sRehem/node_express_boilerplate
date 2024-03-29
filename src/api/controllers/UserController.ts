import {
  httpGet,
  BaseHttpController,
  IHttpActionResult,
  controller,
} from "inversify-express-utils";

import { MIDDLEWARES } from "@/config/constants";
import { CommandResult } from "@/domain/commands";
import { UserQueries } from "@/domain/queries";

@controller("/users", MIDDLEWARES.AuthGuardMiddleWare)
export class UsersController extends BaseHttpController {
  constructor(private readonly userQueries: UserQueries) {
    super();
  }

  @httpGet("/")
  public async listAllUsers(): Promise<IHttpActionResult> {
    const users = await this.userQueries.list(
      this.httpContext.user.details,
      Number(this.httpContext.request.query.page),
      Number(this.httpContext.request.query.limit),
    );
    this.httpContext.response.setHeader("X-Total-Count", users.totalCount);
    return this.ok(new CommandResult(true, "Sucesso.", users.data));
  }
}
