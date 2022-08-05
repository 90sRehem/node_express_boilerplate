import { container } from "tsyringe";

import { HealthCheckController } from "@/api/controllers/HealthCheckController";

container.registerSingleton<HealthCheckController>(
  "HealthCheckController",
  HealthCheckController,
);
