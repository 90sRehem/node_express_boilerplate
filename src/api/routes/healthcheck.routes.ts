import { Router } from "express";
import { container } from "tsyringe";

import { HealthCheckController } from "../controllers/HealthCheckController";

export const healthcheckRoutes = Router();

const healthCheckController = container.resolve<HealthCheckController>(
  "HealthCheckController",
);

healthcheckRoutes.get("/", (req, res) =>
  healthCheckController.execute(req, res),
);
