import {
  httpGet,
  BaseHttpController,
  Controller,
  IHttpActionResult,
  controller,
} from "inversify-express-utils";

import { CommandResult } from "@/domain/commands";

@controller("/")
export class HealthCheckController
  extends BaseHttpController
  implements Controller {
  constructor() {
    super();
  }

  @httpGet("/")
  public index(): IHttpActionResult {
    return this.ok(new CommandResult(true, "Server ok.", null));
  }
}
