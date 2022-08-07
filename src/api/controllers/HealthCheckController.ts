import { CommandResult } from "@/shared/commands";
import { BaseController } from "@/shared/infra";

export class HealthCheckController extends BaseController {
  constructor() {
    super();
  }
  async executeImpl(): Promise<any> {
    return this.ok(new CommandResult(true, "Server ok.", null));
  }
}
