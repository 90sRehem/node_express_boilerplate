import { Router } from "express";

import { healthcheckRoutes } from "./healthcheck.routes";

export const routes = Router();

routes.use("/", healthcheckRoutes);
