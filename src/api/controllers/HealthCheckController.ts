import { CommandResult } from "@/domain/commands/CommandResult";

import { BaseController } from "./BaseController";

export class HealthCheckController extends BaseController {
  constructor() {
    super();
  }
  async executeImpl(): Promise<any> {
    return this.ok(new CommandResult(true, "Server ok.", null));
  }
}
