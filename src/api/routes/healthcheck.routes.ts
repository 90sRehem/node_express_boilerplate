import { Router } from "express";

import { HealthCheckController } from "../controllers/HealthCheckController";

export const healthcheckRoutes = Router();

const healthCheckController = new HealthCheckController();

healthcheckRoutes.get("/", (req, res) =>
  healthCheckController.execute(req, res),
);
