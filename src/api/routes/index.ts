import { Router } from "express";

import { userRoutes } from "@/modules/users";

import { healthcheckRoutes } from "./healthcheck.routes";

export const routes = Router();

routes.use("/", healthcheckRoutes);
routes.use("/users", userRoutes);
