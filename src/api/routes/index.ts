import { Router } from "express";

import { healthcheckRoutes } from "./healthcheck.routes";
import { userRoutes } from "./user.routes";

export const routes = Router();

routes.use("/", healthcheckRoutes);
routes.use("/users", userRoutes);
