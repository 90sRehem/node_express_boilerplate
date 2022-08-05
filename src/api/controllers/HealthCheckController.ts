import { GenericCommandResult } from "@/domain/commands/GenericCommandResult";

import { BaseController } from "./BaseController";

export class HealthCheckController extends BaseController {
  constructor() {
    super();
  }
  async executeImpl(): Promise<any> {
    return this.ok(new GenericCommandResult(true, "Server ok.", null));
  }
}
